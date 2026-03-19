from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    AdminMessageViewSet, EventViewSet, FAQViewSet,
    GalleryViewSet, NewsViewSet, SectorViewSet,
    ProjectViewSet, GlobalSettingViewSet,
    KebeleViewSet
)

router = DefaultRouter()
router.register(r'admin-messages', AdminMessageViewSet, basename='admin-message')
router.register(r'events', EventViewSet, basename='event')
router.register(r'faqs', FAQViewSet, basename='faq')
router.register(r'galleries', GalleryViewSet, basename='gallery')
router.register(r'news', NewsViewSet, basename='news')
router.register(r'sectors', SectorViewSet, basename='sector')
router.register(r'projects', ProjectViewSet, basename='project')
router.register(r'global-settings', GlobalSettingViewSet, basename='global-setting')
router.register(r'kebeles', KebeleViewSet, basename='kebele')

urlpatterns = [
    path('', include(router.urls)),
]
