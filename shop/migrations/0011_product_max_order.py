# Generated by Django 2.2.2 on 2019-07-02 07:56

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('shop', '0010_auto_20190702_1222'),
    ]

    operations = [
        migrations.AddField(
            model_name='product',
            name='max_order',
            field=models.TextField(blank=True),
        ),
    ]