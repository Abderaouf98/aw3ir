import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class MeteoService {

  constructor() { }


  getMeteo(name: string): Promise<any> {
    console.log('from service', name);

    // return fetch('https://api.openweathermap.org/data/2.5/weather/?q=' + name + '&units=metric&lang=fr&appid=8bd0c4cec6f983b4e2fd0c00feec9dba') // 1 Day Weather Forcast
    return fetch('https://api.openweathermap.org/data/2.5/forecast/?q=' + name + '&lang=fr&appid=8d5dd44134a614d9f41a249b01a7b7f9') // 5 Days Weather Forcast
      .then(function (response) {
        return response.json();
      })
      .then(function (json) {

        // test du code retour
        // 200 = OK
        // 404 = city not found 
        if (json.cod == 200) {
          return Promise.resolve(json);
        } else {
          console.error('Météo introuvable pour ' + name + ' (' + json.message + ')');

          return Promise.reject('Météo introuvable pour ' + name + ' (' + json.message + ')');
        }

      });

  }
}
