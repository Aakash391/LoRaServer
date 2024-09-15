# Generated by Django 5.0.1 on 2024-03-13 10:46

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('yourappname', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='device',
            name='location',
        ),
        migrations.AddField(
            model_name='device',
            name='latitude',
            field=models.FloatField(default=0.0),
        ),
        migrations.AddField(
            model_name='device',
            name='longitude',
            field=models.FloatField(default=0.0),
        ),
    ]
