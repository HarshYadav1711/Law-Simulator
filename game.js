// Game State
const gameState = {
    reputation: 50,
    casesWon: 0,
    level: 1,
    psychologyInsights: [],
    currentCase: null,
    caseHistory: [],
    storyProgress: 0,
    ethicsScore: 0,
    justiceScore: 0,
    kindnessScore: 0,
    money: 5000,
    energy: 100,
    maxEnergyBonus: 0,
    currentPhase: null,
    collectedEvidence: [],
    achievements: [],
    officeUpgrades: [],
    clientSatisfaction: 75,
    monthlyExpenses: 500,
    totalEvidenceCollected: 0,
    winStreak: 0,
    hardCasesWon: 0,
    perfectInvestigation: false,
    energyEfficientCase: false,
    quickWin: false
};

// Cases Database
const cases = [
    {
        id: 1,
        title: "The Wrongfully Accused",
        difficulty: "easy",
        description: "A young man is accused of shoplifting. The evidence is circumstantial, and you notice inconsistencies in the witness testimony. Your client maintains their innocence.",
        decisions: [
            {
                id: "d1",
                title: "Challenge the Witness",
                description: "Aggressively cross-examine the witness to expose inconsistencies. This might rattle them but could also make you look harsh.",
                effects: { reputation: 5, justiceScore: 3, ethicsScore: 1 },
                outcome: "You successfully expose the witness's inconsistencies. The jury sees through the weak case."
            },
            {
                id: "d2",
                title: "Present Character Evidence",
                description: "Focus on your client's good character and community standing. This is ethical but may not address the evidence directly.",
                effects: { reputation: 3, ethicsScore: 5, kindnessScore: 3 },
                outcome: "The jury is moved by your client's character, but the prosecution's evidence still weighs heavily."
            },
            {
                id: "d3",
                title: "Negotiate a Plea Deal",
                description: "Accept a reduced charge to avoid risk. This is pragmatic but may not serve true justice.",
                effects: { reputation: -2, ethicsScore: -3, justiceScore: -5 },
                outcome: "Your client accepts the deal, but you wonder if you could have done more."
            }
        ],
        storyText: "Your first case tests your values. Will you fight for justice, show kindness, or take the easy path?"
    },
    {
        id: 2,
        title: "The Corporate Cover-Up",
        difficulty: "easy",
        description: "A whistleblower is being sued by their former employer for breach of contract. They exposed environmental violations, but the company claims defamation.",
        decisions: [
            {
                id: "d4",
                title: "Fight for the Truth",
                description: "Defend the whistleblower's right to expose wrongdoing. This aligns with justice but may damage your reputation with corporate clients.",
                effects: { reputation: 2, justiceScore: 8, ethicsScore: 5 },
                outcome: "You win the case, and the truth comes out. Your commitment to justice inspires others."
            },
            {
                id: "d5",
                title: "Settle Quietly",
                description: "Negotiate a confidential settlement. This protects your client but allows the company to continue their practices.",
                effects: { reputation: 5, justiceScore: -3, ethicsScore: -2 },
                outcome: "The case is resolved, but you feel you've compromised your principles."
            },
            {
                id: "d6",
                title: "Seek Media Attention",
                description: "Use the case to highlight corporate accountability. This is risky but could create real change.",
                effects: { reputation: 8, justiceScore: 10, ethicsScore: 7, kindnessScore: 5 },
                outcome: "The case gains national attention. You become known as a champion of justice."
            }
        ],
        storyText: "This case challenges you to choose between personal gain and the greater good. What matters more to you?"
    },
    {
        id: 3,
        title: "The Desperate Mother",
        difficulty: "medium",
        description: "A single mother is charged with theft after stealing food for her children. She has no prior record and is clearly remorseful. The prosecutor is pushing for jail time.",
        decisions: [
            {
                id: "d7",
                title: "Emphasize Her Circumstances",
                description: "Focus on her desperate situation and the welfare of her children. Appeal to the court's compassion.",
                effects: { reputation: 4, kindnessScore: 8, ethicsScore: 5, justiceScore: 3 },
                outcome: "The judge shows leniency, recognizing the human element of the case."
            },
            {
                id: "d8",
                title: "Challenge the System",
                description: "Argue that the system failed her and that punishment would be unjust. This is bold but may alienate the court.",
                effects: { reputation: 2, justiceScore: 10, ethicsScore: 7, kindnessScore: 6 },
                outcome: "Your passionate defense makes the court reconsider. You've made a statement about systemic injustice."
            },
            {
                id: "d9",
                title: "Focus on Legal Technicalities",
                description: "Stick to legal arguments and avoid emotional appeals. This is safe but may miss the heart of the case.",
                effects: { reputation: 3, justiceScore: 2, ethicsScore: 2, kindnessScore: 1 },
                outcome: "You present a solid legal case, but the human story gets lost."
            }
        ],
        storyText: "Sometimes the law and justice don't align. How do you balance compassion with legal strategy?"
    },
    {
        id: 4,
        title: "The Conflicted Client",
        difficulty: "medium",
        description: "Your client admits to you in confidence that they committed a more serious crime than what they're charged with. They want you to help them get a lighter sentence for the lesser charge.",
        decisions: [
            {
                id: "d10",
                title: "Maintain Confidentiality",
                description: "Honor attorney-client privilege but work within ethical bounds. You can't reveal the confession, but you won't mislead the court.",
                effects: { reputation: 3, ethicsScore: 5, justiceScore: -2 },
                outcome: "You navigate the ethical dilemma carefully, but the truth weighs on you."
            },
            {
                id: "d11",
                title: "Encourage Full Disclosure",
                description: "Counsel your client to come clean about everything. This serves justice but may harm your client relationship.",
                effects: { reputation: 1, justiceScore: 8, ethicsScore: 7, kindnessScore: 3 },
                outcome: "Your client follows your advice. Justice is served, and you've maintained your integrity."
            },
            {
                id: "d12",
                title: "Withdraw from the Case",
                description: "Step away from the case due to the ethical conflict. This is the most ethical choice but leaves your client without representation.",
                effects: { reputation: 2, ethicsScore: 10, justiceScore: 5, kindnessScore: -2 },
                outcome: "You've maintained your principles, but you wonder if you could have helped guide your client better."
            }
        ],
        storyText: "This is your first real ethical test. How do you balance your duty to your client with your duty to justice?"
    },
    {
        id: 5,
        title: "The High-Profile Murder Case",
        difficulty: "hard",
        description: "You're defending someone accused of murder. The evidence is strong, but your client maintains innocence. The media is watching, and public opinion is against you.",
        decisions: [
            {
                id: "d13",
                title: "Fight Aggressively",
                description: "Challenge every piece of evidence and attack the prosecution's case. This is your client's right, but it may damage your public image.",
                effects: { reputation: -5, justiceScore: 5, ethicsScore: 3 },
                outcome: "You mount a strong defense, but the public sees you as defending a guilty person."
            },
            {
                id: "d14",
                title: "Focus on Due Process",
                description: "Emphasize the importance of fair trial and proper procedure. This is principled but may not be enough.",
                effects: { reputation: 2, justiceScore: 7, ethicsScore: 6 },
                outcome: "You ensure a fair trial, upholding the principles of justice even when it's unpopular."
            },
            {
                id: "d15",
                title: "Seek the Truth",
                description: "Investigate thoroughly and present all evidence, even if it hurts your case. This is risky but serves justice.",
                effects: { reputation: 5, justiceScore: 10, ethicsScore: 8, kindnessScore: 4 },
                outcome: "Your commitment to truth reveals new evidence. You've shown that justice requires integrity."
            }
        ],
        storyText: "This case will define your career. Will you choose popularity or principle? Truth or victory?"
    },
    {
        id: 6,
        title: "The Systemic Injustice",
        difficulty: "hard",
        description: "A pattern of cases reveals systemic bias in the justice system. You have the opportunity to bring a class-action lawsuit that could change the system, but it will be a long, difficult fight with no guarantee of success.",
        decisions: [
            {
                id: "d16",
                title: "Take on the System",
                description: "Commit to the class-action lawsuit. This is the right thing to do but will consume your resources and time.",
                effects: { reputation: 10, justiceScore: 15, ethicsScore: 12, kindnessScore: 10 },
                outcome: "You take on the fight of a lifetime. Win or lose, you've stood up for what's right."
            },
            {
                id: "d17",
                title: "Focus on Individual Cases",
                description: "Help clients one at a time. This is safer and more manageable, but won't address the root cause.",
                effects: { reputation: 5, kindnessScore: 8, justiceScore: 3, ethicsScore: 4 },
                outcome: "You help many individuals, but the systemic issues remain."
            },
            {
                id: "d18",
                title: "Build a Coalition",
                description: "Partner with other lawyers and organizations to tackle the issue together. This combines individual action with systemic change.",
                effects: { reputation: 12, justiceScore: 12, ethicsScore: 10, kindnessScore: 8 },
                outcome: "Together, you create real change. Your collaborative approach amplifies your impact."
            }
        ],
        storyText: "This is your moment to make a real difference. Will you take on the system alone, help individuals, or build a movement?"
    }
];

