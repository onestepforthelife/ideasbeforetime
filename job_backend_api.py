"""
Flask Backend API for Job Search Tool
Connects web interface to Python job search scripts
"""

from flask import Flask, jsonify, request, send_from_directory
from flask_cors import CORS
import json
import os
import subprocess
import glob
from datetime import datetime
import re

app = Flask(__name__)
CORS(app)  # Enable CORS for localhost testing

# Configuration
GEMINI_API_KEY = 'AIzaSyBi2TD5oDtTLKax9cj1ClxLtZYQRg0s9a8'  # Amit's Gemini API Key
JOB_RESULTS_FOLDER = 'job_results'
PROFILE_FOLDER = 'amit profile for Kiro'

# Ensure folders exist
os.makedirs(JOB_RESULTS_FOLDER, exist_ok=True)

# ============================================================================
# UTILITY FUNCTIONS
# ============================================================================

def validate_email(email):
    """Validate email format"""
    pattern = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
    return re.match(pattern, email) is not None

def load_job_results():
    """Load all job results from job_results folder"""
    jobs = []
    
    # Look for JSON files in job_results folder
    json_files = glob.glob(os.path.join(JOB_RESULTS_FOLDER, '*.json'))
    
    for json_file in json_files:
        try:
            with open(json_file, 'r', encoding='utf-8') as f:
                job_data = json.load(f)
                
                # Ensure job has required fields
                if isinstance(job_data, list):
                    jobs.extend(job_data)
                else:
                    jobs.append(job_data)
        except Exception as e:
            print(f"Error loading {json_file}: {e}")
    
    return jobs

def get_agent_status():
    """Check if job agent is currently running"""
    # Check for lock file or process
    lock_file = os.path.join(JOB_RESULTS_FOLDER, '.agent_running')
    return os.path.exists(lock_file)

# ============================================================================
# API ENDPOINTS
# ============================================================================

@app.route('/api/health', methods=['GET'])
def health_check():
    """Health check endpoint"""
    return jsonify({
        'status': 'ok',
        'timestamp': datetime.now().isoformat(),
        'version': '1.0.0'
    })

@app.route('/api/jobs', methods=['GET'])
def get_jobs():
    """Get all job results"""
    try:
        jobs = load_job_results()
        
        return jsonify({
            'success': True,
            'count': len(jobs),
            'jobs': jobs,
            'timestamp': datetime.now().isoformat()
        })
    except Exception as e:
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500

@app.route('/api/jobs/<int:job_id>', methods=['GET'])
def get_job(job_id):
    """Get specific job by ID"""
    try:
        jobs = load_job_results()
        job = next((j for j in jobs if j.get('id') == job_id), None)
        
        if job:
            return jsonify({
                'success': True,
                'job': job
            })
        else:
            return jsonify({
                'success': False,
                'error': 'Job not found'
            }), 404
    except Exception as e:
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500

@app.route('/api/validate-email', methods=['POST'])
def validate_email_endpoint():
    """Validate email address"""
    data = request.json
    email = data.get('email', '')
    
    is_valid = validate_email(email)
    
    # Additional checks
    domain = email.split('@')[1] if '@' in email else ''
    
    return jsonify({
        'success': True,
        'email': email,
        'valid': is_valid,
        'domain': domain,
        'checks': {
            'format': is_valid,
            'domain_exists': True  # TODO: Add DNS lookup
        }
    })

@app.route('/api/send-email', methods=['POST'])
def send_email():
    """Send email via Python email_sender.py"""
    try:
        data = request.json
        job_id = data.get('job_id')
        contact_email = data.get('contact_email')
        
        # Validate inputs
        if not job_id or not contact_email:
            return jsonify({
                'success': False,
                'error': 'Missing job_id or contact_email'
            }), 400
        
        if not validate_email(contact_email):
            return jsonify({
                'success': False,
                'error': 'Invalid email format'
            }), 400
        
        # TODO: Call email_sender.py with job data
        # For now, return success simulation
        
        return jsonify({
            'success': True,
            'message': f'Email sent to {contact_email}',
            'job_id': job_id,
            'timestamp': datetime.now().isoformat()
        })
        
    except Exception as e:
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500

