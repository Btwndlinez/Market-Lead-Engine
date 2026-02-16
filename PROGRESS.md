# Market Lead Engine - Progress Report

## Current Status: Local Development Working ✅

### Local Development
- **Status**: ✅ Layout displaying correctly at http://localhost:3000
- **Working Commit**: 7f09315 (v4 — solid red bolt + inverse box)
- **Engine Functions**: ✅ Code restored and functional
- **Design**: Magnetly-inspired B&W with adaptive day/night mode

### Live Website
- **URL**: https://btwndlinez.github.io/Market-Lead-Engine/
- **Status**: ⚠️ Codebase reset to working state, deployment pending
- **Last Working Deployment**: February 15, 2026 (v4)
- **Note**: GitHub Actions workflow temporarily unavailable due to permission scope
- **Cache Note**: If styles don't appear, use `?v=3` or hard refresh (Ctrl+Shift+R)

### ⚠️ CRITICAL: Add GitHub Secrets Now
The engine functions won't work until you add these secrets:

1. Go to: https://github.com/Btwndlinez/Market-Lead-Engine/settings/secrets/actions
2. Add these TWO secrets:

| Secret Name | Secret Value |
|-------------|---------------|
| `NEXT_PUBLIC_SUPABASE_URL` | `https://hbciotxcovzhfmsufuiw.supabase.co` |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | `sb_publishable_Zg9f8x7vslLxsjOZ69ogxw_e0KkN-RJ` |

3. Re-run the workflow after adding secrets

### Database Security (RLS Policies)

Enable Row Level Security on tables:

```sql
-- Enable RLS for SLA Snapshots
ALTER TABLE public.sla_snapshots ENABLE ROW LEVEL SECURITY;

-- Enable RLS for Provider Settlements
ALTER TABLE public.provider_settlements ENABLE ROW LEVEL SECURITY;

-- Create policy for authenticated read access
CREATE POLICY "Allow authenticated read access" 
ON public.sla_snapshots 
FOR SELECT 
TO authenticated 
USING (true);

-- Referral Policies
-- Allow anyone to insert a referral
CREATE POLICY "Enable insert for anonymous users" 
ON public.referrals 
FOR INSERT 
TO anon 
WITH CHECK (true);

-- Allow users to see only their own data
CREATE POLICY "Users can view their own referrals" 
ON public.referrals 
FOR SELECT 
TO authenticated 
USING (auth.uid() = user_id);

-- Allow users to insert their own data
CREATE POLICY "Users can create their own referrals" 
ON public.referrals 
FOR INSERT 
TO authenticated 
WITH CHECK (auth.uid() = user_id);

-- Additional Security Policies
-- 1. Enable RLS on all remaining tables
ALTER TABLE public.sla_snapshots ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.provider_settlements ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.referrals ENABLE ROW LEVEL SECURITY;

-- 2. Service role full access for Edge Functions
CREATE POLICY "Service role full access" 
ON public.referrals 
TO service_role 
USING (true) 
WITH CHECK (true);

-- 3. Public read-only for SLA snapshots
CREATE POLICY "Allow public read-only for snapshots" 
ON public.sla_snapshots 
FOR SELECT 
TO anon 
USING (true);
```

### 🚦 10 Deployed Functions Summary

| Category | Functions |
|----------|-----------|
| **Lead Analysis** | process-lead (Gemini 2.0 Flash), qualify-ai |
| **Operational Monitoring** | sla-clock, alert-revenue-leakage |
| **Conversation & Support** | suggest-reply, analyze-conversation |
| **Business Intelligence** | generate-weekly-report, generate-monthly-summary |
| **Automation & Sales** | nba-executor, create-checkout |

