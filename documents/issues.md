# 1 GitHub Issues (With Priority Percentages Applied)

Ready to paste directly into GitHub Issues or Milestones.

---

##  60% MUST-HAVE (Milestones 1–3)
These are required for the MVP.

---

#  Milestone 1 — Core Infrastructure (Must-Have, 20%)

### **Issue 1 — Initialize GitHub Repository**
- Create repository  
- Add README  
- Create `main` + `develop` branches  

---

### **Issue 2 — Set Up Project Folder Structure**
Create the following:
- `backend/`
- `frontend/`
- `docker/`
- `.env` files  
Add base configs and placeholders.

---

### **Issue 3 — Create Docker Setup (Django, Postgres, Redis, Next.js)**
- Add Dockerfiles  
- Add `docker-compose.yml`  
- Configure service networking  

---

### **Issue 4 — Configure Environment Variables**
- Create `.env` & `.env.example`  
- Secure backend & frontend variables  

---

#  Milestone 2 — Backend API (Must-Have, 20%)

### **Issue 5 — Initialize Django + DRF Project**
- Create Django project  
- Install DRF  
- Add core settings  

---

### **Issue 6 — Create Core Models**
Create models:
- Project  
- Skill  
- TechnicalSkill  
- Certificate  
- Vision  
- ContactMessage  

---

### **Issue 7 — Create Serializers & ViewSets**
- Implement DRF serializers  
- Write ViewSets for all models  

---

### **Issue 8 — Configure API URLs**
- Add `/api/` routing  
- Register ViewSets with DRF router  

---

### **Issue 9 — Integrate Cloudinary for Media Storage**
- Add Cloudinary credentials  
- Configure upload handling (projects, certificates, galleries)

---

### **Issue 10 — Write Backend Unit Tests**
Tests for:
- Models  
- Serializers  
- API endpoints  

---

#  Milestone 3 — Frontend Core Pages (Must-Have, 20%)

### **Issue 11 — Initialize Next.js + Tailwind + DaisyUI**
- Next.js setup  
- Tailwind config  
- DaisyUI integration  
- Global layout and theme  

---

### **Issue 12 — Build Homepage UI**
- Hero section  
- Intro text  
- Navigation links  

---

### **Issue 13 — Build Projects List & Project Detail Pages**
- `/projects` page with API integration  
- `/projects/[id]` detail page  
- Display gallery, images, docs  

---

### **Issue 14 — Build Skills & Vision Pages**
- `/skills` page  
- `/vision` page  
- Technical skill groups  
- Certificates display  

---

### **Issue 15 — Build 404 Page**
- Custom design  
- Navigation back to home  

---

##  20% SHOULD-HAVE (Milestones 4–5)
Enhances functionality but MVP works without these.

---

#  Milestone 4 — Contact System (Should-Have, 10%)

### **Issue 16 — Implement Contact Form API Integration**
- Connect frontend contact form  
- Submit to backend ContactMessage endpoint  

---

### **Issue 17 — Setup Email Sending (SMTP)**
- Configure Django email backend  
- Send notification on new message  

---

#  Milestone 5 — Celery + Redis Async Tasks (Should-Have, 10%)

### **Issue 18 — Configure Celery + Redis for Background Email**
- Add Celery worker service  
- Add Redis broker  
- Offload email sending to async task  

---

##  15% COULD-HAVE (Optional Future Tasks)
(Not included in the 18 issues — add later as enhancements.)

Examples:
- PWA offline support + manifest  
- SEO metadata setup  
- Lighthouse performance improvements  
- Accessibility improvements (WCAG)  

---

##  5% WON’T-HAVE (Auth Excluded from MVP)
No authentication or authorization required for MVP.

---

