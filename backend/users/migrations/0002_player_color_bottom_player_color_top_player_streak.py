# Generated by Django 5.0.6 on 2024-07-14 19:17

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='player',
            name='color_bottom',
            field=models.CharField(default='#FFFFFF', max_length=7),
        ),
        migrations.AddField(
            model_name='player',
            name='color_top',
            field=models.CharField(default='#FFFFFF', max_length=7),
        ),
        migrations.AddField(
            model_name='player',
            name='streak',
            field=models.IntegerField(default=0),
        ),
    ]