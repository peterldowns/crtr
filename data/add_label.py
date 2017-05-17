#!/usr/bin/env python
import os
import django
import sys
import requests
import lxml.html

sys.path.append('..')  # Root of django app
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'settings')
django.setup()

from art.models import Artwork  # noqa


def get_target_artworks():
    return Artwork.vectored.filter(label='')


def update_label(artwork):
    r = requests.get(artwork.museum_link)
    if not r.status_code == 200:
        print('%d error @ %s' % (r.status_code, artwork.museum_link))
        return
    tree = lxml.html.fromstring(r.text)
    tags = tree.find_class('collection-details__label')
    if not tags:
        print('No label found')
        return
    tag = tags[0]
    label = tag.text_content().strip()
    artwork.label = label
    artwork.save()


def main():
    art_qs = get_target_artworks()
    count = art_qs.count()
    for i, artwork in enumerate(art_qs):
        update_label(artwork)
        sys.stdout.write('\r%d/%d' % (i, count))
    print('\nDone.')


if __name__ == '__main__':
    main()
