# Generated by Django 2.2.2 on 2019-07-15 11:36

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('shop', '0033_auto_20190715_1510'),
    ]

    operations = [
        migrations.AlterField(
            model_name='product',
            name='featured_image',
            field=models.ImageField(null=True, upload_to='uploads/images/%Y/%m/%d', verbose_name='تصویر اصلی'),
        ),
    ]
