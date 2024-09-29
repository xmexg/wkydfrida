Java.perform(() => {
    let LoginActivity = Java.use("com.dudu.run.activity.LoginActivity");
    let AppCompatEditText = Java.use("android.widget.EditText");
    let SpannableStringBuilder = Java.use("android.text.SpannableStringBuilder");

    /**
     * 传入学号，构造用户信息包
     */
    function makeStuObj(userCode) {
        let LoginResponseData = Java.use("com.dudu.run.bean.LoginResponseData")
        let String = Java.use("java.lang.String")
        let loginResponseData_Object = LoginResponseData.$new()
        loginResponseData_Object.id.value = 1
        loginResponseData_Object.userCardNo.value = String.$new("HOOK_学生ID")
        loginResponseData_Object.userClass.value = String.$new("HOOK_演示班级")
        loginResponseData_Object.userCode.value = String.$new(userCode)
        loginResponseData_Object.userName.value = String.$new("HOOK_学生姓名")
        loginResponseData_Object.userSex.value = String.$new("HOOK_学生性别")
        return loginResponseData_Object
    }

    /**
     * Hook 登录按钮
     */
    LoginActivity.onViewLogin.implementation = function (view) {
        let et_uname = Java.cast(this.et_username.value, AppCompatEditText);
        let et_upsd = Java.cast(this.et_psd.value, AppCompatEditText);

        let uname_retval = et_uname.getText();
        let uname_text = Java.cast(uname_retval, SpannableStringBuilder).toString().trim();

        let upsd_retval = et_upsd.getText();
        let upsd_text = Java.cast(upsd_retval, SpannableStringBuilder).toString().trim();

        console.log("输入学号: " + uname_text + "  输入密码: " + upsd_text);
        this.w(makeStuObj(uname_text))
    };


    /**
     * Hook 登录数据包
     */
    LoginActivity["w"].implementation = function (loginResponseData) {
        console.log("HOOK 登录信息")
        let lrdClass = loginResponseData.getClass()
        let fields = lrdClass.getDeclaredFields()
        console.log("属性","值")
        for (let i = 0; i < fields.length; i++) {
            let field = fields[i];
            field.setAccessible(true);  // 使私有字段可访问
            let key = field.getName();
            let value = field.get(loginResponseData);
            console.log(key, value)
        }
        console.log
        return this.w(loginResponseData)
    };
});
