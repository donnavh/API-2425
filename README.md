# API @cmda-minor-web 2024 - 2025
Het web is een geweldige plek en de beschikbare technologieën ervan zijn vandaag de dag krachtiger dan ooit tevoren.
De kracht van het web ligt in het feit dat het een platform is dat voor iedereen beschikbaar is en dat het gebaseerd is
op open standaarden. De technologieën worden ontworpen en gespecificeerd op basis van consensus en zijn niet in handen
van één enkele entiteit.

Desondanks zijn er veel mensen en bedrijven die vinden dat het internet niet voldoet aan hun behoeften. Dit blijkt uit
de pogingen van grote techbedrijven om hun eigen afgesloten ecosystemen te creëren. Ze streven hiermee naar controle over
zowel de gebruikerservaring als de gegenereerde data.

**In dit vier weken durende vak zullen we de kracht van het web ervaren en kijken hoe we (mobiele) web apps kunnen maken die
net zo aantrekkelijk zijn als native mobiele apps. We beginnen met het maken van een server-side gerenderde applicatie
waarbij we geleidelijk de gebruikerservaring verbeteren met relevante beschikbare web API's.**

[TLDR; hoe zet ik mijn project op?](#Inrichten-ontwikkelomgeving)

## Doelen

Na deze cursus zul je:

- In staat zijn om een server-side gerenderde applicatie te maken.
- In staat zijn om een enerverende gebruikerservaring te creëren.
- Een breder begrip hebben van het web en zijn mogelijkheden.

## Opdracht

In dit vak zullen we een van de meest voorkomende app-concepten van vandaag
gebruiken en ontdekken dat we deze kunnen maken met moderne webtechnologie
met als doel om een rijke gebruikerservaring creëeren.

Randvoorwaarden:

- Minimaal een overzichts- en detailpagina
- Gebouwd in TinyHTTP + Liquid
- Minimaal een content API
- Minimaal twee Web API's

Voorbeelden:

- Maak je eigen streamingplatform (Netflix/Spotify).
- Maak je eigen doom-scroll-app (Instagram/TikTok).
- Maak je eigen chatapplicatie (WhatsApp/Signal).
- Een andere app die je zelf leuk vindt...

Voorbeeld content API's die je kan gebruiken:

- [MovieDB API](https://developer.themoviedb.org/reference/intro/getting-started)
- [Rijksmuseum API](https://data.rijksmuseum.nl/object-metadata/api/)
- [Spotify API](https://developer.spotify.com/documentation/web-api)
- ...

Voorbeelden van Web API's die je kan gebruiken:

- [Page Transition API voor animaties tusse npagina's](https://developer.mozilla.org/en-US/docs/Web/API/Page_Transitions_API)
- [Web Animations API voor complexe animaties](https://developer.mozilla.org/en-US/docs/Web/API/Web_Animations_API)
- [Service Worker API voor installable web apps](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API)
- [Web Push API voor push notifications](https://developer.mozilla.org/en-US/docs/Web/API/Push_API)
- [Server sent events voor realtime functionaliteit](https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events)
- [Geolocation API](https://developer.mozilla.org/en-US/docs/Web/API/Geolocation_API)
- [Web Speech API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API)
- [Web Share API voor sharen van content binnen de context van de gebruiker](https://developer.mozilla.org/en-US/docs/Web/API/Navigator/share)
- ...

De lijst is eindeloos, laat je vooral inspireren op de overzichtspagina van [MDN](https://developer.mozilla.org/en-US/docs/Web/API).

## Beoordeling
De beoordelingscriteria zijn te vinden op [DLO](https://dlo.mijnhva.nl/d2l/le/content/609470/Home)

## Planning

| Planning                   | Maandag               | Dinsdag            | Vrijdag                                     |
|----------------------------|-----------------------|--------------------|---------------------------------------------|
| Week 1 - Kickoff & concept | Introductie ne uitleg | Workshops          | Feedback gesprekken                         |
| Week 2 - The baseline      | College + workshops   | Workshops          | Feedback gesprekken                         |
| Week 3 - Enhance           | College + workshops   | Workshops          | Feedback gesprekken(*DONDERDAG*)            |
| Week 4 - Enhance & wrap up | Tweede paasdag        | Individuele vragen | Beoordelingsgesprekken(*DONDERDAG/VRIJDAG*) |

## Bronnen

- [Nodejs.org](https://nodejs.org/en/), voor de installatie van NodeJS op jouw systeem, kies voor NodeJS 22.13.1 Long Term Support. Dit is de meest stabiele versie van NodeJS, welke ondersteund wordt met goede documentatie.
- [VSCode How To Open Terminal](https://www.youtube.com/watch?v=OmQhOnBzg_k), om iemand de terminal te zien openen en gebruiken op Youtube.
- [Introduction to NodeJS](https://nodejs.dev/en/learn/), voor een in depth introductie met de NodeJS ontwikkelomgeving. Let op: dit is best een technisch verhaal. De eerste zes pagina’s zijn interessant.
- Om serverside te kunnen renderen maken we gebruik van [TinyHttp](https://github.com/tinyhttp).
- Voor templating maken we gebruik van [LiquidJS](https://liquidjs.com/).
- [Liquid Filters](https://liquidjs.com/filters/overview.html)
- Voor build tooling(CSS en JS) maken we gebruik [Vite](https://vitejs.dev/).
- [Using the Fetch API @ MDN](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch)
- [JSON.parse() @ MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/parse)
- [Partial commits in GitHub Desktop](https://github.blog/news-insights/product-news/partial-commits-in-github-for-windows/)
- [Committing and reviewing changes to your project in GitHub Desktop](https://docs.github.com/en/desktop/making-changes-in-a-branch/committing-and-reviewing-changes-to-your-project-in-github-desktop)

## Inrichten ontwikkelomgeving

1. Navigeer naar [nodejs.org](https://nodejs.org/en/) en installeer de NodeJS ontwikkelomgeving. Kies voor _NodeJS 22.13.1 with long-term support_, download de benodigde bestanden en doorloop het installatieproces.

2. Fork daarna [deze repository](https://github.com/cmda-minor-web/API-2425) en *clone* deze op jouw computer.

3. Open deze repository in je code editor.

4. Open de _Terminal_ in Visual Studio Code door de toetscombinatie `` ^` `` (control + `) te gebruiken. Er opent een terminalscherm in de hoofdmap van jouw project.

5. Voer in de terminal het commando `npm install` uit, door het in te typen en op enter te drukken. Je gebruikt _NPM_, de _NodeJS Package Manager_ om alle _afhankelijkheden_ voor dit project te installeren. NPM is een veelgebruikte package manager in frontend land. Voor dit project gebruiken we _TinyHTTP_ (om een _server_ te maken) en _Liquid_ (om HTML te _renderen_).
- (Optioneel) Na de installatie is de map `node_modules` aangemaakt, en gevuld met allerlei _packages_. Scroll eens door deze map heen; vele honderden *open source* ontwikkelaars hebben de packages die je ziet gebouwd en die mag je gratis gebruiken. Ontwikkelen in NodeJS is *standing on the shoulders of giants*.

### Project starten en stoppen
Start het voorbeeldproject op door in de terminal het commando `npm run dev` uit te voeren. Als het goed is, komt een melding te staan over het opstarten van de server: `Server available on http://localhost:3000` — Open deze URL in je browser. Let op: Vite draait op een andere poort dan TinyHTTP, dus je moet de poort van TinyHTTP gebruiken: http://localhost:3000

Als het werkt, zet je je server weer uit door in de terminal de toetscombinatie `^c` (control + c) in te voeren. Deze toetsencombinatie wordt in de terminal gebruikt om de huidige taak te stoppen en *controle* (vandaar de c) terug te krijgen van het programma.

- Optioneel: Volg het [NodeJS ‘Hello World’ voorbeeld](https://medium.com/@mohammedijas/hello-world-in-node-js-b333275ddc89)
- Optioneel, iets technischer: Lees de eerste vijf delen van [Introduction to Node](https://nodejs.dev/en/learn/) als je een meer in-depth introductie wilt met de NodeJS ontwikkelomgeving.


## Week 1
- Inleding gekregen over het vak en wat de vereisten zijn en wat er van ons verwacht wordt, vervolgens heb ik een kleine oefening gedaan met het inladen van APIs
- Vervolgens ben ik gaan brainstormen met wat voor idee ik zou willen doen en gaan bekijken wat het idee van de opdracht precies zou zijn. 
- ik heb een eerste opzet gemaakt voor een idee en deze gepitcht om te bespreken of dit werkt. 
    - Een idee van spotify en hier elementen uit halen om items in een playlist te kunnen toevoegen. We hebben besproken of dit een goed idee was en of dit goed was om hiermee door te gaan en dat was goed. 
    - Voordat ik ging beginnen heb ik wat onderzoek gedaan naar wat API's precies zijn omdat dit de eerste keer zou zijn dat ik hiermee zou gaan werken en verder ook niet veel ervaring heb met javascript en dit nog best lastig kan zijn
    - mijn content API's heb ik dus gekozen en kan ik beginnen met het opzetten. het is nog een beetje lastig omddat ik niet goed wist waar ik moest beginnen en hoe het precies werkte maar daarom hebben we gelukkig uitleg gekregen. 
Vervolgens was mijn volgende stap om te kijken hoe ik de API zou gaan moeten inladen en hier had ik een token voor nodig die ik aan moest gaan vragen. Ik dacht dat dit erg lastig zou gaan zijn maar als je betaald spotify gebruiker bent is het volgensmij iets gemakkelijker te krijgen. Dus dit ging uiteindelijk toch best snel 

Toen werd het tijd om de elementen uit spotify ook daadwerkelijk in te laden. Dit was voor mij nog het meest lastig denk ik. We hebben wat uitleg gekregen over hoe dit te doen is alleen was mijn Spotify API toch iets lastiger te gebruiken dan degene die we als voorbeeld gekregen hebben. Dus de komende dagen is dit toen vooral mijn focus geweest. Het onderzoeken van hoe de spotify API werkt en welke informatie ik hiermee kan verkrijgen die voor mij van toepassing is. En vervolgens hoe ik dit voor elkaar kan krijgen. Ik heb veel geprobeerd om de eerste data erin te krijgen. Ik snap dat als je content wil inladen van een API dat je dan een plek nodig hebt om dit van te halen en ook dat je aanmoet geven welke informatie er dan vertoond moet gaan worden. 
    Eerst heb ik dus geprobeerd om de featured artists te laten tonen zodat ik een begin had om content in te laden en vanuit daar verder kon werken en uitvogelen hoe de rest tot stand zou komen . 

## Week 2 
- Na de eerste week veel onderzoek te doen en veel vastlopen omdat alles nieuw is en ik nog niet goed weet waar ik moet beginnen. Is het dan tijd om toch te beginnen met code schrijven en maar te gaan proberen om vast te lopen en hoe ver ik kom
- ik ben begonnen met de index pagina te maken en hier artiesten te laten zien die spotify aanraad. ik begon om een functie op te stellen voor deze featured artists. Spotify geeft je bepaalde categorieen waar je content uit kan halen en welke elementen je hier voor moet gebruiken. Hier ben ik begonnne met de functie aan te maken voor de featured artists waarin ik de afbeelding van de desbetreffende artiest wilde krijgen en de naam van de artiest. Eerst kwam ik erachter dat de token maar een bepaalde tijd geldig is en je daarom dus toch nog geen info krijgt
- vervolgens heb ik via de spotify site proberen vinden hoe ik ervoor kan zorgen dat de token blijft werken wanneer ik bezig ben en ik niet elke keer dit probleem blijf krijgen, spotify heeft hier al info over online staan dus kan ik dit gebruiken om te zorgen dat de token zich blijft refreshen en ik gebruik kan maken van de spotify API
- nu de token blijft werken kan ik echt proberen om data uit de api te halen, heb op de liquid pagina een opzet gemaakt waardoor de afbeeldingen van de artiesten op het scherm komen samen met hun naam. Deze geef ik vorm als een soort kaartjes die in een grid staan. als eerst komen alleen de namen en komt er een placeholder te staan van de afbeeldingen in de kaart. 

<img src="/Scherm­afbeelding 2025-04-01 om 15.40.16.png" alt="foto van error">

## Week 3

Hierna was ik in de weer over hoe ik dit goed kon krijgen omdat ik data kon inladen over de artiesten en informatie kon krijgen alleen niet de afbeeldingen. ik heb geprobeerd in het liquid bestand of ik de afbeeldingen wel goed tag en hier leek niks mis mee te zijn. tot dat ik ging bespreken met klasgenoten en kijken naar de fouten om erachter te komen dat ik een aparte functie moest gaan aanmaken om de afbeedingen hierin te kunnen zetten. 
- Hiervoor heb ik de functie aangemaakt, 
    const getArtistImage = async (artistId, token)
    hier vraag ik de api om data te halen van elke artiest en hiervan de afbeelding te pakken om deze in te kunnen laden. Hiermee heb ik aangegeven dat ik afbeeldingen wil krijgen en deze vervolgens in mijn liquid weer aangepsroken om op de pagina te krijgen. 


Omdat ik wilde dat je van verschillende artiesten tracks kon toevoegen aan je playlist, kwam ik daar nu nog niet erg ver mee. maar ook zou de keuze van artiesten niet erg groot zijn, heb ik een extra pagina toegevoegd voor alle artiesten. Hierbij roep ik de api op om data van maximaal 50 artiesten op te halen en deze weer te geven. ik vraag dan op de naam, afbeelding, het genre en de populariteit van deze artiest. Hierbij heb ik gebruik gemaakt van de spotify web api voor several artists en heb ik deze all artists genoemd. 

## Week 4

Toen ben ik terug gaan kijken op het idee wat ik wilde uitwerken en hoever ik hiermee was. Ook omdat ik onderschat had dat spotify best een lastig project bleek te zijn. Ik heb zeker nog niet de functionaliteiten die ik wilde hebben. Met name dan het toevoegen van items aan je playlist wilde ik erg graan in mijn applicatie hebben.
Eerst is het misschien handig om uberhaupt tracks te hebben op mijn pagina om aan mijn playlist te kunnen toevoegen. Gelukkig is er al data die ik van de artiesten ophaal. Vervolgens ga ik dus een nieuwe functie aanmaken om de toptracks van de desbetreffende artiest op te roepen. Op de detailpagina vraag ik om de toptracks van de artiest, welke ook is aangepast op de regio van mijn spotify. 

dit doe ik door de functie van toptracks aan te maken. 
const getTopTracks = async (artistId, countryCode)


 Ook gezien de tijd wist ik dat het nog lastig ging worden. In mijn hoofd wilde ik het graag echt laten werken maar dit is toch niet realistich dus heb ik het voor deze vorm op een andere manier gedaan. Ik maak een pagina die ik playlist noem om de tracks hierin te kunnen laten zien. en hier de tracks die ik wil toevoegen naartoe stuur. 
 Dus vanaf nu is er op de detailpagina van de artiest zijn informatie te zien en daaronder de beste nummers die je kan toevoegen. 




gemaakte stappen: 
- featured artists pagina
- all artists pagina
- detail pagina 
- top tracks 
- add to playlist 


