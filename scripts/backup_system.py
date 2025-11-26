#!/usr/bin/env python3
"""
Backup System for Ideas Before Time
Creates timestamped backups of critical files
"""

import json
import shutil
from datetime import datetime
from pathlib import Path

def create_backup():
    """Create timestamped backup of critical files"""
    
    # Setup paths
    project_root = Path(__file__).parent.parent
    backup_root = project_root / 'backups'
    timestamp = datetime.now().strftime('%Y%m%d_%H%M%S')
    backup_dir = backup_root / timestamp
    
    # Create backup directory
    backup_dir.mkdir(parents=True, exist_ok=True)
    
    print(f"🔄 Creating backup: {timestamp}")
    print(f"📁 Backup location: {backup_dir}\n")
    
    # Critical files to backup
    critical_files = [
        'innovations.json',
        'sitemap.xml',
        'index.html',
        'library.html',
        'about.html',
        'timeline.html',
        'innovations-table.html',
    ]
    
    # Backup critical files
    backed_up = []
    for filename in critical_files:
        source = project_root / filename
        if source.exists():
            dest = backup_dir / filename
            shutil.copy2(source, dest)
            backed_up.append(filename)
            print(f"✅ Backed up: {filename}")
        else:
            print(f"⚠️  Skipped (not found): {filename}")
    
    # Backup scripts directory
    scripts_dir = project_root / 'scripts'
    if scripts_dir.exists():
        scripts_backup = backup_dir / 'scripts'
        shutil.copytree(scripts_dir, scripts_backup, dirs_exist_ok=True)
        print(f"✅ Backed up: scripts/ directory")
    
    # Backup .kiro configuration
    kiro_dir = project_root / '.kiro'
    if kiro_dir.exists():
        kiro_backup = backup_dir / '.kiro'
        shutil.copytree(kiro_dir, kiro_backup, dirs_exist_ok=True)
        print(f"✅ Backed up: .kiro/ configuration")
    
    # Create backup manifest
    manifest = {
        'timestamp': timestamp,
        'date': datetime.now().isoformat(),
        'files_backed_up': backed_up,
        'backup_location': str(backup_dir),
        'total_files': len(backed_up)
    }
    
    manifest_path = backup_dir / 'BACKUP_MANIFEST.json'
    with open(manifest_path, 'w', encoding='utf-8') as f:
        json.dump(manifest, f, indent=2)
    
    print(f"\n📋 Backup manifest created")
    print(f"📊 Total files backed up: {len(backed_up)}")
    
    # Cleanup old backups (keep last 10)
    cleanup_old_backups(backup_root, keep=10)
    
    return backup_dir

def cleanup_old_backups(backup_root, keep=10):
    """Keep only the most recent N backups"""
    if not backup_root.exists():
        return
    
    backups = sorted([d for d in backup_root.iterdir() if d.is_dir()], reverse=True)
    
    if len(backups) > keep:
        print(f"\n🧹 Cleaning up old backups (keeping {keep} most recent)...")
        for old_backup in backups[keep:]:
            shutil.rmtree(old_backup)
            print(f"   Removed: {old_backup.name}")

def restore_backup(backup_timestamp=None):
    """Restore from a backup"""
    project_root = Path(__file__).parent.parent
    backup_root = project_root / 'backups'
    
    if not backup_root.exists():
        print("❌ No backups found!")
        return False
    
    # List available backups
    backups = sorted([d for d in backup_root.iterdir() if d.is_dir()], reverse=True)
    
    if not backups:
        print("❌ No backups available!")
        return False
    
    # Select backup
    if backup_timestamp:
        backup_dir = backup_root / backup_timestamp
        if not backup_dir.exists():
            print(f"❌ Backup not found: {backup_timestamp}")
            return False
    else:
        backup_dir = backups[0]  # Most recent
    
    print(f"🔄 Restoring from backup: {backup_dir.name}")
    
    # Read manifest
    manifest_path = backup_dir / 'BACKUP_MANIFEST.json'
    if manifest_path.exists():
        with open(manifest_path, 'r', encoding='utf-8') as f:
            manifest = json.load(f)
        print(f"📅 Backup date: {manifest.get('date')}")
        print(f"📊 Files in backup: {manifest.get('total_files')}\n")
    
    # Restore files
    for item in backup_dir.iterdir():
        if item.name == 'BACKUP_MANIFEST.json':
            continue
        
        dest = project_root / item.name
        
        if item.is_file():
            shutil.copy2(item, dest)
            print(f"✅ Restored: {item.name}")
        elif item.is_dir():
            if dest.exists():
                shutil.rmtree(dest)
            shutil.copytree(item, dest)
            print(f"✅ Restored: {item.name}/ directory")
    
    print(f"\n🎉 Restore completed successfully!")
    return True

def list_backups():
    """List all available backups"""
    project_root = Path(__file__).parent.parent
    backup_root = project_root / 'backups'
    
    if not backup_root.exists():
        print("No backups found.")
        return
    
    backups = sorted([d for d in backup_root.iterdir() if d.is_dir()], reverse=True)
    
    if not backups:
        print("No backups available.")
        return
    
    print(f"📦 Available Backups ({len(backups)}):\n")
    
    for backup_dir in backups:
        manifest_path = backup_dir / 'BACKUP_MANIFEST.json'
        if manifest_path.exists():
            with open(manifest_path, 'r', encoding='utf-8') as f:
                manifest = json.load(f)
            print(f"  {backup_dir.name}")
            print(f"    Date: {manifest.get('date')}")
            print(f"    Files: {manifest.get('total_files')}")
            print()

if __name__ == '__main__':
    import sys
    
    if len(sys.argv) > 1:
        command = sys.argv[1]
        
        if command == 'restore':
            timestamp = sys.argv[2] if len(sys.argv) > 2 else None
            restore_backup(timestamp)
        elif command == 'list':
            list_backups()
        else:
            print("Usage:")
            print("  python backup_system.py           # Create backup")
            print("  python backup_system.py list      # List backups")
            print("  python backup_system.py restore   # Restore latest")
            print("  python backup_system.py restore TIMESTAMP  # Restore specific")
    else:
        create_backup()
