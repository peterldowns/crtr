#!/usr/bin/env python
import os
import django
import requests
import numpy as np
import sys
import json
import cv2

from django.core import serializers
from django.db.models import Q  # noqa


sys.path.append('..')  # Root of django app
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'settings')
django.setup()


# n = len(dataset) # number of items in the dataset
# d = len(dataset[0]) # length of a vector
# t = falconn.LSHIndex(p)
# t.find_nearest_neighbors(vector, num_neighbors)


from art.models import Artwork  # noqa


SAMPLE_FILENAME = 'vector_sample.json'
IMAGES_DIR = './images'


def with_urls():
    return (Artwork.highlighted
                   .exclude(museum_link=None)
                   .filter(Q(image_url_small__isnull=False) |
                           Q(image_url_large__isnull=False)))


def new_sample():
    return with_urls()[:100]


def dump_sample(sample):
    data = serializers.serialize('json', sample)
    with open(SAMPLE_FILENAME, 'w') as fout:
        fout.write(data)


def load_sample():
    with open(SAMPLE_FILENAME, 'r') as fin:
        sample = json.loads(fin.read())
    pks = {row['pk'] for row in sample}
    return Artwork.objects.filter(pk__in=pks)


def get_image_filename(work):
    return os.path.join(IMAGES_DIR, work.museum_id + '.jpg')


def get_image(work):
    filename = get_image_filename(work)
    data = cv2.imread(filename)
    if data is None:
        print('downloading', work.image_url_small)
        r = requests.get(work.image_url_small)
        if not r.status_code == 200:
            raise Exception(
                    'Got %d: %s' % (r.status_code, work.image_url_small))
        with open(filename, 'wb') as fout:
            fout.write(r.content)
        data = np.asarray(bytearray(r.content), dtype='uint8')
        return cv2.imdecode(data, cv2.IMREAD_COLOR)


def compute_vector(work):
    if work.vector is not None:
        print('work.vector!', work.vector)
        return
    image = get_image(work)  # noqa
    print('skipping')


def main():
    try:
        sample = load_sample()
    except Exception as e:
        print(e)
        sample = new_sample()
        dump_sample(sample)

    count = len(sample)
    for i, work in enumerate(sample):
        sys.stdout.write('\r%d/%d' % (i, count))
        compute_vector(work)
    dump_sample(sample)


if __name__ == '__main__':
    main()
