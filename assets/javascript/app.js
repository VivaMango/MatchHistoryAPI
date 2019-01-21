// Initialize Firebase
var config = {
    apiKey: "AIzaSyCflUNNpm3p3UMzT0OlzYQxbMsD1R-xWd8",
    authDomain: "matchhistoryapi.firebaseapp.com",
    databaseURL: "https://matchhistoryapi.firebaseio.com",
    projectId: "matchhistoryapi",
    storageBucket: "",
    messagingSenderId: "287521393654"
  };
  firebase.initializeApp(config);

  var database = firebase.database();

  var RiotAPIKey = "RGAPI-748b9a73-c6b0-4090-931e-d27e20f36b45"  //Mr Medusa Riot API Key goes here



  //uses user name input to search Riot for encrypted account ID
  $("#inputSubmit").on("click" , function () {
  event.preventDefault()
  var nameInput = $("#nameInput").val().trim()
  var queryURL = `https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${nameInput}?api_key=${RiotAPIKey}` 
  $.ajax({ 
      url: queryURL, 
      method: "GET" 
  }).then(function(response) {
      console.log(response , `Riot ${nameInput} response`)
      console.log(response.accountId , `${nameInput} account id`)
      var searchID = response.accountId
      getSummonerMatches(RiotAPIKey , searchID)
  });
});


function selectGameByID() {
  $(".gameIDBtn").off()
  $(".gameIDBtn").on("click" , function () {
    var gameBtnEvent = event.currentTarget
    var gameIDData = $(gameBtnEvent).data("gameid")
    console.log(gameIDData , "gameIDData")
    matchDataRequest(gameIDData)
  })
}

function matchDataRequest(gameID) {
  var matchDataQueryURL = `https://na1.api.riotgames.com/lol/match/v4/matches/${gameID}?api_key=${RiotAPIKey}`
  $.ajax({ 
    url: matchDataQueryURL, 
    method: "GET" 
  }).then(function(response) {
    console.log(response , `Riot ${gameID} response`)
    })
  }




// uses accountID from user name input to search match history
function getSummonerMatches(apikey , encryptedAccountID) {
  var matchQueryURL = `https://na1.api.riotgames.com/lol/match/v4/matchlists/by-account/${encryptedAccountID}?api_key=${apikey}`
  $.ajax({ 
    url: matchQueryURL, 
    method: "GET" 
  }).then(function(response) {
    console.log(response , `Riot ${encryptedAccountID} response`)
    var matchResponse = response.matches
    matchResponse.forEach(function(element){
      createMatchTable(element)
      selectGameByID() //maybe move to prevent duplication thing
    })
  });
};


//Generates table of match information
function createMatchTable(eachMatch) {
    var champName = getChampNamebyID(eachMatch.champion)
    var laneInput = supportFilter(eachMatch.lane)
    var queueType = getQueueType(eachMatch.queue)
    matchRowGenerator(champName , laneInput , queueType , eachMatch.gameId)
}


//Generates one row of match information
function matchRowGenerator(matchChampion , lane , queue , matchGameID) {
  var newRow = $("<tr>")
  var gameButton = $("<button>")
  gameButton.attr("type" , "button")
  gameButton.attr("id" , "")
  gameButton.addClass("gameIDBtn")
  gameButton.addClass("btn btn-primary")
  gameButton.text("Select Match")
  gameButton.data("gameid" , matchGameID)
  var dataArray = [matchChampion , lane , queue , gameButton]
  dataArray.forEach(function(element) {
    var newData = $("<td>")
        newData.html(element)
        newRow.append(newData)
  })

  $("#tableBody").append(newRow)
}

//Converts NONE response into SUPPORT for display
function supportFilter(lane) {
  if (lane === "NONE") {
    return "SUPPORT"
  } else {
    return lane
  }
}


// Converts queue ID to queue name
function getQueueType(queuevalue) {
  if (queuevalue === 400) {
    return "Normal"
  } else if (queuevalue === 440) {
    return "Ranked Flex"
  } else if (queuevalue === 420) {
    return "Ranked Solo/Duo"
  } else {
    return "Unknown Queue Type"
  }
}

