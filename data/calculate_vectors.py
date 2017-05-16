#!/usr/bin/env python
import cv2
import django
import json
import numpy as np
import os
import requests
import sys

from django.core import serializers
from django.db.models import Q  # noqa


sys.path.append('..')  # Root of django app
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'settings')
django.setup()


from art.models import Artwork  # noqa
from art.models import User  # noqa
from vectors.vgg import get_vector  # noqa
from vectors.tools import create_table  # noqa
from vectors.tools import to_ndarray  # noqa


SAMPLE_FILENAME = 'vector_sample.json'
IMAGES_DIR = os.path.expanduser('~/crtr-images')


def new_sample():
    return (Artwork.highlighted
                   .exclude(museum_link=None)
                   .filter(Q(image_url_small__isnull=False) |
                           Q(image_url_large__isnull=False)))[:100]


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
    return os.path.join(IMAGES_DIR, work.museum_id + '.vector.jpg')


def get_image(work):
    filename = get_image_filename(work)
    im = cv2.imread(filename)
    if im is not None:
        return im
    sys.stdout.write(
            ' downloading %s -> %s' % (work.image_url_small, filename))
    r = requests.get(work.image_url_small)
    if not r.status_code == 200:
        print('Got %d: %s' % (r.status_code, work.image_url_small))
        return None
    data = np.asarray(bytearray(r.content), dtype='uint8')
    im = cv2.imdecode(data, cv2.IMREAD_COLOR)
    im = cv2.resize(im, (224, 224)).astype(np.float32)
    cv2.imwrite(filename, im)
    return im


def compute_vector(work):
    if work.vector is not None:
        sys.stdout.write(' skipping')
        return
    image = get_image(work)  # noqa
    if image is not None:
        work.vector = get_vector(image).tobytes()
        work.save()


def main():
    if sys.argv[-1] == 'all':
        sample = Artwork.highlighted.all()
    else:
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

    sample = [w for w in sample if w.vector is not None]
    table, mapping = create_table(sample)
    a = Artwork.objects.get(museum_id='200')
    print('\n')
    for i, neighbor_i in enumerate(
            table.find_k_nearest_neighbors(to_ndarray(a.get_vector()), 10)):
        artwork = Artwork.objects.get(id=mapping[neighbor_i])
        print(i, get_image_filename(artwork))


if __name__ == '__main__':
    main()
