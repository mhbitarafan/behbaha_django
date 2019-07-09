String.prototype.toEnglishDigits = function () {
  return this.replace(/[۰-۹]/g, function (w) {
      var persian = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
      return persian.indexOf(w);
  });
  };
String.prototype.toPersianDigits= function(){
  var persian= ['۰','۱','۲','۳','۴','۵','۶','۷','۸','۹'];
  return this.replace(/[0-9]/g, function(w){
      return persian[+w]
  });
}  
Vue.config.devtools = true
const store = new Vuex.Store({
  state: {
    shw_overlay2: false,
    sh_details_box: [],
    base_cart_amounts: [],
    cart_amounts: [],
    msg_text: '',
    msg_type: '',
    shw_alert: false,
    msg_timeout: '',
  },
  mutations: {
    set_overlay2(state, payload) {
      state.shw_overlay2 = payload.status;
    },
    set_details_box(state, payload) {
      Vue.set(state.sh_details_box, payload.id, payload.status);
    },
    set_base_cart_amounts(state, payload) {
      Vue.set(state.base_cart_amounts, payload.id, payload.value);
    },
    set_cart_amounts(state, payload) {
      Vue.set(state.cart_amounts, payload.id, payload.value);
    },
    reset_base_cart_amounts(state) {
      state.base_cart_amounts = state.cart_amounts.slice();
    },
    set_msg_text(state, payload) {
      state.msg_text = payload;
    },
    set_msg_type(state, payload) {
      state.msg_type = payload;
    },
    set_shw_alert(state, payload) {
      state.shw_alert = payload;
    },
    set_msg_timeout(state) {
      state.msg_timeout = setTimeout(() => {
        state.shw_alert = false;
      }, 4000);;
    },
    clear_msg_timeout(state) {
      window.clearTimeout(state.msg_timeout);
    }
  }
});
Vue.component('v-select', VueSelect.VueSelect);
Vue.mixin({
  methods: {
    to_fa( num, dontTrim ) {
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
  multiply(a, b){
    x = a.toEnglishDigits().replace(/,/g, '');
    y = b.toEnglishDigits().replace(/,/g, '');
    return (x*y).toLocaleString();
  },
  to_fa_s(x) {
    return this.to_fa(x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","));
},
set_msg(txt, type){
  store.commit('set_msg_text', txt);
  store.commit('set_msg_type', type);
  store.commit('set_shw_alert', true);
  store.commit('set_msg_timeout');
},
  }
})

Vue.component('product-card', {
  methods: {
shw_product_details(id){
  store.commit('set_overlay2', {'status': true});
  store.commit('set_details_box', {'id': id, 'status': true});
},
min_price(prices){
  p = prices.split('\n');
  return Math.min(...p).toLocaleString();
},
max_price(prices){
  p = prices.split('\n');
  return Math.max(...p).toLocaleString();
},
  },
  props: ['title', 'max_order', 'delivery_date', 'time_remaining', 'prices', 'image', 'pid', 'ordered_num'],
  template: `
              <div class="card-box my-2 d-flex flex-column align-items-center" @click="shw_product_details(pid)">
                <h1 class="card-box-title mb-0 p-2 px-3 w-100 text-right" :title="title">{{title}}</h1>
                <div class="card-box-footer py-2 px-3 w-100 text-right">مهلت سفارش گیری:
                    {{to_fa(time_remaining)}}
                </div>
                <div class="card-box-footer pb-2 px-3 w-100 text-right">زمان تحویل:
                    {{to_fa(delivery_date)}}
                </div>
                <div class="card-box-img">
                    <img :src="image">
                </div>
                <div class="card-box-price pt-1 px-2 w-100 text-right">
                <div class="d-flex justify-content-between">
                <div>از {{to_fa(max_price(prices))}} تومان</div>
                <div>تا {{to_fa(min_price(prices))}} تومان</div>
              </div>    
                </div>
                <div class="card-box-footer p-2 w-100 text-right">
                    <div class="progress">
                        <div class="progress-bar bg-warning px-2" role="progressbar" :style="{width: (ordered_num/max_order)*100 + '%'}"
                            aria-valuenow="30" aria-valuemin="0" :aria-valuemax="max_order"></div>
                    </div>
                    <div class="d-flex justify-content-between p-1">
                    <div>{{to_fa(ordered_num)}} سفارش از</div>
                    <div>{{to_fa(max_order)}} سفارش</div>
                  </div>
                </div>
            </div>
  `
});

