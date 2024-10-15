import { Router } from 'express';
const router = Router();

import HistoryService from '../../service/historyService.js';
import WeatherService from '../../service/weatherService.js';
import weatherService from '../../service/weatherService.js';
import historyService from '../../service/historyService.js';

// TODO: POST Request with city name to retrieve weather data
router.post('/', async (req, res) => {

  try {
    // TODO: GET weather data from city name
    const city = req.body.cityName
    if (!city) {
      return res.status(400).json({ error: 'City is required.' })
    }
    const weatherData = await weatherService.getWeatherForCity(city);
    // TODO: save city to search history
    await historyService.addCity(city);
    res.json(weatherData)
  } catch (error) {
    console.log (error)
    res.status(500).json({ error: 'Failed to fetch weather data.' })
  }

});

// TODO: GET search history
router.get('/history', async (req, res) => { 
  try {
    const history = await historyService.getCities();
    res.json(history);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch weather data.' })
  }
});

// * BONUS TODO: DELETE city from search history
router.delete('/history/:id', async (req, res) => { 
  try {
    const id = req.params.id;
    await historyService.removeCity(id);
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch weather data.' })
  }
});

export default router;
