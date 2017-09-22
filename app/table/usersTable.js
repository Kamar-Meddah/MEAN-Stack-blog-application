const table = require('../../core/table/table');

class usersTable extends table{

    constructor(){
        super();
        this.tab='users';
        this.db=this.db.model('users',{username:"String",password:"String"})
    }

    findPass(obj,cb){
        this.db.find(obj).then((res)=>{
            cb(res[0])
             })
    }

    login(user=[],cb){
        const sha1=require('sha1');
        this.db.find({"username":user[0],"password":sha1(user[1])}).then((res)=>{
                cb(res)
            })            
    }

}

module.exports=new usersTable();