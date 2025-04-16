"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.BattleQteModel = void 0);
const UE = require("ue"),
  Log_1 = require("../../../../Core/Common/Log"),
  ModelBase_1 = require("../../../../Core/Framework/ModelBase"),
  ResourceSystem_1 = require("../../../../Core/Resource/ResourceSystem"),
  DataTableUtil_1 = require("../../../../Core/Utils/DataTableUtil"),
  EventDefine_1 = require("../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../Common/Event/EventSystem"),
  BattleQteContext_1 = require("./BattleQteContext"),
  DT_BATTLE_QTE_PATH = "/Game/Aki/Data/Qte/DT_BattleQte.DT_BattleQte";
class BattleQteModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments),
      (this.PC1 = 0),
      (this.xC1 = 0),
      (this.Apc = void 0),
      (this.UC1 = void 0),
      (this.oIl = (e) => {
        var t = this.GetBattleQteContext(this.GetBattleQteHandleId());
        t &&
          e === t?.CommonQteHandleId &&
          (this.UC1?.delete(t.BattleQteHandleId),
          this.ClearBattleQteHandleId());
      });
  }
  OnInit() {
    return (
      EventSystem_1.EventSystem.Has(
        EventDefine_1.EEventName.CommonQteEnd,
        this.oIl,
      ) ||
        EventSystem_1.EventSystem.Add(
          EventDefine_1.EEventName.CommonQteEnd,
          this.oIl,
        ),
      !0
    );
  }
  OnClear() {
    return (
      EventSystem_1.EventSystem.Has(
        EventDefine_1.EEventName.CommonQteEnd,
        this.oIl,
      ) &&
        EventSystem_1.EventSystem.Remove(
          EventDefine_1.EEventName.CommonQteEnd,
          this.oIl,
        ),
      !0
    );
  }
  OnLeaveLevel() {
    return this.UC1?.clear(), !(this.Apc = void 0);
  }
  CreateBattleQteContext(e, t, s, r) {
    var i,
      n = this.GetBattleQteConfig(e);
    if (n)
      return (
        ((i = new BattleQteContext_1.BattleQteContext()).BattleQteHandleId =
          this.PC1++),
        (i.CommonQteId = n.QteId),
        (i.BattleQteId = e),
        (i.MessageId = t),
        (i.EntityHandle = s),
        (i.BattleQteSource = r),
        i
      );
  }
  GetBattleQteConfig(e) {
    this.Apc ||
      (this.Apc = ResourceSystem_1.ResourceSystem.GetLoadedAsset(
        DT_BATTLE_QTE_PATH,
        UE.DataTable,
      ));
    var t = DataTableUtil_1.DataTableUtil.GetDataTableRow(
      this.Apc,
      e.toString(),
    );
    return (
      t ||
        (Log_1.Log.CheckError() &&
          Log_1.Log.Error("CommonQte", 67, "找不到战斗QTE配置", [
            "BattleQteId",
            e,
          ])),
      t
    );
  }
  SetCurrentBattleQte(e) {
    (this.xC1 = e.BattleQteHandleId),
      this.UC1 || (this.UC1 = new Map()),
      this.UC1.set(e.BattleQteHandleId, e);
  }
  GetBattleQteHandleId() {
    return this.xC1;
  }
  ClearBattleQteHandleId() {
    this.xC1 = -1;
  }
  GetBattleQteContext(e) {
    return this.UC1?.get(e);
  }
}
exports.BattleQteModel = BattleQteModel;
//# sourceMappingURL=BattleQteModel.js.map
