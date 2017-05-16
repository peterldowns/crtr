import json
from django.contrib.auth.decorators import login_required
from django.views.decorators.http import require_GET
from django.views.decorators.http import require_POST
from django.views.decorators.http import require_http_methods
from django.shortcuts import get_object_or_404
from django.http import Http404
from art.models import Artwork
from art.utils import props_template
from art.utils import json_response
from art.utils import to_dict
from art.models import Collection
from art.recommenders import art_from_user
from art.recommenders import art_from_artwork
from art.recommenders import art_from_collection
from art.recommenders import collections_from_user
from django.views.decorators.csrf import ensure_csrf_cookie


def random_artworks(n=10):
    import random
    all_art = list(Artwork.highlighted.all())
    return random.sample(all_art, n)


@require_GET
@ensure_csrf_cookie
@props_template('art/index.html')
def index(request):
    collections = Collection.get_latest()
    return {
        'collections': collections,
        'header_img': (
            'http://images.metmuseum.org/CRDImages/ep/original/DT5111.jpg'),
        'user': None if request.user.is_anonymous() else request.user,
    }


@require_GET
@login_required
@ensure_csrf_cookie
@props_template('art/home.html')
def home(request):
    user = request.user
    return {
        'user': user,
        'collections': user.collections.all(),
        'recommendations': art_from_user(user, 10),
    }


@require_POST
@login_required
@json_response
def change_collection_status(request):
    data = json.loads(request.body.decode('utf-8'))
    collection = get_object_or_404(Collection, id=data['collection_id'])
    artwork = get_object_or_404(Artwork, id=data['artwork_id'])
    user = request.user
    if not collection.user.id == user.id:
        raise Http404("What collection?")

    change = data['change']
    if change == 'add':
        collection.artworks.add(artwork)
        in_collection = True
    elif change == 'remove':
        collection.artworks.remove(artwork)
        in_collection = False
    collection.save()
    return to_dict({
        'in_collection': in_collection,
        'collection': collection,
        'collections': artwork.collections.all(),
        'artwork': artwork,
    })


@require_GET
@login_required
@ensure_csrf_cookie
@props_template('art/artwork.html')
def artwork(request, artwork_id):
    try:
        artwork = Artwork.objects.get(id=artwork_id)
    except Artwork.DoesNotExist:
        raise Http404("Could not find that piece of art. "
                      "Maybe you should go make it!")

    collection = request.user.get_collection()
    in_collection = collection.artworks.filter(id=artwork_id).count() > 0
    return {
        'title': artwork.title,
        'artwork': artwork,
        'user': request.user,
        'collections': artwork.collections.all(),
        'collection': collection,
        'in_collection': in_collection,
        'related': art_from_artwork(request.user, artwork, 6),
    }


@require_GET
@login_required
@ensure_csrf_cookie
@props_template('art/collections.html')
def collections(request):
    user = request.user
    latest = Collection.get_latest()
    recommended = collections_from_user(user)
    return {
        'user': request.user,
        'latest': latest,
        'recommended': recommended,
    }


@require_http_methods(['GET', 'POST'])
@login_required
def collection(request, collection_id):
    if request.method == 'GET':
        return collection_get(request, collection_id)
    if request.method == 'POST':
        return collection_post(request, collection_id)
    raise NotImplementedError


def collection_post(request, collection_id):
    user = request.user
    collection = get_object_or_404(Collection, id=collection_id)
    if not collection.user.id == user.id:
        raise Http404("What collection?")
    raise NotImplementedError


@ensure_csrf_cookie
@props_template('art/collection.html')
def collection_get(request, collection_id):
    user = request.user
    collection = get_object_or_404(Collection, id=collection_id)
    return {
        'user': user,
        'collection': collection,
        'related': art_from_collection(user, collection, 10)
    }


def search(request):
    raise NotImplementedError
