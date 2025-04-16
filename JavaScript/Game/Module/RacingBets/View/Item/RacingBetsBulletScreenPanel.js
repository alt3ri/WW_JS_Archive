"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RacingBetsBulletScreenPanel = void 0);
const UE = require("ue"),
  TimerSystem_1 = require("../../../../../Core/Timer/TimerSystem"),
  ConfigManager_1 = require("../../../../Manager/ConfigManager"),
  UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase"),
  LguiUtil_1 = require("../../../Util/LguiUtil"),
  RacingBetsBulletScreenItem_1 = require("./RacingBetsBulletScreenItem");
class RacingBetsBulletScreenPanel extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments),
      (this.fe1 = 0),
      (this.ge1 = 0),
      (this.Ce1 = 80),
      (this.pe1 = 200),
      (this.ve1 = 0.2),
      (this.ye1 = 5),
      (this.Se1 = 0),
      (this.TDe = void 0),
      (this.Me1 = new Map()),
      (this.Ee1 = 0),
      (this.Ie1 = []),
      (this.Te1 = []),
      (this.be1 = []),
      (this.Vm1 = []),
      (this.fGo = void 0),
      (this.J_ = (t) => {
        this.Le1(t),
          (this.Se1 += t),
          this.Se1 < this.pe1 ||
            (this.Re1() && ((this.Se1 %= this.pe1), this.we1()));
      });
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem]];
  }
  OnStart() {
    var t;
    (this.TDe = TimerSystem_1.FlowTimeTimerSystem.Forever(
      this.J_,
      TimerSystem_1.MIN_TIME,
      1,
      void 0,
      void 0,
      !1,
    )),
      (this.fGo = this.GetRootItem().GetAttachUIChild(0)?.GetOwner()),
      this.fGo &&
        ((t = this.GetItem(0)),
        (this.fe1 = t.GetHeight()),
        (this.ge1 = t.GetWidth()),
        (this.Ee1 = Math.floor(this.fe1 / this.Ce1)),
        this.fGo.GetUIItem().SetUIActive(!1));
  }
  Le1(t) {
    for (const e of this.Ie1)
      e.MoveLeft(t * this.ve1),
        e.GetRootItem().GetAnchorOffsetX() < -e.GetBulletScreenItemWidth() &&
          this.Ae1(e);
  }
  async we1() {
    if (!(this.be1.length <= 0 && this.Vm1.length <= 0)) {
      let t = 0,
        e = !1;
      0 < this.Vm1.length
        ? ((t = this.Vm1.shift()), (e = !0))
        : (t = this.be1.shift());
      var i = await this.Pe1();
      i.RefreshUi(t, e),
        this.xe1(t, i),
        i.GetRootItem().SetUIActive(!0),
        this.Ie1.push(i);
    }
  }
  Ae1(t) {
    this.Ie1.splice(this.Ie1.indexOf(t), 1),
      t.GetRootItem().SetUIActive(!1),
      this.Te1.push(t);
    for (var [e, i] of this.Me1)
      if (i === t) {
        this.Me1.delete(e);
        break;
      }
  }
  xe1(t, e) {
    var i = this.jm1(t),
      s = this.De1(i),
      t = this.Ce1 * i - e.GetBulletScreenItemHeight();
    let r = 0;
    (r = t <= 0 ? 0 : Math.random() * t - t / 2),
      e.GetRootItem().SetAnchorOffsetX(this.ge1),
      e.GetRootItem().SetAnchorOffsetY(-s * this.Ce1 - r);
    for (let t = 0; t < i; t++) this.Me1.set(s + t, e);
  }
  OnBeforeDestroy() {
    this.TDe &&
      (TimerSystem_1.FlowTimeTimerSystem.Remove(this.TDe), (this.TDe = void 0));
  }
  De1(e) {
    let t = 0;
    for (; t < this.ye1; ) {
      t++;
      var i = Math.floor(Math.random() * (this.Ee1 + 1 - e));
      if (this.Hm1(i, e)) return i;
    }
    for (let t = 0; t < this.Ee1; t++) if (this.Hm1(t, e)) return t;
    return 0;
  }
  Re1() {
    let t = 0;
    if (0 < this.Vm1.length) t = this.Vm1[0];
    else {
      if (!(0 < this.be1.length)) return !1;
      t = this.be1[0];
    }
    var e = this.jm1(t);
    for (let t = 0; t < this.Ee1; t++) if (this.Hm1(t, e)) return !0;
    return !1;
  }
  Hm1(e, i) {
    for (let t = 0; t < i; t++) if (!this.Ue1(e + t)) return !1;
    return !0;
  }
  Ue1(t) {
    t = this.Me1.get(t);
    return (
      !t ||
      t.GetRootItem().GetAnchorOffsetX() + t.GetBulletScreenItemWidth() <
        this.ge1
    );
  }
  async Pe1() {
    var t, e;
    return 0 < this.Te1.length
      ? this.Te1.pop()
      : ((t = this.Be1().GetOwner()),
        await (e =
          new RacingBetsBulletScreenItem_1.RacingBetsBulletScreenItem()).CreateThenShowByActorAsync(
          t,
        ),
        e);
  }
  jm1(t) {
    return 1 ===
      ConfigManager_1.ConfigManager.RacingBetsConfig.GetRacingBetsBulletScreen(
        t,
      ).Type
      ? 2
      : 1;
  }
  Be1() {
    return LguiUtil_1.LguiUtil.CopyItem(
      this.fGo.GetUIItem(),
      this.GetRootItem(),
    );
  }
  SetBulletScreenShowType(t) {
    this.Ee1 =
      2 === t
        ? Math.floor(this.fe1 / this.Ce1)
        : Math.floor(this.fe1 / this.Ce1 / 2);
  }
  PushBulletScreen(t, e) {
    e ? this.Vm1.push(...t) : (this.be1 = t);
  }
}
exports.RacingBetsBulletScreenPanel = RacingBetsBulletScreenPanel;
//# sourceMappingURL=RacingBetsBulletScreenPanel.js.map
