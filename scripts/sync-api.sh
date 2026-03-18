#!/usr/bin/env bash

set -e

# directorio donde está el script
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

# root del proyecto (un nivel arriba del script)
PROJECT_ROOT="$SCRIPT_DIR/.."

# Configuración
API_URL="http://localhost:3000/api-yaml"
SPEC_FILE="$PROJECT_ROOT/docs/api.yaml"
TYPES_FILE="$PROJECT_ROOT/src/lib/api/generated/schema.ts"

# --- Seguridad para Producción ---
if [ "$NODE_ENV" = "production" ]; then
  echo "❌ Error: No se puede ejecutar sync-api en producción."
  exit 1
fi

# Verificar si el servidor local está respondiendo
if ! curl -s --head --request GET "$API_URL" | grep "200 OK" > /dev/null; then
  echo "⚠️ Advertencia: El servidor API ($API_URL) no está disponible."
  echo "Asegúrate de que el backend esté corriendo en localhost:3000."
  exit 0 # Salimos con éxito pero sin hacer nada para no romper scripts automáticos
fi
# ---------------------------------

echo "⬇️ Descargando OpenAPI spec..."
curl -f -Ss $API_URL -o $SPEC_FILE

echo "⚙️ Generando types..."
npx openapi-typescript --enum $SPEC_FILE -o $TYPES_FILE

echo "✅ Types generados en $TYPES_FILE"
