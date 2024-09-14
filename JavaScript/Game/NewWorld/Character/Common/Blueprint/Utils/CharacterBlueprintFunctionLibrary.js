"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const UE = require("ue"),
  Log_1 = require("../../../../../../Core/Common/Log"),
  EntitySystem_1 = require("../../../../../../Core/Entity/EntitySystem"),
  MathUtils_1 = require("../../../../../../Core/Utils/MathUtils"),
  CameraController_1 = require("../../../../../Camera/CameraController"),
  Global_1 = require("../../../../../Global"),
  ModelManager_1 = require("../../../../../Manager/ModelManager"),
  CharacterGasDebugComponent_1 = require("../../Component/Abilities/CharacterGasDebugComponent"),
  CharacterStatisticsComponent_1 = require("../../Component/Abilities/CharacterStatisticsComponent"),
  SAVE_PATH = "Statistics/FightDataRecord/";
class CharacterBlueprintFunctionLibrary extends UE.BlueprintFunctionLibrary {
  static SetPartCollisionSwitch(t, e, a, r, i) {
    t?.IsValid() && t.CharacterActorComponent?.Valid
      ? t.CharacterActorComponent.SetPartCollisionSwitch(e, a, r, i)
      : Log_1.Log.CheckError() &&
        Log_1.Log.Error("Character", 21, "传入的character为空");
  }
  static ResetPartCollisionSwitch(t, e) {
    var t = t.CharacterActorComponent,
      a = t.GetPartConf(e);
    t.SetPartCollisionSwitch(
      e,
      a.IsBlockPawn,
      a.IsBulletDetect,
      a.IsBlockCamera,
    );
  }
  static GetCharacterActorByEntityId(t) {
    t = EntitySystem_1.EntitySystem.Get(t);
    if (t?.Valid) return t.GetComponent(3)?.Owner;
  }
  static CharacterOperationRecord(t) {
    CharacterStatisticsComponent_1.CharacterStatisticsComponent.OperationRecord(
      t,
    ),
      t
        ? CharacterGasDebugComponent_1.CharacterGasDebugComponent.BeginRecord()
        : CharacterGasDebugComponent_1.CharacterGasDebugComponent.EndRecord();
  }
  static GetStatisticsOpen() {
    return CharacterStatisticsComponent_1.CharacterStatisticsComponent
      .OpenOperationRecord;
  }
  static SaveCharacterOperationRecord() {
    CharacterGasDebugComponent_1.CharacterGasDebugComponent.EndRecord();
    var t =
      CharacterStatisticsComponent_1.CharacterStatisticsComponent.ExportRecord();
    if (t) {
      if (
        UE.KuroStaticLibrary.SaveStringToFile(
          t,
          UE.BlueprintPathsLibrary.ProjectSavedDir() +
            SAVE_PATH +
            "OperationRecord.csv",
          !0,
        ) &&
        (Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug("Test", 21, "OperationRecord写入完成"),
        CharacterBlueprintFunctionLibrary.SaveCharacterStatisticsData())
      )
        return !0;
      Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug("Test", 21, "OperationRecord写入失败");
    }
    return !1;
  }
  static SaveCharacterStatisticsData() {
    var t =
        CharacterStatisticsComponent_1.CharacterStatisticsComponent.ExportStatisticsByAttackType(),
      e =
        CharacterStatisticsComponent_1.CharacterStatisticsComponent.ExportStatisticsBySkillType(),
      a = !t,
      r = !e;
    if (a || r)
      Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug(
          "Test",
          21,
          "读取数据为空",
          ["A表为空", r],
          ["B表为空", a],
        );
    else {
      (r = UE.BlueprintPathsLibrary.ProjectSavedDir()),
        (a = UE.KuroStaticLibrary.SaveStringToFile(
          t,
          r + SAVE_PATH + "DamageStatisticsRecord_B.csv",
          !0,
        )),
        (t = UE.KuroStaticLibrary.SaveStringToFile(
          e,
          r + SAVE_PATH + "DamageStatisticsRecord_A.csv",
          !0,
        ));
      if (a && t)
        return (
          Log_1.Log.CheckDebug() &&
            Log_1.Log.Debug("Test", 21, "DamageRecord_B写入完成"),
          !0
        );
      Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug(
          "Test",
          21,
          "DamageRecord_B写入失败",
          ["A", t],
          ["B", a],
        );
    }
    return !1;
  }
  static GetOperationRecordCount() {
    return CharacterStatisticsComponent_1.CharacterStatisticsComponent.OperationRecordCount();
  }
  static CleanupOperationRecord() {
    CharacterStatisticsComponent_1.CharacterStatisticsComponent.CleanupOperationRecord(),
      CharacterStatisticsComponent_1.CharacterStatisticsComponent.CleanupRecordData(),
      CharacterGasDebugComponent_1.CharacterGasDebugComponent.CleanupRecord();
  }
  static SetHalfLengthRecord(t) {
    CharacterStatisticsComponent_1.CharacterStatisticsComponent.HalfLengthRecordSquared =
      Math.pow(t, 2);
  }
  static SetCombatStarted(t, e, a, r, i, o, s, n, c) {
    var C = new Array();
    r && C.push(0),
      i && C.push(1),
      o && C.push(2),
      s && C.push(3),
      n && C.push(4),
      c && C.push(5),
      CharacterStatisticsComponent_1.CharacterStatisticsComponent.SetCombatStarted(
        t,
        C,
        e,
        a,
      );
  }
  static SetTypeOpen(t, e, a, r, i, o) {
    var s = new Array();
    t && s.push(0),
      e && s.push(1),
      a && s.push(2),
      r && s.push(3),
      i && s.push(4),
      o && s.push(5),
      CharacterStatisticsComponent_1.CharacterStatisticsComponent.SetTypeOpen(
        s,
      );
  }
  static GetAttackerCombatEntities() {
    return CharacterStatisticsComponent_1.CharacterStatisticsComponent.GetAttackerCombatEntities();
  }
  static GetTargetCombatEntities() {
    return CharacterStatisticsComponent_1.CharacterStatisticsComponent.GetTargetCombatEntities();
  }
  static SetCurrentAttacker(t) {
    CharacterStatisticsComponent_1.CharacterStatisticsComponent.SetCurrentAttacker(
      t,
    );
  }
  static SetCurrentTarget(t) {
    CharacterStatisticsComponent_1.CharacterStatisticsComponent.SetCurrentTarget(
      t,
    );
  }
  static GetItemsReset() {
    return CharacterStatisticsComponent_1.CharacterStatisticsComponent
      .ItemReset;
  }
  static OnItemsResetFinished() {
    CharacterStatisticsComponent_1.CharacterStatisticsComponent.OnItemsResetFinished();
  }
  static GetSubItemsListView(t, e) {
    return CharacterStatisticsComponent_1.CharacterStatisticsComponent.GetSubItemsListView(
      t,
      e,
    );
  }
  static GetItemListViewCount() {
    return CharacterStatisticsComponent_1.CharacterStatisticsComponent.GetItemListViewCount();
  }
  static TestLeaveSplineMove(t) {
    t.GetEntityNoBlueprint().GetComponent(98).EndSplineMove(1),
      CameraController_1.CameraController.FightCamera.LogicComponent.ExitCameraSpline();
  }
  static GetBaseCharacterTransform() {
    var t = Global_1.Global.BaseCharacter?.CharacterActorComponent;
    return t ? t.ActorTransform : MathUtils_1.MathUtils.DefaultTransform;
  }
  static SetActorExtraSkeletalMeshComponent(t, e) {
    var t = ModelManager_1.ModelManager.CharacterModel.GetHandle(t);
    t && (t = t.Entity?.GetComponent(3)) && t.AddExtraSkeletalMeshComponent(e);
  }
}
exports.default = CharacterBlueprintFunctionLibrary;
//# sourceMappingURL=CharacterBlueprintFunctionLibrary.js.map
