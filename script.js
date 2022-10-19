function initialize() {
   myGrid = new Grid();
   moves = 0,
   winner = 0,
   strawBerries = 1,
   waterMelons = 3,  
   player = strawBerries,
   computer = waterMelons,
   playerImg = "sblogo.png",
   computerImg = "wmlogo.png",
   whoseTurn = player,
   lastTurn = whoseTurn,   
   difficulty = 1,
   gameMode = 2,
   gameOver = false,  
   score = {
      computer: 0,
      draw: 0,
      player: 0
   };
   for ( let i = 0; i <= myGrid.cells.length - 1; i++ ) {      
      myGrid.cells[ i ] = 0;
   }
   setTimeout( showRules, 200 );
   //setTimeout( showOptions, 200 );
}

function VK_showInviteBox() {
   VK.callMethod("showInviteBox");
}

function Grid() {
   this.cells = new Array( 9 );
}

Grid.prototype.getFreeCellIndexes = function () {
   resultArr = [];

   for ( let i = 0; i <= this.cells.length - 1; i++ ) {
      if ( this.cells[ i ] === 0 ) {
         resultArr.push( i );
      }
   }

   return resultArr;
};

Grid.prototype.reset = function () {
   for ( let i = 0; i <= this.cells.length - 1; i++ ) {
      this.cells[ i ] = 0;
   }
   return true;
}

function cellClicked( id ) {
   let idName = id.toString();
   let cell = parseInt( idName[ idName.length - 1 ] );

   moves++;

   if ( gameMode === 1 ) {
      if ( myGrid.cells[ cell ] > 0 || whoseTurn !== player || gameOver ) {
         return false;
      }
      
      document.getElementById( id ).setAttribute( "src", playerImg );
      document.getElementById( id ).style.cursor = "default";
   
      myGrid.cells[ cell ] = player;
   } else if ( gameMode === 2 ) {
      if ( moves % 2 === 1 ) {
         document.getElementById( id ).setAttribute( "src", playerImg );
         document.getElementById( id ).style.cursor = "default";
      
         myGrid.cells[ cell ] = player;
      } else if ( moves % 2 === 0 ) {
         document.getElementById( id ).setAttribute( "src", computerImg );
         document.getElementById( id ).style.cursor = "default";
      
         myGrid.cells[ cell ] = computer;
      }
   }

   if ( moves >= 5 ) {
      winner = checkWin();
   }
   if ( winner === 0 ) {
      if ( gameMode === 1 ) {
         whoseTurn = computer;
         botMove();
      }
      else if ( gameMode === 2 ) {
         whoseTurn = computer;  
         //showCompImg( cell );
      }
   }

   return true;
}

function reload() {
   window.location.reload();
}

function showRules() {
   document.getElementById("gameRules").style.display = "block";
}

function showOptions() {
   document.getElementById("gameRules").style.display = "none";

   const sbImg = document.getElementById("sb1");
   const wmImg = document.getElementById("wm1");

   sbImg.addEventListener( "click", function () { wmImg.style.outline = "none"; } );
   wmImg.addEventListener( "click", function () { sbImg.style.outline = "none"; } );

   sbImg.addEventListener( "focus", function () { this.style.outline = "2px solid rgb(0,172,238)"; } );   
   wmImg.addEventListener( "focus", function () { this.style.outline = "2px solid rgb(0,172,238)"; } );

   if ( player == strawBerries ) {
      document.getElementById("sb1").style.outline = "2px solid rgb(0,172,238)";     
      document.getElementById("sb").checked = true;      
      document.getElementById("wm").checked = false;      
   } else if ( player == waterMelons ) {
      document.getElementById("wm1").style.outline = "2px solid rgb(0,172,238)";
      document.getElementById("sb").checked = false;            
      document.getElementById("wm").checked = true;
   }

   if ( whoseTurn == player ) {      
      document.getElementById("pl").checked = true;      
      document.getElementById("comp").checked = false;      
   } else if ( whoseTurn == computer ) {      
      document.getElementById("pl").checked = false;            
      document.getElementById("comp").checked = true;
   }
   document.getElementById("optionsDlg").style.display = "block";
}

