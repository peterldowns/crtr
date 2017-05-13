#!/usr/bin/env python
import os, django
import sys
sys.path.append('..') # Root of django app
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'settings')
django.setup()

from csv import DictReader
from art.models import Artwork

def load_full_collection():
    with open('./MetObjects.csv') as fin:
        for row in DictReader(fin):
            yield row

def cc_only(data):
    for row in data:
        if row['Is Public Domain'] == 'True':
            yield row


def create_object(row):
    # TODO: create Artist object.
    a = Artwork()
    a.title = row['Title']
    a.classification = row['Classification']
    a.department = row['Department']
    a.culture = row['Culture']
    a.medium = row['Medium']

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

