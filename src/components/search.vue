<template>
  <div class="inputsWrapper">
    <template v-for="input in inputs">
      <span :key="input.id">
        <label class="label" :for="input.name">{{ input.placeholder }}:</label>
        <input
          class="setInputMargin text-center"
          :type="input.type"
          v-model="input.value"
          :placeholder="input.placeholder"
        />
      </span>
    </template>
  </div>
</template>
<script>
export default {
  props: ["getSearchData"],
  data() {
    return {
      mount: false,
      inputs: {
        name: {
          type: "text",
          id: 1,
          value: null,
          placeholder: "نام تغییر دهنده",
        },
        date: { type: "date", id: 0, value: null, placeholder: "تاریخ" },
        title: { type: "text", id: 2, value: null, placeholder: "نام آگهی" },
        field: { type: "text", id: 3, value: null, placeholder: "فیلد" },
      },
    };
  },
  methods: {
    searchForItem() {
      this.getSearchData(this.inputs);
    },
    setData() {
      let query = this.$route.query;
      for (const key in query) {
        if (Object.hasOwnProperty.call(query, key)) {
          const element = query[key];
          if (element && key != "sort" && key != "sortType")
            this.inputs[key].value = element;
        }
      }
      this.mount = true;
    },
  },
  mounted() {
    this.setData();
  },
  watch: {
    inputs: {
      deep: true,
      handler(newInputs) {
        if (this.mount) {
            // generate query and pass input`s value to parent
          let query = Object.assign({}, this.$route.query);
          for (const key in newInputs) {
            if (Object.hasOwnProperty.call(newInputs, key)) {
              const element = newInputs[key];
              element.value ? (query[key] = element.value) : (query[key] = null);
            }
          }

          if (Object.entries(query) != Object.entries(this.$route.query))
            this.$router.push({ path: "/", query: query }).catch(() => {});
          this.getSearchData(newInputs);
        }
      },
    },
  },
};
</script>
<style scoped>
.inputsWrapper {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  padding: 0 140px
}
.setInputMargin {
  margin: 10px 20px;
}
.label{
  display: block;
  text-align: center;
}
@media (max-width:490px) {
    .inputsWrapper{
        padding: 0;
    }
}
</style>
