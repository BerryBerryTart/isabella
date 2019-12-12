from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns
from notes import views
from django.views.generic import TemplateView

from django.contrib import admin
from django.contrib.auth import views as auth_views

urlpatterns = [
    path('notes/', views.NoteList.as_view()),
    path('new-note/', views.NewNote.as_view()),
    path('notes/<int:pk>/', views.NoteDetail.as_view()),
    path('notes/complete/<int:pk>/', views.NoteCompleted.as_view()),

    path('login/', auth_views.LoginView.as_view()),
    path('logout/', auth_views.LogoutView.as_view(next_page='/')),
    path('admin/', admin.site.urls),
]

urlpatterns = format_suffix_patterns(urlpatterns)
