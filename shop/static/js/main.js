Vue.component('product-card', {
  data: function(){
    return {
      
    }
  },
  methods: {
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
shw_product_details(){
  vm.shw_overlay2 = true;
  vm.sh_details_box = true;
},

  },
  template: `
              <div class="card-box d-flex flex-column align-items-center" @click="shw_product_details()">
                <h1 class="card-box-title mb-0 p-2 px-3 w-100 text-right">میوه</h1>
                <div class="card-box-price pb-2 px-3 w-100 text-right">
                    {{toPersianNum("2000 - 3000")}} تومان</div>
                <div class="card-box-img">
                    <img src="http://cdn.24.co.za/files/Cms/General/d/7635/c9cb6d629e5e40318d2b120ed91c9b2b.png">
                </div>
                <div class="card-box-footer pt-2 px-2 w-100 text-right">زمان شروع:
                    {{toPersianNum("9 تیر 98")}}
                </div>
                <div class="card-box-footer p-2 w-100 text-right">میزان سفارشات :
                    <div class="mb-2"></div>
                    <div class="progress">
                        <div class="progress-bar bg-warning px-2" role="progressbar" style="width: 25%;"
                            aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">
                            {{toPersianNum("30 از 200 کیلوگرم")}}</div>
                    </div>
                </div>
            </div>
  `
})
var vm = new Vue({
    el: '#app',
    data: {
        shw_use_period: true,
        shw_overlay: false,
        product_type: [],
        shw_products: true,
        sh_details_box: false,
        shw_overlay2: false,
        header_height: 0,
        cat_header_height: 0,
        order_amount_value: "2",
        cards_container_height: '',
    },
    mounted:function(){
      document.querySelector('#search').focus();
      this.get_header_height();
      window.addEventListener("resize", this.get_header_height);
},
    methods: {
      get_header_height(){
        this.header_height = document.querySelector('#header').offsetHeight;
        this.cat_header_height = document.querySelector('.cat-header').offsetHeight;
        var a = "calc(100vh - " + (this.cat_header_height + this.header_height) + "px)";
        this.cards_container_height = {height: a};
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
  hide_overlay2(){
    vm.shw_overlay2 = false;
    vm.sh_details_box = false;
  },
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
        this.shw_overlay = false;
        this.sh_details_box = false;
        this.shw_overlay2 = false;
        this.hide_product_type();
      },
    },
  });
  