#!/bin/bash
set -e
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"
PROJECT_ROOT="$(cd "$REPO_ROOT/../.." && pwd)"
TARGET_DIR="$PROJECT_ROOT/.cursor/rules/bmad-custom/workflows"
SOURCE_DIR="$REPO_ROOT/workflows"
if [ ! -d "$SOURCE_DIR" ]; then
    echo "Error: Source directory not found: $SOURCE_DIR"
    exit 1
fi
mkdir -p "$TARGET_DIR"
for workflow_dir in "$SOURCE_DIR"/*/; do
    if [ -d "$workflow_dir" ]; then
        workflow_name=$(basename "$workflow_dir")
        workflow_mdc="$workflow_dir${workflow_name}.mdc"
        if [ -f "$workflow_mdc" ]; then
            cp "$workflow_mdc" "$TARGET_DIR/${workflow_name}.mdc"
        fi
    fi
done
echo "Installation complete!"
