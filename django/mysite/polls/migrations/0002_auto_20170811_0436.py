# -*- coding: utf-8 -*-
# Generated by Django 1.11.4 on 2017-08-11 04:36
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('polls', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='question',
            name='demo_1',
            field=models.CharField(default='demo val 1', max_length=200),
        ),
        migrations.AddField(
            model_name='question',
            name='demo_2',
            field=models.CharField(default='demo val 2', max_length=200),
        ),
        migrations.AddField(
            model_name='question',
            name='demo_3',
            field=models.CharField(default='demo val 3', max_length=200),
        ),
        migrations.AddField(
            model_name='question',
            name='demo_4',
            field=models.CharField(default='demo val 4', max_length=200),
        ),
        migrations.AddField(
            model_name='question',
            name='demo_5',
            field=models.CharField(default='demo val 5', max_length=200),
        ),
    ]