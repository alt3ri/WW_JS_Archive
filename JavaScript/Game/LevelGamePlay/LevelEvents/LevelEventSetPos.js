"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.LevelEventSetPos = void 0);
const UE = require("ue"),
  Log_1 = require("../../../Core/Common/Log"),
  Global_1 = require("../../Global"),
  LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelEventSetPos extends LevelGeneralBase_1.LevelEventBase {
  constructor() {
    super(...arguments),
      (this.kRe = new UE.Vector()),
      (this.cie = new UE.Rotator());
  }
  Execute(e, s) {
    if (e) {
      var t,
        o = e.get("xPos"),
        r = e.get("yPos"),
        l = e.get("zPos"),
        a = e.get("Target"),
        e = e.get("zRotate");
      if (o && r && l && a) {
        if (
          (this.kRe.Set(parseFloat(o), parseFloat(r), parseFloat(l)),
          e && (this.cie.Roll = parseFloat(e)),
          "Player" === a)
        )
          return (t = Global_1.Global.BaseCharacter)
            ? ((t = t.CharacterActorComponent),
              void (e
                ? t.SetActorLocationAndRotation(
                    this.kRe,
                    this.cie,
                    "关卡事件{LevelEventSetPos}.处理主角传送",
                    !1,
                  )
                : t.SetActorLocation(
                    this.kRe,
                    "关卡事件{LevelEventSetPos}.处理主角传送",
                    !1,
                  )))
            : void 0;
        "Trigger" === a &&
          s &&
          (e
            ? s.K2_SetActorLocationAndRotation(
                this.kRe,
                this.cie,
                !1,
                void 0,
                !1,
              )
            : s.K2_SetActorLocation(this.kRe, !1, void 0, !1));
      } else
        Log_1.Log.CheckWarn() &&
          Log_1.Log.Warn(
            "Level",
            7,
            "[LevelGeneralController.SetPos] 传送参数不全，事件失败",
            ["xPos", o],
            ["yPos", r],
            ["zPos", l],
            ["tTarget", a],
          );
    }
  }
}
exports.LevelEventSetPos = LevelEventSetPos;
//# sourceMappingURL=LevelEventSetPos.js.map
