# Working Patterns & Guidelines for Amit's Projects

## 🎯 Core Principles

### Communication Style
- **User writes with typos/shortcuts** - This is normal and expected
- **Never correct spelling** - Understand intent, don't be pedantic
- **Minimize questions** - Ask what's needed upfront, then execute
- **Visual guides preferred** - Use ASCII art, boxes, emojis for clarity
- **Simple language** - Explain like talking to a friend, not a manual

### Work Philosophy
- **Minimize user effort** - Do the heavy lifting, make it easy
- **Ask upfront** - "What do you need in advance?" approach
- **No unnecessary files** - Don't create docs unless explicitly requested
- **Production-ready focus** - Build things that work immediately
- **Free solutions preferred** - Always look for $0 cost options
- **NO REPETITIVE WORK** - If something was done before, don't redo it. Check what exists first.

## 📁 Project Structure Patterns

### File Organization
```
Cloudfare/
├── ghar-ghar/           # Game project
│   ├── *.html           # Main files
│   ├── *.js             # Modular JavaScript
│   ├── *GUIDE*.txt      # Visual guides (ASCII art)
│   ├── *.md             # Technical documentation
│   └── *.bat            # Windows automation scripts
└── .kiro/
    └── steering/        # AI working guidelines
```

### Naming Conventions
- **Descriptive names**: `GITHUB_AUTO_UPDATE_GUIDE.txt` not `guide.txt`
- **ALL CAPS for guides**: Makes them stand out
- **Hyphens in code files**: `ghar-ghar-game.html`
- **Extensions matter**: `.txt` for visual guides, `.md` for technical docs

## 🎨 Documentation Style

### Visual Guides (*.txt files)
```
╔══════════════════════════════════════════════════════════════╗
║     🏠 TITLE WITH EMOJI 🏠                                  ║
║          Subtitle explaining purpose                         ║
╚══════════════════════════════════════════════════════════════╝

✅ YOU WILL SEE: What user experiences
✅ YOU WILL DO: Actions required
✅ YOU WON'T SEE: What to avoid
✅ DIFFICULTY: Complexity level

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📍 STEP 1: Clear Action Title
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Detailed instructions with:
- Visual representations
- Button mockups: ┌─────────────┐
                   │  Click Me   │
                   └─────────────┘
- Clear indicators: ← CLICK THIS
```

### Key Elements
- **Heavy use of emojis**: 🎯 📁 ✅ ❌ 🚀 💡 ⚠️
- **Box drawing characters**: ═ ║ ╔ ╗ ╚ ╝ ─ │ ┌ ┐ └ ┘
- **Section separators**: Long lines of ━
- **Visual hierarchy**: Clear steps, subsections
- **Success indicators**: ✅ at end of sections

## 🔒 Security & Privacy Boundaries

### Critical Rules
- ❌ **NEVER store passwords in files**
- ❌ **NEVER commit credentials to Git**
- ❌ **NEVER use passwords in scripts**
- ✅ **Always use OAuth/token authentication**
- ✅ **Use environment variables for secrets**
- ✅ **Prefer browser-based authentication**

### Data Privacy
- No personal data collection
- No user accounts unless necessary
- GDPR/COPPA compliant by default
- Local storage preferred over cloud
- Peer-to-peer over server-based

## 💰 Cost Consciousness

### Zero-Cost Priority
1. **Cloudflare Pages** - Free hosting
2. **PeerJS + WebRTC** - Free multiplayer
3. **GitHub** - Free version control
4. **Public STUN servers** - Free connectivity
5. **CDN libraries** - Free dependencies

### Payment Integration
- **Razorpay link**: https://rzp.io/rzp/JBRrz8v (for Ideas Before Time site)
- Use payment links, not API integration (simpler, free)

### Cost Verification
- Always verify "FREE forever" claims
- Document cost structure clearly
- Warn about potential future costs
- Provide alternatives if costs arise

## 🚀 Deployment Patterns

