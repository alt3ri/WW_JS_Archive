"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.InstanceDungeonGuideModel = void 0);
const ModelBase_1 = require("../../../Core/Framework/ModelBase"),
  EventDefine_1 = require("../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../Common/Event/EventSystem"),
  ConfigManager_1 = require("../../Manager/ConfigManager"),
  ModelManager_1 = require("../../Manager/ModelManager");
class InstanceDungeonGuideModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments), (this.h1i = 0), (this.l1i = 0);
  }
  GetCurrentInstanceDungeonGuideType() {
    return this.h1i;
  }
  GetCurrentInstanceDungeonGuideValue() {
    return this.l1i;
  }
  RefreshCurrentDungeonGuide() {
    var e = ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetGuide(
      ModelManager_1.ModelManager.CreatureModel.GetInstanceId(),
    );
    e && ((this.h1i = e[0]), (this.l1i = e[1])),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.DungeonGuideChange,
      );
  }
  GetHaveGuide() {
    return 0 !== this.h1i;
  }
}
exports.InstanceDungeonGuideModel = InstanceDungeonGuideModel;
//# sourceMappingURL=InstanceDungeonGuideModel.js.map
