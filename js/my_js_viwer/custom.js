$(document).ready(function () {
    var count = 0;
    for (var i =0; i < col.length; i++){
        for (var j =0; j < row.length; j++){
            var tempId = col[i] + row[j];
            div_ids[count] =tempId;
            count++;
        }
    }
});
// checkMateStatus
var checkMateStatus = false;
// id all divs
var div_ids = [];
// colum
var col = ["a","b","c","d","e","f","g","h"];
// row
var row = ["1","2","3","4","5","6","7","8"];
// chess div_ids
var chessmans_ids =
    [
        "b-l-r"     ,       "b-l-k"     ,        "b-l-b"    ,   "b-a-q"     ,
        "b-a-king"  ,       "b-r-b"     ,        "b-r-k"    ,   "b-r-r"     ,
        "b-l-p"     ,       "b-2-p"     ,        "b-3-p"    ,   "b-4-p"     ,
        "b-5-p"     ,       "b-6-p"     ,        "b-7-p"    ,   "b-8-p"     ,
        "w-l-p"     ,       "w-2-p"     ,        "w-3-p"    ,   "w-4-p"     ,
        "w-5-p"     ,       "w-6-p"     ,        "w-7-p"    ,   "w-8-p"     ,
        "w-l-r"     ,       "w-l-k"     ,        "w-l-b"    ,   "w-a-king"  ,
        "w-a-q"     ,       "w-r-b"    ,         "w-r-k"    ,   "w-r-r"
    ];
// chess div_crose_ids
var cross_div_ids =
    [
        "cr1"   ,   "cr2"   ,   "cr3"   ,   "cr4"   ,
        "cr5"   ,   "cr6"   ,   "cr7"   ,   "cr8"   ,
        "cr9"   ,   "cr10"  ,   "cr11"  ,   "cr12"  ,
        "cr13"  ,   "cr14"  ,   "cr15"  ,   "cr16"  ,
        "cr17"  ,   "cr18"  ,   "cr19"  ,   "cr21"  ,
        "cr22"  ,   "cr23"  ,   "cr24"  ,   "cr25"  ,
        "cr26"  ,   "cr27"  ,   "cr28"  ,   "cr29"  ,
        "cr30"  ,   "cr31"
    ];
// chess men path
var path =[];
// chage for wite(true == true) / change for black( true == false)
var turn ="w";
// chess Object
var chessObject ={
    team:"",
    chessmanId:"",
    chessmanPathIdv:""
};
// details set set object
$("div > div > div > div > div > div > div").click(function () {

    var chessman = $(this).attr("id");
    var chessmanParent = $(this).parent().attr("id");
    var team = checkTeam(chessman);

    if(!checkMateStatus) {
        if ((checkAnyCrossing().length > 0) && (team !== chessObject.team)) {
            var selectedDivsParent = $(this).parent().attr("id");
            var selectedDiv = $(this).attr("id");
            var team = checkTeam(selectedDiv);

            // chess movement place
            if ($("#" + selectedDivsParent).hasClass("cross") && (!selectedDiv.includes("king"))) {
                moveToCrossQueue(chessman, team);
                findCrossedChessman(selectedDiv);
                $("#" + chessObject.chessmanId).appendTo("#" + selectedDivsParent);
                moveToCrossQueue(chessman, team);
                removeAllCross();
                removeAllPath();
                findTurn();
                checkMate();
                turnChessBoard();
            }
        } else {
            removeAllCross();
            removeAllPath();
            chessObject.chessmanId = chessman;
            chessObject.chessmanParentId = chessmanParent;
            chessObject.team = checkTeam(chessObject.chessmanId);
            findName(chessObject.chessmanId);
        }
    } else {
        alert("Game Over");
    }
});
// find the crossing chess men index frm chess men divs id arry
function findCrossedChessman(id) {
    for (var i = 0; i < chessmans_ids.length; i++){
        if(id === chessmans_ids[i]){
            chessmans_ids.splice(i, 1);
            if (chessmans_ids[i].includes("w")){
                $("#" + id).toggleClass('rotate');
            }
            break;
        }
    }
}
// add cross chessmans to cross queue
function moveToCrossQueue(id, team) {
    if(team ==="b"){
        for (var i=0; i< 15; i++){
            if ($("#" + cross_div_ids[i]).children().length === 0){
                $("#" + id).appendTo($("#" + cross_div_ids[i]));
                break;
            }
        }
    }else if (team === "w"){
        for (var i=15; i< cross_div_ids.length; i++){
            if ($("#" + cross_div_ids[i]).children().length === 0){
                $("#" + id).appendTo($("#" + cross_div_ids[i]));
                break;
            }
        }
    }
}
// chess men movement place two move a chess  men to a selected path
$("div > div > div > div > div > div ").click(function () {
    var selectedDiv = $(this).attr("id");
    if ($("#" + selectedDiv).hasClass("path") && (!selectedDiv.includes("king"))) {
        $("#" + chessObject.chessmanId).appendTo("#"+selectedDiv);
        removeAllCross();
        removeAllPath();
        findTurn();
        checkMate();
        turnChessBoard();
    }
});

