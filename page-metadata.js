// Page Metadata for SEO
// Defines meta tags for each page

const pageMetadata = {
    'index.html': {
        title: 'Ideas Before Time - Innovation Timeline & Strategic Intelligence',
        description: 'Explore 9 innovations predicted 4-15 years ahead of their time. Professional market research and strategic business intelligence by Amit Kumar.',
        keywords: 'innovation, technology prediction, market research, business intelligence, specialty chemicals',
        ogImage: 'images/library-hero.jpg',
        type: 'website'
    },
    'library.html': {
        title: 'Innovation Library - Ideas Before Time',
        description: '9 groundbreaking innovations predicted years before mainstream adoption: Silent DJ (2001), Digital Money (2012), Universal Health ID (2009), and more.',
        keywords: 'innovation timeline, technology foresight, silent disco, digital money, dual sim, health id',
        ogImage: 'images/library-hero.jpg',
        type: 'website'
    },
    'about.html': {
        title: 'About Amit Kumar - Innovation Futurist & Specialty Chemicals Leader',
        description: 'Amit Kumar: 19+ years P&L stewardship, 25%+ CAGR, pattern recognition expert. Predicted 9 major innovations 4-15 years ahead of mainstream adoption.',
        keywords: 'amit kumar, innovation expert, specialty chemicals, basf, pattern recognition, technology prediction',
        ogImage: 'images/panel-4-transformation-leader.jpg',
        type: 'profile'
    },
    'cv-preview.html': {
        title: 'CV Preview - Amit Kumar | Board-Ready Transformation Architect',
        description: 'Board-Ready Transformation Architect with 19+ years across BASF, DSM, 3M. P&L Stewardship, Digital Transformation, ESG & Governance expertise.',
        keywords: 'amit kumar cv, board director, transformation architect, basf, specialty chemicals, p&l management',
        ogImage: 'images/CV Image.png',
        type: 'profile'
    },
    'silent-dj-2001.html': {
        title: 'Silent DJ (2001) - Wireless Headphone Party Concept',
        description: 'Predicted silent disco trend 4-9 years ahead. Wireless headphone party concept for campus events, now mainstream globally.',
        keywords: 'silent dj, silent disco, wireless headphones, innovation 2001, party concept',
        ogImage: 'images/silent-dj-2001.jpg',
        type: 'article',
        author: 'Amit Kumar',
        published: '2001-01-01'
    },
    'tv-storage-2002.html': {
        title: 'TV Program Storage (2002) - DVR & Streaming Revolution',
        description: 'Digital video recording and time-shifted viewing predicted in 2002. Foresaw the DVR and streaming revolution.',
        keywords: 'dvr, streaming, tv storage, digital video recording, innovation 2002',
        ogImage: 'images/tv-storage-2002.jpg',
        type: 'article',
        author: 'Amit Kumar',
        published: '2002-01-01'
    },
    'music-ringtones-2003.html': {
        title: 'Music Ringtones (2003) - Phone Personalization Innovation',
        description: 'Personalized phone identity through music. Parallel to Nokia\'s polyphonic ringtone launch in 2003.',
        keywords: 'music ringtones, phone personalization, nokia, polyphonic, innovation 2003',
        ogImage: 'images/music-ringtones-2003.jpg',
        type: 'article',
        author: 'Amit Kumar',
        published: '2003-01-01'
    },
    'dual-sim-2003.html': {
        title: 'Dual SIM (2003) - Work-Life Balance Innovation',
        description: 'One phone, two numbers concept proposed in 2003. Now standard in billions of smartphones worldwide.',
        keywords: 'dual sim, work life balance, mobile innovation, smartphone, innovation 2003',
        ogImage: 'images/dual-sim-2003.jpg',
        type: 'article',
        author: 'Amit Kumar',
        published: '2003-01-01'
    },
    'universal-health-id-2009.html': {
        title: 'Universal Health ID (2009) - Digital Health Records System',
        description: 'Digital health records system conceptualized in 2009, same year as US HITECH Act. Now reality with India\'s ABHA (500M+ IDs).',
        keywords: 'universal health id, digital health records, abha, health technology, innovation 2009',
        ogImage: 'images/universal-health-id-2009.jpg',
        type: 'article',
        author: 'Amit Kumar',
        published: '2009-01-01'
    },
    '3d-imaging-2009.html': {
        title: '3D/4D Virtual Imaging (2009) - VR/AR Prediction',
        description: 'Immersive visualization tools for training, design, and entertainment. Now mainstream as VR/AR technology.',
        keywords: '3d imaging, virtual reality, augmented reality, vr ar, innovation 2009',
        ogImage: 'images/3d-imaging-2009.jpg',
        type: 'article',
        author: 'Amit Kumar',
        published: '2009-01-01'
    },
    'digital-money-2012.html': {
        title: 'Digital Money Vision (2012-2013) - Cashless Economy Foresight',
        description: 'Cashless economy foresight parallel to Bitcoin emergence. Now reality with UPI (100B+ transactions/year in India).',
        keywords: 'digital money, cashless economy, upi, bitcoin, fintech, innovation 2012',
        ogImage: 'images/digital-money-2012.jpg',
        type: 'article',
        author: 'Amit Kumar',
        published: '2012-01-01'
    },
    'moveable-dividers-2012.html': {
        title: 'Moveable Road Dividers (2012) - Dynamic Traffic Management',
        description: 'Dynamic traffic management for rush hour optimization. Implemented globally as "zipper lanes".',
        keywords: 'moveable dividers, traffic management, zipper lanes, smart city, innovation 2012',
        ogImage: 'images/moveable-dividers-2012.jpg',
        type: 'article',
        author: 'Amit Kumar',
        published: '2012-01-01'
    },
    'dashboard-simplification-2017.html': {
        title: 'Dashboard Simplification (2017) - Data Visualization Revolution',
        description: 'Advocated for unified, real-time business dashboards. Data visualization and decision-making revolution.',
        keywords: 'dashboard simplification, data visualization, business intelligence, analytics, innovation 2017',
        ogImage: 'images/dashboard-simplification-2017.jpg',
        type: 'article',
        author: 'Amit Kumar',
        published: '2017-01-01'
    },
    'specialty-chemicals-index.html': {
        title: 'B2B Specialty Chemicals - Indexed Market Report',
        description: 'Comprehensive indexed reference covering Surfactants, Acrylic Polymers, and Silicone Products. Global, Asia-Pacific & India market analysis.',
        keywords: 'specialty chemicals, surfactants, acrylic polymers, silicone, market research, b2b',
        ogImage: 'images/library-hero.jpg',
        type: 'article',
        author: 'Amit Kumar'
    },
    'specialty-chemicals-qa.html': {
        title: 'Specialty Chemicals Market Q&A - Executive Briefing',
        description: 'Executive briefing covering Surfactants (Ethoxylates), Acrylic Polymers, and Silicone Products with strategic insights.',
        keywords: 'specialty chemicals qa, market analysis, surfactants, acrylic, silicone, executive briefing',
        ogImage: 'images/library-hero.jpg',
        type: 'article',
        author: 'Amit Kumar'
    },
    'specialty-chemicals-value-chain.html': {
        title: 'Specialty Chemicals Value Chain - Raw Materials to Finished Goods',
        description: 'Complete supply chain flow from Raw Materials to Finished Goods. Detailed analysis of monomers, intermediates, and margin dynamics.',
        keywords: 'value chain, supply chain, specialty chemicals, raw materials, manufacturing',
        ogImage: 'images/library-hero.jpg',
        type: 'article',
        author: 'Amit Kumar'
    },
    'business-insights.html': {
        title: 'Business Insights Hub - Market Intelligence & Trends',
        description: 'Live market intelligence, industry trends, and strategic analysis. Real-time updates on chemical markets, pricing, and competitive dynamics.',
        keywords: 'business insights, market intelligence, industry trends, strategic analysis',
        ogImage: 'images/library-hero.jpg',
        type: 'website'
    },
    'timeline.html': {
        title: 'Innovation Timeline - Ideas Before Time',
        description: 'Visual timeline of 9 innovations predicted 4-15 years ahead: from Silent DJ (2001) to Dashboard Simplification (2017).',
        keywords: 'innovation timeline, technology prediction, innovation history',
        ogImage: 'images/library-hero.jpg',
        type: 'website'
    }
};

