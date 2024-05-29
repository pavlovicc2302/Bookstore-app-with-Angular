import { Injectable } from '@angular/core';
import { BehaviorSubject, switchMap, take, tap } from 'rxjs';
import { Narudzbenica, StatusNarudzbenice, StavkaNarudzbenice } from './narudzbenica.model';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';
import { KnjigeService } from './knjige.service';
import { Status } from './knjiga.model';

/*interface NarudzbenicaData {
  userId: string;
  ukupnaKolicina: number;
  ukupnaCena: number;
  datum: Date;
  stavke: StavkaNarudzbenice[];
}

interface StavkaNarudzbeniceData {
  knjigaId: string;
  isbn: string;
  naslov: string;
  kolicina: number;
  cena: number;
  iznos: number;
}*/

@Injectable({
  providedIn: 'root',
})
export class NarudzbenicaService {

  noviDatum:string;
  private nizStavki: StavkaNarudzbenice[] = [];

  private _stavke = new BehaviorSubject<StavkaNarudzbenice[]>(this.nizStavki);

  get stavke() {
    return this._stavke.asObservable();
  }

  private _narudzbenice = new BehaviorSubject<Narudzbenica[]>([]);

  get narudzbenice() {
    return this._narudzbenice.asObservable();
  }

  //narudzbenica$ = this._narudzbenica.asObservable();

  constructor(private http: HttpClient, private authService: AuthService, private router:Router, private knjigeService:KnjigeService) {}

  dodajStavku(stavka: StavkaNarudzbenice) {
    stavka.id = this.nizStavki.length + 1 + '';
    this.nizStavki.push(stavka);
    this._stavke.next([...this.nizStavki]);
    console.log(this.nizStavki);
    /*const trenutnaNarudzbenica = this._narudzbenice.getValue();

     trenutnaNarudzbenica.stavke.push(stavka);
     trenutnaNarudzbenica.ukupnaKolicina += stavka.kolicina;
     trenutnaNarudzbenica.ukupnaCena += stavka.iznos;*/

    /*this._narudzbenica.next(trenutnaNarudzbenica);
     console.log(this.narudzbenica)*/
  }

  /*getNarudzbenica(): Narudzbenica {
     return this._narudzbenice.getValue();
   }*/

  namestiDatum(datum:Date){
    const formatDatum = (num: number) => num < 10 ? `0${num}` : num;

    const dan = formatDatum(datum.getDate());
    const mesec = formatDatum(datum.getMonth() + 1);
    const godina = datum.getFullYear();
    const sati = formatDatum(datum.getHours());
    const minuti = formatDatum(datum.getMinutes());

    this.noviDatum = `${dan}.${mesec}.${godina}. ${sati}:${minuti}`;
    return this.noviDatum;
  }
  addNarudzbenica(ukupnaKolicina: number,ukupnaCena: number,status:StatusNarudzbenice, stavke: StavkaNarudzbenice[]= this.nizStavki) {
    let generatedId;
    let user = localStorage.getItem('ulogovani') +':' + localStorage.getItem('ulogovaniID')
    let datum = this.namestiDatum(new Date());
    console.log(datum)
    return this.http
      .post<{ name: string }>(
        `https://knjizara-d51e5-default-rtdb.europe-west1.firebasedatabase.app/narudzbenice.json?auth=${this.authService.getToken()}`,
        { user, ukupnaKolicina, ukupnaCena, datum, stavke, status }
      )
      .pipe(
        switchMap((resData) => {
          generatedId = resData.name;
          return this.narudzbenice;
        }),
        take(1),
        tap((narudzbenice) => {
          this._narudzbenice.next(
            narudzbenice.concat({
              id: generatedId,
              user,
              ukupnaKolicina,
              ukupnaCena,
              datum,
              stavke,
              status
            })
          );
          
          this.nizStavki = [];
          this._stavke.next([]);
          this.router.navigateByUrl('/home/tabs/pocetna')
        })
      );
  }
}
