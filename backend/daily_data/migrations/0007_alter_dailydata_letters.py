# Generated by Django 5.0.6 on 2024-08-09 05:57

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('daily_data', '0006_alter_dailydata_letters'),
    ]

    operations = [
        migrations.AlterField(
            model_name='dailydata',
            name='letters',
            field=models.JSONField(default=list),
        ),
    ]