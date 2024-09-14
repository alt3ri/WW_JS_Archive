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
        (this.G4r = !1),
        (this.N4r = !1),
        (this.O4r = void 0),
        (this.k4r = !1),
        (this.F4r = void 0),
        (this.V4r = void 0),
        (this.H4r = void 0),
        (this.j4r = void 0),
        (this.cBe = void 0),
        (this.W4r = void 0),
        (this.K4r = 0),
        (this.Q4r = 0),
        (this.X4r = 0),
        (this.$4r = 0),
        (this.Y4r = 0),
        (this.J4r = void 0),
        (this.z4r = void 0),
        (this.Z4r = !1),
        (this.e5r = 0),
        (this.t5r = !1),
        (this.fHe = () => {
          this.i5r() ? this.Ore() : this.kre();
        }),
        (this.o5r = (t, e) => {
          if (t && this.O4r.IsLegalExceptSkill()) {
            if (((this.F4r = this.O4r.GetNextTarget()), this.F4r)) {
              if (this.Q4r === this.F4r.Entity.Id) return;
              this.Q4r = this.F4r.Entity.Id;
            }
            (this.N4r = !0),
              this.Z4r &&
                (0 !== this.z4r
                  ? (this.e5r = HOOK_VISION_ID)
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
                    (CharacterExploreComponent_1.r5r = !1)));
          } else
            (this.N4r = !1),
              (this.F4r = void 0),
              (this.Q4r = 0),
              (this.K4r = 0),
              this.n5r(0);
        }),
        (this.s5r = (t, e, i) => {
          i ||
            (t
              ? ((this.G4r = !0),
                (this.V4r = e),
                (this.j4r = this.V4r.GetComponent(1)),
                (this.$4r = e.Id),
                this.Z4r &&
                  (1 !== this.z4r
                    ? (this.e5r = MANIPULATE_VISION_ID)
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
                      (CharacterExploreComponent_1.r5r = !1))))
              : ((this.G4r = !1),
                (this.V4r = void 0),
                (this.j4r = void 0),
                (this.$4r = 0),
                (this.X4r = 0),
                this.n5r(1))),
            (this.k4r = i);
        }),
        (this.a5r = () => {
          CharacterExploreComponent_1.r5r = !1;
        }),
        (this.h5r = (t) => {
          (this.Y4r = 0), (this.G4r = !1), (this.N4r = !1);
        }),
        (this.l5r = (t, e) => {}),
        (this.ene = (t, e) => {
          this.J4r.includes(e) &&
            ((this.Z4r = !1),
            (this.z4r = void 0),
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
                ["newSkill", this.e5r],
                ["id", this.Entity.Id],
              ),
            RouletteController_1.RouletteController.ExploreSkillSetRequest(
              this.e5r,
              void 0,
              !0,
            ),
            (this.e5r = 0),
            EventSystem_1.EventSystem.RemoveWithTarget(
              this.Entity,
              EventDefine_1.EEventName.OnSkillEnd,
              this.ene,
            ),
            (CharacterExploreComponent_1.r5r = !1),
            (this.O4r.NeedChangeTargetState = !0));
        });
    }
    OnStart() {
      return (
        (this.O4r = this.Entity.GetComponent(90)),
        (this.H4r = this.Entity.GetComponent(1)),
        (this.cBe = this.Entity.GetComponent(34)),
        (this.Y4r = 0),
        this.i5r() && this.Ore(),
        EventSystem_1.EventSystem.Add(
          EventDefine_1.EEventName.OnChangeRole,
          this.fHe,
        ),
        !0
      );
    }
    OnEnd() {
      return (
        this.W4r && (this.W4r.Clear(), (this.W4r = void 0)),
        this.kre(),
        EventSystem_1.EventSystem.Remove(
          EventDefine_1.EEventName.OnChangeRole,
          this.fHe,
        ),
        !0
      );
    }
    OnTick() {
      return this._5r(), !0;
    }
    _5r() {
      var t;
      (this.N4r || this.G4r) &&
        ((t = ModelManager_1.ModelManager.RouletteModel.CurrentExploreSkillId),
        this.N4r !== this.G4r ? this.u5r(t) : this.c5r(t));
    }
    u5r(t) {
      this.N4r &&
      this.Q4r !== this.K4r &&
      t !== HOOK_VISION_ID &&
      this.O4r.IsLegalExceptSkill()
        ? (this.m5r(0), (this.O4r.NeedChangeTargetState = !0))
        : this.G4r &&
          this.$4r !== this.X4r &&
          t !== MANIPULATE_VISION_ID &&
          (this.m5r(1), (this.O4r.NeedChangeTargetState = !1));
    }
    c5r(t) {
      var e, i, s;
      this.k4r
        ? t !== MANIPULATE_VISION_ID && this.m5r(1)
        : ((s = this.H4r.ActorLocationProxy),
          (i = this.F4r.HookLocation),
          (e = this.j4r.ActorLocationProxy),
          (i = Vector_1.Vector.DistSquared(s, i)),
          (s = Vector_1.Vector.DistSquared(s, e)),
          Math.abs(i - s) < Number.EPSILON || s < i
            ? (t !== MANIPULATE_VISION_ID &&
                this.$4r !== this.X4r &&
                this.m5r(1),
              (this.O4r.NeedChangeTargetState = !1))
            : (t !== HOOK_VISION_ID &&
                this.Q4r !== this.K4r &&
                this.O4r.IsLegalExceptSkill() &&
                this.m5r(0),
              (this.O4r.NeedChangeTargetState = !0)));
    }
    Ore() {
      this.t5r ||
        ((this.t5r = !0),
        EventSystem_1.EventSystem.Add(
          EventDefine_1.EEventName.OnManipulateSwitchToNewTarget,
          this.s5r,
        ),
        EventSystem_1.EventSystem.Add(
          EventDefine_1.EEventName.RoleFindFixHook,
          this.o5r,
        ),
        EventSystem_1.EventSystem.Add(
          EventDefine_1.EEventName.OnChangeSelectedExploreId,
          this.a5r,
        ),
        EventSystem_1.EventSystem.Add(
          EventDefine_1.EEventName.ChangeVisionSkillByTab,
          this.h5r,
        ),
        EventSystem_1.EventSystem.Add(
          EventDefine_1.EEventName.CharUseSkill,
          this.l5r,
        ));
    }
    kre() {
      this.t5r &&
        ((this.t5r = !1),
        EventSystem_1.EventSystem.Remove(
          EventDefine_1.EEventName.OnManipulateSwitchToNewTarget,
          this.s5r,
        ),
        EventSystem_1.EventSystem.Remove(
          EventDefine_1.EEventName.RoleFindFixHook,
          this.o5r,
        ),
        EventSystem_1.EventSystem.Remove(
          EventDefine_1.EEventName.OnChangeSelectedExploreId,
          this.a5r,
        ),
        EventSystem_1.EventSystem.Remove(
          EventDefine_1.EEventName.ChangeVisionSkillByTab,
          this.h5r,
        ),
        EventSystem_1.EventSystem.Remove(
          EventDefine_1.EEventName.CharUseSkill,
          this.l5r,
        ));
    }
    m5r(t) {
      0 === this.Y4r &&
        (this.Y4r =
          ModelManager_1.ModelManager.RouletteModel.CurrentExploreSkillId);
      let e = 0;
      switch (t) {
        case 0:
          (e = HOOK_VISION_ID), (this.K4r = this.Q4r);
          break;
        case 1:
          (e = MANIPULATE_VISION_ID), (this.X4r = this.$4r);
      }
      this.d5r(e) &&
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
        RouletteController_1.RouletteController.ExploreSkillSetRequest(
          e,
          void 0,
          !0,
        ));
    }
    n5r(t) {
      if (this.N4r || this.G4r)
        this.N4r && (this.m5r(0), (this.O4r.NeedChangeTargetState = !0));
      else if (0 !== this.Y4r && !CharacterExploreComponent_1.r5r)
        if (((CharacterExploreComponent_1.r5r = !0), this.C5r())) {
          switch (((this.z4r = t), (this.Z4r = !0), (this.e5r = this.Y4r), t)) {
            case 0:
              this.J4r = HOOK_SKILL_IDS;
              break;
            case 1:
              this.J4r = MANIPULATE_SKILL_IDS;
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
              ["newSkill", this.Y4r],
              ["id", this.Entity.Id],
            ),
            RouletteController_1.RouletteController.ExploreSkillSetRequest(
              this.Y4r,
              void 0,
              !0,
            ),
            (this.O4r.NeedChangeTargetState = !0);
    }
    d5r(t) {
      return ModelManager_1.ModelManager.RouletteModel.UnlockExploreSkillDataMap.has(
        t,
      );
    }
    IsNeedResetSkill() {
      return (
        0 !== this.Y4r &&
        this.Y4r !==
          ModelManager_1.ModelManager.RouletteModel.CurrentExploreSkillId
      );
    }
    C5r() {
      var t;
      return !(
        !this.cBe.CurrentSkill ||
        ((t = this.cBe.CurrentSkill.SkillId),
        !MANIPULATE_SKILL_IDS.includes(t) && !HOOK_SKILL_IDS.includes(t))
      );
    }
    i5r() {
      return (
        ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity?.Id ===
        this.Entity.Id
      );
    }
    GetHighlightExploreSkill() {
      return (
        this.W4r ||
          ((this.W4r =
            new HighlightExploreSkillLogic_1.HighlightExploreSkillLogic()),
          this.W4r.Init(this.Entity.GetComponent(190))),
        this.W4r
      );
    }
  });
(CharacterExploreComponent.r5r = !1),
  (CharacterExploreComponent = CharacterExploreComponent_1 =
    __decorate(
      [(0, RegisterComponent_1.RegisterComponent)(47)],
      CharacterExploreComponent,
    )),
  (exports.CharacterExploreComponent = CharacterExploreComponent);
//# sourceMappingURL=CharacterExploreComponent.js.map
