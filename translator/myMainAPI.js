Function.prototype.method = function(name,fn){
	this.prototype[name] = fn;
	return this;
};
//version 1.3
//$('<li>' | '.a').replaceChildNode(newNode,oldNode,number).removeSelfNode(numberA,numberB_?).addEvent('click',fn,true_?,nember_?).removeEvent('click',fn,true_?,nember_?).setAttr('innerHTML','aaa',number_?).getAttr('innerHTML',number_?).setStyle('color','red',number_?).removeSelf(numberA,numberB_?);
//$('#a' | element).removeChildNode(node|number).appendChildNode(Node,number_?).replaceChildNode(node,child).removeSelfNode().addEvent('click',fn,true_?).removeEvent('click',fn,true_?).setAttr('innerHTML','aaa').getAttr('innerHTML').setStyle('color','red');
(function(){
	function _$(arg){
		if(typeof arg[0] === 'object'){
		 	if(!(arg[0] instanceof HTMLElement) && !(arg[0] instanceof HTMLDocument))
		 		this.element = null;
			else
				this.element = arg[0];
		}else if(typeof arg[0] === 'string'){
			if(arg[0][0] == '#'){
				this.element = document.getElementById(arg[0].substring(1));
			}
			else if(arg[0][0] == '.'){
				this.element = document.getElementsByClassName(arg[0].substring(1));
			}
			else if(arg[0][0] == '<' && arg[0][arg[0].length-1] == '>'){
				this.element = document.getElementsByTagName(arg[0].substring(1,arg[0].length-1));
			}
		}else{
			this.element = null;
		}
	}
	
	function addEvent(type,fn){
		if(this.element === null){
			if(_$.log)
				console.log('function addEvent: this.element is null.');
			return this;
		}
		if(this.element.length){
			if(arguments.length == 2){
				for(var i=0,len=this.element.length;i<len;i++){
					this.element[i].addEventListener(type,fn,false);
				}
			}
			else if(arguments.length > 2 && arguments[2] === true ){
				if(arguments.length == 4 && typeof arguments[3] == 'number'){
					if(arguments[3]<this.element.length){
						this.element[arguments[3]].addEventListener(type,fn,true);
					}
				}
				else{
					for(var i=0,len=this.element.length;i<len;i++){
						this.element[i].addEventListener(type,fn,true);
					}
				}
			}
			else if(arguments[2] instanceof Number){
				if(arguments[2]<this.element.length){
					this.element[arguments[2]].addEventListener(type,fn,false);
				}
			}
		}
		else if(typeof this.element === 'object'){
			if(arguments.length == 3 && arguments[2] === true){
				this.element.addEventListener(type,fn,true);
			}
			else{
				this.element.addEventListener(type,fn,false);
			}
		}
		return this;
	}
	function removeEvent(type,fn){
		if(this.element === null){
			if(_$.log)
				console.log('function removeEvent: this.element is null.');
			return this;
		}
		if(this.element.length){
			if(arguments.length == 2){
				for(var i=0,len=this.element.length;i<len;i++){
					this.element[i].removeEventListener(key,fn,false);
				}
			}
			else if(arguments.length > 2 && arguments[2] === true ){
				if(arguments.length == 4 && typeof arguments[3] == 'number'){
					if(arguments[3]<this.element.length){
						this.element[arguments[3]].removeEventListener(key,fn,true);
					}
				}
				else{
					for(var i=0,len=this.element.length;i<len;i++){
						this.element[i].removeEventListener(key,fn,true);
					}
				}
			}
			else if(arguments[2] instanceof Number){
				if(arguments[2]<this.element.length){
					this.element[arguments[2]].removeEventListener(key,fn,false);
				}
			}
		}
		else if(typeof this.element === 'object'){
			if(arguments.length == 3 && arguments[2] === true){
				this.element.removeEventListener(type,fn,true);
			}
			else{
				this.element.removeEventListener(type,fn,false);
			}
		}
		return this;
	}
	function setAttr(prop,val){
		if(this.element === null){
			if(_$.log)
				console.log('function setAttr: this.element is null.');
			return this;
		}
		if(this.element instanceof HTMLCollection){
			if(arguments.length == 3 && arguments[2] instanceof Number){
				if(prop.length && val.length && prop.length == val.length){
					for(var i=0,len=prop.length;i<len;i++){
						this.element[arguments[2]][prop[i]] = val[i];
					}
				}
				else if(typeof prop == 'string' && typeof val == 'string'){
					this.element[arguments[2]][prop] = val;
				}
			}
			else if(arguments.length == 2){
				if(prop.length && val.length && prop.length == val.length){
					for(var i=0,len=this.element.length;i<len;i++){
						for(var j=0;j<prop.length;j++){
							this.element[i][prop[j]] = val[j];
						}
					}
				}
				else if(typeof prop == 'string' && typeof val == 'string'){
					for(var i=0,len=this.element.length;i<len;i++){
						this.element[i][prop] = val;
					}
				}
			}
		}
		else if(this.element instanceof HTMLElement){
			if(prop.length && val.length && prop.length == val.length){
				for(var i=0;i<prop.length;i++){
					this.element[prop[i]] = val[i];
				}
			}else if(typeof prop == 'string'){
				this.element[prop] = val;
			}
		}
		return this;
	}
	function getAttr(prop){		
		if(this.element === null){
			if(_$.log)
				console.log('function getAttr: this.element is null.');
			return this;
		}
		if(this.element.length){
			if(arguments.length == 1){
				return this.element[0][prop];
			}
			else if(arguments.length == 2 && arguments[1] instanceof Number){
				return this.element[arguments[1]][prop];
			}
		}
		else if(typeof this.element == 'object'){
			return this.element[prop];
		}
	}
	function setStyle(prop,value,index){
		if(this.element === null){
			if(_$.log)
				console.log('function setStyle: this.element is null.');
			return this;
		}
		if(this.element instanceof HTMLCollection){
			if((typeof prop === 'string') && (typeof prop === 'string')){
				if(typeof index === 'number'){
					this.element[index].style[prop] = value;
				}
				else{
					for(var i=0,len=this.element.length;i<len;i++){
						this.element[i].style[prop] = value;
					}
				}
			}
			else if(prop instanceof Array && value instanceof Array){
				if(typeof index === 'number'){
					for(var i=0,len=prop.length;i<len;i++){
						this.element[index].style[prop[i]] = value[i];
					}
				}
				else{
					for(var i=0,len=this.element.length;i<len;i++){
						for(var j=0,lens=prop.length;j<lens;j++){
							this.element[i].style[prop[j]] = value[j];
						}
					}
				}
			}
		}
		else if(this.element instanceof HTMLElement){
			if((typeof prop === 'string') && (typeof value === 'string')){
				this.element.style[prop] = value;
			}
			else if(prop instanceof Array && value instanceof Array){
				for(var i=0;i<prop.length;i++){
					this.element.style[prop[i]] = value[i];
				}
			}
		}
		return this;
	}
	function getStyle(prop,index){
		if(this.element === null){
			if(_$.log)
				console.log('function setStyle: this.element is null.');
			return this;
		}
		if(this.element instanceof HTMLCollection){
			if(prop instanceof Array){
				if(typeof index !== 'number'){
					var valuesCollection = [];
					for(var j=0;j<this.element.length;j++){
						var values = [];
						for(var i=0;i<prop.length;i++){
							values.push(this.element[j].style.prop[i]);
						}
						valuesCollection.push(values);
					}
					return valuesCollection;
				}else{
					var values = [];
					if(index<0 || index >= this.element.length){
						if(_$.log)
							console.log('index over bounding: expects index between 0 and'+(this.element.length-1)+',but got '+index);
						return;
					}
					for(var i=0;i<prop.length;i++){
						values.push(this.element[index].style.prop[i]);
					}
					return values;
				}
			}else{
				if(typeof index !== 'number'){
					var values = [];
					for(var i=0;i<this.element.length;i++){
						values.push(this.element[i].style[prop]);
					}
					return values;
				}else{
					if(index<0 || index >= this.element.length){
						if(_$.log)
							console.log('index over bounding: expects index between 0 and'+(this.element.length-1)+',but got '+index);
						return;
					}
					return this.element[index].style[prop];
				}
			}
		}else if(this.element instanceof HTMLElement){
			if(prop instanceof Array){
				var values = [];
				for(var i=0;i<prop.length;i++){
					values.push(this.element.style.prop[i]);
				}
				return values;
			}else{
				return this.element.style[prop];				
			}
		}
	}
	function append(node,opt){//opt:{before:node|index,index(for HTMLCollection):2}		
		if(this.element === null){
			if(_$.log)
				console.log('function append: this.element is null.');
			return this;
		}
		if(!(node instanceof _$) && !(node instanceof HTMLElement)){
			if(_$.log)
				console.log('function append: TypeError: arguments expects [_$ | HTMLElement,object(optional)],but got ['+(typeof node)+','+(typeof opt)+'].');
			return this;
		}
		var element;
		if(this.element instanceof HTMLCollection){//element数组
			if(typeof opt != 'object'){
				for(var i=0;i<this.element.length;i++){
					element = (node instanceof _$) ? node.element.cloneNode(true) : node.cloneNode(true);
					this.element[i].appendChild(element);
				}
				if(!(node instanceof _$))
					$(node).removeSelf();
				else
					node.removeSelf();
			}else if(typeof opt.index =='number' && opt.index < this.element.length && opt.index >= 0){
				element = (node instanceof _$) ? node.element : node;
				if(opt.before instanceof HTMLElement){
					this.element[opt.index].insertBefore(element,opt.before);
				}else if(typeof opt.before === 'number' && opt.before >=0 && opt.before < this.element.children.length){				
					this.element[opt.index].insertBefore(element,this.element[opt.index].children[before]);
				}else{
					this.element[opt.index].appendChild(element);
				}
			}else{

				if(opt.before instanceof HTMLElement){
					for(var i=0;i<this.element.length;i++){
						element = (node instanceof _$) ? node.element.cloneNode(true) : node.cloneNode(true);
						this.element[i].insertBefore(element,opt.before);
					}
				}else if(typeof opt.before === 'number' && opt.before >=0 && opt.before < this.element.children.length){
					for(var i=0;i<this.element.length;i++){
						element = (node instanceof _$) ? node.element.cloneNode(true) : node.cloneNode(true);
						this.element[i].insertBefore(element,this.element[index].children[before]);
					}
				}else{
					for(var i=0;i<this.element.length;i++){
						element = (node instanceof _$) ? node.element.cloneNode(true) : node.cloneNode(true);
						this.element[i].appendChild(element);
					}
				}
				if(!(node instanceof _$))
					$(node).removeSelf();
				else
					node.removeSelf();
			}
		}
		else{
			element = (node instanceof _$) ? node.element : node;
			if(typeof opt != 'object'){
				this.element.appendChild(element);
			}else if(opt.before instanceof HTMLElement){
				this.element.insertBefore(element,opt.before);
			}else if(typeof opt.before === 'number' && opt.before >=0 && opt.before < this.element.children.length){
				this.element.insertBefore(element,this.element.children[before]);
			}
		}
		return this;
	}
	function appendTo(node,opt){
		if(this.element === null){
			if(_$.log)
				console.log('function setAttr: this.element is null.');
			return this;
		}
		if(!(this.element instanceof HTMLElement)){
			if(_$.log)
				console.log('function appendTo: this.element should be a instance of HTMLElement,but got a instance of HTMLCollection.');
			return this;
		}
		if(node instanceof _$){
			node.append(this.element,opt);
		}else if(node instanceof HTMLElement){
			node.appendChild(this.element);
		}
		return this;
	}
	function removeChild(node){
		if(this.element === null){
			if(_$.log)
				console.log('function removeChild: this.element is null.');
			return this;
		}
		if(typeof node === 'object'){
			this.element.removeChild(node);
		}
		else if(typeof node === 'number'){
			this.element.removeChild(this.element.childNodes[node]);
		}
		return this;
	} 
	function replaceChild(newNode,oldNode){
		if(this.element === null){
			if(_$.log)
				console.log('function replaceChild: this.element is null.');
			return this;
		}
		if(this.element instanceof Object){
			this.element.replaceChild(newNode,oldNode);
		}
		else if(this.element instanceof Array){
			if(arguments.length == 3 && typeof arguments[2] === 'number'){
				if(arguments[2]>0 && arguments[2]<this.element.length){
					this.element[arguments[2]].replaceChild(newNode,oldNode);
				}
			}
		}
		return this;
	}
	function removeSelf(opt){//{from: ,to: ,clean:true|false}
		if(this.element === null){
			if(_$.log)
				console.log('function removeSelf: this.element is null.');
			return this;
		}
		if(this.element instanceof HTMLElement){
			this.element.parentNode.removeChild(this.element);
			if(opt && opt.clean){
				delete this.element;
			}
		}
		else if(this.element instanceof HTMLCollection){
			if(opt && (typeof opt.from === 'number') && opt.from>=0 && opt.from<this.element.length){				
				this.element[0].parentNode.removeChild(this.element[opt.from]);
				if(opt && opt.clean){
					delete this.element[opt.from];
				}
			}
			else if((typeof opt.from === 'number') && (typeof opt.to === 'number') && opt.from >= 0 && opt.from<=opt.to && opt.to < this.element.length){
				for(var i=0;i<opt.to-opt.from;i++){
					this.element[0].parentNode.removeChild(this.element[opt.from]);
					if(opt && opt.clean){
						delete this.element[opt.from];
					}
				}
			}
		}
		return this;
	}
	function clean(){
		if(this.element === null){
			if(_$.log)
				console.log('function removeSelf: this.element is null.');
			return this;
		}
		while(this.element.firstChild){
			this.element.removeChild(this.element.firstChild);
		}
		return this;
	}
	function fade(last,die,cleanType){
		var that = this;
		setTimeout(function(){
			if(die <= 0){
				if(typeof cleanType === 'undefined'){					
					that.setStyle('opacity',0);
				}else if(cleanType == 'remove'){
					that.removeSelf();
				}
				else if(cleanType == 'deep'){
					that.removeSelf({clean:true});
				}
			}else{
				if(that.getStyle('opacity',0) === '')
					that.setStyle('opacity',1);
				var opacity = that.element.style.opacity - 40/die;
				var timer = setInterval(function(){
					console.log(that.element.style.opacity);
					if(opacity < 40/die)
						opacity = 0;
					if(that.element instanceof HTMLElement){
						that.element.style.opacity = opacity;
					}
					else if(that.element instanceof HTMLCollection){
						for(var i=0;i<that.element.length;i++){
							that.element[i].style.opacity = opacity;
						}
					}
					if(opacity == 0){
						if(cleanType == 'remove'){
							that.removeSelf();
						}
						else if(cleanType == 'deep'){
							that.removeSelf({clean:true});
						}
						clearInterval(timer);
					}else{
						opacity -= 40/die;
					}
				},40);
			}
		},last);
		return this;
	}
	function getAjax(url,data,fn,info){
		var a_sync = true;
		var XHR = new XMLHttpRequest();
		XHR.onreadystatechange = function(){
			if(XHR.readyState == 4 && XHR.status == 200){
				if(typeof fn == 'function'){
					fn(XHR.responseText || XHR.responseXML);
				}
			}
		};
		if(typeof data == 'object'){
			var datas = [];
			//var firstFlag = true;
			for(var key in data){
				if(data[key] instanceof Object)
					continue;
				//datas.push(firstFlag?(firstFlag=false).toString().slice(1,0):'&'+key+'='+data[key]);
				datas.push(key+'='+data[key]);
			}
			data = datas.join('&');
		}
		if(info){
			if(info.encodeURI)
				data = encodeURI(data);
			if(info.a_sync == false)
				a_sync = false;
		}
		XHR.open('GET',url+(data==''?'':('?'+data)),a_sync);
		XHR.setRequestHeader('X-Requested-With','XMLHttpRequest');
		if(info && info.headers){
			for(var i=0;i<info.headers.length;i++){
				XHR.setRequestHeader(info.headers[i][0],info.headers[i][1]);
			}
		}
		XHR.send();
	}
	function postAjax(url,data,fn,info){
		var a_sync = true;
		var XHR = new XMLHttpRequest();
		XHR.onreadystatechange = function(){
			if(XHR.readyState == 4 && XHR.status == 200){
				if(typeof fn == 'function'){
					fn(XHR.responseText || XHR.responseXML);
				}
			}
		};
		if(typeof data == 'object'){
			var datas = [];
			//var firstFlag = true;
			for(var key in data){
				if(data[key] instanceof Object)
					continue;
				//datas.push(firstFlag?(firstFlag=false).toString().slice(1,0):'&'+key+'='+data[key]);
				datas.push(key+'='+data[key]);
			}
			data = datas.join('&');
		}
		if(info){
			if(info.encodeURI)
				data = encodeURI(data);
			if(info.a_sync == false)
				a_sync = false;
		}
		XHR.open('POST',url,a_sync);
		XHR.setRequestHeader('X-Requested-With','XMLHttpRequest');
		XHR.setRequestHeader("Content-type","application/x-www-form-urlencoded");
		if(info && info.headers){
			for(var i=0;i<info.headers.length;i++){
				XHR.setRequestHeader(info.headers[i][0],info.headers[i][1]);
			}
		}
		XHR.send(data);
	}
	function ajax(object){//url,async,data,type,success
		var XHR = new XMLHttpRequest();
		XHR.onreadystatechange = function(){
			if(XHR.readyState == 4 && XHR.status == 200){
				object.success(XHR.responseText || XHR.responseXML);
			}
		};
		if(object.type == 'GET'){
			if(object.async === false)
				XHR.open('GET',object.url+(object.data==''?'':('?'+object.data)),false);
			else
				XHR.open('GET',object.url+(object.data==''?'':('?'+object.data)),true);
			XHR.setRequestHeader('X-Requested-With','XMLHttpRequest');
			XHR.send();
			
		}
		else if(object.type == 'POST'){
			if(object.async == false)
				XHR.open("POST",url,false);
			else
				XHR.open("POST",url,true);
			XHR.setRequestHeader('X-Requested-With','XMLHttpRequest');
			XHR.setRequestHeader("Content-type","application/x-www-form-urlencoded");
			XHR.send(object.data);
		}
	}
	function create(tagStr,attr){
		if(typeof tagStr == 'object')
			return new _$([tagStr]);
		if(typeof tagStr != 'string'){
			if(_$.log)
				console.log('function create:TypeError: arguments expects [string,object(optional)],but got ['+(typeof tagStr)+','+(typeof attr)+'].');
			return new _$([null]);
		}
		if(tagStr.charAt(0) != '<' && tagStr.charAt(tagStr.length-1) != '>'){
			try{
				var elm = document.createElement(tagStr);
				if(attr && typeof attr == 'object'){
					for(var key in attr){
						elm[key] = attr[key];
					}
				}
				if(attr && typeof attr != 'object'){
					if(_$.log)
						console.log('function create:TypeError: arguments expects [string,object(optional)],but got ['+(typeof tagStr)+','+(typeof attr)+'].');
				}
				return new _$([elm]);
			}catch(e){
				console.log(e)
			}
			return new _$([null]);
		}else if(tagStr.charAt(0) == '<' && tagStr.charAt(tagStr.length-1) == '>'){
			if(!_$.elmContainer){
				_$.elmContainer = document.createElement('div');
			}
			try{
				_$.elmContainer.innerHTML = tagStr;
				return new _$([_$.elmContainer.removeChild(_$.elmContainer.firstElementChild)]);
			}catch(e){
				console.log(e);
			} 
			return new _$([null]);
		}else{
			return new _$([null]);
		}
	}
	function tip(opt){//{tip:,last:,die:,left:,top:,color:,borderColor:,background:,fontSize:,height:,width:}
		var temp = {};
		temp.tip = opt.tip || '';
		temp.last = opt.last || 1000;
		temp.die = opt.die || 0;
		temp.left = 'left:'+(opt.left ? opt.left:parseInt(window.scrollX+window.innerWidth/2-30)+'px')+';';
		temp.top = 'top:'+(opt.top ? opt.top:parseInt(window.scrollY+window.innerHeight/3)+'px')+';';
		temp.color = 'color:'+(opt.color ? opt.color:'black')+';';
		temp.background = 'background:'+(opt.background ? opt.background:'black')+';';
		temp.fontSize = 'font-size:'+(opt.fontSize ? opt.fontSize:'20px')+';';
		temp.lineHeight = 'line-height:'+(opt.height ? opt.height:'30px')+';';
		temp.height = 'height:'+(opt.height ? opt.height:'30px')+';';
		temp.width = opt.width ? ('width:'+opt.width+';' ):'';
		temp.padding = opt.padding ? ('padding:'+opt.padding+';'):'';
		temp.border = 'border:'+(opt.border ? opt.border:'1px solid black')+';';
		temp.borderRadius = 'border-radius:'+(opt.borderRadius ? opt.borderRadius:'3px')+';';		

		$.create('<div style="position:absolute;'+temp.left+temp.top+temp.color+temp.borderColor+temp.background+temp.fontSize+temp.height+temp.width+temp.padding+temp.border+temp.borderRadius+temp.lineHeight+'">'+temp.tip+'</div>')
		.appendTo($('<body>'),{index: 0}).fade(temp.last,temp.die,'deep');
	}
	function log(logFlag){
		if(logFlag)
			_$.log = true;
		else
			_$.log = false;
	}
	
	_$.log = false;
	_$.method('addEvent',addEvent).method('removeEvent',removeEvent).method('setAttr',setAttr).method('getAttr',getAttr).method('setStyle',setStyle).method('getStyle',getStyle).method('append',append).method('removeChild',removeChild).method('replaceChild',replaceChild).method('removeSelf',removeSelf).method('clean',clean).method('appendTo',appendTo).method('fade',fade);
	window.installHelper = function(scope,interface){
		scope[interface] = function(){
			return new _$(arguments);
		};
		scope[interface].addForFunc = function(name,value){
			this[name] = value;
			return this;
		};
		scope[interface].addForFunc('getAjax',getAjax).addForFunc('postAjax',postAjax).addForFunc('ajax',ajax).addForFunc('create',create).addForFunc('log',log).addForFunc('tip',tip);
	} 
	//installHelper(window,'$');
})();
