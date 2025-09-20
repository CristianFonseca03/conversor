# 🪿🤡🕷️ Currency Converter to Fictional Units

A modern React TypeScript application that converts real currencies (USD, COP, MXN) to fictional currency units: **Gansitos**, **Balatros**, and **Silksongs**.

![Demo Screenshot](https://via.placeholder.com/800x400/667eea/ffffff?text=Currency+Converter+Demo)

## ✨ Features

- **Fixed Exchange Rates**: Uses standard fixed rates for USD, COP, and MXN conversion
- **Fictional Currency Conversion**: Converts real money to custom units with proper breakdown
- **Modern UI with Tailwind CSS**: Utility-first CSS framework for rapid development
- **Responsive Design**: Mobile-first design that works on all device sizes
- **Accessibility**: WCAG compliant with proper ARIA attributes and keyboard navigation
- **Modern Tech Stack**: Built with React 19, TypeScript, Vite, and Tailwind CSS
- **Automated Deployment**: GitHub Actions workflow for seamless deployment to GitHub Pages

## 💱 Exchange Rates

**Fixed conversion rates:**

- **1 USD** = 3,900 COP (Colombian Peso)
- **1 USD** = 18.40 MXN (Mexican Peso)

## 🎯 Fictional Currency System

- **🪿 1 Gansito** = $1 USD
- **🤡 1 Balatro** = 10 Gansitos = $10 USD
- **🕷️ 1 Silksong** = 2 Balatros = 20 Gansitos = $20 USD

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ and npm
- Git

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/YOUR_USERNAME/conversor.git
   cd conversor
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start development server**

   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173`

## 🛠️ Development

### Available Scripts

- **`npm run dev`** - Start development server with hot reload
- **`npm run build`** - Build production bundle
- **`npm run preview`** - Preview production build locally
- **`npm run lint`** - Run ESLint for code quality
- **`npm run deploy`** - Deploy to GitHub Pages

### Working with Tailwind CSS

#### Development Setup

1. **Tailwind IntelliSense** (Recommended VS Code extension)
   ```bash
   # Install the official Tailwind CSS IntelliSense extension
   # Provides autocomplete, syntax highlighting, and linting
   ```

2. **Customizing Styles**
   ```javascript
   // tailwind.config.js - Add custom utilities
   theme: {
     extend: {
       colors: {
         'custom-blue': '#1fb6ff',
       },
       spacing: {
         '72': '18rem',
       }
     }
   }
   ```

3. **Adding Custom Components**
   ```css
   /* src/index.css - Add reusable component classes */
   @layer components {
     .btn-primary {
       @apply bg-primary-500 hover:bg-primary-600 text-white font-medium py-2 px-4 rounded-lg transition-colors;
     }
   }
   ```

#### Tailwind Utility Examples

```tsx
// Responsive design
<div className="w-full md:w-1/2 lg:w-1/3">

// State variants
<button className="bg-blue-500 hover:bg-blue-600 focus:ring-4 focus:ring-blue-200 disabled:opacity-50">

// Spacing and layout
<div className="flex items-center justify-between gap-4 p-6">

// Typography
<h1 className="text-3xl font-bold text-gray-800 leading-tight">
```

### Project Structure

```
src/
├── components/           # Reusable UI components (using Tailwind CSS)
│   ├── AmountInput.tsx
│   ├── ConversionResult.tsx
│   ├── CurrencySelector.tsx
│   ├── ErrorDisplay.tsx
│   ├── ExchangeRatesDisplay.tsx
│   ├── LoadingSpinner.tsx
│   └── index.ts         # Component exports
├── hooks/               # Custom React hooks
│   ├── useCurrencyConverter.ts
│   ├── useExchangeRates.ts
│   └── index.ts
├── services/            # Fixed exchange rate service
│   └── exchangeRateService.ts
├── types/               # TypeScript type definitions
│   ├── currency.ts
│   ├── components.ts
│   └── index.ts
├── utils/               # Utility functions
│   └── currencyUtils.ts
├── App.tsx             # Main application component
├── index.css           # Global styles and Tailwind directives
└── main.tsx            # Application entry point
```

### Key Technologies

- **React 19** - Latest React with modern features
- **TypeScript** - Type safety and better developer experience
- **Vite** - Fast build tool and development server
- **Tailwind CSS** - Utility-first CSS framework for rapid UI development
- **PostCSS** - CSS processing with Tailwind integration
- **Fixed Exchange Rates** - Reliable standard conversion rates

## 🎨 Styling & Design

### Tailwind CSS Implementation

This project uses **Tailwind CSS v4** for all styling, providing:

- **Utility-first approach** for rapid development
- **Responsive design** with mobile-first breakpoints
- **Custom design tokens** for consistent theming
- **Modern CSS features** like CSS Grid and Flexbox
- **Optimized bundle size** with automatic purging

#### Key Tailwind Features Used

- **Custom Colors**: Extended primary color palette (50-900)
- **Custom Gradient**: `bg-gradient-app` for the main background
- **Responsive Utilities**: `sm:`, `md:`, `lg:` breakpoints
- **State Variants**: `hover:`, `focus:`, `disabled:`, `active:`
- **Accessibility**: `motion-reduce:` for reduced motion preferences
- **Custom Utilities**: `text-shadow-lg` for enhanced typography

#### Configuration Files

```
tailwind.config.js      # Tailwind configuration with custom themes
postcss.config.js       # PostCSS configuration for Tailwind processing
src/index.css          # Tailwind directives and custom utilities
```

## 📱 Design Features

### Responsive Design

- **Mobile-first approach** with progressive enhancement
- **Flexible grid layouts** that adapt to screen sizes
- **Touch-friendly interfaces** with proper tap targets

### Accessibility

- **Semantic HTML** with proper heading structure
- **ARIA attributes** for screen reader support
- **Keyboard navigation** for all interactive elements
- **High contrast support** and reduced motion preferences
- **Focus management** with visible focus indicators

### Performance

- **Tailwind CSS optimization** with automatic purging of unused styles
- **Code splitting** for optimal bundle sizes
- **React.memo** for component optimization
- **Efficient state management** with custom hooks
- **Modern CSS** with utility-first approach for smaller bundles

## 🚀 Deployment

### GitHub Pages (Recommended)

1. **Update package.json**

   ```json
   {
     "homepage": "https://YOUR_USERNAME.github.io/conversor"
   }
   ```

2. **Deploy manually**

   ```bash
   npm run deploy
   ```

3. **Automated deployment**
   - Push to `main` branch triggers automatic deployment
   - GitHub Actions workflow handles build and deployment

### Other Hosting Platforms

#### Netlify

```bash
npm run build
# Upload dist/ folder to Netlify
```

#### Vercel

```bash
npm i -g vercel
vercel --prod
```

#### Static Hosting

```bash
npm run build
# Upload dist/ folder to your hosting provider
```

## 🔧 Configuration

### Tailwind CSS Migration

This project was recently migrated from CSS Modules to Tailwind CSS v4, bringing several benefits:

#### Migration Benefits
- **Reduced bundle size**: Eliminated ~800+ lines of custom CSS
- **Improved consistency**: Unified design tokens and spacing
- **Better maintainability**: Inline utility classes with better documentation
- **Enhanced developer experience**: IntelliSense autocomplete and class validation
- **Modern CSS practices**: Utility-first approach with responsive design

#### Migration Process
1. **Installed Tailwind CSS v4** with proper PostCSS configuration
2. **Converted all components** from CSS Modules to Tailwind utilities
3. **Preserved original design** including gradients, spacing, and responsive behavior
4. **Added custom utilities** for text shadows and brand colors
5. **Removed legacy CSS files** (App.css, *.module.css)

#### Key Configuration Files
```javascript
// tailwind.config.js
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-app': 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      },
      colors: {
        primary: { /* 50-900 scale */ }
      }
    }
  }
}

