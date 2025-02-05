import { useEffect, useState } from "react"
import { Helmet } from "react-helmet-async"
import Layout from "../../components/Layout/Layout"
import PokemonList from "../../components/PokemonList/PokemonList"
import { Button } from "@/components/ui/button"
import { MdCatchingPokemon } from "react-icons/md"

const Favorites = () => {
    const [pokemons, setPokemons] = useState([]);
    const [limit, setLimit] = useState(20);

    useEffect(() => {
        const favoritePokemons = JSON.parse(localStorage.getItem("favoritePokemons")) || [];
        const sortedPokemons = favoritePokemons.sort((a, b) => a.id - b.id);
        setPokemons(sortedPokemons);
    }, []);

    return (
        <>
            <Helmet>
                <title>Favorites | Pokemon App</title>
                <meta name="description" content="My favorite Pokemons" />
            </Helmet>
            <Layout>
                <div className="container">
                    {pokemons.length === 0 && <div className="flex items-center justify-center h-screen">
                        <div className="flex flex-col items-center">
                            <MdCatchingPokemon className="text-[100px] text-slate-200" />
                            <p>No favorite Pokemon yet</p>
                        </div>
                    </div>}
                    {pokemons.length > 0 && (
                        <PokemonList pokemons={pokemons.slice(0, limit)} />
                    )}
                    {pokemons.length > limit && (
                        <div className="text-center my-[25px]">
                            <Button variant="default" onClick={() => setLimit(limit + 20)}>
                                Load more Pokemons
                            </Button>
                        </div>
                    )}
                </div>
            </Layout>
        </>
    );
};

export default Favorites;
