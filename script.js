// AI Minecraft Addon Generator JavaScript
class MinecraftAddonGenerator {
    constructor() {
        this.initializeElements();
        this.bindEvents();
        this.currentGeneratedAddon = null;
        this.aiServices = {
            textToCode: 'https://api.huggingface.co/models/bigcode/starcoder',
            pixelArt: 'https://api.stability.ai/v1/generation/stable-diffusion-xl-1024-v1-0/text-to-image',
            soundGeneration: 'https://api.elevenlabs.io/v1/text-to-speech',
            uuidGenerator: 'https://uuidapi.com/api/v1/random'
        };
    }

    initializeElements() {
        // Form elements
        this.addonTypeSelect = document.getElementById('addonType');
        this.featureCheckboxes = document.querySelectorAll('.feature-option input[type="checkbox"]');
        this.addonDescription = document.getElementById('addonDescription');
        this.addonName = document.getElementById('addonName');
        this.addonCategory = document.getElementById('addonCategory');
        this.minecraftVersion = document.getElementById('minecraftVersion');
        this.generateBtn = document.getElementById('generateBtn');

        // Output elements
        this.outputSection = document.getElementById('outputSection');
        this.generatedAddonName = document.getElementById('generatedAddonName');
        this.generatedAddonType = document.getElementById('generatedAddonType');
        this.generatedAddonCategory = document.getElementById('generatedAddonCategory');
        this.generatedMinecraftVersion = document.getElementById('generatedMinecraftVersion');
        this.structureCode = document.getElementById('structureCode');
        this.behaviorCode = document.getElementById('behaviorCode');
        this.resourceCode = document.getElementById('resourceCode');
        this.functionsCode = document.getElementById('functionsCode');
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
        this.generateBtn.addEventListener('click', () => this.generateAddon());
        this.downloadBtn.addEventListener('click', () => this.downloadAddon());
        this.previewBtn.addEventListener('click', () => this.previewAddon());
        this.regenerateBtn.addEventListener('click', () => this.regenerateAddon());
        // No preset buttons; only standard generation

        // Tab switching
        this.tabButtons.forEach(button => {
            button.addEventListener('click', (e) => this.switchTab(e.target.dataset.tab));
        });

        // Auto-generate addon name from description
        this.addonDescription.addEventListener('input', () => this.autoGenerateAddonName());
    }

    // Removed JJK preset helpers

    autoGenerateAddonName() {
        const description = this.addonDescription.value;
        if (description && !this.addonName.value) {
            const words = description.split(' ').slice(0, 3);
            const addonName = words.map(word => word.charAt(0).toUpperCase() + word.slice(1)).join('');
            this.addonName.value = addonName;
        }
    }

    async generateAddon() {
        if (!this.validateForm()) {
            return;
        }

        this.setLoadingState(true);
        
        try {
            // Simulate AI generation process
            await this.simulateAIGeneration();
            
            const addonData = this.createAddonData();
            this.currentGeneratedAddon = addonData;
            
            this.displayGeneratedAddon(addonData);
            this.showOutputSection();
            
        } catch (error) {
            console.error('Error generating addon:', error);
            alert('Error generating addon. Please try again.');
        } finally {
            this.setLoadingState(false);
        }
    }

    async simulateAIGeneration() {
        const steps = [
            'Analyzing addon description...',
            'Generating Minecraft Bedrock Edition code...',
            'Creating custom textures and assets...',
            'Generating sound effects...',
            'Building behavior pack...',
            'Creating resource pack...',
            'Generating functions and commands...',
            'Assembling .mcpack file...'
        ];

        for (let i = 0; i < steps.length; i++) {
            this.updateLoadingMessage(steps[i]);
            await new Promise(resolve => setTimeout(resolve, 800));
        }
    }

    updateLoadingMessage(message) {
        this.generateBtn.innerHTML = `<i class="fas fa-spinner fa-spin"></i> ${message}`;
    }

    validateForm() {
        if (!this.addonDescription.value.trim()) {
            alert('Please describe your addon before generating.');
            this.addonDescription.focus();
            return false;
        }

        if (!this.addonName.value.trim()) {
            alert('Please enter an addon name.');
            this.addonName.focus();
            return false;
        }

        const selectedFeatures = Array.from(this.featureCheckboxes).filter(cb => cb.checked);
        if (selectedFeatures.length === 0) {
            alert('Please select at least one addon feature.');
            return false;
        }

        return true;
    }

