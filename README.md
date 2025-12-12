# Law Practice Simulator

A browser-based simulation game where you play as a criminal lawyer building your practice, handling cases, and making ethical decisions that shape your career.

![Game Screenshot](https://via.placeholder.com/800x400/667eea/ffffff?text=Law+Practice+Simulator)

## 🎮 Overview

Law Practice Simulator is an interactive web-based game that puts you in the shoes of a young criminal lawyer. Navigate through complex cases, make strategic decisions, manage resources, and build your reputation in the legal world. Every choice you make affects your career trajectory, ethics score, and the outcomes of your cases.

## ✨ Features

### Core Gameplay
- **Case Management System**: Handle cases through 5 distinct phases:
  - Client Meeting: Interact with clients and build rapport
  - Investigation: Search locations to collect evidence
  - Preparation: Choose your defense strategy
  - Trial: Present evidence and cross-examine witnesses
  - Decision: Make critical choices that determine case outcomes

- **Resource Management**:
  - **Reputation** (0-100): Your standing in the legal community
  - **Money**: Earn from cases, spend on office upgrades
  - **Energy**: Required for investigations and taking cases
  - **Core Values**: Ethics, Justice, and Kindness scores

- **Psychology Insights**: Unlock special abilities as you progress:
  - Body Language Reading
  - Jury Persuasion
  - Client Calming
  - Ethical Clarity
  - Truth Detection

- **Office Management**: Purchase upgrades to improve your practice:
  - Staff & Personnel (Assistants, Paralegals, Partners)
  - Facilities (Library, Conference Room, Penthouse Office)
  - Equipment (Technology, Security Systems)
  - Decorations (Artwork, Plants)
  - Services (Catering)

- **Achievement System**: 20 unique achievements to unlock
- **Tutorial System**: Comprehensive in-game tutorial
- **Save System**: Automatic local storage of game progress

## 🚀 Getting Started

### Prerequisites
- A modern web browser (Chrome, Firefox, Safari, Edge)
- No additional dependencies or installation required

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/law-simulator.git
cd law-simulator
```

2. Open `index.html` in your web browser:
   - Simply double-click the file, or
   - Use a local web server (recommended):
     ```bash
     # Using Python 3
     python -m http.server 8000
     
     # Using Node.js (http-server)
     npx http-server
     
     # Using PHP
     php -S localhost:8000
     ```

3. Navigate to `http://localhost:8000` in your browser

## 📖 How to Play

### Starting Your Practice

1. Click **"Start New Game"** to begin your journey
2. Review the tutorial (accessible via the 📚 Tutorial button)
3. Click **"Take New Case"** to start your first case

### Case Phases

1. **Client Meeting**: Choose how to interact with your client
   - Reassure: Increases kindness and client satisfaction
   - Professional: Boosts reputation
   - Direct: Enhances justice and ethics scores

2. **Investigation**: Search locations to collect evidence
   - Each location costs energy (10-20 points)
   - More evidence = better case outcomes
   - Office upgrades can reduce energy costs

3. **Preparation**: Select your defense strategy
   - Aggressive Defense: High risk, high reward
   - Evidence-Based Defense: Reliable and ethical
   - Emotional Appeal: Connects with the jury

4. **Trial**: Present your case
   - Present Evidence: Use collected evidence
   - Cross-Examine Witness: Challenge prosecution
   - Make Closing Statement: Summarize your defense

5. **Decision**: Make the final choice
   - Each decision affects your stats differently
   - Ethical choices (green border) boost ethics/justice
   - Consider long-term consequences

### Managing Resources

- **Reputation**: Increases with successful cases and good decisions
- **Money**: Earn from winning cases; spend on office upgrades
- **Energy**: Regenerates after completing cases
- **Core Values**: Unlock psychology insights and affect story paths

### Office Upgrades

Visit **"My Office"** to purchase upgrades:
- Reduce energy costs
- Increase reputation gains
- Boost client satisfaction
- Increase maximum energy capacity

### Psychology Insights

Unlock special abilities by:
- Winning cases
- Reaching specific score thresholds
- Building your core values

Use insights during cases for strategic advantages.

## 🎯 Game Mechanics

### Case Difficulty Levels
- **Easy**: Available from Level 1
- **Medium**: Available from Level 2
- **Hard**: Available from Level 3

### Leveling System
- Level up every 3 cases won
- Higher levels unlock more challenging cases

### Win Conditions
A case is won if:
- Decision results in positive reputation gain, OR
- Justice score increases by 5+, OR
- Ethics score increases by 5+

### Energy System
- Starting energy: 100
- Taking a case: -20 energy (reduced by upgrades)
- Investigation locations: -10 to -20 energy each
- Regeneration: +30 energy after case completion (bonuses from upgrades)

## 🏆 Achievements

There are 20 achievements to unlock, including:
- **First Victory**: Win your first case
- **Ethical Champion**: Reach 50 ethics score
- **Master Lawyer**: Win 10 cases
- **Perfect Score**: Reach 100 reputation
- **Psychology Master**: Unlock all psychology insights
- And 15 more!

## 🛠️ Technical Details

### Technology Stack
- **HTML5**: Structure and content
- **CSS3**: Styling and animations
- **Vanilla JavaScript**: Game logic and interactivity
- **LocalStorage API**: Save game state

### Browser Compatibility
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

### File Structure
```
law-simulator/
├── index.html      # Main HTML structure
├── game.js         # Game logic and state management
├── styles.css      # Styling and animations
└── README.md       # This file
```

## 🎨 Customization

### Adding New Cases
Edit the `cases` array in `game.js`:
```javascript
{
    id: 7,
    title: "Your Case Title",
    difficulty: "medium",
    description: "Case description...",
    decisions: [...],
    storyText: "Story text..."
}
```

### Adding New Upgrades
Edit the `officeUpgrades` array in `game.js`:
```javascript
{
    id: 'upgrade-id',
    name: 'Upgrade Name',
    description: 'Description...',
    cost: 5000,
    category: 'staff',
    effect: { reputationBonus: 5 }
}
```

### Modifying Psychology Insights
Edit the `psychologyInsights` array in `game.js`:
```javascript
{
    id: "insight-id",
    name: "Insight Name",
    description: "Description...",
    unlockCondition: { casesWon: 5 }
}
```

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

### Contribution Guidelines
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 🐛 Known Issues

- Game state is stored locally; clearing browser data will reset progress
- Some achievements may not trigger correctly on first playthrough
- Mobile responsiveness could be improved

## 🔮 Future Enhancements

- [ ] Multiplayer/leaderboard system
- [ ] Additional case types and storylines
- [ ] Sound effects and background music
- [ ] Cloud save functionality
- [ ] Mobile app version
- [ ] More complex case mechanics
- [ ] Client relationship system
- [ ] Courtroom mini-games

## 📧 Contact

For questions, suggestions, or support, please open an issue on GitHub.

## 🙏 Acknowledgments

- Inspired by legal simulation games
- Built with vanilla JavaScript for simplicity and performance
- UI design inspired by modern web applications

---

**Enjoy building your legal practice and fighting for justice!** ⚖️

