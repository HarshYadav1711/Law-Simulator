# Contributing to Law Practice Simulator

Thank you for your interest in contributing to Law Practice Simulator! This document provides guidelines and instructions for contributing to the project.

## Code of Conduct

- Be respectful and inclusive
- Provide constructive feedback
- Help maintain code quality
- Follow the project's coding standards

## How to Contribute

### Reporting Bugs

If you find a bug, please open an issue with:
- **Title**: Clear, descriptive title
- **Description**: Detailed explanation of the bug
- **Steps to Reproduce**: Step-by-step instructions
- **Expected Behavior**: What should happen
- **Actual Behavior**: What actually happens
- **Browser/OS**: Your browser and operating system
- **Screenshots**: If applicable

### Suggesting Features

Feature suggestions are welcome! Please include:
- **Use Case**: Why this feature would be useful
- **Proposed Solution**: How you envision it working
- **Alternatives**: Other approaches you've considered

### Pull Requests

1. **Fork the repository**
2. **Create a feature branch**:
   ```bash
   git checkout -b feature/your-feature-name
   ```

3. **Make your changes**:
   - Follow the existing code style
   - Add comments for complex logic
   - Update documentation if needed

4. **Test your changes**:
   - Test in multiple browsers
   - Verify game state persistence
   - Check for console errors

5. **Commit your changes**:
   ```bash
   git commit -m "Add: Description of your changes"
   ```
   Use clear, descriptive commit messages.

6. **Push to your fork**:
   ```bash
   git push origin feature/your-feature-name
   ```

7. **Open a Pull Request**:
   - Provide a clear description
   - Reference any related issues
   - Include screenshots if UI changes

## Coding Standards

### JavaScript

- Use meaningful variable names
- Add comments for complex logic
- Follow existing code structure
- Keep functions focused and small

**Example**:
```javascript
// Good
function calculateCaseReward(baseReward, evidenceCount) {
    const evidenceBonus = evidenceCount * 50;
    return baseReward + evidenceBonus;
}

// Avoid
function calc(r, e) {
    return r + e * 50;
}
```

### HTML

- Use semantic HTML elements
- Maintain proper indentation
- Add descriptive IDs and classes
- Keep structure consistent

### CSS

- Use consistent naming conventions
- Group related styles together
- Add comments for complex layouts
- Follow existing color scheme

**Example**:
```css
/* Good */
.stat-item {
    display: flex;
    flex-direction: column;
    align-items: center;
}

/* Avoid */
.stat-item { display: flex; flex-direction: column; align-items: center; }
```

## Project Structure

```
law-simulator/
├── index.html      # Main HTML structure
├── game.js         # Game logic (2000+ lines)
├── styles.css      # Styling
├── README.md       # Project documentation
├── ARCHITECTURE.md # Technical documentation
└── CONTRIBUTING.md # This file
```

## Areas for Contribution

### High Priority
- **Bug Fixes**: Fix existing issues
- **Performance**: Optimize game performance
- **Mobile Support**: Improve mobile responsiveness
- **Accessibility**: Improve accessibility features

### Medium Priority
- **New Cases**: Add more case scenarios
- **New Upgrades**: Add office upgrade options
- **New Achievements**: Add achievement types
- **UI Improvements**: Enhance user interface

### Low Priority
- **Code Refactoring**: Improve code organization
- **Documentation**: Expand documentation
- **Testing**: Add test coverage
- **Localization**: Add multi-language support

## Adding New Cases

When adding new cases, follow this structure:

```javascript
{
    id: 7,  // Next available ID
    title: "Case Title",
    difficulty: "medium",  // "easy", "medium", or "hard"
    description: "Detailed case description...",
    decisions: [
        {
            id: "d19",
            title: "Decision Title",
            description: "Decision description...",
            effects: {
                reputation: 5,
                ethicsScore: 3,
                justiceScore: 2,
                kindnessScore: 1
            },
            outcome: "Outcome description..."
        }
        // Add 2-3 decisions per case
    ],
    storyText: "Narrative text that appears in story panel"
}
```

**Guidelines**:
- Ensure decisions have meaningful trade-offs
- Balance stat effects appropriately
- Write engaging story text
- Test case flow thoroughly

## Adding New Upgrades

```javascript
{
    id: 'unique-id',
    name: 'Upgrade Name',
    description: 'Clear description of what it does',
    cost: 5000,  // Reasonable cost
    category: 'staff',  // 'staff', 'facility', 'equipment', 'decoration', 'service'
    effect: {
        reputationBonus: 5,
        energyBonus: 10,
        // Other effects
    }
}
```

**Guidelines**:
- Balance costs with benefits
- Ensure effects are meaningful
- Test upgrade purchase flow
- Verify effects apply correctly

## Adding New Achievements

```javascript
{
    id: 'achievement-id',
    name: 'Achievement Name',
    description: 'What player needs to do',
    icon: '🏆',  // Emoji icon
    check: function() {
        // Return boolean based on gameState
        return gameState.casesWon >= 10;
    }
}
```

**Guidelines**:
- Make achievements achievable
- Provide clear descriptions
- Use appropriate icons
- Test unlock conditions

## Testing Your Changes

### Manual Testing Checklist

- [ ] Game starts correctly
- [ ] Cases progress through all phases
- [ ] Decisions apply effects correctly
- [ ] State saves and loads properly
- [ ] Upgrades work as expected
- [ ] Achievements unlock correctly
- [ ] No console errors
- [ ] UI displays correctly
- [ ] Mobile responsiveness (if UI changes)

### Browser Testing

Test in at least:
- Chrome (latest)
- Firefox (latest)
- Safari (if available)
- Edge (latest)

## Code Review Process

1. **Automated Checks**: Ensure no syntax errors
2. **Manual Review**: Maintainer reviews code
3. **Testing**: Changes are tested
4. **Feedback**: Suggestions provided if needed
5. **Merge**: Approved changes are merged

## Questions?

If you have questions:
- Open an issue with the "question" label
- Check existing issues for similar questions
- Review the documentation files

## License

By contributing, you agree that your contributions will be licensed under the same license as the project (MIT License).

Thank you for contributing to Law Practice Simulator! 🎉

