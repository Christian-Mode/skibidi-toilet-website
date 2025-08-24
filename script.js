// App Generator JavaScript
class AppGenerator {
    constructor() {
        this.initializeElements();
        this.bindEvents();
        this.currentGeneratedApp = null;
    }

    initializeElements() {
        // Form elements
        this.appTypeSelect = document.getElementById('appType');
        this.techStackCheckboxes = document.querySelectorAll('.tech-option input[type="checkbox"]');
        this.appDescription = document.getElementById('appDescription');
        this.appName = document.getElementById('appName');
        this.appCategory = document.getElementById('appCategory');
        this.generateBtn = document.getElementById('generateBtn');

        // Output elements
        this.outputSection = document.getElementById('outputSection');
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
        this.tabButtons.forEach(button => {
            button.addEventListener('click', (e) => this.switchTab(e.target.dataset.tab));
        });

        // Auto-generate app name from description
        this.appDescription.addEventListener('input', () => this.autoGenerateAppName());
    }

    autoGenerateAppName() {
        const description = this.appDescription.value;
        if (description && !this.appName.value) {
            const words = description.split(' ').slice(0, 3);
            const appName = words.map(word => word.charAt(0).toUpperCase() + word.slice(1)).join('');
            this.appName.value = appName;
        }
    }

    async generateApp() {
        if (!this.validateForm()) {
            return;
        }

        this.setLoadingState(true);
        
        try {
            // Simulate API call delay
            await new Promise(resolve => setTimeout(resolve, 2000));
            
            const appData = this.createAppData();
            this.currentGeneratedApp = appData;
            
            this.displayGeneratedApp(appData);
            this.showOutputSection();
            
        } catch (error) {
            console.error('Error generating app:', error);
            alert('Error generating app. Please try again.');
        } finally {
            this.setLoadingState(false);
        }
    }

    validateForm() {
        if (!this.appDescription.value.trim()) {
            alert('Please describe your app before generating.');
            this.appDescription.focus();
            return false;
        }

        if (!this.appName.value.trim()) {
            alert('Please enter an app name.');
            this.appName.focus();
            return false;
        }

        const selectedTech = Array.from(this.techStackCheckboxes).filter(cb => cb.checked);
        if (selectedTech.length === 0) {
            alert('Please select at least one technology.');
            return false;
        }

        return true;
    }

    createAppData() {
        const appType = this.appTypeSelect.value;
        const selectedTech = Array.from(this.techStackCheckboxes)
            .filter(cb => cb.checked)
            .map(cb => cb.value);
        const description = this.appDescription.value;
        const appName = this.appName.value;
        const category = this.appCategory.value;

        return {
            name: appName,
            type: appType,
            category: category,
            description: description,
            techStack: selectedTech,
            structure: this.generateProjectStructure(appType, selectedTech),
            mainCode: this.generateMainCode(appType, selectedTech, description),
            dependencies: this.generateDependencies(selectedTech),
            instructions: this.generateSetupInstructions(appType, selectedTech)
        };
    }

    generateProjectStructure(appType, techStack) {
        const structures = {
            web: {
                react: `my-app/
├── public/
│   ├── index.html
│   └── favicon.ico
├── src/
│   ├── components/
│   │   ├── Header.js
│   │   ├── Footer.js
│   │   └── MainContent.js
│   ├── styles/
│   │   └── App.css
│   ├── App.js
│   ├── index.js
│   └── package.json
├── README.md
└── .gitignore`,
                vue: `my-app/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── Header.vue
│   │   ├── Footer.vue
│   │   └── MainContent.vue
│   ├── assets/
│   ├── App.vue
│   ├── main.js
│   └── package.json
├── README.md
└── .gitignore`,
                angular: `my-app/
├── src/
│   ├── app/
│   │   ├── components/
│   │   │   ├── header/
│   │   │   ├── footer/
│   │   │   └── main-content/
│   │   ├── services/
│   │   ├── app.component.ts
│   │   └── app.module.ts
│   ├── assets/
│   ├── index.html
│   ├── main.ts
│   └── styles.css
├── angular.json
├── package.json
└── README.md`
            },
            mobile: {
                flutter: `my_app/
├── android/
├── ios/
├── lib/
│   ├── screens/
│   │   ├── home_screen.dart
│   │   └── detail_screen.dart
│   ├── widgets/
│   │   ├── custom_button.dart
│   │   └── custom_card.dart
│   ├── models/
│   ├── services/
│   ├── main.dart
│   └── app.dart
├── pubspec.yaml
└── README.md`
            },
            api: {
                node: `my-api/
├── src/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── utils/
│   └── app.js
├── tests/
├── package.json
├── .env
└── README.md`,
                python: `my_api/
├── app/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   └── main.py
├── tests/
├── requirements.txt
├── .env
└── README.md`
            }
        };

        const primaryTech = techStack[0];
        return structures[appType]?.[primaryTech] || structures[appType]?.['react'] || 'Project structure will be generated based on your selections.';
    }

