# @wpiyaphon/gm-poc-package

A React component library with a customizable Button component built with TypeScript.

## Installation

```bash
npm install @wpiyaphon/gm-poc-package
# or
yarn add @wpiyaphon/gm-poc-package
```

## Usage

### Button Component

The Button component is a customizable button that can be used in your React applications. It's implemented as a React functional component with TypeScript.

```tsx
import { Button } from "@wpiyaphon/gm-poc-package";

function App() {
  return (
    <div>
      <Button
        variant="primary"
        size="medium"
        onClick={() => alert("Button clicked!")}
      >
        Click Me
      </Button>

      <Button variant="secondary" size="large" disabled>
        Disabled Button
      </Button>

      <Button variant="outline" size="small">
        Small Outline Button
      </Button>
    </div>
  );
}
```

### Props

| Prop      | Type                                  | Default   | Description                                   |
| --------- | ------------------------------------- | --------- | --------------------------------------------- |
| variant   | 'primary' \| 'secondary' \| 'outline' | 'primary' | The visual style of the button                |
| size      | 'small' \| 'medium' \| 'large'        | 'medium'  | The size of the button                        |
| disabled  | boolean                               | false     | Whether the button is disabled                |
| onClick   | function                              | -         | Function called when the button is clicked    |
| children  | ReactNode                             | -         | The content of the button                     |
| className | string                                | ''        | Additional CSS classes to apply to the button |

### TypeScript Support

This package is written in TypeScript and provides type definitions. You can import the types directly:

```tsx
import {
  Button,
  ButtonProps,
  ButtonVariant,
  ButtonSize,
} from "@wpiyaphon/gm-poc-package";

// Use the types in your code
const MyButton: React.FC<ButtonProps> = (props) => {
  return <Button {...props} />;
};
```

## License

ISC