// find the chess men team
function checkTeam(id){
    var details = id.split("-");

    // this one is a find the chess men team
    switch (details[0]){
        case "b":
            return "b";
        case "w":
            return "w";
    }
}

// the find the chessmen name
function findName(id) {
    var details = id.split("-");
    if (turn === chessObject.team) {
        switch (details[2]) {
            case "p":
                chessObject.chessman = "pawn";
                findPawnPath(chessObject.chessmanParentId, chessObject.team);
                break;
            case "r":
                chessObject.chessman = "ruk";
                findRukPath(chessObject.chessmanParentId, chessObject.team);
                break;
            case "b":
                chessObject.chessman = "bishop";
                findBishopPath(chessObject.chessmanParentId, chessObject.team);
                break;
            case "k":
                chessObject.chessman = "knight";
                findKnightPath(chessObject.chessmanParentId, chessObject.team);
                break;
            case "king":
                chessObject.chessman = "king";
                findKingPath(chessObject.chessmanParentId, chessObject.team);
                break;
            case "q":
                chessObject.chessman = "queen";
                findQueenPath(chessObject.chessmanParentId, chessObject.team, "queen");
                break;
        }
    } else {
        if ((turn === "w") && (checkAnyCrossing().length === 0) && (checkAnyPath().length === 0)) {
            alert("This turn is white");
        } else if ((turn === "b") && (checkAnyCrossing().length === 0) && (checkAnyPath().length === 0)) {
            alert("This turn is black");
        }
    }
}

