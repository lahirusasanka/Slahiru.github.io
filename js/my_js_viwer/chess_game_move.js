
var stringArray =["A", "B", "C", "D", "E", "F", "G", "H"];
var numberArray =[1, 2, 3, 4, 5, 6, 7, 8];
var tiles;
var pieces;
var currentPiece;
var currPiece;

var whiteDraggable;
var blackDraggable;

$(window).on('load',function (eventData) {
    $("#div-loader").css("display","none");
});

$(document).ready(function () {
    tiles = $(".square");
    pieces =$(".chessPiece");
    whiteDraggable =  true;
    blackDraggable = false;
});

$('.chessPiece').click(function( eventData){
    currentPiece = $(this);
    if (!(currentPiece.hasClass('pieceInDanger')) && currentPiece.hasClass('white') && currentPiece.hasClass('pawn')) {
        pathOfWhitePawn(currentPiece);
    }
    if (!(currentPiece.hasClass('pieceInDanger')) && currentPiece.hasClass('black') && currentPiece.hasClass('pawn')) {
        pathOfBlackPawn(currentPiece);
    }
    if (!(currentPiece.hasClass('pieceInDanger')) && currentPiece.hasClass('rock')) {
        pathOfRock(currentPiece);
    }
    if (!(currentPiece.hasClass('pieceInDanger')) && currentPiece.hasClass('knight')) {
        pathOfKnight(currentPiece);
    }
    if (!(currentPiece.hasClass('pieceInDanger')) && currentPiece.hasClass('bishop')) {
        pathOfBishop(currentPiece);
    }
    if (!(currentPiece.hasClass('pieceInDanger')) && currentPiece.hasClass('queen')) {
        pathOfQueen(currentPiece);
    }
    if (!(currentPiece.hasClass('pieceInDanger')) && currentPiece.hasClass('king')) {
        pathOfKing(currentPiece);
    }

    if (currentPiece.hasClass('pieceInDanger')) {
        var cSquare = currentPiece.parent();
        currPiece = $(".chessPiece.pieceHover");
        cSquare.html(currPiece);
        cSquare.append(currPiece);

        tiles.removeClass('selectPath');
        pieces.removeClass('pieceHover');
        pieces.removeClass('pieceInDanger');
        tiles.removeClass('pieceInDanger');
    }
});
$('.chessPiece').click(function () {

});
$(".square").click(function () {
    var currSquare = $(this);
    currPiece = $(".chessPiece.pieceHover");
    if ($(currSquare).hasClass('selectPath')){
        var currPieceId = currPiece.attr('id');
        currSquare.append(currPiece);
        currSquare.removeClass('selectPath');
        tiles.removeClass('selectPath');
        pieces.removeClass('pieceHover');
        tiles.removeClass('pieceInDanger');
        pieces.removeClass('pieceInDanger');
    }
});

function startGame() {
    if (whiteDraggable === true && blackDraggable === false){

    }
}

function pathOfWhitePawn(eventData) {
    currPiece = eventData;
    tiles.removeClass("selectPath");
    pieces.removeClass("pieceHover");
    var currID = currentPiece.parent().attr('id');
    var letter = currID.charAt(0);
    var idNo = currID.charAt(1);
    var stringArrayPosition =($.inArray(letter, stringArray));
    var numberArrayPosition = ($.inArray(parseInt(idNo),numberArray));

    var tempId = stringArray[stringArrayPosition] + numberArray[numberArrayPosition +1];
    if (!($('#' + tempId + '> div').hasClass('chessPiece'))) {
        $('*[id="' + tempId +'"]').addClass('selectPath');
        currentPiece.addClass('pieceHover');
        currentPiece.removeClass('selectPath');
    }
    var tempId1 = stringArray[stringArrayPosition + 1] + numberArray[numberArrayPosition + 1];
    if (($('#' + tempId1 + '> div').hasClass('black')) && ($('#'+ tempId1 + '> div').hasClass('chessPiece'))){
        $('#' + tempId1 + '> div').addClass('pieceInDanger');
        $('*[id= "' + tempId1 + '"]').addClass('pieceInDanger');
    }
    var tempId2 = stringArray[stringArrayPosition - 1] + numberArray[numberArrayPosition + 1];
    if (($('#' + tempId2 + '> div').hasClass('black')) && ($('#' + tempId2 + '> div').hasClass('chessPiece'))){
        $('#' + tempId2 + '> div').addClass('pieceInDanger');
        $('*[id= "' + tempId2 +'"]').addClass('pieceInDanger');
    }
}

