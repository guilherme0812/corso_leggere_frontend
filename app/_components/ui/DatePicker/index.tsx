"use client";

import * as React from "react";
import { ChevronDownIcon } from "lucide-react";

import { Button } from "../Button";
import { Calendar } from "../calendar";
import { Popover, PopoverContent, PopoverTrigger } from "../popover";
import { Label } from "../Label";

export type DatePickerParams = {
  label?: string;
  placeholder?: string;
  variant?: "link" | "default" | "filled" | "destructive" | "outline" | "secondary" | "ghost" | null | undefined;
  onChange?(date?: Date): void;
  initialValue?: Date;
};

export function DatePicker({ label, variant, placeholder = "Select date", onChange, initialValue }: DatePickerParams) {
  const [open, setOpen] = React.useState(false);
  const [date, setDate] = React.useState<Date | undefined>(initialValue);

  return (
    <div className="flex flex-col gap-3 bg-red-200">
      {label ? (
        <Label htmlFor="date" className="px-1">
          {label}
        </Label>
      ) : null}

      <Popover open={open} onOpenChange={setOpen} modal={false}>
        <PopoverTrigger asChild>
          <Button variant={variant || "filled"} id="date" className="w-full justify-between font-normal">
            {date ? date.toLocaleDateString() : placeholder}
            <ChevronDownIcon />
          </Button>
        </PopoverTrigger>

        <PopoverContent className="w-auto overflow-hidden p-0 pointer-events-auto z-[9999]" align="start">
          <Calendar
            mode="single"
            selected={date}
            captionLayout="dropdown"
            endMonth={new Date(2100, 11)}
            onSelect={(date) => {
              setDate(date);
              onChange?.(date);
              setOpen(false);
            }}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
