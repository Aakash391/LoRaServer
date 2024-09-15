from django.contrib import admin
from .models import Device
from .models import location
from .models import riss
from .models import location2
# list of your bluetooth devices here.
admin.site.register(Device)
# admin.site.register(location)


class locationAdmin(admin.ModelAdmin):
    list_display = ('longitude', 'latitude', 'Riss', 'mode', 'Timed', 'identity', 'message')

admin.site.register(location,locationAdmin)
class rissAdmin(admin.ModelAdmin):
    list_display = ('riss_message',)
admin.site.register(riss,rissAdmin)
class location2Admin(admin.ModelAdmin):
    list_display = ('longitude', 'latitude')
admin.site.register(location2,location2Admin)