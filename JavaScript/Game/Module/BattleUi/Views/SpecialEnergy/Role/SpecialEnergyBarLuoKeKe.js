"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SpecialEnergyBarLuoKeKe = void 0);
const UE = require("ue"),
  Log_1 = require("../../../../../../Core/Common/Log"),
  Time_1 = require("../../../../../../Core/Common/Time"),
  SpecialEnergyBarBase_1 = require("../SpecialEnergyBarBase"),
  SpecialEnergyBarSlot_1 = require("../SpecialEnergyBarSlot"),
  NUM = 3,
  EFFECT_TIME = 1e3,
  ghostTags = [1459704896, -1325526953, -1895287750];
class SpecialEnergyBarLuoKeKe extends SpecialEnergyBarBase_1.SpecialEnergyBarBase {
  constructor() {
    super(...arguments),
      (this.Rdt = void 0),
      (this.T5l = []),
      (this.b5l = []),
      (this.Fdt = !1),
      (this.L5l = 0),
      (this.I4l = !1),
      (this.T4l = 0),
      (this.b4l = 0),
      (this.L4l = (t, s) => {
        s
          ? ((this.I4l = !0),
            Log_1.Log.CheckDebug() &&
              Log_1.Log.Debug("Battle", 17, "【能量条】洛可可鬼头状态更新", [
                "",
                this.I4l,
              ]))
          : this.A4l(),
          this.x4l();
      });
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UIItem],
      [2, UE.UIItem],
      [3, UE.UIItem],
      [4, UE.UIItem],
      [5, UE.UIItem],
      [6, UE.UIItem],
      [7, UE.UIItem],
      [8, UE.UIItem],
    ];
  }
  async OnBeforeStartAsync() {
    var t = [];
    t.push(this.InitBarItem()), await Promise.all(t);
  }
  async InitBarItem() {
    (this.Rdt = new SpecialEnergyBarSlot_1.SpecialEnergyBarSlot()),
      this.Rdt.InitData(this.RoleData, this.Config, !0),
      await this.Rdt.InitByActorAsync(this.GetItem(0).GetOwner());
  }
  A4l() {
    this.I4l = !1;
    for (const t of ghostTags)
      if (this.TagComponent?.HasTag(t)) {
        this.I4l = !0;
        break;
      }
    Log_1.Log.CheckDebug() &&
      Log_1.Log.Debug("Battle", 17, "【能量条】洛可可鬼头状态更新", [
        "",
        this.I4l,
      ]);
  }
  AddEvents() {
    super.AddEvents();
    for (const t of ghostTags) this.ListenForTagAddOrRemoveChanged(t, this.L4l);
  }
  OnStart() {
    this.InitTweenAnim(7), this.InitTweenAnim(8), this.A4l();
    for (let t = 0; t < NUM; t++)
      this.T5l.push(this.GetItem(1 + t)),
        this.b5l.push(this.GetItem(4 + t)),
        this.b5l[t].SetUIActive(!1);
    this.x4l(!0);
  }
  OnBarPercentChanged() {
    this.x4l();
  }
  x4l(s = !1) {
    var t = this.PercentMachine.GetCurPercent(),
      i = Math.floor(3 * t),
      e = this.I4l ? i : 0;
    if (this.b4l !== e) {
      if (
        (Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug(
            "Battle",
            17,
            "【能量条】洛可可鬼头数量更新",
            ["new", e],
            ["old", this.b4l],
            ["inGhost", this.I4l],
          ),
        e > this.b4l)
      ) {
        for (let t = 0; t < NUM; t++) {
          var h = t < e;
          this.T5l[t].SetUIActive(h), s && h && this.T5l[t].SetAlpha(1);
        }
        s || (this.StopTweenAnim(8), this.PlayTweenAnim(7));
      } else s || (this.StopTweenAnim(7), this.PlayTweenAnim(8));
      if (this.I4l)
        for (let t = 0; t < NUM; t++) this.Rdt.SetFullEffectVisible(t, !1);
      else
        for (let t = 0; t < NUM; t++) {
          var r = t < i;
          this.Rdt.SetFullEffectVisible(t, r);
        }
      this.b4l = e;
    }
    if (this.T4l !== i) {
      if (i < this.T4l) {
        Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug(
            "Battle",
            17,
            "【能量条】洛可可鬼头使用",
            ["new", i],
            ["old", this.T4l],
            ["inGhost", this.I4l],
          );
        for (let t = i; t < this.T4l; t++)
          this.b5l[t].SetUIActive(!0),
            (this.L5l = Time_1.Time.Now + EFFECT_TIME),
            (this.Fdt = !0);
      }
      this.T4l = i;
    }
  }
  Tick(t) {
    if (
      (super.Tick(t),
      this.Rdt?.Tick(t),
      this.Fdt && this.L5l <= Time_1.Time.Now)
    ) {
      for (const s of this.b5l) s.SetUIActive(!1);
      this.Fdt = !1;
    }
  }
}
exports.SpecialEnergyBarLuoKeKe = SpecialEnergyBarLuoKeKe;
//# sourceMappingURL=SpecialEnergyBarLuoKeKe.js.map
