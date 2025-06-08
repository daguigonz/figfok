import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "./Button";
import { Block } from "../Block/Block";

const MyDoc =() =>{
 }

const meta = {
  title: "Design System/Button",
  component: Button,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
        page: MyDoc,
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
} satisfies Meta<typeof Button>;


export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    variant: "primary",
    children: "Button",
  },
};
