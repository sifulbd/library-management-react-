import { cn } from "@/lib/utils";

type Props = {
    title: string;
    description?: string;
    className?: string;
};

export const Banner = (props: Props) => {
    return (
        <div className="text-center">
            <h2 className="text-4xl mt-32">Ola, Welcome </h2>
        </div>
    );
};
