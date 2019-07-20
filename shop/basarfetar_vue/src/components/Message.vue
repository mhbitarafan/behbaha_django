<template>
  <transition name="fade-slideup">
    <a-alert v-if="$store.state.shw_alert" :message="$store.state.msg_text" :type="$store.state.msg_type" class="msg-box position-fixed text-right"/>
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