export const createElement = (nodeType, props, ...children) => {
  // TODO: what if it's 'class'? -> test code
  // children: Nullable React.Node -> ??
  if (typeof nodeType === 'function') {
    return nodeType({ ...props, children });
  }

  return {
    nodeType,
    props,
    children,
  };
};

/**
 * @private virtual dom to actual DOM tree
 */
const renderElement = vdom => {
  if (typeof vdom === 'string' || typeof vdom === 'number') {
    return document.createTextNode(vdom);
  }

  if (vdom === undefined) return;

  const $element = document.createElement(vdom.nodeType);

  const propsList = Object.entries(vdom.props || {});
  propsList.forEach(([key, value]) => {
    $element[key] = value;
  });

  const childrenArray = vdom.children.flat();
  childrenArray.reduce((element, cur) => {
    element.appendChild(renderElement(cur));
    return element;
  }, $element);

  return $element;
};

export const render = (vdom, root) => {
  root.appendChild(renderElement(vdom));
};
