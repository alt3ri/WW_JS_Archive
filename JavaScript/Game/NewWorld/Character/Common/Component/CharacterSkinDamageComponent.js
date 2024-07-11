"use strict";
const __decorate =
  (this && this.__decorate) ||
  function (t, e, i, s) {
    let r;
    const n = arguments.length;
    let h =
      n < 3 ? e : s === null ? (s = Object.getOwnPropertyDescriptor(e, i)) : s;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
      h = Reflect.decorate(t, e, i, s);
    else
      for (let o = t.length - 1; o >= 0; o--)
        (r = t[o]) && (h = (n < 3 ? r(h) : n > 3 ? r(e, i, h) : r(e, i)) || h);
    return n > 3 && h && Object.defineProperty(e, i, h), h;
  };
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CharacterSkinDamageComponent = void 0);
const UE = require("ue");
const Log_1 = require("../../../../../Core/Common/Log");
const Time_1 = require("../../../../../Core/Common/Time");
const EntityComponent_1 = require("../../../../../Core/Entity/EntityComponent");
const RegisterComponent_1 = require("../../../../../Core/Entity/RegisterComponent");
const ResourceSystem_1 = require("../../../../../Core/Resource/ResourceSystem");
const TimerSystem_1 = require("../../../../../Core/Timer/TimerSystem");
const MathUtils_1 = require("../../../../../Core/Utils/MathUtils");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const FormationDataController_1 = require("../../../../Module/Abilities/FormationDataController");
const CharacterNameDefines_1 = require("../CharacterNameDefines");
const SKIN_DAMAGE_TIME = 20;
const SKIN_DAMAGE_LEVEL1_COUNT = 7;
const SKIN_DAMAGE_LEVEL2_COUNT = 14;
let CharacterSkinDamageComponent = class CharacterSkinDamageComponent extends EntityComponent_1.EntityComponent {
  constructor() {
    super(...arguments),
      (this.SIe = void 0),
      (this.Hte = void 0),
      (this.gWr = void 0),
      (this.fWr = 0),
      (this.oOr = 0),
      (this.pWr = 0),
      (this.vWr = 0),
      (this.n8 = void 0),
      (this.MWr = void 0),
      (this.Zpe = (t) => {
        this.BCe(),
          t
            ? ((this.oOr = Time_1.Time.WorldTimeSeconds), (this.pWr = 0))
            : ((this.oOr = 0),
              (this.pWr = Time_1.Time.WorldTimeSeconds),
              this.SWr()),
          (this.vWr = 0);
      }),
      (this.gne = (t) => {
        let e;
        this.oOr !== 0 &&
          (this.vWr++,
          (e = Time_1.Time.WorldTimeSeconds - this.oOr) > SKIN_DAMAGE_TIME) &&
          (this.vWr > SKIN_DAMAGE_LEVEL2_COUNT
            ? this.EWr(
                2,
                "加载2级战损贴图（受击）",
                ["battleStartDuration", e],
                ["BeHitCount", this.vWr],
              )
            : this.vWr > SKIN_DAMAGE_LEVEL1_COUNT &&
              this.EWr(
                1,
                "加载1级战损贴图（受击）",
                ["battleStartDuration", e],
                ["BeHitCount", this.vWr],
              ));
      }),
      (this.fKe = () => {
        FormationDataController_1.FormationDataController.GlobalIsInFight &&
          this.EWr(2, "加载2级战损贴图（复活）");
      }),
      (this.Gfr = () => {
        this.EWr(0, "战损恢复（传送）");
      }),
      (this.bkt = (t) => {
        t === this.Entity.Id &&
          this.pWr !== 0 &&
          Time_1.Time.WorldTimeSeconds - this.pWr > SKIN_DAMAGE_TIME &&
          this.EWr(0, "战损恢复（下场）");
      });
  }
  OnStart() {
    return (
      (this.SIe = this.Entity.CheckGetComponent(0)),
      (this.Hte = this.Entity.CheckGetComponent(3)),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnBattleStateChanged,
        this.Zpe,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnRoleGoDown,
        this.bkt,
      ),
      EventSystem_1.EventSystem.AddWithTarget(
        this.Entity,
        EventDefine_1.EEventName.CharBeHitLocal,
        this.gne,
      ),
      EventSystem_1.EventSystem.AddWithTarget(
        this.Entity,
        EventDefine_1.EEventName.CharOnRevive,
        this.fKe,
      ),
      EventSystem_1.EventSystem.AddWithTarget(
        this.Entity,
        EventDefine_1.EEventName.TeleportStartEntity,
        this.Gfr,
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
        this.bkt,
      ),
      EventSystem_1.EventSystem.RemoveWithTarget(
        this.Entity,
        EventDefine_1.EEventName.CharBeHitLocal,
        this.gne,
      ),
      EventSystem_1.EventSystem.RemoveWithTarget(
        this.Entity,
        EventDefine_1.EEventName.CharOnRevive,
        this.fKe,
      ),
      EventSystem_1.EventSystem.RemoveWithTarget(
        this.Entity,
        EventDefine_1.EEventName.TeleportStartEntity,
        this.Gfr,
      ),
      this.BCe(),
      !0
    );
  }
  yWr() {
    (this.gWr = this.Hte.Actor.GetComponentByClass(
      UE.KuroChangeSkeletalMaterialsComponent.StaticClass(),
    )),
      this.gWr?.IsValid() ||
        (this.gWr = this.Hte.Actor.AddComponentByClass(
          UE.KuroChangeSkeletalMaterialsComponent.StaticClass(),
          !1,
          MathUtils_1.MathUtils.DefaultTransform,
          !1,
          CharacterNameDefines_1.CharacterNameDefines
            .CHANGE_SKELETAL_MATERIALS_COMP_NAME,
        ));
  }
  BCe() {
    this.MWr &&
      (TimerSystem_1.TimerSystem.Remove(this.MWr), (this.MWr = void 0));
  }
  SWr() {
    this.MWr = TimerSystem_1.TimerSystem.Delay(() => {
      (this.MWr = void 0),
        ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity?.Id !==
          this.Entity.Id && this.EWr(0, "战损恢复（定时器）");
    }, SKIN_DAMAGE_TIME);
  }
  IWr(t) {
    return this.SIe.GetRoleConfig()?.SkinDamage[t];
  }
  TWr(t) {
    (this.n8 = this.IWr(t)),
      this.n8 &&
        ResourceSystem_1.ResourceSystem.LoadAsync(
          this.n8,
          UE.KuroChangeMaterialsTextures,
          (t, e) => {
            this.Entity?.Valid &&
              this.Hte.Actor?.IsValid() &&
              e === this.n8 &&
              (this.gWr?.IsValid() || this.yWr(),
              Log_1.Log.CheckDebug() &&
                Log_1.Log.Debug("Battle", 29, "战损贴图生效", ["path", e]),
              this.gWr?.ChangeMaterialsWithDataAsset(t));
          },
        );
  }
  EWr(t, e, ...i) {
    this.fWr !== t &&
      ((this.fWr = t),
      Log_1.Log.CheckDebug() && Log_1.Log.Debug("Battle", 29, e, ...i),
      this.TWr(this.fWr));
  }
};
(CharacterSkinDamageComponent = __decorate(
  [(0, RegisterComponent_1.RegisterComponent)(188)],
  CharacterSkinDamageComponent,
)),
  (exports.CharacterSkinDamageComponent = CharacterSkinDamageComponent);
// # sourceMappingURL=CharacterSkinDamageComponent.js.map
