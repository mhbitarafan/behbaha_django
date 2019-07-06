from django.contrib.auth.models import User, Group
from shop.models import product
from rest_framework import viewsets
from api.serializers import UserSerializer, GroupSerializer, ProductSerializer
from rest_framework import generics
from rest_framework import filters
import logging
from datetime import datetime
logger = logging.getLogger(__name__)

class UserViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    queryset = User.objects.all().order_by('-date_joined')
    serializer_class = UserSerializer


class GroupViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows groups to be viewed or edited.
    """
    queryset = Group.objects.all()
    serializer_class = GroupSerializer

class Products(viewsets.ModelViewSet):
    queryset = product.objects.all()
    serializer_class = ProductSerializer
    filter_backends = (filters.SearchFilter,)
    search_fields = ('title',)
    def get_queryset(self):
        queryset = product.objects.all()
        cat = self.request.query_params.get('category', None)
        if cat is not None:
            queryset = queryset.filter(category__title=cat)
        return queryset