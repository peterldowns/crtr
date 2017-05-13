from django.db import models

# Create your models here.
# What a row looks like from the database:
{'Artist Alpha Sort': '',
 'Artist Begin Date': '',
 'Artist Display Bio': '',
 'Artist Display Name': '',
 'Artist End Date': '',
 'Artist Nationality': '',
 'Artist Prefix': '',
 'Artist Role': '',
 'Artist Suffix': '',
 'City': '',
 'Classification': 'Drawings',
 'Country': 'United States',
 'County': '',
 'Credit Line': 'Gift of Mrs. Robert W. de Forest, 1933',
 'Culture': 'American',
 'Department': 'American Decorative Arts',
 'Dimensions': '7 1/2 x 13 1/4 in. (19.1 x 33.7 cm)',
 'Dynasty': '',
 'Excavation': '',
 'Geography Type': 'Made in',
 'Is Highlight': 'False',
 'Is Public Domain': 'True',
 'Link Resource': 'http://www.metmuseum.org/art/collection/search/4939',
 'Locale': '',
 'Locus': '',
 'Medium': 'Ink and watercolor on paper',
 'Metadata Date': '5/1/2017 8:00:22 AM',
 'Object Begin Date': '1797',
 'Object Date': 'ca. 1800',
 'Object End Date': '1800',
 'Object ID': '4939',
 'Object Name': 'Manuscript sampler, Fraktur',
 'Period': '',
 'Portfolio': '',
 'Region': '',
 'Reign': '',
 'Repository': 'Metropolitan Museum of Art, New York, NY',
 'Rights and Reproduction': '',
 'River': '',
 'State': '',
 'Subregion': '',
 'Title': 'Manuscript Sampler',
 '\ufeffObject Number': '34.100.72'}

class Artist(models.Model):
    name = models.TextField()
    year_begin = models.IntegerField()
    year_end = models.IntegerField()
    bio = models.TextField()
    nationality = models.TextField()

class Artwork(models.Model):
    id = models.AutoField(primary_key=True)
    title = models.TextField(blank=True, null=False)
    classification = models.TextField(blank=True, null=False)
    department = models.TextField(blank=True, null=False)
    culture = models.TextField(blank=True, null=False)
    medium = models.TextField(blank=True, null=False)

    created = models.DateField(null=True)
    museum_id = models.URLField(null=False)
    museum_link = models.URLField(null=False)
    museum_name = models.TextField(null=False)

    public_domain = models.BooleanField()

    image_url_small = models.URLField(null=True)
    image_url_large = models.URLField(null=True)

