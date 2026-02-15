# Market Lead Engine - Progress Report

## Current Status: Website Live with Full UI ✅

### Live Website
- **URL**: https://btwndlinez.github.io/Market-Lead-Engine/
- **Status**: ✅ GitHub Pages deployed
- **Engine Functions**: ⚠️ REQUIRES GitHub Secrets to work

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
- ✅ **RLS Policies** - Added for referrals table (anon insert, authenticated read/insert)
- ✅ **CORS Headers** - Added to edge functions for GitHub Pages compatibility
- ✅ **Action Cards** - Clean monochrome design with `action-card` class
- ✅ **Grayscale to Color** - Full color reveal on hover with brutalist shadow pop
- ✅ **BasePath Fix** - Changed to /Market-Lead-Engine (capitalized to match repo)
- ✅ **Monochrome Pop Design** - Grayscale by default, color pop on hover with brutalist box-shadow
- ✅ **Monochrome-to-Motion UI** - New brutalist design with grayscale buttons that animate on hover
- ✅ **Fail-safe Engine** - Added credential check to prevent build failures when env vars missing
- ✅ **Supabase Dependency** - Added `@supabase/supabase-js` to fix build errors
- ✅ **.nojekyll Fix** - Added to prevent Jekyll from ignoring `_next/` folder
- ✅ **Engine Library** (`lib/engine.ts`) - Standardized API for all 10 edge functions
- ✅ **Enhanced Dashboard** - Multiple action buttons (Process Lead, Check SLA, Weekly Report, Revenue Leakage)
- ✅ **GitHub Workflow** - Added environment variables for Supabase credentials
- ✅ **CORS Documentation** - Created docs/CORS.md for edge function configuration
- ✅ **Progressive UI** - Better styling, loading states, and error handling

### File Structure
```
app/
  page.tsx          # Main dashboard with all functions
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
- **Next.js**: output: 'export', basePath: '/market-lead-engine'
- **AI Model**: Gemini 2.0 Flash
- **Supabase Project**: hbciotxcovzhfmsufuiw

### Setup Required

#### CORS Headers (Already configured on deployed functions)
All edge functions have CORS enabled:
```
Access-Control-Allow-Origin: *
Access-Control-Allow-Methods: POST, OPTIONS
Access-Control-Allow-Headers: Content-Type, Authorization
```

#### BasePath Handling
✅ Configured in `next.config.ts`:
```typescript
basePath: '/market-lead-engine'
```

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
1. Visit: https://btwndlinez.github.io/market-lead-engine/
2. Try the different action buttons
3. Enter lead messages and see AI analysis

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

**Functions not responding?**
- Verify GitHub Secrets are set
- Check browser console for CORS errors
- Ensure edge functions are deployed: https://supabase.com/dashboard/project/hbciotxcovzhfmsufuiw/functions

**Build failing?**
- Check workflow status: https://github.com/Btwndlinez/Market-Lead-Engine/actions
- Error: "Can't resolve '@supabase/supabase-js'" - Make sure `@supabase/supabase-js` is in package.json dependencies
- Error: "Supabase client not initialized" - GitHub Secrets are not set during build. Site builds but functions won't work until secrets are added.

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

*Last Updated: 2026-02-14*
*Commit: 9e682fd - fix: add fail-safe for missing supabase credentials*
