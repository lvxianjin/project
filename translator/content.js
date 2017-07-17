installHelper(window,'$');
$.log(true);
var getDialog = (function(){
	var wordsDlgInstance = null;
	var wordDlgInstance = null;
	function WordsDlg(){
		this.width = '430px';
		this.container = $.create('div').setStyle(['background','box-shadow','padding','font-size'],['rgb(240,240,240)','3px 3px 5px rgb(211,211,211)','5px','12px']);
		this.source = $.create('div').setStyle('white-space','initial');
		this.btnContainer = $.create('div');
		this.result = $.create('div');
		this.myWordsBtn = $.create('button').setAttr('innerText','我的词库').setStyle(['width','height','display','float','border-width'],['100px','25px','block','left','0px 0px 0px 0px']);
		this.myWordsLink = $.create('a').setAttr(['href','target'],['http://localhost:8080/WordManager/viewAccordingToTime.jsp','_blank']);
	}
	WordsDlg.prototype.init = function(){
		this.btnContainer.append(this.myWordsLink.append(this.myWordsBtn)).setStyle(['width','height','margin','border-top','border-bottom'],[this.width,'25px','3px 0px 3px 0px','1px solid rgb(211,211,211)','1px solid rgb(211,211,211)']);
		this.container.append(this.source).append(this.btnContainer).append(this.result).setStyle(['position','width','top','left'],['absolute',this.width,'-1000px','-1000px']).setAttr('id','extension-trans-words').appendTo($('<body>'),{index: 0});
	};
	WordsDlg.prototype.setData = function(data){
		this.source.setAttr('innerText',data.query.substring(0,38));		
		this.result.clean().append($.create('<label>基本解释</label>')).append($.create('br')).append($.create('label',{'innerText':(data.translation?data.translation:'这个翻不了！')}));
		return this;
	};
	WordsDlg.prototype.toHide = function(){
		this.container.setStyle(['left','top'],['-1000px','-1000px']);
	};
	WordsDlg.prototype.toSign = function(coordnt){
		this.container.setStyle(['left','top'],[coordnt.x+'px',coordnt.y+'px']);
	};

	function WordDlg(){
		WordsDlg.call(this);
		this.width = '270px';
		this.enWord = $.create('label');
		this.ukPronounce = $.create('label');
		this.usPronounce = $.create('label');
		this.ukImg = $.create('img').setStyle(['display','width','height'],['inline','20','20']);
		this.usImg = $.create('img').setStyle(['display','width','height'],['inline','20','20']);
		this.saveBtn = $.create('button');
	}
	WordDlg.prototype.init = function(){
		var that = this;
		this.saveBtn.setAttr('innerText','保存').setStyle(['width','height','display','float','margin-right','border-width'],['50px','25px','block','left','20px','0px 0px 0px 0px']).addEvent('click',function(e){
			console.log('zhs:'+that.zhs+'alphabetUK:'+that.ukPronounce.getAttr('innerText'));
			chrome.runtime.sendMessage({
				type:'save',
				msg:{
					text_English:that.enWord.getAttr('innerText'),
					text_Chinese:that.zhs.join(''),
					alphabetUK:that.ukPronounce.getAttr('innerText'),
					alphabetUS:that.usPronounce.getAttr('innerText'),
					sourceUrl:window.location.href
				}
			}, function(res){
				var tip;
				if(res == '1'){
					tip = '保存成功！';
				}
		  		else if(res == '2')
		  			tip = '请保持插件登录状态！';
		  		else if(res == '-1')
		  			tip = '服务器错误，保存失败！';
	  			//$.create('<div style="position:absolute;left:'+parseInt(window.scrollX+window.innerWidth/2-30)+'px;top:'+parseInt(window.scrollY+window.innerHeight/3)+'px;font-size:20px;line-height:20px;height:20px;border-width:1px;border-color:gray;">'+failTip+'</div>')
				//.appendTo($('<body>'),{index: 0}).fade(1000,800,'deep');
				$.tip({
					tip: tip,
					color: 'rgb(193,33,39)',
					border: '',
					last: 1000,
					die: 500,
					top: parseInt(window.scrollY+2*window.innerHeight/3+70)+'px',
					left: parseInt(window.scrollX+window.innerWidth/2 - 100)+'px'		
				});		  		
			});
		}).addEvent('mouseup',function(e){
			e.stopPropagation();
			getWordDialog().container.mouseDownTag = false;
		});
		this.source.append(this.enWord).append(this.ukPronounce).append(this.ukImg).append(this.usPronounce).append(this.usImg);
		this.btnContainer.append(this.saveBtn).append(this.myWordsLink.append(this.myWordsBtn)).setStyle(['width','height','margin','border-top','border-bottom'],[this.width,'25px','3px 0px 3px 0px','1px solid rgb(211,211,211)','1px solid rgb(211,211,211)']);
		this.container.append(this.source).append(this.btnContainer).append(this.result).setStyle(['position','width','top','left'],['absolute',this.width,'-1000px','-1000px']).setAttr('id','extension-trans-word').appendTo($('<body>'),{index: 0});
	};
	WordDlg.prototype.setData = function(data){
		this.enWord.setAttr('innerText',data.query).setStyle(['display','float','margin-right'],['inline','left','15px']);
		this.ukPronounce.setAttr('innerText',(data.basic && data.basic.ukPronounce) ? '英：'+data.basic.ukPronounce:'').setStyle(['display','float','margin-right'],['inline','left','10px']);
		this.usPronounce.setAttr('innerText',(data.basic && data.basic.usPronounce) ? '美：'+data.basic.usPronounce:'').setStyle(['display','float','margin-right'],['inline','left','10px']);
		this.result.clean().append($.create('<label>基本解释</label>')).append($.create('br'));
		for(var i=0 ; i<(data.basic && data.basic.explains ? data.basic.explains.length:0) ;i++){
			this.result.append($.create('label',{'innerText':data.basic.explains[i]})).append($.create('br'));
		}
		this.zhs = (data.basic && data.basic.explains)?data.basic.explains:[''];
		console.log(this.zhs);
		this.result.append($.create('br')).append($.create('<label>网络解释</label>')).append($.create('br'));
		for(i=0 ; i<(data.web?data.web.length:0) ; i++){
			this.result.append($.create('label',{'innerText':data.web[i].key+'  '+data.web[i].value.join(' ')})).append($.create('br'));
		}
		return this;
	};
	WordDlg.prototype.toHide = function(){
		this.container.setStyle(['left','top'],['-1000px','-1000px']);
		return this;
	};
	WordDlg.prototype.toSign = function(coordnt){
		this.container.setStyle(['left','top'],[coordnt.x+'px',coordnt.y+'px']);
		return this;
	};

	return {
		getWordsDialog : function(){
			if(wordsDlgInstance){
				return wordsDlgInstance;
			}
			wordsDlgInstance = new WordsDlg();
			wordsDlgInstance.init();
			return wordsDlgInstance;
		},
		getWordDialog : function(){
			if(wordDlgInstance){
				return wordDlgInstance;
			}
			wordDlgInstance = new WordDlg();
			wordDlgInstance.init();
			return wordDlgInstance;
		}
	};
})();
var getWordsDialog = getDialog.getWordsDialog;
var getWordDialog = getDialog.getWordDialog;
delete getDialog;

