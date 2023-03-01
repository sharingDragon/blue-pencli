// 对 wx.request 进行再次封装

module.exports = function(url,data,config){
  return new Promise((resolve,reject)=>{
    // 显示框
    wx.showLoading({
      title: '正在加载中',
    })
    // 发送网络请求
    wx.request({
      url,
      data:{
        ...data,
        cookie: wx.getStorageSync('cookie')
      },
      header:{
        // 每次请求把登录成功之后存在本地的cookie手动携带过去
        cookie: wx.getStorageSync('cookie')
      },
      ...config,
      success:res=>{
        resolve(res)
      },
      fail:err=>{
        reject(err)
      },
      complete: res=>{
        // 隐藏提示框
        wx.hideLoading()
        // 根据返回的状态码，判断请求成功还是失败
        if(res.statusCode.toString().startsWith("2")){
          // wx.showToast({
          //   title: '请求成功',
          // })
          console.log("请求成功！");
        } else {
          wx.showToast({
            title: '请求失败',
            icon:"error"
          })
        }
      }
    })
  })
}