// postcss.config.js
export default {
  plugins: {
    '@tailwindcss/postcss': {},
    autoprefixer: {},
  },
}
```

### Environment Variables

Create a `.env.local` file for local development (optional):

```env
# Optional: Enable development features
VITE_DEV_MODE=true
```

### GitHub Pages Setup

1. Go to repository Settings → Pages
2. Set Source to "GitHub Actions"
3. The workflow will automatically deploy on push to main

### Custom Domain (Optional)

1. Add `CNAME` file to `public/` directory:

   ```
   your-domain.com
   ```

2. Configure DNS with your domain provider

## 🧪 Testing

### Running Tests

```bash
# Install testing dependencies
npm install --save-dev @testing-library/react @testing-library/jest-dom vitest

# Run tests
npm test
```

### Test Structure

```
src/
├── __tests__/
│   ├── components/
│   ├── hooks/
│   ├── utils/
│   └── services/
```

## 🤝 Contributing

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Commit your changes**
   ```bash
   git commit -m 'Add amazing feature'
   ```
4. **Push to the branch**
   ```bash
   git push origin feature/amazing-feature
   ```
5. **Open a Pull Request**

### Code Style

- Follow the existing TypeScript and React patterns
- Use meaningful component and variable names
- Add proper TypeScript types for all functions
- Include JSDoc comments for complex functions
- Ensure accessibility compliance

#### Tailwind CSS Guidelines

- **Use semantic class grouping**: Layout → Spacing → Typography → Colors → States
- **Leverage responsive prefixes**: `sm:`, `md:`, `lg:`, `xl:` for breakpoints
- **Prefer utility classes** over custom CSS when possible
- **Use custom components** in `@layer components` for repeated patterns
- **Follow mobile-first** responsive design principles

```tsx
// Good: Organized class order
<div className="flex items-center justify-between w-full p-4 bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow">

// Good: Responsive design
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
```

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **[React](https://react.dev/)** - UI library
- **[Vite](https://vitejs.dev/)** - Build tool
- **[TypeScript](https://www.typescriptlang.org/)** - Type safety
- **[Tailwind CSS](https://tailwindcss.com/)** - Utility-first CSS framework

## 📞 Support

If you have any questions or need help:

1. Check the [Issues](https://github.com/YOUR_USERNAME/conversor/issues) page
2. Create a new issue with detailed description
3. Provide steps to reproduce any bugs

---

**Built with ❤️ using React, TypeScript, Tailwind CSS, and modern web standards**
