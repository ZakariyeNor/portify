## 📁 Project Structure

```bash
/portify-project
│
├── backend/                          # Django backend
│   ├── portify/                      # Django project folder
│   │   ├── __init__.py
│   │   ├── settings.py
│   │   ├── urls.py
│   │   ├── asgi.py
│   │   └── wsgi.py
│   │
│   ├── portfolio/                    # Main Django app
│   │   ├── models.py
│   │   ├── views.py
│   │   ├── urls.py
│   │   ├── serializers.py
│   │   └── admin.py
│   │
│   ├── Dockerfile                    # Backend Dockerfile
│   ├── entrypoint.sh                 # Docker entrypoint script
│   ├── manage.py
│   ├── README.md                     # Backend local docs
│   └── requirements.txt
│
├── frontend/                         # Next.js frontend
│   ├── layers/                       # Next.js app
│   │   ├── app/                      # App Router pages
│   │   ├── public/
│   │   ├── components/
│   │   ├── next.config.js
│   │   ├── package.json
│   │   └── tsconfig.json
│   │
│   └── README.md                     # Frontend local docs
│
├── docker-compose.yml                # Root Docker compose file
├── .env                              # Environment variables (backend + docker)
├── .gitignore                        # Git ignore rules
├── .dockerignore                     # Docker build ignore rules
└── README.md                         # Main project documentation
```
