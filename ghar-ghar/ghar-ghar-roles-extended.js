// Extended roles for Ghar Ghar Game
const extendedRoles = {
    doctor: {
        character: '🧍‍♂️',
        emoji: '👨‍⚕️',
        name: 'Doctor',
        nameHindi: 'डॉक्टर',
        shops: [
            '🏥 Hospital', '💊 Pharmacy', '🩺 Clinic', 
            '🚑 Emergency', '🧪 Lab'
        ],
        items: {
            '🏥 Hospital': ['💉', '🩺', '💊', '🩹', '🏥'],
            '💊 Pharmacy': ['💊', '💉', '🧴', '🧪', '📋'],
            '🩺 Clinic': ['🩺', '🌡️', '💊', '📋', '🖊️'],
            '🚑 Emergency': ['🚑', '🩹', '💉', '🏥', '📞'],
            '🧪 Lab': ['🧪', '🔬', '⚗️', '📊', '💻']
        }
    },
    police: {
        character: '🧍‍♂️',
        emoji: '👮',
        name: 'Police Officer',
        nameHindi: 'पुलिस',
        shops: [
            '🚓 Police Station', '🚨 Patrol', '🔍 Detective',
            '🚦 Traffic', '🏛️ Court'
        ],
        items: {
            '🚓 Police Station': ['🚓', '📋', '🖊️', '📞', '💼'],
            '🚨 Patrol': ['🚨', '🚓', '📻', '🔦', '🚦'],
            '🔍 Detective': ['🔍', '📝', '📷', '🔎', '💼'],
            '🚦 Traffic': ['🚦', '🚓', '📋', '🖊️', '🚨'],
            '🏛️ Court': ['⚖️', '📋', '🖊️', '📚', '🏛️']
        }
    },
    chef: {
        character: '🧍‍♂️',
        emoji: '👨‍🍳',
        name: 'Chef',
        nameHindi: 'रसोइया',
        shops: [
            '🍽️ Restaurant', '🍰 Bakery', '🍕 Pizzeria',
            '🍜 Noodle Bar', '🥘 Indian Kitchen'
        ],
        items: {
            '🍽️ Restaurant': ['🍽️', '🔪', '🥄', '🍳', '👨‍🍳'],
            '🍰 Bakery': ['🍰', '🧁', '🍪', '🥐', '🍞'],
            '🍕 Pizzeria': ['🍕', '🧀', '🍅', '🔥', '🍴'],
            '🍜 Noodle Bar': ['🍜', '🥢', '🍵', '🥟', '🍚'],
            '🥘 Indian Kitchen': ['🥘', '🍛', '🫓', '🧈', '☕']
        }
    },
    farmer: {
        character: '🧍‍♂️',
        emoji: '👨‍🌾',
        name: 'Farmer',
        nameHindi: 'किसान',
        shops: [
            '🌾 Farm', '🐄 Dairy', '🌻 Garden',
            '🚜 Tractor Shed', '🏪 Market'
        ],
        items: {
            '🌾 Farm': ['🌾', '🚜', '🌱', '💧', '☀️'],
            '🐄 Dairy': ['🐄', '🥛', '🧈', '🧀', '🥚'],
            '🌻 Garden': ['🌻', '🌱', '💐', '🌹', '🌺'],
            '🚜 Tractor Shed': ['🚜', '🔧', '⛽', '🛠️', '🌾'],
            '🏪 Market': ['🥕', '🍅', '🥔', '🌽', '🥬']
        }
    },
    artist: {
        character: '🧍‍♀️',
        emoji: '👩‍🎨',
        name: 'Artist',
        nameHindi: 'कलाकार',
        shops: [
            '🎨 Art Studio', '🖼️ Gallery', '✏️ Drawing Class',
            '🎭 Theater', '📸 Photography'
        ],
        items: {
            '🎨 Art Studio': ['🎨', '🖌️', '🖍️', '✏️', '📐'],
            '🖼️ Gallery': ['🖼️', '🎨', '🖌️', '🌟', '💡'],
            '✏️ Drawing Class': ['✏️', '📝', '🖍️', '📏', '📐'],
            '🎭 Theater': ['🎭', '🎬', '🎤', '🎪', '🎨'],
            '📸 Photography': ['📸', '📷', '💡', '🎬', '🖼️']
        }
    },
    firefighter: {
        character: '🧍‍♂️',
        emoji: '👨‍🚒',
        name: 'Firefighter',
        nameHindi: 'अग्निशामक',
        shops: [
            '🚒 Fire Station', '🔥 Emergency', '🏢 Rescue',
            '🚁 Helicopter', '🏥 First Aid'
        ],
        items: {
            '🚒 Fire Station': ['🚒', '🧯', '🔥', '🚨', '📞'],
            '🔥 Emergency': ['🔥', '🧯', '💧', '🚒', '🚨'],
            '🏢 Rescue': ['🪜', '🧯', '🚒', '🦺', '⛑️'],
            '🚁 Helicopter': ['🚁', '🚒', '📻', '🔦', '🗺️'],
            '🏥 First Aid': ['🩹', '💊', '🩺', '🚑', '📋']
        }
    }
};
