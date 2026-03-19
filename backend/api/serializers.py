from rest_framework import serializers
from .models import (
    AdminMessage, Event, FAQ, Gallery, News, 
    Sector, Project, GlobalSetting, Kebele
)


class AdminMessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = AdminMessage
        fields = '__all__'


class EventSerializer(serializers.ModelSerializer):
    class Meta:
        model = Event
        fields = '__all__'


class FAQSerializer(serializers.ModelSerializer):
    class Meta:
        model = FAQ
        fields = '__all__'


class GallerySerializer(serializers.ModelSerializer):
    class Meta:
        model = Gallery
        fields = '__all__'


class NewsSerializer(serializers.ModelSerializer):
    class Meta:
        model = News
        fields = '__all__'


class SectorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Sector
        fields = '__all__'




class ProjectSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Project
        fields = '__all__'


class GlobalSettingSerializer(serializers.ModelSerializer):
    class Meta:
        model = GlobalSetting
        fields = '__all__'


class KebeleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Kebele
        fields = '__all__'
