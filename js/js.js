console.log('ontouchstart' in window);

var imgData=[
	{'src':'bg1.jpg'},
	{'src':'bg2.jpg'},
	{'src':'bg3.jpg'},
	{'src':'bg4.jpg'},
	{'src':'bg5.jpg'}
]

function TouchSlider(opt){
	this.wrap = document.getElementById(opt.wrap);
	this.imgData = (function(arr,root){
		arr.forEach(function(v,i){
			arr[i] = root + v.src;	
		});
		return arr;
	})(opt.imgData,opt.root);
	this.page = 0;
	this.init();
	this.renderDom();
	this.bindDom();
	return this;
}
TouchSlider.prototype.init = function(){
	var node = document.body || document.documentElement;
	console.log(node.scrollHeight);
	console.log(node.clientHeight);
	this.h = node.clientHeight;
	var wrap = this.wrap;
}
TouchSlider.prototype.renderDom = function(){
	var $li = $('li');
	var w = this.h;
	//$(li).css({'-webkit-transform':'translate3d('+i*node.clientWidth+'px,0,0)'})
	$li.css({'-webkit-transform':'translate3d(0,0,0)'});
	$li.eq(this.page).show().siblings().hide();
	this.nextPage = (function(idx){
		if(idx==$li.size()-1){		
			return $li.eq(0).show().css({'-webkit-transform':'translate3d(0,'+w+'px,0)'});
		}else{
			return $li.eq(idx+1).show().css({'-webkit-transform':'translate3d(0,'+w+'px,0)'});
		}
	})(this.page);		
	this.prevPage = (function(idx){
		if(idx==0){
			return $li.eq(-1).show().css({'-webkit-transform':'translate3d(0,'+-w+'px,0)'});
		}else{
			return $li.eq(idx-1).show().css({'-webkit-transform':'translate3d(0,'+-w+'px,0)'});
		}
	})(this.page);
	this.currentPage = $li.eq(this.page);	
}
TouchSlider.prototype.bindDom = function(){
	var _this = this;
	var start = function(e){
		var $li = $('#list').find('li');
		_this.s_x = e.touches[0].pageX;
		_this.s_y = e.touches[0].pageY;
		console.log(_this.page);

	}
	var move = function(e){
		e.preventDefault();
		_this.m_x = e.touches[0].pageX;
		_this.m_y = e.touches[0].pageY;
		_this.disX = _this.m_x-_this.s_x;
		_this.disY = _this.m_y-_this.s_y;
		$(this).css({'-webkit-transform':'translate3d(0,'+_this.disY+'px,0)'})	
		_this.nextPage.css({'-webkit-transform':'translate3d(0,'+(_this.h+_this.disY)+'px,0)'});
		_this.prevPage.css({'-webkit-transform':'translate3d(0,'+(_this.disY-_this.h)+'px,0)'});	
	}
	var end = function(e){
		console.log(_this.s_y);
		console.log(_this.m_y);
		if(Math.abs(_this.disY)>30){  //滑动达到翻页距离
			_this.pageTurn();
		}
		else{	//距离不够，翻页失败
			_this.currentPage.animate({'-webkit-transform':'translate3d(0,0,0)'},200)
			_this.nextPage.animate({'-webkit-transform':'translate3d(0,'+_this.h+'px,0)'},200)
			_this.prevPage.animate({'-webkit-transform':'translate3d(0,'+ -_this.h+'px,0)'},200)
		}
	}
	$(document).on("touchstart","#section li",start);
	$(document).on("touchmove","#section li",move);
	$(document).on("touchend","#section li",end);	
}
TouchSlider.prototype.pageTurn = function(){
	var _this = this;
	if(_this.m_y>_this.s_y){  //右滑
		if(_this.page==0){
			_this.page = $('li').size()-1;
		}else{
			_this.page--;
		}		
		_this.currentPage.animate({'-webkit-transform':'translate3d(0,'+ _this.h+'px,0)'},200);
		_this.prevPage.animate({'-webkit-transform':'translate3d(0,0,0)'},200,function(){
			_this.renderDom();
		})
	}
	else if(_this.m_y<_this.s_y){  //左滑
		if(_this.page==$('li').size()-1){
			_this.page = 0;
		}else{
			_this.page++;
		}
		_this.currentPage.animate({'-webkit-transform':'translate3d(0,'+ -_this.h+'px,0)'},200);
		_this.nextPage.animate({'-webkit-transform':'translate3d(0,0,0)'},200,function(){
			_this.renderDom();
		})
	}
	_this.pageIn();
}
//每页的动效
TouchSlider.prototype.pageIn = function(){
	var page = this.page;
	$('#section li').eq(page).addClass('current').siblings().removeClass('current');
}
