"""
Final LinkedIn posts extractor with proper titles
"""
import re
from datetime import datetime, timedelta

input_file = r"C:\Users\araag\Documents\Cloudfare\linkedin-posts-extracted.txt"
output_file = r"C:\Users\araag\Documents\Cloudfare\linkedin-posts.txt"

print("=" * 80)
print("📝 EXTRACTING LINKEDIN POSTS WITH TITLES")
print("=" * 80)

with open(input_file, 'r', encoding='utf-8') as f:
    content = f.read()

# Split by "by Vashist Specialty Chemicals Agentic AI"
sections = content.split('by Vashist Specialty Chemicals Agentic AI')

formatted_posts = []
post_date = datetime(2025, 11, 30)

for idx, section in enumerate(sections[:-1]):  # Skip last section
    lines = section.strip().split('\n')
    
    # Title is usually the last non-empty line before "by Vashist..."
    title = ""
    for line in reversed(lines):
        line = line.strip()
        if line and len(line) > 10 and not line.startswith('hashtag') and not line.startswith('Activate'):
            title = line
            break
    
    # Clean title
    title = title.replace('🌏', '').replace('🌟', '').replace('🛡️', '').replace('🦁', '').replace('🔦', '').replace('🧭', '').strip()
    title = re.sub(r'^[•\-\s]+', '', title)
    
    if not title or len(title) < 10:
        continue
    
    # Get content from next section
    if idx + 1 < len(sections):
        next_section = sections[idx + 1]
        content_lines = []
        for line in next_section.split('\n')[2:20]:
            line = line.strip()
            if line and not line.startswith('hashtag') and not line.startswith('Activate') and not line.startswith('by ') and len(line) > 30:
                content_lines.append(line)
                if len(content_lines) >= 5:
                    break
        
        content_text = '\n\n'.join(content_lines)
    else:
        content_text = ""
    
    if not content_text:
        continue
    
    # Categorize
    combined = (title + ' ' + content_text).lower()
    if any(word in combined for word in ['leader', 'team', 'culture', 'trust', 'initiative']):
        category = 'Leadership'
    elif any(word in combined for word in ['chemical', 'industry', 'basf', 'supply', 'market']):
        category = 'Industry Insights'
    elif any(word in combined for word in ['ai', 'technology', 'digital', 'innovation', 'cloudflare', 'kiro']):
        category = 'Technology'
    elif any(word in combined for word in ['career', 'job', 'interview', 'resume']):
        category = 'Career Advice'
    elif any(word in combined for word in ['strategy', 'business', 'governance', 'sales']):
        category = 'Business Strategy'
    else:
        category = 'Industry Insights'
    
    formatted_posts.append({
        'title': title[:150],  # Limit title length
        'date': post_date.strftime('%Y-%m-%d'),
        'category': category,
        'content': content_text
    })
    
    post_date -= timedelta(days=1 if idx % 2 == 0 else 2)
    print(f"✅ Post {len(formatted_posts)}: {title[:60]}...")

# Write formatted posts
with open(output_file, 'w', encoding='utf-8') as f:
    f.write("━" * 80 + "\n")
    f.write("📝 LINKEDIN POSTS - READY FOR BLOG\n")
    f.write(f"📊 Total Posts: {len(formatted_posts)}\n")
    f.write("━" * 80 + "\n\n")
    
    for post in formatted_posts:
        f.write("---POST---\n")
        f.write(f"TITLE: {post['title']}\n")
        f.write(f"DATE: {post['date']}\n")
        f.write(f"CATEGORY: {post['category']}\n\n")
        f.write(post['content'])
        f.write("\n\n")

print(f"\n✅ Successfully formatted {len(formatted_posts)} posts")
print(f"✅ Saved to: {output_file}")
print(f"\n🎯 Ready to add to blog!")
