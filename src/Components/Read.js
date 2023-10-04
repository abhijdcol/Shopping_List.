import React from "react";
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
function Read() {
  const { id } = useParams();

  const [data, setData] = useState([]);
  useEffect(() => {
    fetch(`http://localhost:5000/users/${id}`)
      .then((res) => res.json())
      .then((data) => setData(data));
  });
  return (
    <div>
      <div className="container p-5">
        <p>{data.id}</p>
        <p>{data.name}</p>
        <p>{data.email}</p>
        <Link to="/">Back</Link>
      </div>
      ;
    </div>
  );
}

export default Read;
