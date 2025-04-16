"use strict";
var __decorate =
  (this && this.__decorate) ||
  function (e, t, i, r) {
    var o,
      n = arguments.length,
      s =
        n < 3
          ? t
          : null === r
            ? (r = Object.getOwnPropertyDescriptor(t, i))
            : r;
    if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
      s = Reflect.decorate(e, t, i, r);
    else
      for (var h = e.length - 1; 0 <= h; h--)
        (o = e[h]) && (s = (n < 3 ? o(s) : 3 < n ? o(t, i, s) : o(t, i)) || s);
    return 3 < n && s && Object.defineProperty(t, i, s), s;
  };
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.BaseVehiclePerformComponent = void 0);
const UE = require("ue"),
  Log_1 = require("../../../../Core/Common/Log"),
  Protocol_1 = require("../../../../Core/Define/Net/Protocol"),
  EntityComponent_1 = require("../../../../Core/Entity/EntityComponent"),
  RegisterComponent_1 = require("../../../../Core/Entity/RegisterComponent"),
  Net_1 = require("../../../../Core/Net/Net"),
  ResourceSystem_1 = require("../../../../Core/Resource/ResourceSystem"),
  Quat_1 = require("../../../../Core/Utils/Math/Quat"),
  Rotator_1 = require("../../../../Core/Utils/Math/Rotator"),
  Vector_1 = require("../../../../Core/Utils/Math/Vector"),
  MathUtils_1 = require("../../../../Core/Utils/MathUtils"),
  IComponent_1 = require("../../../../UniverseEditor/Interface/IComponent"),
  EventDefine_1 = require("../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../Common/Event/EventSystem"),
  ControllerHolder_1 = require("../../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  VehicleController_1 = require("../Controller/VehicleController"),
  VehicleConfig_1 = require("./VehicleConfig"),
  VehicleInfoDefines_1 = require("./VehicleInfoDefines");
let BaseVehiclePerformComponent = class BaseVehiclePerformComponent extends EntityComponent_1.EntityComponent {
  constructor() {
    super(...arguments),
      (this.CreatureData = void 0),
      (this.MaxSeatCount = 0),
      (this.DriverSeat = -1),
      (this.CanBeenManipulated = !0),
      (this.VehicleType = "Gongduola"),
      (this.Config = void 0),
      (this.ConfigInternal = void 0),
      (this.VehicleFeatures = new Set()),
      (this.Drivers = new Set()),
      (this.PassengerInfoMap = new Map()),
      (this.SeatInfoMap = new Map()),
      (this.IsPendingDestroy = !1),
      (this.EntityHandle = void 0),
      (this.TmpVector1 = Vector_1.Vector.Create()),
      (this.TmpVector2 = Vector_1.Vector.Create()),
      (this.TmpVector3 = Vector_1.Vector.Create()),
      (this.TmpVector4 = Vector_1.Vector.Create()),
      (this.TmpRotator = Rotator_1.Rotator.Create()),
      (this.TmpQuat1 = Quat_1.Quat.Create()),
      (this.TmpQuat2 = Quat_1.Quat.Create()),
      (this.OnRemoveEntity = (e, t) => {
        EventSystem_1.EventSystem.RemoveWithTarget(
          this.EntityHandle,
          EventDefine_1.EEventName.RemoveEntity,
          this.OnRemoveEntity,
        ),
          (this.EntityHandle = void 0);
        for (const i of this.PassengerInfoMap.values())
          this.Leave(i.PassengerEntity);
      });
  }
  OnInitData(e) {
    this.CreatureData = this.Entity.GetComponent(0);
    var t = this.CreatureData.GetPbEntityInitData();
    if (t?.ComponentsData) {
      var i = (0, IComponent_1.getComponent)(
        t.ComponentsData,
        "BaseInfoComponent",
      );
      if (!i?.Category.VehicleType)
        return (
          Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "Vehicle",
              50,
              "无法获取载具类型",
              ["PbDataId", this.CreatureData.GetPbDataId()],
              ["CreatureId", this.CreatureData.GetCreatureDataId()],
            ),
          !1
        );
      this.VehicleType = i.Category.VehicleType;
      i = (0, IComponent_1.getComponent)(t.ComponentsData, "VehicleComponent");
      i &&
        ((this.MaxSeatCount = i.SeatCount),
        (this.DriverSeat =
          i.DriverSeat !== VehicleInfoDefines_1.INVALID_SEAT
            ? i.DriverSeat
            : -1));
    }
    return !0;
  }
  OnStart() {
    return (
      (this.EntityHandle =
        ModelManager_1.ModelManager.CreatureModel.GetEntityById(
          this.Entity.Id,
        )),
      EventSystem_1.EventSystem.AddWithTarget(
        this.EntityHandle,
        EventDefine_1.EEventName.RemoveEntity,
        this.OnRemoveEntity,
      ),
      !0
    );
  }
  OnActivate() {
    this.InitVehicleFeatures();
  }
  OnPostActivate() {
    VehicleController_1.VehicleController.OnVehicleActivate(this.Entity);
  }
  OnAfterTick(e) {
    for (const t of this.PassengerInfoMap.values())
      t.PassengerEntity?.GetComponent(1)?.ResetAllCachedTime();
  }
  InitVehicleConfig() {
    var e = this.LoadVehicleConfigAsset();
    return (
      (this.Config = new VehicleConfig_1.VehicleConfig(this.Entity, e)),
      (this.ConfigInternal = this.Config.DeepCopy()),
      this.Config.Init()
    );
  }
  LoadVehicleConfigAsset() {
    var e = this.CreatureData?.GetPbEntityInitData();
    if (e?.ComponentsData) {
      e = (0, IComponent_1.getComponent)(e.ComponentsData, "VehicleComponent");
      if (e && "" !== e.Config && "None" !== e.Config)
        return this.LoadVehicleConfig(e.Config);
      Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug(
          "Vehicle",
          50,
          "载具初始化没有VehicleComp组件或没有配置载具DA",
          ["PbDataId", this.CreatureData?.GetPbDataId()],
          ["CreatureId", this.CreatureData?.GetCreatureDataId()],
        );
    } else
      Log_1.Log.CheckError() &&
        Log_1.Log.Error(
          "Vehicle",
          50,
          "载具初始化失败，没有组件信息",
          ["PbDataId", this.CreatureData?.GetPbDataId()],
          ["CreatureId", this.CreatureData?.GetCreatureDataId()],
        );
  }
  LoadVehicleConfig(e) {
    var t = ResourceSystem_1.ResourceSystem.Load(e, UE.BP_VehicleConfig_C);
    if (t?.IsValid()) return t;
    Log_1.Log.CheckError() &&
      Log_1.Log.Error(
        "Vehicle",
        50,
        "载具初始化失败，无法读取有效的载具DA配置",
        ["PbDataId", this.CreatureData?.GetPbDataId()],
        ["CreatureId", this.CreatureData?.GetCreatureDataId()],
        ["Path", e],
      );
  }
  InitVehicleFeatures() {
    var e = this.CreatureData?.GetPbEntityInitData();
    if (e) {
      e = (0, IComponent_1.getComponent)(e.ComponentsData, "VehicleComponent");
      if (e?.VehicleFeatures?.length)
        for (const i of e.VehicleFeatures) {
          var t = i.Type;
          switch ((this.VehicleFeatures.add(t), t)) {
            case 1:
              this.InitVehicleMovementFeature(i);
              break;
            case 2:
              this.InitVehicleBattleFeature(i);
          }
        }
    }
  }
  InitVehicleMovementFeature(e) {}
  InitVehicleBattleFeature(e) {}
  TryEnter(e, t) {
    var i, r, o;
    return (
      !!this.EnterConditionCheck(e, t) &&
      ((r = e.GetComponent(1))?.CreatureData?.IsRole()
        ? ((i = this.Entity.GetComponent(0)),
          (r = ModelManager_1.ModelManager.GameModeModel.IsMulti
            ? ModelManager_1.ModelManager.OnlineModel.OwnerId
            : r.CreatureData.GetPlayerId()),
          ((o = Protocol_1.Aki.Protocol.GC_.create()).F4n =
            MathUtils_1.MathUtils.NumberToLong(i.GetCreatureDataId())),
          (o.ORs = r),
          (o.phl = !0),
          (o.fhl = t),
          Net_1.Net.Call(22415, o, () => {}))
        : this.Enter(e, t),
      !0)
    );
  }
  Enter(e, t) {
    var i = this.DriverSeat === t,
      r = new VehicleInfoDefines_1.VehiclePassengerInfo(),
      o =
        ((r.VehicleEntity = this.Entity),
        (r.PassengerEntity = e),
        (r.VehicleType = this.VehicleType),
        (r.IsDriver = i),
        (r.Seat = t),
        e.GetComponent(0).GetPlayerId()),
      n = this.Entity.GetComponent(1),
      s = this.CreatureData.GetPbDataId(),
      n =
        (i &&
          (n?.SetAutonomous(
            o === ModelManager_1.ModelManager.CreatureModel.GetPlayerId(),
          ),
          Log_1.Log.CheckInfo()) &&
          Log_1.Log.Info(
            "Vehicle",
            50,
            "[BaseVehicleComp] 进入载具设置移动主控",
            [
              "v",
              o === ModelManager_1.ModelManager.CreatureModel.GetPlayerId(),
            ],
          ),
        this.SeatInfoMap.get(t));
    n &&
      ((o = n.PassengerEntity.GetComponent(0)),
      Log_1.Log.CheckError() &&
        Log_1.Log.Error(
          "Vehicle",
          50,
          "[BaseVehicleComp] 进入载具时目标位置已有实体",
          ["Vehicle", s],
          ["OldPassenger", o?.GetPbDataId()],
          ["NewPassenger", e.GetComponent(0)?.GetPbDataId()],
          ["Seat", t],
        ),
      this.Leave(n.PassengerEntity)),
      this.PassengerInfoMap.set(e.Id, r),
      this.SeatInfoMap.set(t, r),
      i && this.Drivers.add(e),
      Log_1.Log.CheckInfo() &&
        Log_1.Log.Info(
          "Vehicle",
          50,
          "[BaseVehicleComp] 进入载具",
          ["V_PbDataId", s],
          ["V_CreatureId", this.CreatureData.GetCreatureDataId()],
          ["P_PbDataId", e.GetComponent(0)?.GetPbDataId()],
          ["P_PlayerId", e.GetComponent(0)?.GetPlayerId()],
          ["Seat", t],
          ["isDriver", i],
        ),
      this.EnterVehiclePerform(r),
      EventSystem_1.EventSystem.EmitWithTarget(
        e,
        EventDefine_1.EEventName.OnEnterVehicle,
        r,
      ),
      EventSystem_1.EventSystem.EmitWithTarget(
        this.Entity,
        EventDefine_1.EEventName.OnVehicleBeenEntered,
        r,
      ),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.OnEnterVehicle,
        r,
      ),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.OnVehicleBeenEntered,
        r,
      );
  }
  TryLeave(e, t = 0) {
    var i, r, o, n, s;
    return (
      !!this.LeaveConditionCheck(e) &&
      ((o = e.GetComponent(1))?.CreatureData?.IsRole()
        ? ((i = this.Entity.GetComponent(0)),
          (r = this.PassengerInfoMap.get(e.Id)),
          (o = ModelManager_1.ModelManager.GameModeModel.IsMulti
            ? ModelManager_1.ModelManager.OnlineModel.OwnerId
            : o.CreatureData.GetPlayerId()),
          (n =
            ControllerHolder_1.ControllerHolder.VehicleController.ToServerExitVehicleType(
              t,
            )),
          ((s = Protocol_1.Aki.Protocol.GC_.create()).F4n =
            MathUtils_1.MathUtils.NumberToLong(i.GetCreatureDataId())),
          (s.ORs = o),
          (s.phl = !1),
          (s.fhl = r.Seat),
          (s.bI_ = n),
          Net_1.Net.Call(22415, s, () => {}))
        : this.Leave(e, t),
      !0)
    );
  }
  Leave(e, t = 0) {
    var i = this.Entity.GetComponent(1)?.CreatureData.GetPbDataId(),
      r = this.PassengerInfoMap.get(e.Id);
    (r.ExitType = t),
      2 !== r.ExitType &&
        (Log_1.Log.CheckInfo() &&
          Log_1.Log.Info(
            "Vehicle",
            50,
            "[BaseVehicleComp] 退出载具",
            ["V_PbDataId", i],
            ["V_CreatureId", this.CreatureData.GetCreatureDataId()],
            ["P_PbDataId", e.GetComponent(0)?.GetPbDataId()],
            ["P_PlayerId", e.GetComponent(0)?.GetPlayerId()],
            ["Seat", r.Seat],
            ["isDriver", r.IsDriver],
            ["ExitType", r.ExitType],
          ),
        this.LeaveVehiclePerform(r),
        EventSystem_1.EventSystem.EmitWithTarget(
          e,
          EventDefine_1.EEventName.OnLeaveVehicle,
          r,
        ),
        EventSystem_1.EventSystem.EmitWithTarget(
          this.Entity,
          EventDefine_1.EEventName.OnVehicleBeenLeaved,
          r,
        ),
        EventSystem_1.EventSystem.Emit(
          EventDefine_1.EEventName.OnLeaveVehicle,
          r,
        ),
        EventSystem_1.EventSystem.Emit(
          EventDefine_1.EEventName.OnVehicleBeenLeaved,
          r,
        ),
        this.PassengerInfoMap.delete(e.Id),
        this.SeatInfoMap.delete(r.Seat),
        this.Drivers.delete(e));
  }
  ResetVehicleConfig(e = !1) {
    (this.Config = this.ConfigInternal?.DeepCopy()),
      e && this.RefreshMoveConfigFromVehicleConfig();
  }
  RefreshMoveConfigFromVehicleConfig() {}
  HandlePendingDestroy() {
    ControllerHolder_1.ControllerHolder.CreatureController.DelayRemoveEntityFinished(
      this.Entity,
    );
  }
  EnterConditionCheck(e, t) {
    return !(
      t < 0 ||
      t >= this.MaxSeatCount ||
      this.SeatInfoMap.has(t) ||
      (!this.CanBeenManipulated && this.DriverSeat === t) ||
      !(t = e.GetComponent(226)) ||
      t.IsOnVehicle
    );
  }
  LeaveConditionCheck(e) {
    return !!this.PassengerInfoMap.has(e.Id);
  }
  EnterVehiclePerform(e) {}
  LeaveVehiclePerform(e) {}
  SetGravityDirectForVehicle(e) {}
  SetGravityDirectForVehicleWithoutRotate(e) {}
  IsDriver(e) {
    return this.Drivers.has(e);
  }
  IsPassenger(e) {
    return this.PassengerInfoMap.has(e.Id);
  }
  TryFindUsableSeat(t) {
    for (let e = 0; e < this.MaxSeatCount; e++)
      if ((t || e !== this.DriverSeat) && !this.SeatInfoMap.has(e)) return e;
    return -1;
  }
  IsVehicleInUse(e) {
    return e === VehicleInfoDefines_1.INVALID_SEAT
      ? !!this.PassengerInfoMap.size
      : this.SeatInfoMap.has(e);
  }
  GetVehicleVelocity(e) {}
};
(BaseVehiclePerformComponent = __decorate(
  [(0, RegisterComponent_1.RegisterComponent)(230)],
  BaseVehiclePerformComponent,
)),
  (exports.BaseVehiclePerformComponent = BaseVehiclePerformComponent);
//# sourceMappingURL=BaseVehiclePerformComponent.js.map
