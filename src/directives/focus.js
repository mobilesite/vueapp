/**
 *
 * @author dennis
 * @email  
 * @since  17/1/20
 */

Vue.directive('focus', {
    twoWay: true,
    bind: function () {
        var self = this;//save the this ref

        //当DOM获取焦点，更新vm
        self._onFocus= function () {
            // 如果指令这样绑定 v-focus="a.b.c"
            // 它将用给定值设置 `vm.a.b.c`
            self.set(true);
        }
        //当DOM失去焦点，更新vm
        self._onBlur= function () {
            self.set(false);
        }
        // 准备工作
        // 例如，添加事件处理器或只需要运行一次的高耗任务
        //console.log('focus bound!')
        self.el.addEventListener('focus', self._onFocus)
        self.el.addEventListener('blur', self._onBlur)
    },
    inserted: function () {

    },
    update: function (newValue, oldValue) {
        //根据当前vm值变化，来修改DOM的获取焦点状态
        var self = this;//save the this ref

        if(newValue){
            self.el.focus();
        }else{
            self.el.blur();
        }
    },
    componentUpdated: function () {

    },
    unbind: function () {
        var self = this;//save the this ref

        // 清理工作
        // 例如，删除 bind() 添加的事件监听器
        //console.log('focus unbind!')
        self.el.removeEventListener('focus', self._onFocus)
        self.el.removeEventListener('blur', self._onBlur)
    }
})