# Tasks Step-by-Step  
Comprehensive breakdown of backend, frontend, and DevOps tasks for the portfolio project.

---

## Backend Tasks

### 1. Project Setup  
- Set up Django project  
- Configure PostgreSQL database  
- Install & configure Django REST Framework (DRF)

### 2. Create Models  
- **Project**  
  - Fields: `name`, `intro`, `image`, `docs`, `gallery`  
- **Skill**  
  - Fields: `name`, `school`, `period`  
- **TechnicalSkill**  
  - Fields: `category`, `name`  
- **Certificate**  
  - Fields: `name`, `image`  
- **Vision**  
  - Fields: `title`, `description`, `guiding_principles`, `long_term_goals`  
- **ContactMessage**  
  - Fields: `name`, `email`, `subject`, `message`

### 3. API Layer  
- Create DRF serializers  
- Create ViewSets for all models  
- Configure URL routers for API endpoints  

### 4. Background Tasks  
- Set up **Celery + Redis** (async tasks)  
- Enable Celery for sending emails (contact form)

### 5. Configuration  
- Admin setup for all models  
- Integrate Cloudinary for media (images, documents, galleries)

### 6. Testing  
- Write tests for:  
  - Models  
  - API endpoints  

---

## Frontend Tasks

### 1. Setup  
- Initialize Next.js project  
- Add Tailwind CSS + DaisyUI  
- Add TypeScript  
- Add PWA support  

### 2. Create Pages  
- `/` — Homepage  
- `/projects` — Projects list  
- `/projects/[id]` — Project Detail  
- `/skills` — Skills page  
- `/contact` — Contact form  
- `/vision` — Vision page  
- `/404` — Custom 404  

### 3. Build Components  
- Navbar  
- Footer  (contact page and home page)
- Cards  
- Forms  
- Galleries  
- Horizontal scroll components  

### 4. API Integrations  
- Fetch data from backend for:  
  - Projects  
  - Skills  
  - Vision  
- Implement contact form submission → Django API  
- Add resume download functionality  

### 5. PWA Features  
- Offline support  
- Manifest.json  
- App install support  

### 6. UX / UI Testing  
- Test responsive behavior across devices  

---

## Deployment / DevOps Tasks

### 1. Docker  
- Dockerize Django backend  
- Include Celery + Redis + Postgres services  
- Dockerize Next.js frontend  

### 2. Deployment  
- Deploy backend to **Railway**  
- Deploy frontend to **Vercel**  

### 3. Media & Static  
- Connect Cloudinary for:  
  - Images  
  - Documents  
  - Galleries  

---

