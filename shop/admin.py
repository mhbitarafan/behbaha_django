from django.contrib import admin
from .models import *
import jdatetime
from jalali_date.admin import ModelAdminJalaliMixin, StackedInlineJalaliMixin, TabularInlineJalaliMixin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from django.contrib.auth.models import User
from django.forms import TextInput, Textarea
from django.db import models
from django.utils import timezone
import pytz
from persiantools import digits
from social_django.models import Association, Nonce, UserSocialAuth

def to_fa(value):
    num = int(value)
    a = f'{num:,}'
    return digits.en_to_fa(a)

admin.site.unregister(Association)
admin.site.unregister(Nonce)
admin.site.unregister(UserSocialAuth)
# Register your models here.

class CustomerInline(admin.StackedInline):
    model = customer
    can_delete = False
    verbose_name_plural = 'اطلاعات مشتری'

class UserAdmin(BaseUserAdmin):
    inlines = (CustomerInline,)

admin.site.unregister(User)
admin.site.register(User, UserAdmin)

@admin.register(image)
class imageAdmin(admin.ModelAdmin):
    list_display = ('title', 'url',)
    fields = ('title', 'url',)
    search_fields = ['title']

@admin.register(order)
class orderAdmin(admin.ModelAdmin):
    list_display = ('customer_fullname', 'titleAamount')
    radio_fields = {'payment_type': admin.HORIZONTAL, 'delivery_type': admin.HORIZONTAL}
    fields = (('order_customer', 'first_name', 'last_name'), ('title', 'price', 'amount'), ('state', 'city', 'zip_code'), 'address',
     ('phone', 'mobile_phone'), 'delivery_type', 'payment_type', 'description', 'is_paid', 'order_status')
    search_fields = ['title']
    def customer_fullname(self, obj):
        return "%s %s" % (obj.first_name, obj.last_name)
    customer_fullname.short_description = "نام مشتری"    
    def titleAamount(self, obj):
        t_a = ''
        titles= obj.title.split('\n')
        amounts= obj.amount.split('\n')
        for i,title in enumerate(titles):
            a = "[%s] %s\n" % (amounts[i], title)
            t_a += a
        return t_a
    titleAamount.short_description = "سفارشات"
    formfield_overrides = {
    models.CharField: {'widget': TextInput(attrs={'size':'40'})},
    models.TextField: {'widget': Textarea(attrs={'rows':4, 'cols':38})}
    }
    
# @admin.register(customer)
# class customerAdmin(admin.ModelAdmin):
#     # list_display = ('id', 'name', 'phone', 'mobile_phone')
#     # fields = ('user', 'name', 'phone', 'mobile_phone', 'address', 'zip_code')
#     # search_fields = ['id', 'name']
#     autocomplete_fields = ("user",)
#     formfield_overrides = {
#     models.CharField: {'widget': TextInput(attrs={'size':'40'})},
#     models.TextField: {'widget': Textarea(attrs={'rows':4, 'cols':38})}
#     }

@admin.register(cart)
class cartAdmin(admin.ModelAdmin):
    list_display = ('id', 'j_created_at')
    fields = (('title', 'amount', 'price',), ('session_id', 'cart_customer'))
    search_fields = ['title']
    autocomplete_fields = ("cart_customer",)
    formfield_overrides = {
    models.CharField: {'widget': TextInput(attrs={'size':'40'})},
    models.TextField: {'widget': Textarea(attrs={'rows':4, 'cols':38})}
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
    list_display = ('title', 'j_delivery_time', 'max_order', 'base_price_u')
    fields = ('title', ('order_ranges', 'prices'), 'max_order', 'ordered_num', 'deliver_at', 'category', 'description', 'featured_image',)
    search_fields = ["title"]
    autocomplete_fields = ("category",)
    formfield_overrides = {
        models.CharField: {'widget': TextInput(attrs={'size':'40'})},
        models.CharField: {'widget': TextInput(attrs={'size':'40'})},
        models.TextField: {'widget': Textarea(attrs={'rows':4, 'cols':38})}
}
    def j_delivery_time(self, obj):
        return jdatetime.date.fromgregorian(date=obj.deliver_at)
    j_delivery_time.short_description = 'تاریخ تحویل'    
    def base_price_u(self, obj):
        return "%s %s" % (to_fa(obj.base_price), 'تومان')
    base_price_u.short_description = 'قیمت پایه'    
    class Media:
        css = {
                'all': ('css/admin-extra.css',)
        }