function pathOfBlackPawn(eventData) {
    currentPiece = eventData;
    tiles.removeClass("selectPath");
    pieces.removeClass("pieceHover");
    var currID = currentPiece.parent().attr('id');
    var letter = currID.charAt(0);
    var idNo = currID.charAt(1);
    var stringArrayPosition = ($.inArray(letter, stringArray));
    var numberArrayPosition = ($.inArray(parseInt(idNo), numberArray));

    var tempId = stringArray[stringArrayPosition] + numberArray[numberArrayPosition - 1];
    if (!($('#' + tempId + '> div').hasClass('chessPiece'))){
        $('*[id="' + tempId +'"]').addClass('selectPath');
        currentPiece.addClass('pieceHover');
        currentPiece.removeClass('selectPath');
        console.log(currID);
    }
    var tempId1 = stringArray[stringArrayPosition + 1] + numberArray[numberArrayPosition - 1];
    if (($('#' + tempId1 + '> div').hasClass('white')) && ($('#' + tempId1 + '> div').hasClass('chessPiece'))){
        $('#' + tempId1 + '> div').addClass('pieceInDanger');
        $('*[id= "' + tempId1 +'"]').addClass('pieceInDanger');
    }
    var tempId2 = stringArray[stringArrayPosition - 1] + numberArray[numberArrayPosition - 1];
    if (($('#' + tempId2 + '> div').hasClass('white')) && ($('#' + tempId2 + '> div').hasClass('chessPiece'))){
        $('#' + tempId2 + '> div').addClass('pieceInDanger');
        $('*[id= "' + tempId2 +'"]').addClass('pieceInDanger');
    }
}

