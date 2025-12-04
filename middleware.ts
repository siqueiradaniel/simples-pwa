import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  // 1. Cria uma resposta inicial que permite que o request continue
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  })

  // 2. Configura o cliente Supabase para atualizar cookies de sessão se necessário
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          // Atualiza os cookies no request e na response para manter a sessão ativa
          cookiesToSet.forEach(({ name, value, options }) => request.cookies.set(name, value))
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          })
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  // 3. Atualiza a sessão do usuário (refresh token) se estiver expirada
  // IMPORTANTE: Isso garante que o getUser() no server-side funcione
  await supabase.auth.getUser()

  return response
}

export const config = {
  matcher: [
    /*
     * Corresponde a todas as rotas, EXCETO as que começam com:
     * - _next/static (arquivos estáticos do build)
     * - _next/image (otimização de imagens)
     * - favicon.ico (ícone do site)
     * - Arquivos com extensões comuns de mídia e PWA (svg, png, jpg, json, etc)
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|json|js|css|woff|woff2)$).*)',
  ],
}