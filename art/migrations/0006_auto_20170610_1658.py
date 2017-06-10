# -*- coding: utf-8 -*-
# Generated by Django 1.11 on 2017-06-10 16:58
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('art', '0005_artwork_artists'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='artist',
            name='nationality',
        ),
        migrations.RemoveField(
            model_name='artist',
            name='year_begin',
        ),
        migrations.RemoveField(
            model_name='artist',
            name='year_end',
        ),
        migrations.AddField(
            model_name='artist',
            name='date_begin',
            field=models.DateField(null=True),
        ),
        migrations.AddField(
            model_name='artist',
            name='date_end',
            field=models.DateField(null=True),
        ),
    ]
