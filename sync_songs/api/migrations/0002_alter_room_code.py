# Generated by Django 4.1.5 on 2023-01-16 12:00

import api.models
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='room',
            name='code',
            field=models.CharField(default=api.models.generte_unique_code, max_length=8, unique=True),
        ),
    ]
