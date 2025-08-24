// App Generator JavaScript
class AppGenerator {
    constructor() {
        this.initializeElements();
        this.bindEvents();
        this.currentGeneratedApp = null;
    }

    initializeElements() {
        this.generateBtn = document.getElementById('generateBtn');
        this.outputSection = document.getElementById('outputSection');
        this.appTypeSelect = document.getElementById('appType');
        this.techStackCheckboxes = document.querySelectorAll('.tech-option input[type="checkbox"]');
        this.appDescription = document.getElementById('appDescription');
        this.appName = document.getElementById('appName');
        this.appCategory = document.getElementById('appCategory');
        
        // Output elements
        this.generatedAppName = document.getElementById('generatedAppName');
        this.generatedAppType = document.getElementById('generatedAppType');
        this.generatedAppCategory = document.getElementById('generatedAppCategory');
        this.structureCode = document.getElementById('structureCode');
        this.mainCode = document.getElementById('mainCode');
        this.dependenciesCode = document.getElementById('dependenciesCode');
        this.instructionsContent = document.getElementById('instructionsContent');
        
        // Action buttons
        this.downloadBtn = document.getElementById('downloadBtn');
        this.previewBtn = document.getElementById('previewBtn');
        this.regenerateBtn = document.getElementById('regenerateBtn');
        
        // Tab elements
        this.tabButtons = document.querySelectorAll('.tab-btn');
        this.tabPanes = document.querySelectorAll('.tab-pane');
    }

    bindEvents() {
        this.generateBtn.addEventListener('click', () => this.generateApp());
        this.downloadBtn.addEventListener('click', () => this.downloadProject());
        this.previewBtn.addEventListener('click', () => this.previewApp());
        this.regenerateBtn.addEventListener('click', () => this.regenerateApp());
        
        // Tab switching
        this.tabButtons.forEach(btn => {
            btn.addEventListener('click', (e) => this.switchTab(e.target.dataset.tab));
        });
    }

    async generateApp() {
        const appData = this.getFormData();
        
        if (!this.validateForm(appData)) {
            return;
        }

        this.showLoading();
        
        try {
            // Simulate API call delay
            await new Promise(resolve => setTimeout(resolve, 2000));
            
            const generatedApp = this.generateAppCode(appData);
            this.displayGeneratedApp(generatedApp);
            this.currentGeneratedApp = generatedApp;
            
            this.showSuccess();
        } catch (error) {
            this.showError('Failed to generate app. Please try again.');
        }
    }

    getFormData() {
        const selectedTechs = Array.from(this.techStackCheckboxes)
            .filter(cb => cb.checked)
            .map(cb => cb.value);

        return {
            appType: this.appTypeSelect.value,
            techStack: selectedTechs,
            description: this.appDescription.value.trim(),
            name: this.appName.value.trim(),
            category: this.appCategory.value
        };
    }

    validateForm(data) {
        if (!data.description) {
            this.showError('Please provide a description of your app.');
            return false;
        }
        
        if (!data.name) {
            this.showError('Please provide an app name.');
            return false;
        }
        
        if (data.techStack.length === 0) {
            this.showError('Please select at least one technology.');
            return false;
        }
        
        return true;
    }

    generateAppCode(appData) {
        const templates = this.getAppTemplates(appData);
        
        return {
            ...appData,
            structure: templates.structure,
            mainCode: templates.mainCode,
            dependencies: templates.dependencies,
            instructions: templates.instructions,
            timestamp: new Date().toISOString()
        };
    }

    getAppTemplates(appData) {
        const baseTemplates = {
            web: this.getWebAppTemplate(appData),
            mobile: this.getMobileAppTemplate(appData),
            desktop: this.getDesktopAppTemplate(appData),
            api: this.getApiTemplate(appData),
            game: this.getGameTemplate(appData),
            tool: this.getToolTemplate(appData)
        };

        return baseTemplates[appData.appType] || baseTemplates.web;
    }

