#!/usr/bin/env python3
"""
Kiro Automation Script
Run all automation tasks in sequence
"""

import sys
import subprocess
from pathlib import Path

def run_script(script_name, description):
    """Run a Python script and return success status"""
    print(f"\n{'='*60}")
    print(f"🚀 {description}")
    print(f"{'='*60}")
    
    script_path = Path(__file__).parent / script_name
    result = subprocess.run([sys.executable, str(script_path)], capture_output=False)
    
    return result.returncode == 0

def main():
    """Run all automation tasks"""
    print("🤖 Kiro Automation System")
    print("Ideas Before Time - Automated Workflow\n")
    
    tasks = [
        ('validate_innovations.py', 'Validating innovations.json'),
        ('generate_sitemap.py', 'Generating sitemap.xml'),
    ]
    
    results = []
    for script, description in tasks:
        success = run_script(script, description)
        results.append((description, success))
    
    # Summary
    print(f"\n{'='*60}")
    print("📋 Automation Summary")
    print(f"{'='*60}")
    
    for description, success in results:
        status = "✅" if success else "❌"
        print(f"{status} {description}")
    
    all_success = all(success for _, success in results)
    
    if all_success:
        print("\n🎉 All automation tasks completed successfully!")
        print("\n📝 Next steps:")
        print("   1. Review the generated files")
        print("   2. Commit changes to GitHub")
        print("   3. Push to deploy to Cloudflare Pages")
    else:
        print("\n⚠️  Some tasks failed. Please review the errors above.")
        return 1
    
    return 0

if __name__ == '__main__':
    exit(main())