function getOptions() {
   if ( document.getElementById( "wC" ).checked === true ) {
      gameMode = 1;
      document.getElementById( "gamerName1" ).innerText = "Компьютер";
      document.getElementById( "gamerName2" ).innerText = "Игрок";
   }
   else {
      gameMode = 2;
      document.getElementById( "gamerName1" ).innerText = "Игрок1";
      document.getElementById( "gamerName2" ).innerText = "Игрок2";
   }

   if ( document.getElementById( "ea" ).checked === true ) {
      difficulty = 0;
   }
   else {
      difficulty = 1;
   }

   if ( document.getElementById( "sb" ).checked === true ) {
      player = strawBerries;
      computer = waterMelons;
      playerImg = "sblogo.png";
      computerImg = "wmlogo.png";
      if ( document.getElementById( "pl" ).checked === true ) {
         whoseTurn = player;
      }
      else {
         whoseTurn = computer;
         setTimeout( botMove, 200 );
      }
         
   }
   else {
      player = waterMelons;
      computer = strawBerries;
      whoseTurn = player;
      playerImg = "wmlogo.png";
      computerImg = "sblogo.png";
      if ( document.getElementById( "pl" ).checked === true ) {
         whoseTurn = player;
      }
      else {
         whoseTurn = computer;
         setTimeout( botMove, 200 );
      }   
   }
   document.getElementById( "optionsDlg" ).style.display = "none";   
}

function closeModal( id ) {
   document.getElementById( id ).style.display = "none";
}

