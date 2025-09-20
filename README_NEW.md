# 🪿🤡🕷️ Currency Converter to Fictional Units

A modern React TypeScript application that converts real currencies (USD, COP, MXN) to fictional currency units: **Gansitos**, **Balatros**, and **Silksongs**.

![Demo Screenshot](https://via.placeholder.com/800x400/667eea/ffffff?text=Currency+Converter+Demo)

## ✨ Features

- **Real-time Exchange Rates**: Fetches current USD, COP, and MXN rates from the Frankfurter API
- **Fictional Currency Conversion**: Converts real money to custom units with proper breakdown
- **Responsive Design**: Mobile-first design that works on all device sizes
- **Accessibility**: WCAG compliant with proper ARIA attributes and keyboard navigation
- **Modern Tech Stack**: Built with React 19, TypeScript, and Vite
- **Automated Deployment**: GitHub Actions workflow for seamless deployment to GitHub Pages

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

### Project Structure

```
src/
├── components/           # Reusable UI components
│   ├── AmountInput.tsx
│   ├── ConversionResult.tsx
│   ├── CurrencySelector.tsx
│   ├── ErrorDisplay.tsx
│   ├── ExchangeRatesDisplay.tsx
│   ├── LoadingSpinner.tsx
│   └── *.module.css     # Component-specific styles
├── hooks/               # Custom React hooks
│   ├── useCurrencyConverter.ts
│   └── useExchangeRates.ts
├── services/            # API services
│   └── exchangeRateService.ts
├── types/               # TypeScript type definitions
│   ├── currency.ts
│   ├── components.ts
│   └── index.ts
├── utils/               # Utility functions
│   └── currencyUtils.ts
├── App.tsx             # Main application component
├── App.css             # Application styles
├── index.css           # Global styles
└── main.tsx            # Application entry point
```

### Key Technologies

- **React 19** - Latest React with modern features
- **TypeScript** - Type safety and better developer experience
- **Vite** - Fast build tool and development server
- **CSS Modules** - Scoped styling approach
- **Frankfurter API** - Real-time exchange rates

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

- **Code splitting** for optimal bundle sizes
- **React.memo** for component optimization
- **Efficient state management** with custom hooks
- **Optimized CSS** with modern properties

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

### Environment Variables

Create a `.env.local` file for local development:

```env
# Optional: Custom API endpoint
VITE_API_BASE_URL=https://api.frankfurter.dev

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

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **[Frankfurter API](https://frankfurter.dev/)** - Free exchange rates API
- **[React](https://react.dev/)** - UI library
- **[Vite](https://vitejs.dev/)** - Build tool
- **[TypeScript](https://www.typescriptlang.org/)** - Type safety

## 📞 Support

If you have any questions or need help:

1. Check the [Issues](https://github.com/YOUR_USERNAME/conversor/issues) page
2. Create a new issue with detailed description
3. Provide steps to reproduce any bugs

---

**Built with ❤️ using React, TypeScript, and modern web standards**
