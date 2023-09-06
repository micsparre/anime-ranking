from django.db import models

class Anime(models.Model):
    title = models.CharField(max_length=255)
    description = models.TextField()
    release_date = models.DateField()
    # Add more fields as needed

class UserAnimeRanking(models.Model):
    user = models.ForeignKey('auth.User', on_delete=models.CASCADE)
    anime = models.ForeignKey(Anime, on_delete=models.CASCADE)
    ranking = models.PositiveIntegerField()
    # Add more fields as needed
    
class Title(models.Model):
    name = models.CharField(max_length=255)
    media_id = models.IntegerField(default=0)
    def __str__(self):
        return self.name
    
        
    
