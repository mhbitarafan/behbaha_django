from django.urls import path, include
from . import views
from django.contrib.auth import views as auth_views

urlpatterns = [
    path('', views.index),
    path('products/category/<str:cat>', views.product_cat),
    path('search/', views.search),
    path('add_to_cart/', views.cart_process),
    path('update_cart/', views.cart_update),
    path('cart/', views.cart_page, name="cart_page"),
    path('account/signup/', views.signup.as_view(), name="signup"),
    path('account/login/', auth_views.LoginView.as_view(), name="login"),
    path('account/logout/', auth_views.LogoutView.as_view(), name="logout"),
]