// Psychology Insights
const psychologyInsights = [
    {
        id: "body-language",
        name: "Body Language Reading",
        description: "You can detect subtle signs of deception in witnesses. +10 to case success when used during cross-examination.",
        unlockCondition: { casesWon: 2 }
    },
    {
        id: "jury-persuasion",
        name: "Jury Persuasion",
        description: "Your understanding of group psychology helps you connect with juries. +15 to reputation when used in trials.",
        unlockCondition: { casesWon: 4 }
    },
    {
        id: "client-calm",
        name: "Client Calming",
        description: "You know how to help anxious clients present their best selves. +5 to all case outcomes when used.",
        unlockCondition: { kindnessScore: 20 }
    },
    {
        id: "ethical-clarity",
        name: "Ethical Clarity",
        description: "Your strong ethical foundation helps you navigate difficult decisions. +10 to ethics and justice scores.",
        unlockCondition: { ethicsScore: 30 }
    },
    {
        id: "truth-detection",
        name: "Truth Detection",
        description: "Your experience helps you see through lies and find the truth. Reveals hidden information in cases.",
        unlockCondition: { justiceScore: 40 }
    }
];

// DOM Elements
const elements = {
    mainMenu: document.getElementById('main-menu'),
    gameScreen: document.getElementById('game-screen'),
    startGameBtn: document.getElementById('start-game-btn'),
    continueGameBtn: document.getElementById('continue-game-btn'),
    takeCaseBtn: document.getElementById('take-case-btn'),
    useInsightBtn: document.getElementById('use-insight-btn'),
    officeBtn: document.getElementById('office-btn'),
    achievementsBtn: document.getElementById('achievements-btn'),
    caseTitle: document.getElementById('case-title'),
    caseContent: document.getElementById('case-content'),
    caseActions: document.getElementById('case-actions'),
    storyContent: document.getElementById('story-content'),
    decisionPanel: document.getElementById('decision-panel'),
    decisionContent: document.getElementById('decision-content'),
    decisionOptions: document.getElementById('decision-options'),
    outcomeModal: document.getElementById('outcome-modal'),
    outcomeTitle: document.getElementById('outcome-title'),
    outcomeText: document.getElementById('outcome-text'),
    outcomeEffects: document.getElementById('outcome-effects'),
    closeOutcomeBtn: document.getElementById('close-outcome-btn'),
    insightModal: document.getElementById('insight-modal'),
    insightName: document.getElementById('insight-name'),
    insightDescription: document.getElementById('insight-description'),
    closeInsightBtn: document.getElementById('close-insight-btn'),
    reputationValue: document.getElementById('reputation-value'),
    casesWonValue: document.getElementById('cases-won-value'),
    levelValue: document.getElementById('level-value'),
    moneyValue: document.getElementById('money-value'),
    energyValue: document.getElementById('energy-value'),
    insightsContainer: document.getElementById('insights-container'),
    phaseIndicator: document.getElementById('phase-indicator'),
    clientPanel: document.getElementById('client-panel'),
    clientDialogue: document.getElementById('client-dialogue'),
    clientOptions: document.getElementById('client-options'),
    investigationPanel: document.getElementById('investigation-panel'),
    investigationLocations: document.getElementById('investigation-locations'),
    evidenceList: document.getElementById('evidence-list'),
    preparationPanel: document.getElementById('preparation-panel'),
    strategyOptions: document.getElementById('strategy-options'),
    courtroomPanel: document.getElementById('courtroom-panel'),
    courtroomActions: document.getElementById('courtroom-actions'),
    judgeText: document.getElementById('judge-text'),
    prosecutorText: document.getElementById('prosecutor-text'),
    witnessText: document.getElementById('witness-text'),
    officeModal: document.getElementById('office-modal'),
    closeOfficeBtn: document.getElementById('close-office-btn'),
    achievementsModal: document.getElementById('achievements-modal'),
    achievementsList: document.getElementById('achievements-list'),
    closeAchievementsBtn: document.getElementById('close-achievements-btn'),
    tutorialModal: document.getElementById('tutorial-modal'),
    tutorialBtn: document.getElementById('tutorial-btn'),
    tutorialMenuBtn: document.getElementById('tutorial-menu-btn'),
    closeTutorialBtn: document.getElementById('close-tutorial-btn'),
    prevTutorialBtn: document.getElementById('prev-tutorial-btn'),
    nextTutorialBtn: document.getElementById('next-tutorial-btn'),
    tutorialPageIndicator: document.getElementById('tutorial-page-indicator'),
    energyWarningModal: document.getElementById('energy-warning-modal'),
    currentEnergyDisplay: document.getElementById('current-energy-display'),
    maxEnergyDisplay: document.getElementById('max-energy-display'),
    closeEnergyWarningBtn: document.getElementById('close-energy-warning-btn')
};

// Initialize Game
function initGame() {
    loadGameState();
    
    // Ensure energy is valid after loading
    const maxEnergy = 100 + (gameState.maxEnergyBonus || 0);
    if (typeof gameState.energy !== 'number' || isNaN(gameState.energy)) {
        gameState.energy = maxEnergy;
    }
    gameState.energy = Math.max(0, Math.min(maxEnergy, gameState.energy));
    
    updateUI();
    checkInsightUnlocks();
    
    // Force hide energy warning modal on initialization - it should never show on load
    if (elements.energyWarningModal) {
        elements.energyWarningModal.classList.add('hidden');
        // Also set display style to ensure it's hidden
        elements.energyWarningModal.style.display = 'none';
    }
    
    // If there's a current case, restore it properly
    if (gameState.currentCase) {
        // Restore case display if case was in progress
        elements.caseTitle.innerHTML = `${gameState.currentCase.title} <span class="difficulty-badge difficulty-${gameState.currentCase.difficulty}">${gameState.currentCase.difficulty.toUpperCase()}</span>`;
        elements.caseContent.innerHTML = `<p>${gameState.currentCase.description}</p>`;
    }
    
    // Save state after initialization to ensure energy is persisted correctly
    saveGameState();
}

