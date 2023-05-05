$(function() {

    let ssr_pool = [];
    let sr_pool = [];
    let r_pool = [];

    $.ajaxSettings.async = false;

    $.when(
        $.ajax({ url: "video/vd_01.mp4" }),
        $.ajax({ url: "video/vd_02.mp4" }),
        $.ajax({ url: "video/vd_03.mp4" })
      ).done(function() {
        console.log("All videos preloaded successfully.");
    });

    $.getJSON('json/card_library_ssr.json', function(data) {
        ssr_pool = data;
        updatePoolInfo();
    });

    $.getJSON('json/card_library_sr.json', function(data) {
        sr_pool = data;
        updatePoolInfo();
    });

    $.getJSON('json/card_library_r.json', function(data) {
        r_pool = data;
        updatePoolInfo();
    });


    // 定义卡池
    var result = $('#result'); // 显示结果的div元素
    var drawBtn = $('#btn_not_yes'); // 抽卡按钮

    var previousResults = [];
    var counter = 0;

    var vd_paths = {
        'R': 'video/vd_01.mp4',
        'SR': 'video/vd_02.mp4',
        'SSR': 'video/vd_03.mp4'
      };

    var vd_player = $('#play_video')[0];


    function updateProb() {
        let ssr_total_prob = ssr_pool.reduce((sum, card) => sum + card.prob, 0);
        let sr_total_prob = sr_pool.reduce((sum, card) => sum + card.prob, 0);
        let r_total_prob = r_pool.reduce((sum, card) => sum + card.prob, 0);

        let ssr_s_d = Math.round(ssr_total_prob.toFixed() * 100) / 100;
        let sr_s_d = Math.round(sr_total_prob.toFixed() * 100) / 100;
        let r_s_d = Math.round(r_total_prob.toFixed() * 100) / 100;

        let ssr_prob = ssr_s_d.toFixed(2);
        let sr_prob = sr_s_d.toFixed(2);
        let r_prob = r_s_d.toFixed(2);

        return {ssr_prob, sr_prob, r_prob}
    }

    function updatePoolInfo() {
        let ssr_count = ssr_pool.length;
        let sr_count = sr_pool.length;
        let r_count = r_pool.length;

        $("#pool_qua").html(`
            <p>SSR卡池：${ssr_count}张</p>
            <p>SR卡池：${sr_count}张</p>
            <p>R卡池：${r_count}张</p>
        `);
    }

    function play_vd(path) {
        vd_player.src = path;
        vd_player.load();

        $(vd).on("loadedmetadata", function() {
            $('.video_1c').addClass("show");
            console.log('视频加载完毕!');
        });

        vd_player.play();
    }

    var vd = $('#play_video')[0];
    
    let cardProb = updateProb();

    var card;

    drawBtn.click(function() {
        var randomNum = Math.random();
        console.log(randomNum)
        
        
        if (randomNum < (cardProb.ssr_prob / 100)) {
            // 获取SSR卡牌的卡池
            var randomIndex = getRandomIndex(ssr_pool);
            // 随机生成SSR卡牌的索引
            card = 'ssr ' + ssr_pool[randomIndex].path + ' ' + ssr_pool[randomIndex].name;

            var path = vd_paths['SSR'];
            play_vd(path);

        } else if (randomNum < (cardProb.sr_prob / 100)) {
            // 抽到SR卡牌
            var randomIndex = getRandomIndex(sr_pool);
            // 随机生成SR卡牌的索引
            card = 'sr ' + sr_pool[randomIndex].path + ' ' + sr_pool[randomIndex].name;

            var path = vd_paths['SR'];
            play_vd(path);
        } else {
            // 抽到R卡牌
            var randomIndex = getRandomIndex(r_pool);
            // 随机生成R卡牌的索引
            card = 'r ' + r_pool[randomIndex].path + ' ' + r_pool[randomIndex].name;

            var path = vd_paths['R'];
            play_vd(path);
        }
        
        var resultText = card + ',  ';
        previousResults.push(resultText);

        counter++;

        if (counter % 10 === 0 && counter !== 0) { // 如果抽卡次数是10的倍数，就在结果后面添加两个换行符
            // previousResults.push('\n' + '\n');
            previousResults.push('<br />');
            // counter = 0;
        }
        

        var card_arr = card.split(' ');
        var card_rarity = card_arr[0];
        var card_path = card_arr[1];
        var card_name = card_arr[2];

        if(card_rarity === 'ssr') {
            console.log(card_rarity)
            console.log(card_path)
            console.log(card_name)
            $('.character_avatar').css('background-image', 'url(' + card_path + ')');
            $('.character_stars').css('background-image', 'url(img/star_five/star_5.png)');
            $('.character_name').text(card_name);
        } else if(card_rarity === 'sr') {
            console.log(card_rarity)
            console.log(card_path)
            console.log(card_name)
            $('.character_avatar').css('background-image', 'url(' + card_path + ')');
            $('.character_stars').css('background-image', 'url(img/star_four/star_4.png)');
            $('.character_name').text(card_name);
        } else {
            console.log(card_rarity)
            console.log(card_path)
            console.log(card_name)
            $('.character_avatar').css('background-image', 'url(' + card_path + ')');
            $('.character_stars').css('background-image', 'url(img/star_three/star_3.png)');
            $('.character_name').text(card_name);

            $('.character_name').css('text-stroke', card_name);
        }
    });

    updateProb();

    function getRandomIndex(cardPool) {
        var totalProb = 0;

        $.each(cardPool, function(index, card) {
            totalProb += card.prob;
        });

        var randomProb = Math.random() * totalProb;
        var currentIndex = 0;
        var currentProb = cardPool[currentIndex].prob;

        while(randomProb > currentProb) {
            currentIndex++;
            currentProb += cardPool[currentIndex].prob;
        }

        return currentIndex;
    }

    var result = $('#card_result');

    $('video').on('ended', function() {
        console.log('视频播放完毕！');
        console.log(card)
        
        $('.card_result').addClass('show');
        $('.video_mask').removeClass("show");
        $('.video_1c').removeClass("show");
        $('.aper').addClass('show');
    });

});
