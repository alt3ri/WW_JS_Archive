"use strict";
let BaseUnifiedStateComponent_1;
const __decorate =
  (this && this.__decorate) ||
  function (e, t, i, a) {
    let n;
    const s = arguments.length;
    let o =
      s < 3 ? t : a === null ? (a = Object.getOwnPropertyDescriptor(t, i)) : a;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
      o = Reflect.decorate(e, t, i, a);
    else
      for (let r = e.length - 1; r >= 0; r--)
        (n = e[r]) && (o = (s < 3 ? n(o) : s > 3 ? n(t, i, o) : n(t, i)) || o);
    return s > 3 && o && Object.defineProperty(t, i, o), o;
  };
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.BaseUnifiedStateComponent = void 0);
const Log_1 = require("../../../../Core/Common/Log");
const EntityComponent_1 = require("../../../../Core/Entity/EntityComponent");
const RegisterComponent_1 = require("../../../../Core/Entity/RegisterComponent");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const CharacterUnifiedStateTypes_1 = require("../../Character/Common/Component/Abilities/CharacterUnifiedStateTypes");
const CustomMovementDefine_1 = require("../../Character/Common/Component/Move/CustomMovementDefine");
let BaseUnifiedStateComponent =
  (BaseUnifiedStateComponent_1 = class BaseUnifiedStateComponent extends (
    EntityComponent_1.EntityComponent
  ) {
    constructor() {
      super(...arguments),
        (this.TagComponent = void 0),
        (this.ActorComponent = void 0),
        (this.CachedPositionState =
          CharacterUnifiedStateTypes_1.ECharPositionState.Ground),
        (this.CachedMoveState =
          CharacterUnifiedStateTypes_1.ECharMoveState.Stand),
        (this.CachedDirectionState =
          CharacterUnifiedStateTypes_1.ECharDirectionState.FaceDirection),
        (this.IsInFighting = !1),
        (this.mnn = (e, t, i, a, n) => {
          switch (i) {
            case 0:
              this.SetPositionState(
                CharacterUnifiedStateTypes_1.ECharPositionState.Ground,
              ),
                this.SetMoveState(
                  CharacterUnifiedStateTypes_1.ECharMoveState.Other,
                );
              break;
            case 1:
            case 2:
              this.SetPositionState(
                CharacterUnifiedStateTypes_1.ECharPositionState.Ground,
              );
              break;
            case 3:
              this.SetPositionState(
                CharacterUnifiedStateTypes_1.ECharPositionState.Air,
              ),
                this.MoveState !==
                  CharacterUnifiedStateTypes_1.ECharMoveState.KnockUp &&
                  this.MoveState !==
                    CharacterUnifiedStateTypes_1.ECharMoveState.Captured &&
                  this.SetMoveState(
                    CharacterUnifiedStateTypes_1.ECharMoveState.Other,
                  );
              break;
            case 5:
              this.SetPositionState(
                CharacterUnifiedStateTypes_1.ECharPositionState.Air,
              ),
                this.MoveState !==
                  CharacterUnifiedStateTypes_1.ECharMoveState.Captured &&
                  this.SetMoveState(
                    CharacterUnifiedStateTypes_1.ECharMoveState.Flying,
                  );
              break;
            case 6:
              switch (n) {
                case CustomMovementDefine_1.CUSTOM_MOVEMENTMODE_CLIMB:
                  this.SetPositionState(
                    CharacterUnifiedStateTypes_1.ECharPositionState.Climb,
                  );
                  break;
                case CustomMovementDefine_1.CUSTOM_MOVEMENTMODE_SWIM:
                  this.SetPositionState(
                    CharacterUnifiedStateTypes_1.ECharPositionState.Water,
                  );
                  break;
                case CustomMovementDefine_1.CUSTOM_MOVEMENTMODE_GLIDE:
                  this.SetPositionState(
                    CharacterUnifiedStateTypes_1.ECharPositionState.Air,
                  ),
                    this.SetMoveState(
                      CharacterUnifiedStateTypes_1.ECharMoveState.Glide,
                    );
                  break;
                case CustomMovementDefine_1.CUSTOM_MOVEMENTMODE_UP_TO_WALK_ON_WATER:
                  this.SetPositionState(
                    CharacterUnifiedStateTypes_1.ECharPositionState.Ground,
                  );
                  break;
                case CustomMovementDefine_1.CUSTOM_MOVEMENTMODE_SKI:
                  this.SetPositionState(
                    CharacterUnifiedStateTypes_1.ECharPositionState.Ski,
                  );
                  break;
                default:
                  this.SetPositionState(
                    CharacterUnifiedStateTypes_1.ECharPositionState.Air,
                  );
              }
          }
        }),
        (this.IsInGameInternal = void 0);
    }
    OnStart() {
      return (
        (this.ActorComponent = this.Entity.GetComponent(1)),
        (this.TagComponent = this.Entity.GetComponent(185)),
        (this.IsInGameInternal = !1),
        this.InitCharState(),
        EventSystem_1.EventSystem.AddWithTarget(
          this.Entity,
          EventDefine_1.EEventName.CharMovementModeChanged,
          this.mnn,
        ),
        !0
      );
    }
    OnActivate() {
      this.SetIsInGame(this.Entity.Active);
    }
    OnInit() {
      return BaseUnifiedStateComponent_1.Load(), !0;
    }
    OnEnable() {
      return this.SetIsInGame(!0), !0;
    }
    OnDisable() {
      return this.SetIsInGame(!1), !0;
    }
    OnEnd() {
      return (
        EventSystem_1.EventSystem.RemoveWithTarget(
          this.Entity,
          EventDefine_1.EEventName.CharMovementModeChanged,
          this.mnn,
        ),
        !0
      );
    }
    get IsInGame() {
      return this.IsInGameInternal;
    }
    SetIsInGame(e) {
      this.IsInGameInternal = e;
    }
    static Load() {
      if (this.BaseNeedLoad) {
        (this.PositionTagIdList = [
          -1898186757, 504239013, 40422668, 855966206,
        ]),
          (this.MoveTagIdList = [
            -1867662364, 248240472, 498191540, -1625986130, 874657114,
            316338736, 1781274524, -1756660346, 1453491643, -1515012024,
            -846247571, -1989694637, -1654460638, 2060652336, 2111364199,
            756800494, 262865373, 31862857, -1973127492, -1504358738,
            -652371212, -648310348, -1159105522,
          ]),
          (this.DirectionTagIdList = [
            -1150819426, 428837378, -1462404775, 1260125908,
          ]),
          (this.PositionEnumToTagId = new Map()),
          (this.PositionEnumToTagIdInverse = new Map());
        for (const e of BaseUnifiedStateComponent_1.PositionEnumKeys)
          this.PositionEnumToTagId.set(e, this.PositionTagIdList[e]),
            this.PositionEnumToTagIdInverse.set(this.PositionTagIdList[e], e);
        (this.MoveEnumToTagId = new Map()),
          (this.MoveEnumToTagIdInverse = new Map());
        for (const t of BaseUnifiedStateComponent_1.MoveEnumKeys)
          this.MoveEnumToTagId.set(t, this.MoveTagIdList[t]),
            this.MoveEnumToTagIdInverse.set(this.MoveTagIdList[t], t);
        (this.DirectionEnumToTagId = new Map()),
          (this.DirectionEnumToTagIdInverse = new Map());
        for (const i of BaseUnifiedStateComponent_1.DirectionEnumKeys)
          this.DirectionEnumToTagId.set(i, this.DirectionTagIdList[i]),
            this.DirectionEnumToTagIdInverse.set(this.DirectionTagIdList[i], i);
        this.BaseNeedLoad = !1;
      }
    }
    InitCharState() {
      this.TagComponent?.AddTag(
        BaseUnifiedStateComponent_1.PositionEnumToTagId.get(
          CharacterUnifiedStateTypes_1.ECharPositionState.Ground,
        ),
      ),
        this.TagComponent?.AddTag(
          BaseUnifiedStateComponent_1.MoveEnumToTagId.get(
            CharacterUnifiedStateTypes_1.ECharMoveState.Stand,
          ),
        ),
        this.TagComponent?.AddTag(
          BaseUnifiedStateComponent_1.DirectionEnumToTagId.get(
            CharacterUnifiedStateTypes_1.ECharDirectionState.FaceDirection,
          ),
        );
    }
    ResetCharState() {
      this.SetMoveState(CharacterUnifiedStateTypes_1.ECharMoveState.Stand),
        this.SetDirectionState(
          CharacterUnifiedStateTypes_1.ECharDirectionState.FaceDirection,
        );
    }
    SetPositionState(e) {
      let t = this.PositionState;
      this.ActorComponent.IsAutonomousProxy
        ? t !== e &&
          (this.TagComponent?.RemoveTag(1700920381),
          this.TagComponent?.AddTag(
            BaseUnifiedStateComponent_1.PositionEnumToTagId.get(e),
          ),
          (this.CachedPositionState = e),
          this.OnPositionStateChange(t, e))
        : (this.TagComponent?.RemoveTag(1700920381),
          this.TagComponent?.AddTag(
            BaseUnifiedStateComponent_1.PositionEnumToTagId.get(e),
          ),
          (t = this.CachedPositionState),
          (this.CachedPositionState = e),
          this.OnPositionStateChange(t, e));
    }
    get PositionState() {
      if (!this.ActorComponent.IsAutonomousProxy)
        for (const e of BaseUnifiedStateComponent_1.PositionTagIdList)
          if (this.TagComponent?.HasTag(e))
            return BaseUnifiedStateComponent_1.PositionEnumToTagIdInverse.get(
              e,
            );
      return this.CachedPositionState;
    }
    OnPositionStateChange(e, t) {
      switch (
        (Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug(
            "Character",
            6,
            "UnifiedState PositionStateChange",
            ["EntityId", this.Entity.Id],
            ["Name", this.ActorComponent?.Owner?.GetName()],
            ["From", CharacterUnifiedStateTypes_1.ECharPositionState[e]],
            ["To", CharacterUnifiedStateTypes_1.ECharPositionState[t]],
          ),
        t)
      ) {
        case CharacterUnifiedStateTypes_1.ECharPositionState.Ground:
          this.OnLand();
          break;
        case CharacterUnifiedStateTypes_1.ECharPositionState.Air:
        case CharacterUnifiedStateTypes_1.ECharPositionState.Water:
        case CharacterUnifiedStateTypes_1.ECharPositionState.Climb:
          this.DirectionState ===
            CharacterUnifiedStateTypes_1.ECharDirectionState.AimDirection &&
            this.SetDirectionState(
              CharacterUnifiedStateTypes_1.ECharDirectionState.FaceDirection,
            );
      }
      EventSystem_1.EventSystem.EmitWithTarget(
        this.Entity,
        EventDefine_1.EEventName.CharOnPositionStateChanged,
        e,
        t,
      );
    }
    OnLand() {
      this.SetMoveState(CharacterUnifiedStateTypes_1.ECharMoveState.Other);
    }
    SetMoveState(e) {
      let t;
      this.ActorComponent.IsAutonomousProxy &&
        (t = this.MoveState) !== e &&
        (Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug(
            "Character",
            6,
            "UnifiedState MoveStateChange",
            ["EntityId", this.Entity.Id],
            ["Name", this.ActorComponent?.Owner?.GetName()],
            ["From", CharacterUnifiedStateTypes_1.ECharMoveState[t]],
            ["To", CharacterUnifiedStateTypes_1.ECharPositionState[e]],
          ),
        this.TagComponent?.RemoveTag(-5899402),
        this.TagComponent?.AddTag(
          BaseUnifiedStateComponent_1.MoveEnumToTagId.get(e),
        ),
        (this.CachedMoveState = e),
        EventSystem_1.EventSystem.EmitWithTarget(
          this.Entity,
          EventDefine_1.EEventName.CharOnUnifiedMoveStateChanged,
          t,
          e,
        ));
    }
    get MoveState() {
      if (!this.ActorComponent.IsAutonomousProxy)
        for (const e of BaseUnifiedStateComponent_1.MoveTagIdList)
          if (this.TagComponent?.HasTag(e))
            return BaseUnifiedStateComponent_1.MoveEnumToTagIdInverse.get(e);
      return this.CachedMoveState;
    }
    SetDirectionState(e) {
      let t;
      this.ActorComponent.IsAutonomousProxy &&
        (t = this.DirectionState) !== e &&
        (this.UpdateDirectionTag(t, e),
        EventSystem_1.EventSystem.EmitWithTarget(
          this.Entity,
          EventDefine_1.EEventName.CharOnDirectionStateChanged,
          t,
          e,
        ));
    }
    get DirectionState() {
      if (!this.ActorComponent.IsAutonomousProxy)
        for (const e of BaseUnifiedStateComponent_1.DirectionTagIdList)
          if (this.TagComponent?.HasTag(e))
            return BaseUnifiedStateComponent_1.DirectionEnumToTagIdInverse.get(
              e,
            );
      return this.CachedDirectionState;
    }
    UpdateDirectionTag(e, t) {
      this.ClearDirectionTag(e),
        this.AddDirectionTag(t),
        (this.CachedDirectionState = t);
    }
    ClearDirectionTag(e) {
      e === CharacterUnifiedStateTypes_1.ECharDirectionState.AimDirection &&
        this.ExitAnimState(),
        this.TagComponent?.RemoveTag(-742468192);
    }
    AddDirectionTag(e) {
      e === CharacterUnifiedStateTypes_1.ECharDirectionState.AimDirection &&
        this.EnterAnimState(),
        this.TagComponent?.AddTag(
          BaseUnifiedStateComponent_1.DirectionEnumToTagId.get(e),
        );
    }
    EnterAnimState() {
      this.TagComponent?.HasTag(-100527303) ||
        this.TagComponent?.HasTag(-1761987351) ||
        this.TagComponent?.HasTag(-1664105924) ||
        this.TagComponent?.AddTag(-1664105924);
    }
    ExitAnimState() {
      this.TagComponent?.RemoveTag(-1664105924),
        this.TagComponent?.RemoveTag(-100527303),
        this.TagComponent?.RemoveTag(1432398233);
    }
  });
