const teams = [
    { team: "Atlanta Hawks", logo: "hawks.png", name: "hawks" },
    { team: "Boston Celtics", logo: "celtics.png", name: "celtics" },
    { team: "Brooklyn Nets", logo: "nets.png", name: "nets" },
    { team: "Charlotte Hornets", logo: "hornets.png", name: "hornets" },
    { team: "Chicago Bulls", logo: "bulls.png", name: "bulls" },
    { team: "Cleveland Cavaliers", logo: "cavaliers.png", name: "cavaliers" },
    { team: "Dallas Mavericks", logo: "mavericks.png", name: "mavericks" },
    { team: "Denver Nuggets", logo: "nuggets.png", name: "nuggets" },
    { team: "Detroit Pistons", logo: "pistons.png", name: "pistons" },
    { team: "Golden State Warriors", logo: "warriors.png", name: "warriors" },
    { team: "Houston Rockets", logo: "rockets.png", name: "rockets" },
    { team: "Indiana Pacers", logo: "pacers.png", name: "pacers" },
    { team: "LA Clippers", logo: "clippers.png", name: "clippers" },
    { team: "Los Angeles Lakers", logo: "lakers.png", name: "lakers" },
    { team: "Memphis Grizzlies", logo: "grizzlies.png", name: "grizzlies" },
    { team: "Miami Heat", logo: "heat.png", name: "heat" },
    { team: "Milwaukee Bucks", logo: "bucks.png", name: "bucks" },
    { team: "Minnesota Timberwolves", logo: "timberwolves.png", name: "timberwolves" },
    { team: "New Orleans Pelicans", logo: "pelicans.png", name: "pelicans" },
    { team: "New York Knicks", logo: "knicks.png", name: "knicks" },
    { team: "Oklahoma City Thunder", logo: "thunder.png", name: "thunder" },
    { team: "Orlando Magic", logo: "magic.png", name: "magic" },
    { team: "Philadelphia 76ers", logo: "sixers.png", name: "sixers" },
    { team: "Phoenix Suns", logo: "suns.png", name: "suns" },
    { team: "Portland Trail Blazers", logo: "blazers.png", name: "blazers" },
    { team: "Sacramento Kings", logo: "kings.png", name: "kings" },
    { team: "San Antonio Spurs", logo: "spurs.png", name: "spurs" },
    { team: "Toronto Raptors", logo: "raptors.png", name: "raptors" },
    { team: "Utah Jazz", logo: "jazz.png", name: "jazz" },
    { team: "Washington Wizards", logo: "wizards.png", name: "wizards" }
];

document.addEventListener("DOMContentLoaded", function() {
    const gridContainer = document.getElementById("team-grid");
    let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

    function updateFavorites(teamName) {
        const index = favorites.indexOf(teamName);
        if (index === -1) {
            favorites.push(teamName);
        } else {
            favorites.splice(index, 1);
        }
        localStorage.setItem("favorites", JSON.stringify(favorites));
    }

    function createTeamBox(team, isFavorited) {
        const teamBox = document.createElement("div");
        teamBox.classList.add("team-box");
        teamBox.innerHTML = `
            <img src="logos/${team.logo}" alt="${team.team} Logo">
            <p>${team.team}</p>
            <img src="logos/star${isFavorited ? "_filled" : ""}.png" class="favorite-icon" height=10px width=10px>
        `;
        
        const favoriteIcon = teamBox.querySelector(".favorite-icon");
        favoriteIcon.addEventListener("click", function(event) {
            const starImg = event.target;
            const isFavorited = starImg.src.includes("star_filled.png");
            starImg.src = isFavorited ? "logos/star.png" : "logos/star_filled.png";
            updateFavorites(team.name);
            event.stopPropagation();
        });

        teamBox.addEventListener("click", function(event) {
            window.open(`https://topstreams.info/nba/${team.name}`, '_blank');
        });
        return teamBox;
    }

    function renderTeams() {
        const favoritedTeams = teams.filter(team => favorites.includes(team.name));
        const nonFavoritedTeams = teams.filter(team => !favorites.includes(team.name));

        favoritedTeams.forEach(team => {
            const teamBox = createTeamBox(team, true);
            gridContainer.appendChild(teamBox);
        });

        nonFavoritedTeams.forEach(team => {
            const teamBox = createTeamBox(team, false);
            gridContainer.appendChild(teamBox);
        });
    }

    renderTeams();
});
