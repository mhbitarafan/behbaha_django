from django.shortcuts import render
from django.http import HttpResponse
from .models import product, order, cart
import logging
logger = logging.getLogger(__name__)
# Create your views here.

def index(request):
    products = product.objects.all()
    context = {'products': products,}
    return render(request, 'index.html', context)

def search(request):
    search_term = request.GET['s']
    products = product.objects.filter(title__contains=search_term)
    context = {'products': products,}
    return render(request, 'index.html', context)

def calc_price(prices, amount):
    prices_arr = prices.split('\n')
    return int(prices_arr[0])

def update_cart(title, amount, price, s_id):
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

def cart_process(request):
    if request.method == 'GET':
        ordered_product = product.objects.get(title=request.GET['title'])
        order_ranges = ordered_product.order_ranges
        prices = ordered_product.prices
        # current_numberof_orders = 
        cdata = {
            'title': request.GET['title'],
            'order_amount': request.GET['order_amount']
        }
        price = calc_price(prices, cdata['order_amount'])
        s_id = request.session.session_key
        query_s_id = cart.objects.filter(session_id=s_id)
        if query_s_id.exists():
            u_data = update_cart(cdata['title'], cdata['order_amount'], price, s_id)
            cart_instance = cart.objects.filter(session_id=s_id).update(title=u_data['title'], amount=u_data['order_amount'], price=u_data['price'])
        else:
            cart_instance = cart.objects.create(title=cdata['title'], amount=cdata['order_amount'], price=price, session_id=s_id)
    return HttpResponse(u_data)

def cart_page(request):
    s_id = request.session.session_key
    cdata = cart.objects.get(session_id=s_id)
    c_titles = cdata.title.split('\n')
    c_prices = cdata.price.split('\n')
    c_amounts = cdata.amount.split('\n')
    c_data = []
    for i,item in enumerate(c_titles):
        c_data.append({
        "title": c_titles[i],
        "price": c_prices[i],
        "price_all": str(int(c_prices[i])*int(c_amounts[i])),
        "amount": c_amounts[i],})
    context = {'c_data': c_data}
    return render(request, 'cart.html', context)