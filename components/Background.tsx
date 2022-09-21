const Background = ({ children }: any) => {
  return (
    <div className="bg-white dark:bg-slate-700 transition-all min-h-screen h-min p-4 pb-8">
      {children}
    </div>
  );
};

export default Background;
