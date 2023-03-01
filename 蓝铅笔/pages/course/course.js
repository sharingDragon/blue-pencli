// pages/course/course.js
const app = getApp()
const API = require("../../http/API")
const http = require("../../http/http")

Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 菜单列表
    navdata:[],
    // 选中菜单类目
    selectedItem : 0,
    // 双向绑定
    searchConten: "",
    // 筛选内容数据
    screendata:[],
    // 筛选内容全部展开
    screenUnfold: false,
    // 当前选中
    course_subjects_ids:"",
    // 获取内容列表
    newList :[],
    // 获取多少条信息
    limit:10,
    // 第几页内容
    page:1,
    // 获取数据类型
    type:1,
    // 传送的参数
    dataquery:{},
  },

  // 选中菜单内容
  selectedTop(e) {
    console.log(e.currentTarget.id);
    this.setData({
      selectedItem : e.currentTarget.id
    })
    switch (this.data.selectedItem) {
      case "0":
        {
          this.setData({page : 1,title:""})
          // 传递的参数
          this.setData({
            dataquery : {
              type:this.data.type,
              page:this.data.page,
              limit:this.data.limit,
              title:this.data.searchConten
            }
          })
        }
        break;
      case "1":
        console.log(999);
        break;
      default:
        break;
    }
  },
  // 搜索内容
  searchInput(e) {
    console.log(e);
    this.setData({
      searchConten : e.detail.value
    })
  },
  // 点击搜素
  searchTap(){
    this.setData({page : 1})
    this.setData({
      dataquery:{
        ...this.data.dataquery,
        page:this.data.page,
        title: this.data.searchConten
      }
    })
    this.getNewList(API.newCourseVideo,this.data.dataquery)

  },
  // 更多选项
  moreTop() {
    this.setData({
      screenUnfold : !this.data.screenUnfold
    })
    
  },

  // 点击筛选内容
  selectTop(e){
    if (e.currentTarget.id*1 > 0) {
      this.setData({
        course_subjects_ids : e.currentTarget.id
      })
      console.log(this.data.course_subjects_ids);
      // 页数清空你
      this.setData({page : 1})
      this.setData({
        dataquery:{
          ...this.data.dataquery,
          page:this.data.page,
          course_subjects_ids: this.data.course_subjects_ids
        }
      })
    } else {
      this.setData({
        course_subjects_ids : ""
      })
      // 页数清空你
      this.setData({page : 1})
      this.setData({
        dataquery:{
          ...this.data.dataquery,
          page:this.data.page
        }
      })
      let once = this.data.dataquery
      delete once.course_subjects_ids
      // console.log(once);
      this.setData({dataquery:{...once}})
    }
  },
  // 获取最新教程
  getNewList(url,data) {
    http(url,data).then(res=>{
      console.log(res);
      if(res.data.data.length) {
        if (this.data.page === 1) {
          this.setData({newList:res.data.data})
        }else{
          this.setData({newList: this.data.newList.concat(res.data.data)})
        }
      } else {
        wx.showToast({
          title: '没有更多的数据了',
          icon: 'none'
        })
      }
    })
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    
    // 菜单列表
    this.setData({
      navdata:[
        {
          name:"最新",
          path :"newest"
        },
        {
          name:"入门",
          path :"base"
        },
        {
          name:"进阶",
          path :"advance"
        },
        {
          name:"免费",
          path :"free"
        },
        {
          name:"图文",
          path :"graphic"
        },
        {
          name:"兑换",
          path :"video?free=exchange"
        },
        {
          name:"专题",
          path :"topics"
        }
      ]
    })
    // 类别筛选
    http(API.courseGrouplist).then(res=>{
      // console.log(res);
      this.setData({
        screendata:res.data.course_subjects
      })
    })

    // 传递的参数
    this.setData({
      dataquery : {
        type:this.data.type,
        page:this.data.page,
        limit:this.data.limit,
        title:this.data.searchConten
        // course_subjects_ids:this.data.course_subjects_ids
      }
    })
    // 最新教程
    this.getNewList(API.newCourseVideo,this.data.dataquery)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {
    this.setData({
      page: this.data.page +1
    })
    this.setData({
      dataquery:{
        ...this.data.dataquery,
        page:this.data.page
      }
    })
    // this.getNewList(API.newCourse,this.data.dataquery)
    this.getNewList(API.newCourseVideo,this.data.dataquery)


  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})