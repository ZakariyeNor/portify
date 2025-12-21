# Portify - Personal Portfolio Platform

A full-stack web application for building and showcasing a personal portfolio. Portify allows users to create, manage, and display their professional portfolios with integrated project showcases, skills management, vision/goals statements, and contact capabilities.

Portify - Personal Portfolio Platform | GitHub commit activity | GitHub last commit | GitHub repo size

## HOME PAGE

Purpose
The Home Page introduces visitors to the portfolio owner with a hero section, featured projects, skills overview, and educational background.

Features
- Hero Section with portfolio owner introduction and professional introduction
- Featured Projects showcase highlighting recent work
- Skills Summary displaying key competencies organized by category
- Education History overview
- Call-to-Action buttons for contact or viewing full portfolio

Backend Integration
- Loads portfolio data dynamically from Django models (Profile, Projects, Skill, Education)
- Displays featured projects and skills from backend API
- Integrates with Cloudinary for profile images and project media

Works As Expected
- Fully responsive design for desktop and mobile viewports
- Real-time data loading from backend API
- Smooth navigation to all portfolio sections

## PROJECTS PAGE

Purpose
The Projects Page displays all portfolio projects in an organized, filterable layout. Users can browse projects by category and filter by technologies used.

Features
- Project Grid Layout showcasing all projects with images and summaries
- Category Filter for browsing by project type (Static Websites, Interactive Frontend, CLI Apps, Full-Stack Web App, E-Commerce Web App, PWA)
- Technology Filter to find projects using specific tech stacks
- Project Cards containing project thumbnail image, title, description, technologies used (badges/tags), and links to live project and source code
- Caching enabled for optimized performance

Backend Integration
- Projects fetched from Django REST API with caching mechanism
- Filtering handled via query parameters
- Technology data fetched from Tech model with ManyToMany relationships
- Images managed through Cloudinary integration
- 1-minute cache TTL for performance optimization

Works As Expected
- Fully responsive grid layout adapting to mobile and desktop
- Filters update project display efficiently
- All links to live projects and source code work correctly
- Caching improves load times

## PROJECT DETAIL PAGE

Purpose
The Project Detail Page provides comprehensive information about a specific project. It showcases project description, technologies used, documentation, and direct links to live project and source code.

Features
- Project Header with title, intro description, and featured image
- Project Overview with detailed documentation (docs, body, footer sections)
- Technologies Used displayed as badges (all tech and main tech separated)
- Project Category information
- Links Section with Live Project URL and GitHub Source Code Link
- Assessment Images gallery showing project learning outcomes and documentation
- Project Metadata including creation date

Backend Integration
- Project data fetched by project detail view via project ID
- Technology relationships displayed from Tech model (ManyToMany)
- Assessment images loaded from AssessmentImage related model
- Images and media loaded from Cloudinary
- Caching implemented for single project retrieval

Works As Expected
- Clean, readable layout for all project information
- All external links function correctly
- Assessment images display properly in gallery format
- Responsive design maintains readability on all devices

## SKILLS PAGE

Purpose
The Skills Page displays the portfolio owner's professional skills, education, and certifications organized in a unified view.

Features
- Skill Categories organized with related skills displayed under each category
- Education Timeline showing courses and institutions with start/end dates
- Certificates display with images and documents
- Unified endpoint returning education, certificates, and skill categories with nested skills in single request
- Professional development information

Backend Integration
- Skills fetched from Skill model grouped by SkillCategory
- Education data fetched from Education model
- Certificates loaded with CloudinaryField for file storage
- UnifiedSkillsData endpoint returns all skills page data in one call
- Reduces API calls by combining multiple data sources

Works As Expected
- Skills organized by category and easily scannable
- Education timeline clearly displays learning progression
- Certificates display with supporting documentation
- Responsive layout works on all devices
- Single unified API call improves page load performance

## CONTACT PAGE

Purpose
The Contact Page enables visitors to get in touch with the portfolio owner. The contact form submission automatically sends an email notification via Celery task queue.

Features
- Contact Form with fields for Name, Email, Subject, Message
- Form Validation ensuring all required fields are completed
- Success Response after form submission
- Async Email Notification sent to portfolio owner via Celery

Backend Integration
- Form submissions saved to Contact model
- Email notifications sent via Celery task (send_contact_email)
- Form validation handled by ContactSerializer
- Allows unauthenticated users to submit forms
- Timestamps recorded for each submission

Works As Expected
- Form submissions process correctly and instantly
- Validation messages display appropriately
- Email notifications sent asynchronously without blocking user
- Form data persisted in database for future reference
- Responsive layout works on all screen sizes

