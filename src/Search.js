import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import "./Search.css";
import "./SearchMobile.css";
import "./suggestions.css";
import debounce from "lodash.debounce";
import SearchIcon from "./images/icons8-search.svg";
import { useSearchParams } from "react-router-dom";

const Search = (passUserdata) => {
  const [suggestions, setSuggestions] = useState([]);
  const [userApi, setUserApi] = useState();
  const [dropDownOpen, setDropDownOpen] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

  const onChangeHandler = (e) => {
    if (e.target.value.length > 0) {
      setDropDownOpen(true);
    } else {
      setDropDownOpen(false);
    }

    const param = new URLSearchParams();
    param.set("q", e.target.value);
    setSearchParams(param);
  };

  useEffect(() => {
    debouncedChangeHandler(searchParams);
  }, [searchParams]);

  const onclickHandler = (event) => {
    console.log(event.target.innerText);
    // setUsername(event.target.innerText);
    setUserApi(event.target.innerText);
  };

  useEffect(() => {
    axios
      .get(`https://api.github.com/users/${userApi}`)
      .then((response) => {
        console.log(response);
        passUserdata.onSubmit(response);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [userApi]);

  const debouncedChangeHandler = useCallback(
    debounce((searchParams) => {
      const url = `https://api.github.com/search/users?${searchParams}`;
      axios
        .get(url)
        .then((res) => {
          console.log(res);
          setSuggestions(res.data.items);
          console.log(suggestions);
        })
        .catch((err) => {
          console.log(err);
        });
    }, 200),
    []
  );

  const onSubmitHandler = (e) => {
    e.preventDefault();
    // setUsername("");
    setDropDownOpen(false);
    setSuggestions([]);
  };

  // react-router-dom
  // const [sp,setSearchparams]=useSearchParams()
  // const sp = new URLSearchParams()
  //sp.set('username',e.target.value)
  //setSearchparams(sp)
  //sp.get('username') ==null???value

  return (
    <>
      <form onSubmit={onSubmitHandler}>
        <div className="search">
          <img src={SearchIcon} alt="Search Icon" />
          <input
            type="text"
            name="username"
            className="userInput"
            placeholder="Search GitHub username..."
            value={searchParams.get("q") ?? ""}
            onChange={onChangeHandler}
          />
          <button className="sub-btn" type="submit">
            {" "}
            Search
          </button>
        </div>
        {dropDownOpen && (
          <div className="result">
            {suggestions &&
              suggestions.map((suggestedName) => {
                return (
                  <button className="item" onClick={onclickHandler}>
                    <p>{suggestedName.login}</p>
                  </button>
                );
              })}
          </div>
        )}
      </form>
    </>
  );
};

export default Search;
// debounce
