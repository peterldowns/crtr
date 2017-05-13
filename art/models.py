from django.db import models
from django.contrib.auth.models import AbstractUser


class User(AbstractUser):
    pass


class Artist(models.Model):
    name = models.TextField()
    year_begin = models.IntegerField()
    year_end = models.IntegerField()
    bio = models.TextField()
    nationality = models.TextField()


class HighlightedArtworkManager(models.Manager):
    def get_queryset(self):
        return super().get_queryset().filter(is_highlight=True)


class Artwork(models.Model):
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


class Collection(models.Model):
    id = models.AutoField(primary_key=True)
    title = models.TextField(blank=True, null=False)
    user = models.ForeignKey('art.User', related_name='collections')
    artworks = models.ManyToManyField('art.Artwork',
                                      related_name='collections')
    date_created = models.DateTimeField(auto_now_add=True)
    date_modified = models.DateTimeField(auto_now=True)
