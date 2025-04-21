import React,{useState} from "react"

const MovieSearch = () => {
    const [query,setQuery] = useState("")
    const [searchMovie,setSearchMovie] = useState([])
    const [error,setError] = useState("")
   
    const API_KEY = "99eb9fd1"

    async function fetchData(){
        if(!query) return
        try{
            const response = await fetch(`https://www.omdbapi.com/?s=${query}&apikey=${API_KEY}`)
            const data = await response.json()
            if(data.Response === "True"){
                setSearchMovie(data.Search)
                setError("")
            }else{
                setSearchMovie([])
                setError("Invalid movie name. Please try again.")
            }
        }catch(err){
            setSearchMovie([])
            setError("Something went wrong. Please try again.")
        }
    }

    return(
        <div>
            <h2>Search Movie</h2>
            <input type="text" value={query} onChange={(e) => setQuery(e.target.value)} />
            <button onClick={fetchData}>Search</button>

            {error && <p className="error">{error}</p>}

            <div>
                {searchMovie.map((movie) => (
                    <div key={movie.imdbID}>
                        <h3>{movie.Title}({movie.Year})</h3>
                        <img src={movie.Poster !== "N/A" ? movie.Poster : "https://via.placeholder.com/150"} alt={movie.Title} width="150" />
                    </div>
                ))}
            </div>

        </div>
    )

}

export default MovieSearch;