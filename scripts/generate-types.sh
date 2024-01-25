#!/bin/bash

# Check for an environment-specific .env file
ENV_FILE=".env"

# Determine the environment based on an argument or default to "development"
if [ "$1" ]; then
  ENV_FILE=".env.$1"
fi

# Load environment variables from the selected .env file
if [ -f "$ENV_FILE" ]; then
  source "$ENV_FILE"
else
  echo "Error: $ENV_FILE not found."
  exit 1
fi

# Run the supabase command with the PROJECT_ID environment variable
npx supabase gen types typescript --project-id "$NEXT_PUBLIC_SUPABASE_PROJECT_ID" > src/types/database.types.ts
