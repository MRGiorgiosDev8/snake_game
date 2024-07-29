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
        if score_value is not None:
            Score.objects.create(score=score_value)
            return JsonResponse({'status': 'success'})
        return JsonResponse({'status': 'fail'}, status=400)

class ScoreListView(View):
    def get(self, request):
        scores = Score.objects.all().order_by('-score')[:10]
        scores_data = [{'score': score.score, 'timestamp': score.timestamp} for score in scores]
        return JsonResponse(scores_data, safe=False)

def score_board(request):
    scores = Score.objects.all().order_by('-score')[:10]
    return render(request, 'score_board.html', {'scores': scores})
