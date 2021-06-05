export default {
  namespace: "index",
  state: {
    name: "Tim",
  },
  reducers: {
    update: function (state, { payload }) {
      return { ...state, name: payload.name };
    },
  },
  sagas: {
    *updateName({ payload }, effects) {
      yield effects.put({
        type: "update",
        payload,
      });
    },
  },
};