// Load Game State from LocalStorage
function loadGameState() {
    const saved = localStorage.getItem('lawPracticeGameState');
    if (saved) {
        try {
            const loadedState = JSON.parse(saved);
            Object.assign(gameState, loadedState);
            
            // Validate and fix energy on load
            const maxEnergy = 100 + (gameState.maxEnergyBonus || 0);
            
            // Ensure energy is a valid number
            if (typeof gameState.energy !== 'number' || isNaN(gameState.energy)) {
                gameState.energy = maxEnergy;
            }
            
            if (gameState.energy < 0) {
                gameState.energy = 0;
            }
            if (gameState.energy > maxEnergy) {
                gameState.energy = maxEnergy;
            }
            
            // Regenerate some energy when loading (player rested) - but ensure minimum is reasonable
            if (gameState.energy < maxEnergy) {
                let energyRegen = 30;
                if (gameState.officeUpgrades && gameState.officeUpgrades.includes('plants')) {
                    energyRegen += 5;
                }
                if (gameState.officeUpgrades && gameState.officeUpgrades.includes('gym')) {
                    energyRegen += 10;
                }
                gameState.energy = Math.min(maxEnergy, gameState.energy + energyRegen);
            }
            
            // If energy is still 0 or very low after regeneration, set to a reasonable minimum
            if (gameState.energy < 20) {
                gameState.energy = Math.min(maxEnergy, 50); // Start with at least 50 energy
            }
        } catch (e) {
            console.error('Error loading game state:', e);
            // Reset to default if loading fails
            gameState.energy = 100;
        }
    } else {
        // No saved state - ensure energy is set to default
        gameState.energy = 100;
    }
}

// Save Game State to LocalStorage
function saveGameState() {
    localStorage.setItem('lawPracticeGameState', JSON.stringify(gameState));
}

// Update UI
function updateUI() {
    elements.reputationValue.textContent = gameState.reputation;
    elements.casesWonValue.textContent = gameState.casesWon;
    elements.levelValue.textContent = gameState.level;
    elements.moneyValue.textContent = `$${gameState.money.toLocaleString()}`;
    const maxEnergy = 100 + (gameState.maxEnergyBonus || 0);
    elements.energyValue.textContent = `${gameState.energy}/${maxEnergy}`;
    
    // Update insights display
    elements.insightsContainer.innerHTML = '';
    gameState.psychologyInsights.forEach(insight => {
        const badge = document.createElement('div');
        badge.className = 'insight-badge';
        badge.textContent = insight.name;
        badge.dataset.insightId = insight.id;
        elements.insightsContainer.appendChild(badge);
    });
    
    if (gameState.psychologyInsights.length === 0) {
        const noInsights = document.createElement('span');
        noInsights.textContent = 'None unlocked yet';
        noInsights.style.color = '#999';
        elements.insightsContainer.appendChild(noInsights);
    }
    
    checkAchievements();
}

// Check for Insight Unlocks
function checkInsightUnlocks() {
    psychologyInsights.forEach(insight => {
        if (gameState.psychologyInsights.find(i => i.id === insight.id)) {
            return; // Already unlocked
        }
        
        const condition = insight.unlockCondition;
        let shouldUnlock = true;
        
        if (condition.casesWon && gameState.casesWon < condition.casesWon) {
            shouldUnlock = false;
        }
        if (condition.kindnessScore && gameState.kindnessScore < condition.kindnessScore) {
            shouldUnlock = false;
        }
        if (condition.ethicsScore && gameState.ethicsScore < condition.ethicsScore) {
            shouldUnlock = false;
        }
        if (condition.justiceScore && gameState.justiceScore < condition.justiceScore) {
            shouldUnlock = false;
        }
        
        if (shouldUnlock) {
            unlockInsight(insight);
        }
    });
}

// Unlock Insight
function unlockInsight(insight) {
    gameState.psychologyInsights.push(insight);
    saveGameState();
    updateUI();
    
    // Show unlock modal
    elements.insightName.textContent = insight.name;
    elements.insightDescription.textContent = insight.description;
    elements.insightModal.classList.remove('hidden');
}

// Take New Case
function takeNewCase() {
    const maxEnergy = 100 + (gameState.maxEnergyBonus || 0);
    const requiredEnergy = 20;
    
    // Ensure energy is within bounds and get current value
    let currentEnergy = gameState.energy || 0;
    if (currentEnergy < 0) {
        currentEnergy = 0;
        gameState.energy = 0;
    }
    if (currentEnergy > maxEnergy) {
        currentEnergy = maxEnergy;
        gameState.energy = maxEnergy;
    }
    
    // Update UI to reflect current state before checking
    updateUI();
    
    // Only show warning if energy is actually insufficient
    if (currentEnergy < requiredEnergy) {
        showEnergyWarning();
        return;
    }
    
    // Reset case-specific tracking
    gameState.perfectInvestigation = false;
    gameState.energyEfficientCase = false;
    
    // Filter available cases based on level
    const availableCases = cases.filter(c => {
        const caseLevel = getCaseLevel(c.difficulty);
        return caseLevel <= gameState.level && !gameState.caseHistory.includes(c.id);
    });
    
    if (availableCases.length === 0) {
        elements.caseTitle.textContent = "All Available Cases Completed";
        elements.caseContent.innerHTML = "<p>You've completed all available cases at your current level. Keep building your reputation to unlock more challenging cases!</p>";
        elements.caseActions.innerHTML = "";
        return;
    }
    
    // Select random case from available
    const randomCase = availableCases[Math.floor(Math.random() * availableCases.length)];
    gameState.currentCase = { ...randomCase, phase: 'client', evidence: [], searchedLocations: [] };
    gameState.collectedEvidence = [];
    
    // Apply energy cost (reduced by upgrades)
    let energyCost = 20;
    if (gameState.officeUpgrades.includes('assistant')) {
        energyCost = Math.floor(energyCost * 0.9);
    }
    if (gameState.officeUpgrades.includes('paralegal')) {
        energyCost = Math.floor(energyCost * 0.7);
    }
    
    gameState.energy -= energyCost;
    
    // Track case start time for quick win achievement
    gameState.caseStartTime = Date.now();
    
    // Start with client meeting phase
    startClientMeeting();
}

// Get Case Level
function getCaseLevel(difficulty) {
    const levels = { easy: 1, medium: 2, hard: 3 };
    return levels[difficulty] || 1;
}

// Show Decisions
function showDecisions(decisions) {
    elements.decisionOptions.innerHTML = '';
    
    decisions.forEach(decision => {
        const option = document.createElement('div');
        option.className = 'decision-option';
        
        // Check if decision aligns with ethics
        if (decision.effects.ethicsScore > 3) {
            option.classList.add('ethics');
        }
        
        option.innerHTML = `
            <h3>${decision.title}</h3>
            <p>${decision.description}</p>
        `;
        
        option.addEventListener('click', () => makeDecision(decision));
        elements.decisionOptions.appendChild(option);
    });
}

// Start Client Meeting Phase
function startClientMeeting() {
    gameState.currentCase.phase = 'client';
    updatePhaseIndicator('client');
    
    // Hide all panels
    hideAllPanels();
    
    // Show client panel
    elements.clientPanel.classList.remove('hidden');
    elements.phaseIndicator.classList.remove('hidden');
    
    const dialogues = [
        "I'm so scared. I don't know what to do. Can you help me?",
        "I didn't do what they're saying. I swear!",
        "Please, you have to believe me. I'm innocent!"
    ];
    
    const randomDialogue = dialogues[Math.floor(Math.random() * dialogues.length)];
    elements.clientDialogue.innerHTML = `<p><strong>Client:</strong> "${randomDialogue}"</p>`;
    
    elements.clientOptions.innerHTML = `
        <div class="dialogue-option" onclick="respondToClient('reassure')">
            <strong>Reassure them:</strong> "I'm here to help. Let's work through this together."
        </div>
        <div class="dialogue-option" onclick="respondToClient('professional')">
            <strong>Stay professional:</strong> "I understand. Let's discuss the facts of your case."
        </div>
        <div class="dialogue-option" onclick="respondToClient('direct')">
            <strong>Be direct:</strong> "Tell me everything that happened. I need the full truth."
        </div>
    `;
}

