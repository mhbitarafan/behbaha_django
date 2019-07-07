from django.db import models

# Create your models here.
class image(models.Model):
    id = models.AutoField(primary_key=True)
    title = models.CharField("عنوان", max_length=200, null=True)
    url = models.ImageField("تصویر", upload_to='images/%Y/%m/%d')
    class Meta:
        verbose_name = "تصویر"
        verbose_name_plural = "3. تصاویر"
    def __str__(self):
        return self.title

class Category(models.Model):
    id = models.AutoField(primary_key=True)
    title = models.CharField("دسته", max_length=200)
    parent = models.ForeignKey("self", verbose_name="دسته بندی اصلی", null=True, blank=True, on_delete=models.CASCADE)
    image = models.ImageField(upload_to='images/%Y/%m/%d', verbose_name="تصویر اصلی", null=True, blank=True)
    description = models.TextField("توضیحات", blank=True)
    class Meta:
        verbose_name = "دسته بندی"
        verbose_name_plural = "4. دسته بندی"
    def __str__(self):
        return self.title
class product(models.Model):
    id = models.AutoField(primary_key=True)
    created_at = models.DateTimeField(auto_now_add=True,null=True)
    updated_at = models.DateTimeField(auto_now=True,null=True)
    title = models.CharField("عنوان کالا", max_length=200)
    title = models.CharField("عنوان کالا", max_length=200)
    prices = models.TextField(verbose_name="رنج قیمت ها", blank=True)
    order_ranges = models.TextField(verbose_name="رنج سفارش", blank=True)
    max_order = models.CharField("سقف سفارش", blank=True, max_length=200)
    ordered_num = models.IntegerField("سفارش های ثبت شده",blank=True,null=True)
    deliver_at = models.DateField(null=True,verbose_name="تاریخ تحویل")
    featured_image = models.ImageField(upload_to='images/%Y/%m/%d', null=True, verbose_name="تصویر اصلی")
    category = models.ForeignKey(Category, verbose_name="دسته بندی", null=True, on_delete=models.CASCADE)
    # gallery = models.ManyToManyField(image, verbose_name="گالری تصاویر", blank=True)
    description = models.TextField("توضیحات", blank=True)
    class Meta:
        verbose_name = "محصول"
        verbose_name_plural = "1. محصولات"
    def __str__(self):
        return self.title

class order(models.Model):
    id = models.AutoField(primary_key=True)
    created_at = models.DateTimeField(auto_now_add=True,null=True)
    updated_at = models.DateTimeField(auto_now=True,null=True)
    title = models.CharField("عنوان کالا", max_length=200)
    price = models.CharField(verbose_name="قیمت", max_length=200, blank=True)
    amount = models.CharField(verbose_name="میزان سفارش", max_length=200, blank=True)
    # featured_image = models.ImageField(upload_to='images/%Y/%m/%d', null=True, verbose_name="تصویر اصلی")
    description = models.TextField("توضیحات سفارش", blank=True)
    class Meta:
        verbose_name = "سفارش"
        verbose_name_plural = "2. سفارشات"
    def __str__(self):
        return self.title     

class cart(models.Model):
    id = models.AutoField(primary_key=True)
    created_at = models.DateTimeField(auto_now_add=True,null=True, verbose_name="تاریخ ایجاد")
    updated_at = models.DateTimeField(auto_now=True,null=True)
    title = models.TextField("لیست کالاهای سفارش", max_length=200)
    price = models.TextField(verbose_name="لیست قیمت ها", max_length=200, blank=True)
    amount = models.TextField(verbose_name="لیست میزان سفارشات", max_length=200, blank=True)
    session_id = models.CharField(max_length=200, blank=True, null=True)
    class Meta:
        verbose_name = "سبد خرید"
        verbose_name_plural = "5. سبدهای خرید"
    def __str__(self):
        return self.title         