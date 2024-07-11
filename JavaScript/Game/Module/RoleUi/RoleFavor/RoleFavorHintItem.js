"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RoleFavorHintItem = void 0);
const UE = require("ue"),
  ConfigManager_1 = require("../../../Manager/ConfigManager"),
  UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase"),
  LevelSequencePlayer_1 = require("../../Common/LevelSequencePlayer"),
  LguiUtil_1 = require("../../Util/LguiUtil");
class RoleFavorHintItem extends UiPanelBase_1.UiPanelBase {
  constructor(e, i) {
    super(),
      (this.x_o = void 0),
      (this.SPe = void 0),
      (this.w_o = (e) => {
        "Start" === e
          ? this.PlayHalfway()
          : "Move" === e
            ? this.PlayEnd()
            : "Close" === e && this.OnSequenceFinish();
      }),
      (this.PlayStart = () => {
        this.SPe.PlayLevelSequenceByName("Start");
      }),
      (this.PlayHalfway = () => {
        this.SPe.PlayLevelSequenceByName("Move");
      }),
      (this.PlayEnd = () => {
        this.SPe.PlayLevelSequenceByName("Close");
      }),
      (this.OnSequenceFinish = () => {
        this.x_o && this.x_o();
      }),
      (this.SetSequenceFinishCallBack = (e) => {
        this.x_o = e;
      }),
      (this.B_o = e),
      this.CreateThenShowByActor(i.GetOwner());
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UITexture],
      [1, UE.UIText],
      [3, UE.UIText],
      [2, UE.UIText],
    ];
  }
  OnStart() {
    var e, i;
    this.B_o &&
      ((e = this.B_o.Exp),
      (i =
        ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(
          "T_IconA80_hgd_UI",
        )),
      this.SetTextureByPath(i, this.GetTexture(0)),
      (i = this.GetText(1)),
      LguiUtil_1.LguiUtil.SetLocalText(i, "FavorExp"),
      this.GetText(2).SetText(String(e)),
      (this.SPe = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem)),
      this.SPe.BindSequenceCloseEvent(this.w_o),
      this.PlayStart());
  }
  OnBeforeDestroy() {
    this.SPe?.Clear(), (this.x_o = void 0), (this.B_o = void 0);
  }
}
exports.RoleFavorHintItem = RoleFavorHintItem;
//# sourceMappingURL=RoleFavorHintItem.js.map
