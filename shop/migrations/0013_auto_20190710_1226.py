# Generated by Django 2.2.2 on 2019-07-10 07:56

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('shop', '0012_auto_20190710_1226'),
    ]

    operations = [
        migrations.RenameField(
            model_name='cart',
            old_name='user',
            new_name='customer',
        ),
    ]