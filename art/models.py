from art.utils import DictModel
from django.contrib.auth.models import AbstractUser
from django.db import models
from django.db.models.signals import post_save
from django.dispatch import receiver


class User(DictModel, AbstractUser):
    _json_fields = ('id', 'is_superuser', 'username', 'email')


class Artist(models.Model):
    name = models.TextField()
    year_begin = models.IntegerField()
    year_end = models.IntegerField()
    bio = models.TextField()
    nationality = models.TextField()


class HighlightedArtworkManager(models.Manager):
    def get_queryset(self):
        return super().get_queryset().filter(is_highlight=True)


class Artwork(DictModel, models.Model):
    _json_fields = (
            'id', 'title', 'classification', 'department', 'culture',
            'medium', 'created', 'image_url_small', 'image_url_large')

    objects = models.Manager()
    highlighted = HighlightedArtworkManager()

    id = models.AutoField(primary_key=True)
    title = models.TextField(blank=True, null=False)
    classification = models.TextField(blank=True, null=False)
    department = models.TextField(blank=True, null=False)
    culture = models.TextField(blank=True, null=False)
    medium = models.TextField(blank=True, null=False)

    created = models.DateField(null=True)
    museum_id = models.URLField(null=False, unique=True)
    museum_link = models.URLField(null=False)
    museum_name = models.TextField(null=False)

    public_domain = models.BooleanField(default=False)
    is_highlight = models.BooleanField(default=False)

    image_url_small = models.URLField(null=True)
    image_url_large = models.URLField(null=True)


class Collection(DictModel, models.Model):
    _json_fields = (
            'id', 'title', 'user', 'date_created',
            'date_modified')
    _json_fields_m2m = {
            'artworks': lambda s, a: a.all(),
        }

    id = models.AutoField(primary_key=True)
    title = models.TextField(blank=True, null=False)
    user = models.ForeignKey('art.User', related_name='collections')
    artworks = models.ManyToManyField('art.Artwork',
                                      related_name='collections')
    date_created = models.DateTimeField(auto_now_add=True)
    date_modified = models.DateTimeField(auto_now=True)

    @classmethod
    def get_latest(C, n=5):
        return (Collection.objects
                          .annotate(num_artworks=models.Count('artworks'))
                          .filter(num_artworks__gt=3)
                          .order_by('-date_modified'))[:n]


@receiver(post_save, sender=User)
def ensure_collection(sender, **kwargs):
    # Every user must have at least one Collection object so that when they
    # first log in there's something to work with.
    user = kwargs.get('instance')
    if not user or user.collections.all().count() > 0:
        return
    Collection.objects.create(
            title="%s's collection" % user.username,
            user=user,
    )
