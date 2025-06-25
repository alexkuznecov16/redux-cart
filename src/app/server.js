import dotenv from 'dotenv';
dotenv.config({path: '../../.env'});

import express from 'express';
import mysql from 'mysql2';
import jwt from 'jsonwebtoken';
import cors from 'cors';
import bcrypt from 'bcrypt';

const app = express();
const port = 3000;
const secretKey = process.env.JWT_SECRET_KEY;
const dbPassword = process.env.DB_PASSWORD;

app.use(
	cors({
		origin: 'http://localhost:5173',
		credentials: true,
	}),
);
app.use(express.json());

const db = mysql.createConnection({
	host: 'localhost',
	user: 'admin',
	password: dbPassword,
	database: 'users',
});

app.post('/register', async (req, res) => {
	const {fullname, email, password} = req.body;
	const checkQuery = 'SELECT * FROM users WHERE email = ?';
	db.query(checkQuery, [email], async (error, results) => {
		if (error) {
			console.error('Error checking if user exists: ', error);
			return res.status(500).json({message: 'Server error', success: false});
		}

		if (results.length > 0) {
			return res.status(401).json({message: 'Email already exists', success: false});
		}

		const hashedPassword = await bcrypt.hash(password, 10);

		const insertQuery = 'INSERT INTO users (fullname, email, password) VALUES (?, ?, ?)';
		db.query(insertQuery, [fullname, email, hashedPassword], (error, results) => {
			if (error) {
				console.error('Error inserting new user: ', error);
				return res.status(500).json({message: 'Server error', success: false});
			}

			const token = jwt.sign({email, id: results.insertId}, secretKey, {expiresIn: '12h'});

			return res.status(200).json({message: 'Registration successful', success: true, token});
		});
	});
});

app.post('/login', async (req, res) => {
	const {email, password} = req.body;
	const query = 'SELECT * FROM users WHERE email = ?';

	db.query(query, [email], async (error, results) => {
		if (error) {
			console.error('Error checking login data: ', error);
			return res.status(500).json({message: 'Server error', success: false});
		}

		if (results.length === 0) {
			res.status(401).json({message: 'Invalid data', success: false});
		}

		const user = results[0];
		const isPasswordValid = await bcrypt.compare(password, user.password);

		if (!isPasswordValid) {
			return res.status(401).json({message: 'Invalid data', success: false});
		}

		const token = jwt.sign({email: results[0].email, id: results[0].id}, secretKey, {expiresIn: '12h'});
		return res.status(200).json({message: 'Login successful', success: true, token});
	});
});

const authenticateJWT = (req, res, next) => {
	const authHeader = req.headers.authorization;
	console.log('Authorization Header:', authHeader);
	const token = req.headers.authorization?.split(' ')[1];

	if (!token) {
		return res.status(401).json({message: 'Authorization is required!', success: false});
	}

	jwt.verify(token, secretKey, (err, user) => {
		if (err) {
			return res.status(403).json({message: 'Invalid token', success: false});
		}

		req.user = user;
		next();
	});
};

app.get('/protected', authenticateJWT, (req, res) => {
	res.status(200).json({message: 'Access granted', user: req.user});
});

app.listen(port, () => {
	console.log(`App listening on port ${port}`);
});
