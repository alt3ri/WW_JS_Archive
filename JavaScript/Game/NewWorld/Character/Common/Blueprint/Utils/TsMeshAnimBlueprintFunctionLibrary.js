"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const puerts_1 = require("puerts"),
  UE = require("ue"),
  Log_1 = require("../../../../../../Core/Common/Log"),
  Protocol_1 = require("../../../../../../Core/Define/Net/Protocol"),
  EntitySystem_1 = require("../../../../../../Core/Entity/EntitySystem"),
  FNameUtil_1 = require("../../../../../../Core/Utils/FNameUtil"),
  TsBaseCharacter_1 = require("../../../../../Character/TsBaseCharacter"),
  EventDefine_1 = require("../../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../../Common/Event/EventSystem"),
  GlobalData_1 = require("../../../../../GlobalData"),
  ModelManager_1 = require("../../../../../Manager/ModelManager");
class TsMeshAnimBlueprintFunctionLibrary extends UE.BlueprintFunctionLibrary {
  static MainAnimInstance(t) {
    return EntitySystem_1.EntitySystem.GetComponent(t, 160)?.MainAnimInstance;
  }
  static GetSightDirect(t) {
    return EntitySystem_1.EntitySystem.GetComponent(t, 35)?.GetSightDirect();
  }
  static GetHulu(t) {
    return EntitySystem_1.EntitySystem.GetComponent(t, 69)?.Hulu;
  }
  static GetBattleIdleTime(t) {
    return EntitySystem_1.EntitySystem.GetComponent(t, 160)?.BattleIdleEndTime;
  }
  static EnterBattleIdle(t) {
    EntitySystem_1.EntitySystem.GetComponent(t, 160)?.EnterBattleIdle();
  }
  static SetTransformWithModelBuffer(t, e, i) {
    EntitySystem_1.EntitySystem.GetComponent(
      t,
      160,
    )?.SetTransformWithModelBuffer(e, i);
  }
  static SetSightDirectEnable(t, e) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 35);
    t && (t.EnableSightDirect = e);
  }
  static HideWeaponsWhenHideBones(t, e, i) {
    EntitySystem_1.EntitySystem.GetComponent(t, 69)?.HideWeaponsWhenHideBones(
      e,
      i,
    );
  }
  static ChangeWeaponHangState(t, e, i, n, r) {
    EntitySystem_1.EntitySystem.GetComponent(t, 69)?.ChangeWeaponHangState(
      e,
      (0, puerts_1.$unref)(n),
      (0, puerts_1.$unref)(r),
      i,
    );
  }
  static GetCurrentWeaponHangState(t) {
    return EntitySystem_1.EntitySystem.GetComponent(t, 69)?.BPr;
  }
  static GetIsCurrentWeaponHideEffectPlaying(t) {
    return (
      EntitySystem_1.EntitySystem.GetComponent(
        t,
        69,
      )?.IsCurrentWeaponHideEffectPlaying() ?? !1
    );
  }
  static ChangeWeapon(t, e) {
    EntitySystem_1.EntitySystem.GetComponent(
      t,
      69,
    )?.ChangeWeaponByWeaponSocketItem(e);
  }
  static GetRandomStandActionIndex(t) {
    return EntitySystem_1.EntitySystem.GetComponent(
      t,
      160,
    )?.GetRandomStandActionIndex();
  }
  static HideWeapon(t, e, i, n, r = !1) {
    EntitySystem_1.EntitySystem.GetComponent(t, 69)?.HideWeapon(
      i,
      e,
      n,
      !1,
      r ? 1 : 0,
    );
  }
  static HideHulu(t, e) {
    EntitySystem_1.EntitySystem.GetComponent(t, 69)?.SetHuluHidden(e);
  }
  static ChangeMeshAnim(t, e, i) {
    EntitySystem_1.EntitySystem.GetComponent(t, 3)?.ChangeMeshAnim(e, i);
  }
  static GetDegMovementSlope(t) {
    return EntitySystem_1.EntitySystem.GetComponent(t, 160)?.DegMovementSlope;
  }
  static GetRoleFootStepState(t) {
    var t = EntitySystem_1.EntitySystem.GetComponent(t, 0),
      e = t.GetEntityType();
    if (e === Protocol_1.Aki.Protocol.HBs.Proto_Player) {
      (e = t.GetPlayerId()),
        (e = ModelManager_1.ModelManager.PlayerInfoModel.GetId() === e),
        (t = t.GetRoleId()),
        (t = ModelManager_1.ModelManager.RoleModel.GetRoleDataById(t, e));
      if (t) {
        e = t.GetRoleConfig();
        if (e) return e.FootStepState;
      }
    }
  }
  static SetIkMeshOffset(t, e) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 160);
    t && (t.IkMeshOffset = e);
  }
  static GetWeaponBreachLevel(t) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 69);
    return t ? t.GetWeaponBreachLevel() : -1;
  }
  static UpdateAnimInfoMeshAnim(t, e) {
    var i,
      n,
      r = EntitySystem_1.EntitySystem.GetComponent(t, 160);
    r?.Valid &&
      ((e = e),
      (i = r.AnimLogicParamsSetter),
      (n = r.BattleIdleEndTime),
      i.BattleIdleTime !== n &&
        ((i.BattleIdleTime = n), (e.BattleIdleTimeRef = n)),
      (n = r.DegMovementSlope),
      i.DegMovementSlope !== n &&
        ((i.DegMovementSlope = n), (e.DegMovementSlopeRef = n)),
      (n = r.GetTsSightDirect()),
      i.SightDirect.Equals(n) ||
        (i.SightDirect.DeepCopy(n), (e.SightDirectRef = n.ToUeVector())),
      (r = EntitySystem_1.EntitySystem.GetComponent(
        t,
        61,
      ).GetRagRollQuitState()),
      i.RagQuitState !== r) &&
      ((i.RagQuitState = r), (e.RagQuitStateRef = r));
  }
  static UpdateAnimInfoMeshAnimRoleNpc(t, e) {
    var i,
      n,
      t = EntitySystem_1.EntitySystem.GetComponent(t, 160);
    t?.Valid &&
      ((e = e),
      (i = t.AnimLogicParamsSetter),
      (n = t.DegMovementSlope),
      i.DegMovementSlope !== n &&
        ((i.DegMovementSlope = n), (e.DegMovementSlopeRef = n)),
      (n = t.GetTsSightDirect()),
      i.SightDirect.Equals(n) ||
        (i.SightDirect.DeepCopy(n), (e.SightDirectRef = n.ToUeVector())),
      (n = t.GetTsLookAt()),
      i.LookAt.Equals(n) ||
        (i.LookAt.DeepCopy(n), (e.LookAtRef = n.ToUeVector2D())),
      i.EnableBlendSpaceLookAt !== t.EnableBlendSpaceLookAt) &&
      ((i.EnableBlendSpaceLookAt = t.EnableBlendSpaceLookAt),
      (e.EnableBlendSpaceLookAtRef = t.EnableBlendSpaceLookAt));
  }
  static UpdateFootstepAudioEvent(e, i, n) {
    var r = n.碰撞信息;
    if (n["状态-地面-Sprint"] || r.bBlockingHit) {
      e = EntitySystem_1.EntitySystem.GetComponent(e, 3);
      if (e?.Valid) {
        var a = e.Owner;
        if (a instanceof TsBaseCharacter_1.default) {
          EventSystem_1.EventSystem.Emit(
            EventDefine_1.EEventName.OnCharFootOnTheGround,
          );
          e = e.Entity.GetComponent(40);
          if (e?.Valid) {
            var s = e.GetAkComponentBySocketName(
              FNameUtil_1.FNameUtil.GetDynamicFName("hitcase"),
            );
            if (s?.IsValid()) {
              r = a.CharRenderingComponent.GetInWater()
                ? n.缓存角色位置
                : r.Location;
              let t = "";
              if (a.CharRenderingComponent.GetInWater())
                UE.AkGameplayStatics.SetRTPCValue(
                  void 0,
                  e.WaterDepth,
                  0,
                  void 0,
                  FNameUtil_1.FNameUtil.NONE,
                ),
                  (t = "WaterSurface");
              else {
                a = GlobalData_1.GlobalData.World;
                if (!a?.IsValid()) return;
                t = UE.KuroVoxelSystem.GetMtlNameByID(
                  UE.KuroVoxelSystem.GetVoxelInfoAtPos(a, r).MtlID,
                );
              }
              s.SetSwitch(void 0, "FootStep_Ground_Texture", t),
                (e.FootSwitch = t),
                s.SetSwitch(
                  void 0,
                  "FootStep_Shoes",
                  TsMeshAnimBlueprintFunctionLibrary.GetRoleFootStepState(i),
                ),
                n["状态-地面-Walk"] || n["状态-跑停-WalkStop"]
                  ? s.PostAkEvent(n.WalkAkAudioEvent, 0, void 0, "")
                  : n["状态-地面-Run"] || n["状态-跑停-RunStop"]
                    ? s.PostAkEvent(n.RunAkAudioEvent, 0, void 0, "")
                    : n["状态-地面-Sprint"] || n["状态-跑停-SprintStop"]
                      ? s.PostAkEvent(n.SprintAkAudioEvent, 0, void 0, "")
                      : s.PostAkEvent(n.FallbackAkAudioEvent, 0, void 0, "");
            }
          }
        }
      }
    }
  }
  static ChangeTickOverlap(t, e) {
    EntitySystem_1.EntitySystem.GetComponent(t, 99).SetTakeOverTick(e);
  }
  static AnimTurnLog(t) {
    var e = EntitySystem_1.EntitySystem.GetComponent(t, 3);
    Log_1.Log.CheckInfo() &&
      Log_1.Log.Info(
        "Test",
        6,
        "AnimTurn 1058338",
        ["EntityId", t],
        ["CurrentFacing", e.ActorRotationProxy],
        ["InputFace", e.InputRotatorProxy],
      );
  }
  static IsNpcTurning(t) {
    return !!EntitySystem_1.EntitySystem.GetComponent(t, 163)?.IsTurning;
  }
}
exports.default = TsMeshAnimBlueprintFunctionLibrary;
//# sourceMappingURL=TsMeshAnimBlueprintFunctionLibrary.js.map
