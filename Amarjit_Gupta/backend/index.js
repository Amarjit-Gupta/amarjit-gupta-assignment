import express from 'express';
import pool from './config/db.js';
import 'dotenv/config'
import createUsersTable from './Schema/schema.js';
import userRoute from './routes/userRoutes.js';
import cors from 'cors';

const app = express();

app.use(express.json());
app.use(cors({
  origin:"http://localhost:5173"
}));


app.get("/", (req, res) => {
  res.json({success:true,message: "API Working"});
});

// user routes
app.use("/api", userRoute);

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await pool.query("SELECT 1");
    console.log("Neon database connected successfully");

    await createUsersTable();

    app.listen(PORT, () => {
      console.log(`server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("something went wrong",error.message);
    process.exit(1);
  }
};

startServer();
