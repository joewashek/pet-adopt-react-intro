import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import fetchSearch from "./fetchSearch";
import useBreedList from "./useBreedList";
import Results from "./Results";
const ANIMALS = ["bird","dog","cat","reptile","rabbit"];

const SearchParams = () => {
    const [requestParams, setRequestParams] = useState({
        location: "",
        animal: "",
        breed: ""
    });
    const [animal,setAnimal] = useState("");

    const [breeds] = useBreedList(animal);

    const results = useQuery({queryKey: ["search",requestParams], queryFn: fetchSearch});
    const pets = results?.data?.pets ?? [];
    
        return (
        <div className="search-params">
            <form onSubmit={e => {
                e.preventDefault();
                const formData = new FormData(e.target);
                const obj = {
                    animal: formData.get("animal") ?? "",
                    breed: formData.get("breed") ?? "",
                    location: formData.get("location") ?? ""
                };
                setRequestParams(obj);
                }}
            >
                <label htmlFor="location">
                    Location
                </label>
                <input
                    name="location"
                    id="location" 
                    placeholder="Enter a location" 
                 />
                 <label htmlFor="animal">
                    Animal
                </label>
                <select id="animal" value={animal} onChange={e => {setAnimal(e.target.value);}}>
                    <option></option>
                    {ANIMALS.map(animal => {
                        return <option key={animal}>{animal}</option>
                    })}
                </select>
                <label htmlFor="breed">
                    Breed
                </label>
                <select id="breed" disabled={breeds.length === 0} name="breed">
                    <option></option>
                    {breeds.map(breed => {
                        return <option key={breed}>{breed}</option>
                    })}
                </select>
                <button>Submit</button>
            </form>
            <Results pets={pets} />
        </div>
    )
}

export default SearchParams