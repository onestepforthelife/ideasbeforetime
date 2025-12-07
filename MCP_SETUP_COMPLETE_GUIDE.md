# 🔧 MCP SERVER SETUP - Complete Guide
## Fetch Links & Read PDFs

**Created:** December 6, 2025  
**Purpose:** Enable AI to fetch web pages and read PDFs  
**Status:** NEEDS YOUR ACTION - I cannot install, you must do it

---

## 🚨 HONEST TRUTH

**I CANNOT:**
- ❌ Install MCP servers myself
- ❌ Browse internet in real-time
- ❌ Fetch web pages directly
- ❌ Read PDFs from URLs

**YOU NEED TO:**
- ✅ Install MCP servers in Kiro settings
- ✅ Configure them properly
- ✅ Restart Kiro
- ✅ Then I can use them

---

## 📋 STEP-BY-STEP INSTALLATION

### Step 1: Open Kiro MCP Settings

**Windows:**
1. Press `Ctrl+Shift+P` (Command Palette)
2. Type: "MCP"
3. Select: "Open MCP Settings"

**OR:**
1. Click Kiro icon (bottom left)
2. Click "Settings"
3. Click "MCP Servers"

---

### Step 2: Install Fetch MCP Server

**Add this to your MCP config:**

```json
{
  "mcpServers": {
    "fetch": {
      "command": "uvx",
      "args": ["mcp-server-fetch"],
      "env": {
        "FASTMCP_LOG_LEVEL": "ERROR"
      },
      "disabled": false,
      "autoApprove": ["fetch"]
    }
  }
}
```

**What this does:**
- Allows me to fetch web pages
- Can read HTML content from URLs
- Can check if links are valid

---

### Step 3: Install PDF MCP Server

**Add this to your MCP config:**

```json
{
  "mcpServers": {
    "fetch": {
      "command": "uvx",
      "args": ["mcp-server-fetch"],
      "env": {
        "FASTMCP_LOG_LEVEL": "ERROR"
      },
      "disabled": false,
      "autoApprove": ["fetch"]
    },
    "pdf": {
      "command": "uvx",
      "args": ["mcp-server-pdf"],
      "env": {
        "FASTMCP_LOG_LEVEL": "ERROR"
      },
      "disabled": false,
      "autoApprove": ["read_pdf"]
    }
  }
}
```

**What this does:**
- Allows me to read PDF files
- Can extract text from PDFs
- Can analyze PDF content

---

### Step 4: Install UV (Python Package Manager)

**If you don't have `uv` installed:**

**Windows (PowerShell):**
```powershell
powershell -c "irm https://astral.sh/uv/install.ps1 | iex"
```

**OR use pip:**
```bash
pip install uv
```

**Verify installation:**
```bash
uv --version
```

---

### Step 5: Restart Kiro

**IMPORTANT:** MCP servers only load on restart!

1. Close Kiro completely
2. Reopen Kiro
3. MCP servers will auto-install on first use

---

## 🧪 TESTING AFTER RESTART

### Test 1: Fetch Web Page

**Ask me:**
"Fetch this page: https://developer.mozilla.org/en-US/docs/Web/HTML"

**I should be able to:**
- Fetch the HTML content
- Show you the page structure
- Extract key information

---

### Test 2: Read PDF

**Ask me:**
"Read this PDF: [URL to PDF]"

**I should be able to:**
- Download the PDF
- Extract text content
- Summarize key points

---

### Test 3: Check Links

**Ask me:**
"Check if these links are valid: [list of URLs]"

**I should be able to:**
- Fetch each URL
- Report status (200 OK, 404 Not Found, etc.)
- Show which links work

---

## 📚 LINKS TO TEST (From Your Documentation)

### Priority 1 (Daily Use):
1. https://developers.cloudflare.com/
2. https://developers.cloudflare.com/pages/
3. https://developers.cloudflare.com/workers/
4. https://developers.cloudflare.com/cloudflare-one/
5. https://developers.cloudflare.com/workers/runtime-apis/cache/
6. https://web.dev/learn/
7. https://web.dev/articles/vitals
8. https://web.dev/learn/performance/
9. https://web.dev/learn/seo/
10. https://web.dev/learn/accessibility/

