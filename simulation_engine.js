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
            { name: "Nice", prob: 0.35, atk: 77, def: 76, mid: 74 },
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
            { name: "Red Star Belgrade", prob: 0.75, atk: 76, def: 75, mid: 73 },
            { name: "Partizan", prob: 0.35, atk: 71, def: 70, mid: 69 }
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
            { name: "Ferencváros", prob: 0.60, atk: 70, def: 69, mid: 68 }
        ],
        "UKR": [
            { name: "Shakhtar Donetsk", prob: 0.65, atk: 75, def: 73, mid: 72 },
            { name: "Dynamo Kyiv", prob: 0.40, atk: 70, def: 69, mid: 68 }
        ],
        "POL": [
            { name: "Legia Warsaw", prob: 0.12, atk: 68, def: 67, mid: 66 },
            { name: "Lech Poznań", prob: 0.08, atk: 67, def: 66, mid: 65 }
        ],
        "CYP": [
            { name: "APOEL Nicosia", prob: 0.05, atk: 63, def: 63, mid: 61 },
            { name: "Apollon Limassol", prob: 0.03, atk: 62, def: 62, mid: 60 }
        ],
        "BLR": [
            { name: "BATE Borisov", prob: 0.05, atk: 63, def: 62, mid: 61 }
        ],
        "SWE": [
            { name: "Malmö FF", prob: 0.25, atk: 67, def: 66, mid: 65 }
        ],
        "NOR": [
            { name: "Rosenborg", prob: 0.15, atk: 64, def: 63, mid: 62 }
        ],
        "BUL": [
            { name: "Ludogorets", prob: 0.40, atk: 68, def: 67, mid: 66 }
        ],
        "RUS": [
            { name: "Zenit St. Petersburg", prob: 0.20, atk: 74, def: 73, mid: 72 }
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
            let secondaryCountries = ["SRB", "UKR", "GRE", "HUN", "CRO", "BUL", "SWE", "NOR", "RUS", "POL", "CYP", "BLR"];
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
            
            return { goalsA, goalsB };
        }

        // Chạy vòng Swiss hiện tại
        runNextSwissRound() {
            if (this.currentRound >= 8) return;
            
            let roundPairs = this.swissMatches[this.currentRound];
            
            roundPairs.forEach(p => {
                let result = this.simulateMatch(p.home, p.away, true);
                p.goalsHome = result.goalsA;
                p.goalsAway = result.goalsB;
                
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
            // Seeded: 9-16 (swissTable index 8-15)
            // Unseeded: 17-24 (swissTable index 16-23)
            let seeded = this.swissTable.slice(8, 16);
            let unseeded = this.swissTable.slice(16, 24);

            // Bốc cặp theo luật UEFA:
            // 9 & 10 vs 23 & 24
            // 11 & 12 vs 21 & 22
            // 13 & 14 vs 19 & 20
            // 15 & 16 vs 17 & 18
            let pairs = [
                { seeded: [seeded[0], seeded[1]], unseeded: [unseeded[6], unseeded[7]] }, // 9,10 vs 23,24
                { seeded: [seeded[2], seeded[3]], unseeded: [unseeded[4], unseeded[5]] }, // 11,12 vs 21,22
                { seeded: [seeded[4], seeded[5]], unseeded: [unseeded[2], unseeded[3]] }, // 13,14 vs 19,20
                { seeded: [seeded[6], seeded[7]], unseeded: [unseeded[0], unseeded[1]] }  // 15,16 vs 17,18
            ];

            this.playoffMatches = [];
            pairs.forEach(p => {
                // Trộn ngẫu nhiên trong từng cặp nhóm
                let sSorted = [...p.seeded].sort(() => Math.random() - 0.5);
                let uSorted = [...p.unseeded].sort(() => Math.random() - 0.5);

                for (let i = 0; i < 2; i++) {
                    this.playoffMatches.push({
                        homeLeg1: uSorted[i], // Lượt đi sân unseeded
                        awayLeg1: sSorted[i],
                        goalsHome1: null,
                        goalsAway1: null,
                        goalsHome2: null, // Lượt về sân seeded
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
            });
        }

        // Simulate Playoff lượt về + tính winner
        simulatePlayoffLeg2() {
            this.playoffMatches.forEach(m => {
                // home2 chính là m.awayLeg1 (seeded), away2 chính là m.homeLeg1 (unseeded)
                let res = this.simulateMatch(m.awayLeg1, m.homeLeg1, true);
                m.goalsHome2 = res.goalsA;
                m.goalsAway2 = res.goalsB;

                let aggA = m.goalsAway1 + m.goalsHome2; // seeded tổng điểm
                let aggB = m.goalsHome1 + m.goalsAway2; // unseeded tổng điểm

                if (aggA > aggB) {
                    m.winner = m.awayLeg1;
                } else if (aggA < aggB) {
                    m.winner = m.homeLeg1;
                } else {
                    // Đá penalty ngẫu nhiên
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
            // Seeded: Top 8 từ vòng Swiss (0-7)
            // Unseeded: 8 đội thắng từ Playoff
            let seeded = this.swissTable.slice(0, 8);
            let unseeded = this.playoffMatches.map(m => m.winner);

            // Bốc thăm ngẫu nhiên không giới hạn quốc gia
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
            });
        }

        // Simulate R16 lượt về
        simulateR16Leg2() {
            this.r16Matches.forEach(m => {
                let res = this.simulateMatch(m.awayLeg1, m.homeLeg1, true);
                m.goalsHome2 = res.goalsA;
                m.goalsAway2 = res.goalsB;

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
            });
        }

        // Simulate QF lượt về
        simulateQFLeg2() {
            this.qfMatches.forEach(m => {
                let res = this.simulateMatch(m.awayLeg1, m.homeLeg1, true);
                m.goalsHome2 = res.goalsA;
                m.goalsAway2 = res.goalsB;

                let aggH = m.goalsHome1 + m.goalsAway2; // teamA (homeLeg1)
                let aggA = m.goalsAway1 + m.goalsHome2; // teamB (awayLeg1)

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
            });
        }

        // Simulate SF lượt về
        simulateSFLeg2() {
            this.sfMatches.forEach(m => {
                let res = this.simulateMatch(m.awayLeg1, m.homeLeg1, true);
                m.goalsHome2 = res.goalsA;
                m.goalsAway2 = res.goalsB;

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

        // Tạo trận chung kết (Chung kết chỉ đá 1 trận sân trung lập)
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
            // Đá sân trung lập, không có home advantage
            let res = this.simulateMatch(m.teamA, m.teamB, false);
            m.goalsA = res.goalsA;
            m.goalsB = res.goalsB;

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
    }

    // Export to global window namespace
    window.UCLSimulation = UCLSimulation;

})();
