"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ActivityLongShanController = void 0);
const LongShanActivityConfigByActivityId_1 = require("../../../../../Core/Define/ConfigQuery/LongShanActivityConfigByActivityId"),
  LongShanStageById_1 = require("../../../../../Core/Define/ConfigQuery/LongShanStageById"),
  Protocol_1 = require("../../../../../Core/Define/Net/Protocol"),
  Net_1 = require("../../../../../Core/Net/Net"),
  LevelGeneralCommons_1 = require("../../../../LevelGamePlay/LevelGeneralCommons"),
  ControllerHolder_1 = require("../../../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  UiManager_1 = require("../../../../Ui/UiManager"),
  LguiUtil_1 = require("../../../Util/LguiUtil"),
  ActivityControllerBase_1 = require("../../ActivityControllerBase"),
  ActivityLongShanData_1 = require("./ActivityLongShanData"),
  ActivitySubViewLongShan_1 = require("./ActivitySubViewLongShan"),
  ActivitySubViewRoleGrowing_1 = require("./RoleGrowing/ActivitySubViewRoleGrowing");
class ActivityLongShanController extends ActivityControllerBase_1.ActivityControllerBase {
  constructor() {
    super(...arguments),
      (this.TOe = (e) => {
        ActivityLongShanController.GetActivityData().UpdateStage(e.gMs);
      });
  }
  OnGetIsOpeningActivityRelativeView() {
    var e = ActivityLongShanController.GetActivityData(),
      e =
        LongShanActivityConfigByActivityId_1.configLongShanActivityConfigByActivityId.GetConfig(
          e.Id,
        );
    let t = [];
    for (const i of (t =
      2 === e?.Type ? ["RoleGrowingMainView", "RoleGrowingTaskView"] : t))
      if (UiManager_1.UiManager.IsViewOpen(i)) return !0;
    return !1;
  }
  OnOpenView(e) {}
  OnGetActivityResource(e) {
    switch (
      LongShanActivityConfigByActivityId_1.configLongShanActivityConfigByActivityId.GetConfig(
        e.Id,
      )?.Type
    ) {
      case 1:
        return "UiItem_LongshanMain";
      case 2:
        return "UiItem_ActivityRoleGrowing";
      default:
        return "UiItem_LongshanMain";
    }
  }
  OnCreateSubPageComponent(e) {
    switch (
      LongShanActivityConfigByActivityId_1.configLongShanActivityConfigByActivityId.GetConfig(
        e.Id,
      )?.Type
    ) {
      case 1:
        return new ActivitySubViewLongShan_1.ActivitySubViewLongShan();
      case 2:
        return new ActivitySubViewRoleGrowing_1.ActivitySubViewRoleGrowing();
      default:
        return new ActivitySubViewLongShan_1.ActivitySubViewLongShan();
    }
  }
  OnCreateActivityData(e) {
    return (
      (ActivityLongShanController.LOe = e.s5n),
      new ActivityLongShanData_1.ActivityLongShanData()
    );
  }
  OnInit() {
    return (ActivityLongShanController.DOe = []), !0;
  }
  OnRegisterNetEvent() {
    Net_1.Net.Register(24110, this.TOe);
  }
  OnUnRegisterNetEvent() {
    Net_1.Net.UnRegister(24110);
  }
  static GetActivityData() {
    return ModelManager_1.ModelManager.ActivityModel.GetActivityById(
      ActivityLongShanController.LOe,
    );
  }
  static ShowUnlockTip(e) {
    (e = LongShanStageById_1.configLongShanStageById.GetConfig(e)),
      (e = LevelGeneralCommons_1.LevelGeneralCommons.GetConditionGroupHintText(
        e.OpenConditionId,
      ));
    ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByItsType(
      9,
      new LguiUtil_1.TableTextArgNew(e),
    );
  }
  static TakeTaskReward(t) {
    var e;
    this.DOe.includes(t) ||
      (this.DOe.push(t),
      ((e = Protocol_1.Aki.Protocol.Igs.create()).B6n = [t]),
      Net_1.Net.Call(24144, e, (e) => {
        e && this.DOe.splice(this.DOe.indexOf(t), 1);
      }));
  }
  OnActivityFirstUnlock(e) {
    1 ===
      LongShanActivityConfigByActivityId_1.configLongShanActivityConfigByActivityId.GetConfig(
        e.Id,
      )?.Type && UiManager_1.UiManager.OpenView("LongShanUnlockView");
  }
}
((exports.ActivityLongShanController = ActivityLongShanController).LOe = 0),
  (ActivityLongShanController.DOe = []);
//# sourceMappingURL=ActivityLongShanController.js.map
