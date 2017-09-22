class UsersCtrl{

  constructor(){
    this.users=require('../app').getTable('users');
    
  }
  
   login (request, response) { 
    this.users.login([request.body.username,request.body.password],(row)=>{
      if(row.length !==0 ){
        request.session.userId=row[0]._id;
        response.json(true);
      }else{
        response.json([false]);
      }
    });
   }//END login

   logged(request,response){
     let bool=request.session.userId !==undefined
     response.json(bool);
   }

   logout(request, response) {
    request.session.userId=undefined;
    response.json();
   }

   getUserId(request,response){
     response.json({'id':request.session.userId});
   }

   passwordCheck(request,response){
     const sha1=require('sha1')
    this.users.findPass({"_id":request.body.id,"password":sha1(request.body.password)},(row)=>{
      let bool=row !==undefined;
      response.json(bool);
  })
   }

   usernameChange(request, response) { 
    this.users.update(request.body.id,{'username':request.body.username});
    response.json();
   }

   passwordChange(request, response) { 
    const sha1=require('sha1')
    this.users.update(request.body.id,{'password':sha1(request.body.password)})
  response.json(); 
  }

}
module.exports = new UsersCtrl();