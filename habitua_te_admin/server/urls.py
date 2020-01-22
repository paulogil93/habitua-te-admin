from django.urls import path
from . import views

urlpatterns = [
    path("", views.index, name="index"),
    path("index/", views.index, name='index'),
    path("users/", views.users, name='users'),
    path("products/", views.products, name='products'),
    path("events/", views.events, name='events'),
    path("news/", views.news, name='news'),
    path("categories/", views.categories, name='categories'),
    path("login/", views.login, name='login'),
    path("do_login/", views.do_login, name='do_login'),
    path("logout/", views.logout, name='logout'),
    path("notifications/", views.notifications, name='notifications'),
]
