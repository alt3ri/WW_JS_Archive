"use strict";
var __decorate =
  (this && this.__decorate) ||
  function (e, o, t, n) {
    var a,
      i = arguments.length,
      p =
        i < 3
          ? o
          : null === n
            ? (n = Object.getOwnPropertyDescriptor(o, t))
            : n;
    if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
      p = Reflect.decorate(e, o, t, n);
    else
      for (var r = e.length - 1; 0 <= r; r--)
        (a = e[r]) && (p = (i < 3 ? a(p) : 3 < i ? a(o, t, p) : a(o, t)) || p);
    return 3 < i && p && Object.defineProperty(o, t, p), p;
  };
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.UiWeaponDataComponent = void 0);
const UiModelComponentDefine_1 = require("../../Define/UiModelComponentDefine"),
  UiModelComponentBase_1 = require("../UiModelComponentBase");
let UiWeaponDataComponent = class UiWeaponDataComponent extends UiModelComponentBase_1.UiModelComponentBase {
  constructor() {
    super(...arguments), (this.ebr = void 0);
  }
  get WeaponConfigId() {
    return this.ebr?.GetItemId() ?? 0;
  }
  get WeaponData() {
    return this.ebr;
  }
  SetWeaponData(e) {
    this.ebr = e;
  }
};
(UiWeaponDataComponent = __decorate(
  [(0, UiModelComponentDefine_1.RegisterUiModelComponent)(18)],
  UiWeaponDataComponent,
)),
  (exports.UiWeaponDataComponent = UiWeaponDataComponent);
//# sourceMappingURL=UiWeaponDataComponent.js.map
