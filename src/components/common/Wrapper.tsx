import type { ReactNode } from "react";

type Props = {
    children: ReactNode;
    className?: string;
};

const Wrapper = ({ children, className }: Props) => {
    return <div className={`container mx-auto px-2.5 py-8 md:py-10 lg:py-12 ${className}`}>{children}</div>;
};

export default Wrapper;
