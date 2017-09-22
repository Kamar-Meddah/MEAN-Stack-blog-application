class mongoDB{

    constructor(path){
        this.mongoose =require('mongoose');
        this.path=path;
    }

    getDbConnect(){
       this.mongoose.connect(this.path, { useMongoClient: true});
       this.mongoose.Promise = require('bluebird');
       return this.mongoose;
    }
}
module.exports=mongoDB;