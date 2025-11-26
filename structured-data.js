// Structured Data (Schema.org) for SEO
// Adds Person and Organization schemas

(function() {
    const baseUrl = 'https://ideas-before-time.pages.dev';
    
    // Person Schema (for about.html and cv-preview.html)
    const personSchema = {
        "@context": "https://schema.org",
        "@type": "Person",
        "name": "Amit Kumar Agrawal",
        "alternateName": "Amit Kumar",
        "url": baseUrl + "/about.html",
        "image": baseUrl + "/images/CV Image.png",
        "jobTitle": "Board-Ready Transformation Architect",
        "worksFor": {
            "@type": "Organization",
            "name": "BASF"
        },
        "alumniOf": [
            {
                "@type": "EducationalOrganization",
                "name": "IIT Kanpur"
            },
            {
                "@type": "EducationalOrganization",
                "name": "Delhi College of Engineering"
            }
        ],
        "knowsAbout": [
            "Specialty Chemicals",
            "Innovation Strategy",
            "Business Transformation",
            "P&L Management",
            "Digital Transformation",
            "ESG Governance"
        ],
        "sameAs": [
            "https://www.linkedin.com/in/leadershipexpertamit/",
            "https://medium.com/@360degrebusinesstransformation"
        ],
        "description": "Innovation futurist and specialty chemicals leader with 19+ years of P&L stewardship. Predicted 9 major innovations 4-15 years ahead of mainstream adoption."
    };
    
    // Organization Schema (for main pages)
    const organizationSchema = {
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": "Ideas Before Time",
        "alternateName": "Onestepforthelife",
        "url": baseUrl,
        "logo": baseUrl + "/images/library-hero.jpg",
        "description": "Innovation timeline and strategic market intelligence. Documenting innovations predicted years before mainstream adoption.",
        "founder": {
            "@type": "Person",
            "name": "Amit Kumar Agrawal"
        },
        "contactPoint": {
            "@type": "ContactPoint",
            "email": "onestepforthelife@gmail.com",
            "contactType": "General Inquiry"
        },
        "sameAs": [
            "https://www.linkedin.com/in/leadershipexpertamit/"
        ]
    };
    
    // WebSite Schema (for homepage)
    const websiteSchema = {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "name": "Ideas Before Time",
        "url": baseUrl,
        "description": "Innovation timeline documenting 9 innovations predicted 4-15 years ahead of their time",
        "author": {
            "@type": "Person",
            "name": "Amit Kumar Agrawal"
        },
        "potentialAction": {
            "@type": "SearchAction",
            "target": baseUrl + "/library.html?q={search_term_string}",
            "query-input": "required name=search_term_string"
        }
    };
    
    // Determine which schema to add based on current page
    function addStructuredData() {
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        let schema = null;
        
        if (currentPage === 'about.html' || currentPage === 'cv-preview.html') {
            schema = personSchema;
        } else if (currentPage === 'index.html' || currentPage === '') {
            schema = websiteSchema;
        } else if (currentPage === 'library.html') {
            schema = organizationSchema;
        }
        
        if (schema) {
            // Check if structured data already exists
            let existingScript = document.querySelector('script[type="application/ld+json"]');
            if (!existingScript) {
                const script = document.createElement('script');
                script.type = 'application/ld+json';
                script.textContent = JSON.stringify(schema);
                document.head.appendChild(script);
            }
        }
    }
    
    // Run on page load
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', addStructuredData);
    } else {
        addStructuredData();
    }
})();
