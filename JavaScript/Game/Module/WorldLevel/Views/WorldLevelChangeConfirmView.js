"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.WorldLevelChangeConfirmView = void 0);
const UE = require("ue");
const Global_1 = require("../../../Global");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiViewBase_1 = require("../../../Ui/Base/UiViewBase");
const UiManager_1 = require("../../../Ui/UiManager");
const ScrollingTipsController_1 = require("../../ScrollingTips/ScrollingTipsController");
const LguiUtil_1 = require("../../Util/LguiUtil");
const WorldLevelController_1 = require("../WorldLevelController");
class WorldLevelChangeConfirmView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments),
      (this.wvo = () => {
        UiManager_1.UiManager.CloseView("WorldLevelChangeConfirmView");
      }),
      (this.ZOo = () => {
        UiManager_1.UiManager.CloseView("WorldLevelChangeConfirmView");
      }),
      (this.tjt = () => {
        ModelManager_1.ModelManager.WorldLevelModel.CurWorldLevel >
        ModelManager_1.ModelManager.WorldLevelModel.WorldLevelChangeTarget
          ? Global_1.Global.BaseCharacter?.CharacterActorComponent.Entity.GetComponent(
              185,
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
        [3, this.wvo],
        [4, this.ZOo],
        [5, this.tjt],
      ]);
  }
  OnStart() {
    this.LBt(), this.eko(), this.tko();
  }
  LBt() {
    this.GetText(6).SetText(
      ModelManager_1.ModelManager.WorldLevelModel.WorldLevelMultilingualText,
    );
  }
  eko() {
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
  tko() {
    const e =
      ConfigManager_1.ConfigManager.TextConfig.GetTextById("WorldLevelINotice");
    this.GetText(2).SetText(e ?? "");
  }
}
exports.WorldLevelChangeConfirmView = WorldLevelChangeConfirmView;
// # sourceMappingURL=WorldLevelChangeConfirmView.js.map
