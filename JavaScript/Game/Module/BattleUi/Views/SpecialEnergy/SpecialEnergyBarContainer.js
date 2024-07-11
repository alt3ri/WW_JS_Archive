"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SpecialEnergyBarContainer = void 0);
const Log_1 = require("../../../../../Core/Common/Log"),
  EventDefine_1 = require("../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../Common/Event/EventSystem"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  BattleChildView_1 = require("../BattleChildView/BattleChildView"),
  RoleSpecialEnergyBar_1 = require("./RoleSpecialEnergyBar");
class SpecialEnergyBarContainer extends BattleChildView_1.BattleChildView {
  constructor() {
    super(...arguments),
      (this.Mdt = void 0),
      (this.E0 = 0),
      (this.Edt = void 0),
      (this.Sdt = new Map()),
      (this.kpe = () => {
        this.ydt(), this.Idt();
      });
  }
  Initialize(e) {
    super.Initialize(e),
      (this.Mdt = e),
      (this.E0 =
        ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity?.Id ?? 0),
      this.ydt(),
      this.Idt(),
      this.Ore();
  }
  OnBeforeDestroy() {
    this.Edt = void 0;
    for (const e of this.Sdt.values()) e.Destroy();
  }
  Reset() {
    this.kre(), super.Reset();
  }
  Tick(e) {
    for (const t of this.Sdt.values()) t.Tick(e);
  }
  OnChangeRole(e) {
    var t;
    (this.E0 = e?.EntityHandle?.Id ?? 0),
      Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug("Battle", 18, "开始切换特殊能量条", [
          "entityId",
          this.E0,
        ]),
      this.E0 &&
        (ModelManager_1.ModelManager.BattleUiModel.SpecialEnergyBarData
          .IsSpecialEnergyBarEditorModeOpen &&
          (t = this.Sdt.get(this.E0)) &&
          (t.Destroy(), this.Sdt.delete(this.E0)),
        this.Tdt(e)),
      this.Idt();
  }
  OnRemoveEntity(e) {
    var t = this.Sdt.get(e);
    t &&
      (t.Destroy(), this.Sdt.delete(e), this.Edt === t) &&
      (this.Edt = void 0);
  }
  Ore() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.BattleUiAllRoleDataChanged,
      this.kpe,
    );
  }
  kre() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.BattleUiAllRoleDataChanged,
      this.kpe,
    );
  }
  ydt() {
    for (const t of ModelManager_1.ModelManager.SceneTeamModel.GetTeamItems(
      !0,
    )) {
      var e = t.EntityHandle?.Id;
      e &&
        (e = ModelManager_1.ModelManager.BattleUiModel.GetRoleData(e)) &&
        this.Tdt(e);
    }
  }
  async Tdt(t) {
    var i = t.EntityHandle?.Id;
    if (i && !this.Sdt.has(i)) {
      var s = new RoleSpecialEnergyBar_1.RoleSpecialEnergyBar();
      this.Sdt.set(i, s);
      let e = this.RootItem;
      t.IsPhantom() && (e = this.Mdt), await s.InitAsync(e, t);
    }
  }
  Idt() {
    for (var [e, t] of this.Sdt)
      e === this.E0 ? (t.SetVisible(!0), (this.Edt = t)) : t.SetVisible(!1);
  }
}
exports.SpecialEnergyBarContainer = SpecialEnergyBarContainer;
//# sourceMappingURL=SpecialEnergyBarContainer.js.map
