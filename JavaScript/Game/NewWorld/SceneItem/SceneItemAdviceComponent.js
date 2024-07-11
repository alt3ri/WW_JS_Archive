"use strict";
var __decorate =
  (this && this.__decorate) ||
  function (e, t, i, n) {
    var o,
      r = arguments.length,
      s =
        r < 3
          ? t
          : null === n
            ? (n = Object.getOwnPropertyDescriptor(t, i))
            : n;
    if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
      s = Reflect.decorate(e, t, i, n);
    else
      for (var m = e.length - 1; 0 <= m; m--)
        (o = e[m]) && (s = (r < 3 ? o(s) : 3 < r ? o(t, i, s) : o(t, i)) || s);
    return 3 < r && s && Object.defineProperty(t, i, s), s;
  };
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SceneItemAdviceComponent = void 0);
const EntityComponent_1 = require("../../../Core/Entity/EntityComponent"),
  RegisterComponent_1 = require("../../../Core/Entity/RegisterComponent"),
  TimerSystem_1 = require("../../../Core/Timer/TimerSystem"),
  EventDefine_1 = require("../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../Common/Event/EventSystem"),
  ConfigManager_1 = require("../../Manager/ConfigManager"),
  REVERTIME = 3e3;
let SceneItemAdviceComponent = class SceneItemAdviceComponent extends EntityComponent_1.EntityComponent {
  constructor() {
    super(...arguments),
      (this.Xte = void 0),
      (this.c9e = void 0),
      (this.Mmn = () => {
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
    var t = this.Entity.GetComponent(181);
    if (t && t.GetInteractController()) {
      t = this.Entity.GetComponent(0);
      if (t) {
        t = t.GetAdviceInfo();
        if (t) {
          var i = this.Entity.GetComponent(104);
          if (i) {
            this.Xte = this.Entity.GetComponent(180);
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
        (this.c9e = TimerSystem_1.TimerSystem.Delay(this.Mmn, REVERTIME)));
  }
  jm() {
    void 0 !== this.c9e &&
      (TimerSystem_1.TimerSystem.Remove(this.c9e), (this.c9e = void 0));
  }
  OnEnd() {
    return this.jm(), !0;
  }
};
(SceneItemAdviceComponent = __decorate(
  [(0, RegisterComponent_1.RegisterComponent)(129)],
  SceneItemAdviceComponent,
)),
  (exports.SceneItemAdviceComponent = SceneItemAdviceComponent);
//# sourceMappingURL=SceneItemAdviceComponent.js.map
