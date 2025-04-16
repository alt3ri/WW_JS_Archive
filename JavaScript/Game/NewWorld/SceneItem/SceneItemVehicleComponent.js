"use strict";
var __decorate =
  (this && this.__decorate) ||
  function (t, e, i, s) {
    var o,
      h = arguments.length,
      n =
        h < 3
          ? e
          : null === s
            ? (s = Object.getOwnPropertyDescriptor(e, i))
            : s;
    if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
      n = Reflect.decorate(t, e, i, s);
    else
      for (var r = t.length - 1; 0 <= r; r--)
        (o = t[r]) && (n = (h < 3 ? o(n) : 3 < h ? o(e, i, n) : o(e, i)) || n);
    return 3 < h && n && Object.defineProperty(e, i, n), n;
  };
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SceneItemVehicleComponent = void 0);
const UE = require("ue"),
  AudioSystem_1 = require("../../../Core/Audio/AudioSystem"),
  Log_1 = require("../../../Core/Common/Log"),
  CommonDefine_1 = require("../../../Core/Define/CommonDefine"),
  EntityComponent_1 = require("../../../Core/Entity/EntityComponent"),
  RegisterComponent_1 = require("../../../Core/Entity/RegisterComponent"),
  GameplayTagUtils_1 = require("../../../Core/Utils/GameplayTagUtils"),
  Vector_1 = require("../../../Core/Utils/Math/Vector"),
  MathUtils_1 = require("../../../Core/Utils/MathUtils"),
  IComponent_1 = require("../../../UniverseEditor/Interface/IComponent"),
  DELTA_TIME = 200,
  SPEED_MOVE_DISTANCE_TOLERENCE = 1e3,
  CENTIMETER_TO_METER = 0.01,
  CHANGE_VEHICLE_SPEED_TOLERENCE = 50,
  CHANGE_MONTAGE_RATE_TOLERENCE = 0.1;
