"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SingleHotKeyItem = void 0);
const HotKeyItem_1 = require("./HotKeyItem"),
  HotKeyTypeCreator_1 = require("./HotKeyType/HotKeyTypeCreator");
class SingleHotKeyItem extends HotKeyItem_1.HotKeyItem {
  constructor() {
    super(...arguments), (this.Gqo = void 0);
  }
  async OnBeforeStartAsync() {
    var e = this.OpenParam;
    this.Gqo = await HotKeyTypeCreator_1.HotKeyTypeCreator.CreateHotKeyType(
      this.GetRootActor(),
      e,
      !1,
    );
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
