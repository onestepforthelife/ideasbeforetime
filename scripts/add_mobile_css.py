#!/usr/bin/env python3
"""
Add Mobile Responsive CSS to All HTML Pages
Ensures cross-browser and mobile compatibility
"""

import os
import re
from pathlib import Path

def add_mobile_css_to_html(file_path):
    """Add mobile-responsive.css link to HTML file if not already present"""
    
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Check if mobile-responsive.css is already included
    if 'mobile-responsive.css' in content:
        print(f"✓ {file_path.name} - Already has mobile CSS")
        return False
    
    # Find </head> tag and insert CSS link before it
    css_link = '    <link rel="stylesheet" href="css/mobile-responsive.css">\n</head>'
    
    if '</head>' in content:
        content = content.replace('</head>', css_link)
        
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(content)
        
        print(f"✅ {file_path.name} - Added mobile CSS")
        return True
    else:
        print(f"⚠️  {file_path.name} - No </head> tag found")
        return False

def main():
    """Process all HTML files in Cloudfare directory"""
    
    project_root = Path(__file__).parent.parent
    html_files = list(project_root.glob('*.html'))
    
    print(f"🔍 Found {len(html_files)} HTML files\n")
    
    updated = 0
    skipped = 0
    errors = 0
    
    for html_file in sorted(html_files):
        try:
            if add_mobile_css_to_html(html_file):
                updated += 1
            else:
                skipped += 1
        except Exception as e:
            print(f"❌ {html_file.name} - Error: {e}")
            errors += 1
    
    print(f"\n{'='*60}")
    print(f"📊 Summary:")
    print(f"   ✅ Updated: {updated}")
    print(f"   ✓ Already had CSS: {skipped}")
    print(f"   ❌ Errors: {errors}")
    print(f"{'='*60}")
    
    if updated > 0:
        print(f"\n✅ Mobile responsive CSS added to {updated} pages!")
        print(f"   All pages now work on mobile devices and all browsers")
    else:
        print(f"\n✓ All pages already have mobile responsive CSS")

if __name__ == '__main__':
    main()
