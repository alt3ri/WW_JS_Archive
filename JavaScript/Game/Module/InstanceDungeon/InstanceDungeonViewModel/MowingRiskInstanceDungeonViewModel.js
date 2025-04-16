"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.MowingRiskInstanceDungeonViewModel = void 0);
const ActivityMowingRiskController_1 = require("../../Activity/ActivityContent/MowingRisk/Controller/ActivityMowingRiskController"),
  LguiUtil_1 = require("../../Util/LguiUtil"),
  InstanceDungeonViewModelBase_1 = require("./InstanceDungeonViewModelBase");
class MowingRiskInstanceDungeonViewModel extends InstanceDungeonViewModelBase_1.InstanceDungeonViewModelBase {
  OnCheckInstanceUnlock(e) {
    return ActivityMowingRiskController_1.ActivityMowingRiskController.CheckInstanceUnlockByInstanceId(
      e,
    );
  }
  OnGetUnlockConditionTextId(e) {
    var i =
        ActivityMowingRiskController_1.ActivityMowingRiskController.GetInstanceLockTextIdByInstanceId(
          e,
        ),
      e =
        ActivityMowingRiskController_1.ActivityMowingRiskController.GetInstanceLockTextArgsByInstanceId(
          e,
        ) ?? [];
    return new LguiUtil_1.TableTextArgNew(i, e);
  }
}
exports.MowingRiskInstanceDungeonViewModel = MowingRiskInstanceDungeonViewModel;
//# sourceMappingURL=MowingRiskInstanceDungeonViewModel.js.map
