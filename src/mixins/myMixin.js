import Vue from 'vue'
export default Vue.mixin({

    methods: {
        sliceArray(array, size) {
            let savedData = JSON.parse(localStorage.getItem("savedList"))
            return array.reduce((resultArray, item, index) => {
                const chunkIndex = Math.floor(index / size)
                if (!resultArray[chunkIndex]) {
                    resultArray[chunkIndex] = []
                }
                // check localStorage for any selected item
                if (savedData ?.includes(item.id))
                    item.selected = true
                else item.selected = false
                // chunk array for pagination
                resultArray[chunkIndex].push(item)
                return resultArray
            }, [])
        },
        saveUnsaveData(item) {
            let savedList = JSON.parse(localStorage.getItem("savedList"));
            if (savedList) {
              const hasItem = savedList.findIndex((data) => data === item.id);
              if (hasItem != -1) {
                savedList.splice(hasItem, 1);
              } else savedList.push(item.id);
            } else {
              savedList = new Array();
              savedList.push(item.id);
            }
            localStorage.setItem("savedList", JSON.stringify(savedList));
          },
        compare(searchedArray, item = null,order) {
            item = item ? item.trim() : item
            return searchedArray.sort((x, y) => {
                if (x[item] > y[item]) {
                    return order === 1 ? 1 : -1; 
                } else {
                    return order === 1 ? -1 : 1;
                } 
            })
        },
    }

})