import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

export async function supabaseServer() {
  try {
    // Try to get cookies (Works in Server Actions, Pages, API Routes)
    const cookieStore = await cookies()

    return createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll() {
            return cookieStore.getAll()
          },
          setAll(cookiesToSet) {
            try {
              cookiesToSet.forEach(({ name, value, options }) =>
                cookieStore.set(name, value, options)
              )
            } catch {
              // Ignored: handle setAll called from Server Component
            }
          },
        },
      }
    )
  } catch (error) {
    // FALLBACK: Build Time / Static Generation (SSG)
    // When generating static pages (like generateStaticParams), cookies() throws an error.
    // We return a basic client that acts as "Anonymous" (Public Access Only).
    return createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll() {
            return []
          },
          setAll() {},
        },
      }
    )
  }
}