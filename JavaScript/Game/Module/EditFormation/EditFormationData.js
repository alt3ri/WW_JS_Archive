"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.EditFormationData = void 0);
class EditFormationRoleData {
  constructor(t, i, s, e) {
    (this.Position = 0),
      (this.ConfigId = 0),
      (this.PlayerId = 0),
      (this.Level = 0),
      (this.Position = t),
      (this.ConfigId = i),
      (this.PlayerId = e),
      (this.Level = s);
  }
}
class EditFormationData {
  constructor(t) {
    (this.FormationId = 0),
      (this.n5t = 0),
      (this.Wke = []),
      (this.pXe = new Map()),
      (this.FormationId = t);
  }
  AddRoleData(t, i, s, e = !1) {
    var o = this.Wke.length + 1,
      t = (this.Wke.push(t), new EditFormationRoleData(o, t, i, s));
    this.pXe.set(o, t), e && (this.n5t = o);
  }
  GetRoleDataByPosition(t) {
    return this.pXe.get(t);
  }
  get GetRoleIdList() {
    return this.Wke;
  }
  SetCurrentRole(t) {
    for (const i of this.pXe.values())
      i.ConfigId === t && (this.n5t = i.Position);
  }
  GetRoleDataMap() {
    return this.pXe;
  }
  get GetCurrentRoleConfigId() {
    var t = this.n5t - 1;
    return this.Wke[t];
  }
  get GetCurrentRolePosition() {
    return this.n5t;
  }
}
exports.EditFormationData = EditFormationData;
//# sourceMappingURL=EditFormationData.js.map
