from django.shortcuts import render
from .models import product
# Create your views here.

def index(request):
    products = product.objects.all()
    context = {'products': products,}
    return render(request, 'index.html', context)

def cart(request):
    if request.method == 'GET':
        cdata = {
            'title': request.GET['title'],
            'order_amount': request.GET['order_amount']
        }
        context = {'cdata': cdata,}
    return render(request, 'cart.html', context)