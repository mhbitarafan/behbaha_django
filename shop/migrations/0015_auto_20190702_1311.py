# Generated by Django 2.2.2 on 2019-07-02 08:41

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('shop', '0014_auto_20190702_1311'),
    ]

    operations = [
        migrations.AlterField(
            model_name='product',
            name='deliver_at',
            field=models.DateField(null=True, verbose_name='تاریخ تحویل'),
        ),
    ]
