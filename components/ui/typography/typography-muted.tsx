const TypographyMuted: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return <p className="text-sm text-muted-foreground">{children}</p>;
};

export default TypographyMuted;
