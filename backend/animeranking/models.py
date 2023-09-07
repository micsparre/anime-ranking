from django.db import models

class Title(models.Model):
    media_id = models.IntegerField()  # Replace 'IntegerField' with the actual data type for 'media_id'
    title = models.CharField(max_length=255)  # Replace 'CharField' and set the max length as needed

    def __str__(self):
        return self.title  # Return a meaningful representation of the object

    
