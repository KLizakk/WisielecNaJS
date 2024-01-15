
const bodyParser = require('body-parser');
const cors = require('cors');
const express = require('express');
const app = express();
const jsonparser = bodyParser.json();
const urlncodedparser = bodyParser.urlencoded({extended:false});

app.use(jsonparser);
app.use(urlncodedparser);

app.use(cors());

app.get('/slowo',(reguest,response)=>{response.send(losujOwoc())})
app.listen(8080,()=>{console.log('Nasłuchuje 8080')});
app.post('/dodajslowo', (req, res) => {
    try {
        console.log(req);
      const slowo = req.body.slowo;
    
      // Odczytaj obecny stan pliku JSON
      const jsonString = fs.readFileSync('./SlowaJson.json', 'utf8');
      const jsonData = JSON.parse(jsonString);
  
      // Dodaj nowe słowo do tablicy "owoce"
      if (!jsonData.owoce) {
        jsonData.owoce = [];
      }
      jsonData.owoce.push(slowo);
  
      // Zapisz zaktualizowany stan pliku JSON
      fs.writeFileSync('./SlowaJson.json', JSON.stringify(jsonData, null, 2), 'utf-8');
  
      res.send('Słowo dodane pomyślnie!');
    } catch (error) {
      console.error('Błąd podczas dodawania słowa:', error);
      res.status(500).send('Wystąpił błąd podczas dodawania słowa.');
    }
  });

const fs = require('fs');

function losujOwoc() {
  // Odczytaj zawartość pliku JSON
  const jsonString = fs.readFileSync('./SlowaJson.json', 'utf8');

  try {
    // Parsuj JSON
    const jsonData = JSON.parse(jsonString);

    // Sprawdź, czy istnieje pole "owoce" w obiekcie JSON
    if (jsonData.owoce && Array.isArray(jsonData.owoce) && jsonData.owoce.length > 0) {
      // Losuj indeks owoca
      const losowyIndeks = Math.floor(Math.random() * jsonData.owoce.length);

      // Zwróć wybrany owoc
      return jsonData.owoce[losowyIndeks];
    } else {
      console.error('Brak lub nieprawidłowe pole "owoce" w obiekcie JSON.');
    }

  } catch (parseError) {
    console.error('Błąd parsowania JSON:', parseError);
  }
}


function dodajSlowo(doDodania) {
  // Odczytaj zawartość pliku JSON
  const jsonString = fs.readFileSync('./SlowaJson.json', 'utf8');

  try {
    // Parsuj JSON
    const jsonData = JSON.parse(jsonString);

    // Sprawdź, czy istnieje pole "owoce" w obiekcie JSON
    if (jsonData.owoce && Array.isArray(jsonData.owoce)) {
      // Dodaj nowe słowo
      jsonData.owoce.push(doDodania);

      // Zapisz zaktualizowany obiekt JSON z powrotem do pliku
      fs.writeFileSync('/SlowaJson.json', JSON.stringify(jsonData, null, 2));

      console.log('Słowo dodane pomyślnie.');
    } else {
      console.error('Brak lub nieprawidłowe pole "owoce" w obiekcie JSON.');
    }
  } catch (parseError) {
    console.error('Błąd parsowania JSON:', parseError);
  }
}

// Przykładowe użycie
const slowoDoDodania = 'noweSłowo';