# Generated by Django 5.0.6 on 2024-08-19 23:15

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0012_alter_player_daily_words_alter_player_infinite_words'),
    ]

    operations = [
        migrations.AlterField(
            model_name='player',
            name='infinite_letters',
            field=models.JSONField(default=list),
        ),
    ]
