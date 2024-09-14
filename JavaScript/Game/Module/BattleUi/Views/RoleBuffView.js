"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RoleBuffView = void 0);
const UE = require("ue"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  BattleUiControl_1 = require("../BattleUiControl"),
  BattleChildView_1 = require("./BattleChildView/BattleChildView"),
  BuffItemContainer_1 = require("./BuffItemContainer"),
  EnvironmentItem_1 = require("./EnvironmentItem");
class RoleBuffView extends BattleChildView_1.BattleChildView {
  constructor() {
    super(...arguments),
      (this.Wst = void 0),
      (this.E0 = void 0),
      (this.lmt = new Map()),
      (this.mkn = new BuffItemContainer_1.BuffItemContainer());
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UIItem],
    ];
  }
  OnStart() {
    super.OnStart(), this.mkn.Init(this.GetItem(1));
  }
  OnBeforeDestroy() {
    this.Refresh(void 0), this._mt();
  }
  Refresh(e) {
    e
      ? ((this.Wst = e),
        (this.E0 = e?.EntityHandle?.Id),
        this.mkn.RefreshBuff(e?.EntityHandle))
      : ((this.Wst = void 0), (this.E0 = void 0), this.mkn.ClearAll());
  }
  IsValid() {
    return void 0 !== this.Wst?.EntityHandle;
  }
  GetEntityId() {
    return this.E0;
  }
  Tick(e) {
    this.mkn.Tick(e), this.umt();
  }
  AddBuff(e, t) {
    this.mkn.AddBuffByCue(e, t, !0);
  }
  RemoveBuff(e, t) {
    this.mkn.RemoveBuffByCue(e, t, !0);
  }
  umt() {
    let t = 0;
    for (const n of ModelManager_1.ModelManager.BattleUiModel.FormationData
      .EnvironmentPropertyList) {
      var i,
        r,
        o = ModelManager_1.ModelManager.FormationAttributeModel.GetValue(n);
      o > t && (t = o);
      let e = this.lmt.get(n);
      void 0 === e
        ? o <= 0 ||
          ((i = this.GetItem(0)),
          (i = BattleUiControl_1.BattleUiControl.Pool.GetEnvironmentItem(i)),
          (e = new EnvironmentItem_1.EnvironmentItem()).InitPropertyId(n),
          (r = ModelManager_1.ModelManager.FormationAttributeModel.GetMax(n)),
          e.SetPercent(o, r),
          e.CreateThenShowByActorAsync(i).catch(() => {}),
          this.lmt.set(n, e))
        : ((r = ModelManager_1.ModelManager.FormationAttributeModel.GetMax(n)),
          e.SetPercent(o, r));
    }
  }
  _mt() {
    for (const e of this.lmt.values())
      BattleUiControl_1.BattleUiControl.Pool.RecycleEnvironmentItem(
        e.GetRootActor(),
      ),
        e.Destroy();
    this.lmt.clear();
  }
}
exports.RoleBuffView = RoleBuffView;
//# sourceMappingURL=RoleBuffView.js.map
