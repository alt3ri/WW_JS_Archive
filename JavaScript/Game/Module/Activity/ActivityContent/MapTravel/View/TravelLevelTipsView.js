"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.TravelLevelTipsView = void 0);
const UE = require("ue"),
  CustomPromise_1 = require("../../../../../../Core/Common/CustomPromise"),
  CommonParamById_1 = require("../../../../../../Core/Define/ConfigCommon/CommonParamById"),
  TimerSystem_1 = require("../../../../../../Core/Timer/TimerSystem"),
  MathUtils_1 = require("../../../../../../Core/Utils/MathUtils"),
  EventDefine_1 = require("../../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../../Common/Event/EventSystem"),
  UiViewBase_1 = require("../../../../../Ui/Base/UiViewBase"),
  LguiUtil_1 = require("../../../../Util/LguiUtil");
class TravelLevelTipsView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments),
      (this.PAt = 0),
      (this.UQa = 0),
      (this.zVl = 0),
      (this.JVl = 0),
      (this.ZVl = 0),
      (this.e4l = 0),
      (this.t4l = 0),
      (this.i4l = 0),
      (this.r4l = 0),
      (this.$An = (t) => {
        "TipsChange" === t && this.o4l();
      }),
      (this.TickHandle = void 0),
      (this.BarAnimTime = CommonParamById_1.configCommonParamById.GetIntConfig(
        "TravelExpBarDisplayTime",
      )),
      (this.RunBarAnim = !1),
      (this.RunBarAnimTime = 0),
      (this.StartValue = 0),
      (this.TargetValue = 0),
      (this.EndValue = 0),
      (this.BarAnimPromise = new CustomPromise_1.CustomPromise()),
      (this.Refresh = (t) => {
        this.RunBarAnim &&
          ((this.RunBarAnimTime += t),
          (t = MathUtils_1.MathUtils.Lerp(
            this.StartValue,
            this.TargetValue,
            this.RunBarAnimTime / this.BarAnimTime,
          )),
          this.n4l(t, this.EndValue),
          this.RunBarAnimTime >= this.BarAnimTime) &&
          this.s4l();
      });
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIText],
      [1, UE.UIText],
      [2, UE.UISprite],
    ];
  }
  OnStart() {
    var t = this.OpenParam,
      i =
        ((this.UQa = t.LastTravelLevel),
        (this.zVl = t.TravelLevel),
        (this.JVl = t.LastExpCount),
        (this.ZVl = t.GetExpItemCount()),
        (this.t4l = t.LastCurrentExpCount),
        t.TravelLevelData.get(this.UQa)),
      i =
        ((this.e4l = i.TargetExp),
        (this.i4l = t.GetCurrentExp()),
        (this.r4l = t.GetCurrentTargetExp()),
        this.zVl > this.UQa),
      t = this.ZVl > this.JVl;
    i ? (this.PAt = t ? 2 : 1) : t ? (this.PAt = 0) : this.CloseMe();
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.OnActivitySequenceEmitEvent,
      this.$An,
    );
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.OnActivitySequenceEmitEvent,
      this.$An,
    );
  }
  OnBeforeShow() {
    switch (
      ((this.TickHandle = TimerSystem_1.TimerSystem.Forever(
        this.Refresh,
        TimerSystem_1.MIN_TIME,
      )),
      this.n4l(0, 1),
      this.eCo(this.UQa),
      this.PAt)
    ) {
      case 2:
        this.a4l(this.ZVl - this.JVl),
          this.h4l(!0),
          this.n4l(this.t4l, this.e4l);
        break;
      case 0:
        this.a4l(this.i4l - this.t4l),
          this.h4l(!0),
          this.n4l(this.t4l, this.r4l);
        break;
      case 1:
        this.h4l(!1), this.n4l(this.t4l, this.e4l);
    }
  }
  OnAfterShow() {
    switch (this.PAt) {
      case 2:
        this.l4l();
        break;
      case 0:
        this._4l();
        break;
      case 1:
        this.l4l();
    }
  }
  OnBeforeDestroy() {
    this.S0t();
  }
  async _4l() {
    var t = this.i4l >= this.r4l;
    await this.c4l(this.t4l, this.i4l, this.r4l),
      t &&
        (await this.UiViewSequence.PlaySequenceAsync(
          "Full",
          new CustomPromise_1.CustomPromise(),
        )),
      this.CloseMe();
  }
  async l4l() {
    await this.c4l(this.t4l, this.e4l, this.e4l),
      this.eCo(this.zVl),
      this.UiViewSequence.PlaySequence("LevelChange"),
      this.n4l(0, this.r4l),
      await this.c4l(0, this.i4l, this.r4l),
      this.i4l >= this.r4l &&
        (await this.UiViewSequence.PlaySequenceAsync(
          "Full",
          new CustomPromise_1.CustomPromise(),
        )),
      this.CloseMe();
  }
  async c4l(t, i, s) {
    (this.StartValue = t),
      (this.TargetValue = Math.min(i, s)),
      (this.EndValue = s),
      (this.RunBarAnim = !0),
      (this.RunBarAnimTime = 0),
      this.BarAnimPromise.SetResult(),
      (this.BarAnimPromise = new CustomPromise_1.CustomPromise()),
      await this.BarAnimPromise.Promise;
  }
  s4l() {
    (this.RunBarAnim = !1), this.BarAnimPromise.SetResult();
  }
  S0t() {
    this.TickHandle &&
      (TimerSystem_1.TimerSystem.Remove(this.TickHandle),
      (this.TickHandle = void 0));
  }
  n4l(t, i) {
    t = MathUtils_1.MathUtils.Clamp(t / i, 0, 1);
    this.GetSprite(2).SetFillAmount(t);
  }
  h4l(t) {
    this.GetText(1).SetUIActive(t);
  }
  a4l(t) {
    LguiUtil_1.LguiUtil.SetLocalTextNew(
      this.GetText(1),
      "MapTravelLevelUp_Text",
      t,
    );
  }
  o4l() {
    LguiUtil_1.LguiUtil.SetLocalTextNew(
      this.GetText(1),
      "MapTravelLevelCanUp_Text",
    ),
      this.h4l(!0);
  }
  eCo(t) {
    this.GetText(0).SetText(t.toString());
  }
}
exports.TravelLevelTipsView = TravelLevelTipsView;
//# sourceMappingURL=TravelLevelTipsView.js.map
