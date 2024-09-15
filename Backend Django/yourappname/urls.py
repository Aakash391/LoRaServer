
from django.urls import path
from yourappname import views
from .views import TodoGetDevice, TodoUpdateDeleteDevice
from .views import locationGetDevice, locationUpdateDeleteDevice
from .views import tododevice
from .views import tododevice2
from .views import Riss
from .views import GetRowsView, GetNRowsView

urlpatterns = [
    path('hello/', views.hello, name='hello'),
    path("contact/", views.contact, name='contact'),
    path('devicegetdata_view/', TodoGetDevice.as_view()), #correct working api
    path('devicegetdata<int:pk>/', TodoUpdateDeleteDevice.as_view()), #correct working api    
    path('locationgetdata/', locationGetDevice.as_view()),
    path('locationgetdata<int:pk>/', locationUpdateDeleteDevice.as_view()),
    path('tododevicelocation/', tododevice),
    path('riss/', Riss ), #correct working api
    path('tododevicelocation2/', tododevice2),
    path('getRows/', GetRowsView.as_view(), name='getRows'),
    path('getNRows/', GetNRowsView.as_view(), name='getNrows')
]