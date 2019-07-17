<template>
  <div
    class="card-box my-2 d-flex flex-column align-items-center"
    @click="shw_product_details()"
  >
    <h1 class="card-box-title mb-0 p-2 px-3 w-100 text-right" :title="title">{{to_fa(title)}}</h1>
    <div class="card-box-footer py-2 px-3 w-100 text-right">
      مهلت ثبت سفارش:
      {{to_fa(time_remaining)}}
    </div>
    <div class="card-box-footer pb-2 px-3 w-100 text-right">
      زمان تحویل:
      {{to_fa(delivery_date)}}
    </div>
    <div class="card-box-img">
      <img :src="['/media/' + image]" />
    </div>
    <div class="card-box-price pt-1 px-2 w-100 text-right">
      <div class="d-flex justify-content-between">
        <div>از {{to_fa(max_price(prices))}} تومان</div>
        <div>تا {{to_fa(min_price(prices))}} تومان</div>
      </div>
    </div>
    <div class="card-box-footer p-2 w-100 text-right">
      <div class="progress">
        <div
          class="progress-bar bg-warning px-2"
          role="progressbar"
          :style="{width: (ordered_num/max_order)*100 + '%'}"
          aria-valuenow="30"
          aria-valuemin="0"
          :aria-valuemax="max_order"
        ></div>
      </div>
      <div class="d-flex justify-content-between p-1">
        <div>{{to_fa(ordered_num)}} سفارش از</div>
        <div>{{to_fa(max_order)}} سفارش</div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: "productcard",
  props: {
    title: String,
    max_order: String,
    delivery_date: String,
    time_remaining: String,
    prices: String,
    image: String,
    order_ranges: String,
    pid: Number,
    ordered_num: Number,
  },
    methods: {
    shw_product_details() {
      this.$store.commit('set_overlay2', {
        'status': true
      });
      this.$store.commit('set_details_box', {
        'id': this.pid,
        'status': true
      });
      this.$store.commit('set_ordered_num', {
        'id': this.pid,
        'num': this.ordered_num
      });
      this.$store.commit("set_order_ranges", {
        id: this.pid,
        ranges: this.order_ranges
    });
      var ordered_num = this.$store.state.ordered_num[this.pid];
      var order_ranges = this.$store.state.order_ranges[this.pid];
      var order_ranges_arr = order_ranges.split('\n');
      this.$store.commit('set_which_sold', '-1');
      for (var i = order_ranges_arr.length; i--;) {
        var order_range = order_ranges_arr[i].match(/^(\d+)\s*-\s*(\d+)/);
        var min = order_range[1];
        var max = order_range[2];
        if (max > ordered_num && ordered_num >= min) {
          this.$store.commit('set_which_sold', i);
          return;
        }
      }
    },
    min_price(prices) {
      var p = prices.split('\n');
      return Math.min(...p).toLocaleString();
    },
    max_price(prices) {
      var p = prices.split('\n');
      return Math.max(...p).toLocaleString();
    },
  },
};
</script>