// root/lib/supabase-admin.ts

import { createClient } from "@supabase/supabase-js";

/**
 * Admin Supabase client — uses the SECRET key (equivalent to service_role).
 * This BYPASSES Row Level Security entirely.
 *
 * Only used in server-side API routes (/api/admin/*).
 * NEVER imported in client components or the browser.
 *
 * .env.local:
 *   NEXT_PUBLIC_SUPABASE_URL=https://xxxx.supabase.co
 *   NEXT_PUBLIC_SUPABASE_SECRET_KEY=sb_secret_...
 */
export const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_SECRET_KEY!,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  }
);