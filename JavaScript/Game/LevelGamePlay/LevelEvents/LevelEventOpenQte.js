"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.LevelEventOpenQte = void 0);
const Log_1 = require("../../../Core/Common/Log"),
  Global_1 = require("../../Global"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  PanelQteController_1 = require("../../Module/PanelQte/PanelQteController"),
  LevelGeneralBase_1 = require("../LevelGeneralBase"),
  LevelGeneralContextDefine_1 = require("../LevelGeneralContextDefine");
class LevelEventOpenQte extends LevelGeneralBase_1.LevelEventBase {
  ExecuteNew(e, t, l) {
    var n = e;
    if (n) {
      let e = !1;
      switch (n.Config.Type) {
        case "PanelQte":
          e = this.Uxl(n, t);
          break;
        case "LevelQte":
          e = this.Axl(n, t);
          break;
        default:
          e = !1;
      }
      this.FinishExecute(e);
    } else this.FinishExecute(!1);
  }
  Uxl(e, t) {
    return (
      "PanelQte" === e.Config.Type &&
      (PanelQteController_1.PanelQteController.StartLevelEventQte(e.Config.Id),
      !0)
    );
  }
  Axl(e, t) {
    return (
      "LevelQte" === e.Config.Type &&
      ((e = this.Dxl(e.Config.LevelQteEntity, t))?.Valid
        ? (t = e.GetComponent(263))
          ? t.StartQte()
          : (Log_1.Log.CheckError() &&
              Log_1.Log.Error(
                "LevelEvent",
                39,
                "[LevelEventOpenQte] 实体缺少LevelQte组件",
              ),
            !1)
        : (Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "LevelEvent",
              39,
              "[LevelEventOpenQte] 找不到对应的QTE实体",
            ),
          !1))
    );
  }
  Dxl(e, t) {
    let l = void 0;
    switch (e.Type) {
      case "Player":
        l = Global_1.Global.BaseCharacter?.GetEntityNoBlueprint();
        break;
      case "Triggered":
        t instanceof LevelGeneralContextDefine_1.TriggerContext &&
        t.OtherEntityId
          ? (l = ModelManager_1.ModelManager.CreatureModel?.GetEntityById(
              t.OtherEntityId,
            )?.Entity)
          : Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "LevelEvent",
              39,
              "[LevelEventOpenQte] context数据异常",
            );
        break;
      case "Self":
        t instanceof LevelGeneralContextDefine_1.TriggerContext &&
        t.TriggerEntityId
          ? (l = ModelManager_1.ModelManager.CreatureModel?.GetEntityById(
              t.TriggerEntityId,
            )?.Entity)
          : t instanceof LevelGeneralContextDefine_1.EntityContext &&
            t.EntityId &&
            (l = ModelManager_1.ModelManager.CreatureModel?.GetEntityById(
              t.EntityId,
            )?.Entity);
        break;
      case "Target":
        l = ModelManager_1.ModelManager.CreatureModel?.GetEntityByPbDataId(
          e.EntityId,
        )?.Entity;
    }
    return l;
  }
}
exports.LevelEventOpenQte = LevelEventOpenQte;
//# sourceMappingURL=LevelEventOpenQte.js.map
