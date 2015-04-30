//写一个zepot扩展
var flushAnimate = window.flushAnimate = function(window){

	var page_m = $(".section_li").size(),
		page_n = 1,
		page_v = null,
 		v_h = 0,
 		i_flag = false,
 		p_flag = false,
 		t_i = null,
 		t_f = null,
 		t_m = null;

 	var init_v_h = function(){
		if(document.compatMode == "BackCompat")
			var Node = document.body;
		else
			var Node = document.documentElement;

		v_h = Math.max(Node.scrollHeight,Node.clientHeight);
		console.log(v_h);
		var m_h = $(".section_li").height();
		v_h = v_h > m_h ?v_h:m_h;
		//设置各种模块页面的高度，扩展到整个屏幕高度
		$(".section").height(v_h);
		//$(".m-index").height(v_h);
	 };

	var touch_s = function(e){
	 	if (e.type == "touchstart") {
			t_i = window.event.touches[0].pageY;
		} else {
			t_i = e.y || e.pageY;
		}
	 	t_f = t_i;
	 	fade(0,$('.p7 a'),0,300);
	 	fade(0,$('.p8 a'),0,300);
	 };

	var animate_m = function(){
		var topV = parseInt($(".section_li").eq(page_v-1).css("top"));
		var scale=1 || 1 - Math.abs((topV-v_h)*0.2/$(window).height());//缩放时的变量
		var ta=(topV-v_h)/5;//缩放时固定头部的变量
		if (p_flag) {//当向下移动
			console.log('pageN:%d',page_n);
			console.log('pageV:%d',page_v);
			if(page_n==1&&page_v==10){return;}
			var topVab=Math.abs(topV);//设置绝对值
			ta=Math.abs(topVab-v_h)/5;//缩放时固定头部的变量[ta值 0-96 ]
			scale=1-Math.abs((topVab-v_h)*0.2/$(window).height());//缩放时的变量[1-0.8]

		}
						
			if(page_n==10&&page_v==10){return;}
		// $(".section_li").eq(page_n-1).animate({scale: scale,translate:'0,'+ta+'px'},0,'');
			//展示 的页面
		// $(".section_li").eq(page_v-1).css({'top':topV+t_m-t_i});
		t_i = t_m;
	};

	var animate_i = function(){//初始化页面
		i_flag = true;
		p_flag = t_m - t_i > 0?true:false;

		if(p_flag){//向下移动
			if(page_n==1&&page_v==10){return;}
			if(page_n >1){
				page_v = page_n - 1 ;
			}else{
				page_v = page_m ;
			}
			$(".section_li").eq(page_v-1).addClass("active").css("top",-v_h);
		}else{//向上移动		
			console.log('pageN:%d',page_n);
			console.log('pageV:%d',page_v);			
			if(page_n==10&&page_v==10){return;}
			if(page_n != page_m){
				page_v = page_n + 1 ;
			}else{
				page_v = 1 ;
			}
			$(".section_li").eq(page_v-1).addClass("active").css("top",v_h);
		}
	 };

	var touch_m = function(e){
	 	e.preventDefault();
	 	e.stopPropagation();
		
	 	if (e.type == "touchmove") {
			t_m = window.event.touches[0].pageY;
		} else {
			t_m = e.y || e.pageY;
		}

	 	if(t_m && Math.abs(t_m - t_i)>10){//超过10个像素才处罚
	 		if(!i_flag){
	 			animate_i();
	 		}
			animate_m();
	 	}
	};


	var touch_e = function(e){
	 	fade(0,$('.p7 a'),1,300);
	 	fade(0,$('.p8 a'),1,300);
		i_flag = false;
		if(page_n==1&&page_v==10){return;}
		if( Math.abs(t_m - t_f)>100 && Math.abs(t_m)>10){
			if(p_flag)//上一页动画完成
				var taX="96px";
			else
				taX="-96px"

			//上一页的消失状态
			// $(".section_li").eq(page_n-1).animate({'top':0,scale: 0.8,translate:'0,'+taX},500,'ease')

			//当前页自动完成动画
			$(".section_li").eq(page_v-1).animate({'top':0,scale: 1,translate:'0,0px'},300,"easeOutSine",function(){

				//上一页状态初始化(该页已经不可见)
				$(".section_li").eq(page_n-1).animate({'top':0,scale: 1,translate:'0,0px'},0)

				//切换成功回调的函数
				$(".section_li").eq(page_n-1).removeClass("show active").addClass("hide");
				$(".section_li").eq(page_v-1).removeClass("active hide").addClass("show");
				page_n = page_v;
				pageIn(page_n);
			})
		//返回页面(移动失败)
		}else if(Math.abs(t_m)>5&&page_n != page_v){	//页面退回去
			var an_time=100;//动画时间
			if(p_flag){
				$(".section_li").eq(page_v-1).animate({'top':-v_h},an_time,"easeOutSine");
			}else{
				$(".section_li").eq(page_v-1).animate({'top':v_h},an_time,"easeOutSine");
			}
			$(".section_li").eq(page_n-1).animate({scale: 1,translate:'0,0'},an_time,'ease');
			//延迟去除active 弹回去有动画效果
			setTimeout(function(){
				$(".section_li").eq(page_v-1).removeClass("active");
			},an_time);
		}
		/* 初始化值 */
		t_i		= null;		//初值控制值
		t_m		= null;		//每次获取到的值
		t_f		= null;		//第一次获取的值
	};
	var _init = function(){

 		init_v_h();
		$(".section_li").on('touchstart',touch_s);
		$(".section_li").on('touchmove',touch_m);
		$(".section_li").on('touchend',touch_e);
 	};

	// _init();
	return _init;
}(window);


