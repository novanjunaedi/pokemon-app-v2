import { MdCatchingPokemon } from "react-icons/md";
import { Badge } from "../ui/badge";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../ui/card";

const Item = ({ id, thumbnail, name, types, isFavorite }) => {
    return (
        <Card className="bg-white bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-50 border border-gray-100 rounded-2xl hover:shadow-lg hover:scale-105 animate-ease-in duration-300">
            <CardHeader className="bg-slate-50 w-full h-[200px] mb-3 rounded-2xl overflow-hidden relative">
                <MdCatchingPokemon
                    className="absolute inset-0 m-auto text-[500px] text-slate-300 opacity-30 rotate-45 right-[-90px] bottom-[-90px]"
                />
                <img className="w-full h-full object-contain p-3 z-10" src={thumbnail} alt={name} />
                <Badge
                    variant="default"
                    className="absolute top-3 left-3 bg-blue-500 font-bold w-[40px] block text-end"
                >
                    {id}
                </Badge>
                {isFavorite && (
                    <MdCatchingPokemon className="absolute top-3 right-3 text-2xl text-red-500" />
                )}
            </CardHeader>

            <CardContent>
                <CardTitle className="text-center capitalize font-bold">{name}</CardTitle>
            </CardContent>
            <CardFooter className="flex flex-wrap flex-grow gap-2 justify-center">
                {types?.map((type, index) => {
                    return (
                        <Badge
                            key={index}
                            variant="outline"
                            className="border-blue-500 font-bold block text-end capitalize"
                        >
                            {type}
                        </Badge>
                    );
                })}
            </CardFooter>
        </Card>
    );
};

export default Item;
