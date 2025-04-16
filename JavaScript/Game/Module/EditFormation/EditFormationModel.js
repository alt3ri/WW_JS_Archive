"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.EditFormationModel = void 0);
const Log_1 = require("../../../Core/Common/Log"),
  ModelBase_1 = require("../../../Core/Framework/ModelBase"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  CharacterAttributeTypes_1 = require("../../NewWorld/Character/Common/Component/Abilities/CharacterAttributeTypes"),
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
      (this.s5t = new Map()),
      (this.a5t = void 0),
      (this.h5t = new Map());
  }
  UpdatePlayerFormations(t) {
    this.s5t.clear();
    let r = 0;
    var o = new Map();
    for (const M of t) {
      var e = M.W5n,
        i = e === ModelManager_1.ModelManager.PlayerInfoModel.GetId();
      for (const h of M.kVn) {
        var a = h.GVn;
        if (i || !(0 < a)) {
          i && h.OVn && (r = a);
          let t = o.get(a);
          t || ((t = new Array()), o.set(a, t));
          for (const c of h.dUs) {
            var n = i && c.Q6n === h.NVn;
            t.push([c, e, n]);
          }
        }
      }
    }
    for (const g of o) {
      var s = g[0],
        f = new EditFormationData_1.EditFormationData(s);
      this.s5t.set(s, f);
      for (const m of g[1]) {
        var d = m[0],
          l = m[1],
          u = m[2];
        f.AddRoleData(d.Q6n, d.eI_, d.F6n, l, u);
      }
      s === r && (this.a5t = f);
    }
  }
  ChangeEditedMainRole() {
    var t = ModelManager_1.ModelManager.RoleModel;
    for (const e of this.h5t.values())
      for (const i of e) {
        var r,
          o = i.RoleId;
        t.IsMainRole(o) &&
          (r = t.GetNewMainRoleId(o)) &&
          o !== r &&
          (i.RoleId = r);
      }
  }
  InitEditingFormationMap() {
    this.h5t.clear();
    for (const r of this.s5t.values()) {
      var t = r.FormationId;
      for (const o of r.GetRoleDataMap().values())
        this.SetEditingRoleId(t, o.Position, o.ConfigId);
    }
  }
  IsRoleDead(t) {
    var r = ModelManager_1.ModelManager.SceneTeamModel.GetTeamItem(t, {
      ParamType: 0,
      OnlyMyRole: !0,
    });
    return r
      ? r.IsDead()
      : !(r = ModelManager_1.ModelManager.RoleModel.GetRoleDataById(t)) ||
          r.GetAttributeData().GetAttrValueById(HEALTH_ID) <= 0;
  }
  SetEditingRoleId(t, r, o = 0, e = !0) {
    if (r > EditFormationDefine_1.EDITE_FORAMTION_MAX_NUM || r <= 0) return !1;
    if (!this.IsMyPosition(r)) return !1;
    let i = this.h5t.get(t);
    if (!i) {
      (i = new Array()), this.h5t.set(t, i);
      for (let t = 1; t <= EditFormationDefine_1.EDITE_FORAMTION_MAX_NUM; t++)
        i.push(new EditingRoleData(t));
    }
    var a = [];
    for (const s of i) {
      s.Position === r && (s.RoleId = o);
      var n = s.RoleId;
      n && a.push(n);
    }
    if (!ModelManager_1.ModelManager.GameModeModel.IsMulti && e)
      for (const f of i) {
        const o = a[f.Position - 1];
        f.RoleId = o ?? 0;
      }
    return !0;
  }
  GetEditingRoleId(t, r) {
    t = this.h5t.get(t);
    if (t) for (const o of t) if (o.Position === r) return o.RoleId;
    return 0;
  }
  GetEditingRolePosition(t, r) {
    t = this.h5t.get(t);
    if (t) for (const o of t) if (o.RoleId === r) return o.Position;
    return -1;
  }
  GetEditingRoleIdList(t) {
    var r = new Array(),
      t = this.h5t.get(t);
    if (t)
      for (const e of t) {
        var o = e.RoleId;
        o && r.push(o);
      }
    return r;
  }
  GetEditingRoleIdSet(t) {
    var r = new Set(),
      t = this.h5t.get(t);
    if (t)
      for (const e of t) {
        var o = e.RoleId;
        o && r.add(o);
      }
    return r;
  }
  GetAllEditingFormation() {
    var t,
      r,
      o = new Map();
    for ([t, r] of this.h5t) {
      var e = [];
      for (const a of r) {
        var i = a.RoleId;
        i && e.push(i);
      }
      o.set(t, e);
    }
    return o;
  }
  IsInEditingFormation(t, r) {
    return 0 < this.GetEditingRolePosition(t, r);
  }
  GetFormationData(t) {
    return this.s5t.get(t);
  }
  get GetCurrentFormationData() {
    return this.a5t;
  }
  get GetCurrentFormationId() {
    return this.a5t?.FormationId;
  }
  IsRoleInCurrentFormation(t) {
    return void 0 !== this.a5t && this.a5t.GetRoleIdList.includes(t);
  }
  ApplyCurrentFormationData(t) {
    t = this.s5t.get(t);
    t &&
      (Log_1.Log.CheckInfo() &&
        Log_1.Log.Info(
          "Formation",
          48,
          "设置当前编队数据 [ApplyCurrentFormationData]",
          ["data", t],
        ),
      (this.a5t = t));
  }
  IsMyPosition(t) {
    var r;
    return (
      !ModelManager_1.ModelManager.GameModeModel.IsMulti ||
      ((r = ModelManager_1.ModelManager.OnlineModel.GetIsMyTeam()),
      (t = this.GetCurrentFormationData?.GetRoleDataByPosition(t))?.ConfigId
        ? ModelManager_1.ModelManager.PlayerInfoModel.GetId() === t.PlayerId
        : r)
    );
  }
  GetFormationAverageLevel() {
    let t = 0,
      r = 0;
    for (const e of ModelManager_1.ModelManager.SceneTeamModel.GetTeamEntities()) {
      var o = e.Entity?.GetComponent(171);
      o &&
        ((t += o.GetCurrentValue(
          CharacterAttributeTypes_1.EAttributeId.Proto_Lv,
        )),
        r++);
    }
    return r ? t / r : 0;
  }
}
exports.EditFormationModel = EditFormationModel;
//# sourceMappingURL=EditFormationModel.js.map
