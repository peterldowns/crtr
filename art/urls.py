from django.conf.urls import url
from django.contrib.auth import views as auth_views
from art import views

urlpatterns = [
        url(r'^$', views.index, name='art-index'),
        url(r'^home$', views.home, name='art-home'),
        url(r'^artwork/(\d+)$', views.artwork, name='art-artwork'),
        url(r'^collections$', views.collections, name='art-collections'),
        url(r'^collections/(\d+)$', views.collection, name='art-collection'),
        url(r'^galleries/(\d+)$', views.gallery, name='art-gallery'),
        url(r'^search$', views.search, name='art-search'),
        url(r'^search/(.*)$', views.search, name='art-search'),
        url(r'^api/search', views.api_search, name='art-api-search'),
        url(r'^api/change_collection_status',
            views.change_collection_status,
            name='art-api-change-collection-status'),
        # Authentication
        url(r'^login$', views.login, name='art-login'),
        url(r'^logout/?$', auth_views.LogoutView.as_view(), name='art-logout'),
]
