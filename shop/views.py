from django.shortcuts import render, redirect
from django.http import HttpResponse
from .models import product, order, cart
from .forms import *
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.forms import UserCreationForm
from django.urls import reverse_lazy
from django.views import generic
import json
from persiantools import digits
import logging
logger = logging.getLogger(__name__)
# Create your views here.

def to_fa(value):
    num = int(value)
    a = f'{num:,}'
    return digits.en_to_fa(a)

def to_en(value):
    num = value.replace(',', '')
    return int(digits.fa_to_en(num))

def index(request):
    # products = product.objects.all()
    # context = {'products': products,}
    if not request.session.session_key:
        request.session.save()    
    if request.is_ajax():
        return render(request, 'index-ajax.html')    
    return render(request, 'index.html')

def product_cat(request, cat):
    # products = product.objects.filter(category__title=cat)
    # context = {'products': products, 'cat': cat}
    if not request.session.session_key:
        request.session.save()
    return render(request, 'index.html')

def search(request):
    search_term = request.GET['s']
    products = product.objects.filter(title__contains=search_term)
    context = {'products': products,}
    return render(request, 'index.html', context)

def calc_price(prices, amount):
    prices_arr = prices.split('\n')
    return int(prices_arr[0])

def update_cart(title, amount, price, s_id, user_id):
    if user_id != None:
        cart_data = cart.objects.get(cart_customer_id=user_id)
    else:
        cart_data = cart.objects.get(session_id=s_id)
    c_titles = cart_data.title
    c_titles_arr = c_titles.split('\n')
    c_prices = cart_data.price
    c_prices_arr = c_prices.split('\n')
    c_amounts = cart_data.amount
    c_amounts_arr = c_amounts.split('\n')
    had_title = False    
    for i, c_title in enumerate(c_titles_arr):
        if title == c_title:
           c_amounts_arr[i] = amount
           had_title = True
    if had_title:
        c_titles = "\n".join(c_titles_arr) 
        c_amounts = "\n".join(c_amounts_arr)    
    else:
        c_titles_arr.append(title)   
        c_prices_arr.append(str(price))   
        c_amounts_arr.append(amount)   
        c_titles = "\n".join(c_titles_arr)
        c_prices = "\n".join(c_prices_arr)
        c_amounts = "\n".join(c_amounts_arr)
    return {
        'title': c_titles,
        'price': c_prices,
        'order_amount': c_amounts,
    }

def add_to_cart(request):
    if request.method == 'GET':
        ordered_product = product.objects.get(title=request.GET['title'])
        # order_ranges = ordered_product.order_ranges
        prices = ordered_product.prices
        # current_numberof_orders = 
        cdata = {
            'title': request.GET['title'],
            'order_amount': request.GET['order_amount']
        }
        price = calc_price(prices, cdata['order_amount'])
        price = to_fa(price)
        if not request.session.session_key:
            request.session.save()
        s_id = request.session.session_key
        user_id = request.user.id
        query_s_id = cart.objects.filter(session_id=s_id)
        if(user_id != None):
            query_user_id = cart.objects.filter(cart_customer_id=user_id)
            if query_user_id.exists():
                u_data = update_cart(cdata['title'], cdata['order_amount'], price, s_id, user_id)
                cart_instance = cart.objects.filter(cart_customer_id=user_id).update(title=u_data['title'], amount=u_data['order_amount'], price=u_data['price'], session_id=s_id, cart_customer_id=user_id)
            else:    
                cart_instance = cart.objects.create(title=cdata['title'], amount=cdata['order_amount'], price=price, session_id=s_id, cart_customer_id=user_id)
            return HttpResponse('')
        if query_s_id.exists():
            u_data = update_cart(cdata['title'], cdata['order_amount'], price, s_id, user_id)
            cart_instance = cart.objects.filter(cart_customer_id=user_id).update(title=u_data['title'], amount=u_data['order_amount'], price=u_data['price'], session_id=s_id)
        else:
            cart_instance = cart.objects.create(title=cdata['title'], amount=cdata['order_amount'], price=price, session_id=s_id)
        return HttpResponse('')

def cart_update(request):
    if request.method == 'GET':
        cart_amounts = request.GET['cart_amounts']
        cart_amounts = cart_amounts.replace(',', '\n')
        s_id = request.session.session_key
        user_id = request.user.id
        if user_id == None:
            cart_instance = cart.objects.filter(session_id=s_id)
            if cart_instance.exists():
                cart_instance = cart.objects.filter(session_id=s_id).update(amount=cart_amounts)
        else:
            cart_instance = cart.objects.filter(cart_customer_id=user_id)    
            if cart_instance.exists():
                cart_instance = cart.objects.filter(cart_customer_id=user_id).update(amount=cart_amounts)
    return HttpResponse('success')

