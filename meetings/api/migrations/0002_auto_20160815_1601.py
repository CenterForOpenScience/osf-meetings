# -*- coding: utf-8 -*-
# Generated by Django 1.9.8 on 2016-08-15 16:01
from __future__ import unicode_literals

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='submission',
            name='conference',
        ),
        migrations.RemoveField(
            model_name='submission',
            name='contributors',
        ),
        migrations.DeleteModel(
            name='Conference',
        ),
        migrations.DeleteModel(
            name='Submission',
        ),
    ]
