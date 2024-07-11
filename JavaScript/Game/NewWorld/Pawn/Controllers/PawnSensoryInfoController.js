"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SensoryInfoController = void 0);
const Vector_1 = require("../../../../Core/Utils/Math/Vector");
class SensoryInfoController {
  constructor() {
    (this._A = 0),
      (this.SensoryInfoType = 0),
      (this.MaxSensoryRange = 0),
      (this.Xor = new Map());
  }
  Tick(t) {
    if (2 & this.SensoryInfoType)
      for (const s of this.Xor) s[1].CheckInRange() && s[1].Tick(t);
  }
  HandleEntities(t, s, o) {
    for (const h of this.Xor) h[1].ClearCacheList();
    for (const n of t) {
      var i = n.Id,
        r = n.Entity?.GetComponent(1);
      if (n && n.Entity?.Active && r && i !== o) {
        var e = Vector_1.Vector.Distance(r.ActorLocationProxy, s);
        for (const f of this.Xor)
          e > f[1].SensoryRange ||
            !f[1].CheckEntity(n.Entity) ||
            f[1].EnterRange(n.Entity);
      }
    }
    for (const c of this.Xor) c[1].ExitRange();
  }
  AddSensoryInfo(t) {
    (this.SensoryInfoType |= t.SensoryInfoType),
      (this.MaxSensoryRange = Math.max(this.MaxSensoryRange, t.SensoryRange));
    var s = ++this._A;
    return this.Xor.set(s, t), s;
  }
  RemoveSensoryInfo(t) {
    return (
      !!this.Xor.has(t) &&
      (this.Xor.delete(t), this.UpdateInfoType(), this.UpdateSensoryRange(), !0)
    );
  }
  UpdateInfoType() {
    this.SensoryInfoType = 0;
    for (const t of this.Xor) this.SensoryInfoType |= t[1].SensoryInfoType;
  }
  UpdateSensoryRange() {
    this.MaxSensoryRange = 0;
    for (const t of this.Xor)
      this.MaxSensoryRange = Math.max(this.MaxSensoryRange, t[1].SensoryRange);
  }
  Clear() {
    (this._A = 0), (this.SensoryInfoType = 0), (this.MaxSensoryRange = 0);
    for (const t of this.Xor) t[1].Clear();
    this.Xor.clear();
  }
}
exports.SensoryInfoController = SensoryInfoController;
//# sourceMappingURL=PawnSensoryInfoController.js.map
