import { NextResponse, NextRequest } from 'next/server';

const allowedOrigins = ['http://localhost:3000', 'http://localhost:3002'];

export const corsHeaders = (origin: string | null) => {
  const isAllowedOrigin = origin && allowedOrigins.includes(origin);
  
  return {
    'Access-Control-Allow-Origin': isAllowedOrigin ? origin : '',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, PATCH, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Requested-With',
    'Access-Control-Allow-Credentials': 'true',
    'Access-Control-Max-Age': '86400',
  };
};

export function handleCORS(request: NextRequest) {
  const origin = request.headers.get('origin');
  const headers = corsHeaders(origin);
  
  return new NextResponse(null, {
    status: 204,
    headers: {
      ...headers,
      'Content-Length': '0',
    },
  });
}

export function addCorsHeaders(response: NextResponse, request: NextRequest): NextResponse {
  const origin = request.headers.get('origin');
  const headers = corsHeaders(origin);
  
  for (const [key, value] of Object.entries(headers)) {
    if (value) {
      response.headers.set(key, String(value));
    }
  }
  
  return response;
}

export function createCorsResponse(data: any, status: number, request: NextRequest): NextResponse {
  const origin = request.headers.get('origin');
  const corsHeadersObj = corsHeaders(origin);
  
  const response = NextResponse.json(data, { status });
  
  for (const [key, value] of Object.entries(corsHeadersObj)) {
    if (value) {
      response.headers.set(key, String(value));
    }
  }
  
  return response;
}