// Respond to Client
window.respondToClient = function(response) {
    let effect = {};
    let nextDialogue = "";
    
    if (response === 'reassure') {
        effect = { kindnessScore: 3, clientSatisfaction: 5 };
        nextDialogue = "Thank you. I feel better already. Here's what happened...";
    } else if (response === 'professional') {
        effect = { reputation: 2 };
        nextDialogue = "Of course. I'll tell you everything I remember.";
    } else if (response === 'direct') {
        effect = { justiceScore: 2, ethicsScore: 1 };
        nextDialogue = "Alright. I'll be completely honest with you.";
    }
    
    gameState.kindnessScore += effect.kindnessScore || 0;
    gameState.reputation += effect.reputation || 0;
    gameState.justiceScore += effect.justiceScore || 0;
    gameState.ethicsScore += effect.ethicsScore || 0;
    gameState.clientSatisfaction = Math.min(100, gameState.clientSatisfaction + (effect.clientSatisfaction || 0));
    
    elements.clientDialogue.innerHTML += `<p><strong>Client:</strong> "${nextDialogue}"</p>`;
    
    setTimeout(() => {
        startInvestigationPhase();
    }, 2000);
};

// Start Investigation Phase
function startInvestigationPhase() {
    gameState.currentCase.phase = 'investigation';
    updatePhaseIndicator('investigation');
    hideAllPanels();
    elements.investigationPanel.classList.remove('hidden');
    
    const locations = [
        { name: "Crime Scene", evidence: "Security footage showing inconsistencies", cost: 15 },
        { name: "Witness Interview", evidence: "Testimony that contradicts prosecution", cost: 10 },
        { name: "Evidence Room", evidence: "Forensic report with key details", cost: 20 },
        { name: "Client's Home", evidence: "Character references and alibi", cost: 10 }
    ];
    
    elements.investigationLocations.innerHTML = '';
    locations.forEach((location, index) => {
        const locDiv = document.createElement('div');
        locDiv.className = 'investigation-location';
        locDiv.innerHTML = `
            <h3>${location.name}</h3>
            <p>Cost: ${location.cost} Energy</p>
        `;
        locDiv.addEventListener('click', () => searchLocation(location, index, locDiv));
        elements.investigationLocations.appendChild(locDiv);
    });
    
    updateEvidenceDisplay();
}

// Search Location
function searchLocation(location, index, element) {
    if (gameState.currentCase.searchedLocations.includes(index)) return;
    
    // Apply energy cost reduction from upgrades
    let actualCost = location.cost;
    if (gameState.officeUpgrades.includes('paralegal')) {
        actualCost = Math.floor(location.cost * 0.5);
    } else if (gameState.officeUpgrades.includes('assistant')) {
        actualCost = Math.floor(location.cost * 0.8);
    }
    
    if (gameState.energy < actualCost) {
        alert("Not enough energy!");
        return;
    }
    
    gameState.energy -= actualCost;
    gameState.currentCase.searchedLocations.push(index);
    gameState.collectedEvidence.push(location.evidence);
    gameState.totalEvidenceCollected++;
    element.classList.add('searched');
    
    const evidenceItem = document.createElement('div');
    evidenceItem.className = 'evidence-item evidence-found';
    evidenceItem.textContent = location.evidence;
    elements.evidenceList.appendChild(evidenceItem);
    
    updateUI();
    
    // Check if all locations searched
    if (gameState.currentCase.searchedLocations.length >= 4) {
        gameState.perfectInvestigation = true;
        setTimeout(() => {
            startPreparationPhase();
        }, 1500);
    }
}

// Update Evidence Display
function updateEvidenceDisplay() {
    elements.evidenceList.innerHTML = '';
    gameState.collectedEvidence.forEach(evidence => {
        const evidenceItem = document.createElement('div');
        evidenceItem.className = 'evidence-item';
        evidenceItem.textContent = evidence;
        elements.evidenceList.appendChild(evidenceItem);
    });
}

// Start Preparation Phase
function startPreparationPhase() {
    gameState.currentCase.phase = 'preparation';
    updatePhaseIndicator('preparation');
    hideAllPanels();
    elements.preparationPanel.classList.remove('hidden');
    
    const strategies = [
        {
            title: "Aggressive Defense",
            description: "Challenge every piece of evidence. High risk, high reward.",
            effects: { reputation: 5, justiceScore: 3 }
        },
        {
            title: "Evidence-Based Defense",
            description: "Focus on the evidence you've collected. Solid and reliable.",
            effects: { reputation: 3, ethicsScore: 2 }
        },
        {
            title: "Emotional Appeal",
            description: "Connect with the jury through your client's story.",
            effects: { kindnessScore: 5, ethicsScore: 3 }
        }
    ];
    
    elements.strategyOptions.innerHTML = '';
    strategies.forEach(strategy => {
        const strategyDiv = document.createElement('div');
        strategyDiv.className = 'strategy-option';
        strategyDiv.innerHTML = `
            <h3>${strategy.title}</h3>
            <p>${strategy.description}</p>
        `;
        strategyDiv.addEventListener('click', () => selectStrategy(strategy));
        elements.strategyOptions.appendChild(strategyDiv);
    });
}

// Select Strategy
function selectStrategy(strategy) {
    gameState.currentCase.selectedStrategy = strategy;
    gameState.reputation += strategy.effects.reputation || 0;
    gameState.ethicsScore += strategy.effects.ethicsScore || 0;
    gameState.justiceScore += strategy.effects.justiceScore || 0;
    gameState.kindnessScore += strategy.effects.kindnessScore || 0;
    
    setTimeout(() => {
        startTrialPhase();
    }, 1000);
}

// Start Trial Phase
function startTrialPhase() {
    gameState.currentCase.phase = 'trial';
    updatePhaseIndicator('trial');
    hideAllPanels();
    elements.courtroomPanel.classList.remove('hidden');
    
    const trialSteps = [
        {
            speaker: 'judge',
            text: "Court is now in session. Prosecution, you may begin."
        },
        {
            speaker: 'prosecutor',
            text: "Your Honor, the evidence clearly shows the defendant's guilt."
        },
        {
            speaker: 'judge',
            text: "Defense, how do you respond?"
        }
    ];
    
    let stepIndex = 0;
    
    function showNextStep() {
        if (stepIndex < trialSteps.length) {
            const step = trialSteps[stepIndex];
            if (step.speaker === 'judge') {
                elements.judgeText.textContent = step.text;
                elements.prosecutorText.textContent = '';
                elements.witnessText.textContent = '';
            } else if (step.speaker === 'prosecutor') {
                elements.prosecutorText.textContent = step.text;
            }
            
            stepIndex++;
            if (stepIndex < trialSteps.length) {
                setTimeout(showNextStep, 2000);
            } else {
                showCourtroomActions();
            }
        }
    }
    
    showNextStep();
}

// Show Courtroom Actions
function showCourtroomActions() {
    elements.courtroomActions.innerHTML = `
        <div class="courtroom-action" onclick="presentEvidence()">
            <h3>Present Evidence</h3>
            <p>Use your collected evidence</p>
        </div>
        <div class="courtroom-action" onclick="crossExamine()">
            <h3>Cross-Examine Witness</h3>
            <p>Challenge the prosecution's witness</p>
        </div>
        <div class="courtroom-action" onclick="makeClosing()">
            <h3>Make Closing Statement</h3>
            <p>Summarize your defense</p>
        </div>
    `;
}

// Present Evidence
window.presentEvidence = function() {
    if (gameState.collectedEvidence.length === 0) {
        alert("You have no evidence to present!");
        return;
    }
    
    const bonus = gameState.collectedEvidence.length * 3;
    gameState.reputation += bonus;
    elements.judgeText.textContent = "The evidence you've presented is compelling. The court will consider this.";
    
    setTimeout(() => {
        startDecisionPhase();
    }, 2000);
};

// Cross Examine
window.crossExamine = function() {
    const hasBodyLanguage = gameState.psychologyInsights.find(i => i.id === 'body-language');
    const bonus = hasBodyLanguage ? 15 : 8;
    
    gameState.reputation += bonus;
    elements.witnessText.textContent = "I... I'm not sure. Maybe I was mistaken.";
    elements.judgeText.textContent = "The witness appears uncertain. Defense, continue.";
    
    setTimeout(() => {
        startDecisionPhase();
    }, 2000);
};

