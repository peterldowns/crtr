# -*- coding: utf-8 -*-
# Generated by Django 1.11 on 2017-05-16 12:55
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('art', '0002_collection_description'),
    ]

    operations = [
        migrations.AddField(
            model_name='artwork',
            name='vector',
            field=models.BinaryField(null=True),
        ),
    ]