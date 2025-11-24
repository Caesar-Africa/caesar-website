# Contributing to Caesar Website

## For Junior Developers 👋

This guide explains how to work on this codebase, make changes, and understand common workflows. Read this BEFORE making your first code change!

---

## 📚 Before You Start

### Required Reading
1. [README.md](./README.md) - Understand the project
2. [ARCHITECTURE.md](./ARCHITECTURE.md) - Know why we made decisions
3. This file - Learn how to contribute

### Required Knowledge
- Basic React (components, props, hooks)
- Basic TypeScript (interfaces, types)
- Basic CSS
- Git basics (clone, branch, commit, push)

**Don't know these?** That's okay! Here are good resources:
- React: [react.dev/learn](https://react.dev/learn)
- TypeScript: [typescriptlang.org/docs/handbook/intro.html](https://www.typescriptlang.org/docs/handbook/intro.html)
- Git: [git-scm.com/book](https://git-scm.com/book/en/v2)

---

## 🚀 Getting Started

### 1. Clone the Repository
```bash
git clone <repository-url>
cd caesar-web
```

### 2. Install Dependencies
```bash
npm install
```
**What this does**: Downloads all packages listed in `package.json`

### 3. Set Up Environment
Create `.env.local` file:
```bash
NEXT_PUBLIC_FORMSUBMIT_EMAIL=your-email@example.com
```
**Why**: Forms need an email to send submissions to

### 4. Run Development Server
```bash
npm run dev
```
**What this does**: Starts local server at `http://localhost:3000`

### 5. Make Sure It Works
- Visit `http://localhost:3000`
- Click around, test navigation
- Try the widget at `/widget`

---

## 🛠 Common Development Tasks

### Task 1: Change Text on Homepage

**Steps**:
1. Open `components/pages/HomePage.tsx`
2. Find the text you want to change
3. Edit it directly in the JSX
4. Save the file
5. Browser auto-refreshes!

**Example**:
```tsx
// Before
<h1>Welcome to Caesar</h1>

// After
<h1>Welcome to Caesar Tax Platform</h1>
```

### Task 2: Change Navbar Link Color

**Steps**:
1. Open `components/Navbar.module.css`
2. Find `.navLinks a` or relevant selector
3. Change `color` property
4. Save and see changes

**Example**:
```css
.navLinks a {
    color: #ffffff; /* Change this to desired color */
}
```

**Pro tip**: Use CSS variables from `app/globals.css`:
```css
.navLinks a {
    color: var(--primary-color); /* Uses global color */
}
```

### Task 3: Add a New Page Section

**Steps**:
1. Create new component: `components/sections/NewSection.tsx`
2. Create styles: `components/sections/NewSection.module.css`
3. Import and use in `components/pages/HomePage.tsx`

**Example**:
```tsx
// components/sections/NewSection.tsx
import styles from './NewSection.module.css';

export default function NewSection() {
    return (
        <section className={styles.section}>
            <h2>New Section</h2>
            <p>Content here</p>
        </section>
    );
}
```

```tsx
// components/pages/HomePage.tsx
import NewSection from '../sections/NewSection';

export default function HomePage() {
    return (
        <>
            {/* Other sections... */}
            <NewSection />
        </>
    );
}
```

### Task 4: Add a New Modal Type

**Steps**:
1. Open `components/Modal.tsx`
2. Add your type to the `ModalType`:
```tsx
type: 'book-demo' | 'get-started' | 'talk-to-us' | 'contact-sales' | 'request-brief' | 'your-new-modal'
```
3. Add configuration in `modalConfigs`:
```tsx
const modalConfigs = {
    // ... existing configs
    'your-new-modal': {
        title: 'Your Title',
        subtitle: 'Your subtitle',
    },
};
```
4. Use in parent component:
```tsx
openModal('your-new-modal')
```

### Task 5: Modify Tax Calculation

**IMPORTANT**: Tax calculations affect real business logic!

**Steps**:
1. Open `components/TaxWidget.tsx`
2. Find the constants at the top:
   - `NG_2026_PIT_BANDS` for individual tax
   - `NG_2026_CORP_RULES` for company tax
3. Update the values
4. **TEST THOROUGHLY** before deploying

**Example** - Updating tax band:
```tsx
// Before
{ min: 800_000, max: 3_000_000, rate: 0.15 },

// After (if tax rate changed)
{ min: 800_000, max: 3_000_000, rate: 0.18 },
```

**Test checklist**:
- [ ] Calculation shows correct result
- [ ] Edge cases work (₦0, very large numbers)
- [ ] Results match manual calculation
- [ ] Email receives correct data

---

## 📝 Code Style Guide

### TypeScript

✅ **DO**: Define interfaces for props
```tsx
interface MyComponentProps {
    title: string;
    count?: number; // Optional
}

export default function MyComponent({ title, count }: MyComponentProps) {
    // ...
}
```

❌ **DON'T**: Use `any` type
```tsx
function doSomething(data: any) { // ❌ Avoid this
    // ...
}
```

### React Components

✅ **DO**: Use functional components
```tsx
export default function MyComponent() {
    return <div>Hello</div>;
}
```

❌ **DON'T**: Use class components (they're older)
```tsx
class MyComponent extends React.Component { // ❌ Don't use
    // ...
}
```

###CSS Modules

✅ **DO**: Use camelCase for class names
```css
.heroSection { /* ✅ Good */
    color: blue;
}
```

❌ **DON'T**: Use kebab-case (doesn't work with CSS Modules)
```css
.hero-section { /* ❌ Won't work properly */
    color: blue;
}
```

### Naming Conventions

**Files**:
- Components: `MyComponent.tsx` (PascalCase)
- Styles: `MyComponent.module.css`
- Types: `types.ts` (lowercase)

**Variables**:
- State: `const [isOpen, setIsOpen]` (camelCase)
- Constants: `const MAX_COUNT = 100` (UPPER_SNAKE_CASE)
- Props: `interface MyProps` (PascalCase + "Props" suffix)

**Functions**:
- Regular: `function calculateTax()` (camelCase)
- Components: `function TaxWidget()` (PascalCase)
- Event handlers: `function handleClick()` (handle + Event)

---

## 🧪 Testing Your Changes

### Before Committing

Run these commands:

```bash
# 1. Check TypeScript errors
npm run build

# 2. Start the app
npm run dev

# 3. Manual testing checklist:
```

**Manual Testing Checklist**:
- [ ] Homepage loads without errors
- [ ] Navigation works (click all nav links)
- [ ] Modals open and close properly
- [ ] Forms can be filled and submitted
- [ ] Widget calculations work correctly
- [ ] Mobile view looks good (resize browser)
- [ ] No console errors (F12 → Console tab)

### Testing Forms

**Important**: Don't spam the real FormSubmit email!

**For testing**:
1. Use a test email in `.env.local`
2. Or comment out the FormSubmit action temporarily:
```tsx
<form
    // action={`https://formsubmit.co/${email}`} // Commented for testing
    onSubmit={(e) => {
        e.preventDefault();
        console.log('Form submitted', formData);
    }}
>
```

---

## 🐛 Troubleshooting

### Build Errors

**Error**: `Cannot find module`
```bash
# Solution: Reinstall dependencies
rm -rf node_modules
npm install
```

**Error**: TypeScript errors about types
```bash
# Solution: Make sure types are correct
# Check the interface definition
# Make sure all required props are passed
```

### Runtime Errors

**Error**: "Hydration error" in console
- **Cause**: Server HTML doesn't match client HTML
- **Solution**: Make sure there's no random values on first render
```tsx
// ❌ Wrong
<div>{Math.random()}</div> // Different server vs client

// ✅ Right
const [random] = useState(Math.random()); // Same on both
<div>{random}</div>
```

**Error**: "Hook called outside of component"
- **Cause**: Hooks (useState, etc.) used wrong
- **Solution**: Only call hooks at component top level
```tsx
// ❌ Wrong
function MyComponent() {
    if (condition) {
        const [state] = useState(0); // ❌ Conditional hook
    }
}

// ✅ Right
function MyComponent() {
    const [state] = useState(0); // ✅ Always called
    if (condition) {
        // Use state here
    }
}
```

### Style Not Applying

**Problem**: Changed CSS but nothing changes

**Solutions**:
1. Make sure you're editing the right `.module.css` file
2. Check you're using `styles.className` not just `className`
3. Hard refresh browser (Ctrl+Shift+R or Cmd+Shift+R)
4. Check browser DevTools (F12) to see if styles are applied

---

## 📤 Submitting Your Changes

### Git Workflow

```bash
# 1. Create a new branch
git checkout -b feature/your-feature-name

# 2. Make your changes
# ... edit files ...

# 3. Check what changed
git status

# 4. Add files to commit
git add .

# 5. Commit with clear message
git commit -m "Add new hero section to homepage"

# 6. Push to remote
git push origin feature/your-feature-name

# 7. Create Pull Request on GitHub
```

### Commit Message Guidelines

✅ **Good commit messages**:
- `Add contact form to About page`
- `Fix navbar mobile menu not closing`
- `Update tax calculation for 2026 rules`
- `Improve hero section layout on mobile`

❌ **Bad commit messages**:
- `Update` (too vague)
- `Fix bug` (what bug?)
- `Changes` (what changes?)
- `asdf` (not descriptive)

### Pull Request Checklist

Before requesting review:
- [ ] Code builds without errors (`npm run build`)
- [ ] Tested manually in browser
- [ ] No console errors
- [ ] Mobile responsive
- [ ] Follows code style guide
- [ ] Added comments for complex code
- [ ] Updated README if needed

---

## 🆘 Getting Help

### When You're Stuck

1. **Read the error message** - It usually tells you what's wrong
2. **Check the relevant docs**:
   - React: [react.dev](https://react.dev)
   - Next.js: [nextjs.org/docs](https://nextjs.org/docs)
   - TypeScript: [typescriptlang.org/docs](https://www.typescriptlang.org/docs)
3. **Google the error** - Someone else probably had it
4. **Ask a senior developer** - Don't spend hours stuck!

### Good Questions to Ask

✅ **Specific questions**:
- "I'm getting 'Cannot read property X of undefined' in Modal.tsx line 42. What does this mean?"
- "Should I use useState or useEffect for this feature?"
- "How do I test the FormSubmit integration locally?"

❌ **Vague questions**:
- "It's not working"
- "I don't understand this"
- "Can you help me?"

---

## 📚 Learning Resources

### Next.js Specific
- [Learn Next.js](https://nextjs.org/learn) - Official interactive tutorial
- [App Router Documentation](https://nextjs.org/docs/app) - How the routing works

### React Hooks
- [Hooks Reference](https://react.dev/reference/react) - All hooks explained
- [useState Guide](https://react.dev/reference/react/useState)
- [useEffect Guide](https://react.dev/reference/react/useEffect)

### TypeScript with React
- [React TypeScript Cheatsheet](https://react-typescript-cheatsheet.netlify.app/) - Quick reference

### CSS
- [CSS Modules Documentation](https://github.com/css-modules/css-modules)
- [Flexbox Guide](https://css-tricks.com/snippets/css/a-guide-to-flexbox/)
- [Grid Guide](https://css-tricks.com/snippets/css/complete-guide-grid/)

---

## 🎯 Your First Contribution

Not sure where to start? Try these beginner-friendly tasks:

1. **Fix a typo** in the homepage text
2. **Change a color** in the CSS
3. **Add your name** to a contributors list (if we have one)
4. **Improve a comment** that's unclear
5. **Add a missing ARIA label** for accessibility

These small changes help you:
- Learn the Git workflow
- Understand the codebase
- Build confidence

---

## ✨ Best Practices

### Comments

✅ **DO comment**:
- Complex calculations
- Why you did something (not what)
- Temporary workarounds
- Important business logic

```tsx
// ✅ Good comment (explains WHY)
// Using setTimeout to prevent race condition with FormSubmit
setTimeout(() => submitForm(), 100);

// ❌ Bad comment (explains WHAT - obvious from code)
// Set count to 0
setCount(0);
```

### Component Size

✅ **DO**: Keep components small and focused
```tsx
// ✅ Good - one responsibility
function SubmitButton({ onClick }) {
    return <button onClick={onClick}>Submit</button>;
}
```

❌ **DON'T**: Create giant components that do everything
```tsx
// ❌ Too big - does too many things
function HomePage() {
    // 500 lines of code...
    // Multiple forms, sections, logic all in one component
}
```

### State Management

✅ **DO**: Put state as low as possible
```tsx
// ✅ Good - modal state only in parent
function Page() {
    const [modalOpen, setModalOpen] = useState(false);
    return <Modal isOpen={modalOpen} />;
}
```

❌ **DON'T**: Put all state at the top unnecessarily
```tsx
// ❌ Bad - button's hover state doesn't need to be in parent
function Page() {
    const [buttonHovered, setButtonHovered] = useState(false);
    // Not needed - handle in the button component itself
}
```

---

## 🚫 Common Mistakes to Avoid

### 1. Modifying `node_modules`
❌ **Never** edit files in `node_modules/`
- These are dependencies, not your code
- Changes will be lost on next `npm install`
- If you need to change a library, submit a PR to that library

### 2. Committing `.env.local`
❌ Don't commit environment files
- They contain secrets/emails
- Already in `.gitignore`
- Each developer has their own local env

### 3. Using Inline Styles Everywhere
❌ Avoid inline styles when possible
```tsx
// ❌ Bad
<div style={{ color: 'red', fontSize: '16px' }}>
```

✅ Use CSS Modules instead
```tsx
// ✅ Good
<div className={styles.redText}>
```

### 4. Not Testing on Mobile
❌ Always test mobile view
- Press F12 → Toggle device toolbar
- Or resize your browser
- Mobile users are important!

---

## Questions?

Still confused? That's normal! 

- Re-read the relevant sections above
- Check README.md and ARCHITECTURE.md
- Ask a senior developer
- Open an issue on GitHub

**Remember**: Everyone was a beginner once. It's okay to ask questions! 🙂

---

Happy coding! 🚀
