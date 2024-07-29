from django.urls import path
from .views import home, start_game, SaveScoreView, score_board

urlpatterns = [
    path('', home, name='home'),
    path('start_game/', start_game, name='start_game'),
    path('save_score/', SaveScoreView.as_view(), name='save_score'),
    path('score_board/', score_board, name='score_board'),
]