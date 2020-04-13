
var gotodetails=function(){
  wx.navigateTo({
    url: '../details/details',
  })
};

// var gotodetails = function (e) {
//   let name = e.currentTarget.dataset.bookname;
//   let author = e.currentTarget.dataset.bookauthor;
//   let dname = JSON.stringify(name);
//   let dauthor = JSON.stringify(author);
//   wx.navigateTo({
//     url: '../details/details?bookname=' + dname + "&bookauthor=" + dauthor,
//   })
// };

module.exports = {
  gotodetails: gotodetails
};