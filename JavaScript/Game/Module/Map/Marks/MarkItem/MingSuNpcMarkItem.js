"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.MingSuNpcMarkItem = void 0);
const ConfigManager_1 = require("../../../../Manager/ConfigManager"),
  MingSuNpcMarkItemView_1 = require("../MarkItemView/MingSuNpcMarkItemView"),
  ConfigMarkItem_1 = require("./ConfigMarkItem");
class MingSuNpcMarkItem extends ConfigMarkItem_1.ConfigMarkItem {
  constructor(e, r, t, i, n, a = 1) {
    super(e, r, t, i, n, a), (this.InnerView = void 0);
  }
  OnCreateView() {
    this.InnerView = new MingSuNpcMarkItemView_1.MingSuNpcMarkItemView(this);
  }
  get IsTowerEntrance() {
    return ConfigManager_1.ConfigManager.InstanceDungeonEntranceConfig.CheckMarkIdIsTowerEntrance(
      this.MarkConfigId,
    );
  }
}
exports.MingSuNpcMarkItem = MingSuNpcMarkItem;
//# sourceMappingURL=MingSuNpcMarkItem.js.map
