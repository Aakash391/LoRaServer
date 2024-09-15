from rest_framework import serializers
from .models import  location ,Device,riss,location2

class DeviceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Device
        fields = '__all__'
class locationSerializer(serializers.ModelSerializer):
    class Meta:
        model = location
        fields = '__all__'
class rissSerializer(serializers.ModelSerializer):
    class Meta:
        model = riss
        fields = '__all__'
class location2Serializer(serializers.ModelSerializer):
    class Meta:
        model = location2
        fields = '__all__'