// Make Closing
window.makeClosing = function() {
    const bonus = gameState.currentCase.selectedStrategy ? 10 : 5;
    gameState.reputation += bonus;
    elements.judgeText.textContent = "The jury will now deliberate.";
    
    setTimeout(() => {
        startDecisionPhase();
    }, 2000);
};

// Start Decision Phase
function startDecisionPhase() {
    gameState.currentCase.phase = 'decision';
    updatePhaseIndicator('decision');
    hideAllPanels();
    
    elements.caseTitle.innerHTML = `${gameState.currentCase.title} <span class="difficulty-badge difficulty-${gameState.currentCase.difficulty}">${gameState.currentCase.difficulty.toUpperCase()}</span>`;
    elements.caseContent.innerHTML = `<p>${gameState.currentCase.description}</p>`;
    elements.storyContent.innerHTML = `<p>${gameState.currentCase.storyText}</p>`;
    
    showDecisions(gameState.currentCase.decisions);
    elements.decisionPanel.classList.remove('hidden');
}

// Update Phase Indicator
function updatePhaseIndicator(activePhase) {
    const phases = ['client', 'investigation', 'preparation', 'trial', 'decision'];
    phases.forEach((phase, index) => {
        const step = elements.phaseIndicator.querySelector(`[data-phase="${phase}"]`);
        if (step) {
            step.classList.remove('active', 'completed');
            if (phase === activePhase) {
                step.classList.add('active');
            } else if (phases.indexOf(activePhase) > index) {
                step.classList.add('completed');
            }
        }
    });
}

// Hide All Panels
function hideAllPanels() {
    elements.clientPanel.classList.add('hidden');
    elements.investigationPanel.classList.add('hidden');
    elements.preparationPanel.classList.add('hidden');
    elements.courtroomPanel.classList.add('hidden');
    elements.decisionPanel.classList.add('hidden');
    elements.casePanel.classList.remove('hidden');
}

// Make Decision
function makeDecision(decision) {
    // Apply effects
    gameState.reputation = Math.max(0, Math.min(100, gameState.reputation + (decision.effects.reputation || 0)));
    gameState.ethicsScore += decision.effects.ethicsScore || 0;
    gameState.justiceScore += decision.effects.justiceScore || 0;
    gameState.kindnessScore += decision.effects.kindnessScore || 0;
    
    // Calculate earnings
    const earnings = (decision.effects.reputation || 0) * 100 + (gameState.collectedEvidence.length * 50);
    gameState.money += earnings;
    
    // Determine if case was won
    const won = (decision.effects.reputation > 0 || decision.effects.justiceScore > 5 || decision.effects.ethicsScore > 5);
    
    if (won) {
        gameState.casesWon++;
        gameState.caseHistory.push(gameState.currentCase.id);
        gameState.money += 500; // Bonus for winning
        gameState.winStreak++;
        
        // Track hard cases
        if (gameState.currentCase.difficulty === 'hard') {
            gameState.hardCasesWon++;
        }
        
        // Check for energy efficient case
        if (gameState.energy >= 80) {
            gameState.energyEfficientCase = true;
        }
        
        if (gameState.casesWon % 3 === 0) {
            gameState.level++;
        }
    } else {
        gameState.winStreak = 0;
    }
    
    // Check for quick win (under 5 minutes)
    if (gameState.caseStartTime) {
        const caseDuration = (Date.now() - gameState.caseStartTime) / 1000 / 60; // minutes
        if (caseDuration < 5 && won) {
            gameState.quickWin = true;
        }
    }
    
    // Show outcome
    showOutcome(decision, won, earnings);
    
    // Hide decision panel
    elements.decisionPanel.classList.add('hidden');
    elements.phaseIndicator.classList.add('hidden');
    
    // Save state
    saveGameState();
    updateUI();
    checkInsightUnlocks();
}

// Show Outcome
function showOutcome(decision, won, earnings) {
    elements.outcomeTitle.textContent = won ? "Case Won!" : "Case Result";
    elements.outcomeText.textContent = decision.outcome;
    
    elements.outcomeEffects.innerHTML = '';
    
    const effects = [];
    if (decision.effects.reputation) {
        effects.push({ label: 'Reputation', value: decision.effects.reputation, positive: decision.effects.reputation > 0 });
    }
    if (decision.effects.ethicsScore) {
        effects.push({ label: 'Ethics', value: decision.effects.ethicsScore, positive: decision.effects.ethicsScore > 0 });
    }
    if (decision.effects.justiceScore) {
        effects.push({ label: 'Justice', value: decision.effects.justiceScore, positive: decision.effects.justiceScore > 0 });
    }
    if (decision.effects.kindnessScore) {
        effects.push({ label: 'Kindness', value: decision.effects.kindnessScore, positive: decision.effects.kindnessScore > 0 });
    }
    if (earnings) {
        effects.push({ label: 'Earnings', value: `$${earnings}`, positive: true });
    }
    
    effects.forEach(effect => {
        const effectDiv = document.createElement('div');
        effectDiv.className = `outcome-effect ${effect.positive ? 'positive' : 'negative'}`;
        effectDiv.innerHTML = `<strong>${effect.label}:</strong> ${effect.positive ? '+' : ''}${effect.value}`;
        elements.outcomeEffects.appendChild(effectDiv);
    });
    
    elements.outcomeModal.classList.remove('hidden');
}

// Show Energy Warning
function showEnergyWarning() {
    // Ensure we're using the current energy value from gameState
    const maxEnergy = 100 + (gameState.maxEnergyBonus || 0);
    let currentEnergy = gameState.energy;
    
    // Validate energy value
    if (typeof currentEnergy !== 'number' || isNaN(currentEnergy)) {
        currentEnergy = maxEnergy;
        gameState.energy = maxEnergy;
    }
    currentEnergy = Math.max(0, Math.min(maxEnergy, currentEnergy));
    
    // Update UI first to ensure consistency
    updateUI();
    
    // Only show modal if energy is actually insufficient
    if (currentEnergy >= 20) {
        // Energy is sufficient, don't show warning
        if (elements.energyWarningModal) {
            elements.energyWarningModal.classList.add('hidden');
            elements.energyWarningModal.style.display = 'none';
        }
        return;
    }
    
    if (elements.currentEnergyDisplay) {
        elements.currentEnergyDisplay.textContent = currentEnergy;
    }
    if (elements.maxEnergyDisplay) {
        elements.maxEnergyDisplay.textContent = maxEnergy;
    }
    if (elements.energyWarningModal) {
        elements.energyWarningModal.style.display = 'flex'; // Use flex to show modal
        elements.energyWarningModal.classList.remove('hidden');
    }
}

// Use Psychology Insight
function useInsight() {
    if (gameState.psychologyInsights.length === 0 || !gameState.currentCase) {
        return;
    }
    
    // Show insight selection
    const insightList = gameState.psychologyInsights.map(insight => 
        `<button class="btn btn-secondary" onclick="applyInsight('${insight.id}')">${insight.name}</button>`
    ).join('');
    
    const insightSelector = document.createElement('div');
    insightSelector.innerHTML = `
        <h3>Select an Insight to Use:</h3>
        <div style="display: flex; flex-direction: column; gap: 10px; margin-top: 15px;">
            ${insightList}
        </div>
    `;
    
    elements.caseActions.innerHTML = '';
    elements.caseActions.appendChild(insightSelector);
}