Vue.component('product-details-box', {
  data() {
    return {
      order_ranges_arr: [],
      base_order_amount: '',
      order_amount: '',
      disabled: true,
      title_msg: '',
    }
  },
  methods: {
  hide_overlay2(id){
      store.commit('set_overlay2', {'status': false});
      store.commit('set_details_box', {'id': id, 'status': false});
    },
  hide_product_type(){
    for(var i=0; i < vm.product_type.length; i++){
      vm.product_type[i] = false;
    }
    vm.shw_overlay = false;
  },
  get_order_ranges(o){
    var o_range = o.split('\n');
    return o_range;
  },
  get_prices(p,i){
    var prices = p.split('\n');
    return parseInt(prices[i]).toLocaleString();
  },
  min_price(prices){
    var p = prices.split('\n');
    return Math.min(...p).toLocaleString();
  },
  max_price(prices){
    p = prices.split('\n');
    return Math.max(...p).toLocaleString();
  },
  get_order_amount(o){
    this.order_amount = o.toPersianDigits();
    if(this.base_order_amount == this.order_amount){
      this.disabled = true;
    } else {
      this.disabled = false;
    }
  },
  add_to_cart(title,o_amount){
    this.base_order_amount = this.order_amount;
    store.commit('set_shw_alert', false);
    this.disabled = true;
    this.title_msg = 'این میزان سفارش به سبد خرید شما افزوده شده است، برای تغییر آن مقدار دلخواه خود را در کادر مربوطه وارد نمایید.';
    if(this.base_order_amount == this.order_amount){
      this.disabled = true;
    } else {
      this.disabled = false;
      this.title_msg = '';
    }
    store.commit('clear_msg_timeout');
    this.$http.get('/add_to_cart?title='+title+'&order_amount='+o_amount).then(response => {
      this.set_msg("'" + o_amount + ' ' + title + "'" + ' به سبد خرید افزوده شد', 'alert-success');
    }, response => {
      // error callback
    });
  },
  basket_plus(value) {
    var num = value.toEnglishDigits();
    if (value == ''){
      num = "0";
    }
    this.order_amount = (parseInt(num) + 1).toString().toPersianDigits();
    if(this.base_order_amount == this.order_amount){
      this.title_msg = 'این میزان سفارش به سبد خرید شما افزوده شده است، برای تغییر آن مقدار دلخواه خود را در کادر مربوطه وارد نمایید.';
      this.disabled = true;
    } else {
      this.disabled = false;
      this.title_msg = '';
    }
  },
  basket_minus(value) {
    var num = value.toEnglishDigits();
    if (value == ''){
      num = "2";
    }
    if(num < 2){
      num = "2";
    }
    this.order_amount = (parseInt(num) - 1).toString().toPersianDigits();
    if(this.base_order_amount == this.order_amount){
      this.title_msg = 'این میزان سفارش به سبد خرید شما افزوده شده است، برای تغییر آن مقدار دلخواه خود را در کادر مربوطه وارد نمایید.';
      this.disabled = true;
    } else {
      this.disabled = false;
      this.title_msg = '';
    }
  },
},
props: ['title', 'max_order', 'delivery_date', 'time_remaining', 'prices', 'image', 'desc', 'order_ranges', 'pid', 'ordered_num',],
  template: `
  <transition name="fade">
  <div v-if="store.state.sh_details_box[pid]" style="z-index: 7;">
  <div v-if="store.state.shw_overlay2" class="overlay overlay2" @click="hide_overlay2(pid)" @mouseover="hide_product_type()">
  <div class="position-absolute close-btn"><i class="fas fa-times"></i></div>
  </div>
  <div v-if="store.state.sh_details_box[pid]" class="product-details-box p-1 d-flex flex-row-reverse" @mouseover="hide_product_type()">
      <div class="dt-img d-flex flex-column col-5 col-lg-5">
        <img :src="image">
        <div class="d-flex mt-2 justify-content-center">
          <div>
            <span class="fa fa-star checked"></span>
            <span class="fa fa-star checked"></span>
            <span class="fa fa-star checked"></span>
            <span class="fa fa-star"></span>
            <span class="fa fa-star"></span>
          </div>
          <div class="mr-2">{{to_fa("میانگین 35560 رای")}}</div>
        </div>
      </div>
      <div class="d-flex flex-column w-100 col-12 col-lg-7">
              <div class="dt-title text-dark w-100 text-right px-3 py-2">{{title}}</div>     
              <div class="card-box-footer py-2 px-3 w-100 text-right">مهلت سفارش گیری:
                  {{to_fa(time_remaining)}}
              </div>
          <div class="card-box-footer pb-2 px-3 w-100 text-right">زمان تحویل:
              {{to_fa(delivery_date)}}
          </div>
                  <div class="card-box-footer py-2 px-3 w-100 text-right">
                  <div class="card-box-price p-1 w-100 text-right">
                  <div class="d-flex justify-content-between">
                  <div>از {{to_fa(max_price(prices))}} تومان</div>
                  <div>تا {{to_fa(min_price(prices))}} تومان</div>
                </div>    
                  </div>
                  <div class="progress">
                      <div class="progress-bar bg-warning px-2" role="progressbar" :style="{width: (ordered_num/max_order)*100 + '%'}"
                      aria-valuenow="30" aria-valuemin="0" :aria-valuemax="max_order"></div>
                  </div>
                      <div class="d-flex justify-content-between p-1">
                        <div>{{to_fa(ordered_num)}} سفارش از</div>
                        <div>{{to_fa(max_order)}} سفارش</div>
                      </div>
                  </div>  
                  <div class="p-2">
                  <table class="table price-range">
                  <thead>
                    <tr>
                      <th>رنج سفارش</th>
                      <th>قیمت</th>
                    </tr>
                  </thead>
                  <tbody>
                  <tr v-for="(item, index) in get_order_ranges(order_ranges)" :key="index">
                      <td>{{to_fa(item)}}</td>
                      <td>{{to_fa(get_prices(prices,index))}}</td>
                  </tr>
                  </tbody>
                </table>
                </div>
                  <div id="order-amount" class="w-100 p-2 px-3 d-flex flex-row text-right">
                  <div class="d-flex flex-row cart-amount-input col-9 p-0">
                    <input type="text" min="1" class="p-2 dt-order-amount col-lg-11" v-model="order_amount" @input="get_order_amount(order_amount)" placeholder="میزان سفارش شما" name="order_amount" id="order_amount"> 
                    <div class="d-flex flex-column mt-1">
                        <i @click="basket_plus(order_amount)" class="mr-2 fas fa-plus text-success"></i>
                        <i @click="basket_minus(order_amount)" class="mr-2 mt-2 fas fa-minus text-danger"></i>
                    </div>
                  </div>
                          <input type="button" name="" id="" class="btn btn-success mr-2" :disabled="disabled" :title="title_msg" role="button" @click="add_to_cart(title,order_amount)" value="افزودن به سبد خرید"></input> 
                  </div>      
                  <div class="p-2 text-justify">
                   {{desc}}
                  </div>
      </div>    
  </div>
  </div>
  </transition>
  `
});

