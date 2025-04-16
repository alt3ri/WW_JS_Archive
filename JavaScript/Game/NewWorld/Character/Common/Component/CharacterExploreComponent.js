"use strict";
var __decorate =
  (this && this.__decorate) ||
  function (e, t, i, n) {
    var s,
      r = arguments.length,
      o =
        r < 3
          ? t
          : null === n
            ? (n = Object.getOwnPropertyDescriptor(t, i))
            : n;
    if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
      o = Reflect.decorate(e, t, i, n);
    else
      for (var _ = e.length - 1; 0 <= _; _--)
        (s = e[_]) && (o = (r < 3 ? s(o) : 3 < r ? s(t, i, o) : s(t, i)) || o);
    return 3 < r && o && Object.defineProperty(t, i, o), o;
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
let CharacterExploreComponent = class CharacterExploreComponent extends EntityComponent_1.EntityComponent {
  constructor() {
    super(...arguments),
      (this.O4r = void 0),
      (this.yJl = void 0),
      (this.SJl = void 0),
      (this.k4r = !1),
      (this.H4r = void 0),
      (this.cBe = void 0),
      (this.W4r = void 0),
      (this.J4r = void 0),
      (this.z4r = void 0),
      (this.Z4r = !1),
      (this.t5r = !1),
      (this.fHe = () => {
        this.i5r() ? this.Ore() : this.kre();
      }),
      (this.o5r = (e, t) => {
        var i = ModelManager_1.ModelManager.ExploreModel,
          n = this.O4r;
        e && n.IsLegalExceptSkill()
          ? ((e = n.GetNextTarget()),
            ((i.HookEntity = e) && i.CurHookTriggerId === e.Entity.Id) ||
              (e && (i.CurHookTriggerId = e.Entity.Id),
              (i.HookFound = !0),
              this.Z4r &&
                (0 !== this.z4r
                  ? i.SetExploreSkillId(HOOK_VISION_ID, 2)
                  : EventSystem_1.EventSystem.HasWithTarget(
                      this.Entity,
                      EventDefine_1.EEventName.OnSkillEnd,
                      this.ene,
                    ) &&
                    EventSystem_1.EventSystem.RemoveWithTarget(
                      this.Entity,
                      EventDefine_1.EEventName.OnSkillEnd,
                      this.ene,
                    ))))
          : ((i.HookFound = !1),
            (i.HookEntity = void 0),
            (i.CurHookTriggerId = 0),
            (i.LastHookTriggerId = 0),
            this.n5r(0));
      }),
      (this.s5r = (e, t, i) => {
        (this.k4r = i) ||
          ((i = ModelManager_1.ModelManager.ExploreModel),
          e
            ? ((i.ManipulateFound = !0),
              (i.ManipulateEntity = t),
              (i.ManipulateActorComp = t.GetComponent(1)),
              (i.CurManipulateTriggerId = t.Id),
              this.Z4r &&
                (1 !== this.z4r
                  ? i.SetExploreSkillId(MANIPULATE_VISION_ID, 2)
                  : EventSystem_1.EventSystem.HasWithTarget(
                      this.Entity,
                      EventDefine_1.EEventName.OnSkillEnd,
                      this.ene,
                    ) &&
                    EventSystem_1.EventSystem.RemoveWithTarget(
                      this.Entity,
                      EventDefine_1.EEventName.OnSkillEnd,
                      this.ene,
                    )))
            : ((i.ManipulateFound = !1),
              (i.ManipulateEntity = void 0),
              (i.ManipulateActorComp = void 0),
              (i.CurManipulateTriggerId = 0),
              (i.LastManipulateTriggerId = 0),
              this.n5r(1)));
      }),
      (this.h5r = (e) => {
        var t = ModelManager_1.ModelManager.ExploreModel;
        (t.ManipulateFound = !1),
          (t.HookFound = !1),
          (t.AutoResetSkillFinished = !0);
      }),
      (this.l5r = (e, t) => {}),
      (this.ene = (e, t) => {
        if (this.J4r.includes(t)) {
          (this.Z4r = !1), (this.z4r = void 0);
          const i = ModelManager_1.ModelManager.ExploreModel;
          i.ResetExplodeSkillId(2);
          t = i.GetTopLayerExplodeSkillId();
          Log_1.Log.CheckInfo() &&
            Log_1.Log.Info(
              "Character",
              31,
              "[CharacterExploreComponent] OnCharSkillEnd",
              [
                "oldSkill",
                ModelManager_1.ModelManager.RouletteModel.CurrentExploreSkillId,
              ],
              ["newSkill", t],
              ["id", this.Entity.Id],
            ),
            RouletteController_1.RouletteController.ExploreSkillSetRequest(
              t,
              (e) => {
                i.AutoResetSkillFinished = !0;
              },
              !0,
            ),
            EventSystem_1.EventSystem.RemoveWithTarget(
              this.Entity,
              EventDefine_1.EEventName.OnSkillEnd,
              this.ene,
            ),
            (this.O4r.NeedChangeTargetState = !0);
        }
      });
  }
  OnStart() {
    return (
      (this.O4r = this.Entity.GetComponent(97)),
      (this.H4r = this.Entity.GetComponent(1)),
      (this.cBe = this.Entity.GetComponent(39)),
      (this.yJl = this.Entity.GetComponent(64)),
      (this.SJl = this.Entity.GetComponent(65)),
      this.i5r() && this.Ore(),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnChangeRole,
        this.fHe,
      ),
      ModelManager_1.ModelManager.ExploreModel.ManipulateFound ||
      ModelManager_1.ModelManager.ExploreModel.HookFound
        ? this._5r()
        : this.n5r(),
      !0
    );
  }
  OnEnable() {
    (this.k4r = !1),
      ModelManager_1.ModelManager.ExploreModel.ManipulateFound ||
      ModelManager_1.ModelManager.ExploreModel.HookFound
        ? this._5r()
        : this.n5r();
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
    void 0 !== this.yJl?.CurSelectedEntity ||
      void 0 !== this.SJl?.GetCurrentTarget ||
      !ModelManager_1.ModelManager.ExploreModel.ManipulateFound ||
      ((ModelManager_1.ModelManager.ExploreModel.ManipulateFound = !1),
      (ModelManager_1.ModelManager.ExploreModel.ManipulateEntity = void 0),
      (ModelManager_1.ModelManager.ExploreModel.ManipulateActorComp = void 0),
      (ModelManager_1.ModelManager.ExploreModel.CurManipulateTriggerId = 0),
      (ModelManager_1.ModelManager.ExploreModel.LastManipulateTriggerId = 0));
    var e = void 0 !== this.O4r?.GetNextTarget();
    !e &&
      ModelManager_1.ModelManager.ExploreModel.HookFound &&
      ((ModelManager_1.ModelManager.ExploreModel.HookFound = !1),
      (ModelManager_1.ModelManager.ExploreModel.HookEntity = void 0),
      (ModelManager_1.ModelManager.ExploreModel.CurHookTriggerId = 0),
      (ModelManager_1.ModelManager.ExploreModel.LastHookTriggerId = 0)),
      (ModelManager_1.ModelManager.ExploreModel.HookFound ||
        ModelManager_1.ModelManager.ExploreModel.ManipulateFound) &&
        ((e = ModelManager_1.ModelManager.RouletteModel.CurrentExploreSkillId),
        ModelManager_1.ModelManager.ExploreModel.HookFound !==
        ModelManager_1.ModelManager.ExploreModel.ManipulateFound
          ? this.u5r(e)
          : this.c5r(e));
  }
  u5r(e) {
    ModelManager_1.ModelManager.ExploreModel.HookFound &&
    ModelManager_1.ModelManager.ExploreModel.CurHookTriggerId !==
      ModelManager_1.ModelManager.ExploreModel.LastHookTriggerId &&
    e !== HOOK_VISION_ID &&
    this.O4r.IsLegalExceptSkill()
      ? (this.m5r(0), (this.O4r.NeedChangeTargetState = !0))
      : ModelManager_1.ModelManager.ExploreModel.ManipulateFound &&
        ModelManager_1.ModelManager.ExploreModel.CurManipulateTriggerId !==
          ModelManager_1.ModelManager.ExploreModel.LastManipulateTriggerId &&
        e !== MANIPULATE_VISION_ID &&
        (this.m5r(1), (this.O4r.NeedChangeTargetState = !1));
  }
  c5r(e) {
    var t, i, n;
    this.k4r
      ? e !== MANIPULATE_VISION_ID && this.m5r(1)
      : ((n = this.H4r.ActorLocationProxy),
        (i = ModelManager_1.ModelManager.ExploreModel.HookEntity.HookLocation),
        (t =
          ModelManager_1.ModelManager.ExploreModel.ManipulateActorComp
            .ActorLocationProxy),
        (i = Vector_1.Vector.DistSquared(n, i)),
        (n = Vector_1.Vector.DistSquared(n, t)),
        Math.abs(i - n) < Number.EPSILON || n < i
          ? (e !== MANIPULATE_VISION_ID &&
              ModelManager_1.ModelManager.ExploreModel
                .CurManipulateTriggerId !==
                ModelManager_1.ModelManager.ExploreModel
                  .LastManipulateTriggerId &&
              this.m5r(1),
            (this.O4r.NeedChangeTargetState = !1))
          : (e !== HOOK_VISION_ID &&
              ModelManager_1.ModelManager.ExploreModel.CurHookTriggerId !==
                ModelManager_1.ModelManager.ExploreModel.LastHookTriggerId &&
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
        EventDefine_1.EEventName.ChangeVisionSkillByTab,
        this.h5r,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.CharUseSkill,
        this.l5r,
      ));
  }
  m5r(e) {
    let t = 0;
    var i = ModelManager_1.ModelManager.ExploreModel;
    switch (e) {
      case 0:
        (t = HOOK_VISION_ID), (i.LastHookTriggerId = i.CurHookTriggerId);
        break;
      case 1:
        (t = MANIPULATE_VISION_ID),
          (i.LastManipulateTriggerId = i.CurManipulateTriggerId);
    }
    this.d5r(t) &&
      !i.SetExploreSkillId(t, 2) &&
      (Log_1.Log.CheckInfo() &&
        Log_1.Log.Info(
          "Character",
          31,
          "[CharacterExploreComponent] TryChangeSkill",
          [
            "oldSkill",
            ModelManager_1.ModelManager.RouletteModel.CurrentExploreSkillId,
          ],
          ["newSkill", t],
          ["id", this.Entity.Id],
        ),
      ModelManager_1.ModelManager.ExploreModel.SetExploreSkillId(t, 2),
      RouletteController_1.RouletteController.ExploreSkillSetRequest(
        t,
        void 0,
        !0,
      ),
      (i.AutoResetSkillFinished = !1));
  }
  n5r(e) {
    const t = ModelManager_1.ModelManager.ExploreModel;
    if (t.HookFound) this.m5r(0), (this.O4r.NeedChangeTargetState = !0);
    else if (!t.ManipulateFound && t.ExistAutoLayerSkill())
      if (this.C5r()) {
        if (void 0 !== e) {
          switch (((this.z4r = e), (this.Z4r = !0), e)) {
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
        }
      } else {
        t.ResetExplodeSkillId(2);
        e = t.GetTopLayerExplodeSkillId();
        Log_1.Log.CheckInfo() &&
          Log_1.Log.Info(
            "Character",
            31,
            "[CharacterExploreComponent] CheckExit",
            [
              "oldSkill",
              ModelManager_1.ModelManager.RouletteModel.CurrentExploreSkillId,
            ],
            ["newSkill", e],
            ["id", this.Entity.Id],
          ),
          RouletteController_1.RouletteController.ExploreSkillSetRequest(
            e,
            (e) => {
              t.AutoResetSkillFinished = !0;
            },
            !0,
          ),
          (this.O4r.NeedChangeTargetState = !0);
      }
  }
  d5r(e) {
    return ModelManager_1.ModelManager.RouletteModel.UnlockExploreSkillDataMap.has(
      e,
    );
  }
  C5r() {
    var e;
    return !(
      !this.cBe.CurrentSkill ||
      ((e = this.cBe.CurrentSkill.SkillId),
      !MANIPULATE_SKILL_IDS.includes(e) && !HOOK_SKILL_IDS.includes(e))
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
        this.W4r.Init(this.Entity.GetComponent(203))),
      this.W4r
    );
  }
};
(CharacterExploreComponent = __decorate(
  [(0, RegisterComponent_1.RegisterComponent)(53)],
  CharacterExploreComponent,
)),
  (exports.CharacterExploreComponent = CharacterExploreComponent);
//# sourceMappingURL=CharacterExploreComponent.js.map
