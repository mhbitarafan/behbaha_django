from django.urls import path
from . import views

urlpatterns = [
    path('', views.index),
    path('cart/', views.cart_process),
    path('search/', views.search),
]