var douban = {
    type:"movie",
    tag:"热门",
    count:30
}
var baidu={
    type:"movie",
    tag:""
}
initial();
function initial(){
    //开始加载豆瓣
    loadDbTags();
    loadDbInfo();
    //点击下拉框切换标签
    $("#douban").on("change",'select',function(){
        douban.type=$(this).val();
        loadDbTags();
        loadDbInfo();
    })
    //点击标签切换内容
    $("#douban").on("click",'label',function(){
        douban.tag=$(this).text();
        loadDbInfo();
    })
    //开始加载百度
    loadBdInfo();
    //点击下拉框切换标签
    $("#baidu").on("change",'select',function(){
        baidu.type=$(this).val();
        loadBdInfo();
    })
    //点击标签切换内容
    $("#baidu").on("click",'label',function(){
        baidu.tag=$(this).text();
        loadBdInfo();
    })
}
//加载豆瓣标签
function loadDbTags(){
    //豆瓣标签
    $.ajax({
        url:"https://ys.urlsdh.com/so/api/db_tags.php",
        type:"get",
        data:douban,
        success:function(data){
            if(data.tags){
                var str = "";
                data.tags.forEach(function(item) {
                    str+=("<label>"+item+"</label>");
                });
                $("#douban .tags").html(str);
            }
            
        }
    })
}
//加载豆瓣影片
function loadDbInfo(){
    var str ="";
    $.ajax({
        url:"https://ys.urlsdh.com/so/api/db_ys.php",
        type:"get",
        data:douban,
        success:function(data){
            data.subjects.forEach(function(item){
                str+=('<div class="item"><a href="https://ys.urlsdh.com/so/api.php?key='+item.title+'" target="_blank"><div class="cover"><img class="item-img lazy unfancybox" referrerpolicy="no-referrer" data-src="'+item.cover+'" /><span class="remark">'+(item.is_new?'<img src="https://img1.doubanio.com/f/movie/caa8f80abecee1fc6f9d31924cef8dd9a24c7227/pics/movie/ic_new.png" width="16" class="new">':'')+item.episodes_info+'</span></div><div class="item-info">'+item.title+'</div></a></div>');
            })
            $("#douban .list").html(str);
        }
    })
}
//加载百度热搜影片
function loadBdInfo(){
    var str ="";
    $.ajax({
        url:"https://ys.urlsdh.com/so/api/bd_hot.php",
        type:"get",
        data:baidu,
        success:function(data){
            items = data.data.cards[0].content;
            tags = data.data.tag[0].content;
            tags.forEach(function(item){
                str+=("<label>"+item+"</label>");
            })
            $("#baidu .tags").html(str);
            str="";
            items.forEach(function(item){
                str+=('<div class="item"><a href="https://ys.urlsdh.com/so/api.php?key='+item.word+'" target="_blank"><div class="cover"><img class="item-img lazy unfancybox" referrerpolicy="no-referrer" data-src="'+item.img+'" /><span class="remark">'+('<img width="15" src="https://fe-prod.cdn.bcebos.com/wise/card/img_text_list/hotchange_'+(item.hotChange=='up'?'up.png':item.hotChange=='down'?'down.png':item.hotChange=="same"?'same.png':'')+'"/>')+item.hotScore
+'</span></div><div class="item-info">'+item.word+'</div></a></div>');
            })
            $("#baidu .list").html(str);
        }
    })
}