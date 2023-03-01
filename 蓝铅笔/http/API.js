// 图片
const url = "https://assets-cdn.lanqb.com"
// 数据
const url2 = "https://m.lanqb.com"

module.exports = {
  // 顶部导航 logo
  logo: url+ "/lanqb/logo05.png",
  // 顶部导航 图片
  logo2023: url+ "/lanqb/2023/2023year.png",
  // 轮播图
  slideshowList : url2+ "/api/home/banner",
  // 大触直播
  streaming: url2+ "/api/daniu",
  // 热门教程
  redCourse : url2 + "/api/home/series",
  // 问答专区
  questionsAnswer: url2 + "/api/home/heat/qa-list",
  // 素材下载
  matterDownload: url2 + "/api/news",

  // 类别筛选
  courseGrouplist :url2 + "/api/course-group-list",
  // 最新教程 https://m.lanqb.com/api/course/video?type=1&page=1&limit=10
  newCourseVideo : url2 + "/api/course/video",
  // https://m.lanqb.com?type=1&page=1&limit=10&title=男


}