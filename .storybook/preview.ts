import type { Preview } from "@storybook/react-vite";
import type { Decorator } from "@storybook/react";
import { useEffect } from "react";
import "@/stories/globalSB.css";

// @detect dark mode in the preview
const withTheme: Decorator = (Story, context) => {
  const { backgrounds } = context.globals;

  useEffect(() => {
    let isDark = false;

    if (backgrounds) {
      isDark =
        backgrounds.value === "#2c2c2c" ||
        backgrounds.value === "rgb(44, 44, 44)" ||
        backgrounds.value === "dark" ||
        backgrounds === "dark";
    }

    // apply dark mode
    document.documentElement.setAttribute(
      "data-theme",
      isDark ? "dark" : "light",
    );

    document.body.setAttribute("data-theme", isDark ? "dark" : "light");
  }, [backgrounds]);

  return Story();
};

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    a11y: {
      // 'todo' - show a11y violations in the test UI only
      // 'error' - fail CI on a11y violations
      // 'off' - skip a11y checks entirely
      test: "todo",
    },
    options: {
      storySort: {
        order: [
          "Docs", // Primer .mdx
          "Components",
        ],
      },
    },
    backgrounds: {
      default: "light",
      values: [
        {
          name: "light",
          value: "#ffffff",
        },
        {
          name: "dark",
          value: "#2c2c2c",
        },
      ],
    },
  },
  decorators: [withTheme],
  tags: ["autodocs"],
};

export default preview;
