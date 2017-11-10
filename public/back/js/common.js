/**
 * Created by Administrator on 2017/11/8.
 */

//二级菜单的显示和隐藏
$('.child').prev().on("click", function () {
    $(this).next().slideToggle();
});

//侧边栏的显示和隐藏
$('.btn_menu').on('click', function () {
    $('.lt_aside').toggleClass("now");
    $('.lt_main').toggleClass("now");
});

//退出功能
$(function () {
    $('.btn_logout').on('click', function () {
        console.log("hehe");
        $('#logoutModal').modal("show");

        $('.btn_confirm').off().on('click', function () {

            //给服务器发送ajax请求,让服务器清楚session
            $.ajax({
                type:'get',
                url:'/employee/employeeLogout',
                success: function (data) {
                    if(data.success){
                        location.href = "login.html";
                    }
                }
            });
        });
    });
})
