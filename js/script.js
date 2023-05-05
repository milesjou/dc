// $("#btn_10c").click(function() {
//     // $(".notice_dialog").addClass("show");
//     console.log("按钮被单击了！");
// })

// $(document).ready(function() {
//     console.log("jQuery is working!");
// });


// if(jQuery) {
//     alert('jQuery已加载!');
// }
// else {
//     alert('jQuery未加载!');
// }
 
// $(function() {
// 	alert("jquery起作用了");
// });


$(function() {

    console.log("jQuery 已工作中!");

    $("#btn_10c, #btn_1c_02").click(function() {
        $(".notice_dialog").addClass("show");
    });

    $("#btn_not_no").click(function() {
        $(".notice_dialog").removeClass("show");

        // 暂时
        $(".card_result").removeClass("show");

    });

    $("#btn_not_yes").click(function() {
        // $('.video_1c').addClass("show");

        $('.notice_dialog').removeClass("show");
        // 自动播放视频
        // $('#play_video')[0].play();
        // 隐藏控制面板
        $('.video_mask').addClass("show");
    });

    $("#btn_not_no").click(function() {
        // 暂时
        $(".card_result").removeClass("show");
    });

    $(document).on("click", "#btn_not_no", function() {
        $(".card_result").removeClass("show");
    });

    $("video").bind("contextmenu",function(){//取消右键事件
        return false;
    });
});