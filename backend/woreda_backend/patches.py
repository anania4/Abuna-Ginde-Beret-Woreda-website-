"""
Monkey patch for Python 3.14 compatibility with Django templates.
This fixes the AttributeError: 'super' object has no attribute 'dicts'
that occurs because Python 3.14 changed how super() works in __copy__.

The fix: bypass __init__ entirely and copy __dict__ + dicts directly,
which preserves all instance attributes (_processors_index, _processors, etc.)
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