// Get current page filename
function getCurrentPage() {
    const path = window.location.pathname;
    const page = path.split('/').pop() || 'index.html';
    return page;
}

// Inject meta tags dynamically
function injectMetaTags() {
    const currentPage = getCurrentPage();
    const metadata = pageMetadata[currentPage];
    
    if (!metadata) return; // No metadata defined for this page
    
    const baseUrl = 'https://ideas-before-time.pages.dev';
    const currentUrl = baseUrl + '/' + currentPage;
    
    // Update title
    document.title = metadata.title;
    
    // Create meta tags
    const metaTags = [
        // Primary Meta Tags
        { name: 'title', content: metadata.title },
        { name: 'description', content: metadata.description },
        { name: 'keywords', content: metadata.keywords },
        { name: 'author', content: metadata.author || 'Amit Kumar Agrawal' },
        
        // Open Graph / Facebook
        { property: 'og:type', content: metadata.type },
        { property: 'og:url', content: currentUrl },
        { property: 'og:title', content: metadata.title },
        { property: 'og:description', content: metadata.description },
        { property: 'og:image', content: baseUrl + '/' + metadata.ogImage },
        { property: 'og:site_name', content: 'Ideas Before Time' },
        
        // Twitter
        { property: 'twitter:card', content: 'summary_large_image' },
        { property: 'twitter:url', content: currentUrl },
        { property: 'twitter:title', content: metadata.title },
        { property: 'twitter:description', content: metadata.description },
        { property: 'twitter:image', content: baseUrl + '/' + metadata.ogImage }
    ];
    
    // Add canonical link
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
        canonical = document.createElement('link');
        canonical.rel = 'canonical';
        document.head.appendChild(canonical);
    }
    canonical.href = currentUrl;
    
    // Inject meta tags
    metaTags.forEach(tag => {
        let meta = document.querySelector(`meta[${tag.name ? 'name' : 'property'}="${tag.name || tag.property}"]`);
        if (!meta) {
            meta = document.createElement('meta');
            if (tag.name) meta.name = tag.name;
            if (tag.property) meta.setAttribute('property', tag.property);
            document.head.appendChild(meta);
        }
        meta.content = tag.content;
    });
    
    // Add structured data for articles
    if (metadata.type === 'article' && metadata.published) {
        const structuredData = {
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": metadata.title,
            "description": metadata.description,
            "image": baseUrl + '/' + metadata.ogImage,
            "author": {
                "@type": "Person",
                "name": metadata.author || "Amit Kumar Agrawal",
                "url": baseUrl + "/about.html"
            },
            "publisher": {
                "@type": "Person",
                "name": "Amit Kumar Agrawal"
            },
            "datePublished": metadata.published,
            "mainEntityOfPage": {
                "@type": "WebPage",
                "@id": currentUrl
            }
        };
        
        let script = document.querySelector('script[type="application/ld+json"]');
        if (!script) {
            script = document.createElement('script');
            script.type = 'application/ld+json';
            document.head.appendChild(script);
        }
        script.textContent = JSON.stringify(structuredData);
    }
}

// Run on page load
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', injectMetaTags);
} else {
    injectMetaTags();
}
