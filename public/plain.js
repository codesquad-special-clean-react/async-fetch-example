const Plain = (() => {
  //let _render;
  let _currentComponent;
  let _effectFns = [];
  let _currentHookIndex = 0;
  let _values = [];

  return {
    renderComponent(Component) {
      const comp = Component();
      comp.render();

      //execute effect
      _effectFns.forEach(fn => fn());

      _currentHookIndex = 0;
      _currentComponent = Component;
      _effectFns = [];

      return comp;
    },

    useState(_initVal) {
      _values[_currentHookIndex] = _values[_currentHookIndex] || _initVal;

      const localHookOrder = _currentHookIndex;
      function setMethod(updateFn) {
        _values[localHookOrder] = updateFn(_values[localHookOrder]);

        //re-render
        Plain.renderComponent(_currentComponent);
      }

      return [_values[_currentHookIndex++], setMethod];
    },

    useEffect(cb) {
      _effectFns.push(cb);
      //cb();
    }
  };
})();