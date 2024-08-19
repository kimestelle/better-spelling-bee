# Generated by Django 5.0.6 on 2024-08-19 03:08

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0010_alter_player_daily_words'),
    ]

    operations = [
        migrations.AddField(
            model_name='player',
            name='infinite_center_letter',
            field=models.CharField(default='a', max_length=1),
        ),
        migrations.AddField(
            model_name='player',
            name='infinite_data',
            field=models.TextField(default=''),
        ),
        migrations.AddField(
            model_name='player',
            name='infinite_letters',
            field=models.JSONField(default=[]),
        ),
        migrations.AddField(
            model_name='player',
            name='infinite_score',
            field=models.IntegerField(default=0),
        ),
        migrations.AddField(
            model_name='player',
            name='infinite_win_threshold',
            field=models.IntegerField(default=0),
        ),
        migrations.AddField(
            model_name='player',
            name='infinite_words',
            field=models.TextField(default=''),
        ),
    ]