from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from art.models import User
from art.models import Artwork
from art.models import Collection


class ArtworkAdmin(admin.ModelAdmin):
    pass


class CollectionAdmin(admin.ModelAdmin):
    pass


admin.site.register(User, UserAdmin)
admin.site.register(Artwork, ArtworkAdmin)
admin.site.register(Collection, CollectionAdmin)
