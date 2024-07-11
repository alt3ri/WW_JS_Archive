"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SpecialItemModel = void 0);
const ModelBase_1 = require("../../../../Core/Framework/ModelBase"),
  ConfigManager_1 = require("../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  SpecialItemDefine_1 = require("./SpecialItemDefine");
class SpecialItemModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments),
      (this.iCi = new Map()),
      (this.oCi = []),
      (this.TagWatchedItemId = 0),
      (this.TagWatchedEntityHandle = void 0),
      (this.WatchedAllowTagIds = new Set()),
      (this.WatchedBanTagIds = new Set());
  }
  OnInit() {
    for (const t of this.oCi) {
      var e = new SpecialItemDefine_1.specialItemLogic[t](t);
      e.Init(), this.iCi.set(t, e);
    }
    return !0;
  }
  GetSpecialItemLogic(t) {
    if (ConfigManager_1.ConfigManager.SpecialItemConfig.GetConfig(t)) {
      let e = void 0;
      return (e =
        (e = this.iCi.get(t)) ||
        new SpecialItemDefine_1.specialItemLogic[t](t));
    }
  }
  GetEquipSpecialItemId() {
    if (13 === ModelManager_1.ModelManager.RouletteModel.EquipItemType)
      return ModelManager_1.ModelManager.RouletteModel.CurrentEquipItemId;
  }
  OnClear() {
    return (
      this.iCi.forEach((e) => {
        e.Destroy();
      }),
      this.iCi.clear(),
      !0
    );
  }
}
exports.SpecialItemModel = SpecialItemModel;
//# sourceMappingURL=SpecialItemModel.js.map
