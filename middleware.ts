import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  // 1. Configura a resposta inicial
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  })

  // 2. Cria o cliente Supabase para gerenciar cookies de sessão
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() { return request.cookies.getAll() },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => request.cookies.set(name, value))
          response = NextResponse.next({ request: { headers: request.headers } })
          cookiesToSet.forEach(({ name, value, options }) => response.cookies.set(name, value, options))
        },
      },
    }
  )

  // 3. Verifica a sessão (Isso renova o token se necessário)
  const { data: { user } } = await supabase.auth.getUser()

  // 4. Definição centralizada de rotas protegidas
  // Adicione aqui qualquer rota que exige login
  const protectedPrefixes = [
    '/checkout', 
    '/profile', 
    '/orders', 
    '/addresses', // Protege /addresses, /addresses/new, /addresses/[id]/edit
    '/account'
  ]

  const isProtectedRoute = protectedPrefixes.some(path => 
    request.nextUrl.pathname.startsWith(path)
  )

  // 5. Lógica de Redirecionamento (Guard Clause)
  
  // Caso 1: Tenta acessar rota protegida sem estar logado
  if (isProtectedRoute && !user) {
    const url = request.nextUrl.clone()
    url.pathname = '/login'
    url.searchParams.set('next', request.nextUrl.pathname) // Salva intenção
    return NextResponse.redirect(url)
  }

  // Caso 2: Tenta acessar login/register já estando logado
  const isAuthRoute = ['/login', '/register'].includes(request.nextUrl.pathname)
  if (isAuthRoute && user) {
    return NextResponse.redirect(new URL('/', request.url))
  }

  return response
}

export const config = {
  matcher: [
    /*
     * Aplica o middleware em todas as rotas EXCETO:
     * - arquivos estáticos (_next/static, _next/image, favicon.ico)
     * - arquivos de imagem (svg, png, jpg, etc)
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}