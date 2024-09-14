"use strict";
var PawnAdsorbComponent_1,
  __decorate =
    (this && this.__decorate) ||
    function (t, i, e, s) {
      var o,
        h = arguments.length,
        n =
          h < 3
            ? i
            : null === s
              ? (s = Object.getOwnPropertyDescriptor(i, e))
              : s;
      if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
        n = Reflect.decorate(t, i, e, s);
      else
        for (var r = t.length - 1; 0 <= r; r--)
          (o = t[r]) &&
            (n = (h < 3 ? o(n) : 3 < h ? o(i, e, n) : o(i, e)) || n);
      return 3 < h && n && Object.defineProperty(i, e, n), n;
    };
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.PawnAdsorbComponent = void 0);
const Log_1 = require("../../../../Core/Common/Log"),
  Time_1 = require("../../../../Core/Common/Time"),
  Protocol_1 = require("../../../../Core/Define/Net/Protocol"),
  EntityComponent_1 = require("../../../../Core/Entity/EntityComponent"),
  RegisterComponent_1 = require("../../../../Core/Entity/RegisterComponent"),
  Vector_1 = require("../../../../Core/Utils/Math/Vector"),
  MathUtils_1 = require("../../../../Core/Utils/MathUtils"),
  IComponent_1 = require("../../../../UniverseEditor/Interface/IComponent"),
  EventDefine_1 = require("../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../Common/Event/EventSystem"),
  TimeUtil_1 = require("../../../Common/TimeUtil"),
  Global_1 = require("../../../Global"),
  LevelGamePlayController_1 = require("../../../LevelGamePlay/LevelGamePlayController"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  CombatMessage_1 = require("../../../Module/CombatMessage/CombatMessage"),
  SENSORY_RANGE = 1500,
  MAX_SPEED = 1500,
  NORMALIZE = 0.01,
  CONDITION_CHECK_TIME = 2e3;
let PawnAdsorbComponent =
  (PawnAdsorbComponent_1 = class PawnAdsorbComponent extends (
    EntityComponent_1.EntityComponent
  ) {
    constructor() {
      super(...arguments),
        (this.Hte = void 0),
        (this.xsn = void 0),
        (this.wsn = void 0),
        (this.Bsn = -0),
        (this.bsn = -0),
        (this.qsn = -0),
        (this.Gsn = void 0),
        (this.fgt = void 0),
        (this.Nsn = !1),
        (this.Osn = !1),
        (this.ksn = !1),
        (this.Fsn = void 0),
        (this.LHo = void 0),
        (this.Vsn = void 0),
        (this.Hsn = -0),
        (this.jsn = -0),
        (this.Wsn = !1),
        (this.Ksn = -0),
        (this.rzr = void 0),
        (this.IsInSensoryRange = !1),
        (this.Rjt = !1),
        (this.Mne = 0),
        (this.Qsn = void 0),
        (this.Xsn = 0),
        (this.$sn = !1),
        (this.Ysn = !1),
        (this.Jsn = () => {
          this.IsInSensoryRange = !0;
        }),
        (this.vzr = () => {
          this.IsInSensoryRange = !1;
        }),
        (this.gIe = (t, i) => {
          !this.Nsn && this.wsn && ((this.Rjt = !!i), this.xk());
        });
    }
    OnInitData(t) {
      t = t.GetParam(PawnAdsorbComponent_1)[0];
      return (
        (this.Bsn = t.Range),
        (this.bsn = t.StartVelocity),
        (this.qsn = t.Acceleration),
        (this.rzr = this.Entity.GetComponent(109)),
        this.rzr.SetLogicRange(SENSORY_RANGE),
        this.Ore(),
        !0
      );
    }
    OnStart() {
      if (((this.Hte = this.Entity.GetComponent(1)), !this.Hte))
        return (
          Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "Interaction",
              30,
              "[PawnAdsorbComponent.OnStart] 吸收组件初始化失败 Actor Component Undefined",
            ),
          !1
        );
      if (((this.xsn = this.Entity.GetComponent(106)), !this.xsn))
        return (
          Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "Interaction",
              30,
              "[PawnAdsorbComponent.OnStart] 吸收组件初始化失败 Pawn Interact Component Undefined",
            ),
          !1
        );
      var t = this.Hte.CreatureData,
        i = t.GetPbEntityInitData();
      if (!i)
        return (
          Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "Interaction",
              30,
              "[PawnAdsorbComponent.OnStart] 吸收组件初始化失败 Config Invalid",
              ["CreatureGenID:", t.GetOwnerId()],
              ["PbDataId:", t.GetPbDataId()],
            ),
          !1
        );
      this.Mne = t.GetPbDataId();
      t = t.GetBaseInfo();
      if (
        ((this.Qsn = t.OnlineInteractType ?? 0),
        (this.wsn = this.Entity.GetComponent(181)),
        !this.wsn)
      )
        return (
          Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "Interaction",
              30,
              "[PawnAdsorbComponent.OnStart] 吸收组件初始化失败 LevelTagComponent Undefined",
              ["EntityConfigID:", this.Mne],
            ),
          !1
        );
      this.wsn.HasTag(-662723379) && (this.Rjt = !0);
      t = ((this.Ksn = 0), IComponent_1.getComponent)(
        i.ComponentsData,
        "InteractComponent",
      );
      return (
        t && (this.Ksn = t.Range * t.Range),
        (this.fgt = Vector_1.Vector.Create()),
        (this.Fsn = Vector_1.Vector.Create()),
        (this.LHo = Vector_1.Vector.Create()),
        (this.Vsn = Vector_1.Vector.Create()),
        (this.Hsn = 0),
        !(this.jsn = 0)
      );
    }
    OnTick(t) {
      this.Rjt ||
        this.ksn ||
        (this.zsn() &&
          this.Zsn() &&
          (this.Nsn || this.ean(),
          this.ian(t),
          Vector_1.Vector.DistSquared(
            this.Hte.ActorLocationProxy,
            this.Gsn.ActorLocationProxy,
          ) < this.Ksn) &&
          (this.oan(), this.ran(), this.nan(), this.xsn.ForceUpdate()));
    }
    nan() {
      var t = Protocol_1.Aki.Protocol.tcs.create(),
        i = ((t.iVn = new Array()), Protocol_1.Aki.Protocol.o4s.create()),
        e =
          ((i.P5n = Protocol_1.Aki.Protocol.Gks.create()),
          (i.g8n = Protocol_1.Aki.Protocol.D2s.create()),
          this.Hte.ActorLocationProxy),
        s = this.Hte.ActorRotationProxy;
      (i.P5n.X = e.X),
        (i.P5n.Y = e.Y),
        (i.P5n.Z = e.Z),
        (i.g8n.Pitch = s.Pitch),
        (i.g8n.Roll = s.Roll),
        (i.g8n.Yaw = s.Yaw),
        (i.J8n = Time_1.Time.NowSeconds),
        t.iVn.push(i),
        CombatMessage_1.CombatNet.Send(22496, this.Entity, t);
    }
    OnEnd() {
      return this.kre(), !0;
    }
    zsn() {
      var t, i;
      return (
        !(!this.Nsn && !this.$sn) ||
        (!(
          !this.Hte ||
          !Global_1.Global.BaseCharacter ||
          !(t = Global_1.Global.BaseCharacter.CharacterActorComponent)
        ) &&
          ((i = this.Hte.ActorLocationProxy),
          (t = t.ActorLocationProxy),
          (i = Vector_1.Vector.DistSquared(i, t)),
          (this.Wsn = i <= this.Bsn * this.Bsn),
          this.Wsn))
      );
    }
    san() {
      return (
        ModelManager_1.ModelManager.PlayerInfoModel.GetId() ===
        ModelManager_1.ModelManager.CreatureModel.GetWorldOwner()
      );
    }
    Zsn() {
      if (!ModelManager_1.ModelManager.GameModeModel.IsMulti) return !0;
      switch (this.Qsn) {
        case 2:
          return !1;
        case 0:
          return this.san();
        case 1:
          return this.aan(), this.Ysn;
        default:
          return (
            Log_1.Log.CheckError() &&
              Log_1.Log.Error(
                "Interaction",
                30,
                "[PawnAdsorbComponent] 不支持的联机模式配置",
              ),
            !1
          );
      }
    }
    aan() {
      var t = TimeUtil_1.TimeUtil.GetServerTimeStamp();
      t - this.Xsn > CONDITION_CHECK_TIME &&
        ((this.$sn = !0),
        LevelGamePlayController_1.LevelGamePlayController.EntityAdsorbRequest(
          this.Mne,
          (t) => {
            t &&
              (t.Q4n === Protocol_1.Aki.Protocol.Q4n.KRs && (this.Ysn = !0),
              (this.$sn = !1));
          },
        ),
        (this.Xsn = t));
    }
    ean() {
      if (!this.Nsn && !this.ksn) {
        if (!Global_1.Global.BaseCharacter) return !1;
        if (
          ((this.Gsn = Global_1.Global.BaseCharacter.CharacterActorComponent),
          !this.Hte.Owner.IsValid() || !this.Gsn.Owner.IsValid())
        )
          return !1;
        var t = this.Hte.ActorLocationProxy;
        this.Gsn.ActorLocationProxy.Subtraction(t, this.fgt),
          this.fgt.Normalize(NORMALIZE),
          (this.Vsn = this.fgt.MultiplyEqual(this.bsn)),
          (this.Hsn = this.bsn),
          (this.jsn = 0),
          (this.Nsn = !0);
      }
      return !0;
    }
    ian(t) {
      var i;
      this.Nsn &&
        !this.ksn &&
        Global_1.Global.BaseCharacter &&
        ((this.Gsn = Global_1.Global.BaseCharacter.CharacterActorComponent),
        this.Hte.Owner.IsValid()) &&
        this.Gsn.Owner.IsValid() &&
        ((i = this.Hte.ActorLocationProxy),
        this.Gsn.ActorLocationProxy.Subtraction(i, this.fgt),
        this.fgt.Normalize(NORMALIZE),
        (i = t * MathUtils_1.MathUtils.MillisecondToSecond),
        (this.jsn = this.qsn * i),
        (this.Hsn += this.jsn),
        this.Vsn.DeepCopy(this.fgt),
        this.Hsn > MAX_SPEED
          ? ((this.Hsn = MAX_SPEED), this.Vsn.MultiplyEqual(MAX_SPEED))
          : this.Vsn.MultiplyEqual(this.Hsn),
        this.Vsn.Multiply(i, this.Fsn),
        (t = this.Entity.GetComponent(38))
          ? t.MoveCharacter(this.Fsn, i, "Pawn吸附更新")
          : this.Hte.AddActorWorldOffset(
              this.Fsn.ToUeVector(),
              "Pawn吸附更新",
              !0,
            ));
    }
    ran() {
      this.Osn || (this.wsn?.AddTag(1286772724), (this.Osn = !0));
    }
    oan() {
      Global_1.Global.BaseCharacter &&
        ((this.Gsn = Global_1.Global.BaseCharacter.CharacterActorComponent),
        this.Hte.Owner.IsValid()) &&
        this.Gsn.Owner.IsValid() &&
        (this.Hte.Owner.K2_AttachToActor(this.Gsn.Owner, void 0, 2, 1, 1, !1),
        this.fgt.DeepCopy(Vector_1.Vector.ZeroVectorProxy),
        this.Vsn.DeepCopy(Vector_1.Vector.ZeroVectorProxy),
        (this.Hsn = 0),
        (this.jsn = 0),
        (this.ksn = !0));
    }
    Ore() {
      EventSystem_1.EventSystem.AddWithTarget(
        this.Entity,
        EventDefine_1.EEventName.EnterLogicRange,
        this.Jsn,
      ),
        EventSystem_1.EventSystem.AddWithTarget(
          this.Entity,
          EventDefine_1.EEventName.LeaveLogicRange,
          this.vzr,
        ),
        this.wsn?.AddTagAddOrRemoveListener(-662723379, this.gIe);
    }
    kre() {
      EventSystem_1.EventSystem.RemoveWithTarget(
        this.Entity,
        EventDefine_1.EEventName.EnterLogicRange,
        this.Jsn,
      ),
        EventSystem_1.EventSystem.RemoveWithTarget(
          this.Entity,
          EventDefine_1.EEventName.LeaveLogicRange,
          this.vzr,
        ),
        this.wsn?.RemoveTagAddOrRemoveListener(-662723379, this.gIe);
    }
    xk() {
      this.fgt.DeepCopy(Vector_1.Vector.ZeroVectorProxy),
        this.Fsn.DeepCopy(Vector_1.Vector.ZeroVectorProxy),
        this.LHo.DeepCopy(Vector_1.Vector.ZeroVectorProxy),
        this.Vsn.DeepCopy(Vector_1.Vector.ZeroVectorProxy),
        (this.Hsn = 0),
        (this.jsn = 0);
    }
  });
(PawnAdsorbComponent = PawnAdsorbComponent_1 =
  __decorate(
    [(0, RegisterComponent_1.RegisterComponent)(103)],
    PawnAdsorbComponent,
  )),
  (exports.PawnAdsorbComponent = PawnAdsorbComponent);
//# sourceMappingURL=PawnAdsorbComponent.js.map
