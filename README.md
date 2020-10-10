# blink
## 一、托管项目

### 1.1 在github上创建远程仓库

```
https://github.com/YangMr/blink
```

### 1.2 将远程仓库克隆到本地

```
git clone 仓库地址
```

### 1.3 创建小程序项目

```
使用微信开发者工具创建小程序项目
```

### 1.4 将初始化的小程序项目托管到github上面

```
git add .

git commit -m ""

git push
```

## 二、分析项目

### 2.1 分析项目的设计图

### 2.2 分析项目的接口文档(开发文档)

## 三、开发前的准备工作

### 3.1 配置请求的公共接口api

```
//创建一个对象,用来配置请求的公共接口地址
const config = {
  api_base_url : "http://bl.7yue.pro/v1",
  appkey : ""
};

//导出接口的配置
export {config}
```

### 3.2 对数据请求(wx.request())进行配置

```
//引入配置的公共的接口文件
import {config} from "../config";

//创建一个对象,保存项目的错误提示信息
const tips = {
  1 : "抱歉,出现了一个错误",
  301 : "永久重定向",
  400 : "请求包含不支持的参数",
  401 : "未授权",
  403 : "被禁止访问",
  404 : "请求的资源不存在",
  413 : "上传的File体积太大",
  500 : "内部错误",
  1000 : "输入参数错误",
  1001 : "输入的json格式不正确",
  1002 : "找不到资源",
  1003 : "未知错误",
  1004 : "禁止访问",
  1005 : "不正确的开发者key",
  1006 : "服务器内部错误",
  2000 : "你已经点过赞了",
  2001 : "你还没点过赞",
  3000 : "该期内容不存在"
}

//创建一个类,封装数据请求
class HTTP {
  request({url,data={},method="GET"}){
    return new Promise((resolve,reject)=>{
      this._request(url,resolve,reject,data,method)
    })
  }
  //私有方法
  _request(url,resolve,reject,data={},method="GET"){
    wx.request({
      url: config.api_base_url + url,
      header: {
        "content-type": "application/json",
        "appKey" : config.appkey
      },
      data : data,
      method : method,
      success : (res)=>{
        
        //获取当前返回数据的状态码
        const code = res.statusCode.toString();
        //如果状态吗是2开头则把数据返回出去
        if(code.startsWith("2")){
          resolve(res);
        }else{
          console.log(res)
          const error_code = res.data.error_code;
          this._show_error(error_code); // 1005
        }

      },
      fail : (err)=>{
        reject(err);
        this._show_error(1);
      }
    })
  }
  //错误提示方法
  _show_error(error_code){
    if(!error_code){
      error_code = 1;
    }
    const tip = tips[error_code]; 
    console.log(tip)
    wx.showToast({
      title: tip ? tip : tips[1],
      icon : "none",
      duration : 2000
    })
  }
}

export {HTTP}
```

### 3.3 配置api接口(book.js)

```
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
```

## 四、创建页面并配置tabbar

### 4.1 创建对应tabbar页面

### 4.2 创建tabbar

```
{
  "pages": [
    "pages/classic/classic",
    "pages/book/book",
    "pages/my/my"
  ],
  "window": {
    "backgroundTextStyle": "light",
    "navigationBarBackgroundColor": "#fff",
    "navigationBarTitleText": "Weixin",
    "navigationBarTextStyle": "black"
  },
  "tabBar": {
    "selectedColor": "#000000",
    "backgroundColor": "#ffffff",
    "color": "#c7c7c7",
    "list": [
      {
        "pagePath": "pages/classic/classic",
        "text": "流行",
        "iconPath": "/assets/tabBar/classic.png",
        "selectedIconPath": "/assets/tabBar/classic@highlight.png"
      },
      {
        "pagePath": "pages/book/book",
        "text": "书单",
        "iconPath": "/assets/tabBar/book.png",
        "selectedIconPath": "/assets/tabBar/book@highlight.png"
      },
      {
        "pagePath": "pages/my/my",
        "text": "喜欢",
        "iconPath": "/assets/tabBar/my.png",
        "selectedIconPath": "/assets/tabBar/my@highlight.png"
      }
    ]
  },
  "style": "v2",
  "sitemapLocation": "sitemap.json"
}
```

