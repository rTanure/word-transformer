import {
  require_react_dom
} from "./chunk-LVULWPWR.js";
import {
  __toESM,
  require_react
} from "./chunk-H5YRQ6MP.js";

// node_modules/.pnpm/@babel+runtime@7.23.9/node_modules/@babel/runtime/helpers/esm/extends.js
function _extends() {
  _extends = Object.assign ? Object.assign.bind() : function(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };
  return _extends.apply(this, arguments);
}

// node_modules/.pnpm/@radix-ui+react-separator@1.0.3_@types+react-dom@18.2.18_@types+react@18.2.48_react-dom@18.2.0_react@18.2.0/node_modules/@radix-ui/react-separator/dist/index.mjs
var import_react4 = __toESM(require_react(), 1);

// node_modules/.pnpm/@radix-ui+react-primitive@1.0.3_@types+react-dom@18.2.18_@types+react@18.2.48_react-dom@18.2.0_react@18.2.0/node_modules/@radix-ui/react-primitive/dist/index.mjs
var import_react3 = __toESM(require_react(), 1);
var import_react_dom = __toESM(require_react_dom(), 1);

// node_modules/.pnpm/@radix-ui+react-slot@1.0.2_@types+react@18.2.48_react@18.2.0/node_modules/@radix-ui/react-slot/dist/index.mjs
var import_react2 = __toESM(require_react(), 1);

// node_modules/.pnpm/@radix-ui+react-compose-refs@1.0.1_@types+react@18.2.48_react@18.2.0/node_modules/@radix-ui/react-compose-refs/dist/index.mjs
var import_react = __toESM(require_react(), 1);
function $6ed0406888f73fc4$var$setRef(ref, value) {
  if (typeof ref === "function")
    ref(value);
  else if (ref !== null && ref !== void 0)
    ref.current = value;
}
function $6ed0406888f73fc4$export$43e446d32b3d21af(...refs) {
  return (node) => refs.forEach(
    (ref) => $6ed0406888f73fc4$var$setRef(ref, node)
  );
}

// node_modules/.pnpm/@radix-ui+react-slot@1.0.2_@types+react@18.2.48_react@18.2.0/node_modules/@radix-ui/react-slot/dist/index.mjs
var $5e63c961fc1ce211$export$8c6ed5c666ac1360 = (0, import_react2.forwardRef)((props, forwardedRef) => {
  const { children, ...slotProps } = props;
  const childrenArray = import_react2.Children.toArray(children);
  const slottable = childrenArray.find($5e63c961fc1ce211$var$isSlottable);
  if (slottable) {
    const newElement = slottable.props.children;
    const newChildren = childrenArray.map((child) => {
      if (child === slottable) {
        if (import_react2.Children.count(newElement) > 1)
          return import_react2.Children.only(null);
        return (0, import_react2.isValidElement)(newElement) ? newElement.props.children : null;
      } else
        return child;
    });
    return (0, import_react2.createElement)($5e63c961fc1ce211$var$SlotClone, _extends({}, slotProps, {
      ref: forwardedRef
    }), (0, import_react2.isValidElement)(newElement) ? (0, import_react2.cloneElement)(newElement, void 0, newChildren) : null);
  }
  return (0, import_react2.createElement)($5e63c961fc1ce211$var$SlotClone, _extends({}, slotProps, {
    ref: forwardedRef
  }), children);
});
$5e63c961fc1ce211$export$8c6ed5c666ac1360.displayName = "Slot";
var $5e63c961fc1ce211$var$SlotClone = (0, import_react2.forwardRef)((props, forwardedRef) => {
  const { children, ...slotProps } = props;
  if ((0, import_react2.isValidElement)(children))
    return (0, import_react2.cloneElement)(children, {
      ...$5e63c961fc1ce211$var$mergeProps(slotProps, children.props),
      ref: forwardedRef ? $6ed0406888f73fc4$export$43e446d32b3d21af(forwardedRef, children.ref) : children.ref
    });
  return import_react2.Children.count(children) > 1 ? import_react2.Children.only(null) : null;
});
$5e63c961fc1ce211$var$SlotClone.displayName = "SlotClone";
var $5e63c961fc1ce211$export$d9f1ccf0bdb05d45 = ({ children }) => {
  return (0, import_react2.createElement)(import_react2.Fragment, null, children);
};
function $5e63c961fc1ce211$var$isSlottable(child) {
  return (0, import_react2.isValidElement)(child) && child.type === $5e63c961fc1ce211$export$d9f1ccf0bdb05d45;
}
function $5e63c961fc1ce211$var$mergeProps(slotProps, childProps) {
  const overrideProps = {
    ...childProps
  };
  for (const propName in childProps) {
    const slotPropValue = slotProps[propName];
    const childPropValue = childProps[propName];
    const isHandler = /^on[A-Z]/.test(propName);
    if (isHandler) {
      if (slotPropValue && childPropValue)
        overrideProps[propName] = (...args) => {
          childPropValue(...args);
          slotPropValue(...args);
        };
      else if (slotPropValue)
        overrideProps[propName] = slotPropValue;
    } else if (propName === "style")
      overrideProps[propName] = {
        ...slotPropValue,
        ...childPropValue
      };
    else if (propName === "className")
      overrideProps[propName] = [
        slotPropValue,
        childPropValue
      ].filter(Boolean).join(" ");
  }
  return {
    ...slotProps,
    ...overrideProps
  };
}

