import type { Meta, StoryObj } from "@storybook/react"
import { Switch } from "./Switch"
// import React, { useState } from "@storybook/addons"

const meta = {
  title: "Components/Switch",
  component: Switch,
  tags: ["autodocs"],
  parameters: {
    layout: "centered"
  },
  argTypes: {
    variant: {
      control: "select",
      options: ["primary", "secondary"]
    },
    disabled: {
      control: "boolean"
    },
    checked: {
      control: "boolean"
    },
    onChange: { action: "changed" }
  }
} satisfies Meta<typeof Switch>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    id: "primary-switch",
    variant: "primary",
    children: "Default switch checkbox input",
    disabled: false
  }
}
