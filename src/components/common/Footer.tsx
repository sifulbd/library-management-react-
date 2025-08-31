import { Link } from "react-router";

const Footer = () => {
    return (
        <footer className="bg-secondary">
            <div className="container mx-auto px-2.5 pt-12">
                <div className="flex flex-col tems-center text-center">
                    <Link to="/" className="">
                        <div className="text-chart-1 font-bold text-2xl">BookMan</div>
                    </Link>
                    <p className="mt-2">Efficiently manage library with our platform, connecting book lovers and writers.</p>
                </div>

                <div className="py-6 mt-16 text-center">
                    <p>BookMan @ All right reserved</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
