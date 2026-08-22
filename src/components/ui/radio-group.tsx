"use client"

import * as React from "react"
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group"
import { CircleIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { useAnswers } from "@/components/test/AnswerContext"

function RadioGroup({
  className,
  name,
  value,
  onValueChange,
  disabled,
  ...props
}: React.ComponentProps<typeof RadioGroupPrimitive.Root>) {
  const ctx = useAnswers();

  if (ctx && name && name.startsWith("question")) {
    const num = parseInt(name.replace("question", ""), 10);
    if (!isNaN(num)) {
      const ctxValue = ctx.answers[num] || "";
      const ctxOnValueChange = (val: string) => {
        ctx.setAnswer(num, val);
      };
      const ctxDisabled = ctx.disabled || disabled;

      return (
        <RadioGroupPrimitive.Root
          data-slot="radio-group"
          className={cn("grid gap-3", className)}
          name={name}
          value={ctxValue}
          onValueChange={ctxOnValueChange}
          disabled={ctxDisabled}
          {...props}
        />
      );
    }
  }

  return (
    <RadioGroupPrimitive.Root
      data-slot="radio-group"
      className={cn("grid gap-3", className)}
      name={name}
      value={value}
      onValueChange={onValueChange}
      disabled={disabled}
      {...props}
    />
  )
}

function RadioGroupItem({
  className,
  ...props
}: React.ComponentProps<typeof RadioGroupPrimitive.Item>) {
  return (
    <RadioGroupPrimitive.Item
      data-slot="radio-group-item"
      className={cn(
        "border-input text-primary focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 aspect-square size-4 shrink-0 rounded-full border shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    >
      <RadioGroupPrimitive.Indicator
        data-slot="radio-group-indicator"
        className="relative flex items-center justify-center"
      >
        <CircleIcon className="fill-primary absolute top-1/2 left-1/2 size-2 -translate-x-1/2 -translate-y-1/2" />
      </RadioGroupPrimitive.Indicator>
    </RadioGroupPrimitive.Item>
  )
}

export { RadioGroup, RadioGroupItem }
