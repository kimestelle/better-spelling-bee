# Generated by Django 5.0.6 on 2024-07-31 06:05

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0006_player_daily_words'),
    ]

    operations = [
        migrations.AlterField(
            model_name='player',
            name='daily_words',
            field=models.TextField(default='', null=True),
        ),
    ]
