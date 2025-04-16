"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SpecialEnergyBarKeLaiTaUltra = void 0);
const UE = require("ue"),
  Log_1 = require("../../../../../../Core/Common/Log"),
  SpecialEnergyBarBase_1 = require("../SpecialEnergyBarBase"),
  NUM = 4,
  numTagId = -328548082;
class SpecialEnergyBarKeLaiTaUltra extends SpecialEnergyBarBase_1.SpecialEnergyBarBase {
  constructor() {
    super(...arguments),
      (this.qdt = 0),
      (this.S4l = []),
      (this.M4l = []),
      (this.bst = void 0),
      (this.p2a = 0),
      (this.Yjl = !1),
      (this.E4l = (t) => {
        this.dbl(t);
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
      [9, UE.UIItem],
      [10, UE.UIItem],
      [11, UE.UIItem],
      [12, UE.UIItem],
      [13, UE.UIItem],
      [14, UE.UIItem],
      [15, UE.UIItem],
      [16, UE.UIItem],
      [17, UE.UIItem],
    ];
  }
  async OnBeforeStartAsync() {
    var t = [];
    t.push(this.LoadEffects()),
      t.push(this.InitKeyItem(this.GetItem(0))),
      await Promise.all(t);
  }
  OnStart() {
    for (let t = 0; t < NUM; t++)
      this.S4l.push(this.GetItem(1 + t)),
        this.M4l.push(this.GetItem(5 + t)),
        this.InitTweenAnim(11 + t);
    this.InitTweenAnim(15), this.dbl(-1, !0);
  }
  AddEvents() {
    super.AddEvents(), this.ListenForTagCountChanged(numTagId, this.E4l);
  }
  OnBeforeDestroy() {
    this.zjl(!1), super.OnBeforeDestroy();
  }
  dbl(t = -1, s = !1) {
    let i = t;
    if (
      (i < 0 && (i = this.TagComponent?.GetTagCount(numTagId) ?? 0),
      (i = NUM - i) !== this.qdt || s)
    ) {
      Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug("Battle", 17, "【能量条】柯莱塔大招进度更新", [
          "num",
          i,
        ]);
      t = i >= NUM;
      if (s)
        for (let t = 0; t < NUM; t++) {
          var e = t < i;
          this.S4l[t].SetUIActive(!e), this.M4l[t].SetUIActive(e);
        }
      else if (i < this.qdt) {
        for (let t = 0; t < NUM; t++) this.StopTweenAnim(11 + t);
        this.PlayTweenAnim(17);
        for (let t = 0; t < NUM; t++) {
          var h = t < i;
          this.S4l[t].SetUIActive(!h), this.M4l[t].SetUIActive(h);
        }
      } else for (let t = this.qdt; t < i; t++) this.PlayTweenAnim(11 + t);
      (this.qdt = i), this.KeyItem?.RefreshKeyEnable(t, s);
    }
  }
  GetKeyEnable() {
    return this.qdt >= NUM;
  }
  Tick(t) {
    super.Tick(t),
      (this.bst && this.BuffComponent?.GetBuffByHandle(this.p2a)) || this.tst(),
      this.bst &&
        this.zjl(
          this.bst.GetRemainDuration() < this.Config.ExtraFloatParams[0],
        );
  }
  tst() {
    this.Config?.BuffId
      ? ((this.bst = this.BuffComponent?.GetBuffById(this.Config.BuffId)),
        (this.p2a = this.bst?.Handle ?? 0))
      : ((this.bst = void 0), (this.p2a = 0));
  }
  zjl(t) {
    t !== this.Yjl &&
      ((this.Yjl = t)
        ? this.PlayTweenAnim(15)
        : (this.StopTweenAnim(15), this.GetItem(16)?.SetAlpha(1)));
  }
}
exports.SpecialEnergyBarKeLaiTaUltra = SpecialEnergyBarKeLaiTaUltra;
//# sourceMappingURL=SpecialEnergyBarKeLaiTaUltra.js.map
