# -*- coding: utf-8 -*-
# Generated by Django 1.11.4 on 2017-08-15 09:19
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('polls', '0006_auto_20170815_0917'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='question',
            name='demo_5',
        ),
        migrations.AddField(
            model_name='question',
            name='demo_6',
            field=models.CharField(default='demo val 6', max_length=200),
        ),
    ]
