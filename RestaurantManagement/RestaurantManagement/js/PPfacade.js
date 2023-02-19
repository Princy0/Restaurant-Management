function saveData(){
    if(doValidate_frmAdd()){
        console.info("Form is valid");
        var restaurantName=$("#rName").val();
        var restaurantId= $("#bId").val();
        var stateId=$("#selProvince").val();
        var reviewerEmail= $("#rEmail").val();
        var reviewerComments=$("#rCmt").val();
        var hasRating= $("#ratingsCheck").prop("checked");
        var rating1=$("#rQuan").val();
        var rating2=$("#rSer").val();
        var rating3=$("#rVal").val();

        var objReview= new Event(restaurantName,restaurantId,stateId,reviewerEmail,reviewerComments,hasRating,rating1,rating2,rating3);

        Reviews.insert(objReview);
    }
    else
    {
        console.info("form is not valid")
    }
}

function updateData(){
    if(doValidate_frmEdit()){
        console.info("Form modified");
        var id= localStorage.getItem("id");
        var restaurantName= $("#rEditName").val();
        var restaurantId=$("#bEditId").val();
        var stateId=$("#Province").val();
        var reviewerEmail = $("#rEditEmail").val();
        var reviewerComments = $("#rEditCmt").val();
        var hasRating=''

        if($("#mRatingsChk").is(':checked'))
        {
            hasRating='true'
            var rating1=$("#mQuan").val();
            var rating2=$("#mSer").val();
            var rating3=$("#mVal").val();
        }
        else{
            hasRating='false'
        }
        var objReview= new Event(restaurantName,restaurantId,stateId,reviewerEmail
            ,reviewerComments,hasRating,rating1,rating2,rating3);
        Reviews.update(objReview,id);
    }
    else
    {
        console.info("Form can't modified")
    }
}

function changeRating(){
    var q = parseInt($("#rQuan").val());
    var s = parseInt($("#rSer").val());
    var v = parseInt($("#rVal").val());
    var total = (q + s + v) * 100 / 15 ;
    $("#Orat").val(total).slider("refresh");
}

function ratingChange(){
    var q = parseInt($("#mQuan").val());
    var s = parseInt($("#mSer").val());
    var v = parseInt($("#mVal").val());
    var total = (q + s + v) * 100 / 15 ;
    $("#Mrat").val(total).slider("refresh");
}

function getReviews() {
    var options = [];
// if(Reviews.selectAll(options, callback))
    Reviews.selectAll(options, callback);

// {
    function callback(tx, results) {
        console.info("Records selected successfully");
        var htmlCode = "";

        for (var i = 0; i < results.rows.length; i++) {
            var row = results.rows[i];
            var id = row['id'];
            var restaurantName = row['restaurantName'];
            var reviewerEmail = row['reviewerEmail'];
            var reviewerComments = row['reviewerComments'];
            var OverallRating = parseInt(((row['rating1'] + row['rating2'] + row['rating3']) * 100) / 15);

            console.info(`id:${id} restaurantName: ${restaurantName} reviewerEmail: ${reviewerEmail} reviewerComments: ${reviewerComments} OverallRating ${OverallRating}`);
            htmlCode += `
            <li>
               <a data-role="button" data-row-id=${row['id']} href="#">
                <h2>ID: ${id}</h2>
                <h1>Restaurant Name: ${restaurantName}</h1>
                <h2>Reviewer Email: ${reviewerEmail}</h2>
                <h2>Reviwer Comments: ${reviewerComments}</h2>
                <h2>Overall Rating: ${OverallRating}</h2>
                </a>
            </li>
            `;
        }

        var lv = $("#lvAll");
        lv = lv.html(htmlCode);
        lv.listview("refresh");

        function clickHandler() {
            localStorage.setItem("id", $(this).attr("data-row-id"));
            $(location).prop('href', '#ppModifyReviewPage');
        }

        $("#lvAll a").on("click", clickHandler);

    }
}

function showReviewDetails()
{
    var id=localStorage.getItem("id");
    var options=[id];

    Reviews.select(options,callback);

    function callback(tx, results){
        console.info("Records selected successfully");

        var row = results.rows[0];
        var id = row['id'];
        var restaurantName = row['restaurantName'];
        var restaurantId=row['restaurantId'];
        var stateId=row['stateId'];
        var reviewerEmail = row['reviewerEmail'];
        var reviewerComments = row['reviewerComments'];
        var hasRating=row['hasRating'];
        var rating1=row['rating1'];
        var rating2=row['rating2'];
        var rating3=row['rating3'];

        console.info(`id:${id} restaurantName: ${restaurantName} restaurantId: ${restaurantId} stateId: ${stateId}  reviewerEmail: ${reviewerEmail} reviewerComments: ${reviewerComments} 
         hasRating: ${hasRating} rating1: ${rating1} rating2: ${rating2} rating3: ${rating3} `);

        $("#rEditName").val(restaurantName);
        $("#bEditId ").val(restaurantId);
        $("#Province").val(stateId);
        $("#Province").selectmenu("refresh");
        $("#rEditEmail").val(reviewerEmail);
        $("#rEditCmt").val(reviewerComments);

        if(hasRating==='true'){
            $("#mRatingsChk").prop("checked",true);
            $("#mQuan").val(rating1);
            $("#mSer").val(rating2);
            $("#mVal").val(rating3);
        }
        else{
            $("#mRatingsChk").prop("checked",false);
        }
        $("#frmEdit :checkbox").checkboxradio("refresh");
    }
}

function deleteReview(){
    var id=localStorage.getItem("id");
    var options=[id];
    Reviews.delete(options);
}
function clearDatabase(){
    var result= confirm("Are you sure you want to clear database?");
    if(result){
        try{
            DB.dropTables();
            alert("Database cleared: All tables dropped");
        }
        catch (e) {
            alert(e);
        }
    }
}

function cancelModification() {
    window.location.href="#pageHome";
}

function saveDefaults(){

    var defResEmail= $("#drEmail").val();
    localStorage.setItem("RestuarentEmail",defResEmail);
    alert("Default Reviewer E-mail saved in local storage");
}
function loadDefaults(){
    $("#rEditEmail").val(localStorage.getItem("RestuarentEmail"));
    $("#drEmail").val(localStorage.getItem("RestuarentEmail"));
}