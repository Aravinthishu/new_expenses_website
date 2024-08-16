from django import forms
from .models import UserProfile

class UserProfileForm(forms.ModelForm):
    class Meta:
        model = UserProfile
        fields = ['full_name', 'phone_number', 'employment_type', 'gender', 'place', 'state', 'country', 'date_of_birth']
