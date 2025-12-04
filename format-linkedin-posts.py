"""
Format extracted LinkedIn posts into blog-ready format
"""
import re
from datetime import datetime, timedelta

input_file = r"C:\Users\araag\Documents\Cloudfare\linkedin-posts-extracted.txt"
output_file = r"C:\Users\araag\Documents\Cloudfare\linkedin-posts.txt"

print("=" * 80)
print("📝 FORMATTING LINKEDIN POSTS FOR BLOG")
print("=" * 80)

with open(input_file, 'r', encoding='utf-8') as f:
    content = f.read()

# Find all post titles (they appear as "by Vashist..." lines)
post_pattern = r'by Vashist Specialty Chemicals Agentic AI • (\d+) min read'
posts_found = re.findall(post_pattern, content)

print(f"\n✅ Found {len(posts_found)} posts with read times")

# Split content into sections
sections = content.split('by Vashist Specialty Chemicals Agentic AI')

formatted_posts = []
post_date = datetime(2025, 11, 30)  # Start from Nov 30

for idx, section in enumerate(sections[1:], 1):  # Skip first section (header)
    lines = section.strip().split('\n')
    
    # Get title (usually the line before "by Vashist...")
    title_search = re.search(r'([^\n]+)\n• \d+ min read', section)
    if title_search:
        title = title_search.group(1).strip()
    else:
        # Try to find title in previous section
        prev_lines = sections[idx-1].split('\n')
        title = prev_lines[-1].strip() if prev_lines else f"Post {idx}"
    
    # Clean title
    title = title.replace('🌏', '').replace('🌟', '').replace('🛡️', '').replace('🦁', '').replace('🔦', '').replace('🧭', '').strip()
    title = re.sub(r'^[•\-\s]+', '', title)
    
    # Get content (first few meaningful lines)
    content_lines = []
    for line in lines[2:15]:  # Get first few lines after title
        line = line.strip()
        if line and not line.startswith('by ') and not line.startswith('hashtag') and len(line) > 20:
            content_lines.append(line)
    
    content_text = '\n\n'.join(content_lines[:5])  # First 5 paragraphs
    
    # Categorize
    content_lower = (title + ' ' + content_text).lower()
    if any(word in content_lower for word in ['leader', 'team', 'culture', 'trust']):
        category = 'Leadership'
    elif any(word in content_lower for word in ['chemical', 'industry', 'basf', 'supply']):
        category = 'Industry Insights'
    elif any(word in content_lower for word in ['ai', 'technology', 'digital', 'innovation', 'cloudflare']):
        category = 'Technology'
    elif any(word in content_lower for word in ['career', 'job', 'interview']):
        category = 'Career Advice'
    elif any(word in content_lower for word in ['strategy', 'business', 'governance']):
        category = 'Business Strategy'
    else:
        category = 'Industry Insights'
    
    formatted_posts.append({
        'title': title,
        'date': post_date.strftime('%Y-%m-%d'),
        'category': category,
        'content': content_text
    })
    
    # Move date back by 1-2 days
    post_date -= timedelta(days=1 if idx % 2 == 0 else 2)
    
    print(f"✅ Post {idx}: {title[:60]}...")

# Write formatted posts
with open(output_file, 'w', encoding='utf-8') as f:
    f.write("━" * 80 + "\n")
    f.write("📝 LINKEDIN POSTS - FORMATTED FOR BLOG\n")
    f.write("━" * 80 + "\n\n")
    
    for post in formatted_posts:
        f.write("---POST---\n")
        f.write(f"TITLE: {post['title']}\n")
        f.write(f"DATE: {post['date']}\n")
        f.write(f"CATEGORY: {post['category']}\n\n")
        f.write(post['content'])
        f.write("\n\n")

print(f"\n✅ Formatted {len(formatted_posts)} posts")
print(f"✅ Saved to: {output_file}")
print(f"\n🎯 Next: Tell me 'add posts' to create blog pages!")
