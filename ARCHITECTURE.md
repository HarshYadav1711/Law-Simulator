# Architecture Documentation

## Overview

Law Practice Simulator is a client-side web application built with vanilla JavaScript, HTML5, and CSS3. The game uses a modular architecture with clear separation of concerns between game state, UI management, and game logic.

## System Architecture

```
┌─────────────────────────────────────────┐
│           User Interface                │
│  (HTML/CSS - index.html, styles.css)   │
└─────────────────┬───────────────────────┘
                  │
                  ▼
┌─────────────────────────────────────────┐
│        Game Logic Layer                 │
│         (game.js)                        │
│  ┌───────────────────────────────────┐  │
│  │   Game State Management           │  │
│  │   - gameState object              │  │
│  │   - LocalStorage persistence      │  │
│  └───────────────────────────────────┘  │
│  ┌───────────────────────────────────┐  │
│  │   Case System                     │  │
│  │   - Case generation               │  │
│  │   - Phase management              │  │
│  │   - Decision processing           │  │
│  └───────────────────────────────────┘  │
│  ┌───────────────────────────────────┐  │
│  │   Resource Management             │  │
│  │   - Stats tracking                │  │
│  │   - Energy system                 │  │
│  │   - Money system                  │  │
│  └───────────────────────────────────┘  │
│  ┌───────────────────────────────────┐  │
│  │   Progression Systems             │  │
│  │   - Achievements                  │  │
│  │   - Psychology Insights            │  │
│  │   - Office Upgrades               │  │
│  └───────────────────────────────────┘  │
└─────────────────────────────────────────┘
                  │
                  ▼
┌─────────────────────────────────────────┐
│        Data Layer                       │
│  - Cases database                       │
│  - Upgrades database                    │
│  - Achievements database                │
│  - Insights database                    │
└─────────────────────────────────────────┘
```

## Core Components

### 1. Game State Management

**Location**: `game.js` - `gameState` object

The game state is a centralized object that tracks all player progress:

```javascript
gameState = {
    reputation: 50,           // Player reputation (0-100)
    casesWon: 0,              // Total cases won
    level: 1,                 // Current level
    psychologyInsights: [],   // Unlocked insights
    currentCase: null,        // Active case object
    caseHistory: [],          // Completed case IDs
    ethicsScore: 0,          // Ethics value
    justiceScore: 0,          // Justice value
    kindnessScore: 0,         // Kindness value
    money: 5000,              // Available funds
    energy: 100,              // Current energy
    // ... additional state
}
```

**Persistence**: Game state is saved to `localStorage` after every significant action using `saveGameState()`.

### 2. Case System

#### Case Structure
```javascript
{
    id: number,              // Unique identifier
    title: string,           // Case name
    difficulty: string,     // "easy" | "medium" | "hard"
    description: string,     // Case description
    decisions: Array,        // Available decisions
    storyText: string        // Narrative text
}
```

#### Case Phases
1. **Client Meeting** (`startClientMeeting()`)
   - Dialogue system
   - Response options affect stats

2. **Investigation** (`startInvestigationPhase()`)
   - Location-based evidence collection
   - Energy cost per location
   - Evidence tracking

3. **Preparation** (`startPreparationPhase()`)
   - Strategy selection
   - Affects trial outcomes

4. **Trial** (`startTrialPhase()`)
   - Courtroom interactions
   - Evidence presentation
   - Cross-examination

5. **Decision** (`startDecisionPhase()`)
   - Final choice selection
   - Outcome calculation
   - Stat updates

### 3. Decision System

Decisions are structured as:
```javascript
{
    id: string,
    title: string,
    description: string,
    effects: {
        reputation: number,
        ethicsScore: number,
        justiceScore: number,
        kindnessScore: number
    },
    outcome: string
}
```

**Decision Processing** (`makeDecision()`):
1. Apply stat effects
2. Calculate earnings
3. Determine win/loss
4. Update game state
5. Show outcome modal

### 4. Resource Management

#### Reputation System
- Range: 0-100
- Affects case availability
- Increases with successful cases
- Decreases with unethical choices

#### Money System
- Earned from winning cases
- Base reward + evidence bonus
- Spent on office upgrades
- Monthly expenses reduce income

#### Energy System
- Required for investigations
- Regenerates after cases
- Can be increased with upgrades
- Costs reduced by staff upgrades

### 5. Psychology Insights

**Unlock Conditions**:
- Win-based: `casesWon >= X`
- Score-based: `ethicsScore >= X`, etc.

**Usage**:
- Activated during cases
- Provides stat bonuses
- Temporary effects per case

