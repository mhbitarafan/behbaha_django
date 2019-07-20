<template>
  <div>
      <div
        v-show="$store.state.product_type[0]"
        class="product-type"
        :class="{'active': $store.state.active[0]}"
        id="s0"
      >
        <router-link to="/products/category/لبنیات">لبنیات</router-link>
        <router-link to="/products/category/سبزیجات">سبزیجات</router-link>
      </div>

      <div
        v-show="$store.state.product_type[1]"
        class="product-type"
        :class="{'active': $store.state.active[1]}"
        id="s1"
      >
        <router-link to="/products/category/سیب-زمینی-و-پیاز">سیب زمینی و پیاز</router-link>
        <router-link to="/products/category/میوه-جات">میوه جات</router-link>
        <router-link to="/products/category/ماکارانی">ماکارانی</router-link>
        <router-link to="/products/category/رب">رب</router-link>
        <router-link to="/products/category/خرما">خرما</router-link>
        <router-link to="/products/category/گردو">گردو</router-link>
        <router-link to="/products/category/زیتون">زیتون</router-link>
      </div>

      <div
        v-show="$store.state.product_type[2]"
        class="product-type"
        :class="{'active': $store.state.active[2]}"
        id="s2"
      >
        <router-link to="/products/category/روغن">روغن</router-link>
        <router-link to="/products/category/برنج">برنج</router-link>
        <router-link to="/products/category/چای">چای</router-link>
        <router-link to="/products/category/قند">قند</router-link>
        <router-link to="/products/category/شکر">شکر</router-link>
        <router-link to="/products/category/زعفران">زعفران</router-link>
        <router-link to="/products/category/آبغوره">آبغوره</router-link>
        <router-link to="/products/category/آبلیمو">آبلیمو</router-link>
        <router-link to="/products/category/سرکه">سرکه</router-link>
        <router-link to="/products/category/دستمال کاغذی">دستمال کاغذی</router-link>
        <router-link to="/products/category/پودر لباسشویی">پودر لباسشویی</router-link>
        <router-link to="/products/category/صابون">صابون</router-link>
        <router-link to="/products/category/مایع ظرفشویی">مایع ظرفشویی</router-link>
      </div>

      <div
        v-show="$store.state.product_type[3]"
        class="product-type"
        :class="{'active': $store.state.active[3]}"
        id="s3"
      >
        <router-link to="/products/category/لوازم-التحریر">لوازم التحریر</router-link>
      </div>

      <div
        v-show="$store.state.product_type[4]"
        class="product-type"
        :class="{'active': $store.state.active[4]}"
        id="s4"
      >
        <router-link to="/products/category/لوازم-دیجیتال">لوازم دیجیتال</router-link>
      </div>
      <div
        v-show="$store.state.product_type[5]"
        class="product-type"
        :class="{'active': $store.state.active[5]}"
        id="s5"
      >
        <router-link to="/products/category/لوازم-خانگی">لوازم خانگی</router-link>
      </div>
  </div>
</template>
<script>
import anime from "animejs/lib/anime.es.js";
import { includes } from 'lodash-es';
export default {
  name: "subcategories",
  methods: {
    enter() {

    },
  }
};
</script>