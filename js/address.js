new Vue({
    el: ".container",
    data: {
        addressList:[],
        addAddress: {
            addressId:"",
            userName:"",
            streetName:"",
            postCode:"",
            tel:"",
            isDefault:false
        },
        limitNum:3,         //显示配送地址条数
        curAddress:'',
        currentIndex: 0,    //配送地址索引
        shippingMethod: 1,  //配送方式
        showFlag:'',      //遮罩层
    },
    computed: {
        //设置显示地址条数
        filterAddress: function() {
            return this.addressList.slice(0, this.limitNum);
        }
    },
    mounted: function () {
        this.$nextTick(function () {
            this.getAddressList();
        })
    },
    methods: {
        //获取配送地址列表
        getAddressList: function () {
            var _this = this;
            this.$http.get("data/address.json").then(function (res) {
                var res = res.data;
                if (res.status == "0") {
                    _this.addressList = res.result;
                }
            });
        },
        //获取更多条数
        loadMore: function () {
            this.limitNum = this.addressList.length;
        },
        //设置默认地址
        setDefault:function (addressId) {
            this.addressList.forEach(function (address, index) {
                if (address.addressId == addressId) {
                    address.isDefault = true;
                } else {
                    address.isDefault = false;
                }
            });
        },
        //添加地址弹窗显示
        addAddressConfirm:function () {
            this.showFlag = 'add';
            this.addAddress = {
                addressId:"",
                userName:"",
                streetName:"",
                postCode:"",
                tel:"",
                isDefault:false
            };
        },
        //添加/编辑地址
        submit:function () {
            if (this.showFlag == 'add') {
                var formData = this.addAddress;
                this.addressList.push(formData);
            } else {
                var index = this.addressList.indexOf(this.addAddress);
                this.$set(this.addressList, index, this.addAddress);
            }
            this.showFlag = false;
        },
        //编辑地址弹窗显示
        editAddressConfirm:function (item) {
            this.showFlag = 'edit';
            this.addAddress = item;
        },
        //删除地址弹窗显示
        delConfirm:function (item) {
            this.showFlag = 'del';
            this.curAddress = item;
        },
        //删除地址
        delAddress:function () {
            var index = this.addressList.indexOf(this.curAddress);
            this.addressList.splice(index, 1);
            this.showFlag = false;
        }
    },
});
