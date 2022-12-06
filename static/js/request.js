module.exports = {
	/**网络请求 */
	request(url, options) {
		return new Promise(function(resolve, reject) {
			options = options || {};
			options.data = options.data || {}

			let header = {
				'content-type': 'application/json',
				'token': uni.getStorageSync('token') || ''
			};
			uni.request({
				url: url,
				method: options.method,
				dataType: options.data.dataType || 'json',
				data: options.data || {},
				header: header,
				success: function(res) {
					if (res.data.code !== 200) {
						uni.showModal({
							title: res.data.msg,
							showCancel: false,
						})
					}
					resolve(res.data)
				},
				fail: function(res) {
					reject(res);
				}
			});

		})
	},
}
