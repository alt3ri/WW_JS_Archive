"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.InstanceDungeonGuideModel = void 0);
const ModelBase_1 = require("../../../Core/Framework/ModelBase");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../Manager/ConfigManager");
const ModelManager_1 = require("../../Manager/ModelManager");
class InstanceDungeonGuideModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments), (this.hli = 0), (this.lli = 0);
  }
  GetCurrentInstanceDungeonGuideType() {
    return this.hli;
  }
  GetCurrentInstanceDungeonGuideValue() {
    return this.lli;
  }
  RefreshCurrentDungeonGuide() {
    const e = ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetGuide(
      ModelManager_1.ModelManager.CreatureModel.GetInstanceId(),
    );
    e && ((this.hli = e[0]), (this.lli = e[1])),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.DungeonGuideChange,
      );
  }
  GetHaveGuide() {
    return this.hli !== 0;
  }
}
exports.InstanceDungeonGuideModel = InstanceDungeonGuideModel;
// # sourceMappingURL=InstanceDungeonGuideModel.js.map
