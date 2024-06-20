import { createStore } from 'vuex'

export default createStore({
  state: {
    Old_selected_block: old_selected_block // начальное значение
  },
  mutations: {
    SET_OLD_SELECTED_BLOCK(state, newValue) {
      state.Old_selected_block = newValue;
    }
  }
})