<template>
  <div
    class="noside-container py-3 bg-dark d-flex w-100 justify-content-center"
    :style="$store.state.cart_container_height"
  >
    <div class="d-flex flex-column col-12 bg-white col-lg-10 align-items-center p-2 shadow">
      <div class="row justify-content-center w-100">
        <form
          method="POST"
          action="/submit_order/"
          class="row justify-content-center text-right col-12"
          ref="order_form"
          @submit="submit_order()"
        >
          <div v-if="$store.state.base_cart_amounts.length != 0" class="d-flex flex-row w-100 justify-content-center">
            <h2 class="text-right mt-2 col-12 p-2 text-danger">سبد خرید</h2>
          </div>
          <carttable></carttable>
          <div v-if="$store.state.base_cart_amounts.length != 0" v-html="cart_page" class="col-12"></div>
        </form>
      </div>
          <div v-if="$store.state.base_cart_amounts.length == 0" v-html="cart_page" dir="ltr"></div>
    </div>
  </div>
</template>

<script>
import carttable from '@/components/CartTable.vue';
import ifvisible from "ifvisible";
export default {
  name: "cart",
  components: {carttable},
  data() {
    return {
      cart_page: "",
      order_disabled: false,
    };
  },
  mounted() {
    this.load_page();
    ifvisible.on("focus", this.load_page);
  },
  methods: {
    async submit_order() {
      this.order_disabled = true;
      await this.update_cart(false);
      this.set_msg('سفارش شما با موفقیت ثبت شد.', 'success');
    },
    load_page(){
        this.$http.get("/cart").then(
      response => {
        this.cart_page = response.body;
      },
      response => {
        this.set_msg(
          "خطا! از اتصال اینترنت خود مطمئن شوید یا لحظاتی بعد مجددا امتحان کنید",
          "error"
        );
      }
    );
    }
  },
};
</script>