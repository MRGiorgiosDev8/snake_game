from django.shortcuts import render

def home(request):
    return render(request, 'home.html')

def start_game(request):
    return render(request, 'game.html')
