<template>
  <div class="table-wrapper">
    <Search :getSearchData="getSearchData" />
    <MyTable
      :pages="pages"
      :sortCheck="sortCheck"
      :items="items"
      :handlePage="handlePage"
    />
  </div>
</template>
<script>
import MyTable from "@/components/table.vue";
import Search from "@/components/search.vue";
import Data from "../../data.json";
import myMixin from "@/mixins/myMixin.js";
import { BinerySearch } from "@/utils/index.js";
export default {
  components: { MyTable, Search },
  name: "index",
  mixins: [myMixin],
  data() {
    return {
      mainArray: Data,
      pages: {
        currentPage: 1,
        totoalPage: 1,
        perPage: 50,
      },
      sort: 0,
      sortType: null,
      binerysearch: null,
      //   items that the table need to show
      items: [],
    };
  },
  methods: {
    handlePage(pageInfo) {
      this.pages = pageInfo;
      this.getData(pageInfo);
    },
    sortCheckQuery() {
        // change query
      let currentQuery = Object.assign({}, this.$route.query);
      currentQuery.sort = this.sort;
      currentQuery.sortType = this.sortType;
      this.$router.push({ path: "/", query: currentQuery }).catch(() => {});
    },
    sortCheck(fileds, mounted) {
        // get sort type from table component
      this.sortType = Object.entries(fileds)[1][1];
    //   generate sort
      this.sort = (parseInt(this.sort) + 1) % 2;
    //   get sorted data
      this.mainArray = this.compare(this.mainArray, this.sortType, this.sort);
      this.getData();
      if (!mounted) {
        //   generate query
        this.sortCheckQuery();
      }
    },

    changePage() {
      // get sliced array from original
      return this.sliceArray(this.mainArray, this.pages.perPage);
    },
    getSearchData(data) {
      // get searched data from search component
      this.searchData(data);
    },
    resetPages() {
      return {
        //   current page
        currentPage: 1,
        // total pages
        totoalPage: 1,
        // per page
        perPage: 50,
      };
    },
    searchData(data) {
        // reset searched data
         this.mainArray=Data
        //  check if date is searched
      if (data["date"].value) {
        let searchData = {};
        searchData.data = {};
        searchData.data.date = data["date"].value;
        // search from binery tree
        let has = this.binerysearch.contains(
          this.binerysearch.getRootNode(),
          searchData
        );
        if (has) {
        //    search rest of the items in same date of binery tree
          this.mainArray = this.mainArray.filter((item) =>
            has.sameIds.includes(item.id)
          );
          this.searchFull(data);
        } else {
          // date does not exist so no search is needed
          this.items = [];
          this.pages = this.resetPages();
        }
      } else  {
        //   reset Array for next search
        this.searchFull(data, this.mainArray);
      }
    },
    searchFull(data) {
        
      // search other fiels than date
      for (const key in data) {
        if (Object.hasOwnProperty.call(data, key) && key !== "date") {
          const element = data[key];
          if (element.value)
            this.mainArray = this.mainArray.filter((search) => {
              return search[key]
                .toLowerCase()
                .includes(element.value.toLowerCase());
            });
        }
      }
      //   paginate and current page and per page
      this.getData();
    },
    getData() {
      let chunkedArray = this.changePage(this.pages);
      //   current items
      this.items = chunkedArray[this.pages.currentPage - 1];
      //   total pages
      this.pages.totoalPage = chunkedArray.length;
    },
  },
  mounted() {
    //   create new class from BinerySearch
    this.binerysearch = new BinerySearch();
    this.getData();
    // create binery tree for Data
    this.mainArray.forEach((item) => this.binerysearch.insertNode(item));
  },
};
</script>
<style scoped>
.table-wrapper
{
    background-color: #FAFAFA;
}
</style>
