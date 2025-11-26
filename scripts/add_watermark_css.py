#!/usr/bin/env python3
"""
Add watermark CSS to all HTML files
"""

import os
import re
from pathlib import Path

def add_watermark_css(html_file):
    """Add watermark CSS link to HTML file if not already present"""
    
    with open(html_file, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Check if watermark CSS is already linked
    if 'common-watermark.css' in content:
        print(f"✓ {html_file.name} - Already has watermark CSS")
        return False
    
    # Find the </head> tag and insert before it
    if '</head>' in content:
        # Insert the watermark CSS link before </head>
        watermark_link = '\n<!-- Watermark Branding -->\n<link rel="stylesheet" href="common-watermark.css">\n'
        content = content.replace('</head>', watermark_link + '</head>')
        
        with open(html_file, 'w', encoding='utf-8') as f:
            f.write(content)
        
        print(f"✓ {html_file.name} - Added watermark CSS")
        return True
    else:
        print(f"✗ {html_file.name} - No </head> tag found")
        return False

def main():
    """Add watermark CSS to all HTML files in Cloudfare directory"""
    
    # Get the Cloudfare directory
    cloudfare_dir = Path(__file__).parent.parent
    
    # Find all HTML files (excluding subdirectories)
    html_files = list(cloudfare_dir.glob('*.html'))
    
    if not html_files:
        print("No HTML files found")
        return
    
    print(f"Found {len(html_files)} HTML files\n")
    
    updated_count = 0
    for html_file in sorted(html_files):
        if add_watermark_css(html_file):
            updated_count += 1
    
    print(f"\n✓ Updated {updated_count} files")
    print(f"✓ Watermark will appear as subtle purple background branding")

if __name__ == '__main__':
    main()
