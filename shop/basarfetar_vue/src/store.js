import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    shw_overlay: false,
    shw_overlay2: false,
    sh_details_box: [],
    base_cart_amounts: [],
    cart_titles: [],
    cart_amounts: [],
    msg_text: '',
    msg_type: '',
    shw_alert: false,
    msg_timeout: '',
    ordered_num: [],
    order_ranges: [],
    which_sold: Number,
    shw_products: false,
    product_type: [],
    search_products: [],
    cards_container_height: '',
    cart_container_height: '',
    active: [],
  },
  mutations: {
    set_overlay2(state, payload) {
      state.shw_overlay2 = payload.status;
    },
    set_active(state, payload) {
      Vue.set(state.active, payload.id, payload.status);
    },
    clear_active(state) {
      state.active = [];
    },
    set_overlay(state, payload) {
      state.shw_overlay = payload;
    },
    set_cards_container_height(state, payload) {
      state.cards_container_height = payload;
    },
    set_cart_container_height(state, payload) {
      state.cart_container_height = payload;
    },
    set_search_products(state, payload) {
      Vue.set(state.search_products, payload.index, payload.search_product);
    },
    clear_search_products(state) {
      state.search_products = [];
    },
    set_product_type(state, payload) {
      Vue.set(state.product_type, payload.index, payload.status);
    },
    clear_product_type(state) {
      state.product_type = [];
    },
    set_details_box(state, payload) {
      Vue.set(state.sh_details_box, payload.id, payload.status);
    },
    set_ordered_num(state, payload) {
      Vue.set(state.ordered_num, payload.id, payload.num);
    },
    set_order_ranges(state, payload) {
      Vue.set(state.order_ranges, payload.id, payload.ranges);
    },
    set_which_sold(state, payload) {
      state.which_sold = payload;
    },
    set_cart_titles(state, payload) {
      Vue.set(state.cart_titles, payload.id, payload.value);
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
    clear_cart(state) {
      state.base_cart_amounts = [];
      state.cart_titles = [];
      state.cart_amounts = [];
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
      if (state.msg_timeout) {
        window.clearTimeout(state.msg_timeout);
        state.msg_timeout = null;
      }
      state.msg_timeout = setTimeout(() => {
        state.shw_alert = false;
      }, 4000);
    },
  },
  actions: {
    set_product_type_active({commit}, payload) {
      return new Promise((resolve, reject) => {
        commit('clear_active');
        commit('clear_product_type');
        commit('set_product_type', {'index': payload.index, 'status': payload.status});
        commit('set_active', {'id': payload.index, 'status': payload.status})
        resolve()
      })
    },
    set_product_type({commit}, payload) {
      return new Promise((resolve, reject) => {
        commit('set_product_type', {'index': payload.index, 'status': payload.status});
        resolve()
      })
    },
    set_active({commit}, payload) {
      return new Promise((resolve, reject) => {
        commit('clear_active');
        commit('set_product_type', {'index': payload.id, 'status': payload.status});
        commit('set_active', {'id': payload.id, 'status': payload.status});
        resolve()
      })
    },
  }
})
