
// css
import styles from './Search.module.css';

// hooks
import { useQuery } from '../../hooks/useQuery'; // custom hook to return url params

const Search = () => {
    const query = useQuery();
    const search = query.get("q"); // get() is a method from "URLSearchParams()" by custom hook for get params

    return (
        <div>
            <h1>Search</h1>
            <p>{ search }</p>
        </div>
    );
};

export default Search;