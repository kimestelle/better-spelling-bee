# Generated by Django 5.0.6 on 2024-07-21 20:39

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0004_alter_player_points'),
    ]

    operations = [
        migrations.AddField(
            model_name='player',
            name='accessory',
            field=models.IntegerField(default=0),
        ),
        migrations.AddField(
            model_name='player',
            name='daily_score',
            field=models.IntegerField(default=0),
        ),
    ]
