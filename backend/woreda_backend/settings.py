import os
from pathlib import Path
from dotenv import load_dotenv

# Apply Python 3.14 compatibility patches BEFORE importing Django
try:
    from . import patches
except ImportError:
    pass

load_dotenv()

BASE_DIR = Path(__file__).resolve().parent.parent

SECRET_KEY = os.getenv('SECRET_KEY', 'django-insecure-change-this-in-production')
DEBUG = os.getenv('DEBUG', 'True') == 'True'
ALLOWED_HOSTS = os.getenv('ALLOWED_HOSTS', 'localhost,127.0.0.1').split(',')

INSTALLED_APPS = [
    'unfold',  # Django Unfold - now with Python 3.14 patch
    'unfold.contrib.filters',
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'modeltranslation',  # Must be after django.contrib.admin
    'rest_framework',
    'corsheaders',
    'ckeditor',
    'django_filters',
    'api',
]

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'corsheaders.middleware.CorsMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.locale.LocaleMiddleware',  # Language middleware
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'woreda_backend.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [BASE_DIR.parent / 'frontend' / 'dist'],  # Add React build directory
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'woreda_backend.wsgi.application'

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': BASE_DIR / 'db.sqlite3',
    }
}

AUTH_PASSWORD_VALIDATORS = [
    {'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator'},
    {'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator'},
    {'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator'},
    {'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator'},
]

LANGUAGE_CODE = 'en'
TIME_ZONE = 'Africa/Addis_Ababa'
USE_I18N = True
USE_TZ = True

# Multilingual support - English and Oromo
from django.utils.translation import gettext_lazy as _
from django.conf.locale import LANG_INFO

# Register Oromo language with Django
LANG_INFO['om'] = {
    'bidi': False,
    'code': 'om',
    'name': 'Oromo',
    'name_local': 'Afaan Oromoo',
}

LANGUAGES = (
    ('en', 'EN'),
    ('om', 'OR'),
)

MODELTRANSLATION_DEFAULT_LANGUAGE = 'en'
MODELTRANSLATION_LANGUAGES = ('en', 'om')
MODELTRANSLATION_FALLBACK_LANGUAGES = ('en',)

LOCALE_PATHS = [
    BASE_DIR / 'locale',
]

STATIC_URL = 'static/'
STATIC_ROOT = BASE_DIR / 'staticfiles'

# React frontend static files
frontend_assets = BASE_DIR.parent / 'frontend' / 'dist' / 'assets'
STATICFILES_DIRS = [frontend_assets] if frontend_assets.exists() else []

MEDIA_URL = 'media/'
MEDIA_ROOT = BASE_DIR / 'media'

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'

# CORS Settings
CORS_ALLOWED_ORIGINS = os.getenv('CORS_ALLOWED_ORIGINS', 'http://localhost:3000').split(',')
CORS_ALLOW_CREDENTIALS = True

# CSRF Settings
CSRF_TRUSTED_ORIGINS = os.getenv('CSRF_TRUSTED_ORIGINS', 'http://localhost:3000,http://127.0.0.1:3000').split(',')
CSRF_COOKIE_DOMAIN = None  # Ensure cookies work on localhost
CSRF_COOKIE_HTTPONLY = False  # Normal for CSRF

# Proxy Settings (for Vite proxy)
USE_X_FORWARDED_HOST = True
SECURE_PROXY_SSL_HEADER = None  # No SSL on localhost

# Upload Settings
DATA_UPLOAD_MAX_MEMORY_SIZE = 10485760  # 10MB
FILE_UPLOAD_MAX_MEMORY_SIZE = 10485760  # 10MB

# REST Framework Settings
REST_FRAMEWORK = {
    'DEFAULT_PAGINATION_CLASS': 'rest_framework.pagination.PageNumberPagination',
    'PAGE_SIZE': 100,
    'DEFAULT_FILTER_BACKENDS': ['django_filters.rest_framework.DjangoFilterBackend'],
    'DEFAULT_PERMISSION_CLASSES': [
        'rest_framework.permissions.IsAuthenticatedOrReadOnly',
    ],
}

