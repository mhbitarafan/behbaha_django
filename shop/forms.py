from .models import customer, order
from django import forms
from crispy_forms.helper import FormHelper
from crispy_forms.layout import Layout, Fieldset, ButtonHolder, Submit, Div, Row, Column
from crispy_forms.bootstrap import InlineRadios

class CustomerForm(forms.ModelForm):
    class Meta:
        model = customer
        exclude = ['user']

class OrderForm(forms.ModelForm):
    def __init__(self, *args, **kwargs):
        super(OrderForm, self).__init__(*args, **kwargs)
        self.helper = FormHelper(self)
        self.helper.layout.append(Submit('save', 'save'))
        self.helper.layout = Layout(
            Row('first_name', css_class='form-group col-md-6 mb-0')
        )     

    class Meta:
        model = order
        exclude = ['user']           