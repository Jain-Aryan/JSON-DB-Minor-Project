/* 
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/ClientSide/javascript.js to edit this template
 */



var jpdbBaseURL='http://api.login2explore.com:5577';
var jpdbIRL='/api/irl';
var jpdbIML='/api/iml';
var studDBName='SCHOOL-DB';
var studRelationName='STUDENT-TABLE';
var connToken='90932733|-31949277002907934|90954266';

$("#rno").focus();

function saveRecNo2LS(jsonObj){
    var lvData=JSON.parse(jsonObj.data);
    localStorage.setItem('recno', lvData.rec_no);
}

function getRollNoAsJsonObj(){
    var rno=$('rno').val();
    var jsonStr={
        id:rno
    };
    return JSON.stringify(jsonStr);
}

function filldata(jsonObj){
    saveRecNo2LS(jsonObj);
    var data=JSON.parse(jsonObj.data).record;
    $('#fname').val(data.name);
    $('#Class').val(data.Class);
    $('#dob').val(data.dob);
    $('#add').val(data.add);    
}

function resetForm(){
    $('#rno').val('');
    $('#fname').val('');
    $('#Class').val('');
    $('#dob').val('');
    $('#add').val('');
    $('#rno').prop('disabled',false);
    $('#save').prop('disabled',true);
    $('#update').prop('disabled',true);
    $('#reset').prop('disabled',true);
    $('#rno').focus();
}

function validateData(){
    var rno,fname,Class,dob,add;
    rno=$('#rno').val();
    fname=$('#fname').val();
    Class=$('#Class').val();
    dob=$('#dob').val();
    add=$('#add').val();
    
    
    if (rno === ''){
        alert('Roll No is Missing');
        $('#rno').focus();
        return '';
    }
    if (fname === ''){
        alert('First Name is Missing');
        $('#fname').focus();
        return '';
    }
    if (Class === ''){
        alert('CLass is Missing');
        $('#Class').focus();
        return '';
    }
    if (dob === ''){
        alert('Birth Date is Missing');
        $('#dob').focus();
        return '';
    }
    if (add === ''){
        alert('Address is Missing');
        $('#add').focus();
        return '';
    }
    
    
    var jsonStrObj={
        id:rno,
        name:fname,
        Class:Class,
        dob:dob,
        add:add,
        
        
    };
    return JSON.stringify(jsonStrObj);
}

function getStud(){
    var rollNoJsonObj=getRollNoAsJsonObj();
    var getRequest=createGET_BY_KEYRequest(connToken,studDBName,studRelationName,rollNoJsonObj);
    jQuery.ajaxSetup({async:false});
    var resJsonObj=executeCommandAtGivenBaseUrl(getRequest,jpdbBaseURL,jpdbIRL);
    jQuery.ajaxSetup({async:true});
    if (resJsonObj.status ===400){
        $('#save').prop('disabled',false);
        $('#reset').prop('disabled',false);
        $('#fname').focus();
    }else if (resJsonObj.status ===200){
        $('#rno').prop('disabled',false);
        fillData(resJsonObj);
        
        $('#update').prop('disabled',false);
        $('#reset').prop('disabled',false);
        $('#fname').focus();
    }
}

function saveData(){
    var jsonStrObj = validateData();
    if (jsonStrObj ===''){
        return "";
    }
    var putRequest=createPUTRequest(connToken,jsonStrObj,studDBName,studRelationName);
    jQuery.ajaxSetup({async:false});
    var resJsonObj=executeCommandAtGivenBaseUrl(putRequest,jpdbBaseURL,jpdbIML);
    jQuery.ajaxSetup({async:true});
    resetForm();
    $('#rno').focus();
}

function updateData(){
    $('#update').prop('disabled',true);
    jsonUpd = validateData();
    var updateRequest=createUPDATERecordRequest(connToken,jsonUpd,studDBName,studRelationName,localStorage.getItem('recno'));
    jQuery.ajaxSetup({async:false});
    var resJsonObj=executeCommandAtGivenBaseUrl(updateRequest,jpdbBaseURL,jpdbIML);
    jQuery.ajaxSetup({async:true});
    console.log(resJsonObj);
    resetForm();
    $('#rno').focus();
}
