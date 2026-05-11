import { NextResponse } from 'next/server';

type ApiResponseOptions = {
  status?: number;
  message?: string;
  data?: any;
  error?: any;
};

export function successResponse({ data, message = 'Success', status = 200 }: ApiResponseOptions) {
  return NextResponse.json(
    {
      success: true,
      message,
      data,
    },
    { status }
  );
}

export function errorResponse({ error, message = 'Internal Server Error', status = 500 }: ApiResponseOptions) {
  return NextResponse.json(
    {
      success: false,
      message,
      error: process.env.NODE_ENV === 'development' ? error : undefined,
    },
    { status }
  );
}
