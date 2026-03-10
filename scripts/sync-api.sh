#!/usr/bin/env bash

set -e

# directorio donde está el script
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

# root del proyecto (un nivel arriba del script)
PROJECT_ROOT="$SCRIPT_DIR/.."

API_URL="http://localhost:3000/api-yaml"
SPEC_FILE="$PROJECT_ROOT/docs/api.yaml"
TYPES_FILE="$PROJECT_ROOT/src/lib/api/generated/schema.d.ts"

echo "⬇️ Descargando OpenAPI spec..."
curl -f -Ss $API_URL -o $SPEC_FILE

echo "⚙️ Generando types..."
npx openapi-typescript --enum $SPEC_FILE -o $TYPES_FILE

echo "✅ Types generados en $TYPES_FILE"
