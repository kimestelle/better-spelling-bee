from collections import Counter
from django.core.management.base import BaseCommand
from daily_data.models import DailyData

class Command(BaseCommand):
    help = 'Identify duplicate dates in DailyData model'

    def handle(self, *args, **kwargs):
        # Fetch all dates
        dates = list(DailyData.objects.values_list('date', flat=True))

        # Identify duplicates
        duplicate_dates = [date for date, count in Counter(dates).items() if count > 1]

        if duplicate_dates:
            self.stdout.write(self.style.WARNING('Duplicate dates found:'))
            for date in duplicate_dates:
                count = dates.count(date)
                self.stdout.write(self.style.WARNING(f'Date: {date}, Count: {count}'))
        else:
            self.stdout.write(self.style.SUCCESS('No duplicate dates found.'))
