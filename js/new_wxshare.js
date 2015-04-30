window.shareData = {
        "imgUrl": "http://app.meizhuangyouxuan.com/sekkisei/images/bgz.jpg",
        "timeLineLink": "http://app.meizhuangyouxuan.com/sekkisei/index.html",
        "tTitle":"【雪肌精·美白传奇】 从未改变的挚爱" ,
        "tContent": "这一刻零距离接触！"
    };

    document.addEventListener('WeixinJSBridgeReady', function onBridgeReady() {

        WeixinJSBridge.on('menu:share:appmessage', function(argv) {
            WeixinJSBridge.invoke('sendAppMessage', {
                "img_url": window.shareData.imgUrl,
                "img_width": "640",
                "img_height": "640",
                "link": window.shareData.timeLineLink,
               "desc": window.shareData.tContent,
               "title": window.shareData.tTitle
            }, function(res) {
                // document.location.href ="";
            })
        });

        WeixinJSBridge.on('menu:share:timeline', function(argv) {
            WeixinJSBridge.invoke('shareTimeline', {
                "img_url": window.shareData.imgUrl,
                "img_width": "640",
                "img_height": "640",
                "link": window.shareData.timeLineLink,
               "desc": window.shareData.tContent,
               "title": window.shareData.tTitle
            }, function(res) {
                // document.location.href ="";
            });
        });
    }, false);