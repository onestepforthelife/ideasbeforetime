#!/usr/bin/env python3
"""
ChromaDB Learning Search
Semantic search of 47 learnings - finds related patterns, not just keywords
"""

import chromadb
from chromadb.config import Settings
import json
import sys

# Initialize ChromaDB
client = chromadb.Client(Settings(
    chroma_db_impl="duckdb+parquet",
    persist_directory="./.kiro/tools/chromadb_data"
))

def load_learnings():
    """Load learnings from 3_WEEKS_COMPLETE_LEARNINGS.md"""
    learnings = []
    
    # Parse markdown file
    with open('../.kiro/steering/3_WEEKS_COMPLETE_LEARNINGS.md', 'r', encoding='utf-8') as f:
        content = f.read()
        
    # Extract learnings (simplified - would need better parsing)
    sections = content.split('### Learning')
    for i, section in enumerate(sections[1:], 1):  # Skip intro
        lines = section.split('\n')
        title = lines[0].strip()
        
        # Extract key info
        what_happened = ""
        lesson = ""
        for line in lines:
            if line.startswith('**What happened:**'):
                what_happened = line.replace('**What happened:**', '').strip()
            elif line.startswith('**Lesson:**'):
                lesson = line.replace('**Lesson:**', '').strip()
        
        learnings.append({
            'id': f'learning_{i}',
            'title': title,
            'what_happened': what_happened,
            'lesson': lesson,
            'full_text': section
        })
    
    return learnings

def index_learnings():
    """Index learnings in ChromaDB"""
    print("📚 Indexing learnings in ChromaDB...")
    
    # Get or create collection
    collection = client.get_or_create_collection(
        name="kiro_learnings",
        metadata={"description": "47 learnings from 3 weeks"}
    )
    
    learnings = load_learnings()
    
    # Add to collection
    collection.add(
        documents=[l['full_text'] for l in learnings],
        metadatas=[{
            'title': l['title'],
            'what_happened': l['what_happened'],
            'lesson': l['lesson']
        } for l in learnings],
        ids=[l['id'] for l in learnings]
    )
    
    print(f"✅ Indexed {len(learnings)} learnings")
    return len(learnings)

def search_learnings(query, n_results=5):
    """Search learnings semantically"""
    print(f"\n🔍 Searching for: '{query}'\n")
    
    collection = client.get_collection("kiro_learnings")
    
    results = collection.query(
        query_texts=[query],
        n_results=n_results
    )
    
    print(f"📊 Found {len(results['documents'][0])} relevant learnings:\n")
    
    for i, (doc, metadata, distance) in enumerate(zip(
        results['documents'][0],
        results['metadatas'][0],
        results['distances'][0]
    ), 1):
        print(f"{i}. {metadata['title']}")
        print(f"   Relevance: {1 - distance:.2%}")
        print(f"   Lesson: {metadata['lesson'][:100]}...")
        print()
    
    return results

if __name__ == '__main__':
    if len(sys.argv) < 2:
        print("Usage: python chromadb-learning-search.py <query>")
        print("   or: python chromadb-learning-search.py --index")
        sys.exit(1)
    
    if sys.argv[1] == '--index':
        index_learnings()
    else:
        query = ' '.join(sys.argv[1:])
        search_learnings(query)
