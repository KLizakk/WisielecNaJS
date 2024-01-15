import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class SerwerService {

  constructor() { }
  GetWord() { return axios.get('http://localhost:8080/slowo') }

  AddWord(word:string) {return axios.post('http://localhost:8080/dodajslowo',{slowo:word})}
}
