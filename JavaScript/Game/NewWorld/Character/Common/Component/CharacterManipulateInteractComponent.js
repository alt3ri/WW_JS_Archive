"use strict";
var CharacterManipulateInteractComponent_1,
  __decorate =
    (this && this.__decorate) ||
    function (t, e, i, r) {
      var a,
        o = arguments.length,
        s =
          o < 3
            ? e
            : null === r
              ? (r = Object.getOwnPropertyDescriptor(e, i))
              : r;
      if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
        s = Reflect.decorate(t, e, i, r);
      else
        for (var n = t.length - 1; 0 <= n; n--)
          (a = t[n]) &&
            (s = (o < 3 ? a(s) : 3 < o ? a(e, i, s) : a(e, i)) || s);
      return 3 < o && s && Object.defineProperty(e, i, s), s;
    };
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CharacterManipulateInteractComponent = void 0);
const UE = require("ue"),
  Log_1 = require("../../../../../Core/Common/Log"),
  CommonParamById_1 = require("../../../../../Core/Define/ConfigCommon/CommonParamById"),
  Protocol_1 = require("../../../../../Core/Define/Net/Protocol"),
  QueryTypeDefine_1 = require("../../../../../Core/Define/QueryTypeDefine"),
  EntityComponent_1 = require("../../../../../Core/Entity/EntityComponent"),
  RegisterComponent_1 = require("../../../../../Core/Entity/RegisterComponent"),
  Net_1 = require("../../../../../Core/Net/Net"),
  TimerSystem_1 = require("../../../../../Core/Timer/TimerSystem"),
  Vector_1 = require("../../../../../Core/Utils/Math/Vector"),
  MathUtils_1 = require("../../../../../Core/Utils/MathUtils"),
  TraceElementCommon_1 = require("../../../../../Core/Utils/TraceElementCommon"),
  CameraController_1 = require("../../../../Camera/CameraController"),
  EventDefine_1 = require("../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../Common/Event/EventSystem"),
  EffectContext_1 = require("../../../../Effect/EffectContext/EffectContext"),
  EffectSystem_1 = require("../../../../Effect/EffectSystem"),
  Global_1 = require("../../../../Global"),
  GlobalData_1 = require("../../../../GlobalData"),
  ControllerHolder_1 = require("../../../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  CharacterBuffIds_1 = require("./Abilities/CharacterBuffIds"),
  PROFILE_KEY = "CharacterManipulateInteractComponent_RefreshTarget",
  MANIPULATE_VISION_ID = 1003,
  SPHERE_TRACE_RADIUS = 1;
let CharacterManipulateInteractComponent =
  (CharacterManipulateInteractComponent_1 = class CharacterManipulateInteractComponent extends (
    EntityComponent_1.EntityComponent
  ) {
    constructor() {
      super(...arguments),
        (this.Hte = void 0),
        (this.Lie = void 0),
        (this.$zo = void 0),
        (this.EIe = void 0),
        (this.$7r = new Set()),
        (this.gri = void 0),
        (this.bsr = void 0),
        (this.Y7r = void 0),
        (this.J7r = void 0),
        (this.z7r = !0),
        (this.Z7r = !0),
        (this.tat = void 0),
        (this.iHr = void 0),
        (this.Bbn = void 0),
        (this.oHr = !1),
        (this.rHr = void 0),
        (this.nHr = void 0),
        (this.aHr = (t, e) => {
          this.nHr = e ? this.Y7r : void 0;
        });
    }
    set hHr(t) {
      this.lHr(void 0 !== t && this.z7r),
        (this.Y7r === t && this.Z7r === this.z7r) ||
          (EventSystem_1.EventSystem.Emit(
            EventDefine_1.EEventName.OnManipulateSwitchToNewTarget,
            void 0 !== t && this.z7r,
            t?.Entity,
            !1,
          ),
          this.Y7r?.ChangeManipulateInteractPointState(0),
          (this.Y7r = t),
          (this.Z7r = this.z7r),
          this.Y7r?.ChangeManipulateInteractPointState(this.z7r ? 1 : 2)),
        (this.z7r = !0);
    }
    get hHr() {
      return this.Y7r;
    }
    OnStart() {
      return (
        (this.Hte = this.Entity.GetComponent(3)),
        (this.Lie = this.Entity.GetComponent(190)),
        (this.$zo = this.Entity.GetComponent(160)),
        (this.EIe = this.Entity.GetComponent(0)),
        (this.gri =
          CameraController_1.CameraController.FightCamera.GetComponent(5)),
        (this.tat = CommonParamById_1.configCommonParamById.GetStringConfig(
          "ManipulateInteractEffectPath",
        )),
        (this.Bbn = ModelManager_1.ModelManager.ManipulateInteractModel),
        this.InitTraceInfo(),
        this.dde(),
        !0
      );
    }
    OnTick(t) {
      this._Hr(-581520176, 0 < this.Bbn.InRangePoints.size),
        this.uHr()
          ? this.cHr()
          : (this.mHr(),
            this.Lie.HasTag(-581520176) && this._Hr(-1734324611, !0));
    }
    cHr() {
      if (this.Bbn.InRangePoints.size <= 0)
        (this.hHr = void 0), this._Hr(-1734324611, !1);
      else {
        this.$7r.clear(),
          TraceElementCommon_1.TraceElementCommon.SetStartLocation(
            this.bsr,
            this.Hte.ActorLocation,
          );
        for (const r of this.Bbn.InRangePoints)
          r.IsLocked ||
            (r.CheckCondition()
              ? this.$7r.add(r)
              : this.hHr === r && this.mHr());
        let t = MathUtils_1.MathUtils.MaxFloat,
          e = void 0;
        for (const a of this.$7r) {
          var i = Vector_1.Vector.DistSquared(
            a.Location,
            this.Hte.ActorLocationProxy,
          );
          i < t && ((e = a), (t = i));
        }
        if (e)
          if (this.ProjectWorldLocationToScreenPosition(e.Location))
            return (
              TraceElementCommon_1.TraceElementCommon.SetEndLocation(
                this.bsr,
                e.Location.ToUeVector(),
              ),
              TraceElementCommon_1.TraceElementCommon.SphereTrace(
                this.bsr,
                PROFILE_KEY,
              ) && (this.z7r = !1),
              this._Hr(-1734324611, !this.z7r),
              this._Hr(-611134292, this.z7r),
              void (this.hHr = e)
            );
        this.hHr = void 0;
      }
    }
    ProjectWorldLocationToScreenPosition(t) {
      return this.gri.CheckPositionInScreen(
        t,
        this.gri.CameraAdjustController.CheckInScreenMinX,
        this.gri.CameraAdjustController.CheckInScreenMaxX,
        this.gri.CameraAdjustController.CheckInScreenMinY,
        this.gri.CameraAdjustController.CheckInScreenMaxY,
      );
    }
    uHr() {
      return !(
        Global_1.Global.BaseCharacter !== this.Hte.Actor ||
        (CharacterManipulateInteractComponent_1.dHr
          ? this.Lie.HasTag(283451623) ||
            !this.Lie.HasTag(-1898186757) ||
            ModelManager_1.ModelManager.SceneTeamModel.IsPhantomTeam
          : (ModelManager_1.ModelManager.RouletteModel.UnlockExploreSkillDataMap.has(
              MANIPULATE_VISION_ID,
            ) && (CharacterManipulateInteractComponent_1.dHr = !0),
            1))
      );
    }
    mHr() {
      this.hHr = void 0;
    }
    InitTraceInfo() {
      (this.bsr = UE.NewObject(UE.TraceSphereElement.StaticClass())),
        (this.bsr.WorldContextObject = this.Hte.Owner),
        (this.bsr.bIsSingle = !0),
        (this.bsr.bIgnoreSelf = !0),
        this.bsr.SetTraceTypeQuery(
          QueryTypeDefine_1.KuroTraceTypeQuery.Visible,
        ),
        (this.bsr.Radius = SPHERE_TRACE_RADIUS);
    }
    dde() {
      this.Lie?.Valid &&
        (this.rHr = this.Lie?.ListenForTagAddOrRemove(-182189170, this.aHr));
    }
    Cde() {
      this.rHr && this.rHr.EndTask();
    }
    lHr(t) {
      t
        ? this.Lie.HasTag(-611134292) || this.Lie.AddTag(-611134292)
        : this.Lie.HasTag(-611134292) && this.Lie.RemoveTag(-611134292);
    }
    OnClear() {
      return (this.Hte = void 0), (this.Lie = void 0), this.Cde(), !0;
    }
    StartInteract() {
      if (!this.Z7r) return !1;
      if (!this.nHr?.Valid && !this.Y7r?.Valid)
        return (
          Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "Character",
              32,
              "[CharacterManipulateInteractComponent.StartInteract] 当前没有选中任何目标",
            ),
          !1
        );
      if (this.oHr)
        return (
          Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "Character",
              32,
              "[CharacterManipulateInteractComponent.StartInteract] 当前角色已经在拉取巨物中",
            ),
          !1
        );
      (this.oHr = !0),
        this.Lie.AddTag(-1408007765),
        (this.J7r = this.nHr ?? this.Y7r),
        this.J7r?.ChangeManipulateInteractPointState(3);
      var t = this.Hte.CreatureData.GetRoleConfig().RoleBody;
      return (
        (this.iHr =
          "MaleXL" === t
            ? CharacterBuffIds_1.buffId.ManipulateInteractBuffIdMaleX
            : CharacterBuffIds_1.buffId.ManipulateInteractBuffId),
        this.$zo.AddBuff(this.iHr, {
          InstigatorId: this.EIe.GetCreatureDataId(),
          Level: 1,
          Reason: "[CharacterManipulateInteractComponent]",
        }),
        !0
      );
    }
    EndInteract() {
      (this.oHr = !1),
        this.Lie.RemoveTag(-1408007765),
        this.NQt(),
        this.iHr &&
          TimerSystem_1.TimerSystem.Delay(() => {
            this.$zo &&
              this.iHr &&
              (this.$zo.RemoveBuff(
                this.iHr,
                -1,
                "[CharacterManipulateInteractComponent]",
              ),
              (this.iHr = void 0));
          }, 200),
        this.J7r?.ChangeManipulateInteractPointState(0),
        this.CHr();
    }
    NQt() {
      var t,
        e = this.J7r?.Entity.GetComponent(1)?.ActorTransform;
      e &&
        (t = this.Hte?.ActorLocation) &&
        (e.SetRotation(
          new UE.Quat(
            UE.KismetMathLibrary.FindLookAtRotation(t, e.GetLocation()),
          ),
        ),
        EffectSystem_1.EffectSystem.SpawnEffect(
          GlobalData_1.GlobalData.World,
          e,
          this.tat,
          "[CharacterManipulateInteractComponent.SpawnEffect]",
          new EffectContext_1.EffectContext(this.Entity.Id),
        ));
    }
    CHr() {
      var t,
        e = this.J7r?.CreatureDataId;
      void 0 !== e &&
        (((t = Protocol_1.Aki.Protocol.Mts.create()).F4n =
          MathUtils_1.MathUtils.NumberToLong(e)),
        Net_1.Net.Call(28521, t, (t) => {
          (this.J7r = void 0),
            t.Cvs !== Protocol_1.Aki.Protocol.Q4n.KRs &&
              ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
                t.Cvs,
                20626,
              );
        }));
    }
    GetTargetLocation() {
      return this.J7r?.Location ?? this.hHr.Location;
    }
    _Hr(t, e) {
      !this.Lie.HasTag(t) && e
        ? this.Lie.AddTag(t)
        : this.Lie.HasTag(t) && !e && this.Lie.RemoveTag(t);
    }
    ClearTarget() {
      this.hHr = void 0;
    }
  });
(CharacterManipulateInteractComponent.dHr = !1),
  (CharacterManipulateInteractComponent =
    CharacterManipulateInteractComponent_1 =
      __decorate(
        [(0, RegisterComponent_1.RegisterComponent)(58)],
        CharacterManipulateInteractComponent,
      )),
  (exports.CharacterManipulateInteractComponent =
    CharacterManipulateInteractComponent);
//# sourceMappingURL=CharacterManipulateInteractComponent.js.map
