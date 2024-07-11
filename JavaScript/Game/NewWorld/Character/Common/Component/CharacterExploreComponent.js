"use strict";
var CharacterExploreComponent_1,
  __decorate =
    (this && this.__decorate) ||
    function (t, e, i, s) {
      var h,
        n = arguments.length,
        r =
          n < 3
            ? e
            : null === s
              ? (s = Object.getOwnPropertyDescriptor(e, i))
              : s;
      if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
        r = Reflect.decorate(t, e, i, s);
      else
        for (var o = t.length - 1; 0 <= o; o--)
          (h = t[o]) &&
            (r = (n < 3 ? h(r) : 3 < n ? h(e, i, r) : h(e, i)) || r);
      return 3 < n && r && Object.defineProperty(e, i, r), r;
    };
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CharacterExploreComponent = void 0);
const Log_1 = require("../../../../../Core/Common/Log"),
  EntityComponent_1 = require("../../../../../Core/Entity/EntityComponent"),
  RegisterComponent_1 = require("../../../../../Core/Entity/RegisterComponent"),
  Vector_1 = require("../../../../../Core/Utils/Math/Vector"),
  EventDefine_1 = require("../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../Common/Event/EventSystem"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  RouletteController_1 = require("../../../../Module/Roulette/RouletteController"),
  HighlightExploreSkillLogic_1 = require("./Skill/HighlightExploreSkillLogic"),
  HOOK_VISION_ID = 1001,
  MANIPULATE_VISION_ID = 1003,
  MANIPULATE_SKILL_IDS = [210007],
  HOOK_SKILL_IDS = [100020, 100021];
let CharacterExploreComponent =
  (CharacterExploreComponent_1 = class CharacterExploreComponent extends (
    EntityComponent_1.EntityComponent
  ) {
    constructor() {
      super(...arguments),
        (this.r5r = !1),
        (this.n5r = !1),
        (this.s5r = void 0),
        (this.a5r = !1),
        (this.h5r = void 0),
        (this.l5r = void 0),
        (this._5r = void 0),
        (this.u5r = void 0),
        (this.cBe = void 0),
        (this.c5r = void 0),
        (this.m5r = 0),
        (this.d5r = 0),
        (this.C5r = 0),
        (this.g5r = 0),
        (this.f5r = 0),
        (this.p5r = void 0),
        (this.v5r = void 0),
        (this.M5r = !1),
        (this.S5r = 0),
        (this.E5r = !1),
        (this.o7e = () => {
          this.y5r() ? this.Ore() : this.kre();
        }),
        (this.I5r = (t, e) => {
          if (t && this.s5r.IsLegalExceptSkill()) {
            if (((this.h5r = this.s5r.GetNextTarget()), this.h5r)) {
              if (this.d5r === this.h5r.Entity.Id) return;
              this.d5r = this.h5r.Entity.Id;
            }
            (this.n5r = !0),
              this.M5r &&
                (0 !== this.v5r
                  ? (this.S5r = HOOK_VISION_ID)
                  : EventSystem_1.EventSystem.HasWithTarget(
                      this.Entity,
                      EventDefine_1.EEventName.OnSkillEnd,
                      this.ene,
                    ) &&
                    (EventSystem_1.EventSystem.RemoveWithTarget(
                      this.Entity,
                      EventDefine_1.EEventName.OnSkillEnd,
                      this.ene,
                    ),
                    (CharacterExploreComponent_1.T5r = !1)));
          } else
            (this.n5r = !1),
              (this.h5r = void 0),
              (this.d5r = 0),
              (this.m5r = 0),
              this.L5r(0);
        }),
        (this.D5r = (t, e, i) => {
          i ||
            (t
              ? ((this.r5r = !0),
                (this.l5r = e),
                (this.u5r = this.l5r.GetComponent(1)),
                (this.g5r = e.Id),
                this.M5r &&
                  (1 !== this.v5r
                    ? (this.S5r = MANIPULATE_VISION_ID)
                    : EventSystem_1.EventSystem.HasWithTarget(
                        this.Entity,
                        EventDefine_1.EEventName.OnSkillEnd,
                        this.ene,
                      ) &&
                      (EventSystem_1.EventSystem.RemoveWithTarget(
                        this.Entity,
                        EventDefine_1.EEventName.OnSkillEnd,
                        this.ene,
                      ),
                      (CharacterExploreComponent_1.T5r = !1))))
              : ((this.r5r = !1),
                (this.l5r = void 0),
                (this.u5r = void 0),
                (this.g5r = 0),
                (this.C5r = 0),
                this.L5r(1))),
            (this.a5r = i);
        }),
        (this.R5r = () => {
          CharacterExploreComponent_1.T5r = !1;
        }),
        (this.A5r = (t) => {
          (this.f5r = 0), (this.r5r = !1), (this.n5r = !1);
        }),
        (this.U5r = (t, e) => {}),
        (this.ene = (t, e) => {
          this.p5r.includes(e) &&
            ((this.M5r = !1),
            (this.v5r = void 0),
            Log_1.Log.CheckInfo() &&
              Log_1.Log.Info(
                "Character",
                32,
                "[CharacterExploreComponent] OnCharSkillEnd",
                [
                  "oldSkill",
                  ModelManager_1.ModelManager.RouletteModel
                    .CurrentExploreSkillId,
                ],
                ["newSkill", this.S5r],
                ["id", this.Entity.Id],
              ),
            RouletteController_1.RouletteController.ExploreSkillSetRequest(
              this.S5r,
            ),
            (this.S5r = 0),
            EventSystem_1.EventSystem.RemoveWithTarget(
              this.Entity,
              EventDefine_1.EEventName.OnSkillEnd,
              this.ene,
            ),
            (CharacterExploreComponent_1.T5r = !1),
            (this.s5r.NeedChangeTargetState = !0));
        });
    }
    OnStart() {
      return (
        (this.s5r = this.Entity.GetComponent(87)),
        (this._5r = this.Entity.GetComponent(1)),
        (this.cBe = this.Entity.GetComponent(33)),
        (this.f5r = 0),
        this.y5r() && this.Ore(),
        EventSystem_1.EventSystem.Add(
          EventDefine_1.EEventName.OnChangeRole,
          this.o7e,
        ),
        !0
      );
    }
    OnEnd() {
      return (
        this.c5r && (this.c5r.Clear(), (this.c5r = void 0)),
        this.kre(),
        EventSystem_1.EventSystem.Remove(
          EventDefine_1.EEventName.OnChangeRole,
          this.o7e,
        ),
        !0
      );
    }
    OnTick() {
      return this.P5r(), !0;
    }
    P5r() {
      var t;
      (this.n5r || this.r5r) &&
        ((t = ModelManager_1.ModelManager.RouletteModel.CurrentExploreSkillId),
        this.n5r !== this.r5r ? this.x5r(t) : this.w5r(t));
    }
    x5r(t) {
      this.n5r &&
      this.d5r !== this.m5r &&
      t !== HOOK_VISION_ID &&
      this.s5r.IsLegalExceptSkill()
        ? (this.B5r(0), (this.s5r.NeedChangeTargetState = !0))
        : this.r5r &&
          this.g5r !== this.C5r &&
          t !== MANIPULATE_VISION_ID &&
          (this.B5r(1), (this.s5r.NeedChangeTargetState = !1));
    }
    w5r(t) {
      var e, i, s;
      this.a5r
        ? t !== MANIPULATE_VISION_ID && this.B5r(1)
        : ((s = this._5r.ActorLocationProxy),
          (i = this.h5r.Location),
          (e = this.u5r.ActorLocationProxy),
          (i = Vector_1.Vector.DistSquared(s, i)),
          (s = Vector_1.Vector.DistSquared(s, e)),
          Math.abs(i - s) < Number.EPSILON || s < i
            ? (t !== MANIPULATE_VISION_ID &&
                this.g5r !== this.C5r &&
                this.B5r(1),
              (this.s5r.NeedChangeTargetState = !1))
            : (t !== HOOK_VISION_ID &&
                this.d5r !== this.m5r &&
                this.s5r.IsLegalExceptSkill() &&
                this.B5r(0),
              (this.s5r.NeedChangeTargetState = !0)));
    }
    Ore() {
      this.E5r ||
        ((this.E5r = !0),
        EventSystem_1.EventSystem.Add(
          EventDefine_1.EEventName.OnManipulateSwitchToNewTarget,
          this.D5r,
        ),
        EventSystem_1.EventSystem.Add(
          EventDefine_1.EEventName.RoleFindFixHook,
          this.I5r,
        ),
        EventSystem_1.EventSystem.Add(
          EventDefine_1.EEventName.OnChangeSelectedExploreId,
          this.R5r,
        ),
        EventSystem_1.EventSystem.Add(
          EventDefine_1.EEventName.ChangeVisionSkillByTab,
          this.A5r,
        ),
        EventSystem_1.EventSystem.Add(
          EventDefine_1.EEventName.CharUseSkill,
          this.U5r,
        ));
    }
    kre() {
      this.E5r &&
        ((this.E5r = !1),
        EventSystem_1.EventSystem.Remove(
          EventDefine_1.EEventName.OnManipulateSwitchToNewTarget,
          this.D5r,
        ),
        EventSystem_1.EventSystem.Remove(
          EventDefine_1.EEventName.RoleFindFixHook,
          this.I5r,
        ),
        EventSystem_1.EventSystem.Remove(
          EventDefine_1.EEventName.OnChangeSelectedExploreId,
          this.R5r,
        ),
        EventSystem_1.EventSystem.Remove(
          EventDefine_1.EEventName.ChangeVisionSkillByTab,
          this.A5r,
        ),
        EventSystem_1.EventSystem.Remove(
          EventDefine_1.EEventName.CharUseSkill,
          this.U5r,
        ));
    }
    B5r(t) {
      0 === this.f5r &&
        (this.f5r =
          ModelManager_1.ModelManager.RouletteModel.CurrentExploreSkillId);
      let e = 0;
      switch (t) {
        case 0:
          (e = HOOK_VISION_ID), (this.m5r = this.d5r);
          break;
        case 1:
          (e = MANIPULATE_VISION_ID), (this.C5r = this.g5r);
      }
      this.b5r(e) &&
        (Log_1.Log.CheckInfo() &&
          Log_1.Log.Info(
            "Character",
            32,
            "[CharacterExploreComponent] TryChangeSkill",
            [
              "oldSkill",
              ModelManager_1.ModelManager.RouletteModel.CurrentExploreSkillId,
            ],
            ["newSkill", e],
            ["id", this.Entity.Id],
          ),
        RouletteController_1.RouletteController.ExploreSkillSetRequest(e));
    }
    L5r(t) {
      if (this.n5r || this.r5r)
        this.n5r && (this.B5r(0), (this.s5r.NeedChangeTargetState = !0));
      else if (0 !== this.f5r && !CharacterExploreComponent_1.T5r)
        if (((CharacterExploreComponent_1.T5r = !0), this.q5r())) {
          switch (((this.v5r = t), (this.M5r = !0), (this.S5r = this.f5r), t)) {
            case 0:
              this.p5r = HOOK_SKILL_IDS;
              break;
            case 1:
              this.p5r = MANIPULATE_SKILL_IDS;
          }
          EventSystem_1.EventSystem.HasWithTarget(
            this.Entity,
            EventDefine_1.EEventName.OnSkillEnd,
            this.ene,
          ) ||
            EventSystem_1.EventSystem.AddWithTarget(
              this.Entity,
              EventDefine_1.EEventName.OnSkillEnd,
              this.ene,
            );
        } else
          Log_1.Log.CheckInfo() &&
            Log_1.Log.Info(
              "Character",
              32,
              "[CharacterExploreComponent] CheckExit",
              [
                "oldSkill",
                ModelManager_1.ModelManager.RouletteModel.CurrentExploreSkillId,
              ],
              ["newSkill", this.f5r],
              ["id", this.Entity.Id],
            ),
            RouletteController_1.RouletteController.ExploreSkillSetRequest(
              this.f5r,
            ),
            (this.s5r.NeedChangeTargetState = !0);
    }
    b5r(t) {
      return ModelManager_1.ModelManager.RouletteModel.UnlockExploreSkillDataMap.has(
        t,
      );
    }
    IsNeedResetSkill() {
      return (
        0 !== this.f5r &&
        this.f5r !==
          ModelManager_1.ModelManager.RouletteModel.CurrentExploreSkillId
      );
    }
    q5r() {
      var t;
      return !(
        !this.cBe.CurrentSkill ||
        ((t = this.cBe.CurrentSkill.SkillId),
        !MANIPULATE_SKILL_IDS.includes(t) && !HOOK_SKILL_IDS.includes(t))
      );
    }
    y5r() {
      return (
        ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity?.Id ===
        this.Entity.Id
      );
    }
    GetHighlightExploreSkill() {
      return (
        this.c5r ||
          ((this.c5r =
            new HighlightExploreSkillLogic_1.HighlightExploreSkillLogic()),
          this.c5r.Init(this.Entity.GetComponent(185))),
        this.c5r
      );
    }
  });
(CharacterExploreComponent.T5r = !1),
  (CharacterExploreComponent = CharacterExploreComponent_1 =
    __decorate(
      [(0, RegisterComponent_1.RegisterComponent)(45)],
      CharacterExploreComponent,
    )),
  (exports.CharacterExploreComponent = CharacterExploreComponent);
//# sourceMappingURL=CharacterExploreComponent.js.map
