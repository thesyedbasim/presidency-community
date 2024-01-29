export const TypographyP: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return <p className="leading-7 [&:not(:first-child)]:mt-6">{children}</p>;
};
