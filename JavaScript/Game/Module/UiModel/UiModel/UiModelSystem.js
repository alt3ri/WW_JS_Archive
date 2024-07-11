"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.UiModelSystem = void 0);
const UiModelDefine_1 = require("../Define/UiModelDefine");
const UiModelBase_1 = require("./UiModelBase");
class UiModelSystem {
  static CreateUiModelByUseWay(e, i) {
    e = UiModelDefine_1.uiModelCreateDataPreDefine[e];
    return this.CreateUiModelByCreateData(e, i);
  }
  static CreateUiModelByCreateData(e, i) {
    const t = new UiModelBase_1.UiModelBase();
    for (const s of e.Components) t.AddComponent(s);
    var o = t.CheckGetComponent(0);
    var o =
      (o &&
        ((o.ModelType = e.ModelType),
        (o.ModelActorType = e.ModelActorType),
        (o.ModelUseWay = e.ModelUseWay)),
      t.CheckGetComponent(1));
    return o && (o.Actor = i), t;
  }
}
exports.UiModelSystem = UiModelSystem;
// # sourceMappingURL=UiModelSystem.js.map
