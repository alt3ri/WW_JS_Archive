"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SpecialEnergyBarContainer = void 0);
const Log_1 = require("../../../../../Core/Common/Log"),
  EventDefine_1 = require("../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../Common/Event/EventSystem"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  BattleVisibleChildView_1 = require("../BattleChildView/BattleVisibleChildView"),
  RoleSpecialEnergyBar_1 = require("./RoleSpecialEnergyBar");
class SpecialEnergyBarContainer extends BattleVisibleChildView_1.BattleVisibleChildView {
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
      this.InitChildType(25),
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
    for (const i of this.Sdt.values()) i.Tick(e);
  }
  OnChangeRole(e) {
    var i;
    (this.E0 = e?.EntityHandle?.Id ?? 0),
      Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug("Battle", 17, "开始切换特殊能量条", [
          "entityId",
          this.E0,
        ]),
      this.E0 &&
        (ModelManager_1.ModelManager.BattleUiModel.SpecialEnergyBarData
          .IsSpecialEnergyBarEditorModeOpen &&
          (i = this.Sdt.get(this.E0)) &&
          (i.Destroy(), this.Sdt.delete(this.E0)),
        this.Tdt(e)),
      this.Idt();
  }
  OnRemoveEntity(e) {
    var i = this.Sdt.get(e);
    i &&
      (i.Destroy(), this.Sdt.delete(e), this.Edt === i) &&
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
    for (const i of ModelManager_1.ModelManager.SceneTeamModel.GetTeamItems(
      !0,
    )) {
      var e = i.EntityHandle?.Id;
      e &&
        (e = ModelManager_1.ModelManager.BattleUiModel.GetRoleData(e)) &&
        this.Tdt(e);
    }
  }
  async Tdt(i) {
    var t = i.EntityHandle?.Id;
    if (t && !this.Sdt.has(t)) {
      var s = new RoleSpecialEnergyBar_1.RoleSpecialEnergyBar();
      this.Sdt.set(t, s);
      let e = this.RootItem;
      i.IsPhantom() && (e = this.Mdt), await s.InitAsync(e, i);
    }
  }
  Idt() {
    for (var [e, i] of this.Sdt)
      e === this.E0 ? (i.SetVisible(!0), (this.Edt = i)) : i.SetVisible(!1);
  }
}
exports.SpecialEnergyBarContainer = SpecialEnergyBarContainer;
//# sourceMappingURL=SpecialEnergyBarContainer.js.map
