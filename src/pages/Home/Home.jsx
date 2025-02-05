import { useRef, useState } from "react"
import { Helmet } from "react-helmet-async"
import { useEffect } from "react"
import axios from "axios"
import Layout from "../../components/Layout/Layout"
import PokemonList from "../../components/PokemonList/PokemonList"
import { Button } from "@/components/ui/button"

const Home = () => {
    const [pokemons, setPokemons] = useState([]);
    const [offset, setOffset] = useState(0);
    const [loading, setLoading] = useState(false);
    const isFetching = useRef(false);

    const LIMIT = 20;

    const getPokemons = async () => {

        if (isFetching.current) return;
        isFetching.current = true;

        setLoading(true);

        try {
            const response = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=${LIMIT}&offset=${offset}`);
            if (response.status !== 200) return;

            const pokemonList = response.data.results;

            // Fetch details of each Pokémon
            const pokemonDetails = await Promise.all(
                pokemonList.map(async (pokemon) => {
                    const response = await axios.get(pokemon.url);
                    const details = response.data;
                    const favoritePokemons = JSON.parse(localStorage.getItem("favoritePokemons")) || [];
                    const isFavorite = favoritePokemons.some(p => p.id === details.id);

                    return {
                        id: details.id,
                        name: details.name,
                        picture: details.sprites.other["official-artwork"].front_default,
                        types: details.types.map((type) => type.type.name),
                        isFavorite: isFavorite
                    };
                })
            );
            setPokemons((prev) => {
                const newList = [...prev, ...pokemonDetails];
                return newList.filter((pokemon, index, arr) => arr.findIndex(p => p.name === pokemon.name) === index);
            });
            setOffset((prevOffset) => prevOffset + LIMIT);
        } catch (error) {
            throw new Error(error.message);
        } finally {
            setLoading(false);
            isFetching.current = false;
        };
    };

    useEffect(() => {
        if (!loading) {
            getPokemons();
        };
    }, []);

    return (
        <>
            <Helmet>
                <title>Home | Pokemon App</title>
                <meta name="description" content="Home page of Pokemon App" />
            </Helmet>
            <Layout>
                <div className="container">
                    <PokemonList pokemons={pokemons} />
                    <div className="text-center mt-[25px]">
                        <Button variant="default" onClick={getPokemons} disabled={loading}>
                            {loading ? "Loading..." : "Load more Pokemons"}
                        </Button>
                    </div>
                </div>
            </Layout>
        </>
    )
}

export default Home