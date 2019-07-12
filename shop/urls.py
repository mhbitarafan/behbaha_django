from django.urls import path, include
from . import views
from django.contrib.auth import views as auth_views

urlpatterns = [
    path('', views.index),
    path('products/category/<str:cat>', views.product_cat),
    path('search/', views.search),
    path('add_to_cart/', views.add_to_cart),
    path('update_cart/', views.cart_update),
    path('cart/', views.cart_page, name="cart_page"),
    path('account/signup/', views.signup.as_view(), name="signup"),
    path('account/login/', auth_views.LoginView.as_view(redirect_authenticated_user=True), name="login"),
    # path('account/login/', views.login, name="login"),
    path('account/logout/', auth_views.LogoutView.as_view(), name="logout"),
    path('account/manage/', views.manage_account, name="manage_account"),
    path('submit_order/', views.submit_order, name="submit_order"),
]