// node_modules/.pnpm/@radix-ui+react-primitive@1.0.3_@types+react-dom@18.2.18_@types+react@18.2.48_react-dom@18.2.0_react@18.2.0/node_modules/@radix-ui/react-primitive/dist/index.mjs
var $8927f6f2acc4f386$var$NODES = [
  "a",
  "button",
  "div",
  "form",
  "h2",
  "h3",
  "img",
  "input",
  "label",
  "li",
  "nav",
  "ol",
  "p",
  "span",
  "svg",
  "ul"
];
var $8927f6f2acc4f386$export$250ffa63cdc0d034 = $8927f6f2acc4f386$var$NODES.reduce((primitive, node) => {
  const Node = (0, import_react3.forwardRef)((props, forwardedRef) => {
    const { asChild, ...primitiveProps } = props;
    const Comp = asChild ? $5e63c961fc1ce211$export$8c6ed5c666ac1360 : node;
    (0, import_react3.useEffect)(() => {
      window[Symbol.for("radix-ui")] = true;
    }, []);
    return (0, import_react3.createElement)(Comp, _extends({}, primitiveProps, {
      ref: forwardedRef
    }));
  });
  Node.displayName = `Primitive.${node}`;
  return {
    ...primitive,
    [node]: Node
  };
}, {});

// node_modules/.pnpm/@radix-ui+react-separator@1.0.3_@types+react-dom@18.2.18_@types+react@18.2.48_react-dom@18.2.0_react@18.2.0/node_modules/@radix-ui/react-separator/dist/index.mjs
var $89eedd556c436f6a$var$NAME = "Separator";
var $89eedd556c436f6a$var$DEFAULT_ORIENTATION = "horizontal";
var $89eedd556c436f6a$var$ORIENTATIONS = [
  "horizontal",
  "vertical"
];
var $89eedd556c436f6a$export$1ff3c3f08ae963c0 = (0, import_react4.forwardRef)((props, forwardedRef) => {
  const { decorative, orientation: orientationProp = $89eedd556c436f6a$var$DEFAULT_ORIENTATION, ...domProps } = props;
  const orientation = $89eedd556c436f6a$var$isValidOrientation(orientationProp) ? orientationProp : $89eedd556c436f6a$var$DEFAULT_ORIENTATION;
  const ariaOrientation = orientation === "vertical" ? orientation : void 0;
  const semanticProps = decorative ? {
    role: "none"
  } : {
    "aria-orientation": ariaOrientation,
    role: "separator"
  };
  return (0, import_react4.createElement)($8927f6f2acc4f386$export$250ffa63cdc0d034.div, _extends({
    "data-orientation": orientation
  }, semanticProps, domProps, {
    ref: forwardedRef
  }));
});
Object.assign($89eedd556c436f6a$export$1ff3c3f08ae963c0, {
  displayName: $89eedd556c436f6a$var$NAME
});
$89eedd556c436f6a$export$1ff3c3f08ae963c0.propTypes = {
  orientation(props, propName, componentName) {
    const propValue = props[propName];
    const strVal = String(propValue);
    if (propValue && !$89eedd556c436f6a$var$isValidOrientation(propValue))
      return new Error($89eedd556c436f6a$var$getInvalidOrientationError(strVal, componentName));
    return null;
  }
};
function $89eedd556c436f6a$var$getInvalidOrientationError(value, componentName) {
  return `Invalid prop \`orientation\` of value \`${value}\` supplied to \`${componentName}\`, expected one of:
  - horizontal
  - vertical

Defaulting to \`${$89eedd556c436f6a$var$DEFAULT_ORIENTATION}\`.`;
}
function $89eedd556c436f6a$var$isValidOrientation(orientation) {
  return $89eedd556c436f6a$var$ORIENTATIONS.includes(orientation);
}
var $89eedd556c436f6a$export$be92b6f5f03c0fe9 = $89eedd556c436f6a$export$1ff3c3f08ae963c0;
export {
  $89eedd556c436f6a$export$be92b6f5f03c0fe9 as Root,
  $89eedd556c436f6a$export$1ff3c3f08ae963c0 as Separator
};
//# sourceMappingURL=@radix-ui_react-separator.js.map
