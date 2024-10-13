const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const UserModel = require('../models/userSchema');
const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret_key';

const register = async (req, res) => {
    const {
        firstName,
        address,
        email,
        password,
        img,

    } = req.body;

    console.log(req.body);


    try {
        await UserModel.create({
            Name: firstName,
            Address: address,
            Email: email,
            Password: password,
            img
        });

        res.status(200).send({ message: 'User created', success: true });
    } catch (err) {
        console.log(err);
        res.status(500).send({ message: 'User not created', success: false });
    }
};

const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Check if user exists
        const user = await UserModel.findOne({ Email: email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid email or password', success: false });
        }

        // Check if password matches
        if (user.Password !== password) {
            return res.status(400).json({ message: 'Invalid email or password', success: false });
        }

        // Generate JWT
        const token = jwt.sign(
            { userId: user._id, email: user.Email, isAdmin: user.isAdmin },
            JWT_SECRET,
            { expiresIn: '1d' }
        );

        // Send the token in the response
        res.status(200).json({ message: 'Login successful', token, success: true });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Server error', success: false });
    }
};

const getAllUsers = async (req, res) => {

    try {

        const response = await UserModel.find();

        res.status(200).send({ message: 'fetch', data: response, sucess: true });

    } catch (err) {
        console.log(err);
        res.status(500).send({ message: 'not fetch', sucess: false });

    }


}



module.exports = { login, getAllUsers, register }