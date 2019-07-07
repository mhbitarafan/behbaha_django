const store = new Vuex.Store({
  state: {
    shw_overlay2: false,
    sh_details_box: [],
  },
  mutations: {
    overlay2_f(state) {
      state.shw_overlay2 = false;
    },
    overlay2_t(state) {
      state.shw_overlay2 = true;
    },
    details_box_f(state, i) {
      Vue.set(state.sh_details_box, i, false);
    },
    details_box_t(state, i) {
      Vue.set(state.sh_details_box, i, true);
    },
  }
});

Vue.component('v-select', VueSelect.VueSelect);

Vue.component('product-card', {
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
shw_product_details(id){
  store.commit('overlay2_t');
  store.commit('details_box_t', id);
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
      order_amount: '',
    }
  },
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
  toEnglishNum( num, dontTrim ) {
    var i = 0,
    dontTrim = dontTrim || false,
    num = dontTrim ? num.toString() : num.toString().trim(),
    len = num.length,
    res = '',
    pos,
    persianNumbers = typeof persianNumber == 'undefined' ?
        ['0', '1', '2', '۳', '۴', '۵', '۶', '۷', '۸', '۹'] :
        persianNumbers;
for (; i < len; i++)
    if (( pos = persianNumbers[num.charAt(i)] ))
        res += pos;
    else
        res += num.charAt(i);
return res;
},
    hide_overlay2(id){
      store.commit('overlay2_f');
      store.commit('details_box_f', id);
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
    this.order_amount = this.to_fa(o);
  },
  add_to_cart(title,o_amount){
    vm.shw_alert = false;
    this.$http.get('/add_to_cart?title='+title+'&order_amount='+o_amount).then(response => {
      vm.set_msg("'" + o_amount + ' ' + title + "'" + ' به سبد خرید افزوده شد', 'alert-success');
    }, response => {
      // error callback
    });
  },
},
props: ['title', 'max_order', 'delivery_date', 'time_remaining', 'prices', 'image', 'desc', 'order_ranges', 'pid', 'ordered_num',],
  template: `
  <div v-if="store.state.sh_details_box[pid]">
  <div v-if="store.state.shw_overlay2" class="overlay overlay2" @click="hide_overlay2(pid)" @mouseover="hide_product_type()">
    <div class="position-absolute close-btn"><i class="fas fa-times"></i></div>
  </div>
  <transition name="fade">
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
                          <input type="text" min="1" class="p-2 dt-order-amount col col-lg-5" v-model="order_amount" @input="get_order_amount(order_amount)" placeholder="میزان سفارش شما" name="order_amount" id="order_amount"> 
                          <input type="button" name="" id="" class="btn btn-success mr-2" :href="'/cart?title='+title+'&order_amount='+order_amount" :disabled="order_amount===''" role="button" @click="add_to_cart(title,order_amount)" value="افزودن به سبد خرید"></input> 
                  </div>      
                  <div class="p-2 text-justify">
                   {{desc}}
                  </div>
      </div>     
        
  </div>
</transition>
</div>
  `
});

Vue.component('cart-items', {
  data() {
    return {
      a: '',
    }
  },
  mounted() {
    this.save_cart_data(this.c_data);
  },
  methods: {
    save_cart_data(cart_data){
      vm.shw_alert = true;
      // console.log(vm.shw_alert);
      // var cart_items = cart_data.replace(/'/g, '"');
      // cart_items = JSON.parse(cart_items);
      // for (var i = 0; i < cart_items.length; i++){
      //   vm.cart_amount =['f'];
      //   // this.$set(vm.cart_amount, i, cart_items[i].amount);
      //   console.log(vm.cart_amount)
      // }
      // console.log(this.cart_amount);
      // this.cart_data = cart_items;
    },
},
props: ['c_data',],
  template: ``
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
        shw_alert: false,
        search_term: '',
        products: [],
        msg_text: '',
        msg_type: '',
        cart_data: '',
        updated_cart_data: '',
        disabled: true,
        cart_amount: [],
    },
    mounted:function(){
      document.querySelector('#search').focus();
      this.get_header_height();
      window.addEventListener("resize", this.get_header_height);
},
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
    set_price_filter(p, a){
      if (a == "m" && p != ""){
        this.min_price = this.to_fa(p);
      } else if (a == "h" && p != "") {
        this.max_price = this.to_fa(p);
      }
    },
      get_header_height(){
        this.header_height = document.querySelector('#header').offsetHeight;
        this.cat_header_height = document.querySelector('.cat-header').offsetHeight;
        var a = "calc(100vh - " + (this.cat_header_height + this.header_height + 10) + "px)";
        var b = "calc(100vh - " + (this.cat_header_height + this.header_height + 40) + "px)";
        this.cards_container_height = {height: a};
        this.cart_container_height = {height: b};
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
      set_msg(txt, type){
        vm.shw_alert = true;
        this.msg_text = txt;
        this.msg_type = type;
        setTimeout(() => {
          vm.shw_alert = false;
        }, 4000);
      },
      is_cart_changed(){
        return true;
      },

      update_cart() {
        console.log(this.cart_amount);
        // var a = c_data.replace(/'/g, '"');
        // this.updated_cart_data = a;
        // if(this.updated_cart_data == this.cart_data){
        //   console.log('true');
        // }
      },
      shw_products_by_category(t){
        this.shw_products = false;
        this.shw_overlay = false;
        store.commit('details_box_f');
        store.commit('overlay2_f');
        this.hide_product_type();
        this.$http.get('/api/products/?category='+t).then(response => {
          // get body data
          this.shw_api_results = true;
          vm.shw_alert = false;
          const body = response.body;
          const results = body.results;
          if(body.count != 0) {
            for (let i = 0; i < results.length; i++) {
              this.$set(this.products, i, results[i])
            }
          } else {
            this.shw_api_results = false;
            this.shw_products = true;
            this.products = [];
          }

        }, response => {
          console.log('error');
          // error callback
        });
      },
      search(s){
        this.products = [];
        this.shw_products = false;
        this.$http.get('/api/products/?search='+s).then(response => {
          // get body data
          this.shw_api_results = true;
          vm.shw_alert = false;
          const body = response.body;
          const results = body.results;
          if(body.count != 0) {
            for (let i = 0; i < results.length; i++) {
              this.$set(this.products, i, results[i])
            }
          } else {
            this.set_msg("نتیجه ای یافت نشد", 'alert-danger');
            this.shw_api_results = false;
            this.shw_products = true;
            this.products = [];
          }

        }, response => {
          console.log('error');
          // error callback
        });
      },
    },
  });
  