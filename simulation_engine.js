// --- UCL 25/26 SIMULATION ENGINE ---

(function() {
    // 1. DATABASE CÁC ĐỘI BÓNG THAM GIA POOL BỐC THĂM
    const TEAM_POOL = {
        // ENGLAND
        "ENG": [
            { name: "Manchester City", prob: 1.0, atk: 91, def: 88, mid: 92 },
            { name: "Liverpool", prob: 0.96, atk: 90, def: 87, mid: 88 },
            { name: "Arsenal", prob: 0.96, atk: 88, def: 87, mid: 86 },
            { name: "Chelsea", prob: 0.80, atk: 85, def: 83, mid: 84 },
            { name: "Manchester United", prob: 0.70, atk: 82, def: 80, mid: 80 },
            { name: "Tottenham Hotspur", prob: 0.65, atk: 84, def: 79, mid: 81 },
            { name: "Aston Villa", prob: 0.65, atk: 82, def: 80, mid: 79 },
            { name: "Newcastle United", prob: 0.45, atk: 81, def: 80, mid: 78 },
            { name: "Bournemouth", prob: 0.05, atk: 73, def: 72, mid: 70 },
            { name: "Brighton", prob: 0.05, atk: 74, def: 72, mid: 73 }
        ],
        // SPAIN
        "ESP": [
            { name: "Real Madrid", prob: 1.0, atk: 93, def: 90, mid: 91 },
            { name: "Barcelona", prob: 1.0, atk: 91, def: 86, mid: 89 },
            { name: "Atlético Madrid", prob: 0.95, atk: 85, def: 88, mid: 83 },
            { name: "Villarreal", prob: 0.60, atk: 80, def: 79, mid: 78 },
            { name: "Real Sociedad", prob: 0.55, atk: 79, def: 78, mid: 77 },
            { name: "Athletic Club", prob: 0.50, atk: 78, def: 79, mid: 76 },
            { name: "Sevilla", prob: 0.40, atk: 77, def: 76, mid: 75 },
            { name: "Real Betis", prob: 0.30, atk: 76, def: 75, mid: 74 }
        ],
        // GERMANY
        "GER": [
            { name: "Bayern Munich", prob: 1.0, atk: 92, def: 88, mid: 90 },
            { name: "Borussia Dortmund", prob: 1.0, atk: 85, def: 82, mid: 83 },
            { name: "Bayer Leverkusen", prob: 0.85, atk: 87, def: 86, mid: 87 },
            { name: "RB Leipzig", prob: 0.75, atk: 83, def: 82, mid: 82 },
            { name: "Eintracht Frankfurt", prob: 0.60, atk: 81, def: 79, mid: 79 },
            { name: "Stuttgart", prob: 0.55, atk: 80, def: 79, mid: 78 },
            { name: "Freiburg", prob: 0.08, atk: 74, def: 75, mid: 72 },
            { name: "Borussia M'gladbach", prob: 0.30, atk: 76, def: 75, mid: 74 },
            { name: "Hoffenheim", prob: 0.02, atk: 71, def: 70, mid: 70 },
            { name: "Hamburg SV", prob: 0.02, atk: 70, def: 69, mid: 69 },
            { name: "Union Berlin", prob: 0.01, atk: 69, def: 70, mid: 68 }
        ],
        // ITALY
        "ITA": [
            { name: "Inter Milan", prob: 1.0, atk: 88, def: 88, mid: 87 },
            { name: "Napoli", prob: 0.80, atk: 84, def: 82, mid: 80 },
            { name: "AC Milan", prob: 0.66, atk: 84, def: 83, mid: 82 },
            { name: "Juventus", prob: 0.70, atk: 83, def: 84, mid: 81 },
            { name: "Atalanta", prob: 0.65, atk: 83, def: 82, mid: 81 },
            { name: "Como", prob: 0.35, atk: 78, def: 76, mid: 76 },
            { name: "Roma", prob: 0.55, atk: 81, def: 79, mid: 79 },
            { name: "Lazio", prob: 0.36, atk: 80, def: 79, mid: 78 },
            { name: "Bologna", prob: 0.25, atk: 77, def: 76, mid: 75 },
            { name: "Fiorentina", prob: 0.20, atk: 78, def: 77, mid: 76 }
        ],
        // FRANCE
        "FRA": [
            { name: "PSG", prob: 1.0, atk: 92, def: 85, mid: 88 },
            { name: "Lens", prob: 0.50, atk: 78, def: 77, mid: 76 },
            { name: "Marseille", prob: 0.60, atk: 80, def: 78, mid: 78 },
            { name: "Lille", prob: 0.55, atk: 79, def: 79, mid: 77 },
            { name: "Lyon", prob: 0.55, atk: 79, def: 77, mid: 77 },
            { name: "Monaco", prob: 0.65, atk: 82, def: 80, mid: 80 },
            { name: "Nice", prob: 0.30, atk: 76, def: 75, mid: 73 },
            { name: "Strasbourg", prob: 0.15, atk: 73, def: 72, mid: 71 },
            { name: "Rennes", prob: 0.08, atk: 72, def: 71, mid: 70 },
            { name: "Brest", prob: 0.01, atk: 74, def: 73, mid: 72 }
        ],
        // PORTUGAL
        "POR": [
            { name: "Benfica", prob: 1.0, atk: 83, def: 81, mid: 80 },
            { name: "Porto", prob: 0.85, atk: 81, def: 80, mid: 79 },
            { name: "Sporting CP", prob: 0.80, atk: 81, def: 80, mid: 79 },
            { name: "Braga", prob: 0.35, atk: 76, def: 74, mid: 73 }
        ],
        // NETHERLANDS
        "NED": [
            { name: "PSV Eindhoven", prob: 0.80, atk: 82, def: 79, mid: 80 },
            { name: "Ajax", prob: 0.75, atk: 81, def: 79, mid: 79, isAjax: true },
            { name: "Feyenoord", prob: 0.60, atk: 80, def: 77, mid: 78 },
            { name: "AZ Alkmaar", prob: 0.45, atk: 77, def: 76, mid: 75 }
        ],
        // REST OF EUROPE
        "SCO": [
            { name: "Celtic", prob: 0.85, atk: 78, def: 76, mid: 75 },
            { name: "Rangers", prob: 0.50, atk: 76, def: 75, mid: 74 },
            { name: "Hearts", prob: 0.05, atk: 68, def: 67, mid: 66 }
        ],
        "BEL": [
            { name: "Club Brugge", prob: 0.70, atk: 77, def: 76, mid: 75 },
            { name: "Genk", prob: 0.55, atk: 74, def: 73, mid: 72 },
            { name: "Union Saint-Gilloise", prob: 0.50, atk: 75, def: 73, mid: 73 },
            { name: "Anderlecht", prob: 0.30, atk: 74, def: 72, mid: 72 }
        ],
        "TUR": [
            { name: "Galatasaray", prob: 0.70, atk: 78, def: 75, mid: 75 },
            { name: "Fenerbahçe", prob: 0.55, atk: 77, def: 74, mid: 74 },
            { name: "Besiktas", prob: 0.20, atk: 73, def: 71, mid: 71 },
            { name: "Istanbul Basaksehir", prob: 0.12, atk: 70, def: 69, mid: 68 }
        ],
        "AUT": [
            { name: "Salzburg", prob: 0.80, atk: 76, def: 74, mid: 74 },
            { name: "Sturm Graz", prob: 0.40, atk: 71, def: 70, mid: 69 },
            { name: "LASK", prob: 0.20, atk: 69, def: 68, mid: 67 },
            { name: "Wolfsberger AC", prob: 0.10, atk: 66, def: 65, mid: 64 }
        ],
        "CZE": [
            { name: "Sparta Prague", prob: 0.70, atk: 74, def: 73, mid: 72 },
            { name: "Slavia Prague", prob: 0.55, atk: 73, def: 72, mid: 71 },
            { name: "Viktoria Plzen", prob: 0.10, atk: 69, def: 68, mid: 67 }
        ],
        "CRO": [
            { name: "Dinamo Zagreb", prob: 0.70, atk: 73, def: 72, mid: 71 },
            { name: "Hajduk Split", prob: 0.08, atk: 67, def: 66, mid: 65 }
        ],
        "SRB": [
            { name: "Crvena zvezda", prob: 0.75, atk: 76, def: 75, mid: 73 },
            { name: "Partizan", prob: 0.10, atk: 71, def: 70, mid: 69 }
        ],
        "DEN": [
            { name: "FC Copenhagen", prob: 0.60, atk: 71, def: 70, mid: 69 },
            { name: "Midtjylland", prob: 0.40, atk: 70, def: 69, mid: 68 },
            { name: "Brondby", prob: 0.18, atk: 67, def: 66, mid: 65 },
            { name: "Nordsjaelland", prob: 0.12, atk: 66, def: 65, mid: 64 }
        ],
        "GRE": [
            { name: "Olympiakos", prob: 0.60, atk: 72, def: 71, mid: 70 },
            { name: "PAOK", prob: 0.45, atk: 70, def: 70, mid: 68 },
            { name: "AEK Athens", prob: 0.40, atk: 69, def: 68, mid: 67 },
            { name: "Panathinaikos", prob: 0.30, atk: 68, def: 67, mid: 66 }
        ],
        "SUI": [
            { name: "Young Boys", prob: 0.65, atk: 70, def: 69, mid: 68 },
            { name: "Basel", prob: 0.10, atk: 68, def: 67, mid: 66 },
            { name: "FC Zurich", prob: 0.06, atk: 65, def: 65, mid: 63 }
        ],
        "HUN": [
            { name: "Ferencváros", prob: 0.15, atk: 70, def: 69, mid: 68 }
        ],
        "UKR": [
            { name: "Shakhtar Donetsk", prob: 0.65, atk: 75, def: 73, mid: 72 },
            { name: "Dynamo Kyiv", prob: 0.40, atk: 70, def: 69, mid: 68 }
        ],
        "POL": [
            { name: "Legia Warsaw", prob: 0.10, atk: 68, def: 67, mid: 66 },
            { name: "Lech Poznań", prob: 0.10, atk: 67, def: 66, mid: 65 },
            { name: "Wisla Krakow", prob: 0.01, atk: 62, def: 62, mid: 61 }
        ],
        "CYP": [
            { name: "APOEL Nicosia", prob: 0.05, atk: 63, def: 63, mid: 61 },
            { name: "Apollon Limassol", prob: 0.03, atk: 62, def: 62, mid: 60 }
        ],
        "BLR": [
            { name: "BATE Borisov", prob: 0.05, atk: 63, def: 62, mid: 61 }
        ],
        "SWE": [
            { name: "Malmö FF", prob: 0.25, atk: 67, def: 66, mid: 65 },
            { name: "AIK Solna", prob: 0.01, atk: 65, def: 65, mid: 64 },
            { name: "Elfsborg", prob: 0.01, atk: 65, def: 65, mid: 64 }
        ],
        "NOR": [
            { name: "Bodo/Glimt", prob: 0.30, atk: 72, def: 70, mid: 70 },
            { name: "Rosenborg", prob: 0.01, atk: 64, def: 63, mid: 62 }
        ],
        "BUL": [
            { name: "Ludogorets", prob: 0.40, atk: 68, def: 67, mid: 66 }
        ],
        "RUS": [
            { name: "Zenit St. Petersburg", prob: 0.20, atk: 74, def: 73, mid: 72 }
        ],
        "SLO": [
            { name: "Maribor", prob: 0.01, atk: 63, def: 63, mid: 62 }
        ],
        "IRL": [
            { name: "Shamrock Rovers", prob: 0.01, atk: 60, def: 60, mid: 59 },
            { name: "Sligo Rovers", prob: 0.01, atk: 59, def: 59, mid: 58 },
            { name: "Derry City", prob: 0.01, atk: 59, def: 59, mid: 58 }
        ],
        "ROU": [
            { name: "CFR Cluj", prob: 0.06, atk: 68, def: 68, mid: 67 }
        ]
    };

    // Helper: phân phối Poisson cho tỉ số bóng đá
    function poissonRandom(lambda) {
        let L = Math.exp(-lambda);
        let k = 0;
        let p = 1;
        do {
            k++;
            p *= Math.random();
        } while (p > L);
        return k - 1;
    }

    // --- OVERRIDE ROSTERS (from tong_hop_111_doi_hinh_2026.md) ---
    // Source of truth for ALL AI team scorers. Do NOT edit manually.
    const OVERRIDE_ROSTERS = {
        "acmilan": [
            { name: "Leão", pos: "FW", rating: 84 },
            { name: "Nkunku", pos: "FW", rating: 84 },
            { name: "Pulisic", pos: "FW", rating: 84 },
            { name: "S. Giménez", pos: "FW", rating: 77 },
            { name: "Füllkrug", pos: "FW", rating: 77 },
            { name: "Saelemaekers", pos: "FW", rating: 77 },
            { name: "Fofana", pos: "MF", rating: 82 },
            { name: "Rabiot", pos: "MF", rating: 82 },
            { name: "Modrić", pos: "MF", rating: 82 },
            { name: "Ricci", pos: "MF", rating: 76 },
            { name: "Loftus-Cheek", pos: "MF", rating: 76 },
            { name: "Jashari", pos: "MF", rating: 76 },
            { name: "Tomori", pos: "DF", rating: 76 },
            { name: "Pavlović", pos: "DF", rating: 76 },
            { name: "Estupiñán", pos: "DF", rating: 76 },
            { name: "De Winter", pos: "DF", rating: 76 },
            { name: "Gabbia", pos: "DF", rating: 60 },
            { name: "Terracciano", pos: "DF", rating: 60 },
            { name: "Bartesaghi", pos: "DF", rating: 60 },
            { name: "Athekame", pos: "DF", rating: 60 },
        ],
        "aekathens": [
            { name: "Koïta", pos: "FW", rating: 84 },
            { name: "Marin", pos: "FW", rating: 84 },
            { name: "Eliasson", pos: "FW", rating: 84 },
            { name: "Kosidis", pos: "FW", rating: 77 },
            { name: "Kutesa", pos: "FW", rating: 77 },
            { name: "Mantalos", pos: "MF", rating: 82 },
            { name: "Pineda", pos: "MF", rating: 82 },
            { name: "Jønsson", pos: "MF", rating: 82 },
            { name: "Gaćinović", pos: "MF", rating: 82 },
            { name: "Jović", pos: "MF", rating: 76 },
            { name: "J. Mário", pos: "MF", rating: 76 },
            { name: "Ljubičić", pos: "MF", rating: 76 },
            { name: "Pereyra", pos: "MF", rating: 76 },
            { name: "Vida", pos: "DF", rating: 76 },
            { name: "Moukoudi", pos: "DF", rating: 76 },
            { name: "Callens", pos: "DF", rating: 76 },
            { name: "Pilios", pos: "DF", rating: 76 },
            { name: "Rota", pos: "DF", rating: 60 },
            { name: "Varga", pos: "DF", rating: 60 },
            { name: "Penrice", pos: "DF", rating: 60 },
            { name: "Relvas", pos: "DF", rating: 60 },
        ],
        "aiksolna": [
            { name: "Celina", pos: "FW", rating: 84 },
            { name: "Ali", pos: "FW", rating: 84 },
            { name: "Gono", pos: "FW", rating: 84 },
            { name: "Beširović", pos: "FW", rating: 77 },
            { name: "Flataker", pos: "FW", rating: 77 },
            { name: "Ellingsen", pos: "MF", rating: 82 },
            { name: "Mujanic", pos: "MF", rating: 82 },
            { name: "Hove", pos: "MF", rating: 82 },
            { name: "Helm", pos: "MF", rating: 76 },
            { name: "Redkin", pos: "MF", rating: 76 },
            { name: "Filling", pos: "MF", rating: 76 },
            { name: "Papagiannopoulos", pos: "DF", rating: 76 },
            { name: "Edh", pos: "DF", rating: 76 },
            { name: "Nissen", pos: "DF", rating: 76 },
            { name: "Thychosen", pos: "DF", rating: 76 },
            { name: "Cissé", pos: "DF", rating: 60 },
            { name: "Csongvai", pos: "DF", rating: 60 },
            { name: "Andersson", pos: "DF", rating: 60 },
        ],
        "apoelnicosia": [
            { name: "Marquinhos", pos: "FW", rating: 84 },
            { name: "Maioli", pos: "FW", rating: 84 },
            { name: "Diamantakos", pos: "FW", rating: 77 },
            { name: "Baldé", pos: "FW", rating: 77 },
            { name: "Meyer", pos: "MF", rating: 82 },
            { name: "Satsias", pos: "MF", rating: 82 },
            { name: "Tomás", pos: "MF", rating: 82 },
            { name: "Dálcio", pos: "MF", rating: 76 },
            { name: "D. Rosa", pos: "MF", rating: 76 },
            { name: "Stafylidis", pos: "DF", rating: 76 },
            { name: "Vitor Meer", pos: "DF", rating: 76 },
            { name: "Bah", pos: "DF", rating: 76 },
            { name: "Nanu", pos: "DF", rating: 60 },
            { name: "Brorsson", pos: "DF", rating: 60 },
            { name: "Laifis", pos: "DF", rating: 60 },
        ],
        "azalkmaar": [
            { name: "Parrott", pos: "FW", rating: 84 },
            { name: "Sadiq", pos: "FW", rating: 84 },
            { name: "Hornkamp", pos: "FW", rating: 77 },
            { name: "Smit", pos: "FW", rating: 77 },
            { name: "Patati", pos: "FW", rating: 77 },
            { name: "Koopmeiners", pos: "MF", rating: 82 },
            { name: "Clasie", pos: "MF", rating: 82 },
            { name: "Mijnans", pos: "MF", rating: 82 },
            { name: "Kasius", pos: "MF", rating: 76 },
            { name: "Šín", pos: "MF", rating: 76 },
            { name: "Maikuma", pos: "DF", rating: 76 },
            { name: "Goes", pos: "DF", rating: 76 },
            { name: "Dekker", pos: "DF", rating: 76 },
            { name: "Penetra", pos: "DF", rating: 60 },
            { name: "De Wit", pos: "DF", rating: 60 },
        ],
        "ajax": [
            { name: "Dolberg", pos: "FW", rating: 84 },
            { name: "Godts", pos: "FW", rating: 84 },
            { name: "Weghorst", pos: "FW", rating: 84 },
            { name: "Ibrahimović", pos: "FW", rating: 77 },
            { name: "Edvardsen", pos: "FW", rating: 77 },
            { name: "Gloukh", pos: "MF", rating: 82 },
            { name: "Klaassen", pos: "MF", rating: 82 },
            { name: "Berghuis", pos: "MF", rating: 82 },
            { name: "Fitz-Jim", pos: "MF", rating: 76 },
            { name: "Bounida", pos: "MF", rating: 76 },
            { name: "Steur", pos: "MF", rating: 76 },
            { name: "Gaaei", pos: "DF", rating: 76 },
            { name: "Itakura", pos: "DF", rating: 76 },
            { name: "Wijndal", pos: "DF", rating: 76 },
            { name: "Regeer", pos: "DF", rating: 76 },
            { name: "Baas", pos: "DF", rating: 76 },
            { name: "Mokio", pos: "DF", rating: 60 },
            { name: "Tomiyasu", pos: "DF", rating: 60 },
            { name: "Šutalo", pos: "DF", rating: 60 },
            { name: "Zinchenko", pos: "DF", rating: 60 },
        ],
        "anderlecht": [
            { name: "Amuzu", pos: "FW", rating: 84 },
            { name: "Vázquez", pos: "FW", rating: 84 },
            { name: "Dreyer", pos: "FW", rating: 84 },
            { name: "Gotō", pos: "FW", rating: 77 },
            { name: "Diouf", pos: "FW", rating: 77 },
            { name: "Ferrari", pos: "FW", rating: 77 },
            { name: "Verschaeren", pos: "MF", rating: 82 },
            { name: "Leoni", pos: "MF", rating: 82 },
            { name: "Rits", pos: "MF", rating: 82 },
            { name: "Stroeykens", pos: "MF", rating: 76 },
            { name: "Matsuzawa", pos: "MF", rating: 76 },
            { name: "Zanka", pos: "DF", rating: 76 },
            { name: "Vertonghen", pos: "DF", rating: 76 },
            { name: "Sardella", pos: "DF", rating: 76 },
            { name: "Augustinsson", pos: "DF", rating: 60 },
            { name: "Janssens", pos: "DF", rating: 60 },
        ],
        "apollonlimassol": [
            { name: "Rodrigues", pos: "FW", rating: 84 },
            { name: "Andreou", pos: "FW", rating: 84 },
            { name: "Duodu", pos: "FW", rating: 84 },
            { name: "Thomas", pos: "FW", rating: 84 },
            { name: "Marques", pos: "FW", rating: 77 },
            { name: "Sagal", pos: "FW", rating: 77 },
            { name: "Dorregaray", pos: "FW", rating: 77 },
            { name: "Brown", pos: "MF", rating: 82 },
            { name: "Assunção", pos: "MF", rating: 82 },
            { name: "Athanasiou", pos: "MF", rating: 82 },
            { name: "Špoljarić", pos: "MF", rating: 76 },
            { name: "Weissbeck", pos: "MF", rating: 76 },
            { name: "Coll", pos: "MF", rating: 76 },
            { name: "Malekkides", pos: "DF", rating: 76 },
            { name: "Shikkis", pos: "DF", rating: 76 },
            { name: "Celebi", pos: "DF", rating: 76 },
            { name: "Vulner", pos: "DF", rating: 60 },
            { name: "Adoni", pos: "DF", rating: 60 },
        ],
        "arsenal": [
            { name: "Saka", pos: "FW", rating: 99 },
            { name: "Havertz", pos: "FW", rating: 99 },
            { name: "Martinelli", pos: "FW", rating: 84 },
            { name: "Trossard", pos: "FW", rating: 84 },
            { name: "Jesus", pos: "FW", rating: 77 },
            { name: "Gyökeres", pos: "FW", rating: 99 },
            { name: "Madueke", pos: "FW", rating: 77 },
            { name: "Ødegaard", pos: "MF", rating: 82 },
            { name: "Rice", pos: "MF", rating: 99 },
            { name: "Eze", pos: "MF", rating: 82 },
            { name: "Merino", pos: "MF", rating: 82 },
            { name: "Zubimendi", pos: "MF", rating: 76 },
            { name: "Nørgaard", pos: "MF", rating: 76 },
            { name: "Lewis-Skelly", pos: "MF", rating: 76 },
            { name: "Saliba", pos: "DF", rating: 76 },
            { name: "Gabriel", pos: "DF", rating: 99 },
            { name: "White", pos: "DF", rating: 76 },
            { name: "Timber", pos: "DF", rating: 76 },
            { name: "Calafiori", pos: "DF", rating: 60 },
            { name: "Mosquera", pos: "DF", rating: 60 },
            { name: "Hincapié", pos: "DF", rating: 60 },
        ],
        "astonvilla": [
            { name: "Watkins", pos: "FW", rating: 84 },
            { name: "Bailey", pos: "FW", rating: 84 },
            { name: "Rogers", pos: "FW", rating: 84 },
            { name: "Buendía", pos: "FW", rating: 84 },
            { name: "Sancho", pos: "FW", rating: 77 },
            { name: "Abraham", pos: "FW", rating: 77 },
            { name: "Elliott", pos: "FW", rating: 77 },
            { name: "McGinn", pos: "MF", rating: 82 },
            { name: "Tielemans", pos: "MF", rating: 82 },
            { name: "Onana", pos: "MF", rating: 82 },
            { name: "Kamara", pos: "MF", rating: 76 },
            { name: "Barkley", pos: "MF", rating: 76 },
            { name: "Douglas Luiz", pos: "MF", rating: 76 },
            { name: "Konsa", pos: "DF", rating: 76 },
            { name: "Torres", pos: "DF", rating: 76 },
            { name: "Cash", pos: "DF", rating: 76 },
            { name: "Digne", pos: "DF", rating: 76 },
            { name: "Maatsen", pos: "DF", rating: 60 },
            { name: "Mings", pos: "DF", rating: 60 },
            { name: "Lindelöf", pos: "DF", rating: 60 },
        ],
        "atalanta": [
            { name: "Retegui", pos: "FW", rating: 84 },
            { name: "De Ketelaere", pos: "FW", rating: 84 },
            { name: "Scamacca", pos: "FW", rating: 77 },
            { name: "Zaniolo", pos: "FW", rating: 77 },
            { name: "Ederson", pos: "MF", rating: 82 },
            { name: "Pasalić", pos: "MF", rating: 82 },
            { name: "De Roon", pos: "MF", rating: 82 },
            { name: "Samardžić", pos: "MF", rating: 97 },
            { name: "Brescianini", pos: "MF", rating: 76 },
            { name: "Hien", pos: "DF", rating: 76 },
            { name: "Scalvini", pos: "DF", rating: 76 },
            { name: "Kolašinac", pos: "DF", rating: 76 },
            { name: "Bellanova", pos: "DF", rating: 76 },
            { name: "Ruggeri", pos: "DF", rating: 60 },
            { name: "Djimsiti", pos: "DF", rating: 60 },
            { name: "Tolói", pos: "DF", rating: 60 },
        ],
        "athleticclub": [
            { name: "I. Williams", pos: "FW", rating: 84 },
            { name: "N. Williams", pos: "FW", rating: 84 },
            { name: "Guruzeta", pos: "FW", rating: 84 },
            { name: "Berenguer", pos: "FW", rating: 77 },
            { name: "Djaló", pos: "FW", rating: 77 },
            { name: "Sancet", pos: "MF", rating: 82 },
            { name: "Vesga", pos: "MF", rating: 82 },
            { name: "Galarreta", pos: "MF", rating: 76 },
            { name: "Prados", pos: "MF", rating: 76 },
            { name: "Vivian", pos: "DF", rating: 76 },
            { name: "Paredes", pos: "DF", rating: 76 },
            { name: "Yeray", pos: "DF", rating: 76 },
            { name: "Gorosabel", pos: "DF", rating: 60 },
            { name: "Yuri", pos: "DF", rating: 60 },
        ],
        "atleticomadrid": [
            { name: "Alvarez", pos: "FW", rating: 97 },
            { name: "Sørloth", pos: "FW", rating: 84 },
            { name: "Lookman", pos: "FW", rating: 77 },
            { name: "Almada", pos: "FW", rating: 77 },
            { name: "Simeone", pos: "FW", rating: 77 },
            { name: "Koke", pos: "MF", rating: 82 },
            { name: "De Paul", pos: "MF", rating: 82 },
            { name: "Llorente", pos: "MF", rating: 82 },
            { name: "Barrios", pos: "MF", rating: 76 },
            { name: "Lemar", pos: "MF", rating: 76 },
            { name: "N. González", pos: "MF", rating: 76 },
            { name: "Giménez", pos: "DF", rating: 76 },
            { name: "Le Normand", pos: "DF", rating: 76 },
            { name: "Molina", pos: "DF", rating: 76 },
            { name: "Hancko", pos: "DF", rating: 60 },
            { name: "Lenglet", pos: "DF", rating: 60 },
            { name: "Ruggeri", pos: "DF", rating: 60 },
        ],
        "bateborisov": [
            { name: "Shulyanskyi", pos: "FW", rating: 84 },
            { name: "Yade", pos: "FW", rating: 84 },
            { name: "Castillo", pos: "FW", rating: 77 },
            { name: "Anufriev", pos: "FW", rating: 77 },
            { name: "Jota", pos: "MF", rating: 82 },
            { name: "Myshnyov", pos: "MF", rating: 82 },
            { name: "Touati", pos: "MF", rating: 82 },
            { name: "Smyrnyi", pos: "MF", rating: 76 },
            { name: "Zhukov", pos: "MF", rating: 76 },
            { name: "Buletsa", pos: "DF", rating: 76 },
            { name: "Drozd", pos: "DF", rating: 76 },
            { name: "Bol", pos: "DF", rating: 76 },
            { name: "Butko", pos: "DF", rating: 60 },
            { name: "Martynov", pos: "DF", rating: 60 },
        ],
        "barcelona": [
            { name: "Yamal", pos: "FW", rating: 99 },
            { name: "Raphinha", pos: "FW", rating: 99 },
            { name: "Lewandowski", pos: "FW", rating: 99 },
            { name: "Olmo", pos: "FW", rating: 77 },
            { name: "Ferran", pos: "FW", rating: 77 },
            { name: "Rashford", pos: "FW", rating: 72 },
            { name: "Pedri", pos: "MF", rating: 82 },
            { name: "Gavi", pos: "MF", rating: 82 },
            { name: "De Jong", pos: "MF", rating: 82 },
            { name: "Fermín", pos: "MF", rating: 76 },
            { name: "Casadó", pos: "MF", rating: 76 },
            { name: "Koundé", pos: "DF", rating: 76 },
            { name: "Araújo", pos: "DF", rating: 76 },
            { name: "Cubarsí", pos: "DF", rating: 76 },
            { name: "Balde", pos: "DF", rating: 60 },
            { name: "Cancelo", pos: "DF", rating: 60 },
            { name: "Christensen", pos: "DF", rating: 60 },
        ],
        "basel": [
            { name: "Shaqiri", pos: "FW", rating: 84 },
            { name: "Barry", pos: "FW", rating: 84 },
            { name: "Traoré", pos: "FW", rating: 84 },
            { name: "Fink", pos: "FW", rating: 77 },
            { name: "Ajeti", pos: "FW", rating: 77 },
            { name: "Avdullahu", pos: "MF", rating: 82 },
            { name: "Schmid", pos: "MF", rating: 82 },
            { name: "Leroy", pos: "MF", rating: 76 },
            { name: "Vouilloz", pos: "DF", rating: 76 },
            { name: "Barisic", pos: "DF", rating: 76 },
            { name: "Comas", pos: "DF", rating: 60 },
            { name: "Dräger", pos: "DF", rating: 60 },
        ],
        "bayerleverkusen": [
            { name: "Wirtz", pos: "FW", rating: 84 },
            { name: "Schick", pos: "FW", rating: 84 },
            { name: "Terrier", pos: "FW", rating: 84 },
            { name: "Ben Seghir", pos: "FW", rating: 77 },
            { name: "Tella", pos: "FW", rating: 77 },
            { name: "Andrich", pos: "MF", rating: 82 },
            { name: "Hofmann", pos: "MF", rating: 82 },
            { name: "Tillman", pos: "MF", rating: 82 },
            { name: "Palacios", pos: "MF", rating: 76 },
            { name: "García", pos: "MF", rating: 76 },
            { name: "Tapsoba", pos: "DF", rating: 76 },
            { name: "Grimaldo", pos: "DF", rating: 76 },
            { name: "Badé", pos: "DF", rating: 76 },
            { name: "Arthur", pos: "DF", rating: 60 },
            { name: "Mensah", pos: "DF", rating: 60 },
            { name: "Quansah", pos: "DF", rating: 60 },
        ],
        "bayernmunich": [
            { name: "Kane", pos: "FW", rating: 97 },
            { name: "Musiala", pos: "FW", rating: 84 },
            { name: "Díaz", pos: "FW", rating: 84 },
            { name: "Olise", pos: "FW", rating: 84 },
            { name: "Gnabry", pos: "FW", rating: 77 },
            { name: "Jackson", pos: "FW", rating: 77 },
            { name: "Kimmich", pos: "MF", rating: 82 },
            { name: "Goretzka", pos: "MF", rating: 82 },
            { name: "Pavlović", pos: "MF", rating: 76 },
            { name: "Laimer", pos: "MF", rating: 76 },
            { name: "Upamecano", pos: "DF", rating: 76 },
            { name: "Min-jae", pos: "DF", rating: 76 },
            { name: "Davies", pos: "DF", rating: 76 },
            { name: "Tah", pos: "DF", rating: 60 },
            { name: "Stanišić", pos: "DF", rating: 60 },
            { name: "H. Ito", pos: "DF", rating: 60 },
        ],
        "benfica": [
            { name: "Pavlidis", pos: "FW", rating: 84 },
            { name: "Lukébakio", pos: "FW", rating: 84 },
            { name: "Ivanović", pos: "FW", rating: 84 },
            { name: "Schjelderup", pos: "FW", rating: 77 },
            { name: "Bruma", pos: "FW", rating: 77 },
            { name: "Rafa", pos: "FW", rating: 77 },
            { name: "Sudakov", pos: "MF", rating: 82 },
            { name: "Barreiro", pos: "MF", rating: 82 },
            { name: "Aursnes", pos: "MF", rating: 82 },
            { name: "Ríos", pos: "MF", rating: 76 },
            { name: "Barrenechea", pos: "MF", rating: 76 },
            { name: "Silva", pos: "DF", rating: 76 },
            { name: "Dedić", pos: "DF", rating: 76 },
            { name: "Bah", pos: "DF", rating: 76 },
            { name: "T. Araújo", pos: "DF", rating: 60 },
            { name: "Dahl", pos: "DF", rating: 60 },
        ],
        "besiktas": [
            { name: "Muçi", pos: "FW", rating: 84 },
            { name: "Jota Silva", pos: "FW", rating: 84 },
            { name: "Kılıçsoy", pos: "FW", rating: 84 },
            { name: "Oh Hyeon-gyu", pos: "FW", rating: 77 },
            { name: "Touré", pos: "FW", rating: 77 },
            { name: "Rashica", pos: "MF", rating: 82 },
            { name: "Kökçü", pos: "MF", rating: 82 },
            { name: "Asllani", pos: "MF", rating: 82 },
            { name: "Ndidi", pos: "MF", rating: 82 },
            { name: "Al-Musrati", pos: "MF", rating: 76 },
            { name: "Černý", pos: "MF", rating: 76 },
            { name: "J. Mário", pos: "MF", rating: 76 },
            { name: "Uduokhai", pos: "DF", rating: 76 },
            { name: "Sanuç", pos: "DF", rating: 76 },
            { name: "Murillo", pos: "DF", rating: 76 },
            { name: "Topçu", pos: "DF", rating: 60 },
            { name: "Djaló", pos: "DF", rating: 60 },
            { name: "Yılmaz", pos: "DF", rating: 60 },
        ],
        "bodoglimt": [
            { name: "Høgh", pos: "FW", rating: 84 },
            { name: "Hauge", pos: "FW", rating: 94 },
            { name: "Blomberg", pos: "FW", rating: 84 },
            { name: "Bassi", pos: "FW", rating: 77 },
            { name: "Helmersen", pos: "FW", rating: 77 },
            { name: "Berg", pos: "MF", rating: 82 },
            { name: "Evjen", pos: "MF", rating: 82 },
            { name: "Fet", pos: "MF", rating: 97 },
            { name: "Saltnes", pos: "MF", rating: 76 },
            { name: "Auklend", pos: "MF", rating: 76 },
            { name: "Bjørkan", pos: "DF", rating: 76 },
            { name: "Bjørtuft", pos: "DF", rating: 76 },
            { name: "Nielsen", pos: "DF", rating: 76 },
            { name: "Gundersen", pos: "DF", rating: 60 },
            { name: "Aleesami", pos: "DF", rating: 60 },
        ],
        "bologna": [
            { name: "Orsolini", pos: "FW", rating: 84 },
            { name: "Castro", pos: "FW", rating: 84 },
            { name: "Bernardeschi", pos: "FW", rating: 84 },
            { name: "Odgaard", pos: "FW", rating: 77 },
            { name: "Dallinga", pos: "FW", rating: 77 },
            { name: "Cambiaghi", pos: "FW", rating: 77 },
            { name: "Pobega", pos: "MF", rating: 82 },
            { name: "Freuler", pos: "MF", rating: 82 },
            { name: "Ferguson", pos: "MF", rating: 82 },
            { name: "Sohm", pos: "MF", rating: 76 },
            { name: "Pessina", pos: "MF", rating: 76 },
            { name: "Domínguez", pos: "MF", rating: 76 },
            { name: "Helland", pos: "DF", rating: 76 },
            { name: "Heggem", pos: "DF", rating: 76 },
            { name: "Casale", pos: "DF", rating: 76 },
            { name: "Lykogiannis", pos: "DF", rating: 60 },
            { name: "Lucumí", pos: "DF", rating: 60 },
            { name: "Zortea", pos: "DF", rating: 60 },
        ],
        "borussiadortmund": [
            { name: "Guirassy", pos: "FW", rating: 84 },
            { name: "Beier", pos: "FW", rating: 84 },
            { name: "Adeyemi", pos: "FW", rating: 84 },
            { name: "Silva", pos: "FW", rating: 77 },
            { name: "Mané", pos: "FW", rating: 77 },
            { name: "Brandt", pos: "MF", rating: 82 },
            { name: "Sabitzer", pos: "MF", rating: 82 },
            { name: "Nmecha", pos: "MF", rating: 82 },
            { name: "Bellingham", pos: "MF", rating: 76 },
            { name: "Chukwuemeka", pos: "MF", rating: 76 },
            { name: "Schlotterbeck", pos: "DF", rating: 76 },
            { name: "Anton", pos: "DF", rating: 76 },
            { name: "Couto", pos: "DF", rating: 76 },
            { name: "Bensebaini", pos: "DF", rating: 60 },
            { name: "Ryerson", pos: "DF", rating: 60 },
            { name: "Süle", pos: "DF", rating: 60 },
        ],
        "borussiamgladbach": [
            { name: "Honorat", pos: "FW", rating: 84 },
            { name: "Kleindienst", pos: "FW", rating: 84 },
            { name: "Hack", pos: "FW", rating: 84 },
            { name: "Machino", pos: "FW", rating: 77 },
            { name: "Ngoumou", pos: "FW", rating: 77 },
            { name: "Stöger", pos: "MF", rating: 82 },
            { name: "Reyna", pos: "MF", rating: 82 },
            { name: "Neuhaus", pos: "MF", rating: 82 },
            { name: "Reitz", pos: "MF", rating: 76 },
            { name: "Engelhardt", pos: "MF", rating: 76 },
            { name: "Diks", pos: "DF", rating: 76 },
            { name: "Elvedi", pos: "DF", rating: 76 },
            { name: "Scally", pos: "DF", rating: 76 },
            { name: "Friedrich", pos: "DF", rating: 60 },
            { name: "Takai", pos: "DF", rating: 60 },
        ],
        "bournemouth": [
            { name: "Kluivert", pos: "FW", rating: 84 },
            { name: "Evanilson", pos: "FW", rating: 84 },
            { name: "Sinisterra", pos: "FW", rating: 84 },
            { name: "Ünal", pos: "FW", rating: 77 },
            { name: "Rayan", pos: "FW", rating: 77 },
            { name: "Christie", pos: "MF", rating: 82 },
            { name: "Scott", pos: "MF", rating: 82 },
            { name: "Tavernier", pos: "MF", rating: 82 },
            { name: "Adli", pos: "MF", rating: 82 },
            { name: "Adams", pos: "MF", rating: 76 },
            { name: "Brooks", pos: "MF", rating: 76 },
            { name: "Cook", pos: "MF", rating: 76 },
            { name: "Truffert", pos: "DF", rating: 76 },
            { name: "Jiménez", pos: "DF", rating: 76 },
            { name: "Soler", pos: "DF", rating: 60 },
            { name: "Diakité", pos: "DF", rating: 60 },
            { name: "Aarons", pos: "DF", rating: 60 },
        ],
        "braga": [
            { name: "Bruma", pos: "FW", rating: 84 },
            { name: "El Ouazzani", pos: "FW", rating: 84 },
            { name: "R. Horta", pos: "FW", rating: 84 },
            { name: "Fernandes", pos: "FW", rating: 97 },
            { name: "Garbari", pos: "FW", rating: 77 },
            { name: "Moutinho", pos: "MF", rating: 82 },
            { name: "Zalazar", pos: "MF", rating: 82 },
            { name: "Carvalho", pos: "MF", rating: 82 },
            { name: "Horta", pos: "MF", rating: 76 },
            { name: "Gorby", pos: "MF", rating: 76 },
            { name: "Niakaté", pos: "DF", rating: 76 },
            { name: "Bambu", pos: "DF", rating: 76 },
            { name: "Arrey-Mbi", pos: "DF", rating: 76 },
            { name: "Gómez", pos: "DF", rating: 60 },
            { name: "Ribeiro", pos: "DF", rating: 60 },
        ],
        "brest": [
            { name: "Del Castillo", pos: "FW", rating: 84 },
            { name: "Ajorque", pos: "FW", rating: 84 },
            { name: "Mounié", pos: "FW", rating: 84 },
            { name: "Le Douaron", pos: "FW", rating: 77 },
            { name: "Brahimi", pos: "FW", rating: 77 },
            { name: "Camara", pos: "MF", rating: 82 },
            { name: "Lees-Melou", pos: "MF", rating: 82 },
            { name: "Magnetti", pos: "MF", rating: 82 },
            { name: "Martin", pos: "MF", rating: 76 },
            { name: "Doumbia", pos: "MF", rating: 76 },
            { name: "Chardonnet", pos: "DF", rating: 76 },
            { name: "Brassier", pos: "DF", rating: 76 },
            { name: "Lala", pos: "DF", rating: 76 },
            { name: "Locko", pos: "DF", rating: 60 },
            { name: "Zogbé", pos: "DF", rating: 60 },
        ],
        "brighton": [
            { name: "Rutter", pos: "FW", rating: 84 },
            { name: "Welbeck", pos: "FW", rating: 84 },
            { name: "Tzimas", pos: "FW", rating: 84 },
            { name: "Kostoulas", pos: "FW", rating: 77 },
            { name: "Minteh", pos: "FW", rating: 77 },
            { name: "Mitoma", pos: "MF", rating: 82 },
            { name: "Baleba", pos: "MF", rating: 82 },
            { name: "O'Riley", pos: "MF", rating: 82 },
            { name: "Gruda", pos: "MF", rating: 82 },
            { name: "Gómez", pos: "MF", rating: 76 },
            { name: "Hinshelwood", pos: "MF", rating: 76 },
            { name: "Ayari", pos: "MF", rating: 76 },
            { name: "Milner", pos: "MF", rating: 76 },
            { name: "Dunk", pos: "DF", rating: 76 },
            { name: "van Hecke", pos: "DF", rating: 76 },
            { name: "De Cuyper", pos: "DF", rating: 76 },
            { name: "Kadıoğlu", pos: "DF", rating: 76 },
            { name: "Boscagli", pos: "DF", rating: 76 },
            { name: "Wieffer", pos: "DF", rating: 60 },
            { name: "Igor Julio", pos: "DF", rating: 60 },
            { name: "Webster", pos: "DF", rating: 60 },
            { name: "Costinha", pos: "DF", rating: 60 },
            { name: "Cashin", pos: "DF", rating: 60 },
        ],
        "brondby": [
            { name: "Omoijuanfo", pos: "FW", rating: 84 },
            { name: "Suzuki", pos: "FW", rating: 84 },
            { name: "Kvistgaarden", pos: "FW", rating: 84 },
            { name: "Schwartau", pos: "FW", rating: 77 },
            { name: "Vallys", pos: "FW", rating: 77 },
            { name: "Wass", pos: "MF", rating: 82 },
            { name: "Radosevic", pos: "MF", rating: 82 },
            { name: "Nartey", pos: "MF", rating: 76 },
            { name: "Greve", pos: "MF", rating: 76 },
            { name: "Rasmussen", pos: "DF", rating: 76 },
            { name: "Tshiembe", pos: "DF", rating: 76 },
            { name: "Lauritsen", pos: "DF", rating: 76 },
            { name: "Divkovic", pos: "DF", rating: 60 },
            { name: "Klaiber", pos: "DF", rating: 60 },
        ],
        "cfrcluj": [
            { name: "Bîrligea", pos: "FW", rating: 84 },
            { name: "Michael", pos: "FW", rating: 84 },
            { name: "Deac", pos: "FW", rating: 84 },
            { name: "Korenica", pos: "FW", rating: 77 },
            { name: "Postolachi", pos: "FW", rating: 77 },
            { name: "Tachtsidis", pos: "MF", rating: 82 },
            { name: "Muhar", pos: "MF", rating: 82 },
            { name: "Keita", pos: "MF", rating: 82 },
            { name: "Fică", pos: "MF", rating: 76 },
            { name: "Artean", pos: "MF", rating: 76 },
            { name: "Camora", pos: "DF", rating: 76 },
            { name: "Boben", pos: "DF", rating: 76 },
            { name: "Kresic", pos: "DF", rating: 76 },
            { name: "Mogoș", pos: "DF", rating: 60 },
            { name: "Ajeti", pos: "DF", rating: 60 },
        ],
        "celtic": [
            { name: "Furuhashi", pos: "FW", rating: 84 },
            { name: "Maeda", pos: "FW", rating: 84 },
            { name: "Kühn", pos: "FW", rating: 84 },
            { name: "Idah", pos: "FW", rating: 77 },
            { name: "Yang", pos: "FW", rating: 77 },
            { name: "McGregor", pos: "MF", rating: 82 },
            { name: "Hatate", pos: "MF", rating: 82 },
            { name: "Engels", pos: "MF", rating: 82 },
            { name: "Bernardo", pos: "MF", rating: 76 },
            { name: "Forrest", pos: "MF", rating: 76 },
            { name: "Carter-Vickers", pos: "DF", rating: 76 },
            { name: "Scales", pos: "DF", rating: 76 },
            { name: "Johnston", pos: "DF", rating: 76 },
            { name: "Taylor", pos: "DF", rating: 60 },
            { name: "Trusty", pos: "DF", rating: 60 },
            { name: "Ralston", pos: "DF", rating: 60 },
        ],
        "chelsea": [
            { name: "Palmer", pos: "FW", rating: 97 },
            { name: "João Pedro", pos: "FW", rating: 84 },
            { name: "Neto", pos: "FW", rating: 84 },
            { name: "Estêvão", pos: "FW", rating: 84 },
            { name: "Gittens", pos: "FW", rating: 77 },
            { name: "Guiu", pos: "FW", rating: 72 },
            { name: "Delap", pos: "FW", rating: 72 },
            { name: "Garnacho", pos: "FW", rating: 77 },
            { name: "Fernández", pos: "MF", rating: 82 },
            { name: "Caicedo", pos: "MF", rating: 82 },
            { name: "Lavia", pos: "MF", rating: 82 },
            { name: "Santos", pos: "MF", rating: 76 },
            { name: "Essugo", pos: "MF", rating: 76 },
            { name: "James", pos: "DF", rating: 76 },
            { name: "Colwill", pos: "DF", rating: 76 },
            { name: "Fofana", pos: "DF", rating: 76 },
            { name: "Cucurella", pos: "DF", rating: 76 },
            { name: "Hato", pos: "DF", rating: 76 },
            { name: "Gusto", pos: "DF", rating: 60 },
            { name: "Badiashile", pos: "DF", rating: 60 },
            { name: "Adarabioyo", pos: "DF", rating: 60 },
            { name: "Chalobah", pos: "DF", rating: 60 },
            { name: "Sarr", pos: "DF", rating: 60 },
        ],
        "clubbrugge": [
            { name: "Skov Olsen", pos: "FW", rating: 84 },
            { name: "Thiago", pos: "FW", rating: 84 },
            { name: "Nilsson", pos: "FW", rating: 84 },
            { name: "Jutglà", pos: "FW", rating: 77 },
            { name: "Talbi", pos: "FW", rating: 77 },
            { name: "Vanaken", pos: "MF", rating: 82 },
            { name: "Onyedika", pos: "MF", rating: 82 },
            { name: "Vetlesen", pos: "MF", rating: 76 },
            { name: "Nielsen", pos: "MF", rating: 76 },
            { name: "Mechele", pos: "DF", rating: 76 },
            { name: "Ordoñez", pos: "DF", rating: 76 },
            { name: "De Cuyper", pos: "DF", rating: 76 },
            { name: "Seys", pos: "DF", rating: 60 },
            { name: "Sabbe", pos: "DF", rating: 60 },
        ],
        "como": [
            { name: "Belotti", pos: "FW", rating: 84 },
            { name: "Cutrone", pos: "FW", rating: 84 },
            { name: "Strefezza", pos: "FW", rating: 84 },
            { name: "Cunha", pos: "FW", rating: 77 },
            { name: "Cerri", pos: "FW", rating: 77 },
            { name: "Paz", pos: "MF", rating: 82 },
            { name: "Perrone", pos: "MF", rating: 82 },
            { name: "Sergi Roberto", pos: "MF", rating: 82 },
            { name: "Engelhardt", pos: "MF", rating: 76 },
            { name: "Kone", pos: "MF", rating: 76 },
            { name: "Varane", pos: "DF", rating: 76 },
            { name: "Kempf", pos: "DF", rating: 76 },
            { name: "Moreno", pos: "DF", rating: 76 },
            { name: "Dossena", pos: "DF", rating: 60 },
            { name: "Iovine", pos: "DF", rating: 60 },
        ],
        "crvenazvedza": [
            { name: "Olayinka", pos: "FW", rating: 84 },
            { name: "Katai", pos: "FW", rating: 84 },
            { name: "Duarte", pos: "FW", rating: 84 },
            { name: "Ndiaye", pos: "FW", rating: 77 },
            { name: "Krunic", pos: "FW", rating: 77 },
            { name: "Arnautović", pos: "FW", rating: 77 },
            { name: "Ivanic", pos: "MF", rating: 82 },
            { name: "Hwang", pos: "MF", rating: 82 },
            { name: "Elšnik", pos: "MF", rating: 82 },
            { name: "Ilic", pos: "MF", rating: 76 },
            { name: "Kanga", pos: "MF", rating: 76 },
            { name: "Dragović", pos: "DF", rating: 76 },
            { name: "Spajić", pos: "DF", rating: 76 },
            { name: "Seol", pos: "DF", rating: 76 },
            { name: "Rodić", pos: "DF", rating: 60 },
            { name: "Mimović", pos: "DF", rating: 60 },
        ],
        "derrycity": [
            { name: "Mullen", pos: "FW", rating: 84 },
            { name: "Hoban", pos: "FW", rating: 84 },
            { name: "Duffy", pos: "FW", rating: 77 },
            { name: "Diallo", pos: "FW", rating: 77 },
            { name: "McEleney", pos: "MF", rating: 82 },
            { name: "O'Reilly", pos: "MF", rating: 82 },
            { name: "Patching", pos: "MF", rating: 76 },
            { name: "Doherty", pos: "MF", rating: 76 },
            { name: "Boyce", pos: "DF", rating: 76 },
            { name: "McJannet", pos: "DF", rating: 76 },
            { name: "Coll", pos: "DF", rating: 76 },
            { name: "Dummigan", pos: "DF", rating: 60 },
            { name: "Kelly", pos: "DF", rating: 60 },
        ],
        "dinamozagreb": [
            { name: "Petković", pos: "FW", rating: 84 },
            { name: "Baturina", pos: "FW", rating: 84 },
            { name: "Hoxha", pos: "FW", rating: 84 },
            { name: "Kulenović", pos: "FW", rating: 77 },
            { name: "Stojković", pos: "FW", rating: 77 },
            { name: "Mišić", pos: "MF", rating: 82 },
            { name: "Sučić", pos: "MF", rating: 82 },
            { name: "Ademi", pos: "MF", rating: 76 },
            { name: "Kacavenda", pos: "MF", rating: 76 },
            { name: "Theophile-Catherine", pos: "DF", rating: 76 },
            { name: "Bernauer", pos: "DF", rating: 76 },
            { name: "Mmaee", pos: "DF", rating: 76 },
            { name: "Pierre-Gabriel", pos: "DF", rating: 60 },
            { name: "Ristovski", pos: "DF", rating: 60 },
        ],
        "dynamokyiv": [
            { name: "Vanat", pos: "FW", rating: 84 },
            { name: "Yarmolenko", pos: "FW", rating: 84 },
            { name: "Voloshyn", pos: "FW", rating: 77 },
            { name: "Kabaev", pos: "FW", rating: 77 },
            { name: "Shaparenko", pos: "MF", rating: 82 },
            { name: "Brazhko", pos: "MF", rating: 82 },
            { name: "Buyalskyi", pos: "MF", rating: 76 },
            { name: "Pikhalyonok", pos: "MF", rating: 76 },
            { name: "Popov", pos: "DF", rating: 76 },
            { name: "Mykhavko", pos: "DF", rating: 76 },
            { name: "Tymchyk", pos: "DF", rating: 76 },
            { name: "Dubinchak", pos: "DF", rating: 60 },
            { name: "Karavayev", pos: "DF", rating: 60 },
        ],
        "eintrachtfrankfurt": [
            { name: "Matanovic", pos: "FW", rating: 84 },
            { name: "Chaïbi", pos: "FW", rating: 77 },
            { name: "Knauff", pos: "FW", rating: 77 },
            { name: "Skhiri", pos: "MF", rating: 82 },
            { name: "Götze", pos: "MF", rating: 82 },
            { name: "Larsson", pos: "MF", rating: 76 },
            { name: "Dina Ebimbe", pos: "MF", rating: 76 },
            { name: "Koch", pos: "DF", rating: 76 },
            { name: "Pacho", pos: "DF", rating: 76 },
            { name: "Tuta", pos: "DF", rating: 76 },
            { name: "Theate", pos: "DF", rating: 60 },
            { name: "Kristensen", pos: "DF", rating: 60 },
        ],
        "elfsborg": [
            { name: "Baidoo", pos: "FW", rating: 84 },
            { name: "Frick", pos: "FW", rating: 84 },
            { name: "Abdullai", pos: "FW", rating: 77 },
            { name: "Jebara", pos: "FW", rating: 77 },
            { name: "Ouma", pos: "MF", rating: 82 },
            { name: "Zeneli", pos: "MF", rating: 82 },
            { name: "B. Zeneli", pos: "MF", rating: 82 },
            { name: "Holmén", pos: "MF", rating: 76 },
            { name: "Baldursson", pos: "MF", rating: 76 },
            { name: "Holmén", pos: "DF", rating: 76 },
            { name: "Henriksson", pos: "DF", rating: 76 },
            { name: "Hult", pos: "DF", rating: 76 },
            { name: "Yegbe", pos: "DF", rating: 60 },
            { name: "Bukhari", pos: "DF", rating: 60 },
        ],
        "fccopenhagen": [
            { name: "Cornelius", pos: "FW", rating: 84 },
            { name: "Achouri", pos: "FW", rating: 84 },
            { name: "Elyounoussi", pos: "FW", rating: 84 },
            { name: "Larsson", pos: "FW", rating: 77 },
            { name: "Robert", pos: "FW", rating: 77 },
            { name: "Falk", pos: "MF", rating: 82 },
            { name: "Lerager", pos: "MF", rating: 82 },
            { name: "Clem", pos: "MF", rating: 76 },
            { name: "Claesson", pos: "MF", rating: 76 },
            { name: "Vavro", pos: "DF", rating: 76 },
            { name: "Diks", pos: "DF", rating: 76 },
            { name: "Meling", pos: "DF", rating: 76 },
            { name: "Gabriel", pos: "DF", rating: 99 },
            { name: "Lund", pos: "DF", rating: 60 },
        ],
        "fczurich": [
            { name: "Perea", pos: "FW", rating: 84 },
            { name: "Krasniqi", pos: "FW", rating: 84 },
            { name: "Oko-Flex", pos: "FW", rating: 84 },
            { name: "Afriyie", pos: "FW", rating: 77 },
            { name: "Marchesano", pos: "FW", rating: 77 },
            { name: "Mathew", pos: "MF", rating: 82 },
            { name: "Conde", pos: "MF", rating: 82 },
            { name: "Chouiar", pos: "MF", rating: 76 },
            { name: "Boranijašević", pos: "MF", rating: 76 },
            { name: "Kamberi", pos: "DF", rating: 76 },
            { name: "Gómez", pos: "DF", rating: 76 },
            { name: "Katic", pos: "DF", rating: 76 },
            { name: "Wallner", pos: "DF", rating: 60 },
            { name: "Hodza", pos: "DF", rating: 60 },
        ],
        "fenerbahce": [
            { name: "Džeko", pos: "FW", rating: 84 },
            { name: "Saint-Maximin", pos: "FW", rating: 84 },
            { name: "Muriqi", pos: "FW", rating: 84 },
            { name: "Aktürkoğlu", pos: "FW", rating: 84 },
            { name: "Kahveci", pos: "FW", rating: 77 },
            { name: "Szymański", pos: "FW", rating: 77 },
            { name: "Fred", pos: "MF", rating: 82 },
            { name: "Amrabat", pos: "MF", rating: 82 },
            { name: "Yüksek", pos: "MF", rating: 76 },
            { name: "Müftüoğlu", pos: "MF", rating: 76 },
            { name: "Söyüncü", pos: "DF", rating: 76 },
            { name: "Djiku", pos: "DF", rating: 76 },
            { name: "Müldür", pos: "DF", rating: 76 },
            { name: "Oosterwolde", pos: "DF", rating: 60 },
            { name: "Osayi-Samuel", pos: "DF", rating: 60 },
            { name: "Skriniar", pos: "DF", rating: 60 },
        ],
        "ferencvaros": [
            { name: "Varga", pos: "FW", rating: 84 },
            { name: "Traoré", pos: "FW", rating: 84 },
            { name: "Saldanha", pos: "FW", rating: 84 },
            { name: "Pesic", pos: "FW", rating: 77 },
            { name: "Zachariassen", pos: "FW", rating: 77 },
            { name: "Abu Fani", pos: "MF", rating: 82 },
            { name: "Maïga", pos: "MF", rating: 82 },
            { name: "Rommens", pos: "MF", rating: 76 },
            { name: "Ben Romdhane", pos: "MF", rating: 76 },
            { name: "Cissé", pos: "DF", rating: 76 },
            { name: "Gustavo", pos: "DF", rating: 76 },
            { name: "Ramírez", pos: "DF", rating: 76 },
            { name: "Botka", pos: "DF", rating: 60 },
            { name: "Makreckis", pos: "DF", rating: 60 },
        ],
        "feyenoord": [
            { name: "Paixão", pos: "FW", rating: 84 },
            { name: "Stengs", pos: "FW", rating: 84 },
            { name: "Ueda", pos: "FW", rating: 84 },
            { name: "Ivanušec", pos: "FW", rating: 77 },
            { name: "Osman", pos: "FW", rating: 77 },
            { name: "Carranza", pos: "FW", rating: 77 },
            { name: "Q. Timber", pos: "MF", rating: 82 },
            { name: "In-beom", pos: "MF", rating: 82 },
            { name: "Zerrouki", pos: "MF", rating: 76 },
            { name: "Milambo", pos: "MF", rating: 76 },
            { name: "Hancko", pos: "DF", rating: 76 },
            { name: "Beelen", pos: "DF", rating: 76 },
            { name: "Geertruida", pos: "DF", rating: 76 },
            { name: "Smál", pos: "DF", rating: 60 },
            { name: "Bueno", pos: "DF", rating: 60 },
        ],
        "fiorentina": [
            { name: "Kean", pos: "FW", rating: 84 },
            { name: "Gudmundsson", pos: "FW", rating: 84 },
            { name: "Sottil", pos: "FW", rating: 84 },
            { name: "Kouamé", pos: "FW", rating: 77 },
            { name: "Beltrán", pos: "FW", rating: 77 },
            { name: "Bove", pos: "MF", rating: 82 },
            { name: "Cataldi", pos: "MF", rating: 82 },
            { name: "Mandragora", pos: "MF", rating: 82 },
            { name: "Adli", pos: "MF", rating: 76 },
            { name: "Richardson", pos: "MF", rating: 76 },
            { name: "Quarta", pos: "DF", rating: 76 },
            { name: "Ranieri", pos: "DF", rating: 76 },
            { name: "Dodô", pos: "DF", rating: 76 },
            { name: "Gosens", pos: "DF", rating: 60 },
            { name: "Pongračić", pos: "DF", rating: 60 },
        ],
        "freiburg": [
            { name: "Doan", pos: "FW", rating: 84 },
            { name: "Grifo", pos: "FW", rating: 84 },
            { name: "Gregoritsch", pos: "FW", rating: 84 },
            { name: "Dinkçi", pos: "FW", rating: 77 },
            { name: "Höler", pos: "FW", rating: 77 },
            { name: "Eggestein", pos: "MF", rating: 82 },
            { name: "Höfler", pos: "MF", rating: 82 },
            { name: "Röhl", pos: "MF", rating: 76 },
            { name: "Osterhage", pos: "MF", rating: 76 },
            { name: "Ginter", pos: "DF", rating: 76 },
            { name: "Lienhart", pos: "DF", rating: 76 },
            { name: "Günter", pos: "DF", rating: 76 },
            { name: "Kübler", pos: "DF", rating: 60 },
            { name: "Sildillia", pos: "DF", rating: 60 },
        ],
        "galatasaray": [
            { name: "Sané", pos: "FW", rating: 84 },
            { name: "Osimhen", pos: "FW", rating: 97 },
            { name: "Icardi", pos: "FW", rating: 84 },
            { name: "Mertens", pos: "FW", rating: 84 },
            { name: "Barış Alper", pos: "FW", rating: 77 },
            { name: "Batshuayi", pos: "FW", rating: 77 },
            { name: "Akgün", pos: "FW", rating: 77 },
            { name: "Torreira", pos: "MF", rating: 82 },
            { name: "Gabriel Sara", pos: "MF", rating: 82 },
            { name: "Demirbay", pos: "MF", rating: 76 },
            { name: "Kutlu", pos: "MF", rating: 76 },
            { name: "Bardakcı", pos: "DF", rating: 76 },
            { name: "Nelsson", pos: "DF", rating: 76 },
            { name: "Sánchez", pos: "DF", rating: 76 },
            { name: "Jakobs", pos: "DF", rating: 60 },
            { name: "Ayhan", pos: "DF", rating: 60 },
        ],
        "genk": [
            { name: "Tolu", pos: "FW", rating: 84 },
            { name: "Sor", pos: "FW", rating: 84 },
            { name: "Steuckers", pos: "FW", rating: 84 },
            { name: "Karetsas", pos: "FW", rating: 77 },
            { name: "Zeqiri", pos: "FW", rating: 77 },
            { name: "Heynen", pos: "MF", rating: 82 },
            { name: "Hrošovský", pos: "MF", rating: 82 },
            { name: "El Khannouss", pos: "MF", rating: 76 },
            { name: "Banga", pos: "MF", rating: 76 },
            { name: "Cuesta", pos: "DF", rating: 76 },
            { name: "Smets", pos: "DF", rating: 76 },
            { name: "Kayembe", pos: "DF", rating: 76 },
            { name: "Fadera", pos: "DF", rating: 60 },
            { name: "El Ouahdi", pos: "DF", rating: 60 },
        ],
        "hajduksplit": [
            { name: "Livaja", pos: "FW", rating: 84 },
            { name: "Sahiti", pos: "FW", rating: 84 },
            { name: "Kalinić", pos: "FW", rating: 84 },
            { name: "Dajaku", pos: "FW", rating: 77 },
            { name: "Bamba", pos: "FW", rating: 77 },
            { name: "Rakitić", pos: "MF", rating: 82 },
            { name: "Krovinović", pos: "MF", rating: 82 },
            { name: "Pukštas", pos: "MF", rating: 76 },
            { name: "Sigur", pos: "MF", rating: 76 },
            { name: "Šarlija", pos: "DF", rating: 76 },
            { name: "Uremović", pos: "DF", rating: 76 },
            { name: "Melnjak", pos: "DF", rating: 76 },
            { name: "Diallo", pos: "DF", rating: 60 },
            { name: "Elez", pos: "DF", rating: 60 },
        ],
        "hamburgsv": [
            { name: "Glatzel", pos: "FW", rating: 84 },
            { name: "Königsdörffer", pos: "FW", rating: 84 },
            { name: "Dompé", pos: "FW", rating: 84 },
            { name: "Jatta", pos: "FW", rating: 77 },
            { name: "Németh", pos: "FW", rating: 77 },
            { name: "Reis", pos: "MF", rating: 82 },
            { name: "Poreba", pos: "MF", rating: 82 },
            { name: "Elfadli", pos: "MF", rating: 82 },
            { name: "Carvalho", pos: "MF", rating: 76 },
            { name: "Richter", pos: "MF", rating: 76 },
            { name: "Schonlau", pos: "DF", rating: 76 },
            { name: "Hadžikadunić", pos: "DF", rating: 76 },
            { name: "Muheim", pos: "DF", rating: 76 },
            { name: "Van der Brempt", pos: "DF", rating: 60 },
            { name: "Hefti", pos: "DF", rating: 60 },
        ],
        "hearts": [
            { name: "Shankland", pos: "FW", rating: 84 },
            { name: "Vargas", pos: "FW", rating: 84 },
            { name: "Oda", pos: "FW", rating: 84 },
            { name: "Boyce", pos: "FW", rating: 77 },
            { name: "Dhanda", pos: "FW", rating: 77 },
            { name: "Baningime", pos: "MF", rating: 82 },
            { name: "Spittal", pos: "MF", rating: 82 },
            { name: "Devlin", pos: "MF", rating: 82 },
            { name: "Boateng", pos: "MF", rating: 76 },
            { name: "Grant", pos: "MF", rating: 76 },
            { name: "Kingsley", pos: "DF", rating: 76 },
            { name: "Halkett", pos: "DF", rating: 76 },
            { name: "Kent", pos: "DF", rating: 76 },
            { name: "Rowles", pos: "DF", rating: 60 },
            { name: "Penrice", pos: "DF", rating: 60 },
            { name: "Oyegoke", pos: "DF", rating: 60 },
        ],
        "hoffenheim": [
            { name: "Kramarić", pos: "FW", rating: 84 },
            { name: "Bülter", pos: "FW", rating: 84 },
            { name: "Hložek", pos: "FW", rating: 84 },
            { name: "Berisha", pos: "FW", rating: 77 },
            { name: "Tabaković", pos: "FW", rating: 77 },
            { name: "Stach", pos: "MF", rating: 82 },
            { name: "Grillitsch", pos: "MF", rating: 82 },
            { name: "Prömel", pos: "MF", rating: 82 },
            { name: "Geiger", pos: "MF", rating: 76 },
            { name: "Tohumcu", pos: "MF", rating: 76 },
            { name: "Kadeřábek", pos: "DF", rating: 76 },
            { name: "Akpoguma", pos: "DF", rating: 76 },
            { name: "Nsoki", pos: "DF", rating: 76 },
            { name: "Drechsler", pos: "DF", rating: 60 },
            { name: "Jurásek", pos: "DF", rating: 60 },
            { name: "Gendrey", pos: "DF", rating: 60 },
        ],
        "intermilan": [
            { name: "Martínez", pos: "FW", rating: 84 },
            { name: "Thuram", pos: "FW", rating: 84 },
            { name: "Correa", pos: "FW", rating: 77 },
            { name: "Barella", pos: "MF", rating: 82 },
            { name: "Çalhanoğlu", pos: "MF", rating: 82 },
            { name: "Mkhitaryan", pos: "MF", rating: 82 },
            { name: "Frattesi", pos: "MF", rating: 76 },
            { name: "Zieliński", pos: "MF", rating: 76 },
            { name: "Asllani", pos: "MF", rating: 76 },
            { name: "Bastoni", pos: "DF", rating: 76 },
            { name: "Pavard", pos: "DF", rating: 76 },
            { name: "Dimarco", pos: "DF", rating: 76 },
            { name: "Acerbi", pos: "DF", rating: 76 },
            { name: "Darmian", pos: "DF", rating: 60 },
            { name: "Bisseck", pos: "DF", rating: 60 },
            { name: "De Vrij", pos: "DF", rating: 60 },
        ],
        "istanbulbasaksehir": [
            { name: "Piątek", pos: "FW", rating: 84 },
            { name: "Figueiredo", pos: "FW", rating: 84 },
            { name: "Gürler", pos: "FW", rating: 84 },
            { name: "Keny", pos: "FW", rating: 77 },
            { name: "Pelkas", pos: "FW", rating: 77 },
            { name: "Özcan", pos: "MF", rating: 82 },
            { name: "İlkhan", pos: "MF", rating: 82 },
            { name: "Ergün", pos: "MF", rating: 82 },
            { name: "Kemen", pos: "MF", rating: 76 },
            { name: "Türüç", pos: "MF", rating: 76 },
            { name: "Duarte", pos: "DF", rating: 76 },
            { name: "Opoku", pos: "DF", rating: 76 },
            { name: "Lima", pos: "DF", rating: 76 },
            { name: "Ba", pos: "DF", rating: 60 },
            { name: "Şahiner", pos: "DF", rating: 60 },
        ],
        "juventus": [
            { name: "Vlahović", pos: "FW", rating: 84 },
            { name: "Yıldız", pos: "FW", rating: 84 },
            { name: "Conceição", pos: "FW", rating: 84 },
            { name: "Milik", pos: "FW", rating: 77 },
            { name: "Weah", pos: "FW", rating: 77 },
            { name: "González", pos: "FW", rating: 77 },
            { name: "Koopmeiners", pos: "MF", rating: 82 },
            { name: "Luiz", pos: "MF", rating: 82 },
            { name: "Thuram", pos: "MF", rating: 82 },
            { name: "Locatelli", pos: "MF", rating: 76 },
            { name: "McKennie", pos: "MF", rating: 76 },
            { name: "Fagioli", pos: "MF", rating: 76 },
            { name: "Bremer", pos: "DF", rating: 76 },
            { name: "Cambiaso", pos: "DF", rating: 76 },
            { name: "Kalulu", pos: "DF", rating: 76 },
            { name: "Gatti", pos: "DF", rating: 76 },
            { name: "Danilo", pos: "DF", rating: 60 },
            { name: "Cabal", pos: "DF", rating: 60 },
            { name: "Savona", pos: "DF", rating: 60 },
        ],
        "lask": [
            { name: "Ljubičić", pos: "FW", rating: 84 },
            { name: "Usor", pos: "FW", rating: 84 },
            { name: "Mustapha", pos: "FW", rating: 84 },
            { name: "Pintor", pos: "FW", rating: 77 },
            { name: "Kone", pos: "FW", rating: 77 },
            { name: "Zulj", pos: "MF", rating: 82 },
            { name: "Horvath", pos: "MF", rating: 82 },
            { name: "Beriša", pos: "MF", rating: 82 },
            { name: "Bogarde", pos: "MF", rating: 76 },
            { name: "Jovičić", pos: "MF", rating: 76 },
            { name: "Andrade", pos: "DF", rating: 76 },
            { name: "Ziereis", pos: "DF", rating: 76 },
            { name: "Stojković", pos: "DF", rating: 76 },
            { name: "Bello", pos: "DF", rating: 60 },
            { name: "Talovierov", pos: "DF", rating: 60 },
        ],
        "lazio": [
            { name: "Castellanos", pos: "FW", rating: 84 },
            { name: "Zaccagni", pos: "FW", rating: 84 },
            { name: "Dia", pos: "FW", rating: 84 },
            { name: "Noslin", pos: "FW", rating: 77 },
            { name: "Isaksen", pos: "FW", rating: 77 },
            { name: "Pedro", pos: "FW", rating: 99 },
            { name: "Guendouzi", pos: "MF", rating: 82 },
            { name: "Rovella", pos: "MF", rating: 82 },
            { name: "Vecino", pos: "MF", rating: 82 },
            { name: "Dele-Bashiru", pos: "MF", rating: 76 },
            { name: "Castrovilli", pos: "MF", rating: 76 },
            { name: "Romagnoli", pos: "DF", rating: 76 },
            { name: "Gila", pos: "DF", rating: 76 },
            { name: "Tavares", pos: "DF", rating: 76 },
            { name: "Lazzari", pos: "DF", rating: 76 },
            { name: "Patric", pos: "DF", rating: 60 },
            { name: "Pellegrini", pos: "DF", rating: 60 },
            { name: "Marušić", pos: "DF", rating: 60 },
        ],
        "lechpoznan": [
            { name: "Ishak", pos: "FW", rating: 84 },
            { name: "Szymczak", pos: "FW", rating: 84 },
            { name: "Hotić", pos: "FW", rating: 84 },
            { name: "Fiabema", pos: "FW", rating: 77 },
            { name: "Gholizadeh", pos: "FW", rating: 77 },
            { name: "Murawski", pos: "MF", rating: 82 },
            { name: "Sousa", pos: "MF", rating: 82 },
            { name: "Kozubal", pos: "MF", rating: 82 },
            { name: "Ba Loua", pos: "MF", rating: 76 },
            { name: "Jagiełło", pos: "MF", rating: 76 },
            { name: "Milić", pos: "DF", rating: 76 },
            { name: "Salamon", pos: "DF", rating: 76 },
            { name: "Pereira", pos: "DF", rating: 76 },
            { name: "Douglas", pos: "DF", rating: 60 },
            { name: "Gurgul", pos: "DF", rating: 60 },
        ],
        "legiawarsaw": [
            { name: "Pekhart", pos: "FW", rating: 84 },
            { name: "Gual", pos: "FW", rating: 84 },
            { name: "Kramer", pos: "FW", rating: 84 },
            { name: "Morishita", pos: "FW", rating: 77 },
            { name: "Alfarela", pos: "FW", rating: 77 },
            { name: "Josué", pos: "MF", rating: 82 },
            { name: "Kapustka", pos: "MF", rating: 82 },
            { name: "Luquinhas", pos: "MF", rating: 82 },
            { name: "Celhaka", pos: "MF", rating: 76 },
            { name: "Elitim", pos: "MF", rating: 76 },
            { name: "Augustyniak", pos: "DF", rating: 76 },
            { name: "Pankov", pos: "DF", rating: 76 },
            { name: "Ziółkowski", pos: "DF", rating: 76 },
            { name: "Wszołek", pos: "DF", rating: 60 },
            { name: "Vinagre", pos: "DF", rating: 60 },
        ],
        "lens": [
            { name: "Sotoca", pos: "FW", rating: 84 },
            { name: "Nzola", pos: "FW", rating: 84 },
            { name: "Saïd", pos: "FW", rating: 84 },
            { name: "Satriano", pos: "FW", rating: 77 },
            { name: "Ojediran", pos: "FW", rating: 77 },
            { name: "Thomasson", pos: "MF", rating: 82 },
            { name: "Diouf", pos: "MF", rating: 82 },
            { name: "Frankowski", pos: "MF", rating: 82 },
            { name: "Machado", pos: "MF", rating: 76 },
            { name: "Fulgini", pos: "MF", rating: 76 },
            { name: "Mendy", pos: "MF", rating: 76 },
            { name: "Medina", pos: "DF", rating: 76 },
            { name: "Gradit", pos: "DF", rating: 76 },
            { name: "Khusanov", pos: "DF", rating: 60 },
            { name: "Chávez", pos: "DF", rating: 60 },
            { name: "Aguilar", pos: "DF", rating: 60 },
        ],
        "lille": [
            { name: "David", pos: "FW", rating: 84 },
            { name: "Zhegrova", pos: "FW", rating: 84 },
            { name: "Bayo", pos: "FW", rating: 84 },
            { name: "Sahraoui", pos: "FW", rating: 77 },
            { name: "Cabella", pos: "FW", rating: 77 },
            { name: "Fernández-Pardo", pos: "FW", rating: 77 },
            { name: "Gomes", pos: "MF", rating: 82 },
            { name: "André", pos: "MF", rating: 82 },
            { name: "Mukau", pos: "MF", rating: 82 },
            { name: "Bouaddi", pos: "MF", rating: 76 },
            { name: "E. Mbappé", pos: "MF", rating: 76 },
            { name: "Diakité", pos: "DF", rating: 76 },
            { name: "Gudmundsson", pos: "DF", rating: 76 },
            { name: "Meunier", pos: "DF", rating: 76 },
            { name: "Mandi", pos: "DF", rating: 60 },
            { name: "Ismaily", pos: "DF", rating: 60 },
            { name: "Touré", pos: "DF", rating: 60 },
        ],
        "liverpool": [
            { name: "Salah", pos: "FW", rating: 84 },
            { name: "Isak", pos: "FW", rating: 84 },
            { name: "Ekitike", pos: "FW", rating: 84 },
            { name: "Gakpo", pos: "FW", rating: 77 },
            { name: "Chiesa", pos: "FW", rating: 77 },
            { name: "Mac Allister", pos: "MF", rating: 82 },
            { name: "Gravenberch", pos: "MF", rating: 82 },
            { name: "Szoboszlai", pos: "MF", rating: 82 },
            { name: "Jones", pos: "MF", rating: 76 },
            { name: "Elliott", pos: "MF", rating: 76 },
            { name: "Van Dijk", pos: "DF", rating: 76 },
            { name: "Bradley", pos: "DF", rating: 60 },
            { name: "Tsimikas", pos: "DF", rating: 60 },
            { name: "Frimpong", pos: "DF", rating: 60 },
            { name: "Kerkez", pos: "DF", rating: 60 },
        ],
        "ludogorets": [
            { name: "Cruz", pos: "FW", rating: 84 },
            { name: "Duah", pos: "FW", rating: 84 },
            { name: "Rick", pos: "FW", rating: 84 },
            { name: "Delev", pos: "FW", rating: 77 },
            { name: "Tissera", pos: "FW", rating: 77 },
            { name: "Piotrowski", pos: "MF", rating: 82 },
            { name: "Nedelev", pos: "MF", rating: 82 },
            { name: "Naressi", pos: "MF", rating: 82 },
            { name: "Yordanov", pos: "MF", rating: 76 },
            { name: "Duarte", pos: "MF", rating: 76 },
            { name: "Verdon", pos: "DF", rating: 76 },
            { name: "Almeida", pos: "DF", rating: 76 },
            { name: "Witry", pos: "DF", rating: 76 },
            { name: "Nedyalkov", pos: "DF", rating: 60 },
            { name: "Son", pos: "DF", rating: 60 },
        ],
        "lyon": [
            { name: "Lacazette", pos: "FW", rating: 84 },
            { name: "Mikautadze", pos: "FW", rating: 84 },
            { name: "Orban", pos: "FW", rating: 84 },
            { name: "Fofana", pos: "FW", rating: 77 },
            { name: "Benrahma", pos: "FW", rating: 77 },
            { name: "Nuamah", pos: "FW", rating: 77 },
            { name: "Matić", pos: "MF", rating: 82 },
            { name: "Tolisso", pos: "MF", rating: 82 },
            { name: "Caqueret", pos: "MF", rating: 82 },
            { name: "Cherki", pos: "MF", rating: 76 },
            { name: "Tessmann", pos: "MF", rating: 76 },
            { name: "Ćaleta-Car", pos: "DF", rating: 76 },
            { name: "Niakhaté", pos: "DF", rating: 76 },
            { name: "Mata", pos: "DF", rating: 76 },
            { name: "Tagliafico", pos: "DF", rating: 60 },
            { name: "Maitland-Niles", pos: "DF", rating: 60 },
            { name: "Abner", pos: "DF", rating: 60 },
        ],
        "malmoff": [
            { name: "Kiese Thelin", pos: "FW", rating: 84 },
            { name: "Botheim", pos: "FW", rating: 84 },
            { name: "Ali", pos: "FW", rating: 84 },
            { name: "Bolin", pos: "FW", rating: 77 },
            { name: "Rieks", pos: "FW", rating: 77 },
            { name: "Pena", pos: "MF", rating: 82 },
            { name: "Berg", pos: "MF", rating: 82 },
            { name: "Jørgensen", pos: "MF", rating: 82 },
            { name: "Rosengren", pos: "MF", rating: 76 },
            { name: "Johnsen", pos: "MF", rating: 76 },
            { name: "Jansson", pos: "DF", rating: 76 },
            { name: "Zätterström", pos: "DF", rating: 76 },
            { name: "Stryger Larsen", pos: "DF", rating: 76 },
            { name: "Busanello", pos: "DF", rating: 60 },
            { name: "Moisander", pos: "DF", rating: 60 },
        ],
        "manchestercity": [
            { name: "Haaland", pos: "FW", rating: 99 },
            { name: "Doku", pos: "FW", rating: 84 },
            { name: "Semenyo", pos: "FW", rating: 84 },
            { name: "Marmoush", pos: "FW", rating: 84 },
            { name: "Savinho", pos: "FW", rating: 77 },
            { name: "Bobb", pos: "FW", rating: 72 },
            { name: "Foden", pos: "FW", rating: 77 },
            { name: "Rodri", pos: "MF", rating: 82 },
            { name: "De Bruyne", pos: "MF", rating: 82 },
            { name: "Gündoğan", pos: "MF", rating: 82 },
            { name: "Kovačić", pos: "MF", rating: 76 },
            { name: "Nunes", pos: "MF", rating: 76 },
            { name: "McAtee", pos: "MF", rating: 72 },
            { name: "Dias", pos: "DF", rating: 76 },
            { name: "Gvardiol", pos: "DF", rating: 76 },
            { name: "Akanji", pos: "DF", rating: 76 },
            { name: "Stones", pos: "DF", rating: 76 },
            { name: "O'Reilly", pos: "DF", rating: 76 },
            { name: "Walker", pos: "DF", rating: 60 },
            { name: "Aké", pos: "DF", rating: 60 },
            { name: "Lewis", pos: "DF", rating: 60 },
        ],
        "manchesterunited": [
            { name: "Šeško", pos: "FW", rating: 84 },
            { name: "Zirkzee", pos: "FW", rating: 77 },
            { name: "Amad", pos: "FW", rating: 77 },
            { name: "Fernandes", pos: "MF", rating: 97 },
            { name: "Mainoo", pos: "MF", rating: 82 },
            { name: "Casemiro", pos: "MF", rating: 82 },
            { name: "Ugarte", pos: "MF", rating: 76 },
            { name: "Mount", pos: "MF", rating: 76 },
            { name: "Martínez", pos: "DF", rating: 76 },
            { name: "Dalot", pos: "DF", rating: 76 },
            { name: "Maguire", pos: "DF", rating: 76 },
            { name: "Shaw", pos: "DF", rating: 76 },
            { name: "Yoro", pos: "DF", rating: 60 },
            { name: "De Ligt", pos: "DF", rating: 60 },
            { name: "Mazraoui", pos: "DF", rating: 60 },
        ],
        "maribor": [
            { name: "Jakupović", pos: "FW", rating: 84 },
            { name: "Barišić", pos: "FW", rating: 84 },
            { name: "Beugre", pos: "FW", rating: 84 },
            { name: "Bourlès", pos: "FW", rating: 77 },
            { name: "Kolar", pos: "FW", rating: 77 },
            { name: "Iličić", pos: "MF", rating: 82 },
            { name: "Repas", pos: "MF", rating: 82 },
            { name: "Božić", pos: "MF", rating: 82 },
            { name: "Vrhovec", pos: "MF", rating: 76 },
            { name: "Dizdarević", pos: "MF", rating: 76 },
            { name: "Širvys", pos: "DF", rating: 76 },
            { name: "Vidmar", pos: "DF", rating: 76 },
            { name: "Karić", pos: "DF", rating: 76 },
            { name: "Barišić", pos: "DF", rating: 60 },
            { name: "Milec", pos: "DF", rating: 60 },
        ],
        "marseille": [
            { name: "Greenwood", pos: "FW", rating: 84 },
            { name: "Wahi", pos: "FW", rating: 84 },
            { name: "Rowe", pos: "FW", rating: 84 },
            { name: "Henrique", pos: "FW", rating: 77 },
            { name: "Moumbagna", pos: "FW", rating: 77 },
            { name: "Rabiot", pos: "MF", rating: 82 },
            { name: "Højbjerg", pos: "MF", rating: 82 },
            { name: "Harit", pos: "MF", rating: 82 },
            { name: "Kondogbia", pos: "MF", rating: 76 },
            { name: "Koné", pos: "MF", rating: 76 },
            { name: "Carboni", pos: "MF", rating: 76 },
            { name: "Balerdi", pos: "DF", rating: 76 },
            { name: "Murillo", pos: "DF", rating: 76 },
            { name: "Cornelius", pos: "DF", rating: 76 },
            { name: "Merlin", pos: "DF", rating: 60 },
            { name: "Brassier", pos: "DF", rating: 60 },
            { name: "Meïté", pos: "DF", rating: 60 },
        ],
        "midtjylland": [
            { name: "Franculino", pos: "FW", rating: 84 },
            { name: "Buksza", pos: "FW", rating: 84 },
            { name: "Osorio", pos: "FW", rating: 84 },
            { name: "Chilufya", pos: "FW", rating: 77 },
            { name: "Gogza", pos: "FW", rating: 77 },
            { name: "Simsir", pos: "MF", rating: 82 },
            { name: "Martínez", pos: "MF", rating: 82 },
            { name: "Castillo", pos: "MF", rating: 82 },
            { name: "Sørensen", pos: "MF", rating: 76 },
            { name: "Byskov", pos: "MF", rating: 76 },
            { name: "Diao", pos: "DF", rating: 76 },
            { name: "Bech", pos: "DF", rating: 76 },
            { name: "Gomes", pos: "DF", rating: 76 },
            { name: "Lee", pos: "DF", rating: 60 },
            { name: "Bak", pos: "DF", rating: 60 },
        ],
        "monaco": [
            { name: "Embolo", pos: "FW", rating: 84 },
            { name: "Balogun", pos: "FW", rating: 84 },
            { name: "Ilenikhena", pos: "FW", rating: 84 },
            { name: "Minamino", pos: "FW", rating: 77 },
            { name: "Akliouche", pos: "FW", rating: 77 },
            { name: "Zakaria", pos: "MF", rating: 82 },
            { name: "Golovin", pos: "MF", rating: 82 },
            { name: "Camara", pos: "MF", rating: 82 },
            { name: "Ben Seghir", pos: "MF", rating: 76 },
            { name: "Matazo", pos: "MF", rating: 76 },
            { name: "Salisu", pos: "DF", rating: 76 },
            { name: "Kehrer", pos: "DF", rating: 76 },
            { name: "Vanderson", pos: "DF", rating: 76 },
            { name: "Singo", pos: "DF", rating: 60 },
            { name: "Caio Henrique", pos: "DF", rating: 60 },
            { name: "Mawissa", pos: "DF", rating: 60 },
        ],
        "napoli": [
            { name: "Lukaku", pos: "FW", rating: 84 },
            { name: "Neres", pos: "FW", rating: 84 },
            { name: "Højlund", pos: "FW", rating: 84 },
            { name: "Politano", pos: "FW", rating: 77 },
            { name: "Simeone", pos: "FW", rating: 77 },
            { name: "Raspadori", pos: "FW", rating: 77 },
            { name: "Lobotka", pos: "MF", rating: 82 },
            { name: "Anguissa", pos: "MF", rating: 82 },
            { name: "McTominay", pos: "MF", rating: 82 },
            { name: "Gilmour", pos: "MF", rating: 76 },
            { name: "Folorunsho", pos: "MF", rating: 76 },
            { name: "Di Lorenzo", pos: "DF", rating: 76 },
            { name: "Rrahmani", pos: "DF", rating: 76 },
            { name: "Buongiorno", pos: "DF", rating: 76 },
            { name: "Olivera", pos: "DF", rating: 60 },
            { name: "Spinazzola", pos: "DF", rating: 60 },
            { name: "Mazzocchi", pos: "DF", rating: 60 },
        ],
        "newcastleunited": [
            { name: "Barnes", pos: "FW", rating: 84 },
            { name: "Woltemade", pos: "FW", rating: 84 },
            { name: "C. Wilson", pos: "FW", rating: 77 },
            { name: "Murphy", pos: "FW", rating: 77 },
            { name: "Guimarães", pos: "MF", rating: 82 },
            { name: "Joelinton", pos: "MF", rating: 82 },
            { name: "Tonali", pos: "MF", rating: 82 },
            { name: "Longstaff", pos: "MF", rating: 76 },
            { name: "Willock", pos: "MF", rating: 76 },
            { name: "Schär", pos: "DF", rating: 76 },
            { name: "Botman", pos: "DF", rating: 76 },
            { name: "Burn", pos: "DF", rating: 76 },
            { name: "Livramento", pos: "DF", rating: 76 },
            { name: "Trippier", pos: "DF", rating: 60 },
            { name: "Hall", pos: "DF", rating: 60 },
            { name: "Kelly", pos: "DF", rating: 60 },
        ],
        "nice": [
            { name: "Moukoko", pos: "FW", rating: 84 },
            { name: "Guessand", pos: "FW", rating: 84 },
            { name: "Boga", pos: "FW", rating: 84 },
            { name: "Cho", pos: "FW", rating: 77 },
            { name: "Diop", pos: "FW", rating: 77 },
            { name: "Laborde", pos: "FW", rating: 77 },
            { name: "Ndombele", pos: "MF", rating: 82 },
            { name: "Rosario", pos: "MF", rating: 82 },
            { name: "Boudaoui", pos: "MF", rating: 82 },
            { name: "Sanson", pos: "MF", rating: 76 },
            { name: "Ndayishimiye", pos: "MF", rating: 76 },
            { name: "Dante", pos: "DF", rating: 76 },
            { name: "Bombito", pos: "DF", rating: 76 },
            { name: "Clauss", pos: "DF", rating: 76 },
            { name: "Bard", pos: "DF", rating: 60 },
            { name: "Abdelmonem", pos: "DF", rating: 60 },
            { name: "Mendy", pos: "DF", rating: 60 },
        ],
        "nordsjaelland": [
            { name: "Ingvartsen", pos: "FW", rating: 84 },
            { name: "Nygren", pos: "FW", rating: 84 },
            { name: "Osman", pos: "FW", rating: 84 },
            { name: "Harder", pos: "FW", rating: 77 },
            { name: "Hansen", pos: "FW", rating: 77 },
            { name: "Svensson", pos: "MF", rating: 82 },
            { name: "Dorgeles", pos: "MF", rating: 82 },
            { name: "Tverskov", pos: "MF", rating: 82 },
            { name: "Brink", pos: "MF", rating: 76 },
            { name: "Certgh", pos: "MF", rating: 76 },
            { name: "Hey", pos: "DF", rating: 76 },
            { name: "Nagalo", pos: "DF", rating: 76 },
            { name: "Villadsen", pos: "DF", rating: 76 },
            { name: "Frese", pos: "DF", rating: 60 },
            { name: "Marx", pos: "DF", rating: 60 },
        ],
        "olympiakos": [
            { name: "El Kaabi", pos: "FW", rating: 84 },
            { name: "Velde", pos: "FW", rating: 84 },
            { name: "Martins", pos: "FW", rating: 84 },
            { name: "Taremi", pos: "FW", rating: 84 },
            { name: "Masouras", pos: "FW", rating: 77 },
            { name: "Yaremchuk", pos: "FW", rating: 77 },
            { name: "Hezze", pos: "MF", rating: 82 },
            { name: "Chiquinho", pos: "MF", rating: 82 },
            { name: "Stamenic", pos: "MF", rating: 82 },
            { name: "García", pos: "MF", rating: 76 },
            { name: "Oliveira", pos: "MF", rating: 76 },
            { name: "Carmo", pos: "DF", rating: 76 },
            { name: "Retsos", pos: "DF", rating: 76 },
            { name: "Ortega", pos: "DF", rating: 76 },
            { name: "Rodinei", pos: "DF", rating: 60 },
            { name: "Pirola", pos: "DF", rating: 60 },
            { name: "Costinha", pos: "DF", rating: 60 },
        ],
        "paok": [
            { name: "Tissoudali", pos: "FW", rating: 84 },
            { name: "Despodov", pos: "FW", rating: 84 },
            { name: "Zivkovic", pos: "FW", rating: 84 },
            { name: "Chalov", pos: "FW", rating: 77 },
            { name: "Brandon", pos: "FW", rating: 77 },
            { name: "Konstantelias", pos: "MF", rating: 82 },
            { name: "Camara", pos: "MF", rating: 82 },
            { name: "Schwab", pos: "MF", rating: 82 },
            { name: "Ozdoev", pos: "MF", rating: 76 },
            { name: "Bakayoko", pos: "MF", rating: 76 },
            { name: "Kedziora", pos: "DF", rating: 76 },
            { name: "Baba", pos: "DF", rating: 76 },
            { name: "Colley", pos: "DF", rating: 76 },
            { name: "Otto", pos: "DF", rating: 60 },
            { name: "Michailidis", pos: "DF", rating: 60 },
        ],
        "psg": [
            { name: "Dembélé", pos: "FW", rating: 99 },
            { name: "Barcola", pos: "FW", rating: 84 },
            { name: "G. Ramos", pos: "FW", rating: 84 },
            { name: "Doué", pos: "FW", rating: 99 },
            { name: "Kvaratskhelia", pos: "FW", rating: 99 },
            { name: "Kolo Muani", pos: "FW", rating: 77 },
            { name: "Asensio", pos: "FW", rating: 77 },
            { name: "Vitinha", pos: "MF", rating: 82 },
            { name: "Neves", pos: "MF", rating: 82 },
            { name: "F. Ruiz", pos: "MF", rating: 82 },
            { name: "Lee", pos: "MF", rating: 76 },
            { name: "Mayulu", pos: "MF", rating: 76 },
            { name: "Zaïre-Emery", pos: "MF", rating: 76 },
            { name: "Marquinhos", pos: "DF", rating: 76 },
            { name: "Pacho", pos: "DF", rating: 76 },
            { name: "Hakimi", pos: "DF", rating: 76 },
            { name: "Mendes", pos: "DF", rating: 76 },
            { name: "Beraldo", pos: "DF", rating: 60 },
            { name: "Zabarnyi", pos: "DF", rating: 60 },
        ],
        "psveindhoven": [
            { name: "De Jong", pos: "FW", rating: 84 },
            { name: "Bakayoko", pos: "FW", rating: 84 },
            { name: "Lang", pos: "FW", rating: 84 },
            { name: "Lozano", pos: "FW", rating: 77 },
            { name: "Pepi", pos: "FW", rating: 77 },
            { name: "Driouech", pos: "FW", rating: 77 },
            { name: "Schouten", pos: "MF", rating: 82 },
            { name: "Veerman", pos: "MF", rating: 82 },
            { name: "Tillman", pos: "MF", rating: 82 },
            { name: "Saibari", pos: "MF", rating: 76 },
            { name: "Til", pos: "MF", rating: 76 },
            { name: "Boscagli", pos: "DF", rating: 76 },
            { name: "Flamingo", pos: "DF", rating: 76 },
            { name: "Dest", pos: "DF", rating: 76 },
            { name: "Teze", pos: "DF", rating: 60 },
            { name: "Karsdorp", pos: "DF", rating: 60 },
            { name: "Obispo", pos: "DF", rating: 60 },
        ],
        "panathinaikos": [
            { name: "Ioannidis", pos: "FW", rating: 84 },
            { name: "Tetê", pos: "FW", rating: 84 },
            { name: "Pellistri", pos: "FW", rating: 84 },
            { name: "Šporar", pos: "FW", rating: 77 },
            { name: "Jeremejeff", pos: "FW", rating: 77 },
            { name: "Bakaseta", pos: "MF", rating: 82 },
            { name: "Araão", pos: "MF", rating: 82 },
            { name: "Maksimović", pos: "MF", rating: 82 },
            { name: "Čerin", pos: "MF", rating: 76 },
            { name: "Djuricic", pos: "MF", rating: 76 },
            { name: "Jedvaj", pos: "DF", rating: 76 },
            { name: "Ingason", pos: "DF", rating: 76 },
            { name: "Mladenović", pos: "DF", rating: 76 },
            { name: "Vagiannidis", pos: "DF", rating: 60 },
            { name: "Schenkeveld", pos: "DF", rating: 60 },
        ],
        "partizan": [
            { name: "Saldanha", pos: "FW", rating: 84 },
            { name: "Kalulu", pos: "FW", rating: 84 },
            { name: "Goh", pos: "FW", rating: 84 },
            { name: "Zubairu", pos: "FW", rating: 77 },
            { name: "Jovanović", pos: "FW", rating: 77 },
            { name: "Zahid", pos: "MF", rating: 82 },
            { name: "Natcho", pos: "MF", rating: 82 },
            { name: "Arriaga", pos: "MF", rating: 82 },
            { name: "Kovač", pos: "MF", rating: 76 },
            { name: "Stjepanović", pos: "MF", rating: 76 },
            { name: "Marković", pos: "DF", rating: 76 },
            { name: "Mujakić", pos: "DF", rating: 76 },
            { name: "Antić", pos: "DF", rating: 76 },
            { name: "Đurđević", pos: "DF", rating: 60 },
            { name: "Filipović", pos: "DF", rating: 60 },
        ],
        "porto": [
            { name: "Omorodion", pos: "FW", rating: 84 },
            { name: "Galeno", pos: "FW", rating: 84 },
            { name: "Pepê", pos: "FW", rating: 84 },
            { name: "Namaso", pos: "FW", rating: 77 },
            { name: "Gül", pos: "FW", rating: 77 },
            { name: "Borges", pos: "FW", rating: 77 },
            { name: "Varela", pos: "MF", rating: 82 },
            { name: "Nico", pos: "MF", rating: 82 },
            { name: "Eustáquio", pos: "MF", rating: 82 },
            { name: "Vieira", pos: "MF", rating: 76 },
            { name: "Grujić", pos: "MF", rating: 76 },
            { name: "Mora", pos: "MF", rating: 76 },
            { name: "Pérez", pos: "DF", rating: 76 },
            { name: "Djaló", pos: "DF", rating: 76 },
            { name: "Moura", pos: "DF", rating: 76 },
            { name: "Martim", pos: "DF", rating: 60 },
            { name: "Zé Pedro", pos: "DF", rating: 60 },
            { name: "Wendell", pos: "DF", rating: 60 },
        ],
        "rbleipzig": [
            { name: "Openda", pos: "FW", rating: 84 },
            { name: "Y. Diomande", pos: "FW", rating: 84 },
            { name: "Poulsen", pos: "FW", rating: 77 },
            { name: "Silva", pos: "FW", rating: 77 },
            { name: "Simons", pos: "MF", rating: 82 },
            { name: "Nusa", pos: "MF", rating: 82 },
            { name: "Haidara", pos: "MF", rating: 82 },
            { name: "Kampl", pos: "MF", rating: 82 },
            { name: "Seiwald", pos: "MF", rating: 76 },
            { name: "Elmas", pos: "MF", rating: 76 },
            { name: "Baumgartner", pos: "MF", rating: 76 },
            { name: "Lukeba", pos: "DF", rating: 76 },
            { name: "Orban", pos: "DF", rating: 76 },
            { name: "Raum", pos: "DF", rating: 76 },
            { name: "Henrichs", pos: "DF", rating: 60 },
            { name: "Geertruida", pos: "DF", rating: 60 },
            { name: "Bitshiabu", pos: "DF", rating: 60 },
        ],
        "rangers": [
            { name: "Dessers", pos: "FW", rating: 84 },
            { name: "Cerny", pos: "FW", rating: 84 },
            { name: "Danilo", pos: "FW", rating: 84 },
            { name: "Igamane", pos: "FW", rating: 77 },
            { name: "Matondo", pos: "FW", rating: 77 },
            { name: "Cortés", pos: "FW", rating: 77 },
            { name: "Diomande", pos: "MF", rating: 82 },
            { name: "Barron", pos: "MF", rating: 82 },
            { name: "Hagi", pos: "MF", rating: 82 },
            { name: "Lawrence", pos: "MF", rating: 76 },
            { name: "Raskin", pos: "MF", rating: 76 },
            { name: "Dowell", pos: "MF", rating: 76 },
            { name: "Tavernier", pos: "DF", rating: 76 },
            { name: "Souttar", pos: "DF", rating: 76 },
            { name: "Pröpper", pos: "DF", rating: 76 },
            { name: "Jefte", pos: "DF", rating: 60 },
            { name: "Sterling", pos: "DF", rating: 60 },
            { name: "Kasanwirjo", pos: "DF", rating: 60 },
        ],
        "realbetis": [
            { name: "Vitor Roque", pos: "FW", rating: 84 },
            { name: "Ezzalzouli", pos: "FW", rating: 84 },
            { name: "Ávila", pos: "FW", rating: 84 },
            { name: "Bakambu", pos: "FW", rating: 77 },
            { name: "Juanmi", pos: "FW", rating: 77 },
            { name: "Assane", pos: "FW", rating: 77 },
            { name: "Antony", pos: "FW", rating: 77 },
            { name: "Lo Celso", pos: "MF", rating: 82 },
            { name: "Fornals", pos: "MF", rating: 82 },
            { name: "Carvalho", pos: "MF", rating: 82 },
            { name: "Roca", pos: "MF", rating: 76 },
            { name: "Cardoso", pos: "MF", rating: 76 },
            { name: "Altimira", pos: "MF", rating: 76 },
            { name: "Llorente", pos: "DF", rating: 76 },
            { name: "Natan", pos: "DF", rating: 76 },
            { name: "Bellerín", pos: "DF", rating: 76 },
            { name: "Perraud", pos: "DF", rating: 60 },
            { name: "Sabaly", pos: "DF", rating: 60 },
            { name: "Bartra", pos: "DF", rating: 60 },
        ],
        "realmadrid": [
            { name: "Mbappé", pos: "FW", rating: 99 },
            { name: "Vinícius", pos: "FW", rating: 99 },
            { name: "Rodrygo", pos: "FW", rating: 84 },
            { name: "Endrick", pos: "FW", rating: 77 },
            { name: "Brahim", pos: "FW", rating: 72 },
            { name: "Bellingham", pos: "MF", rating: 82 },
            { name: "Valverde", pos: "MF", rating: 82 },
            { name: "Tchouaméni", pos: "MF", rating: 82 },
            { name: "Camavinga", pos: "MF", rating: 82 },
            { name: "B. Silva", pos: "MF", rating: 82 },
            { name: "Modrić", pos: "MF", rating: 76 },
            { name: "Güler", pos: "MF", rating: 76 },
            { name: "Ceballos", pos: "MF", rating: 76 },
            { name: "Rüdiger", pos: "DF", rating: 76 },
            { name: "Militão", pos: "DF", rating: 76 },
            { name: "Carvajal", pos: "DF", rating: 76 },
            { name: "Mendy", pos: "DF", rating: 76 },
            { name: "Dumfries", pos: "DF", rating: 76 },
            { name: "Konaté", pos: "DF", rating: 76 },
            { name: "Alexander-Arnold", pos: "DF", rating: 76 },
            { name: "García", pos: "DF", rating: 60 },
            { name: "Vallejo", pos: "DF", rating: 60 },
            { name: "Alaba", pos: "DF", rating: 60 },
            { name: "Huijsen", pos: "DF", rating: 60 },
        ],
        "realsociedad": [
            { name: "Oyarzabal", pos: "FW", rating: 84 },
            { name: "Kubo", pos: "FW", rating: 84 },
            { name: "Becker", pos: "FW", rating: 84 },
            { name: "Óskarsson", pos: "FW", rating: 77 },
            { name: "Sadiq", pos: "FW", rating: 77 },
            { name: "Barrenetxea", pos: "FW", rating: 77 },
            { name: "Zubimendi", pos: "MF", rating: 82 },
            { name: "Méndez", pos: "MF", rating: 82 },
            { name: "Sučić", pos: "MF", rating: 82 },
            { name: "Turrientes", pos: "MF", rating: 76 },
            { name: "Gómez", pos: "MF", rating: 76 },
            { name: "Zubeldia", pos: "DF", rating: 76 },
            { name: "Aguerd", pos: "DF", rating: 76 },
            { name: "Aramburu", pos: "DF", rating: 76 },
            { name: "Javi López", pos: "DF", rating: 60 },
            { name: "Traoré", pos: "DF", rating: 60 },
            { name: "Elustondo", pos: "DF", rating: 60 },
        ],
        "rennes": [
            { name: "Kalimuendo", pos: "FW", rating: 84 },
            { name: "Gouiri", pos: "FW", rating: 84 },
            { name: "Gómez", pos: "FW", rating: 84 },
            { name: "Gronbaek", pos: "FW", rating: 77 },
            { name: "Meister", pos: "FW", rating: 77 },
            { name: "Blas", pos: "MF", rating: 82 },
            { name: "Santamaria", pos: "MF", rating: 82 },
            { name: "Kamara", pos: "MF", rating: 82 },
            { name: "Matusiwa", pos: "MF", rating: 76 },
            { name: "James", pos: "MF", rating: 76 },
            { name: "Seidu", pos: "DF", rating: 76 },
            { name: "Østigård", pos: "DF", rating: 76 },
            { name: "Hateboer", pos: "DF", rating: 76 },
            { name: "Truffert", pos: "DF", rating: 60 },
            { name: "Wooh", pos: "DF", rating: 60 },
            { name: "Faye", pos: "DF", rating: 60 },
        ],
        "roma": [
            { name: "Dovbyk", pos: "FW", rating: 84 },
            { name: "Dybala", pos: "FW", rating: 84 },
            { name: "Soulé", pos: "FW", rating: 84 },
            { name: "El Shaarawy", pos: "FW", rating: 77 },
            { name: "Shomurodov", pos: "FW", rating: 77 },
            { name: "Pellegrini", pos: "MF", rating: 82 },
            { name: "Koné", pos: "MF", rating: 82 },
            { name: "Cristante", pos: "MF", rating: 82 },
            { name: "Pisilli", pos: "MF", rating: 76 },
            { name: "Paredes", pos: "MF", rating: 76 },
            { name: "Le Fée", pos: "MF", rating: 76 },
            { name: "Ndicka", pos: "DF", rating: 76 },
            { name: "Mancini", pos: "DF", rating: 76 },
            { name: "Hermoso", pos: "DF", rating: 76 },
            { name: "Angeliño", pos: "DF", rating: 76 },
            { name: "Çelik", pos: "DF", rating: 60 },
            { name: "Hummels", pos: "DF", rating: 60 },
            { name: "Abdulhamid", pos: "DF", rating: 60 },
        ],
        "rosenborg": [
            { name: "Sæter", pos: "FW", rating: 84 },
            { name: "Nypan", pos: "FW", rating: 84 },
            { name: "Holte", pos: "FW", rating: 84 },
            { name: "Broholm", pos: "FW", rating: 77 },
            { name: "Reitan-Sunde", pos: "FW", rating: 77 },
            { name: "Selnaes", pos: "MF", rating: 82 },
            { name: "Nemcik", pos: "MF", rating: 82 },
            { name: "Väänänen", pos: "MF", rating: 76 },
            { name: "Zecevic", pos: "MF", rating: 76 },
            { name: "Yttergård Jenssen", pos: "DF", rating: 76 },
            { name: "Ceide", pos: "DF", rating: 76 },
            { name: "Pereira", pos: "DF", rating: 76 },
            { name: "Cornic", pos: "DF", rating: 60 },
            { name: "Volden", pos: "DF", rating: 60 },
        ],
        "salzburg": [
            { name: "Konaté", pos: "FW", rating: 84 },
            { name: "Gloukh", pos: "FW", rating: 84 },
            { name: "Dorgeles", pos: "FW", rating: 84 },
            { name: "Daghim", pos: "FW", rating: 77 },
            { name: "Ratkov", pos: "FW", rating: 77 },
            { name: "Baidoo", pos: "FW", rating: 77 },
            { name: "Kjærgaard", pos: "MF", rating: 82 },
            { name: "Bidstrup", pos: "MF", rating: 82 },
            { name: "Gourna-Douath", pos: "MF", rating: 82 },
            { name: "Capaldo", pos: "MF", rating: 76 },
            { name: "Bajcetic", pos: "MF", rating: 76 },
            { name: "Diambou", pos: "MF", rating: 76 },
            { name: "Piatkowski", pos: "DF", rating: 76 },
            { name: "Blank", pos: "DF", rating: 76 },
            { name: "Dedić", pos: "DF", rating: 76 },
            { name: "Terzić", pos: "DF", rating: 60 },
            { name: "Mellberg", pos: "DF", rating: 60 },
        ],
        "sevilla": [
            { name: "Romero", pos: "FW", rating: 84 },
            { name: "Lukebakio", pos: "FW", rating: 84 },
            { name: "Ejuke", pos: "FW", rating: 84 },
            { name: "Iheanacho", pos: "FW", rating: 77 },
            { name: "Peque", pos: "FW", rating: 77 },
            { name: "Suso", pos: "FW", rating: 77 },
            { name: "Saúl", pos: "MF", rating: 82 },
            { name: "Lokonga", pos: "MF", rating: 82 },
            { name: "Sow", pos: "MF", rating: 82 },
            { name: "Agoumé", pos: "MF", rating: 76 },
            { name: "Gudelj", pos: "MF", rating: 76 },
            { name: "Badé", pos: "DF", rating: 76 },
            { name: "Nianzou", pos: "DF", rating: 76 },
            { name: "Carmona", pos: "DF", rating: 76 },
            { name: "Pedrosa", pos: "DF", rating: 60 },
            { name: "Navas", pos: "DF", rating: 60 },
            { name: "Marcao", pos: "DF", rating: 60 },
        ],
        "shakhtardonetsk": [
            { name: "Sikan", pos: "FW", rating: 84 },
            { name: "Traoré", pos: "FW", rating: 84 },
            { name: "Kevin", pos: "FW", rating: 84 },
            { name: "Zubkov", pos: "FW", rating: 77 },
            { name: "Eguinaldo", pos: "FW", rating: 77 },
            { name: "Pedrinho", pos: "FW", rating: 77 },
            { name: "Sudakov", pos: "MF", rating: 82 },
            { name: "Kryskiv", pos: "MF", rating: 82 },
            { name: "Bondarenko", pos: "MF", rating: 82 },
            { name: "Stepanenko", pos: "MF", rating: 76 },
            { name: "Marlon", pos: "MF", rating: 76 },
            { name: "Matviyenko", pos: "DF", rating: 76 },
            { name: "Bondar", pos: "DF", rating: 76 },
            { name: "Konoplia", pos: "DF", rating: 76 },
            { name: "Pedro Henrique", pos: "DF", rating: 60 },
            { name: "Azarovi", pos: "DF", rating: 60 },
        ],
        "shamrockrovers": [
            { name: "Kenny", pos: "FW", rating: 84 },
            { name: "Greene", pos: "FW", rating: 84 },
            { name: "Burke", pos: "FW", rating: 84 },
            { name: "Gaffney", pos: "FW", rating: 77 },
            { name: "McNulty", pos: "FW", rating: 77 },
            { name: "Watts", pos: "MF", rating: 82 },
            { name: "Towell", pos: "MF", rating: 82 },
            { name: "Nugent", pos: "MF", rating: 82 },
            { name: "O'Neill", pos: "MF", rating: 76 },
            { name: "Byrne", pos: "MF", rating: 76 },
            { name: "Cleary", pos: "DF", rating: 76 },
            { name: "Honohan", pos: "DF", rating: 76 },
            { name: "Pico", pos: "DF", rating: 76 },
            { name: "Clarke", pos: "DF", rating: 60 },
            { name: "Kavanagh", pos: "DF", rating: 60 },
        ],
        "slaviaprague": [
            { name: "Chorý", pos: "FW", rating: 84 },
            { name: "Chytil", pos: "FW", rating: 84 },
            { name: "Provod", pos: "FW", rating: 84 },
            { name: "Schranz", pos: "FW", rating: 77 },
            { name: "Jurečka", pos: "FW", rating: 77 },
            { name: "Zafeiris", pos: "MF", rating: 82 },
            { name: "Oscar", pos: "MF", rating: 82 },
            { name: "Prebsl", pos: "MF", rating: 82 },
            { name: "Douděra", pos: "MF", rating: 76 },
            { name: "Sevcik", pos: "MF", rating: 76 },
            { name: "Holeš", pos: "DF", rating: 76 },
            { name: "Zima", pos: "DF", rating: 76 },
            { name: "Diouf", pos: "DF", rating: 76 },
            { name: "Bořil", pos: "DF", rating: 60 },
            { name: "Ogbuehi", pos: "DF", rating: 60 },
        ],
        "sligorovers": [
            { name: "Mata", pos: "FW", rating: 84 },
            { name: "Pearce", pos: "FW", rating: 84 },
            { name: "Radosavljevic", pos: "FW", rating: 77 },
            { name: "Waweru", pos: "FW", rating: 77 },
            { name: "Chapman", pos: "MF", rating: 82 },
            { name: "Morahan", pos: "MF", rating: 82 },
            { name: "Malley", pos: "MF", rating: 76 },
            { name: "Barlow", pos: "MF", rating: 76 },
            { name: "Pijnaker", pos: "DF", rating: 76 },
            { name: "Wiggett", pos: "DF", rating: 76 },
            { name: "Hutchinson", pos: "DF", rating: 76 },
            { name: "Wilson", pos: "DF", rating: 60 },
            { name: "Fitzgerald", pos: "DF", rating: 60 },
        ],
        "spartaprague": [
            { name: "Olatunji", pos: "FW", rating: 84 },
            { name: "Haraslín", pos: "FW", rating: 84 },
            { name: "Tuci", pos: "FW", rating: 84 },
            { name: "Birmančević", pos: "FW", rating: 77 },
            { name: "Krasniqi", pos: "FW", rating: 77 },
            { name: "Laci", pos: "MF", rating: 82 },
            { name: "Kairinen", pos: "MF", rating: 82 },
            { name: "Panák", pos: "MF", rating: 82 },
            { name: "Sadílek", pos: "MF", rating: 76 },
            { name: "Pavelka", pos: "MF", rating: 76 },
            { name: "Vitík", pos: "DF", rating: 76 },
            { name: "Sørensen", pos: "DF", rating: 76 },
            { name: "Rynes", pos: "DF", rating: 76 },
            { name: "Preciado", pos: "DF", rating: 60 },
            { name: "Zelený", pos: "DF", rating: 60 },
        ],
        "sportingcp": [
            { name: "Gyökeres", pos: "FW", rating: 99 },
            { name: "Trincão", pos: "FW", rating: 84 },
            { name: "Edwards", pos: "FW", rating: 84 },
            { name: "Harder", pos: "FW", rating: 77 },
            { name: "Conrad Harder", pos: "FW", rating: 77 },
            { name: "Hjulmand", pos: "MF", rating: 82 },
            { name: "Morita", pos: "MF", rating: 82 },
            { name: "Bragança", pos: "MF", rating: 82 },
            { name: "Quenda", pos: "MF", rating: 76 },
            { name: "Gonçalves", pos: "MF", rating: 76 },
            { name: "Inácio", pos: "DF", rating: 76 },
            { name: "Diomande", pos: "DF", rating: 76 },
            { name: "Debast", pos: "DF", rating: 76 },
            { name: "Araújo", pos: "DF", rating: 60 },
            { name: "Matheus Reis", pos: "DF", rating: 60 },
            { name: "Esgaio", pos: "DF", rating: 60 },
        ],
        "strasbourg": [
            { name: "Emegha", pos: "FW", rating: 84 },
            { name: "Nanasi", pos: "FW", rating: 84 },
            { name: "Bakwa", pos: "FW", rating: 84 },
            { name: "Mara", pos: "FW", rating: 77 },
            { name: "Sebas", pos: "FW", rating: 77 },
            { name: "Andrey Santos", pos: "MF", rating: 82 },
            { name: "Diarra", pos: "MF", rating: 82 },
            { name: "Doukouré", pos: "MF", rating: 76 },
            { name: "Lemaréchal", pos: "MF", rating: 76 },
            { name: "Sow", pos: "DF", rating: 76 },
            { name: "Sylla", pos: "DF", rating: 76 },
            { name: "Sarr", pos: "DF", rating: 76 },
            { name: "Doué", pos: "DF", rating: 99 },
            { name: "Senaya", pos: "DF", rating: 60 },
        ],
        "sturmgraz": [
            { name: "Biereth", pos: "FW", rating: 84 },
            { name: "Jatta", pos: "FW", rating: 84 },
            { name: "Camara", pos: "FW", rating: 84 },
            { name: "Sarkaria", pos: "FW", rating: 77 },
            { name: "Grgić", pos: "FW", rating: 77 },
            { name: "Kiteishvili", pos: "MF", rating: 82 },
            { name: "Horvat", pos: "MF", rating: 82 },
            { name: "Bøving", pos: "MF", rating: 82 },
            { name: "Chukwuani", pos: "MF", rating: 76 },
            { name: "Gorenc-Stanković", pos: "MF", rating: 76 },
            { name: "Lavalee", pos: "DF", rating: 76 },
            { name: "Aiwu", pos: "DF", rating: 76 },
            { name: "Gazibegović", pos: "DF", rating: 76 },
            { name: "Johnston", pos: "DF", rating: 60 },
            { name: "Geyrhofer", pos: "DF", rating: 60 },
        ],
        "stuttgart": [
            { name: "Undav", pos: "FW", rating: 84 },
            { name: "Demirović", pos: "FW", rating: 84 },
            { name: "Touré", pos: "FW", rating: 84 },
            { name: "Leweling", pos: "FW", rating: 77 },
            { name: "Diehl", pos: "FW", rating: 77 },
            { name: "Millot", pos: "MF", rating: 82 },
            { name: "Stiller", pos: "MF", rating: 82 },
            { name: "Karazor", pos: "MF", rating: 82 },
            { name: "Führich", pos: "MF", rating: 76 },
            { name: "Rieder", pos: "MF", rating: 76 },
            { name: "Chabot", pos: "DF", rating: 76 },
            { name: "Rouault", pos: "DF", rating: 76 },
            { name: "Mittelstädt", pos: "DF", rating: 76 },
            { name: "Vagnoman", pos: "DF", rating: 60 },
            { name: "Chase", pos: "DF", rating: 60 },
            { name: "Stergiou", pos: "DF", rating: 60 },
        ],
        "tottenhamhotspur": [
            { name: "Solanke", pos: "FW", rating: 84 },
            { name: "Richarlison", pos: "FW", rating: 84 },
            { name: "Odobert", pos: "FW", rating: 77 },
            { name: "Tel", pos: "FW", rating: 77 },
            { name: "Maddison", pos: "MF", rating: 82 },
            { name: "Kulusevski", pos: "MF", rating: 82 },
            { name: "Sarr", pos: "MF", rating: 82 },
            { name: "Bentancur", pos: "MF", rating: 76 },
            { name: "Bissouma", pos: "MF", rating: 76 },
            { name: "Bergvall", pos: "MF", rating: 76 },
            { name: "Romero", pos: "DF", rating: 76 },
            { name: "Van de Ven", pos: "DF", rating: 76 },
            { name: "Porro", pos: "DF", rating: 76 },
            { name: "Udogie", pos: "DF", rating: 76 },
            { name: "Senesi", pos: "DF", rating: 76 },
            { name: "Drăgușin", pos: "DF", rating: 60 },
            { name: "Spence", pos: "DF", rating: 60 },
            { name: "Davies", pos: "DF", rating: 60 },
            { name: "Danso", pos: "DF", rating: 60 },
            { name: "Robertson", pos: "DF", rating: 60 },
        ],
        "unionberlin": [
            { name: "Hollerbach", pos: "FW", rating: 84 },
            { name: "Jordan", pos: "FW", rating: 84 },
            { name: "Vertessen", pos: "FW", rating: 84 },
            { name: "Volland", pos: "FW", rating: 77 },
            { name: "Prtajin", pos: "FW", rating: 77 },
            { name: "Kemlein", pos: "MF", rating: 82 },
            { name: "Schäfer", pos: "MF", rating: 82 },
            { name: "Khedira", pos: "MF", rating: 82 },
            { name: "Jeong", pos: "MF", rating: 76 },
            { name: "Tousart", pos: "MF", rating: 76 },
            { name: "Habib", pos: "MF", rating: 76 },
            { name: "Doekhi", pos: "DF", rating: 76 },
            { name: "Leite", pos: "DF", rating: 76 },
            { name: "Vogt", pos: "DF", rating: 76 },
            { name: "Trimmel", pos: "DF", rating: 60 },
            { name: "Rothe", pos: "DF", rating: 60 },
            { name: "Querfeld", pos: "DF", rating: 60 },
        ],
        "unionsaintgilloise": [
            { name: "Ivanović", pos: "FW", rating: 84 },
            { name: "Rodriguez", pos: "FW", rating: 84 },
            { name: "Kabangu", pos: "FW", rating: 84 },
            { name: "Fuseini", pos: "FW", rating: 77 },
            { name: "Eckert", pos: "FW", rating: 77 },
            { name: "Sadiki", pos: "MF", rating: 82 },
            { name: "Vanhoutte", pos: "MF", rating: 82 },
            { name: "Ait El Hadj", pos: "MF", rating: 82 },
            { name: "Rasmussen", pos: "MF", rating: 76 },
            { name: "Lapoussin", pos: "MF", rating: 76 },
            { name: "Machida", pos: "DF", rating: 76 },
            { name: "Mac Allister", pos: "DF", rating: 76 },
            { name: "Burgess", pos: "DF", rating: 76 },
            { name: "Castro-Montes", pos: "DF", rating: 60 },
            { name: "Teklab", pos: "DF", rating: 60 },
        ],
        "viktoriaplzen": [
            { name: "Šulc", pos: "FW", rating: 84 },
            { name: "Adu", pos: "FW", rating: 84 },
            { name: "Vydra", pos: "FW", rating: 84 },
            { name: "Vašulín", pos: "FW", rating: 77 },
            { name: "Mika", pos: "FW", rating: 77 },
            { name: "Kalvach", pos: "MF", rating: 82 },
            { name: "Cerv", pos: "MF", rating: 82 },
            { name: "Kopic", pos: "MF", rating: 82 },
            { name: "Jirka", pos: "MF", rating: 76 },
            { name: "Panos", pos: "MF", rating: 76 },
            { name: "Hranáč", pos: "DF", rating: 76 },
            { name: "Dweh", pos: "DF", rating: 76 },
            { name: "Jemelka", pos: "DF", rating: 76 },
            { name: "Havel", pos: "DF", rating: 60 },
            { name: "Cadu", pos: "DF", rating: 60 },
        ],
        "villarreal": [
            { name: "Pérez", pos: "FW", rating: 84 },
            { name: "Barry", pos: "FW", rating: 84 },
            { name: "Pépé", pos: "FW", rating: 84 },
            { name: "Baena", pos: "FW", rating: 77 },
            { name: "Gerard", pos: "FW", rating: 77 },
            { name: "Parejo", pos: "MF", rating: 82 },
            { name: "Comesaña", pos: "MF", rating: 82 },
            { name: "Gueye", pos: "MF", rating: 82 },
            { name: "Terrats", pos: "MF", rating: 76 },
            { name: "Suárez", pos: "MF", rating: 76 },
            { name: "Bailly", pos: "DF", rating: 76 },
            { name: "Costa", pos: "DF", rating: 76 },
            { name: "Albiol", pos: "DF", rating: 76 },
            { name: "Cardona", pos: "DF", rating: 60 },
            { name: "Femenía", pos: "DF", rating: 60 },
            { name: "Foyth", pos: "DF", rating: 60 },
        ],
        "wislakrakow": [
            { name: "Rodado", pos: "FW", rating: 84 },
            { name: "Gogół", pos: "FW", rating: 84 },
            { name: "Alfaro", pos: "FW", rating: 84 },
            { name: "Zwoliński", pos: "FW", rating: 77 },
            { name: "Krzyzanowski", pos: "FW", rating: 77 },
            { name: "Duda", pos: "MF", rating: 82 },
            { name: "Uryga", pos: "MF", rating: 82 },
            { name: "Kutwa", pos: "MF", rating: 82 },
            { name: "Carbo", pos: "MF", rating: 76 },
            { name: "Baena", pos: "MF", rating: 76 },
            { name: "Szot", pos: "DF", rating: 76 },
            { name: "Jaroch", pos: "DF", rating: 76 },
            { name: "Łasicki", pos: "DF", rating: 76 },
            { name: "Biedrzycki", pos: "DF", rating: 60 },
            { name: "Kiš", pos: "DF", rating: 60 },
        ],
        "wolfsbergerac": [
            { name: "Bamba", pos: "FW", rating: 84 },
            { name: "Röcher", pos: "FW", rating: 84 },
            { name: "Karamoko", pos: "FW", rating: 84 },
            { name: "Omić", pos: "FW", rating: 77 },
            { name: "Gattermayer", pos: "FW", rating: 77 },
            { name: "Altunashvili", pos: "MF", rating: 82 },
            { name: "Piesinger", pos: "MF", rating: 82 },
            { name: "Jasić", pos: "MF", rating: 82 },
            { name: "Wernitznig", pos: "MF", rating: 76 },
            { name: "Tijani", pos: "MF", rating: 76 },
            { name: "Baumgartner", pos: "DF", rating: 76 },
            { name: "Oroz", pos: "DF", rating: 76 },
            { name: "Scherzer", pos: "DF", rating: 76 },
            { name: "Diabate", pos: "DF", rating: 60 },
            { name: "Kennedy", pos: "DF", rating: 60 },
        ],
        "youngboys": [
            { name: "Ganvoula", pos: "FW", rating: 84 },
            { name: "Itten", pos: "FW", rating: 84 },
            { name: "Monteiro", pos: "FW", rating: 84 },
            { name: "Elia", pos: "FW", rating: 77 },
            { name: "Colley", pos: "FW", rating: 77 },
            { name: "Ugrinić", pos: "MF", rating: 82 },
            { name: "Niasse", pos: "MF", rating: 82 },
            { name: "Lauper", pos: "MF", rating: 82 },
            { name: "Lakomy", pos: "MF", rating: 76 },
            { name: "Imeri", pos: "MF", rating: 76 },
            { name: "Camara", pos: "DF", rating: 76 },
            { name: "Benito", pos: "DF", rating: 76 },
            { name: "Hadjam", pos: "DF", rating: 76 },
            { name: "Athekame", pos: "DF", rating: 60 },
            { name: "Husic", pos: "DF", rating: 60 },
        ],
        "zenitstpetersburg": [
            { name: "Cassierra", pos: "FW", rating: 84 },
            { name: "Luciano", pos: "FW", rating: 84 },
            { name: "Artur", pos: "FW", rating: 84 },
            { name: "Pedro", pos: "FW", rating: 99 },
            { name: "Sergeev", pos: "FW", rating: 77 },
            { name: "Mantuan", pos: "FW", rating: 77 },
            { name: "Wendel", pos: "MF", rating: 82 },
            { name: "Claudio", pos: "MF", rating: 82 },
            { name: "Barrios", pos: "MF", rating: 82 },
            { name: "Mostovoy", pos: "MF", rating: 76 },
            { name: "Glushankov", pos: "MF", rating: 76 },
            { name: "Nino", pos: "DF", rating: 76 },
            { name: "Eraković", pos: "DF", rating: 76 },
            { name: "Douglas Santos", pos: "DF", rating: 76 },
            { name: "Karavaev", pos: "DF", rating: 60 },
            { name: "Alip", pos: "DF", rating: 60 },
        ],
    };

    function normalizeClubName(name) {
        if (!name) return "";
        return name.normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .toLowerCase()
            .replace(/[^a-z0-9]/g, "")
            .replace("saintgermain", "psg")
            .replace("parissaintgermain", "psg");
    }

    function getGenericRoster(teamName, countryCode) {
        const flags = {
            "ENG": "🏴󠁧󠁢󠁥󠁮󠁧󠁿", "ESP": "🇪🇸", "GER": "🇩🇪", "ITA": "🇮🇹", "FRA": "🇫🇷", "POR": "🇵🇹", 
            "NED": "🇳🇱", "SCO": "🏴󠁧󠁢󠁳󠁣󠁴󠁿", "BEL": "🇧🇪", "TUR": "🇹🇷", "AUT": "🇦🇹", "CZE": "🇨🇿", 
            "CRO": "🇭🇷", "SRB": "🇷🇸", "DEN": "🇩🇰", "GRE": "🇬🇷", "SUI": "🇨🇭", "HUN": "🇭🇺", 
            "UKR": "🇺🇦", "POL": "🇵🇱", "CYP": "🇨🇾", "BLR": "🇧🇾", "SWE": "🇸🇪", "NOR": "🇳🇴", 
            "BUL": "🇧🇬", "RUS": "🇷🇺", "SLO": "🇸🇮", "IRL": "🇮🇪", "ROU": "🇷🇴"
        };
        const flag = flags[countryCode] || "🇪🇺";
        return [
            { name: "M. Kovac", flag: flag, pos: "FW" },
            { name: "J. Schmid", flag: flag, pos: "FW" },
            { name: "A. Nielsen", flag: flag, pos: "FW" },
            { name: "L. Rossi", flag: flag, pos: "MF" },
            { name: "D. Santos", flag: flag, pos: "MF" },
            { name: "S. Dubois", flag: flag, pos: "MF" },
            { name: "O. Ivanov", flag: flag, pos: "DF" }
        ];
    }

    function getRosterForTeam(teamName, isUser, countryCode) {
        const normName = normalizeClubName(teamName);
        
        // 1. User Squad (đội của người dùng)
        if (isUser) {
            if (typeof window !== 'undefined' && window.squad && window.players) {
                const squadPlayers = [];
                for (const [slot, pId] of Object.entries(window.squad)) {
                    if (slot === "GK") continue;
                    if (!pId) continue;
                    const p = window.players.find(x => x.id === pId);
                    if (p) {
                        squadPlayers.push({
                            name: p.cardName || p.name,
                            flag: p.flag || "🇻🇳",
                            pos: p.position || "FW",
                            rating: p.rating || 75
                        });
                    }
                }
                if (squadPlayers.length > 0) return squadPlayers;
            }
        }
        
        // 2. Override Rosters - NGUỒN DUY NHẤT cho AI teams (từ tong_hop_111_doi_hinh_2026.md)
        if (OVERRIDE_ROSTERS[normName]) {
            return OVERRIDE_ROSTERS[normName].map(p => ({
                name: p.name,
                flag: "🏳️",
                pos: p.pos,
                rating: p.rating
            }));
        }
        
        // 3. Generic Roster (backup cuối nếu đội không có trong file md)
        return getGenericRoster(teamName, countryCode).map(p => ({
            name: p.name,
            flag: p.flag,
            pos: p.pos,
            rating: p.pos === "FW" ? 80 : p.pos === "MF" ? 78 : 76
        }));
    }

    function selectGoalscorer(roster) {
        if (!roster || roster.length === 0) {
            return { name: "Cầu thủ", flag: "⚽" };
        }
        const weights = roster.map(p => {
            let posWeight = 3;
            const pos = (p.pos || "").toUpperCase();
            if (pos === "FW" || pos === "ST" || pos === "CF" || pos === "LW" || pos === "RW" || pos === "RF" || pos === "LF") {
                posWeight = 6;
            } else if (pos === "MF" || pos === "CM" || pos === "CAM" || pos === "CDM" || pos === "LM" || pos === "RM") {
                posWeight = 3;
            } else if (pos === "DF" || pos === "CB" || pos === "LB" || pos === "RB" || pos === "LWB" || pos === "RWB") {
                posWeight = 1;
            }
            const rating = p.rating || 75;
            return posWeight * rating;
        });
        const totalWeight = weights.reduce((a, b) => a + b, 0);
        let rand = Math.random() * totalWeight;
        for (let i = 0; i < roster.length; i++) {
            rand -= weights[i];
            if (rand <= 0) {
                return roster[i];
            }
        }
        return roster[0];
    }

    // 2. BỘ ĐIỀU PHỐI GIẢI ĐẤU
    class UCLSimulation {
        constructor(userSquadName, userAtk, userDef, userMid) {
            this.userSquadName = userSquadName || "My Squad";
            this.userStats = { name: this.userSquadName, country: "USR", atk: userAtk, def: userDef, mid: userMid, isUser: true };
            this.teams = [];
            this.swissTable = [];
            this.swissMatches = []; // mảng chứa tất cả trận của 8 vòng
            this.currentRound = 0; // 0: chưa bắt đầu, 1-8: các vòng Swiss
            this.stage = "draw"; // "draw", "swiss", "playoff", "r16", "qf", "sf", "final", "ended"
            this.roundPhase = "setup"; // "setup" or "results"
            
            // Knockout brackets
            this.playoffMatches = [];
            this.r16Matches = [];
            this.qfMatches = [];
            this.sfMatches = [];
            this.finalMatch = null;
        }

        // Bốc thăm 35 đội AI + 1 Đội User = 36 đội
        drawTeams() {
            let selected = [];

            // STEP 1: Big 5 Draw (enforce sum = 21)
            // Xác định phân phối số slot Big 5:
            // 2% ENG=6, 10% FRA=4, 45% ENG=5 + ESP=5, 43% random hợp lệ khác
            let big5Slots = { "ENG": 4, "ESP": 4, "GER": 4, "ITA": 4, "FRA": 3 }; // default 19
            let big5DistRoll = Math.random();

            if (big5DistRoll < 0.02) {
                // ENG=6 (2%)
                big5Slots = { "ENG": 6, "ESP": 4, "GER": 4, "ITA": 4, "FRA": 3 };
            } else if (big5DistRoll < 0.12) {
                // FRA=4 (10%)
                big5Slots = { "ENG": 5, "ESP": 4, "GER": 4, "ITA": 4, "FRA": 4 };
            } else if (big5DistRoll < 0.57) {
                // ENG=5 + ESP=5 (45%)
                big5Slots = { "ENG": 5, "ESP": 5, "GER": 4, "ITA": 4, "FRA": 3 };
            } else {
                // Trộn ngẫu nhiên hợp lệ sao cho sum = 21
                big5Slots = { "ENG": 5, "ESP": 4, "GER": 4, "ITA": 5, "FRA": 3 };
            }

            // Draw từng nước Big 5
            for (let country in big5Slots) {
                let limit = big5Slots[country];
                let countryPool = TEAM_POOL[country];
                let drawn = [];
                // add 100% teams first
                countryPool.forEach(t => {
                    if (t.prob === 1.0) {
                        drawn.push({...t, country});
                    }
                });
                // roll remaining
                let candidates = countryPool.filter(t => t.prob < 1.0);
                // Xáo trộn candidate để công bằng
                candidates.sort(() => Math.random() - 0.5);
                for (let t of candidates) {
                    if (drawn.length >= limit) break;
                    if (Math.random() < t.prob) {
                        drawn.push({...t, country});
                    }
                }
                // Fill if not enough
                if (drawn.length < limit) {
                    candidates.sort((a,b) => b.prob - a.prob);
                    for (let t of candidates) {
                        if (drawn.length >= limit) break;
                        if (!drawn.find(d => d.name === t.name)) {
                            drawn.push({...t, country});
                        }
                    }
                }
                selected.push(...drawn);
            }

            // STEP 2: POR + NED (4 hoặc 5 slots, không bao giờ cả hai cùng 3)
            let porLimit = 2;
            let nedLimit = 2;
            let restDistRoll = Math.random();
            if (restDistRoll < 0.10) {
                // Portugal 3 slots
                porLimit = 3;
            } else if (restDistRoll < 0.20) {
                // Netherlands 3 slots
                nedLimit = 3;
            }

            // Draw POR
            let porDrawn = [];
            TEAM_POOL["POR"].forEach(t => { if (t.prob === 1.0) porDrawn.push({...t, country: "POR"}); });
            let porCandidates = TEAM_POOL["POR"].filter(t => t.prob < 1.0).sort(() => Math.random() - 0.5);
            for (let t of porCandidates) {
                if (porDrawn.length >= porLimit) break;
                if (Math.random() < t.prob) porDrawn.push({...t, country: "POR"});
            }
            if (porDrawn.length < porLimit) {
                porCandidates.sort((a,b) => b.prob - a.prob);
                for (let t of porCandidates) {
                    if (porDrawn.length >= porLimit) break;
                    if (!porDrawn.find(d => d.name === t.name)) porDrawn.push({...t, country: "POR"});
                }
            }
            selected.push(...porDrawn);

            // Draw NED
            let nedDrawn = [];
            let nedCandidates = TEAM_POOL["NED"].sort(() => Math.random() - 0.5);
            for (let t of nedCandidates) {
                if (nedDrawn.length >= nedLimit) break;
                if (Math.random() < t.prob) nedDrawn.push({...t, country: "NED"});
            }
            if (nedDrawn.length < nedLimit) {
                nedCandidates.sort((a,b) => b.prob - a.prob);
                for (let t of nedCandidates) {
                    if (nedDrawn.length >= nedLimit) break;
                    if (!nedDrawn.find(d => d.name === t.name)) nedDrawn.push({...t, country: "NED"});
                }
            }
            selected.push(...nedDrawn);

            // STEP 3: Priority countries draw (TUR → BEL → DEN → SCO → AUT → SUI → CZE)
            let priorityCountries = ["TUR", "BEL", "DEN", "SCO", "AUT", "SUI", "CZE"];
            let priorityDrawn = [];
            for (let country of priorityCountries) {
                let candidates = TEAM_POOL[country].sort(() => Math.random() - 0.5);
                let won = null;
                for (let t of candidates) {
                    if (Math.random() < t.prob) {
                        won = {...t, country};
                        break;
                    }
                }
                if (won) {
                    priorityDrawn.push(won);
                }
            }
            selected.push(...priorityDrawn);

            // STEP 4: Secondary fill from other countries to make it exactly 35 teams
            let secondaryPool = [];
            let secondaryCountries = ["SRB", "UKR", "GRE", "HUN", "CRO", "BUL", "SWE", "NOR", "RUS", "POL", "CYP", "BLR", "SLO", "IRL", "ROU"];
            // Add any priority countries that didn't get selected in step 3
            priorityCountries.forEach(c => {
                if (!priorityDrawn.find(d => d.country === c)) {
                    secondaryCountries.push(c);
                }
            });

            secondaryCountries.forEach(country => {
                TEAM_POOL[country].forEach(t => {
                    secondaryPool.push({...t, country});
                });
            });

            // Sắp xếp secondary theo prob giảm dần
            secondaryPool.sort((a, b) => b.prob - a.prob || Math.random() - 0.5);

            let chosenSecondary = [];
            let chosenCountries = new Set(selected.map(s => s.country));

            for (let t of secondaryPool) {
                if (selected.length + chosenSecondary.length >= 35) break;
                if (!chosenCountries.has(t.country)) {
                    if (Math.random() < t.prob) {
                        chosenSecondary.push(t);
                        chosenCountries.add(t.country);
                    }
                }
            }

            // Nếu vẫn chưa đủ 35, duyệt thêm các đội có prob cao nhất chưa chọn
            if (selected.length + chosenSecondary.length < 35) {
                for (let t of secondaryPool) {
                    if (selected.length + chosenSecondary.length >= 35) break;
                    if (!chosenCountries.has(t.country) && !chosenSecondary.find(s => s.name === t.name)) {
                        chosenSecondary.push(t);
                        chosenCountries.add(t.country);
                    }
                }
            }
            selected.push(...chosenSecondary);

            // Bỏ bớt nếu quá 35 (hiếm khi xảy ra)
            if (selected.length > 35) {
                selected = selected.slice(0, 35);
            }

            // STEP 5: Ajax mutation check (10%)
            selected.forEach(t => {
                if (t.isAjax && Math.random() < 0.10) {
                    t.atk = 90;
                    t.def = 85;
                    t.mid = 80;
                    t.name += " ✦";
                }
            });

            // STEP 6: Thêm đội người dùng (MY SQUAD)
            selected.push(this.userStats);

            this.teams = selected;
            this.initSwissTable();
            this.generateSwissSchedule();
            this.stage = "swiss";
        }

        // Khởi tạo bảng xếp hạng Swiss rỗng ban đầu
        initSwissTable() {
            this.swissTable = this.teams.map(t => ({
                name: t.name,
                country: t.country,
                isUser: t.isUser || false,
                atk: t.atk,
                def: t.def,
                mid: t.mid,
                played: 0,
                w: 0,
                d: 0,
                l: 0,
                gf: 0,
                ga: 0,
                gd: 0,
                pts: 0,
                opponents: [] // danh sách tên đối thủ đã đá
            }));
        }

        // Tạo lịch thi đấu Swiss Stage 8 vòng đấu (4 sân nhà, 4 sân khách)
        // Áp dụng các luật: không gặp đội cùng nước, max 2 đội/quốc gia
        generateSwissSchedule() {
            const numTeams = 36;
            const numRounds = 8;
            const teams = this.teams;

            let schedule = Array.from({ length: numRounds }, () => []);

            // Helper check luật đối đầu
            function canPlay(t1, t2, homes, aways, historicalOpponents, countryCounts) {
                if (t1.name === t2.name) return false;
                if (t1.country === t2.country) return false; // không đá đội cùng nước
                if (historicalOpponents[t1.name].has(t2.name)) return false; // không đá lại

                // Không gặp quá 2 đội của cùng quốc gia
                if ((countryCounts[t1.name][t2.country] || 0) >= 2) return false;
                if ((countryCounts[t2.name][t1.country] || 0) >= 2) return false;

                return true;
            }

            let attempt = 0;
            const maxGlobalAttempts = 100;

            while (attempt < maxGlobalAttempts) {
                attempt++;
                let success = true;

                // Reset state
                let homes = {};
                let aways = {};
                let historicalOpponents = {};
                let countryCounts = {};

                teams.forEach(t => {
                    homes[t.name] = 0;
                    aways[t.name] = 0;
                    historicalOpponents[t.name] = new Set();
                    countryCounts[t.name] = {};
                });

                // Generate từng round
                for (let r = 0; r < numRounds; r++) {
                    let roundPairs = [];
                    let matchedInRound = new Set();
                    let roundAttempt = 0;
                    let roundSuccess = false;

                    while (roundAttempt < 500) {
                        roundAttempt++;
                        roundPairs = [];
                        matchedInRound.clear();
                        let stuck = false;

                        // Shuffle teams để bốc ngẫu nhiên
                        let pool = [...teams].sort(() => Math.random() - 0.5);

                        for (let i = 0; i < numTeams; i++) {
                            let t1 = pool[i];
                            if (matchedInRound.has(t1.name)) continue;

                            let partner = null;
                            // Tìm partner hợp lệ
                            for (let j = i + 1; j < numTeams; j++) {
                                let t2 = pool[j];
                                if (matchedInRound.has(t2.name)) continue;

                                if (canPlay(t1, t2, homes, aways, historicalOpponents, countryCounts)) {
                                    // Xác định sân nhà sân khách ngẫu nhiên dựa trên số trận đã chơi
                                    let homeTeam = null;
                                    let awayTeam = null;

                                    if (homes[t1.name] < 4 && aways[t2.name] < 4) {
                                        homeTeam = t1;
                                        awayTeam = t2;
                                    } else if (homes[t2.name] < 4 && aways[t1.name] < 4) {
                                        homeTeam = t2;
                                        awayTeam = t1;
                                    }

                                    if (homeTeam && awayTeam) {
                                        partner = { home: homeTeam, away: awayTeam };
                                        break;
                                    }
                                }
                            }

                            if (partner) {
                                roundPairs.push(partner);
                                matchedInRound.add(partner.home.name);
                                matchedInRound.add(partner.away.name);
                            } else {
                                stuck = true;
                                break;
                            }
                        }

                        if (!stuck && roundPairs.length === 18) {
                            // Update state
                            roundPairs.forEach(p => {
                                homes[p.home.name]++;
                                aways[p.away.name]++;
                                historicalOpponents[p.home.name].add(p.away.name);
                                historicalOpponents[p.away.name].add(p.home.name);

                                countryCounts[p.home.name][p.away.country] = (countryCounts[p.home.name][p.away.country] || 0) + 1;
                                countryCounts[p.away.name][p.home.country] = (countryCounts[p.away.name][p.home.country] || 0) + 1;
                            });
                            roundSuccess = true;
                            break;
                        }
                    }

                    if (roundSuccess) {
                        schedule[r] = roundPairs;
                    } else {
                        success = false;
                        break;
                    }
                }

                if (success) {
                    this.swissMatches = schedule;
                    return;
                }
            }

            // Fallback cực hạn: Nếu luật quá chặt bị nghẽn, nới lỏng chút để có lịch thi đấu thay vì crash
            this.generateSwissScheduleFallback();
        }

        generateSwissScheduleFallback() {
            // Lịch đơn giản hóa, bỏ qua luật quốc gia nếu bị tắc nghẽn
            const numTeams = 36;
            const numRounds = 8;
            const teams = this.teams;
            let schedule = Array.from({ length: numRounds }, () => []);
            let historicalOpponents = {};
            teams.forEach(t => historicalOpponents[t.name] = new Set());

            for (let r = 0; r < numRounds; r++) {
                let pool = [...teams].sort(() => Math.random() - 0.5);
                for (let i = 0; i < numTeams; i += 2) {
                    let home = pool[i];
                    let away = pool[i + 1];
                    schedule[r].push({ home, away });
                }
            }
            this.swissMatches = schedule;
        }

        // Mô phỏng 1 trận đấu
        simulateMatch(teamA, teamB, isHome) {
            let rA = (teamA.atk * 0.35 + teamA.mid * 0.40 + teamA.def * 0.25);
            let rB = (teamB.atk * 0.35 + teamB.mid * 0.40 + teamB.def * 0.25);
            
            if (isHome) rA += 2.0; // Lợi thế sân nhà thực tế
            else rB += 2.0;
            
            // Hệ số biến thiên ngẫu nhiên (-5.0 đến +5.0) cho form đấu
            let formA = (Math.random() - 0.5) * 10;
            let formB = (Math.random() - 0.5) * 10;
            
            let powerA = rA + formA;
            let powerB = rB + formB;
            
            // Expected goals (xG) cơ bản là 1.35 khi đồng trình, tăng/giảm theo hiệu số sức mạnh chia cho 12
            let xgA = 1.35 + (powerA - teamB.def) / 12;
            let xgB = 1.35 + (powerB - teamA.def) / 12;
            
            // Nén logarit nếu xG vượt quá 2.0 để tránh tỉ số quá đà (hiệu ứng cooling down)
            if (xgA > 2.0) xgA = 2.0 + Math.log(xgA - 1.0);
            if (xgB > 2.0) xgB = 2.0 + Math.log(xgB - 1.0);
            
            // Giới hạn xG tối thiểu là 0.2
            xgA = Math.max(0.2, xgA);
            xgB = Math.max(0.2, xgB);
            
            let goalsA = poissonRandom(xgA);
            let goalsB = poissonRandom(xgB);
            
            // --- NEW: Possession Simulation ---
            let midA = teamA.mid + (isHome ? 2.0 : 0.0);
            let midB = teamB.mid + (!isHome ? 2.0 : 0.0);
            let midDiff = midA - midB;
            let possA = 50 + midDiff * 1.5;
            possA = Math.max(30, Math.min(70, possA)); // Clamped to [30, 70]
            possA = Math.round(possA);
            let possB = 100 - possA;

            // --- NEW: Shots Simulation ---
            let shotsA = Math.max(goalsA, Math.round(xgA * 5 + 3 + Math.random() * 4));
            let shotsB = Math.max(goalsB, Math.round(xgB * 5 + 3 + Math.random() * 4));

            // --- NEW: Goalscorers Simulation ---
            let rosterA = getRosterForTeam(teamA.name, teamA.isUser, teamA.country);
            let rosterB = getRosterForTeam(teamB.name, teamB.isUser, teamB.country);

            let scorersA = [];
            for (let i = 0; i < goalsA; i++) {
                let scorer = selectGoalscorer(rosterA);
                let minute = Math.floor(Math.random() * 90) + 1;
                scorersA.push({ name: scorer.name, minute });
            }
            scorersA.sort((a, b) => a.minute - b.minute);

            let scorersB = [];
            for (let i = 0; i < goalsB; i++) {
                let scorer = selectGoalscorer(rosterB);
                let minute = Math.floor(Math.random() * 90) + 1;
                scorersB.push({ name: scorer.name, minute });
            }
            scorersB.sort((a, b) => a.minute - b.minute);

            return {
                goalsA,
                goalsB,
                xgA: parseFloat(xgA.toFixed(2)),
                xgB: parseFloat(xgB.toFixed(2)),
                possessionA: possA,
                possessionB: possB,
                shotsA,
                shotsB,
                scorersA,
                scorersB
            };
        }

        // Chạy vòng Swiss hiện tại
        runNextSwissRound() {
            if (this.currentRound >= 8) return;
            
            let roundPairs = this.swissMatches[this.currentRound];
            
            roundPairs.forEach(p => {
                let result = this.simulateMatch(p.home, p.away, true);
                p.goalsHome = result.goalsA;
                p.goalsAway = result.goalsB;
                p.xgHome = result.xgA;
                p.xgAway = result.xgB;
                p.possessionHome = result.possessionA;
                p.possessionAway = result.possessionB;
                p.shotsHome = result.shotsA;
                p.shotsAway = result.shotsB;
                p.scorersHome = result.scorersA;
                p.scorersAway = result.scorersB;
                
                // Cập nhật BXH
                this.updateTableStats(p.home.name, p.away.name, p.goalsHome, p.goalsAway);
            });

            this.sortSwissTable();
            this.roundPhase = "results";
        }

        // Chuyển sang vòng Swiss tiếp theo hoặc chuyển sang vòng Playoff
        advanceSwissRound() {
            if (this.roundPhase !== "results") return;
            this.currentRound++;
            this.roundPhase = "setup";

            if (this.currentRound === 8) {
                this.stage = "playoff";
                this.generatePlayoffMatchups();
            }
        }

        // Cập nhật số liệu vào BXH
        updateTableStats(homeName, awayName, goalsH, goalsA) {
            let home = this.swissTable.find(t => t.name === homeName);
            let away = this.swissTable.find(t => t.name === awayName);

            home.played++;
            away.played++;

            home.gf += goalsH;
            home.ga += goalsA;
            away.gf += goalsA;
            away.ga += goalsH;

            home.gd = home.gf - home.ga;
            away.gd = away.gf - away.ga;

            home.opponents.push(awayName);
            away.opponents.push(homeName);

            if (goalsH > goalsA) {
                home.w++;
                home.pts += 3;
                away.l++;
            } else if (goalsH < goalsA) {
                away.w++;
                away.pts += 3;
                home.l++;
            } else {
                home.d++;
                home.pts += 1;
                away.d++;
                away.pts += 1;
            }
        }

        // Sắp xếp BXH Swiss
        sortSwissTable() {
            this.swissTable.sort((a, b) => {
                if (b.pts !== a.pts) return b.pts - a.pts;
                if (b.gd !== a.gd) return b.gd - a.gd;
                if (b.gf !== a.gf) return b.gf - a.gf;
                return Math.random() - 0.5; // fallback ngẫu nhiên
            });
        }

        // Tạo cặp đấu cho vòng Knockout Playoff (9-24)
        generatePlayoffMatchups() {
            let seeded = this.swissTable.slice(8, 16);
            let unseeded = this.swissTable.slice(16, 24);

            let pairs = [
                { seeded: [seeded[0], seeded[1]], unseeded: [unseeded[6], unseeded[7]] },
                { seeded: [seeded[2], seeded[3]], unseeded: [unseeded[4], unseeded[5]] },
                { seeded: [seeded[4], seeded[5]], unseeded: [unseeded[2], unseeded[3]] },
                { seeded: [seeded[6], seeded[7]], unseeded: [unseeded[0], unseeded[1]] }
            ];

            this.playoffMatches = [];
            pairs.forEach(p => {
                let sSorted = [...p.seeded].sort(() => Math.random() - 0.5);
                let uSorted = [...p.unseeded].sort(() => Math.random() - 0.5);

                for (let i = 0; i < 2; i++) {
                    this.playoffMatches.push({
                        homeLeg1: uSorted[i],
                        awayLeg1: sSorted[i],
                        goalsHome1: null,
                        goalsAway1: null,
                        goalsHome2: null,
                        goalsAway2: null,
                        winner: null
                    });
                }
            });
        }

        // Simulate Playoff lượt đi
        simulatePlayoffLeg1() {
            this.playoffMatches.forEach(m => {
                let res = this.simulateMatch(m.homeLeg1, m.awayLeg1, true);
                m.goalsHome1 = res.goalsA;
                m.goalsAway1 = res.goalsB;
                m.xgHome1 = res.xgA;
                m.xgAway1 = res.xgB;
                m.possessionHome1 = res.possessionA;
                m.possessionAway1 = res.possessionB;
                m.shotsHome1 = res.shotsA;
                m.shotsAway1 = res.shotsB;
                m.scorersHome1 = res.scorersA;
                m.scorersAway1 = res.scorersB;
            });
        }

        // Simulate Playoff lượt về + tính winner
        simulatePlayoffLeg2() {
            this.playoffMatches.forEach(m => {
                let res = this.simulateMatch(m.awayLeg1, m.homeLeg1, true);
                m.goalsHome2 = res.goalsA;
                m.goalsAway2 = res.goalsB;
                m.xgHome2 = res.xgA;
                m.xgAway2 = res.xgB;
                m.possessionHome2 = res.possessionA;
                m.possessionAway2 = res.possessionB;
                m.shotsHome2 = res.shotsA;
                m.shotsAway2 = res.shotsB;
                m.scorersHome2 = res.scorersA;
                m.scorersAway2 = res.scorersB;

                let aggA = m.goalsAway1 + m.goalsHome2;
                let aggB = m.goalsHome1 + m.goalsAway2;

                if (aggA > aggB) {
                    m.winner = m.awayLeg1;
                } else if (aggA < aggB) {
                    m.winner = m.homeLeg1;
                } else {
                    m.winner = Math.random() < 0.5 ? m.awayLeg1 : m.homeLeg1;
                    m.penaltyWinner = m.winner.name;
                }
            });
            this.roundPhase = "results";
        }

        // Tiến từ Playoff sang R16
        advancePlayoffToR16() {
            if (this.roundPhase !== "results") return;
            this.stage = "r16";
            this.generateR16Matchups();
            this.roundPhase = "setup";
        }

        // Tạo vòng 1/8 (Round of 16)
        generateR16Matchups() {
            let seeded = this.swissTable.slice(0, 8);
            let unseeded = this.playoffMatches.map(m => m.winner);

            seeded.sort(() => Math.random() - 0.5);
            unseeded.sort(() => Math.random() - 0.5);

            this.r16Matches = [];
            for (let i = 0; i < 8; i++) {
                this.r16Matches.push({
                    homeLeg1: unseeded[i],
                    awayLeg1: seeded[i],
                    goalsHome1: null,
                    goalsAway1: null,
                    goalsHome2: null,
                    goalsAway2: null,
                    winner: null
                });
            }
        }

        // Simulate R16 lượt đi
        simulateR16Leg1() {
            this.r16Matches.forEach(m => {
                let res = this.simulateMatch(m.homeLeg1, m.awayLeg1, true);
                m.goalsHome1 = res.goalsA;
                m.goalsAway1 = res.goalsB;
                m.xgHome1 = res.xgA;
                m.xgAway1 = res.xgB;
                m.possessionHome1 = res.possessionA;
                m.possessionAway1 = res.possessionB;
                m.shotsHome1 = res.shotsA;
                m.shotsAway1 = res.shotsB;
                m.scorersHome1 = res.scorersA;
                m.scorersAway1 = res.scorersB;
            });
        }

        // Simulate R16 lượt về
        simulateR16Leg2() {
            this.r16Matches.forEach(m => {
                let res = this.simulateMatch(m.awayLeg1, m.homeLeg1, true);
                m.goalsHome2 = res.goalsA;
                m.goalsAway2 = res.goalsB;
                m.xgHome2 = res.xgA;
                m.xgAway2 = res.xgB;
                m.possessionHome2 = res.possessionA;
                m.possessionAway2 = res.possessionB;
                m.shotsHome2 = res.shotsA;
                m.shotsAway2 = res.shotsB;
                m.scorersHome2 = res.scorersA;
                m.scorersAway2 = res.scorersB;

                let aggSeeded = m.goalsAway1 + m.goalsHome2;
                let aggUnseeded = m.goalsHome1 + m.goalsAway2;

                if (aggSeeded > aggUnseeded) {
                    m.winner = m.awayLeg1;
                } else if (aggSeeded < aggUnseeded) {
                    m.winner = m.homeLeg1;
                } else {
                    m.winner = Math.random() < 0.5 ? m.awayLeg1 : m.homeLeg1;
                    m.penaltyWinner = m.winner.name;
                }
            });
            this.roundPhase = "results";
        }

        // Tiến từ R16 sang QF
        advanceR16ToQF() {
            if (this.roundPhase !== "results") return;
            this.stage = "qf";
            this.generateQFMatchups();
            this.roundPhase = "setup";
        }

        // Tạo vòng Tứ kết (Quarter-finals)
        generateQFMatchups() {
            let winners = this.r16Matches.map(m => m.winner).sort(() => Math.random() - 0.5);
            this.qfMatches = [];
            for (let i = 0; i < 8; i += 2) {
                this.qfMatches.push({
                    homeLeg1: winners[i],
                    awayLeg1: winners[i+1],
                    goalsHome1: null,
                    goalsAway1: null,
                    goalsHome2: null,
                    goalsAway2: null,
                    winner: null
                });
            }
        }

        // Simulate QF lượt đi
        simulateQFLeg1() {
            this.qfMatches.forEach(m => {
                let res = this.simulateMatch(m.homeLeg1, m.awayLeg1, true);
                m.goalsHome1 = res.goalsA;
                m.goalsAway1 = res.goalsB;
                m.xgHome1 = res.xgA;
                m.xgAway1 = res.xgB;
                m.possessionHome1 = res.possessionA;
                m.possessionAway1 = res.possessionB;
                m.shotsHome1 = res.shotsA;
                m.shotsAway1 = res.shotsB;
                m.scorersHome1 = res.scorersA;
                m.scorersAway1 = res.scorersB;
            });
        }

        // Simulate QF lượt về
        simulateQFLeg2() {
            this.qfMatches.forEach(m => {
                let res = this.simulateMatch(m.awayLeg1, m.homeLeg1, true);
                m.goalsHome2 = res.goalsA;
                m.goalsAway2 = res.goalsB;
                m.xgHome2 = res.xgA;
                m.xgAway2 = res.xgB;
                m.possessionHome2 = res.possessionA;
                m.possessionAway2 = res.possessionB;
                m.shotsHome2 = res.shotsA;
                m.shotsAway2 = res.shotsB;
                m.scorersHome2 = res.scorersA;
                m.scorersAway2 = res.scorersB;

                let aggH = m.goalsHome1 + m.goalsAway2;
                let aggA = m.goalsAway1 + m.goalsHome2;

                if (aggH > aggA) {
                    m.winner = m.homeLeg1;
                } else if (aggH < aggA) {
                    m.winner = m.awayLeg1;
                } else {
                    m.winner = Math.random() < 0.5 ? m.homeLeg1 : m.awayLeg1;
                    m.penaltyWinner = m.winner.name;
                }
            });
            this.roundPhase = "results";
        }

        // Tiến từ QF sang SF
        advanceQFToSF() {
            if (this.roundPhase !== "results") return;
            this.stage = "sf";
            this.generateSFMatchups();
            this.roundPhase = "setup";
        }

        // Tạo vòng Bán kết (Semi-finals)
        generateSFMatchups() {
            let winners = this.qfMatches.map(m => m.winner).sort(() => Math.random() - 0.5);
            this.sfMatches = [];
            for (let i = 0; i < 4; i += 2) {
                this.sfMatches.push({
                    homeLeg1: winners[i],
                    awayLeg1: winners[i+1],
                    goalsHome1: null,
                    goalsAway1: null,
                    goalsHome2: null,
                    goalsAway2: null,
                    winner: null
                });
            }
        }

        // Simulate SF lượt đi
        simulateSFLeg1() {
            this.sfMatches.forEach(m => {
                let res = this.simulateMatch(m.homeLeg1, m.awayLeg1, true);
                m.goalsHome1 = res.goalsA;
                m.goalsAway1 = res.goalsB;
                m.xgHome1 = res.xgA;
                m.xgAway1 = res.xgB;
                m.possessionHome1 = res.possessionA;
                m.possessionAway1 = res.possessionB;
                m.shotsHome1 = res.shotsA;
                m.shotsAway1 = res.shotsB;
                m.scorersHome1 = res.scorersA;
                m.scorersAway1 = res.scorersB;
            });
        }

        // Simulate SF lượt về
        simulateSFLeg2() {
            this.sfMatches.forEach(m => {
                let res = this.simulateMatch(m.awayLeg1, m.homeLeg1, true);
                m.goalsHome2 = res.goalsA;
                m.goalsAway2 = res.goalsB;
                m.xgHome2 = res.xgA;
                m.xgAway2 = res.xgB;
                m.possessionHome2 = res.possessionA;
                m.possessionAway2 = res.possessionB;
                m.shotsHome2 = res.shotsA;
                m.shotsAway2 = res.shotsB;
                m.scorersHome2 = res.scorersA;
                m.scorersAway2 = res.scorersB;

                let aggH = m.goalsHome1 + m.goalsAway2;
                let aggA = m.goalsAway1 + m.goalsHome2;

                if (aggH > aggA) {
                    m.winner = m.homeLeg1;
                } else if (aggH < aggA) {
                    m.winner = m.awayLeg1;
                } else {
                    m.winner = Math.random() < 0.5 ? m.homeLeg1 : m.awayLeg1;
                    m.penaltyWinner = m.winner.name;
                }
            });
            this.roundPhase = "results";
        }

        // Tiến từ SF sang Final
        advanceSFToFinal() {
            if (this.roundPhase !== "results") return;
            this.stage = "final";
            this.generateFinalMatchup();
            this.roundPhase = "setup";
        }

        // Tạo trận chung kết
        generateFinalMatchup() {
            let finalists = this.sfMatches.map(m => m.winner);
            this.finalMatch = {
                teamA: finalists[0],
                teamB: finalists[1],
                goalsA: null,
                goalsB: null,
                winner: null
            };
        }

        // Simulate Chung kết
        simulateFinal() {
            let m = this.finalMatch;
            let res = this.simulateMatch(m.teamA, m.teamB, false);
            m.goalsA = res.goalsA;
            m.goalsB = res.goalsB;
            m.xgA = res.xgA;
            m.xgB = res.xgB;
            m.possessionA = res.possessionA;
            m.possessionB = res.possessionB;
            m.shotsA = res.shotsA;
            m.shotsB = res.shotsB;
            m.scorersA = res.scorersA;
            m.scorersB = res.scorersB;

            if (m.goalsA > m.goalsB) {
                m.winner = m.teamA;
            } else if (m.goalsA < m.goalsB) {
                m.winner = m.teamB;
            } else {
                m.winner = Math.random() < 0.5 ? m.teamA : m.teamB;
                m.penaltyWinner = m.winner.name;
                const winScore = 5;
                const loseScore = Math.random() < 0.5 ? 4 : 3;
                if (m.winner === m.teamA) {
                    m.penaltyA = winScore;
                    m.penaltyB = loseScore;
                } else {
                    m.penaltyA = loseScore;
                    m.penaltyB = winScore;
                }
            }
            this.stage = "ended";
        }

        getTopScorers() {
            const scorerMap = {};
            
            function addScorer(scorer, clubName) {
                if (!scorer || !scorer.name) return;
                const key = `${scorer.name}_${clubName}`;
                if (!scorerMap[key]) {
                    scorerMap[key] = {
                        name: scorer.name,
                        club: clubName,
                        goals: 0
                    };
                }
                scorerMap[key].goals++;
            }

            if (this.swissMatches) {
                this.swissMatches.forEach(round => {
                    round.forEach(p => {
                        if (p.goalsHome !== null && p.goalsHome !== undefined) {
                            if (p.scorersHome) p.scorersHome.forEach(s => addScorer(s, p.home.name));
                            if (p.scorersAway) p.scorersAway.forEach(s => addScorer(s, p.away.name));
                        }
                    });
                });
            }

            function addKnockoutScorers(matches) {
                if (!matches) return;
                matches.forEach(m => {
                    if (m.goalsHome1 !== null && m.goalsHome1 !== undefined) {
                        if (m.scorersHome1) m.scorersHome1.forEach(s => addScorer(s, m.homeLeg1.name));
                        if (m.scorersAway1) m.scorersAway1.forEach(s => addScorer(s, m.awayLeg1.name));
                    }
                    if (m.goalsHome2 !== null && m.goalsHome2 !== undefined) {
                        if (m.scorersHome2) m.scorersHome2.forEach(s => addScorer(s, m.awayLeg1.name));
                        if (m.scorersAway2) m.scorersAway2.forEach(s => addScorer(s, m.homeLeg1.name));
                    }
                });
            }

            addKnockoutScorers(this.playoffMatches);
            addKnockoutScorers(this.r16Matches);
            addKnockoutScorers(this.qfMatches);
            addKnockoutScorers(this.sfMatches);

            if (this.finalMatch && this.finalMatch.goalsA !== null && this.finalMatch.goalsA !== undefined) {
                const fm = this.finalMatch;
                if (fm.scorersA) fm.scorersA.forEach(s => addScorer(s, fm.teamA.name));
                if (fm.scorersB) fm.scorersB.forEach(s => addScorer(s, fm.teamB.name));
            }

            const list = Object.values(scorerMap);
            list.sort((a, b) => {
                if (b.goals !== a.goals) return b.goals - a.goals;
                return a.name.localeCompare(b.name);
            });
            return list;
        }
    }

    // Export to global window namespace
    window.UCLSimulation = UCLSimulation;

})();
