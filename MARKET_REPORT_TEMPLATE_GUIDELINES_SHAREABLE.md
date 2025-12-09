# 📊 MARKET REPORT TEMPLATE - COMPLETE GUIDELINES
## Professional Format for Chemical/Industrial Market Reports

**Version:** 1.0  
**Date:** December 6, 2025  
**Purpose:** Shareable guidelines for creating world-class market reports

---

## 📋 TABLE OF CONTENTS

1. [Report Structure (11 Sections)](#report-structure)
2. [Formatting Standards](#formatting-standards)
3. [HTML/CSS Code Examples](#html-css-examples)
4. [30/70 Blur Strategy](#blur-strategy)
5. [Production Checklist](#production-checklist)
6. [Quick Start Guide](#quick-start-guide)

---

## 📊 REPORT STRUCTURE

### Complete 11-Section Framework

**SECTION 1: EXECUTIVE SUMMARY** (300-500 words, Unblurred)
- Market overview (size, growth, CAGR)
- 3-5 critical insights
- Target audience
- Report highlights

**SECTION 2: MARKET OVERVIEW** (500-800 words, Partially Blurred)
- Market definition
- Market size & growth trends
- Segmentation (product, application, geography)
- Value chain analysis

**SECTION 3: COMPETITIVE LANDSCAPE** (800-1200 words, Fully Blurred)
- Market share analysis
- Company profiles (5-10 major players)
- Competitive strategies
- SWOT analysis

**SECTION 4: MARKET DRIVERS & RESTRAINTS** (600-1000 words, Fully Blurred)
- Growth drivers
- Market restraints
- Opportunities
- Challenges

**SECTION 5: REGIONAL ANALYSIS** (800-1200 words, Fully Blurred)
- North America, Europe, Asia-Pacific, Latin America, MEA
- Market size per region
- Key countries
- Regional dynamics

**SECTION 6: TECHNOLOGY & INNOVATION** (600-800 words, Fully Blurred)
- Current technologies
- Emerging technologies
- R&D trends
- Future outlook

**SECTION 7: SUSTAINABILITY & ESG** (500-700 words, Fully Blurred)
- Environmental impact
- Regulatory landscape
- Industry initiatives
- Social & governance

**SECTION 8: SUPPLY CHAIN ANALYSIS** (500-700 words, Fully Blurred)
- Raw materials
- Manufacturing
- Distribution
- Supply chain risks

**SECTION 9: PRICING ANALYSIS** (400-600 words, Fully Blurred)
- Historical pricing
- Price drivers
- Price forecast

**SECTION 10: STRATEGIC RECOMMENDATIONS** (600-800 words, Fully Blurred)
- For manufacturers
- For buyers/procurement
- For investors
- For new entrants

**SECTION 11: APPENDIX** (Variable, Fully Blurred)
- Methodology
- Data tables
- Glossary
- References

---

## 🎨 FORMATTING STANDARDS

### 1. TABLE FORMATS (5 Types)

#### Format A: Standard Data Table
```html
<table class="data-table">
  <thead>
    <tr>
      <th>Category</th>
      <th>2024</th>
      <th>2030F</th>
      <th>CAGR</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Segment A</td>
      <td>$X.X B</td>
      <td>$X.X B</td>
      <td>X.X%</td>
    </tr>
    <tr>
      <td>Segment B</td>
      <td>$X.X B</td>
      <td>$X.X B</td>
      <td>X.X%</td>
    </tr>
  </tbody>
</table>
```

#### Format B: Detailed Comparison Table
```html
<table>
  <tr>
    <th>Grade/Type</th>
    <th>Specifications</th>
    <th>Application</th>
    <th>Price Range</th>
    <th>Key Characteristics</th>
  </tr>
  <tr>
    <td>Type A</td>
    <td>Spec details</td>
    <td>Primary use</td>
    <td>$XX-XX/kg</td>
    <td>Key features, benefits, certifications</td>
  </tr>
</table>
```

#### Format C: Cost Structure Table
```html
<table>
  <tr>
    <th>Component</th>
    <th>Share (%)</th>
    <th>Cost Logic / Risk</th>
  </tr>
  <tr>
    <td>Raw materials</td>
    <td>45-65%</td>
    <td><strong>Dominant Risk:</strong> Price volatility. Hedging required.</td>
  </tr>
  <tr>
    <td>Utilities</td>
    <td>5-10%</td>
    <td>Sensitive to energy costs. Efficiency gains reduce this.</td>
  </tr>
</table>
```

#### Format D: Geographic Mapping
```html
<table>
  <tr>
    <th>Buyer Segment</th>
    <th>Annual Volume</th>
    <th>Procurement Mode</th>
    <th>Region Hotspots</th>
  </tr>
  <tr>
    <td>Pharma excipients</td>
    <td>50-500 tpa</td>
    <td>Direct + distributors</td>
    <td>US, EU, IN, SG</td>
  </tr>
</table>
```

#### Format E: Manufacturer/Capacity
```html
<table>
  <tr>
    <th>Maker</th>
    <th>Brand/Type</th>
    <th>Region</th>
    <th>Capacity (ktpa)</th>
    <th>Notes</th>
  </tr>
  <tr>
    <td>BASF</td>
    <td>Pluronic</td>
    <td>EU, US, CN</td>
    <td>100-150</td>
    <td>Largest integrated platform; broad portfolio</td>
  </tr>
</table>
```

---

### 2. TABLE CSS STYLING

```css
/* Professional Table Styling */
table {
    width: 100%;
    border-collapse: collapse;
    margin: 20px 0;
    background: white;
    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    border-radius: 8px;
    overflow: hidden;
}

th {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    padding: 15px;
    text-align: left;
    font-weight: 600;
    font-size: 14px;
}

td {
    padding: 12px 15px;
    border-bottom: 1px solid #e0e0e0;
    font-size: 14px;
    color: #333;
}

tr:hover {
    background: #f8f9fa;
}

tr:last-child td {
    border-bottom: none;
}

/* Responsive Design */
@media (max-width: 768px) {
    table {
        font-size: 12px;
    }
    th, td {
        padding: 8px 10px;
    }
}
```

---

### 3. HIGHLIGHT BOXES (4 Types)

#### Type A: Key Insight Box
```html
<div class="highlight-box">
    <h3>💡 KEY INSIGHT</h3>
    <p><strong>Finding:</strong> [Important finding that deserves highlighting]</p>
    <p><strong>Impact:</strong> [Business impact or significance]</p>
    <p><strong>Action:</strong> [What stakeholders should do]</p>
</div>
```

#### Type B: Formula/Calculation Box
```html
<div class="highlight-box">
    <h3>📐 Conversion Cost Formula</h3>
    <p><strong>Per-kg cost =</strong> (Labor + Utilities + Depreciation + Rent + Maintenance + SG&A + Taxes) ÷ Output (kg)</p>
    <p><strong>Example:</strong> $50,000 total costs ÷ 10,000 kg = $5/kg</p>
</div>
```

#### Type C: Geographic Logic Box
```html
<div class="highlight-box">
    <h3>🌍 Geographic Logic</h3>
    <p><strong>Sellers/Makers:</strong> Germany, US, UK, Japan (High regulatory, complex manufacturing)</p>
    <p><strong>Buyers/Consumption:</strong> India, SE Asia, EU, US, Korea, Japan</p>
    <p><strong>Logic:</strong> Global supply relies on advanced expertise of EU/US/JP, while high consumption in emerging markets.</p>
</div>
```

#### Type D: Action Plan Box
```html
<div class="highlight-box">
    <h3>🎯 Immediate Next Steps</h3>
    <p><strong>1. Data Plug-in:</strong> Share batch size, raw material prices, energy tariffs for cost analysis.</p>
    <p><strong>2. Supplier Mapping:</strong> Confirm target grades, shortlist suppliers, add regional distributors.</p>
    <p><strong>3. Pricing Validation:</strong> Request current quotes for bulk and specialty grades.</p>
</div>
```

#### Highlight Box CSS
```css
.highlight-box {
    background: linear-gradient(135deg, #fff5e6 0%, #ffe6cc 100%);
    border-left: 5px solid #ff9800;
    padding: 20px;
    margin: 25px 0;
    border-radius: 8px;
    box-shadow: 0 3px 10px rgba(0,0,0,0.1);
}

.highlight-box h3 {
    margin-top: 0;
    color: #e65100;
    font-size: 18px;
    font-weight: 600;
}

.highlight-box p {
    margin: 10px 0;
    line-height: 1.6;
    color: #333;
}

.highlight-box strong {
    color: #d84315;
}
```

---

### 4. COLOR CODING SYSTEM

```css
/* Color Palette */
:root {
    /* Primary Colors */
    --primary-gradient: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    --primary-color: #667eea;
    --secondary-color: #764ba2;
    
    /* Status Colors */
    --success-color: #28a745;  /* Growth/Positive */
    --danger-color: #dc3545;   /* Decline/Negative */
    --warning-color: #ffc107;  /* Caution/Warning */
    --info-color: #007bff;     /* Neutral/Info */
    
    /* Background Colors */
    --bg-light: #f8f9fa;
    --bg-white: #ffffff;
    
    /* Text Colors */
    --text-dark: #2c3e50;
    --text-medium: #555;
    --text-light: #777;
}
```

#### Usage Examples
```html
<!-- Positive Growth -->
<span style="color: #28a745; font-weight: bold;">↑ +15.3% CAGR</span>

<!-- Negative Trend -->
<span style="color: #dc3545; font-weight: bold;">↓ -8.2% decline</span>

<!-- Warning/Caution -->
<span style="color: #ffc107; font-weight: bold;">⚠️ High volatility</span>

<!-- Neutral Info -->
<span style="color: #007bff; font-weight: bold;">ℹ️ Stable market</span>
```

---

### 5. TYPOGRAPHY STANDARDS

```css
/* Heading Hierarchy */
h1 { font-size: 32px; font-weight: bold; color: #2c3e50; }
h2 { font-size: 24px; font-weight: bold; color: #34495e; margin-top: 30px; }
h3 { font-size: 20px; font-weight: 600; color: #555; margin-top: 20px; }
h4 { font-size: 18px; font-weight: 600; color: #666; }

/* Body Text */
p {
    font-size: 16px;
    line-height: 1.6;
    color: #333;
    margin: 15px 0;
}

/* Lists */
ul, ol {
    font-size: 15px;
    line-height: 1.5;
    margin: 15px 0;
    padding-left: 30px;
}

li {
    margin: 8px 0;
}

/* Emphasis */
strong { font-weight: 600; color: #2c3e50; }
em { font-style: italic; color: #555; }
```

---

## 🔒 30/70 BLUR STRATEGY

### Implementation

**Preview Section (30% - Unblurred):**
- Executive Summary (complete)
- Market Overview (first half)
- Key statistics table
- Top 3 insights

**Blurred Section (70% - Requires Access):**
- Market Overview (second half)
- All detailed analysis sections
- Strategic recommendations
- Appendix

### HTML Structure
```html
<!-- Preview Section (Visible) -->
<div class="report-preview">
    <section id="executive-summary">
        [Executive Summary content]
    </section>
    
    <section id="market-overview-preview">
        [First 30% of Market Overview]
    </section>
</div>

<!-- Blur Transition -->
<div class="blur-transition">
    <div class="blurred-content">
        [Remaining 70% of content]
    </div>
    
    <div class="access-cta">
        <button onclick="requestAccess()" class="cta-button">
            🔓 Request Full Report Access - Free
        </button>
        <p>Get complete analysis, data tables, and strategic recommendations</p>
    </div>
</div>
```

### Blur CSS
```css
.blurred-content {
    filter: blur(8px);
    pointer-events: none;
    user-select: none;
    position: relative;
}

.blur-transition {
    position: relative;
    background: linear-gradient(to bottom, 
        rgba(255,255,255,0) 0%, 
        rgba(255,255,255,0.95) 30%, 
        rgba(255,255,255,1) 60%);
}

.access-cta {
    position: sticky;
    bottom: 20px;
    text-align: center;
    z-index: 100;
    padding: 30px;
    background: white;
    border-radius: 10px;
    box-shadow: 0 4px 20px rgba(0,0,0,0.1);
}

.cta-button {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    padding: 15px 40px;
    font-size: 18px;
    font-weight: 600;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    transition: transform 0.2s;
}

.cta-button:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(102, 126, 234, 0.4);
}
```

---

## 📧 EMAIL COLLECTION SYSTEM

### Request Access Form
```html
<div id="access-form" style="display:none;">
    <h3>Request Full Report Access</h3>
    <form onsubmit="submitAccessRequest(event)">
        <input type="text" name="name" placeholder="Full Name" required>
        <input type="email" name="email" placeholder="Email Address" required>
        <input type="text" name="company" placeholder="Company Name (Optional)">
        <select name="use_case">
            <option value="">Intended Use</option>
            <option value="research">Research</option>
            <option value="procurement">Procurement</option>
            <option value="investment">Investment</option>
            <option value="academic">Academic</option>
            <option value="other">Other</option>
        </select>
        <button type="submit">Get Free Access</button>
    </form>
</div>
```

### Auto-Email Template (To User)
```
Subject: Your Market Report Access - [Report Name]

Dear [Name],

Thank you for requesting access to our [Report Name].

Your full report is attached to this email.

REPORT HIGHLIGHTS:
• [Key insight 1]
• [Key insight 2]
• [Key insight 3]

If you have questions or need custom analysis, reply to this email.

Best regards,
Ideas Before Time Research Team
onestepforthelife@gmail.com
```

---

## ✅ PRODUCTION CHECKLIST

### Before Writing
```
☐ Define report scope and type
☐ Identify target audience
☐ Gather data sources (minimum 10)
☐ Create outline from template
☐ Set word count targets per section
☐ Determine blur point (30% mark)
```

### During Writing
```
☐ Follow section structure exactly
☐ Maintain consistent terminology
☐ Cite all data sources
☐ Create tables for all numerical data
☐ Add callout boxes for key insights
☐ Check word count per section
☐ Verify all numbers add up
```

### After Writing
```
☐ Proofread for grammar/spelling
☐ Verify all data accuracy
☐ Check table formatting
☐ Test blur system
☐ Verify email form works
☐ Add SEO metadata
☐ Generate PDF version
☐ Test on mobile
☐ Final review checklist
```

### Quality Assurance
```
☐ All 11 sections present
☐ Word count: 5,000-8,000 total
☐ No broken links
☐ All tables formatted consistently
☐ Citations complete
☐ Blur at 30% mark
☐ CTA button works
☐ Email form functional
☐ Mobile responsive
☐ SEO optimized
```

---

## 🚀 QUICK START GUIDE

### Step 1: Define Scope (30 minutes)
- Product/market to analyze
- Geographic coverage
- Time period (historical + forecast)
- Target audience
- Report type (standard, competitive, technical, regional)

### Step 2: Gather Data (2-3 days)
- Collect 10+ data sources
- Download company reports
- Extract trade statistics
- Review patent databases
- Compile in spreadsheet

### Step 3: Create Outline (1 hour)
- Copy template structure
- Customize sections for your market
- Set word count targets
- Identify blur point (30%)

### Step 4: Write Content (3-5 days)
- Section 1: Executive Summary (hook readers)
- Section 2: Market Overview (context)
- Section 3: Competitive Landscape (players)
- Section 4: Drivers & Restraints (dynamics)
- Section 5: Regional Analysis (geography)
- Section 6: Technology (innovation)
- Section 7: Sustainability (ESG)
- Section 8: Supply Chain (flow)
- Section 9: Pricing (economics)
- Section 10: Recommendations (action)
- Section 11: Appendix (support)

### Step 5: Format & Polish (1 day)
- Add tables for all data
- Create callout boxes for insights
- Format headings consistently
- Add blur system (30/70 split)
- Insert CTA button
- Add email form
- Proofread thoroughly

### Step 6: Implement & Test (2 hours)
- Create HTML file
- Apply CSS styling
- Test blur effect
- Test email form
- Check mobile view
- Verify SEO metadata
- Test on live site

**Total Time: 1-2 weeks per report**

---

## 📊 REPORT TYPE VARIATIONS

### Type 1: Market Overview Report (Standard)
- **Use for:** Broad market analysis
- **Length:** 5,000-8,000 words
- **Sections:** All 11 sections
- **Example:** Acrylic Emulsions, Poloxamer

### Type 2: Competitive Analysis Report
- **Use for:** Company comparisons
- **Length:** 3,000-5,000 words
- **Focus:** Sections 3, 4, 10 (expanded)
- **Example:** BASF vs LyondellBasell

### Type 3: Technical/ESG Report
- **Use for:** Specialized analysis
- **Length:** 4,000-6,000 words
- **Focus:** Sections 6, 7, 8 (expanded)
- **Example:** Nickel ESG, Nickel Compounds

### Type 4: Regional Deep-Dive
- **Use for:** Geographic focus
- **Length:** 3,000-5,000 words
- **Focus:** Section 5 (expanded), plus 1, 2, 10
- **Example:** Asia-Pacific Specialty Chemicals

### Type 5: Application-Specific Report
- **Use for:** End-use analysis
- **Length:** 4,000-6,000 words
- **Focus:** Sections 2, 4, 9 (expanded)
- **Example:** Paper Pulp Specialty Chemicals

---

## 💡 BEST PRACTICES

### Content Best Practices
1. **Lead with Value** - Executive summary must hook readers
2. **Data-Driven** - Every claim backed by numbers
3. **Actionable** - Strategic recommendations, not just analysis
4. **Balanced** - Show opportunities AND challenges
5. **Current** - Use latest data (2024 actual, 2025-2030 forecast)

---

## 🚨 CRITICAL: DATA vs GENERIC COMMENTARY

### ❌ WHAT AI OFTEN DOES WRONG (7-Page Generic Commentary)

**Problem:** AI generates 7 pages of generic strategy/dialogue without actual data:
- "The market is growing due to increasing demand..."
- "Companies should focus on innovation..."
- "Sustainability is becoming important..."
- "Regional dynamics are shifting..."

**This is USELESS! No nouns, no numbers, no specifics!**

---

### ✅ WHAT PROFESSIONAL REPORTS MUST HAVE

**RULE: Strategy/Dialogue = English sentences ONLY for section introductions**

**Everything else = NOUNS + DATA + ADJECTIVES + LOGIC**

#### Example - WRONG (Generic Commentary):
```
❌ "The acrylic emulsions market is experiencing significant growth 
driven by increasing demand from various end-use industries. 
Companies are focusing on innovation and sustainability to gain 
competitive advantage. Regional dynamics are evolving with emerging 
markets showing strong potential."
```
**Problem:** 3 sentences, ZERO data, ZERO specifics, ZERO value!

---

#### Example - RIGHT (Data-Driven):
```
✅ MARKET SIZE & GROWTH
• Global market: $8.2B (2024) → $12.8B (2030)
• CAGR: 7.8% (2024-2030)
• Asia-Pacific: 45% share, fastest growth at 9.2% CAGR
• Top 5 players: 62% market share (BASF 18%, Dow 15%, Arkema 12%, etc.)

✅ PRICE DYNAMICS
• Standard grade: $2,800-3,200/MT (2024)
• Specialty grade: $4,500-6,000/MT (2024)
• Raw material impact: Acrylic acid (40% of cost), volatile ±15-20%
• Regional premium: EU/US +25% vs Asia due to quality/compliance

✅ APPLICATION BREAKDOWN
• Paints & Coatings: 55% ($4.5B), growing 6.8% CAGR
• Adhesives: 25% ($2.0B), growing 8.5% CAGR
• Textiles: 12% ($1.0B), growing 7.2% CAGR
• Paper: 8% ($0.7B), stable growth 5.5% CAGR
```

**See the difference?**
- ✅ Every sentence has NUMBERS
- ✅ Every claim has DATA
- ✅ Every statement has LOGIC
- ✅ NOUNS (market, price, application) + ADJECTIVES (volatile, premium, stable) + DATA ($X.XB, X.X%)

---

### 📊 DATA DENSITY REQUIREMENTS

**Per Section Minimum:**

| Section | Min Data Points | Min Tables | Min Numbers |
|---------|----------------|------------|-------------|
| Executive Summary | 10 | 1 | 20+ |
| Market Overview | 20 | 2-3 | 50+ |
| Competitive Landscape | 15 | 2 | 40+ |
| Drivers & Restraints | 10 | 1 | 30+ |
| Regional Analysis | 25 | 3-4 | 60+ |
| Technology | 8 | 1 | 20+ |
| Sustainability | 10 | 1-2 | 25+ |
| Supply Chain | 12 | 2 | 35+ |
| Pricing | 15 | 2-3 | 40+ |
| Recommendations | 8 | 1 | 20+ |

**Total Report: 130+ data points, 18-22 tables, 340+ numbers**

---

### 🎯 WRITING FORMULA

**For EVERY paragraph:**

```
1. Topic sentence (English dialogue - 1 sentence)
2. Data point 1 (noun + number + logic)
3. Data point 2 (noun + number + logic)
4. Data point 3 (noun + number + logic)
5. Conclusion/implication (noun + adjective + logic)
```

**Example:**

```
✅ Raw material costs dominate acrylic emulsion production economics. 
[Topic - English]

Acrylic acid accounts for 40-45% of total production cost at 
$1,800-2,000/MT (2024). [Data point 1 - noun + number + logic]

Butyl acrylate contributes 15-20% at $1,600-1,800/MT, while 
styrene adds 10-12% at $1,200-1,400/MT. [Data point 2 - noun + number]

Combined raw materials represent 65-75% of cash cost, making 
producers highly sensitive to petrochemical price volatility 
(±15-20% annual swings). [Data point 3 - noun + number + logic]

This cost structure drives vertical integration strategies among 
top-tier manufacturers (BASF, Dow) who control upstream acrylic 
acid capacity. [Conclusion - noun + adjective + logic]
```

**Result:** 1 topic sentence + 4 data-rich sentences = Professional content!

---

### 🚫 BANNED PHRASES (Generic Fluff)

**NEVER use these without immediate data:**

❌ "The market is growing..."
❌ "Companies are focusing on..."
❌ "Increasing demand from..."
❌ "Sustainability is becoming important..."
❌ "Regional dynamics are evolving..."
❌ "Innovation is key to..."
❌ "Competitive landscape is changing..."
❌ "Future outlook is positive..."

**Instead, ALWAYS follow with:**
✅ Specific number/percentage
✅ Company name + action + data
✅ Application + volume/value + growth rate
✅ Regulation + compliance cost + timeline
✅ Region + market size + CAGR
✅ Technology + adoption rate + investment
✅ Player + market share + strategy
✅ Forecast period + CAGR + drivers

---

### 📐 QUALITY CHECK FORMULA

**Before submitting ANY section:**

```
Word count ÷ Number of data points = Data Density Score

Target: <50 words per data point

Example:
• 500 words ÷ 15 data points = 33 words/data point ✅ GOOD
• 500 words ÷ 5 data points = 100 words/data point ❌ TOO GENERIC
```

**If score >50:** Section has too much commentary, not enough data!

---

### 🎯 SECTION-BY-SECTION DATA REQUIREMENTS

#### Executive Summary (300-500 words)
**Must include:**
- Market size (current + forecast) with $ values
- CAGR with % and time period
- Top 3 segments with % share
- Top 3 regions with % share
- Top 3 players with % share
- 3-5 key trends with quantified impact
- Price range for main products

#### Market Overview (500-800 words)
**Must include:**
- Historical data (3-5 years) with $ values
- Forecast data (5-7 years) with $ values
- Segmentation breakdown (product, application, region) with %
- Value chain with cost breakdown %
- Market concentration (HHI or CR5) with numbers

#### Competitive Landscape (800-1200 words)
**Must include:**
- Top 10 players with market share %
- Revenue figures for top 5 players
- Capacity data (ktpa) for manufacturers
- Geographic presence (countries/regions)
- Product portfolio (number of grades/types)
- Recent investments ($ value + timeline)
- M&A activity (deal value + date)

#### Regional Analysis (800-1200 words)
**Must include:**
- Market size per region ($ value)
- Growth rate per region (CAGR %)
- Top 3 countries per region with data
- Import/export volumes (MT or $ value)
- Price differentials between regions ($)
- Regulatory differences (compliance cost $)

---

### ✅ FINAL DATA CHECKLIST

**Before calling report "complete":**

```
☐ Every paragraph has 3+ data points
☐ Every claim backed by number/percentage
☐ Every table has source citation
☐ Every forecast has methodology note
☐ Every price has currency + unit + timeframe
☐ Every company has specific data (not just name)
☐ Every region has market size + growth rate
☐ Every product has specifications + price range
☐ Data density score <50 words per data point
☐ Total data points >130 across all sections
☐ Total tables >18 across all sections
☐ Total numbers >340 across all sections
☐ Zero generic commentary without data
☐ Strategy/dialogue limited to topic sentences only
```

**If ANY ☐ = NO → Report is NOT complete!**

---

### 💡 REMEMBER

**Professional Market Report =**
- 10% Strategy/Dialogue (English sentences for context)
- 90% Data/Facts (Nouns + Numbers + Adjectives + Logic)

**NOT:**
- 70% Generic commentary (AI fluff)
- 30% Data (insufficient)

**This is the difference between:**
- ❌ 7-page generic AI report (worthless)
- ✅ Professional market intelligence (valuable)

### Writing Best Practices
1. **Clear & Concise** - Short sentences, active voice
2. **Professional Tone** - Objective, third-person
3. **Consistent Terms** - Same terminology throughout
4. **Defined Jargon** - Explain technical terms
5. **Cited Sources** - Reference all data

### Design Best Practices
1. **Visual Hierarchy** - Clear heading structure
2. **Data Tables** - All numbers in tables
3. **Callout Boxes** - Highlight key insights
4. **White Space** - Don't cram content
5. **Mobile-First** - Responsive design

### Monetization Best Practices
1. **30% Preview** - Show enough value to want more
2. **Clear CTA** - Obvious "Request Access" button
3. **Simple Form** - Minimal fields (name, email)
4. **Fast Delivery** - Auto-send report immediately
5. **Follow-Up** - Nurture leads for custom research

---

## 📈 SUCCESS METRICS

### Content Quality
- Data from 10+ sources ✅
- All numbers verified ✅
- 5,000-8,000 words ✅
- Professional writing ✅
- Zero errors ✅

### User Experience
- 30% preview visible ✅
- Blur effect smooth ✅
- CTA button prominent ✅
- Email form works ✅
- Mobile responsive ✅

### Business Impact
- Email capture rate: >10%
- Time on page: >3 minutes
- Bounce rate: <40%
- Custom research inquiries: >5%
- Repeat visitors: >20%

---

## 📝 FINAL CHECKLIST

**Before Publishing ANY Report:**
```
☐ All 11 sections complete (or appropriate subset)
☐ Word count: 5,000-8,000
☐ Data from 10+ sources
☐ All numbers verified
☐ Tables formatted consistently
☐ Blur at 30% mark
☐ CTA button works
☐ Email form tested
☐ Mobile responsive
☐ SEO metadata added
☐ Proofread 2x
☐ Tested on live site
☐ PDF version created
☐ Ready to publish ✅
```

---

## 🎯 SUMMARY

**This Template Provides:**
- ✅ 11 comprehensive sections
- ✅ 5 table formats (copy-paste ready)
- ✅ 4 highlight box types
- ✅ Complete CSS styling
- ✅ 30/70 blur strategy
- ✅ Email collection system
- ✅ Production workflow
- ✅ Quality checklist

**Use This For:**
- Chemical industry reports
- B2B market analysis
- Competitive intelligence
- Technical/ESG reports
- Regional deep-dives

**Result:**
- Consistent quality
- Professional presentation
- Effective lead generation
- Scalable production
- World-class market intelligence

---

**Created:** December 6, 2025  
**Version:** 1.0  
**Status:** Production-Ready  
**Based On:** 7+ successful market reports

**Ready to share with your team! 📊**
