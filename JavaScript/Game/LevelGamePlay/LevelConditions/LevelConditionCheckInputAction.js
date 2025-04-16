"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.LevelConditionCheckInputAction = void 0);
const Log_1 = require("../../../Core/Common/Log"),
  ControllerHolder_1 = require("../../Manager/ControllerHolder"),
  InputMappingsDefine_1 = require("../../Ui/InputDistribute/InputMappingsDefine"),
  LevelGeneralBase_1 = require("../LevelGeneralBase"),
  LevelGeneralDefine_1 = require("../LevelGeneralDefine");
class LevelConditionCheckInputAction extends LevelGeneralBase_1.LevelConditionBase {
  Check(e, n) {
    if (0 === e.LimitParams.size)
      return (
        Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "LevelCondition",
            16,
            "配置错误！条件的参数不应该为空",
            ["inConditionInfo.Id", e.Id],
          ),
        !1
      );
    var o = e.LimitParams.get("Action"),
      i = Number(e.LimitParams.get("Kind"));
    if (!o || !i)
      return (
        Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "LevelCondition",
            16,
            `配置错误！条件${e.Id}的参数不符合条件类型${LevelGeneralDefine_1.ELevelGeneralCondition.CheckInputAction}的定义`,
          ),
        !1
      );
    switch (i) {
      case 1:
        return Object.values(InputMappingsDefine_1.actionMappings).includes(o)
          ? o ===
              ControllerHolder_1.ControllerHolder.InputDistributeController.GetCurrentActionName()
          : (Log_1.Log.CheckError() &&
              Log_1.Log.Error(
                "LevelCondition",
                16,
                `配置错误！条件${e.Id}的Kind配了${i}(操作映射)，但${o}不是操作映射`,
              ),
            !1);
      case 2:
        return Object.values(InputMappingsDefine_1.axisMappings).includes(o)
          ? o ===
              ControllerHolder_1.ControllerHolder.InputDistributeController.GetCurrentAxisName()
          : (Log_1.Log.CheckError() &&
              Log_1.Log.Error(
                "LevelCondition",
                16,
                `配置错误！条件${e.Id}的Kind配了${i}(轴映射)，但${o}用不是轴映射`,
              ),
            !1);
      default:
        return (
          Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "LevelCondition",
              16,
              `配置错误！条件${e.Id}的Kind参数不符合条件类型${LevelGeneralDefine_1.ELevelGeneralCondition.CheckInputAction}的定义`,
            ),
          !1
        );
    }
  }
}
exports.LevelConditionCheckInputAction = LevelConditionCheckInputAction;
//# sourceMappingURL=LevelConditionCheckInputAction.js.map
