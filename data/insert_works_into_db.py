#!/usr/bin/env python
import os
import django
import sys
import maya

sys.path.append('..')  # Root of django app
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'settings')
django.setup()

from csv import DictReader  # noqa
from art.models import Artwork  # noqa


def load_full_collection():
    with open('./metadata.csv') as fin:
        for row in DictReader(fin):
            yield row


def cc_only(data):
    for row in data:
        if row['Is Public Domain'] == 'True':
            yield row


def create_object(row):
    # TODO: create Artist object.

    a.museum_id = row['Object ID']
    a = Artwork()
    a.title = row['Title']
    a.classification = row['Classification']
    a.department = row['Department']
    a.culture = row['Culture']
    a.medium = row['Medium']
    a.is_highlight = (row['Is Highlight'] == 'True')

    # TODO: better datetime parsing
    try:
        a.created = maya.parse(row['Object Begin Date']).datetime()
    except Exception:
        pass

    a.museum_id = row['Object ID']
    a.museum_link = row['Link Resource']
    a.museum_name = 'Metropolitan Museum of Art'
    a.public_domain = True

    a.save()


if __name__ == '__main__':
    print('loading...')
    cc = list(cc_only(load_full_collection()))
    count = len(cc)
    for i, row in enumerate(cc):
        create_object(row)
        if i % 50:
            sys.stdout.write('\r%d/%d' % (i, len(cc)))
    print('\nDone.')
