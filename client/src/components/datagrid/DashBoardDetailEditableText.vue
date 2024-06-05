<template>
  <section class="DashBoardDetailEditableText h-16 w-full">
    <div
      v-if="!editing"
      @click="startEditing"
      class="w-full overflow-hidden h-16 m-0 p-0 border text-left d-flex justify-center items-center"
    >
      {{ text }}
    </div>
    <input
      type="text"
      v-else
      :value="text"
      @blur="stopEditing"
      @keydown.enter="stopEditing"
      class="inputText bg-white w-full h-full"
      :class="editing ? 'border' : ''"
      size="50"
      maxlength="50"
    />
  </section>
</template>
  
  <script>
import { mapActions } from "vuex";
export default {
  name: "DashBoardDetailEditableText",
  props: {
    text: String,
  },
  data() {
    return {
      editing: false,
      input: null,
      paramsId: this.$route.params.id,
    };
  },
  methods: {
    ...mapActions(["changeTitle"]),
    startEditing() {
      this.editing = true;
    },
    stopEditing() {
      this.editing = false;
      if (this.text != event.target.value) {
        this.changeTitle(event.target.value);
      }
    },
  },
};
</script>
  
  <style scoped>
.border {
  border: 2px solid black;
}
/* .inputText {
  width: 24rem;
} */
</style>
  