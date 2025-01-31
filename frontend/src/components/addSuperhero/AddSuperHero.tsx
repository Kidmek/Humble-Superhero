import React, { useEffect, useState } from "react";
import styles from "./addSuperhero.module.css";
import { API_URL, Superhero } from "../../constants";

interface AddSuperheroProps {
  onClose: () => void;
  onSuccess: () => void;
  selected: Superhero | null;
}

const AddSuperhero: React.FC<AddSuperheroProps> = ({
  onClose,
  onSuccess,
  selected,
}) => {
  const [formData, setFormData] = useState({
    name: "",
    superpower: "",
    humilityScore: "",
  });
  const [errors, setErrors] = useState({
    name: false,
    superpower: false,
    humilityScore: false,
    request: "",
  });

  const addSuperhero = async (newHero: Superhero) => {
    const api = selected ? `${API_URL}/${selected.id}` : API_URL;
    try {
      const response = await fetch(api, {
        method: selected ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newHero),
      });

      if (response.ok) {
        onSuccess();
      } else {
        const res = await response.json();
        setErrors((prev) => {
          return { ...prev, request: res.message };
        });
      }
    } catch (error) {
      console.log("Error adding superhero:", error);
      setErrors((prev) => {
        return { ...prev, request: "An error occurred" };
      });
    }
  };

  const handleSubmit = () => {
    let isValid = true;
    const tempErrors = {
      name: false,
      superpower: false,
      humilityScore: false,
      request: "",
    };

    // Validate fields
    if (!formData.name) {
      tempErrors.name = true;
      isValid = false;
    }
    if (!formData.superpower) {
      tempErrors.superpower = true;
      isValid = false;
    }
    if (
      !formData.humilityScore ||
      isNaN(Number(formData.humilityScore)) ||
      Number(formData.humilityScore) < 1 ||
      Number(formData.humilityScore) > 10
    ) {
      tempErrors.humilityScore = true;
      isValid = false;
    }

    setErrors(tempErrors);

    if (isValid) {
      addSuperhero({
        name: formData.name,
        superpower: formData.superpower,
        humilityScore: Number(formData.humilityScore),
      });
    }
  };

  useEffect(() => {
    if (selected) {
      setFormData({
        name: selected.name,
        superpower: selected.superpower,
        humilityScore: selected.humilityScore.toString(),
      });
    } else {
      setFormData({
        name: "",
        superpower: "",
        humilityScore: "",
      });
    }
  }, [selected]);

  return (
    <div className={styles.dialog}>
      <div className={styles.dialogContent}>
        <h2>Add New Superhero</h2>
        <input
          type="text"
          placeholder="What is the superhero's name?"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className={errors.name ? styles.error : ""}
        />
        {errors.name && (
          <span className={styles.errorMsg}>Name is required</span>
        )}
        <input
          type="text"
          placeholder="What superpower do they have?"
          value={formData.superpower}
          onChange={(e) =>
            setFormData({ ...formData, superpower: e.target.value })
          }
          className={errors.superpower ? styles.error : ""}
        />
        {errors.superpower && (
          <span className={styles.errorMsg}>Superpower is required</span>
        )}
        <input
          type="number"
          placeholder="From 1-10 how humble is the superhero?"
          value={formData.humilityScore}
          onChange={(e) => {
            if (e.target.value === "") {
              setFormData({ ...formData, humilityScore: "" });
              return;
            }
            const value = parseInt(e.target.value);
            if (value >= 1 && value <= 10) {
              setFormData({ ...formData, humilityScore: e.target.value });
            }
          }}
          className={errors.humilityScore ? styles.error : ""}
        />
        {errors.humilityScore && (
          <span className={styles.errorMsg}>Humility score is required</span>
        )}
        {errors.request && (
          <span className={`${styles.errorMsg} ${styles.request}`}>
            {errors.request}
          </span>
        )}
        <div className={styles.dialogActions}>
          <button onClick={handleSubmit}>{selected ? "Update" : "Add"}</button>
          <button className={styles.cancel} onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddSuperhero;
