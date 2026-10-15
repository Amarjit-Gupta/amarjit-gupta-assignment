import pool from "../config/db.js";

export const createUser = async (req, res) => {
  try {
    const { name, email, role } = req.body;

    if (!name || !email || !role) {
      return res.status(400).json({
        success: false,
        message: "Please provide name, email and role"
      });
    }

    const result = await pool.query(
      `INSERT INTO users (name, email, role)
       VALUES ($1, $2, $3)
       RETURNING *`,
      [name.trim(), email.trim(), role.trim()]
    );

    res.status(201).json({
      success: true,
      message: "User created successfully",
      user: result.rows[0]
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
      error: error.message
    });
  }
};

// get all user
export const getUsers = async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM users ORDER BY id ASC"
    );

    res.status(200).json({success:true,message:"all user data",user:result.rows});
  } catch (error) {
    console.error(error);
    res.status(500).json({success:false, message: "something went wrong",error:error,message });
  }
};

// get single user
export const getUserById = async (req, res) => {
  try {
    const id = req.params.id;

    const result = await pool.query(
      "SELECT * FROM users WHERE id = $1",
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        success:false,
        message: "User not found",
      });
    }

    res.status(200).json({success:true,message:"single data fetched",user:result.rows[0]});
  } catch (error) {
    console.error(error);
    res.status(500).json({success:false,message: "something went wrong",error:error.message });
  }
};

// update user
export const updateUser = async (req, res) => {
  try {
    const id = req.params.id;
    const { name, email,role } = req.body;

    if (!name || !email || !role) {
      return res.status(400).json({
        success:false,
        message: "please provide name, email and role",
      });
    }

    const result = await pool.query(
      `UPDATE users
       SET name = $1, email = $2,role=$3
       WHERE id = $4
       RETURNING *`,
      [name, email,role, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        success:false,
        message: "User not found",
      });
    }

    res.status(200).json({
        success:true,
      message: "User updated successfully",
      user: result.rows[0],
    });
  } catch (error) {
     res.status(500).json({success:false,message: "something went wrong",error:error.message });
  }
};

// delete user
export const deleteUser = async (req, res) => {
  try {
    const id = req.params.id;

    const result = await pool.query(
      `DELETE FROM users
       WHERE id = $1
       RETURNING *`,
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        success:false,
        message: "User not found",
      });
    }

    res.status(200).json({
        success:true,
      message: "User deleted successfully",
      user: result.rows[0],
    });
  } catch (error) {
    console.error(error);
     res.status(500).json({success:false,message: "something went wrong",error:error.message });
  }
};