// find pawn path
function findPawnPath(currentPos, team, from){
    if (from !=="check"){
        removeAllCross();
        removeAllPath();
    }
    var count = 0;
    if ((currentPos !== null) && (currentPos !== undefined)){

        // position with X & Y
        var x = currentPos.substr(0, 1);
        var y = currentPos.substr(1, 1);

        var xIndex = getXIndex(x);
        var yIndex = getYIndex(y);

        // check movement div for white pawns
        if (team === "w"){
            for (var j =0; j < row.length; j++){
                // check is the first movement for a pawn if is the first two divs
                if((y === "2")){
                    if ($("#" + x + "3").children().length === 0){
                        $("#" + x + "3").addClass("path");
                        if ($("#" + x + "4").children().length === 0){
                            $("#" + x + "4").addClass("path");
                            // removeAllCross
                        }
                    }
                    // if is not the fist movemnt looking for a div to move
                }else {
                    var content = $("div > div > div > div > div > div > div").attr("id");
                    if ((content !== null) && (content !== undefined)){
                        if ((count < 1)&& ($("#" + x + (row[yIndex + 1])).children().length === 0)){
                            $("#" + x + (row[yIndex + 1])).addClass("path");
                            // removeAllCross
                            count++;
                        }
                    }
                }
                if ($("#" + col[xIndex + 1] + row[yIndex + 1]).children().length > 0){
                    var id = $("#" + col[xIndex + 1] + row[yIndex + 1]).children().attr("id");
                    var team = checkTeam(id);
                    if (team === "b"){
                        $("#" + col[xIndex + 1] + (row[yIndex + 1])).addClass("cross");
                        // removeAllCross
                    }
                }
                if ($("#" + col[xIndex - 1] + row[yIndex + 1]).children().length > 0){
                    var id = $("#" + col[xIndex - 1] + row[yIndex + 1]).children().attr("id");
                    var team = checkTeam(id);
                    if (team === "b"){
                        $("#" + col[xIndex - 1] + (row[yIndex + 1])).addClass("cross");
                        // removeAllCross
                    }
                }
            }

            // check movement divs for black pawn
        }else {
            for (var j =row.length; j > 0; j--){
                if((y === "7")){
                    if ($("#" + x + "6").children().length === 0){
                        $("#" + x + "6").addClass("path");
                        if ($("#" + x + "5").children().length === 0){
                            $("#" + x + "5").addClass("path");
                            // removeAllCross
                        }
                    }
                }else {
                    var content = $("div > div > div > div > div > div > div").attr("id");
                    if ((content !== null) && (content !== undefined)){
                        if ((count < 1)&& ($("#" + x + (row[yIndex - 1])).children().length === 0)){
                            $("#" + x + (row[yIndex - 1])).addClass("path");
                            // removeAllCross
                            count++;
                        }
                    }
                }
                if ($("#" + col[xIndex + 1] + row[yIndex - 1]).children().length > 0){
                    var id = $("#" + col[xIndex + 1] + row[yIndex - 1]).children().attr("id");
                    var team = checkTeam(id);
                    if (team === "w"){
                        $("#" + col[xIndex + 1] + row[yIndex - 1]).addClass("cross");
                        // removeAllCross
                    }
                }
                if ($("#" + col[xIndex - 1] + row[yIndex - 1]).children().length > 0){
                    var id = $("#" + col[xIndex - 1] + row[yIndex - 1]).children().attr("id");
                    var team = checkTeam(id);
                    if (team === "w"){
                        $("#" + col[xIndex - 1] + row[yIndex - 1]).addClass("cross");
                        // removeAllCross
                    }
                }
            }
        }
    }
}
// thid method common for the both queen and ruk find the ruk path to move
 function findRukPath( currentPos , team, from ) {
     if (from !== "queen"){
         removeAllCross();
         removeAllPath()
     }
     var pathArray = [];
     var crossArray = [];

     var check = [];

     var content = $ ("div > div > div > div > div > div > div").attr("id");
     if ((content !== null ) && (content !== undefined)){
         if ((currentPos !== null) && (currentPos !== undefined)){

             // position with X & Y
             var x = currentPos.substr(0,1);
             var y = currentPos.substr(1, 1);

             var xIndex = getXIndex(x);
             var yIndex = getYIndex(y);

             // check movement divs for white ruks
             // look path or cross for ==> sid
             for (var i = xIndex + 1; i < row.length; i++){
                 if ($("#" + col[i] + row[yIndex]).children().length === 0){
                     pathArray.push($("#" + col[i] + row[yIndex]).attr("id"));
                 }
                 if ($("#" + col[i] + row[yIndex]).children().length > 0){
                     if (checkTeam($("#" + col[i] + row[yIndex]).children().attr("id")) !== team){
                         if(from !== "check"){
                             crossArray.push($("#" + col[i] + row[yIndex]).attr("id"));
                             break;
                         }else {
                             if ($("#" + col[i] + row[yIndex]).children().attr("id").includes("king")){
                                 check.push($("#" + col[i] + row[yIndex]).attr("id"));
                                 break;
                             }
                         }
                     }else {
                         break;
                     }
                 }
             }
             // look path or cross for <== sid
             for (var i = xIndex - 1; i > -1; i--){
                 if ($("#" + col[i] + row[yIndex]).children().length === 0){
                     pathArray.push($("#" + col[i] + row[yIndex]).attr("id"));
                 }
                 if ($("#" + col[i] + row[yIndex]).children().length > 0){
                     if (checkTeam($("#" + col[i] + row[yIndex]).children().attr("id")) !== team){
                         if(from !== "check"){
                             crossArray.push($("#" + col[i] + row[yIndex]).attr("id"));
                             break;
                         }else {
                             if ($("#" + col[i] + row[yIndex]).children().attr("id").includes("king")){
                                 check.push($("#" + col[i] + row[yIndex]).attr("id"));
                                 break;
                             }
                         }
                     }else {
                         break;
                     }
                 }
             }
             // look path or cross for up
             for (var i = yIndex + 1; i < col.length; i++){
                 if ($("#" + col[xIndex] + row[i]).children().length === 0){
                     pathArray.push($("#" + col[xIndex] + row[i]).attr("id"));
                 }
                 if ($("#" + col[xIndex] + row[i]).children().length > 0){
                     if (checkTeam($("#" + col[xIndex] + row[i]).children().attr("id")) !== team){
                         if(from !== "check"){
                             crossArray.push($("#" + col[xIndex] + row[i]).attr("id"));
                             break;
                         }else {
                             if ($("#" + col[xIndex] + row[i]).children().attr("id").includes("king")){
                                 check.push($("#" + col[xIndex] + row[i]).attr("id"));
                                 break;
                             }
                         }
                     }else {
                         break;
                     }
                 }
             }
             // look path or cross for down
             for (var i = yIndex - 1; i > -1; i--){
                 if ($("#" + col[xIndex] + row[i]).children().length === 0){
                     pathArray.push($("#" + col[xIndex] + row[i]).attr("id"));
                 }
                 if ($("#" + col[xIndex] + row[i]).children().length > 0){
                     if (checkTeam($("#" + col[xIndex] + row[i]).children().attr("id")) !== team){
                         if(from !== "check"){
                             crossArray.push($("#" + col[xIndex] + row[i]).attr("id"));
                             break;
                         }else {
                             if ($("#" + col[xIndex] + row[i]).children().attr("id").includes("king")){
                                 check.push($("#" + col[xIndex] + row[i]).attr("id"));
                                 break;
                             }
                         }
                     }else {
                         break;
                     }
                 }
             }
         }
         if (from !== "check"){
             colorCrossPath(crossArray);
             colorPath(pathArray);
         }else {
             return check;
         }
     }
}
// this methos is common both queen and bishop
//find the bishop path to move
function findBishopPath( currentPos , team, from ) {

    if (from !== "queen"){
        removeAllCross();
        removeAllPath();
    }

    var pathArray = [];
    var crossArray = [];

    var check = [];

    var content = $ ("div > div > div > div > div > div > div").attr("id");

    if ((content !== null ) && (content !== undefined)){
        if ((currentPos !== null) && (currentPos !== undefined)){

            var x = currentPos.substr(0,1);
            var y = currentPos.substr(1, 1);

            var xIndex = getXIndex(x);
            var yIndex = getYIndex(y);

            //look path or cross for right upper side
            var count = 1;

            for (var i = xIndex + 1; i < col.length; i++){
                if ($("#" + col[i] + row[yIndex + count]).children().length === 0){
                    pathArray.push($("#" + col[i] + row[yIndex + count]).attr("id"));
                }
                if ($("#" + col[i] + row[yIndex + count]).children().length > 0){
                    if (checkTeam($("#" + col[i] + row[yIndex + count]).children().attr("id")) !== team){
                        if(from !== "check"){
                            crossArray.push($("#" + col[i] + row[yIndex + count]).attr("id"));
                            break;
                        }else {
                            if ($("#" + col[i] + row[yIndex + count]).children().attr("id").includes("king")){
                                check.push($("#" + col[i] + row[yIndex + count]).attr("id"));
                                break;
                            }
                        }
                    }else {
                        break;
                    }
                }
                count++;
            }

            //look path or cross for left upper side
            count = 1;

            for (var i = xIndex - 1; i > -1; i--){

                if ($("#" + col[i] + row[yIndex + count]).children().length === 0){
                    pathArray.push($("#" + col[i] + row[yIndex + count]).attr("id"));
                }

                if ($("#" + col[i] + row[yIndex + count]).children().length > 0){
                    if (checkTeam($("#" + col[i] + row[yIndex + count]).children().attr("id")) !== team){
                        if(from !== "check"){
                            crossArray.push($("#" + col[i] + row[yIndex + count]).attr("id"));
                            break;
                        }else {
                            if ($("#" + col[i] + row[yIndex + count]).children().attr("id").includes("king")){
                                check.push($("#" + col[i] + row[yIndex + count]).attr("id"));
                                break;
                            }
                        }
                    }else {
                        break;
                    }
                }
                count++;
            }

            //look path or cross for right down side
            count =1 ;

            for (var i = xIndex + 1; i < row.length; i++){

                if ($("#" + col[i] + row[yIndex -count]).children().length > 0){

                    if (checkTeam($("#" + col[i] + row[yIndex -count]).children().attr("id")) !== team){

                        crossArray.push($("#" + col[i] + row[yIndex -count]).attr("id"));

                        if(from !== "check"){
                            crossArray.push($("#" + col[i] + row[yIndex -count]).attr("id"));
                            break;

                        }else {
                            if ($("#" + col[i] + row[yIndex -count]).children().attr("id").includes("king")){
                                check.push($("#" + col[i] + row[yIndex -count]).attr("id"));
                                break;
                            }
                        }
                    }else {
                        break;
                    }
                }else {
                    pathArray.push($("#" + col[i] + row[yIndex -count]).attr("id"));
                }count++;
            }

            //look path or cross for left down side
            count =1;

            for (var i = yIndex - 1; i > -1; i--){

                if ($("#" + col[i] + row[yIndex -count]).children().length > 0){

                    if (checkTeam($("#" + col[i] + row[yIndex -count]).children().attr("id")) !== team){

                        crossArray.push($("#" + col[i] + row[yIndex -count]).attr("id"));

                        if(from !== "check"){
                            crossArray.push($("#" + col[i] + row[yIndex -count]).attr("id"));
                            break;

                        }else {
                            if ($("#" + col[i] + row[yIndex -count]).children().attr("id").includes("king")){

                                check.push($("#" + col[i] + row[yIndex -count]).attr("id"));
                                break;
                            }
                        }
                    }else {
                        break;
                    }
                }else {
                    pathArray.push($("#" + col[i] + row[yIndex -count]).attr("id"));
                }
                count++;
            }
        }
    }
    if (from !== "check"){
         colorCrossPath(crossArray);
         colorPath(pathArray);
    }else {
        return check;
    }
}

