import { useState, useEffect } from "react";
import { HttpGet } from "../core/store/httpHelper";
import { Card } from "../core/components/Card";

export const Home = () => {
  const [characterList, setCharacterList] = useState([]);
  const [searchList, setSearchList] = useState([]);

  useEffect(() => {
    const getCharacters = async () => {
      try {
        let charList = await HttpGet();
        setCharacterList(charList);
        setSearchList(charList);
      } catch (error) {
        console.error(error);
      }
    };
    getCharacters();
  }, []);

  const filterCharacters = (e) => {
    let searchQuery = e?.target?.value.toLowerCase();
    if (searchQuery) {
      const filteredCharacters = characterList.filter((character) => {
        return (
          character.name.toLowerCase().includes(searchQuery) ||
          character.house.toLowerCase().includes(searchQuery) ||
          character.actor.toLowerCase().includes(searchQuery)
        );
      });
      setSearchList(filteredCharacters);
    } else {
      setSearchList(characterList);
    }
  };

  const Characters = () => {
    return (
      !!searchList.length &&
      searchList.map((character, index) => {
        return <Card key={index} character={character} />;
      })
    );
  };

  return (
    <>
      <div className="row m-0 m-5 justify-content-lg-center">
        <div className="col col-12 text-center">
          <h3>Harry Potter Characters</h3>
        </div>
        <div className="col col-12 mt-4">
          <div className="input-group mb-3">
            <input
              onChange={filterCharacters}
              type="text"
              className="form-control"
              placeholder="Search for a character"
              aria-label="Search for a character"
              aria-describedby="img-search"
              autoFocus
            />
            <div className="input-group-prepend">
              <span
                className="input-group-text rounded-0 rounded-end mdi mdi-magnify"
                id="img-search"
              ></span>
            </div>
          </div>
        </div>
        <div className="col col-12">
          <div className="input-group mb-3 charList">
            <Characters />
          </div>
        </div>
      </div>
    </>
  );
};
