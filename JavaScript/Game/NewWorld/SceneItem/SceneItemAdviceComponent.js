"use strict";
const __decorate =
  (this && this.__decorate) ||
  function (e, t, i, n) {
    let o;
    const r = arguments.length;
    let s =
      r < 3 ? t : n === null ? (n = Object.getOwnPropertyDescriptor(t, i)) : n;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
      s = Reflect.decorate(e, t, i, n);
    else
      for (let m = e.length - 1; m >= 0; m--)
        (o = e[m]) && (s = (r < 3 ? o(s) : r > 3 ? o(t, i, s) : o(t, i)) || s);
    return r > 3 && s && Object.defineProperty(t, i, s), s;
  };
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SceneItemAdviceComponent = void 0);
const EntityComponent_1 = require("../../../Core/Entity/EntityComponent");
const RegisterComponent_1 = require("../../../Core/Entity/RegisterComponent");
const TimerSystem_1 = require("../../../Core/Timer/TimerSystem");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../Manager/ConfigManager");
const REVERTIME = 3e3;
let SceneItemAdviceComponent = class SceneItemAdviceComponent extends EntityComponent_1.EntityComponent {
  constructor() {
    super(...arguments),
      (this.Xte = void 0),
      (this.z6e = void 0),
      (this.Fmn = () => {
        this.jm(),
          this.Xte.HasTag(-3775711) &&
            (this.Xte.ChangeLocalLevelTag(-1152559349, -3775711),
            EventSystem_1.EventSystem.EmitWithTarget(
              this.Entity,
              EventDefine_1.EEventName.OnSceneItemStateChange,
              -1152559349,
              !0,
            ));
      });
  }
  OnActivate() {
    let t = this.Entity.GetComponent(178);
    if (t && t.GetInteractController()) {
      t = this.Entity.GetComponent(0);
      if (t) {
        t = t.GetAdviceInfo();
        if (t) {
          const i = this.Entity.GetComponent(102);
          if (i) {
            this.Xte = this.Entity.GetComponent(177);
            let e =
              ConfigManager_1.ConfigManager.AdviceConfig.GetAdviceInteractText();
            (e = e.replace("{PlayerName}", t.GetPlayerName())),
              (i.PawnName = e);
          }
        }
      }
    }
  }
  DoInteract() {
    this.jm(),
      this.Xte.HasTag(-1152559349) &&
        (this.Xte.ChangeLocalLevelTag(-3775711, -1152559349),
        EventSystem_1.EventSystem.EmitWithTarget(
          this.Entity,
          EventDefine_1.EEventName.OnSceneItemStateChange,
          -3775711,
          !1,
        ),
        this.jm(),
        (this.z6e = TimerSystem_1.TimerSystem.Delay(this.Fmn, REVERTIME)));
  }
  jm() {
    void 0 !== this.z6e &&
      (TimerSystem_1.TimerSystem.Remove(this.z6e), (this.z6e = void 0));
  }
  OnEnd() {
    return this.jm(), !0;
  }
};
(SceneItemAdviceComponent = __decorate(
  [(0, RegisterComponent_1.RegisterComponent)(127)],
  SceneItemAdviceComponent,
)),
  (exports.SceneItemAdviceComponent = SceneItemAdviceComponent);
// # sourceMappingURL=SceneItemAdviceComponent.js.map