// Apply Insight
function applyInsight(insightId) {
    const insight = gameState.psychologyInsights.find(i => i.id === insightId);
    if (!insight) return;
    
    // Apply insight effects
    if (insightId === 'body-language' || insightId === 'truth-detection') {
        gameState.reputation += 10;
        alert(`${insight.name} activated! You've gained valuable information. +10 Reputation`);
    } else if (insightId === 'jury-persuasion') {
        gameState.reputation += 15;
        alert(`${insight.name} activated! The jury is more receptive to your arguments. +15 Reputation`);
    } else if (insightId === 'client-calm') {
        gameState.reputation += 5;
        gameState.kindnessScore += 3;
        alert(`${insight.name} activated! Your client presents better. +5 Reputation, +3 Kindness`);
    } else if (insightId === 'ethical-clarity') {
        gameState.ethicsScore += 10;
        gameState.justiceScore += 10;
        alert(`${insight.name} activated! You see the ethical path clearly. +10 Ethics, +10 Justice`);
    }
    
    // Mark insight as used (temporary - resets on new case)
    const badge = document.querySelector(`[data-insight-id="${insightId}"]`);
    if (badge) {
        badge.classList.add('used');
    }
    
    elements.caseActions.innerHTML = '';
    saveGameState();
    updateUI();
}

// Office Management
const officeUpgrades = [
    {
        id: 'assistant',
        name: 'Legal Assistant',
        description: 'Hire an assistant to help with research. Reduces energy costs.',
        cost: 2000,
        category: 'staff',
        effect: { monthlyExpenses: 300, energyBonus: 10 }
    },
    {
        id: 'library',
        name: 'Law Library',
        description: 'Build a comprehensive law library. Increases reputation gain.',
        cost: 5000,
        category: 'facility',
        effect: { reputationBonus: 5 }
    },
    {
        id: 'tech',
        name: 'Modern Technology',
        description: 'Upgrade office technology. Improves case preparation.',
        cost: 3000,
        category: 'equipment',
        effect: { evidenceBonus: 1 }
    },
    {
        id: 'paralegal',
        name: 'Paralegal Team',
        description: 'Hire a team of paralegals. Significantly reduces investigation costs.',
        cost: 5000,
        category: 'staff',
        effect: { monthlyExpenses: 500, energyBonus: 25, investigationCostReduction: 50 }
    },
    {
        id: 'reception',
        name: 'Professional Reception',
        description: 'Elegant reception area impresses clients. Increases client satisfaction.',
        cost: 4000,
        category: 'facility',
        effect: { clientSatisfactionBonus: 10 }
    },
    {
        id: 'conference',
        name: 'Conference Room',
        description: 'Large conference room for client meetings. Boosts reputation.',
        cost: 8000,
        category: 'facility',
        effect: { reputationBonus: 8, clientSatisfactionBonus: 5 }
    },
    {
        id: 'coffee',
        name: 'Premium Coffee Machine',
        description: 'Keep energy high with quality coffee. Increases max energy.',
        cost: 1500,
        category: 'equipment',
        effect: { maxEnergyBonus: 20 }
    },
    {
        id: 'artwork',
        name: 'Inspiring Artwork',
        description: 'Beautiful artwork creates a professional atmosphere.',
        cost: 3000,
        category: 'decoration',
        effect: { reputationBonus: 3, clientSatisfactionBonus: 5 }
    },
    {
        id: 'plants',
        name: 'Office Plants',
        description: 'Green plants improve air quality and mood.',
        cost: 1000,
        category: 'decoration',
        effect: { clientSatisfactionBonus: 3, energyRegenBonus: 5 }
    },
    {
        id: 'security',
        name: 'Security System',
        description: 'Advanced security protects sensitive case files.',
        cost: 6000,
        category: 'equipment',
        effect: { reputationBonus: 5, monthlyExpenses: 200 }
    },
    {
        id: 'partner',
        name: 'Law Partner',
        description: 'Bring on a partner to share the workload.',
        cost: 15000,
        category: 'staff',
        effect: { monthlyExpenses: 2000, reputationBonus: 15, energyBonus: 30 }
    },
    {
        id: 'penthouse',
        name: 'Penthouse Office',
        description: 'Move to a prestigious penthouse office. Major status boost.',
        cost: 50000,
        category: 'facility',
        effect: { reputationBonus: 25, clientSatisfactionBonus: 20, monthlyExpenses: 5000 }
    },
    {
        id: 'antique',
        name: 'Antique Furniture',
        description: 'Classic furniture adds sophistication to your office.',
        cost: 12000,
        category: 'decoration',
        effect: { reputationBonus: 10, clientSatisfactionBonus: 8 }
    },
    {
        id: 'gym',
        name: 'Office Gym',
        description: 'Stay fit and maintain high energy levels.',
        cost: 10000,
        category: 'facility',
        effect: { maxEnergyBonus: 30, energyRegenBonus: 10 }
    },
    {
        id: 'catering',
        name: 'Catering Service',
        description: 'Premium catering for client meetings.',
        cost: 7000,
        category: 'service',
        effect: { clientSatisfactionBonus: 15, monthlyExpenses: 800 }
    }
];

function showOffice() {
    elements.officeModal.classList.remove('hidden');
    updateOfficeDisplay();
}

function updateOfficeDisplay() {
    // Calculate firm size based on level and upgrades
    let firmSize = 'Solo Practice';
    if (gameState.level >= 10 || gameState.officeUpgrades.includes('penthouse')) {
        firmSize = 'Elite Law Firm';
    } else if (gameState.level >= 7 || gameState.officeUpgrades.includes('partner')) {
        firmSize = 'Partnership';
    } else if (gameState.level >= 3) {
        firmSize = 'Small Firm';
    }
    
    document.getElementById('firm-size').textContent = firmSize;
    document.getElementById('monthly-expenses').textContent = `$${gameState.monthlyExpenses}`;
    document.getElementById('client-satisfaction').textContent = `${gameState.clientSatisfaction}%`;
    
    // Group upgrades by category
    const categories = {
        'staff': { name: 'Staff & Personnel', upgrades: [] },
        'facility': { name: 'Facilities', upgrades: [] },
        'equipment': { name: 'Equipment', upgrades: [] },
        'decoration': { name: 'Decorations', upgrades: [] },
        'service': { name: 'Services', upgrades: [] }
    };
    
    officeUpgrades.forEach(upgrade => {
        if (categories[upgrade.category]) {
            categories[upgrade.category].upgrades.push(upgrade);
        }
    });
    
    const upgradesList = document.getElementById('upgrades-list');
    upgradesList.innerHTML = '';
    
    // Display by category
    Object.keys(categories).forEach(categoryKey => {
        const category = categories[categoryKey];
        if (category.upgrades.length === 0) return;
        
        const categoryDiv = document.createElement('div');
        categoryDiv.className = 'upgrade-category';
        categoryDiv.innerHTML = `<h3 class="category-title">${category.name}</h3>`;
        
        const upgradesContainer = document.createElement('div');
        upgradesContainer.className = 'upgrades-grid';
        
        category.upgrades.forEach(upgrade => {
            const owned = gameState.officeUpgrades.includes(upgrade.id);
            const canAfford = gameState.money >= upgrade.cost && !owned;
            
            const upgradeDiv = document.createElement('div');
            upgradeDiv.className = `upgrade-item ${owned ? 'owned' : canAfford ? 'available' : ''}`;
            
            let effectText = '';
            if (upgrade.effect.reputationBonus) {
                effectText += `+${upgrade.effect.reputationBonus} Reputation `;
            }
            if (upgrade.effect.energyBonus) {
                effectText += `+${upgrade.effect.energyBonus} Energy `;
            }
            if (upgrade.effect.clientSatisfactionBonus) {
                effectText += `+${upgrade.effect.clientSatisfactionBonus}% Client Satisfaction `;
            }
            if (upgrade.effect.maxEnergyBonus) {
                effectText += `+${upgrade.effect.maxEnergyBonus} Max Energy `;
            }
            
            upgradeDiv.innerHTML = `
                <h4>${upgrade.name}</h4>
                <p>${upgrade.description}</p>
                ${effectText ? `<p style="color: #667eea; font-size: 0.9em; margin: 5px 0;"><strong>Effects:</strong> ${effectText}</p>` : ''}
                <div class="upgrade-cost">Cost: $${upgrade.cost.toLocaleString()}</div>
                ${owned ? '<p style="color: #4caf50; font-weight: 600; margin-top: 5px;">✓ Owned</p>' : ''}
            `;
            
            if (canAfford) {
                upgradeDiv.addEventListener('click', () => purchaseUpgrade(upgrade));
            }
            
            upgradesContainer.appendChild(upgradeDiv);
        });
        
        categoryDiv.appendChild(upgradesContainer);
        upgradesList.appendChild(categoryDiv);
    });
}

