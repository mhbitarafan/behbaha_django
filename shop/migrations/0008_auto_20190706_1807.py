# Generated by Django 2.2.2 on 2019-07-06 13:37

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('shop', '0007_auto_20190706_1710'),
    ]

    operations = [
        migrations.AddField(
            model_name='product',
            name='ordered_num',
            field=models.IntegerField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='cart',
            name='session_id',
            field=models.CharField(blank=True, max_length=200, null=True),
        ),
    ]