function pathOfRock(eventData) {
    currentPiece = eventData;
    tiles.removeClass("selectPath");
    pieces.removeClass("pieceHover");
    var currID = currentPiece.parent().attr('id');
    var letter = currID.charAt(0);
    var idNo = currID.charAt(1);
    var stringArrayPosition = ($.inArray(letter, stringArray));
    var numberArrayPosition = ($.inArray(parseInt(idNo), numberArray));

    var i = stringArrayPosition + 1;
    var j = numberArrayPosition;
    var tempId;
    for (; i < 8; i++){
        var tempId = stringArray[i] + numberArray[j];
        if (!($('#' + tempId + '> div') .hasClass('chessPiece'))){
            $('*[id="' + tempId +'"]').addClass('selectPath');
            currentPiece.removeClass('selectPath');
            currentPiece.addClass('pieceHover');
        } else {
            break;
        }
    }

    if (($('#'+ tempId + '> div').hasClass('chessPiece')) && (currentPiece.hasClass('white')) && ($('#' + tempId + '>div').hasClass('black'))){
        $('#' + tempId + '> div').addClass('pieceInDanger');
        $('*[id= "' + tempId +'"]').addClass('pieceInDanger');
    }
    if (($('#'+ tempId + '> div').hasClass('chessPiece')) && (currentPiece.hasClass('black')) && ($('#' + tempId + '>div').hasClass('white'))){
        $('#' + tempId + '> div').addClass('pieceInDanger');
        $('*[id= "' + tempId +'"]').addClass('pieceInDanger');
    }

    var i = stringArrayPosition - 1;
    var j = numberArrayPosition;
    for (; i >= 0; i--){
        var tempId = stringArray[i] + numberArray[j];
        if (!($('#' + tempId + '> div') .hasClass('chessPiece'))){
            $('*[id="' + tempId +'"]').addClass('selectPath');
            currentPiece.removeClass('selectPath');
            currentPiece.addClass('pieceHover');
        } else {
            break;
        }
    }
    if (($('#'+ tempId + '> div').hasClass('chessPiece')) && (currentPiece.hasClass('white')) && ($('#' + tempId + '>div').hasClass('black'))){
        $('#' + tempId + '> div').addClass('pieceInDanger');
        $('*[id= "' + tempId +'"]').addClass('pieceInDanger');
    }
    if (($('#'+ tempId + '> div').hasClass('chessPiece')) && (currentPiece.hasClass('black')) && ($('#' + tempId + '>div').hasClass('white'))){
        $('#' + tempId + '> div').addClass('pieceInDanger');
        $('*[id= "' + tempId +'"]').addClass('pieceInDanger');
    }

    var i = stringArrayPosition;
    var j = numberArrayPosition + 1;
    for (; i < 8; j++){
        var tempId = stringArray[i] + numberArray[j];
        if (!($('#' + tempId + '> div') .hasClass('chessPiece'))){
            $('*[id="' + tempId +'"]').addClass('selectPath');
            currentPiece.removeClass('selectPath');
            currentPiece.addClass('pieceHover');
        } else {
            break;
        }
    }
    if (($('#'+ tempId + '> div').hasClass('chessPiece')) && (currentPiece.hasClass('white')) && ($('#' + tempId + '> div').hasClass('black'))){
        $('#' + tempId + '> div').addClass('pieceInDanger');
        $('*[id= "' + tempId +'"]').addClass('pieceInDanger');
    }
    if (($('#'+ tempId + '> div').hasClass('chessPiece')) && (currentPiece.hasClass('black')) && ($('#' + tempId + '> div').hasClass('white'))){
        $('#' + tempId + '> div').addClass('pieceInDanger');
        $('*[id= "' + tempId +'"]').addClass('pieceInDanger');
    }

    var i = stringArrayPosition;
    var j = numberArrayPosition - 1;
    for (; j >= 0; j--){
        var tempId = stringArray[i] + numberArray[j];
        if (!($('#' + tempId + '> div') .hasClass('chessPiece'))){
            $('*[id="' + tempId +'"]').addClass('selectPath');
            currentPiece.removeClass('selectPath');
            currentPiece.addClass('pieceHover');
        } else {
            break;
        }
    }
    if (($('#'+ tempId + '> div').hasClass('chessPiece')) && (currentPiece.hasClass('white')) && ($('#' + tempId + '>div').hasClass('black'))){
        $('#' + tempId + '> div').addClass('pieceInDanger');
        $('*[id= "' + tempId +'"]').addClass('pieceInDanger');
    }
    if (($('#'+ tempId + '> div').hasClass('chessPiece')) && (currentPiece.hasClass('black')) && ($('#' + tempId + '>div').hasClass('white'))){
        $('#' + tempId + '> div').addClass('pieceInDanger');
        $('*[id= "' + tempId +'"]').addClass('pieceInDanger');
    }
    console.log(currID);
}

