import { PropsWithChildren, useEffect, useState } from "react";

interface Props {
  show: boolean;
}

const Fade = ({ show, children }: PropsWithChildren<Props>) => {
  const [render, setRender] = useState(show);

  useEffect(() => {
    if (show) setRender(true);
  }, [show]);

  const onAnimationEnd = () => {
    if (!show) setRender(false);
  };

  return render ? (
    <div
      className={`${
        show
          ? "h-min max-h-[13rem] opacity-100  overflow-y-auto"
          : " max-h-0 opacity-0"
      } transition-all duration-2000 overflow-y-auto`}
      onAnimationEnd={onAnimationEnd}
    >
      {children}
    </div>
  ) : null;
};

export default Fade;
