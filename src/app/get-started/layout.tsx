import { FC, PropsWithChildren } from "react";

const layout: FC<PropsWithChildren> = ({ children }) => {
  return <div>{children}</div>;
};

export default layout;
