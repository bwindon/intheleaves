
from django.urls import path
from . import views

urlpatterns = [
    path('home-shell/', views.home_shell, name="home-shell"),
    path('home/', views.home, name="home"),
    # charts
    path('main-chart', views.main_chart, name='main-chart'),

    # JSON management
    path('json/', views.json_output_to_web, name='jason-web-view'),
]
