from django.core.management.base import BaseCommand
from api.models import Kebele, Sector

class Command(BaseCommand):
    help = 'Populate the database with Woreda Kebeles and Sectors'

    def add_arguments(self, parser):
        parser.add_argument(
            '--clear',
            action='store_true',
            help='Clear existing Kebeles and Sectors before populating',
        )

    def handle(self, *args, **options):
        if options['clear']:
            self.stdout.write('Clearing existing data...')
            Kebele.objects.all().delete()
            Sector.objects.all().delete()
            self.stdout.write(self.style.SUCCESS('Cleared all Kebeles and Sectors.'))

        self.stdout.write('Populating Kebeles...')
        
        # Urban Kebeles
        urban_kebeles = [
            ("Bedesa Dembi", "Beedessaa Dembii"),
            ("Guto Sombo", "Guto Soomboo"),
            ("Ereri Kenjo", "Ererii Keenjoo"),
        ]
        
        for name_en, name_om in urban_kebeles:
            Kebele.objects.update_or_create(
                name_en=name_en,
                defaults={
                    'name_om': name_om,
                    'type': 'Urban',
                    'published': True
                }
            )

        # Rural Kebeles
        rural_kebeles = [
            ("Beke Kelate", "Beekee Qilaatee"),
            ("Bite Haro", "Biitee Haroo"),
            ("Goro Furto", "Gooroo Furtuu"),
            ("Erjajo", "Erjaannoo"),
            ("Haro", "Haroo"),
            ("Gitire Kichu", "Gittiiree Kichuu"),
            ("Danisa Hula Burki", "Daanisaa Hulaa Burkii"),
            ("Obora", "Oboraa"),
            ("Jemo Fino", "Jemoo Fiinoo"),
            ("Wolensu", "Woleensuu"),
            ("Yegot", "Yeegootuu"),
            ("Gerbi Gole", "Gerbii Goollee"),
            ("Kono", "Koonoo"),
            ("Gute Andode", "Gutee Andodee"),
            ("Buketo Kere Dibar", "Bukettoo Qaree Diibaar"),
            ("Dire Kegni", "Diiree Qeegni"),
            ("Debeka", "Debeekaa"),
            ("Dogoma Yegot", "Dogomaa Yeegootuu"),
            ("Dogoma Kibi", "Dogomaa Kiibii"),
            ("Gertoke", "Gertookee"),
            ("Kolu", "Koluu"),
            ("Guduru", "Guduruu"),
            ("Goro Bate", "Gooroo Baatee"),
            ("Goro Dokonu", "Gooroo Dookonuu"),
            ("Dokonu Sure", "Dookonuu Suree"),
            ("Goho Guduru", "Gohoo Guduruu"),
            ("Wilo Jegenfo", "Wiloo Jegenfoo"),
            ("Doksa Goro Diko", "Doksaa Gooroo Dickoo"),
            ("Gago Bite", "Gagoo Biitee"),
            ("Gago Osole", "Gagoo Osolee"),
            ("Gajo Bedesa", "Gajoo Beedessaa"),
            ("Insilale Gajo", "Insilaalee Gajoo"),
            ("Kere Cheka", "Qaree Ceechaa"),
            ("Kere Bite", "Qaree Biitee"),
            ("Bedesa Chando", "Beedessaa Chaandoo"),
            ("Ogobe Gajo", "Ogobee Gajoo"),
            ("Mendida Sole", "Mendiiddaa Solee"),
            ("Mendida Tunjiti", "Mendiiddaa Tunnjitii"),
            ("Mudema Dega Tina", "Mudemaa Deegaa Tinaa"),
            ("Goro Jalete", "Gooroo Jaaleetee"),
        ]

        for name_en, name_om in rural_kebeles:
            Kebele.objects.update_or_create(
                name_en=name_en,
                defaults={
                    'name_om': name_om,
                    'type': 'Rural',
                    'published': True
                }
            )

        self.stdout.write('Populating Sectors...')
        
        sectors = [
            {
                "name_en": "Administration Office",
                "name_om": "Waajjira Bulchiinsa",
                "icon": "Building",
                "description_en": "Woreda administrative coordination and governance.",
                "description_om": "Qindeessaa bulchiinsa aanaa fi hojii bulchiinsaa."
            },
            {
                "name_en": "The House Office",
                "name_om": "Waajjira Mana Marii",
                "icon": "Landmark",
                "description_en": "Legislative body and council office.",
                "description_om": "Qaama seera baastuu fi waajjira mana marii."
            },
            {
                "name_en": "Agriculture and Land Office",
                "name_om": "Waajjira Qonnaa fi Lafaa",
                "icon": "Sprout",
                "description_en": "Managing agriculture, livestock, and land use.",
                "description_om": "Hojii qonnaa, loonii fi itti fayyadama lafaa."
            },
            {
                "name_en": "Road and Logistics Office",
                "name_om": "Waajjira Daandii fi Lojiistikii",
                "icon": "HardHat",
                "description_en": "Infrastructure development and logistics management.",
                "description_om": "Misooma bu'uuraalee misoomaa fi bulchiinsa loojiistikii."
            },
            {
                "name_en": "Busa Gonofa Office",
                "name_om": "Waajjira Qabeenya Busa Gonofa",
                "icon": "Heart",
                "description_en": "Disaster risk management and social support.",
                "description_om": "Hojii ittisa balaa fi deggarsa hawaasummaa."
            },
            {
                "name_en": "Finance Office",
                "name_om": "Waajjira Maallaqaa / Baajata",
                "icon": "Wallet",
                "description_en": "Budget planning and financial management.",
                "description_om": "Karoorra baajataa fi bulchiinsa faayinaansii."
            },
            {
                "name_en": "Peace and Militia Office",
                "name_om": "Waajjira Nagaa fi Waraanaa",
                "icon": "ShieldCheck",
                "description_en": "Public safety and security coordination.",
                "description_om": "Eegumsa nageenya ummataa fi qindoomina nageenyaa."
            },
            {
                "name_en": "Health Office",
                "name_om": "Waajjira Fayyaa",
                "icon": "HeartPulse",
                "description_en": "Public health services and medical management.",
                "description_om": "Tajaajila fayyaa ummataa fi bulchiinsa yaalaa."
            },
            {
                "name_en": "People's Issues Organisation Office",
                "name_om": "Waajjira Dhimmoota Ummataa",
                "icon": "Users",
                "description_en": "Addressing community concerns and social affairs.",
                "description_om": "Dhimmoota hawaasaa fi hawaasummaa irratti hojjechuu."
            },
            {
                "name_en": "Education Office",
                "name_om": "Waajjira Barnootaa",
                "icon": "GraduationCap",
                "description_en": "Managing schools and educational resources.",
                "description_om": "Bulchiinsa manneen barnootaa fi meeshaalee barnootaa."
            },
            {
                "name_en": "Trade, Job Opportunity Creation and Investment Office",
                "name_om": "Waajjira Daldalaa, Carraa Hojii fi Invastimantii",
                "icon": "ShoppingBag",
                "description_en": "Investment promotion and job market development.",
                "description_om": "Beeksisa invastimantii fi misooma carraa hojii."
            },
            {
                "name_en": "Revenues Office",
                "name_om": "Waajjira Galii",
                "icon": "HandCoins",
                "description_en": "Local tax collection and revenue management.",
                "description_om": "Sassaabbii gibiraa fi bulchiinsa galii."
            },
            {
                "name_en": "Water, Mineral and Energy Office",
                "name_om": "Waajjira Bishaan, Qabeenya Uumamaa fi Humna",
                "icon": "Waves",
                "description_en": "Managing water supply and energy resources.",
                "description_om": "Bulchiinsa dhiyeessii bishaanii fi qabeenya humnaa."
            },
            {
                "name_en": "Beke Kelate City Municipality",
                "name_om": "Manni Maree Magaalaa Beekee Qilaatee",
                "icon": "Building2",
                "description_en": "Urban governance for Beke Kelate.",
                "description_om": "Bulchiinsa magaalaa Beekee Qilaatee."
            },
            {
                "name_en": "Bite Haro Growth City Municipality",
                "name_om": "Manni Maree Magaalaa Bite Haroo",
                "icon": "Building2",
                "description_en": "Urban governance for Bite Haro.",
                "description_om": "Bulchiinsa magaalaa Biitee Haroo."
            },
            {
                "name_en": "Goro Furto Growth City Municipality",
                "name_om": "Manni Maree Magaalaa Gooroo Furtuu",
                "icon": "Building2",
                "description_en": "Urban governance for Goro Furto.",
                "description_om": "Bulchiinsa magaalaa Gooroo Furtuu."
            },
            {
                "name_en": "Attorney Office",
                "name_om": "Waajjira Abukaatoo",
                "icon": "Scale",
                "description_en": "Legal affairs and advisory services.",
                "description_om": "Dhimmoota seeraa fi tajaajila gorsaa."
            },
            {
                "name_en": "Police Office",
                "name_om": "Waajjira Poolisii",
                "icon": "Shield",
                "description_en": "Law enforcement and public protection.",
                "description_om": "Hojiirra oolmaa seeraa fi eegumsa ummataa."
            },
            {
                "name_en": "Court Office",
                "name_om": "Waajjira Mana Murtii",
                "icon": "Gavel",
                "description_en": "Judiciary services and justice administration.",
                "description_om": "Tajaajila murtii fi bulchiinsa haqaa."
            },
        ]

        for s_data in sectors:
            Sector.objects.update_or_create(
                name_en=s_data["name_en"],
                defaults={
                    "name_om": s_data["name_om"],
                    "icon": s_data["icon"],
                    "description_en": s_data["description_en"],
                    "description_om": s_data["description_om"],
                    "published": True
                }
            )

        self.stdout.write(self.style.SUCCESS(f'Successfully populated {len(urban_kebeles) + len(rural_kebeles)} kebeles and {len(sectors)} sectors.'))
