from django.db import models
from django.contrib.auth.models import User

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
    prices = models.TextField(verbose_name="محدوده قیمت ها", blank=True)
    base_price = models.IntegerField(verbose_name="قیمت پایه", null=True, blank=True)
    order_ranges = models.TextField(verbose_name="محدوده سفارش", blank=True)
    max_order = models.CharField("سقف سفارش", blank=True, max_length=200)
    ordered_num = models.IntegerField("سفارش های ثبت شده",default=0,blank=True,null=True)
    deliver_at = models.DateField(null=True,verbose_name="تاریخ تحویل")
    featured_image = models.ImageField(upload_to='images/%Y/%m/%d', null=True, verbose_name="تصویر اصلی")
    category = models.ManyToManyField(Category, verbose_name="دسته بندی")
    # gallery = models.ManyToManyField(image, verbose_name="گالری تصاویر", blank=True)
    description = models.TextField("توضیحات", blank=True)
    class Meta:
        verbose_name = "محصول"
        verbose_name_plural = "1. محصولات"

    def save(self, *args, **kwargs):
        prices = str(self.prices)
        prices_arr = prices.split('\n')
        self.base_price = prices_arr[0]
        super().save(*args, **kwargs)

    def __str__(self):
        return self.title

class customer(models.Model):
    id = models.AutoField(primary_key=True)
    user = models.OneToOneField(User, verbose_name="نام کاربری" , on_delete=models.CASCADE)
    first_name = models.CharField("نام", null=True, blank=False, max_length=200)
    last_name = models.CharField("نام خانوادگی", null=True, blank=False, max_length=200)
    address = models.TextField("آدرس", null=True, blank=False)
    state = models.CharField("استان", null=True, blank=False, max_length=200)
    city = models.CharField("شهر", null=True, blank=False, max_length=200)
    phone = models.CharField("تلفن", null=True, blank=False, max_length=200)
    mobile_phone = models.CharField("تلفن همراه", null=True, blank=True, max_length=200)
    zip_code = models.CharField("کد پستی", null=True, blank=False, max_length=200)
    class Meta:
        verbose_name = "مشتری"
        verbose_name_plural = "6. مشتریان"
    def __str__(self):
        return self.user.username

class order(models.Model):
    PAYMENT_CHOICES = [
        ('online', 'پرداخت آنلاین بانک ملت'),
        ('cart-cart', 'کارت به کارت'),
        ('balance', 'استفاده از اعتبار حساب'),
    ]
    DELIVERY_CHOICES = [
        ('free', 'ارسال رایگان'),
        ('tipax', 'تیپاکس'),
        ('post', 'پست'),
        ('fast-courier', 'پیک فوری'),
    ]
    PAY_STATUS = [
        ('paid', 'پرداخت شده'),
        ('notpaid', 'پرداخت نشده'),
    ]
    ORDER_STATUS = [
        ('proccessing', 'درحال بررسی'),
        ('complete', 'تکمیل شده'),
        ('cancelled', 'لغو شده'),
    ]
    id = models.AutoField(primary_key=True)
    created_at = models.DateTimeField(auto_now_add=True,null=True)
    updated_at = models.DateTimeField(auto_now=True,null=True)
    order_customer = models.ForeignKey(customer, verbose_name="نام مشتری", on_delete="models.CASCADE", null=True, blank=True)
    title = models.TextField("لیست کالاها",blank=True)
    price = models.TextField(verbose_name="لیست قیمت ها", max_length=200, blank=True)
    amount = models.TextField(verbose_name="لیست میزان سفارشات", max_length=200, blank=True)
    description = models.TextField("توضیحات سفارش", blank=True)
    first_name = models.CharField("نام", null=True, blank=False, max_length=200)
    last_name = models.CharField("نام خانوادگی", null=True, blank=False, max_length=200)
    address = models.TextField("آدرس", null=True, blank=False)
    state = models.CharField("استان", null=True, blank=False, max_length=200)
    city = models.CharField("شهر", null=True, blank=False, max_length=200)
    phone = models.CharField("تلفن", null=True, blank=False, max_length=200)
    mobile_phone = models.CharField("تلفن همراه", null=True, blank=True, max_length=200)
    zip_code = models.CharField("کد پستی", null=True, blank=False, max_length=200)
    payment_type = models.CharField('روش پرداخت', null=True, max_length=200, blank=False, choices=PAYMENT_CHOICES, default="online")
    delivery_type = models.CharField('روش ارسال', null=True, max_length=200, blank=False, choices=DELIVERY_CHOICES, default="post")
    is_paid = models.CharField("وضعیت پرداخت", max_length=200, null=True, blank=True, choices=PAY_STATUS, default="notpaid")
    order_status = models.CharField("وضعیت سفارش", max_length=200, null=True, blank=True, choices=ORDER_STATUS, default="proccessing")
    class Meta:
        verbose_name = "سفارش"
        verbose_name_plural = "2. سفارشات"
    def __str__(self):
        return self.title     

class cart(models.Model):
    id = models.AutoField(primary_key=True)
    created_at = models.DateTimeField(auto_now_add=True,null=True, verbose_name="تاریخ ایجاد")
    updated_at = models.DateTimeField(auto_now=True,null=True)
    title = models.TextField("لیست کالاها", max_length=200)
    price = models.TextField(verbose_name="لیست قیمت ها", max_length=200, blank=True)
    amount = models.TextField(verbose_name="لیست میزان سفارشات", max_length=200, blank=True)
    session_id = models.CharField(max_length=200, blank=True, null=True)
    cart_customer = models.OneToOneField(User, on_delete="models.CASCADE", null=True, blank=True)
    class Meta:
        verbose_name = "سبد خرید"
        verbose_name_plural = "5. سبدهای خرید"
    def __str__(self):
        return self.title                 