### Priority 2 (Weekly Use):
11. https://developer.mozilla.org/
12. https://caniuse.com/
13. https://owasp.org/

### Priority 3 (Monthly Use):
14. https://pagespeed.web.dev/
15. https://gtmetrix.com/
16. https://www.webpagetest.org/

### Priority 4 (As Needed):
17. https://iks.gov.in/
18. https://indiaai.gov.in/
19. https://bhashini.gov.in/
20. https://bis.gov.in/

---

## ✅ WHAT I'LL BE ABLE TO DO

### After MCP Installation:

**1. Fetch Latest Documentation**
```
You: "Fetch latest Cloudflare Workers docs"
Me: [Fetches page]
    [Extracts key information]
    [Summarizes for you]
```

**2. Validate Links**
```
You: "Check if all documentation links work"
Me: [Tests each URL]
    [Reports status]
    [Shows broken links]
```

**3. Read PDFs**
```
You: "Read this PDF: [URL]"
Me: [Downloads PDF]
    [Extracts text]
    [Summarizes content]
```

**4. Compare Documentation**
```
You: "Compare Cloudflare docs vs web.dev"
Me: [Fetches both]
    [Compares approaches]
    [Shows differences]
```

---

## 🚨 CURRENT LIMITATIONS

**Even with MCP servers, I CANNOT:**
- ❌ Browse like a human (click links, navigate)
- ❌ Execute JavaScript on pages
- ❌ Fill forms or login
- ❌ Access paywalled content
- ❌ Download large files (>10MB)
- ❌ Process images/videos

**I CAN:**
- ✅ Fetch HTML content
- ✅ Read text from PDFs
- ✅ Check link validity
- ✅ Extract structured data
- ✅ Summarize content

---

## 📝 AFTER INSTALLATION CHECKLIST

**Once you've installed and restarted:**

```
☐ Installed fetch MCP server
☐ Installed PDF MCP server
☐ Installed UV package manager
☐ Restarted Kiro
☐ Tested fetch with one URL
☐ Tested PDF reading
☐ Verified all 20 documentation links
☐ Confirmed I can access them
```

---

## 🎯 TESTING SCRIPT

**After restart, ask me to run this:**

```
Test 1: Fetch Cloudflare Docs
URL: https://developers.cloudflare.com/pages/
Expected: Should fetch and show page content

Test 2: Fetch web.dev
URL: https://web.dev/learn/
Expected: Should fetch and show learning paths

Test 3: Check MDN
URL: https://developer.mozilla.org/
Expected: Should fetch and show homepage

Test 4: Validate All Links
URLs: [All 20 documentation links]
Expected: Should report status for each

Test 5: Read PDF (if you have one)
URL: [Your PDF URL]
Expected: Should extract and show text
```

---

## 💡 WHAT THIS ENABLES

### Before (Without MCP):
- ❌ You copy-paste documentation
- ❌ I reference training data (may be outdated)
- ❌ Cannot verify links work
- ❌ Cannot read PDFs

### After (With MCP):
- ✅ I fetch latest documentation
- ✅ I verify links are valid
- ✅ I read PDFs directly
- ✅ I compare multiple sources
- ✅ I extract specific sections

---

## 🚀 NEXT STEPS

**Right now:**
1. Open Kiro MCP settings
2. Add fetch and PDF servers
3. Install UV if needed
4. Restart Kiro
5. Ask me to test

**Then I can:**
- Fetch all your documentation links
- Verify they work
- Extract key information
- Help you stay updated

---

## 📋 QUICK REFERENCE

**MCP Config Location:**
- Windows: `~/.kiro/settings/mcp.json`
- Or: Command Palette → "Open MCP Settings"

**UV Installation:**
```powershell
powershell -c "irm https://astral.sh/uv/install.ps1 | iex"
```

**Test Command:**
"Fetch https://developers.cloudflare.com/pages/"

---

**Created:** December 6, 2025  
**Status:** WAITING FOR YOUR ACTION  
**Priority:** HIGH - Enables real-time documentation access  
**Next:** You install, restart, then I test

**REMEMBER: I cannot install MCP servers. You must do it. Then I can use them!** 🔧
