// Story prompts for Ghar Ghar Game
const storyPrompts = {
    beginner: [
        {
            title: "The Hungry Customer",
            titleHindi: "भूखा ग्राहक",
            roles: ['shopkeeper', 'student'],
            prompt: "A student is very hungry and visits the shopkeeper's food shop. What will they order?",
            promptHindi: "एक छात्र बहुत भूखा है और दुकानदार की खाद्य दुकान पर जाता है। वे क्या ऑर्डर करेंगे?"
        },
        {
            title: "The First Day of School",
            titleHindi: "स्कूल का पहला दिन",
            roles: ['teacher', 'student'],
            prompt: "It's the first day of school! The teacher welcomes new students to class.",
            promptHindi: "स्कूल का पहला दिन है! शिक्षक नए छात्रों का कक्षा में स्वागत करते हैं।"
        },
        {
            title: "The Sick Patient",
            titleHindi: "बीमार मरीज",
            roles: ['doctor', 'student'],
            prompt: "A student doesn't feel well and visits the doctor. What's wrong?",
            promptHindi: "एक छात्र अच्छा महसूस नहीं कर रहा है और डॉक्टर के पास जाता है। क्या गलत है?"
        }
    ],
    intermediate: [
        {
            title: "The School Assembly",
            titleHindi: "स्कूल सभा",
            roles: ['principal', 'teacher', 'student'],
            prompt: "The principal announces a special event at the school assembly. Teachers and students are excited!",
            promptHindi: "प्रिंसिपल स्कूल सभा में एक विशेष कार्यक्रम की घोषणा करते हैं। शिक्षक और छात्र उत्साहित हैं!"
        },
        {
            title: "The Fire Drill",
            titleHindi: "अग्नि अभ्यास",
            roles: ['firefighter', 'teacher', 'student'],
            prompt: "A firefighter visits the school to teach about fire safety. Everyone practices the fire drill!",
            promptHindi: "एक अग्निशामक स्कूल में आग सुरक्षा के बारे में सिखाने आता है। सभी अग्नि अभ्यास का अभ्यास करते हैं!"
        },
        {
            title: "The Art Exhibition",
            titleHindi: "कला प्रदर्शनी",
            roles: ['artist', 'teacher', 'student'],
            prompt: "An artist is organizing an art exhibition at school. Students show their paintings!",
            promptHindi: "एक कलाकार स्कूल में कला प्रदर्शनी का आयोजन कर रहा है। छात्र अपने चित्र दिखाते हैं!"
        }
    ],
    advanced: [
        {
            title: "The Community Fair",
            titleHindi: "सामुदायिक मेला",
            roles: ['shopkeeper', 'farmer', 'chef', 'artist'],
            prompt: "The town is having a big fair! Everyone sets up their stalls and sells their products.",
            promptHindi: "शहर में एक बड़ा मेला हो रहा है! सभी अपने स्टॉल लगाते हैं और अपने उत्पाद बेचते हैं।"
        },
        {
            title: "The Emergency Rescue",
            titleHindi: "आपातकालीन बचाव",
            roles: ['police', 'firefighter', 'doctor', 'teacher'],
            prompt: "There's an emergency in town! Police, firefighters, and doctors work together to help everyone.",
            promptHindi: "शहर में आपातकाल है! पुलिस, अग्निशामक और डॉक्टर सभी की मदद के लिए मिलकर काम करते हैं।"
        },
        {
            title: "The Farm to Table",
            titleHindi: "खेत से मेज तक",
            roles: ['farmer', 'chef', 'shopkeeper', 'student'],
            prompt: "Follow food from the farm to your plate! The farmer grows it, the chef cooks it, and the shopkeeper sells it.",
            promptHindi: "खेत से आपकी थाली तक भोजन का अनुसरण करें! किसान इसे उगाता है, रसोइया इसे पकाता है, और दुकानदार इसे बेचता है।"
        }
    ]
};

// Get random story prompt
function getRandomStory(difficulty = 'beginner') {
    const stories = storyPrompts[difficulty];
    return stories[Math.floor(Math.random() * stories.length)];
}

// Check if current players match story requirements
function canPlayStory(story, currentPlayers) {
    const playerRoles = currentPlayers.map(p => p.role);
    return story.roles.every(role => playerRoles.includes(role));
}

// Suggest stories based on current players
function suggestStories(currentPlayers) {
    const suggestions = [];
    for (const difficulty in storyPrompts) {
        for (const story of storyPrompts[difficulty]) {
            if (canPlayStory(story, currentPlayers)) {
                suggestions.push({ ...story, difficulty });
            }
        }
    }
    return suggestions;
}
