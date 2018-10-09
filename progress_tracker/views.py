from progress_tracker.models import Exercise, Max
from progress_tracker.serializers import MaxSerializer, ExerciseSerializer
from rest_framework import generics, filters, permissions
from rest_framework.views import APIView

#if user is admin, view, if not 403

class ExerciseListCreate(generics.ListCreateAPIView):
    queryset = Exercise.objects.all()
    serializer_class = ExerciseSerializer

class MaxListCreate(generics.ListCreateAPIView):
    queryset = Max.objects.all()
    serializer_class = MaxSerializer
    filter_backends = (filters.OrderingFilter,)
    ordering_fields = ('exercise', 'date',)
    ordering = ('exercise', 'date',)
    permission_classes = (permissions.IsAuthenticated,)

    def perform_create(self, serializer):
        user = self.request.user
        serializer.save(user=user)

    # User can only access the data associated with the user.
    def get_queryset(self):
        user = self.request.user
        return Max.objects.filter(user=user)


class MaxDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Max.objects.all()
    serializer_class = MaxSerializer
    permission_classes = (permissions.IsAuthenticated,)

    def get_queryset(self):
        user = self.request.user
        return Max.objects.filter(user=user)
