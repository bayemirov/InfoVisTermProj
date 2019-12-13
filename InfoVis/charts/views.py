from django.shortcuts import render
from django.http import HttpResponse


def index(request):
    return render(request, 'charts/index.html')

def prox_chart(request):
    return render(request, 'charts/view.html')

def energy_chart(request):
    return render(request, 'charts/line_chart.html')

def zone_change(request):
    return render(request, 'charts/bubble_chart.html')
