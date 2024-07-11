"use strict";
let GrapplingHookPointComponent_1;
const __decorate =
  (this && this.__decorate) ||
  function (t, e, i, o) {
    let n;
    const r = arguments.length;
    let s =
      r < 3 ? e : o === null ? (o = Object.getOwnPropertyDescriptor(e, i)) : o;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
      s = Reflect.decorate(t, e, i, o);
    else
      for (let a = t.length - 1; a >= 0; a--)
        (n = t[a]) && (s = (r < 3 ? n(s) : r > 3 ? n(e, i, s) : n(e, i)) || s);
    return r > 3 && s && Object.defineProperty(e, i, s), s;
  };
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.GrapplingHookPointComponent = void 0);
const UE = require("ue");
const EntityComponent_1 = require("../../../../../Core/Entity/EntityComponent");
const RegisterComponent_1 = require("../../../../../Core/Entity/RegisterComponent");
const TimerSystem_1 = require("../../../../../Core/Timer/TimerSystem");
const Vector_1 = require("../../../../../Core/Utils/Math/Vector");
const MathUtils_1 = require("../../../../../Core/Utils/MathUtils");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const TimeUtil_1 = require("../../../../Common/TimeUtil");
const EffectSystem_1 = require("../../../../Effect/EffectSystem");
const TsEffectActor_1 = require("../../../../Effect/TsEffectActor");
const LevelGeneralContextDefine_1 = require("../../../../LevelGamePlay/LevelGeneralContextDefine");
const ControllerHolder_1 = require("../../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const CharacterNameDefines_1 = require("../../Common/CharacterNameDefines");
const HOOK_VISION_ID = 1001;
const hookPointStateTagMap = new Map([
  [0, 1888174838],
  [1, -1156116864],
  [2, -43463105],
]);
let GrapplingHookPointComponent =
  (GrapplingHookPointComponent_1 = class GrapplingHookPointComponent extends (
    EntityComponent_1.EntityComponent
  ) {
    constructor() {
      super(...arguments),
        (this.Lo = void 0),
        (this.Lie = void 0),
        (this.RadiusSquared = 0),
        (this.ac = 3),
        (this.Hte = void 0),
        (this.YO = void 0),
        (this.ken = !1),
        (this.fVo = void 0),
        (this.Fen = (t) => {
          t === HOOK_VISION_ID && (this.Lie.AddTag(1888174838), (this.ac = 0));
        });
    }
    get Location() {
      return Vector_1.Vector.Create(this.Hte?.ActorLocationProxy);
    }
    get Radius() {
      return this.Lo?.Range.Radius ?? 0;
    }
    get CameraGaze() {
      return this.Lo?.CameraGaze;
    }
    get InheritSpeed() {
      return this.Lo?.InheritSpeed ?? !1;
    }
    get IsClimb() {
      return this.Lo?.IsClimb ?? !1;
    }
    get IsInCd() {
      return this.ken;
    }
    get WillBeDestroyedAfterHook() {
      return this.Lo?.IsDestroyedSelf ?? !1;
    }
    get WillBeHideAfterHook() {
      return this.Lo?.IsHideSelf ?? !1;
    }
    OnInitData(t) {
      var t = t.GetParam(GrapplingHookPointComponent_1)[0];
      if (
        ((this.Lo = t || void 0),
        void 0 !== this.Lo.PlayerStateRestritionId &&
          ((t = {
            Type: "CheckPlayerStateRestriction",
            RestrictionId: this.Lo.PlayerStateRestritionId,
          }),
          (this.YO = { Type: 0, Conditions: [t] })),
        (this.Lie = this.Entity.GetComponent(177)),
        this.Lie?.Valid && this.Lie.AddTag(-254251760),
        this.Lo.HookInteractConfig)
      )
        switch (this.Lo.HookInteractConfig.Type) {
          case "FixedPointHook":
            this.fVo = -833935142;
            break;
          case "SuiGuangHook":
            this.fVo = 561771029;
        }
      else this.fVo = -833935142;
      return (
        (this.RadiusSquared = MathUtils_1.MathUtils.Square(this.Radius)), !0
      );
    }
    OnStart() {
      if (
        ((this.Hte = this.Entity.GetComponent(182)),
        this.Entity.GetComponent(0))
      ) {
        GrapplingHookPointComponent_1.Ven ||
          (ModelManager_1.ModelManager.RouletteModel.UnlockExploreSkillDataMap.has(
            HOOK_VISION_ID,
          ) &&
            (GrapplingHookPointComponent_1.Ven = !0));
        let t = !1;
        if (GrapplingHookPointComponent_1.Ven) {
          for (const e of hookPointStateTagMap.keys())
            if (this.Lie.HasTag(e)) {
              t = !0;
              break;
            }
          t || (this.Lie.AddTag(1888174838), (this.ac = 0));
        }
        GrapplingHookPointComponent_1.AllPoints.push(this),
          EventSystem_1.EventSystem.Add(
            EventDefine_1.EEventName.AddExploreVisionSkill,
            this.Fen,
          );
      }
      return !0;
    }
    OnEnd() {
      const t = GrapplingHookPointComponent_1.AllPoints.indexOf(this);
      return (
        t >= 0 && GrapplingHookPointComponent_1.AllPoints.splice(t, 1),
        EventSystem_1.EventSystem.Remove(
          EventDefine_1.EEventName.AddExploreVisionSkill,
          this.Fen,
        ),
        !0
      );
    }
    ChangeHookPointState(t) {
      this.ac !== t &&
        (this.Lie.RemoveTag(hookPointStateTagMap.get(this.ac)),
        this.ac === 1 &&
          this.Entity.GetComponent(182).PlaySceneInteractionEndEffect(0),
        (this.ac = t),
        this.Lie.AddTag(hookPointStateTagMap.get(this.ac)));
    }
    CheckCondition() {
      return (
        void 0 === this.YO ||
        ControllerHolder_1.ControllerHolder.LevelGeneralController.CheckConditionNew(
          this.YO,
          this.Hte.Owner,
          LevelGeneralContextDefine_1.EntityContext.Create(this.Entity.Id),
        )
      );
    }
    TryStartCd() {
      void 0 !== this.Lo.HookLockCd &&
        ((this.ken = !0),
        TimerSystem_1.TimerSystem.Delay(() => {
          this.ken = !1;
        }, this.Lo.HookLockCd * TimeUtil_1.TimeUtil.InverseMillisecond));
    }
    WasRecentlyRenderOnScreen() {
      let t = this.Hte?.CurLevelPrefabShowActor;
      if (t?.IsValid()) {
        if (t instanceof TsEffectActor_1.default) {
          const e = t.GetHandle();
          if (
            !EffectSystem_1.EffectSystem.IsValid(e) &&
            (this.Hte.RefreshShowActor(),
            !(t = this.Hte?.CurLevelPrefabShowActor)?.IsValid())
          )
            return !1;
        }
        return UE.KuroStaticLibrary.IsObjectClassByName(
          t,
          CharacterNameDefines_1.CharacterNameDefines.BP_BASEITEM,
        ) &&
          (this.Hte.RefreshShowActor(),
          !(t = this.Hte?.CurLevelPrefabShowActor)?.IsValid())
          ? !1
          : t.WasRecentlyRenderedOnScreen(0.5);
      }
      return !1;
    }
    GetTagId() {
      return this.fVo;
    }
    GetHookInteractType() {
      return this.Lo.HookInteractConfig?.Type ?? "FixedPointHook";
    }
  });
(GrapplingHookPointComponent.AllPoints = []),
  (GrapplingHookPointComponent.Ven = !1),
  (GrapplingHookPointComponent = GrapplingHookPointComponent_1 =
    __decorate(
      [(0, RegisterComponent_1.RegisterComponent)(73)],
      GrapplingHookPointComponent,
    )),
  (exports.GrapplingHookPointComponent = GrapplingHookPointComponent);
// # sourceMappingURL=GrapplingHookPointComponent.js.map
