"use strict";
var CharacterSkinDamageComponent_1,
  __decorate =
    (this && this.__decorate) ||
    function (t, e, i, s) {
      var n,
        a = arguments.length,
        h =
          a < 3
            ? e
            : null === s
              ? (s = Object.getOwnPropertyDescriptor(e, i))
              : s;
      if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
        h = Reflect.decorate(t, e, i, s);
      else
        for (var r = t.length - 1; 0 <= r; r--)
          (n = t[r]) &&
            (h = (a < 3 ? n(h) : 3 < a ? n(e, i, h) : n(e, i)) || h);
      return 3 < a && h && Object.defineProperty(e, i, h), h;
    };
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CharacterSkinDamageComponent = void 0);
const UE = require("ue"),
  Log_1 = require("../../../../../Core/Common/Log"),
  Time_1 = require("../../../../../Core/Common/Time"),
  EntityComponent_1 = require("../../../../../Core/Entity/EntityComponent"),
  RegisterComponent_1 = require("../../../../../Core/Entity/RegisterComponent"),
  ResourceSystem_1 = require("../../../../../Core/Resource/ResourceSystem"),
  TimerSystem_1 = require("../../../../../Core/Timer/TimerSystem"),
  MathUtils_1 = require("../../../../../Core/Utils/MathUtils"),
  EventDefine_1 = require("../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../Common/Event/EventSystem"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  FormationDataController_1 = require("../../../../Module/Abilities/FormationDataController"),
  CampUtils_1 = require("../Blueprint/Utils/CampUtils"),
  CharacterNameDefines_1 = require("../CharacterNameDefines"),
  SKIN_DAMAGE_TIME = 20,
  SKIN_DAMAGE_LEVEL1_COUNT = 7,
  SKIN_DAMAGE_LEVEL2_COUNT = 14,
  skinDamageTagMap = new Map([
    [0, -723474560],
    [1, -1450058230],
    [2, 430401293],
  ]);
let CharacterSkinDamageComponent =
  (CharacterSkinDamageComponent_1 = class CharacterSkinDamageComponent extends (
    EntityComponent_1.EntityComponent
  ) {
    constructor() {
      super(...arguments),
        (this.EIe = void 0),
        (this.Hte = void 0),
        (this.Lie = void 0),
        (this.Yjr = void 0),
        (this.tec = 0),
        (this.wNr = 0),
        (this.zjr = 0),
        (this.Zjr = 0),
        (this.n8 = ""),
        (this.eWr = void 0),
        (this.CuePath = ""),
        (this.Zpe = (t) => {
          this.BCe(),
            t
              ? ((this.wNr = Time_1.Time.WorldTimeSeconds), (this.zjr = 0))
              : ((this.wNr = 0),
                (this.zjr = Time_1.Time.WorldTimeSeconds),
                this.tWr()),
            (this.Zjr = 0);
        }),
        (this.gne = (t) => {
          if (0 !== this.wNr) {
            t = t.Attacker.GetComponent(3);
            if (t)
              if (
                2 !==
                CampUtils_1.CampUtils.GetCampRelationship(
                  t.Actor.Camp,
                  this.Hte.Actor.Camp,
                )
              )
                return;
            this.Zjr++;
            t = Time_1.Time.WorldTimeSeconds - this.wNr;
            t > SKIN_DAMAGE_TIME &&
              (this.Zjr > SKIN_DAMAGE_LEVEL2_COUNT
                ? this.iWr(
                    2,
                    "加载2级战损贴图（受击）",
                    ["battleStartDuration", t],
                    ["BeHitCount", this.Zjr],
                  )
                : this.Zjr > SKIN_DAMAGE_LEVEL1_COUNT &&
                  this.iWr(
                    1,
                    "加载1级战损贴图（受击）",
                    ["battleStartDuration", t],
                    ["BeHitCount", this.Zjr],
                  ));
          }
        }),
        (this.UQe = () => {
          FormationDataController_1.FormationDataController.GlobalIsInFight &&
            this.iWr(2, "加载2级战损贴图（复活）");
        }),
        (this.bpr = () => {
          this.iWr(0, "战损恢复（传送）");
        }),
        (this.q2t = (t) => {
          t === this.Entity.Id &&
            0 !== this.zjr &&
            Time_1.Time.WorldTimeSeconds - this.zjr > SKIN_DAMAGE_TIME &&
            this.iWr(0, "战损恢复（下场）");
        }),
        (this.Mi_ = () => {
          CharacterSkinDamageComponent_1.EnableSkinDamage
            ? this.CuePath
              ? this.ApplySkinDamage(
                  this.CuePath,
                  !1,
                  "战损开关设置为开启，GameplayCueSkinDamage重新加载",
                )
              : this.ApplySkinDamageByType(
                  this.SkinDamageType,
                  !1,
                  "战损开关设置为开启",
                )
            : this.ApplySkinDamageByType(0, !0, "战损开关设置为关闭");
        });
    }
    OnStart() {
      return (
        (this.EIe = this.Entity.CheckGetComponent(0)),
        (this.Hte = this.Entity.CheckGetComponent(3)),
        (this.Lie = this.Entity.CheckGetComponent(203)),
        (this.SkinDamageType = 0),
        EventSystem_1.EventSystem.Add(
          EventDefine_1.EEventName.OnBattleStateChanged,
          this.Zpe,
        ),
        EventSystem_1.EventSystem.Add(
          EventDefine_1.EEventName.OnRoleGoDown,
          this.q2t,
        ),
        EventSystem_1.EventSystem.Add(
          EventDefine_1.EEventName.OnResetSkinDamageMode,
          this.Mi_,
        ),
        EventSystem_1.EventSystem.AddWithTarget(
          this.Entity,
          EventDefine_1.EEventName.CharBeHitLocal,
          this.gne,
        ),
        EventSystem_1.EventSystem.AddWithTarget(
          this.Entity,
          EventDefine_1.EEventName.CharOnRevive,
          this.UQe,
        ),
        EventSystem_1.EventSystem.AddWithTarget(
          this.Entity,
          EventDefine_1.EEventName.TeleportStartEntity,
          this.bpr,
        ),
        !0
      );
    }
    OnEnd() {
      return (
        EventSystem_1.EventSystem.Remove(
          EventDefine_1.EEventName.OnBattleStateChanged,
          this.Zpe,
        ),
        EventSystem_1.EventSystem.Remove(
          EventDefine_1.EEventName.OnRoleGoDown,
          this.q2t,
        ),
        EventSystem_1.EventSystem.Remove(
          EventDefine_1.EEventName.OnResetSkinDamageMode,
          this.Mi_,
        ),
        EventSystem_1.EventSystem.RemoveWithTarget(
          this.Entity,
          EventDefine_1.EEventName.CharBeHitLocal,
          this.gne,
        ),
        EventSystem_1.EventSystem.RemoveWithTarget(
          this.Entity,
          EventDefine_1.EEventName.CharOnRevive,
          this.UQe,
        ),
        EventSystem_1.EventSystem.RemoveWithTarget(
          this.Entity,
          EventDefine_1.EEventName.TeleportStartEntity,
          this.bpr,
        ),
        this.BCe(),
        !0
      );
    }
    oWr() {
      (this.Yjr = this.Hte.Actor.GetComponentByClass(
        UE.KuroChangeSkeletalMaterialsComponent.StaticClass(),
      )),
        this.Yjr?.IsValid() ||
          (this.Yjr = this.Hte.Actor.AddComponentByClass(
            UE.KuroChangeSkeletalMaterialsComponent.StaticClass(),
            !1,
            MathUtils_1.MathUtils.DefaultTransform,
            !1,
            CharacterNameDefines_1.CharacterNameDefines
              .CHANGE_SKELETAL_MATERIALS_COMP_NAME,
          ));
    }
    BCe() {
      this.eWr &&
        (TimerSystem_1.TimerSystem.Remove(this.eWr), (this.eWr = void 0));
    }
    tWr() {
      this.eWr = TimerSystem_1.TimerSystem.Delay(() => {
        (this.eWr = void 0),
          ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity?.Id !==
            this.Entity.Id && this.iWr(0, "战损恢复（定时器）");
      }, SKIN_DAMAGE_TIME);
    }
    rWr(t) {
      t = this.EIe.GetRoleConfig()?.SkinDamage[t];
      let e = void 0;
      return (e = t ? this.Hte.GetReplaceEffect(t) : e) || t;
    }
    ApplySkinDamageByType(t, e, i, ...s) {
      (this.CuePath && !e) ||
        ((t = this.rWr(t)) && this.ApplySkinDamage(t, e, i, ...s));
    }
    ApplySkinDamage(t, e, i, ...s) {
      (CharacterSkinDamageComponent_1.EnableSkinDamage || e) &&
        this.n8 !== t &&
        ((this.n8 = t),
        Log_1.Log.CheckDebug() && Log_1.Log.Debug("Battle", 28, i, ...s),
        ResourceSystem_1.ResourceSystem.LoadAsync(
          t,
          UE.KuroChangeMaterialsTextures,
          (t, e) => {
            this.Entity?.Valid &&
              this.Hte.Actor?.IsValid() &&
              e === this.n8 &&
              (this.Yjr?.IsValid() || this.oWr(),
              Log_1.Log.CheckDebug() &&
                Log_1.Log.Debug(
                  "Battle",
                  28,
                  "战损贴图生效",
                  ["EntityId", this.Entity.Id],
                  ["path", e],
                ),
              this.Yjr?.ChangeMaterialsWithDataAsset(t));
          },
        ));
    }
    iWr(t, e, ...i) {
      this.SkinDamageType !== t &&
        ((this.SkinDamageType = t), this.ApplySkinDamageByType(t, !1, e, ...i));
    }
    set SkinDamageType(t) {
      this.Lie.RemoveTag(skinDamageTagMap.get(this.tec)),
        (this.tec = t),
        this.Lie.AddTag(skinDamageTagMap.get(this.tec));
    }
    get SkinDamageType() {
      return this.tec;
    }
  });
(CharacterSkinDamageComponent.EnableSkinDamage = !0),
  (CharacterSkinDamageComponent = CharacterSkinDamageComponent_1 =
    __decorate(
      [(0, RegisterComponent_1.RegisterComponent)(208)],
      CharacterSkinDamageComponent,
    )),
  (exports.CharacterSkinDamageComponent = CharacterSkinDamageComponent);
//# sourceMappingURL=CharacterSkinDamageComponent.js.map
