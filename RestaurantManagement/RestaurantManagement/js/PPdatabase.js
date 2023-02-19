var db;
function errorHandler(error){
    console.error("SQL error: "+error.message);
}
var DB= {
    createDatabase: function (){
        var shortName= "PPReviewDB";
        var version= "1.0";
        var displayName= "DB for Library app";
        var dbSize= 2*1024*1024;

        function dbcreateSuccess(){
            console.info("Success: Database created successfully");
        }
        db=openDatabase(shortName,version,displayName,dbSize, dbcreateSuccess);
    },
    createTables: function (){
        db.transaction(function (tx){
            var createStateTable= "CREATE TABLE IF NOT EXISTS state("
                + "id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,"
                + "name VARCHAR(20) NOT NULL);";

            var insertStateValue = "INSERT INTO state(name) VALUES('Ontario'),('Alberta'),('British Columbia')," +
                "('Nova Scotia'),('Manitoba');"
            var dropStateTable = "DROP TABLE state";
            var options=[];
            function  successcallback(){
                console.info("Success: Drop table: state  successful");

            }
            function  successcallback2(){
                console.info("Success:  States Insert transaction  successfull");

            }
            tx.executeSql(dropStateTable,options,successcallback,errorHandler);
            tx.executeSql(createStateTable,options,successcallback1,errorHandler);
            tx.executeSql(insertStateValue,options,successcallback2,errorHandler);

            // });
            //
            // db.transaction(function (tx){
            var createReviewTable="CREATE TABLE IF NOT EXISTS review( " +
                "id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT," +
                "restaurantName VARCHAR(30) NOT NULL," +
                "restaurantId VARCHAR(20) NOT NULL," +
                "stateId INTEGER NOT NULL," +
                "reviewerEmail VARCHAR(30)," +
                "reviewerComments TEXT," +
                "hasRating VARCHAR(1)," +
                "rating1 INTEGER," +
                "rating2 INTEGER," +
                "rating3 INTEGER," +
                "FOREIGN KEY(stateId) REFERENCES state(id));";
            var options=[];
            function  successcallback1(){
                console.info("Success: Create tables... review and state \nsuccessful");

            }
            tx.executeSql(createReviewTable,options,successcallback1,errorHandler);
        });
    },
    dropTables:function (){


        function successCallback3(){
            console.info("Drop Table: review and state successful");
        }

        db.transaction(function (tx){
            var options=[];
            var dropReviewTable="DROP TABLE IF EXISTS review;";
            var dropStateTable = "DROP TABLE IF EXISTS state";
            tx.executeSql(dropReviewTable,options,successCallback3,errorHandler);
            tx.executeSql(dropStateTable,options,successCallback3,errorHandler);

        });

    }

};