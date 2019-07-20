<template>
<transition name="fade-zoom">
  <div v-if="$store.state.sh_details_box[pid]" class="dt-container">
  <!-- <div v-if="$store.state.shw_overlay2" class="overlay overlay2" @click="hide_overlay2(pid)" @mouseover="hide_product_type()"></div> -->
  <div class="position-fixed close-btn" @click="hide_overlay2(pid)"><i class="fal fa-times"></i></div>
  <div v-if="$store.state.sh_details_box[pid]" class="product-details-box p-1 row flex-row-reverse" @mouseover="hide_product_type()">
      <div class="dt-img d-flex flex-column col-12 col-lg-5 mt-5">
        <img :src="['/media/' + image]">
        <div class="d-flex mt-2 mb-4 justify-content-center">
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
      <div class="d-flex flex-column w-100 col-12 col-lg-7 mt-2">
              <div class="dt-title text-dark w-100 text-right px-3 py-2 mt-0 mt-lg-5">{{to_fa(title)}}</div>     
              <div class="card-box-footer py-2 px-3 w-100 text-right">مهلت ثبت سفارش:
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
                      <th>محدوده سفارش</th>
                      <th>قیمت</th>
                    </tr>
                  </thead>
                  <tbody>
                  <tr :class="{'alert success': time_remaining == 'به اتمام رسید' && index == $store.state.which_sold}" v-for="(item, index) in get_order_ranges(order_ranges)" :key="index">
                      <td>{{to_fa(item)}}</td>
                      <td :class="{'position-relative sold alert success': time_remaining == 'به اتمام رسید' && index == $store.state.which_sold}">{{to_fa(get_prices(prices,index))}}</td>
                  </tr>
                  </tbody>
                </table>
                <div class="alert alert-danger text-right" v-if="time_remaining == 'به اتمام رسید'">
                مهلت ثبت سفارش به پایان رسید.
                </div>
                </div>
                  <div v-if="time_remaining != 'به اتمام رسید'" id="order-amount" class="w-100 p-2 px-3 d-flex flex-row flex-wrap flex-lg-nowrap text-right">
                  <div class="d-flex flex-row cart-amount-input col-9 p-0">
                    <input type="text" min="1" class="p-2 dt-order-amount col-lg-11" v-model="order_amount" @input="get_order_amount(order_amount)" placeholder="میزان سفارش شما" name="order_amount" id="order_amount"> 
                    <div class="d-flex flex-column mt-1">
                        <i @click="basket_plus(order_amount)" class="mr-2 fas fa-plus text-success"></i>
                        <i @click="basket_minus(order_amount)" class="mr-2 mt-2 fas fa-minus text-danger"></i>
                    </div>
                  </div>
                          <input type="button" name="" id="" class="btn btn-success mr-2 mt-2 mt-lg-0" :disabled="disabled" :title="title_msg" role="button" @click="add_to_cart(title,order_amount)" value="افزودن به سبد خرید">
                  </div>      
                  <div class="dt-desc p-2 text-justify">{{trimbr(desc)}}</div>
      </div>    
  </div>
  </div>
  </transition>
</template>
<script>
export default {
  name: "productdetailesbox",
  props: {
    title: String,
    max_order: String,
    delivery_date: String,
    time_remaining: String,
    prices: String,
    image: String,
    desc: String,
    order_ranges: String,
    pid: Number,
    ordered_num: Number
  },
  data() {
    return {
      order_ranges_arr: [],
      base_order_amount: "",
      order_amount: "",
      disabled: true,
      title_msg: ""
    };
  },
  methods: {
    hide_overlay2(id) {
      this.$store.commit('set_overlay2', {
        'status': false
      });
      this.$store.commit('set_details_box', {
        'id': id,
        'status': false
      });
    },
    hide_product_type() {
      for (var i = 0; i < this.$store.state.product_type.length; i++) {
        this.$store.commit('set_product_type', {'index': i, 'status': false});
      }
      this.$store.commit('set_overlay', false);
    },
    get_order_ranges(o) {
      var o_range = o.split('\n');
      return o_range;
    },
    get_prices(p, i) {
      var prices = p.split('\n');
      return parseInt(prices[i]).toLocaleString();
    },
    min_price(prices) {
      var p = prices.split('\n');
      return Math.min(...p).toLocaleString();
    },
    max_price(prices) {
      var p = prices.split('\n');
      return Math.max(...p).toLocaleString();
    },
    get_order_amount(o) {
      this.order_amount = o.toPersianDigits();
      if (this.base_order_amount == this.order_amount) {
        this.disabled = true;
      } else {
        this.disabled = false;
      }
    },
    add_to_cart(title, o_amount) {
      this.base_order_amount = this.order_amount;
      this.$store.commit('set_shw_alert', false);
      this.disabled = true;
      this.title_msg = 'این میزان سفارش به سبد خرید شما افزوده شده است، برای تغییر آن مقدار دلخواه خود را در کادر مربوطه وارد نمایید.';
      if (this.base_order_amount == this.order_amount) {
        this.disabled = true;
      } else {
        this.disabled = false;
        this.title_msg = '';
      }
      this.$http.get('/add_to_cart/?title=' + title + '&order_amount=' + o_amount).then(response => {
        this.set_msg("'" + o_amount + ' ' + title + "'" + ' به سبد خرید افزوده شد', 'success');
      }, response => {
        // error callback
      });
    },
    basket_plus(value) {
      var num = value.toEnglishDigits();
      if (value == '') {
        num = "0";
      }
      this.order_amount = (parseInt(num) + 1).toString().toPersianDigits();
      if (this.base_order_amount == this.order_amount) {
        this.title_msg = 'این میزان سفارش به سبد خرید شما افزوده شده است، برای تغییر آن مقدار دلخواه خود را در کادر مربوطه وارد نمایید.';
        this.disabled = true;
      } else {
        this.disabled = false;
        this.title_msg = '';
      }
    },
    basket_minus(value) {
      var num = value.toEnglishDigits();
      if (value == '') {
        num = "2";
      }
      if (num < 2) {
        num = "2";
      }
      this.order_amount = (parseInt(num) - 1).toString().toPersianDigits();
      if (this.base_order_amount == this.order_amount) {
        this.title_msg = 'این میزان سفارش به سبد خرید شما افزوده شده است، برای تغییر آن مقدار دلخواه خود را در کادر مربوطه وارد نمایید.';
        this.disabled = true;
      } else {
        this.disabled = false;
        this.title_msg = '';
      }
    },
  },
};
</script>