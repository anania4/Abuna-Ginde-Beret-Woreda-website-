from django.contrib import admin
from unfold.admin import ModelAdmin
from .models import (
    AdminMessage, Event, FAQ, Gallery, News,
    Sector, Project, GlobalSetting, Kebele
)


def get_translation_fieldsets(fields, model_name, extra_fields=None):
    """Helper to create fieldsets for translated fields and common metadata"""
    localized_fields = []
    base_fields = []
    for field in fields:
        localized_fields.extend([f"{field}_en", f"{field}_om"])
        base_fields.append(field)
    
    fieldsets = [
        ("Translations (EN/OR)", {
            "fields": localized_fields,
        })
    ]
    
    if extra_fields:
        fieldsets.append(("Media & Meta", {
            "fields": extra_fields,
        }))
        
    fieldsets.append(("Base Fields (System Only)", {
        "classes": ["collapse"],
        "fields": base_fields,
    }))
    
    return fieldsets


@admin.register(AdminMessage)
class AdminMessageAdmin(ModelAdmin):
    list_display = ['title', 'administrator_name', 'published', 'updated_at']
    list_filter = ['published']
    list_editable = ['published']
    search_fields = ['title', 'administrator_name', 'message']
    fieldsets = get_translation_fieldsets(
        ['title', 'message', 'administrator_name', 'role'], 
        'AdminMessage',
        extra_fields=['image', 'published']
    )
    
    class Media:
        js = ('admin/js/auto_submit.js',)
    
    def has_add_permission(self, request):
        return not AdminMessage.objects.exists()


@admin.register(Event)
class EventAdmin(ModelAdmin):
    list_display = ['title', 'event_date', 'location', 'category', 'status', 'published']
    list_filter = ['category', 'status', 'published', 'event_date']
    list_editable = ['published']
    search_fields = ['title', 'description', 'location']
    fieldsets = get_translation_fieldsets(
        ['title', 'description', 'location'], 
        'Event',
        extra_fields=['event_date', 'category', 'status', 'image', 'published']
    )
    date_hierarchy = 'event_date'

    class Media:
        js = ('admin/js/auto_submit.js',)


@admin.register(FAQ)
class FAQAdmin(ModelAdmin):
    list_display = ['question', 'order', 'published', 'created_at']
    list_filter = ['published']
    list_editable = ['published']
    search_fields = ['question', 'answer']
    fieldsets = get_translation_fieldsets(
        ['question', 'answer'], 
        'FAQ',
        extra_fields=['order', 'published']
    )
    ordering = ['order', '-created_at']

    class Media:
        js = ('admin/js/auto_submit.js',)


@admin.register(Gallery)
class GalleryAdmin(ModelAdmin):
    list_display = ['title', 'category', 'order', 'published', 'created_at']
    list_filter = ['category', 'published']
    list_editable = ['published']
    search_fields = ['title', 'description']
    fieldsets = get_translation_fieldsets(
        ['title', 'description'], 
        'Gallery',
        extra_fields=['image', 'category', 'order', 'published']
    )
    ordering = ['order', '-created_at']

    class Media:
        js = ('admin/js/auto_submit.js',)


@admin.register(News)
class NewsAdmin(ModelAdmin):
    list_display = ['title', 'date', 'category', 'published']
    list_filter = ['category', 'published', 'date']
    list_editable = ['published']
    search_fields = ['title', 'content']
    fieldsets = get_translation_fieldsets(
        ['title', 'content'], 
        'News',
        extra_fields=['img', 'category', 'published']
    )
    date_hierarchy = 'date'

    class Media:
        js = ('admin/js/auto_submit.js',)


@admin.register(Sector)
class SectorAdmin(ModelAdmin):
    list_display = ['name', 'category', 'order', 'published']
    list_filter = ['category', 'published']
    list_editable = ['published']
    search_fields = ['name', 'description']
    fieldsets = get_translation_fieldsets(
        ['name', 'description'], 
        'Sector',
        extra_fields=['icon', 'order', 'published']
    )
    ordering = ['order', 'name']

    class Media:
        js = ('admin/js/auto_submit.js',)


@admin.register(Project)
class ProjectAdmin(ModelAdmin):
    list_display = ['title', 'status', 'category', 'percent', 'published']
    list_filter = ['status', 'category', 'published']
    list_editable = ['published']
    search_fields = ['title', 'description']
    fieldsets = get_translation_fieldsets(
        ['title', 'description', 'milestone'], 
        'Project',
        extra_fields=['start_date', 'end_date', 'status', 'budget', 'beneficiaries', 'category', 'percent', 'img', 'published']
    )

    class Media:
        js = ('admin/js/auto_submit.js',)


@admin.register(GlobalSetting)
class GlobalSettingAdmin(ModelAdmin):
    list_display = ['site_name', 'resident_count', 'published', 'updated_at']
    list_editable = ['published']
    fieldsets = get_translation_fieldsets(
        ['site_name', 'footer_text'], 
        'GlobalSetting',
        extra_fields=['resident_count', 'agriculture_percentage', 'school_count', 'area_size', 'published']
    )
    
    class Media:
        js = ('admin/js/auto_submit.js',)
    
    def has_add_permission(self, request):
        return not GlobalSetting.objects.exists()


@admin.register(Kebele)
class KebeleAdmin(ModelAdmin):
    list_display = ['name', 'type', 'population', 'is_capital', 'published']
    list_filter = ['type', 'is_capital', 'published']
    list_editable = ['published']
    search_fields = ['name', 'description']
    fieldsets = get_translation_fieldsets(
        ['name', 'description'], 
        'Kebele',
        extra_fields=['type', 'population', 'is_capital', 'published']
    )
    ordering = ['name']

    class Media:
        js = ('admin/js/auto_submit.js',)