// this method for finding queens path methis uses ruks and bishop method to find the path
function findQueenPath(currentPos, team, from) {
    findRukPath(chessObject.chessmanParentId, chessObject.team, from);
    findBishopPath(chessObject.chessmanParentId, chessObject.team, from);
}

// this method for finding kings path
function findKingPath( currentPos , team, from ) {
    removeAllCross();
    removeAllPath();
    var pathArray = [];
    var crossArray = [];
    var check = [];
    var content = $ ("div > div > div > div > div > div > div").attr("id");
    if ((content !== null ) && (content !== undefined)) {
        if ((currentPos !== null) && (currentPos !== undefined)) {
            var x = currentPos.substr(0, 1);
            var y = currentPos.substr(1, 1);
            var xIndex = getXIndex(x);
            var yIndex = getYIndex(y);

            for (var i = 0; i < div_ids.length; i++) {
                var tempX = div_ids[i].substr(0, 1);
                var tempY = div_ids[i].substr(1, 1);
                var newX = getXIndex(tempX);
                var newY = getYIndex(tempY);
                if ((Math.abs(newX - xIndex) <= 1) && (Math.abs(newY - yIndex) <= 1)) {
                    if ($("#" + div_ids[i]).children().length > 0) {
                        if (checkTeam($("#" + div_ids[i]).children().attr("id")) !== team) {
                            if (from !== "check") {
                                crossArray.push($("#" + div_ids[i]).attr("id"));
                            } else {
                                if ($("#" + div_ids[i]).children().attr("id").includes("king")) {
                                    check.push($("#" + div_ids[i]).attr("id"));
                                    break;
                                }
                            }
                        }
                    }
                    if ($("#" + div_ids[i]).children().length === 0) {
                        pathArray.push($("#" + div_ids[i]).attr("id"));
                    }
                }
            }

            if (from !== "check") {
                colorCrossPath(crossArray);
                colorPath(pathArray);
            } else {
                return check;
            }
        }
    }
}
// this method for finding knight path
function findKnightPath( currentPos , team, from ) {
    removeAllCross();
    removeAllPath();
    var pathArray = [];
    var crossArray = [];
    var check = [];
    var content = $ ("div > div > div > div > div > div > div").attr("id");
    if ((content !== null ) && (content !== undefined)) {
        if ((currentPos !== null) && (currentPos !== undefined)) {
            var x = currentPos.substr(0, 1);
            var y = currentPos.substr(1, 1);
            var xIndex = getXIndex(x);
            var yIndex = getYIndex(y);

            for (var i = 0; i < div_ids.length; i++) {
                var tempX = div_ids[i].substr(0, 1);
                var tempY = div_ids[i].substr(1, 1);
                var newX = getXIndex(tempX);
                var newY = getYIndex(tempY);
                if (((Math.abs(xIndex - newX) === 1) && ((Math.abs(yIndex - newY)) === 2)) | (((Math.abs(xIndex - newX)) === 2) && ((Math.abs(yIndex - newY)) === 1))) {
                    if ($("#" + div_ids[i]).children().length > 0) {
                        if (checkTeam($("#" + div_ids[i]).children().attr("id")) !== team) {
                            if (from !== "check") {
                                crossArray.push($("#" + div_ids[i]).attr("id"));
                            } else {
                                if ($("#" + div_ids[i]).children().attr("id").includes("king")) {
                                    check.push($("#" + div_ids[i]).attr("id"));
                                    break;
                                }
                            }
                        }
                    }
                    if ($("#" + div_ids[i]).children().length === 0) {
                        pathArray.push($("#" + div_ids[i]).attr("id"));
                    }
                }
            }
        }
        if (from !== "check") {
            colorCrossPath(crossArray);
            colorPath(pathArray);
         } else {
            return check;
        }
    }
}

