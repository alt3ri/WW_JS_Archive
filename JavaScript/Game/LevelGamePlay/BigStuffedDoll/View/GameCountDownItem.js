"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.GameCountDownItem = void 0);
const UE = require("ue"),
  Vector_1 = require("../../../../Core/Utils/Math/Vector"),
  TimeUtil_1 = require("../../../Common/TimeUtil"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  LevelSequencePlayer_1 = require("../../../Module/Common/LevelSequencePlayer"),
  UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase"),
  ONE_HUNDRED = 100;
class GameCountDownItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments),
      (this.HSl = !1),
      (this.mNe = 0),
      (this.cJt = ""),
      (this.mJt = ""),
      (this.dJt = ""),
      (this.Oct = void 0),
      (this.LevelSequencePlayer = void 0),
      (this.HGe = void 0),
      (this.TYe = void 0),
      (this.UpdateCountDown = (t) => {
        var e;
        t <= 0
          ? (this.GetUiNiagara(2).SetUIActive(!1),
            this.GetUiNiagara(3).SetUIActive(!1),
            this.TYe?.SetText("00:00:00"),
            (ModelManager_1.ModelManager.BigStuffedDollModel.GameResult = !1),
            ModelManager_1.ModelManager.BigStuffedDollModel.EnterNextGameStage())
          : (this.GetUiNiagara(2).SetUIActive(t <= 10),
            this.GetUiNiagara(3).SetUIActive(10 < t),
            (e = Math.floor(
              (t % TimeUtil_1.TimeUtil.Hour) / TimeUtil_1.TimeUtil.Minute,
            )),
            (this.mJt = (e < 10 ? "0" : "") + e),
            (e = Math.floor(t % TimeUtil_1.TimeUtil.Minute)),
            (this.dJt = (e < 10 ? "0" : "") + e),
            (e = Math.floor((t - Math.floor(t)) * ONE_HUNDRED)),
            (this.cJt = (e < 10 ? "0" : "") + e),
            this.TYe?.SetText(`${this.mJt}:${this.dJt}:` + this.cJt));
      });
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIText],
      [1, UE.UIText],
      [2, UE.UINiagara],
      [3, UE.UINiagara],
      [4, UE.UIText],
    ];
  }
  OnStart() {
    super.OnStart(),
      (this.LevelSequencePlayer = new LevelSequencePlayer_1.LevelSequencePlayer(
        this.RootItem,
      )),
      (this.HGe = this.GetText(0)),
      (this.TYe = this.GetText(1)),
      (this.Oct = UE.Color.FromHex("FFFFFFFF"));
  }
  async StartCountDown(t) {
    t
      ? ((this.HSl = !0),
        (this.mNe = t),
        await this.ShowAsync(),
        this.UpdateCountDown(t))
      : (this.HSl = !1);
  }
  OnTick(t) {
    2 === ModelManager_1.ModelManager.BigStuffedDollModel.GetGameStage() &&
      this.HSl &&
      ((this.mNe -= t / 1e3),
      this.mNe <= 10
        ? "Loop" !== this.LevelSequencePlayer.GetCurrentSequence() &&
          this.LevelSequencePlayer.PlayLevelSequenceByName("Loop")
        : ("Loop" === this.LevelSequencePlayer.GetCurrentSequence() &&
            this.LevelSequencePlayer.StopCurrentSequence(),
          this.HGe?.SetColor(this.Oct),
          this.TYe?.SetColor(this.Oct),
          this.HGe?.SetUIItemScale(Vector_1.Vector.OneVector),
          this.TYe?.SetUIItemScale(Vector_1.Vector.OneVector)),
      this.UpdateCountDown(this.mNe));
  }
}
exports.GameCountDownItem = GameCountDownItem;
//# sourceMappingURL=GameCountDownItem.js.map
