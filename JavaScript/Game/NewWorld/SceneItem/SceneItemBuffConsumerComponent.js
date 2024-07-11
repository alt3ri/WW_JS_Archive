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
        (this.wsn = void 0),
        (this.mBe = void 0),
        (this.Xln = void 0),
        (this.vtn = void 0),
        (this.Wpo = 0),
        (this.odn = ""),
        (this.eHr = BigInt(0)),
        (this.rdn = void 0),
        (this.JUn = void 0),
        (this.ndn = !1),
        (this.Q1n = (e) => {
          e &&
            this.sdn() &&
            ((this.ndn = !0),
            SceneItemBuffController_1.SceneItemBuffController.BuffOperate(
              this.Entity.Id,
              Protocol_1.Aki.Protocol.K3s.Proto_RemoveBuff,
              this.adn,
            ));
        }),
        (this.adn = (e, t) => {
          e === Protocol_1.Aki.Protocol.K3s.Proto_RemoveBuff && t
            ? this.hdn()
            : (this.ndn = !1);
        }),
        (this.Zln = (e) => {
          e.ReBulletData.Base.HitConditionTagId === HIT_CONDITION_TAGID &&
            (EntitySystem_1.EntitySystem.Get(e.BulletEntityId)?.Valid &&
              BulletController_1.BulletController.DestroyBullet(
                e.BulletEntityId,
                !1,
              ),
            this.rdn &&
              (TimerSystem_1.TimerSystem.Remove(this.rdn), (this.rdn = void 0)),
            EventSystem_1.EventSystem.RemoveWithTarget(
              this,
              EventDefine_1.EEventName.OnSceneItemHitByHitData,
              this.Zln,
            ),
            this.ldn());
        }),
        (this._dn = () => {
          EventSystem_1.EventSystem.HasWithTarget(
            this,
            EventDefine_1.EEventName.OnSceneItemHitByHitData,
            this.Zln,
          ) &&
            EventSystem_1.EventSystem.RemoveWithTarget(
              this,
              EventDefine_1.EEventName.OnSceneItemHitByHitData,
              this.Zln,
            ),
            (this.rdn = void 0),
            this.ldn();
        });
    }
    OnInitData(e) {
      e = e.GetParam(SceneItemBuffConsumerComponent_1)[0];
      (this.eHr = BigInt(e.BuffId)),
        e.BulletId && (this.odn = e.BulletId.toString());
      e = this.Entity.GetComponent(0)?.ComponentDataMap.get("Vys");
      return (this.JUn = MathUtils_1.MathUtils.LongToBigInt(e?.Vys?.tVn)), !0;
    }
    OnStart() {
      return (
        (this.Hte = this.Entity.GetComponent(185)),
        this.Hte
          ? ((this.wsn = this.Entity.GetComponent(180)),
            this.wsn
              ? ((this.mBe = this.Entity.GetComponent(119)),
                this.mBe
                  ? ((this.vtn = this.Entity.GetComponent(76)),
                    this.vtn
                      ? ((ModelManager_1.ModelManager.GameModeModel.IsMulti &&
                          ModelManager_1.ModelManager.PlayerInfoModel.GetId() !==
                            ModelManager_1.ModelManager.CreatureModel.GetWorldOwner()) ||
                          ((this.Wpo =
                            this.Hte.CreatureData.GetCreatureDataId()),
                          this.wsn.AddTag(HIT_CONDITION_TAGID),
                          (this.Xln = this.Entity.GetComponent(140)),
                          this.Xln.RegisterComponent(this),
                          this.vtn.AddOnPlayerOverlapCallback(this.Q1n)),
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
        this.vtn?.RemoveOnPlayerOverlapCallback(this.Q1n),
        this.rdn && TimerSystem_1.TimerSystem.Remove(this.rdn) && this._dn(),
        !0
      );
    }
    sdn() {
      return !(
        (ModelManager_1.ModelManager.GameModeModel.IsMulti &&
          ModelManager_1.ModelManager.PlayerInfoModel.GetId() !==
            ModelManager_1.ModelManager.CreatureModel.GetWorldOwner()) ||
        this.ndn ||
        !this.mBe.IsInState(1) ||
        ModelManager_1.ModelManager.SceneTeamModel.IsPhantomTeam ||
        !this.udn()
      );
    }
    udn() {
      var e = Global_1.Global.BaseCharacter;
      if (!e) return !1;
      var e = e.CharacterActorComponent.Entity,
        t = e.CheckGetComponent(159);
      if (!t) return !1;
      let n = 0 < t.GetBuffTotalStackById(this.eHr);
      t = e.CheckGetComponent(174);
      return (
        t &&
          (n ||=
            0 <
            (t.GetFormationBuffComp()?.GetBuffTotalStackById(this.eHr) ?? 0)),
        n
      );
    }
    hdn() {
      this.odn ? this.oZo() : this.ldn();
    }
    oZo() {
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
          this.odn,
          t.ActorTransform,
          {},
          this.JUn,
        ),
        EventSystem_1.EventSystem.AddWithTarget(
          this,
          EventDefine_1.EEventName.OnSceneItemHitByHitData,
          this.Zln,
        ),
        (this.rdn = TimerSystem_1.TimerSystem.Delay(
          this._dn,
          MAX_BULLET_HIT_TIME,
        )));
    }
    ldn() {
      LevelGamePlayController_1.LevelGamePlayController.EntityBuffProducerRequest(
        this.Wpo,
        (e) => {
          this.ndn = !1;
        },
      );
    }
  });
(SceneItemBuffConsumerComponent = SceneItemBuffConsumerComponent_1 =
  __decorate(
    [(0, RegisterComponent_1.RegisterComponent)(186)],
    SceneItemBuffConsumerComponent,
  )),
  (exports.SceneItemBuffConsumerComponent = SceneItemBuffConsumerComponent);
//# sourceMappingURL=SceneItemBuffConsumerComponent.js.map
