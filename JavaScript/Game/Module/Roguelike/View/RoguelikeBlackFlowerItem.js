"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RoguelikeBlackFlowerInstanceItem =
    exports.RoguelikeBlackFlowerItem =
    exports.RoguelikeBlackFlowerOpenParam =
      void 0);
const UE = require("ue"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase"),
  UiPopViewData_1 = require("../../../Ui/Define/UiPopViewData"),
  UiManager_1 = require("../../../Ui/UiManager"),
  ActivityRogueController_1 = require("../../Activity/ActivityContent/RougeActivity/ActivityRogueController"),
  LguiUtil_1 = require("../../Util/LguiUtil");
class RoguelikeBlackFlowerOpenParam extends UiPopViewData_1.UiPopViewData {
  constructor() {
    super(...arguments), (this.DropId = 0);
  }
}
exports.RoguelikeBlackFlowerOpenParam = RoguelikeBlackFlowerOpenParam;
class RoguelikeBlackFlowerItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments),
      (this.fFo = () => {
        var e,
          i =
            ModelManager_1.ModelManager.RoguelikeModel?.GetParamConfigBySeasonId();
        i &&
          (((e = new RoguelikeBlackFlowerOpenParam()).DropId =
            i.BlackFlowerDropId),
          UiManager_1.UiManager.OpenView("RoguelikeBlackFlowerPreviewView", e));
      }),
      (this.Lth = () => {
        var e,
          i =
            ActivityRogueController_1.ActivityRogueController.GetCurrentActivityData();
        i &&
          ((e = i.SeasonData.US_ - i.SeasonData.xS_),
          this.GetText(0).SetText(e + "/"),
          (e = i.SeasonData?.US_ ?? 0),
          this.GetText(1).SetText("" + e));
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIText],
      [1, UE.UIText],
      [2, UE.UIButtonComponent],
    ]),
      (this.BtnBindInfo = [[2, this.fFo]]);
  }
  OnBeforeShow() {
    this.Lth();
  }
}
exports.RoguelikeBlackFlowerItem = RoguelikeBlackFlowerItem;
class RoguelikeBlackFlowerInstanceItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments),
      (this.fFo = () => {
        var e,
          i =
            ModelManager_1.ModelManager.RoguelikeModel?.GetParamConfigBySeasonId();
        i &&
          (((e = new RoguelikeBlackFlowerOpenParam()).DropId =
            i.BlackFlowerDropId),
          UiManager_1.UiManager.OpenView("RoguelikeBlackFlowerPreviewView", e));
      }),
      (this.Lth = () => {
        var e,
          i =
            ActivityRogueController_1.ActivityRogueController.GetCurrentActivityData();
        i &&
          ((e = i.SeasonData.US_ - i.SeasonData.xS_),
          (i = i.SeasonData?.US_ ?? 0),
          LguiUtil_1.LguiUtil.SetLocalTextNew(
            this.GetText(0),
            "InstanceDungeon_BlackFlowerTitle",
          ),
          LguiUtil_1.LguiUtil.SetLocalTextNew(
            this.GetText(1),
            "Rogue_MemoryPlace_Progress",
            e.toString(),
            i.toString(),
          ));
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIText],
      [1, UE.UIText],
      [2, UE.UIButtonComponent],
    ]),
      (this.BtnBindInfo = [[2, this.fFo]]);
  }
  OnBeforeShow() {
    this.Lth();
  }
}
exports.RoguelikeBlackFlowerInstanceItem = RoguelikeBlackFlowerInstanceItem;
//# sourceMappingURL=RoguelikeBlackFlowerItem.js.map