class SceneItemVehicleFeature {
  constructor(t, e) {
    (this.VehicleComp = void 0),
      (this.ActorComp = void 0),
      (this.ActorComp = t),
      (this.VehicleComp = e);
  }
}
class MontageConfig extends SceneItemVehicleFeature {
  constructor() {
    super(...arguments), (this.Lie = void 0), (this.wO_ = void 0);
  }
  Init(t) {
    t = t.MovePerformConfig?.VehicleMontagePlayConfigs;
    if (t) {
      (this.wO_ = new Map()),
        (this.Lie = this.ActorComp?.Entity.GetComponent(203));
      for (const i of t) {
        var e = GameplayTagUtils_1.GameplayTagUtils.GetTagIdByName(
          i.TargetState,
        );
        e
          ? this.wO_.set(e, {
              MontageRange: [i.MinMontageSpeedFactor, i.MaxMontageSpeedFactor],
              SpeedRange: [i.MinVehicleSpeed, i.MaxVehicleSpeed],
              LastRate: 1,
            })
          : Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "SceneItem",
              42,
              "[SceneItemVehicle] 机关载具设置移动表现，不存在目标状态Tag",
              ["EntityId", this.ActorComp?.Entity.Id],
              ["PbDataId", this.ActorComp?.CreatureData?.GetPbDataId()],
              ["TargetState", i.TargetState],
            );
      }
      return 0 < this.wO_.size;
    }
    return !1;
  }
  Update(t) {
    if (
      this.Lie &&
      this.VehicleComp?.AnimInstance &&
      this.wO_ &&
      0 !== this.wO_.size
    )
      for (const i of this.wO_) {
        var e;
        this.Lie.HasTag(i[0]) &&
          ((e = MathUtils_1.MathUtils.RangeClamp(
            t,
            i[1].SpeedRange[0],
            i[1].SpeedRange[1],
            i[1].MontageRange[0],
            i[1].MontageRange[1],
          )),
          Math.abs(e - i[1].LastRate) > CHANGE_MONTAGE_RATE_TOLERENCE) &&
          this.VehicleComp.AnimInstance.Montage_SetPlayRate(
            this.VehicleComp.AnimInstance.GetCurrentActiveMontage(),
            e,
          );
      }
  }
  Clear() {
    this.VehicleComp?.AnimInstance &&
      this.wO_ &&
      0 !== this.wO_.size &&
      (this.VehicleComp.AnimInstance.Montage_SetPlayRate(
        this.VehicleComp.AnimInstance.GetCurrentActiveMontage(),
        1,
      ),
      this.wO_.clear());
  }
}
class GameplayCueConfig extends SceneItemVehicleFeature {
  constructor() {
    super(...arguments),
      (this.RO_ = void 0),
      (this.AO_ = void 0),
      (this.ph_ = void 0);
  }
  Init(t) {
    t = t.MovePerformConfig?.PlayerSpeedEffectConfigs;
    if (t) {
      if (((this.ph_ = this.ActorComp?.Entity.GetComponent(235)), !this.ph_))
        return (
          Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "SceneItem",
              42,
              "[SceneItemVehicle] 机关载具没有VehicleSceneItemPerformComponent",
              ["EntityId", this.ActorComp?.Entity.Id],
              ["PbDataId", this.ActorComp?.CreatureData?.GetPbDataId()],
            ),
          !1
        );
      this.RO_ = [];
      for (const e of t)
        this.RO_.push({
          SpeedRange: [e.MinVehicleSpeed, e.MaxVehicleSpeed],
          GameplayCueIdList: e.GameplayCueIds,
          InRange: !1,
          GameplayCueHandleList: [],
        });
      return 0 < this.RO_.length;
    }
    return !1;
  }
  Update(t) {
    if (this.RO_ && 0 !== this.RO_.length)
      if (this.ph_ && 0 === this.ph_.PassengerInfoMap.size) this.aZ_();
      else if (this.ph_ && this.AO_ && 0 !== this.AO_.length) {
        for (const i of this.AO_)
          if (i.Valid)
            for (const s of this.RO_) {
              if (
                MathUtils_1.MathUtils.InRangeArray(t, s.SpeedRange) &&
                !s.InRange
              ) {
                (s.InRange = !0), (s.GameplayCueHandleList.length = 0);
                for (const o of s.GameplayCueIdList) {
                  var e = i.AddCue(o);
                  s.GameplayCueHandleList.push(e),
                    Log_1.Log.CheckDebug() &&
                      Log_1.Log.Debug(
                        "SceneItem",
                        42,
                        "[SceneItemVehicle] 载具移动满足速度区间添加特效",
                        ["Passenger", i.Entity.Id],
                        ["特效Id", o],
                        ["Speed", t],
                      );
                }
              }
              if (
                !MathUtils_1.MathUtils.InRangeArray(t, s.SpeedRange) &&
                s.InRange
              ) {
                for (const h of s.GameplayCueHandleList)
                  i.RemoveCueByHandle(h),
                    Log_1.Log.CheckDebug() &&
                      Log_1.Log.Debug(
                        "SceneItem",
                        42,
                        "[SceneItemVehicle] 载具移动不满足速度区间移除特效",
                        ["Passenger", i.Entity.Id],
                        ["特效Id", h],
                        ["Speed", t],
                      );
                (s.InRange = !1), (s.GameplayCueHandleList.length = 0);
              }
            }
      } else this.hZ_();
  }
  hZ_() {
    if (this.ph_ && 0 !== this.ph_.PassengerInfoMap.size) {
      this.AO_ ? (this.AO_.length = 0) : (this.AO_ = []);
      for (const e of this.ph_.PassengerInfoMap) {
        var t;
        e[1].IsRolePassenger() &&
          (t = e[1].PassengerEntity?.GetComponent(222)) &&
          this.AO_.push(t);
      }
    }
  }
  aZ_() {
    if (this.RO_ && 0 !== this.RO_.length && this.AO_ && 0 !== this.AO_.length)
      for (const t of this.AO_)
        if (t.Valid)
          for (const e of this.RO_) {
            for (const i of e.GameplayCueHandleList) t.RemoveCueByHandle(i);
            (e.InRange = !1), (e.GameplayCueHandleList.length = 0);
          }
  }
  Clear() {
    this.aZ_();
  }
}
class AudioConfig extends SceneItemVehicleFeature {
  constructor() {
    super(...arguments), (this.TEn = 0), (this.Ivo = void 0);
  }
  Init(t) {
    var e,
      t = t.AudioConfigs;
    return (
      !!t &&
      !!(e = (0, AudioSystem_1.parseAudioEventPath)(t.AudioEvent)) &&
      ((this.Ivo = {
        SpeedRange: [t.MinVehicleSpeed, t.MaxVehicleSpeed],
        Event: e,
        AudioHandle: 0,
      }),
      !0)
    );
  }
  Update(t) {
    this.Ivo && this.ActorComp?.Owner && (this.PO_(t), (this.TEn = t));
  }
  PO_(t) {
    (Math.abs(this.TEn - t) < CHANGE_VEHICLE_SPEED_TOLERENCE &&
      (0 === this.TEn || 0 !== t)) ||
      (AudioSystem_1.AudioSystem.SetRtpcValue(
        "vehicle_speed",
        MathUtils_1.MathUtils.Clamp(
          t * CENTIMETER_TO_METER,
          this.Ivo.SpeedRange[0],
          this.Ivo.SpeedRange[1],
        ),
        { Actor: this.ActorComp.Owner },
      ),
      0 === t
        ? this.gTt()
        : 0 === this.Ivo.AudioHandle &&
          ((this.Ivo.AudioHandle = AudioSystem_1.AudioSystem.PostEvent(
            this.Ivo.Event,
            this.ActorComp.Owner,
          )),
          Log_1.Log.CheckDebug()) &&
          Log_1.Log.Debug(
            "Audio",
            42,
            "[SceneItemVehicle] 载具音效开启",
            ["EntityId", this.ActorComp.Entity.Id],
            ["PbDataId", this.ActorComp.CreatureData?.GetPbDataId()],
            ["Name", this.Ivo.Event],
          ));
  }
  Clear() {
    this.gTt();
  }
  gTt() {
    this.Ivo &&
      0 !== this.Ivo.AudioHandle &&
      (AudioSystem_1.AudioSystem.ExecuteAction(this.Ivo.AudioHandle, 0),
      (this.Ivo.AudioHandle = 0),
      Log_1.Log.CheckDebug()) &&
      Log_1.Log.Debug(
        "Audio",
        42,
        "[SceneItemVehicle] 载具音效停止",
        ["EntityId", this.ActorComp?.Entity.Id],
        ["PbDataId", this.ActorComp?.CreatureData?.GetPbDataId()],
        ["Name", this.Ivo.Event],
      );
  }
}
let SceneItemVehicleComponent = class SceneItemVehicleComponent extends EntityComponent_1.EntityComponent {
  constructor() {
    super(...arguments),
      (this.Ovr = void 0),
      (this.Hte = void 0),
      (this.Ist = 0),
      (this.mie = 0),
      (this.wZt = []),
      (this.tZl = void 0),
      (this.iZl = void 0),
      (this.Wnr = Vector_1.Vector.Create());
  }
  OnStart() {
    return (
      (this.Ovr = this.Entity.GetComponent(0)),
      (this.Hte = this.Entity.GetComponent(200)),
      this.aGe(),
      !0
    );
  }
  OnTick(t) {
    if (
      !MathUtils_1.MathUtils.IsNearlyZero(t) &&
      this.Hte &&
      ((this.mie += t), !(this.mie < DELTA_TIME))
    ) {
      var t = this.Hte.ActorLocationProxy,
        e =
          (this.Wnr.IsNearlyZero() && this.Wnr.DeepCopy(t),
          Vector_1.Vector.Dist(this.Wnr, t));
      e < SPEED_MOVE_DISTANCE_TOLERENCE &&
        (this.Ist = (e / this.mie) * CommonDefine_1.MILLIONSECOND_PER_SECOND);
      for (const i of this.wZt) i.Update(this.Ist);
      this.Wnr.DeepCopy(t), (this.mie = 0);
    }
  }
  OnEnd() {
    for (const t of this.wZt) t.Clear();
    return (this.Ist = 0), (this.wZt.length = 0), this.Wnr.Reset(), !0;
  }
  aGe() {
    var t = this.Ovr?.GetPbEntityInitData();
    if (t?.ComponentsData) {
      t = (0, IComponent_1.getComponent)(t.ComponentsData, "VehicleComponent");
      if (t?.VehicleFeatures)
        for (const e of t.VehicleFeatures)
          switch (e.Type) {
            case 1:
              this.XZ(e), this.xO_(e);
              break;
            case 3:
              this.UO_(e);
          }
    } else
      Log_1.Log.CheckError() &&
        Log_1.Log.Error(
          "SceneItem",
          42,
          "[SceneItemVehicle] PbEntityInitData.ComponentsData is undefined",
          ["EntityId", this.Entity.Id],
          ["PbDataId", this.Ovr?.GetPbDataId()],
        );
  }
  XZ(t) {
    var e;
    t.MovePerformConfig?.VehicleMontagePlayConfigs &&
      (e = new MontageConfig(this.Hte, this)).Init(t) &&
      this.wZt.push(e);
  }
  xO_(t) {
    var e;
    t.MovePerformConfig?.PlayerSpeedEffectConfigs &&
      (e = new GameplayCueConfig(this.Hte, this)).Init(t) &&
      this.wZt.push(e);
  }
  UO_(t) {
    var e;
    t.AudioConfigs &&
      (e = new AudioConfig(this.Hte, this)).Init(t) &&
      this.wZt.push(e);
  }
  get SkeletonMeshComponent() {
    if (!this.tZl) {
      var t = this.Hte?.GetReferenceActor("SkeletalMeshActor");
      if (!t) return;
      t instanceof UE.SkeletalMeshActor &&
        (this.tZl = t.GetSkeletalMeshComponent());
    }
    return this.tZl;
  }
  get AnimInstance() {
    return (
      this.iZl || (this.iZl = this.SkeletonMeshComponent?.GetAnimInstance()),
      this.iZl
    );
  }
};
(SceneItemVehicleComponent = __decorate(
  [(0, RegisterComponent_1.RegisterComponent)(268)],
  SceneItemVehicleComponent,
)),
  (exports.SceneItemVehicleComponent = SceneItemVehicleComponent);
//# sourceMappingURL=SceneItemVehicleComponent.js.map
