from django.http import HttpResponseRedirect
from django.shortcuts import render
from django.views import View
from django.core.exceptions import ObjectDoesNotExist
from django.http import Http404

from apps.game.forms import GameUserCreationAndCheckForm
from apps.game.models import GameUser

import datetime

# Create your views here.
class HomeView(View):
	form_class = GameUserCreationAndCheckForm
	# initial = {'full_name': 'value'}
	template_name = 'index.html'

	def get(self, request, *args, **kwargs):
		form = self.form_class()
		session_keys = list(request.session.keys())
		for key in session_keys:
			if key == 'full_name':
				del request.session[key]
			elif key == 'record':
				del request.session[key]
			elif key == 'company':
				del request.session[key]
			elif key == 'management':
				del request.session[key]
			elif key == 'position':
				del request.session[key]
			elif key == 'id':
				del request.session[key]
		
		return render(request, self.template_name, {'form': form})

	def post(self, request, *args, **kwargs):
		form = self.form_class(request.POST)
		if form.is_valid():
			full_name = form.cleaned_data['full_name']
			record = form.cleaned_data['record']
			company = form.cleaned_data['company']
			management = form.cleaned_data['management']
			position = form.cleaned_data['position']
			user = GameUser(
				full_name=full_name,
				record=record,
				company=company,
				management=management,
				position=position
			)
			user.save()

			request.session['full_name'] = user.full_name
			request.session['record'] = user.record
			request.session['company'] = user.company
			request.session['management'] = user.management
			request.session['position'] = user.position
			request.session['id'] = str(user.pk)

			return HttpResponseRedirect('/game/')
		else:
			record = request.POST.get('record')
			try:
				user = GameUser.objects.get(record=record)
				request.session['id'] = str(user.pk)
				request.session['full_name'] = user.full_name
				request.session['record'] = user.record
				request.session['company'] = user.company
				request.session['management'] = user.management
				request.session['position'] = user.position
				return HttpResponseRedirect('/game/')
			except ObjectDoesNotExist:
				pass

		return render(request, self.template_name, {'form': form})

class GameView(View):
	template_name = 'game.html'

	def get(self, request, *args, **kwargs):
		if request.session.keys():
			try:
				user = GameUser.objects.get(pk=request.session['id'])
			except ObjectDoesNotExist:
				raise Http404
			return render(request, self.template_name, {'data': request.session})
		else:
			raise Http404

	def post(self, request, *args, **kwargs):
		id = request.POST.get('id')
		score = request.POST.get('score')
		clicks = request.POST.get('clicks')
		time = request.POST.get('time')
		user = GameUser.objects.get(pk=id)
		user.score = score
		user.clicks = clicks
		user.time =  time
		user.last_played = datetime.datetime.now()
		user.save()

		session_keys = list(request.session.keys())
		for key in session_keys:
			if key == 'full_name':
				del request.session[key]
			elif key == 'record':
				del request.session[key]
			elif key == 'company':
				del request.session[key]
			elif key == 'management':
				del request.session[key]
			elif key == 'position':
				del request.session[key]
			elif key == 'id':
				del request.session[key]

		return HttpResponseRedirect('/')