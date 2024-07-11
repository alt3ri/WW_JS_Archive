"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.MonsterCursorUnit = void 0);
const UE = require("ue"),
  HudUnitBase_1 = require("../HudUnitBase"),
  RAD_2_DEG = 180 / Math.PI,
  CURSOR_NUM = 3;
class MonsterCursorUnit extends HudUnitBase_1.HudUnitBase {
  constructor() {
    super(...arguments),
      (this.lti = void 0),
      (this.zei = new UE.Rotator()),
      (this.wit = new UE.Vector2D()),
      (this._ti = 0),
      (this.uti = 1),
      (this.cti = (t, s) => {
        this._Oe();
      });
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UIItem],
      [2, UE.UIItem],
      [3, UE.UINiagara],
      [4, UE.UINiagara],
      [5, UE.UINiagara],
    ];
  }
  Activate(t) {
    (this.lti = t),
      (this.wit.X = 0),
      (this.wit.Y = 0),
      this.AddEntityEvents(),
      this._Oe(),
      this.GetActive() && this.SetActive(!1);
  }
  Deactivate() {
    this.lti &&
      (this.lti.ClearAllTagCountChangedCallback(), (this.lti = void 0));
  }
  AddEntityEvents() {
    this.lti.ListenForTagCountChanged(1996624497, this.cti),
      this.lti.ListenForTagCountChanged(704115290, this.cti),
      this.lti.ListenForTagCountChanged(1922078392, this.cti);
  }
  GetEntityId() {
    return this.lti?.GetId();
  }
  IsValid() {
    return void 0 !== this.lti;
  }
  GetHudEntityData() {
    return this.lti;
  }
  Refresh(t, s) {
    t !== this.uti &&
      ((this.uti = t),
      this.GetUiNiagara(3 + this._ti).SetNiagaraVarFloat("Scale", t)),
      (this.zei.Yaw = Math.atan2(s.Y, s.X) * RAD_2_DEG - 90),
      (this.zei.Roll = 0),
      (this.zei.Pitch = 0),
      this.RootItem.SetUIRelativeRotation(this.zei),
      this.RootItem.SetAnchorOffsetX(s.X),
      this.RootItem.SetAnchorOffsetY(s.Y);
  }
  _Oe() {
    let s = 0;
    if (
      ((s = this.lti.ContainsTagById(1922078392)
        ? 2
        : this.lti.ContainsTagById(-1371021686)
          ? 1
          : 0),
      this._ti !== s)
    ) {
      this._ti = s;
      for (let t = 0; t < CURSOR_NUM; t++)
        this.GetItem(0 + t).SetUIActive(t === s);
      this.GetUiNiagara(3 + s).SetNiagaraVarFloat("Scale", this.uti);
    }
  }
}
exports.MonsterCursorUnit = MonsterCursorUnit;
//# sourceMappingURL=MonsterCursorUnit.js.map
