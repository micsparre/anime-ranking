from django.db import models
from django.contrib.auth.models import User as AuthUser

class UserProfile(models.Model):
    user = models.OneToOneField(AuthUser, on_delete=models.CASCADE)
    # Add additional user-related fields if needed (e.g., profile picture, bio, etc.)

    def __str__(self):
        return self.user.username

class Anime(models.Model):
    title = models.CharField(max_length=255)
    genre = models.ManyToManyField('Genre')
    average_score = models.FloatField()
    popularity = models.PositiveIntegerField()
    start_date = models.DateField()
    end_date = models.DateField()

    def __str__(self):
        return self.title

class Genre(models.Model):
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name

class UserAnimeList(models.Model):
    user = models.ForeignKey(UserProfile, on_delete=models.CASCADE)
    anime = models.ForeignKey(Anime, on_delete=models.CASCADE)
    ranking = models.PositiveIntegerField()

    class Meta:
        unique_together = ('user', 'anime')  # Ensure a user can't add the same anime more than once

    def __str__(self):
        return f"{self.user.user.username}'s list: {self.anime.title} (Ranking: {self.ranking})"

class Recommendation(models.Model):
    user = models.ForeignKey(UserProfile, on_delete=models.CASCADE)
    anime = models.ForeignKey(Anime, on_delete=models.CASCADE)

    def __str__(self):
        return f"Recommended for {self.user.user.username}: {self.anime.title}"
