from django import template
from datetime import date, timedelta
import jdatetime
from persiantools import digits
import locale

register = template.Library()

@register.filter
def calc_time_remining(value):
    delivery_date = jdatetime.datetime.fromgregorian(date=value)
    t_remaining = delivery_date - jdatetime.datetime.now()
    t_remaining = t_remaining.days
    if(t_remaining == 0):
        return "%s" % ("تا پایان امروز")
    elif(t_remaining > 0):
        return "%s %s" % (t_remaining, "روز دیگر")
    else:
        return "%s" % ("به اتمام رسید")

@register.filter
def to_fa(value):
    num = int(value)
    a = f'{num:,}'
    return digits.en_to_fa(a)

@register.filter
def multiply(value, arg):
    return value * arg