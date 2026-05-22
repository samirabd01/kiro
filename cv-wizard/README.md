# CV Wizard 🎯

A professional AI-powered CV builder with 15-step wizard flow, built with **React** (frontend) and **Node.js/Express** (backend).

## ✨ Features

- **15-Step Wizard** — Guided CV creation process
- **9 Professional Templates** — Free, Artistic, Bloom, Expert, Impact, Creative, Elite, Business, Tech
- **AI PDF Upload** — Upload existing CV and auto-fill fields
- **Real-time Preview** — Live CV preview with design customization
- **OTP Authentication** — Email-based 4-digit OTP verification
- **Stripe Payment** — Secure payment integration ($9.99/CV)
- **Dashboard** — Manage all your CVs
- **Dark Theme** — Modern dark UI design

## 🗂️ Project Structure

```
cv-wizard/
├── frontend/          # React App (CRA)
│   ├── src/
│   │   ├── pages/    # 15 Wizard Steps
│   │   ├── components/  # WizardLayout, CVPreview
│   │   ├── context/  # CVContext (global state)
│   │   └── styles/   # Global CSS
│   └── public/       # Template preview images
│
└── backend/           # Node.js/Express API
    └── src/
        ├── routes/
        │   ├── auth.js    # OTP authentication
        │   ├── cv.js      # CV save/parse
        │   └── payment.js # Stripe payment
        └── index.js
```

## 🚀 Wizard Steps

| Step | Page | Description |
|------|------|-------------|
| 0 | Homepage | Create new or upload existing CV |
| 1 | Select Template | Choose from 9 templates |
| 2 | Personal Info | Name, email, phone, location |
| 3 | Experience | Add work experience |
| 4 | Experience Overview | Review & manage jobs |
| 5 | Education | Add educational background |
| 6 | Education Overview | Review & manage education |
| 7 | Skills | Add technical & soft skills |
| 8 | Summary | Professional summary |
| 9 | Other Sections | Certifications, Languages, Hobbies |
| 10 | Preview | Real-time CV preview + design |
| 11 | Sign Up | Google/Facebook/Email registration |
| 12 | Login | 4-digit OTP verification |
| 13 | Payment | Credit card / Google Pay / Apple Pay |
| 14 | Success | Receipt & download |
| 15 | Dashboard | CV management |

## 🛠️ Installation & Setup

### Frontend
```bash
cd frontend
npm install
npm start
```

### Backend
```bash
cd backend
cp .env.example .env
# Edit .env with your credentials
npm install
npm run dev
```

## 🔧 Environment Variables

Copy `backend/.env.example` to `backend/.env` and fill in:

```env
PORT=5000
NODE_ENV=development
JWT_SECRET=your_secret_key
SMTP_HOST=smtp.gmail.com
SMTP_USER=your@email.com
SMTP_PASS=your_app_password
STRIPE_SECRET_KEY=sk_test_...
OPENAI_API_KEY=sk-...
```

## 📦 Tech Stack

**Frontend:**
- React 18
- React Context (state management)
- React Router v6
- Axios
- CSS Modules

**Backend:**
- Node.js + Express
- Multer (file upload)
- Nodemailer (OTP email)
- Stripe (payments)
- OpenAI (PDF parsing)

## 🎨 Design

- Dark theme (`#0f172a` background)
- Purple accent color (`#7c3aed`)
- Inter font family
- Smooth animations & transitions
- Fully responsive

## 📱 Screenshots

The design is based on Figma mockups included in the repository.
