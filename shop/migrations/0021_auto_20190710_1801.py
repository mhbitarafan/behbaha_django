# Generated by Django 2.2.2 on 2019-07-10 13:31

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('shop', '0020_auto_20190710_1755'),
    ]

    operations = [
        migrations.AlterField(
            model_name='order',
            name='mobile_phone',
            field=models.CharField(max_length=200, null=True, verbose_name='تلفن همراه'),
        ),
        migrations.AlterField(
            model_name='order',
            name='title',
            field=models.CharField(blank=True, max_length=200, verbose_name='لیست عنوان کالاها'),
        ),
    ]