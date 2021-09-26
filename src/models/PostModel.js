export class PostModel {
  constructor(postData) {
    this.id = postData.id
    this.creatorId = postData.creatorId
    this.imgUrl = postData.imgUrl
    this.likeIds = postData.likeIds
    this.body = postData.body
    this.creator = postData.creator || {}
  }
}