function botMove() {  

   if ( difficulty === 1 ) {
      if ( moves < 3 ) {
         cornersArr = [ 0, 2, 6, 8 ];
         let cell = cornersArr[ intRandom( 0, 3 ) ];
         if ( myGrid.cells[ 4 ] === 0 ) { let cell = 4; showCompImg( cell ); }
         else if ( myGrid.cells[ cell ] === 0 ) { showCompImg( cell ); }         
         else if ( myGrid.cells[ 0 ] === 0 ) { let cell = 0; showCompImg( cell ); }
         else if ( myGrid.cells[ 2 ] === 0 ) { let cell = 2; showCompImg( cell ); }
         else if ( myGrid.cells[ 6 ] === 0 ) { let cell = 6; showCompImg( cell ); }
         else { let cell = 8; showCompImg( cell ); }
      } else if ( moves >= 3 ) {  

         if ( ( myGrid.cells[ 0 ] + myGrid.cells[ 1 ] === 2 * computer ) && myGrid.cells[ 2 ] === 0 ) { //01 1
            let cell = 2; showCompImg( cell );
         } else if ( ( myGrid.cells[ 0 ] + myGrid.cells[ 2 ] === 2 * computer ) && myGrid.cells[ 1 ] === 0 ) { //02 2
         let cell = 1; showCompImg( cell );
         } else if ( ( myGrid.cells[ 0 ] + myGrid.cells[ 3 ] === 2 * computer ) && myGrid.cells[ 6 ] === 0 ) { //03 3
            let cell = 6; showCompImg( cell );
         } else if ( ( myGrid.cells[ 1 ] + myGrid.cells[ 2 ] === 2 * computer ) && myGrid.cells[ 0 ] === 0 ) { //04 4
            let cell = 0; showCompImg( cell );
         } else if ( ( myGrid.cells[ 0 ] + myGrid.cells[ 6 ] === 2 * computer ) && myGrid.cells[ 3 ] === 0 ) { //06 5
            let cell = 3; showCompImg( cell );
         } else if ( ( myGrid.cells[ 0 ] + myGrid.cells[ 8 ] === 2 * computer ) && myGrid.cells[ 4 ] === 0 ) { //08 6
            let cell = 4; showCompImg( cell );
         } else if ( ( myGrid.cells[ 1 ] + myGrid.cells[ 2 ] === 2 * computer ) && myGrid.cells[ 0 ] === 0 ) { //12 7
            let cell = 0; showCompImg( cell );
         } else if ( ( myGrid.cells[ 1 ] + myGrid.cells[ 4 ] === 2 * computer ) && myGrid.cells[ 7 ] === 0 ) { //14 8
            let cell = 7; showCompImg( cell );
         } else if ( ( myGrid.cells[ 1 ] + myGrid.cells[ 7 ] === 2 * computer ) && myGrid.cells[ 4 ] === 0 ) { //17 9
            let cell = 4; showCompImg( cell );
         } else if ( ( myGrid.cells[ 2 ] + myGrid.cells[ 4 ] === 2 * computer ) && myGrid.cells[ 6 ] === 0 ) { //24 10
            let cell = 6; showCompImg( cell );
         } else if ( ( myGrid.cells[ 2 ] + myGrid.cells[ 5 ] === 2 * computer ) && myGrid.cells[ 8 ] === 0 ) { //25 11
            let cell = 8; showCompImg( cell );
         } else if ( ( myGrid.cells[ 2 ] + myGrid.cells[ 6 ] === 2 * computer ) && myGrid.cells[ 4 ] === 0 ) { //26 12
            let cell = 4; showCompImg( cell );
         } else if ( ( myGrid.cells[ 2 ] + myGrid.cells[ 8 ] === 2 * computer ) && myGrid.cells[ 5 ] === 0 ) { //28 13
            let cell = 5; showCompImg( cell );
         } else if ( ( myGrid.cells[ 3 ] + myGrid.cells[ 4 ] === 2 * computer ) && myGrid.cells[ 5 ] === 0 ) { //34 14
            let cell = 5; showCompImg( cell );
         } else if ( ( myGrid.cells[ 3 ] + myGrid.cells[ 5 ] === 2 * computer ) && myGrid.cells[ 4 ] === 0 ) { //35 15
            let cell = 4; showCompImg( cell );
         } else if ( ( myGrid.cells[ 3 ] + myGrid.cells[ 6 ] === 2 * computer ) && myGrid.cells[ 0 ] === 0 ) { //36 16
            let cell = 0; showCompImg( cell );
         } else if ( ( myGrid.cells[ 4 ] + myGrid.cells[ 5 ] === 2 * computer ) && myGrid.cells[ 3 ] === 0 ) { //45 17
            let cell = 3; showCompImg( cell );
         } else if ( ( myGrid.cells[ 4 ] + myGrid.cells[ 6 ] === 2 * computer ) && myGrid.cells[ 2 ] === 0 ) { //46 18
         let cell = 2; showCompImg( cell );
         } else if ( ( myGrid.cells[ 4 ] + myGrid.cells[ 7 ] === 2 * computer ) && myGrid.cells[ 1 ] === 0 ) { //47 19
            let cell = 1; showCompImg( cell );
         } else if ( ( myGrid.cells[ 4 ] + myGrid.cells[ 8 ] === 2 * computer ) && myGrid.cells[ 0 ] === 0 ) { //48 20
            let cell = 0; showCompImg( cell );
         } else if ( ( myGrid.cells[ 5 ] + myGrid.cells[ 8 ] === 2 * computer ) && myGrid.cells[ 2 ] === 0 ) { //58 21
            let cell = 2; showCompImg( cell );
         } else if ( ( myGrid.cells[ 6 ] + myGrid.cells[ 7 ] === 2 * computer ) && myGrid.cells[ 8 ] === 0 ) { //67 22
            let cell = 8; showCompImg( cell );
         } else if ( ( myGrid.cells[ 6 ] + myGrid.cells[ 8 ] === 2 * computer ) && myGrid.cells[ 7 ] === 0 ) { //68 23
            let cell = 7; showCompImg( cell );
         } else if ( ( myGrid.cells[ 7 ] + myGrid.cells[ 8 ] === 2 * computer ) && myGrid.cells[ 6 ] === 0 ) { //78 24
            let cell = 6; showCompImg( cell );
         } else

         if ( ( myGrid.cells[ 0 ] + myGrid.cells[ 1 ] === 2 * player ) && myGrid.cells[ 2 ] === 0 ) { //01 1
            let cell = 2; showCompImg( cell );
         } else if ( ( myGrid.cells[ 0 ] + myGrid.cells[ 2 ] === 2 * player ) && myGrid.cells[ 1 ] === 0 ) { //02 2
            let cell = 1; showCompImg( cell );
         } else if ( ( myGrid.cells[ 0 ] + myGrid.cells[ 3 ] === 2 * player ) && myGrid.cells[ 6 ] === 0 ) { //03 3
            let cell = 6; showCompImg( cell );
         } else if ( ( myGrid.cells[ 1 ] + myGrid.cells[ 2 ] === 2 * player ) && myGrid.cells[ 0 ] === 0 ) { //04 4
            let cell = 0; showCompImg( cell );
         } else if ( ( myGrid.cells[ 0 ] + myGrid.cells[ 6 ] === 2 * player ) && myGrid.cells[ 3 ] === 0 ) { //06 5
            let cell = 3; showCompImg( cell );
         } else if ( ( myGrid.cells[ 0 ] + myGrid.cells[ 8 ] === 2 * player ) && myGrid.cells[ 4 ] === 0 ) { //08 6
            let cell = 4; showCompImg( cell );
         } else if ( ( myGrid.cells[ 1 ] + myGrid.cells[ 2 ] === 2 * player ) && myGrid.cells[ 0 ] === 0 ) { //12 7
            let cell = 0; showCompImg( cell );
         } else if ( ( myGrid.cells[ 1 ] + myGrid.cells[ 4 ] === 2 * player ) && myGrid.cells[ 7 ] === 0 ) { //14 8
            let cell = 7; showCompImg( cell );
         } else if ( ( myGrid.cells[ 1 ] + myGrid.cells[ 7 ] === 2 * player ) && myGrid.cells[ 4 ] === 0 ) { //17 9
            let cell = 4; showCompImg( cell );
         } else if ( ( myGrid.cells[ 2 ] + myGrid.cells[ 4 ] === 2 * player ) && myGrid.cells[ 6 ] === 0 ) { //24 10
            let cell = 6; showCompImg( cell );
         } else if ( ( myGrid.cells[ 2 ] + myGrid.cells[ 5 ] === 2 * player ) && myGrid.cells[ 8 ] === 0 ) { //25 11
            let cell = 8; showCompImg( cell );
         } else if ( ( myGrid.cells[ 2 ] + myGrid.cells[ 6 ] === 2 * player ) && myGrid.cells[ 4 ] === 0 ) { //26 12
            let cell = 4; showCompImg( cell );
         } else if ( ( myGrid.cells[ 2 ] + myGrid.cells[ 8 ] === 2 * player ) && myGrid.cells[ 5 ] === 0 ) { //28 13
            let cell = 5; showCompImg( cell );
         } else if ( ( myGrid.cells[ 3 ] + myGrid.cells[ 4 ] === 2 * player ) && myGrid.cells[ 5 ] === 0 ) { //34 14
            let cell = 5; showCompImg( cell );
         } else if ( ( myGrid.cells[ 3 ] + myGrid.cells[ 5 ] === 2 * player ) && myGrid.cells[ 4 ] === 0 ) { //35 15
            let cell = 4; showCompImg( cell );
         } else if ( ( myGrid.cells[ 3 ] + myGrid.cells[ 6 ] === 2 * player ) && myGrid.cells[ 0 ] === 0 ) { //36 16
            let cell = 0; showCompImg( cell );
         } else if ( ( myGrid.cells[ 4 ] + myGrid.cells[ 5 ] === 2 * player ) && myGrid.cells[ 3 ] === 0 ) { //45 17
            let cell = 3; showCompImg( cell );
         } else if ( ( myGrid.cells[ 4 ] + myGrid.cells[ 6 ] === 2 * player ) && myGrid.cells[ 2 ] === 0 ) { //46 18
            let cell = 2; showCompImg( cell );
         } else if ( ( myGrid.cells[ 4 ] + myGrid.cells[ 7 ] === 2 * player ) && myGrid.cells[ 1 ] === 0 ) { //47 19
            let cell = 1; showCompImg( cell );
         } else if ( ( myGrid.cells[ 4 ] + myGrid.cells[ 8 ] === 2 * player ) && myGrid.cells[ 0 ] === 0 ) { //48 20
            let cell = 0; showCompImg( cell );
         } else if ( ( myGrid.cells[ 5 ] + myGrid.cells[ 8 ] === 2 * player ) && myGrid.cells[ 2 ] === 0 ) { //58 21
            let cell = 2; showCompImg( cell );
         } else if ( ( myGrid.cells[ 6 ] + myGrid.cells[ 7 ] === 2 * player ) && myGrid.cells[ 8 ] === 0 ) { //67 22
            let cell = 8; showCompImg( cell );
         } else if ( ( myGrid.cells[ 6 ] + myGrid.cells[ 8 ] === 2 * player ) && myGrid.cells[ 7 ] === 0 ) { //68 23
            let cell = 7; showCompImg( cell );
         } else if ( ( myGrid.cells[ 7 ] + myGrid.cells[ 8 ] === 2 * player ) && myGrid.cells[ 6 ] === 0 ) { //78 24
            let cell = 6; showCompImg( cell );
         } 

         else if ( ( myGrid.cells[ 0 ] + myGrid.cells[ 4 ] + myGrid.cells[ 8 ] === 2 * player + computer ) && myGrid.cells[ 6 ] === 0 ) {
            let cell = 6; showCompImg( cell );
         } else if ( ( myGrid.cells[ 2 ] + myGrid.cells[ 4 ] + myGrid.cells[ 6 ] === 2 * player + computer ) && myGrid.cells[ 0 ] === 0 ) {
            let cell = 0; showCompImg( cell );
         }
         
         else {
            myArr = [];
            myArr = myGrid.getFreeCellIndexes();
            
            if ( myArr.length > 0 ) {
               let cell = myArr[ intRandom( 0, myArr.length - 1 ) ];
               showCompImg( cell );
            }
         }
      }
   }

   else if ( difficulty === 0 ) {
      myArr = [];
      myArr = myGrid.getFreeCellIndexes();
      
      if ( myArr.length > 0 ) {
         let cell = myArr[ intRandom( 0, myArr.length - 1 ) ];
         showCompImg( cell );
      }
   }

   if ( moves >= 5 ) {
      winner = checkWin();
   }
   if ( winner === 0 && !gameOver ) {
      whoseTurn = player;      
   }
}

