# Generated by Django 5.0.6 on 2024-07-28 22:34

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('daily_data', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='dailydata',
            name='letters',
            field=models.CharField(default='abcdefg', max_length=7),
        ),
    ]