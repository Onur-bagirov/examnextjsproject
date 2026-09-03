import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const inputVariants = cva(
    "w-full min-w-0 outline-none transition-colors disabled:pointer-events-none disabled:opacity-50",
    {
        variants: 
        {
            variant: 
            {
                default:
                    "h-10 rounded-md border border-gray-300 bg-white px-3 text-sm text-gray-900 placeholder:text-gray-400 focus-visible:border-yellow-400 focus-visible:ring-2 focus-visible:ring-yellow-400/40",
                auth: "h-12 rounded-lg border border-gray-700 bg-gray-800 px-4 text-sm text-white placeholder:text-gray-400 focus-visible:border-yellow-400 focus-visible:ring-2 focus-visible:ring-yellow-400/70 [color-scheme:dark]",
            },
        },
        defaultVariants: 
        {
            variant: "default",
        },
    }
);

export interface InputProps
    extends React.InputHTMLAttributes<HTMLInputElement>,
        VariantProps<typeof inputVariants> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
    ({ className, type, variant, ...props }, ref) => 
    {
        return (
            <input
                type={type}
                data-slot="input"
                ref={ref}
                className={cn(inputVariants({ variant, className }))}
                {...props}/>
        );
    }
);

Input.displayName = "Input";
export { Input, inputVariants };