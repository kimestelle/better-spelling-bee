# Generated by Django 5.0.6 on 2024-08-18 20:59

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('daily_data', '0010_alter_dailydata_data'),
    ]

    operations = [
        migrations.AlterField(
            model_name='dailydata',
            name='data',
            field=models.TextField(),
        ),
    ]
