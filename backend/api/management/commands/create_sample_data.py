from django.core.management.base import BaseCommand
from api.models import (
    AdminMessage, GlobalSetting, Kebele, Sector, FAQ
)


class Command(BaseCommand):
    help = 'Create sample data for testing'

    def handle(self, *args, **kwargs):
        self.stdout.write('Creating sample data...')

        # Create Admin Message
        if not AdminMessage.objects.exists():
            AdminMessage.objects.create(
                title='Welcome to Abuna Ginde Beret Woreda',
                administrator_name='Administrator Name',
                role='Woreda Administrator',
                message='<p>Welcome message goes here...</p>',
                published=True
            )
            self.stdout.write(self.style.SUCCESS('[OK] Admin Message created'))

        # Create Global Settings
        if not GlobalSetting.objects.exists():
            GlobalSetting.objects.create(
                site_name='Abuna Ginde Beret Woreda Administration',
                resident_count='50,000+',
                agriculture_percentage='85%',
                school_count='25',
                area_size='500 km²',
                footer_text='<p>© 2025 Abuna Ginde Beret Woreda Administration</p>',
                published=True
            )
            self.stdout.write(self.style.SUCCESS('[OK] Global Settings created'))

        # Create sample Kebeles
        kebeles = [
            {'name': 'Abuna Ginde Beret', 'type': 'Urban', 'is_capital': True},
            {'name': 'Kebele 1', 'type': 'Rural', 'is_capital': False},
            {'name': 'Kebele 2', 'type': 'Rural', 'is_capital': False},
        ]
        
        for kebele_data in kebeles:
            Kebele.objects.get_or_create(
                name=kebele_data['name'],
                defaults={**kebele_data, 'published': True}
            )
        self.stdout.write(self.style.SUCCESS(f'[OK] {len(kebeles)} Kebeles created'))

        # Create sample Sectors
        sectors = [
            {'name': 'Education Office', 'category': 'Education', 'order': 1},
            {'name': 'Health Office', 'category': 'Health', 'order': 2},
            {'name': 'Agriculture Office', 'category': 'Agriculture', 'order': 3},
        ]
        
        for sector_data in sectors:
            Sector.objects.get_or_create(
                name=sector_data['name'],
                defaults={**sector_data, 'published': True}
            )
        self.stdout.write(self.style.SUCCESS(f'[OK] {len(sectors)} Sectors created'))

        # Create sample FAQs
        faqs = [
            {
                'question': 'How do I get a birth certificate?',
                'answer': '<p>Visit the Woreda administration office with required documents.</p>',
                'order': 1
            },
            {
                'question': 'What are the office hours?',
                'answer': '<p>Monday to Friday, 8:00 AM to 5:00 PM</p>',
                'order': 2
            },
        ]
        
        for faq_data in faqs:
            FAQ.objects.get_or_create(
                question=faq_data['question'],
                defaults={**faq_data, 'published': True}
            )
        self.stdout.write(self.style.SUCCESS(f'[OK] {len(faqs)} FAQs created'))

        self.stdout.write(self.style.SUCCESS('\n[OK] Sample data created successfully!'))
