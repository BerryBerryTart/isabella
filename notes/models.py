from django.db import models

# Create your models here.
class Note(models.Model):
    NOTE_TYPES = [('home', 'home'), ('work', 'work'), ('other', 'other')]

    created = models.DateTimeField(auto_now_add=True)
    id = models.AutoField(primary_key=True)
    title = models.CharField(max_length=100, blank=True, default='')
    note = models.TextField(max_length=400)
    type = models.CharField(max_length=100, choices=NOTE_TYPES, default='work')
    completed = models.BooleanField(default=False)

    class Meta:
        ordering = ['created']