    createAddonData() {
        const addonType = this.addonTypeSelect.value;
        const selectedFeatures = Array.from(this.featureCheckboxes).filter(cb => cb.checked).map(cb => cb.value);
        const description = this.addonDescription.value;
        const name = this.addonName.value;
        const category = this.addonCategory.value;
        const version = this.minecraftVersion.value;

        // Generate unique identifiers
        const uuid = this.generateUUID();
        const namespace = name.toLowerCase().replace(/[^a-z0-9]/g, '');

        return {
            type: addonType,
            features: selectedFeatures,
            description: description,
            name: name,
            category: category,
            version: version,
            uuid: uuid,
            namespace: namespace,
            timestamp: new Date().toISOString()
        };
    }

    generateUUID() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            const r = Math.random() * 16 | 0;
            const v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }

    displayGeneratedAddon(addonData) {
        this.generatedAddonName.textContent = addonData.name;
        this.generatedAddonType.textContent = this.getAddonTypeDisplay(addonData.type);
        this.generatedAddonCategory.textContent = this.getCategoryDisplay(addonData.category);
        this.generatedMinecraftVersion.textContent = addonData.version;

        // Generate project structure
        this.structureCode.textContent = this.generateProjectStructure(addonData);
        
        // Generate behavior pack
        this.behaviorCode.textContent = this.generateBehaviorPack(addonData);
        
        // Generate resource pack
        this.resourceCode.textContent = this.generateResourcePack(addonData);
        
        // Generate functions
        this.functionsCode.textContent = this.generateFunctions(addonData);
        
        // Generate installation instructions
        this.instructionsContent.innerHTML = this.generateInstallationInstructions(addonData);
    }

    getAddonTypeDisplay(type) {
        const typeMap = {
            'item': 'Custom Item',
            'mob': 'Custom Mob',
            'block': 'Custom Block',
            'ability': 'Ability/Spell',
            'dimension': 'Custom Dimension',
            'structure': 'Custom Structure',
            'biome': 'Custom Biome',
            'recipe': 'Custom Recipe',
            'loot': 'Loot Table',
            'function': 'Command Function'
        };
        return typeMap[type] || type;
    }

    getCategoryDisplay(category) {
        const categoryMap = {
            'combat': 'Combat & Weapons',
            'magic': 'Magic & Spells',
            'technology': 'Technology & Redstone',
            'nature': 'Nature & Farming',
            'adventure': 'Adventure & Exploration',
            'decoration': 'Decoration & Building',
            'utility': 'Utility & Tools',
            'other': 'Other'
        };
        return categoryMap[category] || category;
    }

    generateProjectStructure(addonData) {
        const structure = [
            `${addonData.name}/`,
            `├── behavior_pack/`,
            `│   ├── manifest.json`,
            `│   ├── pack_icon.png`,
            `│   ├── entities/`,
            `│   │   └── ${addonData.namespace}_${addonData.type}.json`,
            `│   ├── items/`,
            `│   │   └── ${addonData.namespace}_${addonData.type}.json`,
            `│   ├── loot_tables/`,
            `│   │   └── ${addonData.namespace}_${addonData.type}.json`,
            `│   ├── recipes/`,
            `│   │   └── ${addonData.namespace}_${addonData.type}.json`,
            `│   ├── functions/`,
            `│   │   └── ${addonData.namespace}_${addonData.type}.mcfunction`,
            `│   └── animations/`,
            `│       └── ${addonData.namespace}_${addonData.type}.json`,
            `└── resource_pack/`,
            `    ├── manifest.json`,
            `    ├── pack_icon.png`,
            `    ├── textures/`,
            `    │   ├── items/`,
            `    │   │   └── ${addonData.namespace}_${addonData.type}.png`,
            `    │   ├── blocks/`,
            `    │   │   └── ${addonData.namespace}_${addonData.type}.png`,
            `    │   └── entity/`,
            `    │       └── ${addonData.namespace}_${addonData.type}.png`,
            `    ├── sounds/`,
            `    │   └── ${addonData.namespace}_${addonData.type}.ogg`,
            `    ├── texts/`,
            `    │   └── en_US.lang`,
            `    └── animations/`,
            `        └── ${addonData.namespace}_${addonData.type}.json`
        ];

        return structure.join('\n');
    }

    generateBehaviorPack(addonData) {
        const manifest = {
            format_version: 2,
            header: {
                name: `${addonData.name} Behavior Pack`,
                description: addonData.description,
                uuid: addonData.uuid,
                version: [1, 0, 0],
                min_engine_version: [1, 18, 0]
            },
            modules: [
                {
                    type: "data",
                    uuid: this.generateUUID(),
                    version: [1, 0, 0]
                }
            ],
            dependencies: [
                {
                    uuid: this.generateUUID(),
                    version: [1, 0, 0]
                }
            ]
        };

        return JSON.stringify(manifest, null, 2);
    }

    generateResourcePack(addonData) {
        const manifest = {
            format_version: 2,
            header: {
                name: `${addonData.name} Resource Pack`,
                description: `Resources for ${addonData.name}`,
                uuid: this.generateUUID(),
                version: [1, 0, 0],
                min_engine_version: [1, 18, 0]
            },
            modules: [
                {
                    type: "resources",
                    uuid: this.generateUUID(),
                    version: [1, 0, 0]
                }
            ],
            dependencies: [
                {
                    uuid: this.generateUUID(),
                    version: [1, 0, 0]
                }
            ]
        };

        return JSON.stringify(manifest, null, 2);
    }

    generateFunctions(addonData) {
        let functions = '';
        
        switch(addonData.type) {
            case 'item':
                functions = this.generateItemFunctions(addonData);
                break;
            case 'mob':
                functions = this.generateMobFunctions(addonData);
                break;
            case 'block':
                functions = this.generateBlockFunctions(addonData);
                break;
            case 'ability':
                functions = this.generateAbilityFunctions(addonData);
                break;
            default:
                functions = this.generateDefaultFunctions(addonData);
        }

        return functions;
    }

    generateItemFunctions(addonData) {
        return `# ${addonData.name} - Custom Item Functions
# Generated by AI Minecraft Addon Generator

# Give the custom item to player
function give_${addonData.namespace}_item(player) {
    give @s ${addonData.namespace}:${addonData.type} 1
    tellraw @s {"rawtext":[{"text":"§aYou received ${addonData.name}!"}]}
}

# Custom item effects
function ${addonData.namespace}_item_effects() {
    # Add custom effects when item is used
    effect @s speed 10 1
    effect @s jump_boost 10 1
    particle minecraft:enchanting_glyph ~ ~1 ~ 0.5 0.5 0.5 0.1 10
    playsound random.levelup @s ~ ~ ~ 1 1
}

# Register item events
scoreboard objectives add ${addonData.namespace}_usage dummy
scoreboard objectives setdisplay sidebar ${addonData.namespace}_usage`;
    }

    generateMobFunctions(addonData) {
        return `# ${addonData.name} - Custom Mob Functions
# Generated by AI Minecraft Addon Generator

# Spawn custom mob
function spawn_${addonData.namespace}_mob() {
    summon armor_stand ~ ~ ~ {Tags:["${addonData.namespace}_mob"],CustomName:"${addonData.name}"}
    effect @e[tag=${addonData.namespace}_mob] glowing 10 1
    particle minecraft:portal ~ ~ ~ 1 1 1 0.1 50
}

# Custom mob behavior
function ${addonData.namespace}_mob_behavior() {
    # Make mob follow nearest player
    execute as @e[tag=${addonData.namespace}_mob] at @s run tp @s ~ ~ ~ facing @p
    # Add custom effects
    effect @e[tag=${addonData.namespace}_mob] speed 5 1
}

# Mob death effects
function ${addonData.namespace}_mob_death() {
    execute as @e[tag=${addonData.namespace}_mob] unless entity @s run function ${addonData.namespace}_death_effects
}

function ${addonData.namespace}_death_effects() {
    particle minecraft:explosion ~ ~ ~ 1 1 1 0.1 10
    playsound random.explode @a ~ ~ ~ 1 1
}`;
    }

    generateBlockFunctions(addonData) {
        return `# ${addonData.name} - Custom Block Functions
# Generated by AI Minecraft Addon Generator

# Place custom block
function place_${addonData.namespace}_block() {
    setblock ~ ~ ~ ${addonData.namespace}:${addonData.type}
    particle minecraft:block_dust ~ ~ ~ 0.5 0.5 0.5 0.1 20
    playsound random.place @s ~ ~ ~ 1 1
}

# Custom block interactions
function ${addonData.namespace}_block_interact() {
    # Add effects when block is right-clicked
    effect @s regeneration 5 1
    particle minecraft:heart ~ ~1 ~ 0.5 0.5 0.5 0.1 10
    tellraw @s {"rawtext":[{"text":"§b${addonData.name} block activated!"}]}
}

# Block breaking effects
function ${addonData.namespace}_block_break() {
    particle minecraft:block_dust ~ ~ ~ 1 1 1 0.1 30
    playsound random.break @s ~ ~ ~ 1 1
    # Drop custom loot
    summon item ~ ~ ~ {Item:{id:"${addonData.namespace}:${addonData.type}",Count:1}}
}`;
    }

    generateAbilityFunctions(addonData) {
        return `# ${addonData.name} - Custom Ability Functions
# Generated by AI Minecraft Addon Generator

# Cast ability
function cast_${addonData.namespace}_ability() {
    # Check if player has required items
    clear @s ${addonData.namespace}:ability_catalyst 0 1
    # Add ability effects
    effect @s strength 20 2
    effect @s speed 20 2
    effect @s jump_boost 20 2
    # Create particle effects
    particle minecraft:enchanting_glyph ~ ~1 ~ 1 1 1 0.1 50
    particle minecraft:portal ~ ~ ~ 2 2 2 0.1 100
    # Play custom sounds
    playsound random.levelup @s ~ ~ ~ 1 1.5
    # Create explosion effect
    execute at @s run particle minecraft:explosion ~ ~ ~ 0.1 0.1 0.1 0.1 5
}

# Ability cooldown
function ${addonData.namespace}_ability_cooldown() {
    scoreboard players add @s ${addonData.namespace}_cooldown 1
    execute if score @s ${addonData.namespace}_cooldown matches 200.. run scoreboard players set @s ${addonData.namespace}_cooldown 0
}

# Check ability availability
function check_${addonData.namespace}_ability() {
    execute if score @s ${addonData.namespace}_cooldown matches 0.. run tellraw @s {"rawtext":[{"text":"§c${addonData.name} ability is on cooldown!"}]}
}`;
    }

    generateDefaultFunctions(addonData) {
        return `# ${addonData.name} - Default Functions
# Generated by AI Minecraft Addon Generator

# Main function
function ${addonData.namespace}_main() {
    tellraw @s {"rawtext":[{"text":"§a${addonData.name} addon loaded successfully!"}]}
    particle minecraft:enchanting_glyph ~ ~1 ~ 0.5 0.5 0.5 0.1 20
    playsound random.levelup @s ~ ~ ~ 1 1
}

# Utility functions
function ${addonData.namespace}_help() {
    tellraw @s {"rawtext":[{"text":"§6=== ${addonData.name} Help ==="}]}
    tellraw @s {"rawtext":[{"text":"§eUse /function ${addonData.namespace}:main to start"}]}
    tellraw @s {"rawtext":[{"text":"§eUse /function ${addonData.namespace}:help for this message"}]}
}`;
    }

    generateInstallationInstructions(addonData) {
        return `
            <div class="installation-steps">
                <h3>Installation Instructions</h3>
                <ol>
                    <li><strong>Download the .mcpack file</strong> using the button above</li>
                    <li><strong>Open Minecraft Bedrock Edition</strong> on your device</li>
                    <li><strong>Go to Settings</strong> → <strong>Storage</strong> → <strong>Behavior Packs</strong></li>
                    <li><strong>Click "My Packs"</strong> and find the downloaded file</li>
                    <li><strong>Click the file</strong> to import it into Minecraft</li>
                    <li><strong>Create a new world</strong> or edit an existing one</li>
                    <li><strong>Go to "Experiments"</strong> and enable "Holiday Creator Features"</li>
                    <li><strong>Go to "Resource Packs"</strong> and activate the addon</li>
                    <li><strong>Go to "Behavior Packs"</strong> and activate the addon</li>
                    <li><strong>Start your world</strong> and enjoy your new ${addonData.name}!</li>
                </ol>
                
                <h4>In-Game Usage</h4>
                <p>Use the following commands in your world:</p>
                <ul>
                    <li><code>/function ${addonData.namespace}:main</code> - Load the addon</li>
                    <li><code>/function ${addonData.namespace}:help</code> - Show help information</li>
                </ul>
                
                <h4>Compatibility</h4>
                <p>This addon is compatible with Minecraft Bedrock Edition ${addonData.version} and above.</p>
                
                <h4>Support</h4>
                <p>If you encounter any issues, try:</p>
                <ul>
                    <li>Restarting Minecraft</li>
                    <li>Checking that both behavior and resource packs are activated</li>
                    <li>Ensuring "Holiday Creator Features" is enabled</li>
                </ul>
            </div>
        `;
    }

    showOutputSection() {
        this.outputSection.style.display = 'block';
        this.outputSection.scrollIntoView({ behavior: 'smooth' });
    }

    setLoadingState(loading) {
        if (loading) {
            this.generateBtn.disabled = true;
            this.generateBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Generating...';
        } else {
            this.generateBtn.disabled = false;
            this.generateBtn.innerHTML = '<i class="fas fa-magic"></i> Generate Addon';
        }
    }

    switchTab(tabName) {
        // Remove active class from all tabs and panes
        this.tabButtons.forEach(btn => btn.classList.remove('active'));
        this.tabPanes.forEach(pane => pane.classList.remove('active'));

        // Add active class to selected tab and pane
        document.querySelector(`[data-tab="${tabName}"]`).classList.add('active');
        document.getElementById(tabName).classList.add('active');
    }

    async downloadAddon() {
        if (!this.currentGeneratedAddon) {
            alert('No addon generated yet. Please generate an addon first.');
            return;
        }

        try {
            // Create a mock .mcpack file structure
            const addonData = this.currentGeneratedAddon;
            const zip = new JSZip();

            // Add behavior pack files
            const behaviorPack = zip.folder('behavior_pack');
            behaviorPack.file('manifest.json', this.behaviorCode.textContent);
            
            // Add resource pack files
            const resourcePack = zip.folder('resource_pack');
            resourcePack.file('manifest.json', this.resourceCode.textContent);

            // Generate and download the zip file
            const content = await zip.generateAsync({ type: 'blob' });
            const url = URL.createObjectURL(content);
            const a = document.createElement('a');
            a.href = url;
            a.download = `${addonData.name.replace(/[^a-z0-9]/gi, '_')}.mcpack`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);

        } catch (error) {
            console.error('Error downloading addon:', error);
            alert('Error downloading addon. Please try again.');
        }
    }

    previewAddon() {
        if (!this.currentGeneratedAddon) {
            alert('No addon generated yet. Please generate an addon first.');
            return;
        }

        // Create a preview modal
        const modal = document.createElement('div');
        modal.className = 'preview-modal';
        modal.innerHTML = `
            <div class="preview-content">
                <h3>${this.currentGeneratedAddon.name} Preview</h3>
                <div class="preview-grid">
                    <div class="preview-item">
                        <h4>Addon Type</h4>
                        <p>${this.getAddonTypeDisplay(this.currentGeneratedAddon.type)}</p>
                    </div>
                    <div class="preview-item">
                        <h4>Category</h4>
                        <p>${this.getCategoryDisplay(this.currentGeneratedAddon.category)}</p>
                    </div>
                    <div class="preview-item">
                        <h4>Features</h4>
                        <p>${this.currentGeneratedAddon.features.join(', ')}</p>
                    </div>
                    <div class="preview-item">
                        <h4>Minecraft Version</h4>
                        <p>${this.currentGeneratedAddon.version}</p>
                    </div>
                </div>
                <div class="preview-description">
                    <h4>Description</h4>
                    <p>${this.currentGeneratedAddon.description}</p>
                </div>
                <button class="close-preview">Close Preview</button>
            </div>
        `;

        // Add modal styles
        const style = document.createElement('style');
        style.textContent = `
            .preview-modal {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0,0,0,0.8);
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 1000;
            }
            .preview-content {
                background: white;
                padding: 30px;
                border-radius: 15px;
                max-width: 600px;
                max-height: 80vh;
                overflow-y: auto;
            }
            .preview-grid {
                display: grid;
                grid-template-columns: 1fr 1fr;
                gap: 20px;
                margin: 20px 0;
            }
            .preview-item h4 {
                color: #667eea;
                margin-bottom: 5px;
            }
            .preview-description {
                margin: 20px 0;
            }
            .close-preview {
                background: #667eea;
                color: white;
                border: none;
                padding: 10px 20px;
                border-radius: 8px;
                cursor: pointer;
                width: 100%;
            }
        `;
        document.head.appendChild(style);

        // Add close functionality
        modal.querySelector('.close-preview').addEventListener('click', () => {
            document.body.removeChild(modal);
        });

        // Close on outside click
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                document.body.removeChild(modal);
            }
        });

        document.body.appendChild(modal);
    }

    regenerateAddon() {
        if (this.currentGeneratedAddon) {
            this.generateAddon();
        }
    }
}

// Initialize the generator when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new MinecraftAddonGenerator();
});