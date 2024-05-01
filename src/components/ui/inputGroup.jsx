import React from "react";
import { Input } from "./input";
import { Label } from "./label";

const InputGroup = React.forwardRef(
  (
    {
      id,
      label,
      errorMessage,
      autocomplete,
      onChange,
      value,
      required,
      placeholder,
      onBlur,
      type,
      success,
      description,
      ...props
    },
    ref,
  ) => {
    return (
      <div className="grid gap-2">
        <Label htmlFor={id ? id : label}>
          {required && <span className="text-muted-foreground">*</span>}
          {label}
        </Label>

        <Input
          {...props}
          ref={ref}
          id={id ? id : label}
          name={id ? id : label}
          type={type ? type : "text"}
          autoComplete={autocomplete}
          onChange={onChange}
          value={value}
          required={required}
          placeholder={placeholder}
          onBlur={onBlur}
          className={
            (errorMessage && "border-destructive") ||
            (success && "border-green-500") ||
            ""
          }
        />
        {description && (
          <p className="text-muted-foreground text-sm">{description}</p>
        )}
        {errorMessage && (
          <p className="text-sm text-destructive">{errorMessage}</p>
        )}
      </div>
    );
  },
);

InputGroup.displayName = "InputGroup";

const TextAreaGroup = React.forwardRef(
  (
    {
      id,
      label,
      errorMessage,
      autocomplete,
      onChange,
      value,
      required,
      placeholder,
      onBlur,
      type,
      success,
      description,
      ...props
    },
    ref,
  ) => {
    return (
      <div className="grid gap-2">
        <Label htmlFor={id ? id : label}>
          {required && <span className="text-muted-foreground">*</span>}
          {label}
        </Label>

        <textarea
          {...props}
          ref={ref}
          id={id ? id : label}
          name={id ? id : label}
          type={type ? type : "text"}
          autoComplete={autocomplete}
          onChange={onChange}
          value={value}
          required={required}
          placeholder={placeholder}
          onBlur={onBlur}
          className={
            (errorMessage && "border-destructive") ||
            (success && "border-green-500") ||
            ""
          }
        />
        {description && (
          <p className="text-muted-foreground text-sm">{description}</p>
        )}
        {errorMessage && (
          <p className="text-sm text-destructive">{errorMessage}</p>
        )}
      </div>
    );
  },
);

TextAreaGroup.displayName = "TextAreaGroup";

export { InputGroup, TextAreaGroup };