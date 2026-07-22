// --- UCL 25/26 SIMULATION ENGINE ---

(function() {
    // 1. DATABASE CÁC ĐỘI BÓNG THAM GIA POOL BỐC THĂM
    const TEAM_POOL = {
        // ENGLAND
        "ENG": [
            { name: "Manchester City", prob: 1.0, atk: 91, def: 88, mid: 92 },
            { name: "Liverpool", prob: 0.96, atk: 90, def: 87, mid: 88 },
            { name: "Arsenal", prob: 0.96, atk: 88, def: 89, mid: 86 },
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
            { name: "Real Madrid", prob: 1.0, atk: 93, def: 88, mid: 88 },
            { name: "Barcelona", prob: 1.0, atk: 92, def: 84, mid: 90 },
            { name: "Atlético Madrid", prob: 0.95, atk: 85, def: 88, mid: 83 },
            { name: "Villarreal", prob: 0.60, atk: 80, def: 79, mid: 78 },
            { name: "Real Sociedad", prob: 0.55, atk: 79, def: 78, mid: 77 },
            { name: "Athletic Club", prob: 0.50, atk: 78, def: 79, mid: 76 },
            { name: "Sevilla", prob: 0.40, atk: 77, def: 76, mid: 75 },
            { name: "Real Betis", prob: 0.30, atk: 76, def: 75, mid: 74 }
        ],
        // GERMANY
        "GER": [
            { name: "Bayern Munich", prob: 1.0, atk: 94, def: 88, mid: 89 },
            { name: "Borussia Dortmund", prob: 1.0, atk: 85, def: 82, mid: 83 },
            { name: "Bayer Leverkusen", prob: 0.85, atk: 87, def: 86, mid: 87 },
            { name: "RB Leipzig", prob: 0.75, atk: 83, def: 82, mid: 82 },
            { name: "Eintracht Frankfurt", prob: 0.60, atk: 81, def: 79, mid: 79 },
            { name: "Stuttgart", prob: 0.55, atk: 80, def: 79, mid: 78 },
            { name: "Freiburg", prob: 0.08, atk: 74, def: 75, mid: 72 },
            { name: "Borussia M'gladbach", prob: 0.30, atk: 76, def: 75, mid: 74 },
            { name: "Hamburg SV", prob: 0.02, atk: 70, def: 69, mid: 69 },
            { name: "Union Berlin", prob: 0.01, atk: 69, def: 70, mid: 68 }
        ],
        // ITALY
        "ITA": [
            { name: "Inter Milan", prob: 1.0, atk: 87, def: 87, mid: 86 },
            { name: "Napoli", prob: 0.80, atk: 84, def: 82, mid: 80 },
            { name: "AC Milan", prob: 0.66, atk: 84, def: 83, mid: 82 },
            { name: "Juventus", prob: 0.70, atk: 83, def: 84, mid: 81 },
            { name: "Atalanta", prob: 0.65, atk: 83, def: 82, mid: 81 },
            { name: "Como", prob: 0.35, atk: 78, def: 76, mid: 76 },
            { name: "Roma", prob: 0.55, atk: 81, def: 79, mid: 79 },
            { name: "Lazio", prob: 0.36, atk: 80, def: 79, mid: 78 },
            { name: "Bologna", prob: 0.25, atk: 77, def: 76, mid: 75 }
        ],
        // FRANCE
        "FRA": [
            { name: "PSG", prob: 1.0, atk: 93, def: 86, mid: 89 },
            { name: "Lens", prob: 0.50, atk: 78, def: 77, mid: 76 },
            { name: "Marseille", prob: 0.60, atk: 80, def: 78, mid: 78 },
            { name: "Lille", prob: 0.55, atk: 79, def: 79, mid: 77 },
            { name: "Lyon", prob: 0.55, atk: 79, def: 77, mid: 77 },
            { name: "Monaco", prob: 0.65, atk: 82, def: 80, mid: 80 },
            { name: "Nice", prob: 0.30, atk: 76, def: 75, mid: 73 },
            { name: "Strasbourg", prob: 0.15, atk: 73, def: 72, mid: 71 },
            { name: "Rennes", prob: 0.08, atk: 72, def: 71, mid: 70 }
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
            { name: "Union SG", prob: 0.50, atk: 75, def: 73, mid: 73 },
            { name: "Anderlecht", prob: 0.30, atk: 74, def: 72, mid: 72 }
        ],
        "TUR": [
            { name: "Galatasaray", prob: 0.70, atk: 79, def: 76, mid: 76 },
            { name: "Fenerbahçe", prob: 0.55, atk: 77, def: 74, mid: 74 },
            { name: "Beşiktaş", prob: 0.20, atk: 73, def: 71, mid: 71 },
            { name: "İstanbul Başakşehir", prob: 0.12, atk: 70, def: 69, mid: 68 }
        ],
        "AUT": [
            { name: "Red Bull Salzburg", prob: 0.80, atk: 76, def: 74, mid: 74 },
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
            { name: "Brøndby", prob: 0.18, atk: 67, def: 66, mid: 65 },
            { name: "Nordsjælland", prob: 0.12, atk: 66, def: 65, mid: 64 }
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
            { name: "Lech Poznan", prob: 0.10, atk: 67, def: 66, mid: 65 },
            { name: "Wisla Krakow", prob: 0.01, atk: 62, def: 62, mid: 61 }
        ],
        "CYP": [
            { name: "APOEL Nicosia", prob: 0.05, atk: 63, def: 63, mid: 61 },
            { name: "Apollon Limassol", prob: 0.03, atk: 62, def: 62, mid: 60 },
            { name: "Pafos", prob: 0.02, atk: 64, def: 63, mid: 62 }
        ],
        "BLR": [
            { name: "BATE Borisov", prob: 0.05, atk: 63, def: 62, mid: 61 }
        ],
        "SWE": [
            { name: "Malmo", prob: 0.25, atk: 67, def: 66, mid: 65 },
            { name: "AIK Solna", prob: 0.01, atk: 65, def: 65, mid: 64 },
            { name: "Elfsborg", prob: 0.01, atk: 65, def: 65, mid: 64 }
        ],
        "NOR": [
            { name: "Bodo/Glimt", prob: 0.30, atk: 73, def: 71, mid: 71 },
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
            { name: "Shamrock Rovers", prob: 0.01, atk: 60, def: 60, mid: 59 }
        ],
        "ROU": [
            { name: "CFR Cluj", prob: 0.06, atk: 68, def: 68, mid: 67 }
        ],
        "KAZ": [
            { name: "Astana", prob: 0.03, atk: 67, def: 67, mid: 65 },
            { name: "Kairat Almaty", prob: 0.02, atk: 65, def: 65, mid: 64 }
        ],
        "AZE": [
            { name: "Qarabag", prob: 0.04, atk: 72, def: 71, mid: 70 }
        ]
    };

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

    function generateNormalTimeMinute() {
        const isFirstHalf = Math.random() < 0.5;
        if (isFirstHalf) {
            if (Math.random() < 0.06) {
                const r = Math.random();
                if (r < 0.40) return 45.01;
                if (r < 0.70) return 45.02;
                if (r < 0.88) return 45.03;
                if (r < 0.97) return 45.04;
                return 45.05;
            } else {
                return Math.floor(Math.random() * 45) + 1;
            }
        } else {
            if (Math.random() < 0.10) {
                const r = Math.random() * 100;
                if (r < 30) return 90.01;
                if (r < 54) return 90.02;
                if (r < 72) return 90.03;
                if (r < 84) return 90.04;
                if (r < 92) return 90.05;
                if (r < 96) return 90.06;
                if (r < 98) return 90.07;
                if (r < 99.5) return 90.08;
                return 90.09;
            } else {
                return Math.floor(Math.random() * 45) + 46;
            }
        }
    }

    function generateExtraTimeMinute() {
        const isFirstHalfExtra = Math.random() < 0.5;
        if (isFirstHalfExtra) {
            if (Math.random() < 0.04) {
                return Math.random() < 0.6 ? 105.01 : 105.02;
            } else {
                return Math.floor(Math.random() * 15) + 91;
            }
        } else {
            if (Math.random() < 0.05) {
                return Math.random() < 0.6 ? 120.01 : 120.02;
            } else {
                return Math.floor(Math.random() * 15) + 106;
            }
        }
    }

    window.formatSimMinute = function(min) {
        if (typeof min === 'number') {
            const main = Math.floor(min);
            const dec = Math.round((min - main) * 100);
            if (dec > 0) {
                return `${main}+${dec}`;
            }
            return `${main}`;
        }
        return min;
    };

    window.groupScorers = function(scorers) {
        if (!scorers || scorers.length === 0) return [];
        const grouped = [];
        const map = {};
        scorers.forEach(s => {
            const formattedMin = window.formatSimMinute(s.minute) + "'";
            if (!map[s.name]) {
                map[s.name] = {
                    name: s.name,
                    minutes: [formattedMin],
                    firstMinute: s.minute
                };
                grouped.push(map[s.name]);
            } else {
                map[s.name].minutes.push(formattedMin);
            }
        });
        return grouped;
    };

    // --- OVERRIDE ROSTERS (from tong_hop_111_doi_hinh_2026.md) ---
    // Source of truth for ALL AI team scorers. Do NOT edit manually.
    const OVERRIDE_ROSTERS = {
        "acmilan": [
            { name: "Leão", pos: "FW", rating: 184 },
            { name: "Nkunku", pos: "FW", rating: 164 },
            { name: "Pulisic", pos: "FW", rating: 124 },
            { name: "Y. Fofana", pos: "MF", rating: 83 },
            { name: "Rabiot", pos: "MF", rating: 63 },
            { name: "Modrić", pos: "MF", rating: 83 },
            { name: "Ricci", pos: "MF", rating: 75 },
            { name: "Loftus-Cheek", pos: "MF", rating: 45 },
            { name: "Jashari", pos: "MF", rating: 15 },
            { name: "S. Giménez", pos: "FW", rating: 95 },
            { name: "Füllkrug", pos: "FW", rating: 85 },
            { name: "Saelemaekers", pos: "FW", rating: 65 },
            { name: "S. Pavlović", pos: "DF", rating: 21 },
            { name: "Estupiñán", pos: "DF", rating: 21 },
            { name: "De Winter", pos: "DF", rating: 21 },
            { name: "Gabbia", pos: "DF", rating: 15 },
            { name: "Eletu", pos: "DF", rating: 15 },
            { name: "Bartesaghi", pos: "DF", rating: 15 },
            { name: "Athekame", pos: "DF", rating: 5 },
        ],
        "aekathens": [
            { name: "Koïta", pos: "FW", rating: 134 },
            { name: "Jović", pos: "FW", rating: 134 },
            { name: "Varga", pos: "FW", rating: 134 },
            { name: "Eliasson", pos: "MF", rating: 88 },
            { name: "Marin", pos: "MF", rating: 88 },
            { name: "Gaćinović", pos: "MF", rating: 88 },
            { name: "Pineda", pos: "MF", rating: 30 },
            { name: "Mantalos", pos: "MF", rating: 30 },
            { name: "Grujić", pos: "MF", rating: 30 },
            { name: "Zini", pos: "FW", rating: 50 },
            { name: "Moukoudi", pos: "DF", rating: 30 },
            { name: "Pilios", pos: "DF", rating: 30 },
            { name: "Rota", pos: "DF", rating: 30 },
            { name: "Georgiev", pos: "DF", rating: 5 },
            { name: "Vida", pos: "DF", rating: 5 },
        ],
        "aiksolna": [
            { name: "Andersson", pos: "FW", rating: 134 },
            { name: "Gustafsson", pos: "FW", rating: 134 },
            { name: "Filling", pos: "FW", rating: 134 },
            { name: "Ellingsen", pos: "MF", rating: 88 },
            { name: "Hove", pos: "MF", rating: 88 },
            { name: "Mujanić", pos: "MF", rating: 88 },
            { name: "Ali", pos: "MF", rating: 30 },
            { name: "Beširović", pos: "MF", rating: 30 },
            { name: "Wilson", pos: "MF", rating: 30 },
            { name: "Atola", pos: "FW", rating: 50 },
            { name: "Flataker", pos: "FW", rating: 50 },
            { name: "Nissen", pos: "DF", rating: 30 },
            { name: "Bergquist", pos: "DF", rating: 30 },
            { name: "Edh", pos: "DF", rating: 30 },
            { name: "Papagiannopoulos", pos: "DF", rating: 5 },
            { name: "Pavey", pos: "DF", rating: 5 },
        ],
        "ajax": [
            { name: "Dolberg", pos: "FW", rating: 134 },
            { name: "Konadu", pos: "FW", rating: 134 },
            { name: "Godts", pos: "FW", rating: 134 },
            { name: "Gloukh", pos: "MF", rating: 88 },
            { name: "Regeer", pos: "MF", rating: 88 },
            { name: "Klaassen", pos: "MF", rating: 88 },
            { name: "Mokio", pos: "MF", rating: 30 },
            { name: "Fitz-Jim", pos: "MF", rating: 30 },
            { name: "Steur", pos: "MF", rating: 30 },
            { name: "Carrizo", pos: "FW", rating: 50 },
            { name: "Edvardsen", pos: "FW", rating: 50 },
            { name: "Bounida", pos: "FW", rating: 50 },
            { name: "Rosa", pos: "DF", rating: 30 },
            { name: "Gaaei", pos: "DF", rating: 30 },
            { name: "Itakura", pos: "DF", rating: 30 },
            { name: "Wijndal", pos: "DF", rating: 5 },
            { name: "Baas", pos: "DF", rating: 5 },
        ],
        "anderlecht": [
            { name: "Sikan", pos: "FW", rating: 134 },
            { name: "Cvetković", pos: "FW", rating: 134 },
            { name: "Huerta", pos: "FW", rating: 134 },
            { name: "Saliba", pos: "MF", rating: 88 },
            { name: "Llansana", pos: "MF", rating: 88 },
            { name: "Stroeykens", pos: "MF", rating: 88 },
            { name: "De Cat", pos: "MF", rating: 30 },
            { name: "Tajaouart", pos: "MF", rating: 30 },
            { name: "Dao", pos: "FW", rating: 50 },
            { name: "C. da Costa", pos: "FW", rating: 50 },
            { name: "Degreef", pos: "FW", rating: 50 },
            { name: "Camara", pos: "DF", rating: 30 },
            { name: "Keita", pos: "DF", rating: 30 },
            { name: "Hey", pos: "DF", rating: 30 },
            { name: "Angély", pos: "DF", rating: 5 },
            { name: "Augustinsson", pos: "DF", rating: 5 },
        ],
        "apoelnicosia": [
            { name: "Dražić", pos: "FW", rating: 134 },
            { name: "Maioli", pos: "FW", rating: 134 },
            { name: "Diamantakos", pos: "FW", rating: 134 },
            { name: "Meyer", pos: "MF", rating: 88 },
            { name: "Tomás", pos: "MF", rating: 88 },
            { name: "Dálcio", pos: "MF", rating: 88 },
            { name: "Poursaitidis", pos: "MF", rating: 30 },
            { name: "Kattirtzis", pos: "MF", rating: 30 },
            { name: "Karanatsios", pos: "MF", rating: 30 },
            { name: "Ataíde", pos: "FW", rating: 50 },
            { name: "Sotiriou", pos: "FW", rating: 50 },
            { name: "Koutsakos", pos: "FW", rating: 50 },
            { name: "Stafylidis", pos: "DF", rating: 30 },
            { name: "Degenek", pos: "DF", rating: 30 },
            { name: "Meer", pos: "DF", rating: 30 },
            { name: "Nanu", pos: "DF", rating: 5 },
            { name: "Brorsson", pos: "DF", rating: 5 },
        ],
        "apollonlimassol": [
            { name: "G. Rodrigues", pos: "FW", rating: 134 },
            { name: "Andreou", pos: "FW", rating: 134 },
            { name: "Duodu", pos: "FW", rating: 134 },
            { name: "Špoljarić", pos: "MF", rating: 88 },
            { name: "Brown", pos: "MF", rating: 88 },
            { name: "Assunção", pos: "MF", rating: 88 },
            { name: "Athanasiou", pos: "MF", rating: 30 },
            { name: "Weissbeck", pos: "MF", rating: 30 },
            { name: "Konomis", pos: "MF", rating: 30 },
            { name: "Thomas", pos: "FW", rating: 50 },
            { name: "Escriche", pos: "FW", rating: 50 },
            { name: "Youssef", pos: "FW", rating: 50 },
            { name: "Malekkides", pos: "DF", rating: 30 },
            { name: "Shikkis", pos: "DF", rating: 30 },
            { name: "Balogiannis", pos: "DF", rating: 30 },
            { name: "Kvída", pos: "DF", rating: 5 },
            { name: "Gaspar", pos: "DF", rating: 5 },
        ],
        "arsenal": [
            { name: "Saka", pos: "FW", rating: 150 },
            { name: "Havertz", pos: "FW", rating: 145 },
            { name: "Martinelli", pos: "FW", rating: 100 },
            { name: "Trossard", pos: "FW", rating: 107 },
            { name: "Ødegaard", pos: "MF", rating: 103 },
            { name: "Rice", pos: "MF", rating: 140 },
            { name: "Eze", pos: "MF", rating: 103 },
            { name: "Merino", pos: "MF", rating: 95 },
            { name: "Zubimendi", pos: "MF", rating: 75 },
            { name: "Nørgaard", pos: "MF", rating: 23 },
            { name: "Lewis-Skelly", pos: "MF", rating: 36 },
            { name: "Jesus", pos: "FW", rating: 65 },
            { name: "Gyökeres", pos: "FW", rating: 145 },
            { name: "Madueke", pos: "FW", rating: 65 },
            { name: "Dowman", pos: "FW", rating: 43 },
            { name: "Saliba", pos: "DF", rating: 69 },
            { name: "Gabriel", pos: "DF", rating: 98 },
            { name: "White", pos: "DF", rating: 23 },
            { name: "Timber", pos: "DF", rating: 45 },
            { name: "Calafiori", pos: "DF", rating: 33 },
            { name: "Mosquera", pos: "DF", rating: 15 },
            { name: "Hincapié", pos: "DF", rating: 25 },
        ],
        "astana": [
            { name: "Zhaksylykov", pos: "FW", rating: 134 },
            { name: "Ahanonu", pos: "FW", rating: 134 },
            { name: "Basmanov", pos: "FW", rating: 134 },
            { name: "Tomasov", pos: "MF", rating: 88 },
            { name: "Karaman", pos: "MF", rating: 88 },
            { name: "Bašić", pos: "MF", rating: 88 },
            { name: "Islamkhan", pos: "MF", rating: 30 },
            { name: "Merkel", pos: "MF", rating: 30 },
            { name: "Abrayev", pos: "MF", rating: 30 },
            { name: "Karimov", pos: "FW", rating: 50 },
            { name: "Bartolec", pos: "DF", rating: 30 },
            { name: "Kalaica", pos: "DF", rating: 30 },
            { name: "Anuarov", pos: "DF", rating: 30 },
            { name: "Kažukolovas", pos: "DF", rating: 5 },
            { name: "Kasym", pos: "DF", rating: 5 },
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
            { name: "Sulemana", pos: "FW", rating: 84 },
            { name: "De Ketelaere", pos: "FW", rating: 124 },
            { name: "Raspadori", pos: "FW", rating: 105 },
            { name: "Ederson", pos: "MF", rating: 103 },
            { name: "Pasalić", pos: "MF", rating: 83 },
            { name: "de Roon", pos: "MF", rating: 103 },
            { name: "Samardžić", pos: "MF", rating: 95 },
            { name: "Musah", pos: "MF", rating: 75 },
            { name: "Scamacca", pos: "FW", rating: 85 },
            { name: "Zalewski", pos: "FW", rating: 45 },
            { name: "Hien", pos: "DF", rating: 31 },
            { name: "Scalvini", pos: "DF", rating: 41 },
            { name: "Kolašinac", pos: "DF", rating: 11 },
            { name: "Bellanova", pos: "DF", rating: 61 },
            { name: "Zappacosta", pos: "DF", rating: 15 },
            { name: "Djimsiti", pos: "DF", rating: 25 },
            { name: "Kossounou", pos: "DF", rating: 15 },
        ],
        "athleticclub": [
            { name: "I. Williams", pos: "FW", rating: 134 },
            { name: "N. Williams", pos: "FW", rating: 134 },
            { name: "Guruzeta", pos: "FW", rating: 134 },
            { name: "Sancet", pos: "MF", rating: 103 },
            { name: "Vesga", pos: "MF", rating: 103 },
            { name: "Galarreta", pos: "MF", rating: 75 },
            { name: "Prados", pos: "MF", rating: 75 },
            { name: "Berenguer", pos: "FW", rating: 65 },
            { name: "Djaló", pos: "FW", rating: 65 },
            { name: "Vivian", pos: "DF", rating: 61 },
            { name: "Paredes", pos: "DF", rating: 61 },
            { name: "Yeray", pos: "DF", rating: 61 },
            { name: "Gorosabel", pos: "DF", rating: 25 },
            { name: "Yuri", pos: "DF", rating: 25 },
        ],
        "atleticomadrid": [
            { name: "Alvarez", pos: "FW", rating: 175 },
            { name: "Koke", pos: "MF", rating: 23 },
            { name: "Llorente", pos: "MF", rating: 63 },
            { name: "Barrios", pos: "MF", rating: 55 },
            { name: "Lemar", pos: "MF", rating: 75 },
            { name: "N. González", pos: "MF", rating: 55 },
            { name: "Lookman", pos: "FW", rating: 105 },
            { name: "Almada", pos: "FW", rating: 65 },
            { name: "G Simeone", pos: "FW", rating: 75 },
            { name: "Molina", pos: "DF", rating: 61 },
            { name: "Hancko", pos: "DF", rating: 25 },
            { name: "Lenglet", pos: "DF", rating: 25 },
            { name: "Ruggeri", pos: "DF", rating: 25 },
        ],
        "azalkmaar": [
            { name: "Parrott", pos: "FW", rating: 160 },
            { name: "Sadiq", pos: "FW", rating: 134 },
            { name: "Patati", pos: "FW", rating: 134 },
            { name: "Koopmeiners", pos: "MF", rating: 88 },
            { name: "Clasie", pos: "MF", rating: 88 },
            { name: "Mijnans", pos: "MF", rating: 88 },
            { name: "Boogaard", pos: "MF", rating: 30 },
            { name: "Smit", pos: "MF", rating: 30 },
            { name: "Šín", pos: "MF", rating: 30 },
            { name: "Jensen", pos: "FW", rating: 50 },
            { name: "Hornkamp", pos: "FW", rating: 50 },
            { name: "Oufkir", pos: "FW", rating: 50 },
            { name: "Maikuma", pos: "DF", rating: 30 },
            { name: "Goes", pos: "DF", rating: 30 },
            { name: "Dekker", pos: "DF", rating: 30 },
            { name: "Penetra", pos: "DF", rating: 5 },
            { name: "Natali", pos: "DF", rating: 5 },
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
            { name: "Traoré", pos: "FW", rating: 134 },
            { name: "Šotiček", pos: "FW", rating: 134 },
            { name: "Broschinski", pos: "FW", rating: 134 },
            { name: "Shaqiri", pos: "MF", rating: 88 },
            { name: "Metinho", pos: "MF", rating: 88 },
            { name: "Koindredi", pos: "MF", rating: 88 },
            { name: "Bačanin", pos: "MF", rating: 30 },
            { name: "Leroy", pos: "MF", rating: 30 },
            { name: "Kacuri", pos: "MF", rating: 30 },
            { name: "Duranville", pos: "FW", rating: 50 },
            { name: "Salah", pos: "FW", rating: 50 },
            { name: "Ajeti", pos: "FW", rating: 50 },
            { name: "Vouilloz", pos: "DF", rating: 30 },
            { name: "Omeragić", pos: "DF", rating: 30 },
            { name: "Tsunemoto", pos: "DF", rating: 30 },
            { name: "Daniliuc", pos: "DF", rating: 5 },
            { name: "van Breemen", pos: "DF", rating: 5 },
        ],
        "bateborisov": [
            { name: "Apanasevich", pos: "FW", rating: 134 },
            { name: "Mirskiy", pos: "FW", rating: 134 },
            { name: "Grivenev", pos: "FW", rating: 134 },
            { name: "Angban", pos: "MF", rating: 88 },
            { name: "Rusakov", pos: "MF", rating: 88 },
            { name: "Telesh", pos: "MF", rating: 88 },
            { name: "Protasenya", pos: "MF", rating: 30 },
            { name: "Kavalyow", pos: "MF", rating: 30 },
            { name: "Yatskevich", pos: "FW", rating: 50 },
            { name: "Charles", pos: "FW", rating: 50 },
            { name: "Yarmolich", pos: "FW", rating: 50 },
            { name: "Intsoen", pos: "DF", rating: 30 },
            { name: "Sakuta", pos: "DF", rating: 30 },
            { name: "Musakhanyan", pos: "DF", rating: 30 },
            { name: "Rashchenya", pos: "DF", rating: 5 },
            { name: "Neskoromnyi", pos: "DF", rating: 5 },
        ],
        "bayerleverkusen": [
            { name: "Schick", pos: "FW", rating: 154 },
            { name: "Terrier", pos: "FW", rating: 124 },
            { name: "Vázquez", pos: "MF", rating: 43 },
            { name: "Hofmann", pos: "MF", rating: 73 },
            { name: "Tillman", pos: "MF", rating: 103 },
            { name: "Palacios", pos: "MF", rating: 55 },
            { name: "A. García", pos: "MF", rating: 45 },
            { name: "Ben Seghir", pos: "FW", rating: 65 },
            { name: "Tella", pos: "FW", rating: 75 },
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
            { name: "Kimmich", pos: "MF", rating: 69 },
            { name: "Goretzka", pos: "MF", rating: 43 },
            { name: "A. Pavlović", pos: "MF", rating: 45 },
            { name: "Laimer", pos: "MF", rating: 45 },
            { name: "Gnabry", pos: "FW", rating: 45 },
            { name: "Jackson", pos: "FW", rating: 65 },
            { name: "Upamecano", pos: "DF", rating: 36 },
            { name: "Min-jae", pos: "DF", rating: 21 },
            { name: "Davies", pos: "DF", rating: 41 },
            { name: "Tah", pos: "DF", rating: 25 },
            { name: "Stanišić", pos: "DF", rating: 15 },
            { name: "H. Ito", pos: "DF", rating: 5 },
        ],
        "benfica": [
            { name: "Pavlidis", pos: "FW", rating: 134 },
            { name: "Ivanović", pos: "FW", rating: 134 },
            { name: "Bruma", pos: "FW", rating: 134 },
            { name: "Sudakov", pos: "MF", rating: 88 },
            { name: "Aursnes", pos: "MF", rating: 88 },
            { name: "Barrenechea", pos: "MF", rating: 88 },
            { name: "M. Silva", pos: "MF", rating: 30 },
            { name: "Barreiro", pos: "MF", rating: 30 },
            { name: "Ríos", pos: "MF", rating: 30 },
            { name: "Lukébakio", pos: "FW", rating: 50 },
            { name: "Schjelderup", pos: "FW", rating: 50 },
            { name: "Prestianni", pos: "FW", rating: 50 },
            { name: "A. Silva", pos: "DF", rating: 30 },
            { name: "Bah", pos: "DF", rating: 30 },
            { name: "Dedić", pos: "DF", rating: 30 },
            { name: "Dahl", pos: "DF", rating: 5 },
            { name: "T. Araújo", pos: "DF", rating: 5 },
        ],
        "besiktas": [
            { name: "J. Silva", pos: "FW", rating: 134 },
            { name: "Rashica", pos: "FW", rating: 134 },
            { name: "Hyeon-gyu", pos: "FW", rating: 134 },
            { name: "Ndidi", pos: "MF", rating: 88 },
            { name: "Asllani", pos: "MF", rating: 50 },
            { name: "Uçan", pos: "MF", rating: 88 },
            { name: "Kökçü", pos: "MF", rating: 30 },
            { name: "Olaitan", pos: "MF", rating: 30 },
            { name: "Yılmaz", pos: "MF", rating: 30 },
            { name: "Ünder", pos: "FW", rating: 50 },
            { name: "Touré", pos: "FW", rating: 50 },
            { name: "Hekimoğlu", pos: "FW", rating: 50 },
            { name: "Agbadou", pos: "DF", rating: 30 },
            { name: "Uduokhai", pos: "DF", rating: 30 },
            { name: "Bulut", pos: "DF", rating: 30 },
            { name: "Sazdağı", pos: "DF", rating: 5 },
            { name: "Yılmaz", pos: "DF", rating: 5 },
        ],
        "bodoglimt": [
            { name: "Høgh", pos: "FW", rating: 134 },
            { name: "Hauge", pos: "FW", rating: 118 },
            { name: "Brynhildsen", pos: "FW", rating: 134 },
            { name: "Berg", pos: "MF", rating: 88 },
            { name: "Auklend", pos: "MF", rating: 88 },
            { name: "Saltnes", pos: "MF", rating: 88 },
            { name: "Kitolano", pos: "MF", rating: 30 },
            { name: "Fet", pos: "MF", rating: 145 },
            { name: "Klynge", pos: "MF", rating: 30 },
            { name: "Bassi", pos: "FW", rating: 50 },
            { name: "Hansen", pos: "FW", rating: 50 },
            { name: "Mikkelsen", pos: "FW", rating: 50 },
            { name: "Bjørkan", pos: "DF", rating: 30 },
            { name: "Sjøvold", pos: "DF", rating: 30 },
            { name: "Nielsen", pos: "DF", rating: 30 },
            { name: "Bjørtuft", pos: "DF", rating: 5 },
            { name: "Aleesami", pos: "DF", rating: 5 },
        ],
        "bologna": [
            { name: "Orsolini", pos: "FW", rating: 134 },
            { name: "Castro", pos: "FW", rating: 134 },
            { name: "Rowe", pos: "FW", rating: 134 },
            { name: "Pobega", pos: "MF", rating: 88 },
            { name: "Moro", pos: "MF", rating: 88 },
            { name: "Bernardeschi", pos: "MF", rating: 88 },
            { name: "Ferguson", pos: "MF", rating: 30 },
            { name: "Odgaard", pos: "MF", rating: 30 },
            { name: "Dallinga", pos: "FW", rating: 50 },
            { name: "Cambiaghi", pos: "FW", rating: 50 },
            { name: "Domínguez", pos: "FW", rating: 50 },
            { name: "Helland", pos: "DF", rating: 30 },
            { name: "Heggem", pos: "DF", rating: 30 },
            { name: "Casale", pos: "DF", rating: 30 },
            { name: "Zortea", pos: "DF", rating: 5 },
            { name: "Lucumí", pos: "DF", rating: 5 },
        ],
        "borussiadortmund": [
            { name: "Guirassy", pos: "FW", rating: 164 },
            { name: "Beier", pos: "FW", rating: 104 },
            { name: "Adeyemi", pos: "FW", rating: 139 },
            { name: "Brandt", pos: "MF", rating: 93 },
            { name: "Inacio", pos: "MF", rating: 33 },
            { name: "Nmecha", pos: "MF", rating: 83 },
            { name: "Jobe", pos: "MF", rating: 85 },
            { name: "Chukwuemeka", pos: "MF", rating: 75 },
            { name: "F. Silva", pos: "FW", rating: 55 },
            { name: "Schlotterbeck", pos: "DF", rating: 39 },
            { name: "Anton", pos: "DF", rating: 31 },
            { name: "Couto", pos: "DF", rating: 30 },
            { name: "Bensebaini", pos: "DF", rating: 15 },
            { name: "Ryerson", pos: "DF", rating: 25 },
            { name: "Süle", pos: "DF", rating: 15 },
        ],
        "borussiamgladbach": [
            { name: "Kleindienst", pos: "FW", rating: 134 },
            { name: "Machino", pos: "FW", rating: 134 },
            { name: "Urbich", pos: "FW", rating: 134 },
            { name: "Stöger", pos: "MF", rating: 88 },
            { name: "Leopold", pos: "MF", rating: 88 },
            { name: "Honorat", pos: "MF", rating: 88 },
            { name: "Neuhaus", pos: "MF", rating: 30 },
            { name: "Reyna", pos: "MF", rating: 30 },
            { name: "Sander", pos: "MF", rating: 30 },
            { name: "Lidberg", pos: "FW", rating: 50 },
            { name: "Diks", pos: "DF", rating: 30 },
            { name: "Chiarodia", pos: "DF", rating: 30 },
            { name: "Herold", pos: "DF", rating: 30 },
            { name: "Konoplya", pos: "DF", rating: 5 },
            { name: "Ullrich", pos: "DF", rating: 5 },
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
            { name: "Horta", pos: "FW", rating: 134 },
            { name: "Ouazzani", pos: "FW", rating: 134 },
            { name: "Merheg", pos: "FW", rating: 134 },
            { name: "Moscardo", pos: "MF", rating: 88 },
            { name: "Dorgeles", pos: "MF", rating: 88 },
            { name: "V. Carvalho", pos: "MF", rating: 88 },
            { name: "Moutinho", pos: "MF", rating: 30 },
            { name: "Huseinbašić", pos: "MF", rating: 30 },
            { name: "Gorby", pos: "MF", rating: 30 },
            { name: "Víctor", pos: "FW", rating: 50 },
            { name: "Navarro", pos: "FW", rating: 50 },
            { name: "Vidigal", pos: "FW", rating: 50 },
            { name: "V. Gómez", pos: "DF", rating: 30 },
            { name: "Niakaté", pos: "DF", rating: 30 },
            { name: "Lelo", pos: "DF", rating: 30 },
            { name: "Lagerbielke", pos: "DF", rating: 5 },
            { name: "P. Oliveira", pos: "DF", rating: 5 },
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
        "brndby": [
            { name: "Vallys", pos: "FW", rating: 134 },
            { name: "Mortensen", pos: "FW", rating: 134 },
            { name: "Bundgaard", pos: "FW", rating: 134 },
            { name: "Wass", pos: "MF", rating: 88 },
            { name: "Tahirović", pos: "MF", rating: 88 },
            { name: "Frøkjær-Jensen", pos: "MF", rating: 88 },
            { name: "Poulsen", pos: "MF", rating: 30 },
            { name: "Jensen", pos: "MF", rating: 30 },
            { name: "Slisz", pos: "MF", rating: 30 },
            { name: "Dennis", pos: "FW", rating: 50 },
            { name: "Fukuda", pos: "FW", rating: 50 },
            { name: "Younis", pos: "FW", rating: 50 },
            { name: "Alves", pos: "DF", rating: 30 },
            { name: "Vanlerberghe", pos: "DF", rating: 30 },
            { name: "Villadsen", pos: "DF", rating: 30 },
            { name: "Binks", pos: "DF", rating: 5 },
            { name: "Lauritsen", pos: "DF", rating: 5 },
        ],
        "celtic": [
            { name: "Kenny", pos: "FW", rating: 134 },
            { name: "Maeda", pos: "FW", rating: 160 },
            { name: "Osmand", pos: "FW", rating: 134 },
            { name: "Nygren", pos: "MF", rating: 88 },
            { name: "McCowan", pos: "MF", rating: 88 },
            { name: "Oxlade-Chamberlain", pos: "MF", rating: 88 },
            { name: "Engels", pos: "MF", rating: 30 },
            { name: "Bernardo", pos: "MF", rating: 30 },
            { name: "Hatate", pos: "MF", rating: 30 },
            { name: "Jota", pos: "FW", rating: 50 },
            { name: "Balikwisha", pos: "FW", rating: 50 },
            { name: "Hyun-jun", pos: "FW", rating: 50 },
            { name: "Johnston", pos: "DF", rating: 30 },
            { name: "Scales", pos: "DF", rating: 30 },
            { name: "Trusty", pos: "DF", rating: 30 },
            { name: "Carter-Vickers", pos: "DF", rating: 5 },
            { name: "Montgomery", pos: "DF", rating: 5 },
        ],
        "cfrcluj": [
            { name: "Korenica", pos: "FW", rating: 134 },
            { name: "Cordea", pos: "FW", rating: 134 },
            { name: "Samaké", pos: "FW", rating: 134 },
            { name: "Radu", pos: "MF", rating: 88 },
            { name: "Păun", pos: "MF", rating: 88 },
            { name: "Fică", pos: "MF", rating: 88 },
            { name: "Perianu", pos: "MF", rating: 30 },
            { name: "Gligor", pos: "MF", rating: 30 },
            { name: "Sade", pos: "MF", rating: 30 },
            { name: "Mensah", pos: "FW", rating: 50 },
            { name: "Biliboc", pos: "FW", rating: 50 },
            { name: "Crișan", pos: "FW", rating: 50 },
            { name: "Huja", pos: "DF", rating: 30 },
            { name: "Abeid", pos: "DF", rating: 30 },
            { name: "Mašić", pos: "DF", rating: 30 },
            { name: "Rocha", pos: "DF", rating: 5 },
            { name: "Țîrlea", pos: "DF", rating: 5 },
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
            { name: "Nilsson", pos: "FW", rating: 134 },
            { name: "Tresoldi", pos: "FW", rating: 134 },
            { name: "Tzolis", pos: "FW", rating: 134 },
            { name: "L. Reis", pos: "MF", rating: 88 },
            { name: "Vetlesen", pos: "MF", rating: 88 },
            { name: "Sandra", pos: "MF", rating: 88 },
            { name: "Onyedika", pos: "MF", rating: 30 },
            { name: "Vanaken", pos: "MF", rating: 30 },
            { name: "Audoor", pos: "MF", rating: 30 },
            { name: "Forbs", pos: "FW", rating: 50 },
            { name: "Vermant", pos: "FW", rating: 50 },
            { name: "Diakhon", pos: "FW", rating: 50 },
            { name: "Ordóñez", pos: "DF", rating: 30 },
            { name: "Meijer", pos: "DF", rating: 30 },
            { name: "Osuji", pos: "DF", rating: 30 },
            { name: "Siquet", pos: "DF", rating: 5 },
            { name: "Mechele", pos: "DF", rating: 5 },
        ],
        "como": [
            { name: "Douvikas", pos: "FW", rating: 200 },
            { name: "Baturina", pos: "FW", rating: 144 },
            { name: "Morata", pos: "FW", rating: 134 },
            { name: "Paz", pos: "MF", rating: 133 },
            { name: "Perrone", pos: "MF", rating: 53 },
            { name: "S. Roberto", pos: "MF", rating: 33 },
            { name: "Da Cunha", pos: "MF", rating: 95 },
            { name: "Jesús", pos: "MF", rating: 75 },
            { name: "Addai", pos: "FW", rating: 45 },
            { name: "Diao", pos: "FW", rating: 65 },
            { name: "Ramon", pos: "DF", rating: 51 },
            { name: "Kempf", pos: "DF", rating: 69 },
            { name: "Moreno", pos: "DF", rating: 51 },
            { name: "Moreno", pos: "DF", rating: 35 },
            { name: "Smolcic", pos: "DF", rating: 1 },
        ],
        "dinamozagreb": [
            { name: "Hoxha", pos: "FW", rating: 134 },
            { name: "Beljo", pos: "FW", rating: 134 },
            { name: "Lisica", pos: "FW", rating: 134 },
            { name: "Mišić", pos: "MF", rating: 88 },
            { name: "Bennacer", pos: "MF", rating: 88 },
            { name: "Stojković", pos: "MF", rating: 88 },
            { name: "Zajc", pos: "MF", rating: 30 },
            { name: "Vidović", pos: "MF", rating: 30 },
            { name: "Soldo", pos: "MF", rating: 30 },
            { name: "Varela", pos: "FW", rating: 50 },
            { name: "Topić", pos: "FW", rating: 50 },
            { name: "Córdoba", pos: "FW", rating: 50 },
            { name: "Goda", pos: "DF", rating: 30 },
            { name: "Tabinas", pos: "DF", rating: 30 },
            { name: "Galešić", pos: "DF", rating: 30 },
            { name: "Torrente", pos: "DF", rating: 5 },
            { name: "Pierre-Gabriel", pos: "DF", rating: 5 },
        ],
        "dynamokyiv": [
            { name: "Ponomarenko", pos: "FW", rating: 160 },
            { name: "Ogundana", pos: "FW", rating: 134 },
            { name: "Guerrero", pos: "FW", rating: 134 },
            { name: "Yarmolenko", pos: "MF", rating: 88 },
            { name: "Brazhko", pos: "MF", rating: 88 },
            { name: "Pikhalyonok", pos: "MF", rating: 88 },
            { name: "Voloshyn", pos: "MF", rating: 30 },
            { name: "Shaparenko", pos: "MF", rating: 30 },
            { name: "Kabayev", pos: "MF", rating: 30 },
            { name: "Redushko", pos: "FW", rating: 50 },
            { name: "Blănuță", pos: "FW", rating: 50 },
            { name: "Á. Torres", pos: "FW", rating: 50 },
            { name: "Vivcharenko", pos: "DF", rating: 30 },
            { name: "Popov", pos: "DF", rating: 30 },
            { name: "Korobov", pos: "DF", rating: 30 },
            { name: "Tymchyk", pos: "DF", rating: 5 },
            { name: "Mykhavko", pos: "DF", rating: 5 },
        ],
        "eintrachtfrankfurt": [
            { name: "Batshuayi", pos: "FW", rating: 134 },
            { name: "Knauff", pos: "FW", rating: 134 },
            { name: "Burkardt", pos: "FW", rating: 134 },
            { name: "Højlund", pos: "MF", rating: 88 },
            { name: "Chaïbi", pos: "MF", rating: 88 },
            { name: "Skhiri", pos: "MF", rating: 88 },
            { name: "Larsson", pos: "MF", rating: 30 },
            { name: "Dahoud", pos: "MF", rating: 30 },
            { name: "Götze", pos: "MF", rating: 30 },
            { name: "Ebnoutalib", pos: "FW", rating: 50 },
            { name: "Bahoya", pos: "FW", rating: 50 },
            { name: "Dōan", pos: "FW", rating: 50 },
            { name: "Collins", pos: "DF", rating: 30 },
            { name: "Baum", pos: "DF", rating: 30 },
            { name: "Theate", pos: "DF", rating: 30 },
            { name: "Koch", pos: "DF", rating: 5 },
            { name: "Amenda", pos: "DF", rating: 5 },
        ],
        "elfsborg": [
            { name: "Krasniqi", pos: "FW", rating: 134 },
            { name: "Ihler", pos: "FW", rating: 134 },
            { name: "Silverholt", pos: "FW", rating: 134 },
            { name: "Zeneli", pos: "MF", rating: 88 },
            { name: "Olsson", pos: "MF", rating: 88 },
            { name: "Hedlund", pos: "MF", rating: 88 },
            { name: "Hellemaa", pos: "MF", rating: 30 },
            { name: "Magnússon", pos: "MF", rating: 30 },
            { name: "Beck", pos: "MF", rating: 30 },
            { name: "Frick", pos: "FW", rating: 50 },
            { name: "Östman", pos: "FW", rating: 50 },
            { name: "Isherwood", pos: "DF", rating: 30 },
            { name: "Wikström", pos: "DF", rating: 30 },
            { name: "Holmén", pos: "DF", rating: 30 },
            { name: "Hult", pos: "DF", rating: 5 },
            { name: "Aronsson", pos: "DF", rating: 5 },
        ],
        "fccopenhagen": [
            { name: "Elyounoussi", pos: "FW", rating: 134 },
            { name: "Cornelius", pos: "FW", rating: 134 },
            { name: "Achouri", pos: "FW", rating: 160 },
            { name: "Mattsson", pos: "MF", rating: 88 },
            { name: "Madsen", pos: "MF", rating: 88 },
            { name: "Delaney", pos: "MF", rating: 88 },
            { name: "Moalem", pos: "MF", rating: 30 },
            { name: "Højer", pos: "MF", rating: 30 },
            { name: "Clem", pos: "MF", rating: 30 },
            { name: "Moukoko", pos: "FW", rating: 50 },
            { name: "Larsson", pos: "FW", rating: 50 },
            { name: "R. Silva", pos: "FW", rating: 50 },
            { name: "Suzuki", pos: "DF", rating: 30 },
            { name: "Beijmo", pos: "DF", rating: 30 },
            { name: "G. Pereira", pos: "DF", rating: 98 },
            { name: "Hatzidiakos", pos: "DF", rating: 5 },
            { name: "Huescas", pos: "DF", rating: 5 },
        ],
        "fczurich": [
            { name: "Perea", pos: "FW", rating: 134 },
            { name: "Cavaleiro", pos: "FW", rating: 134 },
            { name: "Phaëton", pos: "FW", rating: 134 },
            { name: "Krasniqi", pos: "MF", rating: 88 },
            { name: "Palacio", pos: "MF", rating: 88 },
            { name: "Comenencia", pos: "MF", rating: 88 },
            { name: "Tsawa", pos: "MF", rating: 30 },
            { name: "Di Giusto", pos: "MF", rating: 30 },
            { name: "Bangoura", pos: "MF", rating: 30 },
            { name: "Emmanuel", pos: "FW", rating: 50 },
            { name: "Kény", pos: "FW", rating: 50 },
            { name: "Reverson", pos: "FW", rating: 50 },
            { name: "Kamberi", pos: "DF", rating: 30 },
            { name: "Segura", pos: "DF", rating: 30 },
            { name: "Kablan", pos: "DF", rating: 30 },
            { name: "Sauter", pos: "DF", rating: 5 },
            { name: "Hodža", pos: "DF", rating: 5 },
        ],
        "fenerbahce": [
            { name: "Aktürkoğlu", pos: "FW", rating: 134 },
            { name: "Muriqi", pos: "FW", rating: 134 },
            { name: "Musaba", pos: "FW", rating: 134 },
            { name: "Fred", pos: "MF", rating: 88 },
            { name: "Yüksek", pos: "MF", rating: 88 },
            { name: "Guendouzi", pos: "MF", rating: 88 },
            { name: "Yandaş", pos: "MF", rating: 30 },
            { name: "Álvarez", pos: "MF", rating: 30 },
            { name: "Kanté", pos: "MF", rating: 30 },
            { name: "Cherif", pos: "FW", rating: 50 },
            { name: "Aydın", pos: "FW", rating: 50 },
            { name: "Talisca", pos: "FW", rating: 50 },
            { name: "Brown", pos: "DF", rating: 30 },
            { name: "Söyüncü", pos: "DF", rating: 30 },
            { name: "Demir", pos: "DF", rating: 30 },
            { name: "Müldür", pos: "DF", rating: 5 },
            { name: "Mercan", pos: "DF", rating: 5 },
        ],
        "ferencvaros": [
            { name: "Acolatse", pos: "FW", rating: 134 },
            { name: "Levi", pos: "FW", rating: 134 },
            { name: "Yusuf", pos: "FW", rating: 134 },
            { name: "Cadu", pos: "MF", rating: 88 },
            { name: "Rommens", pos: "MF", rating: 88 },
            { name: "Keïta", pos: "MF", rating: 88 },
            { name: "Zachariassen", pos: "MF", rating: 30 },
            { name: "Corbu", pos: "MF", rating: 30 },
            { name: "Ötvös", pos: "MF", rating: 30 },
            { name: "Kovačević", pos: "FW", rating: 50 },
            { name: "Gruber", pos: "FW", rating: 50 },
            { name: "Bassey", pos: "FW", rating: 50 },
            { name: "M. Gómez", pos: "DF", rating: 30 },
            { name: "Osváth", pos: "DF", rating: 30 },
            { name: "Botka", pos: "DF", rating: 30 },
            { name: "Szalai", pos: "DF", rating: 5 },
            { name: "Makreckis", pos: "DF", rating: 5 },
        ],
        "feyenoord": [
            { name: "Ueda", pos: "FW", rating: 160 },
            { name: "Borges", pos: "FW", rating: 134 },
            { name: "Sauer", pos: "FW", rating: 134 },
            { name: "In-beom", pos: "MF", rating: 88 },
            { name: "Moder", pos: "MF", rating: 88 },
            { name: "Valente", pos: "MF", rating: 88 },
            { name: "Steijn", pos: "MF", rating: 30 },
            { name: "Kraaijeveld", pos: "MF", rating: 30 },
            { name: "Zand", pos: "MF", rating: 30 },
            { name: "Tengstedt", pos: "FW", rating: 50 },
            { name: "Moussa", pos: "FW", rating: 50 },
            { name: "Diarra", pos: "FW", rating: 50 },
            { name: "Nieuwkoop", pos: "DF", rating: 30 },
            { name: "Beelen", pos: "DF", rating: 30 },
            { name: "Watanabe", pos: "DF", rating: 30 },
            { name: "Smal", pos: "DF", rating: 5 },
            { name: "Juste", pos: "DF", rating: 5 },
        ],
        "fiorentina": [
            { name: "Kean", pos: "FW", rating: 164 },
            { name: "Gudmundsson", pos: "FW", rating: 104 },
            { name: "Harrison", pos: "FW", rating: 94 },
            { name: "Bove", pos: "MF", rating: 103 },
            { name: "Solomon", pos: "MF", rating: 73 },
            { name: "Mandragora", pos: "MF", rating: 53 },
            { name: "Ndour", pos: "MF", rating: 75 },
            { name: "Fagioli", pos: "MF", rating: 45 },
            { name: "Piccoli", pos: "FW", rating: 25 },
            { name: "Ranieri", pos: "DF", rating: 31 },
            { name: "Dodô", pos: "DF", rating: 11 },
            { name: "Gosens", pos: "DF", rating: 45 },
            { name: "Pongračić", pos: "DF", rating: 5 },
        ],
        "freiburg": [
            { name: "Scherhant", pos: "FW", rating: 134 },
            { name: "Höler", pos: "FW", rating: 134 },
            { name: "Irié", pos: "FW", rating: 134 },
            { name: "Suzuki", pos: "MF", rating: 88 },
            { name: "Osterhage", pos: "MF", rating: 88 },
            { name: "Eggestein", pos: "MF", rating: 88 },
            { name: "Kyereh", pos: "MF", rating: 30 },
            { name: "Beste", pos: "MF", rating: 30 },
            { name: "Höfler", pos: "MF", rating: 30 },
            { name: "Philipp", pos: "FW", rating: 50 },
            { name: "Matanović", pos: "FW", rating: 50 },
            { name: "Amegnaglo", pos: "FW", rating: 50 },
            { name: "Lienhart", pos: "DF", rating: 30 },
            { name: "Jung", pos: "DF", rating: 30 },
            { name: "Kübler", pos: "DF", rating: 30 },
            { name: "Ginter", pos: "DF", rating: 5 },
            { name: "Treu", pos: "DF", rating: 5 },
        ],
        "galatasaray": [
            { name: "Osimhen", pos: "FW", rating: 145 },
            { name: "Icardi", pos: "FW", rating: 134 },
            { name: "Noa Lang", pos: "FW", rating: 134 },
            { name: "Sara", pos: "MF", rating: 88 },
            { name: "Gündoğan", pos: "MF", rating: 88 },
            { name: "Torreira", pos: "MF", rating: 88 },
            { name: "Güner", pos: "MF", rating: 30 },
            { name: "Gürpüz", pos: "MF", rating: 30 },
            { name: "Yüzgeç", pos: "MF", rating: 30 },
            { name: "Akgün", pos: "FW", rating: 50 },
            { name: "Kutucu", pos: "FW", rating: 50 },
            { name: "Asprilla", pos: "FW", rating: 50 },
            { name: "Baltacı", pos: "DF", rating: 30 },
            { name: "Jakobs", pos: "DF", rating: 30 },
            { name: "D. Sánchez", pos: "DF", rating: 30 },
            { name: "Sallai", pos: "DF", rating: 5 },
            { name: "Elmalı", pos: "DF", rating: 5 },
        ],
        "genk": [
            { name: "Steuckers", pos: "FW", rating: 134 },
            { name: "Sor", pos: "FW", rating: 134 },
            { name: "Itō", pos: "FW", rating: 134 },
            { name: "Bangoura", pos: "MF", rating: 88 },
            { name: "Sattlberger", pos: "MF", rating: 88 },
            { name: "Heynen", pos: "MF", rating: 88 },
            { name: "Karetsas", pos: "MF", rating: 30 },
            { name: "Nkuba", pos: "MF", rating: 30 },
            { name: "Heymans", pos: "MF", rating: 30 },
            { name: "Bibout", pos: "FW", rating: 50 },
            { name: "Mirisola", pos: "FW", rating: 50 },
            { name: "Yokoyama", pos: "FW", rating: 50 },
            { name: "Palacios", pos: "DF", rating: 30 },
            { name: "Sadick", pos: "DF", rating: 30 },
            { name: "Smets", pos: "DF", rating: 30 },
            { name: "Kayembe", pos: "DF", rating: 5 },
            { name: "Medina", pos: "DF", rating: 5 },
        ],
        "hajduksplit": [
            { name: "Livaja", pos: "FW", rating: 134 },
            { name: "Šego", pos: "FW", rating: 134 },
            { name: "Sanyang", pos: "FW", rating: 134 },
            { name: "Pukštas", pos: "MF", rating: 88 },
            { name: "Krovinović", pos: "MF", rating: 88 },
            { name: "Pajaziti", pos: "MF", rating: 88 },
            { name: "Guillamón", pos: "MF", rating: 30 },
            { name: "Sigur", pos: "MF", rating: 30 },
            { name: "Brruti", pos: "MF", rating: 30 },
            { name: "Skelin", pos: "DF", rating: 30 },
            { name: "Hodak", pos: "DF", rating: 30 },
            { name: "Van Hoorenbeeck", pos: "DF", rating: 30 },
            { name: "Raçi", pos: "DF", rating: 5 },
            { name: "Marešić", pos: "DF", rating: 5 },
        ],
        "hamburgsv": [
            { name: "Jatta", pos: "FW", rating: 134 },
            { name: "Dompé", pos: "FW", rating: 134 },
            { name: "Philippe", pos: "FW", rating: 134 },
            { name: "Remberg", pos: "MF", rating: 88 },
            { name: "Capaldo", pos: "MF", rating: 88 },
            { name: "Lokonga", pos: "MF", rating: 88 },
            { name: "Elfadli", pos: "MF", rating: 30 },
            { name: "Vieira", pos: "MF", rating: 30 },
            { name: "Grønbæk", pos: "MF", rating: 30 },
            { name: "Poulsen", pos: "FW", rating: 50 },
            { name: "Downs", pos: "FW", rating: 50 },
            { name: "Otele", pos: "FW", rating: 50 },
            { name: "Mikelbrencis", pos: "DF", rating: 30 },
            { name: "Katterbach", pos: "DF", rating: 30 },
            { name: "Gocholeishvili", pos: "DF", rating: 30 },
            { name: "Omari", pos: "DF", rating: 5 },
            { name: "Torunarigha", pos: "DF", rating: 5 },
        ],
        "hearts": [
            { name: "Kabangu", pos: "FW", rating: 134 },
            { name: "Braga", pos: "FW", rating: 134 },
            { name: "Kaboré", pos: "FW", rating: 134 },
            { name: "Devlin", pos: "MF", rating: 88 },
            { name: "Spittal", pos: "MF", rating: 88 },
            { name: "Dhanda", pos: "MF", rating: 88 },
            { name: "Magnússon", pos: "MF", rating: 30 },
            { name: "Pollock", pos: "MF", rating: 30 },
            { name: "Kartum", pos: "MF", rating: 30 },
            { name: "Wilson", pos: "FW", rating: 50 },
            { name: "Mato", pos: "FW", rating: 50 },
            { name: "Kyziridis", pos: "FW", rating: 50 },
            { name: "Kingsley", pos: "DF", rating: 30 },
            { name: "Halkett", pos: "DF", rating: 30 },
            { name: "McCart", pos: "DF", rating: 30 },
            { name: "Borchgrevink", pos: "DF", rating: 5 },
            { name: "Milne", pos: "DF", rating: 5 },
        ],
        "hoffenheim": [
            { name: "Kramarić", pos: "FW", rating: 134 },
            { name: "Bülter", pos: "FW", rating: 134 },
            { name: "Hložek", pos: "FW", rating: 134 },
            { name: "Stach", pos: "MF", rating: 103 },
            { name: "Grillitsch", pos: "MF", rating: 103 },
            { name: "Prömel", pos: "MF", rating: 103 },
            { name: "Geiger", pos: "MF", rating: 75 },
            { name: "Tohumcu", pos: "MF", rating: 75 },
            { name: "Berisha", pos: "FW", rating: 65 },
            { name: "Tabaković", pos: "FW", rating: 65 },
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
            { name: "Barella", pos: "MF", rating: 83 },
            { name: "Çalhanoğlu", pos: "MF", rating: 83 },
            { name: "Mkhitaryan", pos: "MF", rating: 63 },
            { name: "Frattesi", pos: "MF", rating: 35 },
            { name: "Zieliński", pos: "MF", rating: 75 },
            { name: "Sucic", pos: "MF", rating: 30 },
            { name: "Bastoni", pos: "DF", rating: 31 },
            { name: "Dimarco", pos: "DF", rating: 21 },
            { name: "Acerbi", pos: "DF", rating: 21 },
            { name: "Darmian", pos: "DF", rating: 5 },
            { name: "Bisseck", pos: "DF", rating: 5 },
            { name: "De Vrij", pos: "DF", rating: 5 },
        ],
        "istanbulbasaksehir": [
            { name: "Selke", pos: "FW", rating: 134 },
            { name: "N. da Costa", pos: "FW", rating: 134 },
            { name: "Shomurodov", pos: "FW", rating: 134 },
            { name: "Kemen", pos: "MF", rating: 88 },
            { name: "Özdemir", pos: "MF", rating: 88 },
            { name: "Ergün", pos: "MF", rating: 88 },
            { name: "Sarı", pos: "MF", rating: 30 },
            { name: "Fayzullaev", pos: "MF", rating: 30 },
            { name: "Crespo", pos: "MF", rating: 30 },
            { name: "Brnić", pos: "FW", rating: 50 },
            { name: "Yıldırım", pos: "FW", rating: 50 },
            { name: "Duarte", pos: "DF", rating: 30 },
            { name: "Opoku", pos: "DF", rating: 30 },
            { name: "Bulut", pos: "DF", rating: 30 },
            { name: "Güreler", pos: "DF", rating: 5 },
            { name: "Opéri", pos: "DF", rating: 5 },
        ],
        "juventus": [
            { name: "Vlahović", pos: "FW", rating: 134 },
            { name: "Yıldız", pos: "FW", rating: 134 },
            { name: "Conceição", pos: "FW", rating: 104 },
            { name: "Koopmeiners", pos: "MF", rating: 53 },
            { name: "Miretti", pos: "MF", rating: 43 },
            { name: "Thuram-Ulien", pos: "MF", rating: 83 },
            { name: "Locatelli", pos: "MF", rating: 75 },
            { name: "McKennie", pos: "MF", rating: 105 },
            { name: "Milik", pos: "FW", rating: 55 },
            { name: "David", pos: "FW", rating: 65 },
            { name: "Boga", pos: "FW", rating: 85 },
            { name: "Bremer", pos: "DF", rating: 31 },
            { name: "Cambiasso", pos: "DF", rating: 71 },
            { name: "Kalulu", pos: "DF", rating: 21 },
            { name: "Gatti", pos: "DF", rating: 41 },
            { name: "Kostic", pos: "DF", rating: 45 },
            { name: "Kelly", pos: "DF", rating: 10 },
        ],
        "kairatalmaty": [
            { name: "Gual", pos: "FW", rating: 134 },
            { name: "Jorginho", pos: "FW", rating: 134 },
            { name: "Edmilson", pos: "FW", rating: 134 },
            { name: "Kasabulat", pos: "MF", rating: 88 },
            { name: "Sadybekov", pos: "MF", rating: 88 },
            { name: "Baybek", pos: "MF", rating: 88 },
            { name: "Oksanen", pos: "MF", rating: 30 },
            { name: "Tuyakbayev", pos: "MF", rating: 30 },
            { name: "Glazer", pos: "MF", rating: 30 },
            { name: "Satpayev", pos: "FW", rating: 50 },
            { name: "Zeballos", pos: "FW", rating: 50 },
            { name: "Birkurmanov", pos: "FW", rating: 50 },
            { name: "Mata", pos: "DF", rating: 30 },
            { name: "Kurgin", pos: "DF", rating: 30 },
            { name: "Martynovich", pos: "DF", rating: 30 },
            { name: "Tapalov", pos: "DF", rating: 5 },
            { name: "Bazarbaev", pos: "DF", rating: 5 },
        ],
        "lask": [
            { name: "Usor", pos: "FW", rating: 134 },
            { name: "Lang", pos: "FW", rating: 134 },
            { name: "Adeniran", pos: "FW", rating: 134 },
            { name: "Horvath", pos: "MF", rating: 88 },
            { name: "Coulibaly", pos: "MF", rating: 88 },
            { name: "Smakaj", pos: "MF", rating: 88 },
            { name: "Bogarde", pos: "MF", rating: 30 },
            { name: "Daněk", pos: "MF", rating: 30 },
            { name: "Sanogo", pos: "MF", rating: 30 },
            { name: "Kalajdžić", pos: "FW", rating: 50 },
            { name: "Entrup", pos: "FW", rating: 50 },
            { name: "Harakaté", pos: "FW", rating: 50 },
            { name: "Bello", pos: "DF", rating: 30 },
            { name: "Mbuyamba", pos: "DF", rating: 30 },
            { name: "Andrade", pos: "DF", rating: 30 },
            { name: "Jørgensen", pos: "DF", rating: 5 },
            { name: "Flecker", pos: "DF", rating: 5 },
        ],
        "lazio": [
            { name: "Zaccagni", pos: "FW", rating: 134 },
            { name: "Dia", pos: "FW", rating: 94 },
            { name: "Guendouzi", pos: "MF", rating: 103 },
            { name: "Rovella", pos: "MF", rating: 73 },
            { name: "D. Maldini", pos: "MF", rating: 10 },
            { name: "Dele-Bashiru", pos: "MF", rating: 55 },
            { name: "Cataldi", pos: "MF", rating: 75 },
            { name: "Noslin", pos: "FW", rating: 105 },
            { name: "Isaksen", pos: "FW", rating: 65 },
            { name: "Pedro", pos: "FW", rating: 150 },
            { name: "Romagnoli", pos: "DF", rating: 21 },
            { name: "Gila", pos: "DF", rating: 11 },
            { name: "Tavares", pos: "DF", rating: 21 },
            { name: "Lazzari", pos: "DF", rating: 21 },
            { name: "Patric", pos: "DF", rating: 5 },
            { name: "Pellegrini", pos: "DF", rating: 15 },
            { name: "Marušić", pos: "DF", rating: 5 },
        ],
        "lechpoznan": [
            { name: "Ishak", pos: "FW", rating: 134 },
            { name: "Agnero", pos: "FW", rating: 134 },
            { name: "Gholizadeh", pos: "FW", rating: 134 },
            { name: "Kozubal", pos: "MF", rating: 88 },
            { name: "Bengtsson", pos: "MF", rating: 88 },
            { name: "Murawski", pos: "MF", rating: 88 },
            { name: "Þórðarson", pos: "MF", rating: 30 },
            { name: "Jagiełło", pos: "MF", rating: 30 },
            { name: "Gmur", pos: "MF", rating: 30 },
            { name: "Wålemark", pos: "FW", rating: 50 },
            { name: "Håkans", pos: "FW", rating: 50 },
            { name: "Sayyadmanesh", pos: "FW", rating: 50 },
            { name: "J. Pereira", pos: "DF", rating: 30 },
            { name: "Douglas", pos: "DF", rating: 30 },
            { name: "Moutinho", pos: "DF", rating: 30 },
            { name: "Gurgul", pos: "DF", rating: 5 },
            { name: "Milić", pos: "DF", rating: 5 },
        ],
        "legiawarsaw": [
            { name: "Adamski", pos: "FW", rating: 134 },
            { name: "Čolak", pos: "FW", rating: 134 },
            { name: "Nsame", pos: "FW", rating: 134 },
            { name: "C. Gonçalves", pos: "MF", rating: 88 },
            { name: "Kapustka", pos: "MF", rating: 88 },
            { name: "Chodyna", pos: "MF", rating: 88 },
            { name: "Arreiol", pos: "MF", rating: 30 },
            { name: "Wszołek", pos: "MF", rating: 30 },
            { name: "Augustyniak", pos: "MF", rating: 30 },
            { name: "Żewłakow", pos: "FW", rating: 50 },
            { name: "Rajović", pos: "FW", rating: 50 },
            { name: "Kováčik", pos: "FW", rating: 50 },
            { name: "Pankov", pos: "DF", rating: 30 },
            { name: "Reca", pos: "DF", rating: 30 },
            { name: "Vinagre", pos: "DF", rating: 30 },
            { name: "Stojanović", pos: "DF", rating: 5 },
            { name: "Jędrzejczyk", pos: "DF", rating: 5 },
        ],
        "lens": [
            { name: "Sotoca", pos: "FW", rating: 64 },
            { name: "Thauvin", pos: "FW", rating: 154 },
            { name: "W. Saïd", pos: "FW", rating: 164 },
            { name: "Abdulhamid", pos: "MF", rating: 23 },
            { name: "M. Sangare", pos: "MF", rating: 3 },
            { name: "Bulatovic", pos: "MF", rating: 3 },
            { name: "Cuisance", pos: "MF", rating: 5 },
            { name: "Erawan", pos: "MF", rating: 1 },
            { name: "Haidara", pos: "MF", rating: 15 },
            { name: "Saint-Maximin", pos: "FW", rating: 55 },
            { name: "Edouard", pos: "FW", rating: 65 },
            { name: "Udol", pos: "DF", rating: 1 },
            { name: "Masuaku", pos: "DF", rating: 1 },
            { name: "Antonio", pos: "DF", rating: 5 },
            { name: "M. Sarr", pos: "DF", rating: 1 },
        ],
        "lille": [
            { name: "Fernandez-Pardo", pos: "FW", rating: 134 },
            { name: "Zhegrova", pos: "FW", rating: 134 },
            { name: "Correia", pos: "FW", rating: 64 },
            { name: "Bentaleb", pos: "MF", rating: 33 },
            { name: "Haraldsson", pos: "MF", rating: 133 },
            { name: "Mukau", pos: "MF", rating: 13 },
            { name: "Bouaddi", pos: "MF", rating: 25 },
            { name: "E. Mbappé", pos: "MF", rating: 5 },
            { name: "André", pos: "MF", rating: 30 },
            { name: "Giroud", pos: "FW", rating: 100 },
            { name: "Igamane", pos: "FW", rating: 69 },
            { name: "Perraud", pos: "DF", rating: 41 },
            { name: "Ngoy", pos: "DF", rating: 11 },
            { name: "Meunier", pos: "DF", rating: 61 },
            { name: "Mandi", pos: "DF", rating: 15 },
            { name: "Ismaily", pos: "DF", rating: 25 },
            { name: "Touré", pos: "DF", rating: 25 },
        ],
        "liverpool": [
            { name: "Salah", pos: "FW", rating: 134 },
            { name: "Isak", pos: "FW", rating: 134 },
            { name: "Ekitike", pos: "FW", rating: 122 },
            { name: "Gakpo", pos: "FW", rating: 108 },
            { name: "Mac Allister", pos: "MF", rating: 80 },
            { name: "Gravenberch", pos: "MF", rating: 77 },
            { name: "Szoboszlai", pos: "MF", rating: 123 },
            { name: "Wirtz", pos: "MF", rating: 118 },
            { name: "Jones", pos: "MF", rating: 75 },
            { name: "Chiesa", pos: "FW", rating: 65 },
            { name: "Ngumoha", pos: "FW", rating: 35 },
            { name: "Van Dijk", pos: "DF", rating: 99 },
            { name: "Bradley", pos: "DF", rating: 10 },
            { name: "Frimpong", pos: "DF", rating: 25 },
            { name: "Kerkez", pos: "DF", rating: 25 },
            { name: "V. Munoz", pos: "DF", rating: 2 },
        ],
        "ludogorets": [
            { name: "Duah", pos: "FW", rating: 134 },
            { name: "Salido", pos: "FW", rating: 134 },
            { name: "Vidal", pos: "FW", rating: 134 },
            { name: "Camara", pos: "MF", rating: 88 },
            { name: "Chochev", pos: "MF", rating: 88 },
            { name: "Stanić", pos: "MF", rating: 88 },
            { name: "Duarte", pos: "MF", rating: 30 },
            { name: "Kaloč", pos: "MF", rating: 30 },
            { name: "Yordanov", pos: "MF", rating: 30 },
            { name: "Cruz", pos: "FW", rating: 50 },
            { name: "E. Rodríguez", pos: "FW", rating: 50 },
            { name: "Bile", pos: "FW", rating: 50 },
            { name: "Andersson", pos: "DF", rating: 30 },
            { name: "Nedyalkov", pos: "DF", rating: 30 },
            { name: "Terziev", pos: "DF", rating: 30 },
            { name: "Kurtulus", pos: "DF", rating: 5 },
            { name: "Son", pos: "DF", rating: 5 },
        ],
        "lyon": [
            { name: "Moreira", pos: "FW", rating: 54 },
            { name: "Mikautadze", pos: "FW", rating: 134 },
            { name: "Yaremchuk", pos: "FW", rating: 59 },
            { name: "Endrick", pos: "FW", rating: 175 },
            { name: "Sulc", pos: "MF", rating: 143 },
            { name: "Tolisso", pos: "MF", rating: 123 },
            { name: "Abner", pos: "MF", rating: 43 },
            { name: "Nartey", pos: "MF", rating: 20 },
            { name: "Karabec", pos: "MF", rating: 19 },
            { name: "Mangala", pos: "MF", rating: 1 },
            { name: "Nuamah", pos: "MF", rating: 10 },
            { name: "Tessmann", pos: "MF", rating: 18 },
            { name: "Fofana", pos: "FW", rating: 55 },
            { name: "Ghezzal", pos: "FW", rating: 3 },
            { name: "R. Kluivert", pos: "DF", rating: 21 },
            { name: "Kango", pos: "DF", rating: 1 },
            { name: "Mata", pos: "DF", rating: 9 },
            { name: "Tagliafico", pos: "DF", rating: 5 },
            { name: "Maitland-Niles", pos: "DF", rating: 15 },
            { name: "Hateboer", pos: "DF", rating: 2 },
        ],
        "malmo": [
            { name: "Botheim", pos: "FW", rating: 134 },
            { name: "D. García", pos: "FW", rating: 134 },
            { name: "Ekong", pos: "FW", rating: 134 },
            { name: "Sjöstrand", pos: "MF", rating: 88 },
            { name: "Lundbergh", pos: "MF", rating: 88 },
            { name: "Karabelyov", pos: "MF", rating: 88 },
            { name: "Rosengren", pos: "MF", rating: 30 },
            { name: "Christiansen", pos: "MF", rating: 30 },
            { name: "Vecchia", pos: "MF", rating: 30 },
            { name: "Hakšabanović", pos: "FW", rating: 50 },
            { name: "D. García", pos: "FW", rating: 50 },
            { name: "Guðjohnsen", pos: "FW", rating: 50 },
            { name: "Karlsson", pos: "DF", rating: 30 },
            { name: "Kurtulus", pos: "DF", rating: 30 },
            { name: "Đurić", pos: "DF", rating: 30 },
            { name: "Stryger", pos: "DF", rating: 5 },
            { name: "Jansson", pos: "DF", rating: 5 },
        ],
        "manchestercity": [
            { name: "Haaland", pos: "FW", rating: 222 },
            { name: "Doku", pos: "FW", rating: 134 },
            { name: "Semenyo", pos: "FW", rating: 120 },
            { name: "Cherki", pos: "FW", rating: 140 },
            { name: "Rodri", pos: "MF", rating: 90 },
            { name: "Reijnders", pos: "MF", rating: 78 },
            { name: "Nunes", pos: "MF", rating: 103 },
            { name: "Kovačić", pos: "MF", rating: 50 },
            { name: "McAtee", pos: "MF", rating: 4 },
            { name: "Foden", pos: "MF", rating: 78 },
            { name: "Nico", pos: "MF", rating: 55 },
            { name: "Savinho", pos: "FW", rating: 35 },
            { name: "Bobb", pos: "FW", rating: 23 },
            { name: "Marmoush", pos: "FW", rating: 60 },
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
            { name: "Mlakar", pos: "FW", rating: 134 },
            { name: "Vizinger", pos: "FW", rating: 134 },
            { name: "Tetteh", pos: "FW", rating: 134 },
            { name: "Viher", pos: "MF", rating: 88 },
            { name: "Cipot", pos: "MF", rating: 88 },
            { name: "Repas", pos: "MF", rating: 88 },
            { name: "Reghba", pos: "MF", rating: 30 },
            { name: "Seri", pos: "MF", rating: 30 },
            { name: "Zambrano", pos: "MF", rating: 30 },
            { name: "Tadič", pos: "FW", rating: 50 },
            { name: "Bumbić", pos: "DF", rating: 30 },
            { name: "M'bondo", pos: "DF", rating: 30 },
            { name: "Kikec", pos: "DF", rating: 30 },
            { name: "Slana", pos: "DF", rating: 5 },
            { name: "Rekik", pos: "DF", rating: 5 },
        ],
        "marseille": [
            { name: "Greenwood", pos: "FW", rating: 174 },
            { name: "Aubameyang", pos: "FW", rating: 123 },
            { name: "Paixao", pos: "FW", rating: 77 },
            { name: "Nwaneri", pos: "FW", rating: 64 },
            { name: "Gouiri", pos: "MF", rating: 98 },
            { name: "Højbjerg", pos: "MF", rating: 50 },
            { name: "Rabiot", pos: "MF", rating: 103 },
            { name: "Q. Timber", pos: "MF", rating: 43 },
            { name: "Nnadi", pos: "MF", rating: 1 },
            { name: "Kondogbia", pos: "MF", rating: 35 },
            { name: "Vermeeren", pos: "MF", rating: 5 },
            { name: "Lago", pos: "FW", rating: 6 },
            { name: "Nadir", pos: "FW", rating: 15 },
            { name: "Balerdi", pos: "DF", rating: 3 },
            { name: "Medina", pos: "DF", rating: 3 },
            { name: "Emerson", pos: "DF", rating: 6 },
            { name: "T. Weah", pos: "DF", rating: 40 },
            { name: "Aguerd", pos: "DF", rating: 8 },
            { name: "Pavard", pos: "DF", rating: 31 },
            { name: "Egan-Riley", pos: "DF", rating: 1 },
        ],
        "midtjylland": [
            { name: "Djú", pos: "FW", rating: 134 },
            { name: "Brumado", pos: "FW", rating: 134 },
            { name: "Osorio", pos: "FW", rating: 134 },
            { name: "Billing", pos: "MF", rating: 88 },
            { name: "Bravo", pos: "MF", rating: 88 },
            { name: "Byskov", pos: "MF", rating: 88 },
            { name: "Djabi", pos: "MF", rating: 30 },
            { name: "Castillo", pos: "MF", rating: 30 },
            { name: "Gue-sung", pos: "FW", rating: 50 },
            { name: "Chilufya", pos: "FW", rating: 50 },
            { name: "Uhre", pos: "FW", rating: 50 },
            { name: "Han-beom", pos: "DF", rating: 30 },
            { name: "Diao", pos: "DF", rating: 30 },
            { name: "Erlić", pos: "DF", rating: 30 },
            { name: "Gabriel", pos: "DF", rating: 5 },
            { name: "Sørensen", pos: "DF", rating: 5 },
        ],
        "monaco": [
            { name: "Fati", pos: "FW", rating: 160 },
            { name: "Balogun", pos: "FW", rating: 184 },
            { name: "Adingra", pos: "FW", rating: 64 },
            { name: "Zakaria", pos: "MF", rating: 43 },
            { name: "Golovin", pos: "MF", rating: 63 },
            { name: "Camara", pos: "MF", rating: 103 },
            { name: "Pogba", pos: "MF", rating: 36 },
            { name: "Teze", pos: "MF", rating: 15 },
            { name: "Camara", pos: "MF", rating: 55 },
            { name: "Minamino", pos: "FW", rating: 65 },
            { name: "Akliouche", pos: "FW", rating: 88 },
            { name: "Caio Henrique", pos: "FW", rating: 44 },
            { name: "Brunner", pos: "FW", rating: 1 },
            { name: "Mawissa", pos: "DF", rating: 1 },
            { name: "Faes", pos: "DF", rating: 3 },
            { name: "Kehrer", pos: "DF", rating: 6 },
            { name: "Dier", pos: "DF", rating: 12 },
            { name: "Salisu", pos: "DF", rating: 5 },
            { name: "Nibombe", pos: "DF", rating: 3 },
        ],
        "napoli": [
            { name: "Lukaku", pos: "FW", rating: 170 },
            { name: "Neres", pos: "FW", rating: 64 },
            { name: "Højlund", pos: "FW", rating: 154 },
            { name: "Lobotka", pos: "MF", rating: 33 },
            { name: "Anguissa", pos: "MF", rating: 43 },
            { name: "McTominay", pos: "MF", rating: 103 },
            { name: "De Bruyne", pos: "MF", rating: 83 },
            { name: "Gilmour", pos: "MF", rating: 75 },
            { name: "Politano", pos: "FW", rating: 75 },
            { name: "Santos", pos: "FW", rating: 55 },
            { name: "Di Lorenzo", pos: "DF", rating: 11 },
            { name: "Rrahmani", pos: "DF", rating: 21 },
            { name: "Buongiorno", pos: "DF", rating: 21 },
            { name: "Olivera", pos: "DF", rating: 15 },
            { name: "Spinazzola", pos: "DF", rating: 25 },
            { name: "Mazzocchi", pos: "DF", rating: 5 },
        ],
        "newcastleunited": [
            { name: "Barnes", pos: "FW", rating: 154 },
            { name: "Woltemade", pos: "FW", rating: 144 },
            { name: "Osula", pos: "FW", rating: 134 },
            { name: "Guimarães", pos: "MF", rating: 103 },
            { name: "Joelinton", pos: "MF", rating: 63 },
            { name: "Tonali", pos: "MF", rating: 83 },
            { name: "Ramsey", pos: "MF", rating: 45 },
            { name: "Willock", pos: "MF", rating: 45 },
            { name: "C. Wilson", pos: "FW", rating: 65 },
            { name: "Murphy", pos: "FW", rating: 65 },
            { name: "Schär", pos: "DF", rating: 11 },
            { name: "Botman", pos: "DF", rating: 21 },
            { name: "Burn", pos: "DF", rating: 31 },
            { name: "Livramento", pos: "DF", rating: 31 },
            { name: "Hall", pos: "DF", rating: 25 },
            { name: "Thiaw", pos: "DF", rating: 25 },
        ],
        "nice": [
            { name: "Abdi", pos: "MF", rating: 54 },
            { name: "Vanhoutte", pos: "MF", rating: 10 },
            { name: "Sanson", pos: "MF", rating: 10 },
            { name: "Clauss", pos: "MF", rating: 25 },
            { name: "Sanson", pos: "MF", rating: 75 },
            { name: "Ndayishimiye", pos: "MF", rating: 15 },
            { name: "Cho", pos: "FW", rating: 55 },
            { name: "Diop", pos: "FW", rating: 125 },
            { name: "Carlos", pos: "FW", rating: 15 },
            { name: "Dante", pos: "DF", rating: 7 },
            { name: "Oppong", pos: "DF", rating: 11 },
            { name: "Bard", pos: "DF", rating: 5 },
            { name: "Bah", pos: "DF", rating: 5 },
            { name: "A. Mendy", pos: "DF", rating: 15 },
        ],
        "nordsjlland": [
            { name: "Solbakken", pos: "FW", rating: 134 },
            { name: "Lind", pos: "FW", rating: 134 },
            { name: "Adel", pos: "FW", rating: 134 },
            { name: "Brink", pos: "MF", rating: 88 },
            { name: "Røjkjær", pos: "MF", rating: 88 },
            { name: "Amoako", pos: "MF", rating: 88 },
            { name: "Janssen", pos: "MF", rating: 30 },
            { name: "Mohammed", pos: "MF", rating: 30 },
            { name: "Sanoussi", pos: "MF", rating: 30 },
            { name: "Nene", pos: "FW", rating: 50 },
            { name: "Alio", pos: "FW", rating: 50 },
            { name: "Jóhannesson", pos: "FW", rating: 50 },
            { name: "Ankersen", pos: "DF", rating: 30 },
            { name: "Salquist", pos: "DF", rating: 30 },
            { name: "Acquah", pos: "DF", rating: 30 },
            { name: "Norheim", pos: "DF", rating: 5 },
            { name: "Lähteenmäki", pos: "DF", rating: 5 },
        ],
        "olympiakos": [
            { name: "Kaabi", pos: "FW", rating: 134 },
            { name: "Taremi", pos: "FW", rating: 134 },
            { name: "Clayton", pos: "FW", rating: 134 },
            { name: "G. Martins", pos: "MF", rating: 88 },
            { name: "Chiquinho", pos: "MF", rating: 88 },
            { name: "Hezze", pos: "MF", rating: 88 },
            { name: "Fortounis", pos: "MF", rating: 30 },
            { name: "Nascimento", pos: "MF", rating: 30 },
            { name: "D. García", pos: "MF", rating: 30 },
            { name: "Ortega", pos: "DF", rating: 30 },
            { name: "Pirola", pos: "DF", rating: 30 },
            { name: "Vezo", pos: "DF", rating: 30 },
            { name: "Rodinei", pos: "DF", rating: 5 },
            { name: "Retsos", pos: "DF", rating: 5 },
        ],
        "pafos": [
            { name: "Bassouamina", pos: "FW", rating: 134 },
            { name: "Jajá", pos: "FW", rating: 134 },
            { name: "Lelê", pos: "FW", rating: 134 },
            { name: "Quina", pos: "MF", rating: 88 },
            { name: "Sema", pos: "MF", rating: 88 },
            { name: "Šunjić", pos: "MF", rating: 88 },
            { name: "Dragomir", pos: "MF", rating: 30 },
            { name: "Mammadov", pos: "MF", rating: 30 },
            { name: "Brito", pos: "MF", rating: 30 },
            { name: "A. Silva", pos: "FW", rating: 50 },
            { name: "Luiz", pos: "DF", rating: 30 },
            { name: "Goldar", pos: "DF", rating: 30 },
            { name: "Felipe", pos: "DF", rating: 30 },
            { name: "Ioannou", pos: "DF", rating: 5 },
            { name: "Guessand", pos: "DF", rating: 5 },
        ],
        "panathinaikos": [
            { name: "Dessers", pos: "FW", rating: 134 },
            { name: "Tetteh", pos: "FW", rating: 134 },
            { name: "Pantelidis", pos: "FW", rating: 134 },
            { name: "Pellistri", pos: "MF", rating: 88 },
            { name: "Camara", pos: "MF", rating: 88 },
            { name: "Čerin", pos: "MF", rating: 88 },
            { name: "Chirivella", pos: "MF", rating: 30 },
            { name: "Siopis", pos: "MF", rating: 30 },
            { name: "Zaroury", pos: "MF", rating: 30 },
            { name: "Calabria", pos: "DF", rating: 30 },
            { name: "Katris", pos: "DF", rating: 30 },
            { name: "Touba", pos: "DF", rating: 30 },
            { name: "Palmer-Brown", pos: "DF", rating: 5 },
            { name: "Ingason", pos: "DF", rating: 5 },
        ],
        "paok": [
            { name: "Chalov", pos: "FW", rating: 134 },
            { name: "Jeremejeff", pos: "FW", rating: 134 },
            { name: "Mythou", pos: "FW", rating: 134 },
            { name: "Despodov", pos: "MF", rating: 88 },
            { name: "Konstantelias", pos: "MF", rating: 88 },
            { name: "Camara", pos: "MF", rating: 88 },
            { name: "Pelkas", pos: "MF", rating: 30 },
            { name: "Zafeiris", pos: "MF", rating: 30 },
            { name: "Meïté", pos: "MF", rating: 30 },
            { name: "Kenny", pos: "DF", rating: 30 },
            { name: "Michailidis", pos: "DF", rating: 30 },
            { name: "Apetenok", pos: "DF", rating: 30 },
            { name: "Rahman", pos: "DF", rating: 5 },
            { name: "Thymianis", pos: "DF", rating: 5 },
        ],
        "partizan": [
            { name: "Kojzek", pos: "FW", rating: 134 },
            { name: "Seck", pos: "FW", rating: 134 },
            { name: "Lekić", pos: "FW", rating: 134 },
            { name: "Vukotić", pos: "MF", rating: 88 },
            { name: "Zdjelar", pos: "MF", rating: 88 },
            { name: "Živković", pos: "MF", rating: 88 },
            { name: "Trifunović", pos: "MF", rating: 30 },
            { name: "Ugrešić", pos: "MF", rating: 30 },
            { name: "Ninić", pos: "MF", rating: 30 },
            { name: "Martinović", pos: "FW", rating: 50 },
            { name: "Polter", pos: "FW", rating: 50 },
            { name: "Kostić", pos: "FW", rating: 50 },
            { name: "Stojković", pos: "DF", rating: 30 },
            { name: "Jurčević", pos: "DF", rating: 30 },
            { name: "Milovanović", pos: "DF", rating: 30 },
            { name: "Dragojević", pos: "DF", rating: 5 },
            { name: "Mohammed", pos: "DF", rating: 5 },
        ],
        "porto": [
            { name: "L. de Jong", pos: "FW", rating: 134 },
            { name: "Pepê", pos: "FW", rating: 134 },
            { name: "Aghehowa", pos: "FW", rating: 134 },
            { name: "W. Gomes", pos: "MF", rating: 88 },
            { name: "Froholdt", pos: "MF", rating: 88 },
            { name: "Veiga", pos: "MF", rating: 88 },
            { name: "Rosario", pos: "MF", rating: 30 },
            { name: "Varela", pos: "MF", rating: 30 },
            { name: "Fofana", pos: "MF", rating: 30 },
            { name: "Sainz", pos: "FW", rating: 50 },
            { name: "A. Silva", pos: "FW", rating: 50 },
            { name: "Gül", pos: "FW", rating: 50 },
            { name: "Kiwior", pos: "DF", rating: 30 },
            { name: "Bednarek", pos: "DF", rating: 30 },
            { name: "Sanusi", pos: "DF", rating: 30 },
            { name: "N. Pérez", pos: "DF", rating: 5 },
            { name: "A. Costa", pos: "DF", rating: 5 },
        ],
        "psg": [
            { name: "Dembélé", pos: "FW", rating: 206 },
            { name: "Barcola", pos: "FW", rating: 64 },
            { name: "Doué", pos: "FW", rating: 140 },
            { name: "Kvaratskhelia", pos: "FW", rating: 180 },
            { name: "Vitinha", pos: "MF", rating: 100 },
            { name: "Neves", pos: "MF", rating: 118 },
            { name: "F. Ruiz", pos: "MF", rating: 99 },
            { name: "Kang-in", pos: "MF", rating: 75 },
            { name: "Mayulu", pos: "MF", rating: 30 },
            { name: "Zaïre-Emery", pos: "MF", rating: 20 },
            { name: "Kolo Muani", pos: "FW", rating: 25 },
            { name: "G. Ramos", pos: "FW", rating: 60 },
            { name: "Marquinhos", pos: "DF", rating: 34 },
            { name: "Pacho", pos: "DF", rating: 34 },
            { name: "Hakimi", pos: "DF", rating: 60 },
            { name: "Mendes", pos: "DF", rating: 55 },
            { name: "Beraldo", pos: "DF", rating: 25 },
            { name: "Zabarnyi", pos: "DF", rating: 5 },
        ],
        "psveindhoven": [
            { name: "Boadu", pos: "FW", rating: 134 },
            { name: "van Bommel", pos: "FW", rating: 134 },
            { name: "Pepi", pos: "FW", rating: 134 },
            { name: "Veerman", pos: "MF", rating: 88 },
            { name: "Schouten", pos: "MF", rating: 88 },
            { name: "Perišić", pos: "MF", rating: 88 },
            { name: "Wanner", pos: "MF", rating: 30 },
            { name: "Til", pos: "MF", rating: 30 },
            { name: "Fernandez", pos: "MF", rating: 30 },
            { name: "Driouech", pos: "FW", rating: 50 },
            { name: "Pléa", pos: "FW", rating: 50 },
            { name: "Bajraktarević", pos: "FW", rating: 50 },
            { name: "Salah-Eddine", pos: "DF", rating: 30 },
            { name: "Gasiorowski", pos: "DF", rating: 30 },
            { name: "Obispo", pos: "DF", rating: 30 },
            { name: "Flamingo", pos: "DF", rating: 5 },
            { name: "Dest", pos: "DF", rating: 5 },
        ],
        "qarabag": [
            { name: "Sawo", pos: "FW", rating: 134 },
            { name: "Durán", pos: "FW", rating: 134 },
            { name: "Qurbanlı", pos: "FW", rating: 134 },
            { name: "Mouaddib", pos: "MF", rating: 88 },
            { name: "Janković", pos: "MF", rating: 88 },
            { name: "Montiel", pos: "MF", rating: 88 },
            { name: "Zoubir", pos: "MF", rating: 30 },
            { name: "Borges", pos: "MF", rating: 30 },
            { name: "Kashchuk", pos: "MF", rating: 30 },
            { name: "Cephas", pos: "FW", rating: 50 },
            { name: "Langa", pos: "DF", rating: 30 },
            { name: "M. Silva", pos: "DF", rating: 30 },
            { name: "Mustafazade", pos: "DF", rating: 30 },
            { name: "Bolt", pos: "DF", rating: 5 },
            { name: "Gnali", pos: "DF", rating: 5 },
        ],
        "rangers": [
            { name: "Shankland", pos: "FW", rating: 134 },
            { name: "Danilo", pos: "FW", rating: 134 },
            { name: "Chermiti", pos: "FW", rating: 134 },
            { name: "Chukwuani", pos: "MF", rating: 88 },
            { name: "Barron", pos: "MF", rating: 88 },
            { name: "Diomande", pos: "MF", rating: 88 },
            { name: "Aasgaard", pos: "MF", rating: 30 },
            { name: "Bajrami", pos: "MF", rating: 30 },
            { name: "Cifuentes", pos: "MF", rating: 30 },
            { name: "Antman", pos: "FW", rating: 50 },
            { name: "Naderi", pos: "FW", rating: 50 },
            { name: "Gassama", pos: "FW", rating: 50 },
            { name: "Rommens", pos: "DF", rating: 30 },
            { name: "McCrorie", pos: "DF", rating: 30 },
            { name: "Souttar", pos: "DF", rating: 30 },
            { name: "Nsiala", pos: "DF", rating: 5 },
            { name: "Sterling", pos: "DF", rating: 5 },
        ],
        "rbleipzig": [
            { name: "Y. Diomande", pos: "FW", rating: 150 },
            { name: "Nusa", pos: "MF", rating: 103 },
            { name: "Haidara", pos: "MF", rating: 103 },
            { name: "Kampl", pos: "MF", rating: 103 },
            { name: "Seiwald", pos: "MF", rating: 75 },
            { name: "Elmas", pos: "MF", rating: 75 },
            { name: "Baumgartner", pos: "MF", rating: 75 },
            { name: "Poulsen", pos: "FW", rating: 65 },
            { name: "Silva", pos: "FW", rating: 65 },
            { name: "Lukeba", pos: "DF", rating: 61 },
            { name: "Orban", pos: "DF", rating: 61 },
            { name: "Raum", pos: "DF", rating: 61 },
            { name: "Henrichs", pos: "DF", rating: 25 },
            { name: "Geertruida", pos: "DF", rating: 25 },
            { name: "Bitshiabu", pos: "DF", rating: 25 },
        ],
        "realbetis": [
            { name: "Antony", pos: "FW", rating: 134 },
            { name: "Ávila", pos: "FW", rating: 134 },
            { name: "Ezzalzouli", pos: "FW", rating: 134 },
            { name: "Altimira", pos: "MF", rating: 88 },
            { name: "Fornals", pos: "MF", rating: 88 },
            { name: "Amrabat", pos: "MF", rating: 88 },
            { name: "Fidalgo", pos: "MF", rating: 30 },
            { name: "Deossa", pos: "MF", rating: 30 },
            { name: "Celso", pos: "MF", rating: 30 },
            { name: "Riquelme", pos: "FW", rating: 50 },
            { name: "C. Hernández", pos: "FW", rating: 50 },
            { name: "Ruibal", pos: "FW", rating: 50 },
            { name: "Bellerín", pos: "DF", rating: 30 },
            { name: "Llorente", pos: "DF", rating: 30 },
            { name: "Natan", pos: "DF", rating: 30 },
            { name: "Bartra", pos: "DF", rating: 5 },
            { name: "V. Gómez", pos: "DF", rating: 5 },
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
            { name: "Soler", pos: "MF", rating: 103 },
            { name: "B. Méndez", pos: "MF", rating: 53 },
            { name: "Sučić", pos: "MF", rating: 43 },
            { name: "Turrientes", pos: "MF", rating: 45 },
            { name: "Y. Herrera", pos: "MF", rating: 25 },
            { name: "Óskarsson", pos: "FW", rating: 55 },
            { name: "Guedes", pos: "FW", rating: 65 },
            { name: "Barrenetxea", pos: "FW", rating: 65 },
            { name: "Caleta-Car", pos: "DF", rating: 6 },
            { name: "Zubeldia", pos: "DF", rating: 11 },
            { name: "Aramburu", pos: "DF", rating: 61 },
            { name: "Odriozola", pos: "DF", rating: 15 },
            { name: "A. Munoz", pos: "DF", rating: 5 },
            { name: "Elustondo", pos: "DF", rating: 5 },
        ],
        "rennes": [
            { name: "Lepaul", pos: "FW", rating: 214 },
            { name: "Blas", pos: "FW", rating: 54 },
            { name: "Tamari", pos: "FW", rating: 64 },
            { name: "Frankowski", pos: "MF", rating: 35 },
            { name: "Santamaria", pos: "MF", rating: 103 },
            { name: "Camara", pos: "MF", rating: 33 },
            { name: "Szymanski", pos: "MF", rating: 10 },
            { name: "Rongier", pos: "MF", rating: 20 },
            { name: "Embolo", pos: "FW", rating: 100 },
            { name: "Nordin", pos: "FW", rating: 35 },
            { name: "Thomasson", pos: "DF", rating: 5 },
            { name: "Merlin", pos: "DF", rating: 18 },
            { name: "Ait Boudlal", pos: "DF", rating: 21 },
            { name: "Rouault", pos: "DF", rating: 10 },
            { name: "Nagida", pos: "DF", rating: 2 },
            { name: "Seidu", pos: "DF", rating: 1 },
        ],
        "roma": [
            { name: "Dovbyk", pos: "FW", rating: 134 },
            { name: "Dybala", pos: "FW", rating: 84 },
            { name: "Soulé", pos: "FW", rating: 134 },
            { name: "Pellegrini", pos: "MF", rating: 83 },
            { name: "Koné", pos: "MF", rating: 33 },
            { name: "Cristante", pos: "MF", rating: 60 },
            { name: "Pisilli", pos: "MF", rating: 5 },
            { name: "Bah", pos: "MF", rating: 15 },
            { name: "El Shaarawy", pos: "FW", rating: 65 },
            { name: "Ferguson", pos: "FW", rating: 45 },
            { name: "Ndicka", pos: "DF", rating: 41 },
            { name: "Mancini", pos: "DF", rating: 41 },
            { name: "Hermoso", pos: "DF", rating: 41 },
            { name: "Angeliño", pos: "DF", rating: 45 },
            { name: "Çelik", pos: "DF", rating: 15 },
            { name: "Hummels", pos: "DF", rating: 25 },
            { name: "Abdulhamid", pos: "DF", rating: 25 },
            { name: "Tsimikas", pos: "DF", rating: 15 },
        ],
        "rosenborg": [
            { name: "Islamović", pos: "FW", rating: 134 },
            { name: "Sahsah", pos: "FW", rating: 134 },
            { name: "Chiakha", pos: "FW", rating: 134 },
            { name: "Väänänen", pos: "MF", rating: 88 },
            { name: "Nordli", pos: "MF", rating: 88 },
            { name: "Fossum", pos: "MF", rating: 88 },
            { name: "Selnæs", pos: "MF", rating: 30 },
            { name: "Bomholt", pos: "MF", rating: 30 },
            { name: "Borgersen", pos: "MF", rating: 30 },
            { name: "Thorstensen", pos: "FW", rating: 50 },
            { name: "Ďuriš", pos: "FW", rating: 50 },
            { name: "Ceïde", pos: "FW", rating: 50 },
            { name: "Svensson", pos: "DF", rating: 30 },
            { name: "Røsten", pos: "DF", rating: 30 },
            { name: "Dahl", pos: "DF", rating: 30 },
            { name: "Ceïde", pos: "DF", rating: 5 },
            { name: "Volden", pos: "DF", rating: 5 },
        ],
        "redbullsalzburg": [
            { name: "Konaté", pos: "FW", rating: 134 },
            { name: "Baidoo", pos: "FW", rating: 134 },
            { name: "Vertessen", pos: "FW", rating: 134 },
            { name: "Kjærgaard", pos: "MF", rating: 88 },
            { name: "Bidstrup", pos: "MF", rating: 88 },
            { name: "Diabaté", pos: "MF", rating: 88 },
            { name: "Kitano", pos: "MF", rating: 30 },
            { name: "Kawamura", pos: "MF", rating: 30 },
            { name: "Lukić", pos: "MF", rating: 30 },
            { name: "Redžić", pos: "FW", rating: 50 },
            { name: "Aguilar", pos: "FW", rating: 50 },
            { name: "Bischoff", pos: "FW", rating: 50 },
            { name: "Schmid", pos: "DF", rating: 30 },
            { name: "Mellberg", pos: "DF", rating: 30 },
            { name: "Terzić", pos: "DF", rating: 30 },
            { name: "Krätzig", pos: "DF", rating: 5 },
            { name: "Drexler", pos: "DF", rating: 5 },
        ],
        "sevilla": [
            { name: "Romero", pos: "FW", rating: 134 },
            { name: "Lukebakio", pos: "FW", rating: 134 },
            { name: "Ejuke", pos: "FW", rating: 134 },
            { name: "Saúl", pos: "MF", rating: 103 },
            { name: "Lokonga", pos: "MF", rating: 103 },
            { name: "Sow", pos: "MF", rating: 103 },
            { name: "Agoumé", pos: "MF", rating: 75 },
            { name: "Gudelj", pos: "MF", rating: 75 },
            { name: "Iheanacho", pos: "FW", rating: 65 },
            { name: "Peque", pos: "FW", rating: 65 },
            { name: "Suso", pos: "FW", rating: 65 },
            { name: "Badé", pos: "DF", rating: 61 },
            { name: "Nianzou", pos: "DF", rating: 61 },
            { name: "Carmona", pos: "DF", rating: 61 },
            { name: "Pedrosa", pos: "DF", rating: 25 },
            { name: "Navas", pos: "DF", rating: 25 },
            { name: "Marcao", pos: "DF", rating: 25 },
        ],
        "shakhtardonetsk": [
            { name: "Traoré", pos: "FW", rating: 134 },
            { name: "Eguinaldo", pos: "FW", rating: 134 },
            { name: "Elias", pos: "FW", rating: 134 },
            { name: "Bondarenko", pos: "MF", rating: 88 },
            { name: "Kryskiv", pos: "MF", rating: 88 },
            { name: "M. Gomes", pos: "MF", rating: 88 },
            { name: "Shved", pos: "MF", rating: 30 },
            { name: "Pedrinho", pos: "MF", rating: 30 },
            { name: "Newerton", pos: "MF", rating: 30 },
            { name: "Alisson", pos: "FW", rating: 50 },
            { name: "Meirelles", pos: "FW", rating: 50 },
            { name: "Obah", pos: "FW", rating: 50 },
            { name: "M. Santos", pos: "DF", rating: 30 },
            { name: "Arroyo", pos: "DF", rating: 30 },
            { name: "Bondar", pos: "DF", rating: 30 },
            { name: "Henrique", pos: "DF", rating: 5 },
            { name: "Azarovi", pos: "DF", rating: 5 },
        ],
        "shamrockrovers": [
            { name: "Greene", pos: "FW", rating: 134 },
            { name: "Burke", pos: "FW", rating: 134 },
            { name: "Mulraney", pos: "FW", rating: 134 },
            { name: "Watts", pos: "MF", rating: 88 },
            { name: "Healy", pos: "MF", rating: 88 },
            { name: "Mandroiu", pos: "MF", rating: 88 },
            { name: "Asamoah", pos: "MF", rating: 30 },
            { name: "O'Neill", pos: "MF", rating: 30 },
            { name: "Brennan", pos: "MF", rating: 30 },
            { name: "Gaffney", pos: "FW", rating: 50 },
            { name: "Noonan", pos: "FW", rating: 50 },
            { name: "McGovern", pos: "FW", rating: 50 },
            { name: "Stevens", pos: "DF", rating: 30 },
            { name: "Matthews", pos: "DF", rating: 30 },
            { name: "P. Lopes", pos: "DF", rating: 30 },
            { name: "Grace", pos: "DF", rating: 5 },
            { name: "Cleary", pos: "DF", rating: 5 },
        ],
        "slaviaprague": [
            { name: "Chytil", pos: "FW", rating: 134 },
            { name: "Chorý", pos: "FW", rating: 134 },
            { name: "Schranz", pos: "FW", rating: 134 },
            { name: "Provod", pos: "MF", rating: 88 },
            { name: "Dorley", pos: "MF", rating: 88 },
            { name: "Sadílek", pos: "MF", rating: 88 },
            { name: "Sanyang", pos: "MF", rating: 30 },
            { name: "Moses", pos: "MF", rating: 30 },
            { name: "Suleiman", pos: "MF", rating: 30 },
            { name: "Camara", pos: "DF", rating: 30 },
            { name: "Ogbu", pos: "DF", rating: 30 },
            { name: "Douděra", pos: "DF", rating: 30 },
            { name: "Chaloupek", pos: "DF", rating: 5 },
            { name: "Holeš", pos: "DF", rating: 5 },
        ],
        "spartaprague": [
            { name: "Tuci", pos: "FW", rating: 134 },
            { name: "Rrahmani", pos: "FW", rating: 134 },
            { name: "Kuchta", pos: "FW", rating: 134 },
            { name: "Haraslín", pos: "MF", rating: 88 },
            { name: "Vydra", pos: "MF", rating: 88 },
            { name: "Kairinen", pos: "MF", rating: 88 },
            { name: "Eneme", pos: "MF", rating: 30 },
            { name: "Mercado", pos: "MF", rating: 30 },
            { name: "Andersen", pos: "MF", rating: 30 },
            { name: "Vojta", pos: "FW", rating: 50 },
            { name: "Milla", pos: "FW", rating: 50 },
            { name: "Kadeřábek", pos: "DF", rating: 30 },
            { name: "Martinec", pos: "DF", rating: 30 },
            { name: "Ryneš", pos: "DF", rating: 30 },
            { name: "Uchenna", pos: "DF", rating: 5 },
            { name: "Ševínský", pos: "DF", rating: 5 },
        ],
        "sportingcp": [
            { name: "Ioannidis", pos: "FW", rating: 134 },
            { name: "Trincão", pos: "FW", rating: 134 },
            { name: "Quenda", pos: "FW", rating: 134 },
            { name: "P. Gonçalves", pos: "MF", rating: 88 },
            { name: "Bragança", pos: "MF", rating: 88 },
            { name: "Morita", pos: "MF", rating: 88 },
            { name: "Hjulmand", pos: "MF", rating: 30 },
            { name: "Kochorashvili", pos: "MF", rating: 30 },
            { name: "Simões", pos: "MF", rating: 30 },
            { name: "Catamo", pos: "FW", rating: 50 },
            { name: "Faye", pos: "FW", rating: 50 },
            { name: "M. Araújo", pos: "FW", rating: 50 },
            { name: "Debast", pos: "DF", rating: 30 },
            { name: "N. Santos", pos: "DF", rating: 30 },
            { name: "Vagiannidis", pos: "DF", rating: 30 },
            { name: "Fresneda", pos: "DF", rating: 5 },
            { name: "Inácio", pos: "DF", rating: 5 },
        ],
        "strasbourg": [
            { name: "Enciso", pos: "FW", rating: 54 },
            { name: "Godo", pos: "FW", rating: 180 },
            { name: "D. Moreira", pos: "FW", rating: 78 },
            { name: "Nanasi", pos: "MF", rating: 109 },
            { name: "Barco", pos: "MF", rating: 45 },
            { name: "El Mourabet", pos: "MF", rating: 20 },
            { name: "Noubissie", pos: "MF", rating: 1 },
            { name: "Yassine", pos: "FW", rating: 15 },
            { name: "D. Fofana", pos: "FW", rating: 45 },
            { name: "Ouattara", pos: "DF", rating: 31 },
            { name: "Anselmino", pos: "DF", rating: 1 },
            { name: "Doukoure", pos: "DF", rating: 6 },
            { name: "G. Doué", pos: "DF", rating: 36 },
            { name: "Omobamidele", pos: "DF", rating: 15 },
            { name: "Chilwell", pos: "DF", rating: 10 },
        ],
        "sturmgraz": [
            { name: "Jatta", pos: "FW", rating: 134 },
            { name: "Kayombo", pos: "FW", rating: 134 },
            { name: "Beganović", pos: "FW", rating: 134 },
            { name: "Kiteishvili", pos: "MF", rating: 88 },
            { name: "Stanković", pos: "MF", rating: 88 },
            { name: "Rózga", pos: "MF", rating: 88 },
            { name: "Mamageishvili", pos: "MF", rating: 30 },
            { name: "Hierländer", pos: "MF", rating: 30 },
            { name: "Hödl", pos: "MF", rating: 30 },
            { name: "Malone", pos: "FW", rating: 50 },
            { name: "Grgić", pos: "FW", rating: 50 },
            { name: "Mitchell", pos: "DF", rating: 30 },
            { name: "Vallçi", pos: "DF", rating: 30 },
            { name: "Borković", pos: "DF", rating: 30 },
            { name: "Malić", pos: "DF", rating: 5 },
            { name: "Geyrhofer", pos: "DF", rating: 5 },
        ],
        "stuttgart": [
            { name: "Tomás", pos: "FW", rating: 134 },
            { name: "Demirović", pos: "FW", rating: 134 },
            { name: "Diehl", pos: "FW", rating: 134 },
            { name: "Keitel", pos: "MF", rating: 88 },
            { name: "Stiller", pos: "MF", rating: 88 },
            { name: "Führich", pos: "MF", rating: 88 },
            { name: "Khannouss", pos: "MF", rating: 30 },
            { name: "Karazor", pos: "MF", rating: 30 },
            { name: "Darvich", pos: "MF", rating: 30 },
            { name: "Leweling", pos: "FW", rating: 50 },
            { name: "Arévalo", pos: "FW", rating: 50 },
            { name: "Undav", pos: "FW", rating: 50 },
            { name: "Al-Dakhil", pos: "DF", rating: 30 },
            { name: "Hendriks", pos: "DF", rating: 30 },
            { name: "Vagnoman", pos: "DF", rating: 30 },
            { name: "Mittelstädt", pos: "DF", rating: 5 },
            { name: "Jaquez", pos: "DF", rating: 5 },
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
            { name: "Spence", pos: "DF", rating: 25 },
            { name: "Davies", pos: "DF", rating: 1 },
            { name: "Danso", pos: "DF", rating: 8 },
            { name: "Robertson", pos: "DF", rating: 25 },
        ],
        "unionberlin": [
            { name: "Ljubičić", pos: "FW", rating: 134 },
            { name: "Burke", pos: "FW", rating: 134 },
            { name: "Burcu", pos: "FW", rating: 134 },
            { name: "Kemlein", pos: "MF", rating: 88 },
            { name: "Khedira", pos: "MF", rating: 88 },
            { name: "Woo-yeong", pos: "MF", rating: 88 },
            { name: "Schäfer", pos: "MF", rating: 30 },
            { name: "Haberer", pos: "MF", rating: 30 },
            { name: "Skarke", pos: "MF", rating: 30 },
            { name: "Ansah", pos: "FW", rating: 50 },
            { name: "Preu", pos: "FW", rating: 50 },
            { name: "Ilić", pos: "FW", rating: 50 },
            { name: "Markgraf", pos: "DF", rating: 30 },
            { name: "Bosch", pos: "DF", rating: 30 },
            { name: "Friedrich", pos: "DF", rating: 30 },
            { name: "Querfeld", pos: "DF", rating: 5 },
            { name: "Rothe", pos: "DF", rating: 5 },
        ],
        "unionsg": [
            { name: "Fuseini", pos: "FW", rating: 134 },
            { name: "Biondić", pos: "FW", rating: 134 },
            { name: "Smith", pos: "FW", rating: 134 },
            { name: "de Perre", pos: "MF", rating: 88 },
            { name: "Zorgane", pos: "MF", rating: 88 },
            { name: "Hadj", pos: "MF", rating: 88 },
            { name: "Pavlić", pos: "MF", rating: 30 },
            { name: "Schoofs", pos: "MF", rating: 30 },
            { name: "Zeneli", pos: "MF", rating: 30 },
            { name: "David", pos: "FW", rating: 50 },
            { name: "K. Rodríguez", pos: "FW", rating: 50 },
            { name: "Giger", pos: "FW", rating: 50 },
            { name: "Barry", pos: "DF", rating: 30 },
            { name: "Allister", pos: "DF", rating: 80 },
            { name: "Sykes", pos: "DF", rating: 30 },
            { name: "Patris", pos: "DF", rating: 5 },
            { name: "Sylla", pos: "DF", rating: 5 },
        ],
        "viktoriaplzen": [
            { name: "Adu", pos: "FW", rating: 134 },
            { name: "Vydra", pos: "FW", rating: 134 },
            { name: "Toure", pos: "FW", rating: 134 },
            { name: "Červ", pos: "MF", rating: 88 },
            { name: "Višinský", pos: "MF", rating: 88 },
            { name: "Sojka", pos: "MF", rating: 88 },
            { name: "Hrošovský", pos: "MF", rating: 30 },
            { name: "Ladra", pos: "MF", rating: 30 },
            { name: "Souaré", pos: "MF", rating: 30 },
            { name: "Lawal", pos: "FW", rating: 50 },
            { name: "Faal", pos: "FW", rating: 50 },
            { name: "Kabongo", pos: "FW", rating: 50 },
            { name: "Spáčil", pos: "DF", rating: 30 },
            { name: "Doski", pos: "DF", rating: 30 },
            { name: "Kadlec", pos: "DF", rating: 30 },
            { name: "Jemelka", pos: "DF", rating: 5 },
            { name: "Paluska", pos: "DF", rating: 5 },
        ],
        "villarreal": [
            { name: "A. Pérez", pos: "FW", rating: 104 },
            { name: "Mikautadze", pos: "FW", rating: 134 },
            { name: "Pépé", pos: "FW", rating: 134 },
            { name: "Parejo", pos: "MF", rating: 13 },
            { name: "Comesaña", pos: "MF", rating: 43 },
            { name: "P. Gueye", pos: "MF", rating: 23 },
            { name: "Buchanan", pos: "MF", rating: 15 },
            { name: "Baena", pos: "FW", rating: 85 },
            { name: "Gerard", pos: "FW", rating: 65 },
            { name: "Kambwala", pos: "DF", rating: 1 },
            { name: "L. Costa", pos: "DF", rating: 41 },
            { name: "Marin", pos: "DF", rating: 21 },
            { name: "Cardona", pos: "DF", rating: 5 },
            { name: "Freeman", pos: "DF", rating: 1 },
            { name: "Foyth", pos: "DF", rating: 25 },
        ],
        "wislakrakow": [
            { name: "Rodado", pos: "FW", rating: 134 },
            { name: "Duarte", pos: "FW", rating: 134 },
            { name: "Božić", pos: "FW", rating: 134 },
            { name: "Duda", pos: "MF", rating: 88 },
            { name: "Ertlthaler", pos: "MF", rating: 88 },
            { name: "Carbó", pos: "MF", rating: 88 },
            { name: "Igbekeme", pos: "MF", rating: 30 },
            { name: "Talar", pos: "MF", rating: 30 },
            { name: "Omić", pos: "MF", rating: 30 },
            { name: "Starzyński", pos: "FW", rating: 50 },
            { name: "Kuziemka", pos: "FW", rating: 50 },
            { name: "Baniowski", pos: "FW", rating: 50 },
            { name: "Lelieveld", pos: "DF", rating: 30 },
            { name: "Mikulec", pos: "DF", rating: 30 },
            { name: "Uryga", pos: "DF", rating: 30 },
            { name: "Maisonneuve", pos: "DF", rating: 5 },
            { name: "Jaroch", pos: "DF", rating: 5 },
        ],
        "wolfsbergerac": [
            { name: "Kojzek", pos: "FW", rating: 134 },
            { name: "Ogam", pos: "FW", rating: 134 },
            { name: "Atanga", pos: "FW", rating: 134 },
            { name: "Hajdini", pos: "MF", rating: 88 },
            { name: "Piesinger", pos: "MF", rating: 88 },
            { name: "Avdijaj", pos: "MF", rating: 88 },
            { name: "Raymond", pos: "MF", rating: 30 },
            { name: "Zukić", pos: "MF", rating: 30 },
            { name: "Sulzner", pos: "MF", rating: 30 },
            { name: "Pink", pos: "FW", rating: 50 },
            { name: "Vrioni", pos: "FW", rating: 50 },
            { name: "Matić", pos: "DF", rating: 30 },
            { name: "Uzondu", pos: "DF", rating: 30 },
            { name: "Diabaté", pos: "DF", rating: 30 },
            { name: "Gruber", pos: "DF", rating: 5 },
            { name: "Dramé", pos: "DF", rating: 5 },
        ],
        "youngboys": [
            { name: "Virginius", pos: "FW", rating: 134 },
            { name: "Fassnacht", pos: "FW", rating: 134 },
            { name: "Bedia", pos: "FW", rating: 134 },
            { name: "Monteiro", pos: "MF", rating: 88 },
            { name: "Colley", pos: "MF", rating: 88 },
            { name: "E. Fernandes", pos: "MF", rating: 88 },
            { name: "Sanches", pos: "MF", rating: 30 },
            { name: "Pech", pos: "MF", rating: 30 },
            { name: "Lauper", pos: "MF", rating: 30 },
            { name: "Conte", pos: "FW", rating: 50 },
            { name: "Essende", pos: "FW", rating: 50 },
            { name: "Andrews", pos: "DF", rating: 30 },
            { name: "Hadjam", pos: "DF", rating: 30 },
            { name: "Zoukrou", pos: "DF", rating: 30 },
            { name: "Wüthrich", pos: "DF", rating: 5 },
            { name: "Janko", pos: "DF", rating: 5 },
        ],
        "zenitstpetersburg": [
            { name: "Sobolev", pos: "FW", rating: 134 },
            { name: "Glushenkov", pos: "FW", rating: 134 },
            { name: "Henrique", pos: "FW", rating: 134 },
            { name: "Wendel", pos: "MF", rating: 88 },
            { name: "Yerokhin", pos: "MF", rating: 88 },
            { name: "Barrios", pos: "MF", rating: 88 },
            { name: "Jhon", pos: "MF", rating: 30 },
            { name: "Mostovoy", pos: "MF", rating: 30 },
            { name: "Mikhaylov", pos: "MF", rating: 30 },
            { name: "Pedro", pos: "FW", rating: 150 },
            { name: "D. Santos", pos: "DF", rating: 30 },
            { name: "Gorshkov", pos: "DF", rating: 30 },
            { name: "Drkušić", pos: "DF", rating: 30 },
            { name: "Karavayev", pos: "DF", rating: 5 },
            { name: "Alip", pos: "DF", rating: 5 },
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
            "BUL": "🇧🇬", "RUS": "🇷🇺", "SLO": "🇸🇮", "IRL": "🇮🇪", "ROU": "🇷🇴", "KAZ": "🇰🇿", "AZE": "🇦🇿"
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
        constructor(userSquadName, userAtk, userDef, userMid, userChem = 100) {
            this.userSquadName = userSquadName || "My Squad";
            this.userStats = { name: this.userSquadName, country: "USR", atk: userAtk, def: userDef, mid: userMid, chem: userChem, isUser: true };
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
            let secondaryCountries = ["SRB", "UKR", "GRE", "HUN", "CRO", "BUL", "SWE", "NOR", "RUS", "POL", "CYP", "BLR", "SLO", "IRL", "ROU", "KAZ", "AZE"];
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
                    t.isBoostedAjax = true;
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

        resolvePenaltyShootout(teamA, teamB) {
            let probA = 0.5;
            if (teamA.name === "Manchester United") {
                probA = 0.3;
            } else if (teamB.name === "Manchester United") {
                probA = 0.7;
            }
            return Math.random() < probA ? teamA : teamB;
        }

        // Tính điểm phong độ ngẫu nhiên dựa trên Chemistry (Phương án 2)
        calculateFormFactor(chem) {
            const c = (chem !== undefined && chem !== null) ? Math.max(0, Math.min(100, chem)) : 100;
            let minForm = -5.0;
            let maxForm = 5.0;

            if (c >= 60) {
                // Chem >= 60: Hưởng lợi (tăng độ ổn định, bóp nghẹt nguy cơ rớt phong độ)
                // chem=60: [-3.5, +5.0] | chem=100: [0.0, +6.0]
                const t = (c - 60) / 40;
                minForm = -3.5 + t * 3.5;
                maxForm = 5.0 + t * 1.0;
            } else if (c >= 40) {
                // Chem 40 - 59: Trung lập [-5.0, +5.0]
                minForm = -5.0;
                maxForm = 5.0;
            } else {
                // Chem < 40: Thiệt hại (tăng rủi ro thi đấu kém)
                // chem=39: [-6.0, +4.5] | chem=0: [-10.0, +2.0]
                const t = (40 - c) / 40;
                minForm = -5.0 - t * 5.0;
                maxForm = 5.0 - t * 3.0;
            }

            return minForm + Math.random() * (maxForm - minForm);
        }

        // Mô phỏng 1 trận đấu
        simulateMatch(teamA, teamB, isHome, leg1Score = null) {
            let atkA = teamA.atk;
            let defA = teamA.def;
            let midA = teamA.mid;
            
            let atkB = teamB.atk;
            let defB = teamB.def;
            let midB = teamB.mid;
            
            // Special Ajax logic:
            if (teamA.isBoostedAjax) {
                if (teamB.name === "Real Madrid" || teamB.name === "Juventus") {
                    atkA = 96; midA = 90; defA = 90; // extra boost
                } else if (teamB.name === "Tottenham") {
                    atkA = 81; midA = 79; defA = 79; // revert to normal
                }
            }
            if (teamB.isBoostedAjax) {
                if (teamA.name === "Real Madrid" || teamA.name === "Juventus") {
                    atkB = 96; midB = 90; defB = 90; // extra boost
                } else if (teamA.name === "Tottenham") {
                    atkB = 81; midB = 79; defB = 79; // revert to normal
                }
            }

            // Barcelona comeback logic
            if (leg1Score) {
                if (teamA.name === "Barcelona") {
                    let diff = leg1Score.teamAScore - leg1Score.teamBScore;
                    if (diff >= 3) {
                        // Won by 3+ in leg 1: susceptible to comeback (nerf slightly)
                        atkA -= 3; midA -= 3; defA -= 3;
                    } else if (diff <= -3) {
                        // Lost by 3+ in leg 1: primed for comeback (boost slightly)
                        atkA += 3; midA += 3; defA += 3;
                    }
                }
                if (teamB.name === "Barcelona") {
                    let diff = leg1Score.teamBScore - leg1Score.teamAScore;
                    if (diff >= 3) {
                        // Won by 3+ in leg 1: susceptible to comeback (nerf slightly)
                        atkB -= 3; midB -= 3; defB -= 3;
                    } else if (diff <= -3) {
                        // Lost by 3+ in leg 1: primed for comeback (boost slightly)
                        atkB += 3; midB += 3; defB += 3;
                    }
                }
            }

            let rA = (atkA * 0.35 + midA * 0.40 + defA * 0.25);
            let rB = (atkB * 0.35 + midB * 0.40 + defB * 0.25);
            
            if (isHome) rA += 2.0; // Lợi thế sân nhà thực tế
            else rB += 2.0;
            
            // Hệ số biến thiên ngẫu nhiên phong độ (Phương án 2: Consistency Control dựa vào Chemistry)
            // Chem >= 60: Hưởng lợi (tăng độ ổn định, bóp nguy cơ rớt phong độ)
            // Chem 40 - 59: Trung lập [-5.0, +5.0]
            // Chem < 40: Thiệt hại (tăng rủi ro thi đấu kém)
            let formA = this.calculateFormFactor(teamA.chem);
            let formB = this.calculateFormFactor(teamB.chem);
            
            let powerA = rA + formA;
            let powerB = rB + formB;
            
            // Expected goals (xG) cơ bản là 1.35 khi đồng trình, tăng/giảm theo hiệu số sức mạnh chia cho 12
            let xgA = 1.35 + (powerA - defB) / 12;
            let xgB = 1.35 + (powerB - defA) / 12;

            // Country goal modifiers:
            // GER + NED easy high goals (nổ tài), ITA easy low goals
            let goalsMultiplier = 1.0;
            let hasGER_or_NED = (teamA.country === "GER" || teamA.country === "NED" || teamB.country === "GER" || teamB.country === "NED");
            let bothGER_or_NED = ((teamA.country === "GER" || teamA.country === "NED") && (teamB.country === "GER" || teamB.country === "NED"));
            let hasITA = (teamA.country === "ITA" || teamB.country === "ITA");
            let bothITA = (teamA.country === "ITA" && teamB.country === "ITA");
            
            if (bothGER_or_NED) {
                goalsMultiplier *= 1.45;
            } else if (hasGER_or_NED) {
                goalsMultiplier *= 1.20;
            }
            
            if (bothITA) {
                goalsMultiplier *= 0.60;
            } else if (hasITA) {
                goalsMultiplier *= 0.80;
            }
            
            xgA *= goalsMultiplier;
            xgB *= goalsMultiplier;
            
            // Nén logarit nếu xG vượt quá 2.0 để tránh tỉ số quá đà (hiệu ứng cooling down)
            if (xgA > 2.0) xgA = 2.0 + Math.log(xgA - 1.0);
            if (xgB > 2.0) xgB = 2.0 + Math.log(xgB - 1.0);
            
            // Giới hạn xG tối thiểu là 0.2
            xgA = Math.max(0.2, xgA);
            xgB = Math.max(0.2, xgB);
            
            let goalsA = poissonRandom(xgA);
            let goalsB = poissonRandom(xgB);

            // Giảm tỉ lệ các trận đấu có số bàn thắng lớn
            let totalGoals = goalsA + goalsB;
            if (totalGoals === 6) {
                if (Math.random() < 0.45) {
                    let factor = 0.67;
                    let oldA = goalsA, oldB = goalsB;
                    goalsA = Math.round(goalsA * factor);
                    goalsB = Math.round(goalsB * factor);
                    if (oldA > oldB && goalsA <= goalsB) goalsA = goalsB + 1;
                    else if (oldB > oldA && goalsB <= goalsA) goalsB = goalsA + 1;
                    else if (oldA === oldB) goalsA = goalsB;
                }
            } else if (totalGoals >= 7) {
                if (Math.random() < 0.92) {
                    let factor = 0.50;
                    let oldA = goalsA, oldB = goalsB;
                    goalsA = Math.round(goalsA * factor);
                    goalsB = Math.round(goalsB * factor);
                    if (oldA > oldB && goalsA <= goalsB) goalsA = goalsB + 1;
                    else if (oldB > oldA && goalsB <= goalsA) goalsB = goalsA + 1;
                    else if (oldA === oldB) goalsA = goalsB;
                }
            }

            // Scoreline adjustments
            let scoreAdjustRoll = Math.random();
            if (scoreAdjustRoll < 0.45) { // 45% chance to nudge scoreline
                let maxG = Math.max(goalsA, goalsB);
                let minG = Math.min(goalsA, goalsB);
                let diff = maxG - minG;
                
                // 1. Decrease extreme scorelines (e.g. 5-0, 5-1, 6-0...)
                if (maxG >= 5 && diff >= 4) {
                    if (goalsA > goalsB) {
                        goalsA = Math.random() < 0.5 ? 3 : 4;
                        if (goalsB > 0) goalsB = 1;
                    } else {
                        goalsB = Math.random() < 0.5 ? 3 : 4;
                        if (goalsA > 0) goalsA = 1;
                    }
                } else if (maxG >= 5 && diff === 3) {
                    // e.g. 5-2 -> 3-1 or 4-1
                    if (goalsA > goalsB) {
                        goalsA = Math.random() < 0.5 ? 3 : 4;
                        goalsB = 1;
                    } else {
                        goalsB = Math.random() < 0.5 ? 3 : 4;
                        goalsA = 1;
                    }
                }
                // 2. Nudge common competitive scorelines (1-0, 1-1, 2-1, 3-1)
                else if (goalsA === 2 && goalsB === 0) {
                    if (Math.random() < 0.20) goalsA = 1;
                    else goalsB = 1;
                } else if (goalsA === 0 && goalsB === 2) {
                    if (Math.random() < 0.20) goalsB = 1;
                    else goalsA = 1;
                } else if (goalsA === 3 && goalsB === 0) {
                    goalsB = 1;
                    if (Math.random() < 0.7) goalsA = 2;
                } else if (goalsA === 0 && goalsB === 3) {
                    goalsA = 1;
                    if (Math.random() < 0.7) goalsB = 2;
                } else if (goalsA === 1 && goalsB === 0) {
                    let r = Math.random();
                    if (r < 0.35) { goalsA = 1; goalsB = 1; }
                    else if (r < 0.70) { goalsA = 2; goalsB = 1; }
                } else if (goalsA === 0 && goalsB === 1) {
                    let r = Math.random();
                    if (r < 0.35) { goalsA = 1; goalsB = 1; }
                    else if (r < 0.70) { goalsA = 1; goalsB = 2; }
                } else if (goalsA === 2 && goalsB === 2) {
                    if (Math.random() < 0.60) { goalsA = 1; goalsB = 1; }
                } else if (goalsA === 3 && goalsB === 1) {
                    if (Math.random() < 0.65) { goalsA = 2; goalsB = 1; }
                } else if (goalsA === 1 && goalsB === 3) {
                    if (Math.random() < 0.65) { goalsA = 1; goalsB = 2; }
                } else if (goalsA === 3 && goalsB === 2) {
                    if (Math.random() < 0.40) { goalsA = 2; goalsB = 1; }
                } else if (goalsA === 2 && goalsB === 3) {
                    if (Math.random() < 0.40) { goalsA = 1; goalsB = 2; }
                } else if (goalsA === 0 && goalsB === 0) {
                    if (Math.random() < 0.90) {
                        goalsA = 1; goalsB = 1;
                    } else {
                        if (Math.random() < 0.3) {
                            if (Math.random() < 0.5) goalsA = 1;
                            else goalsB = 1;
                        }
                    }
                }
            }
            
            // --- NEW: Possession Simulation ---
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
                let minute = generateNormalTimeMinute();
                scorersA.push({ name: scorer.name, minute });
            }
            scorersA.sort((a, b) => a.minute - b.minute);

            let scorersB = [];
            for (let i = 0; i < goalsB; i++) {
                let scorer = selectGoalscorer(rosterB, scorersB);
                let minute = generateNormalTimeMinute();
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
                let res = this.simulateMatch(m.awayLeg1, m.homeLeg1, true, { teamAScore: m.goalsAway1, teamBScore: m.goalsHome1 });
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

                if (aggA === aggB) {
                    this.simulateExtraTimeForKnockout(m);
                    aggA = m.goalsAway1 + m.goalsHome2;
                    aggB = m.goalsHome1 + m.goalsAway2;
                }

                if (aggA > aggB) {
                    m.winner = m.awayLeg1;
                } else if (aggA < aggB) {
                    m.winner = m.homeLeg1;
                } else {
                    m.winner = this.resolvePenaltyShootout(m.awayLeg1, m.homeLeg1);
                    m.penaltyWinner = m.winner.name;
                    const winScore = 5;
                    const loseScore = Math.random() < 0.5 ? 4 : 3;
                    if (m.winner === m.awayLeg1) {
                        m.penaltyA = winScore;
                        m.penaltyB = loseScore;
                    } else {
                        m.penaltyA = loseScore;
                        m.penaltyB = winScore;
                    }
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
                let res = this.simulateMatch(m.awayLeg1, m.homeLeg1, true, { teamAScore: m.goalsAway1, teamBScore: m.goalsHome1 });
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

                if (aggSeeded === aggUnseeded) {
                    this.simulateExtraTimeForKnockout(m);
                    aggSeeded = m.goalsAway1 + m.goalsHome2;
                    aggUnseeded = m.goalsHome1 + m.goalsAway2;
                }

                if (aggSeeded > aggUnseeded) {
                    m.winner = m.awayLeg1;
                } else if (aggSeeded < aggUnseeded) {
                    m.winner = m.homeLeg1;
                } else {
                    m.winner = this.resolvePenaltyShootout(m.awayLeg1, m.homeLeg1);
                    m.penaltyWinner = m.winner.name;
                    const winScore = 5;
                    const loseScore = Math.random() < 0.5 ? 4 : 3;
                    if (m.winner === m.awayLeg1) {
                        m.penaltyA = winScore;
                        m.penaltyB = loseScore;
                    } else {
                        m.penaltyA = loseScore;
                        m.penaltyB = winScore;
                    }
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
                let res = this.simulateMatch(m.awayLeg1, m.homeLeg1, true, { teamAScore: m.goalsAway1, teamBScore: m.goalsHome1 });
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

                if (aggH === aggA) {
                    this.simulateExtraTimeForKnockout(m);
                    aggH = m.goalsHome1 + m.goalsAway2;
                    aggA = m.goalsAway1 + m.goalsHome2;
                }

                if (aggH > aggA) {
                    m.winner = m.homeLeg1;
                } else if (aggH < aggA) {
                    m.winner = m.awayLeg1;
                } else {
                    m.winner = this.resolvePenaltyShootout(m.homeLeg1, m.awayLeg1);
                    m.penaltyWinner = m.winner.name;
                    const winScore = 5;
                    const loseScore = Math.random() < 0.5 ? 4 : 3;
                    if (m.winner === m.homeLeg1) {
                        m.penaltyA = winScore;
                        m.penaltyB = loseScore;
                    } else {
                        m.penaltyA = loseScore;
                        m.penaltyB = winScore;
                    }
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
                let res = this.simulateMatch(m.awayLeg1, m.homeLeg1, true, { teamAScore: m.goalsAway1, teamBScore: m.goalsHome1 });
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

                if (aggH === aggA) {
                    this.simulateExtraTimeForKnockout(m);
                    aggH = m.goalsHome1 + m.goalsAway2;
                    aggA = m.goalsAway1 + m.goalsHome2;
                }

                if (aggH > aggA) {
                    m.winner = m.homeLeg1;
                } else if (aggH < aggA) {
                    m.winner = m.awayLeg1;
                } else {
                    m.winner = this.resolvePenaltyShootout(m.homeLeg1, m.awayLeg1);
                    m.penaltyWinner = m.winner.name;
                    const winScore = 5;
                    const loseScore = Math.random() < 0.5 ? 4 : 3;
                    if (m.winner === m.homeLeg1) {
                        m.penaltyA = winScore;
                        m.penaltyB = loseScore;
                    } else {
                        m.penaltyA = loseScore;
                        m.penaltyB = winScore;
                    }
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

        simulateExtraTimeForKnockout(m) {
            let powerHome = m.awayLeg1.atk + 2.5; // awayLeg1 is home in Leg 2
            let powerAway = m.homeLeg1.atk;       // homeLeg1 is away in Leg 2
            let xgHomeET = Math.max(0.05, (1.35 + (powerHome - m.homeLeg1.def) / 12) * (30 / 90) * 0.85);
            let xgAwayET = Math.max(0.05, (1.35 + (powerAway - m.awayLeg1.def) / 12) * (30 / 90) * 0.85);
            
            let goalsHomeET = poissonRandom(xgHomeET);
            let goalsAwayET = poissonRandom(xgAwayET);
            
            m.goalsHome2 += goalsHomeET;
            m.goalsAway2 += goalsAwayET;
            m.xgHome2 = parseFloat((m.xgHome2 + xgHomeET).toFixed(2));
            m.xgAway2 = parseFloat((m.xgAway2 + xgAwayET).toFixed(2));
            m.shotsHome2 += Math.max(goalsHomeET, Math.round(xgHomeET * 5 + Math.random() * 2));
            m.shotsAway2 += Math.max(goalsAwayET, Math.round(xgAwayET * 5 + Math.random() * 2));
            
            let rosterHome = getRosterForTeam(m.awayLeg1.name, m.awayLeg1.isUser, m.awayLeg1.country);
            let rosterAway = getRosterForTeam(m.homeLeg1.name, m.homeLeg1.isUser, m.homeLeg1.country);
            
            for (let i = 0; i < goalsHomeET; i++) {
                let scorer = selectGoalscorer(rosterHome, m.scorersHome2);
                let minute = generateExtraTimeMinute();
                m.scorersHome2.push({ name: scorer.name, minute });
            }
            for (let i = 0; i < goalsAwayET; i++) {
                let scorer = selectGoalscorer(rosterAway, m.scorersAway2);
                let minute = generateExtraTimeMinute();
                m.scorersAway2.push({ name: scorer.name, minute });
            }
            m.scorersHome2.sort((a, b) => a.minute - b.minute);
            m.scorersAway2.sort((a, b) => a.minute - b.minute);
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

            if (m.goalsA === m.goalsB) {
                // Simulate extra time
                let powerA = m.teamA.atk;
                let powerB = m.teamB.atk;
                let xgA_ET = Math.max(0.05, (1.35 + (powerA - m.teamB.def) / 12) * (30 / 90) * 0.85);
                let xgB_ET = Math.max(0.05, (1.35 + (powerB - m.teamA.def) / 12) * (30 / 90) * 0.85);
                
                let goalsA_ET = poissonRandom(xgA_ET);
                let goalsB_ET = poissonRandom(xgB_ET);
                
                m.goalsA += goalsA_ET;
                m.goalsB += goalsB_ET;
                m.xgA = parseFloat((m.xgA + xgA_ET).toFixed(2));
                m.xgB = parseFloat((m.xgB + xgB_ET).toFixed(2));
                m.shotsA += Math.max(goalsA_ET, Math.round(xgA_ET * 5 + Math.random() * 2));
                m.shotsB += Math.max(goalsB_ET, Math.round(xgB_ET * 5 + Math.random() * 2));
                
                let rosterA = getRosterForTeam(m.teamA.name, m.teamA.isUser, m.teamA.country);
                let rosterB = getRosterForTeam(m.teamB.name, m.teamB.isUser, m.teamB.country);
                
                for (let i = 0; i < goalsA_ET; i++) {
                    let scorer = selectGoalscorer(rosterA, m.scorersA);
                    let minute = generateExtraTimeMinute();
                    m.scorersA.push({ name: scorer.name, minute });
                }
                for (let i = 0; i < goalsB_ET; i++) {
                    let scorer = selectGoalscorer(rosterB, m.scorersB);
                    let minute = generateExtraTimeMinute();
                    m.scorersB.push({ name: scorer.name, minute });
                }
                m.scorersA.sort((a, b) => a.minute - b.minute);
                m.scorersB.sort((a, b) => a.minute - b.minute);
            }

            if (m.goalsA > m.goalsB) {
                m.winner = m.teamA;
            } else if (m.goalsA < m.goalsB) {
                m.winner = m.teamB;
            } else {
                m.winner = this.resolvePenaltyShootout(m.teamA, m.teamB);
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
