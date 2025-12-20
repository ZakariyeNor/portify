from django.db import models
from django.contrib.auth.models import User
from django.utils.timezone import localdate

from cloudinary.models import CloudinaryField




# user info model
class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    image = CloudinaryField(
        'image', folder='portify/profile/', blank=True, null=True
    )
    intro = models.TextField(blank=True)
    
    def __str__(self):
        return f"{self.user.username}'s Profile"

# Tech used badges
TECH_CHOICES = [
    ('nextjs', 'Next.js'),
    ('design-thinking', 'Design Thinking'),
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
    ('django-channels', 'Django Channels'),
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
    ('tenants', 'Tenants'),
    ('S3', 'S3'),
    
]

# Multiple choices
class Tech(models.Model):
    slug = models.SlugField(unique=True)
    name = models.CharField(max_length=70, choices=TECH_CHOICES)
    
    class Meta:
        verbose_name_plural = 'Technologies'
    def __str__(self):
        return self.name

# Category choices
CATEGORY_CHOICES = [
    ('static', 'Static Websites'),
    ('interactive', 'Interactive Frontend'),
    ('cli', 'CLI Apps'),
    ('fullstack', 'Full-Stack Web App'),
    ('ecommerce', 'E-Commerce Web App'),
]

# Projects model
class Projects(models.Model):
    name = models.CharField(unique=True, blank=False, null=False, max_length=50)
    intro = models.CharField(max_length=150, unique=True, blank=False, null=False)
    docs = models.TextField()
    image = CloudinaryField(
        'image', folder='portify/projects/', blank=True, null=True
    )
    tech = models.ManyToManyField(Tech, related_name="projects_all_tech")
    main_tech = models.ManyToManyField(
        Tech,
        related_name="projects_main_tech",
        verbose_name="Main Technologies"
    )
    category = models.CharField(
        max_length=20, 
        choices=CATEGORY_CHOICES, 
        default='static'
    )
    live_url = models.URLField(blank=True, null=True)
    source_code = models.URLField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True, blank=True)
    
    class Meta:
        verbose_name_plural = 'Projects'
        ordering = ['-created_at']
    
    def __str__(self):
        return f"The project {self.name} | created at {self.created_at}"

# Assessments model
class AssessmentImage(models.Model):
    project = models.ForeignKey(
        Projects, 
        on_delete=models.CASCADE, 
        related_name="assessment_images"
    )
    image = CloudinaryField(
        'image', folder='portify/assessments/'
    )
    title = models.CharField(max_length=255, blank=True, null=True)  # e.g., LO1, LO2...
    description = models.CharField(blank=True, null=True)

    def __str__(self):
        return f"Assessment {self.title} for {self.project.name}"


# Education model
class Education(models.Model):
    course = models.CharField(max_length=255)
    school = models.CharField(max_length=255)
    start_date = models.DateField(null=True, blank=True)
    end_date = models.DateField(null=True, blank=True)

    class Meta:
        unique_together = ('course', 'start_date', 'end_date')
    
    @property
    def period(self):
        return f"{self.start_date} - {self.end_date}"
   
    def __str__(self):
        return f"{self.course} | {self.school}"
    
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
    image = CloudinaryField(
        'file', folder='portify/documents/certificates/', blank=True, null=True
    )
    resume = CloudinaryField(
        'file', folder='portify/documents/resumes/', blank=True, null=True
    )
    about = models.TextField(blank=True, null=True)
    
    def __str__(self):
        return f"{self.name} | certificate"

# Contacts
class Contact(models.Model):
    name = models.CharField(max_length=255)
    email = models.EmailField(blank=False, null=False)
    subject = models.CharField(blank=False, null=False)
    message = models.TextField(blank=False, null=False)
    created_at = models.DateTimeField(auto_now_add=True, blank=True)
    
    class Meta:
        ordering = ['-created_at']
    def __str__(self):
        return f"Email from {self.name} | {self.created_at}"

# Vision models
class Visions(models.Model):
    title = models.CharField()
    sub_title = models.CharField()
    vision_intro = models.TextField()
    principles_title = models.CharField()
    longterm_title = models.CharField()
    created_at = models.DateTimeField(auto_now_add=True, blank=True)
    updated_at = models.DateTimeField(auto_now=True, blank=True)
    
    class Meta:
        verbose_name_plural = 'Visions'
    
    def __str__(self):
        return f"{self.title}"

# Principles
class Principle(models.Model):
    vision = models.ForeignKey(
        Visions, on_delete=models.CASCADE, related_name='principles_list', null=True, blank=True
    )
    title = models.CharField(max_length=200)
    content = models.CharField()
    

    key = models.SlugField(
        max_length=50,
        unique=True,
        default="temp",
        help_text="Stable identifier (used in frontend logic, not shown to users)"
    )

# Long-term goals
class LongTerm(models.Model):
    vision = models.ForeignKey(
        Visions, on_delete=models.CASCADE, related_name='long_term_list', null=True, blank=True
    )

    year = models.CharField(max_length=200)
    plan = models.CharField(max_length=255, null=True, blank=True)
    description = models.TextField()

    class Meta:
        ordering = ["year"]

    def __str__(self):
        return f"{self.year} – {self.plan}"
    