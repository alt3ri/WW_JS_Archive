"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.LevelConditionCheckFightEnergyBar = void 0);
const ModelManager_1 = require("../../Manager/ModelManager");
const LevelGeneralBase_1 = require("../LevelGeneralBase");
const Log_1 = require("../../../Core/Common/Log");
class LevelConditionCheckFightEnergyBar extends LevelGeneralBase_1.LevelConditionBase {
  Check(e, r) {
    let t, i, o;
    return e.LimitParams.size === 0
      ? (Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "LevelCondition",
            17,
            "配置错误！条件的参数不应该为空",
            ["inConditionInfo.Id", e.Id],
          ),
        !1)
      : (t = Number(e.LimitParams.get("机制条状态"))) < 0 || t > 2
        ? (Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "LevelCondition",
              17,
              `配置错误！条件${e.Id}的机制条状态只能是0，1`,
            ),
          !1)
        : ((e = ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity),
          (i = this.GetCurrentSpecialEnergyAttributeId(e.Entity))
            ? ((o = e.Entity.GetComponent(156)?.GetCurrentValue(i.AttributeId)),
              (e = e.Entity.GetComponent(156)?.GetCurrentValue(
                i.MaxAttributeId,
              )),
              (o === 0 && t === 0) ||
                (o > 0 && o < e && t === 2) ||
                (e <= o && t === 1))
            : (Log_1.Log.CheckError() &&
                Log_1.Log.Error(
                  "LevelCondition",
                  17,
                  "查询角色特殊能量条属性错误",
                ),
              !1));
  }
  GetCurrentSpecialEnergyAttributeId(e) {
    const r = e.GetComponent(185);
    if (r) {
      e = this.GetRoleConfig(e);
      if (e) {
        (e = e.SpecialEnergyBarId),
          (e =
            ModelManager_1.ModelManager.BattleUiModel.SpecialEnergyBarData.GetSpecialEnergyBarInfo(
              e,
            ));
        if (e) {
          if (!e.TagEnergyBarIdMap || e.TagEnergyBarIdMap.size <= 0)
            return {
              AttributeId: e.AttributeId,
              MaxAttributeId: e.MaxAttributeId,
            };
          for (let [t, i] of e.TagEnergyBarIdMap)
            if (r.HasTag(t)) {
              t =
                ModelManager_1.ModelManager.BattleUiModel.SpecialEnergyBarData.GetSpecialEnergyBarInfo(
                  i,
                );
              if (t)
                return {
                  AttributeId: t.AttributeId,
                  MaxAttributeId: t.MaxAttributeId,
                };
            }
        }
      }
    }
  }
  GetRoleConfig(e) {
    e = e.GetComponent(0);
    if (e) {
      (e = e.GetRoleId()),
        (e = ModelManager_1.ModelManager.RoleModel.GetRoleDataById(e));
      if (e) return e.GetRoleConfig();
    }
  }
  GetDefaultSpecialEnergyAttributeId(e) {
    e = this.GetRoleConfig(e);
    if (e) {
      (e = e.SpecialEnergyBarId),
        (e =
          ModelManager_1.ModelManager.BattleUiModel.SpecialEnergyBarData.GetSpecialEnergyBarInfo(
            e,
          ));
      if (e)
        return { AttributeId: e.AttributeId, MaxAttributeId: e.MaxAttributeId };
    }
  }
}
exports.LevelConditionCheckFightEnergyBar = LevelConditionCheckFightEnergyBar;
// # sourceMappingURL=LevelConditionCheckFightEnergyBar.js.map
