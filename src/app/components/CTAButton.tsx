import Link from "next/link";

interface CTAButtonProps {
  href?: string;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "secondary-white" | "tertiary";
  children: React.ReactNode;
  className?: string;
  type?: "button" | "submit";
  disabled?: boolean;
}

export default function CTAButton({
  href,
  onClick,
  variant = "primary",
  children,
  className = "",
  type = "button",
  disabled = false,
}: CTAButtonProps) {
  const baseStyles = "inline-flex items-center justify-content gap-2 font-semibold transition-all duration-300 text-center";

  const variantStyles: Record<string, string> = {
    primary: "btn-property-primary",
    secondary: "btn-property-secondary",
    "secondary-white": "btn-property-secondary-white",
    tertiary: "btn-property-tertiary",
  };

  const combinedClassName = `${baseStyles} ${variantStyles[variant]} ${className} ${disabled ? "opacity-50 cursor-not-allowed" : ""}`;

  if (href) {
    return (
      <Link href={href} className={combinedClassName}>
        {children}
      </Link>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={combinedClassName}
    >
      {children}
    </button>
  );
}
