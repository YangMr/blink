//导入请求的配置
import {HTTP} from "../utils/http";

//定义请求的api
class BookModel extends HTTP{
  //获取热门书籍api
  getBook(){
    return this.request({
      url : "/book/hot_list"
    })
  }

  //获取书籍短评api
  getBooksEssay(id){
    return this.request({
      url : `/book/${id}/short_comment`
    })
  }

  //获取喜欢书籍数量api
  getLikeBookCount(){
    return this.request({
      url : "/book/favor/count"
    })
  }

  //获取书籍点赞情况api
  getBookFavor(id){
    return this.request({
      url : `/book/${id}/favor`
    })
  }

  //新增短评api
  addBookEssay(bookID,content){
    return this.request({
      url : "/book/add/short_comment",
      method : "POST",
      data : {
        book_id : bookID,
        content : content
      }
    })
  }

  //获取热搜关键字api
  getHotKeyword(){
    return this.request({
      url : "/book/hot_keyword"
    })
  }

  //书籍搜索api
  getBookSearch(start,count,summary,q){
    return this.request({
      url : "/book/search",
      data : {
        start: start,
        count:count,
        summary:summary,
        q : q
      }
    })
  }

  //获取书籍详细信息api
  getBookDetail(id){
    return this.request({
      url : `/book/${id}/detail`
    })
  }
}

//导出配置的接口
export {BookModel}