// Converts champion ID to champion name
function getChampNamebyID(champID) {
  switch (champID) {
    case 266:
      return "Aatrox"; 
    case 412: 
     return "Thresh"; 
    case 23: 
     return "Tryndamere";
    case 79: 
     return "Gragas";
    case 69: 
      return "Cassiopeia";
    case 136:
     return "Aurelion Sol"; 
    case 13:
     return "Ryze"; 
    case 78:
     return "Poppy"; 
    case 14:
     return "Sion"; 
    case 1:
     return "Annie"; 
    case 202:
     return "Jhin"; 
    case 43:
     return "Karma"; 
    case 111:
     return "Nautilus"; 
    case 240:
     return "Kled"; 
    case 99:
     return "Lux"; 
    case 103:
     return "Ahri"; 
    case 2:
     return "Olaf"; 
    case 112:
     return "Viktor"; 
    case 34:
     return "Anivia"; 
    case 27:
     return "Singed"; 
    case 86:
     return "Garen"; 
    case 127:
     return "Lissandra"; 
    case 57:
     return "Maokai"; 
    case 25:
     return "Morgana"; 
    case 28:
     return "Evelynn"; 
    case 105:
     return "Fizz"; 
    case 74:
     return "Heimerdinger"; 
    case 238:
     return "Zed"; 
    case 68:
     return "Rumble"; 
    case 82:
     return "Mordekaiser"; 
    case 37:
     return "Sona"; 
    case 96:
     return "Kog'Maw"; 
    case 55:
     return "Katarina"; 
    case 117:
     return "Lulu"; 
    case 22:
     return "Ashe"; 
    case 30:
     return "Karthus"; 
    case 12:
     return "Alistar"; 
    case 122:
     return "Darius"; 
    case 67:
     return "Vayne"; 
    case 110:
     return "Varus"; 
    case 77:
     return "Udyr"; 
    case 89:
     return "Leona"; 
    case 126:
     return "Jayce"; 
    case 134:
     return "Syndra"; 
    case 80:
     return "Pantheon"; 
    case 92:
     return "Riven"; 
    case 121:
     return "Kha'Zix"; 
    case 42:
     return "Corki"; 
    case 268:
     return "Azir"; 
    case 51:
     return "Caitlyn"; 
    case 76:
     return "Nidalee"; 
    case 85:
     return "Kennen"; 
    case 3:
     return "Galio"; 
    case 45:
     return "Veigar"; 
    case 432:
     return "Bard"; 
    case 150:
     return "Gnar"; 
    case 90:
     return "Malzahar"; 
    case 104:
     return "Graves"; 
    case 254:
     return "Vi"; 
    case 10:
     return "Kayle"; 
    case 39:
     return "Irelia"; 
    case 64:
     return "Lee Sin"; 
    case 420:
     return "Illaoi"; 
    case 60:
     return "Elise"; 
    case 106:
     return "Volibear"; 
    case 20:
     return "Nunu"; 
    case 4:
     return "Twisted Fate"; 
    case 24:
     return "Jax"; 
    case 102:
     return "Shyvana"; 
    case 429:
     return "Kalista"; 
    case 36:
     return "Dr. Mundo"; 
    case 427:
     return "Ivern"; 
    case 131:
     return "Diana"; 
    case 223:
     return "Tahm Kench"; 
    case 63:
     return "Brand"; 
    case 113:
     return "Sejuani"; 
    case 8:
     return "Vladimir"; 
    case 154:
     return "Zac"; 
    case 421:
     return "Rek'Sai"; 
    case 133:
     return "Quinn"; 
    case 84:
     return "Akali"; 
    case 163:
     return "Taliyah"; 
    case 18:
     return "Tristana"; 
    case 120:
     return "Hecarim"; 
    case 15:
     return "Sivir"; 
    case 236:
     return "Lucian"; 
    case 107:
     return "Rengar"; 
    case 19:
     return "Warwick"; 
    case 72:
     return "Skarner"; 
    case 54:
     return "Malphite"; 
    case 157:
     return "Yasuo"; 
    case 101:
     return "Xerath"; 
    case 17:
     return "Teemo"; 
    case 75:
     return "Nasus"; 
    case 58:
     return "Renekton"; 
    case 119:
     return "Draven"; 
    case 35:
     return "Shaco"; 
    case 50:
     return "Swain"; 
    case 91:
     return "Talon"; 
    case 40:
     return "Janna"; 
    case 115:
     return "Ziggs"; 
    case 245:
     return "Ekko"; 
    case 61:
     return "Orianna"; 
    case 114:
     return "Fiora"; 
    case 9:
     return "Fiddlesticks"; 
    case 31:
     return "Cho'Gath"; 
    case 33:
     return "Rammus"; 
    case 7:
     return "LeBlanc"; 
    case 16:
     return "Soraka"; 
    case 26:
     return "Zilean"; 
    case 56:
     return "Nocturne"; 
    case 222:
     return "Jinx"; 
    case 83:
     return "Yorick"; 
    case 6:
     return "Urgot"; 
    case 203:
     return "Kindred"; 
    case 21:
     return "Miss Fortune"; 
    case 62:
     return "Wukong"; 
    case 53:
     return "Blitzcrank"; 
    case 98:
     return "Shen"; 
    case 201:
     return "Braum"; 
    case 5:
     return "Xin Zhao"; 
    case 29:
     return "Twitch"; 
    case 11:
     return "Master Yi"; 
    case 44:
     return "Taric"; 
    case 32:
     return "Amumu"; 
    case 41:
     return "Gangplank"; 
    case 48:
     return "Trundle"; 
    case 38:
     return "Kassadin"; 
    case 161:
     return "Vel'Koz"; 
    case 143:
     return "Zyra"; 
    case 267:
     return "Nami"; 
    case 59:
     return "Jarvan IV"; 
    case 81:
     return "Ezreal"; 
    default:
      console.log("Unknown Champion ID")
      return "Unknown";
  }
}