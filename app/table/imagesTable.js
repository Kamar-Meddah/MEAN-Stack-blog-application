const table = require('../../core/table/table');
class imagesTable extends table{

    constructor(){
        super();
        this.tab='images';
        this.db=this.db.model('images',{name:"String",articles_id:{ type: "ObjectId", index: true }})
    }

   
   findImg(id,cb){
    this.db.find({"articles_id":id}).then((row)=>{
        cb(row)
         })
    }

    deleteWithArticle(id,cb=null){
        this.db.remove({"articles_id":id}).exec().then((row)=>{
                if(cb !== null){
                    cb();
                }
            })
    }
}

module.exports=new imagesTable();