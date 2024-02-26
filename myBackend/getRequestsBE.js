import express from "express";
import { Op } from "sequelize";
import { User, Ride } from "./sequelize.js";

export let getUser = express.Router();
export let getRoute = express.Router();
export let getRoutes = express.Router();

getUser = async (req, res) => {
    try {
        const { email } = req.query;
        const user = await User.findOne({ where: { email } });

        if (!user) {
            return res.status(404).json({ error: "User not found." });
        }

        return res.status(200).json({ message: 'User found.', user }), user;
    } catch (error) {
        console.error("Error fetching user", error);
        return res.status(500).json({ error: "Error fetching user." });
    }
};

getRoute = async (req, res) => {
    try {
        const { query } = req.query;
        const route = await Ride.findOne({ 
            where: { 
                [Op.or]: [
                    { origin: { [Op.like]: `%${query}%` } },
                    { destination: { [Op.like]: `%${query}%` } }
                ]
            } 
        });

        if (!route) {
            return res.status(404).json({ error: "Route not found." });
        }

        return res.status(200).json({ message: 'Route found.', route }), route;
    } catch (error) {
        console.error("Error fetching route", error);
        return res.status(500).json({ error: "Error fetching route." });
    }
};

getRoutes = async (req, res) => {
    try {
        const { query } = req.query;
        const routes = await Ride.findAll({ 
            where: { 
                [Op.or]: [
                    { origin: { [Op.like]: `%${query}%` } },
                    { destination: { [Op.like]: `%${query}%` } }
                ]
            } 
        });

        if (!routes || routes.length === 0) {
            return res.status(404).json({ error: "Routes not found." });
        }

        return res.status(200).json({ message: 'Routes found.', routes }), routes;
    } catch (error) {
        console.error("Error fetching routes", error);
        return res.status(500).json({ error: "Error fetching routes." });
    }
};