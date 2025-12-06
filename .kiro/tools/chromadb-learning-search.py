#!/usr/bin/env python3
"""
ChromaDB - Semantic search of 47 learnings
Better than JSON keyword search - finds related patterns
"""

import chromadb
import json
from pathlib import Path

class LearningSearch:
    def __init__(self):
        self.client = chromadb.Client()
        self.collection = self.client.get_or_create_collection("learnings")
        
    def index_learnings(self):
        """Index all 47 learnings from steering files"""
        learnings_file = Path(__file__).parent.parent / "steering" / "3_WEEKS_COMPLETE_LEARNINGS.md"
        
        with open(learnings_file, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # Parse learnings (simplified - would need proper parsing)
        learnings = []
        current_learning = {}
        
        for line in content.split('\n'):
            if line.startswith('### Learning'):
                if current_learning:
                    learnings.append(current_learning)
                current_learning = {'title': line, 'content': ''}
            elif current_learning:
                current_learning['content'] += line + '\n'
        
        if current_learning:
            learnings.append(current_learning)
        
        # Add to ChromaDB
        for i, learning in enumerate(learnings):
            self.collection.add(
                documents=[learning['content']],
                metadatas=[{'title': learning['title']}],
                ids=[f"learning_{i}"]
            )
        
        print(f"✓ Indexed {len(learnings)} learnings")
    
    def search(self, query, n_results=3):
        """Search for relevant learnings"""
        results = self.collection.query(
            query_texts=[query],
            n_results=n_results
        )
        
        print(f"\n=== SEARCH: {query} ===")
        for i, (doc, meta) in enumerate(zip(results['documents'][0], results['metadatas'][0])):
            print(f"\n{i+1}. {meta['title']}")
            print(doc[:200] + "...")
        
        return results

if __name__ == "__main__":
    searcher = LearningSearch()
    
    # Index learnings first time
    searcher.index_learnings()
    
    # Example searches
    searcher.search("testing before saying done")
    searcher.search("checking all files not just one")
    searcher.search("credit optimization")
