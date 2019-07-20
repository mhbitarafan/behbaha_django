<template>
  <table v-if="$store.state.base_cart_amounts.length != 0" class="my-2 col-12 table cart-table">
    <input type="hidden" name="title" v-model="$store.state.cart_titles" />
    <input type="hidden" name="amount" v-model="$store.state.cart_amounts" />
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
        <td>{{to_fa(item.title)}}</td>
        <td class="position-relative">
          <div class="d-flex flex-row cart-amount-input">
            <input
              type="text"
              class="p-1 border"
              @input="is_cart_changed($store.state.cart_amounts[index], index)"
              v-model="$store.state.cart_amounts[index]"
            />
            <div class="d-flex flex-column">
              <i
                @click="cart_plus(index, $store.state.cart_amounts[index])"
                class="mr-2 fas fa-plus text-success"
              ></i>
              <i
                @click="cart_minus(index, $store.state.cart_amounts[index])"
                class="mr-2 mt-2 fas fa-minus text-danger"
              ></i>
            </div>
          </div>
        </td>
        <td>{{to_fa(item.price)}}</td>
        <td>{{to_fa(multiply(item.price, $store.state.cart_amounts[index]))}}</td>
      </tr>
      <tr class="table-secondary">
        <td></td>
        <td class="align-middle">جمع کل: {{to_fa_s(cart_sum)}} تومان</td>
        <td></td>
        <td></td>
        <td colspan="2" class="text-left">
          <input
            type="button"
            class="btn btn-success"
            :disabled="disabled"
            value="به روزرسانی سبد خرید"
            @click="update_cart(true)"
          />
        </td>
      </tr>
    </tbody>
  </table>
</template>
<script>
import ifvisible from "ifvisible";
export default {
  name: "carttable",
  data() {
    return {
      cart_data: "",
      disabled: true,
      cart_sum: 0
    };
  },
  mounted() {
    this.get_cart_data();
    ifvisible.on("focus", this.check_cart_data);
  },
  methods: {
    update_cart(shw_msg) {
      var amounts = this.$store.state.cart_amounts;
      return this.$http.get('/update_cart?cart_amounts=' + amounts).then(response => {
        if (shw_msg) {
          this.set_msg('سبد خرید با موفقیت به روزرسانی شد', 'success');
        }
        this.$store.commit('reset_base_cart_amounts');
        this.disabled = true;
      }, response => {
        this.set_msg('خطا! از اتصال اینترنت خود مطمئن شوید یا لحظاتی بعد مجددا امتحان کنید', 'error');
        console.log(response.status);
      });
    },
    get_cart_data() {
      this.$root.$refs.topProgress.start();
      this.$store.commit('clear_cart');
      this.$http.post("/cart/").then(
        response => {
          this.$root.$refs.topProgress.done();
          var cart_items = response.body;
            this.cart_sum = 0;
            this.cart_data = cart_items;
            for (var i = 0; i < cart_items.length; i++) {
              this.$store.commit("set_cart_titles", {
                id: i,
                value: cart_items[i].title
              });
              this.$store.commit("set_base_cart_amounts", {
                id: i,
                value: cart_items[i].amount.toPersianDigits()
              });
              this.$store.commit("set_cart_amounts", {
                id: i,
                value: cart_items[i].amount.toPersianDigits()
              });
              var num =
                parseInt(
                  this.cart_data[i].price.replace(/,/g, "").toEnglishDigits()
                ) * this.$store.state.cart_amounts[i].toEnglishDigits();
              this.cart_sum += num;
            }
        },
        response => {
          this.$root.$refs.topProgress.fail();
        }
      );
    },
    check_cart_data() {
      this.$http.post("/cart/").then(
        response => {
          var cart_items = response.body;
          if (this.is_cart_changed_web(cart_items)) {
            this.$store.commit('clear_cart');
            this.cart_sum = 0;
            this.cart_data = cart_items;
            for (var i = 0; i < cart_items.length; i++) {
              this.$store.commit("set_cart_titles", {
                id: i,
                value: cart_items[i].title
              });
              this.$store.commit("set_base_cart_amounts", {
                id: i,
                value: cart_items[i].amount.toPersianDigits()
              });
              this.$store.commit("set_cart_amounts", {
                id: i,
                value: cart_items[i].amount.toPersianDigits()
              });
              var num =
                parseInt(
                  this.cart_data[i].price.replace(/,/g, "").toEnglishDigits()
                ) * this.$store.state.cart_amounts[i].toEnglishDigits();
              this.cart_sum += num;
            }
          }
        },
        response => {
        }
      );
    },
    is_cart_changed_web(arr) {
      var arr1 = [];
      for (var i = 0; i < arr.length; i++) {
        arr1.push(arr[i].amount);
      }
      var arr2 = this.$store.state.cart_amounts;
      for (var i = arr1.length; i--; ) {
        if (arr1[i] !== arr2[i]) {
          return true;
        }
      }
      return false;
    },
    is_cart_changed(value, index) {
      var fa_amount = value.toPersianDigits();
      var arr1 = this.$store.state.base_cart_amounts;
      var arr2 = this.$store.state.cart_amounts;
      this.$store.commit("set_cart_amounts", {
        id: index,
        value: fa_amount
      });
      this.cart_sum = 0;
      for (var i = arr1.length; i--; ) {
        var num =
          parseInt(
            this.cart_data[i].price.replace(/,/g, "").toEnglishDigits()
          ) * arr2[i].toEnglishDigits();
        this.cart_sum += num;
        if (arr2[i] == "") {
          this.disabled = true;
          return false;
        }
      }
      for (var i = arr1.length; i--; ) {
        if (arr1[i] !== arr2[i]) {
          this.disabled = false;
          return false;
        }
      }
      this.disabled = true;
    },
    cart_plus(i, value) {
      var num = value.toEnglishDigits();
      if (value == "") {
        num = "0";
      }
      var amount = (parseInt(num) + 1).toString();
      this.$store.commit("set_cart_amounts", {
        id: i,
        value: amount.toPersianDigits()
      });
      this.is_cart_changed(this.$store.state.cart_amounts[i], i);
    },
    cart_minus(i, value) {
      var num = value.toEnglishDigits();
      if (value == "") {
        num = "2";
      }
      if (num < 2) {
        num = "2";
      }
      var amount = (parseInt(num) - 1).toString();
      this.$store.commit("set_cart_amounts", {
        id: i,
        value: amount.toPersianDigits()
      });
      this.is_cart_changed(this.$store.state.cart_amounts[i], i);
    }
  }
};
</script>