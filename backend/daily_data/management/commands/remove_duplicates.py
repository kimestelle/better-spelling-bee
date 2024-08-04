from collections import Counter
from django.core.management.base import BaseCommand
from daily_data.models import DailyData

class Command(BaseCommand):
    help = 'Remove duplicate dates in DailyData model'

    def handle(self, *args, **kwargs):
        # Fetch all dates
        dates = list(DailyData.objects.values_list('date', flat=True))

        # Identify duplicates
        duplicate_dates = [date for date, count in Counter(dates).items() if count > 1]

        if duplicate_dates:
            self.stdout.write(self.style.WARNING('Removing duplicate dates:'))
            for date in duplicate_dates:
                # Fetch all entries with the duplicate date
                entries = DailyData.objects.filter(date=date)

                # Keep only the first entry, delete the rest
                entries_to_delete = entries.exclude(pk=entries.first().pk)
                entries_to_delete_count = entries_to_delete.count()
                entries_to_delete.delete()
                self.stdout.write(self.style.WARNING(f'Duplicate entries for date {date} removed: {entries_to_delete_count}'))
        else:
            self.stdout.write(self.style.SUCCESS('No duplicate dates found.'))
