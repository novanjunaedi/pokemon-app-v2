import { Helmet } from "react-helmet-async"
import Layout from "../../components/Layout/Layout"
import { MdCatchingPokemon } from "react-icons/md"

const NotFound = () => {
    return (
        <>
            <Helmet>
                <title>NotFound | Pokemon App</title>
                <meta name="description" content="My favorite Pokemons" />
            </Helmet>
            <Layout>
                <div className="container">
                    <div className="flex flex-col items-center">
                        <MdCatchingPokemon className="text-[100px] text-slate-200" />
                        <h1 className="text-4xl font-bold">404</h1>
                        <p>Page Not Found</p>
                    </div>
                </div>
            </Layout>
        </>
    );
};

export default NotFound;
