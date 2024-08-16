import os
import json
from django.conf import settings
from django.contrib import messages
from django.shortcuts import render
from .models import UserPreference

def index(request):
    # Load currency data from the JSON file
    currency_data = []
    file_path = os.path.join(settings.BASE_DIR, 'currencies.json')

    try:
        with open(file_path, 'r') as json_file:
            data = json.load(json_file)
            currency_data = [{'name': k, 'value': v} for k, v in data.items()]
    except FileNotFoundError:
        messages.error(request, "Currency data file not found.")
        return render(request, 'preferences/index.html', {'currencies': []})

    # Get or create user preferences
    user_preferences, created = UserPreference.objects.get_or_create(
        user=request.user,
        defaults={'currency': 'USD'}  # Set a default currency
    )

    if request.method == 'POST':
        currency = request.POST.get('currency')
        user_preferences.currency = currency
        user_preferences.save()
        messages.success(request, 'Changes saved')

    # Render the template with context data
    return render(request, 'preferences/index.html', {
        'currencies': currency_data,
        'user_preferences': user_preferences
    })
