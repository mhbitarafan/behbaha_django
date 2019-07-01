from django.db import models

# Create your models here.
class product(models.Model):
    date_created = models.DateField()
    title = models.CharField(max_length=100)
    price = models.IntegerField()