function pathOfKnight(eventData) {
    currentPiece = eventData;
    tiles.removeClass("selectPath");
    pieces.removeClass("pieceHover");
    var currID = currentPiece.parent().attr('id');
    var letter = currID.charAt(0);
    var idNo = currID.charAt(1);
    var stringArrayPosition = ($.inArray(letter, stringArray));
    var numberArrayPosition = ($.inArray(parseInt(idNo), numberArray));

    var tempId1 = stringArray[stringArrayPosition + 1] + numberArray[numberArrayPosition + 2];
    knightMarkDanger(tempId1);
    var tempId1 = stringArray[stringArrayPosition - 1] + numberArray[numberArrayPosition + 2];
    knightMarkDanger(tempId1);
    var tempId1 = stringArray[stringArrayPosition + 2] + numberArray[numberArrayPosition + 1];
    knightMarkDanger(tempId1);
    var tempId1 = stringArray[stringArrayPosition - 2] + numberArray[numberArrayPosition + 1];
    knightMarkDanger(tempId1);

    var tempId1 = stringArray[stringArrayPosition + 2] + numberArray[numberArrayPosition - 1];
    knightMarkDanger(tempId1);
    var tempId1 = stringArray[stringArrayPosition + 1] + numberArray[numberArrayPosition - 2];
    knightMarkDanger(tempId1);
    var tempId1 = stringArray[stringArrayPosition - 1] + numberArray[numberArrayPosition - 2];
    knightMarkDanger(tempId1);
    var tempId1 = stringArray[stringArrayPosition - 2] + numberArray[numberArrayPosition - 1];
    knightMarkDanger(tempId1);

    currentPiece.removeClass('selectPath');
    currentPiece.addClass('piecesHover');
}

function pathOfBishop(eventData) {
    currentPiece = eventData;
    tiles.removeClass("selectPath");
    pieces.removeClass("pieceHover");
    var currID = currentPiece.parent().attr('id');
    var letter = currID.charAt(0);
    var idNo = currID.charAt(1);
    var stringArrayPosition = ($.inArray(letter, stringArray));
    var numberArrayPosition = ($.inArray(parseInt(idNo), numberArray));

    var i = stringArrayPosition + 1;
    var j = numberArrayPosition;
    var tempId;
    L1:for (; i < 8; i++) {
        j++;
        var tempId = stringArray[i] + numberArray[j];
        if (!($('#' + tempId + '> div').hasClass('chessPiece'))) {
            L2:for (; j < 8; j++) {
                $('*[id="' + tempId + '"]').addClass('selectPath');
                currentPiece.removeClass('selectPath');
                currentPiece.addClass('pieceHover');
                break;
            }
        } else {
            break;
        }
    }

    if (($('#' + tempId + '> div').hasClass('chessPiece')) && (currentPiece.hasClass('white')) && ($('#' + tempId + '> div').hasClass('black'))) {
        $('#' + tempId + '> div').addClass('pieceInDanger');
        $('*[id= "' + tempId + '"]').addClass('pieceInDanger');
    }
    if (($('#' + tempId + '> div').hasClass('chessPiece')) && (currentPiece.hasClass('black')) && ($('#' + tempId + '> div').hasClass('white'))) {
        $('#' + tempId + '> div').addClass('pieceInDanger');
        $('*[id= "' + tempId + '"]').addClass('pieceInDanger');
    }

    i = stringArrayPosition - 1;
    j = numberArrayPosition;
    L3:for (; i >= 0; i--) {
        j++;
        var tempId = stringArray[i] + numberArray[j];
        if (!($('#' + tempId + '> div').hasClass('chessPiece'))) {
            L4:for (; j >= 0; j++) {
                $('*[id="' + tempId + '"]').addClass('selectPath');
                currentPiece.removeClass('selectPath');
                currentPiece.addClass('pieceHover');
                break;
            }
        } else {
            break;
        }
    }
    if (($('#' + tempId + '> div').hasClass('chessPiece')) && (currentPiece.hasClass('white')) && ($('#' + tempId + '>div').hasClass('black'))) {
        $('#' + tempId + '> div').addClass('pieceInDanger');
        $('*[id= "' + tempId + '"]').addClass('pieceInDanger');
    }
    if (($('#' + tempId + '> div').hasClass('chessPiece')) && (currentPiece.hasClass('black')) && ($('#' + tempId + '>div').hasClass('white'))) {
        $('#' + tempId + '> div').addClass('pieceInDanger');
        $('*[id= "' + tempId + '"]').addClass('pieceInDanger');
    }

    i = stringArrayPosition + 1;
    j = numberArrayPosition;
    L5:for (; i < 8; i++) {
        j--;
        var tempId = stringArray[i] + numberArray[j];
        if (!($('#' + tempId + '> div').hasClass('chessPiece'))) {
            L6:for (; j >= 0; j--) {
                $('*[id="' + tempId + '"]').addClass('selectPath');
                currentPiece.removeClass('selectPath');
                currentPiece.addClass('pieceHover');
                break;
            }
        } else {
            break;
        }
    }
    if (($('#' + tempId + '> div').hasClass('chessPiece')) && (currentPiece.hasClass('white')) && ($('#' + tempId + '>div').hasClass('black'))) {
        $('#' + tempId + '> div').addClass('pieceInDanger');
        $('*[id= "' + tempId + '"]').addClass('pieceInDanger');
    }
    if (($('#' + tempId + '> div').hasClass('chessPiece')) && (currentPiece.hasClass('black')) && ($('#' + tempId + '>div').hasClass('white'))) {
        $('#' + tempId + '> div').addClass('pieceInDanger');
        $('*[id= "' + tempId + '"]').addClass('pieceInDanger');
    }


    i = stringArrayPosition - 1;
    j = numberArrayPosition;
    L7:for (; i >= 0; i--) {
        j--;
        var tempId = stringArray[i] + numberArray[j];
        if (!($('#' + tempId + '> div').hasClass('chessPiece'))) {
            L8:for (; j >= 0; j--) {
                $('*[id="' + tempId + '"]').addClass('selectPath');
                currentPiece.removeClass('selectPath');
                currentPiece.addClass('pieceHover');
                break;
            }
        } else {
            break;
        }
    }
    if (($('#' + tempId + '> div').hasClass('chessPiece')) && (currentPiece.hasClass('white')) && ($('#' + tempId + '>div').hasClass('black'))) {
        $('#' + tempId + '> div').addClass('pieceInDanger');
        $('*[id= "' + tempId + '"]').addClass('pieceInDanger');
    }
    if (($('#' + tempId + '> div').hasClass('chessPiece')) && (currentPiece.hasClass('black')) && ($('#' + tempId + '>div').hasClass('white'))) {
        $('#' + tempId + '> div').addClass('pieceInDanger');
        $('*[id= "' + tempId + '"]').addClass('pieceInDanger');
    }
}

