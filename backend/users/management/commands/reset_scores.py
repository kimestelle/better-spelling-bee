from django.core.management.base import BaseCommand
from users.tasks import reset_daily_score

class Command(BaseCommand):
    def handle(self, *args, **kwargs):
        reset_daily_score()
        self.stdout.write(self.style.SUCCESS('Successfully reset daily and infinite data for all players'))
    # help = 'Resets daily and infinite data for all players'

    # def handle(self, *args, **kwargs):
    #     Player.objects.update(
    #         daily_score=0,
    #         daily_words=[],
    #         infinite_score=0,
    #         infinite_words=[],
    #         infinite_data='',
    #         infinite_letters=[],
    #         infinite_center_letter='a',  # Assuming 'a' is the default center letter
    #         infinite_win_threshold=0
    #     )
    #     self.stdout.write(self.style.SUCCESS('Successfully reset daily and infinite data for all players'))
