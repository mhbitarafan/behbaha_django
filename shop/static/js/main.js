new Vue({
    el: '#app',
    data: {
        shw_use_period: true,
        shw_overlay: false,
        product_type: [],
        shw_products: false,
        sh_details_box: false,
        shw_overlay2: false,
        order_amount_value: "2",
    },
    mounted:function(){
      document.querySelector('#search').focus();
},
    methods: {
      shw_product_type(index){
        for(var i=0; i < this.product_type.length; i++){
          this.product_type[i] = false;
        }
        this.shw_overlay = true;
        this.$set(this.product_type, index, true);
      },
      hide_product_type(){
        for(var i=0; i < this.product_type.length; i++){
          this.product_type[i] = false;
        }
        this.shw_overlay = false;
      },
      shw_products_f(){
        this.shw_products = true;
        this.hide_product_type();
      },
      shw_product_details(){
        this.shw_overlay2 = true;
        this.sh_details_box = true;
      },
      hide_overlay2(){
        this.shw_overlay2 = false;
        this.sh_details_box = false;
      },
      toPersianNum( num, dontTrim ) {
            var i = 0,
            dontTrim = dontTrim || false,
            num = dontTrim ? num.toString() : num.toString().trim(),
            len = num.length,
            res = '',
            pos,
            persianNumbers = typeof persianNumber == 'undefined' ?
                ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'] :
                persianNumbers;
        for (; i < len; i++)
            if (( pos = persianNumbers[num.charAt(i)] ))
                res += pos;
            else
                res += num.charAt(i);
        return res;
    },
    },
  });