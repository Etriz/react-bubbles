import React, { useState } from "react";
import axiosWithAuth from "../utils/axiosWithAuth";

const initialColor = {
  color: "",
  code: { hex: "" },
};

const ColorList = ({ colors, updateColors, getColors }) => {
  console.log(colors);
  const [editing, setEditing] = useState(false);
  const [colorToEdit, setColorToEdit] = useState(initialColor);
  const [colorToAdd, setColorToAdd] = useState(initialColor);

  const editColor = (color) => {
    setEditing(true);
    setColorToEdit(color);
  };

  const saveEdit = (e) => {
    e.preventDefault();

    // Make a put request to save your updated color
    // think about where will you get the id from...
    // where is is saved right now?
    axiosWithAuth()
      .put(`/colors/${colorToEdit.id}`, colorToEdit)
      .then((res) => {
        // console.log(res);
        setEditing(false);
        getColors();
      })
      .catch((err) => console.log(err.message, err.response.data.error));
  };

  const saveAdd = () => {
    axiosWithAuth()
      .post("/colors", colorToAdd !== initialColor ? colorToAdd : null)
      .then((res) => {
        // console.log(res);
        getColors();
      })
      .catch((err) => console.log(err.message, err.response.data.error));
  };

  const deleteColor = (color) => {
    // make a delete request to delete this color

    axiosWithAuth()
      .delete(`/colors/${color.id}`)
      .then((res) => {
        // console.log(res);
        getColors();
      })
      .catch((err) => console.log(err.message, err.response.data.error));
  };

  return (
    <div className="colors-wrap">
      <p>colors</p>
      <ul>
        {colors.map((color) => (
          <li key={color.color} onClick={() => editColor(color)}>
            <span>
              <span
                className="delete"
                onClick={(e) => {
                  e.stopPropagation();
                  deleteColor(color);
                }}>
                x
              </span>{" "}
              {color.color}
            </span>
            <div className="color-box" style={{ backgroundColor: color.code.hex }} />
          </li>
        ))}
      </ul>
      {editing && (
        <form onSubmit={saveEdit}>
          <legend>edit color</legend>
          <label>
            color name:
            <input
              onChange={(e) => setColorToEdit({ ...colorToEdit, color: e.target.value })}
              value={colorToEdit.color}
            />
          </label>
          <label>
            hex code:
            <input
              onChange={(e) =>
                setColorToEdit({
                  ...colorToEdit,
                  code: { hex: e.target.value },
                })
              }
              value={colorToEdit.code.hex}
            />
          </label>
          <div className="button-row">
            <button type="submit">save</button>
            <button onClick={() => setEditing(false)}>cancel</button>
          </div>
        </form>
      )}
      {/* stretch - build another form here to add a color */}
      <form onSubmit={saveAdd}>
        <legend>add color</legend>
        <label>
          color name:
          <input
            onChange={(e) => setColorToAdd({ ...colorToAdd, color: e.target.value })}
            value={colorToAdd.color}
          />
        </label>
        <label>
          hex code:
          <input
            onChange={(e) =>
              setColorToAdd({
                ...colorToAdd,
                code: { hex: e.target.value },
              })
            }
            value={colorToAdd.code.hex}
          />
        </label>
        <div className="button-row">
          <button type="submit">save</button>
        </div>
      </form>
      {/* <div className="spacer" /> */}
    </div>
  );
};

export default ColorList;
