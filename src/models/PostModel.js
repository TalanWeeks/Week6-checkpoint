export class PostModel{
  constructor(postData){
    this.id = postData.id
    this.creatorId = postData.creatorId
    this.imgUrl = postData.imgUrl
    this.likedIds = postData.likedIds
    this.body = postData.body
    this.creator = postData.creator || {}
  }
}
