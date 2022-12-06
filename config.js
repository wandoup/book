/**
 * 小程序配置文件
 */
const domain = `https://api.ytool.top`
// const appId = uni.getAccountInfoSync().miniProgram.appId;
// const apiVersion = "v4";
module.exports = {
	//--广告类型定义，后台编号统一

	//--sass部署的产品ID
	// productId: 'shop',
	// appId: appId,
	// imSdkAppID: 1400587830,
	// ListType: {
	// 	Product: '10',
	// 	MyStudy: '20',
	// 	Course: '1394623825487876098', //线上课程
	// 	Lecture: '1394624135539216386', //线上讲座
	// 	Test: '1394624434488233986', //测试
	// 	Consult: '1394624610447675394', //咨询
	// },
	service: {
		domain: domain, //--服务器地址

		deleteMarkUrl: `/api/mark`,

	}
};
