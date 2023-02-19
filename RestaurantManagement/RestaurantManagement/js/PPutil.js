function doValidate_frmAdd(){
    var form = $("#frmAdd");
    form.validate({
        rules:{
            rName :{
                required:true,
                rangelength:[2,20]
            },
            bId : {
                required:true,
                rangelength:[2,5]
            },
            rEmail :{
                required: true,
                emailcheck:true
            },
            rQuan :{
                required : true,
                rangecheck:true

            },
            rSer :{
                required : true,
                rangecheck:true
            },
            rVal:{
                required:true,
                rangecheck:true
            }
        },
        messages:
            {
                rName :{
                    required:"Please enter your name",
                    rangelength:"Name must be between 2 to 5 character long!"
                },
                bId :{
                    required:"Please enter the business ID",
                    rangelength:"ID Must be between 2 to 5 character long!!"
                },
                rEmail :{
                    required : "Please enter your email ID!!",
                    emailcheck: "Please enter valid email.."
                },
                rQuan:{
                    required: "please enter valid number!",
                    rangecheck:"Value must be between 0 to 5"
                },
                rSer : {
                    required: "Value must be between 0-5",
                    rangecheck:"Value must be between 0 to 5"
                },
                rVal: {
                    required: "Value must be between 0-5",
                    rangecheck:"Value must be between 0 to 5"
                }
            }
    });
    return form.valid();
}

function doValidate_frmEdit(){
    var form = $("#frmEdit");
    form.validate({
        rules:{
            rEditName :{
                required:true,
                rangelength:[2,20]
            },
            bEditId : {
                required:true,
                rangelength:[2,5]
            },
            rEditEmail :{
                required: true,
                emailcheck:true
            },
            mQuan :{
                required : true,
                rangecheck:true
            },
            mSer :{
                required : true,
                rangecheck:true
            },
            mVal:{
                required:true,
                rangecheck:true
            }
        },
        messages:
            {
                rEditName :{
                    required:"Please enter your name",
                    rangelength:"Name must be between 2 to 5 character long!"
                },
                bEditId :{
                    required:"Please enter the business ID",
                    rangelength:"ID Must be between 2 to 5 character long!!"
                },
                rEditEmail :{
                    required : "Please enter your email ID!!",
                    emailcheck: "Please enter valid email.."
                },
                mQuan: {
                    required: "please enter valid number!",
                    rangecheck:"Value must be between 0 to 5"
                },
                mSer : {
                    required: "Value must be between 0-5",
                    rangecheck:"Value must be between 0 to 5"
                },
                mVal: {
                    required: "Value must be between 0-5",
                    rangecheck:"Value must be between 0 to 5"
                }
            }
    });
    return form.valid();
}

jQuery.validator.addMethod("rangecheck",
    function (value,element){
        var RangeRegex= /^[0-5]$/;
        return RangeRegex.test(value);
    });


jQuery.validator.addMethod("emailcheck",
    function(value,element){
        var regexp = /^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        return regexp.test(value);
    });