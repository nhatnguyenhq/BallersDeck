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
            { name: "Leão", pos: "FW", rating: 134 },
            { name: "Nkunku", pos: "FW", rating: 134 },
            { name: "Pulisic", pos: "FW", rating: 134 },
            { name: "S. Giménez", pos: "FW", rating: 65 },
            { name: "Füllkrug", pos: "FW", rating: 65 },
            { name: "Saelemaekers", pos: "FW", rating: 65 },
            { name: "Fofana", pos: "MF", rating: 103 },
            { name: "Rabiot", pos: "MF", rating: 103 },
            { name: "Modrić", pos: "MF", rating: 103 },
            { name: "Ricci", pos: "MF", rating: 75 },
            { name: "Loftus-Cheek", pos: "MF", rating: 75 },
            { name: "Jashari", pos: "MF", rating: 75 },
            { name: "Tomori", pos: "DF", rating: 61 },
            { name: "Pavlović", pos: "DF", rating: 61 },
            { name: "Estupiñán", pos: "DF", rating: 61 },
            { name: "De Winter", pos: "DF", rating: 61 },
            { name: "Gabbia", pos: "DF", rating: 25 },
            { name: "Terracciano", pos: "DF", rating: 25 },
            { name: "Bartesaghi", pos: "DF", rating: 25 },
            { name: "Athekame", pos: "DF", rating: 25 },
        ],
        "aekathens": [
            { name: "Koïta", pos: "FW", rating: 134 },
            { name: "Marin", pos: "FW", rating: 134 },
            { name: "Eliasson", pos: "FW", rating: 134 },
            { name: "Kosidis", pos: "FW", rating: 65 },
            { name: "Kutesa", pos: "FW", rating: 65 },
            { name: "Mantalos", pos: "MF", rating: 103 },
            { name: "Pineda", pos: "MF", rating: 103 },
            { name: "Jønsson", pos: "MF", rating: 103 },
            { name: "Gaćinović", pos: "MF", rating: 103 },
            { name: "Jović", pos: "MF", rating: 75 },
            { name: "J. Mário", pos: "MF", rating: 75 },
            { name: "Ljubičić", pos: "MF", rating: 75 },
            { name: "Pereyra", pos: "MF", rating: 75 },
            { name: "Vida", pos: "DF", rating: 61 },
            { name: "Moukoudi", pos: "DF", rating: 61 },
            { name: "Callens", pos: "DF", rating: 61 },
            { name: "Pilios", pos: "DF", rating: 61 },
            { name: "Rota", pos: "DF", rating: 25 },
            { name: "Varga", pos: "DF", rating: 25 },
            { name: "Penrice", pos: "DF", rating: 25 },
            { name: "Relvas", pos: "DF", rating: 25 },
        ],
        "aiksolna": [
            { name: "Celina", pos: "FW", rating: 134 },
            { name: "Ali", pos: "FW", rating: 134 },
            { name: "Gono", pos: "FW", rating: 134 },
            { name: "Beširović", pos: "FW", rating: 65 },
            { name: "Flataker", pos: "FW", rating: 65 },
            { name: "Ellingsen", pos: "MF", rating: 103 },
            { name: "Mujanic", pos: "MF", rating: 103 },
            { name: "Hove", pos: "MF", rating: 103 },
            { name: "Helm", pos: "MF", rating: 75 },
            { name: "Redkin", pos: "MF", rating: 75 },
            { name: "Filling", pos: "MF", rating: 75 },
            { name: "Papagiannopoulos", pos: "DF", rating: 61 },
            { name: "Edh", pos: "DF", rating: 61 },
            { name: "Nissen", pos: "DF", rating: 61 },
            { name: "Thychosen", pos: "DF", rating: 61 },
            { name: "Cissé", pos: "DF", rating: 25 },
            { name: "Csongvai", pos: "DF", rating: 25 },
            { name: "Andersson", pos: "DF", rating: 25 },
        ],
        "apoelnicosia": [
            { name: "Marquinhos", pos: "FW", rating: 134 },
            { name: "Maioli", pos: "FW", rating: 134 },
            { name: "Diamantakos", pos: "FW", rating: 65 },
            { name: "Baldé", pos: "FW", rating: 65 },
            { name: "Meyer", pos: "MF", rating: 103 },
            { name: "Satsias", pos: "MF", rating: 103 },
            { name: "Tomás", pos: "MF", rating: 103 },
            { name: "Dálcio", pos: "MF", rating: 75 },
            { name: "D. Rosa", pos: "MF", rating: 75 },
            { name: "Stafylidis", pos: "DF", rating: 61 },
            { name: "Vitor Meer", pos: "DF", rating: 61 },
            { name: "Bah", pos: "DF", rating: 61 },
            { name: "Nanu", pos: "DF", rating: 25 },
            { name: "Brorsson", pos: "DF", rating: 25 },
            { name: "Laifis", pos: "DF", rating: 25 },
        ],
        "azalkmaar": [
            { name: "Parrott", pos: "FW", rating: 134 },
            { name: "Sadiq", pos: "FW", rating: 134 },
            { name: "Hornkamp", pos: "FW", rating: 65 },
            { name: "Smit", pos: "FW", rating: 65 },
            { name: "Patati", pos: "FW", rating: 65 },
            { name: "Koopmeiners", pos: "MF", rating: 103 },
            { name: "Clasie", pos: "MF", rating: 103 },
            { name: "Mijnans", pos: "MF", rating: 103 },
            { name: "Kasius", pos: "MF", rating: 75 },
            { name: "Šín", pos: "MF", rating: 75 },
            { name: "Maikuma", pos: "DF", rating: 61 },
            { name: "Goes", pos: "DF", rating: 61 },
            { name: "Dekker", pos: "DF", rating: 61 },
            { name: "Penetra", pos: "DF", rating: 25 },
            { name: "De Wit", pos: "DF", rating: 25 },
        ],
        "ajax": [
            { name: "Dolberg", pos: "FW", rating: 134 },
            { name: "Godts", pos: "FW", rating: 134 },
            { name: "Weghorst", pos: "FW", rating: 134 },
            { name: "Ibrahimović", pos: "FW", rating: 65 },
            { name: "Edvardsen", pos: "FW", rating: 65 },
            { name: "Gloukh", pos: "MF", rating: 103 },
            { name: "Klaassen", pos: "MF", rating: 103 },
            { name: "Berghuis", pos: "MF", rating: 103 },
            { name: "Fitz-Jim", pos: "MF", rating: 75 },
            { name: "Bounida", pos: "MF", rating: 75 },
            { name: "Steur", pos: "MF", rating: 75 },
            { name: "Gaaei", pos: "DF", rating: 61 },
            { name: "Itakura", pos: "DF", rating: 61 },
            { name: "Wijndal", pos: "DF", rating: 61 },
            { name: "Regeer", pos: "DF", rating: 61 },
            { name: "Baas", pos: "DF", rating: 61 },
            { name: "Mokio", pos: "DF", rating: 25 },
            { name: "Tomiyasu", pos: "DF", rating: 25 },
            { name: "Šutalo", pos: "DF", rating: 25 },
            { name: "Zinchenko", pos: "DF", rating: 25 },
        ],
        "anderlecht": [
            { name: "Amuzu", pos: "FW", rating: 134 },
            { name: "Vázquez", pos: "FW", rating: 134 },
            { name: "Dreyer", pos: "FW", rating: 134 },
            { name: "Gotō", pos: "FW", rating: 65 },
            { name: "Diouf", pos: "FW", rating: 65 },
            { name: "Ferrari", pos: "FW", rating: 65 },
            { name: "Verschaeren", pos: "MF", rating: 103 },
            { name: "Leoni", pos: "MF", rating: 103 },
            { name: "Rits", pos: "MF", rating: 103 },
            { name: "Stroeykens", pos: "MF", rating: 75 },
            { name: "Matsuzawa", pos: "MF", rating: 75 },
            { name: "Zanka", pos: "DF", rating: 61 },
            { name: "Vertonghen", pos: "DF", rating: 61 },
            { name: "Sardella", pos: "DF", rating: 61 },
            { name: "Augustinsson", pos: "DF", rating: 25 },
            { name: "Janssens", pos: "DF", rating: 25 },
        ],
        "apollonlimassol": [
            { name: "Rodrigues", pos: "FW", rating: 134 },
            { name: "Andreou", pos: "FW", rating: 134 },
            { name: "Duodu", pos: "FW", rating: 134 },
            { name: "Thomas", pos: "FW", rating: 134 },
            { name: "Marques", pos: "FW", rating: 65 },
            { name: "Sagal", pos: "FW", rating: 65 },
            { name: "Dorregaray", pos: "FW", rating: 65 },
            { name: "Brown", pos: "MF", rating: 103 },
            { name: "Assunção", pos: "MF", rating: 103 },
            { name: "Athanasiou", pos: "MF", rating: 103 },
            { name: "Špoljarić", pos: "MF", rating: 75 },
            { name: "Weissbeck", pos: "MF", rating: 75 },
            { name: "Coll", pos: "MF", rating: 75 },
            { name: "Malekkides", pos: "DF", rating: 61 },
            { name: "Shikkis", pos: "DF", rating: 61 },
            { name: "Celebi", pos: "DF", rating: 61 },
            { name: "Vulner", pos: "DF", rating: 25 },
            { name: "Adoni", pos: "DF", rating: 25 },
        ],
        "arsenal": [
            { name: "Saka", pos: "FW", rating: 150 },
            { name: "Havertz", pos: "FW", rating: 145 },
            { name: "Martinelli", pos: "FW", rating: 100 },
            { name: "Trossard", pos: "FW", rating: 107 },
            { name: "Jesus", pos: "FW", rating: 65 },
            { name: "Gyökeres", pos: "FW", rating: 145 },
            { name: "Madueke", pos: "FW", rating: 65 },
            { name: "Dowman", pos: "FW", rating: 43 },
            { name: "Ødegaard", pos: "MF", rating: 103 },
            { name: "Rice", pos: "MF", rating: 140 },
            { name: "Eze", pos: "MF", rating: 103 },
            { name: "Merino", pos: "MF", rating: 95 },
            { name: "Zubimendi", pos: "MF", rating: 75 },
            { name: "Nørgaard", pos: "MF", rating: 23 },
            { name: "Lewis-Skelly", pos: "MF", rating: 36 },
            { name: "Saliba", pos: "DF", rating: 69 },
            { name: "Gabriel", pos: "DF", rating: 98 },
            { name: "White", pos: "DF", rating: 23 },
            { name: "Timber", pos: "DF", rating: 45 },
            { name: "Calafiori", pos: "DF", rating: 33 },
            { name: "Mosquera", pos: "DF", rating: 15 },
            { name: "Hincapié", pos: "DF", rating: 25 },
        ],
                "astonvilla": [
            { name: "Watkins", pos: "FW", rating: 164 },
            { name: "Bailey", pos: "FW", rating: 64 },
            { name: "Rogers", pos: "FW", rating: 144 },
            { name: "Buendía", pos: "FW", rating: 100 },
            { name: "McGinn", pos: "MF", rating: 103 },
            { name: "Tielemans", pos: "MF", rating: 63 },
            { name: "Onana", pos: "MF", rating: 33 },
            { name: "Kamara", pos: "MF", rating: 25 },
            { name: "Barkley", pos: "MF", rating: 45 },
            { name: "Elliott", pos: "MF", rating: 45 },
            { name: "Sancho", pos: "FW", rating: 65 },
            { name: "Abraham", pos: "FW", rating: 65 },
            { name: "Konsa", pos: "DF", rating: 31 },
            { name: "Torres", pos: "DF", rating: 31 },
            { name: "Cash", pos: "DF", rating: 41 },
            { name: "Digne", pos: "DF", rating: 31 },
            { name: "Maatsen", pos: "DF", rating: 25 },
            { name: "Mings", pos: "DF", rating: 25 },
            { name: "Lindelöf", pos: "DF", rating: 15 },
        ],
        "atalanta": [
            { name: "Retegui", pos: "FW", rating: 134 },
            { name: "De Ketelaere", pos: "FW", rating: 134 },
            { name: "Scamacca", pos: "FW", rating: 65 },
            { name: "Zaniolo", pos: "FW", rating: 65 },
            { name: "Ederson", pos: "MF", rating: 103 },
            { name: "Pasalić", pos: "MF", rating: 103 },
            { name: "De Roon", pos: "MF", rating: 103 },
            { name: "Samardžić", pos: "MF", rating: 145 },
            { name: "Brescianini", pos: "MF", rating: 75 },
            { name: "Hien", pos: "DF", rating: 61 },
            { name: "Scalvini", pos: "DF", rating: 61 },
            { name: "Kolašinac", pos: "DF", rating: 61 },
            { name: "Bellanova", pos: "DF", rating: 61 },
            { name: "Ruggeri", pos: "DF", rating: 25 },
            { name: "Djimsiti", pos: "DF", rating: 25 },
            { name: "Tolói", pos: "DF", rating: 25 },
        ],
        "athleticclub": [
            { name: "I. Williams", pos: "FW", rating: 134 },
            { name: "N. Williams", pos: "FW", rating: 134 },
            { name: "Guruzeta", pos: "FW", rating: 134 },
            { name: "Berenguer", pos: "FW", rating: 65 },
            { name: "Djaló", pos: "FW", rating: 65 },
            { name: "Sancet", pos: "MF", rating: 103 },
            { name: "Vesga", pos: "MF", rating: 103 },
            { name: "Galarreta", pos: "MF", rating: 75 },
            { name: "Prados", pos: "MF", rating: 75 },
            { name: "Vivian", pos: "DF", rating: 61 },
            { name: "Paredes", pos: "DF", rating: 61 },
            { name: "Yeray", pos: "DF", rating: 61 },
            { name: "Gorosabel", pos: "DF", rating: 25 },
            { name: "Yuri", pos: "DF", rating: 25 },
        ],
                "atleticomadrid": [
            { name: "Alvarez", pos: "FW", rating: 175 },
            { name: "Sørloth", pos: "FW", rating: 114 },
            { name: "Lookman", pos: "FW", rating: 105 },
            { name: "Almada", pos: "FW", rating: 65 },
            { name: "G. Simeone", pos: "FW", rating: 75 },
            { name: "Koke", pos: "MF", rating: 23 },
            { name: "Llorente", pos: "MF", rating: 63 },
            { name: "Barrios", pos: "MF", rating: 55 },
            { name: "Lemar", pos: "MF", rating: 75 },
            { name: "N. González", pos: "MF", rating: 55 },
            { name: "Giménez", pos: "DF", rating: 41 },
            { name: "Le Normand", pos: "DF", rating: 41 },
            { name: "Molina", pos: "DF", rating: 61 },
            { name: "Hancko", pos: "DF", rating: 25 },
            { name: "Lenglet", pos: "DF", rating: 25 },
            { name: "Ruggeri", pos: "DF", rating: 25 },
        ],
        "bateborisov": [
            { name: "Shulyanskyi", pos: "FW", rating: 134 },
            { name: "Yade", pos: "FW", rating: 134 },
            { name: "Castillo", pos: "FW", rating: 65 },
            { name: "Anufriev", pos: "FW", rating: 65 },
            { name: "Jota", pos: "MF", rating: 103 },
            { name: "Myshnyov", pos: "MF", rating: 103 },
            { name: "Touati", pos: "MF", rating: 103 },
            { name: "Smyrnyi", pos: "MF", rating: 75 },
            { name: "Zhukov", pos: "MF", rating: 75 },
            { name: "Buletsa", pos: "DF", rating: 61 },
            { name: "Drozd", pos: "DF", rating: 61 },
            { name: "Bol", pos: "DF", rating: 61 },
            { name: "Butko", pos: "DF", rating: 25 },
            { name: "Martynov", pos: "DF", rating: 25 },
        ],
                "barcelona": [
            { name: "Yamal", pos: "FW", rating: 199 },
            { name: "Raphinha", pos: "FW", rating: 160 },
            { name: "Lewandowski", pos: "FW", rating: 160 },
            { name: "Pedri", pos: "MF", rating: 88 },
            { name: "Gavi", pos: "MF", rating: 33 },
            { name: "F. de Jong", pos: "MF", rating: 56 },
            { name: "Fermín", pos: "MF", rating: 88 },
            { name: "Casadó", pos: "MF", rating: 25 },
            { name: "Olmo", pos: "FW", rating: 75 },
            { name: "Ferran", pos: "FW", rating: 75 },
            { name: "Rashford", pos: "FW", rating: 75 },
            { name: "Koundé", pos: "DF", rating: 41 },
            { name: "Araújo", pos: "DF", rating: 11 },
            { name: "Cubarsí", pos: "DF", rating: 21 },
            { name: "Balde", pos: "DF", rating: 25 },
            { name: "Cancelo", pos: "DF", rating: 55 },
            { name: "Christensen", pos: "DF", rating: 5 },
        ],
        "basel": [
            { name: "Shaqiri", pos: "FW", rating: 134 },
            { name: "Barry", pos: "FW", rating: 134 },
            { name: "Traoré", pos: "FW", rating: 134 },
            { name: "Fink", pos: "FW", rating: 65 },
            { name: "Ajeti", pos: "FW", rating: 65 },
            { name: "Avdullahu", pos: "MF", rating: 103 },
            { name: "Schmid", pos: "MF", rating: 103 },
            { name: "Leroy", pos: "MF", rating: 75 },
            { name: "Vouilloz", pos: "DF", rating: 61 },
            { name: "Barisic", pos: "DF", rating: 61 },
            { name: "Comas", pos: "DF", rating: 25 },
            { name: "Dräger", pos: "DF", rating: 25 },
        ],
                "bayerleverkusen": [
            { name: "Schick", pos: "FW", rating: 154 },
            { name: "Terrier", pos: "FW", rating: 124 },
            { name: "Ben Seghir", pos: "FW", rating: 65 },
            { name: "Tella", pos: "FW", rating: 75 },
            { name: "Moreira", pos: "FW", rating: 10 },
            { name: "Vázquez", pos: "MF", rating: 43 },
            { name: "Hofmann", pos: "MF", rating: 73 },
            { name: "Tillman", pos: "MF", rating: 103 },
            { name: "Maza", pos: "MF", rating: 100 },
            { name: "Palacios", pos: "MF", rating: 55 },
            { name: "A. García", pos: "MF", rating: 45 },
            { name: "Tapsoba", pos: "DF", rating: 11 },
            { name: "Grimaldo", pos: "DF", rating: 71 },
            { name: "Badé", pos: "DF", rating: 21 },
            { name: "Andrich", pos: "DF", rating: 15 },
            { name: "Tape", pos: "DF", rating: 1 },
            { name: "Quansah", pos: "DF", rating: 15 },
        ],
                "bayernmunich": [
            { name: "Kane", pos: "FW", rating: 275 },
            { name: "Musiala", pos: "FW", rating: 114 },
            { name: "Díaz", pos: "FW", rating: 154 },
            { name: "Olise", pos: "FW", rating: 150 },
            { name: "Gnabry", pos: "FW", rating: 45 },
            { name: "Jackson", pos: "FW", rating: 65 },
            { name: "Karl", pos: "FW", rating: 65 },
            { name: "Kimmich", pos: "MF", rating: 69 },
            { name: "Goretzka", pos: "MF", rating: 43 },
            { name: "A. Pavlović", pos: "MF", rating: 45 },
            { name: "Laimer", pos: "MF", rating: 45 },
            { name: "Upamecano", pos: "DF", rating: 36 },
            { name: "Min-jae", pos: "DF", rating: 21 },
            { name: "Davies", pos: "DF", rating: 41 },
            { name: "Guerreiro", pos: "DF", rating: 20 },
            { name: "Tah", pos: "DF", rating: 25 },
            { name: "Stanišić", pos: "DF", rating: 15 },
            { name: "H. Ito", pos: "DF", rating: 5 },
        ],
        "benfica": [
            { name: "Pavlidis", pos: "FW", rating: 134 },
            { name: "Lukébakio", pos: "FW", rating: 134 },
            { name: "Ivanović", pos: "FW", rating: 134 },
            { name: "Schjelderup", pos: "FW", rating: 65 },
            { name: "Bruma", pos: "FW", rating: 65 },
            { name: "Rafa", pos: "FW", rating: 65 },
            { name: "Sudakov", pos: "MF", rating: 103 },
            { name: "Barreiro", pos: "MF", rating: 103 },
            { name: "Aursnes", pos: "MF", rating: 103 },
            { name: "Ríos", pos: "MF", rating: 75 },
            { name: "Barrenechea", pos: "MF", rating: 75 },
            { name: "Silva", pos: "DF", rating: 61 },
            { name: "Dedić", pos: "DF", rating: 61 },
            { name: "Bah", pos: "DF", rating: 61 },
            { name: "T. Araújo", pos: "DF", rating: 25 },
            { name: "Dahl", pos: "DF", rating: 25 },
        ],
        "besiktas": [
            { name: "Muçi", pos: "FW", rating: 134 },
            { name: "Jota Silva", pos: "FW", rating: 134 },
            { name: "Kılıçsoy", pos: "FW", rating: 134 },
            { name: "Oh Hyeon-gyu", pos: "FW", rating: 65 },
            { name: "Touré", pos: "FW", rating: 65 },
            { name: "Rashica", pos: "MF", rating: 103 },
            { name: "Kökçü", pos: "MF", rating: 103 },
            { name: "Asllani", pos: "MF", rating: 50 },
            { name: "Ndidi", pos: "MF", rating: 103 },
            { name: "Al-Musrati", pos: "MF", rating: 75 },
            { name: "Černý", pos: "MF", rating: 75 },
            { name: "J. Mário", pos: "MF", rating: 75 },
            { name: "Uduokhai", pos: "DF", rating: 61 },
            { name: "Sanuç", pos: "DF", rating: 61 },
            { name: "Murillo", pos: "DF", rating: 61 },
            { name: "Topçu", pos: "DF", rating: 25 },
            { name: "Djaló", pos: "DF", rating: 25 },
            { name: "Yılmaz", pos: "DF", rating: 25 },
        ],
        "bodoglimt": [
            { name: "Høgh", pos: "FW", rating: 134 },
            { name: "Hauge", pos: "FW", rating: 118 },
            { name: "Blomberg", pos: "FW", rating: 134 },
            { name: "Bassi", pos: "FW", rating: 65 },
            { name: "Helmersen", pos: "FW", rating: 65 },
            { name: "Berg", pos: "MF", rating: 103 },
            { name: "Evjen", pos: "MF", rating: 103 },
            { name: "Fet", pos: "MF", rating: 145 },
            { name: "Saltnes", pos: "MF", rating: 75 },
            { name: "Auklend", pos: "MF", rating: 75 },
            { name: "Bjørkan", pos: "DF", rating: 61 },
            { name: "Bjørtuft", pos: "DF", rating: 61 },
            { name: "Nielsen", pos: "DF", rating: 61 },
            { name: "Gundersen", pos: "DF", rating: 25 },
            { name: "Aleesami", pos: "DF", rating: 25 },
        ],
        "bologna": [
            { name: "Orsolini", pos: "FW", rating: 134 },
            { name: "Castro", pos: "FW", rating: 134 },
            { name: "Bernardeschi", pos: "FW", rating: 134 },
            { name: "Odgaard", pos: "FW", rating: 65 },
            { name: "Dallinga", pos: "FW", rating: 65 },
            { name: "Cambiaghi", pos: "FW", rating: 65 },
            { name: "Pobega", pos: "MF", rating: 103 },
            { name: "Freuler", pos: "MF", rating: 103 },
            { name: "Ferguson", pos: "MF", rating: 103 },
            { name: "Sohm", pos: "MF", rating: 75 },
            { name: "Pessina", pos: "MF", rating: 75 },
            { name: "Domínguez", pos: "MF", rating: 75 },
            { name: "Helland", pos: "DF", rating: 61 },
            { name: "Heggem", pos: "DF", rating: 61 },
            { name: "Casale", pos: "DF", rating: 61 },
            { name: "Lykogiannis", pos: "DF", rating: 25 },
            { name: "Lucumí", pos: "DF", rating: 25 },
            { name: "Zortea", pos: "DF", rating: 25 },
        ],
                "borussiadortmund": [
            { name: "Guirassy", pos: "FW", rating: 164 },
            { name: "Beier", pos: "FW", rating: 104 },
            { name: "Adeyemi", pos: "FW", rating: 139 },
            { name: "F. Silva", pos: "FW", rating: 55 },
            { name: "Brandt", pos: "MF", rating: 93 },
            { name: "Inacio", pos: "MF", rating: 33 },
            { name: "Nmecha", pos: "MF", rating: 83 },
            { name: "Jobe", pos: "MF", rating: 85 },
            { name: "Chukwuemeka", pos: "MF", rating: 75 },
            { name: "Svensson", pos: "MF", rating: 35 },
            { name: "Schlotterbeck", pos: "DF", rating: 39 },
            { name: "Anton", pos: "DF", rating: 31 },
            { name: "Couto", pos: "DF", rating: 30 },
            { name: "Bensebaini", pos: "DF", rating: 15 },
            { name: "Ryerson", pos: "DF", rating: 25 },
            { name: "Süle", pos: "DF", rating: 15 },
            { name: "Can", pos: "DF", rating: 10 },
            { name: "Reggiani", pos: "DF", rating: 5 },
        ],
        "borussiamgladbach": [
            { name: "Honorat", pos: "FW", rating: 134 },
            { name: "Kleindienst", pos: "FW", rating: 134 },
            { name: "Hack", pos: "FW", rating: 134 },
            { name: "Machino", pos: "FW", rating: 65 },
            { name: "Ngoumou", pos: "FW", rating: 65 },
            { name: "Stöger", pos: "MF", rating: 103 },
            { name: "Reyna", pos: "MF", rating: 103 },
            { name: "Neuhaus", pos: "MF", rating: 103 },
            { name: "Reitz", pos: "MF", rating: 75 },
            { name: "Engelhardt", pos: "MF", rating: 75 },
            { name: "Diks", pos: "DF", rating: 61 },
            { name: "Elvedi", pos: "DF", rating: 61 },
            { name: "Scally", pos: "DF", rating: 61 },
            { name: "Friedrich", pos: "DF", rating: 25 },
            { name: "Takai", pos: "DF", rating: 25 },
        ],
                "bournemouth": [
            { name: "Kluivert", pos: "FW", rating: 164 },
            { name: "Evanilson", pos: "FW", rating: 164 },
            { name: "Kroupi", pos: "FW", rating: 134 },
            { name: "Christie", pos: "MF", rating: 73 },
            { name: "Scott", pos: "MF", rating: 103 },
            { name: "Tavernier", pos: "MF", rating: 103 },
            { name: "Adli", pos: "MF", rating: 103 },
            { name: "Adams", pos: "MF", rating: 65 },
            { name: "Brooks", pos: "MF", rating: 75 },
            { name: "Cook", pos: "MF", rating: 15 },
            { name: "Ünal", pos: "FW", rating: 35 },
            { name: "Rayan", pos: "FW", rating: 75 },
            { name: "Truffert", pos: "DF", rating: 41 },
            { name: "Jiménez", pos: "DF", rating: 41 },
            { name: "Soler", pos: "DF", rating: 1 },
            { name: "Diakité", pos: "DF", rating: 5 },
            { name: "Hill", pos: "DF", rating: 25 },
        ],
        "braga": [
            { name: "Bruma", pos: "FW", rating: 134 },
            { name: "El Ouazzani", pos: "FW", rating: 134 },
            { name: "R. Horta", pos: "FW", rating: 134 },
            { name: "Fernandes", pos: "FW", rating: 175 },
            { name: "Garbari", pos: "FW", rating: 65 },
            { name: "Moutinho", pos: "MF", rating: 103 },
            { name: "Zalazar", pos: "MF", rating: 103 },
            { name: "Carvalho", pos: "MF", rating: 103 },
            { name: "Horta", pos: "MF", rating: 75 },
            { name: "Gorby", pos: "MF", rating: 75 },
            { name: "Niakaté", pos: "DF", rating: 61 },
            { name: "Bambu", pos: "DF", rating: 61 },
            { name: "Arrey-Mbi", pos: "DF", rating: 61 },
            { name: "Gómez", pos: "DF", rating: 25 },
            { name: "Ribeiro", pos: "DF", rating: 25 },
        ],
        "brest": [
            { name: "Del Castillo", pos: "FW", rating: 134 },
            { name: "Ajorque", pos: "FW", rating: 134 },
            { name: "Mounié", pos: "FW", rating: 134 },
            { name: "Le Douaron", pos: "FW", rating: 65 },
            { name: "Brahimi", pos: "FW", rating: 65 },
            { name: "Camara", pos: "MF", rating: 103 },
            { name: "Lees-Melou", pos: "MF", rating: 103 },
            { name: "Magnetti", pos: "MF", rating: 103 },
            { name: "Martin", pos: "MF", rating: 75 },
            { name: "Doumbia", pos: "MF", rating: 75 },
            { name: "Chardonnet", pos: "DF", rating: 61 },
            { name: "Brassier", pos: "DF", rating: 61 },
            { name: "Lala", pos: "DF", rating: 61 },
            { name: "Locko", pos: "DF", rating: 25 },
            { name: "Zogbé", pos: "DF", rating: 25 },
        ],
                "brighton": [
            { name: "Rutter", pos: "FW", rating: 114 },
            { name: "Welbeck", pos: "FW", rating: 154 },
            { name: "Tzimas", pos: "FW", rating: 44 },
            { name: "Mitoma", pos: "MF", rating: 133 },
            { name: "Baleba", pos: "MF", rating: 53 },
            { name: "O'Riley", pos: "MF", rating: 63 },
            { name: "Gruda", pos: "MF", rating: 3 },
            { name: "Gómez", pos: "MF", rating: 5 },
            { name: "Hinshelwood", pos: "MF", rating: 35 },
            { name: "Ayari", pos: "MF", rating: 89 },
            { name: "Milner", pos: "MF", rating: 23 },
            { name: "Kostoulas", pos: "FW", rating: 23 },
            { name: "Minteh", pos: "FW", rating: 134 },
            { name: "Dunk", pos: "DF", rating: 34 },
            { name: "De Cuyper", pos: "DF", rating: 50 },
            { name: "Kadıoğlu", pos: "DF", rating: 50 },
            { name: "Boscagli", pos: "DF", rating: 1 },
            { name: "Wieffer", pos: "DF", rating: 25 },
            { name: "Igor Julio", pos: "DF", rating: 25 },
            { name: "Webster", pos: "DF", rating: 5 },
        ],
        "brondby": [
            { name: "Omoijuanfo", pos: "FW", rating: 134 },
            { name: "Suzuki", pos: "FW", rating: 134 },
            { name: "Kvistgaarden", pos: "FW", rating: 134 },
            { name: "Schwartau", pos: "FW", rating: 65 },
            { name: "Vallys", pos: "FW", rating: 65 },
            { name: "Wass", pos: "MF", rating: 103 },
            { name: "Radosevic", pos: "MF", rating: 103 },
            { name: "Nartey", pos: "MF", rating: 75 },
            { name: "Greve", pos: "MF", rating: 75 },
            { name: "Rasmussen", pos: "DF", rating: 61 },
            { name: "Tshiembe", pos: "DF", rating: 61 },
            { name: "Lauritsen", pos: "DF", rating: 61 },
            { name: "Divkovic", pos: "DF", rating: 25 },
            { name: "Klaiber", pos: "DF", rating: 25 },
        ],
        "cfrcluj": [
            { name: "Bîrligea", pos: "FW", rating: 134 },
            { name: "Michael", pos: "FW", rating: 134 },
            { name: "Deac", pos: "FW", rating: 134 },
            { name: "Korenica", pos: "FW", rating: 65 },
            { name: "Postolachi", pos: "FW", rating: 65 },
            { name: "Tachtsidis", pos: "MF", rating: 103 },
            { name: "Muhar", pos: "MF", rating: 103 },
            { name: "Keita", pos: "MF", rating: 103 },
            { name: "Fică", pos: "MF", rating: 75 },
            { name: "Artean", pos: "MF", rating: 75 },
            { name: "Camora", pos: "DF", rating: 61 },
            { name: "Boben", pos: "DF", rating: 61 },
            { name: "Kresic", pos: "DF", rating: 61 },
            { name: "Mogoș", pos: "DF", rating: 25 },
            { name: "Ajeti", pos: "DF", rating: 25 },
        ],
        "celtic": [
            { name: "Furuhashi", pos: "FW", rating: 134 },
            { name: "Maeda", pos: "FW", rating: 134 },
            { name: "Kühn", pos: "FW", rating: 134 },
            { name: "Idah", pos: "FW", rating: 65 },
            { name: "Yang", pos: "FW", rating: 65 },
            { name: "McGregor", pos: "MF", rating: 103 },
            { name: "Hatate", pos: "MF", rating: 103 },
            { name: "Engels", pos: "MF", rating: 103 },
            { name: "Bernardo", pos: "MF", rating: 75 },
            { name: "Forrest", pos: "MF", rating: 75 },
            { name: "Carter-Vickers", pos: "DF", rating: 61 },
            { name: "Scales", pos: "DF", rating: 61 },
            { name: "Johnston", pos: "DF", rating: 61 },
            { name: "Taylor", pos: "DF", rating: 25 },
            { name: "Trusty", pos: "DF", rating: 25 },
            { name: "Ralston", pos: "DF", rating: 25 },
        ],
                "chelsea": [
            { name: "Palmer", pos: "FW", rating: 177 },
            { name: "João Pedro", pos: "FW", rating: 203 },
            { name: "Neto", pos: "FW", rating: 134 },
            { name: "Estêvão", pos: "FW", rating: 156 },
            { name: "Enzo", pos: "MF", rating: 123 },
            { name: "Caicedo", pos: "MF", rating: 78 },
            { name: "Lavia", pos: "MF", rating: 26 },
            { name: "Santos", pos: "MF", rating: 26 },
            { name: "Essugo", pos: "MF", rating: 5 },
            { name: "Gittens", pos: "FW", rating: 55 },
            { name: "Guiu", pos: "FW", rating: 55 },
            { name: "Delap", pos: "FW", rating: 50 },
            { name: "Garnacho", pos: "FW", rating: 65 },
            { name: "James", pos: "DF", rating: 61 },
            { name: "Colwill", pos: "DF", rating: 44 },
            { name: "Fofana", pos: "DF", rating: 23 },
            { name: "Cucurella", pos: "DF", rating: 49 },
            { name: "Hato", pos: "DF", rating: 30 },
            { name: "Gusto", pos: "DF", rating: 25 },
            { name: "Badiashile", pos: "DF", rating: 15 },
            { name: "Adarabioyo", pos: "DF", rating: 5 },
            { name: "Chalobah", pos: "DF", rating: 15 },
            { name: "M. Sarr", pos: "DF", rating: 5 },
        ],
        "clubbrugge": [
            { name: "Skov Olsen", pos: "FW", rating: 134 },
            { name: "Thiago", pos: "FW", rating: 134 },
            { name: "Nilsson", pos: "FW", rating: 134 },
            { name: "Jutglà", pos: "FW", rating: 65 },
            { name: "Talbi", pos: "FW", rating: 65 },
            { name: "Vanaken", pos: "MF", rating: 103 },
            { name: "Onyedika", pos: "MF", rating: 103 },
            { name: "Vetlesen", pos: "MF", rating: 75 },
            { name: "Nielsen", pos: "MF", rating: 75 },
            { name: "Mechele", pos: "DF", rating: 61 },
            { name: "Ordoñez", pos: "DF", rating: 61 },
            { name: "De Cuyper", pos: "DF", rating: 61 },
            { name: "Seys", pos: "DF", rating: 25 },
            { name: "Sabbe", pos: "DF", rating: 25 },
        ],
        "como": [
            { name: "Belotti", pos: "FW", rating: 134 },
            { name: "Cutrone", pos: "FW", rating: 134 },
            { name: "Strefezza", pos: "FW", rating: 134 },
            { name: "Cunha", pos: "FW", rating: 175 },
            { name: "Cerri", pos: "FW", rating: 65 },
            { name: "Paz", pos: "MF", rating: 103 },
            { name: "Perrone", pos: "MF", rating: 103 },
            { name: "Sergi Roberto", pos: "MF", rating: 103 },
            { name: "Engelhardt", pos: "MF", rating: 75 },
            { name: "Kone", pos: "MF", rating: 75 },
            { name: "Varane", pos: "DF", rating: 61 },
            { name: "Kempf", pos: "DF", rating: 61 },
            { name: "Moreno", pos: "DF", rating: 61 },
            { name: "Dossena", pos: "DF", rating: 25 },
            { name: "Iovine", pos: "DF", rating: 25 },
        ],
        "crvenazvedza": [
            { name: "Olayinka", pos: "FW", rating: 134 },
            { name: "Katai", pos: "FW", rating: 134 },
            { name: "Duarte", pos: "FW", rating: 134 },
            { name: "Ndiaye", pos: "FW", rating: 65 },
            { name: "Krunic", pos: "FW", rating: 65 },
            { name: "Arnautović", pos: "FW", rating: 65 },
            { name: "Ivanic", pos: "MF", rating: 103 },
            { name: "Hwang", pos: "MF", rating: 103 },
            { name: "Elšnik", pos: "MF", rating: 103 },
            { name: "Ilic", pos: "MF", rating: 75 },
            { name: "Kanga", pos: "MF", rating: 75 },
            { name: "Dragović", pos: "DF", rating: 61 },
            { name: "Spajić", pos: "DF", rating: 61 },
            { name: "Seol", pos: "DF", rating: 61 },
            { name: "Rodić", pos: "DF", rating: 25 },
            { name: "Mimović", pos: "DF", rating: 25 },
        ],
        "derrycity": [
            { name: "Mullen", pos: "FW", rating: 134 },
            { name: "Hoban", pos: "FW", rating: 134 },
            { name: "Duffy", pos: "FW", rating: 65 },
            { name: "Diallo", pos: "FW", rating: 65 },
            { name: "McEleney", pos: "MF", rating: 103 },
            { name: "O'Reilly", pos: "MF", rating: 118 },
            { name: "Patching", pos: "MF", rating: 75 },
            { name: "Doherty", pos: "MF", rating: 75 },
            { name: "Boyce", pos: "DF", rating: 61 },
            { name: "McJannet", pos: "DF", rating: 61 },
            { name: "Coll", pos: "DF", rating: 61 },
            { name: "Dummigan", pos: "DF", rating: 25 },
            { name: "Kelly", pos: "DF", rating: 25 },
        ],
        "dinamozagreb": [
            { name: "Petković", pos: "FW", rating: 134 },
            { name: "Baturina", pos: "FW", rating: 134 },
            { name: "Hoxha", pos: "FW", rating: 134 },
            { name: "Kulenović", pos: "FW", rating: 65 },
            { name: "Stojković", pos: "FW", rating: 65 },
            { name: "Mišić", pos: "MF", rating: 103 },
            { name: "Sučić", pos: "MF", rating: 103 },
            { name: "Ademi", pos: "MF", rating: 75 },
            { name: "Kacavenda", pos: "MF", rating: 75 },
            { name: "Theophile-Catherine", pos: "DF", rating: 61 },
            { name: "Bernauer", pos: "DF", rating: 61 },
            { name: "Mmaee", pos: "DF", rating: 61 },
            { name: "Pierre-Gabriel", pos: "DF", rating: 25 },
            { name: "Ristovski", pos: "DF", rating: 25 },
        ],
        "dynamokyiv": [
            { name: "Vanat", pos: "FW", rating: 134 },
            { name: "Yarmolenko", pos: "FW", rating: 134 },
            { name: "Voloshyn", pos: "FW", rating: 65 },
            { name: "Kabaev", pos: "FW", rating: 65 },
            { name: "Shaparenko", pos: "MF", rating: 103 },
            { name: "Brazhko", pos: "MF", rating: 103 },
            { name: "Buyalskyi", pos: "MF", rating: 75 },
            { name: "Pikhalyonok", pos: "MF", rating: 75 },
            { name: "Popov", pos: "DF", rating: 61 },
            { name: "Mykhavko", pos: "DF", rating: 61 },
            { name: "Tymchyk", pos: "DF", rating: 61 },
            { name: "Dubinchak", pos: "DF", rating: 25 },
            { name: "Karavayev", pos: "DF", rating: 25 },
        ],
        "eintrachtfrankfurt": [
            { name: "Matanovic", pos: "FW", rating: 134 },
            { name: "Chaïbi", pos: "FW", rating: 65 },
            { name: "Knauff", pos: "FW", rating: 65 },
            { name: "Skhiri", pos: "MF", rating: 103 },
            { name: "Götze", pos: "MF", rating: 103 },
            { name: "Larsson", pos: "MF", rating: 75 },
            { name: "Dina Ebimbe", pos: "MF", rating: 75 },
            { name: "Koch", pos: "DF", rating: 61 },
            { name: "Pacho", pos: "DF", rating: 61 },
            { name: "Tuta", pos: "DF", rating: 61 },
            { name: "Theate", pos: "DF", rating: 25 },
            { name: "Kristensen", pos: "DF", rating: 25 },
        ],
        "elfsborg": [
            { name: "Baidoo", pos: "FW", rating: 134 },
            { name: "Frick", pos: "FW", rating: 134 },
            { name: "Abdullai", pos: "FW", rating: 65 },
            { name: "Jebara", pos: "FW", rating: 65 },
            { name: "Ouma", pos: "MF", rating: 103 },
            { name: "Zeneli", pos: "MF", rating: 103 },
            { name: "B. Zeneli", pos: "MF", rating: 103 },
            { name: "Holmén", pos: "MF", rating: 75 },
            { name: "Baldursson", pos: "MF", rating: 75 },
            { name: "Holmén", pos: "DF", rating: 61 },
            { name: "Henriksson", pos: "DF", rating: 61 },
            { name: "Hult", pos: "DF", rating: 61 },
            { name: "Yegbe", pos: "DF", rating: 25 },
            { name: "Bukhari", pos: "DF", rating: 25 },
        ],
        "fccopenhagen": [
            { name: "Cornelius", pos: "FW", rating: 134 },
            { name: "Achouri", pos: "FW", rating: 134 },
            { name: "Elyounoussi", pos: "FW", rating: 134 },
            { name: "Larsson", pos: "FW", rating: 65 },
            { name: "Robert", pos: "FW", rating: 65 },
            { name: "Falk", pos: "MF", rating: 103 },
            { name: "Lerager", pos: "MF", rating: 103 },
            { name: "Clem", pos: "MF", rating: 75 },
            { name: "Claesson", pos: "MF", rating: 75 },
            { name: "Vavro", pos: "DF", rating: 61 },
            { name: "Diks", pos: "DF", rating: 61 },
            { name: "Meling", pos: "DF", rating: 61 },
            { name: "Gabriel", pos: "DF", rating: 150 },
            { name: "Lund", pos: "DF", rating: 25 },
        ],
        "fczurich": [
            { name: "Perea", pos: "FW", rating: 134 },
            { name: "Krasniqi", pos: "FW", rating: 134 },
            { name: "Oko-Flex", pos: "FW", rating: 134 },
            { name: "Afriyie", pos: "FW", rating: 65 },
            { name: "Marchesano", pos: "FW", rating: 65 },
            { name: "Mathew", pos: "MF", rating: 103 },
            { name: "Conde", pos: "MF", rating: 103 },
            { name: "Chouiar", pos: "MF", rating: 75 },
            { name: "Boranijašević", pos: "MF", rating: 75 },
            { name: "Kamberi", pos: "DF", rating: 61 },
            { name: "Gómez", pos: "DF", rating: 61 },
            { name: "Katic", pos: "DF", rating: 61 },
            { name: "Wallner", pos: "DF", rating: 25 },
            { name: "Hodza", pos: "DF", rating: 25 },
        ],
        "fenerbahce": [
            { name: "Džeko", pos: "FW", rating: 134 },
            { name: "Saint-Maximin", pos: "FW", rating: 134 },
            { name: "Muriqi", pos: "FW", rating: 134 },
            { name: "Aktürkoğlu", pos: "FW", rating: 134 },
            { name: "Kahveci", pos: "FW", rating: 65 },
            { name: "Szymański", pos: "FW", rating: 65 },
            { name: "Fred", pos: "MF", rating: 103 },
            { name: "Amrabat", pos: "MF", rating: 103 },
            { name: "Asensio", pos: "MF", rating: 103 },
            { name: "Yüksek", pos: "MF", rating: 75 },
            { name: "Müftüoğlu", pos: "MF", rating: 75 },
            { name: "Söyüncü", pos: "DF", rating: 61 },
            { name: "Djiku", pos: "DF", rating: 61 },
            { name: "Müldür", pos: "DF", rating: 61 },
            { name: "Oosterwolde", pos: "DF", rating: 25 },
            { name: "Osayi-Samuel", pos: "DF", rating: 25 },
            { name: "Skriniar", pos: "DF", rating: 25 },
        ],
        "ferencvaros": [
            { name: "Varga", pos: "FW", rating: 134 },
            { name: "Traoré", pos: "FW", rating: 134 },
            { name: "Saldanha", pos: "FW", rating: 134 },
            { name: "Pesic", pos: "FW", rating: 65 },
            { name: "Zachariassen", pos: "FW", rating: 65 },
            { name: "Abu Fani", pos: "MF", rating: 103 },
            { name: "Maïga", pos: "MF", rating: 103 },
            { name: "Rommens", pos: "MF", rating: 75 },
            { name: "Ben Romdhane", pos: "MF", rating: 75 },
            { name: "Cissé", pos: "DF", rating: 61 },
            { name: "Gustavo", pos: "DF", rating: 61 },
            { name: "Ramírez", pos: "DF", rating: 61 },
            { name: "Botka", pos: "DF", rating: 25 },
            { name: "Makreckis", pos: "DF", rating: 25 },
        ],
        "feyenoord": [
            { name: "Paixão", pos: "FW", rating: 134 },
            { name: "Stengs", pos: "FW", rating: 134 },
            { name: "Ueda", pos: "FW", rating: 134 },
            { name: "Ivanušec", pos: "FW", rating: 65 },
            { name: "Osman", pos: "FW", rating: 65 },
            { name: "Carranza", pos: "FW", rating: 65 },
            { name: "Q. Timber", pos: "MF", rating: 103 },
            { name: "In-beom", pos: "MF", rating: 103 },
            { name: "Zerrouki", pos: "MF", rating: 75 },
            { name: "Milambo", pos: "MF", rating: 75 },
            { name: "Hancko", pos: "DF", rating: 61 },
            { name: "Beelen", pos: "DF", rating: 61 },
            { name: "Geertruida", pos: "DF", rating: 61 },
            { name: "Smál", pos: "DF", rating: 25 },
            { name: "Bueno", pos: "DF", rating: 25 },
        ],
        "fiorentina": [
            { name: "Kean", pos: "FW", rating: 134 },
            { name: "Gudmundsson", pos: "FW", rating: 134 },
            { name: "Sottil", pos: "FW", rating: 134 },
            { name: "Kouamé", pos: "FW", rating: 65 },
            { name: "Beltrán", pos: "FW", rating: 65 },
            { name: "Bove", pos: "MF", rating: 103 },
            { name: "Cataldi", pos: "MF", rating: 103 },
            { name: "Mandragora", pos: "MF", rating: 103 },
            { name: "Adli", pos: "MF", rating: 75 },
            { name: "Richardson", pos: "MF", rating: 75 },
            { name: "Quarta", pos: "DF", rating: 61 },
            { name: "Ranieri", pos: "DF", rating: 61 },
            { name: "Dodô", pos: "DF", rating: 61 },
            { name: "Gosens", pos: "DF", rating: 25 },
            { name: "Pongračić", pos: "DF", rating: 25 },
        ],
        "freiburg": [
            { name: "Doan", pos: "FW", rating: 134 },
            { name: "Grifo", pos: "FW", rating: 134 },
            { name: "Gregoritsch", pos: "FW", rating: 134 },
            { name: "Dinkçi", pos: "FW", rating: 65 },
            { name: "Höler", pos: "FW", rating: 65 },
            { name: "Eggestein", pos: "MF", rating: 103 },
            { name: "Höfler", pos: "MF", rating: 103 },
            { name: "Röhl", pos: "MF", rating: 75 },
            { name: "Osterhage", pos: "MF", rating: 75 },
            { name: "Ginter", pos: "DF", rating: 61 },
            { name: "Lienhart", pos: "DF", rating: 61 },
            { name: "Günter", pos: "DF", rating: 61 },
            { name: "Kübler", pos: "DF", rating: 25 },
            { name: "Sildillia", pos: "DF", rating: 25 },
        ],
        "galatasaray": [
            { name: "Sané", pos: "FW", rating: 134 },
            { name: "Osimhen", pos: "FW", rating: 145 },
            { name: "Icardi", pos: "FW", rating: 134 },
            { name: "Barış Alper", pos: "FW", rating: 65 },
            { name: "Batshuayi", pos: "FW", rating: 65 },
            { name: "Akgün", pos: "FW", rating: 65 },
            { name: "Torreira", pos: "MF", rating: 103 },
            { name: "Gabriel Sara", pos: "MF", rating: 103 },
            { name: "Gündoğan", pos: "MF", rating: 103 },
            { name: "Demirbay", pos: "MF", rating: 75 },
            { name: "Kutlu", pos: "MF", rating: 75 },
            { name: "Bardakcı", pos: "DF", rating: 61 },
            { name: "Nelsson", pos: "DF", rating: 61 },
            { name: "Sánchez", pos: "DF", rating: 61 },
            { name: "Jakobs", pos: "DF", rating: 25 },
            { name: "Ayhan", pos: "DF", rating: 25 },
        ],
        "genk": [
            { name: "Tolu", pos: "FW", rating: 134 },
            { name: "Sor", pos: "FW", rating: 134 },
            { name: "Steuckers", pos: "FW", rating: 134 },
            { name: "Karetsas", pos: "FW", rating: 65 },
            { name: "Zeqiri", pos: "FW", rating: 65 },
            { name: "Heynen", pos: "MF", rating: 103 },
            { name: "Hrošovský", pos: "MF", rating: 103 },
            { name: "El Khannouss", pos: "MF", rating: 75 },
            { name: "Banga", pos: "MF", rating: 75 },
            { name: "Cuesta", pos: "DF", rating: 61 },
            { name: "Smets", pos: "DF", rating: 61 },
            { name: "Kayembe", pos: "DF", rating: 61 },
            { name: "Fadera", pos: "DF", rating: 25 },
            { name: "El Ouahdi", pos: "DF", rating: 25 },
        ],
        "hajduksplit": [
            { name: "Livaja", pos: "FW", rating: 134 },
            { name: "Sahiti", pos: "FW", rating: 134 },
            { name: "Kalinić", pos: "FW", rating: 134 },
            { name: "Dajaku", pos: "FW", rating: 65 },
            { name: "Bamba", pos: "FW", rating: 65 },
            { name: "Rakitić", pos: "MF", rating: 103 },
            { name: "Krovinović", pos: "MF", rating: 103 },
            { name: "Pukštas", pos: "MF", rating: 75 },
            { name: "Sigur", pos: "MF", rating: 75 },
            { name: "Šarlija", pos: "DF", rating: 61 },
            { name: "Uremović", pos: "DF", rating: 61 },
            { name: "Melnjak", pos: "DF", rating: 61 },
            { name: "Diallo", pos: "DF", rating: 25 },
            { name: "Elez", pos: "DF", rating: 25 },
        ],
        "hamburgsv": [
            { name: "Glatzel", pos: "FW", rating: 134 },
            { name: "Königsdörffer", pos: "FW", rating: 134 },
            { name: "Dompé", pos: "FW", rating: 134 },
            { name: "Jatta", pos: "FW", rating: 65 },
            { name: "Németh", pos: "FW", rating: 65 },
            { name: "Reis", pos: "MF", rating: 103 },
            { name: "Poreba", pos: "MF", rating: 103 },
            { name: "Elfadli", pos: "MF", rating: 103 },
            { name: "Carvalho", pos: "MF", rating: 75 },
            { name: "Richter", pos: "MF", rating: 75 },
            { name: "Schonlau", pos: "DF", rating: 61 },
            { name: "Hadžikadunić", pos: "DF", rating: 61 },
            { name: "Muheim", pos: "DF", rating: 61 },
            { name: "Van der Brempt", pos: "DF", rating: 25 },
            { name: "Hefti", pos: "DF", rating: 25 },
        ],
        "hearts": [
            { name: "Shankland", pos: "FW", rating: 134 },
            { name: "Vargas", pos: "FW", rating: 134 },
            { name: "Oda", pos: "FW", rating: 134 },
            { name: "Boyce", pos: "FW", rating: 65 },
            { name: "Dhanda", pos: "FW", rating: 65 },
            { name: "Baningime", pos: "MF", rating: 103 },
            { name: "Spittal", pos: "MF", rating: 103 },
            { name: "Devlin", pos: "MF", rating: 103 },
            { name: "Boateng", pos: "MF", rating: 75 },
            { name: "Grant", pos: "MF", rating: 75 },
            { name: "Kingsley", pos: "DF", rating: 61 },
            { name: "Halkett", pos: "DF", rating: 61 },
            { name: "Kent", pos: "DF", rating: 61 },
            { name: "Rowles", pos: "DF", rating: 25 },
            { name: "Penrice", pos: "DF", rating: 25 },
            { name: "Oyegoke", pos: "DF", rating: 25 },
        ],
        "hoffenheim": [
            { name: "Kramarić", pos: "FW", rating: 134 },
            { name: "Bülter", pos: "FW", rating: 134 },
            { name: "Hložek", pos: "FW", rating: 134 },
            { name: "Berisha", pos: "FW", rating: 65 },
            { name: "Tabaković", pos: "FW", rating: 65 },
            { name: "Stach", pos: "MF", rating: 103 },
            { name: "Grillitsch", pos: "MF", rating: 103 },
            { name: "Prömel", pos: "MF", rating: 103 },
            { name: "Geiger", pos: "MF", rating: 75 },
            { name: "Tohumcu", pos: "MF", rating: 75 },
            { name: "Kadeřábek", pos: "DF", rating: 61 },
            { name: "Akpoguma", pos: "DF", rating: 61 },
            { name: "Nsoki", pos: "DF", rating: 61 },
            { name: "Drechsler", pos: "DF", rating: 25 },
            { name: "Jurásek", pos: "DF", rating: 25 },
            { name: "Gendrey", pos: "DF", rating: 25 },
        ],
                "intermilan": [
            { name: "Lautaro", pos: "FW", rating: 184 },
            { name: "Thuram", pos: "FW", rating: 174 },
            { name: "Pio Esposito", pos: "FW", rating: 8 },
            { name: "Barella", pos: "MF", rating: 83 },
            { name: "Çalhanoğlu", pos: "MF", rating: 83 },
            { name: "Mkhitaryan", pos: "MF", rating: 63 },
            { name: "Frattesi", pos: "MF", rating: 35 },
            { name: "Zieliński", pos: "MF", rating: 75 },
            { name: "Sucic", pos: "MF", rating: 30 },
            { name: "Topalovic", pos: "MF", rating: 3 },
            { name: "Bastoni", pos: "DF", rating: 31 },
            { name: "Dimarco", pos: "DF", rating: 21 },
            { name: "Acerbi", pos: "DF", rating: 21 },
            { name: "Darmian", pos: "DF", rating: 5 },
            { name: "Bisseck", pos: "DF", rating: 5 },
            { name: "De Vrij", pos: "DF", rating: 5 },
        ],
        "istanbulbasaksehir": [
            { name: "Piątek", pos: "FW", rating: 134 },
            { name: "Figueiredo", pos: "FW", rating: 134 },
            { name: "Gürler", pos: "FW", rating: 134 },
            { name: "Keny", pos: "FW", rating: 65 },
            { name: "Pelkas", pos: "FW", rating: 65 },
            { name: "Özcan", pos: "MF", rating: 103 },
            { name: "İlkhan", pos: "MF", rating: 103 },
            { name: "Ergün", pos: "MF", rating: 103 },
            { name: "Kemen", pos: "MF", rating: 75 },
            { name: "Türüç", pos: "MF", rating: 75 },
            { name: "Duarte", pos: "DF", rating: 61 },
            { name: "Opoku", pos: "DF", rating: 61 },
            { name: "Lima", pos: "DF", rating: 61 },
            { name: "Ba", pos: "DF", rating: 25 },
            { name: "Şahiner", pos: "DF", rating: 25 },
        ],
        "juventus": [
            { name: "Vlahović", pos: "FW", rating: 134 },
            { name: "Yıldız", pos: "FW", rating: 134 },
            { name: "Conceição", pos: "FW", rating: 134 },
            { name: "Milik", pos: "FW", rating: 65 },
            { name: "Weah", pos: "FW", rating: 65 },
            { name: "González", pos: "FW", rating: 65 },
            { name: "Koopmeiners", pos: "MF", rating: 103 },
            { name: "Luiz", pos: "MF", rating: 103 },
            { name: "Thuram", pos: "MF", rating: 103 },
            { name: "Locatelli", pos: "MF", rating: 75 },
            { name: "McKennie", pos: "MF", rating: 75 },
            { name: "Fagioli", pos: "MF", rating: 75 },
            { name: "Bremer", pos: "DF", rating: 61 },
            { name: "Cambiaso", pos: "DF", rating: 61 },
            { name: "Kalulu", pos: "DF", rating: 61 },
            { name: "Gatti", pos: "DF", rating: 61 },
            { name: "Cabal", pos: "DF", rating: 25 },
            { name: "Savona", pos: "DF", rating: 25 },
        ],
        "lask": [
            { name: "Ljubičić", pos: "FW", rating: 134 },
            { name: "Usor", pos: "FW", rating: 134 },
            { name: "Mustapha", pos: "FW", rating: 134 },
            { name: "Pintor", pos: "FW", rating: 65 },
            { name: "Kone", pos: "FW", rating: 65 },
            { name: "Zulj", pos: "MF", rating: 103 },
            { name: "Horvath", pos: "MF", rating: 103 },
            { name: "Beriša", pos: "MF", rating: 103 },
            { name: "Bogarde", pos: "MF", rating: 75 },
            { name: "Jovičić", pos: "MF", rating: 75 },
            { name: "Andrade", pos: "DF", rating: 61 },
            { name: "Ziereis", pos: "DF", rating: 61 },
            { name: "Stojković", pos: "DF", rating: 61 },
            { name: "Bello", pos: "DF", rating: 25 },
            { name: "Talovierov", pos: "DF", rating: 25 },
        ],
        "lazio": [
            { name: "Zaccagni", pos: "FW", rating: 134 },
            { name: "Dia", pos: "FW", rating: 134 },
            { name: "Noslin", pos: "FW", rating: 65 },
            { name: "Isaksen", pos: "FW", rating: 65 },
            { name: "Pedro", pos: "FW", rating: 150 },
            { name: "Guendouzi", pos: "MF", rating: 103 },
            { name: "Rovella", pos: "MF", rating: 103 },
            { name: "Vecino", pos: "MF", rating: 103 },
            { name: "Dele-Bashiru", pos: "MF", rating: 75 },
            { name: "Castrovilli", pos: "MF", rating: 75 },
            { name: "Romagnoli", pos: "DF", rating: 61 },
            { name: "Gila", pos: "DF", rating: 61 },
            { name: "Tavares", pos: "DF", rating: 61 },
            { name: "Lazzari", pos: "DF", rating: 61 },
            { name: "Patric", pos: "DF", rating: 25 },
            { name: "Pellegrini", pos: "DF", rating: 25 },
            { name: "Marušić", pos: "DF", rating: 25 },
        ],
        "lechpoznan": [
            { name: "Ishak", pos: "FW", rating: 134 },
            { name: "Szymczak", pos: "FW", rating: 134 },
            { name: "Hotić", pos: "FW", rating: 134 },
            { name: "Fiabema", pos: "FW", rating: 65 },
            { name: "Gholizadeh", pos: "FW", rating: 65 },
            { name: "Murawski", pos: "MF", rating: 103 },
            { name: "Sousa", pos: "MF", rating: 103 },
            { name: "Kozubal", pos: "MF", rating: 103 },
            { name: "Ba Loua", pos: "MF", rating: 75 },
            { name: "Jagiełło", pos: "MF", rating: 75 },
            { name: "Milić", pos: "DF", rating: 61 },
            { name: "Salamon", pos: "DF", rating: 61 },
            { name: "Pereira", pos: "DF", rating: 61 },
            { name: "Douglas", pos: "DF", rating: 25 },
            { name: "Gurgul", pos: "DF", rating: 25 },
        ],
        "legiawarsaw": [
            { name: "Pekhart", pos: "FW", rating: 134 },
            { name: "Gual", pos: "FW", rating: 134 },
            { name: "Kramer", pos: "FW", rating: 134 },
            { name: "Morishita", pos: "FW", rating: 65 },
            { name: "Alfarela", pos: "FW", rating: 65 },
            { name: "Josué", pos: "MF", rating: 103 },
            { name: "Kapustka", pos: "MF", rating: 103 },
            { name: "Luquinhas", pos: "MF", rating: 103 },
            { name: "Celhaka", pos: "MF", rating: 75 },
            { name: "Elitim", pos: "MF", rating: 75 },
            { name: "Augustyniak", pos: "DF", rating: 61 },
            { name: "Pankov", pos: "DF", rating: 61 },
            { name: "Ziółkowski", pos: "DF", rating: 61 },
            { name: "Wszołek", pos: "DF", rating: 25 },
            { name: "Vinagre", pos: "DF", rating: 25 },
        ],
        "lens": [
            { name: "Sotoca", pos: "FW", rating: 134 },
            { name: "Nzola", pos: "FW", rating: 134 },
            { name: "Saïd", pos: "FW", rating: 134 },
            { name: "Satriano", pos: "FW", rating: 65 },
            { name: "Ojediran", pos: "FW", rating: 65 },
            { name: "Thomasson", pos: "MF", rating: 103 },
            { name: "Diouf", pos: "MF", rating: 103 },
            { name: "Frankowski", pos: "MF", rating: 103 },
            { name: "Machado", pos: "MF", rating: 75 },
            { name: "Fulgini", pos: "MF", rating: 75 },
            { name: "Mendy", pos: "MF", rating: 75 },
            { name: "Medina", pos: "DF", rating: 61 },
            { name: "Gradit", pos: "DF", rating: 61 },
            { name: "Khusanov", pos: "DF", rating: 25 },
            { name: "Chávez", pos: "DF", rating: 25 },
            { name: "Aguilar", pos: "DF", rating: 25 },
        ],
        "lille": [
            { name: "David", pos: "FW", rating: 134 },
            { name: "Zhegrova", pos: "FW", rating: 134 },
            { name: "Bayo", pos: "FW", rating: 134 },
            { name: "Sahraoui", pos: "FW", rating: 65 },
            { name: "Cabella", pos: "FW", rating: 65 },
            { name: "Fernández-Pardo", pos: "FW", rating: 65 },
            { name: "Gomes", pos: "MF", rating: 103 },
            { name: "André", pos: "MF", rating: 103 },
            { name: "Mukau", pos: "MF", rating: 103 },
            { name: "Bouaddi", pos: "MF", rating: 75 },
            { name: "E. Mbappé", pos: "MF", rating: 75 },
            { name: "Diakité", pos: "DF", rating: 61 },
            { name: "Gudmundsson", pos: "DF", rating: 61 },
            { name: "Meunier", pos: "DF", rating: 61 },
            { name: "Mandi", pos: "DF", rating: 25 },
            { name: "Ismaily", pos: "DF", rating: 25 },
            { name: "Touré", pos: "DF", rating: 25 },
        ],
        "liverpool": [
            { name: "Salah", pos: "FW", rating: 134 },
            { name: "Isak", pos: "FW", rating: 134 },
            { name: "Ekitike", pos: "FW", rating: 122 },
            { name: "Gakpo", pos: "FW", rating: 108 },
            { name: "Chiesa", pos: "FW", rating: 65 },
            { name: "Ngumoha", pos: "FW", rating: 35 },
            { name: "Mac Allister", pos: "MF", rating: 80 },
            { name: "Gravenberch", pos: "MF", rating: 77 },
            { name: "Szoboszlai", pos: "MF", rating: 123 },
            { name: "Wirtz", pos: "MF", rating: 118 },
            { name: "Jones", pos: "MF", rating: 75 },
            { name: "Van Dijk", pos: "DF", rating: 99 },
            { name: "Bradley", pos: "DF", rating: 10 },
            { name: "Frimpong", pos: "DF", rating: 25 },
            { name: "Kerkez", pos: "DF", rating: 25 },
            { name: "V. Munoz", pos: "DF", rating: 2 },
        ],
        "ludogorets": [
            { name: "Cruz", pos: "FW", rating: 134 },
            { name: "Duah", pos: "FW", rating: 134 },
            { name: "Rick", pos: "FW", rating: 134 },
            { name: "Delev", pos: "FW", rating: 65 },
            { name: "Tissera", pos: "FW", rating: 65 },
            { name: "Piotrowski", pos: "MF", rating: 103 },
            { name: "Nedelev", pos: "MF", rating: 103 },
            { name: "Naressi", pos: "MF", rating: 103 },
            { name: "Yordanov", pos: "MF", rating: 75 },
            { name: "Duarte", pos: "MF", rating: 75 },
            { name: "Verdon", pos: "DF", rating: 61 },
            { name: "Almeida", pos: "DF", rating: 61 },
            { name: "Witry", pos: "DF", rating: 61 },
            { name: "Nedyalkov", pos: "DF", rating: 25 },
            { name: "Son", pos: "DF", rating: 25 },
        ],
        "lyon": [
            { name: "Lacazette", pos: "FW", rating: 134 },
            { name: "Mikautadze", pos: "FW", rating: 134 },
            { name: "Orban", pos: "FW", rating: 134 },
            { name: "Endrick", pos: "FW", rating: 175 },
            { name: "Fofana", pos: "FW", rating: 65 },
            { name: "Benrahma", pos: "FW", rating: 65 },
            { name: "Nuamah", pos: "FW", rating: 65 },
            { name: "Matić", pos: "MF", rating: 103 },
            { name: "Tolisso", pos: "MF", rating: 103 },
            { name: "Caqueret", pos: "MF", rating: 103 },
            { name: "Tessmann", pos: "MF", rating: 75 },
            { name: "Ćaleta-Car", pos: "DF", rating: 61 },
            { name: "Niakhaté", pos: "DF", rating: 61 },
            { name: "Mata", pos: "DF", rating: 61 },
            { name: "Tagliafico", pos: "DF", rating: 25 },
            { name: "Maitland-Niles", pos: "DF", rating: 25 },
            { name: "Abner", pos: "DF", rating: 25 },
        ],
        "malmoff": [
            { name: "Kiese Thelin", pos: "FW", rating: 134 },
            { name: "Botheim", pos: "FW", rating: 134 },
            { name: "Ali", pos: "FW", rating: 134 },
            { name: "Bolin", pos: "FW", rating: 65 },
            { name: "Rieks", pos: "FW", rating: 65 },
            { name: "Pena", pos: "MF", rating: 103 },
            { name: "Berg", pos: "MF", rating: 103 },
            { name: "Jørgensen", pos: "MF", rating: 103 },
            { name: "Rosengren", pos: "MF", rating: 75 },
            { name: "Johnsen", pos: "MF", rating: 75 },
            { name: "Jansson", pos: "DF", rating: 61 },
            { name: "Zätterström", pos: "DF", rating: 61 },
            { name: "Stryger Larsen", pos: "DF", rating: 61 },
            { name: "Busanello", pos: "DF", rating: 25 },
            { name: "Moisander", pos: "DF", rating: 25 },
        ],
        "manchestercity": [
            { name: "Haaland", pos: "FW", rating: 222 },
            { name: "Doku", pos: "FW", rating: 134 },
            { name: "Semenyo", pos: "FW", rating: 120 },
            { name: "Cherki", pos: "FW", rating: 140 },
            { name: "Savinho", pos: "FW", rating: 35 },
            { name: "Bobb", pos: "FW", rating: 23 },
            { name: "Marmoush", pos: "FW", rating: 60 },
            { name: "Rodri", pos: "MF", rating: 90 },
            { name: "Reijnders", pos: "MF", rating: 78 },
            { name: "Nunes", pos: "MF", rating: 103 },
            { name: "Kovačić", pos: "MF", rating: 50 },
            { name: "McAtee", pos: "MF", rating: 4 },
            { name: "Foden", pos: "MF", rating: 78 },
            { name: "Nico", pos: "MF", rating: 55 },
            { name: "Dias", pos: "DF", rating: 61 },
            { name: "Gvardiol", pos: "DF", rating: 61 },
            { name: "Akanji", pos: "DF", rating: 23 },
            { name: "Stones", pos: "DF", rating: 34 },
            { name: "O'Reilly", pos: "DF", rating: 118 },
            { name: "Aké", pos: "DF", rating: 25 },
            { name: "Lewis", pos: "DF", rating: 11 },
            { name: "Khusanov", pos: "DF", rating: 22 },
        ],
                "manchesterunited": [
            { name: "Šeško", pos: "FW", rating: 154 },
            { name: "Mbeumo", pos: "FW", rating: 175 },
            { name: "Cunha", pos: "FW", rating: 140 },
            { name: "Fernandes", pos: "MF", rating: 195 },
            { name: "Mainoo", pos: "MF", rating: 103 },
            { name: "Casemiro", pos: "MF", rating: 103 },
            { name: "Ugarte", pos: "MF", rating: 20 },
            { name: "Mount", pos: "MF", rating: 80 },
            { name: "Zirkzee", pos: "FW", rating: 65 },
            { name: "Amad", pos: "FW", rating: 75 },
            { name: "Martínez", pos: "DF", rating: 36 },
            { name: "Dalot", pos: "DF", rating: 45 },
            { name: "Maguire", pos: "DF", rating: 59 },
            { name: "Shaw", pos: "DF", rating: 55 },
            { name: "Yoro", pos: "DF", rating: 20 },
            { name: "De Ligt", pos: "DF", rating: 15 },
            { name: "Mazraoui", pos: "DF", rating: 25 },
        ],
        "maribor": [
            { name: "Jakupović", pos: "FW", rating: 134 },
            { name: "Barišić", pos: "FW", rating: 134 },
            { name: "Beugre", pos: "FW", rating: 134 },
            { name: "Bourlès", pos: "FW", rating: 65 },
            { name: "Kolar", pos: "FW", rating: 65 },
            { name: "Iličić", pos: "MF", rating: 103 },
            { name: "Repas", pos: "MF", rating: 103 },
            { name: "Božić", pos: "MF", rating: 103 },
            { name: "Vrhovec", pos: "MF", rating: 75 },
            { name: "Dizdarević", pos: "MF", rating: 75 },
            { name: "Širvys", pos: "DF", rating: 61 },
            { name: "Vidmar", pos: "DF", rating: 61 },
            { name: "Karić", pos: "DF", rating: 61 },
            { name: "Barišić", pos: "DF", rating: 25 },
            { name: "Milec", pos: "DF", rating: 25 },
        ],
        "marseille": [
            { name: "Greenwood", pos: "FW", rating: 134 },
            { name: "Wahi", pos: "FW", rating: 134 },
            { name: "Rowe", pos: "FW", rating: 134 },
            { name: "Openda", pos: "FW", rating: 134 },
            { name: "Henrique", pos: "FW", rating: 65 },
            { name: "Moumbagna", pos: "FW", rating: 65 },
            { name: "Rabiot", pos: "MF", rating: 103 },
            { name: "Højbjerg", pos: "MF", rating: 103 },
            { name: "Harit", pos: "MF", rating: 103 },
            { name: "Kondogbia", pos: "MF", rating: 75 },
            { name: "Koné", pos: "MF", rating: 75 },
            { name: "Carboni", pos: "MF", rating: 75 },
            { name: "Balerdi", pos: "DF", rating: 61 },
            { name: "Murillo", pos: "DF", rating: 61 },
            { name: "Cornelius", pos: "DF", rating: 61 },
            { name: "Pavard", pos: "DF", rating: 61 },
            { name: "Merlin", pos: "DF", rating: 25 },
            { name: "Brassier", pos: "DF", rating: 25 },
            { name: "Meïté", pos: "DF", rating: 25 },
        ],
        "midtjylland": [
            { name: "Franculino", pos: "FW", rating: 134 },
            { name: "Buksza", pos: "FW", rating: 134 },
            { name: "Osorio", pos: "FW", rating: 134 },
            { name: "Chilufya", pos: "FW", rating: 65 },
            { name: "Gogza", pos: "FW", rating: 65 },
            { name: "Simsir", pos: "MF", rating: 103 },
            { name: "Martínez", pos: "MF", rating: 103 },
            { name: "Castillo", pos: "MF", rating: 103 },
            { name: "Sørensen", pos: "MF", rating: 75 },
            { name: "Byskov", pos: "MF", rating: 75 },
            { name: "Diao", pos: "DF", rating: 61 },
            { name: "Bech", pos: "DF", rating: 61 },
            { name: "Gomes", pos: "DF", rating: 61 },
            { name: "Lee", pos: "DF", rating: 25 },
            { name: "Bak", pos: "DF", rating: 25 },
        ],
        "monaco": [
            { name: "Embolo", pos: "FW", rating: 134 },
            { name: "Balogun", pos: "FW", rating: 134 },
            { name: "Ilenikhena", pos: "FW", rating: 134 },
            { name: "Minamino", pos: "FW", rating: 65 },
            { name: "Akliouche", pos: "FW", rating: 65 },
            { name: "Zakaria", pos: "MF", rating: 103 },
            { name: "Golovin", pos: "MF", rating: 103 },
            { name: "Camara", pos: "MF", rating: 103 },
            { name: "Ben Seghir", pos: "MF", rating: 75 },
            { name: "Matazo", pos: "MF", rating: 75 },
            { name: "Salisu", pos: "DF", rating: 61 },
            { name: "Kehrer", pos: "DF", rating: 61 },
            { name: "Vanderson", pos: "DF", rating: 61 },
            { name: "Singo", pos: "DF", rating: 25 },
            { name: "Caio Henrique", pos: "DF", rating: 25 },
            { name: "Mawissa", pos: "DF", rating: 25 },
        ],
        "napoli": [
            { name: "Lukaku", pos: "FW", rating: 150 },
            { name: "Neres", pos: "FW", rating: 134 },
            { name: "Højlund", pos: "FW", rating: 134 },
            { name: "Politano", pos: "FW", rating: 65 },
            { name: "Simeone", pos: "FW", rating: 65 },
            { name: "Raspadori", pos: "FW", rating: 65 },
            { name: "Lobotka", pos: "MF", rating: 103 },
            { name: "Anguissa", pos: "MF", rating: 103 },
            { name: "McTominay", pos: "MF", rating: 103 },
            { name: "De Bruyne", pos: "MF", rating: 103 },
            { name: "Gilmour", pos: "MF", rating: 75 },
            { name: "Folorunsho", pos: "MF", rating: 75 },
            { name: "Di Lorenzo", pos: "DF", rating: 61 },
            { name: "Rrahmani", pos: "DF", rating: 61 },
            { name: "Buongiorno", pos: "DF", rating: 61 },
            { name: "Olivera", pos: "DF", rating: 25 },
            { name: "Spinazzola", pos: "DF", rating: 25 },
            { name: "Mazzocchi", pos: "DF", rating: 25 },
        ],
                "newcastleunited": [
            { name: "Barnes", pos: "FW", rating: 154 },
            { name: "Woltemade", pos: "FW", rating: 144 },
            { name: "Osula", pos: "FW", rating: 134 },
            { name: "C. Wilson", pos: "FW", rating: 65 },
            { name: "Murphy", pos: "FW", rating: 65 },
            { name: "Wissa", pos: "FW", rating: 77 },
            { name: "Guimarães", pos: "MF", rating: 103 },
            { name: "Joelinton", pos: "MF", rating: 63 },
            { name: "Tonali", pos: "MF", rating: 83 },
            { name: "Ramsey", pos: "MF", rating: 45 },
            { name: "Willock", pos: "MF", rating: 45 },
            { name: "Miley", pos: "MF", rating: 10 },
            { name: "Schär", pos: "DF", rating: 11 },
            { name: "Botman", pos: "DF", rating: 21 },
            { name: "Burn", pos: "DF", rating: 31 },
            { name: "Livramento", pos: "DF", rating: 31 },
            { name: "Hall", pos: "DF", rating: 25 },
            { name: "Thiaw", pos: "DF", rating: 25 },
        ],
        "nice": [
            { name: "Moukoko", pos: "FW", rating: 134 },
            { name: "Guessand", pos: "FW", rating: 134 },
            { name: "Boga", pos: "FW", rating: 134 },
            { name: "Cho", pos: "FW", rating: 65 },
            { name: "Diop", pos: "FW", rating: 65 },
            { name: "Laborde", pos: "FW", rating: 65 },
            { name: "Ndombele", pos: "MF", rating: 103 },
            { name: "Rosario", pos: "MF", rating: 103 },
            { name: "Boudaoui", pos: "MF", rating: 103 },
            { name: "Sanson", pos: "MF", rating: 75 },
            { name: "Ndayishimiye", pos: "MF", rating: 75 },
            { name: "Dante", pos: "DF", rating: 61 },
            { name: "Bombito", pos: "DF", rating: 61 },
            { name: "Clauss", pos: "DF", rating: 61 },
            { name: "Bard", pos: "DF", rating: 25 },
            { name: "Abdelmonem", pos: "DF", rating: 25 },
            { name: "Mendy", pos: "DF", rating: 25 },
        ],
        "nordsjaelland": [
            { name: "Ingvartsen", pos: "FW", rating: 134 },
            { name: "Nygren", pos: "FW", rating: 134 },
            { name: "Osman", pos: "FW", rating: 134 },
            { name: "Harder", pos: "FW", rating: 65 },
            { name: "Hansen", pos: "FW", rating: 65 },
            { name: "Svensson", pos: "MF", rating: 103 },
            { name: "Dorgeles", pos: "MF", rating: 103 },
            { name: "Tverskov", pos: "MF", rating: 103 },
            { name: "Brink", pos: "MF", rating: 75 },
            { name: "Certgh", pos: "MF", rating: 75 },
            { name: "Hey", pos: "DF", rating: 61 },
            { name: "Nagalo", pos: "DF", rating: 61 },
            { name: "Villadsen", pos: "DF", rating: 61 },
            { name: "Frese", pos: "DF", rating: 25 },
            { name: "Marx", pos: "DF", rating: 25 },
        ],
        "olympiakos": [
            { name: "El Kaabi", pos: "FW", rating: 134 },
            { name: "Velde", pos: "FW", rating: 134 },
            { name: "Martins", pos: "FW", rating: 134 },
            { name: "Taremi", pos: "FW", rating: 134 },
            { name: "Masouras", pos: "FW", rating: 65 },
            { name: "Yaremchuk", pos: "FW", rating: 65 },
            { name: "Hezze", pos: "MF", rating: 103 },
            { name: "Chiquinho", pos: "MF", rating: 103 },
            { name: "Stamenic", pos: "MF", rating: 103 },
            { name: "García", pos: "MF", rating: 75 },
            { name: "Oliveira", pos: "MF", rating: 75 },
            { name: "Carmo", pos: "DF", rating: 61 },
            { name: "Retsos", pos: "DF", rating: 61 },
            { name: "Ortega", pos: "DF", rating: 61 },
            { name: "Rodinei", pos: "DF", rating: 25 },
            { name: "Pirola", pos: "DF", rating: 25 },
            { name: "Costinha", pos: "DF", rating: 25 },
        ],
        "paok": [
            { name: "Tissoudali", pos: "FW", rating: 134 },
            { name: "Despodov", pos: "FW", rating: 134 },
            { name: "Zivkovic", pos: "FW", rating: 134 },
            { name: "Chalov", pos: "FW", rating: 65 },
            { name: "Brandon", pos: "FW", rating: 65 },
            { name: "Konstantelias", pos: "MF", rating: 103 },
            { name: "Camara", pos: "MF", rating: 103 },
            { name: "Schwab", pos: "MF", rating: 103 },
            { name: "Ozdoev", pos: "MF", rating: 75 },
            { name: "Bakayoko", pos: "MF", rating: 75 },
            { name: "Kedziora", pos: "DF", rating: 61 },
            { name: "Baba", pos: "DF", rating: 61 },
            { name: "Colley", pos: "DF", rating: 61 },
            { name: "Otto", pos: "DF", rating: 25 },
            { name: "Michailidis", pos: "DF", rating: 25 },
        ],
                "psg": [
            { name: "Dembélé", pos: "FW", rating: 206 },
            { name: "Barcola", pos: "FW", rating: 64 },
            { name: "Doué", pos: "FW", rating: 140 },
            { name: "Kvaratskhelia", pos: "FW", rating: 180 },
            { name: "Kolo Muani", pos: "FW", rating: 25 },
            { name: "G. Ramos", pos: "FW", rating: 60 },
            { name: "Vitinha", pos: "MF", rating: 100 },
            { name: "Neves", pos: "MF", rating: 118 },
            { name: "F. Ruiz", pos: "MF", rating: 99 },
            { name: "Kang-in", pos: "MF", rating: 75 },
            { name: "Mayulu", pos: "MF", rating: 30 },
            { name: "Zaïre-Emery", pos: "MF", rating: 20 },
            { name: "Dro", pos: "MF", rating: 10 },
            { name: "Marquinhos", pos: "DF", rating: 34 },
            { name: "Pacho", pos: "DF", rating: 34 },
            { name: "Hakimi", pos: "DF", rating: 60 },
            { name: "Mendes", pos: "DF", rating: 55 },
            { name: "Beraldo", pos: "DF", rating: 25 },
            { name: "Zabarnyi", pos: "DF", rating: 5 },
            { name: "L. Hernández", pos: "DF", rating: 1 },
        ],
        "psveindhoven": [
            { name: "De Jong", pos: "FW", rating: 134 },
            { name: "Bakayoko", pos: "FW", rating: 134 },
            { name: "Lang", pos: "FW", rating: 134 },
            { name: "Lozano", pos: "FW", rating: 65 },
            { name: "Pepi", pos: "FW", rating: 65 },
            { name: "Driouech", pos: "FW", rating: 65 },
            { name: "Schouten", pos: "MF", rating: 103 },
            { name: "Veerman", pos: "MF", rating: 103 },
            { name: "Tillman", pos: "MF", rating: 103 },
            { name: "Saibari", pos: "MF", rating: 75 },
            { name: "Til", pos: "MF", rating: 75 },
            { name: "Boscagli", pos: "DF", rating: 61 },
            { name: "Flamingo", pos: "DF", rating: 61 },
            { name: "Dest", pos: "DF", rating: 61 },
            { name: "Teze", pos: "DF", rating: 25 },
            { name: "Karsdorp", pos: "DF", rating: 25 },
            { name: "Obispo", pos: "DF", rating: 25 },
        ],
        "panathinaikos": [
            { name: "Ioannidis", pos: "FW", rating: 134 },
            { name: "Tetê", pos: "FW", rating: 134 },
            { name: "Pellistri", pos: "FW", rating: 134 },
            { name: "Šporar", pos: "FW", rating: 65 },
            { name: "Jeremejeff", pos: "FW", rating: 65 },
            { name: "Bakaseta", pos: "MF", rating: 103 },
            { name: "Araão", pos: "MF", rating: 103 },
            { name: "Maksimović", pos: "MF", rating: 103 },
            { name: "Čerin", pos: "MF", rating: 75 },
            { name: "Djuricic", pos: "MF", rating: 75 },
            { name: "Jedvaj", pos: "DF", rating: 61 },
            { name: "Ingason", pos: "DF", rating: 61 },
            { name: "Mladenović", pos: "DF", rating: 61 },
            { name: "Vagiannidis", pos: "DF", rating: 25 },
            { name: "Schenkeveld", pos: "DF", rating: 25 },
        ],
        "partizan": [
            { name: "Saldanha", pos: "FW", rating: 134 },
            { name: "Kalulu", pos: "FW", rating: 134 },
            { name: "Goh", pos: "FW", rating: 134 },
            { name: "Zubairu", pos: "FW", rating: 65 },
            { name: "Jovanović", pos: "FW", rating: 65 },
            { name: "Zahid", pos: "MF", rating: 103 },
            { name: "Natcho", pos: "MF", rating: 103 },
            { name: "Arriaga", pos: "MF", rating: 103 },
            { name: "Kovač", pos: "MF", rating: 75 },
            { name: "Stjepanović", pos: "MF", rating: 75 },
            { name: "Marković", pos: "DF", rating: 61 },
            { name: "Mujakić", pos: "DF", rating: 61 },
            { name: "Antić", pos: "DF", rating: 61 },
            { name: "Đurđević", pos: "DF", rating: 25 },
            { name: "Filipović", pos: "DF", rating: 25 },
        ],
        "porto": [
            { name: "Omorodion", pos: "FW", rating: 134 },
            { name: "Galeno", pos: "FW", rating: 134 },
            { name: "Pepê", pos: "FW", rating: 134 },
            { name: "L. de Jong", pos: "FW", rating: 134 },
            { name: "Namaso", pos: "FW", rating: 65 },
            { name: "Gül", pos: "FW", rating: 65 },
            { name: "Borges", pos: "FW", rating: 65 },
            { name: "Varela", pos: "MF", rating: 103 },
            { name: "Nico", pos: "MF", rating: 103 },
            { name: "Eustáquio", pos: "MF", rating: 103 },
            { name: "Vieira", pos: "MF", rating: 75 },
            { name: "Grujić", pos: "MF", rating: 75 },
            { name: "Mora", pos: "MF", rating: 75 },
            { name: "Pérez", pos: "DF", rating: 61 },
            { name: "Djaló", pos: "DF", rating: 61 },
            { name: "Moura", pos: "DF", rating: 61 },
            { name: "Martim", pos: "DF", rating: 25 },
            { name: "Zé Pedro", pos: "DF", rating: 25 },
            { name: "Wendell", pos: "DF", rating: 25 },
        ],
        "rbleipzig": [
            { name: "Y. Diomande", pos: "FW", rating: 150 },
            { name: "Poulsen", pos: "FW", rating: 65 },
            { name: "Silva", pos: "FW", rating: 65 },
            { name: "Nusa", pos: "MF", rating: 103 },
            { name: "Haidara", pos: "MF", rating: 103 },
            { name: "Kampl", pos: "MF", rating: 103 },
            { name: "Seiwald", pos: "MF", rating: 75 },
            { name: "Elmas", pos: "MF", rating: 75 },
            { name: "Baumgartner", pos: "MF", rating: 75 },
            { name: "Lukeba", pos: "DF", rating: 61 },
            { name: "Orban", pos: "DF", rating: 61 },
            { name: "Raum", pos: "DF", rating: 61 },
            { name: "Henrichs", pos: "DF", rating: 25 },
            { name: "Geertruida", pos: "DF", rating: 25 },
            { name: "Bitshiabu", pos: "DF", rating: 25 },
        ],
        "rangers": [
            { name: "Dessers", pos: "FW", rating: 134 },
            { name: "Cerny", pos: "FW", rating: 134 },
            { name: "Danilo", pos: "FW", rating: 134 },
            { name: "Igamane", pos: "FW", rating: 65 },
            { name: "Matondo", pos: "FW", rating: 65 },
            { name: "Cortés", pos: "FW", rating: 65 },
            { name: "Diomande", pos: "MF", rating: 103 },
            { name: "Barron", pos: "MF", rating: 103 },
            { name: "Hagi", pos: "MF", rating: 103 },
            { name: "Lawrence", pos: "MF", rating: 75 },
            { name: "Raskin", pos: "MF", rating: 75 },
            { name: "Dowell", pos: "MF", rating: 75 },
            { name: "Tavernier", pos: "DF", rating: 61 },
            { name: "Souttar", pos: "DF", rating: 61 },
            { name: "Pröpper", pos: "DF", rating: 61 },
            { name: "Jefte", pos: "DF", rating: 25 },
            { name: "Sterling", pos: "DF", rating: 25 },
            { name: "Kasanwirjo", pos: "DF", rating: 25 },
        ],
        "realbetis": [
            { name: "Vitor Roque", pos: "FW", rating: 134 },
            { name: "Ezzalzouli", pos: "FW", rating: 134 },
            { name: "Ávila", pos: "FW", rating: 134 },
            { name: "Bakambu", pos: "FW", rating: 65 },
            { name: "Juanmi", pos: "FW", rating: 65 },
            { name: "Assane", pos: "FW", rating: 65 },
            { name: "Antony", pos: "FW", rating: 65 },
            { name: "Lo Celso", pos: "MF", rating: 103 },
            { name: "Fornals", pos: "MF", rating: 103 },
            { name: "Carvalho", pos: "MF", rating: 103 },
            { name: "Roca", pos: "MF", rating: 75 },
            { name: "Cardoso", pos: "MF", rating: 75 },
            { name: "Altimira", pos: "MF", rating: 75 },
            { name: "Llorente", pos: "DF", rating: 61 },
            { name: "Natan", pos: "DF", rating: 61 },
            { name: "Bellerín", pos: "DF", rating: 61 },
            { name: "Perraud", pos: "DF", rating: 25 },
            { name: "Sabaly", pos: "DF", rating: 25 },
            { name: "Bartra", pos: "DF", rating: 25 },
        ],
                "realmadrid": [
            { name: "Mbappé", pos: "FW", rating: 205 },
            { name: "Vinícius", pos: "FW", rating: 200 },
            { name: "Rodrygo", pos: "FW", rating: 103 },
            { name: "Bellingham", pos: "MF", rating: 123 },
            { name: "Valverde", pos: "MF", rating: 103 },
            { name: "Tchouaméni", pos: "MF", rating: 53 },
            { name: "B. Silva", pos: "MF", rating: 73 },
            { name: "Güler", pos: "MF", rating: 95 },
            { name: "Ceballos", pos: "MF", rating: 10 },
            { name: "Camavinga", pos: "MF", rating: 20 },
            { name: "Brahim", pos: "MF", rating: 20 },
            { name: "Rüdiger", pos: "DF", rating: 31 },
            { name: "Militão", pos: "DF", rating: 41 },
            { name: "Carvajal", pos: "DF", rating: 11 },
            { name: "Mendy", pos: "DF", rating: 21 },
            { name: "Dumfries", pos: "DF", rating: 41 },
            { name: "Konaté", pos: "DF", rating: 21 },
            { name: "Alexander-Arnold", pos: "DF", rating: 61 },
            { name: "F. García", pos: "DF", rating: 5 },
            { name: "Vallejo", pos: "DF", rating: 1 },
            { name: "Alaba", pos: "DF", rating: 1 },
            { name: "Huijsen", pos: "DF", rating: 39 },
        ],
                "realsociedad": [
            { name: "Oyarzabal", pos: "FW", rating: 174 },
            { name: "Kubo", pos: "FW", rating: 164 },
            { name: "Zakharyan", pos: "FW", rating: 34 },
            { name: "Óskarsson", pos: "FW", rating: 55 },
            { name: "Guedes", pos: "FW", rating: 65 },
            { name: "Barrenetxea", pos: "FW", rating: 65 },
            { name: "Soler", pos: "MF", rating: 103 },
            { name: "B. Méndez", pos: "MF", rating: 53 },
            { name: "Sučić", pos: "MF", rating: 43 },
            { name: "Turrientes", pos: "MF", rating: 45 },
            { name: "Y. Herrera", pos: "MF", rating: 25 },
            { name: "Caleta-Car", pos: "DF", rating: 6 },
            { name: "Zubeldia", pos: "DF", rating: 11 },
            { name: "Aramburu", pos: "DF", rating: 61 },
            { name: "Odriozola", pos: "DF", rating: 15 },
            { name: "A. Munoz", pos: "DF", rating: 5 },
            { name: "Elustondo", pos: "DF", rating: 5 },
        ],
        "rennes": [
            { name: "Kalimuendo", pos: "FW", rating: 134 },
            { name: "Gouiri", pos: "FW", rating: 134 },
            { name: "Gómez", pos: "FW", rating: 134 },
            { name: "Gronbaek", pos: "FW", rating: 65 },
            { name: "Meister", pos: "FW", rating: 65 },
            { name: "Blas", pos: "MF", rating: 103 },
            { name: "Santamaria", pos: "MF", rating: 103 },
            { name: "Kamara", pos: "MF", rating: 103 },
            { name: "Matusiwa", pos: "MF", rating: 75 },
            { name: "James", pos: "MF", rating: 75 },
            { name: "Seidu", pos: "DF", rating: 61 },
            { name: "Østigård", pos: "DF", rating: 61 },
            { name: "Hateboer", pos: "DF", rating: 61 },
            { name: "Truffert", pos: "DF", rating: 25 },
            { name: "Wooh", pos: "DF", rating: 25 },
            { name: "Faye", pos: "DF", rating: 25 },
        ],
        "roma": [
            { name: "Dovbyk", pos: "FW", rating: 134 },
            { name: "Dybala", pos: "FW", rating: 134 },
            { name: "Soulé", pos: "FW", rating: 134 },
            { name: "El Shaarawy", pos: "FW", rating: 65 },
            { name: "Shomurodov", pos: "FW", rating: 65 },
            { name: "Pellegrini", pos: "MF", rating: 103 },
            { name: "Koné", pos: "MF", rating: 103 },
            { name: "Cristante", pos: "MF", rating: 103 },
            { name: "Pisilli", pos: "MF", rating: 75 },
            { name: "Paredes", pos: "MF", rating: 75 },
            { name: "Ndicka", pos: "DF", rating: 61 },
            { name: "Mancini", pos: "DF", rating: 61 },
            { name: "Hermoso", pos: "DF", rating: 61 },
            { name: "Angeliño", pos: "DF", rating: 61 },
            { name: "Çelik", pos: "DF", rating: 25 },
            { name: "Hummels", pos: "DF", rating: 25 },
            { name: "Abdulhamid", pos: "DF", rating: 25 },
            { name: "Tsimikas", pos: "DF", rating: 25 },
        ],
        "rosenborg": [
            { name: "Sæter", pos: "FW", rating: 134 },
            { name: "Nypan", pos: "FW", rating: 134 },
            { name: "Holte", pos: "FW", rating: 134 },
            { name: "Broholm", pos: "FW", rating: 65 },
            { name: "Reitan-Sunde", pos: "FW", rating: 65 },
            { name: "Selnaes", pos: "MF", rating: 103 },
            { name: "Nemcik", pos: "MF", rating: 103 },
            { name: "Väänänen", pos: "MF", rating: 75 },
            { name: "Zecevic", pos: "MF", rating: 75 },
            { name: "Yttergård Jenssen", pos: "DF", rating: 61 },
            { name: "Ceide", pos: "DF", rating: 61 },
            { name: "Pereira", pos: "DF", rating: 61 },
            { name: "Cornic", pos: "DF", rating: 25 },
            { name: "Volden", pos: "DF", rating: 25 },
        ],
        "salzburg": [
            { name: "Konaté", pos: "FW", rating: 134 },
            { name: "Gloukh", pos: "FW", rating: 134 },
            { name: "Dorgeles", pos: "FW", rating: 134 },
            { name: "Daghim", pos: "FW", rating: 65 },
            { name: "Ratkov", pos: "FW", rating: 65 },
            { name: "Baidoo", pos: "FW", rating: 65 },
            { name: "Kjærgaard", pos: "MF", rating: 103 },
            { name: "Bidstrup", pos: "MF", rating: 103 },
            { name: "Gourna-Douath", pos: "MF", rating: 103 },
            { name: "Capaldo", pos: "MF", rating: 75 },
            { name: "Bajcetic", pos: "MF", rating: 75 },
            { name: "Diambou", pos: "MF", rating: 75 },
            { name: "Piatkowski", pos: "DF", rating: 61 },
            { name: "Blank", pos: "DF", rating: 61 },
            { name: "Dedić", pos: "DF", rating: 61 },
            { name: "Terzić", pos: "DF", rating: 25 },
            { name: "Mellberg", pos: "DF", rating: 25 },
        ],
        "sevilla": [
            { name: "Romero", pos: "FW", rating: 134 },
            { name: "Lukebakio", pos: "FW", rating: 134 },
            { name: "Ejuke", pos: "FW", rating: 134 },
            { name: "Iheanacho", pos: "FW", rating: 65 },
            { name: "Peque", pos: "FW", rating: 65 },
            { name: "Suso", pos: "FW", rating: 65 },
            { name: "Saúl", pos: "MF", rating: 103 },
            { name: "Lokonga", pos: "MF", rating: 103 },
            { name: "Sow", pos: "MF", rating: 103 },
            { name: "Agoumé", pos: "MF", rating: 75 },
            { name: "Gudelj", pos: "MF", rating: 75 },
            { name: "Badé", pos: "DF", rating: 61 },
            { name: "Nianzou", pos: "DF", rating: 61 },
            { name: "Carmona", pos: "DF", rating: 61 },
            { name: "Pedrosa", pos: "DF", rating: 25 },
            { name: "Navas", pos: "DF", rating: 25 },
            { name: "Marcao", pos: "DF", rating: 25 },
        ],
        "shakhtardonetsk": [
            { name: "Sikan", pos: "FW", rating: 134 },
            { name: "Traoré", pos: "FW", rating: 134 },
            { name: "Kevin", pos: "FW", rating: 134 },
            { name: "Zubkov", pos: "FW", rating: 65 },
            { name: "Eguinaldo", pos: "FW", rating: 65 },
            { name: "Pedrinho", pos: "FW", rating: 65 },
            { name: "Sudakov", pos: "MF", rating: 103 },
            { name: "Kryskiv", pos: "MF", rating: 103 },
            { name: "Bondarenko", pos: "MF", rating: 103 },
            { name: "Stepanenko", pos: "MF", rating: 75 },
            { name: "Marlon", pos: "MF", rating: 75 },
            { name: "Matviyenko", pos: "DF", rating: 61 },
            { name: "Bondar", pos: "DF", rating: 61 },
            { name: "Konoplia", pos: "DF", rating: 61 },
            { name: "Pedro Henrique", pos: "DF", rating: 25 },
            { name: "Azarovi", pos: "DF", rating: 25 },
        ],
        "shamrockrovers": [
            { name: "Kenny", pos: "FW", rating: 134 },
            { name: "Greene", pos: "FW", rating: 134 },
            { name: "Burke", pos: "FW", rating: 134 },
            { name: "Gaffney", pos: "FW", rating: 65 },
            { name: "McNulty", pos: "FW", rating: 65 },
            { name: "Watts", pos: "MF", rating: 103 },
            { name: "Towell", pos: "MF", rating: 103 },
            { name: "Nugent", pos: "MF", rating: 103 },
            { name: "O'Neill", pos: "MF", rating: 75 },
            { name: "Byrne", pos: "MF", rating: 75 },
            { name: "Cleary", pos: "DF", rating: 61 },
            { name: "Honohan", pos: "DF", rating: 61 },
            { name: "Pico", pos: "DF", rating: 61 },
            { name: "Clarke", pos: "DF", rating: 25 },
            { name: "Kavanagh", pos: "DF", rating: 25 },
        ],
        "slaviaprague": [
            { name: "Chorý", pos: "FW", rating: 134 },
            { name: "Chytil", pos: "FW", rating: 134 },
            { name: "Provod", pos: "FW", rating: 134 },
            { name: "Schranz", pos: "FW", rating: 65 },
            { name: "Jurečka", pos: "FW", rating: 65 },
            { name: "Zafeiris", pos: "MF", rating: 103 },
            { name: "Oscar", pos: "MF", rating: 103 },
            { name: "Prebsl", pos: "MF", rating: 103 },
            { name: "Douděra", pos: "MF", rating: 75 },
            { name: "Sevcik", pos: "MF", rating: 75 },
            { name: "Holeš", pos: "DF", rating: 61 },
            { name: "Zima", pos: "DF", rating: 61 },
            { name: "Diouf", pos: "DF", rating: 61 },
            { name: "Bořil", pos: "DF", rating: 25 },
            { name: "Ogbuehi", pos: "DF", rating: 25 },
        ],
        "sligorovers": [
            { name: "Mata", pos: "FW", rating: 134 },
            { name: "Pearce", pos: "FW", rating: 134 },
            { name: "Radosavljevic", pos: "FW", rating: 65 },
            { name: "Waweru", pos: "FW", rating: 65 },
            { name: "Chapman", pos: "MF", rating: 103 },
            { name: "Morahan", pos: "MF", rating: 103 },
            { name: "Malley", pos: "MF", rating: 75 },
            { name: "Barlow", pos: "MF", rating: 75 },
            { name: "Pijnaker", pos: "DF", rating: 61 },
            { name: "Wiggett", pos: "DF", rating: 61 },
            { name: "Hutchinson", pos: "DF", rating: 61 },
            { name: "Wilson", pos: "DF", rating: 25 },
            { name: "Fitzgerald", pos: "DF", rating: 25 },
        ],
        "spartaprague": [
            { name: "Olatunji", pos: "FW", rating: 134 },
            { name: "Haraslín", pos: "FW", rating: 134 },
            { name: "Tuci", pos: "FW", rating: 134 },
            { name: "Birmančević", pos: "FW", rating: 65 },
            { name: "Krasniqi", pos: "FW", rating: 65 },
            { name: "Laci", pos: "MF", rating: 103 },
            { name: "Kairinen", pos: "MF", rating: 103 },
            { name: "Panák", pos: "MF", rating: 103 },
            { name: "Sadílek", pos: "MF", rating: 75 },
            { name: "Pavelka", pos: "MF", rating: 75 },
            { name: "Vitík", pos: "DF", rating: 61 },
            { name: "Sørensen", pos: "DF", rating: 61 },
            { name: "Rynes", pos: "DF", rating: 61 },
            { name: "Preciado", pos: "DF", rating: 25 },
            { name: "Zelený", pos: "DF", rating: 25 },
        ],
        "sportingcp": [
            { name: "Gyökeres", pos: "FW", rating: 150 },
            { name: "Trincão", pos: "FW", rating: 134 },
            { name: "Edwards", pos: "FW", rating: 134 },
            { name: "Harder", pos: "FW", rating: 65 },
            { name: "Conrad Harder", pos: "FW", rating: 65 },
            { name: "Hjulmand", pos: "MF", rating: 103 },
            { name: "Morita", pos: "MF", rating: 103 },
            { name: "Bragança", pos: "MF", rating: 103 },
            { name: "Quenda", pos: "MF", rating: 75 },
            { name: "Gonçalves", pos: "MF", rating: 75 },
            { name: "Inácio", pos: "DF", rating: 61 },
            { name: "Diomande", pos: "DF", rating: 61 },
            { name: "Debast", pos: "DF", rating: 61 },
            { name: "Araújo", pos: "DF", rating: 25 },
            { name: "Matheus Reis", pos: "DF", rating: 25 },
            { name: "Esgaio", pos: "DF", rating: 25 },
        ],
        "strasbourg": [
            { name: "Emegha", pos: "FW", rating: 134 },
            { name: "Nanasi", pos: "FW", rating: 134 },
            { name: "Bakwa", pos: "FW", rating: 134 },
            { name: "Mara", pos: "FW", rating: 65 },
            { name: "Sebas", pos: "FW", rating: 65 },
            { name: "Andrey Santos", pos: "MF", rating: 103 },
            { name: "Diarra", pos: "MF", rating: 103 },
            { name: "Doukouré", pos: "MF", rating: 75 },
            { name: "Lemaréchal", pos: "MF", rating: 75 },
            { name: "Sow", pos: "DF", rating: 61 },
            { name: "Sylla", pos: "DF", rating: 61 },
            { name: "Sarr", pos: "DF", rating: 61 },
            { name: "Doué", pos: "DF", rating: 150 },
            { name: "Senaya", pos: "DF", rating: 25 },
        ],
        "sturmgraz": [
            { name: "Biereth", pos: "FW", rating: 134 },
            { name: "Jatta", pos: "FW", rating: 134 },
            { name: "Camara", pos: "FW", rating: 134 },
            { name: "Sarkaria", pos: "FW", rating: 65 },
            { name: "Grgić", pos: "FW", rating: 65 },
            { name: "Kiteishvili", pos: "MF", rating: 103 },
            { name: "Horvat", pos: "MF", rating: 103 },
            { name: "Bøving", pos: "MF", rating: 103 },
            { name: "Chukwuani", pos: "MF", rating: 75 },
            { name: "Gorenc-Stanković", pos: "MF", rating: 75 },
            { name: "Lavalee", pos: "DF", rating: 61 },
            { name: "Aiwu", pos: "DF", rating: 61 },
            { name: "Gazibegović", pos: "DF", rating: 61 },
            { name: "Johnston", pos: "DF", rating: 25 },
            { name: "Geyrhofer", pos: "DF", rating: 25 },
        ],
        "stuttgart": [
            { name: "Undav", pos: "FW", rating: 134 },
            { name: "Demirović", pos: "FW", rating: 134 },
            { name: "Touré", pos: "FW", rating: 134 },
            { name: "Leweling", pos: "FW", rating: 65 },
            { name: "Diehl", pos: "FW", rating: 65 },
            { name: "Millot", pos: "MF", rating: 103 },
            { name: "Stiller", pos: "MF", rating: 103 },
            { name: "Karazor", pos: "MF", rating: 103 },
            { name: "Führich", pos: "MF", rating: 75 },
            { name: "Rieder", pos: "MF", rating: 75 },
            { name: "Chabot", pos: "DF", rating: 61 },
            { name: "Rouault", pos: "DF", rating: 61 },
            { name: "Mittelstädt", pos: "DF", rating: 61 },
            { name: "Vagnoman", pos: "DF", rating: 25 },
            { name: "Chase", pos: "DF", rating: 25 },
            { name: "Stergiou", pos: "DF", rating: 25 },
        ],
                "tottenhamhotspur": [
            { name: "Solanke", pos: "FW", rating: 140 },
            { name: "Richarlison", pos: "FW", rating: 140 },
            { name: "Maddison", pos: "MF", rating: 133 },
            { name: "Kulusevski", pos: "MF", rating: 77 },
            { name: "P. Sarr", pos: "MF", rating: 55 },
            { name: "Simons", pos: "MF", rating: 103 },
            { name: "Bentancur", pos: "MF", rating: 75 },
            { name: "Bergvall", pos: "MF", rating: 50 },
            { name: "Odobert", pos: "FW", rating: 65 },
            { name: "Tel", pos: "FW", rating: 65 },
            { name: "Romero", pos: "DF", rating: 80 },
            { name: "Van de Ven", pos: "DF", rating: 80 },
            { name: "Porro", pos: "DF", rating: 61 },
            { name: "Udogie", pos: "DF", rating: 32 },
            { name: "Senesi", pos: "DF", rating: 20 },
            { name: "Van Hecke", pos: "DF", rating: 10 },
            { name: "Spence", pos: "DF", rating: 25 },
            { name: "Davies", pos: "DF", rating: 1 },
            { name: "Danso", pos: "DF", rating: 8 },
            { name: "Robertson", pos: "DF", rating: 25 },
        ],
        "unionberlin": [
            { name: "Hollerbach", pos: "FW", rating: 134 },
            { name: "Jordan", pos: "FW", rating: 134 },
            { name: "Vertessen", pos: "FW", rating: 134 },
            { name: "Volland", pos: "FW", rating: 65 },
            { name: "Prtajin", pos: "FW", rating: 65 },
            { name: "Kemlein", pos: "MF", rating: 103 },
            { name: "Schäfer", pos: "MF", rating: 103 },
            { name: "Khedira", pos: "MF", rating: 103 },
            { name: "Jeong", pos: "MF", rating: 75 },
            { name: "Tousart", pos: "MF", rating: 75 },
            { name: "Habib", pos: "MF", rating: 75 },
            { name: "Doekhi", pos: "DF", rating: 61 },
            { name: "Leite", pos: "DF", rating: 61 },
            { name: "Vogt", pos: "DF", rating: 61 },
            { name: "Trimmel", pos: "DF", rating: 25 },
            { name: "Rothe", pos: "DF", rating: 25 },
            { name: "Querfeld", pos: "DF", rating: 25 },
        ],
        "unionsaintgilloise": [
            { name: "Ivanović", pos: "FW", rating: 134 },
            { name: "Rodriguez", pos: "FW", rating: 134 },
            { name: "Kabangu", pos: "FW", rating: 134 },
            { name: "Fuseini", pos: "FW", rating: 65 },
            { name: "Eckert", pos: "FW", rating: 65 },
            { name: "Sadiki", pos: "MF", rating: 103 },
            { name: "Vanhoutte", pos: "MF", rating: 103 },
            { name: "Ait El Hadj", pos: "MF", rating: 103 },
            { name: "Rasmussen", pos: "MF", rating: 75 },
            { name: "Lapoussin", pos: "MF", rating: 75 },
            { name: "Machida", pos: "DF", rating: 61 },
            { name: "Mac Allister", pos: "DF", rating: 61 },
            { name: "Burgess", pos: "DF", rating: 61 },
            { name: "Castro-Montes", pos: "DF", rating: 25 },
            { name: "Teklab", pos: "DF", rating: 25 },
        ],
        "viktoriaplzen": [
            { name: "Šulc", pos: "FW", rating: 134 },
            { name: "Adu", pos: "FW", rating: 134 },
            { name: "Vydra", pos: "FW", rating: 134 },
            { name: "Vašulín", pos: "FW", rating: 65 },
            { name: "Mika", pos: "FW", rating: 65 },
            { name: "Kalvach", pos: "MF", rating: 103 },
            { name: "Cerv", pos: "MF", rating: 103 },
            { name: "Kopic", pos: "MF", rating: 103 },
            { name: "Jirka", pos: "MF", rating: 75 },
            { name: "Panos", pos: "MF", rating: 75 },
            { name: "Hranáč", pos: "DF", rating: 61 },
            { name: "Dweh", pos: "DF", rating: 61 },
            { name: "Jemelka", pos: "DF", rating: 61 },
            { name: "Havel", pos: "DF", rating: 25 },
            { name: "Cadu", pos: "DF", rating: 25 },
        ],
                "villarreal": [
            { name: "A. Pérez", pos: "FW", rating: 104 },
            { name: "Mikautadze", pos: "FW", rating: 134 },
            { name: "Pépé", pos: "FW", rating: 134 },
            { name: "Baena", pos: "FW", rating: 85 },
            { name: "Gerard", pos: "FW", rating: 65 },
            { name: "Oluwaseyi", pos: "FW", rating: 40 },
            { name: "Parejo", pos: "MF", rating: 13 },
            { name: "Comesaña", pos: "MF", rating: 43 },
            { name: "P. Gueye", pos: "MF", rating: 23 },
            { name: "Buchanan", pos: "MF", rating: 15 },
            { name: "Kambwala", pos: "DF", rating: 1 },
            { name: "L. Costa", pos: "DF", rating: 41 },
            { name: "Marin", pos: "DF", rating: 21 },
            { name: "Veiga", pos: "DF", rating: 21 },
            { name: "Cardona", pos: "DF", rating: 5 },
            { name: "Freeman", pos: "DF", rating: 1 },
            { name: "Foyth", pos: "DF", rating: 25 },
            { name: "Pedraza", pos: "DF", rating: 1 },
        ],
        "wislakrakow": [
            { name: "Rodado", pos: "FW", rating: 134 },
            { name: "Gogół", pos: "FW", rating: 134 },
            { name: "Alfaro", pos: "FW", rating: 134 },
            { name: "Zwoliński", pos: "FW", rating: 65 },
            { name: "Krzyzanowski", pos: "FW", rating: 65 },
            { name: "Duda", pos: "MF", rating: 103 },
            { name: "Uryga", pos: "MF", rating: 103 },
            { name: "Kutwa", pos: "MF", rating: 103 },
            { name: "Carbo", pos: "MF", rating: 75 },
            { name: "Baena", pos: "MF", rating: 75 },
            { name: "Szot", pos: "DF", rating: 61 },
            { name: "Jaroch", pos: "DF", rating: 61 },
            { name: "Łasicki", pos: "DF", rating: 61 },
            { name: "Biedrzycki", pos: "DF", rating: 25 },
            { name: "Kiš", pos: "DF", rating: 25 },
        ],
        "wolfsbergerac": [
            { name: "Bamba", pos: "FW", rating: 134 },
            { name: "Röcher", pos: "FW", rating: 134 },
            { name: "Karamoko", pos: "FW", rating: 134 },
            { name: "Omić", pos: "FW", rating: 65 },
            { name: "Gattermayer", pos: "FW", rating: 65 },
            { name: "Altunashvili", pos: "MF", rating: 103 },
            { name: "Piesinger", pos: "MF", rating: 103 },
            { name: "Jasić", pos: "MF", rating: 103 },
            { name: "Wernitznig", pos: "MF", rating: 75 },
            { name: "Tijani", pos: "MF", rating: 75 },
            { name: "Baumgartner", pos: "DF", rating: 61 },
            { name: "Oroz", pos: "DF", rating: 61 },
            { name: "Scherzer", pos: "DF", rating: 61 },
            { name: "Diabate", pos: "DF", rating: 25 },
            { name: "Kennedy", pos: "DF", rating: 25 },
        ],
        "youngboys": [
            { name: "Ganvoula", pos: "FW", rating: 134 },
            { name: "Itten", pos: "FW", rating: 134 },
            { name: "Monteiro", pos: "FW", rating: 134 },
            { name: "Elia", pos: "FW", rating: 65 },
            { name: "Colley", pos: "FW", rating: 65 },
            { name: "Ugrinić", pos: "MF", rating: 103 },
            { name: "Niasse", pos: "MF", rating: 103 },
            { name: "Lauper", pos: "MF", rating: 103 },
            { name: "Lakomy", pos: "MF", rating: 75 },
            { name: "Imeri", pos: "MF", rating: 75 },
            { name: "Camara", pos: "DF", rating: 61 },
            { name: "Benito", pos: "DF", rating: 61 },
            { name: "Hadjam", pos: "DF", rating: 61 },
            { name: "Athekame", pos: "DF", rating: 25 },
            { name: "Husic", pos: "DF", rating: 25 },
        ],
        "zenitstpetersburg": [
            { name: "Cassierra", pos: "FW", rating: 134 },
            { name: "Luciano", pos: "FW", rating: 134 },
            { name: "Artur", pos: "FW", rating: 134 },
            { name: "Pedro", pos: "FW", rating: 150 },
            { name: "Sergeev", pos: "FW", rating: 65 },
            { name: "Mantuan", pos: "FW", rating: 65 },
            { name: "Wendel", pos: "MF", rating: 103 },
            { name: "Claudio", pos: "MF", rating: 103 },
            { name: "Barrios", pos: "MF", rating: 103 },
            { name: "Mostovoy", pos: "MF", rating: 75 },
            { name: "Glushankov", pos: "MF", rating: 75 },
            { name: "Nino", pos: "DF", rating: 61 },
            { name: "Eraković", pos: "DF", rating: 61 },
            { name: "Douglas Santos", pos: "DF", rating: 61 },
            { name: "Karavaev", pos: "DF", rating: 25 },
            { name: "Alip", pos: "DF", rating: 25 },
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

    function selectGoalscorer(roster, alreadyScored = []) {
        if (!roster || roster.length === 0) {
            return { name: "Cầu thủ", flag: "❓" };
        }
        
        let isakScored = alreadyScored.some(s => s.name === "Isak");
        let ekitikeScored = alreadyScored.some(s => s.name === "Ekitike");
        let havertzScored = alreadyScored.some(s => s.name === "Havertz");
        let gyokeresScored = alreadyScored.some(s => s.name === "Gyökeres");
        
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
            let rating = p.rating || 75;
            
            // Special rules
            if (p.name === "Isak" && ekitikeScored) rating = 0;
            if (p.name === "Ekitike" && isakScored) rating = 0;
            if (p.name === "Havertz" && gyokeresScored) rating /= 2;
            if (p.name === "Gyökeres" && havertzScored) rating /= 2;
            
            return posWeight * rating;
        });
        const totalWeight = weights.reduce((a, b) => a + b, 0);
        if (totalWeight <= 0) {
            return roster[Math.floor(Math.random() * roster.length)];
        }
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
                let scorer = selectGoalscorer(rosterA, scorersA);
                let minute = Math.floor(Math.random() * 90) + 1;
                scorersA.push({ name: scorer.name, minute });
            }
            scorersA.sort((a, b) => a.minute - b.minute);

            let scorersB = [];
            for (let i = 0; i < goalsB; i++) {
                let scorer = selectGoalscorer(rosterB, scorersB);
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