    getWebAppTemplate(appData) {
        const hasReact = appData.techStack.includes('react');
        const hasVue = appData.techStack.includes('vue');
        const hasAngular = appData.techStack.includes('angular');
        const hasNode = appData.techStack.includes('node');

        let structure = '';
        let mainCode = '';
        let dependencies = '';

        if (hasReact) {
            structure = `my-${appData.name.toLowerCase().replace(/\s+/g, '-')}/
├── public/
│   ├── index.html
│   └── favicon.ico
├── src/
│   ├── components/
│   │   ├── Header.jsx
│   │   ├── Footer.jsx
│   │   └── MainContent.jsx
│   ├── pages/
│   │   └── Home.jsx
│   ├── styles/
│   │   └── App.css
│   ├── utils/
│   │   └── helpers.js
│   ├── App.jsx
│   └── index.js
├── package.json
├── README.md
└── .gitignore`;

            mainCode = `import React from 'react';
import './styles/App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import MainContent from './components/MainContent';

function App() {
  return (
    <div className="App">
      <Header />
      <main className="main-content">
        <MainContent />
      </main>
      <Footer />
    </div>
  );
}

export default App;`;

            dependencies = `{
  "name": "${appData.name.toLowerCase().replace(/\s+/g, '-')}",
  "version": "1.0.0",
  "description": "${appData.description}",
  "main": "index.js",
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject"
  },
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-scripts": "5.0.1"
  },
  "devDependencies": {
    "@testing-library/jest-dom": "^5.16.5",
    "@testing-library/react": "^13.4.0",
    "@testing-library/user-event": "^14.4.3"
  },
  "browserslist": {
    "production": [
      ">0.2%",
      "not dead",
      "not op_mini all"
    ],
    "development": [
      "last 1 chrome version",
      "last 1 firefox version",
      "last 1 safari version"
    ]
  }
}`;
        } else if (hasVue) {
            structure = `my-${appData.name.toLowerCase().replace(/\s+/g, '-')}/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── Header.vue
│   │   ├── Footer.vue
│   │   └── MainContent.vue
│   ├── views/
│   │   └── Home.vue
│   ├── assets/
│   │   └── logo.png
│   ├── App.vue
│   └── main.js
├── package.json
├── README.md
└── .gitignore`;

            mainCode = `<template>
  <div id="app">
    <Header />
    <main class="main-content">
      <MainContent />
    </main>
    <Footer />
  </div>
</template>

<script>
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'
import MainContent from './components/MainContent.vue'

export default {
  name: 'App',
  components: {
    Header,
    Footer,
    MainContent
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>`;

            dependencies = `{
  "name": "${appData.name.toLowerCase().replace(/\s+/g, '-')}",
  "version": "1.0.0",
  "description": "${appData.description}",
  "main": "index.js",
  "scripts": {
    "serve": "vue-cli-service serve",
    "build": "vue-cli-service build",
    "lint": "vue-cli-service lint"
  },
  "dependencies": {
    "vue": "^3.2.0",
    "vue-router": "^4.0.0"
  },
  "devDependencies": {
    "@vue/cli-service": "^5.0.0",
    "@vue/compiler-sfc": "^3.2.0"
  }
}`;
        }

        const instructions = `# Setup Instructions for ${appData.name}

## Prerequisites
- Node.js (v14 or higher)
- npm or yarn

## Installation Steps

1. **Create the project directory:**
   \`\`\`bash
   mkdir my-${appData.name.toLowerCase().replace(/\s+/g, '-')}
   cd my-${appData.name.toLowerCase().replace(/\s+/g, '-')}
   \`\`\`

2. **Initialize the project:**
   \`\`\`bash
   npm init -y
   \`\`\`

3. **Install dependencies:**
   \`\`\`bash
   npm install
   \`\`\`

4. **Start the development server:**
   \`\`\`bash
   npm start
   \`\`\`

5. **Open your browser and navigate to:**
   \`http://localhost:3000\`

## Project Structure
The generated project follows a standard structure with:
- Components for reusable UI elements
- Pages for different views
- Styles for CSS organization
- Utils for helper functions

## Customization
- Edit the components in the \`src/components/\` directory
- Modify styles in \`src/styles/\`
- Add new pages in \`src/pages/\`
- Update the main App component as needed

## Building for Production
\`\`\`bash
npm run build
\`\`\`

This will create an optimized production build in the \`build\` folder.`;

        return { structure, mainCode, dependencies, instructions };
    }

