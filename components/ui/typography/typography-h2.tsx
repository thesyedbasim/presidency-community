const TypographyH2: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <h2 className="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
      {children}
    </h2>
  );
};

export default TypographyH2;
