#!/usr/bin/env python3
"""
Sitemap Generator for Ideas Before Time
Generates sitemap.xml from innovations.json
"""

import json
import os
from datetime import datetime
from pathlib import Path

def load_innovations():
    """Load innovations from JSON file"""
    json_path = Path(__file__).parent.parent / 'innovations.json'
    with open(json_path, 'r', encoding='utf-8') as f:
        return json.load(f)

def generate_sitemap():
    """Generate sitemap.xml from innovations data"""
    data = load_innovations()
    innovations = data.get('innovations', [])
    
    # Start sitemap
    sitemap = ['<?xml version="1.0" encoding="UTF-8"?>']
    sitemap.append('<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">')
    
    # Base URL
    base_url = 'https://ideas-before-time.pages.dev'
    today = datetime.now().strftime('%Y-%m-%d')
    
    # Static pages
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
        sitemap.append('  <url>')
        sitemap.append(f'    <loc>{base_url}{url}</loc>')
        sitemap.append(f'    <lastmod>{today}</lastmod>')
        sitemap.append(f'    <changefreq>{changefreq}</changefreq>')
        sitemap.append(f'    <priority>{priority}</priority>')
        sitemap.append('  </url>')
    
    # Innovation pages
    for innovation in innovations:
        if innovation.get('status') == 'published':
            innovation_id = innovation.get('id')
            year = innovation.get('year', 2000)
            
            # Calculate priority based on year (newer = higher)
            current_year = datetime.now().year
            years_old = current_year - year
            priority = max(0.5, min(0.9, 0.9 - (years_old * 0.02)))
            
            sitemap.append('  <url>')
            sitemap.append(f'    <loc>{base_url}/{innovation_id}.html</loc>')
            sitemap.append(f'    <lastmod>{today}</lastmod>')
            sitemap.append(f'    <changefreq>monthly</changefreq>')
            sitemap.append(f'    <priority>{priority:.1f}</priority>')
            sitemap.append('  </url>')
    
    sitemap.append('</urlset>')
    
    # Write sitemap
    sitemap_path = Path(__file__).parent.parent / 'sitemap.xml'
    with open(sitemap_path, 'w', encoding='utf-8') as f:
        f.write('\n'.join(sitemap))
    
    print(f"✅ Sitemap generated successfully!")
    print(f"   Total URLs: {len(static_pages) + len([i for i in innovations if i.get('status') == 'published'])}")
    print(f"   Output: {sitemap_path}")

if __name__ == '__main__':
    try:
        generate_sitemap()
    except Exception as e:
        print(f"❌ Error generating sitemap: {e}")
        exit(1)
