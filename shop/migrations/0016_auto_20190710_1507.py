# Generated by Django 2.2.2 on 2019-07-10 10:37

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('shop', '0015_auto_20190710_1505'),
    ]

    operations = [
        migrations.AddField(
            model_name='customer',
            name='city',
            field=models.TextField(blank=True, null=True, verbose_name='شهر'),
        ),
        migrations.AddField(
            model_name='customer',
            name='state',
            field=models.TextField(blank=True, null=True, verbose_name='استان'),
        ),
    ]