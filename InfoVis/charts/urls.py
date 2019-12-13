from django.urls import path

from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('prox_chart', views.prox_chart, name='prox_chart'),
    path('energy_chart', views.energy_chart, name='energy_chart'),
    path('zone_change', views.zone_change, name='zone_change'),
]
