"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RoleTopBuffView = void 0);
const Log_1 = require("../../../../Core/Common/Log"),
  EventDefine_1 = require("../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../Common/Event/EventSystem"),
  ConfigManager_1 = require("../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  BattleVisibleChildView_1 = require("./BattleChildView/BattleVisibleChildView"),
  TopBuffYouHu_1 = require("./TopBuff/TopBuffYouHu"),
  roleClassMap = new Map([[1106, TopBuffYouHu_1.TopBuffYouHu]]);
class RoleTopBuffView extends BattleVisibleChildView_1.BattleVisibleChildView {
  constructor() {
    super(...arguments),
      (this.E0 = void 0),
      (this.Edt = void 0),
      (this.Sdt = new Map()),
      (this.FXa = new Set()),
      (this.kpe = () => {
        this.ydt(), this.Idt();
      });
  }
  OnStart() {
    this.InitChildType(25), this.Ore();
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
    (this.E0 = e?.EntityHandle?.Id ?? 0),
      Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug("Battle", 17, "开始切换角色特殊buff条", [
          "entityId",
          this.E0,
        ]),
      e && this.Tdt(e),
      this.Idt();
  }
  OnRemoveEntity(e) {
    var t = this.Sdt.get(e);
    t
      ? (t.Destroy(), this.Sdt.delete(e), this.Edt === t && (this.Edt = void 0))
      : this.FXa.delete(e);
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
  async Tdt(e) {
    var t,
      i = e.EntityHandle?.Id;
    !i ||
      this.Sdt.has(i) ||
      this.FXa.has(i) ||
      ((t = e.CreatureRoleId) &&
      ((t = ConfigManager_1.ConfigManager.RoleConfig.GetBaseRoleId(t)),
      (t = roleClassMap.get(t)))
        ? ((t = new t()),
          this.Sdt.set(i, t),
          await t.InitAsync(this.RootItem, e))
        : this.FXa.add(i));
  }
  Idt() {
    for (var [e, t] of this.Sdt)
      e === this.E0 ? (t.SetVisible(!0), (this.Edt = t)) : t.SetVisible(!1);
  }
}
exports.RoleTopBuffView = RoleTopBuffView;
//# sourceMappingURL=RoleTopBuffView.js.map
