const table = require('../../core/table/table');

class articlesTable extends table{

    constructor(){
        super();
        this.tab='articles';
        this.db=this.db.model(`${this.tab}`,{titre:'String',contenu:"String",category_id:{ type: "ObjectId", index: true },date:{ type: Date, default: Date.now }});
    }

    countByCategorie(id,cb){
        this.db.count({"category_id":id}).then((row)=>{
                cb(row)
            })
    }

    lastByCategorie(id,arg=[],cb){
        this.db.aggregate(
                { $match : { "category_id" : this.objectId(id)} },
                { $lookup:
                   {
                     from: 'categories',
                     localField: 'category_id',
                     foreignField: '_id',
                     as: 'categorie'
                   }
                 },{ $sort : { "date" :1}},
                 {$project:{"contenu":{$substr:["$contenu",0,200]},"categorie":1,"_id":1,"titre":1,"category_id":1,"date":1}}
                )
                .skip(arg[0])
                .limit(arg[1])
                .exec().then((res)=>{
                   cb(res)
            })
       }

       last(arg=[],cb){
           this.db.aggregate(
            { $lookup:
                {
                  from: 'categories',
                  localField: 'category_id',
                  foreignField: '_id',
                  as: 'categorie'
                }
              },{ $sort : { "date" :-1}},
              {$project:{"contenu":{$substr:["$contenu",0,200]},"categorie":1,"_id":1,"titre":1,"category_id":1,"date":1}}

           ).skip(arg[0])
           .limit(arg[1])
            .exec().then(res=>{
                cb(res)
            })
        
       }

       all(arg=[],cb){
        this.db.aggregate(
            { $lookup:
                {
                  from: 'categories',
                  localField: 'category_id',
                  foreignField: '_id',
                  as: 'categorie'
                }
              },{ $sort : { "titre" :1}},
              {$project:{$project:{"categorie":1,"_id":1,"titre":1,"category_id":1,"date":1}}})
           .skip(arg[0])
           .limit(arg[1])
            .exec().then(res=>{
                cb(res)
            })     
       }

       search(index,arg=[],cb){
        let z=[];
        let a=index.split(' ');
        a.forEach((value)=>{
            z.push(value);
       })
        z=z.join('.*');

        this.db.aggregate(
            { $match : {'titre': {'$regex':'.*'+ z+'.*'}} },
            { $lookup:
                {
                  from: 'categories',
                  localField: 'category_id',
                  foreignField: '_id',
                  as: 'categorie'
                }
              },{ $sort : { "date" :1}},
              {$project:{"contenu":{$substr:["$contenu",0,200]},"categorie":1,"_id":1,"titre":1,"category_id":1,"date":1}}

           ).skip(arg[0])
           .limit(arg[1])
            .exec().then(res=>{
                cb(res)
            })
       }

       countSearch(index,cb){
        let z=[];
        let a=index.split(' ');
        a.forEach((value)=>{
            z.push(value);
       })
        z=z.join('.*');
        this.db.count({'titre': {'$regex':'.*'+ z+'.*'}}).then((row)=>{
                cb(row)
            })
      
    }

    find(id,cb){
        this.db.aggregate(
            { $match : {'_id':this.objectId(id)} },
            { $lookup:
                {
                  from: 'categories',
                  localField: 'category_id',
                  foreignField: '_id',
                  as: 'categorie'
                }
              },{ $sort : { "date" :1}},
              {$project:{"contenu":1,"categorie":1,"_id":1,"titre":1,"category_id":1,"date":1}}

           )
           .exec().then(res=>{
                cb(res[0])
            })        
       }

}

module.exports=new articlesTable();