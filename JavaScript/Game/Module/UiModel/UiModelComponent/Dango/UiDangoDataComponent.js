"use strict";
var __decorate =
  (this && this.__decorate) ||
  function (e, o, t, n) {
    var i,
      a = arguments.length,
      s =
        a < 3
          ? o
          : null === n
            ? (n = Object.getOwnPropertyDescriptor(o, t))
            : n;
    if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
      s = Reflect.decorate(e, o, t, n);
    else
      for (var r = e.length - 1; 0 <= r; r--)
        (i = e[r]) && (s = (a < 3 ? i(s) : 3 < a ? i(o, t, s) : i(o, t)) || s);
    return 3 < a && s && Object.defineProperty(o, t, s), s;
  };
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.UiDangoDataComponent = void 0);
const UiModelComponentDefine_1 = require("../../Define/UiModelComponentDefine"),
  UiModelComponentBase_1 = require("../UiModelComponentBase");
let UiDangoDataComponent = class UiDangoDataComponent extends UiModelComponentBase_1.UiModelComponentBase {
  constructor() {
    super(...arguments), (this.uSc = 0);
  }
  set DangoId(e) {
    this.uSc = e;
  }
  get DangoId() {
    return this.uSc;
  }
};
(UiDangoDataComponent = __decorate(
  [(0, UiModelComponentDefine_1.RegisterUiModelComponent)(23)],
  UiDangoDataComponent,
)),
  (exports.UiDangoDataComponent = UiDangoDataComponent);
//# sourceMappingURL=UiDangoDataComponent.js.map
