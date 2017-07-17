installHelper(window,'$');
$.log(true);
$('<body>').setStyle('width','250px');
$('#result').setStyle(['width','height','border','border-raduis'],['250px','100px','1px solid rgb(216,222,226)','2px']);
$('#loginContainer').setStyle(['width','height','border','border-raduis'],['250px','70px','1px solid rgb(216,222,226)','2px']);
$('#loginCanvas').setStyle(['width','height','margin'],['110px','70px','0px 70px 0px 70px']);
var loginCanvas = $('#loginCanvas').element;
loginCanvas.width = 110;
loginCanvas.height = 70;
var ctxt = loginCanvas.getContext('2d');
var url = 'http://localhost:8080/WordManager/';
function logIn(){
	var username = localStorage.getItem('username');
	var password = localStorage.getItem('password');

	$.getAjax(url+'ExtensionLogin',{
		username: username===null ? '':username,
		password: password===null ? '':password
	},function(data){
		data = JSON.parse(data);
		$('#loginCanvas').setStyle('display','none');
		$('#loginFail').setStyle('display','none');
		//stop draw;
		var failTip;
		if(data.status === 3 || data.status === 1){
			$('#user').setAttr('innerText','用户：'+data.username);
			$('#loginSuccess').setStyle('display','block');
			$('#loginfail').setStyle('display','none');
		}else if(data.status === 2){
			failTip = '缺少用户名或密码！';
		}else if(data.status === 0){
			failTip = '用户名或密码错误！';
		}else if(data.status === -1){
			failTip = '   服务器异常！   ';
		}
		if(data.status != 3 && data.status != 1){
			$.tip({
				tip: failTip,
				color: 'rgb(193,33,39)',
				border: '',
				last: 1000,
				die: 500,
				top: parseInt(window.scrollY+2*window.innerHeight/3+70)+'px',
				left: parseInt(window.scrollX+window.innerWidth/2 - 100)+'px'		
			});	
			$('#loginFail').setStyle('display','block');
		}
	});
}
logIn();
$('#login').addEvent('click',function(){
	localStorage.setItem('username',$('#username').getAttr('value'));
	localStorage.setItem('password',$('#password').getAttr('value'));
	logIn();
});
$('#logout').addEvent('click',function(){
	$.getAjax(url+'Logout','',function(data){
		if(data == '1' || data == '0'){
			$.create('<div style="position:absolute;left:100px;top:25px;font-size:20px;">已经注销！</div>')
			.appendTo($('#loginContainer')).fade(1000,800,'deep');
			$('#loginSuccess').setStyle('display','none');
			$('#loginFail').setStyle('display','block');
		}
	});
})
$('#register').addEvent('click',function(){
	
});