    getMobileAppTemplate(appData) {
        const hasFlutter = appData.techStack.includes('flutter');
        
        if (hasFlutter) {
            return {
                structure: `my_${appData.name.toLowerCase().replace(/\s+/g, '_')}/
├── android/
├── ios/
├── lib/
│   ├── main.dart
│   ├── screens/
│   │   └── home_screen.dart
│   ├── widgets/
│   │   ├── custom_app_bar.dart
│   │   └── custom_button.dart
│   └── utils/
│       └── constants.dart
├── assets/
│   └── images/
├── pubspec.yaml
└── README.md`,
                mainCode: `import 'package:flutter/material.dart';
import 'screens/home_screen.dart';

void main() {
  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: '${appData.name}',
      theme: ThemeData(
        primarySwatch: Colors.blue,
        visualDensity: VisualDensity.adaptivePlatformDensity,
      ),
      home: HomeScreen(),
    );
  }
}`,
                dependencies: `name: my_${appData.name.toLowerCase().replace(/\s+/g, '_')}
description: ${appData.description}
version: 1.0.0+1

environment:
  sdk: ">=2.12.0 <3.0.0"

dependencies:
  flutter:
    sdk: flutter
  cupertino_icons: ^1.0.2

dev_dependencies:
  flutter_test:
    sdk: flutter
  flutter_lints: ^1.0.0

flutter:
  uses-material-design: true`,
                instructions: `# Flutter App Setup Instructions

## Prerequisites
- Flutter SDK installed
- Android Studio or VS Code with Flutter extensions
- Android emulator or physical device

## Setup Steps
1. Create the project: \`flutter create my_${appData.name.toLowerCase().replace(/\s+/g, '_')}\`
2. Navigate to project: \`cd my_${appData.name.toLowerCase().replace(/\s+/g, '_')}\`
3. Replace the generated code with the provided code
4. Run: \`flutter run\``
            };
        }
        
        return this.getWebAppTemplate(appData); // Fallback
    }

    getDesktopAppTemplate(appData) {
        return {
            structure: `my-${appData.name.toLowerCase().replace(/\s+/g, '-')}/
├── src/
│   ├── main.js
│   ├── renderer.js
│   └── preload.js
├── public/
│   └── index.html
├── package.json
└── README.md`,
            mainCode: `const { app, BrowserWindow } = require('electron');
const path = require('path');

function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js')
    }
  });

  mainWindow.loadFile('public/index.html');
}

app.whenReady().then(() => {
  createWindow();
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});`,
            dependencies: `{
  "name": "${appData.name.toLowerCase().replace(/\s+/g, '-')}",
  "version": "1.0.0",
  "description": "${appData.description}",
  "main": "src/main.js",
  "scripts": {
    "start": "electron .",
    "build": "electron-builder"
  },
  "dependencies": {
    "electron": "^20.0.0"
  },
  "devDependencies": {
    "electron-builder": "^23.0.0"
  }
}`,
            instructions: `# Electron Desktop App Setup

## Prerequisites
- Node.js installed
- npm or yarn

## Setup Steps
1. Create project directory
2. Run \`npm install\`
3. Run \`npm start\` to launch the app
4. Use \`npm run build\` to create distributable packages`
        };
    }

    getApiTemplate(appData) {
        const hasNode = appData.techStack.includes('node');
        const hasPython = appData.techStack.includes('python');
        
        if (hasNode) {
            return {
                structure: `my-${appData.name.toLowerCase().replace(/\s+/g, '-')}-api/
├── src/
│   ├── routes/
│   │   └── index.js
│   ├── controllers/
│   │   └── mainController.js
│   ├── models/
│   │   └── index.js
│   ├── middleware/
│   │   └── auth.js
│   ├── config/
│   │   └── database.js
│   └── app.js
├── package.json
├── .env
└── README.md`,
                mainCode: `const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const routes = require('./src/routes');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());

// Routes
app.use('/api', routes);

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

app.listen(PORT, () => {
  console.log(\`Server running on port \${PORT}\`);
});`,
                dependencies: `{
  "name": "${appData.name.toLowerCase().replace(/\s+/g, '-')}-api",
  "version": "1.0.0",
  "description": "${appData.description}",
  "main": "src/app.js",
  "scripts": {
    "start": "node src/app.js",
    "dev": "nodemon src/app.js",
    "test": "jest"
  },
  "dependencies": {
    "express": "^4.18.0",
    "cors": "^2.8.5",
    "helmet": "^6.0.0",
    "dotenv": "^16.0.0"
  },
  "devDependencies": {
    "nodemon": "^2.0.0",
    "jest": "^28.0.0"
  }
}`,
                instructions: `# Node.js API Setup

## Prerequisites
- Node.js installed
- npm or yarn

## Setup Steps
1. Create project directory
2. Run \`npm install\`
3. Create \`.env\` file with your configuration
4. Run \`npm run dev\` for development
5. Run \`npm start\` for production`
            };
        }
        
        return this.getWebAppTemplate(appData); // Fallback
    }

