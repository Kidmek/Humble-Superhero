import React, { useState, useEffect } from "react";
import styles from "./app.module.css";
import AddSuperhero from "./components/addSuperhero/AddSuperHero";
import { API_URL, Superhero } from "./constants";

const App: React.FC = () => {
  const [superheroes, setSuperheroes] = useState<Superhero[]>([]);
  const [showDialog, setShowDialog] = useState(false);

  useEffect(() => {
    fetchSuperheroes();
  }, []);

  const fetchSuperheroes = async () => {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      setSuperheroes(data);
    } catch (error) {
      console.error("Error fetching superheroes:", error);
    }
  };

  return (
    <div className={styles.container}>
      <h1>Humble Superheroes</h1>
      <button
        className={styles.addBtn}
        onClick={() => setShowDialog(true)}
        type="button"
      >
        Add Superhero
      </button>

      <table className={styles.table}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Superpower</th>
            <th>Humility Score</th>
          </tr>
        </thead>
        <tbody>
          {superheroes.map((hero) => (
            <tr key={hero.name}>
              <td>{hero.name}</td>
              <td>{hero.superpower}</td>
              <td>{hero.humilityScore}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {showDialog && (
        <AddSuperhero
          onClose={() => setShowDialog(false)}
          onSuccess={() => {
            setShowDialog(false);
            fetchSuperheroes();
          }}
        />
      )}
    </div>
  );
};

export default App;
