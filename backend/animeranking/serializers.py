from rest_framework import serializers
from .models import Title

class TitleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Title
        fields = ['media_id', 'title']