Vue.component('cart-items', {
  data() {
    return {
      cart_data: '',
      disabled: true,
      cart_sum: 0,
    }
  },
  mounted() {
    this.save_cart_data(this.c_data);
    ifvisible.on("focus", this.get_cart_data);
  },
  methods: {
    save_cart_data(cart_data){
      var cart_items = cart_data.replace(/'/g, '"');
      cart_items = JSON.parse(cart_items);
      this.cart_data = cart_items;
      for (var i = 0; i < cart_items.length; i++){
        store.commit('set_base_cart_amounts', {'id': i, 'value': cart_items[i].amount.toPersianDigits()});
        store.commit('set_cart_amounts', {'id': i, 'value': cart_items[i].amount.toPersianDigits()});
        var num = parseInt(this.cart_data[i].price_all.replace(/,/g, '').toEnglishDigits());
        this.cart_sum += num;
      }
    },
    get_cart_data() {
      this.cart_sum = 0;
      this.$http.post('/cart/').then(response => {
        var cart_items = response.body;
        if(this.is_cart_changed_web(cart_items)){
          this.cart_data = cart_items;
          for (var i = 0; i < cart_items.length; i++){
            store.commit('set_base_cart_amounts', {'id': i, 'value': cart_items[i].amount.toPersianDigits()});
            store.commit('set_cart_amounts', {'id': i, 'value': cart_items[i].amount.toPersianDigits()});
            var num = parseInt(this.cart_data[i].price.replace(/,/g, '').toEnglishDigits()) * store.state.cart_amounts[i].toEnglishDigits();
            this.cart_sum += num;
          }
        }
      }, response => {
        // error callback
      });
    },
    is_cart_changed_web(arr){
      var arr1 = [];
      for (var i = 0; i < arr.length; i++){
        arr1.push(arr[i].amount);
      }
      var arr2 = store.state.cart_amounts;
      for(var i = arr1.length; i--;) {
          if(arr1[i] !== arr2[i]){
            return true;
        }
    }
    return false;
    },
    is_cart_changed(value, index){
      var fa_amount = value.toPersianDigits();
      var arr1 = store.state.base_cart_amounts;
      var arr2 = store.state.cart_amounts;
      store.commit('set_cart_amounts', {'id': index, 'value': fa_amount});
      this.cart_sum = 0;
      for(var i = arr1.length; i--;) {
        var num = parseInt(this.cart_data[i].price.replace(/,/g, '').toEnglishDigits()) * arr2[i].toEnglishDigits();
        this.cart_sum += num;
        if(arr2[i] == ''){
          this.disabled = true;
          return false;
      }
  }
      for(var i = arr1.length; i--;) {
          if(arr1[i] !== arr2[i]){
            this.disabled = false;
            return false
        }
    }
    this.disabled = true;
    },
    update_cart() {
      var amounts = store.state.cart_amounts;
      this.$http.get('/update_cart?cart_amounts=' + amounts).then(response => {
        this.set_msg('سبد خرید با موفقیت به روزرسانی شد', 'alert-success');
        store.commit('reset_base_cart_amounts');
        this.disabled = true;
      }, response => {
        // error callback
      });
    },
    cart_plus(i, value) {
      var num = value.toEnglishDigits();
      if (value == ''){
        num = "0";
      }
      var amount = (parseInt(num) + 1).toString();
      store.commit('set_cart_amounts', {'id': i, 'value': amount.toPersianDigits()});
      this.is_cart_changed(store.state.cart_amounts[i], i);
    },
    cart_minus(i, value) {
      var num = value.toEnglishDigits();
      if (value == ''){
        num = "2";
      }
      if(num < 2){
        num = "2";
      }
      var amount = (parseInt(num) - 1).toString();
      store.commit('set_cart_amounts', {'id': i, 'value': amount.toPersianDigits()});
      this.is_cart_changed(store.state.cart_amounts[i], i);
    },
},
props: ['c_data',],
template: `
<table class="my-2 col-12 col-lg-11 table cart-table">
                    <thead>
                      <tr>
                        <th style="width:25px;"></th>
                        <th>نام کالا</th>
                        <th>میزان سفارش</th>
                        <th>قیمت جزء</th>
                        <th>قیمت کل</th>
                      </tr>
                    </thead>
                    <tbody>
                    <tr v-for="(item, index) in cart_data" :key="index">
                        <td>{{to_fa(index+1)}}</td>
                        <td>{{item.title}}</td>
                        <td class="position-relative">
                            <div class="d-flex flex-row cart-amount-input">
                                    <input type="text" class="p-1" @input="is_cart_changed(store.state.cart_amounts[index], index)" v-model="store.state.cart_amounts[index]">
                                    <div class="d-flex flex-column">
                                            <i @click="cart_plus(index, store.state.cart_amounts[index])" class="mr-2 fas fa-plus text-success"></i>
                                            <i @click="cart_minus(index, store.state.cart_amounts[index])" class="mr-2 mt-2 fas fa-minus text-danger"></i>
                                    </div>
                            </div>
                        </td>
                        <td>{{to_fa(item.price)}}</td>
                        <td>{{to_fa(multiply(item.price, store.state.cart_amounts[index]))}}</td>
                    </tr>
                    <tr class="table-secondary">
                    <td></td>
                    <td class="align-middle">جمع کل: {{to_fa_s(cart_sum)}} تومان</td>
                    <td></td>
                    <td></td>
                    <td colspan=2 class="text-left"><input type="button" class="btn btn-success" :disabled="disabled" value="به روزرسانی سبد خرید" @click='update_cart()'></td>
                    </tr>
                    </tbody>
                  </table>
`,
});

Vue.component('message', {
  props: ['msg', 'msgtype'],
  mounted() {
    // this.set_msg('this.msg', "alert-success");
  },
template: `
<transition name="fade-slideup">
<div v-if="store.state.shw_alert" :class="store.state.msg_type" class="msg-box alert fixed-bottom text-right m-0 m-lg-2 p-2">{{store.state.msg_text}}</div>
</transition>
`
});

var vm = new Vue({
    delimiters: ['[[', ']]'],
    el: '#app',
    data: {
        shw_use_period: true,
        shw_overlay: false,
        product_type: [],
        shw_products: false,
        shw_api_results: false,
        shw_overlay2: false,
        header_height: 0,
        cat_header_height: 0,
        selected_city: 'تهران',
        min_price: '',
        max_price: '',
        cards_container_height: '',
        cart_container_height: '',
        search_term: '',
        products: [],
        search_products: [],
        updated_cart_data: '',
        disabled: true,
        cart_amounts: [],
    },
    mounted:function(){
      document.querySelector('#search').focus();
      this.get_header_height();
      var cat = location.href.substring(location.href.lastIndexOf('/') + 1).replace(/#/g, '').replace(/-/g, ' ');
      this.shw_products_by_category(cat);
      window.addEventListener("resize", this.get_header_height);
},
    methods: {
    set_price_filter(p, a){
      if (a == "m" && p != ""){
        this.min_price = p.toPersianDigits();
      } else if (a == "h" && p != "") {
        this.max_price = p.toPersianDigits();
      }
    },
      get_header_height(){
        this.header_height = document.querySelector('#header').offsetHeight;
        this.cat_header_height = document.querySelector('.cat-header').offsetHeight;
        var a = "calc(100vh - " + (this.cat_header_height + this.header_height) + "px)";
        var b = "calc(100vh - " + (this.cat_header_height + this.header_height + 33) + "px)";
        this.cards_container_height = {height: a};
        this.cart_container_height = {height: b};
      },
      shw_product_type(index){
        if(this.product_type[index] == true){
          this.$set(this.product_type, index, false);
          this.shw_overlay = false;
          return false;
        }
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
      shw_products_by_category(t){
        this.shw_products = true;
        this.shw_overlay = false;
        this.hide_product_type();
        this.$http.get('/api/products/?category='+t).then(response => {
          this.shw_api_results = false;
          const body = response.body;
          const results = body.results;
          if(body.count != 0) {
            for (let i = 0; i < results.length; i++) {
              this.$set(this.products, i, results[i])
            }
            this.shw_api_results = false;
            this.shw_products = true;
          } else {
            this.products = [];
          }

        }, response => {
          console.log('error');
          // error callback
        });
      },
      search(s){
        this.search_products = [];
        this.shw_products = false;
        store.commit('set_shw_alert', false);
        store.commit('clear_msg_timeout');
        if(s != ''){
          this.$http.get('/api/products/?search='+s).then(response => {
            // get body data
            const body = response.body;
            const results = body.results;
            if(body.count != 0) {
              this.shw_products = false;
              this.shw_api_results = true;
              for (let i = 0; i < results.length; i++) {
                this.$set(this.search_products, i, results[i])
              }
            } else {
              this.set_msg("نتیجه ای یافت نشد", 'alert-danger');
              this.shw_api_results = false;
              this.shw_products = true;
            }
  
          }, response => {
            console.log('error');
            // error callback
          });
        } else {
          this.shw_api_results = false;
          this.shw_products = true;
        }
      },
    },
  });
  