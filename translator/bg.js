installHelper(window,'$');
var bdStatus = {
		key : 'kkYBrAsfF_7db6BAOPrD',
	    appid : '20161201000033205',
	 	salt : 123,
		http : "http://api.fanyi.baidu.com/api/trans/vip/translate",
		https : "https://fanyi-api.baidu.com/api/trans/vip/translate"
	},
	ydStatus = {
		key : '2121366632',
		keyFrom : 'chr-trans-manager',
		type : 'data',
		version : '1.1',
		http : 'http://fanyi.youdao.com/openapi.do'
	},
	icbStatus = {
		key : '24625AAC8636010299D4CC652932CB33',
		http : "http://dict-co.iciba.com/api/dictionary.php" 
	};
var saveUrl = 'http://localhost:8080/WordManager/ExtensionSaveWord';
chrome.runtime.onMessage.addListener(
function(msg, sender, sendResponse){
	if(msg.type == 'translate'){
	    $.getAjax(ydStatus.http ,{
			q : msg.msg.text,
			type : ydStatus.type,
			version : ydStatus.version,
			doctype : 'json',
			key : ydStatus.key,
			keyfrom : ydStatus.keyFrom
		},function(data){
			data = data.replace('us-phonetic','usPronounce');
			data = data.replace('uk-phonetic','ukPronounce');
			var dataObj = JSON.parse(data);
			dataObj.data = data;
			sendResponse(dataObj);
		});
		/*$.getAjax(bdStatus.http,{
			q: msg.msg.text,
			from: 'en',
			to: 'zh',
			appid: bdStatus.appid,
			salt: bdStatus.salt,
			sign: md5(bdStatus.appid+msg.msg.text+bdStatus.salt+bdStatus.key)
		},function(data){
			var dataObj = JSON.parse(data);
			dataObj.data = data;
			sendResponse(dataObj);
		},{encodeURI: true});*/
		/*$.getAjax(icbStatus.http,{
			w : msg.msg.text,
			key : icbStatus.key,
			type : 'json'
		},function(data){
			var dataObj = JSON.parse(data);
			dataObj.data = data;
			sendResponse(dataObj);
		});*/
	}else if(msg.type == 'save'){
		$.getAjax(saveUrl,msg.msg,function(data){
			sendResponse(data);
		});
	}
	return true;
});