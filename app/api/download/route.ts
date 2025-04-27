export const runtime = 'edge'

export async function GET(request: Request) {
  const { origin } = new URL(request.url)

  const pdfUrl = `${origin}/DanielCui_Resume.pdf`

  const res = await fetch(pdfUrl)
  if (!res.ok) {
    return new Response('Not found', { status: 404 })
  }

  const arrayBuffer = await res.arrayBuffer()

  return new Response(arrayBuffer, {
    status: 200,
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Length': arrayBuffer.byteLength.toString(),
      'Content-Disposition': 'attachment; filename="DanielCui_Resume.pdf"',
    },
  })
}
