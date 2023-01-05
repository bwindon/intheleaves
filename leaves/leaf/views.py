from django.shortcuts import render, HttpResponse


# Create your views here.
def home_shell(request):
    return HttpResponse('This is the menu page')


def home(request):
    return render(request, 'home.html')
