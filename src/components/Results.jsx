import React, { useContext } from "react";
import { UserContext } from "./UserContext";

export default function Results({ element, artwork }) {
  const { name } = useContext(UserContext);

  return (
    <div className="results-container">
      <p>
        <strong>{name}</strong>, your element is: <strong>{element}</strong>
      </p>
      {artwork ? (
        <div className="artwork">
          <h2>Here's a random dog picture for you:</h2>
          <img src={artwork} alt="Random Dog" />
        </div>
      ) : (
        <p>No artwork found.</p>
      )}
    </div>
  );
}
