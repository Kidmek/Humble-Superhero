import React, { useState, useEffect } from "react";
import styles from "./app.module.css";
import AddSuperhero from "./components/addSuperhero/AddSuperHero";
import { API_URL, Superhero } from "./constants";

const App: React.FC = () => {
  const [superheroes, setSuperheroes] = useState<Superhero[]>([]);
  const [selected, setSelected] = useState<Superhero | null>(null);
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

  const onDelete = async (id: number) => {
    const userResponse = window.confirm(
      "Are you sure you want to delete this superhero?"
    );
    if (userResponse) {
      try {
        const response = await fetch(`${API_URL}/${id}`, {
          method: "DELETE",
        });
        if (response.ok) {
          fetchSuperheroes();
          setSelected(null);
        }
      } catch (error) {
        alert("Error deleting superhero");
        console.error("Error deleting superhero:", error);
      }
    }
  };

  return (
    <div className={styles.container}>
      <h1>Humble Superheroes</h1>
      <button
        className={styles.addBtn}
        onClick={() => {
          setSelected(null);
          setShowDialog(true);
        }}
        type="button"
      >
        Add Superhero
      </button>

      {!superheroes?.length ? (
        <span className={styles.noData}>No superheroes found, add some!</span>
      ) : (
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Superpower</th>
              <th>Humility Score</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {superheroes.map((hero) => (
              <tr key={hero.name}>
                <td>{hero.name}</td>
                <td>{hero.superpower}</td>
                <td>{hero.humilityScore}</td>
                <td>
                  <div>
                    <button
                      onClick={() => {
                        setSelected(hero);
                        setShowDialog(true);
                      }}
                    >
                      Edit
                    </button>
                    <button
                      className={styles.delete}
                      onClick={() => onDelete(hero.id!)}
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {showDialog && (
        <AddSuperhero
          onClose={() => setShowDialog(false)}
          onSuccess={() => {
            setShowDialog(false);
            fetchSuperheroes();
          }}
          selected={selected}
        />
      )}
    </div>
  );
};

export default App;