function showCompImg( cell ) {
   let id = "cell" + cell.toString();
   moves++;  
   document.getElementById( id ).setAttribute( "src", computerImg );
   document.getElementById( id ).style.cursor = "default";   
   myGrid.cells[ cell ] = computer;  
}

function checkWin() {
   winner = 0;

   if ( myGrid.cells[ 0 ] === player && myGrid.cells[ 3 ] === player && myGrid.cells[ 6 ] === player ||
        myGrid.cells[ 1 ] === player && myGrid.cells[ 4 ] === player && myGrid.cells[ 7 ] === player ||
        myGrid.cells[ 2 ] === player && myGrid.cells[ 5 ] === player && myGrid.cells[ 8 ] === player ||
        myGrid.cells[ 0 ] === player && myGrid.cells[ 4 ] === player && myGrid.cells[ 8 ] === player ||
        myGrid.cells[ 2 ] === player && myGrid.cells[ 4 ] === player && myGrid.cells[ 6 ] === player ||
        myGrid.cells[ 0 ] === player && myGrid.cells[ 1 ] === player && myGrid.cells[ 2 ] === player ||
        myGrid.cells[ 3 ] === player && myGrid.cells[ 4 ] === player && myGrid.cells[ 5 ] === player ||
        myGrid.cells[ 6 ] === player && myGrid.cells[ 7 ] === player && myGrid.cells[ 8 ] === player ) { 
      winner = player; 
      score.player++;    
      endGame( winner );          
   } else if ( myGrid.cells[ 0 ] === computer && myGrid.cells[ 3 ] === computer && myGrid.cells[ 6 ] === computer ||
      myGrid.cells[ 1 ] === computer && myGrid.cells[ 4 ] === computer && myGrid.cells[ 7 ] === computer ||
      myGrid.cells[ 2 ] === computer && myGrid.cells[ 5 ] === computer && myGrid.cells[ 8 ] === computer ||
      myGrid.cells[ 0 ] === computer && myGrid.cells[ 4 ] === computer && myGrid.cells[ 8 ] === computer ||
      myGrid.cells[ 2 ] === computer && myGrid.cells[ 4 ] === computer && myGrid.cells[ 6 ] === computer ||
      myGrid.cells[ 0 ] === computer && myGrid.cells[ 1 ] === computer && myGrid.cells[ 2 ] === computer ||
      myGrid.cells[ 3 ] === computer && myGrid.cells[ 4 ] === computer && myGrid.cells[ 5 ] === computer ||
      myGrid.cells[ 6 ] === computer && myGrid.cells[ 7 ] === computer && myGrid.cells[ 8 ] === computer ) {
      winner = computer;
      score.computer++;
      endGame( winner ); 
   } else if ( moves === 9 ) {
      winner = 20;
      score.draw++;
      endGame( winner );
   }

   return winner;
}

