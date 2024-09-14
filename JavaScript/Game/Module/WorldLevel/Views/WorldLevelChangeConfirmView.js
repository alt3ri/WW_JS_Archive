"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.WorldLevelChangeConfirmView = void 0);
const UE = require("ue"),
  Global_1 = require("../../../Global"),
  ConfigManager_1 = require("../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  UiViewBase_1 = require("../../../Ui/Base/UiViewBase"),
  UiManager_1 = require("../../../Ui/UiManager"),
  ScrollingTipsController_1 = require("../../ScrollingTips/ScrollingTipsController"),
  LguiUtil_1 = require("../../Util/LguiUtil"),
  WorldLevelController_1 = require("../WorldLevelController");
class WorldLevelChangeConfirmView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments),
      (this.AMo = () => {
        UiManager_1.UiManager.CloseView("WorldLevelChangeConfirmView");
      }),
      (this.Yko = () => {
        UiManager_1.UiManager.CloseView("WorldLevelChangeConfirmView");
      }),
      (this.tWt = () => {
        ModelManager_1.ModelManager.WorldLevelModel.CurWorldLevel >
        ModelManager_1.ModelManager.WorldLevelModel.WorldLevelChangeTarget
          ? Global_1.Global.BaseCharacter?.CharacterActorComponent.Entity.GetComponent(
              190,
            )?.HasTag(1996802261)
            ? ScrollingTipsController_1.ScrollingTipsController.ShowTipsByText(
                ConfigManager_1.ConfigManager.TextConfig.GetTextById(
                  "WorldLevelDownReject",
                ) ?? "",
              )
            : WorldLevelController_1.WorldLevelController.SendWorldLevelDownRequest()
          : WorldLevelController_1.WorldLevelController.SendWorldLevelRegainRequest(),
          UiManager_1.UiManager.CloseView("WorldLevelChangeConfirmView");
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIText],
      [1, UE.UIText],
      [2, UE.UIText],
      [3, UE.UIButtonComponent],
      [4, UE.UIButtonComponent],
      [5, UE.UIButtonComponent],
      [6, UE.UIText],
    ]),
      (this.BtnBindInfo = [
        [3, this.AMo],
        [4, this.Yko],
        [5, this.tWt],
      ]);
  }
  OnStart() {
    this.Ubt(), this.Jko(), this.zko();
  }
  Ubt() {
    this.GetText(6).SetText(
      ModelManager_1.ModelManager.WorldLevelModel.WorldLevelMultilingualText,
    );
  }
  Jko() {
    LguiUtil_1.LguiUtil.SetLocalText(
      this.GetText(0),
      "LvString",
      ModelManager_1.ModelManager.WorldLevelModel.CurWorldLevel,
    ),
      LguiUtil_1.LguiUtil.SetLocalText(
        this.GetText(1),
        "LvString",
        ModelManager_1.ModelManager.WorldLevelModel.WorldLevelChangeTarget,
      );
  }
  zko() {
    var e =
      ConfigManager_1.ConfigManager.TextConfig.GetTextById("WorldLevelINotice");
    this.GetText(2).SetText(e ?? "");
  }
}
exports.WorldLevelChangeConfirmView = WorldLevelChangeConfirmView;
//# sourceMappingURL=WorldLevelChangeConfirmView.js.map
