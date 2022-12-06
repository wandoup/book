const Config = require("@/config.js"); // 系统参数
const {
	request
} = require("./request.js")

export function deleteMark(data) {
	return request(Config.service.deleteMarkUrl, {
		method: 'delete',
		data: data,
	})
}


