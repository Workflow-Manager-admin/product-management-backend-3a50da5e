#!/bin/bash
cd /home/kavia/workspace/code-generation/product-management-backend-3a50da5e/product_management_backend
npm run lint
LINT_EXIT_CODE=$?
if [ $LINT_EXIT_CODE -ne 0 ]; then
  exit 1
fi

