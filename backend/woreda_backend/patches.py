"""
Monkey patches for Python 3.14 compatibility with Django and related packages.

1. Django template context patch - fixes AttributeError: 'super' object has no attribute 'dicts'
2. Modeltranslation patch - fixes MultilingualQuerySet._update() argument mismatch
"""
from copy import copy
import django.template.context as context_module


def _patched_copy(self):
    """
    Fixed __copy__ for all Context subclasses (Python 3.14 compatible).
    Creates a bare object, copies all instance attributes via __dict__,
    then shallow-copies the dicts list.
    """
    duplicate = context_module.BaseContext.__new__(self.__class__)
    duplicate.__dict__ = copy(self.__dict__)
    duplicate.dicts = self.dicts[:]
    return duplicate


# Apply to BaseContext, Context, and RequestContext
context_module.BaseContext.__copy__ = _patched_copy
context_module.Context.__copy__ = _patched_copy

if hasattr(context_module, 'RequestContext'):
    context_module.RequestContext.__copy__ = _patched_copy

print("[OK] Django template context patch applied for Python 3.14 compatibility")


# Modeltranslation compatibility patch
try:
    from modeltranslation.manager import MultilingualQuerySet
    from django.db import models
    
    def _patched_update(self, values, returning_fields=None):
        """
        Fixed _update method for MultilingualQuerySet (Python 3.14 compatible).
        The issue is that Django 6.0+ changed the _update method signature,
        but modeltranslation expects the old signature.
        """
        # Call the parent QuerySet._update method directly with proper arguments
        if returning_fields is not None:
            return models.QuerySet._update(self, values, returning_fields)
        else:
            return models.QuerySet._update(self, values)
    
    # Apply the patch
    MultilingualQuerySet._update = _patched_update
    print("[OK] Modeltranslation MultilingualQuerySet patch applied for Python 3.14 compatibility")
    
except ImportError:
    # modeltranslation not installed, skip patch
    pass
except Exception as e:
    print(f"[WARNING] Could not apply modeltranslation patch: {e}")
