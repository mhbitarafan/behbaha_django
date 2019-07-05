from django.shortcuts import render
from django.http import HttpResponse
from .models import product, order, cart
# Create your views here.

def index(request):
    products = product.objects.all()
    context = {'products': products,}
    return render(request, 'index.html', context)

def cart_process(request):
    if request.method == 'GET':
        cdata = {
            'title': request.GET['title'],
            'order_amount': request.GET['order_amount']
        }
        cart_instance = cart.objects.create(title=cdata['title'], amount=cdata['order_amount'])
    return HttpResponse(cart_instance)