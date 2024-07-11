"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.LevelConditionCheckInputAction = void 0);
const Log_1 = require("../../../Core/Common/Log"),
  InputDistributeController_1 = require("../../Ui/InputDistribute/InputDistributeController"),
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
            17,
            "配置错误！条件的参数不应该为空",
            ["inConditionInfo.Id", e.Id],
          ),
        !1
      );
    var i = e.LimitParams.get("Action"),
      t = Number(e.LimitParams.get("Kind"));
    if (!i || !t)
      return (
        Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "LevelCondition",
            17,
            `配置错误！条件${e.Id}的参数不符合条件类型${LevelGeneralDefine_1.ELevelGeneralCondition.CheckInputAction}的定义`,
          ),
        !1
      );
    switch (t) {
      case 1:
        return Object.values(InputMappingsDefine_1.actionMappings).includes(i)
          ? i ===
              InputDistributeController_1.InputDistributeController.GetCurrentActionName()
          : (Log_1.Log.CheckError() &&
              Log_1.Log.Error(
                "LevelCondition",
                17,
                `配置错误！条件${e.Id}的Kind配了${t}(操作映射)，但${i}不是操作映射`,
              ),
            !1);
      case 2:
        return Object.values(InputMappingsDefine_1.axisMappings).includes(i)
          ? i ===
              InputDistributeController_1.InputDistributeController.GetCurrentAxisName()
          : (Log_1.Log.CheckError() &&
              Log_1.Log.Error(
                "LevelCondition",
                17,
                `配置错误！条件${e.Id}的Kind配了${t}(轴映射)，但${i}用不是轴映射`,
              ),
            !1);
      default:
        return (
          Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "LevelCondition",
              17,
              `配置错误！条件${e.Id}的Kind参数不符合条件类型${LevelGeneralDefine_1.ELevelGeneralCondition.CheckInputAction}的定义`,
            ),
          !1
        );
    }
  }
}
exports.LevelConditionCheckInputAction = LevelConditionCheckInputAction;
//# sourceMappingURL=LevelConditionCheckInputAction.js.map
