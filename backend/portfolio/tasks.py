from celery import shared_task
from django.conf import settings
from django.core.mail import send_mail

@shared_task(bind=True)
def send_contact_email(self, name, subject, email, message, contact_id=None):
    """
        Async task to send contact email to the recipient
    """
    
    recipient = getattr(settings, "CONTACT_RECIPIENT_EMAIL", None)
    if not recipient:
        return {"status": "no_recipient"}
    
    subject_line = f"Contact form: {subject} - from {name}"
    body = f"Name: {name}\nEmail: {email}\n\nMessage:\n{message}\n\nContact ID: {contact_id}"
    send_mail(
        subject=subject_line,
        message=body,
        from_email=settings.DEFAULT_FROM_EMAIL,
        recipient_list=[recipient],
        fail_silently=False,
    )
    return {"status": "sent"}