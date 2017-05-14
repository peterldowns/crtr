from art.models import Artwork
from art.utils import props_template


def random_artworks(n=10):
    import random
    all_art = list(Artwork.highlighted.all())
    return random.sample(all_art, n)


@props_template('art/index.html')
def index(request):
    some_art = random_artworks()
    return {
        'art': some_art,
        'header_artwork': some_art[0],
        'user': None if request.user.is_anonymous() else request.user,
    }
