#!/usr/bin/env python3
"""
Sync files from amit Pics personal/Cloudfare to Documents/Cloudfare
"""

import shutil
from pathlib import Path

def sync_folders():
    """Copy all files from source to destination"""
    
    # Source: amit Pics personal/Cloudfare (working version)
    source = Path(r"C:\Users\araag\OneDrive\amit Pics personal\Cloudfare")
    
    # Destination: Documents/Cloudfare (empty folder)
    dest = Path(r"C:\Users\araag\Documents\Cloudfare")
    
    print("Syncing folders...")
    print(f"From: {source}")
    print(f"To: {dest}\n")
    
    if not source.exists():
        print(f"ERROR: Source folder not found: {source}")
        return
    
    # Copy all files and folders
    copied = 0
    skipped = 0
    
    for item in source.rglob("*"):
        if item.is_file():
            # Skip git files and upload scripts (we'll recreate those)
            if ".git" in item.parts or "UPLOAD_" in item.name:
                skipped += 1
                continue
            
            # Calculate relative path
            rel_path = item.relative_to(source)
            dest_path = dest / rel_path
            
            # Create parent directory if needed
            dest_path.parent.mkdir(parents=True, exist_ok=True)
            
            # Copy file
            shutil.copy2(item, dest_path)
            copied += 1
            
            if copied % 10 == 0:
                print(f"Copied {copied} files...")
    
    print(f"\n✓ Sync complete!")
    print(f"✓ Copied: {copied} files")
    print(f"✓ Skipped: {skipped} files (.git, upload scripts)")
    print(f"\nNext: Run UPLOAD_TO_GITHUB.bat to push to GitHub")

if __name__ == '__main__':
    sync_folders()
