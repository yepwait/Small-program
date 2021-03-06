import { request } from "../../request/index.js";
import regeneratorRuntime from '../../lib/runtime/runtime';
// pages/goods_list/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs:[
      {
        id:0,
        name:"综合",
        isActive:true
      },
      {
        id:1,
        name:"销量",
        isActive:false
      },
      {
        id:2,
        name:"价格",
        isActive:false
      }
    ],
    goodsList:[]
  },
  // 接口需要的参数
  QueryParams:{
    query:"",
    cid:"",
    pagesize:10,
    pagenum:1

  },
  totalPages:1,
  // 标题点击时间
  handleTabsItemChange(e){
    const {index} = e.detail;
    let {tabs} = this.data;
    tabs.forEach((v,i)=>i===index?v.isActive=true:v.isActive=false);
    this.setData({
      tabs
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.QueryParams.cid=options.cid;
    this.getGoodsList();
  },

  // 获取商品列表数据
  async getGoodsList(){
    const res = await request({url:"/goods/search",data:this.QueryParams});
    // 获取总条数
    const total = res.total;
    this.totalPages = Math.ceil(total/this.QueryParams.pagesize);
    this.setData({
      // 拼接
      goodsList:[...this.data.goodsList,...res.goods]
    })

    wx.stopPullDownRefresh();
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
    this.setData({
      goodsList:[]
    })
    this.QueryParams.pagenum=1;
    this.getGoodsList();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    // 判断还有没有下一页
    if(this.QueryParams.pagenum>=this.totalPages){
      wx.showToast({
        title: '没有下一页了'
      });
    }
    else{
      this.QueryParams.pagenum++;
      this.getGoodsList();
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})