export const runtime = 'edge'

export async function GET() {
  const pdfUrl = new URL('/DanielCui_Resume.pdf', import.meta.url)
  const res = await fetch(pdfUrl)
  if (!res.ok) {
    return new Response('Not found', { status: 404 })
  }
  const arrayBuffer = await res.arrayBuffer()

  return new Response(arrayBuffer, {
    status: 200,
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition': 'attachment; filename="DanielCui_Resume.pdf"',
    },
  })
}
