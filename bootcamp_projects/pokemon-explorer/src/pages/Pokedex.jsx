import { useState, useEffect, useContext } from 'react'
import { ThemeContext } from '../context/ThemeContext'
import { Link, useNavigate } from 'react-router-dom'
import clsx from 'clsx'


const Pokedex = () => {
    const getInitialOffset = () => {
        const queryParams = new URLSearchParams(window.location.search);
        const offset = queryParams.get('offset');
        return offset ? parseInt(offset, 10) : 0;
    };
    const [pokemonList, setPokemonList] = useState([]);
    const [offset, setOffset] = useState(getInitialOffset)
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const { theme, toggleTheme } = useContext(ThemeContext);
    const [totalCount, setTotalCount] = useState(0)
    const navigate = useNavigate();



    useEffect(() => {
        const fetchPokemon = async () => {
            setLoading(true);
            setError(null);
            try {
                const res = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=20&offset=${offset}`);
                const data = await res.json();

                const details = [];

                for (const pokemon of data.results) {
                    const detailRes = await fetch(pokemon.url);
                    if (!detailRes.ok) throw new Error(`Failed to catch ${pokemon.name}`);
                    const detailData = await detailRes.json();
                    details.push(detailData);
                }

                setPokemonList(details);
                setTotalCount(data.count);
                console.log(totalCount)
                console.log(offset)
            } catch (e) {
                console.error('Error catching Pokes:', e);
            } finally {
                setLoading(false);
            }
        };

        fetchPokemon();
    }, [offset]);



    useEffect(() => {
        localStorage.setItem('pokedexOffset', offset);
    }, [offset]);



    const goToStart = () => setOffset(0);
    const goToEnd = () => setOffset(Math.floor((totalCount - 1) / 20) * 20);
    useEffect(() => {
        navigate(`?offset=${offset}`, { replace: true });
    }, [offset, navigate]);


    return (
        <div>
            <button onClick={toggleTheme}>
                {theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            </button>
            <div className="button-container">


                <div className="button-pairs">
                    <button onClick={goToStart} disabled={offset === 0}>Start</button>
                    <button onClick={() => { setOffset(offset - 20); }} disabled={offset === 0}>
                        Page Left
                    </button>
                </div>
                <div className="button-pairs">
                    <button onClick={() => { setOffset(offset + 20); }} disabled={offset + 20 >= totalCount}>
                        Page Right
                    </button>
                    <button onClick={goToEnd} disabled={offset + 20 >= totalCount}>End</button>
                </div>

            </div>
            {loading && <p>Loading pokes!</p>}
            {error && <p>{error}</p>}
            {!loading && !error && (
                <div className="card-grid">
                    {pokemonList.map((pokemon) => (
                        <Link to={`/pokemon/${pokemon.id}`} key={pokemon.id} className="card">
                            <img src={pokemon.sprites.front_default} alt={pokemon.name} className={clsx({ invert: theme === 'dark' })} />
                            <h3>{pokemon.name}</h3>
                        </Link>
                    ))}
                </div>
            )}
        </div>
    )
}
export default Pokedex;
