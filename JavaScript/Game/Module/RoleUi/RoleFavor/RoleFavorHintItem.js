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
      (this.q1o = void 0),
      (this.EPe = void 0),
      (this.G1o = (e) => {
        "Start" === e
          ? this.PlayHalfway()
          : "Move" === e
            ? this.PlayEnd()
            : "Close" === e && this.OnSequenceFinish();
      }),
      (this.PlayStart = () => {
        this.EPe.PlayLevelSequenceByName("Start");
      }),
      (this.PlayHalfway = () => {
        this.EPe.PlayLevelSequenceByName("Move");
      }),
      (this.PlayEnd = () => {
        this.EPe.PlayLevelSequenceByName("Close");
      }),
      (this.OnSequenceFinish = () => {
        this.q1o && this.q1o();
      }),
      (this.SetSequenceFinishCallBack = (e) => {
        this.q1o = e;
      }),
      (this.N1o = e),
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
    this.N1o &&
      ((e = this.N1o.Exp),
      (i =
        ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(
          "T_IconA80_hgd_UI",
        )),
      this.SetTextureByPath(i, this.GetTexture(0)),
      (i = this.GetText(1)),
      LguiUtil_1.LguiUtil.SetLocalText(i, "FavorExp"),
      this.GetText(2).SetText(String(e)),
      (this.EPe = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem)),
      this.EPe.BindSequenceCloseEvent(this.G1o),
      this.PlayStart());
  }
  OnBeforeDestroy() {
    this.EPe?.Clear(), (this.q1o = void 0), (this.N1o = void 0);
  }
}
exports.RoleFavorHintItem = RoleFavorHintItem;
//# sourceMappingURL=RoleFavorHintItem.js.map
