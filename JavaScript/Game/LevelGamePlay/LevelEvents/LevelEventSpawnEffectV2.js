"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.LevelEventSpawnEffectV2 = void 0);
const UE = require("ue"),
  Log_1 = require("../../../Core/Common/Log"),
  ResourceSystem_1 = require("../../../Core/Resource/ResourceSystem"),
  FNameUtil_1 = require("../../../Core/Utils/FNameUtil"),
  Quat_1 = require("../../../Core/Utils/Math/Quat"),
  Transform_1 = require("../../../Core/Utils/Math/Transform"),
  Vector_1 = require("../../../Core/Utils/Math/Vector"),
  MathUtils_1 = require("../../../Core/Utils/MathUtils"),
  EffectSystem_1 = require("../../Effect/EffectSystem"),
  Global_1 = require("../../Global"),
  GlobalData_1 = require("../../GlobalData"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  ScreenEffectSystem_1 = require("../../Render/Effect/ScreenEffectSystem/ScreenEffectSystem"),
  LevelGeneralBase_1 = require("../LevelGeneralBase");
class TsEffectAttachmentContext {
  constructor(e, t, r, a, o) {
    (this.AttachToActor = e),
      (this.AttachToComponent = t),
      (this.AttachSocket = r),
      (this.AssetPath = a),
      (this.Transform = o);
  }
}
class LevelEventSpawnEffectV2 extends LevelGeneralBase_1.LevelEventBase {
  Pi1(e, t) {
    if (e?.IsValid()) {
      e = e.GetComponentByClass(UE.SkeletalMeshComponent.StaticClass());
      if (e?.IsValid()) {
        t = FNameUtil_1.FNameUtil.GetDynamicFName(t);
        if (t && (e.DoesSocketExist(t) || -1 !== e.GetBoneIndex(t))) return t;
      }
    }
  }
  xi1(e, t) {
    var r = Vector_1.Vector.Create(0, 0, 0);
    return (
      e &&
        (r.AdditionEqual(e), t) &&
        r.AdditionEqual(Vector_1.Vector.Create(t.X ?? 0, t.Y ?? 0, t.Z ?? 0)),
      Transform_1.Transform.Create(
        Quat_1.Quat.IdentityProxy,
        r,
        Vector_1.Vector.OneVectorProxy,
      )
    );
  }
  Di1(e) {
    switch (e.Pos2.Type) {
      case 2:
        return this.Ui1(e.Path, e.Pos2);
      case 1:
        return this.Bi1(e.Path, e.Pos2);
      case 0:
        return this.ki1(e.Path, e.Pos2);
      default:
        return void (
          Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "LevelEvent",
            72,
            "[EAction.PlayEffect2] IPlayCommonEffect:" + e.Pos2,
          )
        );
    }
  }
  Bi1(e, t) {
    var r = t.EntityId,
      r = ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(r),
      a = r?.Entity?.GetComponent(1)?.ActorLocationProxy,
      r = r?.Entity?.GetComponent(1)?.Owner,
      o = r?.GetComponentByClass(UE.SkeletalMeshComponent.StaticClass());
    return new TsEffectAttachmentContext(
      void 0,
      o,
      this.Pi1(r, t.AttachSocket),
      e,
      this.xi1(a, t.Offset),
    );
  }
  ki1(e, t) {
    var r =
        Global_1.Global.BaseCharacter?.CharacterActorComponent
          ?.ActorLocationProxy,
      a = Global_1.Global.BaseCharacter,
      o = a?.GetComponentByClass(UE.SkeletalMeshComponent.StaticClass());
    return new TsEffectAttachmentContext(
      void 0,
      o,
      this.Pi1(a, t.AttachSocket),
      e,
      this.xi1(r, t.Offset),
    );
  }
  Ui1(e, t) {
    return new TsEffectAttachmentContext(
      void 0,
      void 0,
      void 0,
      e,
      this.xi1(
        Vector_1.Vector.Create(t.Pos.X ?? 0, t.Pos.Y ?? 0, t.Pos.Z ?? 0),
        void 0,
      ),
    );
  }
  Oi1(e) {
    return new TsEffectAttachmentContext(
      void 0,
      void 0,
      void 0,
      e,
      MathUtils_1.MathUtils.DefaultTransformProxy,
    );
  }
  qi1(t) {
    switch (t.Type) {
      case "Effect":
        var e,
          r = this.Di1(t);
        r &&
          ((e = EffectSystem_1.EffectSystem.SpawnUnloopedEffect(
            GlobalData_1.GlobalData.World,
            r.Transform.ToUeTransform(),
            r.AssetPath,
            "[LevelEventSpawnEffect.ExecuteNew]",
          )),
          r.AttachSocket && r.AttachToActor
            ? r.AttachToActor?.IsValid() &&
              EffectSystem_1.EffectSystem.GetEffectActor(e)?.K2_AttachToActor(
                r.AttachToActor,
                r.AttachSocket,
                2,
                2,
                2,
                !1,
              )
            : r.AttachSocket &&
              r.AttachToComponent &&
              r.AttachToComponent?.IsValid() &&
              EffectSystem_1.EffectSystem.GetEffectActor(
                e,
              )?.K2_AttachToComponent(
                r.AttachToComponent,
                r.AttachSocket,
                2,
                2,
                2,
                !1,
              ));
        break;
      case "ScreenEffect":
        ResourceSystem_1.ResourceSystem.LoadAsync(
          this.Oi1(t.Path).AssetPath,
          UE.EffectScreenPlayData_C,
          (e) => {
            e?.IsValid() &&
              (e.bAutoDestroy && !e.bStopByCall
                ? ScreenEffectSystem_1.ScreenEffectSystem.GetInstance().PlayScreenEffect(
                    e,
                  )
                : Log_1.Log.CheckError() &&
                  Log_1.Log.Error(
                    "LevelEvent",
                    72,
                    "[EAction.PlayEffect2] 检查屏幕特效:" + t.Path,
                    ["bAutoDestroy", e.bAutoDestroy],
                    ["bStopByCall", e.bStopByCall],
                  ));
          },
        );
        break;
      default:
        Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "LevelEvent",
            72,
            "[EAction.PlayEffect2] 未实现的类型:" + t,
          );
    }
  }
  ExecuteNew(e, t) {
    e && this.qi1(e);
  }
}
exports.LevelEventSpawnEffectV2 = LevelEventSpawnEffectV2;
//# sourceMappingURL=LevelEventSpawnEffectV2.js.map
