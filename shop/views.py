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

def calc_price(order_ranges, prices, amount):
    o_ranges_arr = order_ranges.split('\n')
    prices_arr = prices.split('\n')
    for i, item in enumerate(o_ranges_arr):
        range = item.split(' ')
        range = range[0].split('-')
        min = range[0]
        max = range[1]
        logger.error(max)
        if amount < max and amount >= min:
            # return prices_arr[i]
            pass

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
        price = calc_price(order_ranges, prices, cdata['order_amount'])
        s_id = request.session.session_key
        # cart_instance = cart.objects.create(title=cdata['title'], amount=cdata['order_amount'], price='', session_id=s_id)
    return HttpResponse(price)