from django.db import models

import uuid

# Create your models here.
class GameUser(models.Model):
	id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
	full_name = models.CharField('Nombre completo', max_length=200, null=False)
	record = models.EmailField('Email', unique=True, null=False)
	company = models.CharField('Compañía', max_length=200, null=False)
	management = models.CharField('Gerencia', max_length=200, null=False)
	position = models.CharField('Cargo', max_length=200, null=False)
	date_joined = models.DateTimeField(auto_now_add=True)
	last_played = models.DateTimeField(auto_now_add=True)
	score = models.IntegerField('Puntaje', null=True, blank=True)
	clicks = models.IntegerField('Número de clicks', null=True, blank=True)
	time = models.FloatField('Tiempo (seg)', null=True, blank=True)

	def __str__(self):
		return '{} -> {}'.format(self.full_name, self.record)

class GameInfo(models.Model):
	title = models.CharField(max_length=200)
	description = models.TextField()

	def __str__(self):
		return "Configuración"
