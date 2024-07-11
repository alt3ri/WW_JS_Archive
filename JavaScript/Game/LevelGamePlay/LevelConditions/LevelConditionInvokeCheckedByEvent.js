"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.LevelConditionPawnInRange =
    exports.LevelConditionFightWithMonster =
    exports.LevelConditionGetNewItem =
    exports.LevelConditionGetWhichRole =
    exports.LevelConditionHarmonyQte =
    exports.LevelConditionHpLowerThan =
    exports.LevelConditionSlotOfCurrentRole =
    exports.LevelConditionFunctionUnlock =
      void 0);
const Log_1 = require("../../../Core/Common/Log"),
  CommonDefine_1 = require("../../../Core/Define/CommonDefine"),
  Protocol_1 = require("../../../Core/Define/Net/Protocol"),
  EntitySystem_1 = require("../../../Core/Entity/EntitySystem"),
  LocalStorageDefine_1 = require("../../Common/LocalStorageDefine"),
  Global_1 = require("../../Global"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  SceneTeamDefine_1 = require("../../Module/SceneTeam/SceneTeamDefine"),
  LevelGeneralBase_1 = require("../LevelGeneralBase"),
  LevelGeneralDefine_1 = require("../LevelGeneralDefine");
var EAttributeId = Protocol_1.Aki.Protocol.KBs;
class LevelConditionFunctionUnlock extends LevelGeneralBase_1.LevelConditionBase {
  Check(e, n, ...o) {
    var t, i;
    return 0 === e.LimitParams.size
      ? (Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "LevelCondition",
            17,
            "配置错误！条件的参数不应该为空",
            ["inConditionInfo.Id", e.Id],
          ),
        !1)
      : (t = Number(e.LimitParams.get("FunctionId")))
        ? o?.length
          ? ((i = o[0]), o[1] && i === t)
          : ModelManager_1.ModelManager.FunctionModel.IsOpen(t)
        : (Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "LevelCondition",
              17,
              `配置错误！条件${e.Id}的FunctionId参数不符合条件类型${LevelGeneralDefine_1.ELevelGeneralCondition.FunctionUnlock}的定义`,
            ),
          !1);
  }
}
exports.LevelConditionFunctionUnlock = LevelConditionFunctionUnlock;
class LevelConditionSlotOfCurrentRole extends LevelGeneralBase_1.LevelConditionBase {
  Check(e, n) {
    var o;
    return 0 === e.LimitParams.size
      ? (Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "LevelCondition",
            17,
            "配置错误！条件的参数不应该为空",
            ["inConditionInfo.Id", e.Id],
          ),
        !1)
      : !(o = Number(e.LimitParams.get("Slot"))) ||
          o > SceneTeamDefine_1.SCENE_TEAM_MAX_NUM
        ? (Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "LevelCondition",
              17,
              `配置错误！条件${e.Id}的Slot参数不符合条件类型${LevelGeneralDefine_1.ELevelGeneralCondition.SlotOfCurrentRole}的定义`,
            ),
          !1)
        : !!(e =
            ModelManager_1.ModelManager.SceneTeamModel.GetCurrentTeamItem) &&
          o ===
            ModelManager_1.ModelManager.SceneTeamModel.GetTeamItems(!0).indexOf(
              e,
            ) +
              1;
  }
}
exports.LevelConditionSlotOfCurrentRole = LevelConditionSlotOfCurrentRole;
class LevelConditionHpLowerThan extends LevelGeneralBase_1.LevelConditionBase {
  Check(e, n) {
    var o, t, i, r;
    return 0 === e.LimitParams.size
      ? (Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "LevelCondition",
            17,
            "配置错误！条件的参数不应该为空",
            ["inConditionInfo.Id", e.Id],
          ),
        !1)
      : (o = Number(e.LimitParams.get("Hp")))
        ? !(
            !(t =
              ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity) ||
            ((i = t.Entity.GetComponent(156)?.GetCurrentValue(
              EAttributeId.Proto_Life,
            )),
            (r = t.Entity.GetComponent(156)?.GetCurrentValue(EAttributeId.Tkn)),
            !i) ||
            !r
          ) && i / r < o / CommonDefine_1.RATE_10000
        : (Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "LevelCondition",
              17,
              `配置错误！条件${e.Id}的Hp参数不符合条件类型${LevelGeneralDefine_1.ELevelGeneralCondition.HpLowerThan}的定义`,
            ),
          !1);
  }
}
exports.LevelConditionHpLowerThan = LevelConditionHpLowerThan;
class LevelConditionHarmonyQte extends LevelGeneralBase_1.LevelConditionBase {
  Check(e, n, ...o) {
    var t;
    return (
      !!o?.length &&
      (0 === e.LimitParams.size
        ? (Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "LevelCondition",
              17,
              "配置错误！条件的参数不应该为空",
              ["inConditionInfo.Id", e.Id],
            ),
          !1)
        : !(t = Number(e.LimitParams.get("ElementType"))) && 7 <= t
          ? (Log_1.Log.CheckError() &&
              Log_1.Log.Error(
                "LevelCondition",
                17,
                `配置错误！条件${e.Id}的ElementType参数不符合条件类型${LevelGeneralDefine_1.ELevelGeneralCondition.HarmonyQte}的定义`,
              ),
            !1)
          : ((e = o[0]),
            (o = o[1]),
            10 * (e = e.GetComponent(79)?.RoleElementType) +
              (o = o.GetComponent(79)?.RoleElementType) ===
              t || 10 * o + e === t))
    );
  }
}
exports.LevelConditionHarmonyQte = LevelConditionHarmonyQte;
class LevelConditionGetWhichRole extends LevelGeneralBase_1.LevelConditionBase {
  Check(e, n) {
    var o;
    return 0 === e.LimitParams.size
      ? (Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "LevelCondition",
            17,
            "配置错误！条件的参数不应该为空",
            ["inConditionInfo.Id", e.Id],
          ),
        !1)
      : (o = Number(e.LimitParams.get("RoleCount")))
        ? ModelManager_1.ModelManager.RoleModel.GetRoleMap().size === o
        : (Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "LevelCondition",
              17,
              `配置错误！条件${e.Id}的RoleCount参数不符合条件类型${LevelGeneralDefine_1.ELevelGeneralCondition.GetWhichRole}的定义`,
            ),
          !1);
  }
}
exports.LevelConditionGetWhichRole = LevelConditionGetWhichRole;
class LevelConditionGetNewItem extends LevelGeneralBase_1.LevelConditionBase {
  Check(e, n, ...o) {
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
    var t = Number(e.LimitParams.get("ItemId"));
    if (!t)
      return (
        Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "LevelCondition",
            17,
            `配置错误！条件${e.Id}的ItemId参数不符合条件类型${LevelGeneralDefine_1.ELevelGeneralCondition.GetNewItem}的定义`,
          ),
        !1
      );
    var i = ModelManager_1.ModelManager.InventoryModel;
    if (o)
      return (e = i.GetAttributeItemData(o[0]))
        ? t === e.GetConfigId()
        : o[0] === t;
    if (
      ModelManager_1.ModelManager.NewFlagModel.HasNewFlag(
        LocalStorageDefine_1.ELocalStoragePlayerKey.InventoryCommonItem,
        t,
      )
    )
      return !0;
    var e = i.GetNewAttributeItemUniqueIdList(),
      r = new Set();
    for (const a of e) {
      var l = i.GetAttributeItemData(a);
      l && r.add(l.GetConfigId());
    }
    return r.has(t);
  }
}
exports.LevelConditionGetNewItem = LevelConditionGetNewItem;
class LevelConditionFightWithMonster extends LevelGeneralBase_1.LevelConditionBase {
  Check(e, n, ...o) {
    var t;
    return (
      !!o?.length &&
      (0 === e.LimitParams.size
        ? (Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "LevelCondition",
              17,
              "配置错误！条件的参数不应该为空",
              ["inConditionInfo.Id", e.Id],
            ),
          !1)
        : (t = e.LimitParams.get("MonsterId"))
          ? ((o = o[0]),
            t ===
              EntitySystem_1.EntitySystem.Get(o)
                ?.GetComponent(0)
                ?.GetPbEntityInitData()?.BlueprintType)
          : (Log_1.Log.CheckError() &&
              Log_1.Log.Error(
                "LevelCondition",
                17,
                `配置错误！条件${e.Id}的MonsterId参数不符合条件类型${LevelGeneralDefine_1.ELevelGeneralCondition.FightWithMonster}的定义`,
              ),
            !1))
    );
  }
}
exports.LevelConditionFightWithMonster = LevelConditionFightWithMonster;
class LevelConditionPawnInRange extends LevelGeneralBase_1.LevelConditionBase {
  Check(e, n, ...o) {
    var t;
    return !(
      !o?.length ||
      (0 === e.LimitParams.size
        ? (Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "LevelCondition",
              17,
              "配置错误！条件的参数不应该为空",
              ["inConditionInfo.Id", e.Id],
            ),
          1)
        : ((e = e.LimitParams.get("PawnId")),
          (o = o[0]),
          !(o = EntitySystem_1.EntitySystem.Get(o))?.Active ||
            (t = o?.GetComponent(0))?.IsConcealed ||
            !(
              (t = t?.GetPbEntityInitData()?.BlueprintType) &&
              t === e &&
              o.GetComponent(1) &&
              Global_1.Global.BaseCharacter &&
              Global_1.Global.BaseCharacter.CharacterActorComponent
            )))
    );
  }
}
exports.LevelConditionPawnInRange = LevelConditionPawnInRange;
//# sourceMappingURL=LevelConditionInvokeCheckedByEvent.js.map
