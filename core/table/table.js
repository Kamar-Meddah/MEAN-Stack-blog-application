class table {//Begin Class

    constructor(db = require('../../app/app').getDb()){
        this.tab='';
        this.db=db;
        this.objectId=require('bson-objectid')
    }

    count(cb){
        this.db.count({}).then(res=>{
            cb(res)
        })
    }

    all(cb){
        this.db.find({}).sort({"titre":1}).then(res=>{cb(res)})
    }
 
    find(id,cb){
        this.db.find({"_id":id}).then(res=>{
            cb(res[0])
        })
       }
    
     last(arg=[],cb){

        this.db
            .find({})
            .sort({"date":-1})
            .skip(arg[0])
            .limit(arg[1])
            .then((res)=>{
               cb(res)
             })

       }
    
    create(obj,cb=null){
        this.db.create(obj).then((res)=>{
                if(cb !== null){cb(res._id)}
             })
    }
     
    update(id,obj,cb=null){ 
        this.db.update({"_id":id},{$set:obj}).exec().then((res)=>{
                if(cb !== null){cb()}
             })
    }

    delete(id){
        this.db.remove({"_id":id}).exec()

    }

}//End Class

module.exports=table;