from django import forms

from apps.game.models import GameUser

# Register your models here.
class GameUserCreationAndCheckForm(forms.ModelForm):
	full_name = forms.CharField(label='', widget=forms.TextInput(attrs={'placeholder': 'Nombre completo...'}))
	record = forms.EmailField(label='', widget=forms.TextInput(attrs={'placeholder': 'Correo electrónico...'}))
	company = forms.CharField(label='', widget=forms.TextInput(attrs={'placeholder': 'Compañía...'}))
	management = forms.CharField(label='', widget=forms.TextInput(attrs={'placeholder': 'Gerencia...'}))
	position = forms.CharField(label='', widget=forms.TextInput(attrs={'placeholder': 'Cargo..'}))

	class Meta:
		model = GameUser
		fields = ('full_name', 'record', 'company', 'management', 'position')

	# def clean_record(self):
	# 	record = self.cleaned_data['record']
	# 	return record