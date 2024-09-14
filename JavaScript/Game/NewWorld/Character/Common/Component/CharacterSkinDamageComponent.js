"use strict";
var __decorate =
  (this && this.__decorate) ||
  function (t, e, i, s) {
    var r,
      n = arguments.length,
      h =
        n < 3
          ? e
          : null === s
            ? (s = Object.getOwnPropertyDescriptor(e, i))
            : s;
    if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
      h = Reflect.decorate(t, e, i, s);
    else
      for (var o = t.length - 1; 0 <= o; o--)
        (r = t[o]) && (h = (n < 3 ? r(h) : 3 < n ? r(e, i, h) : r(e, i)) || h);
    return 3 < n && h && Object.defineProperty(e, i, h), h;
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
  CharacterNameDefines_1 = require("../CharacterNameDefines"),
  SKIN_DAMAGE_TIME = 20,
  SKIN_DAMAGE_LEVEL1_COUNT = 7,
  SKIN_DAMAGE_LEVEL2_COUNT = 14;
let CharacterSkinDamageComponent = class CharacterSkinDamageComponent extends EntityComponent_1.EntityComponent {
  constructor() {
    super(...arguments),
      (this.EIe = void 0),
      (this.Hte = void 0),
      (this.Yjr = void 0),
      (this.Jjr = 0),
      (this.wNr = 0),
      (this.zjr = 0),
      (this.Zjr = 0),
      (this.n8 = void 0),
      (this.eWr = void 0),
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
        var e;
        0 !== this.wNr &&
          (this.Zjr++,
          (e = Time_1.Time.WorldTimeSeconds - this.wNr) > SKIN_DAMAGE_TIME) &&
          (this.Zjr > SKIN_DAMAGE_LEVEL2_COUNT
            ? this.iWr(
                2,
                "加载2级战损贴图（受击）",
                ["battleStartDuration", e],
                ["BeHitCount", this.Zjr],
              )
            : this.Zjr > SKIN_DAMAGE_LEVEL1_COUNT &&
              this.iWr(
                1,
                "加载1级战损贴图（受击）",
                ["battleStartDuration", e],
                ["BeHitCount", this.Zjr],
              ));
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
      });
  }
  OnStart() {
    return (
      (this.EIe = this.Entity.CheckGetComponent(0)),
      (this.Hte = this.Entity.CheckGetComponent(3)),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnBattleStateChanged,
        this.Zpe,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnRoleGoDown,
        this.q2t,
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
    return this.EIe.GetRoleConfig()?.SkinDamage[t];
  }
  nWr(t) {
    (this.n8 = this.rWr(t)),
      this.n8 &&
        ResourceSystem_1.ResourceSystem.LoadAsync(
          this.n8,
          UE.KuroChangeMaterialsTextures,
          (t, e) => {
            this.Entity?.Valid &&
              this.Hte.Actor?.IsValid() &&
              e === this.n8 &&
              (this.Yjr?.IsValid() || this.oWr(),
              Log_1.Log.CheckDebug() &&
                Log_1.Log.Debug("Battle", 29, "战损贴图生效", ["path", e]),
              this.Yjr?.ChangeMaterialsWithDataAsset(t));
          },
        );
  }
  iWr(t, e, ...i) {
    this.Jjr !== t &&
      ((this.Jjr = t),
      Log_1.Log.CheckDebug() && Log_1.Log.Debug("Battle", 29, e, ...i),
      this.nWr(this.Jjr));
  }
};
(CharacterSkinDamageComponent = __decorate(
  [(0, RegisterComponent_1.RegisterComponent)(195)],
  CharacterSkinDamageComponent,
)),
  (exports.CharacterSkinDamageComponent = CharacterSkinDamageComponent);
//# sourceMappingURL=CharacterSkinDamageComponent.js.map
