const table = require('../../core/table/table');

class commentsTable extends table{

    constructor(){
        super();
        this.tab='comments';
        this.db=this.db.model('comments',{name:"String",content:"String",articles_id:{ type: "ObjectId", index: true },date:{ type: Date, default: Date.now }})
    }

    find(id,cb){
        this.db.find({"articles_id":id}).then((row)=>{
                cb(row);
            })
    }

    deleteCom(id,cb=null){
        this.db.remove({"articles_id":id}).exec().then((row)=>{
                if(cb !== null){
                    cb();
                }
            })
    }

}

module.exports=new commentsTable();