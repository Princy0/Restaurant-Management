$(document).ready(function(){
    init();
    initDB();
});

function showHide(ratingsCheck){
    var divAddRatings = document.getElementById("divAddRatings");
    divAddRatings.style.display = ratingsCheck.checked ? "block" :"none";
}

function modifyHideShow(mRatingsChk){
    var modifyRating = document.getElementById("modifyRating");
    modifyRating.style.display = mRatingsChk.checked? "block":"none";
}

function init(){
    $("#btnSave").on("click", btnSave_click);
    $("#ratingsCheck").click(function (event){
        var chk1=$("#ratingsCheck");
        if(chk1.is(":checked")){
            $("#divAddRatings").show();
            $("#btnSave").on("click",btnSave_click);
        }
        else {
            $("#divAddRatings").hide();
        }
    });
    $("#mRatingsChk").click(function (event){
        var chk2=$("#mRatingsChk");
        if(chk2.is(":checked")){
            $("#modifyRating").show();
        }
        else {
            $("#modifyRating").hide();
        }
    });
    $("#btnUpdate").on("click", btnUpdate_click);

    $("#rQuan").on("input", putInput);
    $("#rSer").on("input", putInput);
    $("#rVal").on("input", putInput);

    $("#mQuan").on("input", inputPut);
    $("#mSer").on("input", inputPut);
    $("#mVal").on("input", inputPut);

    $("#ppSettingsPage").on("pageshow",reviewLoaded);
    $("#btnSave2").on("click",btnSave2_click);
    $("#ppViewReviewPage").on("pageshow",ppViewReviewPage_show);
    $("#ppModifyReviewPage").on("pageshow",ppModifyReviewPage_show);
    $("#btnDelete").on("click",btnDelete_click);


    $("#btnCancel").on("click",btnCancel_click);
    $("#btnClearDatabase").on("click",btnClearDatabase_click);
    loadDefaults();
}

function btnSave_click(){
    saveData();
}

function btnUpdate_click(){
    updateData();
}

function putInput(){
    changeRating();
}

function inputPut(){
    ratingChange();
}

function reviewLoaded(){
    loadDefaults();
}
function btnSave2_click(){
    saveDefaults();
}

function btnDelete_click(){
    deleteReview();
}

function btnCancel_click(){
    cancelModification();
}
function btnClearDatabase_click(){
    clearDatabase();
}

function ppViewReviewPage_show(){
    getReviews();
}

function ppModifyReviewPage_show(){
    showReviewDetails();
}

function initDB(){
    try{
        DB.createDatabase();
        if(db){
            console.info("Creating Tables....");
            DB.createTables();
        }
        else{
            console.error("Error: cannot create tables: Database does not exists");
        }
    }catch (e) {
        console.error("Error (Fatal): Error in initDB. Can not proceed");
    }
}