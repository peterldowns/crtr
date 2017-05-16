import time
import random
from art.models import Artwork
from art.models import Collection
from vectors.tools import create_table
from vectors.tools import to_ndarray


Table = None


def get_table():
    global Table
    if Table is None:
        Table = create_table(Artwork.vectored.all())
    return Table


def art_from_user(user, k=10):
    colls = user.collections.all()
    vector = sum(c.get_vector() for c in colls) / colls.count()
    collected = {a.id for c in colls for a in c.artworks.all()}
    table, mapping = get_table()
    related_ids = [
            mapping[i]
            for i in table.find_k_nearest_neighbors(
                to_ndarray(vector), 100)]
    related_ids = [
            artwork_id
            for artwork_id in related_ids
            if artwork_id not in collected]
    related_ids = related_ids[:k]  # best k results
    return [Artwork.objects.get(id=artwork_id) for artwork_id in related_ids]


def random_art_from_user(user, k=10):
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
    colls = Collection.objects.exclude(user=user)
    count = colls.count()
    out = []
    for i in range(k):
        out.append(colls[int(r.random() * count)])
    return out


def art_from_collection(user, collection, k=10):
    if collection.artworks.count() == 0:
        return []
    vector = collection.get_vector()
    collected = {
            a.id for c in user.collections.all() for a in c.artworks.all()}
    table, mapping = get_table()
    related_ids = [
            mapping[i]
            for i in table.find_k_nearest_neighbors(
                to_ndarray(vector), 100)]
    related_ids = [
            artwork_id
            for artwork_id in related_ids
            if artwork_id not in collected]
    related_ids = related_ids[:k]  # best k results
    return [Artwork.objects.get(id=artwork_id) for artwork_id in related_ids]


def art_from_artwork(user, artwork, k=10):
    if artwork.vector is None:
        print('NO VECTOR FOR ART %d' % artwork.id)
        return []
    collected = {
            a.id for c in user.collections.all()
            for a in c.artworks.all()
        }
    table, mapping = get_table()
    related_ids = [
            mapping[i]
            for i in table.find_k_nearest_neighbors(
                to_ndarray(artwork.get_vector()), 100)]
    related_ids = [
            artwork_id
            for artwork_id in related_ids
            if artwork_id not in collected]
    related_ids = related_ids[:k]  # best k results
    return [Artwork.objects.get(id=artwork_id) for artwork_id in related_ids]


get_table()
