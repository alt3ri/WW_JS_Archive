"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SingleHotKeyItem = void 0);
const UE = require("ue"),
  HotKeyItem_1 = require("./HotKeyItem"),
  HotKeyTypeCreator_1 = require("./HotKeyType/HotKeyTypeCreator");
class SingleHotKeyItem extends HotKeyItem_1.HotKeyItem {
  constructor() {
    super(...arguments), (this.Gqo = void 0);
  }
  async OnBeforeStartAsync() {
    var e = this.OpenParam;
    (this.Gqo = await HotKeyTypeCreator_1.HotKeyTypeCreator.CreateHotKeyType(
      this.GetRootActor(),
      e,
      !1,
    )),
      this.Ynl();
  }
  Ynl() {
    var e = this.RootActor.GetComponentByClass(
      UE.TsUiHotKeyLinkListener_C.StaticClass(),
    );
    if (e)
      for (const t of this.GetHotKeyComponentArray()) t?.SetLinkComponent(e);
  }
  OnClear() {
    this.Gqo.Clear();
  }
  GetHotKeyComponentArray() {
    return this.Gqo ? this.Gqo.GetHotKeyComponents() : [];
  }
}
exports.SingleHotKeyItem = SingleHotKeyItem;
//# sourceMappingURL=SingleHotKeyItem.js.map
