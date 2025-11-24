# Caesar Website - Frontend Documentation

## 🎯 Project Overview

Caesar is a crypto tax infrastructure platform for African markets. This is the marketing website built with Next.js, featuring:
- Marketing pages (Home, Product, Pricing, About)
- Interactive tax calculator widget
- Contact forms and modals
- SEO optimization

**Built for**: Tax compliance platforms, fintech companies, and government institutions in Africa

---

## 🛠 Technology Stack

### Core Framework
- **Next.js 15** - React framework with App Router
  - *Why?* Server-side rendering, automatic code splitting, built-in routing
- **React 19** - UI library with hooks
  - *Why?* Component-based architecture, efficient re-renders
- **TypeScript** - Type-safe JavaScript
  - *Why?* Catch errors early, better IDE support, self-documenting code

### Styling
- **CSS Modules** - Scoped component styles
  - *Why?* No naming conflicts, better maintainability than global CSS
- **Tailwind CSS** (minimal utility classes)
  - *Why?* Quick utility classes for layout in app router pages

### Forms & Data
- **FormSubmit.co** - Form submission service
  - *Why?* No backend needed, sends form data to email, has spam protection

---

## 📁 Project Structure

```
caesar-web/
├── app/                          # Next.js App Router pages
│   ├── layout.tsx               # Root layout (SEO, fonts, metadata)
│   ├── page.tsx                 # Homepage (/)
│   ├── widget/
│   │   └── page.tsx            # Tax widget page (/widget)
│   ├── robots.ts               # SEO - search engine rules
│   └── sitemap.ts              # SEO - site map for crawlers
│
├── components/                   # Reusable React components
│   ├── Navbar.tsx               # Navigation bar
│   ├── Navbar.module.css        # Navbar styles (scoped)
│   ├── Footer.tsx               # Footer with links
│   ├── Footer.module.css        # Footer styles (scoped)
│   ├── Modal.tsx                # Reusable modal for forms
│   ├── Modal.module.css         # Modal styles (scoped)
│   ├── TaxWidget.tsx            # Tax calculator widget
│   ├── TaxWidget.module.css     # Widget styles (scoped)
│   │
│   ├── pages/                   # Page-specific components
│   │   ├── ContactPage.tsx      # Contact page content
│   │   ├── AboutPage.tsx        # About page content
│   │   ├── ProductPage.tsx      # Product page content
│   │   ├── PricingPage.tsx      # Pricing page content
│   │   └── ... (other pages)
│   │
│   └── sections/                # Reusable page sections
│       ├── HeroSection.tsx      # Hero sections
│       ├── CTASection.tsx       # Call-to-action sections
│       └── ...
│
├── public/                       # Static assets
│   └── llms.txt                 # AI/LLM context file
│
└── package.json                  # Dependencies and scripts
```

### Why This Structure?

**App Router** (`app/`): Next.js 15's modern routing system
- Each folder = a route
- `layout.tsx` wraps all pages
- `page.tsx` is the actual page content

**Components** (`components/`): Reusable UI pieces
- Top-level: Used across multiple pages (Navbar, Footer, Modal)
- `pages/`: Specific to one page content
- `sections/`: Reusable sections within pages

**CSS Modules**: Each component has its own `.module.css`
- Styles are scoped to that component only
- Prevents style conflicts
- Example: `styles.navBar` only applies to Navbar

---

## 🧩 Key Components Explained

### 1. Navbar.tsx
**What it does**: Navigation bar at the top of every page

**How it works**:
```typescript
// Props it receives from parent
interface NavbarProps {
    activePage: string;        // Which page is active (for highlighting)
    onNavigate: (page) => void; // Function to call when clicking links
    onOpenModal: () => void;    // Function to open contact modal
}
```

**Key features**:
- Sticky navbar (stays at top when scrolling)
- Mobile responsive (hamburger menu on small screens)
- Highlights active page
- Opens modal for "Talk to us" button

**Why this approach?**
- Parent controls navigation (single source of truth)
- Reusable across different pages
- Mobile-first design

### 2. Modal.tsx
**What it does**: Popup form for contact/demo requests

**How it works**:
```typescript
type ModalType = 'book-demo' | 'get-started' | 'talk-to-us' | 'contact-sales' | 'request-brief';

interface ModalProps {
    isOpen: boolean;           // Show/hide modal
    onClose: () => void;       // Function to close modal
    type: ModalType;          // Which type of form to show
}
```

**Key features**:
- Different forms based on `type` prop
- FormSubmit.co integration for email delivery
- Keyboard accessible (ESC to close)
- Click outside to close
- Captcha enabled for spam protection

**Why FormSubmit?**
- No backend server needed
- Automatic email sending
- Built-in spam protection
- Free for moderate usage

### 3. TaxWidget.tsx
**What it does**: Interactive tax calculator for crypto income

**How it works**:
- **Step 1**: Collect user info (lead form)
- **Step 2**: Show calculator (Individual OR Platform)
- Calculates taxes based on Nigerian 2026 tax rules
- Sends lead + calculation results via FormSubmit