function pathOfQueen(eventData) {
    currentPiece = eventData;
    tiles.removeClass("selectPath");
    pieces.removeClass("pieceHover");
    var currID = currentPiece.parent().attr('id');
    var letter = currID.charAt(0);
    var idNo = currID.charAt(1);
    var stringArrayPosition = ($.inArray(letter, stringArray));
    var numberArrayPosition = ($.inArray(parseInt(idNo), numberArray));

    var i = stringArrayPosition + 1;
    var j = numberArrayPosition;
    var tempId;
    for (; i < 8; i++) {
        var tempId = stringArray[i] + numberArray[j];
        if (!($('#' + tempId + '> div').hasClass('chessPiece'))) {
            $('*[id="' + tempId + '"]').addClass('selectPath');
            currentPiece.removeClass('selectPath');
            currentPiece.addClass('pieceHover');
        } else {
            break;
        }
    }
    if (($('#' + tempId + '> div').hasClass('chessPiece')) && (currentPiece.hasClass('white')) && ($('#' + tempId + '>div').hasClass('black'))) {
        $('#' + tempId + '> div').addClass('pieceInDanger');
        $('*[id= "' + tempId + '"]').addClass('pieceInDanger');
    }
    if (($('#' + tempId + '> div').hasClass('chessPiece')) && (currentPiece.hasClass('black')) && ($('#' + tempId + '>div').hasClass('white'))) {
        $('#' + tempId + '> div').addClass('pieceInDanger');
        $('*[id= "' + tempId + '"]').addClass('pieceInDanger');
    }

    var i = stringArrayPosition - 1;
    var j = numberArrayPosition;
    for (; i >= 0; i--) {
        var tempId = stringArray[i] + numberArray[j];
        if (!($('#' + tempId + '> div').hasClass('chessPiece'))) {
            $('*[id="' + tempId + '"]').addClass('selectPath');
            currentPiece.removeClass('selectPath');
            currentPiece.addClass('pieceHover');
        } else {
            break;
        }
    }

    if (($('#' + tempId + '> div').hasClass('chessPiece')) && (currentPiece.hasClass('white')) && ($('#' + tempId + '>div').hasClass('black'))) {
        $('#' + tempId + '> div').addClass('pieceInDanger');
        $('*[id= "' + tempId + '"]').addClass('pieceInDanger');
    }
    if (($('#' + tempId + '> div').hasClass('chessPiece')) && (currentPiece.hasClass('black')) && ($('#' + tempId + '>div').hasClass('white'))) {
        $('#' + tempId + '> div').addClass('pieceInDanger');
        $('*[id= "' + tempId + '"]').addClass('pieceInDanger');
    }

    var i = stringArrayPosition;
    var j = numberArrayPosition + 1;
    for (; i < 8; j++) {
        var tempId = stringArray[i] + numberArray[j];
        if (!($('#' + tempId + '> div').hasClass('chessPiece'))) {
            $('*[id="' + tempId + '"]').addClass('selectPath');
            currentPiece.removeClass('selectPath');
            currentPiece.addClass('pieceHover');
        } else {
            break;
        }
    }

    if (($('#' + tempId + '> div').hasClass('chessPiece')) && (currentPiece.hasClass('white')) && ($('#' + tempId + '>div').hasClass('black'))) {
        $('#' + tempId + '> div').addClass('pieceInDanger');
        $('*[id= "' + tempId + '"]').addClass('pieceInDanger');
    }
    if (($('#' + tempId + '> div').hasClass('chessPiece')) && (currentPiece.hasClass('black')) && ($('#' + tempId + '>div').hasClass('white'))) {
        $('#' + tempId + '> div').addClass('pieceInDanger');
        $('*[id= "' + tempId + '"]').addClass('pieceInDanger');
    }


    var i = stringArrayPosition;
    var j = numberArrayPosition - 1;
    for (; j >= 0; j--) {
        var tempId = stringArray[i] + numberArray[j];
        if (!($('#' + tempId + '> div').hasClass('chessPiece'))) {
            $('*[id="' + tempId + '"]').addClass('selectPath');
            currentPiece.removeClass('selectPath');
            currentPiece.addClass('pieceHover');
        } else {
            break;
        }
    }
    if (($('#' + tempId + '> div').hasClass('chessPiece')) && (currentPiece.hasClass('white')) && ($('#' + tempId + '>div').hasClass('black'))) {
        $('#' + tempId + '> div').addClass('pieceInDanger');
        $('*[id= "' + tempId + '"]').addClass('pieceInDanger');
    }
    if (($('#' + tempId + '> div').hasClass('chessPiece')) && (currentPiece.hasClass('black')) && ($('#' + tempId + '>div').hasClass('white'))) {
        $('#' + tempId + '> div').addClass('pieceInDanger');
        $('*[id= "' + tempId + '"]').addClass('pieceInDanger');
    }

    var i = stringArrayPosition + 1;
    var j = numberArrayPosition;
    var tempId;
    L1:for (; i < 8; i++) {
        j++;
        var tempId = stringArray[i] + numberArray[j];
        if (!($('#' + tempId + '> div').hasClass('chessPiece'))) {
            L2:for (; j < 8; j++) {
                $('*[id="' + tempId + '"]').addClass('selectPath');
                currentPiece.removeClass('selectPath');
                currentPiece.addClass('pieceHover');
                break;
            }
        } else {
            break;
        }
    }
    if (($('#' + tempId + '> div').hasClass('chessPiece')) && (currentPiece.hasClass('white')) && ($('#' + tempId + '>div').hasClass('black'))) {
        $('#' + tempId + '> div').addClass('pieceInDanger');
        $('*[id= "' + tempId + '"]').addClass('pieceInDanger');
    }
    if (($('#' + tempId + '> div').hasClass('chessPiece')) && (currentPiece.hasClass('black')) && ($('#' + tempId + '>div').hasClass('white'))) {
        $('#' + tempId + '> div').addClass('pieceInDanger');
        $('*[id= "' + tempId + '"]').addClass('pieceInDanger');
    }

    var i = stringArrayPosition - 1;
    var j = numberArrayPosition;
    L3:for (; i >= 0; i--) {
        j++;
        var tempId = stringArray[i] + numberArray[j];
        if (!($('#' + tempId + '> div').hasClass('chessPiece'))) {
            L4:for (; j >= 0; j++) {
                $('*[id="' + tempId + '"]').addClass('selectPath');
                currentPiece.removeClass('selectPath');
                currentPiece.addClass('pieceHover');
                break;
            }
        } else {
            break;
        }
    }

    if (($('#' + tempId + '> div').hasClass('chessPiece')) && (currentPiece.hasClass('white')) && ($('#' + tempId + '>div').hasClass('black'))) {
        $('#' + tempId + '> div').addClass('pieceInDanger');
        $('*[id= "' + tempId + '"]').addClass('pieceInDanger');
    }
    if (($('#' + tempId + '> div').hasClass('chessPiece')) && (currentPiece.hasClass('black')) && ($('#' + tempId + '>div').hasClass('white'))) {
        $('#' + tempId + '> div').addClass('pieceInDanger');
        $('*[id= "' + tempId + '"]').addClass('pieceInDanger');
    }

    i = stringArrayPosition + 1;
    j = numberArrayPosition;
    L5:for (; i < 8; i++) {
        j--;
        var tempId = stringArray[i] + numberArray[j];
        if (!($('#' + tempId + '> div').hasClass('chessPiece'))) {
            L6:for (; j >= 0; j--) {
                $('*[id="' + tempId + '"]').addClass('selectPath');
                currentPiece.removeClass('selectPath');
                currentPiece.addClass('pieceHover');
                break;
            }
        } else {
            break;
        }
    }
    if (($('#' + tempId + '> div').hasClass('chessPiece')) && (currentPiece.hasClass('white')) && ($('#' + tempId + '>div').hasClass('black'))) {
        $('#' + tempId + '> div').addClass('pieceInDanger');
        $('*[id= "' + tempId + '"]').addClass('pieceInDanger');
    }
    if (($('#' + tempId + '> div').hasClass('chessPiece')) && (currentPiece.hasClass('black')) && ($('#' + tempId + '>div').hasClass('white'))) {
        $('#' + tempId + '> div').addClass('pieceInDanger');
        $('*[id= "' + tempId + '"]').addClass('pieceInDanger');
    }

    i = stringArrayPosition - 1;
    j = numberArrayPosition;
    L7:for (; i >= 0; i--) {
        j--;
        var tempId = stringArray[i] + numberArray[j];
        if (!($('#' + tempId + '> div').hasClass('chessPiece'))) {
            L8:for (; j >= 0; j--) {
                $('*[id="' + tempId + '"]').addClass('selectPath');
                currentPiece.removeClass('selectPath');
                currentPiece.addClass('pieceHover');
                break;
            }
        } else {
            break;
        }
    }
    if (($('#' + tempId + '> div').hasClass('chessPiece')) && (currentPiece.hasClass('white')) && ($('#' + tempId + '>div').hasClass('black'))) {
        $('#' + tempId + '> div').addClass('pieceInDanger');
        $('*[id= "' + tempId + '"]').addClass('pieceInDanger');
    }
    if (($('#' + tempId + '> div').hasClass('chessPiece')) && (currentPiece.hasClass('black')) && ($('#' + tempId + '>div').hasClass('white'))) {
        $('#' + tempId + '> div').addClass('pieceInDanger');
        $('*[id= "' + tempId + '"]').addClass('pieceInDanger');
    }
}

