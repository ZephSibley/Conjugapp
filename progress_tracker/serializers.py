from rest_framework import serializers
from progress_tracker.models import Max, Exercise

class ExerciseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Exercise
        fields = '__all__'

class MaxSerializer(serializers.ModelSerializer):
    class Meta:
        model = Max
        fields = '__all__'
        