function colorPath(path) {
    for (var i =0; i < path.length; i++){
        $("#" + path[i]).addClass("path");
    }
}
function colorCrossPath(cross) {
    for (var i =0; i < cross.length; i++){
        $("#" + cross[i]).addClass("cross");
    }
}
function getXIndex(x) {
    for (var i =0; i < col.length; i++){
        if (x === col[i]){
            return i;
        }
    }
}
function getYIndex(y) {
    for (var i =0; i < row.length; i++){
        if (y === row[i]){
            return i;
        }
    }
}
function removeAllPath() {
    for (var i =0; i < div_ids.length; i++){
        $("#" + div_ids[i]).removeClass("path");
    }
}
function removeAllCross() {
    for (var i =0; i < div_ids.length; i++){
        $("#" + div_ids[i]).removeClass("cross");
    }
}

// if any cross path selected get all cross paths
function checkAnyCrossing() {
    var count = 0;
    var crossArray = new Array();
    for (var i =0; i < div_ids.length; i++){
        if ($("#" + div_ids[i]).hasClass("cross")){
            crossArray.push(div_ids[i]);
            count++;
        }
    }
    return crossArray;
}

// if any cross path selected get all selected paths
function checkAnyPath() {
    var count = 0;
    var pathArray = new Array();
    for (var i =0; i < div_ids.length; i++){
        if ($("#" + div_ids[i]).hasClass("cross")){
            pathArray.push(div_ids[i]);
            count++;
        }
    }
    return pathArray;
}

// find the whoos turn it is
function findTurn() {
    if (turn === "w"){
        turn = "b";
    }else {
        turn = "w";
    }
}

// rotate the chess bord
function turnChessBoard() {
    $('#board').toggleClass('rotate');
    rotateChessman();
}

// rotate chessman
function rotateChessman() {
    for (var i =0; i < chessmans_ids.length; i++){
        $("#" + chessmans_ids[i]).toggleClass('rotate');
    }
}
function checkMate() {

}

