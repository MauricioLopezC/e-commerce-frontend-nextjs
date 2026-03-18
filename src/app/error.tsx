'use client';

import { useEffect } from 'react';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Global error:', error);
  }, [error]);

  // AJUSTE OPCIONAL: Detectar si es un error de conexión (reinicio del backend)
  const isNetworkError = 
    error.message?.toLowerCase().includes('fetch failed') || 
    error.message?.toLowerCase().includes('network error') ||
    error.message?.toLowerCase().includes('failed to fetch');

  const title = isNetworkError 
    ? 'Servidor en mantenimiento' 
    : '¡Ups! Algo salió mal';

  const description = isNetworkError
    ? 'El servidor se está reiniciando para mantenimiento programado. Por favor, espera unos segundos e intenta de nuevo.'
    : 'Ha ocurrido un error inesperado. Por favor, intenta nuevamente más tarde.';

  const handleReset = () => {
    reset();
    window.location.reload();
  };

  const handleGoHome = () => {
    window.location.href = '/';
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center text-red-600">
            {title}
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center space-y-6">
          <div className="bg-red-50 p-4 rounded-full">
            <svg
              width="100px"
              height="100px"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="text-red-500"
            >
              <path
                d="M12 8V12M12 16H12.01M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <p className="text-center text-muted-foreground text-lg">
            {description}
          </p>
        </CardContent>
        <CardFooter className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
          <Button onClick={handleReset} className="w-full sm:w-auto">
            Intentar nuevamente
          </Button>
          <Button onClick={handleGoHome} variant="outline" className="w-full sm:w-auto">
            Ir al inicio
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
