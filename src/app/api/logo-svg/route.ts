import { NextResponse } from 'next/server';
import { readFile } from 'fs/promises';
import path from 'path';

const VALID_THEMES = [
  'light',
  'dark',
  'mono',
  'mono-dark',
  'outline',
  'outline-dark',
  'inverted',
] as const;

type Theme = (typeof VALID_THEMES)[number];

const FALLBACK_THEME: Theme = 'dark';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const rawTheme = searchParams.get('theme') || FALLBACK_THEME;

  // Validate theme; fall back to 'dark' if invalid
  const theme: Theme = (VALID_THEMES as readonly string[]).includes(rawTheme)
    ? (rawTheme as Theme)
    : FALLBACK_THEME;

  const logosDir = path.join(process.cwd(), 'logos');
  const filePath = path.join(logosDir, `${theme}.svg`);

  try {
    const svgBuffer = await readFile(filePath);

    return new NextResponse(svgBuffer, {
      status: 200,
      headers: {
        'Content-Type': 'image/svg+xml',
        'Cache-Control': 'public, max-age=3600, stale-while-revalidate=86400',
      },
    });
  } catch {
    // Fallback to dark.svg if the requested theme file is not found
    const fallbackPath = path.join(logosDir, `${FALLBACK_THEME}.svg`);

    try {
      const fallbackBuffer = await readFile(fallbackPath);

      return new NextResponse(fallbackBuffer, {
        status: 200,
        headers: {
          'Content-Type': 'image/svg+xml',
          'Cache-Control': 'public, max-age=3600, stale-while-revalidate=86400',
        },
      });
    } catch {
      return NextResponse.json(
        { error: 'Logo file not found' },
        { status: 404 }
      );
    }
  }
}
