// index.js
// 获取应用实例
const app = getApp()
const API = require("../../http/API")
const http = require("../../http/http")
Page({
  data: {
    // 轮播图数据
    slideshowdata:[],
    // 子菜单应用
    applydata:[],
    // 获取直播数据
    streamingdata:{},
    // 热门教程
    hotspotCourse:[],
    // 问答专区
    questionsanswer:[],
    // 素材下载
    matterdownload:[],
    // 证书数据
    certificatedata:[]
  },
  // 点击跳转
  connect(e){
    console.log(e);
  },
  
  onLoad() {
    // 获取轮播图片
    http(API.slideshowList,{type:"m",local_code:10,order:"weight",limit:6}).then(res=>{
      // console.log(res);
      this.setData({
        slideshowdata : res.data.data
      })
    })
    // 子菜单
    this.setData({
      applydata:[
        {
          img:"../../images/h9-b_1806.png",
          name:"免费课程"
        },
        {
          img:"../../images/h12-g_1806.png",
          name:"专业课程"
        },
        {
          img:"../../images/h2-p_2212.png",
          name:"大触直播"
        },
        {
          img:"../../images/h10-o_1806.png",
          name:"教程兑换"
        },
        {
          img:"../../images/h11-c_2212.png",
          name:"学员成长"
        },
        {
          img:"../../images/h11-c_1811.png",
          name:"每日一画"
        },
        {
          img:"../../images/h14-r_2212.png",
          name:"素材下载"
        },
        {
          img:"../../images/h5-p_2211.png",
          name:"社区问答"
        }
      ]
    })
    // 获取直播数据
    http(API.streaming,{live:3,is_live:1,limit:3,page:1}).then(res=>{
      // console.log(res);
      this.setData({
        streamingdata: res.data
      })
    })
    // 热门搜索
    http(API.redCourse).then(res=>{
      // console.log(res);
      this.setData({
        hotspotCourse : res.data
      })
    })
    // 问答专区
    http(API.questionsAnswer).then(res=>{
      // console.log(res);
      var datas = [];
      for (let i = 0; i < 3; i++) {
        datas.push(res.data[i])
      }
      this.setData({
          questionsanswer : datas
      })
      // console.log(this.data.questionsanswer);
    })
    // 素材下载 matterDownload
    http(API.matterDownload).then(res=>{
      // console.log(res);
      var datas = [];
      for (let i = 2; i < 6; i++) {
        datas.push(res.data.data[i])
      }
      this.setData({
        matterdownload : datas
      })
      // console.log(this.data.matterdownload);
    })

    // 证书数据据
    this.setData({
      certificatedata:[
        {
          link:"https://v.yunaq.com/certificate?site=www.lanqb.com&at=realname",
          img:"https://assets-cdn.lanqb.com/image/footer/footer-icon1_124x47.png"
        },
        {
          link:"",
          img:"https://assets-cdn.lanqb.com/image/footer/footer-icon5@2x.png"
        },
        {
          link:"https://assets-cdn.lanqb.com/image/footer/ lab%E5%AE%9E%E5%90%8D%E5%AE%98%E7%BD%91%E8%AE%A4%E8%AF%81.pdf",
          img:"https://assets-cdn.lanqb.com/image/footer/footer-icon2@2x.png"
        },
        {
          link:"http://www.innocom.gov.cn",
          img:"https://assets-cdn.lanqb.com/image/footer/footer-icon3@2x.png"
        },
        {
          link:"https://xyt.xcc.cn/getpcInfo?sn=1559097290247876608&language=CN&certType=8&url=*.lanqb.com",
          img:"https://xyt.xcc.cn/img/icon/icon8.png"
        }
      ]
    })
  },
})
