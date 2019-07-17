<template>
  <transition name="fade-slideup">
    <div
      v-if="$store.state.shw_alert"
      :class="$store.state.msg_type"
      class="msg-box alert fixed-bottom text-right m-0 m-lg-2 p-2"
    >{{$store.state.msg_text}}</div>
  </transition>
</template>
<script>
export default {
  name: "message",
  props: {
    msg: String,
    msgtype: String
  },
};
</script>