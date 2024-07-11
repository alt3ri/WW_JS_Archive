"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RoleBuffView = void 0);
const UE = require("ue"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  BattleUiControl_1 = require("../BattleUiControl"),
  BattleUiDefine_1 = require("../BattleUiDefine"),
  BattleChildView_1 = require("./BattleChildView/BattleChildView"),
  BuffItem_1 = require("./BuffItem"),
  EnvironmentItem_1 = require("./EnvironmentItem");
class RoleBuffView extends BattleChildView_1.BattleChildView {
  constructor() {
    super(...arguments),
      (this.wnt = void 0),
      (this.E0 = void 0),
      (this.Jut = new Map()),
      (this.Jot = new Map()),
      (this.zot = []),
      (this.Zot = []);
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UIItem],
    ];
  }
  Initialize(t) {
    super.Initialize(t), this.Ore();
  }
  OnBeforeDestroy() {
    this.Refresh(void 0), this.zut();
  }
  Reset() {
    this.kre(), super.Reset();
  }
  Refresh(t) {
    t
      ? ((this.wnt = t), (this.E0 = t?.EntityHandle?.Id), this.Vrt())
      : ((this.wnt = void 0), (this.E0 = void 0), this.Wrt());
  }
  IsValid() {
    return void 0 !== this.wnt?.EntityHandle;
  }
  GetEntityId() {
    return this.E0;
  }
  Ore() {}
  kre() {}
  Tick(e) {
    for (const t of this.Jot.values()) t.Tick(e);
    for (const s of this.zot) s.TickHiding(e);
    for (let t = this.zot.length - 1; 0 <= t; t--) {
      var i = this.zot[t];
      i.TickHiding(e) || (this.zot.splice(t, 1), this.Zot.push(i));
    }
    this.Zut();
  }
  AddBuffItem(i, s, r = !1) {
    if (!this.Jot.has(s)) {
      let e = this.wnt?.BuffComponent?.GetBuffByHandle(s);
      var t;
      if (
        (e ||
          ((t = this.wnt?.EntityHandle?.Entity?.CheckGetComponent(171)) &&
            (e = t.GetFormationBuffComp()?.GetBuffByHandle(s))),
        e)
      ) {
        let t = this.zrt();
        (t = t || this.Zrt()), this.ent(t, i, e, s, r);
      }
    }
  }
  Zrt() {
    var t = this.GetItem(1);
    return new BuffItem_1.BuffItem(t);
  }
  ent(t, e, i, s = 0, r = !1) {
    var o = this.Jot.size;
    t.Activate(e, i, r),
      t.GetRootItem().SetHierarchyIndex(o),
      this.Jot.set(s, t);
  }
  DeactivateBuffItem(t, e = !1) {
    var i = this.tnt(t);
    i &&
      (this.Jot.delete(t),
      (e
        ? (i.DeactivateWithCloseAnim(), this.zot)
        : (i.Deactivate(), this.Zot)
      ).push(i));
  }
  zrt() {
    var t;
    if (!(this.Zot.length < 1))
      return (t = this.Zot[0]), this.Zot.splice(0, 1), t;
  }
  tnt(t) {
    return this.Jot.get(t);
  }
  Wrt() {
    for (const t of this.Jot.values()) t.DestroyCompatible();
    this.Jot.clear();
    for (const e of this.zot) e.Deactivate(), e.DestroyCompatible();
    this.zot.length = 0;
    for (const i of this.Zot) i.DestroyCompatible();
    this.Zot.length = 0;
  }
  Vrt() {
    if ((this.Wrt(), this.IsValid()))
      for (const e of this.wnt.EntityHandle.Entity.GetComponent(
        19,
      ).GetAllCurrentCueRef()) {
        var t = e.CueConfig;
        t.CueType === BattleUiDefine_1.UI_EFFECT_CUE_TYPE &&
          this.AddBuffItem(t, e.ActiveHandleId);
      }
  }
  Zut() {
    let e = 0;
    for (const r of ModelManager_1.ModelManager.BattleUiModel.FormationData
      .EnvironmentPropertyList) {
      var i,
        s = ModelManager_1.ModelManager.FormationAttributeModel.GetValue(r);
      s > e && (e = s);
      let t = this.Jut.get(r);
      void 0 === t
        ? s <= 0 ||
          ((i = this.GetItem(0)),
          (i = BattleUiControl_1.BattleUiControl.Pool.GetEnvironmentItem(i)),
          (t = new EnvironmentItem_1.EnvironmentItem()).CreateThenShowByActor(
            i,
          ),
          t.UpdatePropertyId(r),
          (i = ModelManager_1.ModelManager.FormationAttributeModel.GetMax(r)),
          t.SetPercent(s, i),
          this.Jut.set(r, t))
        : ((i = ModelManager_1.ModelManager.FormationAttributeModel.GetMax(r)),
          t.SetPercent(s, i));
    }
  }
  zut() {
    for (const t of this.Jut.values())
      BattleUiControl_1.BattleUiControl.Pool.RecycleEnvironmentItem(
        t.GetRootActor(),
      ),
        t.Destroy();
    this.Jut.clear();
  }
}
exports.RoleBuffView = RoleBuffView;
//# sourceMappingURL=RoleBuffView.js.map
