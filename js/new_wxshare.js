window.shareData = {
        "imgUrl":"/images/logo.jpg",
        "timeLineLink": location.href.split('#')[0],
        "tTitle":"深敏移动医疗" ,
        "tContent": "深敏移动医疗"
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