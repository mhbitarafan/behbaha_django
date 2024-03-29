# Generated by Django 2.2.2 on 2019-07-12 10:31

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('shop', '0026_auto_20190712_1254'),
    ]

    operations = [
        migrations.AlterField(
            model_name='order',
            name='payment_type',
            field=models.CharField(choices=[('online', 'پرداخت آنلاین بانک ملت'), ('cart-cart', 'کارت به کارت'), ('balance', 'استفاده از اعتبار حساب')], default='online', max_length=200, null=True, verbose_name='روش پرداخت'),
        ),
        migrations.RemoveField(
            model_name='product',
            name='category',
        ),
        migrations.AddField(
            model_name='product',
            name='category',
            field=models.ManyToManyField(null=True, to='shop.Category', verbose_name='دسته بندی'),
        ),
    ]
