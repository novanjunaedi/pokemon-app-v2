import { Link } from "react-router-dom";
import Item from "../Item/Item"

const PokemonList = ({ pokemons }) => {
    return (
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-7">
            {pokemons?.map((pokemon, index) => {
                return (
                    <Link to={`/pokemons/${pokemon.name}`} key={index}>
                        <Item
                            id={pokemon.id}
                            name={pokemon.name}
                            thumbnail={pokemon.picture}
                            types={pokemon.types}
                            isFavorite={pokemon.isFavorite}
                        />
                    </Link>
                );
            })}
        </section>
    )
}

export default PokemonList