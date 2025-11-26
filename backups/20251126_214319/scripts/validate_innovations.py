#!/usr/bin/env python3
"""
Innovations JSON Validator
Validates innovations.json structure and data
"""

import json
import re
from pathlib import Path
from datetime import datetime

def validate_innovations():
    """Validate innovations.json file"""
    json_path = Path(__file__).parent.parent / 'innovations.json'
    
    print("🔍 Validating innovations.json...")
    
    # Load JSON
    try:
        with open(json_path, 'r', encoding='utf-8') as f:
            data = json.load(f)
    except json.JSONDecodeError as e:
        print(f"❌ Invalid JSON syntax: {e}")
        return False
    except FileNotFoundError:
        print(f"❌ File not found: {json_path}")
        return False
    
    errors = []
    warnings = []
    
    # Check top-level structure
    if 'innovations' not in data:
        errors.append("Missing 'innovations' array")
    if 'metadata' not in data:
        warnings.append("Missing 'metadata' object")
    
    # Validate innovations
    innovations = data.get('innovations', [])
    ids_seen = set()
    
    for idx, innovation in enumerate(innovations):
        prefix = f"Innovation #{idx + 1}"
        
        # Required fields
        required_fields = ['id', 'year', 'title', 'shortDescription', 'category', 'impact', 'status']
        for field in required_fields:
            if field not in innovation:
                errors.append(f"{prefix}: Missing required field '{field}'")
        
        # Validate ID
        innovation_id = innovation.get('id', '')
        if innovation_id:
            if not re.match(r'^[a-z0-9-]+$', innovation_id):
                errors.append(f"{prefix}: ID must be lowercase alphanumeric with hyphens only")
            if innovation_id in ids_seen:
                errors.append(f"{prefix}: Duplicate ID '{innovation_id}'")
            ids_seen.add(innovation_id)
        
        # Validate year
        year = innovation.get('year')
        if year:
            if not isinstance(year, int) or year < 2000 or year > 2030:
                errors.append(f"{prefix}: Year must be between 2000-2030")
        
        # Validate impact
        impact = innovation.get('impact', '')
        valid_impacts = ['Low', 'Medium', 'High', 'Revolutionary']
        if impact and impact not in valid_impacts:
            errors.append(f"{prefix}: Impact must be one of {valid_impacts}")
        
        # Validate status
        status = innovation.get('status', '')
        valid_statuses = ['draft', 'published']
        if status and status not in valid_statuses:
            errors.append(f"{prefix}: Status must be 'draft' or 'published'")
        
        # Check image file exists
        image = innovation.get('image', '')
        if image:
            image_path = Path(__file__).parent.parent / 'images' / image
            if not image_path.exists():
                warnings.append(f"{prefix}: Image file not found: {image}")
    
    # Validate metadata
    metadata = data.get('metadata', {})
    if metadata:
        if 'lastUpdated' in metadata:
            try:
                datetime.strptime(metadata['lastUpdated'], '%Y-%m-%d')
            except ValueError:
                warnings.append("Metadata: lastUpdated should be in YYYY-MM-DD format")
        
        if 'totalInnovations' in metadata:
            expected_count = len([i for i in innovations if i.get('status') == 'published'])
            actual_count = metadata['totalInnovations']
            if actual_count != expected_count:
                warnings.append(f"Metadata: totalInnovations is {actual_count}, but found {expected_count} published innovations")
    
    # Print results
    print(f"\n📊 Validation Results:")
    print(f"   Total innovations: {len(innovations)}")
    print(f"   Published: {len([i for i in innovations if i.get('status') == 'published'])}")
    print(f"   Drafts: {len([i for i in innovations if i.get('status') == 'draft'])}")
    
    if errors:
        print(f"\n❌ {len(errors)} Error(s):")
        for error in errors:
            print(f"   • {error}")
    
    if warnings:
        print(f"\n⚠️  {len(warnings)} Warning(s):")
        for warning in warnings:
            print(f"   • {warning}")
    
    if not errors and not warnings:
        print("\n✅ All validations passed!")
    elif not errors:
        print("\n✅ No errors found (warnings can be ignored)")
    
    return len(errors) == 0

if __name__ == '__main__':
    success = validate_innovations()
    exit(0 if success else 1)
