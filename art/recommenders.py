import time
import random
from art.models import Artwork


def recommend_to_user(user, k=10):
    r = random.Random()
    r.seed(int(time.time() / 10000))
    count = Artwork.highlighted.count()
    out = []
    for i in range(k):
        out.append(Artwork.highlighted.all()[int(r.random() * count)])
    return out

#    return [
#        Artwork.high
#        Artwork.highlighted.all()[(id=id_)
#        for id_ in
#        r.sample(range(Artwork.highlighted.count()), count)
#    ]
#


def recommend_from_collection(user, collection):
    raise NotImplementedError


def recommend_from_artwork(user, artwork):
    raise NotImplementedError
