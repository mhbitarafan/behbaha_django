from django.urls import path
from . import views

urlpatterns = [
    path('', views.index),
    path('add_to_cart/', views.cart_process),
    path('cart/', views.cart_page),
    path('search/', views.search),
]