### Cloudflare Pages Workflow
1. **Manual upload** - Drag & drop (easiest for non-technical)
2. **GitHub integration** - Auto-deploy on push (professional)
3. **Wrangler CLI** - Command-line automation (advanced)

### File Requirements
- Minimum viable files only
- No build process unless necessary
- Direct HTML/JS/CSS deployment
- Service workers for PWA features

## 🎮 Ghar Ghar Game Specifics

### Core Features
- 10 roles (doctor, teacher, police, chef, etc.)
- 5 Indian languages (EN, HI, TA, TE, BN)
- 150+ items, 60+ shops/classes
- Drag & drop gameplay
- Sound effects (Web Audio API)
- Animations (6 types)

### Technical Stack
- **No frameworks** - Vanilla JavaScript
- **No build tools** - Direct deployment
- **Modular files** - Separate concerns
- **CDN dependencies** - PeerJS from unpkg.com
- **Progressive enhancement** - Works offline

### Multiplayer Architecture
- **PeerJS** - WebRTC wrapper
- **8 STUN servers** - Redundancy for connectivity
- **Room codes** - Simple 6-character codes
- **No backend** - Peer-to-peer only
- **Free forever** - No server costs
- **MUST SHOW**: Clear instructions that kids from India & Singapore can play together
- **MUST HAVE**: Step-by-step process visible on game page for multiplayer

## 🛠️ Development Workflow

### When User Says "Update X"
1. Read existing file
2. Make minimal changes
3. Test syntax/logic
4. Update related docs if needed
5. Confirm completion briefly

### When User Says "Create Guide"
1. Ask: "Visual (.txt) or Technical (.md)?"
2. Use appropriate template
3. Include troubleshooting section
4. Add success indicators
5. Keep it concise but complete

### When User Says "Deploy"
1. Verify all files present
2. Check for errors
3. Provide deployment options
4. Give step-by-step instructions
5. Include verification steps

## 📊 Testing Approach

### Automated Checks
- Syntax validation (HTML, JS, JSON)
- File integrity verification
- Dependency availability
- Security scan (no credentials)
- Performance estimation

### Manual Test Checklist
- Game loads without errors
- All features accessible
- Multiplayer connection works
- Mobile responsive
- Cross-browser compatible

## 🌐 Multiplayer Guidelines

### Free Forever Verification
- Use public STUN servers only
- No TURN servers (cost money)
- Peer-to-peer architecture
- No backend database
- No user authentication

### STUN Server List
```javascript
[
  { urls: 'stun:stun.l.google.com:19302' },
  { urls: 'stun:stun1.l.google.com:19302' },
  { urls: 'stun:stun.services.mozilla.com' },
  { urls: 'stun:stun.relay.metered.ca:80' },
  { urls: 'stun:openrelay.metered.ca:80' },
  { urls: 'stun:stun.stunprotocol.org:3478' },
  { urls: 'stun:stun.voip.blackberry.com:3478' },
  { urls: 'stun:stun.twilio.com:3478' }
]
```

## 📝 Documentation Hierarchy

### For Non-Technical Users
1. **SIMPLE_UI_GUIDE.txt** - Visual, step-by-step
2. **UPLOAD_GUIDE_VISUAL.txt** - Drag & drop focus
3. **README.txt** - Quick reference

### For Technical Users
1. **AUTOMATION_GUIDE.md** - CLI tools
2. **GITHUB_AUTO_UPDATE_GUIDE.txt** - Git integration
3. **DEPLOY.txt** - Deployment options

### For Reference
1. **TEST_REPORT.txt** - Verification results
2. **GHAR_GHAR_COMPLETE_V3.md** - Full feature list
3. **GHAR_GHAR_QUICK_REFERENCE.txt** - Cheat sheet

## 🎯 Response Patterns

### When User Asks "What did you learn?"
- Create/update this steering file
- Summarize key patterns
- Document boundary conditions
- Note cautions taken

### When User Says "Minimize work for me"
- Ask what's needed upfront
- Provide complete solution
- Include all variations
- Add troubleshooting
- Make it copy-paste ready

