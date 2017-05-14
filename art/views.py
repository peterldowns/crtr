from art.models import Artwork
from art.utils import props_template
from art.models import Collection


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