    generateMainCode(appType, techStack, description) {
        const primaryTech = techStack[0];
        
        if (appType === 'web' && primaryTech === 'react') {
            return `import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Initialize your app here
    console.log('App initialized');
  }, []);

  const handleAction = () => {
    // Handle user actions
    console.log('Action triggered');
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>${this.appName.value}</h1>
        <p>${description}</p>
      </header>
      <main>
        <button onClick={handleAction}>
          Click me!
        </button>
      </main>
    </div>
  );
}

export default App;`;
        }

        if (appType === 'mobile' && primaryTech === 'flutter') {
            return `import 'package:flutter/material.dart';

void main() {
  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: '${this.appName.value}',
      theme: ThemeData(
        primarySwatch: Colors.blue,
        visualDensity: VisualDensity.adaptivePlatformDensity,
      ),
      home: MyHomePage(title: '${this.appName.value}'),
    );
  }
}

class MyHomePage extends StatefulWidget {
  MyHomePage({Key? key, required this.title}) : super(key: key);
  final String title;

  @override
  _MyHomePageState createState() => _MyHomePageState();
}

class _MyHomePageState extends State<MyHomePage> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text(widget.title),
      ),
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: <Widget>[
            Text(
              '${description}',
              style: Theme.of(context).textTheme.headline6,
            ),
          ],
        ),
      ),
    );
  }
}`;
        }

        if (appType === 'api' && primaryTech === 'node') {
            return `const express = require('express');
const cors = require('cors');
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to ${this.appName.value} API',
    description: '${description}',
    status: 'running'
  });
});

app.get('/api/data', (req, res) => {
  res.json({
    data: [],
    message: 'Data endpoint'
  });
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(\`Server running on port \${PORT}\`);
});`;
        }

        return `// Main code for ${this.appName.value}
// This will be generated based on your app type and technology stack

console.log('${this.appName.value} initialized');
console.log('Description: ${description}');
console.log('Tech Stack: ${techStack.join(', ')}');`;
    }

    generateDependencies(techStack) {
        const dependencies = {
            react: `{
  "name": "${this.appName.value.toLowerCase().replace(/\s+/g, '-')}",
  "version": "1.0.0",
  "private": true,
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-scripts": "5.0.1"
  },
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject"
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
}`,
            vue: `{
  "name": "${this.appName.value.toLowerCase().replace(/\s+/g, '-')}",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "serve": "vue-cli-service serve",
    "build": "vue-cli-service build",
    "lint": "vue-cli-service lint"
  },
  "dependencies": {
    "vue": "^3.3.0",
    "vue-router": "^4.2.0"
  },
  "devDependencies": {
    "@vue/cli-service": "^5.0.0",
    "@vue/compiler-sfc": "^3.3.0"
  }
}`,
            flutter: `name: ${this.appName.value.toLowerCase().replace(/\s+/g, '_')}
description: ${this.appDescription.value}
version: 1.0.0+1

environment:
  sdk: ">=2.17.0 <3.0.0"

dependencies:
  flutter:
    sdk: flutter
  cupertino_icons: ^1.0.2

dev_dependencies:
  flutter_test:
    sdk: flutter
  flutter_lints: ^2.0.0

flutter:
  uses-material-design: true`,
            node: `{
  "name": "${this.appName.value.toLowerCase().replace(/\s+/g, '-')}",
  "version": "1.0.0",
  "description": "${this.appDescription.value}",
  "main": "src/app.js",
  "scripts": {
    "start": "node src/app.js",
    "dev": "nodemon src/app.js",
    "test": "jest"
  },
  "dependencies": {
    "express": "^4.18.0",
    "cors": "^2.8.5",
    "dotenv": "^16.0.0"
  },
  "devDependencies": {
    "nodemon": "^2.0.20",
    "jest": "^29.0.0"
  }
}`,
            python: `# requirements.txt
fastapi==0.104.0
uvicorn==0.24.0
pydantic==2.4.0
python-dotenv==1.0.0
requests==2.31.0`
        };

        const primaryTech = techStack[0];
        return dependencies[primaryTech] || 'Dependencies will be generated based on your technology selection.';
    }

