# Generated by Django 2.2.2 on 2019-07-10 16:33

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('shop', '0022_auto_20190710_1811'),
    ]

    operations = [
        migrations.AddField(
            model_name='order',
            name='delivery_type',
            field=models.CharField(choices=[(0, 'پیک رایگان'), (1, 'تیپاکس'), (1, 'پست'), (1, 'پیک فوری')], max_length=200, null=True, verbose_name='روش ارسال'),
        ),
        migrations.AlterField(
            model_name='order',
            name='payment_type',
            field=models.CharField(choices=[(0, 'درگاه اینترنتی بانک'), (1, 'کارت به کارت'), (1, 'استفاده از اعتبار حساب')], max_length=200, null=True, verbose_name='روش پرداخت'),
        ),
    ]
