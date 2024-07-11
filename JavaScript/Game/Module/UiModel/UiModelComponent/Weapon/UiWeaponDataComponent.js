"use strict";
const __decorate =
  (this && this.__decorate) ||
  function (e, o, t, n) {
    let a;
    const i = arguments.length;
    let p =
      i < 3 ? o : n === null ? (n = Object.getOwnPropertyDescriptor(o, t)) : n;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
      p = Reflect.decorate(e, o, t, n);
    else
      for (let r = e.length - 1; r >= 0; r--)
        (a = e[r]) && (p = (i < 3 ? a(p) : i > 3 ? a(o, t, p) : a(o, t)) || p);
    return i > 3 && p && Object.defineProperty(o, t, p), p;
  };
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.UiWeaponDataComponent = void 0);
const UiModelComponentDefine_1 = require("../../Define/UiModelComponentDefine");
const UiModelComponentBase_1 = require("../UiModelComponentBase");
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
// # sourceMappingURL=UiWeaponDataComponent.js.map
