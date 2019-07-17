<template>
<div class="cards-container d-flex flex-row-reverse">
<div class="products-filters-sidebar col-12 col-md-3 col-lg-2 text-right p-2 px-2">
    <div class="d-flex flex-column">
        <div class="d-flex flex-column border-bottom">
            <div>شهر</div>
            <v-select dir="rtl" :clearable="false" :options="provinces" v-model="selected_city" class="mt-2 bg-light">
            <div slot="no-options">استان مورد نظر یافت نشد</div>
            </v-select>
        </div>
        <div class="d-flex flex-column border-bottom p-2">
            <div>نوع مصرف</div>
            <div class="d-flex flex-row mt-3">
                <a name="" id="" class="btn btn-light ml-2" href="#" role="button">خانگی</a>
                <a name="" id="" class="btn btn-light" href="#" role="button">صنعتی</a>
            </div>
        </div>
    </div>
    <div class="d-flex flex-column mt-2">
        <div class="d-flex flex-column border-bottom p-2">
            <div>قیمت</div>
            <div class="mt-2 ml-2">حداقل</div>
            <input class="mt-1 p-2 rounded border" v-model="min_price" @input="set_price_filter(min_price, 'm')"
                type="string" name="min-price" id="min-price">
            <div class="mt-2 ml-2">حداکثر</div>
            <input class="mt-1 p-2 rounded border" v-model="max_price" @input="set_price_filter(max_price, 'h')"
                type="string" name="max-price" id="max-price">
        </div>
    </div>
    <button class="btn btn-primary m-2" @click="filter_products(min_price, max_price)">فیلتر کن</button>
</div>
<div class="d-flex flex-column col-12 col-md col-lg align-items-center p-0 justify-content-between" dir="ltr" style="overflow: auto;"
    :style="$store.state.cards_container_height">
    <div v-if="$root.shw_products" class="product-cards w-100 p-3">
        <productcard v-for="(product, index) in products" :key="'A' + index" :pid="index" :title="product.title"
            :image="product.featured_image" :max_order="product.max_order" :ordered_num="product.ordered_num"
            :delivery_date="product.deliver_at" :time_remaining="product.remaining_time" :prices="product.prices" :order_ranges="product.order_ranges">
            </productcard>
        <productdetailesbox v-for="(product, index) in products" :key="'B' + index" :pid="index" :title="product.title"
            :desc="product.description" :image="product.featured_image" :max_order="product.max_order"
            :ordered_num="product.ordered_num" :delivery_date="product.deliver_at"
            :time_remaining="product.remaining_time" :prices="product.prices" :order_ranges="product.order_ranges"></ProductDetailesBox>
    </div>
    <div v-if="$root.shw_api_results" class="product-cards w-100 p-3">
        <productcard v-for="(product, index) in $store.state.search_products" :key="'C' + index" :pid="index" :title="product.title"
            :image="product.featured_image" :max_order="product.max_order" :ordered_num="product.ordered_num"
            :delivery_date="product.deliver_at" :time_remaining="product.remaining_time" :prices="product.prices" :order_ranges="product.order_ranges">  
            </productcard>
        <productdetailesbox v-for="(product, index) in products" :key="'D' + index" :pid="index" :title="product.title"
            :desc="product.description" :image="product.featured_image" :max_order="product.max_order"
            :ordered_num="product.ordered_num" :delivery_date="product.deliver_at"
            :time_remaining="product.remaining_time" :prices="product.prices" :order_ranges="product.order_ranges">
        </productdetailesbox>    
    </div>
    <div v-if="!$root.next_disabled" class="page-numbers-container row py-2 text-center justify-content-center w-100">
        <button :disabled="$root.next_disabled" class="btn btn-outline-dark py-2" @click="next_page_f()">
            <i class="fa fa-chevron-double-down" aria-hidden="true"></i>
            محصولات بیشتر
        </button>
    </div>
</div>
</div>
</template>