function purchaseUpgrade(upgrade) {
    if (gameState.money >= upgrade.cost && !gameState.officeUpgrades.includes(upgrade.id)) {
        gameState.money -= upgrade.cost;
        gameState.officeUpgrades.push(upgrade.id);
        
        if (upgrade.effect.monthlyExpenses) {
            gameState.monthlyExpenses += upgrade.effect.monthlyExpenses;
        }
        
        if (upgrade.effect.reputationBonus) {
            gameState.reputation = Math.min(100, gameState.reputation + upgrade.effect.reputationBonus);
        }
        
        if (upgrade.effect.clientSatisfactionBonus) {
            gameState.clientSatisfaction = Math.min(100, gameState.clientSatisfaction + upgrade.effect.clientSatisfactionBonus);
        }
        
        if (upgrade.effect.maxEnergyBonus) {
            // Store max energy bonus in game state
            if (!gameState.maxEnergyBonus) gameState.maxEnergyBonus = 0;
            gameState.maxEnergyBonus += upgrade.effect.maxEnergyBonus;
            gameState.energy = Math.min(100 + gameState.maxEnergyBonus, gameState.energy);
        }
        
        // Show purchase confirmation
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: linear-gradient(135deg, #4caf50 0%, #45a049 100%);
            color: white;
            padding: 20px;
            border-radius: 10px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.3);
            z-index: 2000;
            animation: slideIn 0.5s ease;
        `;
        notification.innerHTML = `
            <h3>✅ Purchase Complete!</h3>
            <p><strong>${upgrade.name}</strong> has been added to your office.</p>
        `;
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.animation = 'slideOut 0.5s ease';
            setTimeout(() => notification.remove(), 500);
        }, 2000);
        
        saveGameState();
        updateOfficeDisplay();
        updateUI();
        checkAchievements();
    }
}

// Achievements System
const achievements = [
    {
        id: 'first-win',
        name: 'First Victory',
        description: 'Win your first case',
        icon: '🏆',
        check: () => gameState.casesWon >= 1
    },
    {
        id: 'ethical',
        name: 'Ethical Champion',
        description: 'Reach 50 ethics score',
        icon: '⚖️',
        check: () => gameState.ethicsScore >= 50
    },
    {
        id: 'just',
        name: 'Justice Seeker',
        description: 'Reach 50 justice score',
        icon: '⚖️',
        check: () => gameState.justiceScore >= 50
    },
    {
        id: 'kind',
        name: 'Compassionate',
        description: 'Reach 50 kindness score',
        icon: '❤️',
        check: () => gameState.kindnessScore >= 50
    },
    {
        id: 'reputation',
        name: 'Renowned',
        description: 'Reach 80 reputation',
        icon: '⭐',
        check: () => gameState.reputation >= 80
    },
    {
        id: 'wealthy',
        name: 'Wealthy',
        description: 'Accumulate $20,000',
        icon: '💰',
        check: () => gameState.money >= 20000
    },
    {
        id: 'master',
        name: 'Master Lawyer',
        description: 'Win 10 cases',
        icon: '👨‍⚖️',
        check: () => gameState.casesWon >= 10
    },
    {
        id: 'perfect-score',
        name: 'Perfect Score',
        description: 'Reach 100 reputation',
        icon: '💯',
        check: () => gameState.reputation >= 100
    },
    {
        id: 'triple-threat',
        name: 'Triple Threat',
        description: 'Reach 50 in Ethics, Justice, and Kindness',
        icon: '🎯',
        check: () => gameState.ethicsScore >= 50 && gameState.justiceScore >= 50 && gameState.kindnessScore >= 50
    },
    {
        id: 'insight-master',
        name: 'Psychology Master',
        description: 'Unlock all psychology insights',
        icon: '🧠',
        check: () => gameState.psychologyInsights.length >= 5
    },
    {
        id: 'evidence-hunter',
        name: 'Evidence Hunter',
        description: 'Collect 20 pieces of evidence',
        icon: '🔍',
        check: () => {
            const saved = localStorage.getItem('lawPracticeGameState');
            if (saved) {
                const state = JSON.parse(saved);
                return (state.totalEvidenceCollected || 0) >= 20;
            }
            return false;
        }
    },
    {
        id: 'undefeated',
        name: 'Undefeated',
        description: 'Win 5 cases in a row',
        icon: '🔥',
        check: () => {
            const saved = localStorage.getItem('lawPracticeGameState');
            if (saved) {
                const state = JSON.parse(saved);
                return (state.winStreak || 0) >= 5;
            }
            return false;
        }
    },
    {
        id: 'millionaire',
        name: 'Millionaire',
        description: 'Accumulate $100,000',
        icon: '💎',
        check: () => gameState.money >= 100000
    },
    {
        id: 'level-10',
        name: 'Elite Lawyer',
        description: 'Reach level 10',
        icon: '👑',
        check: () => gameState.level >= 10
    },
    {
        id: 'perfect-client',
        name: 'Client Favorite',
        description: 'Reach 100% client satisfaction',
        icon: '😊',
        check: () => gameState.clientSatisfaction >= 100
    },
    {
        id: 'office-master',
        name: 'Office Master',
        description: 'Purchase all office upgrades',
        icon: '🏢',
        check: () => gameState.officeUpgrades.length >= 10
    },
    {
        id: 'energy-efficient',
        name: 'Energy Efficient',
        description: 'Complete a case with full energy',
        icon: '⚡',
        check: () => {
            const saved = localStorage.getItem('lawPracticeGameState');
            if (saved) {
                const state = JSON.parse(saved);
                return state.energyEfficientCase || false;
            }
            return false;
        }
    },
    {
        id: 'quick-win',
        name: 'Quick Win',
        description: 'Win a case in under 5 minutes',
        icon: '⚡',
        check: () => {
            const saved = localStorage.getItem('lawPracticeGameState');
            if (saved) {
                const state = JSON.parse(saved);
                return state.quickWin || false;
            }
            return false;
        }
    },
    {
        id: 'hard-case',
        name: 'Hard Case Master',
        description: 'Win 3 hard difficulty cases',
        icon: '💪',
        check: () => {
            const saved = localStorage.getItem('lawPracticeGameState');
            if (saved) {
                const state = JSON.parse(saved);
                return (state.hardCasesWon || 0) >= 3;
            }
            return false;
        }
    },
    {
        id: 'perfect-investigation',
        name: 'Thorough Investigator',
        description: 'Search all locations in a single case',
        icon: '🔎',
        check: () => {
            const saved = localStorage.getItem('lawPracticeGameState');
            if (saved) {
                const state = JSON.parse(saved);
                return state.perfectInvestigation || false;
            }
            return false;
        }
    }
];

function checkAchievements() {
    achievements.forEach(achievement => {
        if (!gameState.achievements.includes(achievement.id) && achievement.check()) {
            gameState.achievements.push(achievement.id);
            showAchievementUnlock(achievement);
        }
    });
}

function showAchievementUnlock(achievement) {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        padding: 20px;
        border-radius: 10px;
        box-shadow: 0 10px 30px rgba(0,0,0,0.3);
        z-index: 2000;
        animation: slideIn 0.5s ease;
    `;
    notification.innerHTML = `
        <h3>🏆 Achievement Unlocked!</h3>
        <p><strong>${achievement.name}</strong></p>
        <p>${achievement.description}</p>
    `;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.5s ease';
        setTimeout(() => notification.remove(), 500);
    }, 3000);
}

