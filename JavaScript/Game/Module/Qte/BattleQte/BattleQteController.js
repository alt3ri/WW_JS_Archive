"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.BattleQteController = void 0);
const Log_1 = require("../../../../Core/Common/Log"),
  Time_1 = require("../../../../Core/Common/Time"),
  ControllerBase_1 = require("../../../../Core/Framework/ControllerBase"),
  ControllerHolder_1 = require("../../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../../Manager/ModelManager");
class BattleQteController extends ControllerBase_1.ControllerBase {
  static StartBattleQte(e, o, t, r) {
    let l = void 0;
    var a, n, _;
    if (
      (ControllerHolder_1.ControllerHolder.CommonQteController.IsInQte()
        ? (l = "当前存在执行中的Qte, 无法开始新的Qte")
        : ControllerHolder_1.ControllerHolder.CommonQteController.IsPreloading()
          ? (l = "Qte预加载中, 无法开始新的Qte")
          : ModelManager_1.ModelManager.GameModeModel?.IsMulti
            ? (l = "联机状态下不能触发战斗Qte")
            : 0 === Time_1.Time.FlowTimeDilation
              ? (l = "副本时停中, 不能触发战斗Qte")
              : ((_ = (n = (a =
                  ModelManager_1.ModelManager.SceneTeamModel
                    ?.GetCurrentTeamItem)?.EntityHandle)?.Entity),
                n && n.Valid && _
                  ? a?.IsDead()
                    ? (l = "当前角色已死亡, 不能触发战斗Qte")
                    : _.GetComponent(120)?.HasPauseLock() &&
                      (l = "当前角色大招时停中, 不能触发战斗Qte")
                  : (l = "当前角色实体无效, 不能触发战斗Qte")),
      l)
    )
      Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug("CommonQte", 67, l, ["BattleQteId", e], ["Source", r]);
    else {
      const d =
        ModelManager_1.ModelManager.BattleQteModel?.CreateBattleQteContext(
          e,
          o,
          t,
          r,
        );
      if (d)
        return (
          Log_1.Log.CheckDebug() &&
            Log_1.Log.Debug(
              "CommonQte",
              67,
              "战斗Qte开始",
              ["BattleQteHandleId", d.BattleQteHandleId],
              ["BattleQteId", e],
              ["Source", r],
            ),
          ControllerHolder_1.ControllerHolder.CommonQteController.StartQte(
            d.CommonQteId,
            () => {
              d.QteSuccess();
            },
            () => {
              d.QteFail();
            },
          )
            ? (ModelManager_1.ModelManager.BattleQteModel?.SetCurrentBattleQte(
                d,
              ),
              d)
            : void 0
        );
      Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug("CommonQte", 67, "战斗Qte开始失败, 获取context为空", [
          "BattleQteId",
          e,
        ]);
    }
  }
}
exports.BattleQteController = BattleQteController;
//# sourceMappingURL=BattleQteController.js.map
