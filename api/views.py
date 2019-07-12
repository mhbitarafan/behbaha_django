from django.db.models import Max, Min
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
        min_price = self.request.query_params.get('min_price', None)
        max_price = self.request.query_params.get('max_price', None)
        if cat is not None:
            queryset = queryset.filter(category__title=cat)

        if (min_price!= None or max_price != None):
            max = product.objects.aggregate(Min('base_price'), Max('base_price'))
            logger.error(max)
            if min_price == None:
                queryset = queryset.filter(base_price__lte=max_price)
                return queryset
            if max_price == None:
                queryset = queryset.filter(base_price__gte=min_price)
                return queryset
            queryset = queryset.filter(base_price__gte=min_price, base_price__lte=max_price)
        return queryset