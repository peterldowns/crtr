from django.contrib.auth.decorators import login_required
from django.http import Http404
from art.models import Artwork
from art.utils import props_template
from art.models import Collection
from art.recommenders import recommend_to_user


def random_artworks(n=10):
    import random
    all_art = list(Artwork.highlighted.all())
    return random.sample(all_art, n)


@props_template('art/index.html')
def index(request):
    some_art = random_artworks()
    collections = Collection.get_latest()
    return {
        'art': some_art,
        'collections': collections,
        'header_img': (
            'http://images.metmuseum.org/CRDImages/ep/original/DT5111.jpg'),
        'user': None if request.user.is_anonymous() else request.user,
    }


@login_required
@props_template('art/home.html')
def home(request):
    user = request.user
    return {
        'user': user,
        'collections': user.collections.all(),
        'recommendations': recommend_to_user(10),
    }


@login_required
@props_template('art/artwork.html')
def artwork(request, artwork_id):
    try:
        artwork = Artwork.objects.get(id=artwork_id)
    except Artwork.DoesNotExist:
        raise Http404("Could not find that piece of art. "
                      "Maybe you should go make it!")
    return {
        'title': artwork.title,
        'artwork': artwork,
        'user': request.user,
        'collections': artwork.collections.all(),
    }


def search(request):
    raise NotImplementedError


def collections(request):
    raise NotImplementedError


def collection(request, collection_id):
    raise NotImplementedError
