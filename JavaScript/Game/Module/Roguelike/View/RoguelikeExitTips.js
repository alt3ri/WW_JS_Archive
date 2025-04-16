"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RoguelikeExitTips = void 0);
const UE = require("ue"),
  Protocol_1 = require("../../../../Core/Define/Net/Protocol"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  UiViewBase_1 = require("../../../Ui/Base/UiViewBase"),
  UiManager_1 = require("../../../Ui/UiManager"),
  ActivityRogueController_1 = require("../../Activity/ActivityContent/RougeActivity/ActivityRogueController"),
  ActivityManager_1 = require("../../Activity/ActivityManager"),
  InstanceDungeonEntranceController_1 = require("../../InstanceDungeon/InstanceDungeonEntranceController"),
  LguiUtil_1 = require("../../Util/LguiUtil"),
  RoguelikeController_1 = require("../RoguelikeController");
class RoguelikeExitTips extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments),
      (this.Vho = () => {
        ModelManager_1.ModelManager.WeeklyRogueModel.CheckIsInWeeklyRogue()
          ? UiManager_1.UiManager.CloseView(this.Info.Name, (e) => {
              ActivityManager_1.ActivityManager.GetActivityController(
                Protocol_1.Aki.Protocol.uks.Proto_RogueWeekly,
              )?.InstanceSettleRequest();
            })
          : UiManager_1.UiManager.CloseView(this.Info.Name, (e) => {
              RoguelikeController_1.RoguelikeController.RoguelikeResultRequest(
                0,
              );
            });
      }),
      (this.Hho = () => {
        ModelManager_1.ModelManager.WeeklyRogueModel.CheckIsInWeeklyRogue()
          ? UiManager_1.UiManager.CloseView(this.Info.Name, (e) => {
              InstanceDungeonEntranceController_1.InstanceDungeonEntranceController.LeaveInstanceDungeonRequest();
            })
          : UiManager_1.UiManager.CloseView(this.Info.Name, (e) => {
              var i =
                ActivityRogueController_1.ActivityRogueController.GetCurrentActivityData();
              void 0 === i || 0 === i.GetRogueActivityState()
                ? RoguelikeController_1.RoguelikeController.RoguelikeQuitRequest()
                : RoguelikeController_1.RoguelikeController.RoguelikeResultRequest(
                    0,
                  );
            });
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIText],
      [1, UE.UIButtonComponent],
      [2, UE.UIButtonComponent],
    ]),
      (this.BtnBindInfo = [
        [1, this.Vho],
        [2, this.Hho],
      ]);
  }
  OnStart() {
    ModelManager_1.ModelManager.WeeklyRogueModel.CheckIsInWeeklyRogue()
      ? LguiUtil_1.LguiUtil.SetLocalTextNew(
          this.GetText(0),
          "RoguelikeExitTipsCurRoom",
          ModelManager_1.ModelManager.WeeklyRogueModel.CurrentLayer,
          ModelManager_1.ModelManager.WeeklyRogueModel.MaxLayer,
        )
      : LguiUtil_1.LguiUtil.SetLocalTextNew(
          this.GetText(0),
          "RoguelikeExitTipsCurRoom",
          ModelManager_1.ModelManager.RoguelikeModel.CurRoomCount,
          ModelManager_1.ModelManager.RoguelikeModel.TotalRoomCount,
        ),
      this.GetButton(1).RootUIComp.SetUIActive(
        !ModelManager_1.ModelManager.RoguelikeModel?.CheckIsGuideDungeon(),
      );
  }
}
exports.RoguelikeExitTips = RoguelikeExitTips;
//# sourceMappingURL=RoguelikeExitTips.js.map