function  pathOfKing(eventData) {
    currentPiece = eventData;
    tiles.removeClass("selectPath");
    pieces.removeClass("pieceHover");
    var currID = currentPiece.parent().attr('id');
    var letter = currID.charAt(0);
    var idNo = currID.charAt(1);
    var stringArrayPosition = ($.inArray(letter, stringArray));
    var numberArrayPosition = ($.inArray(parseInt(idNo), numberArray));

    var tempId1 = stringArray[stringArrayPosition] + numberArray[numberArrayPosition + 1];
    kingMarkDanger(tempId1);
    var tempId1 = stringArray[stringArrayPosition + 1] + numberArray[numberArrayPosition + 1];
    kingMarkDanger(tempId1);
    var tempId1 = stringArray[stringArrayPosition + 1] + numberArray[numberArrayPosition];
    kingMarkDanger(tempId1);
    var tempId1 = stringArray[stringArrayPosition + 1] + numberArray[numberArrayPosition - 1];
    kingMarkDanger(tempId1);

    var tempId1 = stringArray[stringArrayPosition] + numberArray[numberArrayPosition - 1];
    kingMarkDanger(tempId1);
    var tempId1 = stringArray[stringArrayPosition - 1] + numberArray[numberArrayPosition - 1];
    kingMarkDanger(tempId1);
    var tempId1 = stringArray[stringArrayPosition - 1] + numberArray[numberArrayPosition];
    kingMarkDanger(tempId1);
    var tempId1 = stringArray[stringArrayPosition - 1] + numberArray[numberArrayPosition + 1];
    kingMarkDanger(tempId1);

    currentPiece.removeClass('selectPath');
    currentPiece.addClass('piecesHover');
}

