from django.contrib import admin
from .models import UserProfile

class UserProfileAdmin(admin.ModelAdmin):
    fieldsets = (
        (None, {
            'fields': ('user', 'full_name', 'gender', 'place')
        }),
        ('Contact Information', {
            'fields': ('phone_number', 'state', 'country')
        }),
        ('Additional Information', {
            'fields': ('employment_type', 'date_of_birth', 'extra_field')
        }),
    )

    list_display = ('user', 'full_name', 'phone_number', 'employment_type')
    search_fields = ('user__username', 'full_name', 'phone_number')
    list_filter = ('employment_type', 'state', 'country')

admin.site.register(UserProfile, UserProfileAdmin)