function getFirstWord(str){
	var begin = -1;
	var wordsFlag = false;
	for(var i=0;i<str.length;i++){
		var codeIndex = str.charCodeAt(i);
		if((codeIndex>=97 && codeIndex<=122) || (codeIndex>=65 && codeIndex<=90)){
			begin = begin==-1?i:begin;
		}else if(begin!=-1){
			break;
		}
	}
	if(begin == -1)
		return {str:''};
	if(i == str.length)
		return {str:str.substring(begin,i)};
	for(var j=i+1;j<str.length;j++){
		var codeIndex = str.charCodeAt(j);
		if((codeIndex>=97 && codeIndex<=122) || (codeIndex>=65 && codeIndex<=90)){
			wordsFlag = true;
			break;
		}
	}
	if(wordsFlag != true)
		return {str:str.substring(begin,i)};
	return {str:str,words:true};
}
function getCoordinate (e,dlgRect){
	var ordinaryX = e.clientX + 5;
	var ordinaryY = e.clientY - 110;
	if(window.innerWidth <= ordinaryX + dlgRect.width + 5){
		ordinaryX = window.innerWidth - dlgRect.width - 5;
	}
	if(window.innerHeight <= ordinaryY + dlgRect.height + 5){
		ordinaryY = window.innerHeight - dlgRect.height - 5;
	}else if(0 >= ordinaryY -5){
		ordinaryY = 5;
	}
	return {x:ordinaryX + window.scrollX + 5, y:ordinaryY + window.scrollY + 5};
};
$(document).addEvent('mouseup',function(event){
	var selection = window.getSelection();
	var str = selection.toString();
	//var protocol = window.location.href.substring(0,5)=='https'?'https':(window.location.href.substring(0,4)=='http'?'http':'');	
	
	if(str.length === 0){
		if(getWordsDialog.hasElment){
			if(getWordsDialog().container.mouseDownTag == false){
				getWordsDialog().toHide();
			}
			else
				getWordsDialog().container.mouseDownTag = false;
		}
		if(getWordDialog.hasElment){
			if(getWordDialog().container.mouseDownTag == false)
				getWordDialog().toHide();
			else
				getWordDialog().container.mouseDownTag = false;
		}
		return;
	}
	var strObj = getFirstWord(str);
	if(strObj.str.length === 0){
		if(getWordsDialog.hasElment)
			if(getWordsDialog().container.mouseDownTag == false)
				getWordsDialog().toHide();
			else
				getWordsDialog().container.mouseDownTag = false;
		if(getWordDialog.hasElment)
			if(getWordDialog().container.mouseDownTag == false)
				getWordDialog().toHide();
			else
				getWordDialog().container.mouseDownTag = false
		return;
	}
	if(strObj.words){
		chrome.runtime.sendMessage({
			type:'translate',
			msg:{text:strObj.str}
		}, function(response){
	  		console.log(response.data);
	  		if(!getWordsDialog.hasElment){
	  			getWordsDialog().container.addEvent('mousedown',function(e){
	  				getWordsDialog().container.mouseDownTag = true;
	  				getWordsDialog().container.mouseDownX = e.clientX;
	  				getWordsDialog().container.mouseDownY = e.clientY;
	  			});
	  			getWordsDialog().container.addEvent('mousemove',function(e){
	  				if(getWordsDialog().container.mouseDownTag === true){
	  					var container = getWordsDialog().container;
	  					var x = e.clientX - container.mouseDownX + parseInt(container.getStyle('left'));
	  					var y = e.clientY - container.mouseDownY + parseInt(container.getStyle('top'));
						container.mouseDownX = e.clientX;
	  					container.mouseDownY = e.clientY;  					
	  					container.setStyle(['top','left'],[y+'px',x+'px']);
	  				}
	  			});
	  		}
	  		if(response.errorCode === 0){
	  			getWordsDialog().setData(response).toSign(getCoordinate(event,getWordDialog().container.element.getBoundingClientRect()));
	  		}	
	  		getWordsDialog.hasElment = true;
	  		
		});
	}else{
		chrome.runtime.sendMessage({
			type:'translate',
			msg:{text:strObj.str}
		}, function(response){
	  		if(!getWordDialog.hasElment){
	  			getWordDialog().container.addEvent('mousedown',function(e){
	  				getWordDialog().container.mouseDownTag = true;
	  				getWordDialog().container.mouseDownX = e.clientX;
	  				getWordDialog().container.mouseDownY = e.clientY;
	  			});
	  			getWordDialog().container.addEvent('mousemove',function(e){
	  				if(getWordDialog().container.mouseDownTag === true){
	  					var container = getWordDialog().container;
	  					var x = e.clientX - container.mouseDownX + parseInt(container.getStyle('left'));
	  					var y = e.clientY - container.mouseDownY + parseInt(container.getStyle('top'));
	  					container.mouseDownX = e.clientX;
	  					container.mouseDownY = e.clientY;
	  					container.setStyle(['top','left'],[y+'px',x+'px'])
	  				}
	  			});
	  		}
	  		console.log(response.data);
	  		if(response.errorCode === 0){
		  		getWordDialog().setData(response).toSign(getCoordinate(event,getWordDialog().container.element.getBoundingClientRect()));
	  		}
	  		getWordDialog.hasElment = true;
		});
	}
	getWordsDialog().container.mouseDownTag = false;
	getWordDialog().container.mouseDownTag = false
});
