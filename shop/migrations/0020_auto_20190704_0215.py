# Generated by Django 2.2.2 on 2019-07-03 21:45

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('shop', '0019_remove_product_images'),
    ]

    operations = [
        migrations.AlterField(
            model_name='price_ranges',
            name='price',
            field=models.TextField(blank=True, verbose_name='قیمت'),
        ),
    ]
