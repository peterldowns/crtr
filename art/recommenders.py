import time
import random
from art.models import Artwork
from art.models import Collection


def art_from_user(user, k=10):
    r = random.Random()
    r.seed(int(time.time() / 10000))
    count = Artwork.highlighted.count()
    out = []
    for i in range(k):
        out.append(Artwork.highlighted.all()[int(r.random() * count)])
    return out


def collections_from_user(user, k=10):
    r = random.Random()
    r.seed(int(time.time() / 10000))
    count = Collection.objects.all().count()
    out = []
    for i in range(k):
        out.append(Collection.objects.all()[int(r.random() * count)])
    return out


def art_from_collection(user, collection, k=10):
    raise NotImplementedError


def art_from_artwork(user, artwork, k=10):
    raise NotImplementedError
