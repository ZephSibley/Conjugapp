from django.db import models
from django.conf import settings

# Create your models here.
class Exercise(models.Model):
    exercise_name = models.CharField(max_length=20)
    def __str__(self):
        return self.exercise_name

class Max(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, default=1)
    exercise = models.ForeignKey(Exercise, on_delete=models.CASCADE)
    date = models.DateField('date performed')
    max_lift = models.IntegerField(default=0)
    def __str__(self):
        return self.max_lift, self.date
