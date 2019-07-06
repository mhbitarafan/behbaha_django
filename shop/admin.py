from django.contrib import admin
from .models import *
import jdatetime
from jalali_date.admin import ModelAdminJalaliMixin, StackedInlineJalaliMixin, TabularInlineJalaliMixin
from django.forms import TextInput, Textarea
from django.db import models
from django.utils import timezone
import pytz
# Register your models here.

@admin.register(image)
class imageAdmin(admin.ModelAdmin):
    list_display = ('title', 'url',)
    fields = ('title', 'url',)
    search_fields = ['title']

@admin.register(order)
class orderAdmin(admin.ModelAdmin):
    list_display = ('title', 'price', 'amount')
    fields = ('title', 'price', 'amount', 'description')
    search_fields = ['title']

@admin.register(cart)
class cartAdmin(admin.ModelAdmin):
    list_display = ('id', 'j_created_at')
    fields = (('title', 'amount', 'price',), 'session_id')
    search_fields = ['title']
    formfield_overrides = {
    models.CharField: {'widget': TextInput(attrs={'size':'40'})},
    models.TextField: {'widget': Textarea(attrs={'rows':4, 'cols':40})}
}
    def j_created_at(self, obj):
        j_date = jdatetime.date.fromgregorian(date=obj.created_at)
        time = timezone.localtime(obj.created_at, pytz.timezone('Iran'))
        time = time.strftime("%H:%M:%S")
        return "%s %s" % (j_date, time)
    j_created_at.short_description = 'تاریخ ایجاد'     
@admin.register(Category)
class categoryAdmin(admin.ModelAdmin):
    list_display = ('title',)
    fields = ('title', 'parent', 'image', 'description')
    search_fields = ['title']
    
@admin.register(product)
class productAdmin(ModelAdminJalaliMixin, admin.ModelAdmin):
    # inlines = (MyInlines1, )s
    list_display = ('title', 'j_delivery_time', 'max_order')
    fields = ('title', ('order_ranges', 'prices'), 'max_order', 'ordered_num', 'deliver_at', 'category', 'description', 'featured_image',)
    # readonly_fields = ('ordered_num',)
    search_fields = ["title"]
    # raw_id_fields = ()
    autocomplete_fields = ("category",)
    formfield_overrides = {
        models.CharField: {'widget': TextInput(attrs={'size':'40'})},
        models.CharField: {'widget': TextInput(attrs={'size':'40'})},
        models.TextField: {'widget': Textarea(attrs={'rows':4, 'cols':40})}
}
    def j_delivery_time(self, obj):
        return jdatetime.date.fromgregorian(date=obj.deliver_at)
    j_delivery_time.short_description = 'تاریخ تحویل'    
    class Media:
        css = {
                'all': ('css/admin-extra.css',)
        }
