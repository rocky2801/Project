import Card from "./components/Card";
import { useState, useEffect } from "react";
import { db } from "../config/firebase";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { collection } from "firebase/firestore";

const House = () => {
  const [search, setSearch] = useState("");
  const query = collection(db, "houses");
  const [docs,loading] = useCollectionData(query);
  return (
    <div className="h-full bg-gray-100">
      <div className="flex flex-col items-center justify-center">
        <input
          className=" p-3 border-2 border-gray-200 rounded-lg w-96 m-2"
          type="search"
          placeholder="Search Location"
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      {!loading && <div className="mt-10 grid grid-cols-1 justify-items-center md:grid-cols-2 lg:grid-cols-3 gap-y-10">
        {[
          docs
            .filter((house) => {
              if (search == "") return house;
              if (
                house.location
                  .toLowerCase()
                  .includes(search.toLocaleLowerCase())
              )
                return house;
            })
            .map((house) => <Card details={house} key={house._id} />),
        ]}
      </div>}
    </div>
  );
};
export default House;

