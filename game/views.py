from django.shortcuts import render
from django.views import View
from django.http import JsonResponse
from .models import Score
import json

def home(request):
    return render(request, 'home.html')

def start_game(request):
    return render(request, 'game.html')

class SaveScoreView(View):
    def post(self, request):
        data = json.loads(request.body)
        score_value = data.get('score')
        username = data.get('username')
        if score_value is not None and username:
            Score.objects.create(score=score_value, username=username)
            return JsonResponse({'status': 'success'})
        return JsonResponse({'status': 'fail'}, status=400)


def score_board(request):
    scores = Score.objects.all().order_by('-score')[:10]
    return render(request, 'score_board.html', {'scores': scores})