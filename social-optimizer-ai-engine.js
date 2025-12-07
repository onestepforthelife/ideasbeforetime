// AI Optimization Engine - Real Gemini API Integration

const AIEngine = {
    // Gemini API Configuration
    apiKey: 'AIzaSyBi2TD5oDtTLKax9cj1ClxLtZYQRg0s9a8',
    apiUrl: 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent',
    
    // Generate profile using REAL Gemini AI
    async generate(userData) {
        try {
            // Build prompt for Gemini
            const prompt = this.buildPrompt(userData);
            
            // Call Gemini API
            const response = await fetch(`${this.apiUrl}?key=${this.apiKey}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    contents: [{
                        parts: [{
                            text: prompt
                        }]
                    }]
                })
            });
            
            if (!response.ok) {
                throw new Error(`API error: ${response.status}`);
            }
            
            const data = await response.json();
            const aiText = data.candidates[0].content.parts[0].text;
            
            // Parse AI response into structured format
            return this.parseAIResponse(aiText, userData);
            
        } catch (error) {
            console.error('Gemini API error:', error);
            // Fallback to templates if API fails
            return this.generateFromTemplate(userData);
        }
    },
    
    // Build prompt for Gemini
    buildPrompt(userData) {
        const platform = userData.platform || 'LinkedIn';
        const persona = userData.persona || 'professional';
        const tone = userData.tone || 'formal';
        const goal = userData.goal || 'hired';
        const bio = userData.currentBio || '';
        const headline = userData.currentHeadline || '';
        
        return `You are a professional ${platform} profile optimizer. Create an optimized profile for:

Platform: ${platform}
Current Bio: ${bio}
Current Headline: ${headline}
Persona: ${persona}
Tone: ${tone}
Goal: ${goal}

Generate:
1. HEADLINE: A compelling ${platform} headline (max 120 characters)
2. ABOUT: An engaging about section (200-300 words)
3. CONTENT_IDEAS: 5 specific content ideas for this profile
4. KEYWORDS: 5-7 relevant keywords for SEO
${platform === 'instagram' || platform === 'twitter' ? '5. HASHTAGS: 8-10 relevant hashtags' : ''}

Format your response EXACTLY like this:
HEADLINE:
[your headline here]

ABOUT:
[your about section here]

CONTENT_IDEAS:
1. [idea 1]
2. [idea 2]
3. [idea 3]
4. [idea 4]
5. [idea 5]

KEYWORDS:
[keyword1, keyword2, keyword3, etc]

${platform === 'instagram' || platform === 'twitter' ? 'HASHTAGS:\n#hashtag1 #hashtag2 #hashtag3 etc' : ''}`;
    },
    
    // Parse AI response into structured format
    parseAIResponse(aiText, userData) {
        const result = {
            headline: '',
            about: '',
            contentIdeas: [],
            keywords: [],
            hashtags: []
        };
        
        // Extract headline
        const headlineMatch = aiText.match(/HEADLINE:\s*\n(.+?)(?=\n\n|ABOUT:)/s);
        if (headlineMatch) {
            result.headline = headlineMatch[1].trim();
        }
        
        // Extract about
        const aboutMatch = aiText.match(/ABOUT:\s*\n(.+?)(?=\n\nCONTENT_IDEAS:|CONTENT IDEAS:)/s);
        if (aboutMatch) {
            result.about = aboutMatch[1].trim();
        }
        
        // Extract content ideas
        const ideasMatch = aiText.match(/CONTENT_IDEAS:|CONTENT IDEAS:\s*\n((?:\d+\..+?\n?)+)/s);
        if (ideasMatch) {
            result.contentIdeas = ideasMatch[1]
                .split('\n')
                .filter(line => line.trim())
                .map(line => line.replace(/^\d+\.\s*/, '').trim());
        }
        
        // Extract keywords
        const keywordsMatch = aiText.match(/KEYWORDS:\s*\n(.+?)(?=\n\n|HASHTAGS:|$)/s);
        if (keywordsMatch) {
            result.keywords = keywordsMatch[1]
                .split(',')
                .map(k => k.trim())
                .filter(k => k);
        }
        
        // Extract hashtags (if applicable)
        const hashtagsMatch = aiText.match(/HASHTAGS:\s*\n(.+?)$/s);
        if (hashtagsMatch) {
            result.hashtags = hashtagsMatch[1]
                .split(/\s+/)
                .filter(h => h.startsWith('#'));
        }
        
        return result;
    },
    
    // Fallback: Generate from templates if API fails
    generateFromTemplate(userData) {
        return this.templates_fallback(userData);
    },
    
    // Template library for fallback
    templates_fallback(userData) {
        const platform = userData.platform || 'linkedin';
        const keywords = userData.currentBio || 'Professional';
        
        return {
            headline: `${keywords.split(' ').slice(0, 3).join(' ')} | Driving Results`,
            about: `Experienced professional with expertise in ${keywords}.\n\nI specialize in delivering measurable outcomes through strategic planning and execution.`,
            contentIdeas: [
                'Share industry insights and analysis',
                'Post about professional achievements',
                'Write thought leadership articles',
                'Engage with industry leaders',
                'Share case studies and examples'
            ],
            keywords: ['Leadership', 'Strategy', 'Innovation', 'Professional Development'],
            hashtags: platform === 'instagram' || platform === 'twitter' ? 
                ['#Professional', '#Career', '#Success', '#Growth'] : []
        };
    },
    
    // Old template library (kept for reference)
    templates: {
        linkedin: {
            professional: {
                formal: {
                    headlineTemplate: (data) => `${data.role || 'Professional'} | ${data.keywords.split(',')[0].trim()} Expert | Driving ${data.goal === 'thought' ? 'Innovation' : 'Results'} Through Strategic Leadership`,
                    aboutTemplate: (data) => `As a seasoned ${data.role || 'professional'} with expertise in ${data.keywords}, I specialize in delivering measurable outcomes through strategic planning and execution.\n\nCore Competencies:\n• ${data.keywords.split(',').map(k => k.trim()).join('\n• ')}\n\nI am committed to ${data.goal === 'hired' ? 'contributing to organizational excellence' : 'driving industry innovation'} through data-driven decision-making and collaborative leadership.`,
                    contentIdeas: [
                        'Share industry insights and market analysis',
                        'Post about professional achievements and milestones',
                        'Write thought leadership articles on trends',
                        'Engage with industry leaders and comment thoughtfully',
                        'Share case studies demonstrating expertise'
                    ],
                    keywords: (data) => ['Leadership', 'Strategy', 'Innovation', 'Professional Development', ...data.keywords.split(',').map(k => k.trim())]
                },
                friendly: {
                    headlineTemplate: (data) => `${data.role || 'Professional'} helping teams succeed with ${data.keywords.split(',')[0].trim()} | Let's connect and grow together`,
                    aboutTemplate: (data) => `Hi! I'm passionate about ${data.keywords} and love helping teams achieve their goals.\n\nWhat I bring to the table:\n✨ ${data.keywords.split(',').map(k => k.trim()).join('\n✨ ')}\n\nI believe in building genuine connections and creating value through collaboration. ${data.goal === 'hired' ? "I'm always open to new opportunities" : "Let's connect and explore how we can work together"}!`,
                    contentIdeas: [
                        'Share personal career journey and lessons learned',
                        'Post tips and tricks from your experience',
                        'Celebrate team wins and acknowledge colleagues',
                        'Ask engaging questions to start conversations',
                        'Share behind-the-scenes of your work'
                    ],
                    keywords: (data) => ['Collaboration', 'Team Building', 'Growth', 'Networking', ...data.keywords.split(',').map(k => k.trim())]
                }
            },
            entrepreneur: {
                inspirational: {
                    headlineTemplate: (data) => `Founder & Visionary | Building the Future of ${data.keywords.split(',')[0].trim()} | Turning Ideas into Impact`,
                    aboutTemplate: (data) => `I founded my journey with a simple belief: ${data.keywords} can change the world.\n\nToday, I'm building solutions that:\n🚀 ${data.keywords.split(',').map(k => k.trim()).join('\n🚀 ')}\n\nMy mission is to ${data.goal === 'sales' ? 'create products that solve real problems' : 'inspire others to pursue their entrepreneurial dreams'}. Every challenge is an opportunity, and every setback is a lesson.\n\nLet's build something amazing together.`,
                    contentIdeas: [
                        'Share your startup journey and pivots',
                        'Post motivational content about entrepreneurship',
                        'Discuss failures and lessons learned',
                        'Showcase product updates and milestones',
                        'Interview other founders and share insights'
                    ],
                    keywords: (data) => ['Entrepreneurship', 'Innovation', 'Startup', 'Vision', 'Impact', ...data.keywords.split(',').map(k => k.trim())]
                }
            }
        },
        instagram: {
            influencer: {
                viral: {
                    bioTemplate: (data) => `✨ ${data.role || 'Creator'} | ${data.keywords.split(',')[0].trim()}\n🎯 ${data.goal === 'followers' ? 'Inspiring 100K+ followers' : 'Building a community'}\n💫 ${data.keywords.split(',').slice(1, 3).join(' • ')}\n👇 ${data.goal === 'sales' ? 'Shop my favorites' : 'Join the journey'}`,
                    contentIdeas: [
                        'Create Reels with trending audio',
                        'Post carousel posts with valuable tips',
                        'Share authentic behind-the-scenes content',
                        'Use Stories for daily engagement',
                        'Host Q&A sessions and polls',
                        'Collaborate with other creators',
                        'Create save-worthy infographics'
                    ],
                    hashtags: (data) => {
                        const base = ['#ContentCreator', '#InfluencerLife', '#CreateDaily', '#GrowYourBrand'];
                        const keywords = data.keywords.split(',').map(k => '#' + k.trim().replace(/\s+/g, ''));
                        return [...base, ...keywords, '#Viral', '#Trending', '#InstaGood'];
                    }
                },
                friendly: {
                    bioTemplate: (data) => `Hey! I'm [Name] 👋\n${data.keywords.split(',')[0].trim()} enthusiast\nSharing my journey with ${data.keywords.split(',')[1]?.trim() || 'you'}\n${data.goal === 'followers' ? '💌 DM for collabs' : '✨ Let\'s connect'}`,
                    contentIdeas: [
                        'Share day-in-the-life content',
                        'Post relatable memes and humor',
                        'Create "Get Ready With Me" content',
                        'Share personal stories and experiences',
                        'Post user-generated content',
                        'Create interactive content (polls, quizzes)',
                        'Share tips and recommendations'
                    ],
                    hashtags: (data) => {
                        const base = ['#DailyLife', '#Authentic', '#Community', '#RealTalk'];
                        const keywords = data.keywords.split(',').map(k => '#' + k.trim().replace(/\s+/g, ''));
                        return [...base, ...keywords, '#InstaDaily', '#LifeStyle'];
                    }
                }
            }
        },
        twitter: {
            professional: {
                analytical: {
                    bioTemplate: (data) => `${data.role || 'Analyst'} | ${data.keywords.split(',').slice(0, 3).join(' • ')} | Sharing data-driven insights ${data.goal === 'thought' ? '| Thread writer' : ''}`,
                    contentIdeas: [
                        'Write detailed Twitter threads on industry topics',
                        'Share data visualizations and charts',
                        'Live-tweet industry events and conferences',
                        'Quote-tweet with insightful commentary',
                        'Share breaking news with analysis',
                        'Post polls to gather audience insights',
                        'Create thread series on complex topics'
                    ],
                    hashtags: (data) => {
                        const keywords = data.keywords.split(',').map(k => '#' + k.trim().replace(/\s+/g, ''));
                        return [...keywords, '#Data', '#Analysis', '#Insights', '#Thread'];
                    }
                }
            },
            entrepreneur: {
                viral: {
                    bioTemplate: (data) => `Building ${data.keywords.split(',')[0].trim()} 🚀 | Founder | ${data.goal === 'sales' ? 'DM for partnerships' : 'Sharing the journey'} | ${data.keywords.split(',')[1]?.trim() || 'Innovation'}`,
                    contentIdeas: [
                        'Share hot takes and controversial opinions',
                        'Post quick wins and milestones',
                        'Create viral-worthy one-liners',
                        'Share memes related to your industry',
                        'Live-tweet your work process',
                        'Engage in trending conversations',
                        'Share screenshots of wins/metrics'
                    ],
                    hashtags: (data) => {
                        const keywords = data.keywords.split(',').map(k => '#' + k.trim().replace(/\s+/g, ''));
                        return [...keywords, '#Startup', '#Founder', '#BuildInPublic'];
                    }
                }
            }
        },
        facebook: {
            ngo: {
                inspirational: {
                    bioTemplate: (data) => `${data.role || 'Change Maker'} | ${data.keywords.split(',')[0].trim()}\nDedicated to ${data.goal === 'cause' ? 'making a difference' : 'creating positive change'}\n${data.keywords.split(',').slice(1).join(' • ')}`,
                    aboutTemplate: (data) => `Our mission is to create lasting impact through ${data.keywords}.\n\nWhat We Do:\n❤️ ${data.keywords.split(',').map(k => k.trim()).join('\n❤️ ')}\n\nJoin us in making a difference. Together, we can ${data.goal === 'cause' ? 'change lives and build a better future' : 'create meaningful change in our communities'}.\n\nGet involved today!`,
                    contentIdeas: [
                        'Share impact stories and testimonials',
                        'Post event updates and volunteer opportunities',
                        'Create fundraising campaigns',
                        'Share educational content about your cause',
                        'Post photo albums from events',
                        'Go Live to connect with supporters',
                        'Share partner and donor spotlights'
                    ],
                    hashtags: (data) => {
                        const keywords = data.keywords.split(',').map(k => '#' + k.trim().replace(/\s+/g, ''));
                        return [...keywords, '#NonProfit', '#MakeADifference', '#Community', '#Impact'];
                    }
                }
            }
        }
    },

    // Generate optimized profile based on inputs
    generate(userData) {
        const { platform, persona, tone, goal, currentBio, keywords } = userData;
        
        // Get appropriate template
        const platformTemplates = this.templates[platform] || this.templates.linkedin;
        const personaTemplates = platformTemplates[persona] || platformTemplates.professional;
        const toneTemplates = personaTemplates[tone] || personaTemplates.formal;

        // Extract role from current bio (simple extraction)
        const role = this.extractRole(currentBio);
        
        const data = {
            role,
            keywords: keywords || 'professional development, leadership',
            goal,
            currentBio
        };

        // Generate outputs
        const result = {
            headline: toneTemplates.headlineTemplate ? toneTemplates.headlineTemplate(data) : toneTemplates.bioTemplate(data),
            about: toneTemplates.aboutTemplate ? toneTemplates.aboutTemplate(data) : '',
            contentIdeas: toneTemplates.contentIdeas || [],
            keywords: toneTemplates.keywords ? toneTemplates.keywords(data) : [],
            hashtags: toneTemplates.hashtags ? toneTemplates.hashtags(data) : []
        };

        return result;
    },

    // Simple role extraction from bio
    extractRole(bio) {
        const roleKeywords = ['CEO', 'Founder', 'Manager', 'Director', 'Engineer', 'Designer', 'Developer', 'Consultant', 'Specialist', 'Leader'];
        for (let keyword of roleKeywords) {
            if (bio.toLowerCase().includes(keyword.toLowerCase())) {
                return keyword;
            }
        }
        return 'Professional';
    }
};

// Export for use in app
window.AIEngine = AIEngine;

