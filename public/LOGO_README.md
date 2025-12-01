# 🎨 Logo Package

This directory contains all logo variants for the GTA VI Promotional Landing Page project.

## Logo Files

### 1. `favicon.svg`
- **Purpose**: Browser tab favicon
- **Size**: 64x64px (scalable SVG)
- **Usage**: Automatically used by browsers when the site is bookmarked
- **Colors**: Gold gradient on black background

### 2. `logo.svg`
- **Purpose**: Main project logo
- **Size**: 512x512px (scalable SVG)
- **Usage**: 
  - Apple touch icon
  - Social media previews
  - App icons
  - General branding
- **Features**: 
  - Roman numeral "VI" in gradient
  - Decorative lines (matching navbar design)
  - Glow effects

### 3. `logo-text.svg`
- **Purpose**: Horizontal logo with text
- **Size**: 400x120px (scalable SVG)
- **Usage**: 
  - Navbar (alternative)
  - Header sections
  - Email signatures
- **Features**: "Rockstar" text with decorative lines

### 4. `logo-full.svg`
- **Purpose**: Complete logo with icon and text
- **Size**: 600x200px (scalable SVG)
- **Usage**: 
  - Hero sections
  - Marketing materials
  - Large format displays
- **Features**: Combined icon + text design

## Color Palette

- **Primary Gold**: `#FFD700`
- **Secondary Orange**: `#FFA500`
- **Accent Red**: `#FF6347`
- **Background**: `#0a0a0a` / `#1a1a1a`
- **Text**: `#FFFFFF`

## Usage Examples

### HTML
```html
<!-- Favicon -->
<link rel="icon" type="image/svg+xml" href="/favicon.svg" />

<!-- Logo in navbar -->
<img src="/logo.svg" alt="GTA VI Logo" className="h-12 w-12" />

<!-- Full logo -->
<img src="/logo-full.svg" alt="Rockstar Games" className="h-20" />
```

### React/JSX
```jsx
// Import as React component (if using SVGR)
import Logo from '/logo.svg';

// Or use as image
<img src="/logo.svg" alt="Logo" />
```

## File Formats

All logos are provided as **SVG** format for:
- ✅ Scalability (looks perfect at any size)
- ✅ Small file size
- ✅ Crisp rendering on all displays
- ✅ Easy customization via CSS

## Customization

To customize colors, edit the SVG gradient definitions:
- `logoGradient` / `faviconGradient` - Main gradient
- `textGradient` - Text gradient
- Background colors - Direct fill values

## License

These logos are created for the GTA VI Promotional Landing Page project.

