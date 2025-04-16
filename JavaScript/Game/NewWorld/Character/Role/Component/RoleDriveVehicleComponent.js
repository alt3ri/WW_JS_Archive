"use strict";
var __decorate =
  (this && this.__decorate) ||
  function (e, t, i, s) {
    var r,
      n = arguments.length,
      h =
        n < 3
          ? t
          : null === s
            ? (s = Object.getOwnPropertyDescriptor(t, i))
            : s;
    if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
      h = Reflect.decorate(e, t, i, s);
    else
      for (var o = e.length - 1; 0 <= o; o--)
        (r = e[o]) && (h = (n < 3 ? r(h) : 3 < n ? r(t, i, h) : r(t, i)) || h);
    return 3 < n && h && Object.defineProperty(t, i, h), h;
  };
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RoleDriveVehicleComponent = void 0);
const RegisterComponent_1 = require("../../../../../Core/Entity/RegisterComponent"),
  TimerSystem_1 = require("../../../../../Core/Timer/TimerSystem"),
  MathUtils_1 = require("../../../../../Core/Utils/MathUtils"),
  EventDefine_1 = require("../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../Common/Event/EventSystem"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  GravityUtils_1 = require("../../../../Utils/GravityUtils"),
  BasePlatform_1 = require("../../../Common/BasePlatform"),
  VehicleConfig_1 = require("../../../Vehicle/Common/VehicleConfig"),
  VehicleController_1 = require("../../../Vehicle/Controller/VehicleController"),
  CharacterDriveVehicleComponent_1 = require("../../Common/Component/CharacterDriveVehicleComponent"),
  BOUNCE_SKILL_ID = 400104;
let RoleDriveVehicleComponent = class RoleDriveVehicleComponent extends CharacterDriveVehicleComponent_1.CharacterDriveVehicleComponent {
  constructor() {
    super(...arguments),
      (this.ParaglidingDelayHandle = void 0),
      (this.PlatformActorToIgnore = void 0),
      (this.GuaranteeBounceSkillEndHandle = void 0),
      (this.OnParaglidingDelayFinish = () => {
        var e;
        this.Entity?.Valid &&
          ((this.ParaglidingDelayHandle = void 0),
          this.TagComp?.RemoveTag(-1747001544),
          (e = this.ActorComp.CreatureData.GetPlayerId()),
          ModelManager_1.ModelManager.SceneTeamModel.GetTeamItem(e, {
            ParamType: 2,
            IsControl: !0,
          })
            ?.EntityHandle?.Entity?.GetComponent(176)
            ?.TrySetGlide());
      }),
      (this.GuaranteeBounceSkillEnd = () => {
        this.Entity?.Valid &&
          ((this.GuaranteeBounceSkillEndHandle = void 0),
          EventSystem_1.EventSystem.Has(
            EventDefine_1.EEventName.OnSkillEnd,
            this.OnBounceSkillEnd,
          )) &&
          (EventSystem_1.EventSystem.Remove(
            EventDefine_1.EEventName.OnSkillEnd,
            this.OnBounceSkillEnd,
          ),
          this.RestoreSwimAndCollision());
      }),
      (this.OnBounceSkillEnd = (e, t) => {
        t === BOUNCE_SKILL_ID &&
          (EventSystem_1.EventSystem.Remove(
            EventDefine_1.EEventName.OnSkillEnd,
            this.OnBounceSkillEnd,
          ),
          this.GuaranteeBounceSkillEndHandle) &&
          (TimerSystem_1.TimerSystem.Remove(this.GuaranteeBounceSkillEndHandle),
          (this.GuaranteeBounceSkillEndHandle = void 0),
          this.RestoreSwimAndCollision());
      }),
      (this.OnChangeRideSharingResponse = (e) => {
        this.TagComp?.AddTag(-1296410005);
      }),
      (this.OnRemoveRideSharingResponse = (e) => {
        this.TagComp?.RemoveTag(-1296410005);
      });
  }
  OnPostActivate() {
    VehicleController_1.VehicleController.OnCharacterActivate(this.Entity);
  }
  OnTick(e) {
    var t;
    this.IsOnVehicle ||
      ((t = this.ActorComp.Actor.BasedMovement),
      BasePlatform_1.BasePlatformController.GetBasePlatformByBasedMovementInfo(
        t,
      ) instanceof BasePlatform_1.VehicleBasePlatform
        ? this.SetWaterEffect(!1)
        : this.SetWaterEffect(!0));
  }
  OnEnd() {
    return (
      EventSystem_1.EventSystem.Has(
        EventDefine_1.EEventName.OnSkillEnd,
        this.OnBounceSkillEnd,
      ) &&
        EventSystem_1.EventSystem.Remove(
          EventDefine_1.EEventName.OnSkillEnd,
          this.OnBounceSkillEnd,
        ),
      this.ParaglidingDelayHandle &&
        TimerSystem_1.TimerSystem.Remove(this.ParaglidingDelayHandle),
      (this.ParaglidingDelayHandle = void 0),
      this.GuaranteeBounceSkillEndHandle &&
        TimerSystem_1.TimerSystem.Remove(this.GuaranteeBounceSkillEndHandle),
      (this.GuaranteeBounceSkillEndHandle = void 0),
      super.OnEnd()
    );
  }
  OnEnterVehicle(e) {
    super.OnEnterVehicle(e),
      e.IsDriver && e.IsRolePassenger(!0) && this.AddRideSharingEvents();
  }
  OnLeaveVehicle(e) {
    e.IsDriver && e.IsRolePassenger(!0) && this.RemoveRideSharingEvents(),
      super.OnLeaveVehicle(e);
  }
  PostEnterVehiclePerform(e) {
    super.PostEnterVehiclePerform(e);
    e = this.ActorComp.CreatureData.GetRoleConfig()?.RoleBody;
    this.TagComp.AddTag(this.GetBodyTagFromBodyType(e)),
      this.TagComp.AddTag(525255941);
  }
  LeaveVehiclePerform(e) {
    var t = this.ActorComp.CreatureData.GetRoleConfig()?.RoleBody;
    this.TagComp.RemoveTag(this.GetBodyTagFromBodyType(t)),
      this.TagComp.RemoveTag(525255941),
      super.LeaveVehiclePerform(e),
      0 === e.ExitType && this.JumpToAirAndParagliding(e);
  }
  JumpToAirAndParagliding(e) {
    var t,
      i,
      s,
      r,
      n = e.PassengerEntity?.GetComponent(2);
    n &&
      (n.Actor.KuroSetMovementMode({
        Mode: 3,
        Context: "[RoleDriveVehicleComponent.JumpToAirAndParagliding]",
      }),
      (n = e.VehicleEntity?.GetComponent(230))) &&
      ((r =
        (n.Config?.BounceTime ?? VehicleConfig_1.DEFAULT_BOUNCE_TIME) *
        MathUtils_1.MathUtils.MillisecondToSecond),
      (s = n.Config?.BounceHeight ?? VehicleConfig_1.DEFAULT_BOUNCE_HEIGHT),
      (t = n.Config?.BounceCurve ?? VehicleConfig_1.DEFAULT_BOUNCE_CURVE),
      (i = this.Entity.GetComponent(29)),
      n?.GetVehicleVelocity(this.TmpVector1),
      this.TmpVector1.MultiplyEqual(0.5 * r),
      GravityUtils_1.GravityUtils.ConvertToPlanarVectorForActor(
        this.ActorComp,
        this.TmpVector1,
      ),
      i?.StartBounceWithHorizontalOffset(s, this.TmpVector1, r, t)) &&
      (this.TagComp?.AddTag(464607714),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnSkillEnd,
        this.OnBounceSkillEnd,
      ),
      "NpcVehicle" === n.VehicleType
        ? ((i = e.VehicleEntity?.GetComponent(3)),
          (this.PlatformActorToIgnore = i?.Actor))
        : ((s = e.VehicleEntity?.GetComponent(231)),
          (this.PlatformActorToIgnore = s?.Actor.PlatformActor)),
      this.PlatformActorToIgnore?.IsValid() &&
        this.ActorComp?.Actor.IgnoreActorWhenMoving(
          this.PlatformActorToIgnore,
          !0,
          !0,
        ),
      (r =
        n.Config?.ParaglidingDelayTime ??
        VehicleConfig_1.PARAGLIDING_DELAY_MILISECONDS),
      this.TagComp?.AddTag(-1747001544),
      (this.ParaglidingDelayHandle = TimerSystem_1.TimerSystem.Delay(
        this.OnParaglidingDelayFinish,
        r,
      )),
      (this.GuaranteeBounceSkillEndHandle = TimerSystem_1.TimerSystem.Delay(
        this.GuaranteeBounceSkillEnd,
        r,
      )));
  }
  RestoreSwimAndCollision() {
    this.Entity?.Valid &&
      (this.TagComp?.RemoveTag(464607714),
      this.PlatformActorToIgnore?.IsValid()) &&
      (this.ActorComp?.Actor.IgnoreActorWhenMoving(
        this.PlatformActorToIgnore,
        !1,
        !0,
      ),
      (this.PlatformActorToIgnore = void 0));
  }
  ClearCurrentState() {
    this.Entity.GetComponent(39)?.EndOwnerAndFollowSkills(),
      this.TagComp?.RemoveTag(-1523054094),
      super.ClearCurrentState();
  }
  AddRideSharingEvents() {
    this.ActorComp?.IsRoleAndCtrlByMe &&
      (EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnChangeRideSharingPassengerResponse,
        this.OnChangeRideSharingResponse,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnRemoveRideSharingPassengerResponse,
        this.OnRemoveRideSharingResponse,
      ));
  }
  RemoveRideSharingEvents() {
    this.ActorComp?.IsRoleAndCtrlByMe &&
      (EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnChangeRideSharingPassengerResponse,
        this.OnChangeRideSharingResponse,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnRemoveRideSharingPassengerResponse,
        this.OnRemoveRideSharingResponse,
      ));
  }
  GetBodyTagFromBodyType(e) {
    switch (e) {
      case "FemaleS":
        return 1790413286;
      case "FemaleM":
        return -1826297010;
      case "FemaleXL":
        return -113743209;
      case "FemaleMS":
        return -271538568;
      case "MaleS":
        return 1260157389;
      case "MaleM":
        return -1568691815;
      case "MaleXL":
        return -1152048753;
      default:
        return;
    }
  }
};
(RoleDriveVehicleComponent = __decorate(
  [(0, RegisterComponent_1.RegisterComponent)(227)],
  RoleDriveVehicleComponent,
)),
  (exports.RoleDriveVehicleComponent = RoleDriveVehicleComponent);
//# sourceMappingURL=RoleDriveVehicleComponent.js.map
