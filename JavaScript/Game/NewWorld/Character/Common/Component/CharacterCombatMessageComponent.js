"use strict";
const __decorate =
  (this && this.__decorate) ||
  function (e, t, o, s) {
    let r;
    const i = arguments.length;
    let a =
      i < 3 ? t : s === null ? (s = Object.getOwnPropertyDescriptor(t, o)) : s;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
      a = Reflect.decorate(e, t, o, s);
    else
      for (let n = e.length - 1; n >= 0; n--)
        (r = e[n]) && (a = (i < 3 ? r(a) : i > 3 ? r(t, o, a) : r(t, o)) || a);
    return i > 3 && a && Object.defineProperty(t, o, a), a;
  };
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CharacterCombatMessageComponent = void 0);
const Log_1 = require("../../../../../Core/Common/Log");
const Time_1 = require("../../../../../Core/Common/Time");
const Queue_1 = require("../../../../../Core/Container/Queue");
const EntityComponent_1 = require("../../../../../Core/Entity/EntityComponent");
const RegisterComponent_1 = require("../../../../../Core/Entity/RegisterComponent");
const CombatMessageController_1 = require("../../../../Module/CombatMessage/CombatMessageController");
const CombatDebugController_1 = require("../../../../Utils/CombatDebugController");
const MESSAGE_BUFFER_MAX_SIZE = 50;
let CharacterCombatMessageComponent = class CharacterCombatMessageComponent extends EntityComponent_1.EntityComponent {
  constructor() {
    super(...arguments),
      (this.t5r = new Queue_1.Queue(MESSAGE_BUFFER_MAX_SIZE)),
      (this.i5r = () => {
        for (; this.t5r.Size > 0; ) {
          const e = this.t5r.Front;
          if (Time_1.Time.NowSeconds < e[3]) {
            if (this.t5r.Size < MESSAGE_BUFFER_MAX_SIZE) break;
            CombatDebugController_1.CombatDebugController.CombatWarn(
              "Message",
              this.Entity,
              "战斗缓冲满，立即执行",
              ["id", e[1]],
            );
          }
          this.t5r.Pop(), this.o5r(e);
        }
      });
  }
  Push(e, t, o, s) {
    this.t5r.Push([t, e, o, s]),
      this.t5r.Size >= MESSAGE_BUFFER_MAX_SIZE
        ? (CombatDebugController_1.CombatDebugController.CombatWarn(
            "Message",
            this.Entity,
            "战斗消息缓冲满了",
            ["IsInit", this.Entity.IsInit],
            ["Active", this.Entity.Active],
          ),
          (t = this.t5r.Pop()),
          this.o5r(t))
        : this.Entity.IsInit &&
          !this.Active &&
          ((e = this.t5r.Pop()),
          CombatDebugController_1.CombatDebugController.CombatInfo(
            "Notify",
            this.Entity,
            "协议在Disable后执行",
            ["Message", e[1]],
            ["CombatCommon", e[0]],
          ),
          this.o5r(e));
  }
  OnActivate() {
    for (; this.t5r.Size > 0; ) {
      const e = this.t5r.Pop();
      CombatDebugController_1.CombatDebugController.CombatInfo(
        "Notify",
        this.Entity,
        "协议OnActivate执行",
        ["Message", e[1].toString()],
        ["CombatCommon", e[0]],
      ),
        this.o5r(e);
    }
    CombatMessageController_1.CombatMessageController.RegisterPreTick(
      this,
      this.i5r,
    );
  }
  OnEnd() {
    return (
      CombatMessageController_1.CombatMessageController.UnregisterPreTick(this),
      !0
    );
  }
  OnDisable() {
    if (this.Entity.IsInit)
      for (; this.t5r.Size > 0; ) {
        const e = this.t5r.Pop();
        CombatDebugController_1.CombatDebugController.CombatInfo(
          "Notify",
          this.Entity,
          "协议OnDisable执行",
          ["Message", e[1]],
          ["CombatCommon", e[0]],
        ),
          this.o5r(e);
      }
  }
  o5r(t) {
    try {
      CombatMessageController_1.CombatMessageController.Process(
        t[1],
        this.Entity,
        t[2],
        t[0],
      );
    } catch (e) {
      e instanceof Error
        ? Log_1.Log.CheckError() &&
          Log_1.Log.ErrorWithStack(
            "CombatInfo",
            15,
            "战斗协议执行回调方法异常",
            e,
            ["messageId", t[1]],
            ["error", e.message],
          )
        : Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "CombatInfo",
            15,
            "战斗协议执行回调方法异常",
            ["messageId", t[1]],
            ["stack", e],
          );
    }
  }
};
(CharacterCombatMessageComponent = __decorate(
  [(0, RegisterComponent_1.RegisterComponent)(44)],
  CharacterCombatMessageComponent,
)),
  (exports.CharacterCombatMessageComponent = CharacterCombatMessageComponent);
// # sourceMappingURL=CharacterCombatMessageComponent.js.map