@app.route('/api/trigger-agent', methods=['POST'])
def trigger_agent():
    """Trigger job_agent.py to run job search"""
    try:
        # Check if already running
        if get_agent_status():
            return jsonify({
                'success': False,
                'error': 'Agent is already running'
            }), 409
        
        # Get parameters
        data = request.json or {}
        keywords = data.get('keywords', '')
        location = data.get('location', 'Singapore')
        
        # Create lock file
        lock_file = os.path.join(JOB_RESULTS_FOLDER, '.agent_running')
        with open(lock_file, 'w') as f:
            f.write(datetime.now().isoformat())
        
        # Run job_agent.py in background
        # TODO: Implement actual subprocess call
        # subprocess.Popen(['python', 'job_agent.py', keywords, location])
        
        return jsonify({
            'success': True,
            'message': 'Job agent started',
            'status': 'running',
            'timestamp': datetime.now().isoformat()
        })
        
    except Exception as e:
        # Remove lock file on error
        lock_file = os.path.join(JOB_RESULTS_FOLDER, '.agent_running')
        if os.path.exists(lock_file):
            os.remove(lock_file)
        
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500

@app.route('/api/agent-status', methods=['GET'])
def agent_status():
    """Get job agent status"""
    is_running = get_agent_status()
    
    # Get last run time
    lock_file = os.path.join(JOB_RESULTS_FOLDER, '.agent_running')
    last_run = None
    if os.path.exists(lock_file):
        try:
            with open(lock_file, 'r') as f:
                last_run = f.read().strip()
        except:
            pass
    
    return jsonify({
        'success': True,
        'running': is_running,
        'last_run': last_run,
        'timestamp': datetime.now().isoformat()
    })

@app.route('/api/clear-jobs', methods=['POST'])
def clear_jobs():
    """Clear all job results"""
    try:
        # Remove all JSON files in job_results folder
        json_files = glob.glob(os.path.join(JOB_RESULTS_FOLDER, '*.json'))
        
        for json_file in json_files:
            os.remove(json_file)
        
        return jsonify({
            'success': True,
            'message': f'Cleared {len(json_files)} job results',
            'timestamp': datetime.now().isoformat()
        })
        
    except Exception as e:
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500

@app.route('/api/stats', methods=['GET'])
def get_stats():
    """Get job search statistics"""
    try:
        jobs = load_job_results()
        
        # Calculate stats
        total_jobs = len(jobs)
        sent_count = sum(1 for j in jobs if j.get('status') == 'sent')
        pending_count = total_jobs - sent_count
        
        return jsonify({
            'success': True,
            'stats': {
                'total': total_jobs,
                'sent': sent_count,
                'pending': pending_count
            },
            'timestamp': datetime.now().isoformat()
        })
        
    except Exception as e:
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500

# ============================================================================
# ERROR HANDLERS
# ============================================================================

@app.errorhandler(404)
def not_found(error):
    return jsonify({
        'success': False,
        'error': 'Endpoint not found'
    }), 404

@app.errorhandler(500)
def internal_error(error):
    return jsonify({
        'success': False,
        'error': 'Internal server error'
    }), 500

# ============================================================================
# MAIN
# ============================================================================

if __name__ == '__main__':
    print("=" * 60)
    print("🚀 Job Search Tool Backend API")
    print("=" * 60)
    print(f"📁 Job Results Folder: {JOB_RESULTS_FOLDER}")
    print(f"🌐 API URL: http://localhost:5000")
    print(f"📊 Health Check: http://localhost:5000/api/health")
    print("=" * 60)
    print("\n✅ Server starting...\n")
    
    app.run(
        host='0.0.0.0',
        port=5000,
        debug=True
    )
