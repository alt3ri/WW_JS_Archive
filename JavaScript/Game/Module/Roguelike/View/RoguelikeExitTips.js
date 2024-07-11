"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RoguelikeExitTips = void 0);
const UE = require("ue"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  UiViewBase_1 = require("../../../Ui/Base/UiViewBase"),
  UiManager_1 = require("../../../Ui/UiManager"),
  ActivityRogueController_1 = require("../../Activity/ActivityContent/RougeActivity/ActivityRogueController"),
  LguiUtil_1 = require("../../Util/LguiUtil"),
  RoguelikeController_1 = require("../RoguelikeController");
class RoguelikeExitTips extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments),
      (this.Vho = () => {
        UiManager_1.UiManager.CloseView(this.Info.Name, (e) => {
          RoguelikeController_1.RoguelikeController.RoguelikeResultRequest(0);
        });
      }),
      (this.Hho = () => {
        UiManager_1.UiManager.CloseView(this.Info.Name, (e) => {
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
    LguiUtil_1.LguiUtil.SetLocalTextNew(
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
