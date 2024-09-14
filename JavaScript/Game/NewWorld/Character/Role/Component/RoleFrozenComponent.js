"use strict";
var RoleFrozenComponent_1,
  __decorate =
    (this && this.__decorate) ||
    function (e, o, t, n) {
      var i,
        r = arguments.length,
        s =
          r < 3
            ? o
            : null === n
              ? (n = Object.getOwnPropertyDescriptor(o, t))
              : n;
      if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
        s = Reflect.decorate(e, o, t, n);
      else
        for (var l = e.length - 1; 0 <= l; l--)
          (i = e[l]) &&
            (s = (r < 3 ? i(s) : 3 < r ? i(o, t, s) : i(o, t)) || s);
      return 3 < r && s && Object.defineProperty(o, t, s), s;
    };
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RoleFrozenComponent = void 0);
const RegisterComponent_1 = require("../../../../../Core/Entity/RegisterComponent"),
  Vector_1 = require("../../../../../Core/Utils/Math/Vector"),
  BaseFrozenComponent_1 = require("../../Common/Component/Abilities/BaseFrozenComponent"),
  GameplayCueController_1 = require("../../Common/Component/Abilities/GameplayCueSFX/Controller/GameplayCueController"),
  CustomMovementDefine_1 = require("../../Common/Component/Move/CustomMovementDefine"),
  frozenCueId = 1003n,
  cancelFrozenCueId = 100302n;
let RoleFrozenComponent =
  (RoleFrozenComponent_1 = class RoleFrozenComponent extends (
    BaseFrozenComponent_1.BaseFrozenComponent
  ) {
    constructor() {
      super(...arguments),
        (this.MoveForbidHandle = void 0),
        (this.AnimForbidHandle = void 0),
        (this.AbilityForbidHandle = void 0),
        (this.SkillForbidHandle = void 0),
        (this.FrozenCueHandle = GameplayCueController_1.INVALID_CUE_HANDLE),
        (this.IsFrozenInternal = !1);
    }
    IsFrozen() {
      return this.IsFrozenInternal;
    }
    SetFrozen(e) {
      if (this.IsFrozenInternal !== e) {
        this.IsFrozenInternal = e;
        var o = this.Entity.GetComponent(164),
          t = this.Entity.GetComponent(102),
          n = this.Entity.GetComponent(17),
          i = this.Entity.GetComponent(34);
        const s = this.Entity.GetComponent(19);
        var r = this.Entity.GetComponent(190)?.TagContainer;
        (this.Entity.GetComponent(101).Frozen = e)
          ? ((this.MoveForbidHandle =
              this.MoveForbidHandle ?? o?.Disable("RoleFrozen")),
            (this.AnimForbidHandle =
              this.AnimForbidHandle ?? t?.Disable("RoleFrozen")),
            (this.AbilityForbidHandle =
              this.AbilityForbidHandle ?? n?.Disable("RoleFrozen")),
            (this.SkillForbidHandle =
              this.SkillForbidHandle ?? i?.Disable("RoleFrozen")),
            this.FrozenCueHandle ===
              GameplayCueController_1.INVALID_CUE_HANDLE &&
              (this.FrozenCueHandle = s.CreateGameplayCue(frozenCueId)),
            r &&
              (r.AddExactTag(6, -752177221),
              r.AddExactTag(6, 1098729489),
              r.AddExactTag(6, -8769906),
              r.AddExactTag(6, -1927813876),
              r.AddExactTag(6, 477750727),
              r.AddExactTag(6, 1448371427),
              r.AddExactTag(6, 930178923),
              r.AddExactTag(6, -291592299)),
            this.ChangeMovementModeInFrozen(o),
            this.ActorComponent &&
              (RoleFrozenComponent_1.TmpVector.DeepCopy(
                this.ActorComponent.ActorVelocityProxy,
              ),
              0 < RoleFrozenComponent_1.TmpVector.Z) &&
              ((RoleFrozenComponent_1.TmpVector.Z = 0),
              o.SetForceSpeed(RoleFrozenComponent_1.TmpVector)))
          : (void 0 !== this.MoveForbidHandle &&
              (o?.Enable(
                this.MoveForbidHandle,
                "[RoleFrozenComponent.SetFrozen] this.MoveForbidHandle !== undefined",
              ),
              (this.MoveForbidHandle = void 0)),
            void 0 !== this.AnimForbidHandle &&
              (t?.Enable(
                this.AnimForbidHandle,
                "[RoleFrozenComponent.SetFrozen] this.AnimForbidHandle !== undefined",
              ),
              (this.AnimForbidHandle = void 0)),
            void 0 !== this.AbilityForbidHandle &&
              (n?.Enable(
                this.AbilityForbidHandle,
                "[RoleFrozenComponent.SetFrozen] this.AbilityForbidHandle !== undefined",
              ),
              (this.AbilityForbidHandle = void 0)),
            void 0 !== this.SkillForbidHandle &&
              (i?.Enable(
                this.SkillForbidHandle,
                "[RoleFrozenComponent.SetFrozen] this.SkillForbidHandle !== undefined",
              ),
              (this.SkillForbidHandle = void 0)),
            s.DestroyGameplayCueByHandle(this.FrozenCueHandle),
            (this.FrozenCueHandle = s.CreateGameplayCue(cancelFrozenCueId, {
              EndCallback: () => {
                s.DestroyGameplayCueByHandle(this.FrozenCueHandle),
                  (this.FrozenCueHandle =
                    GameplayCueController_1.INVALID_CUE_HANDLE);
              },
            })),
            r &&
              (r.RemoveTag(6, -752177221),
              r.RemoveTag(6, 1098729489),
              r.RemoveTag(6, -8769906),
              r.RemoveTag(6, -1927813876),
              r.RemoveTag(6, 477750727),
              r.RemoveTag(6, 1448371427),
              r.RemoveTag(6, 930178923),
              r.RemoveTag(6, -291592299)),
            (e = this.Entity.GetComponent(163)) &&
              e.MainAnimInstance.冰冻结束事件());
      }
    }
    ChangeMovementModeInFrozen(e) {
      var o, t;
      e.CharacterMovement &&
        ((o = e.CharacterMovement.MovementMode),
        (t = e.CharacterMovement.CustomMovementMode),
        1 === o ||
          3 === o ||
          (6 === o && t === CustomMovementDefine_1.CUSTOM_MOVEMENTMODE_SWIM) ||
          e.CharacterMovement.SetMovementMode(3));
    }
  });
(RoleFrozenComponent.TmpVector = Vector_1.Vector.Create()),
  (RoleFrozenComponent = RoleFrozenComponent_1 =
    __decorate(
      [(0, RegisterComponent_1.RegisterComponent)(177)],
      RoleFrozenComponent,
    )),
  (exports.RoleFrozenComponent = RoleFrozenComponent);
//# sourceMappingURL=RoleFrozenComponent.js.map