function showAchievements() {
    elements.achievementsModal.classList.remove('hidden');
    elements.achievementsList.innerHTML = '';
    
    achievements.forEach(achievement => {
        const unlocked = gameState.achievements.includes(achievement.id);
        const achievementDiv = document.createElement('div');
        achievementDiv.className = `achievement-item ${unlocked ? 'unlocked' : 'locked'}`;
        achievementDiv.innerHTML = `
            <div class="achievement-icon">${achievement.icon}</div>
            <h4>${achievement.name}</h4>
            <p>${achievement.description}</p>
            ${unlocked ? '<p style="color: #4caf50;">✓ Unlocked</p>' : '<p style="color: #999;">Locked</p>'}
        `;
        elements.achievementsList.appendChild(achievementDiv);
    });
}

// Event Listeners
elements.startGameBtn.addEventListener('click', () => {
    // Check if this is first time playing
    const hasPlayedBefore = localStorage.getItem('lawPracticeGameState');
    
    // Reset game state
    Object.assign(gameState, {
        reputation: 50,
        casesWon: 0,
        level: 1,
        psychologyInsights: [],
        currentCase: null,
        caseHistory: [],
        storyProgress: 0,
        ethicsScore: 0,
        justiceScore: 0,
        kindnessScore: 0,
        money: 5000,
        energy: 100,
        maxEnergyBonus: 0,
        currentPhase: null,
        collectedEvidence: [],
        achievements: [],
        officeUpgrades: [],
        clientSatisfaction: 75,
        monthlyExpenses: 500,
        totalEvidenceCollected: 0,
        winStreak: 0,
        hardCasesWon: 0,
        perfectInvestigation: false,
        energyEfficientCase: false,
        quickWin: false
    });
    saveGameState();
    elements.mainMenu.classList.remove('active');
    elements.gameScreen.classList.add('active');
    initGame();
    
    // Show tutorial for new players
    if (!hasPlayedBefore) {
        setTimeout(() => {
            showTutorial();
            // Highlight the tutorial button
            if (elements.tutorialBtn) {
                elements.tutorialBtn.style.animation = 'pulse 2s infinite';
                setTimeout(() => {
                    elements.tutorialBtn.style.animation = '';
                }, 5000);
            }
        }, 500);
    }
});

elements.continueGameBtn.addEventListener('click', () => {
    elements.mainMenu.classList.remove('active');
    elements.gameScreen.classList.add('active');
    initGame();
});

elements.takeCaseBtn.addEventListener('click', takeNewCase);
elements.useInsightBtn.addEventListener('click', useInsight);

elements.closeOutcomeBtn.addEventListener('click', () => {
    elements.outcomeModal.classList.add('hidden');
    gameState.currentCase = null;
    gameState.collectedEvidence = [];
    elements.caseTitle.textContent = "No Active Case";
    elements.caseContent.innerHTML = "<p>Click 'Take New Case' to start your next case.</p>";
    elements.caseActions.innerHTML = "";
    hideAllPanels();
    elements.phaseIndicator.classList.add('hidden');
    
    // Regain some energy (with bonuses from upgrades)
    let energyRegen = 30;
    if (gameState.officeUpgrades.includes('plants')) {
        energyRegen += 5;
    }
    if (gameState.officeUpgrades.includes('gym')) {
        energyRegen += 10;
    }
    
    const maxEnergy = 100 + (gameState.maxEnergyBonus || 0);
    gameState.energy = Math.min(maxEnergy, gameState.energy + energyRegen);
    updateUI();
    saveGameState();
});

elements.closeInsightBtn.addEventListener('click', () => {
    elements.insightModal.classList.add('hidden');
});

if (elements.closeEnergyWarningBtn) {
    elements.closeEnergyWarningBtn.addEventListener('click', () => {
        if (elements.energyWarningModal) {
            elements.energyWarningModal.classList.add('hidden');
            elements.energyWarningModal.style.display = 'none';
        }
    });
    
    // Close modal when clicking outside
    if (elements.energyWarningModal) {
        elements.energyWarningModal.addEventListener('click', (e) => {
            if (e.target === elements.energyWarningModal) {
                elements.energyWarningModal.classList.add('hidden');
                elements.energyWarningModal.style.display = 'none';
            }
        });
    }
}

// Ensure modal is hidden on page load (run immediately)
document.addEventListener('DOMContentLoaded', () => {
    const energyModal = document.getElementById('energy-warning-modal');
    if (energyModal) {
        energyModal.classList.add('hidden');
        energyModal.style.display = 'none';
    }
});

// Also ensure it's hidden after a short delay (in case of timing issues)
setTimeout(() => {
    const energyModal = document.getElementById('energy-warning-modal');
    if (energyModal && !energyModal.classList.contains('hidden')) {
        // Only hide if energy is actually sufficient
        const maxEnergy = 100 + (gameState.maxEnergyBonus || 0);
        if (gameState.energy >= 20) {
            energyModal.classList.add('hidden');
            energyModal.style.display = 'none';
        }
    }
}, 100);

elements.officeBtn.addEventListener('click', showOffice);
elements.closeOfficeBtn.addEventListener('click', () => {
    elements.officeModal.classList.add('hidden');
});

elements.achievementsBtn.addEventListener('click', showAchievements);
elements.closeAchievementsBtn.addEventListener('click', () => {
    elements.achievementsModal.classList.add('hidden');
});

// Tutorial System
const tutorialSections = ['basics', 'cases', 'resources', 'office', 'insights', 'achievements'];
let currentTutorialSection = 0;

function showTutorial() {
    elements.tutorialModal.classList.remove('hidden');
    currentTutorialSection = 0;
    updateTutorialDisplay();
}

function updateTutorialDisplay() {
    // Update navigation buttons
    document.querySelectorAll('.tutorial-nav-btn').forEach((btn, index) => {
        btn.classList.remove('active');
        if (index === currentTutorialSection) {
            btn.classList.add('active');
        }
    });
    
    // Update sections
    tutorialSections.forEach((section, index) => {
        const sectionElement = document.getElementById(`tutorial-${section}`);
        if (sectionElement) {
            sectionElement.classList.remove('active');
            if (index === currentTutorialSection) {
                sectionElement.classList.add('active');
            }
        }
    });
    
    // Update page indicator
    elements.tutorialPageIndicator.textContent = `${currentTutorialSection + 1} / ${tutorialSections.length}`;
    
    // Update prev/next buttons
    elements.prevTutorialBtn.disabled = currentTutorialSection === 0;
    elements.nextTutorialBtn.disabled = currentTutorialSection === tutorialSections.length - 1;
}

function nextTutorialSection() {
    if (currentTutorialSection < tutorialSections.length - 1) {
        currentTutorialSection++;
        updateTutorialDisplay();
    }
}

function prevTutorialSection() {
    if (currentTutorialSection > 0) {
        currentTutorialSection--;
        updateTutorialDisplay();
    }
}

function goToTutorialSection(sectionName) {
    const index = tutorialSections.indexOf(sectionName);
    if (index !== -1) {
        currentTutorialSection = index;
        updateTutorialDisplay();
    }
}

// Tutorial event listeners
elements.tutorialBtn.addEventListener('click', showTutorial);
elements.tutorialMenuBtn.addEventListener('click', showTutorial);
elements.closeTutorialBtn.addEventListener('click', () => {
    elements.tutorialModal.classList.add('hidden');
});

elements.nextTutorialBtn.addEventListener('click', nextTutorialSection);
elements.prevTutorialBtn.addEventListener('click', prevTutorialSection);

// Navigation button clicks
document.querySelectorAll('.tutorial-nav-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const section = btn.dataset.section;
        goToTutorialSection(section);
    });
});

// Make applyInsight available globally
window.applyInsight = applyInsight;

// Initialize on load
if (localStorage.getItem('lawPracticeGameState')) {
    elements.continueGameBtn.style.display = 'inline-block';
} else {
    elements.continueGameBtn.style.display = 'none';
}