### When User Has Typos
- Understand intent
- Don't mention typos
- Respond naturally
- Focus on solution

## ⚠️ Cautions & Boundaries

### File System
- **Windows paths**: Use backslashes or forward slashes
- **OneDrive sync**: Files in `C:\Users\araag\OneDrive\`
- **Multi-root workspace**: Two workspace folders active
- **Path validation**: Always verify file locations

### Deployment
- **HTTPS required**: For PWA and WebRTC
- **CORS considerations**: CDN resources
- **Service worker scope**: Root or subfolder
- **Manifest paths**: Relative to HTML file

### User Preferences
- **Visual over text**: ASCII art guides preferred
- **Simple over complex**: Avoid technical jargon
- **Free over paid**: Always find $0 solutions
- **Working over perfect**: Ship it, iterate later

## 🚨 CRITICAL ETHICAL RULES (Added Dec 1, 2025)

### NEVER LIE OR MISLEAD
- **NEVER say something is "production ready" unless it actually works**
- **NEVER say something is "LIVE" if it has demo data or incomplete features**
- **NEVER claim features work when they don't**
- **ALWAYS be honest about what's done vs what's not done**
- **ALWAYS test before claiming something works**
- **If something doesn't work, say: "This doesn't work yet. I need to fix X, Y, Z."**
- **If something is demo/preview, clearly label it as such**

### Status Transparency
- ✅ "Working" = Tested and functional
- 🚧 "In Progress" = Partially done
- ❌ "Not Working" = Has issues
- 🎨 "Demo/Preview" = Sample data only

### Before Saying "Ready"
1. Test the feature yourself
2. Verify it works with real data (not demo)
3. Check all claimed features actually exist
4. Be honest about limitations

**User trust is more important than appearing competent.**

## 🔄 Update Patterns

### When Adding Features
1. Update main HTML file
2. Update relevant JS modules
3. Update documentation
4. Update TEST_REPORT.txt
5. Update version numbers

### When Fixing Bugs
1. Identify root cause
2. Fix in minimal way
3. Test related features
4. Document in comments
5. Update guides if needed

## 📱 Platform Considerations

### Windows Environment
- Use `.bat` files for automation
- PowerShell or CMD commands
- File Explorer drag & drop
- GitHub Desktop integration

### Browser Compatibility
- Chrome (primary)
- Firefox (secondary)
- Edge (Windows default)
- Safari (iOS testing)

### Mobile Support
- Touch events
- Responsive design
- PWA installation
- Offline functionality

## 🎊 Success Indicators

### Project Complete When
- ✅ All files present and error-free
- ✅ Documentation comprehensive
- ✅ Deployment tested
- ✅ Multiplayer verified
- ✅ Cost confirmed ($0)
- ✅ User can proceed independently

### Guide Complete When
- ✅ Visual hierarchy clear
- ✅ Steps numbered/organized
- ✅ Troubleshooting included
- ✅ Success criteria defined
- ✅ Time estimate provided

## 🤝 Multi-User Collaboration

### When Working with Partner
- Both users share same workspace folder
- Both Kiros follow same steering rules
- Files sync automatically (OneDrive/GitHub)
- **If there's a conflict, ASK before proceeding**
- Check file timestamps to see who edited last
- Don't overwrite partner's recent changes
- Communicate through comments in files if needed

### Conflict Resolution
- If file was modified in last hour → ASK first
- If instructions contradict → ASK which to follow
- If unsure about intent → ASK for clarification
- Better to ask than to undo partner's work

## 💡 Remember

- **Amit prefers action over discussion**
- **Visual guides over text explanations**
- **Free solutions over paid**
- **Simple over complex**
- **Working over perfect**
- **Minimal questions, maximum execution**
- **NO REPETITIVE WORK - Check what exists first**
- **ASK if there's any conflict between users**

---

**Last Updated**: December 1, 2024
**Status**: Active
**Version**: 1.2

This file will be automatically referenced in all future interactions to maintain consistency and quality.