    getGameTemplate(appData) {
        return {
            structure: `my-${appData.name.toLowerCase().replace(/\s+/g, '-')}-game/
├── src/
│   ├── game.js
│   ├── player.js
│   ├── enemy.js
│   └── utils.js
├── assets/
│   ├── images/
│   └── sounds/
├── index.html
├── style.css
├── package.json
└── README.md`,
            mainCode: `class Game {
  constructor() {
    this.canvas = document.getElementById('gameCanvas');
    this.ctx = this.canvas.getContext('2d');
    this.player = new Player(100, 100);
    this.enemies = [];
    this.score = 0;
    this.gameLoop();
  }

  gameLoop() {
    this.update();
    this.render();
    requestAnimationFrame(() => this.gameLoop());
  }

  update() {
    this.player.update();
    this.enemies.forEach(enemy => enemy.update());
  }

  render() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.player.render(this.ctx);
    this.enemies.forEach(enemy => enemy.render(this.ctx));
  }
}

// Initialize game when page loads
window.addEventListener('load', () => {
  new Game();
});`,
            dependencies: `{
  "name": "${appData.name.toLowerCase().replace(/\s+/g, '-')}-game",
  "version": "1.0.0",
  "description": "${appData.description}",
  "main": "index.html",
  "scripts": {
    "start": "http-server -p 8000",
    "build": "echo 'Game is ready to play!'"
  },
  "devDependencies": {
    "http-server": "^14.0.0"
  }
}`,
            instructions: `# HTML5 Game Setup

## Prerequisites
- Modern web browser
- Local web server (optional)

## Setup Steps
1. Open index.html in a web browser
2. Or run \`npm start\` to serve locally
3. Game will start automatically

## Controls
- Use arrow keys or WASD to move
- Click to interact
- Press Space to pause/resume`
        };
    }

    getToolTemplate(appData) {
        return {
            structure: `my-${appData.name.toLowerCase().replace(/\s+/g, '-')}-tool/
├── src/
│   ├── main.py
│   ├── utils.py
│   └── config.py
├── requirements.txt
├── README.md
└── .gitignore`,
            mainCode: `#!/usr/bin/env python3
"""
${appData.name} - ${appData.description}
"""

import argparse
import sys
from utils import process_data, format_output

def main():
    parser = argparse.ArgumentParser(description='${appData.description}')
    parser.add_argument('input', help='Input file or data')
    parser.add_argument('-o', '--output', help='Output file')
    parser.add_argument('-v', '--verbose', action='store_true', help='Verbose output')
    
    args = parser.parse_args()
    
    try:
        result = process_data(args.input)
        output = format_output(result)
        
        if args.output:
            with open(args.output, 'w') as f:
                f.write(output)
        else:
            print(output)
            
    except Exception as e:
        if args.verbose:
            raise
        print(f"Error: {e}", file=sys.stderr)
        sys.exit(1)

if __name__ == '__main__':
    main()`,
            dependencies: `# Python Tool Dependencies

# Core dependencies
click>=8.0.0
requests>=2.25.0
pandas>=1.3.0

# Development dependencies
pytest>=6.0.0
black>=21.0.0
flake8>=3.9.0`,
            instructions: `# Python Tool Setup

## Prerequisites
- Python 3.7 or higher
- pip package manager

## Setup Steps
1. Create virtual environment: \`python -m venv venv\`
2. Activate virtual environment:
   - Windows: \`venv\\Scripts\\activate\`
   - Unix/MacOS: \`source venv/bin/activate\`
3. Install dependencies: \`pip install -r requirements.txt\`
4. Run the tool: \`python src/main.py --help\`

## Usage
\`\`\`bash
python src/main.py input_data -o output.txt
\`\`\``
        };
    }

    displayGeneratedApp(app) {
        this.generatedAppName.textContent = app.name;
        this.generatedAppType.textContent = this.formatAppType(app.appType);
        this.generatedAppCategory.textContent = this.formatCategory(app.category);
        
        this.structureCode.textContent = app.structure;
        this.mainCode.textContent = app.mainCode;
        this.dependenciesCode.textContent = app.dependencies;
        this.instructionsContent.innerHTML = app.instructions.replace(/\n/g, '<br>');
        
        this.outputSection.style.display = 'block';
        this.outputSection.scrollIntoView({ behavior: 'smooth' });
    }

    formatAppType(type) {
        const types = {
            web: 'Web Application',
            mobile: 'Mobile App',
            desktop: 'Desktop Application',
            api: 'API/Backend',
            game: 'Game',
            tool: 'Utility Tool'
        };
        return types[type] || type;
    }

    formatCategory(category) {
        return category.charAt(0).toUpperCase() + category.slice(1);
    }

