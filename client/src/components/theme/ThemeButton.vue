<template>
  <!-- @change="toggleTheme" -->

  <div class="panel-body">
    <label class="switch" @change="toggleTheme">
      <input type="checkbox" />
      <div class="slider round"></div>
    </label>
    <div class="icon">
      <p>{{ isDarkMode ? "☀️" : "🌙" }}</p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isDarkMode: false,
    };
  },

  computed: {
    panelBodyClass() {
      return this.isDarkMode ? "dark" : "panel-body";
    },
  },

  methods: {
    toggleTheme() {
      this.isDarkMode = !this.isDarkMode;
      document.body.classList.toggle("dark");
      document.body.querySelector(".panel-body").classList.toggle("dark");
    },
  },
};
</script>

<style scoped>
body {
  text-align: center;
  background: #51c3a0;
  padding: 50px;
}
.panel-body {
  /* background-color: #ebebeb; */
  display: flex;
  position: sticky; /* comment this line of we want to hide when scroll */
  padding: 0.8% 4.4%;
  align-items: center;
}

.dark {
  background-color: #0b2748;
}

.icon {
  margin-left: 1%;
  font-size: 2rem;
  display: inline;
}
.switch {
  position: relative;
  display: inline-block;
  width: 60px;
  height: 34px;
}

.switch input {
  display: none;
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  -webkit-transition: 0.4s;
  transition: 0.4s;
}

.slider:before {
  position: absolute;
  content: "";
  height: 26px;
  width: 26px;
  left: 4px;
  bottom: 4px;
  background-color: #154373;
  -webkit-transition: 0.4s;
  transition: 0.4s;
}

input:checked + .slider {
  background-color: #fff;
}

input:focus + .slider {
  box-shadow: 0 0 1px #0b2748;
}

input:checked + .slider:before {
  -webkit-transform: translateX(26px);
  -ms-transform: translateX(26px);
  transform: translateX(26px);
}

.slider.round {
  border-radius: 34px;
}

.slider.round:before {
  border-radius: 50%;
}
</style>