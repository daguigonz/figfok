// Replace your-framework with the framework you are using, e.g. react-vite, nextjs, nextjs-vite, etc.
import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "./Button";

const meta = {
  title: "Design System/ButtonDemo",
  component: Button,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: `
# Button Component 2.0

Un componente Button altamente optimizado y personalizable construido con React, TypeScript y CSS Modules.

## Características

- ✅ **6 variantes**: Primary, Secondary, Outline, Danger, Ghost, Link
- ✅ **4 tamaños**: Small, Medium, Large, Icon-only
- ✅ **Estados avanzados**: Loading, Disabled, Full-width
- ✅ **Soporte para iconos**: Inicio, final o ambos
- ✅ **Accesibilidad**: ARIA compliant, focus management
- ✅ **Optimizado**: forwardRef, useCallback, CSS Modules
- ✅ **TypeScript**: Tipado completo con inferencia automática


## Uso básico

\`\`\`tsx
import { Button } from "@/components/button"

<Button variant="primary" size="md">
  Click me
</Button>
\`\`\`
        `,
      },
    },
    backgrounds: {
      default: "light",
      values: [
        { name: "light", value: "#ffffff" },
        { name: "dark", value: "#1a1a1a" },
        { name: "gray", value: "#f5f5f5" },
      ],
    },
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    variant: "primary",
    children: "Button",
  },
};
