from modeltranslation.translator import translator, TranslationOptions
from .models import (
    AdminMessage, Event, FAQ, Gallery, News,
    Sector, Project, GlobalSetting, Kebele
)


class AdminMessageTranslationOptions(TranslationOptions):
    fields = ('title', 'message', 'administrator_name', 'role')


class EventTranslationOptions(TranslationOptions):
    fields = ('title', 'description', 'location')


class FAQTranslationOptions(TranslationOptions):
    fields = ('question', 'answer')


class GalleryTranslationOptions(TranslationOptions):
    fields = ('title', 'description')


class NewsTranslationOptions(TranslationOptions):
    fields = ('title', 'content')


class SectorTranslationOptions(TranslationOptions):
    fields = ('name', 'description')


class ProjectTranslationOptions(TranslationOptions):
    fields = ('title', 'description', 'milestone')


class GlobalSettingTranslationOptions(TranslationOptions):
    fields = ('site_name', 'footer_text')


class KebeleTranslationOptions(TranslationOptions):
    fields = ('name', 'description')


# Register translations
translator.register(AdminMessage, AdminMessageTranslationOptions)
translator.register(Event, EventTranslationOptions)
translator.register(FAQ, FAQTranslationOptions)
translator.register(Gallery, GalleryTranslationOptions)
translator.register(News, NewsTranslationOptions)
translator.register(Sector, SectorTranslationOptions)
translator.register(Project, ProjectTranslationOptions)
translator.register(GlobalSetting, GlobalSettingTranslationOptions)
translator.register(Kebele, KebeleTranslationOptions)
