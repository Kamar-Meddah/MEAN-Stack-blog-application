const table = require('../../core/table/table');

class categoriesTable extends table{

    constructor(){
        super();
        this.tab='categories';
        this.db=this.db.model(this.tab,{titre:"String"})
    }

    allP(arg=[],cb){
        this.db.find({}).sort({"titre":1}).skip(arg[0]).limit(arg[1]).then(res=>{
            cb(res)
        })
       }


    }

module.exports=new categoriesTable();