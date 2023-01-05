
from django.urls import path
from . import views

urlpatterns = [
    path('home-shell/', views.home_shell, name="home-shell"),
    path('home/', views.home, name="home"),
]
