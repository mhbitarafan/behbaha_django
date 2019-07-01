const store = new Vuex.Store({
  state: {
    shw_overlay2: false,
    sh_details_box: false,
  },
  mutations: {
    overlay2_f(state) {
      state.shw_overlay2 = false;
    },
    overlay2_t(state) {
      state.shw_overlay2 = true;
    },
    details_box_f(state) {
      state.sh_details_box = false;
    },
    details_box_t(state) {
      state.sh_details_box = true;
    },
  }
});

Vue.component('v-select', VueSelect.VueSelect);

Vue.component('product-card', {
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
  store.commit('overlay2_t');
  store.commit('details_box_t');
},

  },
  template: `
              <div class="card-box my-2 d-flex flex-column align-items-center" @click="shw_product_details()">
                <h1 class="card-box-title mb-0 p-2 px-3 w-100 text-right">میوه</h1>
                <div class="card-box-footer py-2 px-3 w-100 text-right">مهلت سفارش گیری:
                    {{toPersianNum("3 روز دیگر")}}
                </div>
                <div class="card-box-footer pb-2 px-3 w-100 text-right">زمان تحویل:
                {{toPersianNum("20 تیر")}}
                </div>
                <div class="card-box-img">
                    <img src="http://cdn.24.co.za/files/Cms/General/d/7635/c9cb6d629e5e40318d2b120ed91c9b2b.png">
                </div>
                <div class="card-box-price pt-1 px-2 w-100 text-right">
                <div class="d-flex justify-content-between">
                <div>{{toPersianNum("از 3000 تومان")}}</div>
                <div>{{toPersianNum("تا 2000 تومان")}}</div>
              </div>    
                </div>
                <div class="card-box-footer p-2 w-100 text-right">
                    <div class="progress">
                        <div class="progress-bar bg-warning px-2" role="progressbar" style="width: 25%;"
                            aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
                    </div>
                    <div class="d-flex justify-content-between p-1">
                    <div>{{toPersianNum("30 سفارش از")}}</div>
                    <div>{{toPersianNum("200 سفارش")}}</div>
                  </div>
                </div>
            </div>
  `
});

