import { useState } from "react";
import { search } from "../../redux/actions";
import { useDispatch } from "react-redux";
const Searchbar = () => {
  const [data, setData] = useState("");
  const dispatch = useDispatch();
  const handleSearch = (event) => {
    setData(event.target.value);
  };
  const searchName = (data) => {
    dispatch(search(data));
    setData("");
  };
  return (
    <div>
      <div>
        <input
          type="text"
          placeholder="Buscar por nombre"
          name="search"
          value={data}
          onChange={handleSearch}
        />
        <button typeof="button" onClick={() => searchName(data)}>
          Buscar
        </button>
      </div>
    </div>
  );
};

export default Searchbar;
