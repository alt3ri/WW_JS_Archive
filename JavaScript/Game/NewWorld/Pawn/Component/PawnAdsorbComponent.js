"use strict";
let PawnAdsorbComponent_1;
const __decorate =
  (this && this.__decorate) ||
  function (t, i, e, s) {
    let o;
    const n = arguments.length;
    let h =
      n < 3 ? i : s === null ? (s = Object.getOwnPropertyDescriptor(i, e)) : s;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
      h = Reflect.decorate(t, i, e, s);
    else
      for (let r = t.length - 1; r >= 0; r--)
        (o = t[r]) && (h = (n < 3 ? o(h) : n > 3 ? o(i, e, h) : o(i, e)) || h);
    return n > 3 && h && Object.defineProperty(i, e, h), h;
  };
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.PawnAdsorbComponent = void 0);
const Log_1 = require("../../../../Core/Common/Log");
const Time_1 = require("../../../../Core/Common/Time");
const Protocol_1 = require("../../../../Core/Define/Net/Protocol");
const EntityComponent_1 = require("../../../../Core/Entity/EntityComponent");
const Vector_1 = require("../../../../Core/Utils/Math/Vector");
const MathUtils_1 = require("../../../../Core/Utils/MathUtils");
const IComponent_1 = require("../../../../UniverseEditor/Interface/IComponent");
const RegisterComponent_1 = require("../../../../Core/Entity/RegisterComponent");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const TimeUtil_1 = require("../../../Common/TimeUtil");
const Global_1 = require("../../../Global");
const LevelGamePlayController_1 = require("../../../LevelGamePlay/LevelGamePlayController");
const ModelManager_1 = require("../../../Manager/ModelManager");
const CombatMessage_1 = require("../../../Module/CombatMessage/CombatMessage");
const SENSORY_RANGE = 1500;
const MAX_SPEED = 1500;
const NORMALIZE = 0.01;
const CONDITION_CHECK_TIME = 2e3;
let PawnAdsorbComponent =
  (PawnAdsorbComponent_1 = class PawnAdsorbComponent extends (
    EntityComponent_1.EntityComponent
  ) {
    constructor() {
      super(...arguments),
        (this.Hte = void 0),
        (this.Jsn = void 0),
        (this.zsn = void 0),
        (this.Zsn = -0),
        (this.ean = -0),
        (this.ian = -0),
        (this.oan = void 0),
        (this.nCt = void 0),
        (this.ran = !1),
        (this.nan = !1),
        (this.san = !1),
        (this.aan = void 0),
        (this.U7o = void 0),
        (this.han = void 0),
        (this.lan = -0),
        (this._an = -0),
        (this.uan = !1),
        (this.can = -0),
        (this.Izr = void 0),
        (this.IsInSensoryRange = !1),
        (this.RHt = !1),
        (this.Mne = 0),
        (this.man = void 0),
        (this.dan = 0),
        (this.Can = !1),
        (this.gan = !1),
        (this.fan = () => {
          this.IsInSensoryRange = !0;
        }),
        (this.Ozr = () => {
          this.IsInSensoryRange = !1;
        }),
        (this.gIe = (t, i) => {
          !this.ran &&
            this.zsn &&
            (t.includes(-662723379)
              ? ((this.RHt = !0), this.xk())
              : i.includes(-662723379) && ((this.RHt = !1), this.xk()));
        });
    }
    OnInitData(t) {
      t = t.GetParam(PawnAdsorbComponent_1)[0];
      return (
        (this.Zsn = t.Range),
        (this.ean = t.StartVelocity),
        (this.ian = t.Acceleration),
        (this.Izr = this.Entity.GetComponent(106)),
        this.Izr.SetLogicRange(SENSORY_RANGE),
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
      if (((this.Jsn = this.Entity.GetComponent(103)), !this.Jsn))
        return (
          Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "Interaction",
              30,
              "[PawnAdsorbComponent.OnStart] 吸收组件初始化失败 Pawn Interact Component Undefined",
            ),
          !1
        );
      let t = this.Hte.CreatureData;
      const i = t.GetPbEntityInitData();
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
        ((this.man = t.OnlineInteractType ?? 0),
        (this.zsn = this.Entity.GetComponent(177)),
        !this.zsn)
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
      this.zsn.HasTag(-662723379) && (this.RHt = !0);
      t = ((this.can = 0), IComponent_1.getComponent)(
        i.ComponentsData,
        "InteractComponent",
      );
      return (
        t && (this.can = t.Range * t.Range),
        (this.nCt = Vector_1.Vector.Create()),
        (this.aan = Vector_1.Vector.Create()),
        (this.U7o = Vector_1.Vector.Create()),
        (this.han = Vector_1.Vector.Create()),
        (this.lan = 0),
        !(this._an = 0)
      );
    }
    OnTick(t) {
      this.RHt ||
        this.san ||
        (this.van() &&
          this.Man() &&
          (this.ran || this.San(),
          this.Ean(t),
          Vector_1.Vector.DistSquared(
            this.Hte.ActorLocationProxy,
            this.oan.ActorLocationProxy,
          ) < this.can) &&
          (this.yan(), this.Ian(), this.Tan(), this.Jsn.ForceUpdate()));
    }
    Tan() {
      const t = Protocol_1.Aki.Protocol.els.create();
      const i = ((t.m4n = new Array()), Protocol_1.Aki.Protocol.hOs.create());
      const e =
        ((i.$kn = Protocol_1.Aki.Protocol.VBs.create()),
        (i.D3n = Protocol_1.Aki.Protocol.iws.create()),
        this.Hte.ActorLocationProxy);
      const s = this.Hte.ActorRotationProxy;
      (i.$kn.X = e.X),
        (i.$kn.Y = e.Y),
        (i.$kn.Z = e.Z),
        (i.D3n.Pitch = s.Pitch),
        (i.D3n.Roll = s.Roll),
        (i.D3n.Yaw = s.Yaw),
        (i.h4n = Time_1.Time.NowSeconds),
        t.m4n.push(i),
        CombatMessage_1.CombatNet.Send(26540, this.Entity, t);
    }
    OnEnd() {
      return this.kre(), !0;
    }
    van() {
      let t, i;
      return (
        !(!this.ran && !this.Can) ||
        (!(
          !this.Hte ||
          !Global_1.Global.BaseCharacter ||
          !(t = Global_1.Global.BaseCharacter.CharacterActorComponent)
        ) &&
          ((i = this.Hte.ActorLocationProxy),
          (t = t.ActorLocationProxy),
          (i = Vector_1.Vector.DistSquared(i, t)),
          (this.uan = i <= this.Zsn * this.Zsn),
          this.uan))
      );
    }
    Lan() {
      return (
        ModelManager_1.ModelManager.PlayerInfoModel.GetId() ===
        ModelManager_1.ModelManager.CreatureModel.GetWorldOwner()
      );
    }
    Man() {
      if (!ModelManager_1.ModelManager.GameModeModel.IsMulti) return !0;
      switch (this.man) {
        case 2:
          return !1;
        case 0:
          return this.Lan();
        case 1:
          return this.Dan(), this.gan;
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
    Dan() {
      const t = TimeUtil_1.TimeUtil.GetServerTimeStamp();
      t - this.dan > CONDITION_CHECK_TIME &&
        ((this.Can = !0),
        LevelGamePlayController_1.LevelGamePlayController.EntityAdsorbRequest(
          this.Mne,
          (t) => {
            t &&
              (t.lkn === Protocol_1.Aki.Protocol.lkn.Sys && (this.gan = !0),
              (this.Can = !1));
          },
        ),
        (this.dan = t));
    }
    San() {
      if (!this.ran && !this.san) {
        if (!Global_1.Global.BaseCharacter) return !1;
        if (
          ((this.oan = Global_1.Global.BaseCharacter.CharacterActorComponent),
          !this.Hte.Owner.IsValid() || !this.oan.Owner.IsValid())
        )
          return !1;
        const t = this.Hte.ActorLocationProxy;
        this.oan.ActorLocationProxy.Subtraction(t, this.nCt),
          this.nCt.Normalize(NORMALIZE),
          (this.han = this.nCt.MultiplyEqual(this.ean)),
          (this.lan = this.ean),
          (this._an = 0),
          (this.ran = !0);
      }
      return !0;
    }
    Ean(t) {
      let i;
      this.ran &&
        !this.san &&
        Global_1.Global.BaseCharacter &&
        ((this.oan = Global_1.Global.BaseCharacter.CharacterActorComponent),
        this.Hte.Owner.IsValid()) &&
        this.oan.Owner.IsValid() &&
        ((i = this.Hte.ActorLocationProxy),
        this.oan.ActorLocationProxy.Subtraction(i, this.nCt),
        this.nCt.Normalize(NORMALIZE),
        (i = t * MathUtils_1.MathUtils.MillisecondToSecond),
        (this._an = this.ian * i),
        (this.lan += this._an),
        this.han.DeepCopy(this.nCt),
        this.lan > MAX_SPEED
          ? ((this.lan = MAX_SPEED), this.han.MultiplyEqual(MAX_SPEED))
          : this.han.MultiplyEqual(this.lan),
        this.han.Multiply(i, this.aan),
        (t = this.Entity.GetComponent(36))
          ? t.MoveCharacter(this.aan, i, "Pawn吸附更新")
          : this.Hte.AddActorWorldOffset(
              this.aan.ToUeVector(),
              "Pawn吸附更新",
              !0,
            ));
    }
    Ian() {
      this.nan || (this.zsn?.AddTag(1286772724), (this.nan = !0));
    }
    yan() {
      Global_1.Global.BaseCharacter &&
        ((this.oan = Global_1.Global.BaseCharacter.CharacterActorComponent),
        this.Hte.Owner.IsValid()) &&
        this.oan.Owner.IsValid() &&
        (this.Hte.Owner.K2_AttachToActor(this.oan.Owner, void 0, 2, 1, 1, !1),
        this.nCt.DeepCopy(Vector_1.Vector.ZeroVectorProxy),
        this.han.DeepCopy(Vector_1.Vector.ZeroVectorProxy),
        (this.lan = 0),
        (this._an = 0),
        (this.san = !0));
    }
    Ore() {
      EventSystem_1.EventSystem.AddWithTarget(
        this.Entity,
        EventDefine_1.EEventName.EnterLogicRange,
        this.fan,
      ),
        EventSystem_1.EventSystem.AddWithTarget(
          this.Entity,
          EventDefine_1.EEventName.LeaveLogicRange,
          this.Ozr,
        ),
        EventSystem_1.EventSystem.AddWithTarget(
          this.Entity,
          EventDefine_1.EEventName.OnLevelTagChanged,
          this.gIe,
        );
    }
    kre() {
      EventSystem_1.EventSystem.RemoveWithTarget(
        this.Entity,
        EventDefine_1.EEventName.EnterLogicRange,
        this.fan,
      ),
        EventSystem_1.EventSystem.RemoveWithTarget(
          this.Entity,
          EventDefine_1.EEventName.LeaveLogicRange,
          this.Ozr,
        ),
        EventSystem_1.EventSystem.RemoveWithTarget(
          this.Entity,
          EventDefine_1.EEventName.OnLevelTagChanged,
          this.gIe,
        );
    }
    xk() {
      this.nCt.DeepCopy(Vector_1.Vector.ZeroVectorProxy),
        this.aan.DeepCopy(Vector_1.Vector.ZeroVectorProxy),
        this.U7o.DeepCopy(Vector_1.Vector.ZeroVectorProxy),
        this.han.DeepCopy(Vector_1.Vector.ZeroVectorProxy),
        (this.lan = 0),
        (this._an = 0);
    }
  });
(PawnAdsorbComponent = PawnAdsorbComponent_1 =
  __decorate(
    [(0, RegisterComponent_1.RegisterComponent)(100)],
    PawnAdsorbComponent,
  )),
  (exports.PawnAdsorbComponent = PawnAdsorbComponent);
// # sourceMappingURL=PawnAdsorbComponent.js.map
