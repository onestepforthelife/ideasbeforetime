#!/usr/bin/env python3
"""
LinkedIn Articles to Book Converter
Extracts all articles from LinkedIn export and creates a comprehensive book
"""

import os
import re
from pathlib import Path
from html.parser import HTMLParser
from collections import defaultdict

class ArticleExtractor(HTMLParser):
    def __init__(self):
        super().__init__()
        self.current_tag = None
        self.title = ""
        self.content = []
        self.in_content = False
        
    def handle_starttag(self, tag, attrs):
        self.current_tag = tag
        if tag in ['h1', 'h2', 'h3', 'p', 'ul', 'li', 'blockquote']:
            self.in_content = True
            
    def handle_endtag(self, tag):
        self.current_tag = None
        
    def handle_data(self, data):
        data = data.strip()
        if not data:
            return
            
        if self.current_tag == 'title' and not self.title:
            self.title = data
        elif self.in_content and data not in ['Created on', 'Published on']:
            if not data.startswith('20') or len(data) > 30:  # Skip dates
                self.content.append(data)

def extract_article(html_file):
    """Extract title and content from HTML file"""
    try:
        with open(html_file, 'r', encoding='utf-8') as f:
            html_content = f.read()
        
        parser = ArticleExtractor()
        parser.feed(html_content)
        
        return {
            'title': parser.title,
            'content': '\n\n'.join(parser.content),
            'filename': html_file.name
        }
    except Exception as e:
        print(f"Error processing {html_file}: {e}")
        return None

def categorize_articles(articles):
    """Categorize articles by theme"""
    categories = {
        'Leadership': [],
        'Innovation': [],
        'Business Excellence': [],
        'AI & Technology': [],
        'Industry Insights': [],
        'Governance': [],
        'Culture & People': [],
        'Miscellaneous': []
    }
    
    keywords = {
        'Leadership': ['leader', 'leadership', 'trust', 'intention', 'journey'],
        'Innovation': ['innovation', 'ideas', 'creativity', 'floor-level', 'breakthrough'],
        'Business Excellence': ['excellence', 'simplicity', 'efficiency', 'productivity'],
        'AI & Technology': ['ai', 'algorithm', 'digital', 'automation', 'technology'],
        'Industry Insights': ['chemical', 'semiconductor', 'industry', 'market'],
        'Governance': ['governance', 'compliance', 'esg', 'board', 'strategic'],
        'Culture & People': ['culture', 'team', 'people', 'empathy', 'human']
    }
    
    for article in articles:
        title_lower = article['title'].lower()
        content_lower = article['content'][:500].lower()
        
        categorized = False
        for category, words in keywords.items():
            if any(word in title_lower or word in content_lower for word in words):
                categories[category].append(article)
                categorized = True
                break
        
        if not categorized:
            categories['Miscellaneous'].append(article)
    
    return categories

def generate_html_book(categories, output_file):
    """Generate complete HTML book"""
    
    html = '''<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Uncommon Sense - Complete Collection</title>
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Merriweather:wght@300;400;700&family=Open+Sans:wght@400;600&display=swap');
        
        * { margin: 0; padding: 0; box-sizing: border-box; }
        
        body {
            font-family: 'Open Sans', sans-serif;
            line-height: 1.6;
            color: #333;
            background: white;
        }
        
        .book-container {
            max-width: 900px;
            margin: 0 auto;
            background: white;
        }
        
        .book-cover {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 100px 60px;
            text-align: center;
            min-height: 100vh;
            display: flex;
            flex-direction: column;
            justify-content: center;
        }
        
        .book-title {
            font-family: 'Merriweather', serif;
            font-size: 4em;
            font-weight: 700;
            margin-bottom: 30px;
        }
        
        .book-subtitle {
            font-size: 1.8em;
            margin-bottom: 50px;
            opacity: 0.9;
        }
        
        .book-author {
            font-size: 2em;
            margin-top: 50px;
            font-weight: 600;
        }
        
        .book-page {
            padding: 80px 60px;
            min-height: 100vh;
        }
        
        .chapter-title {
            font-family: 'Merriweather', serif;
            font-size: 2.5em;
            color: #667eea;
            margin-bottom: 40px;
            border-bottom: 3px solid #667eea;
            padding-bottom: 20px;
            page-break-before: always;
        }
        
        .article {
            margin-bottom: 60px;
            page-break-inside: avoid;
        }
        
        .article-title {
            font-family: 'Merriweather', serif;
            font-size: 1.8em;
            color: #764ba2;
            margin-bottom: 20px;
        }
        
        .article-content {
            font-size: 1.1em;
            line-height: 1.8;
            text-align: justify;
        }
        
        .article-content p {
            margin-bottom: 20px;
        }
        
        .controls {
            position: fixed;
            top: 20px;
            right: 20px;
            z-index: 1000;
        }
        
        .btn {
            background: #667eea;
            color: white;
            border: none;
            padding: 15px 30px;
            margin: 5px;
            border-radius: 25px;
            cursor: pointer;
            font-size: 1em;
        }
        
        .btn:hover {
            background: #764ba2;
        }
        
        @media print {
            .controls { display: none; }
            .book-page, .article { page-break-after: always; }
        }
    </style>
</head>
<body>
    <div class="controls">
        <button class="btn" onclick="window.print()">📄 Print/PDF</button>
    </div>
    
    <div class="book-container">
        <div class="book-cover">
            <div class="book-title">UNCOMMON SENSE</div>
            <div class="book-subtitle">Complete Collection of Leadership Insights</div>
            <div class="book-author">Amit Vashist, F.I.E., C.Eng.(I)</div>
        </div>
'''
    
    # Generate chapters for each category
    for category, articles in categories.items():
        if not articles:
            continue
            
        html += f'''
        <div class="book-page">
            <h1 class="chapter-title">{category}</h1>
'''
        
        for i, article in enumerate(articles, 1):
            # Clean content
            content = article['content'].replace('#', '').strip()
            
            html += f'''
            <div class="article">
                <h2 class="article-title">{i}. {article['title']}</h2>
                <div class="article-content">
                    <p>{content}</p>
                </div>
            </div>
'''
        
        html += '        </div>\n'
    
    html += '''
    </div>
</body>
</html>
'''
    
    with open(output_file, 'w', encoding='utf-8') as f:
        f.write(html)
    
    print(f"✅ Book generated: {output_file}")

def main():
    # Path to LinkedIn articles
    articles_dir = Path(r"C:\Users\araag\Downloads\Basic_LinkedInDataExport_12-02-2025\Articles\Articles")
    
    if not articles_dir.exists():
        print(f"❌ Directory not found: {articles_dir}")
        return
    
    print(f"📚 Extracting articles from: {articles_dir}")
    
    # Extract all articles
    articles = []
    html_files = list(articles_dir.glob("*.html"))
    
    print(f"Found {len(html_files)} articles")
    
    for html_file in html_files:
        article = extract_article(html_file)
        if article and article['title']:
            articles.append(article)
            print(f"  ✓ {article['title'][:60]}...")
    
    print(f"\n✅ Extracted {len(articles)} articles")
    
    # Categorize articles
    print("\n📂 Categorizing articles...")
    categories = categorize_articles(articles)
    
    for category, arts in categories.items():
        if arts:
            print(f"  {category}: {len(arts)} articles")
    
    # Generate book
    output_file = Path("linkedin-complete-book.html")
    print(f"\n📖 Generating book...")
    generate_html_book(categories, output_file)
    
    print(f"\n🎉 Done! Open {output_file} in your browser")
    print(f"   Then use Print > Save as PDF to create your book")

if __name__ == "__main__":
    main()
