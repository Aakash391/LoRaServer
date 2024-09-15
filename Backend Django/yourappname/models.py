from django.db import models

class location(models.Model):
    longitude = models.CharField(max_length=100)  
    latitude = models.CharField(max_length=100)
    Riss = models.CharField(max_length=100 ,default="00")  
    mode = models.CharField(max_length=100 ,default="0")
    Timed = models.CharField(max_length=100,default="0" )
    identity = models.CharField(max_length=100 , default="0") 
    message = models.CharField(max_length=100 , default="0")


class Device(models.Model):
    name_device = models.CharField(max_length=100)
    longitude = models.FloatField(default=0.0)
    latitude = models.FloatField(default=0.0)
    strength = models.IntegerField()
    time = models.DateTimeField(auto_now_add=True)
    location = models.ForeignKey(location, on_delete=models.CASCADE)

class riss(models.Model):
    riss_message = models.CharField(max_length=100)
    # riss2 = models.CharField(max_length=100)

class location2(models.Model):
    longitude = models.CharField(max_length=100 ,default="-123")  
    latitude = models.CharField(max_length=100 , default="0")
