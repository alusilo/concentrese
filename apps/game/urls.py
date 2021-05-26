from django.conf.urls import url
from django.urls import path

from apps.game.views import HomeView, GameView

# Create your views here.
urlpatterns = [
	path('', HomeView.as_view(), name='home'),
	path('game/', GameView.as_view(), name='game'),
]