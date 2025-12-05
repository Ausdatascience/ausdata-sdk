#!/usr/bin/env node

/**
 * Generate Next.js API route for @ausdata/sdk
 * 
 * Usage:
 *   npx @ausdata/sdk generate-api-route
 *   or
 *   node scripts/generate-api-route.js
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const API_ROUTE_TEMPLATE = `import { handleProxyRequest } from '@ausdata/sdk/server';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  return handleApiRequest(request, params, 'GET');
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  return handleApiRequest(request, params, 'POST');
}

async function handleApiRequest(
  request: NextRequest,
  params: Promise<{ path: string[] }>,
  method: 'GET' | 'POST'
) {
  try {
    const { path } = await params;
    const body = method === 'POST' ? await request.text() : undefined;
    
    const result = await handleProxyRequest({
      path,
      method,
      searchParams: request.nextUrl.searchParams,
      body,
    });
    
    return NextResponse.json(
      result.data || result.error,
      { status: result.status }
    );
  } catch (error) {
    console.error('API proxy error:', error);
    return NextResponse.json(
      {
        success: false,
        error: {
          code: 'SRV_001',
          message: error instanceof Error ? error.message : 'Internal server error',
        },
      },
      { status: 500 }
    );
  }
}
`;

export function generateApiRoute() {
  // Try to find Next.js app directory
  const appDir = path.join(process.cwd(), 'src', 'app', 'api');
  const altAppDir = path.join(process.cwd(), 'app', 'api');
  
  let targetDir = null;
  if (fs.existsSync(path.join(process.cwd(), 'src', 'app'))) {
    targetDir = path.join(appDir, '[...path]');
  } else if (fs.existsSync(path.join(process.cwd(), 'app'))) {
    targetDir = path.join(altAppDir, '[...path]');
  } else {
    console.error('❌ Could not find Next.js app directory.');
    console.log('\nPlease create one of the following:');
    console.log('  - app/api/[...path]/route.ts');
    console.log('  - src/app/api/[...path]/route.ts');
    console.log('\nContent to add:');
    console.log('─'.repeat(50));
    console.log(API_ROUTE_TEMPLATE);
    return;
  }
  
  const routeFile = path.join(targetDir, 'route.ts');
  
  if (fs.existsSync(routeFile)) {
    console.log('⚠️  API route already exists:', routeFile);
    console.log('Skipping generation. If you want to regenerate, delete the file first.');
    return;
  }
  
  // Create directory if it doesn't exist
  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
  }
  
  // Write route file
  fs.writeFileSync(routeFile, API_ROUTE_TEMPLATE);
  console.log('✅ Generated API route:', routeFile);
  console.log('\nNext steps:');
  console.log('1. Set AUSDATA_API_KEY or NEXT_PUBLIC_AUSDATA_API_KEY in your .env.local file');
  console.log('2. Restart your Next.js dev server');
  console.log('\nExample .env.local:');
  console.log('  NEXT_PUBLIC_AUSDATA_API_KEY=your_api_key_here');
}

// Run if executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  generateApiRoute();
}