## VISION/GOALS PAGE

Purpose
The Vision/Goals Page displays the portfolio owner's professional vision, core principles, and long-term goals with timeline information.

Features
- Vision Title and Subtitle introduction
- Vision Intro description of overall professional direction
- Principles Section displaying core professional principles and values
- Long-Term Goals Timeline organized by year with descriptions and plans
- Timestamp metadata (created and updated dates)

Backend Integration
- Vision data fetched from Visions model
- Principles fetched from Principle model with foreign key relationship
- Long-term goals fetched from LongTerm model with year-based ordering
- All data accessible via VisionViewSet with GET permission for public access
- Timestamps tracked for content updates

Works As Expected
- Vision statement clearly communicates professional direction
- Principles organized and easily understandable
- Long-term goals timeline displays chronologically
- All content dynamically retrieved from backend
- Responsive layout maintains clarity on all devices

## TECH STACK

Backend Technologies

| Badge | Technology | Version | Purpose |
|-------|-----------|---------|---------|
| **Django** | Django | 5.2.7 | Web framework for REST API and core backend logic |
| **DRF** | Django REST Framework | 3.16.1 | RESTful API development and serialization |
| **PostgreSQL** | PostgreSQL | 15 | Primary relational database |
| **Redis** | Redis | 7 | Caching engine and Celery broker |
| **Celery** | Celery | 5.5.3 | Asynchronous task processing (email notifications) |
| **Python** | Python | 3.13 | Programming language |
| **Gunicorn** | Gunicorn | 23.0.0 | WSGI HTTP server |
| **Cloudinary** | Cloudinary Field | 1.44.1 | Cloud media storage for images and documents |
| **CORS** | django-cors-headers | 4.9.0 | Cross-Origin Resource Sharing handling |
| **Environ** | django-environ | 0.12.0 | Environment variable configuration |
| **JWT** | djangorestframework-simplejwt | 5.5.1 | JWT token authentication |
| **Database URL** | dj-database-url | 3.0.1 | Database URL parsing |
| **API Docs** | drf-yasg | 1.21.11 | Swagger/ReDoc API documentation |
| **Cache** | django-redis | 6.0.0 | Redis caching backend |

Frontend Technologies

| Badge | Technology | Version | Purpose |
|-------|-----------|---------|---------|
| **Next.js** | Next.js | 16.0.8 | React framework with App Router and SSR |
| **React** | React | 19.2.1 | UI library and component framework |
| **TypeScript** | TypeScript | 5 | Type-safe JavaScript development |
| **Tailwind CSS** | Tailwind CSS | 4 | Utility-first CSS framework |
| **DaisyUI** | DaisyUI | 5.5.8 | Component library built on Tailwind |
| **Axios** | Axios | 1.13.2 | HTTP client for API communication |
| **Icons** | React Icons | 5.5.0 | Icon library (FontAwesome, Feather, etc.) |
| **Toast** | React Hot Toast | 2.6.0 | Toast notifications for user feedback |
| **Marquee** | React Fast Marquee | 1.6.5 | Animated marquee scrolling component |
| **Sitemap** | Next Sitemap | 4.2.3 | Automated sitemap generation for SEO |
| **Merge** | Tailwind Merge | 3.4.0 | Utility class merging helper |
| **ESLint** | ESLint | 9 | JavaScript/TypeScript code linting |

DevOps & Infrastructure

| Badge | Technology | Purpose |
|-------|-----------|---------|
| **Docker** | Docker | Container management and local development |
| **Docker Compose** | Docker Compose | Multi-container orchestration for local setup |
| **Railway** | Railway | Backend deployment platform with PostgreSQL and Redis |
| **Vercel** | Vercel | Frontend deployment platform with Edge Network |
| **GitHub** | GitHub | Version control and repository hosting |
| **Git** | Git | Distributed version control system |

## DATABASE MODELS

Core Models

Profile
- User profile information with OneToOne relationship to Django User
- Stores profile image (Cloudinary) and personal introduction

Projects
- Project information including name, introduction, documentation (docs, body, footer)
- ManyToMany relationships for all technologies used and main technologies
- Project category classification
- Live URL and source code URL fields
- Creation timestamp and ordering

Tech
- Technology/language definitions with slug and name
- Used across projects via ManyToMany relationships

AssessmentImage
- Project assessment/learning outcome images
- ForeignKey to Projects for gallery relationship
- Cloudinary storage with title and description fields

Education
- Educational background with course name, school, and date range
- Unique constraints to prevent duplicates
- Period calculation property

