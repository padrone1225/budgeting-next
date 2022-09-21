import { MouseEventHandler, PropsWithChildren } from "react";

interface ButtonProps {
  onClick?: MouseEventHandler;
  primary?: boolean;
  type?: "button" | "submit";
  disabled?: boolean;
}

function Button({
  children,
  primary = false,
  type = "button",
  ...rest
}: PropsWithChildren<ButtonProps>) {
  const isPrimary = () =>
    primary
      ? "bg-violet-500 dark:bg-teal-600"
      : "bg-violet-300 dark:bg-teal-300 dark:text-slate-500";

  const className = `${isPrimary()} px-2 md:px-4 py-2 m-2 lg:rounded-full rounded-lg disabled:opacity-50 text-lg `;

  return (
    <button type={type} className={className} {...rest}>
      {children}
    </button>
  );
}

export default Button;
