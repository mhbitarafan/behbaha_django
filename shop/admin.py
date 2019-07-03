from django.contrib import admin
from .models import *
from jalali_date.admin import ModelAdminJalaliMixin, StackedInlineJalaliMixin, TabularInlineJalaliMixin
from django.forms import TextInput, Textarea
from django.db import models
# Register your models here.

# class MyInlines1(TabularInlineJalaliMixin, admin.TabularInline):
#     model = SecendModel


@admin.register(product)
class productAdmin(ModelAdminJalaliMixin, admin.ModelAdmin):
    # inlines = (MyInlines1, )s
    list_display = ('title',)
    fields = ('title', 'prices', 'max_order', 'deliver_at', 'description', 'featured_image',)
    search_fields = ["title"]
    raw_id_fields = ()
    autocomplete_fields = ("prices",)
    formfield_overrides = {
        models.CharField: {'widget': TextInput(attrs={'size':'40'})},
        models.CharField: {'widget': TextInput(attrs={'size':'40'})},
}
    class Media:
        css = {
                'all': ('css/admin-extra.css',)
        }
@admin.register(price_ranges)
class pricerangesAdmin(admin.ModelAdmin):
    list_display = ('order_range', 'price',)
    fields = ('order_range', 'price',)
    search_fields = ['order_range']

@admin.register(image)
class imageAdmin(admin.ModelAdmin):
    list_display = ('title', 'url',)
    fields = ('title', 'url',)
    search_fields = ['title']
