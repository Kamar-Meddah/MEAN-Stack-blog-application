class CommentsCtrl{
  constructor(){
    this.comments=require('../app').getTable('comments');
  }

  find(request,response){
    this.comments.find(request.body.id,(row)=>{
      response.json(row)
    });
  }

  add(request,response){
      this.comments.create({"name":request.body.name,"content":request.body.comment,"articles_id":request.body.postId});
      response.json();
    }

  delete(request,response){
    this.comments.delete(request.body.id);
    response.json();
  }

}
module.exports = new CommentsCtrl();