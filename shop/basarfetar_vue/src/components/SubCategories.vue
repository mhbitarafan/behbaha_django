<template>
  <div>
    <transition name="slide">
      <div v-show="$store.state.product_type[0]" class="product-type">
        <a href="/products/category/لبنیات">لبنیات</a>
        <a href="/products/category/سبزیجات">سبزیجات</a>
      </div>
    </transition>
    <transition name="slide">
      <div v-show="$store.state.product_type[1]" class="product-type">
        <a href="#" @click="shw_products_by_category('سیب زمینی و پیاز')">سیب زمینی و پیاز</a>
        <a href="#" @click="shw_products_by_category('میوه جات')">میوه جات</a>
        <a href="#" @click="shw_products_by_category('ماکارانی')">ماکارانی</a>
        <a href="#" @click="shw_products_by_category('رب')">رب</a>
        <a href="#" @click="shw_products_by_category('خرما')">خرما</a>
        <a href="#" @click="shw_products_by_category('گردو')">گردو</a>
        <a href="#" @click="shw_products_by_category('زیتون')">زیتون</a>
      </div>
    </transition>
    <transition name="slide">
      <div v-show="$store.state.product_type[2]" class="product-type">
        <a href="#" @click="shw_products_by_category('روغن')">روغن</a>
        <a href="#" @click="shw_products_by_category('برنج')">برنج</a>
        <a href="#" @click="shw_products_by_category('چای')">چای</a>
        <a href="#" @click="shw_products_by_category('قند')">قند</a>
        <a href="#" @click="shw_products_by_category('شکر')">شکر</a>
        <a href="#" @click="shw_products_by_category('زعفران')">زعفران</a>
        <a href="#" @click="shw_products_by_category('آبغوره')">آبغوره</a>
        <a href="#" @click="shw_products_by_category('آبلیمو')">آبلیمو</a>
        <a href="#" @click="shw_products_by_category('سرکه')">سرکه</a>
        <a href="#" @click="shw_products_by_category('دستمال کاغذی')">دستمال کاغذی</a>
        <a href="#" @click="shw_products_by_category('پودر لباسشویی')">پودر لباسشویی</a>
        <a href="#" @click="shw_products_by_category('صابون')">صابون</a>
        <a href="#" @click="shw_products_by_category('مایع ظرفشویی')">مایع ظرفشویی</a>
      </div>
    </transition>
    <transition name="slide">
      <div v-show="$store.state.product_type[3]" class="product-type">
        <a href="#" @click="shw_products_by_category('لوازم التحریر')">لوازم التحریر</a>
      </div>
    </transition>
    <transition name="slide">
      <div v-show="$store.state.product_type[4]" class="product-type">
        <a href="/products/category/لوازم-دیجیتال">لوازم دیجیتال</a>
      </div>
    </transition>
    <transition name="slide">
      <div v-show="$store.state.product_type[5]" class="product-type">
        <a href="/products/category/لوازم-خانگی">لوازم خانگی</a>
      </div>
    </transition>
  </div>
</template>
<script>
export default {
  name: "subcategories",
  methods: {
  }
};
</script>