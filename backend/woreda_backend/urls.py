from django.contrib import admin
from django.urls import path, include, re_path
from django.conf import settings
from django.conf.urls.static import static
from django.views.static import serve
from .views import IndexView

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('api.urls')),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

# Serve React static assets and frontend (must be last)
urlpatterns += [
    # Serve React static assets
    re_path(r'^assets/(?P<path>.*)$', serve, {
        'document_root': settings.BASE_DIR.parent / 'frontend' / 'dist' / 'assets',
    }),
    # Serve React frontend for all other routes except admin, api, static, and media
    re_path(r'^(?!admin|api|static|media).*$', IndexView.as_view(), name='index'),
]