**Tax Calculation Logic**:
```typescript
// Nigerian Personal Income Tax (PIT) - Progressive bands
const NG_2026_PIT_BANDS = [
    { min: 0, max: 800_000, rate: 0.0 },      // 0% on first ₦800k
    { min: 800_000, max: 3_000_000, rate: 0.15 }, // 15% on next bracket
    // ... more bands up to 25%
];
```

**Why we store lead data**:
- User fills form BEFORE calculating
- We store their info, then send it WITH calculation results
- Gives better context for sales follow-up

### 4. App Router Pages

#### app/page.tsx (Homepage)
- "use client" directive (runs in browser, not server)
- Manages all navigation state
- Controls which page content to show
- Handles modal state

**Why client component?**
- Needs React hooks (useState) for interactivity
- Navigation happens without page reload
- Better user experience

#### app/widget/page.tsx (Widget Page)
- Dedicated page for tax calculator
- Simplified layout (no section swapping)
- Enhanced background animations
- Passes modal trigger to widget

**Why separate page?**
- Shareable URL (/widget)
- Can be embedded elsewhere later
- Focused user experience

---

##🎨 Styling Approach

###CSS Modules
Each component has `.module.css` file:

```tsx
// In component
import styles from './Navbar.module.css';

// Use in JSX
<nav className={styles.navBar}>
```

**Benefits**:
- ✅ Scoped to component (no conflicts)
- ✅ TypeScript autocomplete for class names
- ✅ Easier to maintain

### CSS Variables
Defined in `app/globals.css`:
```css
:root {
    --primary-color: #4f46e5;
    --background: #020617;
}
```

**Why?**
- Consistent colors across site
- Easy theme changes
- Dark mode ready

---

## 📝 Form Handling

### FormSubmit.co Integration

**How it works**:
1. Form submits to `https://formsubmit.co/YOUR_EMAIL`
2. FormSubmit sends email with form data
3. User redirected to thank you page

**Configuration**:
```tsx
<form action={`https://formsubmit.co/${email}`} method="POST">
    {/* Hidden fields for configuration */}
    <input type="hidden" name="_subject" value="New Contact" />
    <input type="hidden" name="_captcha" value="true" />
    <input type="hidden" name="_template" value="table" />
    
    {/* Actual form fields */}
    <input name="name" required />
    <input name="email" required />
</form>
```

**Why this approach?**
- ✅ No backend server needed
- ✅ No database required
- ✅ Spam protection built-in
- ✅ Professional email formatting

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ installed
- npm or yarn package manager

### Installation
```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

Visit `http://localhost:3000`

### Environment Variables
Create `.env.local`:
```bash
NEXT_PUBLIC_FORMSUBMIT_EMAIL=your-email@caesar.africa
```

**Why `NEXT_PUBLIC_`?**
- Makes variable available in browser
- Required for client components
- Next.js convention

---

## 🎯 Common Tasks

### Adding a New Page
1. Create folder in `app/` (e.g., `app/blog/`)
2. Add `page.tsx` in that folder
3. Export a React component
4. Done! Next.js handles routing

### Adding a New Component
1. Create `ComponentName.tsx` in `components/`
2. Create `ComponentName.module.css` for styles
3. Import and use in pages

### Modifying Navbar Links
Edit `components/Navbar.tsx`:
```tsx
<a onClick={() => handleNavClick('new-page')}>
    New Page
</a>
```

---

## 🧪 Testing

### Build Test
```bash
npm run build
```
Checks for TypeScript errors and build issues.

### Production Preview
```bash
npm run build
npm start
```
Test production build locally.

---

## 📚 Learning Resources

### Next.js
- [Next.js Docs](https://nextjs.org/docs)
- [App Router Guide](https://nextjs.org/docs/app)

### React
- [React Docs](https://react.dev)
- [Hooks Reference](https://react.dev/reference/react)

### TypeScript
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [React TypeScript Cheatsheet](https://react-typescript-cheatsheet.netlify.app/)

---

## ❓ FAQ for Junior Developers

**Q: Why do some files say "use client"?**  
A: Next.js runs on server by default. "use client" tells Next.js this component needs browser features (hooks, events).

**Q: What's the difference between .tsx and .ts?**  
A: `.tsx` = TypeScript + JSX (for React components)  
`.ts` = Pure TypeScript (no JSX)

**Q: Why CSS Modules instead of regular CSS?**  
A: Prevents naming conflicts. `styles.button` in one component won't affect `styles.button` in another.

**Q: What's FormSubmit.co?**  
A: Service that handles form submissions without a backend. Sends form data to your email.

**Q: Why TypeScript instead of JavaScript?**  
A: Catches errors before running code, better IDE support, makes code self-documenting.

**Q: What's useState for?**  
A: Stores data that can change (like modal open/closed, current page, form inputs).

---

## 🤝 Contributing

### Code Style
- Use TypeScript for all new files
- Use CSS Modules for styling
- Add comments for complex logic
- Keep components small and focused

### Naming Conventions
- Components: `PascalCase` (HomePage, TaxWidget)
- Files: Match component name (HomePage.tsx)
- CSS classes: `camelCase` (navBar, heroSection)
- Props interfaces: `ComponentNameProps`

---

## 📧 Support

For questions or issues:
- Check this README first
- Review code comments
- Ask in team chat
- Contact: dev@caesar.africa
# Environment variables configured
