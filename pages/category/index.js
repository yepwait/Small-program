// pages/category/index.js
import { request } from "../../request/index.js";
import regeneratorRuntime from '../../lib/runtime/runtime';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    leftMenuList: [],
    rightMenuList: [],
    // 左侧索引
    leftIndex: 0,
    scrollTop: 0
  },
  //接口的返回数据
  Cates: [],
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // this.getCategoryList();
    const Cates = wx.getStorageSync("cates");
    if (!Cates) {
      this.getCategoryList();
    } else {
      // 有旧数据 过期时间 300s
      if (Date.now() - Cates.time > 300 * 1000) {
        this.getCategoryList();
      }
      else {
        this.Cates = Cates.data;
        let leftMenuList = this.Cates.map(v => v.cat_name);
        let rightMenuList = this.Cates[0].children;
        this.setData({
          leftMenuList,
          rightMenuList
        })
      }
    }
  },
  //获取分类数据
  async getCategoryList() {
    // request({ url: "/categories" })
    //   .then(result => {
    //     this.Cates = result.data.message;
    //     // 存入本地
    //     wx.setStorageSync("cates", { time: Date.now(), data: this.Cates });
    //     let leftMenuList = this.Cates.map(v => v.cat_name);
    //     let rightMenuList = this.Cates[0].children;
    //     this.setData({
    //       leftMenuList,
    //       rightMenuList
    //     })

    //   })
    const result = await request({ url: "/categories" });
    this.Cates = result;
    // 存入本地
    wx.setStorageSync("cates", { time: Date.now(), data: this.Cates });
    let leftMenuList = this.Cates.map(v => v.cat_name);
    let rightMenuList = this.Cates[0].children;
    this.setData({
      leftMenuList,
      rightMenuList
    })
  },
  handleItemTap(e) {

    const { index } = e.currentTarget.dataset;
    let rightMenuList = this.Cates[index].children;
    this.setData({
      leftIndex: index,
      rightMenuList,
      // 重新设置内容scroll_view
      scrollTop: 0
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})