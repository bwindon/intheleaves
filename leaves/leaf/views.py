from django.shortcuts import render, HttpResponse


# Create your views here.
def menu(request):
    return HttpResponse('This is the menu page')
