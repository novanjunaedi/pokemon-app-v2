import { Helmet } from "react-helmet-async"
import Layout from "../../components/Layout/Layout"

const About = () => {
    return (
        <>
            <Helmet>
                <title>About | Pokemon App</title>
                <meta name="description" content="My favorite Pokemons" />
            </Helmet>
            <Layout>
                <div className="container">
                    <div className="flex flex-col lg:flex-row items-center justify-between gap-5">
                        <div className="flex flex-col items-center w-full lg:w-1/2">
                            <img height={200} width={200} className="object-contain" src="/assets/pokeball.png" alt="Pokeball" />
                            <img height={300} width={300} className="object-contain" src="/assets/pokedex-logo.png" alt="Pokedex" />
                        </div>
                        <div className="w-full lg:w-1/2 text-center lg:text-start">
                            <h1 className="text-4xl lg:text-8xl font-bold mb-5">Pokédex</h1>
                            <p>Pokédex adalah ensiklopedia elektronik portabel yang digunakan dalam permainan Pokémon untuk mencatat dan mempelajari Pokémon. Pokédex berfungsi untuk mengidentifikasi dan mempelajari berbagai spesies Pokémon yang ditemukan oleh pemain. </p>
                        </div>
                    </div>

                    <div className="flex flex-col lg:flex-row items-center justify-between mt-[50px] gap-5">
                        <div className="mt-[100px] space-y-5 w-full lg:w-2/3 mb-10">
                            <h2 className="text-4xl font-bold">Pokémon</h2>
                            <p>Pokémon adalah makhluk fiksi yang bisa ditangkap, dilatih, dan digunakan dalam pertempuran oleh trainer Pokémon. Setiap Pokémon memiliki tipe, kemampuan, dan evolusi yang berbeda-beda. Tujuan utama dalam game Pokémon biasanya adalah:</p>
                            <ul className="list-disc list-inside">
                                <li>Menangkap dan melengkapi Pokédex (daftar semua Pokémon yang tersedia).</li>
                                <li>Melatih Pokémon untuk menjadi lebih kuat.</li>
                                <li>Mengalahkan Gym Leader dan menjadi Pokémon Champion.</li>
                                <li>Melawan organisasi jahat seperti Team Rocket, Team Magma, dll.</li>
                            </ul>
                        </div>
                        <div className="flex flex-col items-center w-full lg:w-1/2">
                            <img height={300} width={300} className="object-contain" src="/assets/pikachu.png" alt="Pikachu" />
                        </div>
                    </div>
                </div>
            </Layout>
        </>
    );
};

export default About;
