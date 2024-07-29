from django.db import models

class Score(models.Model):
    score = models.IntegerField()
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Score: {self.score} at {self.timestamp}"