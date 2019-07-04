from django.contrib import admin
from .models import *
import jdatetime
from jalali_date.admin import ModelAdminJalaliMixin, StackedInlineJalaliMixin, TabularInlineJalaliMixin
from django.forms import TextInput, Textarea
from django.db import models
# Register your models here.

# class MyInlines1(TabularInlineJalaliMixin, admin.TabularInline):
#     model = SecendModel


@admin.register(product)
class productAdmin(ModelAdminJalaliMixin, admin.ModelAdmin):
    # inlines = (MyInlines1, )s
    list_display = ('title', 'j_delivery_time', 'max_order')
    fields = ('title', ('order_ranges', 'prices'), 'max_order', 'deliver_at', 'description', 'featured_image',)
    search_fields = ["title"]
    # raw_id_fields = ()
    # autocomplete_fields = ("prices",)
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

@admin.register(image)
class imageAdmin(admin.ModelAdmin):
    list_display = ('title', 'url',)
    fields = ('title', 'url',)
    search_fields = ['title']
