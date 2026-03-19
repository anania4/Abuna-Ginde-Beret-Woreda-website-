from django.views.generic import TemplateView
from django.views.decorators.cache import never_cache


class IndexView(TemplateView):
    template_name = 'index.html'

    @classmethod
    def as_view(cls, **kwargs):
        view = super().as_view(**kwargs)
        return never_cache(view)
