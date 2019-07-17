<template>
  <div
    v-if="!next_disabled"
    class="page-numbers-container row py-2 text-center justify-content-center w-100"
  >
    <button :disabled="next_disabled" class="btn btn-outline-dark py-2" @click="next_page_f()">
      <i class="fa fa-chevron-double-down" aria-hidden="true"></i>
      محصولات بیشتر
    </button>
  </div>
</template>
<script>
export default {
  name: "pagination",
  props: {
    next_disabled: String
  }
};
</script>