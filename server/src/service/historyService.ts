import fs from 'fs/promises'
import path from 'path';
import {dirname} from 'node:path';
import { fileURLToPath } from 'node:url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
// TODO: Define a City class with name and id properties
class City {
  constructor(public name: string, public id: string) {
  }
}
// TODO: Complete the HistoryService class
class HistoryService {
  private filePath = path.join(__dirname, '../../db/db.json')
  // TODO: Define a read method that reads from the searchHistory.json file
  private async read() {
    const data = await fs.readFile(this.filePath, 'utf-8')
    return JSON.parse(data);
  }
  // TODO: Define a write method that writes the updated cities array to the searchHistory.json file
  private async write(cities: City[]) {
    await fs.writeFile(this.filePath, JSON.stringify(cities))
  }
  // TODO: Define a getCities method that reads the cities from the searchHistory.json file and returns them as an array of City objects
  async getCities() {
    const cities = await this.read();
    return cities;
  }
  // TODO Define an addCity method that adds a city to the searchHistory.json file
  async addCity(city: string) {
    const cities = await this.read();
    const newCity = new City(city, Date.now().toString());
    cities.push(newCity);
    await this.write(cities);
  }
  // * BONUS TODO: Define a removeCity method that removes a city from the searchHistory.json file
  async removeCity(id: string) {
    let cities = await this.read();
    cities = cities.filter(City => City.id !== id);
    await this.write(cities);
  }
}

export default new HistoryService();
