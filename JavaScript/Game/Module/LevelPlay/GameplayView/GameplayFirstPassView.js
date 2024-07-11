"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.GameplayFirstPassView = void 0);
const UE = require("ue");
const TimerSystem_1 = require("../../../../Core/Timer/TimerSystem");
const PublicUtil_1 = require("../../../../Game/Common/PublicUtil");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const UiViewBase_1 = require("../../../Ui/Base/UiViewBase");
const GameplayViewDefine_1 = require("./GameplayViewDefine");
class GameplayFirstPassView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments), (this.TimerId = void 0);
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIText],
      [1, UE.UIText],
    ];
  }
  OnStart() {
    let e;
    let i = this.OpenParam;
    i &&
      ((e = ConfigManager_1.ConfigManager.TextConfig.GetTextById(
        i.InfoId ?? "",
      )),
      (i = PublicUtil_1.PublicUtil.GetConfigTextByKey(i.TitleId ?? "")),
      this.Ifi(e, i));
  }
  Ifi(e, i) {
    this.GetText(0).SetText(e ?? ""), this.GetText(1).SetText(i);
  }
  OnAfterPlayStartSequence() {
    this.TBt();
  }
  TBt() {
    this.TimerId = TimerSystem_1.TimerSystem.Delay(() => {
      this.$Oe();
    }, GameplayViewDefine_1.DelayCloseTime);
  }
  $Oe() {
    (this.TimerId = void 0), this.CloseMe();
  }
  OnBeforeDestroy() {
    void 0 !== this.TimerId &&
      (TimerSystem_1.TimerSystem.Remove(this.TimerId), (this.TimerId = void 0));
  }
}
exports.GameplayFirstPassView = GameplayFirstPassView;
// # sourceMappingURL=GameplayFirstPassView.js.map
