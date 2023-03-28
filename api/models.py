from django.db import models

# Create your models here.

class Note(models.Model):
    body = models.TextField(null=True, blank=True) # can be saved in DB with null values
    updated = models.DateTimeField(auto_now=True) # will take current time when saved
    created = models.DateTimeField(auto_now_add=True) # only takes time stamp on first creation of the model

    def __str__(self):
        return self.body[0:50] # return only first 50 chars