    generateSetupInstructions(appType, techStack) {
        const primaryTech = techStack[0];
        
        let instructions = `<h3>Setup Instructions for ${this.appName.value}</h3>`;
        
        if (appType === 'web' && primaryTech === 'react') {
            instructions += `
                <ol>
                    <li><strong>Prerequisites:</strong> Make sure you have Node.js installed (version 14 or higher)</li>
                    <li><strong>Create the project:</strong> <code>npx create-react-app ${this.appName.value.toLowerCase().replace(/\s+/g, '-')}</code></li>
                    <li><strong>Navigate to project:</strong> <code>cd ${this.appName.value.toLowerCase().replace(/\s+/g, '-')}</code></li>
                    <li><strong>Install dependencies:</strong> <code>npm install</code></li>
                    <li><strong>Start development server:</strong> <code>npm start</code></li>
                    <li><strong>Build for production:</strong> <code>npm run build</code></li>
                </ol>
                <p><strong>Note:</strong> The app will open in your browser at <code>http://localhost:3000</code></p>`;
        } else if (appType === 'mobile' && primaryTech === 'flutter') {
            instructions += `
                <ol>
                    <li><strong>Prerequisites:</strong> Install Flutter SDK and set up your development environment</li>
                    <li><strong>Create the project:</strong> <code>flutter create ${this.appName.value.toLowerCase().replace(/\s+/g, '_')}</code></li>
                    <li><strong>Navigate to project:</strong> <code>cd ${this.appName.value.toLowerCase().replace(/\s+/g, '_')}</code></li>
                    <li><strong>Get dependencies:</strong> <code>flutter pub get</code></li>
                    <li><strong>Run the app:</strong> <code>flutter run</code></li>
                </ol>
                <p><strong>Note:</strong> Make sure you have an emulator running or a device connected</p>`;
        } else if (appType === 'api' && primaryTech === 'node') {
            instructions += `
                <ol>
                    <li><strong>Prerequisites:</strong> Make sure you have Node.js installed</li>
                    <li><strong>Create project directory:</strong> <code>mkdir ${this.appName.value.toLowerCase().replace(/\s+/g, '-')}</code></li>
                    <li><strong>Navigate to project:</strong> <code>cd ${this.appName.value.toLowerCase().replace(/\s+/g, '-')}</code></li>
                    <li><strong>Initialize project:</strong> <code>npm init -y</code></li>
                    <li><strong>Install dependencies:</strong> <code>npm install</code></li>
                    <li><strong>Start the server:</strong> <code>npm start</code></li>
                </ol>
                <p><strong>Note:</strong> The API will be available at <code>http://localhost:3000</code></p>`;
        } else {
            instructions += `
                <p>Setup instructions will be generated based on your specific app type and technology stack.</p>
                <p>Please refer to the official documentation for your chosen technologies:</p>
                <ul>
                    ${techStack.map(tech => `<li><a href="#" target="_blank">${tech.toUpperCase()} Documentation</a></li>`).join('')}
                </ul>`;
        }

        return instructions;
    }

    displayGeneratedApp(appData) {
        this.generatedAppName.textContent = appData.name;
        this.generatedAppType.textContent = this.formatAppType(appData.type);
        this.generatedAppCategory.textContent = this.formatCategory(appData.category);
        
        this.structureCode.textContent = appData.structure;
        this.mainCode.textContent = appData.mainCode;
        this.dependenciesCode.textContent = appData.dependencies;
        this.instructionsContent.innerHTML = appData.instructions;
    }

