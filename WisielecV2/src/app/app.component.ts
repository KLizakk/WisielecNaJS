import { Component, Input, ViewChild, inject } from '@angular/core';
import { SerwerService } from './serwer.service';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  
  
})

export class AppComponent {
  title = 'WisielecV2';
  serwerservice = inject(SerwerService);
Array: any;
literyAlfabetu='abcdefghijklmnoprstuwxyząćęłóżźś';
 
  slowo = ''
  async NoweSlowo() {
  const response =  await  this.serwerservice.GetWord();
        this.slowo = response.data;
      
    
  }
  slowoDoDodania: string=''
  
   ukryteSlowo: string[] = [];
   zgadnieteLitery: Set<string> = new Set();
   maxBledy: number = 6;
   liczbaBledow: number = 0;
  slowox:string[] = this.slowo.split('');

   
  DodajSlowo() {
    this.serwerservice.AddWord(this.slowoDoDodania).then((response) => {
      console.log('Słowo dodane pomyślnie.', response);
    }).catch((error) => {
      console.error('Błąd podczas dodawania słowa.', error);
      console.log(this.slowoDoDodania);
    });

   
}
 // dodawanie kodu gry:
 constructor() {
  this.wybierzNoweSlowo();
   this.zgadnieteLitery = new Set(); // Dodaj inicjalizację
  
}

getUkryteSlowo(): string[] {
  return this.ukryteSlowo;
}

getZgadnieteLitery(): string[] {
  return [...this.zgadnieteLitery];
}

getLiczbaBledow(): number {
  return this.liczbaBledow;
}
async wybierzNoweSlowo(): Promise<void> {
  await this.NoweSlowo();
  
  this.ukryteSlowo = await this.inicjalizujUkryteSlowo();
  this.zgadnieteLitery.clear();
  this.liczbaBledow = 0;
}
zgadnijLitere(litera: string): void {
if (!this.zgadnieteLitery.has(litera)) {
  this.zgadnieteLitery.add(litera);

  if (!this.slowo.includes(litera)) {
    this.liczbaBledow++;
  }

  this.aktualizujUkryteSlowo();
}
}

czyKoniecGry(): boolean {
return this.liczbaBledow >= this.maxBledy || this.czyZgadniete();
}

 czyZgadniete(): boolean {
return this.ukryteSlowo.join('') === this.slowo;
}

 losujSlowo(): string {
return this.slowo;
}

async inicjalizujUkryteSlowo(): Promise<string[]> {

return this.slowo.split('').map(litera => (litera === ' ' ? ' ' : '_'));
}

 aktualizujUkryteSlowo(): void {
for (let i = 0; i < this.slowo.length; i++) {
  if (this.zgadnieteLitery.has(this.slowo[i])) {
    this.ukryteSlowo[i] = this.slowo[i];
  }
}

}
nowaGra(): void {
  this.wybierzNoweSlowo();
  
}

}





