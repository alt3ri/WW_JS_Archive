"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.DangoMonopolyTipsView = void 0);
const UE = require("ue"),
  Log_1 = require("../../../../../Core/Common/Log"),
  TimerSystem_1 = require("../../../../../Core/Timer/TimerSystem"),
  UiViewBase_1 = require("../../../../Ui/Base/UiViewBase");
class DangoMonopolyTipsView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments), (this.OpenParam = void 0);
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UITexture],
      [1, UE.UIText],
    ];
  }
  Es_() {
    Log_1.Log.CheckDebug() &&
      Log_1.Log.Debug("DangoMonopoly", 69, this.constructor.name, [
        "DataParam",
        this.OpenParam,
      ]);
  }
  async OnBeforeStartAsync() {
    this.Es_(), await super.OnBeforeStartAsync();
  }
  OnBeforeShow() {
    this.ShowData();
  }
  async ShowData() {
    var e;
    this.OpenParam?.TipsTextList.length
      ? ((e = this.OpenParam.TipsTextList.shift()),
        this.GetText(1)?.SetText(e.Text),
        this.UpdateIcon(e.Icon),
        (this.OpenParam.ShowTime &&
          (await TimerSystem_1.TimerSystem.Wait(this.OpenParam.ShowTime),
          this.IsDestroyOrDestroying)) ||
          (await this.ShowData()))
      : this.CloseMe();
  }
  UpdateIcon(e) {
    e && this.SetTextureShowUntilLoaded(e, this.GetTexture(0));
  }
}
exports.DangoMonopolyTipsView = DangoMonopolyTipsView;
//# sourceMappingURL=DangoMonopolyTipsView.js.map