SkillCategory
- Skill category groupings
- ForeignKey relationship with Skill model

Skill
- Individual skills with category grouping
- Unique names to prevent duplicates

Certificate
- Certifications and professional credentials
- Cloudinary storage for certificate images and resume documents
- Additional descriptive content field

Contact
- Contact form submissions from visitors
- Stores name, email, subject, message
- Automatic timestamp on creation
- Ordered chronologically (newest first)

Visions
- Professional vision statements and goals
- Title, subtitle, vision introduction
- Principles section title and long-term goals title
- Timestamps for creation and updates

Principle
- Core professional principles and values
- ForeignKey to Visions model
- Unique slug key for frontend reference

LongTerm
- Long-term goals and plans organized by year
- ForeignKey to Visions model
- Year, plan name, and detailed description fields
- Chronologically ordered by year

## DEPLOYMENT

Backend Deployment - Railway
The backend is deployed on Railway at: https://portify-production-center.up.railway.app

Railway provides:
- Automatic deployments from GitHub
- PostgreSQL database hosting
- Redis cache hosting
- Environment variable management
- Release command for migrations
- Procfile-based configuration

Setup Steps
1. Create Railway account at https://railway.app
2. Connect GitHub repository to Railway
3. Add PostgreSQL service (auto-creates DATABASE_URL)
4. Add Redis service (auto-creates REDIS_URL)
5. Configure environment variables in Railway dashboard
6. Deploy via git push to main branch
7. Railway automatically runs Procfile commands and deploys the application

Procfile Configuration
The Procfile includes:
- release command: Runs migrations and collects static files before deployment
- web command: Starts Gunicorn WSGI server with 3 workers and 120-second timeout

Frontend Deployment - Vercel
The frontend is deployed on Vercel at: https://portify-frontend.vercel.app

Vercel provides:
- Automatic deployments from GitHub
- Serverless functions support
- Edge network CDN
- Preview deployments for pull requests
- Environment variable management
- Automatic SSL certificates

Setup Steps
1. Create Vercel account at https://vercel.com
2. Connect GitHub repository to Vercel
3. Configure environment variables (NEXT_PUBLIC_API_URL pointing to Railway backend)
4. Deploy via git push to main branch
5. Vercel automatically builds and deploys Next.js application

## LOCAL DEVELOPMENT

Cloning the Repository
git clone https://github.com/ZakariyeNor/portify.git
cd portify

Install Backend Dependencies
cd backend
pip install -r requirements.txt

Install Frontend Dependencies
cd frontend/layers
npm install

Running with Docker Compose
From project root:
docker-compose up --build

Create superuser:
docker-compose exec web python3 manage.py createsuperuser

Access:
- Backend API: http://localhost:8000/api/
- API Docs: http://localhost:8000/api/swagger/
- Admin Panel: http://localhost:8000/admin/

Running Backend Locally
cd backend
python3 manage.py migrate
python3 manage.py createsuperuser
python3 manage.py runserver

Running Frontend Locally
cd frontend/layers
npm run dev

## DATABASE MIGRATIONS

Creating Migrations
After modifying models:
cd backend
python3 manage.py makemigrations
python3 manage.py migrate

Viewing Migration Status
docker-compose exec web python3 manage.py showmigrations

Applying Migrations on Railway
railway run python manage.py migrate --noinput

## TESTING

Manual Testing Documentation
All manual testing procedures and results are documented in MANUAL_TESTING.md

Test Coverage
- Home page rendering and data loading
- Project listing and filtering functionality
- Project detail page information display
- Skills page unified data endpoint
- Contact form submission and email notification
- Vision/goals page rendering
- API endpoint authentication and permissions
- Caching mechanism validation
- Responsive design across devices

## CREDITS

Technologies & Resources
- Django Documentation: https://docs.djangoproject.com/
- Django REST Framework: https://www.django-rest-framework.org/
- Next.js Documentation: https://nextjs.org/
- Tailwind CSS: https://tailwindcss.com/
- DaisyUI: https://daisyui.com/
- Cloudinary: https://cloudinary.com/
- Railway Documentation: https://docs.railway.app/
- PostgreSQL: https://www.postgresql.org/
- Redis: https://redis.io/
- Celery: https://docs.celeryproject.io/

Open Source Contributors
Special thanks to all open-source contributors whose libraries and tools made this project possible.

## LICENSE

This project is licensed under the MIT License - see LICENSE file for details.

## STATUS

Production Ready | Version 1.0.0 | Last Updated: December 20, 2025