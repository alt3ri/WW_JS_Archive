"use strict";
var SceneItemBuffProducerComponent_1,
  __decorate =
    (this && this.__decorate) ||
    function (t, e, i, s) {
      var h,
        r = arguments.length,
        o =
          r < 3
            ? e
            : null === s
              ? (s = Object.getOwnPropertyDescriptor(e, i))
              : s;
      if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
        o = Reflect.decorate(t, e, i, s);
      else
        for (var n = t.length - 1; 0 <= n; n--)
          (h = t[n]) &&
            (o = (r < 3 ? h(o) : 3 < r ? h(e, i, o) : h(e, i)) || o);
      return 3 < r && o && Object.defineProperty(e, i, o), o;
    };
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SceneItemBuffProducerComponent = void 0);
const UE = require("ue"),
  Log_1 = require("../../../Core/Common/Log"),
  Protocol_1 = require("../../../Core/Define/Net/Protocol"),
  EntityComponent_1 = require("../../../Core/Entity/EntityComponent"),
  RegisterComponent_1 = require("../../../Core/Entity/RegisterComponent"),
  TimerSystem_1 = require("../../../Core/Timer/TimerSystem"),
  Vector_1 = require("../../../Core/Utils/Math/Vector"),
  MathUtils_1 = require("../../../Core/Utils/MathUtils"),
  EventDefine_1 = require("../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../Common/Event/EventSystem"),
  Global_1 = require("../../Global"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  BulletController_1 = require("../Bullet/BulletController"),
  SceneItemBuffController_1 = require("./Controller/SceneItemBuffController"),
  DISTANCE_THRESHOLD = 100,
  NORMALIZE = 0.01,
  SPEED = 600,
  MAX_BULLET_HIT_TIME = 5e3;
let SceneItemBuffProducerComponent =
  (SceneItemBuffProducerComponent_1 = class SceneItemBuffProducerComponent extends (
    EntityComponent_1.EntityComponent
  ) {
    constructor() {
      super(...arguments),
        (this.Mne = 0),
        (this.Hte = void 0),
        (this.wsn = void 0),
        (this.mBe = void 0),
        (this.vtn = void 0),
        (this.mdn = !1),
        (this.ddn = !1),
        (this.Cdn = 1),
        (this.b1n = !0),
        (this.$Br = !1),
        (this._Mr = !1),
        (this.eHr = BigInt(0)),
        (this.Lo = void 0),
        (this.JUn = void 0),
        (this.gdn = (t) => {
          (this.b1n = t), this._Mr && 2 === this.Cdn && !this.b1n && this.fdn();
        }),
        (this.g_n = () => {
          if (this._Mr)
            switch (((this.Cdn = this.mBe.State), this.mBe.State)) {
              case 2:
                this.udn() || (this.mdn = !0);
                break;
              case 1:
                this.fdn();
            }
        }),
        (this.adn = (t, e) => {
          this.ddn = !1;
        }),
        (this.fgt = void 0),
        (this.LHo = void 0),
        (this.pdn = void 0),
        (this.odn = ""),
        (this.vdn = void 0),
        (this.TDe = void 0),
        (this.sjo = (t, e) => {
          var i = Global_1.Global.BaseCharacter;
          i &&
            ((i = i.CharacterActorComponent.Entity), t.Target === i) &&
            (this.TDe &&
              (TimerSystem_1.TimerSystem.Remove(this.TDe), (this.TDe = void 0)),
            EventSystem_1.EventSystem.RemoveWithTarget(
              this.vdn,
              EventDefine_1.EEventName.BulletHit,
              this.sjo,
            ),
            (this.vdn = void 0),
            this.ldn());
        }),
        (this._dn = () => {
          EventSystem_1.EventSystem.HasWithTarget(
            this,
            EventDefine_1.EEventName.BulletHit,
            this.sjo,
          ) &&
            EventSystem_1.EventSystem.RemoveWithTarget(
              this,
              EventDefine_1.EEventName.BulletHit,
              this.sjo,
            ),
            (this.TDe = void 0),
            (this.vdn = void 0),
            this.ldn();
        });
    }
    OnInitData(t) {
      var e = t.GetParam(SceneItemBuffProducerComponent_1)[0];
      switch (
        ((this.Lo = e), (this.eHr = BigInt(e.BuffId)), e.AddBuffMode.Type)
      ) {
        case "Adsorb":
          (this.fgt = Vector_1.Vector.Create()),
            (this.LHo = Vector_1.Vector.Create());
          break;
        case "Immediate":
          break;
        case "FireBullet":
          (this.odn = e.AddBuffMode.BulletId.toString()),
            (this.pdn = Vector_1.Vector.Create(
              e.AddBuffMode.BulletOffset.X ?? 0,
              e.AddBuffMode.BulletOffset.Y ?? 0,
              e.AddBuffMode.BulletOffset.Z ?? 0,
            ));
      }
      t = this.Entity.GetComponent(0)?.ComponentDataMap.get("Qys");
      return (this.JUn = MathUtils_1.MathUtils.LongToBigInt(t?.Qys?._Vn)), !0;
    }
    OnStart() {
      return (
        (this.Hte = this.Entity.GetComponent(187)),
        this.Hte
          ? ((this.Mne = this.Hte.CreatureData.GetPbDataId()),
            (this.wsn = this.Entity.GetComponent(181)),
            this.wsn
              ? ((this.mBe = this.Entity.GetComponent(120)),
                this.mBe
                  ? ((this.b1n = !0),
                    (this._Mr = !0),
                    ModelManager_1.ModelManager.GameModeModel.IsMulti &&
                    ModelManager_1.ModelManager.PlayerInfoModel.GetId() !==
                      ModelManager_1.ModelManager.CreatureModel.GetWorldOwner()
                      ? !(this._Mr = !1)
                      : ((this.vtn = this.Entity.GetComponent(77)),
                        this.vtn &&
                          ((this.b1n = !1),
                          this.vtn.AddOnPlayerOverlapCallback(this.gdn)),
                        (this.Cdn = this.mBe.State),
                        this.Ore(),
                        !0))
                  : (Log_1.Log.CheckError() &&
                      Log_1.Log.Error(
                        "SceneGameplay",
                        40,
                        "[BuffProducerComp] 组件初始化失败 实体缺少SceneItemStateComponent",
                        [
                          "CreatureDataId",
                          this.Hte.CreatureData.GetCreatureDataId(),
                        ],
                        ["PbDataId", this.Mne],
                        ["PlayerId", this.Hte.CreatureData.GetPlayerId()],
                      ),
                    !1))
              : (Log_1.Log.CheckError() &&
                  Log_1.Log.Error(
                    "SceneGameplay",
                    30,
                    "[BuffProducerComp] 组件初始化失败 实体缺少LevelTagComponent",
                    [
                      "CreatureDataId",
                      this.Hte.CreatureData.GetCreatureDataId(),
                    ],
                    ["PbDataId", this.Mne],
                    ["PlayerId", this.Hte.CreatureData.GetPlayerId()],
                  ),
                !1))
          : (Log_1.Log.CheckError() &&
              Log_1.Log.Error(
                "SceneGameplay",
                30,
                "[BuffProducerComp] 组件初始化失败 Actor Component Undefined",
              ),
            !1)
      );
    }
    OnActivate() {
      this.mBe.IsInState(0) || this.g_n();
    }
    OnTick(t) {
      this._Mr &&
        2 === this.Cdn &&
        (this.mdn ? this.Mdn(t) : this.b1n || this.fdn());
    }
    OnEnd() {
      return (
        this.vtn && this.vtn.RemoveOnPlayerOverlapCallback(this.gdn),
        this.kre(),
        !0
      );
    }
    Ore() {
      this.$Br ||
        (EventSystem_1.EventSystem.AddWithTarget(
          this.Entity,
          EventDefine_1.EEventName.OnSceneItemStateChange,
          this.g_n,
        ),
        (this.$Br = !0));
    }
    kre() {
      this.$Br &&
        (EventSystem_1.EventSystem.RemoveWithTarget(
          this.Entity,
          EventDefine_1.EEventName.OnSceneItemStateChange,
          this.g_n,
        ),
        (this.$Br = !1));
    }
    Mdn(t) {
      switch (this.Lo?.AddBuffMode.Type) {
        case "Adsorb":
          this.Edn(t);
          break;
        case "Immediate":
          this.ldn();
          break;
        case "FireBullet":
          this.oZo(t);
      }
    }
    ldn() {
      (this.mdn = !1), this.Sdn();
    }
    udn() {
      var t = Global_1.Global.BaseCharacter;
      if (!t) return !1;
      var t = t.CharacterActorComponent.Entity,
        e = t.CheckGetComponent(160);
      if (!e) return !1;
      let i = 0 < e.GetBuffTotalStackById(this.eHr);
      e = t.CheckGetComponent(175);
      return (
        e &&
          (i ||=
            0 <
            (e.GetFormationBuffComp()?.GetBuffTotalStackById(this.eHr) ?? 0)),
        i
      );
    }
    fdn() {
      !this.ddn &&
        this.udn() &&
        ((this.ddn = !0),
        SceneItemBuffController_1.SceneItemBuffController.BuffOperate(
          this.Entity.Id,
          Protocol_1.Aki.Protocol.eFs.Proto_UndoBuff,
          this.adn,
        ));
    }
    Sdn() {
      this.ddn ||
        this.udn() ||
        ((this.ddn = !0),
        SceneItemBuffController_1.SceneItemBuffController.BuffOperate(
          this.Entity.Id,
          Protocol_1.Aki.Protocol.eFs.Proto_AddBuff,
          this.adn,
        ));
    }
    Edn(t) {
      var e, i;
      Global_1.Global.BaseCharacter &&
        ((i = Global_1.Global.BaseCharacter.CharacterActorComponent),
        this.Hte.Owner.IsValid()) &&
        i.Owner.IsValid() &&
        ((t = t * MathUtils_1.MathUtils.MillisecondToSecond),
        (e = this.Hte.ActorLocationProxy),
        i.ActorLocationProxy.Subtraction(e, this.fgt),
        this.fgt.SizeSquared() < DISTANCE_THRESHOLD
          ? ((i = this.Hte.CreatureData.GetInitLocation()),
            (this.LHo.X = i.X ?? 0),
            (this.LHo.Y = i.Y ?? 0),
            (this.LHo.Z = i.Z ?? 0),
            this.Hte.SetActorLocation(this.LHo.ToUeVector()),
            this.fgt.DeepCopy(Vector_1.Vector.ZeroVectorProxy),
            this.LHo.DeepCopy(Vector_1.Vector.ZeroVectorProxy),
            this.ldn())
          : (this.fgt.Normalize(NORMALIZE),
            this.fgt.MultiplyEqual(SPEED * t),
            this.LHo.DeepCopy(this.Hte.ActorLocationProxy),
            this.LHo.AdditionEqual(this.fgt),
            this.Hte.SetActorLocation(this.LHo.ToUeVector())));
    }
    oZo(t) {
      var e, i, s, h;
      this.odn &&
        (e = Global_1.Global.BaseCharacter) &&
        ((e = e.CharacterActorComponent),
        (i = this.Hte.ActorTransform),
        (s = new UE.Transform(
          i.GetRotation(),
          i.GetTranslation(),
          i.GetScale3D(),
        )),
        (h = Vector_1.Vector.Create()).DeepCopy(
          i.GetRotation().RotateVector(this.pdn.ToUeVector()),
        ),
        s.AddToTranslation(h.ToUeVector()),
        (this.vdn =
          BulletController_1.BulletController.CreateBulletCustomTarget(
            e.Actor,
            this.odn,
            s,
            {},
            this.JUn,
          )),
        (this.TDe = TimerSystem_1.TimerSystem.Delay(
          this._dn,
          MAX_BULLET_HIT_TIME,
        )),
        EventSystem_1.EventSystem.AddWithTarget(
          this.vdn,
          EventDefine_1.EEventName.BulletHit,
          this.sjo,
        ),
        (this.mdn = !1));
    }
  });
(SceneItemBuffProducerComponent = SceneItemBuffProducerComponent_1 =
  __decorate(
    [(0, RegisterComponent_1.RegisterComponent)(132)],
    SceneItemBuffProducerComponent,
  )),
  (exports.SceneItemBuffProducerComponent = SceneItemBuffProducerComponent);
//# sourceMappingURL=SceneItemBuffProducerComponent.js.map
