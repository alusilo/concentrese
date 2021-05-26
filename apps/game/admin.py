from django.contrib import admin

from apps.game.models import GameUser

class GameUserAdmin(admin.ModelAdmin):
	fields = ('full_name', 'record', 'company', 'management', 'position', 'score', 'clicks', 'time', 'last_played')
	list_display = ('full_name', 'record', 'company', 'management', 'position', 'score', 'clicks', 'time', 'last_played', 'date_joined')
	search_fields = ('full_name', 'email')
	list_filter = ('company',)
	readonly_fields = fields

	def has_add_permission(self, request, obj=None):
		return False
	def has_delete_permission(self, request, obj=None):
		return False
	def has_change_permission(self, request, obj=None):
		return False

# Register your models here.
admin.site.register(GameUser, GameUserAdmin)
