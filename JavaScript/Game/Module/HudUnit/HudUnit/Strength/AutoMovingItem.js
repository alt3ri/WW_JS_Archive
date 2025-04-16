"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.AutoMovingItem = void 0);
const UE = require("ue"),
  Log_1 = require("../../../../../Core/Common/Log"),
  Stats_1 = require("../../../../../Core/Common/Stats"),
  TimerSystem_1 = require("../../../../../Core/Timer/TimerSystem"),
  UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase"),
  BattleUiTweenAnimPlayer_1 = require("../../../BattleUi/Views/BattleUiTweenAnimPlayer"),
  CLOSE_ANIM_TIME = 300;
class AutoMovingItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments),
      (this.xii = void 0),
      (this.rdt = -1),
      (this.Lti = !1),
      (this.TweenAnimPlayer =
        new BattleUiTweenAnimPlayer_1.BattleUiTweenAnimPlayer());
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UISprite],
      [3, UE.UIItem],
      [1, UE.UIItem],
      [2, UE.UIItem],
    ];
  }
  OnStart() {
    this.InitTweenAnim(3), this.InitTweenAnim(1), this.InitTweenAnim(2);
  }
  OnBeforeDestroy() {
    this.Gii(), super.OnBeforeDestroy();
  }
  SetVisible(e) {
    this.Lti !== e &&
      ((this.Lti = e)
        ? (this.SetActive(!0), this.StopTweenAnim(2), this.PlayTweenAnim(3))
        : this.Wti());
  }
  Wti() {
    this.StopTweenAnim(3),
      this.PlayTweenAnim(2),
      this.Gii(),
      (this.xii = TimerSystem_1.TimerSystem.Delay(
        () => {
          (this.xii = void 0), this.Lti || this.SetActive(!1);
        },
        CLOSE_ANIM_TIME,
        AutoMovingItem.Xii,
      ));
  }
  Gii() {
    this.xii &&
      (TimerSystem_1.TimerSystem.Remove(this.xii), (this.xii = void 0));
  }
  SetPercent(e) {
    e !== this.rdt &&
      (this.GetSprite(0).SetFillAmount(e),
      1 === e
        ? (this.SetChangeColor(!0), this.PlayTweenAnim(1))
        : 1 === this.rdt && this.SetChangeColor(!1),
      (this.rdt = e));
  }
  SetChangeColor(e) {
    var t = this.GetSprite(0);
    t.SetChangeColor(e, t.changeColor);
  }
  InitTweenAnim(e) {
    this.TweenAnimPlayer.InitTweenAnim(e, this.GetItem(e));
  }
  PlayTweenAnim(e) {
    Log_1.Log.CheckDebug() &&
      Log_1.Log.Debug("HudUnit", 17, "[自动奔跑]PlayTweenAnim", ["type", e]),
      this.TweenAnimPlayer.PlayTweenAnim(e);
  }
  StopTweenAnim(e) {
    this.TweenAnimPlayer.StopTweenAnim(e);
  }
}
(exports.AutoMovingItem = AutoMovingItem).Xii = Stats_1.Stat.Create(
  "AutoMovingItemCloseAnim",
);
//# sourceMappingURL=AutoMovingItem.js.map
