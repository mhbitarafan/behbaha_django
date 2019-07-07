from django.contrib.auth.models import User, Group
from shop.models import product
from rest_framework import serializers
import jdatetime
import dateutil.parser
import logging
logger = logging.getLogger(__name__)

class UserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = ('url', 'username', 'email', 'groups')


class GroupSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Group
        fields = ('url', 'name')

class ProductSerializer(serializers.HyperlinkedModelSerializer):
    remaining_time = serializers.SerializerMethodField()
    categories = serializers.CharField(source='category')
    def get_remaining_time(self, obj):
        delivery_date = jdatetime.datetime.fromgregorian(date=obj.deliver_at)
        t_remaining = delivery_date - jdatetime.datetime.now()
        t_remaining = t_remaining.days
        if(t_remaining == 0):
            return "%s" % ("تا پایان امروز")
        elif(t_remaining > 0):
            return "%s %s" % (t_remaining, "روز دیگر")
        else:
            return "%s" % ("به اتمام رسید")
    def to_representation(self, instance):
        representation = super(ProductSerializer, self).to_representation(instance)
        jalai_date = dateutil.parser.parse(representation['deliver_at'])
        jalai_date = jdatetime.date.fromgregorian(date=jalai_date)
        jalai_date = jalai_date.strftime("%y/%m/%d")
        representation['deliver_at'] = str(jalai_date)
        return representation
    
    class Meta:
        model = product
        fields = ('title', 'prices', 'order_ranges', 'max_order', 'ordered_num', 'featured_image', 'deliver_at', 'categories', 'description', 'remaining_time')
        read_only_fields = ('remaining_time',)