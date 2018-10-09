from django.urls import path, include
from . import views

urlpatterns = [
    path('api/exercise/', views.ExerciseListCreate.as_view()),
    path('api/max/', views.MaxListCreate.as_view()),
    path('api/max/<int:pk>/', views.MaxDetailView.as_view()),
]