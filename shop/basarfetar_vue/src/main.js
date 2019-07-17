import Vue from 'vue/dist/vue'
import router from './router'
import store from './store'
import vSelect from 'vue-select'
import VueResource from 'vue-resource'
import Router from 'vue-router'
import vueTopprogress from 'vue-top-progress'
import Message from '@/components/Message.vue';
import productdetailesbox from '@/components/ProductDetailesBox.vue';
import productcard from '@/components/ProductCard.vue';
import carttable from '@/components/CartTable.vue';
import pagination from '@/components/Pagination.vue';
import subcategories from '@/components/SubCategories.vue';

Vue.use(Router);
Vue.use(VueResource);
Vue.use(vueTopprogress)
Vue.component('v-select', vSelect);
Vue.config.productionTip = false;

String.prototype.toEnglishDigits = function () {
  return this.replace(/[۰-۹]/g, function (w) {
    var persian = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
    return persian.indexOf(w);
  });
};
String.prototype.toPersianDigits = function () {
  var persian = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
  return this.replace(/[0-9]/g, function (w) {
    return persian[+w]
  });
}

Vue.mixin({
  data() {
    return {
      provinces: [
        "آذربایجان‌شرقی",
        "آذربایجان‌غربی",
        "اردبیل",
        "اصفهان",
        "البرز",
        "ایلام",
        "بوشهر",
        "تهران",
        "چهارمحال‌و‌بختیاری",
        "خراسان‌جنوبی",
        "خراسان‌رضوی",
        "خراسان‌شمالی",
        "خوزستان",
        "زنجان",
        "سمنان",
        "سیستان‌و‌بلوچستان",
        "فارس",
        "قزوین",
        "قم",
        "كردستان",
        "كرمان ",
        "كرمانشاه",
        "کهگیلویه‌و‌بویراحمد",
        "گلستان",
        "گیلان",
        "لرستان",
        "مازندران",
        "مركزی",
        "هرمزگان",
        "همدان",
        "یزد",
      ],
    }
  },
  methods: {
    to_fa(num, dontTrim) {
      var i = 0,
        dontTrim = dontTrim || false,
        num = dontTrim ? num.toString() : num.toString().trim(),
        len = num.length,
        res = '',
        pos,
        persianNumbers = typeof persianNumber == 'undefined' ? ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'] :
        persianNumbers;
      for (; i < len; i++)
        if ((pos = persianNumbers[num.charAt(i)]))
          res += pos;
        else
          res += num.charAt(i);
      return res;
    },
    multiply(a, b) {
      var x = a.toEnglishDigits().replace(/,/g, '');
      var y = b.toEnglishDigits().replace(/,/g, '');
      return (x * y).toLocaleString();
    },
    to_fa_s(x) {
      return this.to_fa(x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","));
    },
    set_msg(txt, type) {
      store.commit('set_msg_text', txt);
      store.commit('set_msg_type', type);
      store.commit('set_shw_alert', true);
      store.commit('set_msg_timeout');
    },
    trimbr(str) {
      return str.replace(/^\s+|\s+$/g, '');
    },
    update_cart(shw_msg) {
      var amounts = store.state.cart_amounts;
      return this.$http.get('/update_cart?cart_amounts=' + amounts).then(response => {
        if (shw_msg) {
          this.set_msg('سبد خرید با موفقیت به روزرسانی شد', 'alert-success');
        }
        store.commit('reset_base_cart_amounts');
        this.disabled = true;
      }, response => {
        this.set_msg('خطا! از اتصال اینترنت خود مطمئن شوید یا لحظاتی بعد مجددا امتحان کنید', 'alert-danger');
        console.log(response.status);
      });
    },
    hide_product_type() {
      for (var i = 0; i < store.state.product_type.length; i++) {
        store.commit('set_product_type', {'index': i, 'status': false});
      }
      store.commit('set_overlay', false);
    },
  }
});