$('.chessPiece').click(movePieces);
function movePieces(eventData) {

}

function knightMarkDanger(eventData) {
    tempId1 = eventData;
    if (($('#'+ tempId1 + '> div').hasClass('chessPiece'))){
        $('*[id= "' + tempId1 +'"]').addClass('selectPath');
    }
    if ((currentPiece.hasClass('white')) && ($('#' + tempId1 + '>div').hasClass('black'))){
        $('#' + tempId1 + '> div').addClass('pieceInDanger');
        $('*[id= "' + tempId1 +'"]').addClass('pieceInDanger');
    }
    if ((currentPiece.hasClass('black')) && ($('#' + tempId1 + '>div').hasClass('white'))){
        $('#' + tempId1 + '> div').addClass('pieceInDanger');
        $('*[id= "' + tempId1 +'"]').addClass('pieceInDanger');
    }
}
function kingMarkDanger(eventData) {
    tempId1 = eventData;
    if (($('#'+ tempId1 + '> div').hasClass('chessPiece'))){
        $('*[id= "' + tempId1 +'"]').addClass('selectPath');
    }
    if ((currentPiece.hasClass('white')) && ($('#' + tempId1 + '>div').hasClass('black'))){
        $('#' + tempId1 + '> div').addClass('pieceInDanger');
        $('*[id= "' + tempId1 +'"]').addClass('pieceInDanger');
    }
    if ((currentPiece.hasClass('black')) && ($('#' + tempId1 + '>div').hasClass('white'))){
        $('#' + tempId1 + '> div').addClass('pieceInDanger');
        $('*[id= "' + tempId1 +'"]').addClass('pieceInDanger');
    }
}





















