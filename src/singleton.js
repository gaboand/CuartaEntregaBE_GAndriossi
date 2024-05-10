import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();
const DB_URL = process.env.DB_URL;
export default class MongoSingleton {
  static #instance;

  constructor() {
    mongoose.connect(DB_URL);
  }
  static getInstance() {
    if (this.#instance) {
      return this.#instance;
    }
    this.#instance = new MongoSingleton();
    return this.#instance;
  }
}