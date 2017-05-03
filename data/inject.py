#!/usr/bin/env python
import os, django
import sys
sys.path.append('..') # Root of django app
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'settings')
django.setup()

