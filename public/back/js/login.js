/**
 * Created by Administrator on 2017/11/8.
 */
$(function () {
    // 获取到表单
    var $form = $("form");
    // 调用bootstrapValidator
    $form.bootstrapValidator({
        // 配置校验时的小图标
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        //规则
        fields:{
            // 对应表单中的name属性
            username:{
                //写username的规则
                validators:{
                    notEmpty:{
                        message:"用户名不能为空"
                    },
                    callback:{
                        message:"用户名错误"
                    }
                }
            },
            password:{
                validators:{
                    notEmpty:{
                        message:"密码不能为空"
                    },
                    callback:{
                        message:"密码错误"
                    },
                    stringLength:{
                        min:6,
                        max:12,
                        message:"密码长度为6-12位"
                    }
                }
            }
        }
    });

    // 给表单注册一个校验成功事件 success.for.bv
    $form.on("success.form.bv", function (e) {
        //阻止默认行为
        e.preventDefault();
        // 使用ajax发送登录请求
        $.ajax({
            type:"post",
            url:"/employee/employeeLogin",
            data:$form.serialize(),
            success: function (data) {
                //console.log(data);
                if(data.success){
                    //跳到首页
                    location.href = "index.html";
                }
                if(data.error === 1000 ){
                    //使用updateStatus方法,主动把username这个字段编程校验失败
                    //第一个参数 : 字段名  表单中的name属性
                    //第二个属性 : INVALID  校验失败
                    //第三个属性 : 配置提示消息
                    $form.data("bootstrapValidator").updateStatus("username","INVALID","callback");
                }
                if(data.error === 1001){
                    $form.data("bootstrapValidator").updateStatus("username","INVALID","callback");
                }
            }
        });
    });

    //重置功能
    $("[type='reset']").on("click", function () {
        //获取到validator对象,调用resetForm方法
        $form.data("bootstrapValidator").resetForm();
    });
})