    formatAppType(type) {
        const types = {
            web: 'Web App',
            mobile: 'Mobile App',
            desktop: 'Desktop App',
            api: 'API/Backend',
            game: 'Game',
            tool: 'Utility Tool'
        };
        return types[type] || type;
    }

    formatCategory(category) {
        const categories = {
            productivity: 'Productivity',
            entertainment: 'Entertainment',
            education: 'Education',
            business: 'Business',
            social: 'Social',
            utility: 'Utility',
            other: 'Other'
        };
        return categories[category] || category;
    }

    showOutputSection() {
        this.outputSection.style.display = 'block';
        this.outputSection.scrollIntoView({ behavior: 'smooth' });
        this.outputSection.classList.add('success-animation');
        setTimeout(() => this.outputSection.classList.remove('success-animation'), 600);
    }

    switchTab(tabName) {
        // Remove active class from all tabs and panes
        this.tabButtons.forEach(btn => btn.classList.remove('active'));
        this.tabPanes.forEach(pane => pane.classList.remove('active'));

        // Add active class to selected tab and pane
        document.querySelector(`[data-tab="${tabName}"]`).classList.add('active');
        document.getElementById(tabName).classList.add('active');
    }

    setLoadingState(loading) {
        if (loading) {
            this.generateBtn.innerHTML = '<span class="loading"></span> Generating...';
            this.generateBtn.disabled = true;
        } else {
            this.generateBtn.innerHTML = '<i class="fas fa-magic"></i> Generate App';
            this.generateBtn.disabled = false;
        }
    }

    downloadProject() {
        if (!this.currentGeneratedApp) {
            alert('No app generated yet. Please generate an app first.');
            return;
        }

        // Create a zip file with the project structure
        const zip = new JSZip();
        
        // Add files to zip
        zip.file('README.md', `# ${this.currentGeneratedApp.name}\n\n${this.currentGeneratedApp.description}\n\n## Tech Stack\n${this.currentGeneratedApp.techStack.join(', ')}\n\n## Setup\nSee setup instructions in the project files.`);
        zip.file('package.json', this.currentGeneratedApp.dependencies);
        
        if (this.currentGeneratedApp.type === 'web') {
            zip.file('src/App.js', this.currentGeneratedApp.mainCode);
            zip.file('public/index.html', this.generateHTMLTemplate());
        }

        // Generate and download zip
        zip.generateAsync({type: 'blob'}).then(content => {
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

    generateHTMLTemplate() {
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
        if (!this.currentGeneratedApp) {
            alert('No app generated yet. Please generate an app first.');
            return;
        }

        // Create a preview window with the generated code
        const previewWindow = window.open('', '_blank');
        const htmlContent = `
            <!DOCTYPE html>
            <html>
            <head>
                <title>${this.currentGeneratedApp.name} - Preview</title>
                <style>
                    body { font-family: Arial, sans-serif; padding: 20px; }
                    .preview-header { background: #f0f0f0; padding: 20px; border-radius: 10px; margin-bottom: 20px; }
                    .code-preview { background: #1a202c; color: white; padding: 20px; border-radius: 10px; overflow-x: auto; }
                </style>
            </head>
            <body>
                <div class="preview-header">
                    <h1>${this.currentGeneratedApp.name}</h1>
                    <p><strong>Type:</strong> ${this.formatAppType(this.currentGeneratedApp.type)}</p>
                    <p><strong>Category:</strong> ${this.formatCategory(this.currentGeneratedApp.category)}</p>
                    <p><strong>Description:</strong> ${this.currentGeneratedApp.description}</p>
                </div>
                <div class="code-preview">
                    <h3>Generated Code Preview:</h3>
                    <pre>${this.currentGeneratedApp.mainCode}</pre>
                </div>
            </body>
            </html>
        `;
        
        previewWindow.document.write(htmlContent);
        previewWindow.document.close();
    }

    regenerateApp() {
        this.generateApp();
    }
}

// Initialize the app generator when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new AppGenerator();
});

// Add JSZip library for download functionality
const script = document.createElement('script');
script.src = 'https://cdnjs.cloudflare.com/ajax/libs/jszip/3.10.1/jszip.min.js';
document.head.appendChild(script);