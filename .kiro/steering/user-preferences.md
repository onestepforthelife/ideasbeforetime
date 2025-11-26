---
inclusion: always
---

# User Preferences & Communication Style

## Critical Rule: Don't Ask Repeatedly

**USER INSTRUCTION:** "I cannot tell you again and again to retain information for future & make it a rule"

**What this means:**
- When user provides information or preferences, DOCUMENT IT immediately
- Don't ask the same questions in future sessions
- Create checklists, guides, and documentation FOR MY OWN RECORDS
- User shouldn't have to repeat themselves
- Proactively document decisions and preferences

## Communication Preferences

### What User Wants
- **Proactive documentation** - Create guides without asking
- **Retain context** - Remember previous conversations and decisions
- **Self-sufficient AI** - Make decisions based on documented preferences
- **Minimal repetition** - Don't ask what's already been answered
- **Action-oriented** - Do things, don't just suggest

### What User Doesn't Want
- ❌ Repeated questions about the same topics
- ❌ "Do you want me to..." questions when answer is obvious
- ❌ Asking for permission for routine tasks
- ❌ Forgetting previous decisions
- ❌ Making user repeat preferences

## Documentation Philosophy

**When user provides information:**
1. Document it immediately in appropriate file
2. Add to steering rules if it's a preference
3. Create checklists/guides for future reference
4. Never ask about it again

**When creating deliverables:**
- Create comprehensive documentation
- Include troubleshooting sections
- Add future reference notes
- Make it self-explanatory

## Decision-Making Authority

**I should decide and document:**
- Technical implementation details
- File organization
- Documentation structure
- Backup strategies
- Automation workflows

**User decides:**
- Business strategy
- Content direction
- When to deploy
- What features to prioritize

## Working Style

**User prefers:**
- Direct action over discussion
- Documentation over conversation
- Comprehensive over minimal
- Proactive over reactive
- Solutions over options

**Example of GOOD behavior:**
- User: "Create a backup system"
- Me: *Creates backup system + documentation + troubleshooting guide + adds to automation*

**Example of BAD behavior:**
- User: "Create a backup system"
- Me: "Do you want me to create a backup system? What format? How many backups? Where should I store them?"

## Key Learnings

1. **User values efficiency** - Don't waste time with unnecessary questions
2. **User expects retention** - Information provided once should be remembered
3. **User wants comprehensive solutions** - Not just minimal implementations
4. **User appreciates proactive thinking** - Anticipate needs, don't wait to be asked
5. **User prefers documentation** - Write it down for future reference

## Specific Preferences Documented

### Deployment
- Manual upload to Cloudflare Pages (no Git)
- User controls what gets uploaded and when
- No automatic deployment

### System Environment
- Windows 11, Python 3.14.0
- No Node.js, No Git
- PowerShell with restricted execution policy
- Use `python -m pip` for packages

### Workflow
- Backup before changes
- Validate before deployment
- Test locally first
- Manual upload to production

### Communication
- Short, direct responses
- Action-oriented
- Minimal repetition
- Document everything

## How to Use This File

**Every time I interact with user:**
1. Read this file first
2. Check if question has been answered before
3. If yes, act on documented preference
4. If no, ask once and document answer
5. Never ask the same thing twice

**When user provides new information:**
1. Update this file immediately
2. Add to relevant steering rules
3. Create supporting documentation
4. Reference it in future interactions

## Red Flags (Things I Should Never Do)

- ❌ Ask "Do you want me to create a checklist?"
- ❌ Ask "Should I document this?"
- ❌ Ask "What format do you prefer?"
- ❌ Ask questions already answered in previous sessions
- ❌ Provide minimal solutions when comprehensive is expected

## Green Flags (Things I Should Always Do)

- ✅ Create comprehensive documentation proactively
- ✅ Document user preferences immediately
- ✅ Make decisions based on documented preferences
- ✅ Anticipate needs and address them
- ✅ Provide complete solutions with troubleshooting

---

**Last Updated:** November 26, 2025  
**Review:** Every session, update as needed
