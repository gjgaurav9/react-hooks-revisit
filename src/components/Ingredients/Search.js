import React, { useState, useEffect, useRef } from "react";

import Card from "../UI/Card";
import "./Search.css";

const Search = React.memo((props) => {
  const { onLoadIngrediants } = props;
  const [searchText, setSearchText] = useState("");
  const ref = useRef();

  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchText === ref.current.value) {
        const query =
          searchText.length === 0
            ? ""
            : `?orderBy="title"&equalTo="${searchText}"`;
        fetch(
          "https://reacthooks-a1311.firebaseio.com/ingredients.json" + query
        )
          .then((response) => {
            return response.json();
          })
          .then((responseBody) => {
            const loadedIngrd = [];
            for (const key in responseBody) {
              loadedIngrd.push({
                id: key,
                title: responseBody[key].title,
                amount: responseBody[key].amount,
              });
            }
            onLoadIngrediants(loadedIngrd);
          });
      }
    }, 500);
    return () => {
      clearTimeout(timer);
    };
  }, [onLoadIngrediants, searchText]);
  return (
    <section className="search">
      <Card>
        <div className="search-input">
          <label>Filter by Title</label>
          <input
            ref={ref}
            type="text"
            value={searchText}
            onChange={(event) => setSearchText(event.target.value)}
          />
        </div>
      </Card>
    </section>
  );
});

export default Search;
