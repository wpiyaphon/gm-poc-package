# 🧩 GM POC Package

A CLI tool to scaffold customizable React UI components into your project — inspired by [shadcn/ui](https://github.com/shadcn-ui/ui), but simplified and customizable.

## ✨ Features

- 🚀 Quick component scaffolding
- 🎨 Customizable component templates
- 🔧 TypeScript support
- 🎯 Flexible target directory configuration

## 🔐 Installation (Private Package)

Since this package is private and hosted on GitHub Packages, you need to configure your `.npmrc` file:

1. Create or update your `.npmrc` file in your project root:

   ```bash
   touch .npmrc
   ```

2. Add the following to `.npmrc`:

   ```bash
   @wpiyaphon:registry=https://npm.pkg.github.com/
   //npm.pkg.github.com/:_authToken=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
   ```

3. Install the package using your preferred package manager:

   ```bash
   # Using npm
   npm install -D @wpiyaphon/gm-poc-package

   # Using yarn
   yarn add -D @wpiyaphon/gm-poc-package

   # Using pnpm
   pnpm add -D @wpiyaphon/gm-poc-package
   ```

## 🚀 Usage

### Adding Components

Add a UI component using the CLI:

```bash
pnpm dlx @wpiyaphon/gm-poc-package add button
```

This will generate the component in the default location:

```bash
src/components/ui/button.tsx
```

### Custom Target Directory

You can specify a custom target directory for component generation:

```bash
pnpm dlx @wpiyaphon/gm-poc-package add button --target src/shared/ui
```

### Available Components

Currently available components:

- `button` - A customizable button component

## 📁 Project Structure

```bash
gm-poc-package/
├── src/              # Source code
│   └── index.ts      # CLI entry point
├── templates/        # Component templates
│   └── button.tsx    # Button component template
├── dist/            # Compiled output
├── .npmrc           # NPM configuration
├── package.json     # Project configuration
└── README.md        # Documentation
```

## 🔧 Development

### Prerequisites

- Node.js >= 16.8.0
- npm, yarn, or pnpm

### Scripts

```bash
# Run CLI in development mode
npm run dev

# Build the package
npm run build
```

## 📝 License

ISC