function intRandom( min, max ) {
   let rand = Math.random() * ( max - min ) + min;
   return Math.floor( rand );
}

function endGame( who ) {
   if ( who == player ) {     
      if ( gameMode === 1 ) {
         announceWinner( "Вы выиграли!", true );
      } else if ( gameMode === 2 && player == strawBerries ) {
         announceWinner( "Выиграли клубники!", true );
      } else if ( gameMode === 2 && player == waterMelons ) {
         announceWinner( "Выиграли арбузы!", true );
      }
   } else if ( who == computer ) {  
      if ( gameMode === 1 ) {
         announceWinner( "Выиграл компьютер!", false );   
      } else if ( gameMode === 2 && computer == strawBerries ) {
         announceWinner( "Выиграли клубники!", true );
      } else if ( gameMode === 2 && computer == waterMelons ) {
         announceWinner( "Выиграли арбузы!", true );
      }
   } else {      
      announceWinner( "Ничья!", false );
   }
   gameOver = true;
   whoseTurn = 0;
   moves = 0;
   winner = 0;
   document.getElementById( "computer_score" ).innerHTML = score.computer;
   document.getElementById( "draw_score" ).innerHTML = score.draw;
   document.getElementById( "player_score" ).innerHTML = score.player;
   setTimeout( restartGame, 1000 );
   
   if ( score.computer + score.draw + score.player === 1 || score.computer + score.draw + score.player === 10 ) {
      setTimeout( showAddToMenu, 1100 );
   }

   vkAds();
}

