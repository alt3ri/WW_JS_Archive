"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.DataTableUtil = exports.dataTablePaths = void 0);
const cpp_1 = require("cpp"),
  puerts_1 = require("puerts"),
  UE = require("ue"),
  Log_1 = require("../Common/Log"),
  ResourceSystem_1 = require("../Resource/ResourceSystem");
exports.dataTablePaths = new Map([
  [0, "/Game/Aki/Data/Entity/CDT_ModelConfig.CDT_ModelConfig"],
  [1, "/Game/Aki/Data/Fight/DT_EntityProperty.DT_EntityProperty"],
  [
    2,
    "/Game/Aki/Character/Monster/Common/Data/DT_AiWeaponSocket.DT_AiWeaponSocket",
  ],
  [3, "/Game/Aki/Data/Role/DT_RoleQualityInfo.DT_RoleQualityInfo"],
  [4, "/Game/Aki/GamePlay/Cipher/DT_SCipherGameplay.DT_SCipherGameplay"],
  [5, "/Game/Aki/Data/Condition/DT_ConditionGroup.DT_ConditionGroup"],
  [7, "/Game/Aki/Data/Fight/DT_HitMapping.DT_HitMapping"],
  [
    8,
    "/Game/Aki/Data/Interaction/CDT_InteractionConfigs.CDT_InteractionConfigs",
  ],
  [9, "/Game/Aki/Data/Manipulate/Item/DT_Manipulate_Item.DT_Manipulate_Item"],
  [
    10,
    "/Game/Aki/Data/Manipulate/Precast/DT_Manipulate_Precast.DT_Manipulate_Precast",
  ],
  [11, "/Game/Aki/Data/Parkour/DT_Parkour.DT_Parkour"],
  [12, "/Game/Aki/Data/Scene3DUI/DT_SceneDecorativeUI.DT_SceneDecorativeUI"],
  [13, "/Game/Aki/Data/Scene3DUI/DT_SceneUITag.DT_SceneUITag"],
  [14, "/Game/Aki/Data/Server/DT_ServerInfo.DT_ServerInfo"],
  [
    15,
    "/Game/Aki/Data/UiCameraAnimation/DT_UiCameraAnimationBlendSettings.DT_UiCameraAnimationBlendSettings",
  ],
  [
    16,
    "/Game/Aki/Data/UiCameraAnimation/DT_UiCameraSetting.DT_UiCameraSetting",
  ],
  [17, "/Game/Aki/Character/Vision/DT_Vision.DT_Vision"],
  [
    18,
    "/Game/Aki/Data/UiRoleCamera/DT_UiRoleCameraSettings.DT_UiRoleCameraSettings",
  ],
  [
    19,
    "/Game/Aki/Data/UiRoleCamera/DT_UiRoleCameraOffsetSettings.DT_UiRoleCameraOffsetSettings",
  ],
  [6, "/Game/Aki/Character/Role/Common/Data/DT/DT_Footprint.DT_Footprint"],
  [20, "/Game/Aki/Sequence/Manager/DT_SequenceMember.DT_SequenceMember"],
  [21, "/Game/Aki/Data/GaCha/GachaWeaponTransform.GachaWeaponTransform"],
]);
class DataTableUtil {
  static GetDataTableRow(a, e) {
    if (a && e) {
      var t = (0, puerts_1.$ref)(void 0);
      if (cpp_1.FKuroDataTableFunctionLibrary.GetDataTableRowFromName(a, e, t))
        return (0, puerts_1.$unref)(t);
    }
  }
  static GetDataTableRowFromName(a, e) {
    a = DataTableUtil.xJ(a);
    if (a && e) {
      var t = (0, puerts_1.$ref)(void 0);
      if (cpp_1.FKuroDataTableFunctionLibrary.GetDataTableRowFromName(a, e, t))
        return (0, puerts_1.$unref)(t);
      Log_1.Log.CheckWarn() &&
        Log_1.Log.Warn("DataTableUtil", 44, "获取预加载DT行配置失败", [
          "RowName",
          e,
        ]);
    }
  }
  static xJ(a) {
    var e,
      t = DataTableUtil.wJ.get(a);
    return (
      t ||
      ((e = exports.dataTablePaths.get(a))
        ? ((t = ResourceSystem_1.ResourceSystem.GetLoadedAsset(e, UE.DataTable))
            ? DataTableUtil.wJ.set(a, t)
            : Log_1.Log.CheckError() &&
              Log_1.Log.Error(
                "DataTableUtil",
                37,
                "获取预加载DT失败,请检查是否在预加载前访问该接口",
                ["DTPath", e],
              ),
          t)
        : void (
            Log_1.Log.CheckWarn() &&
            Log_1.Log.Warn(
              "DataTableUtil",
              37,
              "所获取的DT不在DataTableUtil管理中",
              ["DTEnum", a],
            )
          ))
    );
  }
  static GetDataTableAllRowNames(a, e) {
    a = DataTableUtil.xJ(a);
    a && cpp_1.FKuroDataTableFunctionLibrary.GetDataTableAllRowNames(a, e);
  }
  static GetDataTableAllRowNamesFromTable(a, e) {
    a && cpp_1.FKuroDataTableFunctionLibrary.GetDataTableAllRowNames(a, e);
  }
  static GetDataTableAllRow(a) {
    var e = new Array(),
      a = DataTableUtil.xJ(a);
    return a && cpp_1.FKuroDataTableFunctionLibrary.GetDataTableAllRow(a, e), e;
  }
  static GetDataTableAllRowFromTable(a) {
    var e = new Array();
    return a && cpp_1.FKuroDataTableFunctionLibrary.GetDataTableAllRow(a, e), e;
  }
  static GetDataTableAllRowWithKeys(a, e) {
    a = DataTableUtil.xJ(a);
    a && cpp_1.FKuroDataTableFunctionLibrary.GetDataTableAllRowWithKeys(a, e);
  }
  static GetDataTableAllRowWithKeysFromTable(a, e) {
    a && cpp_1.FKuroDataTableFunctionLibrary.GetDataTableAllRowWithKeys(a, e);
  }
  static GetAllDataTableRowFromTableWithRowName(a) {
    var e = new Array();
    if (a) {
      var t = new Array();
      this.GetDataTableAllRowNamesFromTable(a, t);
      for (const r of t) {
        var i = DataTableUtil.GetDataTableRow(a, r);
        i
          ? e.push([r, i])
          : Log_1.Log.CheckInfo() &&
            Log_1.Log.Info(
              "DataTableUtil",
              37,
              "[GetAllDataTableRowFromTableWithRowName]GetRowValue Failed",
              ["Table", a?.GetName()],
              ["RowName", r],
            );
      }
    }
    return e;
  }
  static LoadAiWeaponSocketConfigs(a, e) {
    a = DataTableUtil.GetDataTableRowFromName(2, a);
    if (a) return a.AiModelConfig.Get(e)?.Weapon;
  }
  static LoadAllAiWeaponSockets() {
    var a = new Map(),
      e = new Array(),
      t = DataTableUtil.xJ(2);
    if (t) {
      this.GetDataTableAllRowNamesFromTable(t, e);
      for (const r of e) {
        var i = DataTableUtil.GetDataTableRowFromName(2, r);
        a.set(parseInt(r), i);
      }
      return a;
    }
  }
}
(exports.DataTableUtil = DataTableUtil).wJ = new Map();
//# sourceMappingURL=DataTableUtil.js.map
