"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RoleFavorData = void 0);
const Protocol_1 = require("../../../../../Core/Define/Net/Protocol"),
  EventDefine_1 = require("../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../Common/Event/EventSystem"),
  ConfigManager_1 = require("../../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  FavorItemInfo_1 = require("./DataInfo/FavorItemInfo"),
  RoleModuleDataBase_1 = require("./RoleModuleDataBase");
class RoleFavorData extends RoleModuleDataBase_1.RoleModuleDataBase {
  constructor() {
    super(...arguments),
      (this.Level = 0),
      (this.Exp = 0),
      (this.Ylo = new Map());
  }
  GetFavorLevel() {
    return this.Level;
  }
  SetFavorLevel(e) {
    this.Level = e;
  }
  GetFavorExp() {
    return this.Exp;
  }
  SetFavorExp(e) {
    (this.Exp = e),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.RoleFavorExpChange,
      );
  }
  UpdateRoleFavorData(e, t) {
    this.Ylo.set(e, this.Jlo(t)),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.UpdateRoleFavorData,
        this.RoleId,
      );
  }
  UpdateUnlockId(e, t, r) {
    var e = this.GetClientFavorTabType(e),
      o = this.Ylo.get(e),
      a = o.length;
    for (let e = 0; e < a; e++) {
      var n = o[e];
      n.Id === r && (n.Status = 2);
    }
    EventSystem_1.EventSystem.Emit(
      EventDefine_1.EEventName.UpdateRoleFavorData,
      this.RoleId,
    ),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.UnLockRoleFavorItem,
        t,
        r,
      );
  }
  UpdateCanUnlockId(e, r) {
    var t,
      e = this.GetClientFavorTabType(e),
      o = this.Ylo.get(e);
    if (o) {
      var a = o.length;
      let t = !1;
      for (let e = 0; e < a; e++) {
        var n = o[e];
        if (n.Id === r) {
          (t = !0), (n.Status = 1);
          break;
        }
      }
      t || o.push(new FavorItemInfo_1.FavorItemInfo(r, 1)),
        EventSystem_1.EventSystem.Emit(
          EventDefine_1.EEventName.UpdateRoleFavorData,
          this.RoleId,
        );
    } else
      (t = []).push(new FavorItemInfo_1.FavorItemInfo(r, 1)),
        this.Ylo.set(e, t);
  }
  Jlo(t) {
    var r = [],
      o = t.length;
    for (let e = 0; e < o; e++) {
      var a = t[e];
      r.push(this.zlo(a));
    }
    return r;
  }
  zlo(e) {
    var t = this.GetClientFavorItemStatus(e.n3n);
    return new FavorItemInfo_1.FavorItemInfo(e.Ekn, t);
  }
  GetFavorItemState(t, e) {
    var r = this.Ylo.get(e),
      o = r.length;
    for (let e = 0; e < o; e++) {
      var a = r[e];
      if (a.Id === t) return a.Status;
    }
    return 0;
  }
  GetClientFavorItemStatus(e) {
    let t = void 0;
    return (
      e === Protocol_1.Aki.Protocol.cks.Proto_ItemLocked
        ? (t = 0)
        : e === Protocol_1.Aki.Protocol.cks.Proto_ItemCanUnLock
          ? (t = 1)
          : e === Protocol_1.Aki.Protocol.cks.Proto_ItemUnLocked && (t = 2),
      t
    );
  }
  GetClientFavorTabType(e) {
    return e === Protocol_1.Aki.Protocol.dks.I3n
      ? 0
      : e === Protocol_1.Aki.Protocol.dks.Proto_Story
        ? 1
        : e === Protocol_1.Aki.Protocol.dks.Proto_Goods
          ? 3
          : void 0;
  }
  IsExistCanUnlockFavorItem() {
    for (var [e] of this.Ylo) if (this.IsFavorItemCanUnlock(e)) return !0;
    return !1;
  }
  IsFavorItemCanUnlock(e) {
    if (2 === e)
      return ModelManager_1.ModelManager.MotionModel.IfRoleMotionCanUnlock(
        this.RoleId,
      );
    var t = this.Ylo.get(e);
    if (t) {
      var r = t.length;
      for (let e = 0; e < r; e++) if (1 === t[e].Status) return !0;
    }
    return !1;
  }
  GetUnlockActionIndexList() {
    var t = [],
      r = this.Ylo.get(2);
    if (r) {
      var o = r.length;
      for (let e = 0; e < o; e++) {
        var a = r[e];
        2 === a.Status &&
          ((a = ConfigManager_1.ConfigManager.MotionConfig.GetMotionConfig(
            a.Id,
          )),
          t.push(a.Sort));
      }
    }
    return t;
  }
}
exports.RoleFavorData = RoleFavorData;
//# sourceMappingURL=RoleFavorData.js.map
