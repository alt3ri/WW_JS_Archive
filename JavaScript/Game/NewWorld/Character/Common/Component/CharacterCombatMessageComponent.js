"use strict";
var __decorate =
  (this && this.__decorate) ||
  function (e, t, o, s) {
    var i,
      r = arguments.length,
      a =
        r < 3
          ? t
          : null === s
            ? (s = Object.getOwnPropertyDescriptor(t, o))
            : s;
    if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
      a = Reflect.decorate(e, t, o, s);
    else
      for (var n = e.length - 1; 0 <= n; n--)
        (i = e[n]) && (a = (r < 3 ? i(a) : 3 < r ? i(t, o, a) : i(t, o)) || a);
    return 3 < r && a && Object.defineProperty(t, o, a), a;
  };
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CharacterCombatMessageComponent = void 0);
const Log_1 = require("../../../../../Core/Common/Log"),
  Time_1 = require("../../../../../Core/Common/Time"),
  Queue_1 = require("../../../../../Core/Container/Queue"),
  EntityComponent_1 = require("../../../../../Core/Entity/EntityComponent"),
  RegisterComponent_1 = require("../../../../../Core/Entity/RegisterComponent"),
  CombatMessageController_1 = require("../../../../Module/CombatMessage/CombatMessageController"),
  CombatLog_1 = require("../../../../Utils/CombatLog"),
  MESSAGE_BUFFER_MAX_SIZE = 50;
let CharacterCombatMessageComponent = class CharacterCombatMessageComponent extends EntityComponent_1.EntityComponent {
  constructor() {
    super(...arguments),
      (this.B4r = new Queue_1.Queue(MESSAGE_BUFFER_MAX_SIZE)),
      (this.b4r = () => {
        for (; 0 < this.B4r.Size; ) {
          var e = this.B4r.Front;
          if (Time_1.Time.NowSeconds < e[3]) {
            if (this.B4r.Size < MESSAGE_BUFFER_MAX_SIZE) break;
            CombatLog_1.CombatLog.Warn(
              "Message",
              this.Entity,
              "战斗缓冲满，立即执行",
              ["id", e[1]],
            );
          }
          this.B4r.Pop(), this.q4r(e);
        }
      });
  }
  Push(e, t, o, s) {
    this.B4r.Push([t, e, o, s]),
      this.B4r.Size >= MESSAGE_BUFFER_MAX_SIZE
        ? (CombatLog_1.CombatLog.Warn(
            "Message",
            this.Entity,
            "战斗消息缓冲满了",
            ["IsInit", this.Entity.IsInit],
            ["Active", this.Entity.Active],
          ),
          (t = this.B4r.Pop()),
          this.q4r(t))
        : this.Entity.IsInit &&
          !this.Active &&
          ((e = this.B4r.Pop()),
          CombatLog_1.CombatLog.Info(
            "Notify",
            this.Entity,
            "协议在Disable后执行",
            ["Message", e[1]],
            ["CombatCommon", e[0]],
          ),
          this.q4r(e));
  }
  OnActivate() {
    for (; 0 < this.B4r.Size; ) {
      var e = this.B4r.Pop();
      CombatLog_1.CombatLog.Info(
        "Notify",
        this.Entity,
        "协议OnActivate执行",
        ["Message", e[1].toString()],
        ["CombatCommon", e[0]],
      ),
        this.q4r(e);
    }
    CombatMessageController_1.CombatMessageController.RegisterPreTick(
      this,
      this.b4r,
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
      for (; 0 < this.B4r.Size; ) {
        var e = this.B4r.Pop();
        CombatLog_1.CombatLog.Info(
          "Notify",
          this.Entity,
          "协议OnDisable执行",
          ["Message", e[1]],
          ["CombatCommon", e[0]],
        ),
          this.q4r(e);
      }
  }
  q4r(t) {
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
  [(0, RegisterComponent_1.RegisterComponent)(46)],
  CharacterCombatMessageComponent,
)),
  (exports.CharacterCombatMessageComponent = CharacterCombatMessageComponent);
//# sourceMappingURL=CharacterCombatMessageComponent.js.map
