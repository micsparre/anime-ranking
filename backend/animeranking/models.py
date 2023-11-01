from django.db import models
from django.contrib.auth.models import User as AuthUser


class UserProfile(models.Model):
    user = models.OneToOneField(AuthUser, on_delete=models.CASCADE)

    def __str__(self):
        return self.user.username


class Anime(models.Model):
    title = models.CharField(max_length=255)
    genre = models.ManyToManyField('Genre')
    average_score = models.FloatField(null=True, blank=True)
    popularity = models.PositiveIntegerField(null=True, blank=True)
    start_date = models.DateField(null=True, blank=True)
    end_date = models.DateField(null=True, blank=True)
    episodes = models.PositiveIntegerField(null=True, blank=True)

    def __str__(self):
        return self.title


class Genre(models.Model):
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name


class UserAnime(models.Model):
    user = models.ForeignKey(UserProfile, on_delete=models.CASCADE)
    anime = models.ForeignKey(Anime, on_delete=models.CASCADE)
    ranking = models.PositiveIntegerField()

    class Meta:
        # Ensure a user can't add the same anime more than once
        unique_together = ('user', 'anime')

    def __str__(self):
        return f"{self.user.user.username}'s list: {self.anime.title} (Ranking: {self.ranking})"


class UserBookmarks(models.Model):
    user = models.ForeignKey(UserProfile, on_delete=models.CASCADE)
    anime = models.ForeignKey(Anime, on_delete=models.CASCADE)

    def __str__(self):
        return f"Bookmarked for {self.user.user.username}: {self.anime.title}"
