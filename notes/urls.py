from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns
from notes import views
from django.views.generic import TemplateView

urlpatterns = [
    path('notes/', views.NoteList.as_view()),
    path('notes/<int:pk>/', views.NoteDetail.as_view()),
    path('notes/complete/<int:pk>/', views.NoteCompleted.as_view()),
    path('notes/sort-by/<str:type>/', views.NoteSortBy.as_view()),
]

urlpatterns = format_suffix_patterns(urlpatterns)
