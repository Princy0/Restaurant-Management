var Reviews={
    insert:function (objReview) {
        db.transaction(function (tx) {
            var sql = "INSERT INTO review(restaurantName,restaurantId,stateId,reviewerEmail,reviewerComments,hasRating,rating1,rating2,rating3) VALUES(?,?,?,?,?,?,?,?,?);";
            var options = [objReview.restaurantName, objReview.restaurantId, objReview.stateId, objReview.reviewerEmail, objReview.reviewerComments, objReview.hasRating, objReview.rating1, objReview.rating2, objReview.rating3];

            function successTransaction() {
                alert("New Review Added");
                console.info("Success: Review Insert transaction  successfull");
            }
            tx.executeSql(sql, options, successTransaction, errorHandler);
        });
    },
    selectAll:function (options,callback){
        db.transaction(function (tx){
            var sql ="SELECT *  FROM review;";
            tx.executeSql(sql,options,callback,errorHandler);
        });
    },
    select: function (options,callback){
        var options=options;
        db.transaction(function (tx){
            var sql="SELECT * from review WHERE id=?;";
            tx.executeSql(sql,options,callback,errorHandler);
        });
    },
    update:function (objReview,id){
        db.transaction(function(tx){
            var  sql="UPDATE review SET restaurantName=?,restaurantId=?,stateId=?,reviewerEmail =? ,reviewerComments=?,hasRating=?,rating1=?,rating2=?,rating3=? WHERE id=?;";
            var options=[objReview.restaurantName,objReview.restaurantId,objReview.stateId,objReview.reviewerEmail
                ,objReview.reviewerComments,objReview.hasRating,objReview.rating1,objReview.rating2,objReview.rating3,id];
            function successTransaction(){

                alert("Review Updated Successfully");
            }
            tx.executeSql(sql,options,successTransaction,errorHandler);
        });
    },
    delete:function (options){
        var options=options;
        db.transaction(function (tx){
            var sql="Delete from review WHERE id=?;";
            function successTransaction(){

                alert("Review Deleted Successfully");
            }
            tx.executeSql(sql,options,successTransaction,errorHandler);
        });
    },
}