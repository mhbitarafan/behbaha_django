from django.db import models

# Create your models here.

class price_ranges(models.Model):
    id = models.AutoField(primary_key=True)
    price = models.CharField(verbose_name="قیمت", max_length=50, blank=True)
    order_range = models.TextField("رنج سفارش")
    class Meta:
        verbose_name = "رنج قیمت"
        verbose_name_plural = "رنج قیمت"
    def __str__(self):
        return '%s سفارش %s تومان' % (self.order_range, self.price)

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
    title = models.CharField("عنوان", max_length=200)
    prices = models.ManyToManyField(price_ranges, verbose_name="رنج قیمت ها",)
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