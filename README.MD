<div align="center">

<img src="https://img.shields.io/badge/PSU-Pacific%20States%20University-1a5c38?style=for-the-badge&logoColor=white" alt="PSU">

# PSU CRM & Project Management System

**Enterprise-grade CRM and Project Management platform built for Pacific States University**  
*By Konkuk University Foundation — Est. 1928 · Los Angeles, CA*

[![Next.js](https://img.shields.io/badge/Next.js-14-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178c6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-06b6d4?style=flat-square&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Node.js](https://img.shields.io/badge/Node.js-20.x-339933?style=flat-square&logo=node.js&logoColor=white)](https://nodejs.org/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16-336791?style=flat-square&logo=postgresql&logoColor=white)](https://www.postgresql.org/)
[![Docker](https://img.shields.io/badge/Docker-Ready-2496ed?style=flat-square&logo=docker&logoColor=white)](https://www.docker.com/)
[![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)](LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-Welcome-brightgreen?style=flat-square)](CONTRIBUTING.md)

---

**[Live Demo](https://psu-crm.vercel.app)** · **[API Docs](https://psu-crm-api.railway.app/docs)** · **[Report Bug](../../issues)** · **[Request Feature](../../issues)**

</div>

---

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Architecture](#architecture)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [API Reference](#api-reference)
- [Database Schema](#database-schema)
- [Deployment](#deployment)
- [Docker](#docker)
- [Contributing](#contributing)
- [License](#license)

---

## Overview

The **PSU CRM & Project Management System** is a full-stack, enterprise-grade web application built for Pacific States University's administrative, academic, and business operations. Inspired by Monday.com, it combines a powerful CRM pipeline, project/task management, team collaboration, document storage, and AI-powered analytics — all in one PSU-branded platform.

> Built and maintained by **Roise Uddin** — Adjunct Instructor, IEEE Senior Member & Cybersecurity Specialist, Pacific States University.

---

## Features

### 🏠 Dashboard
- Real-time KPI cards: Projects, Tasks, Team, Storage, Completion Rate
- Interactive area charts & pie charts (Recharts)
- Activity timeline with user avatars
- Notification center with categorized alerts
- Quick-access project overview panel

### 📁 Project Management
| Feature | Details |
|---|---|
| **Views** | Kanban Board, Table View, Calendar View, Timeline/Gantt |
| **Statuses** | Pending · In Progress · On Hold · Completed |
| **Priority** | High · Medium · Low with color indicators |
| **Tracking** | Progress %, budget vs spent, milestone dates |
| **Team** | Multi-user assignment with avatar stacks |
| **Attachments** | File upload per project via AWS S3 |
| **Comments** | Threaded discussion per project |

### ✅ Task & Assignment System
- Drag-and-drop Kanban board (dnd-kit)
- Task dependencies, checklists, recurring tasks
- Due date tracking with color-coded urgency
- Task history log and comment threads
- Email + in-app notifications
- Status: To Do → In Progress → Review → Completed

### 💼 CRM Module
- Customer & lead database with contact management
- Pipeline stages: Cold Lead → Active Lead → Proposal → Negotiation → Client
- Interaction history & follow-up reminders
- Deal value tracking and conversion analytics
- Communication log per customer

### 👥 Team & User Management
| Role | Permissions |
|---|---|
| **Super Admin** | Full system access |
| **Admin** | Manage users, projects, CRM |
| **Manager** | Create/edit projects and tasks |
| **Staff** | View and update assigned items |
| **Student/Intern** | Limited view access |
| **Client** | Read-only portal access |

### 📄 Document Storage
- Cloud file storage (AWS S3 / Firebase)
- Support: PDF, DOCX, XLSX, Images, Videos
- Folder hierarchy, file tagging, version control
- Download/share with permission controls
- Storage quota with usage visualization

### 💬 Communication
- Internal messaging and team chat (Socket.io)
- Announcement board (broadcast messages)
- Real-time notifications
- Meeting scheduler with Zoom/Google Meet links
- Email integration (Nodemailer / SendGrid)

### 📊 Reports & Analytics
- Project completion rates by team/period
- Employee productivity analytics
- CRM sales funnel visualization
- Budget utilization by project
- Export: PDF, Excel, CSV

### ⚡ AI Features (Claude API)
- Smart task recommendations
- Project summary generation
- AI email drafting assistant
- Deadline risk prediction
- OCR document reading
- AI chatbot assistant (context-aware)

---

## Tech Stack

### Frontend
```
Next.js 14 (App Router)     → React framework with SSR/SSG
TypeScript 5.0              → Type safety
Tailwind CSS 3.4            → Utility-first styling
shadcn/ui                   → Component library
Redux Toolkit               → Global state management
Framer Motion               → Animations & transitions
Recharts                    → Charts and data visualizations
dnd-kit                     → Drag-and-drop (Kanban)
React Hook Form + Zod       → Form validation
Socket.io-client            → Real-time updates
```

### Backend
```
Node.js 20 + Express.js     → REST API server
TypeScript                  → Type-safe backend
Drizzle ORM                 → Type-safe database ORM
PostgreSQL 16 (Neon)        → Primary database
Redis                       → Caching & session storage
JWT + OAuth2                → Authentication
Socket.io                   → WebSocket server
Nodemailer / SendGrid       → Email service
Multer + Sharp              → File upload & processing
```

### Infrastructure
```
Vercel                      → Frontend deployment (CDN)
Railway / AWS EC2           → Backend deployment
Neon / AWS RDS              → Managed PostgreSQL
AWS S3 / Cloudflare R2      → File storage
Docker + Docker Compose     → Containerization
Nginx                       → Reverse proxy & load balancer
GitHub Actions              → CI/CD pipeline
```

---

## Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                        CLIENT LAYER                          │
│         Next.js 14 · TypeScript · Tailwind · shadcn/ui       │
│                    Vercel (Edge CDN)                         │
└───────────────────────────┬─────────────────────────────────┘
                            │ HTTPS / WSS
┌───────────────────────────▼─────────────────────────────────┐
│                       API GATEWAY                            │
│                  Nginx (Rate Limiting)                       │
└──────┬─────────────────────────────────┬────────────────────┘
       │                                 │
┌──────▼──────────┐           ┌──────────▼──────────┐
│   REST API      │           │   WebSocket Server   │
│  Express.js     │           │     Socket.io        │
│  Railway / EC2  │           │  Real-time events    │
└──────┬──────────┘           └──────────┬───────────┘
       │                                 │
┌──────▼─────────────────────────────────▼───────────┐
│                   DATA LAYER                         │
│  PostgreSQL (Neon)  ·  Redis  ·  AWS S3             │
│  Drizzle ORM        ·  BullMQ (queues)              │
└──────────────────────────────────────────────────────┘
       │
┌──────▼──────────────────────────────────────────────┐
│                EXTERNAL SERVICES                     │
│  Claude API (AI)  ·  SendGrid (Email)               │
│  OAuth2 (Google/GitHub)  ·  Zoom API                │
└──────────────────────────────────────────────────────┘
```

---

## Project Structure

```
psu-crm-pm/
│
├── .github/
│   ├── workflows/
│   │   ├── ci.yml                  # CI pipeline (test + lint)
│   │   ├── deploy-frontend.yml     # Deploy to Vercel
│   │   └── deploy-backend.yml      # Deploy to Railway
│   └── ISSUE_TEMPLATE/
│       ├── bug_report.md
│       └── feature_request.md
│
├── frontend/                       # Next.js 14 App
│   ├── public/
│   │   ├── logo-psu.png
│   │   └── favicon.ico
│   ├── src/
│   │   ├── app/                    # Next.js App Router
│   │   │   ├── (auth)/
│   │   │   │   ├── login/page.tsx
│   │   │   │   └── register/page.tsx
│   │   │   ├── (dashboard)/
│   │   │   │   ├── layout.tsx
│   │   │   │   ├── page.tsx
│   │   │   │   ├── projects/
│   │   │   │   ├── tasks/
│   │   │   │   ├── crm/
│   │   │   │   ├── team/
│   │   │   │   ├── documents/
│   │   │   │   ├── reports/
│   │   │   │   └── ai/
│   │   │   ├── api/                # Next.js API Routes
│   │   │   └── layout.tsx
│   │   ├── components/
│   │   │   ├── ui/                 # shadcn/ui base components
│   │   │   │   ├── button.tsx
│   │   │   │   ├── card.tsx
│   │   │   │   ├── badge.tsx
│   │   │   │   ├── dialog.tsx
│   │   │   │   ├── input.tsx
│   │   │   │   ├── select.tsx
│   │   │   │   └── table.tsx
│   │   │   ├── layout/
│   │   │   │   ├── Sidebar.tsx
│   │   │   │   ├── Topbar.tsx
│   │   │   │   ├── NotificationPanel.tsx
│   │   │   │   └── PSULogo.tsx
│   │   │   ├── dashboard/
│   │   │   │   ├── KPICard.tsx
│   │   │   │   ├── ActivityFeed.tsx
│   │   │   │   ├── EnrollmentChart.tsx
│   │   │   │   └── TaskPieChart.tsx
│   │   │   ├── projects/
│   │   │   │   ├── ProjectTable.tsx
│   │   │   │   ├── KanbanBoard.tsx
│   │   │   │   ├── KanbanCard.tsx
│   │   │   │   ├── ProjectForm.tsx
│   │   │   │   └── GanttView.tsx
│   │   │   ├── crm/
│   │   │   │   ├── CustomerTable.tsx
│   │   │   │   ├── PipelineBoard.tsx
│   │   │   │   └── CustomerForm.tsx
│   │   │   ├── team/
│   │   │   │   ├── MemberCard.tsx
│   │   │   │   └── RoleManager.tsx
│   │   │   ├── documents/
│   │   │   │   ├── FileUploader.tsx
│   │   │   │   ├── FileTable.tsx
│   │   │   │   └── StorageBar.tsx
│   │   │   ├── reports/
│   │   │   │   ├── BarReport.tsx
│   │   │   │   ├── FunnelChart.tsx
│   │   │   │   └── BudgetUtilization.tsx
│   │   │   └── ai/
│   │   │       ├── ChatInterface.tsx
│   │   │       └── SuggestionChips.tsx
│   │   ├── hooks/
│   │   │   ├── useAuth.ts
│   │   │   ├── useProjects.ts
│   │   │   ├── useTasks.ts
│   │   │   ├── useCRM.ts
│   │   │   ├── useSocket.ts
│   │   │   └── useNotifications.ts
│   │   ├── lib/
│   │   │   ├── api.ts              # Axios instance
│   │   │   ├── auth.ts             # Auth helpers
│   │   │   ├── socket.ts           # Socket.io client
│   │   │   ├── utils.ts            # cn(), formatDate()
│   │   │   └── constants.ts        # PSU colors, roles
│   │   ├── store/
│   │   │   ├── index.ts            # Redux store
│   │   │   ├── authSlice.ts
│   │   │   ├── projectsSlice.ts
│   │   │   ├── tasksSlice.ts
│   │   │   └── crmSlice.ts
│   │   └── types/
│   │       ├── auth.types.ts
│   │       ├── project.types.ts
│   │       ├── task.types.ts
│   │       ├── crm.types.ts
│   │       └── user.types.ts
│   ├── next.config.ts
│   ├── tailwind.config.ts
│   ├── tsconfig.json
│   └── package.json
│
├── backend/                        # Express.js API Server
│   ├── src/
│   │   ├── controllers/
│   │   │   ├── auth.controller.ts
│   │   │   ├── projects.controller.ts
│   │   │   ├── tasks.controller.ts
│   │   │   ├── crm.controller.ts
│   │   │   ├── team.controller.ts
│   │   │   ├── documents.controller.ts
│   │   │   ├── reports.controller.ts
│   │   │   └── ai.controller.ts
│   │   ├── middleware/
│   │   │   ├── auth.middleware.ts   # JWT verification
│   │   │   ├── rbac.middleware.ts   # Role-based access
│   │   │   ├── rateLimit.middleware.ts
│   │   │   ├── upload.middleware.ts # Multer + S3
│   │   │   ├── validate.middleware.ts
│   │   │   └── logger.middleware.ts
│   │   ├── models/
│   │   │   ├── schema.ts           # Drizzle ORM schema
│   │   │   └── seed.ts             # Sample seed data
│   │   ├── routes/
│   │   │   ├── index.ts
│   │   │   ├── auth.routes.ts
│   │   │   ├── projects.routes.ts
│   │   │   ├── tasks.routes.ts
│   │   │   ├── crm.routes.ts
│   │   │   ├── team.routes.ts
│   │   │   ├── documents.routes.ts
│   │   │   ├── reports.routes.ts
│   │   │   └── ai.routes.ts
│   │   ├── services/
│   │   │   ├── auth.service.ts
│   │   │   ├── email.service.ts    # SendGrid
│   │   │   ├── storage.service.ts  # AWS S3
│   │   │   ├── ai.service.ts       # Claude API
│   │   │   ├── socket.service.ts   # Socket.io events
│   │   │   └── queue.service.ts    # BullMQ jobs
│   │   ├── utils/
│   │   │   ├── logger.ts           # Winston logger
│   │   │   ├── jwt.ts
│   │   │   ├── bcrypt.ts
│   │   │   ├── pagination.ts
│   │   │   └── errors.ts
│   │   ├── app.ts                  # Express app setup
│   │   └── server.ts               # Entry point
│   ├── config/
│   │   ├── database.ts             # Drizzle + Neon config
│   │   ├── redis.ts
│   │   ├── s3.ts
│   │   └── socket.ts
│   ├── drizzle/
│   │   └── migrations/             # Auto-generated migrations
│   ├── tsconfig.json
│   └── package.json
│
├── docs/
│   ├── API.md                      # Full API reference
│   ├── DEPLOYMENT.md               # Deployment guide
│   ├── DATABASE_SCHEMA.md          # ERD and schema docs
│   ├── CONTRIBUTING.md
│   └── SECURITY.md
│
├── scripts/
│   ├── seed.ts                     # Database seeder
│   ├── migrate.ts                  # Run migrations
│   └── generate-types.ts           # Generate API types
│
├── nginx/
│   └── nginx.conf                  # Nginx reverse proxy config
│
├── docker-compose.yml              # Full stack local dev
├── docker-compose.prod.yml         # Production deployment
├── .env.example                    # Environment template
├── .gitignore
├── .eslintrc.json
├── .prettierrc
├── turbo.json                      # Turborepo monorepo config
├── package.json                    # Root monorepo package
├── CHANGELOG.md
├── CONTRIBUTING.md
├── LICENSE
└── README.md                       ← You are here
```

---

## Getting Started

### Prerequisites

Make sure you have the following installed:

```bash
node --version    # v20.x or higher
npm --version     # v10.x or higher
docker --version  # v24.x or higher (optional)
git --version     # v2.40+
```

### 1. Clone the Repository

```bash
git clone https://github.com/roiseuddinrasel/psu-crm-pm.git
cd psu-crm-pm
```

### 2. Install Dependencies

```bash
# Install all workspace dependencies (root + frontend + backend)
npm install

# Or individually:
cd frontend && npm install
cd ../backend && npm install
```

### 3. Configure Environment Variables

```bash
# Copy the environment template
cp .env.example .env

# Edit your .env file with your actual credentials
nano .env
```

See [Environment Variables](#environment-variables) for the full list.

### 4. Set Up the Database

```bash
# Run database migrations
npm run db:migrate

# Seed with sample data (optional)
npm run db:seed
```

### 5. Start Development Servers

```bash
# Run both frontend and backend concurrently (recommended)
npm run dev

# Or separately:
npm run dev:frontend   # http://localhost:3000
npm run dev:backend    # http://localhost:4000
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

**Default login credentials (seed data):**
| Role | Email | Password |
|---|---|---|
| Super Admin | `admin@psu.edu` | `PSU@admin2025` |
| Manager | `manager@psu.edu` | `PSU@manager2025` |
| Staff | `staff@psu.edu` | `PSU@staff2025` |

---

## Environment Variables

Create a `.env` file at the root level. Never commit this file.

```env
# ─── App ───────────────────────────────────────────
NODE_ENV=development
PORT=4000
FRONTEND_URL=http://localhost:3000
API_URL=http://localhost:4000

# ─── Database (Neon PostgreSQL) ────────────────────
DATABASE_URL=postgresql://user:password@ep-xxx.neon.tech/psu_crm?sslmode=require
REDIS_URL=redis://localhost:6379

# ─── Authentication ────────────────────────────────
JWT_SECRET=your-super-secret-jwt-key-min-32-chars
JWT_EXPIRES_IN=7d
JWT_REFRESH_SECRET=your-refresh-secret-key
JWT_REFRESH_EXPIRES_IN=30d

# ─── OAuth (Google) ────────────────────────────────
GOOGLE_CLIENT_ID=your-google-oauth-client-id
GOOGLE_CLIENT_SECRET=your-google-oauth-client-secret
GOOGLE_CALLBACK_URL=http://localhost:4000/api/auth/google/callback

# ─── AWS S3 (File Storage) ─────────────────────────
AWS_REGION=us-east-1
AWS_ACCESS_KEY_ID=your-aws-access-key
AWS_SECRET_ACCESS_KEY=your-aws-secret-key
AWS_S3_BUCKET=psu-crm-files
AWS_CLOUDFRONT_URL=https://cdn.psu-crm.com

# ─── Email (SendGrid) ──────────────────────────────
SENDGRID_API_KEY=SG.your-sendgrid-api-key
EMAIL_FROM=noreply@psu.edu
EMAIL_FROM_NAME=PSU CRM System

# ─── AI (Anthropic Claude) ─────────────────────────
ANTHROPIC_API_KEY=sk-ant-your-claude-api-key
CLAUDE_MODEL=claude-sonnet-4-20250514

# ─── Next.js Public Variables ──────────────────────
NEXT_PUBLIC_API_URL=http://localhost:4000/api
NEXT_PUBLIC_SOCKET_URL=http://localhost:4000
NEXT_PUBLIC_APP_NAME=PSU CRM & PM System
NEXT_PUBLIC_PSU_GREEN=#1a5c38
```

---

## API Reference

Base URL: `https://api.psu-crm.com/api/v1`

### Authentication

| Method | Endpoint | Description | Auth |
|---|---|---|---|
| `POST` | `/auth/register` | Register new user | ❌ |
| `POST` | `/auth/login` | Login with email/password | ❌ |
| `POST` | `/auth/refresh` | Refresh access token | ✅ |
| `POST` | `/auth/logout` | Invalidate token | ✅ |
| `GET` | `/auth/me` | Get current user | ✅ |
| `POST` | `/auth/forgot-password` | Send reset email | ❌ |
| `POST` | `/auth/reset-password` | Reset with token | ❌ |
| `GET` | `/auth/google` | Google OAuth redirect | ❌ |

### Projects

| Method | Endpoint | Description | Role |
|---|---|---|---|
| `GET` | `/projects` | List all projects (paginated) | Staff+ |
| `POST` | `/projects` | Create new project | Manager+ |
| `GET` | `/projects/:id` | Get project details | Staff+ |
| `PATCH` | `/projects/:id` | Update project | Manager+ |
| `DELETE` | `/projects/:id` | Delete project | Admin+ |
| `POST` | `/projects/:id/team` | Add team member | Manager+ |
| `GET` | `/projects/:id/tasks` | Get project tasks | Staff+ |
| `POST` | `/projects/:id/files` | Upload file to project | Staff+ |

### Tasks

| Method | Endpoint | Description | Role |
|---|---|---|---|
| `GET` | `/tasks` | List all tasks | Staff+ |
| `POST` | `/tasks` | Create task | Staff+ |
| `PATCH` | `/tasks/:id` | Update task | Staff+ |
| `DELETE` | `/tasks/:id` | Delete task | Manager+ |
| `PATCH` | `/tasks/:id/status` | Update status | Staff+ |
| `POST` | `/tasks/:id/comments` | Add comment | Staff+ |
| `PATCH` | `/tasks/reorder` | Drag-and-drop reorder | Staff+ |

### CRM

| Method | Endpoint | Description | Role |
|---|---|---|---|
| `GET` | `/crm/customers` | List customers | Staff+ |
| `POST` | `/crm/customers` | Add customer | Manager+ |
| `PATCH` | `/crm/customers/:id` | Update customer | Staff+ |
| `DELETE` | `/crm/customers/:id` | Delete customer | Admin+ |
| `POST` | `/crm/customers/:id/notes` | Add interaction note | Staff+ |
| `GET` | `/crm/pipeline` | Get pipeline stats | Staff+ |

### AI Assistant

| Method | Endpoint | Description | Role |
|---|---|---|---|
| `POST` | `/ai/chat` | Send message to Claude | Staff+ |
| `POST` | `/ai/summarize` | Summarize project | Manager+ |
| `POST` | `/ai/draft-email` | Draft an email | Staff+ |
| `POST` | `/ai/recommend-tasks` | Get task recommendations | Staff+ |

> 📄 Full API documentation available at `/docs/API.md` or the [live Swagger UI](https://api.psu-crm.com/api/docs).

---

## Database Schema

```sql
-- Users & Authentication
CREATE TABLE users (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name        VARCHAR(100) NOT NULL,
  email       VARCHAR(255) UNIQUE NOT NULL,
  password    VARCHAR(255),                   -- null for OAuth users
  role        VARCHAR(50) DEFAULT 'staff',    -- super_admin|admin|manager|staff|student|client
  department  VARCHAR(100),
  avatar_url  TEXT,
  is_active   BOOLEAN DEFAULT true,
  last_login  TIMESTAMPTZ,
  created_at  TIMESTAMPTZ DEFAULT NOW(),
  updated_at  TIMESTAMPTZ DEFAULT NOW()
);

-- Projects
CREATE TABLE projects (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name        VARCHAR(200) NOT NULL,
  description TEXT,
  status      VARCHAR(50) DEFAULT 'pending',  -- pending|in_progress|on_hold|completed
  priority    VARCHAR(20) DEFAULT 'medium',   -- high|medium|low
  progress    INTEGER DEFAULT 0,
  budget      NUMERIC(12,2),
  spent       NUMERIC(12,2) DEFAULT 0,
  start_date  DATE,
  deadline    DATE,
  owner_id    UUID REFERENCES users(id),
  created_at  TIMESTAMPTZ DEFAULT NOW(),
  updated_at  TIMESTAMPTZ DEFAULT NOW()
);

-- Project Team Members (junction)
CREATE TABLE project_members (
  project_id  UUID REFERENCES projects(id) ON DELETE CASCADE,
  user_id     UUID REFERENCES users(id) ON DELETE CASCADE,
  role        VARCHAR(50) DEFAULT 'member',
  joined_at   TIMESTAMPTZ DEFAULT NOW(),
  PRIMARY KEY (project_id, user_id)
);

-- Tasks
CREATE TABLE tasks (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id    UUID REFERENCES projects(id) ON DELETE CASCADE,
  title         VARCHAR(300) NOT NULL,
  description   TEXT,
  status        VARCHAR(50) DEFAULT 'todo',   -- todo|in_progress|review|completed
  priority      VARCHAR(20) DEFAULT 'medium',
  assignee_id   UUID REFERENCES users(id),
  created_by    UUID REFERENCES users(id),
  due_date      DATE,
  position      INTEGER DEFAULT 0,            -- for Kanban ordering
  parent_id     UUID REFERENCES tasks(id),    -- for subtasks
  is_recurring  BOOLEAN DEFAULT false,
  created_at    TIMESTAMPTZ DEFAULT NOW(),
  updated_at    TIMESTAMPTZ DEFAULT NOW()
);

-- CRM Customers
CREATE TABLE customers (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company_name VARCHAR(200) NOT NULL,
  contact_name VARCHAR(100),
  email        VARCHAR(255),
  phone        VARCHAR(50),
  industry     VARCHAR(100),
  stage        VARCHAR(50) DEFAULT 'cold_lead', -- cold_lead|active_lead|proposal|negotiation|client
  deal_value   NUMERIC(12,2),
  notes        TEXT,
  assigned_to  UUID REFERENCES users(id),
  created_at   TIMESTAMPTZ DEFAULT NOW(),
  updated_at   TIMESTAMPTZ DEFAULT NOW()
);

-- Documents / Files
CREATE TABLE documents (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name        VARCHAR(255) NOT NULL,
  type        VARCHAR(50),                    -- pdf|docx|xlsx|image|video
  size_bytes  BIGINT,
  s3_key      TEXT NOT NULL,
  s3_url      TEXT,
  project_id  UUID REFERENCES projects(id),
  uploaded_by UUID REFERENCES users(id),
  version     INTEGER DEFAULT 1,
  is_deleted  BOOLEAN DEFAULT false,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

-- Notifications
CREATE TABLE notifications (
  id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id    UUID REFERENCES users(id) ON DELETE CASCADE,
  type       VARCHAR(50),                     -- task|project|crm|system
  title      VARCHAR(255),
  body       TEXT,
  is_read    BOOLEAN DEFAULT false,
  link       TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Audit Logs
CREATE TABLE audit_logs (
  id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id    UUID REFERENCES users(id),
  action     VARCHAR(100) NOT NULL,
  entity     VARCHAR(100),
  entity_id  UUID,
  changes    JSONB,
  ip_address INET,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

---

## Deployment

### Frontend → Vercel

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy from frontend directory
cd frontend
vercel --prod

# Or connect your GitHub repo to Vercel dashboard
# https://vercel.com/new → Import from GitHub
```

### Backend → Railway

```bash
# Install Railway CLI
npm install -g @railway/cli

# Login and deploy
railway login
railway init
railway up

# Set environment variables
railway vars set DATABASE_URL="..." JWT_SECRET="..."
```

### Backend → AWS EC2

```bash
# SSH into your EC2 instance
ssh -i your-key.pem ubuntu@your-ec2-ip

# Clone repo and set up
git clone https://github.com/roiseuddinrasel/psu-crm-pm.git
cd psu-crm-pm/backend
cp .env.example .env && nano .env

# Start with PM2
npm install -g pm2
npm run build
pm2 start dist/server.js --name psu-crm-api
pm2 save && pm2 startup
```

---

## Docker

### Local Development

```bash
# Start full stack with Docker Compose
docker-compose up -d

# Services started:
#  frontend  → http://localhost:3000
#  backend   → http://localhost:4000
#  postgres  → localhost:5432
#  redis     → localhost:6379
#  nginx     → http://localhost:80
```

### Production

```bash
docker-compose -f docker-compose.prod.yml up -d --build
```

### `docker-compose.yml` (excerpt)

```yaml
version: '3.9'
services:
  postgres:
    image: postgres:16-alpine
    environment:
      POSTGRES_DB: psu_crm
      POSTGRES_USER: psu_user
      POSTGRES_PASSWORD: ${DB_PASSWORD}
    volumes:
      - postgres_data:/var/lib/postgresql/data
    ports:
      - "5432:5432"

  redis:
    image: redis:7-alpine
    ports:
      - "6379:6379"

  backend:
    build: ./backend
    depends_on: [postgres, redis]
    env_file: .env
    ports:
      - "4000:4000"

  frontend:
    build: ./frontend
    depends_on: [backend]
    env_file: .env
    ports:
      - "3000:3000"

  nginx:
    image: nginx:alpine
    volumes:
      - ./nginx/nginx.conf:/etc/nginx/nginx.conf
    ports:
      - "80:80"
      - "443:443"
    depends_on: [frontend, backend]

volumes:
  postgres_data:
```

---

## Contributing

Contributions are welcome! Please read [CONTRIBUTING.md](CONTRIBUTING.md) first.

```bash
# 1. Fork the repository
# 2. Create your feature branch
git checkout -b feature/amazing-feature

# 3. Commit your changes (conventional commits)
git commit -m "feat(crm): add lead scoring algorithm"

# 4. Push to your branch
git push origin feature/amazing-feature

# 5. Open a Pull Request
```

**Commit message format (Conventional Commits):**
```
feat(module):     new feature
fix(module):      bug fix
docs:             documentation only
style:            formatting, no logic change
refactor(module): code restructure
test:             add/update tests
chore:            maintenance tasks
```

---

## Security

- All passwords hashed with **bcrypt** (12 rounds)
- **JWT** tokens with short expiry + refresh rotation
- **RBAC** middleware on every protected route
- **Rate limiting** via express-rate-limit (100 req/15min)
- **Helmet.js** for HTTP security headers
- **CORS** restricted to known origins
- Input validated with **Zod** schemas
- SQL injection protected via Drizzle ORM parameterized queries
- File uploads validated (type + size) before S3 upload
- Audit log for all write operations

See [SECURITY.md](docs/SECURITY.md) for vulnerability reporting.

---

## License

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for details.

---

<div align="center">

Built with ❤️ by **[Roise Uddin](https://linkedin.com/in/roiseuddinr)**  
Adjunct Instructor & IEEE Senior Member · Pacific States University, Los Angeles  
[GitHub](https://github.com/roiseuddinrasel) · [LinkedIn](https://linkedin.com/in/roiseuddinr)

<img src="https://img.shields.io/badge/PSU-1928-1a5c38?style=flat-square" alt="PSU 1928">
<img src="https://img.shields.io/badge/IEEE-Senior%20Member-00629B?style=flat-square&logo=ieee&logoColor=white" alt="IEEE">
<img src="https://img.shields.io/badge/Made%20in-Los%20Angeles-1a5c38?style=flat-square" alt="LA">

</div>