### 6. Office Upgrade System

**Upgrade Categories**:
- Staff & Personnel
- Facilities
- Equipment
- Decorations
- Services

**Upgrade Effects**:
- Stat bonuses (reputation, energy)
- Cost reductions (energy, expenses)
- Quality improvements (client satisfaction)

### 7. Achievement System

**Achievement Structure**:
```javascript
{
    id: string,
    name: string,
    description: string,
    icon: string,
    check: function()  // Returns boolean
}
```

**Tracking**:
- Checked after every significant action
- Stored in `gameState.achievements`
- Visual feedback on unlock

## Data Flow

### Case Flow
```
Take Case → Client Meeting → Investigation → 
Preparation → Trial → Decision → Outcome → 
State Update → Save → UI Update
```

### Decision Flow
```
User Selects Decision → Apply Effects → 
Calculate Outcome → Update Stats → 
Check Achievements → Check Insights → 
Save State → Show Modal → Update UI
```

### Upgrade Flow
```
User Clicks Upgrade → Check Affordability → 
Deduct Money → Apply Effects → 
Update State → Save → Update Display
```

## UI Management

### Element References
All DOM elements are cached in the `elements` object for efficient access:
```javascript
elements = {
    mainMenu: document.getElementById('main-menu'),
    gameScreen: document.getElementById('game-screen'),
    // ... all UI elements
}
```

### Panel Management
- Panels are shown/hidden using CSS classes
- `hideAllPanels()` manages panel visibility
- Phase indicators track case progress

### Modal System
- Outcome modal: Shows case results
- Insight modal: Shows unlocked abilities
- Office modal: Upgrade management
- Achievements modal: Progress tracking
- Tutorial modal: Game instructions

## State Persistence

### LocalStorage Structure
```javascript
{
    "lawPracticeGameState": JSON.stringify(gameState)
}
```

### Save Triggers
- After case completion
- After upgrade purchase
- After achievement unlock
- After insight unlock
- After stat changes

### Load Process
1. Check for saved state on page load
2. Parse JSON from localStorage
3. Merge with default state
4. Update UI
5. Check for unlocks

## Performance Considerations

### Optimization Strategies
1. **DOM Caching**: Elements stored in `elements` object
2. **Event Delegation**: Efficient event handling
3. **Lazy Loading**: Modals only rendered when needed
4. **State Management**: Single source of truth
5. **Minimal Re-renders**: Update only changed elements

### Memory Management
- Game state is serialized/deserialized efficiently
- No memory leaks from event listeners
- LocalStorage size is minimal

## Extension Points

### Adding New Cases
1. Add case object to `cases` array
2. Define decisions with effects
3. Set difficulty level
4. Add story text

### Adding New Upgrades
1. Add upgrade object to `officeUpgrades` array
2. Define category and effects
3. Set cost
4. Update `purchaseUpgrade()` if needed

### Adding New Achievements
1. Add achievement object to `achievements` array
2. Define check function
3. Add icon and description

### Adding New Insights
1. Add insight object to `psychologyInsights` array
2. Define unlock condition
3. Implement effect in `applyInsight()`

## Security Considerations

### Client-Side Only
- All game logic runs client-side
- No server-side validation
- LocalStorage can be manipulated
- Consider this for future cloud save implementation

### Data Validation
- Input validation for user actions
- State bounds checking (e.g., reputation 0-100)
- Energy cost validation

## Testing Strategy

### Manual Testing Checklist
- [ ] Case progression through all phases
- [ ] Decision effects applied correctly
- [ ] State persistence works
- [ ] Achievements unlock properly
- [ ] Upgrades apply effects correctly
- [ ] Energy system functions
- [ ] UI updates correctly

### Future Testing Improvements
- Unit tests for game logic
- Integration tests for case flow
- UI automation tests
- Performance benchmarks

## Browser Compatibility

### Supported Features
- ES6+ JavaScript
- CSS Grid and Flexbox
- LocalStorage API
- Modern DOM APIs

### Polyfills Needed
- None currently (vanilla JS approach)

## Future Architecture Improvements

1. **Modularization**: Split `game.js` into modules
   - `state.js`: State management
   - `cases.js`: Case system
   - `ui.js`: UI management
   - `storage.js`: Persistence

2. **State Management**: Consider a state management pattern
   - Observer pattern for state changes
   - Event-driven architecture

3. **Build System**: Add build tools
   - Bundler (Webpack, Vite)
   - Minification
   - Code splitting

4. **Type Safety**: Add TypeScript
   - Type definitions
   - Better IDE support
   - Compile-time error checking