Vue.component('product-details-box', {
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
    hide_overlay2(){
      store.commit('overlay2_f');
      store.commit('details_box_f');
    },
  hide_product_type(){
    for(var i=0; i < vm.product_type.length; i++){
      vm.product_type[i] = false;
    }
    vm.shw_overlay = false;
  },
},
  template: `
  <div>
  <div v-if="store.state.shw_overlay2" class="overlay overlay2" @click="hide_overlay2()" @mouseover="hide_product_type()"></div>
  <transition name="fade">
  <div v-if="store.state.sh_details_box" class="product-details-box p-1 d-flex flex-row-reverse" @mouseover="hide_product_type()">
      <div class="dt-img d-flex flex-column">
        <img src="http://cdn.24.co.za/files/Cms/General/d/7635/c9cb6d629e5e40318d2b120ed91c9b2b.png">
        <div class="d-flex mt-2 px-3 justify-content-center">
          <div>
            <span class="fa fa-star checked"></span>
            <span class="fa fa-star checked"></span>
            <span class="fa fa-star checked"></span>
            <span class="fa fa-star"></span>
            <span class="fa fa-star"></span>
          </div>
          <div class="mr-2">{{toPersianNum("میانگین 35560 رای")}}</div>
        </div>
      </div>
      <div class="d-flex flex-column w-100">
              <div class="dt-title text-dark w-100 text-right px-3 py-2">میوه</div>     
              <div class="card-box-footer py-2 px-3 w-100 text-right">مهلت سفارش گیری:
              {{toPersianNum("3 روز دیگر")}}
          </div>
          <div class="card-box-footer pb-2 px-3 w-100 text-right">زمان تحویل:
          {{toPersianNum("20 تیر")}}
          </div>
                  <div class="card-box-footer py-2 px-3 w-100 text-right">
                  <div class="card-box-price p-1 w-100 text-right">
                  <div class="d-flex justify-content-between">
                  <div>{{toPersianNum("از 3000 تومان")}}</div>
                  <div>{{toPersianNum("تا 2000 تومان")}}</div>
                </div>    
                  </div>
                      <div class="progress">
                          <div class="progress-bar bg-warning px-3" role="progressbar" style="width: 25%;"
                              aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
                      </div>
                      <div class="d-flex justify-content-between p-1">
                        <div>{{toPersianNum("30 سفارش از")}}</div>
                        <div>{{toPersianNum("200 سفارش")}}</div>
                      </div>
                  </div>  
                  <div class="p-2">
                  <table class="table price-range">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>رنج سفارش</th>
                      <th>قیمت</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>{{toPersianNum("1")}}</td>
                      <td>{{toPersianNum("از 1-5 سفارش")}}</td>
                      <td>{{toPersianNum("10000 تومان")}}</td>
                    </tr>
                    <tr>
                      <td>{{toPersianNum("2")}}</td>
                      <td>{{toPersianNum("از 5-15 سفارش")}}</td>
                      <td>{{toPersianNum("9000 تومان")}}</td>
                    </tr>
                    <tr>
                      <td>{{toPersianNum("3")}}</td>
                      <td>{{toPersianNum("از 15 سفارش به بالا")}}</td>
                      <td>{{toPersianNum("8000 تومان")}}</td>
                    </tr>
                  </tbody>
                </table>
                </div>
                  <div id="order-amount" class="w-100 p-2 px-3 d-flex flex-row text-right">
                          <input type="number" min="1" class="p-2 dt-order-amount col" placeholder="میزان سفارش شما"> 
                          <a name="" id="" class="btn btn-success mr-2" href="#" role="button" @click="hide_overlay2()">افزودن به سبد خرید</a> 
                  </div>      
                  <div class="p-2 text-justify">
                  میوه ها و سبزیجات بخش ضروری رژیم غذایی یک فرد است، چون خطر مجموعه‌ای از بیماری‌های مزمن مانند بیماری قلبی و سرطان را کاهش می‌دهند، حتی می‌توانند وزن‌تان را در سطحی سلامت حفظ کنند. در واقع، رهنمود رژیم غذایی برای امریکایی‌ها که در ۲۰۱۶ چاپ شد، توصیه می‌کند نصف وعده‌ی غذایی‌تان باید از میوه و سبزیجات درست شده‌باشد. ضمنا میوه و سبزیجات مختلفی وجود دارد که فواید مختلفی برای آنها ذکر شده‌است و به نظر می‌رسد برای شرایط مختلف سلامتی مفید هستند. 
                  </div>
      </div>     
        
  </div>
</transition>
</div>
  `
});

var vm = new Vue({
    el: '#app',
    data: {
        shw_use_period: true,
        shw_overlay: false,
        product_type: [],
        shw_products: true,
        shw_overlay2: false,
        header_height: 0,
        cat_header_height: 0,
        selected_city: 'تهران',
        min_price: '',
        max_price: '',
        cards_container_height: '',
    },
    mounted:function(){
      document.querySelector('#search').focus();
      this.get_header_height();
      window.addEventListener("resize", this.get_header_height);
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
    set_price_filter(p, a){
      if (a == "m" && p != ""){
        this.min_price = this.toPersianNum(p);
      } else if (a == "h" && p != "") {
        this.max_price = this.toPersianNum(p);
      }
    },
      get_header_height(){
        this.header_height = document.querySelector('#header').offsetHeight;
        this.cat_header_height = document.querySelector('.cat-header').offsetHeight;
        var a = "calc(100vh - " + (this.cat_header_height + this.header_height) + "px)";
        this.cards_container_height = {height: a};
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
        store.commit('details_box_f');
        store.commit('overlay2_f');
        this.hide_product_type();
      },
    },
  });
  