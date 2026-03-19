from django.db import models
from ckeditor.fields import RichTextField


class AdminMessage(models.Model):
    """Welcome message from the Woreda Administrator (Singleton)"""
    title = models.CharField(max_length=255)
    administrator_name = models.CharField(max_length=255)
    role = models.CharField(max_length=255, blank=True)
    message = RichTextField()
    image = models.ImageField(upload_to='admin/', blank=True, null=True)
    published = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = 'Admin Message'
        verbose_name_plural = 'Admin Message'

    def __str__(self):
        return self.title


class Event(models.Model):
    """Community events and announcements"""
    CATEGORY_CHOICES = [
        ('Festival', 'Festival'),
        ('Meeting', 'Meeting'),
        ('Training', 'Training'),
        ('Ceremony', 'Ceremony'),
        ('Market', 'Market'),
        ('Sports', 'Sports'),
        ('Education', 'Education'),
        ('Health', 'Health'),
        ('Agriculture', 'Agriculture'),
        ('Other', 'Other'),
    ]
    
    STATUS_CHOICES = [
        ('Upcoming', 'Upcoming'),
        ('Ongoing', 'Ongoing'),
        ('Completed', 'Completed'),
        ('Cancelled', 'Cancelled'),
    ]

    title = models.CharField(max_length=255)
    description = RichTextField()
    event_date = models.DateField()
    location = models.CharField(max_length=255)
    category = models.CharField(max_length=50, choices=CATEGORY_CHOICES, default='Other')
    status = models.CharField(max_length=50, choices=STATUS_CHOICES, default='Upcoming')
    image = models.ImageField(upload_to='events/', blank=True, null=True)
    published = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-event_date']

    def __str__(self):
        return self.title


class FAQ(models.Model):
    """Frequently Asked Questions"""
    question = models.CharField(max_length=500)
    answer = RichTextField()
    order = models.IntegerField(default=0)
    published = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['order', '-created_at']
        verbose_name = 'FAQ'
        verbose_name_plural = 'FAQs'

    def __str__(self):
        return self.question


class Gallery(models.Model):
    """Community gallery photos"""
    CATEGORY_CHOICES = [
        ('Farming', 'Farming'),
        ('Market', 'Market'),
        ('Beekeeping', 'Beekeeping'),
        ('School', 'School'),
        ('Landscape', 'Landscape'),
        ('Culture', 'Culture'),
        ('Infrastructure', 'Infrastructure'),
        ('Community', 'Community'),
        ('Other', 'Other'),
    ]

    title = models.CharField(max_length=255)
    description = models.TextField(blank=True)
    image = models.ImageField(upload_to='gallery/')
    category = models.CharField(max_length=50, choices=CATEGORY_CHOICES, default='Community')
    order = models.IntegerField(default=0)
    published = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['order', '-created_at']
        verbose_name_plural = 'Galleries'

    def __str__(self):
        return self.title


class News(models.Model):
    """Woreda news and announcements"""
    title = models.CharField(max_length=255)
    content = RichTextField(blank=True)
    date = models.DateField(auto_now_add=True)
    category = models.CharField(max_length=100, blank=True)
    img = models.ImageField(upload_to='news/', blank=True, null=True)
    published = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-date']
        verbose_name_plural = 'News'

    def __str__(self):
        return self.title


class Sector(models.Model):
    """Administrative offices and sectors of the Woreda"""
    name = models.CharField(max_length=255)
    icon = models.CharField(max_length=100, blank=True)
    category = models.CharField(max_length=100, blank=True)
    description = RichTextField(blank=True)
    order = models.IntegerField(default=0)
    published = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['order', 'name']

    def __str__(self):
        return self.name




class Project(models.Model):
    """Development and infrastructure projects"""
    STATUS_CHOICES = [
        ('Planned', 'Planned'),
        ('In Progress', 'In Progress'),
        ('Ongoing', 'Ongoing'),
        ('Completed', 'Completed'),
        ('On Hold', 'On Hold'),
        ('Delayed', 'Delayed'),
    ]

    title = models.CharField(max_length=255)
    status = models.CharField(max_length=100, choices=STATUS_CHOICES, default='Planned')
    milestone = models.CharField(max_length=255, blank=True)
    start_date = models.DateField(blank=True, null=True)
    end_date = models.DateField(blank=True, null=True)
    budget = models.CharField(max_length=100, blank=True)
    beneficiaries = models.CharField(max_length=100, blank=True)
    category = models.CharField(max_length=100, blank=True)
    percent = models.IntegerField(default=0)
    img = models.ImageField(upload_to='projects/', blank=True, null=True)
    description = RichTextField(blank=True)
    published = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return self.title


class GlobalSetting(models.Model):
    """Global configuration and woreda statistics (Singleton)"""
    site_name = models.CharField(max_length=255)
    resident_count = models.CharField(max_length=50, blank=True)
    agriculture_percentage = models.CharField(max_length=50, blank=True)
    school_count = models.CharField(max_length=50, blank=True)
    area_size = models.CharField(max_length=50, blank=True)
    footer_text = RichTextField(blank=True)
    published = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = 'Global Setting'
        verbose_name_plural = 'Global Settings'

    def __str__(self):
        return self.site_name


class Kebele(models.Model):
    """Administrative divisions of the Woreda"""
    TYPE_CHOICES = [
        ('Urban', 'Urban'),
        ('Rural', 'Rural'),
    ]

    name = models.CharField(max_length=255)
    type = models.CharField(max_length=10, choices=TYPE_CHOICES, default='Rural')
    population = models.CharField(max_length=50, blank=True)
    description = RichTextField(blank=True)
    is_capital = models.BooleanField(default=False)
    published = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['name']

    def __str__(self):
        return self.name
