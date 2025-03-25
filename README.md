# Mobilna aplikacija za praćenje rada knjižare

Aplikacija pomaže zaposlenima u knjižari da bolje prate stanje knjiga u knjižari, kao i da naručuju nove količine knjiga. Pored toga, postoji mogućnost kreiranja komentara za knjige, pri čemu je te komentare moguće štampati.
Aplikacija je hibridnog tipa (može se korisiti i na Android i iOS uređajima) i kreirana je pomoću Angular-a i Ionic-a, dok se podaci čuvaju u Firebase bazi podataka. 

## Funkcionalnosti
- Autentifikacija: Zaposleni se mogu registrovati, a potom prijaviti na aplikaciju, i kasnije odjaviti
- Prikaz knjiga: Na početnoj strani se prikazuju sve knjige koje postoje u bazi i njihove osnovne informacije
- Dodavanje knjige: Klikom na plus, otvara se forma za popunjavanje informacija o novoj knjizi
- Prikaz detalja knjige: Kada se klikne na knjigu, prikazuju se sve informacije o toj knjizi
- Izmena informacija o knjizi: Zaposleni može da ažurira informacije o datoj knjizi
- Arhiviranje knjige: Zaposleni može da arhivira knjigu, pri čemu se ona više neće prikazivati na početnoj strani (nije više u prodaji)
- Dodavanje komentara: Zaposleni može da doda komentar vezan za tu knjigu
- Brisanje komentara: Zaposleni može da obriše samo svoje komentare
- Štampanje komentara: Svaki komentar je moguće odštampati, pri čemu se generiše PDF sa tekstom komentara
- Kreiranje narudžbenice: Poručivanje knjiga kojih nema na lageru, uz generisanje PDF sa stavkama narudžbenice
- Prijem narudžbenice: Čekiranje da je narudžbenica uspešno realizovana odnosno da su stigle nove količine poručenih knjiga, pri čemu se ažurira stanje knjiga

 ## Potrebno za rad
 - Node.js
 - npm
 - Angular CLI
 - Ionic CLI
 - Nalog na Firebase-u

## Koraci
1) Povezivanje sa github repozitorijumom
~~~
git init

git checkout -b knjizara

git remote add origin https://github.com/pavlovicc2302/projekatKnjizara.git

git fetch origin

git pull origin knjizara
~~~

2) Instaliranje node_modules
~~~
npm install
~~~

3) Pokretanje servera
~~~
ionic serve
~~~
ili
~~~
ng serve
~~~
