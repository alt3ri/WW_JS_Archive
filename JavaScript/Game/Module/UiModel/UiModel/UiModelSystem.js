"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.UiModelSystem = void 0);
const UiModelDefine_1 = require("../Define/UiModelDefine"),
  UiModelBase_1 = require("./UiModelBase");
class UiModelSystem {
  static CreateUiModelByUseWay(e, i) {
    var t = (0, UiModelDefine_1.getUiModelCreateDataPreDefine)()[e];
    return this.CreateUiModelByCreateData(t, i, e);
  }
  static CreateUiModelByCreateData(e, i, t) {
    var o = new UiModelBase_1.UiModelBase(t);
    for (const s of e.Components) o.AddComponent(s);
    (t = o.CheckGetComponent(0)),
      t &&
        ((t.ModelType = e.ModelType),
        (t.ModelActorType = e.ModelActorType),
        (t.ModelUseWay = e.ModelUseWay)),
      (t = o.CheckGetComponent(1));
    return t && (t.Actor = i), o;
  }
}
exports.UiModelSystem = UiModelSystem;
//# sourceMappingURL=UiModelSystem.js.map
