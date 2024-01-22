const TypographyH1: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <h1 className="scroll-m-20 text-2xl font-extrabold tracking-tight lg:text-3xl">
      {children}
    </h1>
  );
};

export default TypographyH1;
