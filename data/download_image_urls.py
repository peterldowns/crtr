#!/usr/bin/env python
import os
import re
import sys
import json

import django
import requests

from django.core import serializers


sys.path.append('..')  # Root of django app
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'settings')
django.setup()

from art.models import Artwork  # noqa
from django.db.models import Q  # noqa

JSON_DUMP_FILENAME = './images_mapping.json'


def without_urls():
    return (Artwork.highlighted
                   .exclude(museum_link=None)
                   .filter(Q(image_url_small=None) |
                           Q(image_url_large=None)))


def with_urls():
    return (Artwork.highlighted
                   .exclude(museum_link=None)
                   .filter(Q(image_url_small__isnull=False) |
                           Q(image_url_large__isnull=False)))


def update_urls(a, dump=None):
    # If the urls were already grabbed, don't fetch them again.
    dump = dump or {}
    entry = dump.get(a.museum_id)
    if entry:
        a.image_url_small = entry['image_url_small']
        a.image_url_large = entry['image_url_large']

    # Unless both urls were grabbed, have to re-fetch.
    if a.image_url_small and a.image_url_large:
        return

    r = requests.get(a.museum_link)
    updated = False
    if not r.status_code == 200:
        sys.stderr.write('FAILED (%d) %s\n' % (r.status_code, a.museum_link))

    match = re.search(r'http\:\/\/.*CRDImages.*web-large.*jpg', r.text)
    if match:
        a.image_url_small = match.group()
        updated = True

    match = re.search(r'http\:\/\/.*CRDImages.*original.*jpg', r.text)
    if match:
        a.image_url_large = match.group()
        updated = True

    if updated:
        a.save()


def dump_image_urls():
    works = with_urls()
    data = serializers.serialize('json', works)
    with open(JSON_DUMP_FILENAME, 'w') as fout:
        fout.write(data)


def load_dump():
    mapping = {}
    try:
        with open(JSON_DUMP_FILENAME, 'r') as fin:
            works = json.loads(fin.read())
            for work in works:
                print('work', work)
                mapping[work['fields']['museum_id']] = work['fields']
    except Exception as e:
        print(e)
    return mapping


def main():
    dump = load_dump()
    works = list(without_urls())
    for i, artwork in enumerate(works):
        update_urls(artwork, dump)
        if i % 10:
            sys.stdout.write('\r%d/%d' % (i, len(works)))


if __name__ == '__main__':
    main()