@csrf_exempt
def cart_page(request):
    s_id = request.session.session_key
    user_id = request.user.id
    if user_id != None:
        try:
            customer_instance = customer.objects.get(user_id=user_id)
            customer_id = customer_instance.id
            form = CustomerForm(instance=customer_instance)
        except customer.DoesNotExist:
            customer_id = ''
            form = CustomerForm()
        form2 = OrderForm()
        try:
            cdata = cart.objects.get(cart_customer_id=user_id)
        except cart.DoesNotExist:
            try:
                cdata = cart.objects.get(session_id=s_id)
            except cart.DoesNotExist:
                cdata = ''
    else:
        customer_id = ''
        form = CustomerForm()
        form2 = OrderForm()
        try:
            cdata = cart.objects.get(session_id=s_id)
        except cart.DoesNotExist:
            cdata = ''
    if cdata != '':
        c_titles = cdata.title.split('\n')
        c_prices = cdata.price.split('\n')
        c_amounts = cdata.amount.split('\n')
        c_data = []
        for i,item in enumerate(c_titles):
            c_data.append({
            "title": c_titles[i],
            "price": c_prices[i],
            "price_all": to_fa(to_en(c_prices[i])*to_en(c_amounts[i])),
            "amount": c_amounts[i],})         
    else:
        c_data = ''    
    context = {'c_data': c_data, 'form': form, 'form2': form2, 'customer_id': customer_id}

    if request.method == 'POST':
        return HttpResponse(json.dumps(c_data))
    if request.method == 'GET':
        if request.is_ajax():
            return render(request, 'cart-ajax.html', context)
        return render(request, 'cart.html', context)
@csrf_exempt
def submit_order(request):
    user_id = request.user.id
    s_id = request.session.session_key
    request.POST = request.POST.copy()
    if user_id != None:
        try:
            customer_instance = customer.objects.get(user_id=user_id)
        except customer.DoesNotExist:
            if request.method == 'POST':
                form = CustomerForm(request.POST)
                if form.is_valid:
                    form.save()
                    customer_instance = customer.objects.get(user_id=user_id)
                    request.POST['order_customer'] = customer_instance.id
        cart_instance = cart.objects.get(cart_customer_id=user_id)
    else:    
        cart_instance = cart.objects.get(session_id=s_id)
    request.POST['price'] = cart_instance.price
    request.POST['title'] = request.POST['title'].replace(',', '\n')
    request.POST['amount'] = request.POST['amount'].replace(',', '\n')
    amounts = request.POST['amount'].split('\n')
    titles = request.POST['title'].split('\n')
    for i, title in enumerate(titles):
        product_instance = product.objects.get(title=title)
        orderednumber = product_instance.ordered_num + to_en(amounts[i])
        product.objects.filter(title=title).update(ordered_num = orderednumber)
    if request.method == 'POST':
        form = OrderForm(request.POST)
        if form.is_valid:
            form.save()
            cart_instance.delete()
    return redirect('/')

def update_customer_info(request):
    user_id = request.user.id
    user_instance = customer.objects.get(id=user_id)
    if request.method == 'POST':
        form = CustomerForm(request.POST, instance=user_instance)
        if form.is_valid:
            form.save()
    return HttpResponse('')
    
class signup(generic.CreateView):
    form_class = UserCreationForm
    success_url = reverse_lazy('login')
    def get(self, request):
        if self.request.is_ajax():
            return render(request, 'signup_ajax.html', {'form': self.form_class})      
        return render(request, 'signup.html', {'form': self.form_class})

def manage_account(request):
    user_id = request.user.id
    try:
        user_instance = customer.objects.get(user_id=user_id)
        form = CustomerForm(instance=user_instance)
        if request.method == 'POST':
            request.POST = request.POST.copy()
            form = CustomerForm(request.POST, instance=user_instance)
            if form.is_valid:
                form.save()
    except customer.DoesNotExist:
        form = CustomerForm()
        if request.method == 'POST':
            form = CustomerForm(request.POST)
            if form.is_valid:
                form.save()
    if request.is_ajax():  
        return render(request, 'manage_account_ajax.html', {'form': form})          
    return render(request, 'manage_account.html', {'form': form})