<script>
import productcard from '@/components/ProductCard.vue'
import productdetailesbox from '@/components/ProductDetailesBox.vue'
export default {
  name: 'cart',
  components: {productcard, productdetailesbox},
  data() {
      return {
        selected_city: 'تهران',
        min_price: '',
        max_price: '',
        products: [],
      }
  },
  mounted() {
    var cat = location.href.substring(location.href.lastIndexOf('/') + 1).replace(/#/g, '').replace(/-/g, ' ');
        if (cat == '') {
            this.shw_products_all();
        } else {
            this.shw_products_by_category(cat);
    }
  },
  methods: {
    shw_products_all() {
      this.$root.$refs.topProgress.start();
      this.$root.shw_products = true;
      this.$store.commit('set_overlay', false);
      this.hide_product_type();
      var api_url = '/api/products/'
      this.$http.get(api_url).then(response => {
        this.$root.$refs.topProgress.done();
        this.$root.shw_api_results = false;
        const body = response.body;
        this.next_page = body.next;
        const results = body.results;
        if (body.count != 0) {
          for (let i = 0; i < results.length; i++) {
            this.$set(this.products, i, results[i]);
          }
          this.$root.shw_api_results = false;
          this.$root.shw_products = true;
        }
        if (this.next_page == null) {
          this.$root.next_disabled = true;
        }
      }, response => {
        this.$root.$refs.topProgress.fail()
        this.set_msg('خطا! از اتصال اینترنت خود مطمئن شوید یا لحظاتی بعد مجددا امتحان کنید', 'alert-danger');
        console.log(response);
      });
    },
    shw_products_by_category(t) {
      this.$root.$refs.topProgress.start();
      this.$root.shw_products = true;
      this.$store.commit('set_overlay', false);
      this.hide_product_type();
      var api_url = '/api/products/?category=' + t;
      this.$http.get(api_url).then(response => {
        this.$root.$refs.topProgress.done();
        this.$root.shw_api_results = false;
        const body = response.body;
        this.next_page = body.next;
        const results = body.results;
        if (body.count != 0) {
          for (let i = 0; i < results.length; i++) {
            this.$set(this.products, i, results[i]);
          }
          this.$root.shw_api_results = false;
          this.$root.shw_products = true;
        }
        if (this.next_page == null) {
          this.$root.next_disabled = true;
        }

      }, response => {
        this.$root.$refs.topProgress.fail()
        this.set_msg('خطا! از اتصال اینترنت خود مطمئن شوید یا لحظاتی بعد مجددا امتحان کنید', 'alert-danger');
        console.log(response);
      });
    },
    set_price_filter(p, a) {
      if (a == "m" && p != "") {
        this.min_price = p.toPersianDigits();
      } else if (a == "h" && p != "") {
        this.max_price = p.toPersianDigits();
      }
    },
        filter_products(min, max){
      store.commit('clear_search_products');
      min = min.toEnglishDigits();
      max = max.toEnglishDigits();
      var api_url = `/api/products/?min_price=${min}&max_price=${max}`;
      if(min == '' && max == ''){
        this.set_msg("لطفا فیلتر قیمت را وارد کنید.", 'alert-success');
        return;
      }
      if(max == '' && min != ''){
        var api_url = '/api/products/?min_price=' + min;
      }
      if(min == '' && max != ''){
        var api_url = '/api/products/?max_price=' + max;
      }
        this.$http.get(api_url).then(response => {
        const body = response.body;
        this.next_page = body.next;
        if (this.next_page != null) {
          this.$root.next_disabled = false;
        }
        const results = body.results;
        if (body.count != 0) {
          this.$root.shw_products = false;
          this.$root.shw_api_results = true;
          for (let i = 0; i < results.length; i++) {
            this.$store.commit('set_search_products', {'index': i, 'search_product': results[i]});
          }
        } else {
          this.set_msg("نتیجه ای یافت نشد", 'alert-danger');
        }
        if (this.next_page == null) {
          this.$root.next_disabled = true;
        }
      }, response => {
        this.set_msg('خطا! از اتصال اینترنت خود مطمئن شوید یا لحظاتی بعد مجددا امتحان کنید', 'alert-danger');
        console.log(response);
      });
    },
  },
}
</script>