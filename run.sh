#!/bin/bash
# Script to open the calculator in the default browser

# Get the absolute path of the index.html file
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
HTML_FILE="$SCRIPT_DIR/index.html"

# Open the file in the default browser
echo "Opening Calculator..."
if [[ "$OSTYPE" == "darwin"* ]]; then
    # macOS
    open "$HTML_FILE"
elif [[ "$OSTYPE" == "linux-gnu"* ]]; then
    # Linux
    xdg-open "$HTML_FILE" || firefox "$HTML_FILE" || google-chrome "$HTML_FILE" || chromium-browser "$HTML_FILE"
else
    echo "Unsupported operating system. Please open index.html manually."
fi

echo "Calculator launched! If it didn't open automatically, please open index.html manually in your browser." 