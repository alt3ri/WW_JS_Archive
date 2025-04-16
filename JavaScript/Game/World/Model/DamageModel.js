"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.DamageModel = void 0);
const Info_1 = require("../../../Core/Common/Info"),
  DamageByAll_1 = require("../../../Core/Define/ConfigQuery/DamageByAll"),
  DamageById_1 = require("../../../Core/Define/ConfigQuery/DamageById"),
  ModelBase_1 = require("../../../Core/Framework/ModelBase"),
  CloudGameManager_1 = require("../../Manager/CloudGameManager");
class DamageModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments), (this.z9l = void 0);
  }
  OnInit() {
    var e;
    return (
      (Info_1.Info.IsPs5Platform() ||
        CloudGameManager_1.CloudGameManager.IsCloudGame) &&
        ((this.z9l = new Map()),
        (e = DamageByAll_1.configDamageByAll.GetConfigList())) &&
        e.forEach((e) => {
          this.z9l.set(e.Id, e);
        }),
      !0
    );
  }
  GetDamageConfigById(e) {
    return Info_1.Info.IsPs5Platform() ||
      CloudGameManager_1.CloudGameManager.IsCloudGame
      ? 0 < e
        ? this.z9l.get(e)
        : void 0
      : 0 < e
        ? DamageById_1.configDamageById.GetConfig(e)
        : void 0;
  }
  OnClear() {
    return this.z9l?.clear(), !0;
  }
}
exports.DamageModel = DamageModel;
//# sourceMappingURL=DamageModel.js.map
