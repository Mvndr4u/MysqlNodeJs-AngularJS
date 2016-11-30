var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
/*
Create Employee Service. 
router.post('/techgeek/v1/createEmployee', function(req,res,next){
try{
var reqObj = req.body;        
console.log(reqObj);
req.getConnection(function(err, conn){
if(err)
{
console.error('SQL Connection error: ', err);
return next(err);
}
else
{
var insertSql = "INSERT INTO emperor SET ?";
var insertValues = {
"Emp_Name" : reqObj.Name,
"Role_Id" : reqObj.e_id,
};



var query = conn.query(insertSql, insertValues, function (err, result){
if(err){

console.error('SQL error: ', err);
return next(err);
}
console.log(result);
var Employee_Id = result.insertId;
res.json({"Emp_id":Employee_Id});
});
}
});
}
catch(ex){
console.error("Internal error:"+ex);
return next(ex);
}
});
*/
var url = require('url');
router.get('/techgeek/v1/getEmployeeDetails', function(req, res, next) {
    try {


            //var roleId = req.param('m_id');
               //   var deptId = req.param('m_name');
          var query = url.parse(req.url,true).query;
                  console.log(query);
        var roleId = query.m_id;
        var deptId = query.Name;
        console.log(roleId);
        console.log(deptId);
        req.getConnection(function(err, conn) {
            if (err) {
                console.error('SQL Connection error: ', err);
                return next(err);
            } else {
                conn.query('select * from manager', [roleId,deptId], function(err, rows, fields) {
                    if (err) {
                        console.error('SQL error: ', err);
                        return next(err);
                    }
                    var resEmp = [];
                    for (var empIndex in rows) {
                        var empObj = rows[empIndex ];
                        resEmp.push(empObj);
                    }
                    res.json(resEmp);
                });
            }
        });
    } catch (ex) {
        console.error("Internal error:" + ex);
        return next(ex);
    }
});


