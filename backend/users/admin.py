from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin 
from django.contrib.auth.models import User
from django.contrib.admin.sites import NotRegistered
from .models import Player

# inline admin descriptor for Employee model (acts like singleton)
class PlayerInLine(admin.StackedInline):
    model = Player 
    can_delete = False 
    verbose_name_plural = "player"

# define new User admin 
class PlayerAdmin(admin.ModelAdmin):
    list_display = ('user', 'points')  # Display fields in the admin list view
    search_fields = ('user__username', 'points')  # Enable search by username and points

# Register your models here.
try: 
    admin.site.unregister(Player)
except NotRegistered: 
    pass 

admin.site.register(Player, PlayerAdmin)