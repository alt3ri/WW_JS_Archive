"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.LevelConditionCheckEquippedPhantom = void 0);
const Log_1 = require("../../../Core/Common/Log"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  PhantomBattleDefine_1 = require("../../Module/Phantom/PhantomBattle/PhantomBattleDefine"),
  LevelGeneralBase_1 = require("../LevelGeneralBase"),
  ControllerHolder_1 = require("../../Manager/ControllerHolder");
class LevelConditionCheckEquippedPhantom extends LevelGeneralBase_1.LevelConditionBase {
  Check(e, o) {
    var n, t;
    return 0 === e.LimitParams.size
      ? (Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "LevelCondition",
            17,
            "配置错误！条件的参数不应该为空",
            ["inConditionInfo.Id", e.Id],
          ),
        !1)
      : ((n = parseInt(e.LimitParams.get("声骸位置"))),
        (t = parseInt(e.LimitParams.get("是否装备"))),
        n && (n <= 0 || n > PhantomBattleDefine_1.MAX_EQUIP_COUNT)
          ? (Log_1.Log.CheckError() &&
              Log_1.Log.Error(
                "LevelCondition",
                17,
                `配置错误！条件${e.Id}的声骸位置值的范围是[1-${PhantomBattleDefine_1.MAX_EQUIP_COUNT}]`,
              ),
            !1)
          : 0 !== t && 1 !== t
            ? (Log_1.Log.CheckError() &&
                Log_1.Log.Error(
                  "LevelCondition",
                  17,
                  `配置错误！条件${e.Id}的是否装备应该是0或1`,
                ),
              !1)
            : !!(e =
                ModelManager_1.ModelManager.EditFormationModel
                  .GetCurrentFormationData.GetCurrentRoleConfigId) &&
              ((e =
                ControllerHolder_1.ControllerHolder.PhantomBattleController.GetEquipByIndex(
                  e,
                  n - 1,
                )),
              Boolean(t) === (0 !== e)));
  }
}
exports.LevelConditionCheckEquippedPhantom = LevelConditionCheckEquippedPhantom;
//# sourceMappingURL=LevelConditionCheckEquippedPhantom.js.map