# CKEditor Settings
CKEDITOR_CONFIGS = {
    'default': {
        'toolbar': 'full',
        'height': 300,
        'width': '100%',
    },
}


# Django Unfold Configuration
from django.templatetags.static import static
from django.urls import reverse_lazy
from django.utils.translation import gettext_lazy as _

UNFOLD = {
    "SITE_TITLE": "Abune Ginde Beret Woreda",
    "SITE_HEADER": "Abune Ginde Beret Woreda Administration",
    "SITE_URL": "/",

    "SITE_SYMBOL": "🏛️",  # Woreda symbol
    "SHOW_HISTORY": True,
    "SHOW_VIEW_ON_SITE": True,
    "ENVIRONMENT": "woreda_backend.settings.environment_callback",
    "DASHBOARD_CALLBACK": "woreda_backend.settings.dashboard_callback",
    "COLORS": {
        "primary": {
            "50": "239 246 255",
            "100": "219 234 254",
            "200": "191 219 254",
            "300": "147 197 253",
            "400": "96 165 250",
            "500": "59 130 246",
            "600": "37 99 235",
            "700": "29 78 216",
            "800": "30 64 175",
            "900": "30 58 138",
            "950": "23 37 84",
        },
    },
    "EXTENSIONS": {
        "modeltranslation": {
            "flags": {
            },
        },
    },
    "SIDEBAR": {
        "show_search": True,
        "show_all_applications": True,
        "navigation": [
            {
                "title": _("Dashboard"),
                "separator": False,
                "items": [
                    {
                        "title": _("Dashboard"),
                        "icon": "dashboard",
                        "link": reverse_lazy("admin:index"),
                    },
                ],
            },
            {
                "title": _("Content Management"),
                "separator": True,
                "items": [
                    {
                        "title": _("News"),
                        "icon": "newspaper",
                        "link": reverse_lazy("admin:api_news_changelist"),
                    },
                    {
                        "title": _("Events"),
                        "icon": "event",
                        "link": reverse_lazy("admin:api_event_changelist"),
                    },
                    {
                        "title": _("Gallery"),
                        "icon": "photo_library",
                        "link": reverse_lazy("admin:api_gallery_changelist"),
                    },
                    {
                        "title": _("FAQs"),
                        "icon": "help",
                        "link": reverse_lazy("admin:api_faq_changelist"),
                    },
                ],
            },
            {
                "title": _("Woreda Information"),
                "separator": True,
                "items": [
                    {
                        "title": _("Sectors"),
                        "icon": "business",
                        "link": reverse_lazy("admin:api_sector_changelist"),
                    },
                    {
                        "title": _("Kebeles"),
                        "icon": "location_city",
                        "link": reverse_lazy("admin:api_kebele_changelist"),
                    },
                    {
                        "title": _("Projects"),
                        "icon": "construction",
                        "link": reverse_lazy("admin:api_project_changelist"),
                    },
                ],
            },
            {
                "title": _("Settings"),
                "separator": True,
                "items": [
                    {
                        "title": _("Admin Message"),
                        "icon": "message",
                        "link": reverse_lazy("admin:api_adminmessage_changelist"),
                    },
                    {
                        "title": _("Global Settings"),
                        "icon": "settings",
                        "link": reverse_lazy("admin:api_globalsetting_changelist"),
                    },
                ],
            },
            {
                "title": _("User Management"),
                "separator": True,
                "items": [
                    {
                        "title": _("Users"),
                        "icon": "people",
                        "link": reverse_lazy("admin:auth_user_changelist"),
                    },
                    {
                        "title": _("Groups"),
                        "icon": "group",
                        "link": reverse_lazy("admin:auth_group_changelist"),
                    },
                ],
            },
        ],
    },
}


def environment_callback(request):
    """Display environment badge in admin"""
    return ["Development", "warning"]  # ["label", "color"]


def dashboard_callback(request, context):
    """Customize dashboard"""
    return context
