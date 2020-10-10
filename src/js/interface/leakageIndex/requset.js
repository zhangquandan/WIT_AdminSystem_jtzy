import axios from 'axios'
import qs from 'qs'
var host = "http://47.110.33.227:8180/wsis/api"

function leakagelndex(url, params, callback) {
	switch (url) {
		case "login":
			axios({
				url: "http://47.110.33.227:8180/wsis-sso/user/login?username=admin&password=123456",
				method: 'post',
				timeout:15000
			}).then((response) => {
				/*console.log(response)*/
				if (callback) {
					callback(response);
				}
			})
			break;

			/**
			 * 区域综合漏损指数
			 * @param {Object} params:{ waterregionid 区域ID , time 时间（yyyy-MM-dd）}
			 * @param {Object} callback
			 */
		case "area":
			/*let params = {
				waterregionid: 2,
				time: '2020-05-11',
			};*/
			console.log("area");
			let token = localStorage.getItem('token');
			axios({
				url: "http://47.110.33.227:8180/wsis/api/waterregion/LeakageIndex",
				method: "get",
				params: params,
				headers: {
					'access_token': token,
				},
				withCredentials: true,
				responseType: 'json',
				timeout: 15000
			}).then((response) => {
        if (callback) {
          callback(response);
        }
			})
			break;

			/**
			 * 所有区域定额设置信息（可根据区域ID，年度查询，区域类型查询）
			 * @param {Object} params :{ waterregionid（非必须), quotayear（非必须）, statisticsType（非必须）（DMA/REGION）}
			 * @param {Object} callback
			 */
		case "waterregionWaterquotaList":
			axios({
				url: host + "/waterregionWaterquotaList",
				method: 'get',
				data: qs.stringify(params),
			}).then((response) => {
				if (callback) {
					callback(response);
				}
			})
			break;
			/**
			 * 区域信息单条查询
			 * @param {number} params : id
			 * @param {Object} callback
			 */
		case "waterregion":
			axios({
				url: host + "/wsis/api/waterregion/" + params,
				method: 'get',
			}).then((response) => {
				if (callback) {
					callback(response);
				}
			})
			break;
			/**
			 * 水表综合漏损指数
			 * @param {Object} params :{watermeterid 水表ID, time 时间(yyyy-MM-dd)}
			 * @param {Object} callback
			 */
		case "waterMeter":
			axios({
				url: host + "/logWatermeter/LeakageIndex",
				method: 'get',
				data: qs.stringify(params),
			}).then((response) => {
				if (callback) {
					callback(response);
				}
			})
			break;
			/**
			 * 建筑综合漏损指数
			 * @param {Object} params :{buildingid  建筑ID， time   时间（yyyy-MM-dd）}
			 * @param {Object} callback
			 */
		case "bulid":
			axios({
				url: host + "/building/LeakageIndex",
				method: 'get',
				data: qs.stringify(params),
			}).then((response) => {
				if (callback) {
					callback(response);
				}
			})
			break;
	}

}

export {
	leakagelndex
}
