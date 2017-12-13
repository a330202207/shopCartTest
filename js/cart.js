// 全局过滤器
Vue.filter('money', function(value, type) {
    return "¥" + value.toFixed(2) + type;
});
new Vue({
    el: '#app',
    data: {
        productList: [],
        totalMoney: 0,
        checkAllFlag: false,
        delFlag: false,
        curProduct: ''
    },
    //局部过滤器
    filters: {
        formatMoney: function (value) {
            return "￥ " + value.toFixed(2);
        }
    },
    mounted: function () {
        this.$nextTick(function () {
            this.cartView();
        })
    },
    methods: {
        //获取购物车列表
        cartView: function () {
            //es6写法
            let _this = this;
            this.$http.get("data/cartData.json").then(res => {
                this.productList = res.data.result.list;
                // this.totalMoney = res.data.result.totalMoney;
            });
            // var _this = this;
            // this.$http.get("data/cartData.json").then(function(res) {
            //   this.productList = res.data.result.list;
            //   this.totalMoney = res.data.result.totalMoney;
            // });
        },
        //增加数量改变金额
        changeMoney:function (product,way) {
            if (way > 0) {
                product.productQuantity++;
            } else {
                product.productQuantity--;
                if (product.productQuantity < 1) {
                    product.productQuantity = 1;
                }
            }
            this.calcTotalPrice();
        },
        //单选
        selectedProduct:function(item) {
            if (typeof item.checked == 'undefined') {
                this.$set(item, 'checked', true);
            } else {
                item.checked = !item.checked;
            }
            this.calcTotalPrice();
        },
        //全选
        checkAll:function(flag) {
            var _this = this;
            this.checkAllFlag = flag;
            this.productList.forEach(function (item, index) {
                if (typeof item.checked == 'undefined', _this.checkAllFlag) {
                    _this.$set(item, 'checked', _this.checkAllFlag);
                } else {
                    item.checked = _this.checkAllFlag;
                }
            });
            this.calcTotalPrice();
        },
        //计算总金额
        calcTotalPrice:function() {
            var _this = this;
            _this.totalMoney = 0
            _this.productList.forEach(function (item, index) {
                if (item.checked) {
                    _this.totalMoney += item.productPrice * item.productQuantity;
                }
            });
        },
        //删除弹窗显示
        delConfirm:function(item) {
            this.delFlag = true;
            this.curProduct = item;
        },
        //删除商品
        delProduct:function() {
            var index = this.productList.indexOf(this.curProduct);
            this.productList.splice(index, 1);
            this.delFlag = false;        
        },
    }
});
