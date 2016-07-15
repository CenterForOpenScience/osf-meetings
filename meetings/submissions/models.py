from __future__ import unicode_literals
from django.db import models
from django.contrib.auth.models import User


class Submission(models.Model):
    node_id = models.CharField(max_length=10)
    date_created = models.DateTimeField(auto_now_add=True)
    title = models.CharField(max_length=100)
    contributors = models.ManyToManyField(User, blank=True, related_name="submission_contributors")
    description = models.TextField()
    conference = models.ForeignKey('conferences.Conference')
    approved = models.NullBooleanField(blank=True)

    class Meta:
        ordering = ('date_created',)
        permissions = (
        			('can_change_approved', 'Can change whether submission is approved'),
        			('view_submission', 'Can view submission'),
        			)
