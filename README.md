# SUP

## Kaj rabimo

### Obrat oz. "Poslovna enota"
Obrat vsebuje polja:
- naziv
- naslov z GPS koordinatami
GPS je za ugotavljanje da je delavec na lokaciji ko "se tuče", pa tudi za izračun dolžine poti od njegovega naslova bivanja.

### Obratovalni čas?
pon od do
tor ...
nedelja
praznik
praznik na nedeljo?

### Koledar?
Lahko je avtomatski glede na obratovalni čas?
Lahko bi barvali letni koledar?


### Stroškovno mesto
- naziv (npr blagajne, uprava,...)
Stroškovna mesta imajo delovna mesta.
Stroškovno mesto je pri SAOPju primer "strokovno osebje"
"Stroškovno mesto je namensko, prostorsko ali stvarno zaokrožena enota v podjetju, v kateri se pojavljajo stroški, ki jih je mogoče neposredno ali posredno razporejati na poslovne učinke."
V SAOPju je stroškovno mesto vezano na poslovno enoto.
Stroškovno mesto je tako oddelek (komerciala, računovodstvo, proizvodnja,..)

### Delovno mesto (?)
- naziv (npr. "blagajna 1", "blagajna 2")
Delovna mesta "zasedajo" delavci. To je za potrebe načrtovanja zaposlitve.
To je fizično delovno mesto.
V RAZPOREDu je delovno mesto to.

### Vrsta dela (?)
Vendar delavec ima lahko fiksno delovno mesto npr. "blagajnik pripravnik" ali pa "programer 1", "natakar"
To delovno mesto rabi drugačen naziv, ker na to je vezana plača.
Kako bi to poimenovali? Naziv delovnega mesta oz. vrsta dela.
V SUPu je delovno mesto to, torej ima drugačen pomen in namen.
Po drugi strani so oglasi za "prosta delovna mesta" in je izraz uveljavljen za ta pomen.
Nekje se uporablja izraz "tip delavca", primer je "Terenski kmet. svetovalec II".

file:///C:/Users/marko/Downloads/placejan2022.pdf
Z510: stroškovno mesto:
Z370 Šifra delovnega mesta: D027039 Učitelj razrednik
Z371 Šifra naziva: 4 Učitelj razrednik
Z381 Plačilni razred delovnega mesta FDMN: 32
Z073 Nominalna vrednost plačilnega razreda FDMN: 1.485,46
http://www.pportal.gov.si/FDMN/index.html

Mi imamo tudi TIP OMEJITVE v RAZPOREDu, ki predstavlja določene vidike "tipa delavca".

## Vrste obračuna (SAOP):
Redno delo
Koriščenje viška ur
Letni dopust
Izmensko delo
Delo v deljenem delovnem času
Delo ponoči
Prehrana na delu
Prevoz na delo - kilometrina
Prehrana na delu nad 10 ur
10 ur ponoči

## Izmene
Dopoldansko od-do (kjer je od dva podatka začetek od in konec od za drsni urnik, enako za do)
Popoldansko delo od-do
Nočno delo od-do

Imamo še prehod med izmenami (približek) začetek izmene minut, konec izmene minut

### Zaokroževanje ur in določanje izmene:
Zaokroževanje prihoda: "Na 15 minut"
Zaokroževanje odhoda: "Na 15 minut"

### Čas priprave na delo:
Pred pričetkom dela: "0 min"
Po končanem delu "0 minut"

### Malica na dan
Beleženje več malic? da/ne
Trajanje malice minut: ""
Omejitev števila malic na dan: ""

### Dogodki

Namesto tipiv odsotnosti je v SAOP in SUPu šifrant dogodkov (v SUPu se kliče Pribitek/Odbitek),
kjer se določa naziv in ali se štejejo ure v plus ali minus. Tako imamo dogodke:

Prisotnost
Koriščenje ur
Dopust tekočega leta
Krvodajalstvo 100%
Malica / kosilo
Službeno potovanje
Delo od doma
Delo izven zavoda

 in zraven koliko enot (ur)


ter v SUPu
Vračilo akontacije -
Regres za prehrano +
Prevoz na delo +
Dolg Žogica -
Dolg ŠeŠe -
Avans -
Kredit -
Osebni dohodek na TRR -
Letni regres za dopust +
Malomarnost v kuhinji - kolektivno -
Inventurne razlike -
Stimulacija +
Sklep - izvršba -
Razlika prejšnji mesec v minus -
Razlika prejšnji mesec v plus +
Minus v denarnici -
Nagrada +
Novoletnica +

Prehrana in prevoz na delo imajo v SAOP combo za izbiro algoritma izračuna. Kjer je default:
"predlagaj glede na "skupaj ure rednega dela/ure na dan zap.", imamo pa tudi:
"predlagaj glede na prisotnost po dnevih"

## Relacije
V SAOPju imamo:
https://si-icenter.knowledgeowl.com/help/izracun-prihodov-na-delo

šifra relacije:
Kraj odhoda:
Kraj prihoda:
Kilometri
Znesek:
  Dnevni:
  Mesečni:
  Kombiniran:

In potem imamo
"Relacije zaposlenega":
 Šifra relacije: 0002
 Naziv relacije: Dobravlje-Šempeter
 Način obračuna: kilometrina po relacijah

Iz ZDR:
http://www.pisrs.si/Pis.web/pregledPredpisa?id=ZAKO5944#

128. člen (višina dodatkov)
(1) Delavcu pripadajo dodatki za delo v posebnih pogojih dela, ki izhajajo iz razporeditve delovnega časa:
-        za nočno delo,
-        za nadurno delo,
-        za delo v nedeljo,
-        za delo na praznike in dela proste dneve po zakonu.
(2) Višina dodatkov iz prejšnjega odstavka se določi s kolektivno pogodbo na ravni dejavnosti.
(3) Dodatek za delo v nedeljo in dodatek za delo na dela proste dneve po zakonu se med seboj izključujeta.
(4) Dodatki se obračunavajo le za čas, ko je delavec delal v pogojih, zaradi katerih mu dodatek pripada.


Starost delavca je pomembna, obračuni so drugačni za delavce mlajše od 18 let in starejše od 55 let


Glej od 142. člen naprej o delovnem času in nadurah



Komponenta za koledar:
https://bryntum.com/examples/calendar/#example-calendar-scheduler



