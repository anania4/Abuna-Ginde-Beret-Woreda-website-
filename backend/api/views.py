from rest_framework import viewsets, filters
from django_filters.rest_framework import DjangoFilterBackend
from .models import (
    AdminMessage, Event, FAQ, Gallery, News,
    Sector, Project, GlobalSetting, Kebele
)
from .serializers import (
    AdminMessageSerializer, EventSerializer, FAQSerializer,
    GallerySerializer, NewsSerializer, SectorSerializer,
    ProjectSerializer, GlobalSettingSerializer,
    KebeleSerializer
)


class PublishedFilterMixin:
    """Mixin to filter only published items for non-admin users"""
    def get_queryset(self):
        queryset = super().get_queryset()
        if not self.request.user.is_staff:
            queryset = queryset.filter(published=True)
        return queryset


class AdminMessageViewSet(PublishedFilterMixin, viewsets.ModelViewSet):
    queryset = AdminMessage.objects.all()
    serializer_class = AdminMessageSerializer


class EventViewSet(PublishedFilterMixin, viewsets.ModelViewSet):
    queryset = Event.objects.all()
    serializer_class = EventSerializer
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['category', 'status']
    search_fields = ['title', 'description', 'location']
    ordering_fields = ['event_date', 'created_at']


class FAQViewSet(PublishedFilterMixin, viewsets.ModelViewSet):
    queryset = FAQ.objects.all()
    serializer_class = FAQSerializer
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['question', 'answer']
    ordering_fields = ['order', 'created_at']


class GalleryViewSet(PublishedFilterMixin, viewsets.ModelViewSet):
    queryset = Gallery.objects.all()
    serializer_class = GallerySerializer
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['category']
    search_fields = ['title', 'description']
    ordering_fields = ['order', 'created_at']


class NewsViewSet(PublishedFilterMixin, viewsets.ModelViewSet):
    queryset = News.objects.all()
    serializer_class = NewsSerializer
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['category']
    search_fields = ['title', 'content']
    ordering_fields = ['date', 'created_at']


class SectorViewSet(PublishedFilterMixin, viewsets.ModelViewSet):
    queryset = Sector.objects.all()
    serializer_class = SectorSerializer
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['category']
    search_fields = ['name', 'description']
    ordering_fields = ['order', 'name']


class ProjectViewSet(PublishedFilterMixin, viewsets.ModelViewSet):
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['category', 'status']
    search_fields = ['title', 'description']
    ordering_fields = ['created_at', 'percent']




class GlobalSettingViewSet(PublishedFilterMixin, viewsets.ModelViewSet):
    queryset = GlobalSetting.objects.all()
    serializer_class = GlobalSettingSerializer


class KebeleViewSet(PublishedFilterMixin, viewsets.ModelViewSet):
    queryset = Kebele.objects.all()
    serializer_class = KebeleSerializer
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['type', 'is_capital']
    search_fields = ['name', 'description']
    ordering_fields = ['name', 'population']
