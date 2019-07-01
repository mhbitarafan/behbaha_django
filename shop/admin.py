from django.contrib import admin
from .models import *
# Register your models here.
class productAdmin(admin.ModelAdmin):
    pass
admin.site.register(product)