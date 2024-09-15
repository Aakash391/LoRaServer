from django.shortcuts import render
from django.http import HttpResponse 
from rest_framework.response import Response
from .serializers import locationSerializer, DeviceSerializer, rissSerializer, location2Serializer
from .models import Device, location, location2, riss
from rest_framework import generics, status
from rest_framework.decorators import api_view
from django.http import JsonResponse
from django.views import View

def hello(request):
    return HttpResponse("Hello, world. You're at the polls index.")

def contact(request):
    return HttpResponse("Contact page")
        
def getRecentNRows(request):
    n = 100
    if(request.method == 'GET'):
        recent_locations = location.objects.all().values('latitude', 'longitude')[:n]
        data = list(recent_locations)
        return JsonResponse(data, safe=False)
    
@api_view(['POST', 'GET'])
def tododevice(request):
    if request.method == 'POST':
        location_data = {
            'longitude': request.data.get('longitude'),
            'latitude': request.data.get('latitude'),
            'Riss': request.data.get('Riss'),
            'mode': request.data.get('mode'),
            'Timed': request.data.get('Timed'),
            'identity': request.data.get('identity'),
            'message': request.data.get('message')
        }
        location_serializer = locationSerializer(data=location_data)
        if location_serializer.is_valid():
            location_serializer.save()
            return Response({"message": "Location data added successfully"}, status=status.HTTP_201_CREATED)
        else:
            return Response(location_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    elif request.method == 'GET':
        locations = location.objects.all()
        location_serializer = locationSerializer(locations, many=True)
        return Response(location_serializer.data, status=status.HTTP_200_OK)


# API view for handling location2 data
@api_view(['POST', 'GET'])
def tododevice2(request):
    if request.method == 'POST':
        device_data = {
            'longitude': request.data.get('longitude'),
            'latitude': request.data.get('latitude'),
        }
        device_serializer = location2Serializer(data=device_data)  # Use the correct serializer
        if device_serializer.is_valid():
            device_serializer.save()  # This will create a new entry even if data is duplicated
            return Response({"message": "Device data added successfully"}, status=status.HTTP_201_CREATED)
        else:
            return Response(device_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    elif request.method == 'GET':
        locations = location2.objects.all()
        location_serializer = location2Serializer(locations, many=True)
        return Response(location_serializer.data, status=status.HTTP_200_OK)


@api_view(['POST', 'GET'])
def Riss(request):
    if request.method == 'POST':
        riss_data = {
            'riss_message': request.data.get('riss_message'),
        }
        riss_serializer = rissSerializer(data=riss_data)
        if riss_serializer.is_valid():
            riss_serializer.save()
            return Response({"message": "Riss data added successfully"}, status=status.HTTP_201_CREATED)
        else:
            return Response(riss_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    elif request.method == 'GET':
        riss_data = riss.objects.all()
        riss_serializer = rissSerializer(riss_data, many=True)
        return Response(riss_serializer.data, status=status.HTTP_200_OK)


class Risse(generics.ListCreateAPIView):
    queryset = riss.objects.all()
    serializer_class = rissSerializer

class TodoGetDevice(generics.ListCreateAPIView):
    queryset = Device.objects.all()
    serializer_class = DeviceSerializer

class TodoUpdateDeleteDevice(generics.RetrieveUpdateDestroyAPIView):
    queryset = Device.objects.all()
    serializer_class = DeviceSerializer

class locationGetDevice(generics.ListCreateAPIView):
    queryset = location.objects.all()
    serializer_class = locationSerializer

class locationUpdateDeleteDevice(generics.RetrieveUpdateDestroyAPIView):
    queryset = location.objects.all()
    serializer_class = locationSerializer

# Class-based view for listing and creating location2 data
class location2GetDevice(generics.ListCreateAPIView):
    queryset = location2.objects.all()
    serializer_class = location2Serializer

class GetRowsView(View):
    def get(self, request):
        if request.method == 'GET':
            count = location.objects.count()
            return JsonResponse({'count': count})
        
class GetNRowsView(View):
    def get(self, request):
        n = int(request.GET.get('n', 10))
        if(request.method == 'GET'):
            recent_locations = location.objects.all().values('latitude', 'longitude')[:n]
            data = list(recent_locations)
            return JsonResponse(data, safe=False)