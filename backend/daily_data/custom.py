from models import DailyData

# Fetch all existing records
for record in DailyData.objects.all():
    # Convert the existing letters to a valid JSON array
    letters_list = list(record.letters)
    record.letters = letters_list
    record.save()