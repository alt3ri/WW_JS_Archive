"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FollowShootAimUnit = void 0);
const UE = require("ue"),
  HudUnitBase_1 = require("../HudUnitBase");
class FollowShootAimUnit extends HudUnitBase_1.HudUnitBase {
  constructor() {
    super(...arguments), (this.fXi = []), (this.yka = !1), (this.Ika = !1);
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UITexture],
      [1, UE.UITexture],
      [2, UE.UITexture],
      [3, UE.UITexture],
      [4, UE.UITexture],
      [5, UE.UITexture],
      [6, UE.UITexture],
      [7, UE.UITexture],
      [8, UE.UITexture],
      [9, UE.UIItem],
      [10, UE.UIItem],
    ];
  }
  OnStart() {
    super.OnStart(), this.InitTweenAnim(9), this.InitTweenAnim(10);
    for (let t = 0; t <= 8; t++) this.fXi.push(this.GetTexture(t));
  }
  RefreshState(t, s = !1) {
    if (this.yka !== t || s) {
      this.yka = t;
      for (const i of this.fXi) i.SetChangeColor(t, i.changeColor);
    }
  }
  SetIsAimTarget(t) {
    this.Ika !== t &&
      ((this.Ika = t),
      this.Ika
        ? (this.StopTweenAnim(10), this.PlayTweenAnim(9))
        : (this.StopTweenAnim(9), this.PlayTweenAnim(10)));
  }
}
exports.FollowShootAimUnit = FollowShootAimUnit;
//# sourceMappingURL=FollowShootAimUnit.js.map
