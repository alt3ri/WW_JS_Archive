"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.VehicleController = void 0);
const Log_1 = require("../../../../Core/Common/Log"),
  Protocol_1 = require("../../../../Core/Define/Net/Protocol"),
  ControllerBase_1 = require("../../../../Core/Framework/ControllerBase"),
  Net_1 = require("../../../../Core/Net/Net"),
  MathUtils_1 = require("../../../../Core/Utils/MathUtils"),
  EventDefine_1 = require("../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../Common/Event/EventSystem"),
  Global_1 = require("../../../Global"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  GameModePromise_1 = require("../../../World/Define/GameModePromise"),
  WaitEntityTask_1 = require("../../../World/Define/WaitEntityTask"),
  VehicleInfoDefines_1 = require("../Common/VehicleInfoDefines"),
  WAIT_ENTITY_CREATE_TIMEOUT = 6e4,
  TRIAL_ROLE_ID = 1e4,
  CHECK_DRIVE_INFO_INTERVAL = 500;
class VehicleController extends ControllerBase_1.ControllerBase {
  static OnInit() {
    return (
      Net_1.Net.Register(18357, this.VehicleUpdateNotify),
      Net_1.Net.Register(24378, this.OnUpdateVehicleRideSharingNotify),
      Net_1.Net.Register(26122, this.VehicleUpdateEntityNotify),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnChangeRole,
        this.OnChangeRole,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnEnterVehicle,
        this.OnEnterVehicle,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnLeaveVehicle,
        this.OnLeaveVehicle,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnChangeRideSharingPassenger,
        this.OnChangeVehicleRideSharing,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnRemoveRideSharingPassenger,
        this.OnRemoveVehicleRideSharing,
      ),
      !0
    );
  }
  static OnTick(e) {
    this.Kbl &&
      ((this.mie += e), this.mie > CHECK_DRIVE_INFO_INTERVAL) &&
      (ModelManager_1.ModelManager.VehicleModel?.UpdateKeepDrivingInfo(
        this.mie,
        this.Kbl,
      ),
      (this.mie = 0));
  }
  static OnClear() {
    return (
      Net_1.Net.UnRegister(18357),
      Net_1.Net.UnRegister(24378),
      Net_1.Net.UnRegister(26122),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnChangeRole,
        this.OnChangeRole,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnEnterVehicle,
        this.OnEnterVehicle,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnLeaveVehicle,
        this.OnLeaveVehicle,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnChangeRideSharingPassenger,
        this.OnChangeVehicleRideSharing,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnRemoveRideSharingPassenger,
        this.OnRemoveVehicleRideSharing,
      ),
      !0
    );
  }
  static VehicleUpdateEntity(e) {
    ModelManager_1.ModelManager.VehicleModel.UpdateEntityVehicleData(e),
      this.RegisterWaitEntityTask(e);
  }
  static W5_(e, t, a, r = 0) {
    e?.IsInit &&
      t?.IsInit &&
      (t = t.GetComponent(230)) &&
      (-1 !== a ? t.Enter(e, a) : t.Leave(e, r));
  }
  static async UpdatePlayerVehiclePerform() {
    var e,
      t,
      a,
      r,
      o = ModelManager_1.ModelManager.CreatureModel.GetPlayerId(),
      i = ModelManager_1.ModelManager.VehicleModel.GetPlayerVehicleData(o);
    i &&
      ((r = i.EntityCreatureId),
      (e = i.VehicleCreatureId),
      (t = ModelManager_1.ModelManager.CreatureModel.GetEntity(r)?.Entity),
      (a = ModelManager_1.ModelManager.CreatureModel.GetEntity(e)?.Entity),
      this.Q5_ && (this.Q5_.SetResult(!0), (this.Q5_ = void 0)),
      (t?.IsInit && a?.IsInit) ||
        (Log_1.Log.CheckInfo() &&
          Log_1.Log.Info(
            "Vehicle",
            48,
            "角色或船未加载完成，进行等待",
            ["passengerCreatureId", r],
            ["vehicleCreatureId", e],
          ),
        (this.Q5_ = new GameModePromise_1.GameModePromise()),
        WaitEntityTask_1.WaitEntityTask.Create(
          "VehicleController.UpdatePlayerVehiclePerform",
          [e, r],
          () => {
            this.Q5_?.SetResult(!0), (this.Q5_ = void 0);
          },
          WAIT_ENTITY_CREATE_TIMEOUT,
        )),
      await this.Q5_?.Promise,
      r ===
        (r = ModelManager_1.ModelManager.VehicleModel.GetPlayerVehicleData(o))
          ?.EntityCreatureId) &&
      e === r?.VehicleCreatureId &&
      (this.W5_(t, a, -1, 1), this.W5_(t, a, i.Seat, i.ExitType));
  }
  static OnCharacterActivate(e) {
    var t = e.GetComponent(0),
      a =
        (Log_1.Log.CheckInfo() &&
          Log_1.Log.Info(
            "Vehicle",
            50,
            "OnRoleActivate",
            ["PlayerId", t.GetPlayerId()],
            ["PlayerCreatureId", t.GetCreatureDataId()],
          ),
        ModelManager_1.ModelManager.VehicleModel.GetPlayerVehicleData(
          t.GetPlayerId(),
        ));
    a?.EntityCreatureId !== t.GetCreatureDataId()
      ? Log_1.Log.CheckInfo() &&
        Log_1.Log.Info(
          "Vehicle",
          50,
          "OnRoleActivate 非当前角色乘坐",
          ["PlayerId", t.GetPlayerId()],
          ["PlayerCreatureId", t.GetCreatureDataId()],
        )
      : a?.VehicleCreatureId &&
        ((t = ModelManager_1.ModelManager.CreatureModel.GetEntity(
          a.VehicleCreatureId,
        )?.Entity),
        this.W5_(e, t, a.Seat, a.ExitType));
  }
  static OnVehicleActivate(e) {
    var t,
      a = e.GetComponent(0),
      a =
        (Log_1.Log.CheckInfo() &&
          Log_1.Log.Info("Vehicle", 50, "OnVehicleActivate", [
            "VehicleCreatureId",
            a.GetCreatureDataId(),
          ]),
        ModelManager_1.ModelManager.VehicleModel.GetVehiclePlayerData(
          a.GetCreatureDataId(),
        ));
    for (const r of a)
      r.VehicleCreatureId &&
        0 <= r.Seat &&
        ((t = ModelManager_1.ModelManager.CreatureModel.GetEntity(
          r.EntityCreatureId,
        )?.Entity),
        this.W5_(t, e, r.Seat, r.ExitType));
  }
  static RegisterWaitEntityTask(a) {
    var e = ModelManager_1.ModelManager.VehicleModel.PassengerVehicleMap.get(
      a.EntityCreatureId,
    );
    if (e?.Context?.Equals(a) && !e.WaitTask) {
      const r = a.EntityCreatureId,
        o = a.VehicleCreatureId;
      Log_1.Log.CheckInfo() &&
        Log_1.Log.Info(
          "Vehicle",
          50,
          "[VehicleController] 创建载具等待实体任务",
          ["EntityCreatureId", r],
          ["VehicleCreatureId", o],
          ["Seat", a.Seat],
        ),
        (e.WaitTask = WaitEntityTask_1.WaitEntityTask.Create(
          "VehicleController.RegisterWaitEntityTask",
          [o, r],
          (e) => {
            var t;
            e &&
              (e =
                ModelManager_1.ModelManager.VehicleModel.PassengerVehicleMap.get(
                  r,
                ))?.Context?.Equals(a) &&
              (Log_1.Log.CheckInfo() &&
                Log_1.Log.Info(
                  "Vehicle",
                  50,
                  "[VehicleController] 开始执行载具等待实体任务",
                  ["EntityCreatureId", r],
                  ["VehicleCreatureId", o],
                  ["Seat", a.Seat],
                ),
              (e.WaitTask = void 0),
              (e =
                ModelManager_1.ModelManager.CreatureModel.GetEntity(r)?.Entity),
              (t =
                ModelManager_1.ModelManager.CreatureModel.GetEntity(o)?.Entity),
              this.W5_(e, t, a.Seat, a.ExitType),
              ModelManager_1.ModelManager.VehicleModel.PostUpdateVehicleEntityData(
                a,
              ));
          },
          WAIT_ENTITY_CREATE_TIMEOUT,
          !1,
          !0,
        ));
    }
  }
  static OnChangeMode() {
    return ModelManager_1.ModelManager.VehicleModel.Reset(), !0;
  }
  static SetRiderSharingEnable(e) {
    ModelManager_1.ModelManager.VehicleModel.IsForbidRiderSharing !== e ||
      ((ModelManager_1.ModelManager.VehicleModel.IsForbidRiderSharing = !e),
      Global_1.Global.BaseCharacter?.CharacterActorComponent?.Entity?.GetComponent(
        226,
      )
        ?.VehicleEntity?.GetComponent(234)
        ?.RefreshRideSharingSkillState(),
      e) ||
      this.OnRemoveVehicleRideSharing();
  }
  static $bl(e) {
    if (e.VehicleEntity)
      switch (e.VehicleType) {
        case "Gongduola":
          e.IsRolePassenger(!0) &&
            ModelManager_1.ModelManager.GameAudioModel.AddAllGondolaMusic(
              e.VehicleEntity,
            );
          break;
        case "FishingBoat":
          ModelManager_1.ModelManager.GameAudioModel.RegisterFishingAudioEvent();
      }
  }
  static zbl(e) {
    switch (e.VehicleType) {
      case "Gongduola":
        e.IsRolePassenger(!0) &&
          ModelManager_1.ModelManager.GameAudioModel.StopAllGondolaMusic();
        break;
      case "FishingBoat":
        ModelManager_1.ModelManager.GameAudioModel.RemoveFishingAudioEvent();
    }
  }
  static ToServerExitVehicleType(e) {
    switch (e) {
      case 1:
        return Protocol_1.Aki.Protocol.jw_.Proto_ExitVehicleTypeNormal;
      case 2:
        return Protocol_1.Aki.Protocol.jw_.Proto_ExitVehicleTypeDelayShow;
      default:
        return Protocol_1.Aki.Protocol.jw_.Proto_ExitVehicleTypeLaunch;
    }
  }
  static CJl(e) {
    switch (e) {
      case Protocol_1.Aki.Protocol.jw_.Proto_ExitVehicleTypeNormal:
        return 1;
      case Protocol_1.Aki.Protocol.jw_.Proto_ExitVehicleTypeDelayShow:
        return 2;
      default:
        return 0;
    }
  }
  static K6_(e) {
    return (
      ModelManager_1.ModelManager.CreatureModel.GetEntity(e) ??
      ModelManager_1.ModelManager.CreatureModel.GetEntityWithDelayRemoveContainer(
        e,
      ) ??
      ModelManager_1.ModelManager.CreatureModel.GetEntityWithPendingRemoveContainer(
        e,
      )
    );
  }
}
(exports.VehicleController = VehicleController),
  ((_a = VehicleController).mie = 0),
  (VehicleController.Kbl = void 0),
  (VehicleController.Q5_ = void 0),
  (VehicleController.VehicleUpdateNotify = (e) => {
    var t,
      a,
      r = ModelManager_1.ModelManager.SceneTeamModel.GetTeamPlayerData(e.W5n)
        ?.GetCurrentGroup()
        ?.GetCurrentRole()?.CreatureDataId;
    r
      ? (((t = new VehicleInfoDefines_1.ScenePlayerVehicleInfo()).PlayerId =
          e.W5n),
        (t.EntityCreatureId = r),
        (t.VehicleCreatureId = MathUtils_1.MathUtils.LongToNumber(e.F4n)),
        (t.Seat = e.fhl),
        (t.ExitType = _a.CJl(e.bI_)),
        ModelManager_1.ModelManager.VehicleModel.UpdatePlayerVehicleData(t),
        (r = ModelManager_1.ModelManager.CreatureModel.GetEntity(
          t.EntityCreatureId,
        )?.Entity),
        (a = ModelManager_1.ModelManager.CreatureModel.GetEntity(
          t.VehicleCreatureId,
        )?.Entity),
        _a.W5_(r, a, t.Seat, t.ExitType))
      : Log_1.Log.CheckError() &&
        Log_1.Log.Error(
          "Vehicle",
          50,
          "[VehicleController] 服务器下发载具数据更新时无法获取对应PlayerId的CreatureId",
          ["PlayerId", e.W5n],
          ["VehicleId", MathUtils_1.MathUtils.LongToNumber(e.F4n)],
          ["Seat", e.fhl],
        );
  }),
  (VehicleController.VehicleUpdateEntityNotify = (e) => {
    var t = new VehicleInfoDefines_1.EntityVehicleInfo();
    (t.EntityCreatureId = MathUtils_1.MathUtils.LongToNumber(e.F4n)),
      (t.VehicleCreatureId = MathUtils_1.MathUtils.LongToNumber(e.TI_)),
      (t.Seat = e.phl ? e.fhl : -1),
      (t.ExitType = _a.CJl(e.bI_)),
      _a.VehicleUpdateEntity(t);
  }),
  (VehicleController.OnEnterVehicle = (e) => {
    var t, a;
    _a.$bl(e),
      e.IsDriver &&
        e.IsRolePassenger(!0) &&
        ((_a.Kbl = e.VehicleEntity.GetComponent(233)),
        e.PassengerEntity.GetComponent(0).GetRoleId() > TRIAL_ROLE_ID ||
          (ModelManager_1.ModelManager.VehicleModel.IsReadyRiderSharing
            ? ((t = e.VehicleEntity?.GetComponent(231)),
              (a = e.PassengerEntity?.GetComponent(2)),
              Log_1.Log.CheckError() &&
                Log_1.Log.Error(
                  "Vehicle",
                  50,
                  "重复进入共乘玩法",
                  ["VehicleId", t?.CreatureData.GetPbDataId()],
                  ["PassengerId", a?.CreatureData.GetPbDataId()],
                  ["Seat", e.Seat],
                ))
            : ((ModelManager_1.ModelManager.VehicleModel.IsReadyRiderSharing =
                !0),
              EventSystem_1.EventSystem.Emit(
                EventDefine_1.EEventName.OnEnterVehicleRideSharing,
              ),
              Log_1.Log.CheckDebug() &&
                Log_1.Log.Debug("Vehicle", 50, "进入共乘玩法"),
              "Gongduola" === e.VehicleType &&
                e.VehicleEntity?.GetComponent(238)?.AddTagForPassenger(
                  e.PassengerEntity,
                  1,
                  1937468570,
                ))));
  }),
  (VehicleController.OnLeaveVehicle = (e) => {
    var t, a;
    _a.zbl(e),
      e.IsDriver &&
        e.IsRolePassenger(!0) &&
        ((_a.Kbl = void 0),
        (_a.mie = 0),
        e.PassengerEntity.GetComponent(0).GetRoleId() > TRIAL_ROLE_ID ||
          (ModelManager_1.ModelManager.VehicleModel.IsReadyRiderSharing
            ? (EventSystem_1.EventSystem.Emit(
                EventDefine_1.EEventName.OnLeaveVehicleRideSharing,
              ),
              ModelManager_1.ModelManager.VehicleModel.RideSharingInfo &&
                _a.OnRemoveVehicleRideSharing(),
              (ModelManager_1.ModelManager.VehicleModel.IsReadyRiderSharing =
                !1),
              Log_1.Log.CheckDebug() &&
                Log_1.Log.Debug("Vehicle", 50, "退出共乘玩法"),
              "Gongduola" === e.VehicleType &&
                e.VehicleEntity?.GetComponent(238)?.RemoveTagForPassenger(
                  e.PassengerEntity,
                  1,
                  1937468570,
                ))
            : ((t = e.VehicleEntity?.GetComponent(231)),
              (a = e.PassengerEntity?.GetComponent(2)),
              Log_1.Log.CheckError() &&
                Log_1.Log.Error(
                  "Vehicle",
                  50,
                  "离开载具前已退出共乘玩法",
                  ["VehicleId", t?.CreatureData.GetPbDataId()],
                  ["PassengerId", a?.CreatureData.GetPbDataId()],
                  ["Seat", e.Seat],
                ))));
  }),
  (VehicleController.OnChangeVehicleRideSharing = (e, t) => {
    var a,
      r,
      o =
        Global_1.Global.BaseCharacter?.CharacterActorComponent?.Entity.GetComponent(
          227,
        )?.VehicleEntity;
    o &&
      ModelManager_1.ModelManager.VehicleModel.IsReadyRiderSharing &&
      !ModelManager_1.ModelManager.VehicleModel.IsForbidRiderSharing &&
      ((o = o.GetComponent(230)),
      -1 !== (a = -1 !== t ? t : o.TryFindUsableSeat(!1))) &&
      ((r =
        ModelManager_1.ModelManager.VehicleModel.RideSharingInfo?.Seat ?? -1),
      !o?.SeatInfoMap.has(a) || a === r) &&
      (((o = Protocol_1.Aki.Protocol.vp_.create()).Q6n = e),
      (o.fhl = a),
      Net_1.Net.Call(28100, o, () => {}),
      Log_1.Log.CheckDebug()) &&
      Log_1.Log.Debug(
        "Vehicle",
        50,
        "发送共乘玩法Change通知",
        ["RoleId", e],
        ["Seat", t],
      );
  }),
  (VehicleController.OnRemoveVehicleRideSharing = () => {
    var e;
    ModelManager_1.ModelManager.VehicleModel.IsReadyRiderSharing &&
      ModelManager_1.ModelManager.VehicleModel.RideSharingInfo &&
      (((e = Protocol_1.Aki.Protocol.Sp_.create()).Q6n =
        ModelManager_1.ModelManager.VehicleModel.RideSharingInfo.RoleId),
      Net_1.Net.Call(28300, e, () => {}),
      Log_1.Log.CheckDebug()) &&
      Log_1.Log.Debug("Vehicle", 50, "发送共乘玩法Remove通知", [
        "RoleId",
        e.Q6n,
      ]);
  }),
  (VehicleController.OnUpdateVehicleRideSharingNotify = (e) => {
    var t, a;
    e.Q6n
      ? (((t = new VehicleInfoDefines_1.VehicleRideSharingInfo()).PlayerId =
          e.W5n),
        (t.RoleId = e.Q6n),
        (t.Seat = e.fhl),
        (t.RoleCreatureId = MathUtils_1.MathUtils.LongToNumber(e.F4n)),
        (ModelManager_1.ModelManager.VehicleModel.RideSharingInfo = t),
        EventSystem_1.EventSystem.Emit(
          EventDefine_1.EEventName.OnChangeRideSharingPassengerResponse,
          t.RoleId,
        ))
      : ((t = ModelManager_1.ModelManager.VehicleModel.RideSharingInfo.RoleId),
        (a =
          ModelManager_1.ModelManager.VehicleModel.RideSharingInfo
            .RoleCreatureId),
        EventSystem_1.EventSystem.Emit(
          EventDefine_1.EEventName.OnRemoveRideSharingPassengerResponse,
          t,
        ),
        (ModelManager_1.ModelManager.VehicleModel.RideSharingInfo = void 0),
        (t =
          ModelManager_1.ModelManager.VehicleModel.GetEntityVehicleData(a)) &&
          (((a = t.DeepCopy()).Seat = -1),
          ModelManager_1.ModelManager.VehicleModel.UpdateEntityVehicleData(a))),
      Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug("Vehicle", 50, "收到共乘玩法UpdateNotify", [
          "RoleId",
          e.Q6n,
        ]);
  }),
  (VehicleController.OnChangeRole = (e, t) => {
    var a,
      r,
      o,
      i = e.Entity.GetComponent(0),
      l = ModelManager_1.ModelManager.VehicleModel.GetPlayerVehicleData(
        i.GetPlayerId(),
      );
    l?.VehicleCreatureId &&
      l.EntityCreatureId !== i.GetCreatureDataId() &&
      ((a = l.DeepCopy()),
      (r = l.DeepCopy()),
      (o = _a.K6_(l.EntityCreatureId)?.Entity),
      (l = ModelManager_1.ModelManager.CreatureModel.GetEntity(
        l.VehicleCreatureId,
      )?.Entity),
      (r.VehicleCreatureId = 0),
      ModelManager_1.ModelManager.VehicleModel.UpdatePlayerVehicleData(r),
      _a.W5_(o, l, -1, 1),
      (a.EntityCreatureId = i.GetCreatureDataId()),
      ModelManager_1.ModelManager.VehicleModel.UpdatePlayerVehicleData(a),
      _a.W5_(e.Entity, l, a.Seat));
  });
//# sourceMappingURL=VehicleController.js.map
