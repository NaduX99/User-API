import db from "../config/db.js";
import bcrypt from "bcryptjs";

export const createUser = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({
      success: false,
      message: "Name, Email and Password are required"
    });
  }

  db.query(
    "SELECT id FROM users WHERE email = ?",
    [email],
    async (err, results) => {
      if (err) {
        return res.status(500).json({
          success: false,
          message: "Database error"
        });
      }

      if (results.length > 0) {
        return res.status(400).json({
          success: false,
          message: "Email already in use"
        });
      }

      bcrypt.hash(password, 8, (err, hash) => {
        if (err) {
          return res.status(500).json({
            success: false,
            message: "Error hashing password"
          });
        }

        db.query(
          "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
          [name, email, hash],
          (err, results) => {
            if (err) {
              return res.status(500).json({
                success: false,
                message: "Database error"
              });
            }

            res.status(201).json({
              success: true,
              message: "User created successfully"
            });
          }
        );
      });
    }
  );
};

export const getAllusers = (req, res) => {
    db.query("select * from users order by id desc", (err, results) => {
      if (err) {
        return res.status(500).json({
          success: false,
          message: "Database error"
        });
      }
      res.status(200).json({
        success: true,
        data: results
      });
   });
};

export const updateUser = (req, res) => {
    const { id } = req.params;
    const { name, email, password } = req.body;

    if (!name || !email) {
        return res.status(400).json({
            success: false,
            message: "Name and Email are required"
        });
    }

    if(!password) {
        db.query(
            "UPDATE users SET name = ?, email = ? WHERE id = ?", [name, email, id], (err, results) => {
                if (err) {
                    console.log(err);
                    return res.status(500).json({
                        success: false,
                        message: "Database error"
                    });
                }

                res.status(200).json({
                    success: true,
                    message: "User updated successfully"
                });
            }
        );
    } else {
        bcrypt.hash(password, 8, (err, hash) => {
            if (err) {
                return res.status(500).json({
                    success: false,
                    message: "Error hashing password"
                });
            }

            db.query(
                "UPDATE users SET name = ?, email = ?, password = ? WHERE id = ?", [name, email, hash, id], (err, results) => {
                    if (err) {
                        console.log(err);
                        return res.status(500).json({
                            success: false,
                            message: "Database error"
                        });
                    }

                    res.status(200).json({
                        success: true,
                        message: "User updated successfully"
                    });
                }
            );
        });
    }
};

export const deleteUser = (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({
      success: false,
      message: "User ID is required"
    });
  }

  db.query(
    "DELETE FROM users WHERE id = ?", 
    [id], 
    (err, results) => {
      if (err) {
        console.log(err);  // Shows exact error in console
        return res.status(500).json({
          success: false,
          message: "Database error"
        });
      }

      if (results.affectedRows === 0) {
        return res.status(404).json({
          success: false,
          message: "User not found"
        });
      }

      res.status(200).json({
        success: true,
        message: "User deleted successfully"
      });
    }
  );
};