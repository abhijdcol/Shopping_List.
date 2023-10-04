import React, { useEffect } from "react";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
function Home() {
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTasks = async () => {
      const res = await fetch("http://localhost:5000/users");
      const data = await res.json();
      setData(data);
    };
    fetchTasks();
  }, []);

  return (
    <div className="container mt-5">
      <h2>Crud App with JSON-server</h2>
      <Link to="/create" className="btn btn-success my-3">
        Create
      </Link>
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {data.map((d, i) => (
            <tr key={i}>
              <td>{d.id}</td>
              <td>{d.name}</td>
              <td>{d.email}</td>
              <td>
                <Link
                  className="text-decoration-none btn btn-sm btn-success"
                  to={`/update/${d.id}`}
                >
                  update
                </Link>
                <button
                  className="text-decoration-none btn btn-sm btn-danger"
                  onClick={() => handleDelete(d.id)}
                >
                  Delete
                </button>
                <Link
                  className="text-decoration-none btn btn-sm btn-primary"
                  to={`/read/${d.id}`}
                >
                  Read
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  function handleDelete(id) {
    const confirm = window.confirm("Do you like to delete?");
    if (confirm) {
      fetch(`http://localhost:5000/users/${id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      })
        .then((res) => res.json())
        .then((data) => {
          alert("Record deleted");
          navigate("/");
        });
    }
  }
}
export default Home;
