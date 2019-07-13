from .models import customer, order
from django import forms
from crispy_forms.helper import FormHelper
from crispy_forms.layout import Layout, Fieldset, ButtonHolder, Submit, Div, Row, Column
from crispy_forms.bootstrap import InlineRadios

class CustomerForm(forms.ModelForm):
    class Meta:
        model = customer
        fields = '__all__'
        # exclude = ['user']

class OrderForm(forms.ModelForm):
    class Meta:
        model = order
        fields = '__all__'