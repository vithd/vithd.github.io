# -*- coding: utf-8 -*-
from __future__ import unicode_literals

# Editable Table
import django_tables2 as tables
import json
from django.http import HttpResponse

from django.shortcuts import get_object_or_404, render
from django.http import HttpResponseRedirect, HttpResponse, JsonResponse
from django.urls import reverse
from django.views import generic

from .models import Question, Choice
from .tables import QuestionTable

# Create your views here.
def index(request):
    data = Question.objects.all()
    data.edit_link = reverse('polls:edit')
    table = QuestionTable(data)
    context = {'table': table}
    return render(request, 'polls/index.html', context)





def edit(request):
    # Editable Table handler
    # In case of error response body will be shown as error message 
    # If value is correct you server should return 'ok'
    if request.is_ajax:
        # Validation
        try:
            updateFields = json.loads(request.POST['updateFields'])
        except:
            return HttpResponse("Invalid data")


        try:
            for id in updateFields:
                record = Question.objects.get(id=id)

                for field in updateFields[id]:
                    setattr(record, field, updateFields[id][field])

                record.save()
        except:
            # Cannot find record or invalid input data
            return HttpResponse("Database error")

        return HttpResponse('ok')
        






def detail(request, question_id):
    question = get_object_or_404(Question, pk=question_id)
    return render(request, 'polls/detail.html', {'question': question})

def results(request, question_id):
    question = get_object_or_404(Question, pk=question_id)
    return render(request, 'polls/results.html', {'question': question})

def vote(request, question_id):
    question = get_object_or_404(Question, pk=question_id)
    try:
        selected_choice = question.choice_set.get(pk=request.POST['choice'])
    except (KeyError, Choice.DoesNotExist):
        # Redisplay the question voting form.
        return render(request, 'polls/detail.html', {
            'question': question,
            'error_message': "You didn't select a choice.",
        })
    else:
        selected_choice.votes += 1
        selected_choice.save()
        # Always return an HttpResponseRedirect after successfully dealing
        # with POST data. This prevents data from being posted twice if a
        # user hits the Back button.
        return HttpResponseRedirect(reverse('polls:results', args=(question.id,)))

class DetailView(generic.DetailView):
    model = Question
    template_name = 'polls/detail.html'


class ResultsView(generic.DetailView):
    model = Question
    template_name = 'polls/results.html'

