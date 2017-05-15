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
    # What a row looks like:
    {'Artist Alpha Sort': '',
     'Artist Begin Date': '',
     'Artist Display Bio': '',
     'Artist Display Name': '',
     'Artist End Date': '',
     'Artist Nationality': '',
     'Artist Prefix': '',
     'Artist Role': '',
     'Artist Suffix': '',
     'City': '',
     'Classification': 'Drawings',
     'Country': 'United States',
     'County': '',
     'Credit Line': 'Gift of Mrs. Robert W. de Forest, 1933',
     'Culture': 'American',
     'Department': 'American Decorative Arts',
     'Dimensions': '7 1/2 x 13 1/4 in. (19.1 x 33.7 cm)',
     'Dynasty': '',
     'Excavation': '',
     'Geography Type': 'Made in',
     'Is Highlight': 'False',
     'Is Public Domain': 'True',
     'Link Resource': 'http://www.metmuseum.org/art/collection/search/4939',
     'Locale': '',
     'Locus': '',
     'Medium': 'Ink and watercolor on paper',
     'Metadata Date': '5/1/2017 8:00:22 AM',
     'Object Begin Date': '1797',
     'Object Date': 'ca. 1800',
     'Object End Date': '1800',
     'Object ID': '4939',
     'Object Name': 'Manuscript sampler, Fraktur',
     'Period': '',
     'Portfolio': '',
     'Region': '',
     'Reign': '',
     'Repository': 'Metropolitan Museum of Art, New York, NY',
     'Rights and Reproduction': '',
     'River': '',
     'State': '',
     'Subregion': '',
     'Title': 'Manuscript Sampler',
     '\ufeffObject Number': '34.100.72'}

    # TODO: create Artist object.
    a = Artwork()
    a.museum_id = row['Object ID']
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
    cc = cc_only(load_full_collection())
    for i, row in enumerate(cc):
        create_object(row)
        if i % 50:
            sys.stdout.write('\r%d/???' % (i))
    print('\nDone.')