(BaseUnifiedStateComponent.PositionEnumKeys = Object.values(
  CharacterUnifiedStateTypes_1.ECharPositionState,
).filter((e) => typeof e === "number")),
  (BaseUnifiedStateComponent.MoveEnumKeys = Object.values(
    CharacterUnifiedStateTypes_1.ECharMoveState,
  ).filter((e) => typeof e === "number")),
  (BaseUnifiedStateComponent.DirectionEnumKeys = Object.values(
    CharacterUnifiedStateTypes_1.ECharDirectionState,
  ).filter((e) => typeof e === "number")),
  (BaseUnifiedStateComponent.PositionTagIdList = void 0),
  (BaseUnifiedStateComponent.MoveTagIdList = void 0),
  (BaseUnifiedStateComponent.SubStateTagIdList = void 0),
  (BaseUnifiedStateComponent.DirectionTagIdList = void 0),
  (BaseUnifiedStateComponent.MoveEnumToTagId = void 0),
  (BaseUnifiedStateComponent.MoveEnumToTagIdInverse = void 0),
  (BaseUnifiedStateComponent.PositionEnumToTagId = void 0),
  (BaseUnifiedStateComponent.PositionEnumToTagIdInverse = void 0),
  (BaseUnifiedStateComponent.DirectionEnumToTagId = void 0),
  (BaseUnifiedStateComponent.DirectionEnumToTagIdInverse = void 0),
  (BaseUnifiedStateComponent.BaseNeedLoad = !0),
  (BaseUnifiedStateComponent = BaseUnifiedStateComponent_1 =
    __decorate(
      [(0, RegisterComponent_1.RegisterComponent)(89)],
      BaseUnifiedStateComponent,
    )),
  (exports.BaseUnifiedStateComponent = BaseUnifiedStateComponent);
// # sourceMappingURL=BaseUnifiedStateComponent.js.map