    switchTab(tabName) {
        // Remove active class from all tabs and panes
        this.tabButtons.forEach(btn => btn.classList.remove('active'));
        this.tabPanes.forEach(pane => pane.classList.remove('active'));
        
        // Add active class to selected tab and pane
        document.querySelector(`[data-tab="${tabName}"]`).classList.add('active');
        document.getElementById(tabName).classList.add('active');
    }

    showLoading() {
        this.generateBtn.innerHTML = '<span class="loading"></span> Generating...';
        this.generateBtn.disabled = true;
    }

    showSuccess() {
        this.generateBtn.innerHTML = '<i class="fas fa-check"></i> App Generated!';
        this.generateBtn.style.background = '#48bb78';
        this.generateBtn.classList.add('success-animation');
        
        setTimeout(() => {
            this.generateBtn.innerHTML = '<i class="fas fa-magic"></i> Generate App';
            this.generateBtn.style.background = '';
            this.generateBtn.disabled = false;
            this.generateBtn.classList.remove('success-animation');
        }, 3000);
    }

    showError(message) {
        // Create and show error notification
        const notification = document.createElement('div');
        notification.className = 'error-notification';
        notification.innerHTML = `
            <i class="fas fa-exclamation-triangle"></i>
            <span>${message}</span>
            <button onclick="this.parentElement.remove()">&times;</button>
        `;
        
        // Add styles
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: #e53e3e;
            color: white;
            padding: 15px 20px;
            border-radius: 8px;
            display: flex;
            align-items: center;
            gap: 10px;
            z-index: 1000;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            animation: slideIn 0.3s ease-out;
        `;
        
        document.body.appendChild(notification);
        
        // Auto-remove after 5 seconds
        setTimeout(() => {
            if (notification.parentElement) {
                notification.remove();
            }
        }, 5000);
    }

    downloadProject() {
        if (!this.currentGeneratedApp) return;
        
        // Create a zip file with the project structure
        const zip = new JSZip();
        
        // Add files to zip
        zip.file('README.md', this.currentGeneratedApp.instructions);
        zip.file('package.json', this.currentGeneratedApp.dependencies);
        
        // Add source files based on app type
        if (this.currentGeneratedApp.appType === 'web') {
            zip.file('src/App.jsx', this.currentGeneratedApp.mainCode);
            zip.file('public/index.html', this.getDefaultHTML());
        } else if (this.currentGeneratedApp.appType === 'mobile') {
            zip.file('lib/main.dart', this.currentGeneratedApp.mainCode);
            zip.file('pubspec.yaml', this.currentGeneratedApp.dependencies);
        }
        
        // Generate and download zip
        zip.generateAsync({ type: 'blob' }).then(content => {
            const url = URL.createObjectURL(content);
            const a = document.createElement('a');
            a.href = url;
            a.download = `${this.currentGeneratedApp.name.toLowerCase().replace(/\s+/g, '-')}.zip`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
        });
    }

    getDefaultHTML() {
        return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${this.currentGeneratedApp.name}</title>
</head>
<body>
    <div id="root"></div>
</body>
</html>`;
    }

    previewApp() {
        if (!this.currentGeneratedApp) return;
        
        // Create a preview window with the generated code
        const previewWindow = window.open('', '_blank');
        previewWindow.document.write(`
            <!DOCTYPE html>
            <html>
            <head>
                <title>${this.currentGeneratedApp.name} - Preview</title>
                <style>
                    body { font-family: Arial, sans-serif; padding: 20px; }
                    .preview-header { background: #f0f0f0; padding: 20px; border-radius: 8px; margin-bottom: 20px; }
                    .code-preview { background: #1a202c; color: #e2e8f0; padding: 20px; border-radius: 8px; overflow-x: auto; }
                    pre { margin: 0; font-family: monospace; }
                </style>
            </head>
            <body>
                <div class="preview-header">
                    <h1>${this.currentGeneratedApp.name}</h1>
                    <p><strong>Type:</strong> ${this.formatAppType(this.currentGeneratedApp.appType)}</p>
                    <p><strong>Category:</strong> ${this.formatCategory(this.currentGeneratedApp.category)}</p>
                    <p><strong>Description:</strong> ${this.currentGeneratedApp.description}</p>
                </div>
                <h2>Generated Code Preview</h2>
                <div class="code-preview">
                    <pre>${this.currentGeneratedApp.mainCode}</pre>
                </div>
            </body>
            </html>
        `);
        previewWindow.document.close();
    }

    regenerateApp() {
        if (this.currentGeneratedApp) {
            this.generateApp();
        }
    }
}

// Add CSS for error notification animation
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
`;
document.head.appendChild(style);

// Initialize the app generator when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new AppGenerator();
});