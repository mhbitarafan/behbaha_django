from django.urls import path
from . import views

urlpatterns = [
    path('', views.index),
    path('products/category/<str:cat>', views.product_cat),
    path('add_to_cart/', views.cart_process),
    path('update_cart/', views.cart_update),
    path('cart/', views.cart_page),
    path('search/', views.search),
    path('account/', views.account),
]