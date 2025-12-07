from django.db import models
from django.contrib.auth.models import User
from django.utils import timezone
# user info model
class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    image = models.ImageField(upload_to="business_photo/", blank=True)
    intro = models.TextField(blank=True)
    
    def __str__(self):
        return f"{self.user.username}'s Profile"

# Tech used badges
TECH_CHOICES = [
    ('nextjs', 'Next.js'),
    ('designthinking', 'Design Thinking'),
    ('react', 'React'),
    ('typescript', 'TypeScript'),
    ('tailwindcss', 'Tailwind CSS'),
    ('daisyui', 'DaisyUI'),
    ('pwa', 'PWA'),
    ('html', 'HTML'),
    ('css', 'CSS'),
    ('javascript', 'JavaScript'),
    ('python', 'Python'),
    ('figma', 'Figma'),
    ('ux', 'UX'),
    ('agiledevelopment', 'Agile Development'),
    ('markdownmd', 'Markdown.md'),
    ('pytest', 'PyTest'),
    ('jest', 'Jest'),
    ('flaskapi', 'FlaskApi'),
    ('django', 'Django'),
    ('drf', 'DRF'),
    ('djoser', 'Djoser'),
    ('jwt', 'JWT'),
    ('djangochannels', 'Django Channels'),
    ('celery', 'Celery'),
    ('redis', 'Redis'),
    ('daphne', 'Daphne'),
    ('wagtail', 'Wagtail'),
    ('bootstrap', 'Bootstrap'),
    ('htmx', 'HTMX'),
    ('alpinejs', 'Alpine.js'),
    ('jquery', 'jQuery'),
    ('postgresql', 'PostgreSQL'),
    ('cloudinary', 'Cloudinary'),
    ('docker', 'Docker'),
    ('railway', 'Railway'),
    ('heroku', 'Heroku'),
    ('vercel', 'Vercel'),
    ('github', 'GitHub'),
    ('linux', 'Linux'),
]

# Multiple choices
class Tech(models.Model):
    slug = models.SlugField(unique=True)
    name = models.CharField(max_length=70, choices=TECH_CHOICES)
    
    class Meta:
        verbose_name_plural = 'Technologies'
    def __str__(self):
        return self.name

# Projects model
class Projects(models.Model):
    name = models.CharField(unique=True, blank=False, null=False, max_length=50)
    intro = models.CharField(max_length=150, unique=True, blank=False, null=False)
    docs = models.TextField()
    image = models.ImageField(upload_to="project_image/")
    tech = models.ManyToManyField(Tech, related_name="projects_all_tech")
    main_tech = models.ManyToManyField(
        Tech,
        related_name="projects_main_tech",
        verbose_name="Main Technologies"
    )
    created_at = models.DateTimeField(default=timezone.now, blank=True)
    
    class Meta:
        verbose_name_plural = 'Projects'
        ordering = ['-created_at']
    
    def __str__(self):
        return f"The project {self.name} | created at {self.created_at}"

# Education model
class Education(models.Model):
    course = models.CharField(max_length=255)
    school = models.CharField(max_length=255)
    start_date = models.DateField(default=timezone.now)
    end_date = models.DateField(default=timezone.now)

    class Meta:
        unique_together = ('course', 'start_date', 'end_date')
    
    @property
    def period(self):
        return f"{self.start_date} - {self.end_date}"
   
    def __str__(self, obj):
        return f"{obj.course} | {obj.school}"
    
# Skill categories
class SkillCategory(models.Model):
    title = models.CharField(max_length=200)

    class Meta:
        verbose_name_plural = "Skill Categories"
        unique_together = ('title',)
    
    def __str__(self):
        return self.title

# Skills model
class Skill(models.Model):
    category = models.ForeignKey(
        SkillCategory, related_name='skills', on_delete=models.CASCADE
    )
    name = models.CharField(max_length=150)
    
    class Meta:
        unique_together = ('name',)
    
    def __str__(self):
        return self.name

# Certivicates
class Certificate(models.Model):
    name = models.CharField(max_length=255, blank=True)
    image = models.ImageField(upload_to="documents/certificates/")
    resume = models.FileField(upload_to="documents/resume/", blank=True, null=True)
    
    def __str__(self):
        return f"{self.name} | certificate"

# Contacts
class Contact(models.Model):
    name = models.CharField(max_length=255)
    email = models.EmailField(blank=False, null=False)
    subject = models.CharField(blank=False, null=False)
    message = models.TextField(blank=False, null=False)
    created_at = models.DateTimeField(default=timezone.now, blank=True)
    
    class Meta:
        ordering = ['-created_at']
    def __str__(self):
        return f"Email from {self.name} | {self.created_at}"