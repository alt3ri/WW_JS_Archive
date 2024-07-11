"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.EditFormationModel = void 0);
const Log_1 = require("../../../Core/Common/Log"),
  ModelBase_1 = require("../../../Core/Framework/ModelBase"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  EditFormationData_1 = require("./EditFormationData"),
  EditFormationDefine_1 = require("./EditFormationDefine"),
  HEALTH_ID = 3;
class EditingRoleData {
  constructor(t) {
    (this.Position = 0), (this.RoleId = 0), (this.Position = t);
  }
}
class EditFormationModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments),
      (this.s4t = new Map()),
      (this.a4t = void 0),
      (this.h4t = new Map());
  }
  UpdatePlayerFormations(t) {
    this.s4t.clear();
    let o = 0;
    var r = new Map();
    for (const u of t) {
      var e = u.aFn,
        i = e === ModelManager_1.ModelManager.PlayerInfoModel.GetId();
      for (const h of u.J4n) {
        var a = h.$4n;
        if (i || !(0 < a)) {
          i && h.X4n && (o = a);
          let t = r.get(a);
          t || ((t = new Array()), r.set(a, t));
          for (const g of h.FLs) {
            var n = i && g.l3n === h.Y4n;
            t.push([g, e, n]);
          }
        }
      }
    }
    for (const c of r) {
      var s = c[0],
        f = new EditFormationData_1.EditFormationData(s);
      this.s4t.set(s, f);
      for (const m of c[1]) {
        var d = m[0],
          l = m[1],
          M = m[2];
        f.AddRoleData(d.l3n, d.r3n, l, M);
      }
      s === o && (this.a4t = f);
    }
  }
  ChangeEditedMainRole() {
    var t = ModelManager_1.ModelManager.RoleModel;
    for (const e of this.h4t.values())
      for (const i of e) {
        var o,
          r = i.RoleId;
        t.IsMainRole(r) &&
          (o = t.GetNewMainRoleId(r)) &&
          r !== o &&
          (i.RoleId = o);
      }
  }
  InitEditingFormationMap() {
    this.h4t.clear();
    for (const o of this.s4t.values()) {
      var t = o.FormationId;
      for (const r of o.GetRoleDataMap().values())
        this.SetEditingRoleId(t, r.Position, r.ConfigId);
    }
  }
  IsRoleDead(t) {
    var o = ModelManager_1.ModelManager.SceneTeamModel.GetTeamItem(t, {
      ParamType: 0,
      OnlyMyRole: !0,
    });
    return o
      ? o.IsDead()
      : !(o = ModelManager_1.ModelManager.RoleModel.GetRoleDataById(t)) ||
          o.GetAttributeData().GetAttrValueById(HEALTH_ID) <= 0;
  }
  SetEditingRoleId(t, o, r = 0, e = !0) {
    if (o > EditFormationDefine_1.EDITE_FORAMTION_MAX_NUM || o <= 0) return !1;
    if (!this.IsMyPosition(o)) return !1;
    let i = this.h4t.get(t);
    if (!i) {
      (i = new Array()), this.h4t.set(t, i);
      for (let t = 1; t <= EditFormationDefine_1.EDITE_FORAMTION_MAX_NUM; t++)
        i.push(new EditingRoleData(t));
    }
    var a = [];
    for (const s of i) {
      s.Position === o && (s.RoleId = r);
      var n = s.RoleId;
      n && a.push(n);
    }
    if (!ModelManager_1.ModelManager.GameModeModel.IsMulti && e)
      for (const f of i) {
        const r = a[f.Position - 1];
        f.RoleId = r ?? 0;
      }
    return !0;
  }
  GetEditingRoleId(t, o) {
    t = this.h4t.get(t);
    if (t) for (const r of t) if (r.Position === o) return r.RoleId;
    return 0;
  }
  GetEditingRolePosition(t, o) {
    t = this.h4t.get(t);
    if (t) for (const r of t) if (r.RoleId === o) return r.Position;
    return -1;
  }
  GetEditingRoleIdList(t) {
    var o = new Array(),
      t = this.h4t.get(t);
    if (t)
      for (const e of t) {
        var r = e.RoleId;
        r && o.push(r);
      }
    return o;
  }
  GetAllEditingFormation() {
    var t,
      o,
      r = new Map();
    for ([t, o] of this.h4t) {
      var e = [];
      for (const a of o) {
        var i = a.RoleId;
        i && e.push(i);
      }
      r.set(t, e);
    }
    return r;
  }
  IsInEditingFormation(t, o) {
    return 0 < this.GetEditingRolePosition(t, o);
  }
  GetFormationData(t) {
    return this.s4t.get(t);
  }
  get GetCurrentFormationData() {
    return this.a4t;
  }
  get GetCurrentFormationId() {
    return this.a4t?.FormationId;
  }
  ApplyCurrentFormationData(t) {
    t = this.s4t.get(t);
    t &&
      (Log_1.Log.CheckInfo() &&
        Log_1.Log.Info(
          "Formation",
          49,
          "设置当前编队数据 [ApplyCurrentFormationData]",
          ["data", t],
        ),
      (this.a4t = t));
  }
  IsMyPosition(t) {
    var o;
    return (
      !ModelManager_1.ModelManager.GameModeModel.IsMulti ||
      ((o = ModelManager_1.ModelManager.OnlineModel.GetIsMyTeam()),
      (t = this.GetCurrentFormationData?.GetRoleDataByPosition(t))?.ConfigId
        ? ModelManager_1.ModelManager.PlayerInfoModel.GetId() === t.PlayerId
        : o)
    );
  }
}
exports.EditFormationModel = EditFormationModel;
//# sourceMappingURL=EditFormationModel.js.map
