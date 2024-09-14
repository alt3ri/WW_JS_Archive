"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.AnimalPerformSystemUiState = void 0);
const GameplayTagUtils_1 = require("../../../../../Core/Utils/GameplayTagUtils"),
  EventDefine_1 = require("../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../Common/Event/EventSystem"),
  UiManager_1 = require("../../../../Ui/UiManager"),
  AnimalPerformStateBase_1 = require("./AnimalPerformStateBase");
class AnimalPerformSystemUiState extends AnimalPerformStateBase_1.AnimalPerformStateBase {
  constructor() {
    super(...arguments),
      (this.lKo = new Map()),
      (this._Ko = !1),
      (this.uKo = void 0),
      (this.FQe = (t) => {
        this.uKo &&
          this.uKo === t &&
          (this._Ko ||
            EventSystem_1.EventSystem.Remove(
              EventDefine_1.EEventName.OpenView,
              this.FQe,
            ),
          (this._Ko = !0),
          EventSystem_1.EventSystem.Add(
            EventDefine_1.EEventName.CloseView,
            this.$Ge,
          ),
          EventSystem_1.EventSystem.Add(
            EventDefine_1.EEventName.OnDeliveryProps,
            this.cKo,
          ));
      }),
      (this.$Ge = (t) => {
        this.uKo &&
          this.uKo === t &&
          (EventSystem_1.EventSystem.Remove(
            EventDefine_1.EEventName.CloseView,
            this.$Ge,
          ),
          EventSystem_1.EventSystem.Remove(
            EventDefine_1.EEventName.OnDeliveryProps,
            this.cKo,
          ),
          this.StateMachine.Switch(1));
      }),
      (this.cKo = (t) => {
        t &&
          (t = this.lKo.get(t)) &&
          ((t = GameplayTagUtils_1.GameplayTagUtils.GetGameplayTagByName(t)),
          this.EcologicalInterface.FeedStart(t));
      });
  }
  get SystemUiViewName() {
    return this.uKo;
  }
  set SystemUiViewName(t) {
    this.uKo = t;
  }
  OnEnter(t) {
    this.EcologicalInterface?.IsValid() &&
      this.uKo &&
      (UiManager_1.UiManager.IsViewShow(this.uKo)
        ? this.FQe(this.uKo)
        : ((this._Ko = !1),
          EventSystem_1.EventSystem.Add(
            EventDefine_1.EEventName.OpenView,
            this.FQe,
          )),
      0 === t &&
        this.AnimalEcologicalInterface.StateMachineInitializationComplete(),
      (t = this.Owner.GetComponent(190)) && this.mKo(t),
      this.EcologicalInterface.SystemUiStart());
  }
  OnExit(t) {
    this.EcologicalInterface?.IsValid() &&
      (this.Owner.GetComponent(182)?.SetInteractionState(
        !0,
        "AnimalPerformSystemUiState OnExit",
      ),
      this.EcologicalInterface.SystemUiEnd(),
      this.Owner.GetComponent(190)?.RemoveTag(1819982634),
      (this._Ko = !1),
      (this.uKo = void 0));
  }
  InitFeedingAnimalConfig(e, i) {
    if (e && i) {
      var s = e.length;
      for (let t = 0; t < s; ++t) {
        var n = e[t],
          a = i[t];
        a && this.lKo.set(n, a);
      }
    }
  }
  mKo(t) {
    t?.Valid &&
      (t.HasTag(502364103) && (t.RemoveTag(502364103), t.AddTag(1900394806)),
      t.HasTag(393622611) && (t.RemoveTag(393622611), t.AddTag(1900394806)),
      t.HasTag(276015887) && (t.RemoveTag(276015887), t.AddTag(379545977)),
      t.AddTag(1819982634));
  }
}
exports.AnimalPerformSystemUiState = AnimalPerformSystemUiState;
//# sourceMappingURL=AnimalPerformSystemUiState.js.map
