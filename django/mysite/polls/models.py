# -*- coding: utf-8 -*-
from __future__ import unicode_literals

import datetime
import django_tables2 as tables

from django.db import models
from django.utils.encoding import python_2_unicode_compatible
from django.utils import timezone

@python_2_unicode_compatible  # only if you need to support Python 2
class Question(models.Model):
    COMPLETION_CHOICES = (
        ('op1', 'Option 1'),
        ('op2', 'Option two'),
        ('op3', 'Option Teemo')
    )

    question_text = models.CharField(max_length=200)
    pub_date = models.DateTimeField('date published')
    textarea = models.TextField(max_length=200, default='Very long text, isnt it?')
    select = models.CharField(max_length=1, choices=COMPLETION_CHOICES, null=True)
    integer = models.IntegerField(blank=True, null=True, default='321')

    date_field = models.DateField(null=True)
    html_field = models.TextField(null=True)
    demo_6 = models.CharField(max_length=200, default='demo val 6')
    demo_7 = models.CharField(max_length=200, default='demo val 7')
    demo_8 = models.CharField(max_length=200, default='demo val 8')
    demo_9 = models.CharField(max_length=200, default='demo val 9')
    demo_10 = models.CharField(max_length=200, default='demo val 10')


    def __str__(self):
        return self.question_text

    def was_published_recently(self):
        return self.pub_date >= timezone.now() - datetime.timedelta(days=1)

@python_2_unicode_compatible  # only if you need to support Python 2
class Choice(models.Model):
    question = models.ForeignKey(Question, on_delete=models.CASCADE)
    choice_text = models.CharField(max_length=200)
    votes = models.IntegerField(default=0)

    def __str__(self):
        return self.choice_text