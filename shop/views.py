from django.shortcuts import render
from .models import product
# Create your views here.

def index(request):
    products = product.objects.all()
    context = {'products': products,}
    return render(request, 'index.html', context)