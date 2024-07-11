"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.AnimalPerformSystemUiState = void 0);
const GameplayTagUtils_1 = require("../../../../../Core/Utils/GameplayTagUtils");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const UiManager_1 = require("../../../../Ui/UiManager");
const AnimalPerformStateBase_1 = require("./AnimalPerformStateBase");
class AnimalPerformSystemUiState extends AnimalPerformStateBase_1.AnimalPerformStateBase {
  constructor() {
    super(...arguments),
      (this.cWo = new Map()),
      (this.mWo = !1),
      (this.dWo = void 0),
      (this.UKe = (t) => {
        this.dWo &&
          this.dWo === t &&
          (this.mWo ||
            EventSystem_1.EventSystem.Remove(
              EventDefine_1.EEventName.OpenView,
              this.UKe,
            ),
          (this.mWo = !0),
          EventSystem_1.EventSystem.Add(
            EventDefine_1.EEventName.CloseView,
            this.$Ge,
          ),
          EventSystem_1.EventSystem.Add(
            EventDefine_1.EEventName.OnDeliveryProps,
            this.CWo,
          ));
      }),
      (this.$Ge = (t) => {
        this.dWo &&
          this.dWo === t &&
          (EventSystem_1.EventSystem.Remove(
            EventDefine_1.EEventName.CloseView,
            this.$Ge,
          ),
          EventSystem_1.EventSystem.Remove(
            EventDefine_1.EEventName.OnDeliveryProps,
            this.CWo,
          ),
          this.StateMachine.Switch(1));
      }),
      (this.CWo = (t) => {
        t &&
          (t = this.cWo.get(t)) &&
          ((t = GameplayTagUtils_1.GameplayTagUtils.GetGameplayTagByName(t)),
          this.EcologicalInterface.FeedStart(t));
      });
  }
  get SystemUiViewName() {
    return this.dWo;
  }
  set SystemUiViewName(t) {
    this.dWo = t;
  }
  OnEnter(t) {
    this.EcologicalInterface?.IsValid() &&
      this.dWo &&
      (UiManager_1.UiManager.IsViewShow(this.dWo)
        ? this.UKe(this.dWo)
        : ((this.mWo = !1),
          EventSystem_1.EventSystem.Add(
            EventDefine_1.EEventName.OpenView,
            this.UKe,
          )),
      t === 0 &&
        this.AnimalEcologicalInterface.StateMachineInitializationComplete(),
      (t = this.Owner.GetComponent(185)) && this.gWo(t),
      this.EcologicalInterface.SystemUiStart());
  }
  OnExit(t) {
    this.EcologicalInterface?.IsValid() &&
      (this.Owner.GetComponent(178)?.SetInteractionState(
        !0,
        "AnimalPerformSystemUiState OnExit",
      ),
      this.EcologicalInterface.SystemUiEnd(),
      this.Owner.GetComponent(185)?.RemoveTag(1819982634),
      (this.mWo = !1),
      (this.dWo = void 0));
  }
  InitFeedingAnimalConfig(e, i) {
    if (e && i) {
      const s = e.length;
      for (let t = 0; t < s; ++t) {
        const n = e[t];
        const a = i[t];
        a && this.cWo.set(n, a);
      }
    }
  }
  gWo(t) {
    t?.Valid &&
      (t.HasTag(502364103) && (t.RemoveTag(502364103), t.AddTag(1900394806)),
      t.HasTag(393622611) && (t.RemoveTag(393622611), t.AddTag(1900394806)),
      t.HasTag(276015887) && (t.RemoveTag(276015887), t.AddTag(379545977)),
      t.AddTag(1819982634));
  }
}
exports.AnimalPerformSystemUiState = AnimalPerformSystemUiState;
// # sourceMappingURL=AnimalPerformSystemUiState.js.map
