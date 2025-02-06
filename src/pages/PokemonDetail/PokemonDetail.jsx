import { Helmet } from "react-helmet-async"
import Layout from "../../components/Layout/Layout"
import { Link, Navigate, useLocation, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MdCatchingPokemon } from "react-icons/md";
import { FaChevronRight, FaMars, FaVenus } from "react-icons/fa";
import { Progress } from "@/components/ui/progress";
import { toast } from "@/hooks/use-toast";

const PokemonDetail = () => {
    const [pokemon, setPokemon] = useState({});
    const [loading, setLoading] = useState(true);
    const [isFavorite, setIsFavorite] = useState(false);

    const { name } = useParams();

    const location = useLocation();

    // Reset pokemon data when route changes
    useEffect(() => {
        setPokemon({});
    }, [location.pathname]);

    // Fetch Pokémon data
    useEffect(() => {
        if (!name) return;

        const getPokemonData = async () => {
            try {
                setLoading(true);
                const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`);
                if (response.status !== 200) return;

                const speciesResponse = await axios.get(response.data.species.url);
                const evolutionResponse = await axios.get(speciesResponse.data.evolution_chain.url);

                const types = response.data.types.map((t) => t.type.name);
                const abilities = response.data.abilities.map((a) => a.ability.name);
                const stats = response.data.stats.map((s) => ({ name: s.stat.name, value: s.base_stat }));

                const genderRate = speciesResponse.data.gender_rate;

                let malePercentage, femalePercentage;
                if (genderRate === -1) {
                    malePercentage = "Genderless";
                    femalePercentage = "Genderless";
                } else {
                    malePercentage = `${((8 - genderRate) / 8) * 100}%`;
                    femalePercentage = `${(genderRate / 8) * 100}%`;
                }

                // Get Description (flavor text in English)
                const descriptionEntry = speciesResponse.data.flavor_text_entries.find(entry => entry.language.name === "en");
                const description = descriptionEntry ? descriptionEntry.flavor_text.replace(/\n|\f/g, " ") : "Tidak ada deskripsi.";

                // Get Strengths & Weaknesses from the first type
                const typeResponse = await axios.get(response.data.types[0].type.url);
                const strengths = typeResponse.data.damage_relations.double_damage_to.map(t => t.name);
                const weaknesses = typeResponse.data.damage_relations.double_damage_from.map(t => t.name);

                // Get Evolution Chain
                const evolutions = [];

                const extractEvolutions = (evolutionData) => {
                    if (!evolutionData) return;

                    evolutions.push(evolutionData.species.name);

                    if (evolutionData.evolves_to.length > 0) {
                        evolutionData.evolves_to.forEach(nextEvolution => extractEvolutions(nextEvolution));
                    }
                };

                // Ambil evolusi dari data awal
                extractEvolutions(evolutionResponse.data.chain);

                // Set Pokémon data
                setPokemon({
                    id: response.data.id,
                    base_experience: response.data.base_experience,
                    picture: response.data.sprites.other["official-artwork"].front_default,
                    name: response.data?.name,
                    jp_name: speciesResponse.data.names[0]?.name,
                    gender: {
                        male: malePercentage,
                        female: femalePercentage
                    },
                    types,
                    species: speciesResponse.data.genera[7]?.genus,
                    habitat: speciesResponse.data.habitat?.name,
                    growth_rate: speciesResponse.data.growth_rate?.name,
                    height: response.data.height,
                    weight: response.data.weight,
                    strengths,
                    weaknesses,
                    abilities,
                    description,
                    stats,
                    evolutions
                });
            } catch (error) {
                console.error("Error fetching Pokémon data:", error);
            } finally {
                setLoading(false);
            }
        };

        getPokemonData();
    }, [name]);

    // Check if Pokémon is favorite
    useEffect(() => {
        const favoritePokemons = JSON.parse(localStorage.getItem("favoritePokemons")) || [];
        const isFavorite = favoritePokemons.some(p => p.id === pokemon?.id);
        setIsFavorite(isFavorite);
    }, [pokemon?.id]);

    // Save and remove favorite Pokemon
    const savePokemon = () => {
        const favoritePokemons = JSON.parse(localStorage.getItem("favoritePokemons")) || [];
        favoritePokemons.push({
            id: pokemon?.id,
            name: pokemon?.name,
            picture: pokemon?.picture,
            types: pokemon?.types,
            isFavorite: true
        });
        localStorage.setItem("favoritePokemons", JSON.stringify(favoritePokemons));
        toast({
            description: "Pokemons has been added to your favorite list.",
        });
    };

    const removePokemon = () => {
        const favoritePokemons = JSON.parse(localStorage.getItem("favoritePokemons")) || [];
        const updatedPokemons = favoritePokemons.filter(p => p.id !== pokemon?.id);
        localStorage.setItem("favoritePokemons", JSON.stringify(updatedPokemons));
        toast({
            description: "Pokemons has been removed from your favorite list.",
        });
    };

    const toggleFavorite = () => {
        if (isFavorite) {
            removePokemon();
        } else {
            savePokemon();
        }
        setIsFavorite(!isFavorite);
    };

    // Redirect to 404 page if pokemon is not found
    if (!loading && !pokemon?.id) {
        return <Navigate to="/404" replace />
    }

    return (
        <>
            <Helmet>
                <title>{name} | Pokemon App</title>
                <meta name="description" content="My favorite Pokemons" />
            </Helmet>
            <Layout>
                <div className="container">
                    {loading && (
                        <div className="flex items-center justify-center h-screen">
                            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary"></div>
                        </div>
                    )}
                    {!loading && pokemon && (
                        <Card className="bg-white bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-50 border border-gray-200 shadow-md rounded-2xl relative">
                            <button
                                type="button"
                                className="absolute top-4 right-4 w-16 h-16 flex items-center justify-center"
                                onClick={toggleFavorite}
                                title={isFavorite ? "Remove from favorites" : "Add to favorites"}
                            >
                                <MdCatchingPokemon size={80} className={isFavorite ? "text-red-500" : "text-slate-300"} />
                            </button>

                            <CardContent className="flex flex-col md:flex-row gap-6 p-6">
                                {/* Pokémon Image */}
                                <div className="w-full md:w-1/3 flex flex-col items-center">
                                    <img
                                        height={200}
                                        width={200}
                                        src={pokemon?.picture}
                                        className="object-contain drop-shadow-lg"
                                        alt={pokemon?.name}
                                    />
                                </div>

                                {/* Pokémon Info */}
                                <div className="w-full md:w-2/3">
                                    <span className="text-2xl font-bold text-gray-500">#{pokemon?.id}</span>
                                    <h1 className="text-5xl font-extrabold capitalize text-gray-900">{pokemon?.name}</h1>
                                    <p className="text-xl font-semibold text-gray-700 my-2">[{pokemon?.jp_name}]</p>

                                    {/* Pokémon Types */}
                                    <div className="flex flex-wrap gap-2 my-4">
                                        {pokemon?.types?.map((type, index) => (
                                            <Badge key={index} variant="outline" className="border-blue-500 font-bold capitalize py-2 px-3">
                                                {type}
                                            </Badge>
                                        ))}
                                    </div>

                                    {/* Pokémon Description */}
                                    <div className="mb-4">
                                        <p className="font-semibold text-lg text-gray-700">Description</p>
                                        <p className="text-gray-600">{pokemon?.description}</p>
                                    </div>

                                    {/* Gender */}
                                    <div className="mb-4">
                                        <p className="font-semibold text-lg text-gray-700">Gender</p>
                                        <div className="flex gap-4">
                                            <div className="flex items-center gap-2">
                                                <FaMars className="text-blue-500 text-lg" />
                                                <span className="font-medium">{pokemon?.gender?.male}</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <FaVenus className="text-pink-500 text-lg" />
                                                <span className="font-medium">{pokemon?.gender?.female}</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Abilities */}
                                    <div className="mb-4">
                                        <p className="font-semibold text-lg text-gray-700">Abilities</p>
                                        <div className="flex flex-wrap gap-2">
                                            {pokemon?.abilities?.map((ability, index) => (
                                                <Badge key={index} variant="default" className="bg-blue-500 font-bold capitalize py-2 px-3">
                                                    {ability}
                                                </Badge>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Weaknesses */}
                                    <div className="mb-4">
                                        <p className="font-semibold text-lg text-gray-700">Weaknesses</p>
                                        <div className="flex flex-wrap gap-2">
                                            {pokemon?.weaknesses?.map((weakness, index) => (
                                                <Badge key={index} variant="destructive" className="font-bold capitalize py-2 px-3">
                                                    {weakness}
                                                </Badge>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Height & Weight */}
                                    <div className="grid grid-cols-2 gap-4 mb-4">
                                        <div className="text-center">
                                            <p className="font-semibold text-lg text-gray-700">Height</p>
                                            <Badge variant="secondary" className="font-bold block text-center w-full py-3">{(pokemon?.height * 0.1).toFixed(1)} m</Badge>
                                        </div>
                                        <div className="text-center">
                                            <p className="font-semibold text-lg text-gray-700">Weight</p>
                                            <Badge variant="secondary" className="font-bold block text-center w-full py-3">{(pokemon?.weight * 0.1).toFixed(1)} kg</Badge>
                                        </div>
                                    </div>

                                    {/* Species & Habitat */}
                                    <div className="grid grid-cols-2 gap-4 mb-4">
                                        <div className="text-center">
                                            <p className="font-semibold text-lg text-gray-700">Species</p>
                                            <Badge variant="secondary" className="font-bold block text-center w-full py-3 capitalize">{pokemon?.species}</Badge>
                                        </div>
                                        <div className="text-center">
                                            <p className="font-semibold text-lg text-gray-700">Habitat</p>
                                            <Badge variant="secondary" className="font-bold block text-center w-full py-3 capitalize">{pokemon?.habitat}</Badge>
                                        </div>
                                    </div>

                                    {/* Base Experience & Grow Rate */}
                                    <div className="grid grid-cols-2 gap-4 mb-4">
                                        <div className="text-center">
                                            <p className="font-semibold text-lg text-gray-700">Base Exp</p>
                                            <Badge variant="secondary" className="font-bold block text-center w-full py-3">{pokemon?.base_experience}</Badge>
                                        </div>
                                        <div className="text-center">
                                            <p className="font-semibold text-lg text-gray-700">Growth Rate</p>
                                            <Badge variant="secondary" className="font-bold block text-center w-full py-3 capitalize">{pokemon?.growth_rate}</Badge>
                                        </div>
                                    </div>

                                    {/* Stats */}
                                    <div className="mb-4">
                                        <p className="font-semibold text-lg text-gray-700 text-center">Stats</p>
                                        <div className="flex flex-col gap-3">
                                            {pokemon?.stats?.map((stat, index) => (
                                                <div key={index} className="flex flex-col gap-1">
                                                    <div className="flex justify-between text-sm text-gray-700 font-semibold capitalize">
                                                        <span>{stat.name}</span>
                                                        <span>{stat.value}</span>
                                                    </div>
                                                    <Progress value={(stat.value / 255) * 100} className="h-4 bg-slate-200 rounded-full" />
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Evolutions */}
                                    <div className="text-center mb-6">
                                        <p className="font-semibold text-xl text-gray-800">Evolutions</p>
                                        <div className="flex flex-wrap justify-center items-center gap-4 mt-3">
                                            {pokemon?.evolutions?.map((evolution, index) => (
                                                <div className="flex items-center gap-2" key={index}>
                                                    <Link to={`/pokemons/${evolution}`} className="text-center">
                                                        <div className="bg-white w-[100px] h-[100px] rounded-lg shadow-md overflow-hidden transition-transform duration-200 hover:scale-105">
                                                            <img
                                                                className="w-full h-full object-contain"
                                                                src={`https://img.pokemondb.net/artwork/${evolution}.jpg`}
                                                                alt={evolution}
                                                            />
                                                        </div>
                                                        <p className="mt-1 text-sm font-medium text-gray-700 capitalize">{evolution}</p>
                                                    </Link>
                                                    {index !== pokemon?.evolutions?.length - 1 && (
                                                        <FaChevronRight className="text-lg text-gray-500" />
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    )}
                </div>
            </Layout>
        </>
    );
};

export default PokemonDetail;
