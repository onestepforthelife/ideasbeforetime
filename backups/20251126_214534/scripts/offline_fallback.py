#!/usr/bin/env python3
"""
Offline Fallback System
Works without internet - generates files locally
"""

import json
from pathlib import Path
from datetime import datetime

def generate_static_sitemap_offline():
    """Generate sitemap without any external dependencies"""
    
    print("🔌 Running in OFFLINE mode - no internet required\n")
    
    project_root = Path(__file__).parent.parent
    
    # Try to load innovations.json
    try:
        with open(project_root / 'innovations.json', 'r', encoding='utf-8') as f:
            data = json.load(f)
        innovations = data.get('innovations', [])
        print(f"✅ Loaded {len(innovations)} innovations from JSON")
    except Exception as e:
        print(f"⚠️  Could not load innovations.json: {e}")
        print("   Using fallback static list...")
        innovations = []
    
    # Generate sitemap
    sitemap_lines = [
        '<?xml version="1.0" encoding="UTF-8"?>',
        '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">'
    ]
    
    base_url = 'https://ideas-before-time.pages.dev'
    today = datetime.now().strftime('%Y-%m-%d')
    
    # Static pages (hardcoded fallback)
    static_pages = [
        ('/', '1.0', 'daily'),
        ('/library.html', '0.9', 'weekly'),
        ('/about.html', '0.8', 'monthly'),
        ('/timeline.html', '0.8', 'monthly'),
        ('/innovations-table.html', '0.9', 'weekly'),
        ('/business-insights-enhanced.html', '0.7', 'monthly'),
        ('/specialty-chemicals-index.html', '0.7', 'monthly'),
    ]
    
    for url, priority, changefreq in static_pages:
        sitemap_lines.extend([
            '  <url>',
            f'    <loc>{base_url}{url}</loc>',
            f'    <lastmod>{today}</lastmod>',
            f'    <changefreq>{changefreq}</changefreq>',
            f'    <priority>{priority}</priority>',
            '  </url>'
        ])
    
    # Add innovations if available
    for innovation in innovations:
        if innovation.get('status') == 'published':
            innovation_id = innovation.get('id')
            sitemap_lines.extend([
                '  <url>',
                f'    <loc>{base_url}/{innovation_id}.html</loc>',
                f'    <lastmod>{today}</lastmod>',
                f'    <changefreq>monthly</changefreq>',
                f'    <priority>0.8</priority>',
                '  </url>'
            ])
    
    sitemap_lines.append('</urlset>')
    
    # Write sitemap
    sitemap_path = project_root / 'sitemap.xml'
    with open(sitemap_path, 'w', encoding='utf-8') as f:
        f.write('\n'.join(sitemap_lines))
    
    print(f"✅ Sitemap generated: {sitemap_path}")
    print(f"   Total URLs: {len(static_pages) + len([i for i in innovations if i.get('status') == 'published'])}")
    print("\n✅ OFFLINE mode completed successfully!")

def validate_json_offline():
    """Basic JSON validation without external libraries"""
    
    print("🔌 Running JSON validation in OFFLINE mode\n")
    
    project_root = Path(__file__).parent.parent
    json_path = project_root / 'innovations.json'
    
    try:
        with open(json_path, 'r', encoding='utf-8') as f:
            data = json.load(f)
        
        innovations = data.get('innovations', [])
        print(f"✅ JSON is valid")
        print(f"   Total innovations: {len(innovations)}")
        print(f"   Published: {len([i for i in innovations if i.get('status') == 'published'])}")
        
        # Basic checks
        errors = []
        for idx, innovation in enumerate(innovations):
            if 'id' not in innovation:
                errors.append(f"Innovation #{idx+1}: Missing 'id'")
            if 'title' not in innovation:
                errors.append(f"Innovation #{idx+1}: Missing 'title'")
        
        if errors:
            print(f"\n⚠️  Found {len(errors)} issue(s):")
            for error in errors:
                print(f"   • {error}")
        else:
            print("✅ All basic validations passed")
        
        return len(errors) == 0
        
    except json.JSONDecodeError as e:
        print(f"❌ Invalid JSON: {e}")
        return False
    except Exception as e:
        print(f"❌ Error: {e}")
        return False

if __name__ == '__main__':
    import sys
    
    print("="*60)
    print("OFFLINE FALLBACK SYSTEM")
    print("Works without internet or external dependencies")
    print("="*60)
    print()
    
    if len(sys.argv) > 1 and sys.argv[1] == 'validate':
        validate_json_offline()
    else:
        generate_static_sitemap_offline()
