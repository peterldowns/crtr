from django.shortcuts import render
from art.models import Artwork


def random_artworks(n=10):
    import random
    all_art = list(Artwork.highlighted.all())
    return random.sample(all_art, n)


def index(request):
    some_art = random_artworks()
    context = {
        'art': some_art,
        'header_artwork': some_art[0],
        'user': None if request.user.is_anonymous() else request.user,
    }
    return render(request, 'art/index.html', context)
