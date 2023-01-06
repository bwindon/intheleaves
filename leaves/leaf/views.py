import json
from django.http import JsonResponse
from django.shortcuts import render, HttpResponse


# Create your views here.
def home_shell(request):
    return HttpResponse('This is the menu page')


def home(request):
    return render(request, 'home.html')


def main_chart(request):
    return render(request, 'js_chart_strava.html')


def json_output_to_web(request):
    with open('complete_activities_list.json') as json_data:
        d = json.load(json_data)
    json_d = json.dumps(d)
    return JsonResponse(d, safe=False)
