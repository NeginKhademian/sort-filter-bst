<template>
  <div>
    <div id="table" class="container">
      <table>
        <tr>
          <th
            class="header-wrapper pointer"
            @click="checkForSort(field)"
            :key="field.id"
            v-for="field in table.feilds"
          >
            {{
              $route.query.sortType && $route.query.sortType === field.name
                ? $route.query.sort === "0"
                  ? "&#11165;"
                  : "&#11167;"
                : ""
            }}
            {{ field.title }}
          </th>
        </tr>
        <template v-if="items&&items.length">
          <tr
            class="trtd pointer"
            @click="getDataForStorage(item, idx)"
            :key="item.id"
            v-for="(item, idx) in items"
          >
            <td>{{ item.name }}{{ item.selected ? " * " : "" }}</td>
            <td>{{ item.date }}</td>
            <td>{{ item.title }}</td>
            <td>{{ item.field }}</td>
            <td>{{ item.old_value }}</td>
            <td>{{ item.new_value }}</td>
          </tr>
        </template>
        <template v-else>
          <tr style="text-aligne:center">
            <td class="text-center" colspan="6">اطلاعاتی پیدا نشد</td>
          </tr>
        </template>
      </table>

      <div class="paginate-wrapper">
        <span class="pointer" @click="pageHandle('pre')">&#11164;</span>
        <input
          @input="changeCurrentPage"
          type="text"
          v-model="pages.currentPage"
        />
        of
        {{ pages.totoalPage }}
        <span class="pointer" @click="pageHandle('next')">&#11166;  </span>
      </div>
    </div>
  </div>
</template>

<script>
import myMixin from "@/mixins/myMixin.js";
export default {
  props: ["pages", "items", "handlePage", "sortCheck"],
  name: "Mtable",
  mixins: [myMixin],
  methods: {
    checkForStar(item) {
      return this.selected.includes(item.id);
    },
    changeCurrentPage() {
      if (this.pages.currentPage) this.handlePage(this.pages);
    },
    checkForSort(field, isMount) {
      this.sortCheck(field, isMount);
    },
    pageHandle(arrow) {
        // change page with arrow
      if (arrow === "pre" && this.pages.currentPage > 1)
        --this.pages.currentPage;
      if (
        arrow === "next" &&
        this.pages.totoalPage != this.pages.currentPage + 1
      )
        ++this.pages.currentPage;
      this.handlePage(this.pages);
    },
  
    getDataForStorage(item, idx) {
      item.selected = !item.selected;
      this.$set(this.items, idx, item);
    //   from mixin
      this.saveUnsaveData(item);
    },

  },
  data() {
    return {
      selected: null,
      currentPage: 1,
      table: {
        feilds: [
          {
            id: 1,
            name: "name",
            title: "نام تغییر دهنده",
          },
          {
            id: 2,
            name: "date",
            title: "تاریخ",
          },
          {
            id: 3,
            name: "title",
            title: "نام آکهی",
          },
          {
            id: 4,
            name: "field",
            title: "عنوان",
          },
          {
            id: 5,
            name: "old_value",
            title: "مقدار قدیمی",
          },
          {
            id: 6,
            name: "new_value",
            title: "مقدار جدید",
          },
        ],
      },
    };
  },
};
</script>

<style scoped>
#table {
  overflow: auto;
}
#table table {
  min-width: 300px;
  width: 70%;
  height: fit-content;
  overflow: auto;
  border-collapse: collapse;
  border: 1px solid #000;
  table-layout: fixed;
  margin: auto;
  overflow: auto;
}
.text-center {
  text-align: center;
}
#table table tr th,
#table table tr td {
  border: 1px solid #000;
  padding: 10px;
}
/* #table table tr td {
  min-width: 150px;
  
} */
tr:nth-child(even) {
  background-color: #f2f2f2;
}
#table table tr th {
  background-color: #fff2cc;
}
#table table .bold {
  border-right: none;
  border-left: none;
  background: #ddd;
  border-bottom: 1px solid #c2c2c2;
  border: none;
}
#table table .bold th {
  border: none;
  background: #000;
  color: #fff;
  border: none;
  font-size: 18px;
  font-weight: bold;
}
#table table .bold th {
  border: none;
  background: #000;
  color: #fff;
  border: none;
  font-size: 18px;
  font-weight: bold;
}
#table .with-header tr:first-of-type td {
  border: none;
}
.paginate-wrapper {
  display: flex;
  flex-direction: row-reverse;
  justify-content: center;
  margin-top: 20px;
  text-align: center;
}
.paginate-wrapper input {
  text-align: center;
}
@media (max-width: 490px) {
  #table table {
    display: block;
    margin: inherit;
  }

  /* td {
    width: 60px;
  } */
}
@media (max-width: 480px) {
  #table .with-header tr:first-of-type {
    display: none;
  }
  #table .with-header tr {
    border: 1px solid #000;
  }
  #table .with-header tr td {
    display: block;
    border: none;
  }
  #table .with-header tr td:first-child {
    padding-top: 0.5em;
  }
  #table .with-header tr td:last-child {
    padding-bottom: 0.5em;
  }
  #table .with-header tr td:before {
    content: attr(data-th) ": ";
    font-weight: bold;
    display: inline-block;
  }
}

@media (max-width: 480px) and (min-width: 480px) {
  #table .with-header tr td:before {
    display: none;
  }
}
</style>