function pageAnimate(){
	$('.p1bg').animate({
		translate:'-200px,0'
	},8000,'linear');
	slider(500,$('.p1 .sorry img'));
	slider(1000,$('.p1 .title img'));
}
var timer =null,p3page=1;

function pageIn(page){
	var $pageList = $(".section_li");
	var $li = $pageList.eq(page);
	if(page==10){
		$pageList.eq(page-1).find('.arrow').hide();
	}else{
		$pageList.find('.arrow').show();
	}
	switch(page){
		case 2:
			slider(0,$('.p2 .sorry img'));
			slider(500,$('.p2 .title img'));
			slider(1000,$('.p2 .depict img'));
			break;
		case 3:
			slider(0,$('.p3 .sorry img'));
			slider(500,$('.p3 .title img'));
			slider(1000,$('.p3 .depict img'));
			break;	
		case 4:
			fade(1000,$('.p4 .logo'),1);
			break;												  		
	}
}
function moveX(timeout,elem,dis){
	timeout+=500;
	setTimeout(function(){
		elem.animate({  
        opacity: 1, 
        left: elem.index()*20+110+'px',  
        color: '#abcdef',  
        rotateZ: '45deg', 
        translate3d: +dis+',10px,0'  
        }, 500, 'ease-out')
	},timeout)
}

function elastic(timeout,elem){
	setTimeout(function(){
		elem.addClass('dodo');
		elem.animate({

		},500,'ease-out');
	},timeout);
}
function slider(timeout,elem,duration,cb){
	duration = duration || 500;
	setTimeout(function(){
		elem.animate({
			translate:'0,0',
			opacity:1
		},duration,'ease-in-out',cb)
	},timeout);
}
function fade(timeout,elem,opacity,duration){
	duration = duration || 500;
	setTimeout(function(){
		elem.animate({
			'opacity':opacity
		},duration,'linear');
	},timeout);
}
function rotate(timeout,elem,cb){
	setTimeout(function(){
		elem.animate({
			opacity:.7
		},500,'ease-out',function(){		
			$('.dg').animate({
			translate:'45px,0',
			scale3d:'.5,.5,1'
			},500);
			$('.lz').animate({
			translate:'10px,-65px',
			scale3d:'.5,.5,1'
			},500);
			$('.bl').animate({
			translate:'10px,65px',
			scale3d:'.5,.5,1'
			},500,cb);
		})
	},timeout);	
}
function jumpOut(timeout,elem,cb){
	setTimeout(function(){
		elem.animate({
			opacity:1,
			scaleZ:5,
			rotateY:'360deg',
		},1000,'ease-in-out',cb);		
	},timeout);	
}
function downRotate(timeout,elem,duration){
	duration = duration || 500;
	setTimeout(function(){
		elem.animate({
			translate:'0,0',
			rotate:'0deg',
			scale:'1.1,1.1'
		},duration,'ease-out');
	},timeout);		
}