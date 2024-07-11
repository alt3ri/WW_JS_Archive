"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.WeaponMeshVisibleHelper = void 0);
const WeaponVisibleTagHelper_1 = require("./WeaponVisibleTagHelper");
class WeaponVisibleState {
  constructor(e = !1, i = !0, t = 0) {
    (this.IsHidden = e), (this.Active = i), (this.Priority = t);
  }
}
class WeaponMeshVisibleHelper {
  constructor(e) {
    (this.Owner = e),
      (this.WeaponVisibleTable = new Map()),
      (this.DefaultVisibleType = 0),
      (this.DefaultVisibleState = new WeaponVisibleState()),
      (this.WeaponHiddenTag =
        new WeaponVisibleTagHelper_1.WeaponVisibleTagHelper()),
      (this.WeaponVisibleTag =
        new WeaponVisibleTagHelper_1.WeaponVisibleTagHelper());
  }
  InitBaseTable(e) {
    this.DefaultVisibleType = e;
    (e = new WeaponVisibleState(!1, !1, 0)),
      this.WeaponVisibleTable.set(0, e),
      (e = new WeaponVisibleState(!1, !1, 1)),
      this.WeaponVisibleTable.set(1, e),
      (e = new WeaponVisibleState(!1, !1, 2));
    this.WeaponVisibleTable.set(2, e);
  }
  InitTagHelper(e, i, t, s, a) {
    this.WeaponVisibleTag.Init(this.Owner, e, i?.split("#"), t),
      this.WeaponHiddenTag.Init(this.Owner, e, s?.split("#"), a);
  }
  ClearTagHelper() {
    this.WeaponVisibleTag.Clear(), this.WeaponHiddenTag.Clear();
  }
  RequestAndUpdateHiddenInGame(e, i = !0, t = 0) {
    let s = !1;
    switch (this.DefaultVisibleType) {
      case 0:
        (s = e), i && (this.DefaultVisibleState.IsHidden = e);
        break;
      case 1:
        (s = !0), i && (this.DefaultVisibleState.IsHidden = !0);
    }
    i || ((t = this.WeaponVisibleTable.get(t)) && (t.IsHidden = e));
    t = this.uer();
    return (
      t &&
        (0 === t.Priority && i && t.Active
          ? (t.Active = !1)
          : (s = t.IsHidden)),
      s
    );
  }
  EnableHiddenInGameByExtraVisibleType(e, i) {
    e = this.WeaponVisibleTable.get(e);
    e && (e.Active = i);
  }
  uer() {
    let e = -1,
      i = void 0;
    for (var [, t] of this.WeaponVisibleTable)
      t.Active && t.Priority > e && ((e = t.Priority), (i = t));
    return i;
  }
}
exports.WeaponMeshVisibleHelper = WeaponMeshVisibleHelper;
//# sourceMappingURL=WeaponMeshVisibleHelper.js.map
