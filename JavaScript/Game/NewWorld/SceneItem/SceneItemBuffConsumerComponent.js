"use strict";
var SceneItemBuffConsumerComponent_1,
  __decorate =
    (this && this.__decorate) ||
    function (e, t, n, o) {
      var i,
        r = arguments.length,
        s =
          r < 3
            ? t
            : null === o
              ? (o = Object.getOwnPropertyDescriptor(t, n))
              : o;
      if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
        s = Reflect.decorate(e, t, n, o);
      else
        for (var h = e.length - 1; 0 <= h; h--)
          (i = e[h]) &&
            (s = (r < 3 ? i(s) : 3 < r ? i(t, n, s) : i(t, n)) || s);
      return 3 < r && s && Object.defineProperty(t, n, s), s;
    };
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SceneItemBuffConsumerComponent = void 0);
const Log_1 = require("../../../Core/Common/Log"),
  Protocol_1 = require("../../../Core/Define/Net/Protocol"),
  EntityComponent_1 = require("../../../Core/Entity/EntityComponent"),
  EntitySystem_1 = require("../../../Core/Entity/EntitySystem"),
  RegisterComponent_1 = require("../../../Core/Entity/RegisterComponent"),
  TimerSystem_1 = require("../../../Core/Timer/TimerSystem"),
  MathUtils_1 = require("../../../Core/Utils/MathUtils"),
  EventDefine_1 = require("../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../Common/Event/EventSystem"),
  Global_1 = require("../../Global"),
  LevelGamePlayController_1 = require("../../LevelGamePlay/LevelGamePlayController"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  BulletController_1 = require("../Bullet/BulletController"),
  SceneItemBuffController_1 = require("./Controller/SceneItemBuffController"),
  BLACKBOARD_KEY = "HeiShiSuo",
  HIT_CONDITION_TAGID = -1968966883,
  MAX_BULLET_HIT_TIME = 5e3;
let SceneItemBuffConsumerComponent =
  (SceneItemBuffConsumerComponent_1 = class SceneItemBuffConsumerComponent extends (
    EntityComponent_1.EntityComponent
  ) {
    constructor() {
      super(...arguments),
        (this.Hte = void 0),
        (this.zsn = void 0),
        (this.mBe = void 0),
        (this.C1n = void 0),
        (this.ktn = void 0),
        (this.Xfo = 0),
        (this.Tdn = ""),
        (this.MHr = BigInt(0)),
        (this.Ldn = void 0),
        (this.jDn = void 0),
        (this.Ddn = !1),
        (this.d_n = (e) => {
          e &&
            this.Rdn() &&
            ((this.Ddn = !0),
            SceneItemBuffController_1.SceneItemBuffController.BuffOperate(
              this.Entity.Id,
              Protocol_1.Aki.Protocol.nGs.Proto_RemoveBuff,
              this.Adn,
            ));
        }),
        (this.Adn = (e, t) => {
          e === Protocol_1.Aki.Protocol.nGs.Proto_RemoveBuff && t
            ? this.Udn()
            : (this.Ddn = !1);
        }),
        (this.M1n = (e) => {
          e.ReBulletData.Base.HitConditionTagId === HIT_CONDITION_TAGID &&
            (EntitySystem_1.EntitySystem.Get(e.BulletEntityId)?.Valid &&
              BulletController_1.BulletController.DestroyBullet(
                e.BulletEntityId,
                !1,
              ),
            this.Ldn &&
              (TimerSystem_1.TimerSystem.Remove(this.Ldn), (this.Ldn = void 0)),
            EventSystem_1.EventSystem.RemoveWithTarget(
              this,
              EventDefine_1.EEventName.OnSceneItemHitByHitData,
              this.M1n,
            ),
            this.Pdn());
        }),
        (this.xdn = () => {
          EventSystem_1.EventSystem.HasWithTarget(
            this,
            EventDefine_1.EEventName.OnSceneItemHitByHitData,
            this.M1n,
          ) &&
            EventSystem_1.EventSystem.RemoveWithTarget(
              this,
              EventDefine_1.EEventName.OnSceneItemHitByHitData,
              this.M1n,
            ),
            (this.Ldn = void 0),
            this.Pdn();
        });
    }
    OnInitData(e) {
      e = e.GetParam(SceneItemBuffConsumerComponent_1)[0];
      (this.MHr = BigInt(e.BuffId)),
        e.BulletId && (this.Tdn = e.BulletId.toString());
      e = this.Entity.GetComponent(0)?.ComponentDataMap.get("Tps");
      return (this.jDn = MathUtils_1.MathUtils.LongToBigInt(e?.Tps?.S4n)), !0;
    }
    OnStart() {
      return (
        (this.Hte = this.Entity.GetComponent(182)),
        this.Hte
          ? ((this.zsn = this.Entity.GetComponent(177)),
            this.zsn
              ? ((this.mBe = this.Entity.GetComponent(117)),
                this.mBe
                  ? ((this.ktn = this.Entity.GetComponent(74)),
                    this.ktn
                      ? ((ModelManager_1.ModelManager.GameModeModel.IsMulti &&
                          ModelManager_1.ModelManager.PlayerInfoModel.GetId() !==
                            ModelManager_1.ModelManager.CreatureModel.GetWorldOwner()) ||
                          ((this.Xfo =
                            this.Hte.CreatureData.GetCreatureDataId()),
                          this.zsn.AddTag(HIT_CONDITION_TAGID),
                          (this.C1n = this.Entity.GetComponent(138)),
                          this.C1n.RegisterComponent(this),
                          this.ktn.AddOnPlayerOverlapCallback(this.d_n)),
                        !0)
                      : (Log_1.Log.CheckError() &&
                          Log_1.Log.Error(
                            "SceneGameplay",
                            30,
                            "[SceneItemBuffConsumerComponent] 组件初始化失败 实体缺少RangeComponent",
                            [
                              "CreatureDataId",
                              this.Hte.CreatureData.GetCreatureDataId(),
                            ],
                            ["PbDataId", this.Hte.CreatureData.GetPbDataId()],
                            ["PlayerId", this.Hte.CreatureData.GetPlayerId()],
                          ),
                        !1))
                  : (Log_1.Log.CheckError() &&
                      Log_1.Log.Error(
                        "SceneGameplay",
                        30,
                        "[SceneItemBuffConsumerComponent] 组件初始化失败 实体缺少SceneItemStateComponent",
                        [
                          "CreatureDataId",
                          this.Hte.CreatureData.GetCreatureDataId(),
                        ],
                        ["PbDataId", this.Hte.CreatureData.GetPbDataId()],
                        ["PlayerId", this.Hte.CreatureData.GetPlayerId()],
                      ),
                    !1))
              : (Log_1.Log.CheckError() &&
                  Log_1.Log.Error(
                    "SceneGameplay",
                    30,
                    "[SceneItemBuffConsumerComponent] 组件初始化失败 实体缺少LevelTagComponent",
                    [
                      "CreatureDataId",
                      this.Hte.CreatureData.GetCreatureDataId(),
                    ],
                    ["PbDataId", this.Hte.CreatureData.GetPbDataId()],
                    ["PlayerId", this.Hte.CreatureData.GetPlayerId()],
                  ),
                !1))
          : (Log_1.Log.CheckError() &&
              Log_1.Log.Error(
                "SceneGameplay",
                30,
                "[SceneItemBuffConsumerComponent] 组件初始化失败 Actor Component Undefined",
              ),
            !1)
      );
    }
    OnEnd() {
      return (
        this.ktn?.RemoveOnPlayerOverlapCallback(this.d_n),
        this.Ldn && TimerSystem_1.TimerSystem.Remove(this.Ldn) && this.xdn(),
        !0
      );
    }
    Rdn() {
      return !(
        (ModelManager_1.ModelManager.GameModeModel.IsMulti &&
          ModelManager_1.ModelManager.PlayerInfoModel.GetId() !==
            ModelManager_1.ModelManager.CreatureModel.GetWorldOwner()) ||
        this.Ddn ||
        !this.mBe.IsInState(1) ||
        ModelManager_1.ModelManager.SceneTeamModel.IsPhantomTeam ||
        !this.wdn()
      );
    }
    wdn() {
      var e = Global_1.Global.BaseCharacter;
      if (!e) return !1;
      var e = e.CharacterActorComponent.Entity,
        t = e.CheckGetComponent(157);
      if (!t) return !1;
      let n = 0 < t.GetBuffTotalStackById(this.MHr);
      t = e.CheckGetComponent(171);
      return (
        t &&
          (n ||=
            0 <
            (t.GetFormationBuffComp()?.GetBuffTotalStackById(this.MHr) ?? 0)),
        n
      );
    }
    Udn() {
      this.Tdn ? this.szo() : this.Pdn();
    }
    szo() {
      var e,
        t = Global_1.Global.BaseCharacter;
      t &&
        ((e = (t = t.CharacterActorComponent).Entity),
        ModelManager_1.ModelManager.BulletModel.SetEntityIdByCustomKey(
          e.Id,
          BLACKBOARD_KEY,
          this.Entity.Id,
        ),
        BulletController_1.BulletController.CreateBulletCustomTarget(
          Global_1.Global.BaseCharacter,
          this.Tdn,
          t.ActorTransform,
          {},
          this.jDn,
        ),
        EventSystem_1.EventSystem.AddWithTarget(
          this,
          EventDefine_1.EEventName.OnSceneItemHitByHitData,
          this.M1n,
        ),
        (this.Ldn = TimerSystem_1.TimerSystem.Delay(
          this.xdn,
          MAX_BULLET_HIT_TIME,
        )));
    }
    Pdn() {
      LevelGamePlayController_1.LevelGamePlayController.EntityBuffProducerRequest(
        this.Xfo,
        (e) => {
          this.Ddn = !1;
        },
      );
    }
  });
(SceneItemBuffConsumerComponent = SceneItemBuffConsumerComponent_1 =
  __decorate(
    [(0, RegisterComponent_1.RegisterComponent)(183)],
    SceneItemBuffConsumerComponent,
  )),
  (exports.SceneItemBuffConsumerComponent = SceneItemBuffConsumerComponent);
//# sourceMappingURL=SceneItemBuffConsumerComponent.js.map
