import { useState, useEffect } from "react";
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './components/Header';
import Spinner from './components/Spinner';
import People from "./components/People";

function App() {
  const [people, setPeople] = useState(null);
  const [charInput, setCharInput] = useState(null);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState({ prev: false, next: true });

  useEffect(() => {
    document.title = "Starwars API";
    (async () => {
      const req = await fetch("https://swapi.dev/api/people");
      const res = await req.json();
      console.log(res);
      setPage({ prev: res.previous, next: res.next });
      setPeople(res.results);
      setLoading(false);
    })();
  }, []);

  const handleSearch = async () => {
    if (!charInput) return;
    const req = await fetch(
      `https://swapi.dev/api/people/?search=${charInput.trim()}`
    );
    const res = await req.json();
    setPeople(res.results);
  };
  const pagination = async (type, { prev, next }) => {
    if (type === "next") {
      const req = await fetch(next);
      const res = await req.json();

      setPage({ prev: res.previous, next: res.next });
      setPeople(res.results);
      return;
    } else {
      if (!prev) return;
      const req = await fetch(prev);
      const res = await req.json();

      setPage({ prev: res.previous, next: res.next });
      setPeople(res.results);
      return;
    }
  };
  return (
    <div className="App">

      <div className="row">
        {loading ? <Spinner /> :
          <Header />
        }

      </div>

      <div className="row mb-4 mt-5 ms-5">
        <div id="search-bar-div" className="input-group ms-5">
          <label id="search-label">Search character by name</label>
          <input
            type="text" className="form-control search-bar text-start"
            aria-label="Search for Starwar character"
            name="characterSearch"
            id="search-bar"
            placeholder="🔍"
            value={charInput !== null ? charInput : ""}
            onChange={(e) => {
              setCharInput(e.target.value);
            }}
          />

          <div id="buttons-div" className="input-group-append  me-5">
            <button id="search-button" className="btn input-group-text btn-success" onClick={() => handleSearch()}>
              SEARCH
            </button>
          </div>
        </div>
      </div>

      <div className="row">
        <section>
          <h2 className="text-center"> Starwars Characters List  </h2>
          <div className="charcterContainer">
            {people === null ? (
              <Spinner />
            ) : (
              people.map((charData, index) => (
                <People key={index} charData={charData} index={index} />
              ))
            )}

            {people !== null && people.length === 0 ? (
              <div className="card_error text-center">
                <h4>Data not found...</h4>
                <h2>Please try again!</h2>
              </div>
            ) : ("")}
          </div>
          <div className="pagination text-center">
            <button
              onClick={() => pagination("prev", page)}
              style={{ display: page.prev === null ? "none" : "inline-block" }}>
              ⯇ PREV
            </button>

            <button
              onClick={() => pagination("next", page)}
              style={{ display: page.next === null ? "none" : "inline-block" }}>
              NEXT ⯈
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}

export default App;