from django.urls import path
from .. import views


urlpatterns = [
    # Landing page
    path("", views.landing_api, name='landing'),
]