function showAddToMenu() {
   document.getElementById( "addToMenu" ).style.display = "block"; 
}

function addToMenu() {
   VK.callMethod("showSettingsBox", 256);
}

function vkAds() {
   vkBridge.send("VKWebAppCheckNativeAds", {"ad_format": "interstitial"});
   vkBridge.send("VKWebAppShowNativeAds", {ad_format:"interstitial"})

   .then(data => console.log(data.result))
   .catch(error => console.log(error));
}

function announceWinner( text, isGif ) {
   let randNum = intRandom( 1, 3 );
   if ( isGif === true ) {
      if ( randNum === 1 ) {
         document.getElementById( "winnerGif" ).setAttribute( "src", "winner_gif1.gif" );
      } else if ( randNum === 2 ) {
         document.getElementById( "winnerGif" ).setAttribute( "src", "winner_gif2.gif" );
      }
   }
   else {
      document.getElementById( "winnerGif" ).setAttribute( "src", "" );
   }
   document.getElementById( "winText" ).innerText = text;
   document.getElementById( "winAnnounce" ).style.display = "block";
   setTimeout( closeModal, 1000, "winAnnounce" );
}

function restartGame( ask ) {   
   gameOver = false;
   moves = 0;
   winner = 0;
   
   if ( document.getElementById( "pl" ).checked === true ) {
      whoseTurn = player;
   }
   else {
      whoseTurn = computer;
      //setTimeout( botMove, 200 );
   }   
   
   myGrid.reset();

   for ( let i = 0; i <= 8; i++ ) {
      let id = "cell" + i.toString();      
      document.getElementById( id ).setAttribute( "src", "nologo.png" );
      document.getElementById( id ).style.cursor = "pointer";
   }

   if ( ask === true ) {
      showOptions( true );
   } else if ( whoseTurn == computer ) {
      botMove();
   }
}