new Vue({
  router: router,
  store,
  components: {Message, productcard, productdetailesbox, carttable, pagination, subcategories},
  delimiters: ['[[', ']]'],
  data: {
    shw_use_period: true,
    header_height: 0,
    cat_header_height: 0,
    search_term: '',
    updated_cart_data: '',
    disabled: true,
    order_disabled: false,
    cart_amounts: [],
    shw_products: false,
    shw_api_results: false,
    next_disabled: true,
    next_page: null,
  },
  mounted: function () {
    document.querySelector('#search').focus();
    this.get_header_height();
    window.addEventListener("resize", this.get_header_height);
  },
  methods: {
    get_header_height() {
      this.header_height = document.querySelector('#header').offsetHeight;
      this.cat_header_height = document.querySelector('.cat-header').offsetHeight;
      var a = "calc(100vh - " + (this.cat_header_height + this.header_height + 1) + "px)";
      var b = "calc(100vh - " + (this.cat_header_height + this.header_height + 1) + "px)";
      store.commit('set_cards_container_height', {height: a});
      store.commit('set_cart_container_height', {minHeight: b});
    },
    shw_product_type(index) {
      if (store.state.product_type[index] == true) {
        store.commit('set_product_type', {'index': index, 'status': false});
        store.commit('set_overlay', false);
        return false;
      }
      for (var i = 0; i < store.state.product_type.length; i++) {
        store.commit('set_product_type', {'index': i, 'status': false})
      }
      store.commit('set_overlay', true);
      store.commit('set_product_type', {'index': index, 'status': true});
    },
    search(s) {
      store.commit('clear_search_products');
      router.push('/');
      this.shw_products = false;
      store.commit('set_shw_alert', false);
      if (s.length >= 2) {
        this.$http.get('/api/products/?search=' + s).then(response => {
          const body = response.body;
          this.next_page = body.next;
          if (this.next_page != null) {
            this.next_disabled = false;
          }
          const results = body.results;
          if (body.count != 0) {
            this.shw_products = false;
            this.shw_api_results = true;
            for (let i = 0; i < results.length; i++) {
              store.commit('set_search_products', {'index': i, 'search_product': results[i]});
            }
          } else {
            this.set_msg("نتیجه ای یافت نشد", 'alert-danger');
          }
          if (this.next_page == null) {
            this.next_disabled = true;
          }
        }, response => {
          this.set_msg('خطا! از اتصال اینترنت خود مطمئن شوید یا لحظاتی بعد مجددا امتحان کنید', 'alert-danger');
          console.log(response.status);
        });
      } else {
        this.shw_api_results = false;
        this.shw_products = true;
      }
    },
    next_page_f() {
      store.commit('set_overlay', false);
      this.hide_product_type();
      var api_url = this.next_page;
      if (this.next_page != null) {
        this.$http.get(api_url).then(response => {
          const body = response.body;
          this.next_page = body.next;
          const results = body.results;
          if (body.count != 0) {
            if (api_url.indexOf("search") !== -1) {
              const plength = store.state.search_products.length;
              for (let i = 0; i < results.length; i++) {
                store.commit('set_search_products', {'index': i + plength, 'search_product': results[i]});
              }
            } else {
              const plength = this.products.length;
              for (let i = 0; i < results.length; i++) {
                this.$set(this.products, i + plength, results[i]);
              }
            }
          }
          if (this.next_page == null) {
            this.next_disabled = true;
          }
        }, response => {
          this.set_msg('خطا! از اتصال اینترنت خود مطمئن شوید یا لحظاتی بعد مجددا امتحان کنید', 'alert-danger');
          console.log(response.status);
        });
      }
    },
    async submit_order() {
      this.order_disabled = true;
      await this.update_cart(false);
      this.set_msg('سفارش شما با موفقیت ثبت شد.', 'alert-success');
    },
  },
}).$mount('#app')