### Recent Updates
- ✅ **Environment Variables Fixed** - Created `.env.local` with Supabase credentials for local development
- ✅ **Engine Functions Working** - All 10 edge functions now callable from localhost
- ✅ **Codebase Reset** - Reverted to working commit 7f09315 after opencode corruption
- ✅ **Local Dev Fixed** - Layout now displays correctly at http://localhost:3000
- ✅ **basePath Config** - Temporarily removed for local testing (restore for production: `basePath: '/Market-Lead-Engine'`)
- ✅ **Red Accent Color** - Changed hover/interaction accent from purple to red (#dc2626 light / #f87171 dark)
- ✅ **Permanent Red Logo** - Lightning bolt is now a **SOLID** red icon inside an **INVERSE** colored box (Black in Light Mode, White in Dark Mode)
- ✅ **Magnetly-Inspired Redesign** - Clean B&W design with red accent on hover/interaction
- ✅ **Day/Night Adaptive Mode** - Toggle in nav, system preference detection, persists via localStorage
- ✅ **Floating Pill Navigation** - Glassmorphism nav bar with blur effect, pill-shaped CTA buttons
- ✅ **Hero Section** - Centered layout with stats bar (10 Edge Functions, <200ms, 99.9% SLA, AI)
- ✅ **Engine Card Grid** - 6 cards with unique icons, animated accent borders, hover color transitions
- ✅ **Dot-Grid Background** - Subtle texture pattern that adapts to light/dark mode
- ✅ **Result Panel** - Slide-up animated panel for engine responses with close button
- ✅ **Responsive Design** - Mobile-first with hidden nav links on small screens
- ✅ **Inter Font** - Loaded from Google Fonts with proper preconnect headers
- ✅ **Fixed Metadata Title** - Changed from "Create Next App" to "Market Lead Engine"
- ✅ **Simplified Layout** - Removed Geist fonts, using Inter from CSS
- ✅ **RLS Policies** - Added comprehensive policies (service role, public read, anon insert)
- ✅ **CORS Headers** - Added to edge functions for GitHub Pages compatibility
- ✅ **BasePath Fix** - Changed to /Market-Lead-Engine (capitalized to match repo)
- ✅ **Fail-safe Engine** - Added credential check to prevent build failures when env vars missing
- ✅ **Supabase Dependency** - Added `@supabase/supabase-js` to fix build errors
- ✅ **.nojekyll Fix** - Added to prevent Jekyll from ignoring `_next/` folder
- ✅ **Engine Library** (`lib/engine.ts`) - Standardized API for all 10 edge functions
- ✅ **GitHub Workflow** - Added environment variables for Supabase credentials
- ✅ **CORS Documentation** - Created docs/CORS.md for edge function configuration

### Design System

#### Color Scheme
| Mode | Background | Text | Accent (Hover) |
|------|-----------|------|----------------|
| **Light** | `#ffffff` | `#0a0a0a` | `#dc2626` (red) |
| **Dark** | `#0a0a0a` | `#fafafa` | `#f87171` (light red) |

#### Key Design Patterns
- **Navigation**: Floating pill-shaped navbar with glassmorphism (`backdrop-filter: blur`)
- **Cards**: Rounded rectangles with thin borders, animated top-border accent on hover
- **Buttons**: Pill-shaped (full border-radius), solid black → red accent on hover
- **Logo**: Solid red bolt (#dc2626) inside an inverse-colored box (`var(--fg)` bg) for high contrast
- **Typography**: Inter font, -0.04em letter-spacing on headings
- **Theme Toggle**: 48×26px toggle switch with smooth knob transition
- **Background**: Subtle dot-grid pattern (`radial-gradient`, 24px spacing)

### File Structure
```
app/
  page.tsx          # Main dashboard with all functions
  globals.css       # Full design system with light/dark CSS variables
  layout.tsx        # Layout with Inter font + dark mode FOUC prevention
lib/
  engine.ts         # Standardized engine API
.github/workflows/
  deploy.yml        # GitHub Pages deployment
docs/
  CORS.md           # CORS configuration guide
```

### Supabase Edge Functions (hbciotxcovzhfmsufuiw)
✅ All 10 Functions Deployed:
| Function | Status | Description |
|----------|--------|-------------|
| process-lead | ✅ Active | AI lead analysis with Gemini 2.0 |
| sla-clock | ✅ Active | SLA breach monitoring |
| suggest-reply | ✅ Active | AI response suggestions |
| analyze-conversation | ✅ Active | Conversation analysis |
| generate-monthly-summary | ✅ Active | Monthly reports |
| generate-weekly-report | ✅ Active | Weekly reports |
| alert-revenue-leakage | ✅ Active | High-value lead alerts |
| create-checkout | ✅ Active | Payment processing |
| nba-executor | ✅ Active | Next best action |
| qualify-ai | ✅ Active | Lead qualification |

### Configuration
- **Next.js**: output: 'export', basePath: '/Market-Lead-Engine'
- **AI Model**: Gemini 2.0 Flash
- **Supabase Project**: hbciotxcovzhfmsufuiw
- **CSS**: Tailwind v4 + custom CSS variables for theming
- **Font**: Inter (Google Fonts)

### Local Development Setup

#### Environment Variables
For local development, create `.env.local` in the project root:
```bash
NEXT_PUBLIC_SUPABASE_URL=https://hbciotxcovzhfmsufuiw.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=sb_publishable_Zg9f8x7vslLxsjOZ69ogxw_e0KkN-RJ
```

**Important**: Restart the dev server after creating `.env.local`:
```bash
npm run dev
```

#### Testing Engine Functions
All 6 cards on the homepage are now functional:
- **Process Lead** - AI analysis with scoring
- **Qualify AI** - Lead qualification
- **Create Checkout** - Payment session generation
- **SLA Status** - Breach monitoring
- **Revenue Leak** - High-value lead detection
- **Monthly Summary** - Analytics reports

Click any card to trigger the corresponding Supabase Edge Function.

### Setup Required

#### CORS Headers (Already configured on deployed functions)
All edge functions have CORS enabled:
```
Access-Control-Allow-Origin: *
Access-Control-Allow-Methods: POST, OPTIONS
Access-Control-Allow-Headers: Content-Type, Authorization
```

#### BasePath Handling

**For Local Development:**
```typescript
// Temporarily remove basePath for localhost testing
basePath: ''
```
Access at: http://localhost:3000

**For Production (GitHub Pages):**
```typescript
basePath: '/Market-Lead-Engine'
```
Access at: https://btwndlinez.github.io/Market-Lead-Engine/

⚠️ **Important**: Remember to restore `basePath: '/Market-Lead-Engine'` before deploying to production!

#### .nojekyll File
GitHub Pages uses Jekyll by default, which ignores folders starting with underscore (`_`). Next.js puts files in `_next/` folder.

✅ **Fixed**: Workflow now creates `.nojekyll` file automatically:
```yaml
- name: Create .nojekyll file
  run: touch out/.nojekyll
```

#### GitHub Pages Source Setting
✅ Must be set to "GitHub Actions" not "Deploy from a branch"
- Go to: https://github.com/Btwndlinez/Market-Lead-Engine/settings/pages
- Source: Select **GitHub Actions**

### How to Use

#### Live Site
1. Visit: https://btwndlinez.github.io/Market-Lead-Engine/
2. Toggle day/night mode with the switch in the top-right nav
3. Try the different engine function cards
4. View AI analysis results in the slide-up response panel

#### In Code
```typescript
import { processLead, checkSLA, getWeeklyReport } from '@/lib/engine'

// Process a lead
const result = await processLead("Roof leaking!", { source: 'web' })
// Returns: { success: true, ai_score: 85, ai_reason: "...", next_action: "..." }

// Check SLA status
const sla = await checkSLA()

// Generate weekly report
const report = await getWeeklyReport()
```

### All Engine Functions
```typescript
import {
  processLead,      // AI lead analysis
  qualifyLead,      // Qualify by ID
  suggestReply,     // Get AI reply suggestions
  analyzeConversation, // Analyze message thread
  checkSLA,         // Check SLA breaches
  getWeeklyReport,  // Weekly analytics
  getMonthlySummary, // Monthly summary
  checkRevenueLeakage, // Find high-value leads
  executeNBA,       // Next best action
  createCheckout    // Payment processing
} from '@/lib/engine'
```

### Troubleshooting

**Site shows 404?**
- GitHub Pages can take 5-10 minutes to propagate
- Check: https://github.com/Btwndlinez/Market-Lead-Engine/settings/pages
- Ensure source is set to "GitHub Actions"

**Functions not responding?**
- ✅ CORS headers are now configured on all edge functions
- Check browser console for errors
- Test functions directly: https://supabase.com/dashboard/project/hbciotxcovzhfmsufuiw/functions

**Build failing?**
- Check workflow status: https://github.com/Btwndlinez/Market-Lead-Engine/actions
- All dependencies are now in package.json

**Dark mode not working?**
- Theme persists in `localStorage` under key `mle-theme`
- Falls back to system preference (`prefers-color-scheme`)
- FOUC prevention script runs in `<head>` before page renders

### Engine Fail-Safe Implementation
The engine now handles missing credentials gracefully:
```typescript
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

// Fail-safe for build time
if (!supabaseUrl || !supabaseAnonKey) {
  console.warn("Supabase credentials missing. Engine will be unavailable.")
}

export const supabase = (supabaseUrl && supabaseAnonKey) 
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null
```
This allows the static site to build successfully even without GitHub Secrets configured.

---

*Last Updated: 2026-02-16*
*Commit: Environment variables configured - Engine functions working locally*
*Status: All 10 edge functions callable from localhost, layout displaying correctly*
