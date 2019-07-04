from django.db import models

# Create your models here.
class image(models.Model):
    id = models.AutoField(primary_key=True)
    title = models.CharField("عنوان", max_length=200, null=True)
    url = models.ImageField("تصویر", upload_to='images/%Y/%m/%d')
    class Meta:
        verbose_name = "تصویر"
        verbose_name_plural = "تصاویر"
    def __str__(self):
        return self.title

class product(models.Model):
    id = models.AutoField(primary_key=True)
    created_at = models.DateTimeField(auto_now_add=True,null=True)
    updated_at = models.DateTimeField(auto_now=True,null=True)
    title = models.CharField("عنوان کالا", max_length=200)
    prices = models.TextField(verbose_name="رنج قیمت ها", blank=True)
    order_ranges = models.TextField(verbose_name="رنج سفارش", blank=True)
    max_order = models.CharField("سقف سفارش", blank=True, max_length=200)
    deliver_at = models.DateField(null=True,verbose_name="تاریخ تحویل")
    featured_image = models.ImageField(upload_to='images/%Y/%m/%d', null=True, verbose_name="تصویر اصلی")
    # gallery = models.ManyToManyField(image, verbose_name="گالری تصاویر", blank=True)
    description = models.TextField("توضیحات", blank=True)
    class Meta:
        verbose_name = "محصول"
        verbose_name_plural = "محصولات"
    def __str__(self):
        return self.title

class order(models.Model):
    id = models.AutoField(primary_key=True)
    created_at = models.DateTimeField(auto_now_add=True,null=True)
    updated_at = models.DateTimeField(auto_now=True,null=True)
    title = models.CharField("عنوان کالا", max_length=200)
    price = models.TextField(verbose_name="رنج قیمت ها", blank=True)
    amount = models.TextField(verbose_name="میزان سفارش", blank=True)
    # featured_image = models.ImageField(upload_to='images/%Y/%m/%d', null=True, verbose_name="تصویر اصلی")
    description = models.TextField("توضیحات سفارش", blank=True)
    class Meta:
        verbose_name = "سفارش"
        verbose_name_plural = "سفارشات"
    def __str__(self):
        return self.title        