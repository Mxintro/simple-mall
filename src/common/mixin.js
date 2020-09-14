import {POP, NEW, SELL} from "./const";

export const TabControlMixin = {
  data() {
    return {
      currentType: POP
    }
  },

  methods: {
    typeClick(index){
      switch (index) {
        case 0:
          this.currentType = POP
        case 1:
          this.currentType = NEW
        case 2:
          this.currentType = SELL
      }
    }
  }
}