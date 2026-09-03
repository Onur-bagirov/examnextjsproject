import * as React from "react";
import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";

function FieldGroup({ className, ...props }: React.ComponentProps<"div">) 
{
    return (
        <div
            data-slot="field-group"
            className={cn("flex w-full flex-col gap-5", className)}
            {...props}/>
    );
}

function Field({ className, ...props }: React.ComponentProps<"div">) 
{
    return (
        <div
            data-slot="field"
            className={cn("flex w-full flex-col gap-1.5", className)}
            {...props}/>
    );
}

function FieldLabel({ className, ...props }: React.ComponentProps<typeof Label>) 
{
    return (
        <Label
            data-slot="field-label"
            className={cn("text-white", className)}
            {...props}/>
    );
}

function FieldDescription({ className, ...props }: React.ComponentProps<"p">) 
{
    return (
        <p
            data-slot="field-description"
            className={cn("text-sm leading-normal text-gray-500", className)}
            {...props}/>
    );
}

function FieldError({ className, ...props }: React.ComponentProps<"p">) 
{
    return (
        <p
            role="alert"
            data-slot="field-error"
            className={cn("text-sm font-medium text-red-500", className)}
            {...props}/>
    );
}

export { Field, FieldGroup, FieldLabel, FieldDescription, FieldError };