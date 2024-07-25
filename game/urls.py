from django.urls import path
from . import views

urlpatterns = [
    path('', views.home, name='home'),
    path('start_game/', views.start_game, name='start_game'),
]
