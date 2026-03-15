from django.core.management.base import BaseCommand
from api.models import (
    AdminMessage, GlobalSetting, Kebele, Sector, FAQ, News, Event, Gallery, Project
)
from datetime import date, timedelta


class Command(BaseCommand):
    help = 'Populate database with Abuna Ginde Beret Woreda content'

    def handle(self, *args, **kwargs):
        self.stdout.write('Populating Abuna Ginde Beret Woreda content...')

        # Admin Message
        if not AdminMessage.objects.exists():
            AdminMessage.objects.create(
                title='Welcome to Abuna Ginde Beret Woreda',
                administrator_name='Ato Tadesse Bekele',
                role='Woreda Administrator',
                message='''<p>Dear Citizens and Visitors,</p>
                <p>It is my great honor to welcome you to the official website of Abuna Ginde Beret Woreda Administration. Our woreda, located in the heart of West Shewa Zone, Oromia Region, is a land of rich agricultural heritage, vibrant culture, and hardworking people.</p>
                <p>This digital platform represents our commitment to transparency, accessibility, and modern governance. Through this website, you can access information about our services, stay updated on community developments, and engage with your local government.</p>
                <p>We are dedicated to improving the lives of our residents through sustainable development, quality education, accessible healthcare, and agricultural advancement. Together, we are building a prosperous future for Abuna Ginde Beret.</p>
                <p>Thank you for your continued support and participation in our community's growth.</p>''',
                published=True
            )
            self.stdout.write(self.style.SUCCESS('[OK] Admin Message created'))

        # Global Settings
        if not GlobalSetting.objects.exists():
            GlobalSetting.objects.create(
                site_name='Abuna Ginde Beret Woreda Administration',
                resident_count='52,000+',
                agriculture_percentage='87%',
                school_count='28',
                area_size='485 km²',
                footer_text='<p>© 2025 Abuna Ginde Beret Woreda Administration Office | West Shewa Zone, Oromia Region, Ethiopia</p>',
                published=True
            )
            self.stdout.write(self.style.SUCCESS('[OK] Global Settings created'))

        # Kebeles
        kebeles_data = [
            {'name': 'Beke Kelate', 'type': 'Urban', 'population': '8,500', 'is_capital': True, 
             'description': '<p>The administrative capital and commercial center of the woreda.</p>'},
            {'name': 'Abuna Ginde Beret', 'type': 'Urban', 'population': '6,200', 'is_capital': False,
             'description': '<p>Named after the historic church, this urban center is known for its religious significance.</p>'},
            {'name': 'Goro Meti', 'type': 'Rural', 'population': '3,800', 'is_capital': False,
             'description': '<p>Agricultural kebele known for teff and wheat production.</p>'},
            {'name': 'Dima', 'type': 'Rural', 'population': '2,900', 'is_capital': False,
             'description': '<p>Highland kebele with extensive honey production.</p>'},
            {'name': 'Koticha', 'type': 'Rural', 'population': '3,200', 'is_capital': False,
             'description': '<p>Known for livestock farming and dairy production.</p>'},
        ]
        
        for kebele_data in kebeles_data:
            Kebele.objects.get_or_create(
                name=kebele_data['name'],
                defaults={**kebele_data, 'published': True}
            )
        self.stdout.write(self.style.SUCCESS(f'[OK] {len(kebeles_data)} Kebeles created'))

        # Sectors
        sectors_data = [
            {'name': 'Agriculture and Natural Resources Office', 'category': 'Agriculture', 'order': 1,
             'description': '<p>Oversees agricultural development, crop production, livestock management, and natural resource conservation.</p>'},
            {'name': 'Education Office', 'category': 'Education', 'order': 2,
             'description': '<p>Manages primary and secondary schools, teacher training, and educational quality improvement programs.</p>'},
            {'name': 'Health Office', 'category': 'Health', 'order': 3,
             'description': '<p>Coordinates health centers, health posts, disease prevention, and maternal-child health services.</p>'},
            {'name': 'Water and Energy Office', 'category': 'Infrastructure', 'order': 4,
             'description': '<p>Responsible for water supply development, sanitation, and rural electrification projects.</p>'},
            {'name': 'Trade and Market Development Office', 'category': 'Economy', 'order': 5,
             'description': '<p>Promotes trade, manages markets, supports cooperatives, and facilitates business licensing.</p>'},
            {'name': 'Women, Children and Youth Affairs Office', 'category': 'Social', 'order': 6,
             'description': '<p>Advocates for women\'s rights, child protection, and youth empowerment programs.</p>'},
            {'name': 'Finance and Economic Development Office', 'category': 'Finance', 'order': 7,
             'description': '<p>Manages woreda budget, revenue collection, and economic development planning.</p>'},
            {'name': 'Land Administration and Use Office', 'category': 'Land', 'order': 8,
             'description': '<p>Handles land registration, certification, dispute resolution, and land use planning.</p>'},
        ]
        
        for sector_data in sectors_data:
            Sector.objects.get_or_create(
                name=sector_data['name'],
                defaults={**sector_data, 'published': True}
            )
        self.stdout.write(self.style.SUCCESS(f'[OK] {len(sectors_data)} Sectors created'))

        # FAQs
        faqs_data = [
            {'question': 'How do I obtain a birth certificate?',
             'answer': '<p>Visit the Woreda Civil Registration Office with the following documents: hospital birth notification, parents\' IDs, and two witnesses. The service is free and takes 1-2 days.</p>',
             'order': 1},
            {'question': 'What are the office working hours?',
             'answer': '<p>Monday to Friday: 8:30 AM - 12:30 PM and 1:30 PM - 5:30 PM. Closed on weekends and public holidays.</p>',
             'order': 2},
            {'question': 'How can I get land certification?',
             'answer': '<p>Contact the Land Administration Office with your kebele administrator\'s letter, identification, and proof of land possession. The process takes approximately 2-3 weeks.</p>',
             'order': 3},
            {'question': 'Where can I register my business?',
             'answer': '<p>Visit the Trade and Market Development Office with your business plan, ID, and rental agreement. Small businesses can be registered within 3-5 working days.</p>',
             'order': 4},
            {'question': 'How do I access agricultural extension services?',
             'answer': '<p>Contact your kebele development agent or visit the Agriculture Office. Services include training, improved seeds, and technical advice.</p>',
             'order': 5},
        ]
        
        for faq_data in faqs_data:
            FAQ.objects.get_or_create(
                question=faq_data['question'],
                defaults={**faq_data, 'published': True}
            )
        self.stdout.write(self.style.SUCCESS(f'✓ {len(faqs_data)} FAQs created'))

        # News
        news_data = [
            {'title': 'New Health Center Opens in Goro Meti Kebele',
             'content': '<p>A modern health center was inaugurated in Goro Meti kebele, bringing quality healthcare closer to rural communities. The facility includes a maternity ward, laboratory, and pharmacy.</p><p>The health center will serve over 15,000 residents from surrounding kebeles and is staffed by trained health professionals.</p>',
             'category': 'Health',
             'date': date.today() - timedelta(days=5)},
            {'title': 'Farmers Receive Training on Modern Beekeeping Techniques',
             'content': '<p>Over 200 farmers participated in a three-day training program on modern beekeeping methods organized by the Agriculture Office in partnership with regional experts.</p><p>Participants received modern beehives and protective equipment to improve honey production and quality.</p>',
             'category': 'Agriculture',
             'date': date.today() - timedelta(days=12)},
            {'title': 'Beke Kelate Market Renovation Project Completed',
             'content': '<p>The renovation of Beke Kelate weekly market has been completed, providing 250 new stalls with improved facilities including clean water, toilets, and proper drainage.</p><p>The upgraded market will boost local trade and provide better conditions for farmers and traders.</p>',
             'category': 'Infrastructure',
             'date': date.today() - timedelta(days=18)},
            {'title': 'School Feeding Program Launched in Primary Schools',
             'content': '<p>A new school feeding program has been launched in 15 primary schools across the woreda, providing nutritious meals to over 3,000 students daily.</p><p>The program aims to improve school attendance and student performance while supporting local farmers who supply the food.</p>',
             'category': 'Education',
             'date': date.today() - timedelta(days=25)},
            {'title': 'Women\'s Cooperative Receives Grain Mill Equipment',
             'content': '<p>The Dima Women\'s Cooperative received modern grain milling equipment through a government support program, enabling members to process their harvest locally and increase income.</p><p>The cooperative has 45 members and will provide milling services to the community.</p>',
             'category': 'Economy',
             'date': date.today() - timedelta(days=30)},
        ]
        
        for news_item in news_data:
            News.objects.get_or_create(
                title=news_item['title'],
                defaults={**news_item, 'published': True}
            )
        self.stdout.write(self.style.SUCCESS(f'✓ {len(news_data)} News articles created'))

        # Events
        events_data = [
            {'title': 'Woreda Development Planning Meeting',
             'description': '<p>Annual development planning meeting with kebele administrators and sector heads to discuss priorities for the upcoming fiscal year.</p>',
             'event_date': date.today() + timedelta(days=15),
             'location': 'Woreda Administration Hall, Beke Kelate',
             'category': 'Meeting',
             'status': 'Upcoming'},
            {'title': 'Agricultural Input Distribution',
             'description': '<p>Distribution of improved seeds, fertilizers, and farming tools to registered farmers across all kebeles.</p>',
             'event_date': date.today() + timedelta(days=22),
             'location': 'Agriculture Office Compound',
             'category': 'Agriculture',
             'status': 'Upcoming'},
            {'title': 'Community Health Campaign',
             'description': '<p>Free health screening, vaccination, and health education program for mothers and children under five years.</p>',
             'event_date': date.today() + timedelta(days=30),
             'location': 'All Health Posts',
             'category': 'Health',
             'status': 'Upcoming'},
        ]
        
        for event_data in events_data:
            Event.objects.get_or_create(
                title=event_data['title'],
                defaults={**event_data, 'published': True}
            )
        self.stdout.write(self.style.SUCCESS(f'✓ {len(events_data)} Events created'))

        # Projects
        projects_data = [
            {'title': 'Rural Road Improvement Project',
             'description': '<p>Upgrading 45 km of rural roads connecting five kebeles to the main highway, improving market access for farmers.</p>',
             'status': 'In Progress',
             'status_color': 'bg-blue-500',
             'date_range': '2025 - 2026',
             'budget': '12.5 Million Birr',
             'beneficiaries': '25,000 residents',
             'category': 'Infrastructure',
             'percent': 35},
            {'title': 'School Construction and Rehabilitation',
             'description': '<p>Building 3 new primary schools and rehabilitating 8 existing schools to improve access to quality education.</p>',
             'status': 'In Progress',
             'status_color': 'bg-green-500',
             'date_range': '2024 - 2025',
             'budget': '8.2 Million Birr',
             'beneficiaries': '4,500 students',
             'category': 'Education',
             'percent': 65},
            {'title': 'Water Supply Expansion Program',
             'description': '<p>Installing 12 new water points and rehabilitating existing water systems to provide clean water access to rural communities.</p>',
             'status': 'Planning',
             'status_color': 'bg-yellow-500',
             'date_range': '2026 - 2027',
             'budget': '6.8 Million Birr',
             'beneficiaries': '18,000 residents',
             'category': 'Water',
             'percent': 15},
        ]
        
        for project_data in projects_data:
            Project.objects.get_or_create(
                title=project_data['title'],
                defaults={**project_data, 'published': True}
            )
        self.stdout.write(self.style.SUCCESS(f'✓ {len(projects_data)} Projects created'))

        self.stdout.write(self.style.SUCCESS('\n✅ All content created successfully!'))
        self.stdout.write(self.style.SUCCESS('You can now view the content at:'))
        self.stdout.write(self.style.SUCCESS('- Admin: http://localhost:8000/admin/'))
        self.stdout.write(self.style.SUCCESS('- API: http://localhost:8000/api/'))
        self.stdout.write(self.style.SUCCESS('- Frontend: http://localhost:3000/'))
