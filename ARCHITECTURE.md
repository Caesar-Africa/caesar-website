# Architecture & Design Decisions

## Overview
This document explains the architectural decisions made in the Caesar website and **why** we made them. Perfect for understanding the reasoning behind the code.

---

## 1. Why Next.js App Router?

### Decision
We use Next.js 15 with the **App Router** (not Pages Router).

### Why?
✅ **Server Components by Default**
- Faster initial page loads
- Better SEO (search engines see content immediately)
- Smaller JavaScript bundles sent to browser

✅ **File-based Routing**
- `app/widget/page.tsx` automatically creates `/widget` route
- No manual route configuration needed
- Easy to understand URL structure

✅ **Built-in Optimizations**
- Automatic code splitting (only load what's needed)
- Image optimization
- Font optimization

### Alternative Considered
- **Pages Router**: Older Next.js routing
  - ❌ More boilerplate code
  - ❌ No server components
  - ❌ Less optimized

---

## 2. Why Client Components for Interactive Pages?

### Decision
Pages with user interaction use `"use client"` directive.

### Example
```tsx
"use client"; // This tells Next.js to run in browser

import { useState } from 'react';

export default function Page() {
    const [count, setCount] = useState(0); // useState needs browser
    // ...
}
```

### Why?
✅ **React Hooks Requirement**
- `useState`, `useEffect` only work in browser
- User interactions (clicks, form inputs) need client-side JavaScript

✅ **Server Components Can't Have Interactivity**
- Server components render once on server
- No way to handle clicks/changes after page loads

### When to Use Each

**Server Component** (default):
- Static content
- No user interaction
- SEO-critical content
Example: About page text, pricing tables

**Client Component** (`"use client"`):
- Forms that need validation
- Interactive buttons
- Navigation with state
Example: Tax widget, modals, navbar

---

## 3. Why CSS Modules?

### Decision
Each component has its own `.module.css` file.

### Example
```tsx
// Navbar.tsx
import styles from './Navbar.module.css';

<nav className={styles.navbar}> // Becomes: nav_navbar__abc123
```

### Why?
✅ **No Naming Conflicts**
```css
/* Navbar.module.css */
.button { color: blue; }

/* Modal.module.css */
.button { color: red; } /* No conflict! */
```

✅ **Component Co-location**
- Styles next to component file
- Easy to find and modify
- Delete component → styles deleted too

✅ **TypeScript Autocomplete**
- IDE suggests available class names
- Catch typos before runtime

### Alternative Considered
- **Tailwind CSS**: Utility-first CSS
  - ✅ We DO use it for simple utilities
  - ❌ Not enough for complex components like TaxWidget
  - ❌ HTML gets too cluttered with many classes

- **Styled Components**: CSS-in-JS
  - ❌ Larger bundle size
  - ❌ Runtime performance cost
  - ❌ More complex setup

---

## 4. Why FormSubmit.co Instead of Backend?

### Decision
Use FormSubmit.co service for form submissions.

### How It Works
```tsx
<form action="https://formsubmit.co/email@caesar.africa" method="POST">
    <input name="email" required />
    <button type="submit">Submit</button>
</form>
```

### Why?
✅ **No Backend Server Needed**
- No Node.js server to maintain
- No database to set up
- Lower hosting costs

✅ **Email Delivery Built-in**
- Gets form data in email
- Professional table format
- No code to write

✅ **Spam Protection**
- Built-in reCAPTCHA
- Honeypot fields
- Rate limiting

✅ **Fast to Implement**
- Works immediately
- No API to build
- Perfect for MVP

### Tradeoffs
❌ **Can't Store in Database**
- Only email, no database record
- Fine for low-volume lead capture
- Could migrate to backend later

❌ **Limited Customization**
- Can't customize email template much
- Can't trigger other actions easily

### When to Switch to Backend
Consider building backend API when:
- Need to store leads in database
- Want to integrate with CRM automatically
- Need custom business logic on submission
- Volume exceeds FormSubmit free tier

---

## 5. Why Two-Step Widget Flow?

### Decision
Tax widget has two steps:
1. Lead form (collect contact info)
2. Calculator (show tax estimates)

### Why?
✅ **Lead Capture First**
- Get contact info before value delivery
- User committed by filling form
- Can follow up even if they leave

✅ **Better Context for Sales**
```typescript
// We send:
{
    email: "user@company.com",
    company: "ABC Exchange", 
    persona: "platform",
    calculator_type: "Platform",
    vat_due: "₦375,000",
    // Full calculation results
}
```
Sales team knows:
- Who they are
- What their business is
- Specific tax scenario

✅ **Reduces Spam Calculations**
- Email required = less random usage
- More serious users
- Better data quality

### Alternative Considered
- **Calculator First, Then Lead Form**
  - ❌ Users might calculate and leave
  - ❌ Lose potential leads
  - ✅ Better user experience (but worse for business)

---

## 6. Why Progressive Tax Calculation?

### Decision
Tax calculation uses progressive bands.

### Code
```typescript
const NG_2026_PIT_BANDS = [
    { min: 0, max: 800_000, rate: 0.0 },
    { min: 800_000, max: 3_000_000, rate: 0.15 },
    { min: 3_000_000, max: 12_000_000, rate: 0.18 },
    // ...
];

function calcPit(income: number) {
    let tax = 0;
    for (const band of bands) {
        // Calculate tax for each band
        const taxableInBand = /* ... */;
        tax += taxableInBand * band.rate;
    }
    return tax;
}
```

### Why?
✅ **Matches Real Tax Law**
- Nigerian PIT is progressive
- Different rates for income brackets
- Accurate calculations

✅ **Easy to Update**
- Tax rates change yearly
- Just update the bands array
- No code logic changes needed

✅ **Transparent to Users**
- Can show breakdown by band
- Users understand calculation
- Builds trust

---

## 7. Why Separate Widget Page?

### Decision
Widget has its own route: `/widget`

### Why?
✅ **Shareable Link**
```
Share: https://caesar.africa/widget
```
- Direct access to calculator
- Social media sharing
- Email campaigns

✅ **Better SEO**
- Separate page can rank for "crypto tax calculator Nigeria"
- Focused meta tags
- Clean URL structure

✅ **Future Flexibility**
- Could be embedded on partner sites
- Different branding possible
- A/B testing easier

### Alternative Considered
- **Modal on Homepage**
  - ❌ Not shareable
  - ❌ URL doesn't change
  - ❌ SEO not as good

---

## 8. Why TypeScript?

### Decision
All files use TypeScript (.tsx, .ts), not JavaScript (.jsx, .js).

### Example
```typescript
interface NavbarProps {
    activePage: string;      // Must be string
    onNavigate: (page: string) => void; // Must be function
}

// TypeScript catches errors:
<Navbar activePage={123} /> // ❌ Error: number not allowed
<Navbar activePage="home" /> // ✅ Correct
```

### Why?
✅ **Catch Errors Before Running**
```typescript
function calculateTax(income: number) {
    return income * 0.25;
}

calculateTax("100"); // ❌ TypeScript error (before running)
calculateTax(100);   // ✅ Works
```

✅ **Self-Documenting**
```typescript
// Clear what props are needed:
interface Props {
    title: string;
    count?: number; // ? means optional
}
```

✅ **Better IDE Support**
- Autocomplete for props
- Jump to definition
- Refactoring tools

✅ **Prevents Common Bugs**
- Null/undefined errors
- Wrong prop types
- Misspelled properties

### Tradeoffs
❌ **Learning Curve**
- Junior devs need to learn types
- More syntax to write
- Compilation step needed

✅ **Worth It Because**
- Catches bugs early
- Easier to maintain
- Better team collaboration

---

## 9. Why useState for Navigation?

### Decision
Homepage uses state to control which page shows:

```typescript
const [activePage, setActivePage] = useState('home');

// Click "Product" → setActivePage('product')
// Re-renders with ProductPage component
```

### Why?
✅ **No Page Reload**
- Instant navigation
- Smooth user experience
- Preserves scroll position if needed

✅ **Single Page Application (SPA)**
- All navigation client-side
- Fast interactions
- App-like feel

### Alternative Considered
- **Multiple Routes** (`/product`, `/pricing`, etc.)
  - ✅ Better SEO (separate URLs)
  - ❌ Page reload on navigation
  - ❌ More complex routing

### Why We Chose This
- Marketing site = single-page feel prioritized
- SEO handled with meta tags
- Can add routes later if needed

---

## 10. Architecture Diagram

```
┌─────────────────────────────────────────┐
│         Browser (Client)                │
├─────────────────────────────────────────┤
│                                         │
│  app/page.tsx (Client Component)       │
│  ├─ useState for navigation            │
│  ├─ useState for modals                │
│  └─ Renders page sections              │
│                                         │
│  components/                            │
│  ├─ Navbar        ────────────┐        │
│  ├─ Footer        ────────────┼────────┤
│  ├─ Modal         ────────────┤ Shared │
│  └─ TaxWidget                 │ across │
│                               │ pages  │
│  components/pages/            │        │
│  ├─ HomePage      ────────────┘        │
│  ├─ ProductPage                        │
│  └─ PricingPage                        │
│                                         │
└─────────────────────────────────────────┘
           ↓ Form Submit
┌─────────────────────────────────────────┐
│      FormSubmit.co Service              │
│      (Handles form → email)             │
└─────────────────────────────────────────┘
           ↓ Email
┌─────────────────────────────────────────┐
│      Caesar Email Inbox                 │
│      (Receives leads)                   │
└─────────────────────────────────────────┘
```

---

## Summary: Key Design Principles

1. **Start Simple** - FormSubmit before building backend
2. **Progressive Enhancement** - Works without JS, better with JS
3. **Type Safety** - TypeScript catches bugs early
4. **Component Reuse** - Navbar/Footer/Modal used everywhere
5. **User Experience First** - Fast loading, smooth interactions
6. **SEO Conscious** - Meta tags, semantic HTML, clean URLs
7. **Maintainability** - Clear structure, CSS Modules, TypeScript
8. **Future-Proof** - Easy to add routes, backend, features later

---

## Questions?

If something in the codebase doesn't match this architecture doc:
1. Check if it's a recent change
2. Ask the team why it was done differently
3. Update this doc if needed

This is a living document - keep it updated as architecture evolves!
