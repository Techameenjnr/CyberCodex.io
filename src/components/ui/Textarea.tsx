import { TextareaHTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  fullWidth?: boolean;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, label, error, fullWidth = false, id, ...props }, ref) => {
    const textareaId = id || label?.toLowerCase().replace(/\s+/g, "-");

    return (
      <div className={cn("flex flex-col gap-2", fullWidth && "w-full")}>
        {label && (
          <label
            htmlFor={textareaId}
            className="text-sm font-medium text-cyber-text-primary"
          >
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          id={textareaId}
          className={cn(
            "px-4 py-3 rounded-lg",
            "bg-cyber-dark-secondary text-cyber-text-primary",
            "border border-cyber-border",
            "placeholder:text-cyber-text-muted",
            "focus:outline-none focus:ring-2 focus:ring-cyber-primary focus:border-transparent",
            "transition-all duration-200",
            "disabled:opacity-50 disabled:cursor-not-allowed",
            "resize-none",
            error && "border-cyber-danger focus:ring-cyber-danger",
            className
          )}
          {...props}
        />
        {error && (
          <p className="text-sm text-cyber-danger">{error}</p>
        )}
      </div>
    );
  }
);

Textarea.displayName = "Textarea";
