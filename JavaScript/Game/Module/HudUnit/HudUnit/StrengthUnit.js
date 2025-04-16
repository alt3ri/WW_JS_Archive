"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.StrengthUnit = void 0);
const UE = require("ue"),
  Log_1 = require("../../../../Core/Common/Log"),
  Vector_1 = require("../../../../Core/Utils/Math/Vector"),
  Vector2D_1 = require("../../../../Core/Utils/Math/Vector2D"),
  MathUtils_1 = require("../../../../Core/Utils/MathUtils"),
  HudUnitBase_1 = require("../HudUnitBase"),
  HudUnitUtils_1 = require("../Utils/HudUnitUtils"),
  FlyStrengthItem_1 = require("./Strength/FlyStrengthItem"),
  StrengthItem_1 = require("./Strength/StrengthItem"),
  strengthItemConfigMap = new Map([
    [1, StrengthItem_1.StrengthItem],
    [2, FlyStrengthItem_1.FlyStrengthItem],
  ]),
  MAX_DELTA_TIME = 200,
  MIN_DELTA_OFFSET = 0.5,
  MAX_POS_OFFSET = 500,
  ITEM_OFFSET_X_BASE = 157,
  ITEM_OFFSET_X_INTERVAL = 105,
  normalIndex = [0, 1],
  swapIndex = [1, 0];
class StrengthUnit extends HudUnitBase_1.HudUnitBase {
  constructor() {
    super(...arguments),
      (this.jma = new Vector2D_1.Vector2D()),
      (this.Wst = void 0),
      (this.n$t = void 0),
      (this.Rii = 0),
      (this.Uii = 0),
      (this.Aii = 0),
      (this.Pii = 0),
      (this.x5e = []),
      (this.NRl = new Map()),
      (this.FRl = !1),
      (this.VRl = [0, 0]),
      (this.HRl = (t) => {
        this.jRl();
      });
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UIItem],
      [2, UE.UIItem],
      [3, UE.UIItem],
    ];
  }
  OnStart() {
    super.OnStart(),
      this.x5e.push(this.GetItem(0)),
      this.x5e.push(this.GetItem(1)),
      this.InitTweenAnim(2),
      this.InitTweenAnim(3),
      this.AddStrengthItem(1, 0);
  }
  OnBeforeDestroy() {
    (this.Wst = void 0), (this.n$t = void 0), super.OnBeforeDestroy();
  }
  RefreshRoleData(t) {
    if (this.Wst !== t)
      if ((this.Wst = t)) {
        this.n$t = t.EntityHandle.Entity.GetComponent(3);
        for (const i of this.NRl.values()) i.RefreshRoleData(t);
      } else this.n$t = void 0;
  }
  AddStrengthItem(t, i) {
    var s;
    this.NRl.has(t)
      ? Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug("HudUnit", 17, "已经添加过该类型的体力条", [
          "strengthItemType",
          t,
        ])
      : i < 0 || 2 < i
        ? Log_1.Log.CheckError() &&
          Log_1.Log.Error("HudUnit", 17, "体力条位置参数非法", ["index", i])
        : 0 !== this.VRl[i]
          ? Log_1.Log.CheckError() &&
            Log_1.Log.Error("HudUnit", 17, "该位置已有其他体力条", [
              "strengthItemType",
              t,
            ])
          : (s = strengthItemConfigMap.get(t))
            ? ((this.VRl[i] = t),
              (i = this.x5e[i]),
              (s = new s()).Init(i, this.Wst, this.HRl),
              this.NRl.set(t, s))
            : Log_1.Log.CheckError() &&
              Log_1.Log.Error("HudUnit", 17, "体力条类型没有对应的实现", [
                "strengthItemType",
                t,
              ]);
  }
  SwapPlace(t) {
    this.FRl !== t && ((this.FRl = t), this.jRl());
  }
  jRl() {
    let t = !0;
    for (const i of this.VRl) this.NRl.get(i)?.GetUiVisible() || (t = !1);
    if (t)
      this.FRl
        ? (this.StopTweenAnim(2), this.PlayTweenAnim(3))
        : (this.StopTweenAnim(3), this.PlayTweenAnim(2));
    else {
      let t = 0,
        i = !0;
      for (const h of this.FRl ? swapIndex : normalIndex) {
        var s = this.x5e[h],
          e = this.VRl[h];
        this.NRl.get(e)?.GetUiVisible() &&
          (s.SetAnchorOffsetX(ITEM_OFFSET_X_BASE + ITEM_OFFSET_X_INTERVAL * t),
          s.SetAlpha(i ? 1 : 0.3),
          s.SetUIItemScale(Vector_1.Vector.OneVector),
          t++),
          (i = !1);
      }
    }
  }
  Tick(t) {
    this.WRl(t);
    for (const i of this.NRl.values()) i.Tick(t);
  }
  WRl(t) {
    var i, s;
    this.GetActive() &&
      this.n$t &&
      this.n$t.Actor?.IsValid() &&
      ((i = this.n$t.ActorLocation),
      HudUnitUtils_1.HudUnitUtils.PositionUtil.ProjectWorldToScreen(
        i,
        this.jma,
      )) &&
      ((i = this.jma.X),
      (s = this.jma.Y),
      Math.abs(i - this.Rii) > MAX_POS_OFFSET ||
      Math.abs(s - this.Uii) > MAX_POS_OFFSET
        ? ((this.Rii = i),
          (this.Uii = s),
          this.SetAnchorOffset(this.Rii, this.Uii))
        : ((this.Aii = this.jii(t, i, this.Rii, this.Aii)),
          (this.Pii = this.jii(t, s, this.Uii, this.Pii)),
          (i = this.Aii * t),
          (s = this.Pii * t),
          (i < MIN_DELTA_OFFSET &&
            i > -MIN_DELTA_OFFSET &&
            s < MIN_DELTA_OFFSET &&
            s > -MIN_DELTA_OFFSET) ||
            ((this.Rii += i),
            (this.Uii += s),
            this.SetAnchorOffset(this.Rii, this.Uii))));
  }
  jii(t, i, s, e) {
    let h = i - s,
      r = !1;
    if ((h < 0 && ((h = -h), (r = !0)), h < 1)) return 0;
    let _ = 0;
    return (
      (_ = t >= MAX_DELTA_TIME ? h / t : h / MAX_DELTA_TIME),
      r && (_ = -_),
      MathUtils_1.MathUtils.Lerp(e, _, 0.5)
    );
  }
}
exports.StrengthUnit = StrengthUnit;
//# sourceMappingURL=StrengthUnit.js.map
