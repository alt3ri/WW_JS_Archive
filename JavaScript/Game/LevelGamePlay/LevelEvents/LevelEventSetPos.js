"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.LevelEventSetPos = void 0);
const UE = require("ue");
const Log_1 = require("../../../Core/Common/Log");
const Global_1 = require("../../Global");
const LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelEventSetPos extends LevelGeneralBase_1.LevelEventBase {
  constructor() {
    super(...arguments),
      (this.kRe = new UE.Vector()),
      (this.cie = new UE.Rotator());
  }
  Execute(e, s) {
    if (e) {
      let t;
      const o = e.get("xPos");
      const r = e.get("yPos");
      const l = e.get("zPos");
      const a = e.get("Target");
      var e = e.get("zRotate");
      if (o && r && l && a) {
        if (
          (this.kRe.Set(parseFloat(o), parseFloat(r), parseFloat(l)),
          e && (this.cie.Roll = parseFloat(e)),
          a === "Player")
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
        a === "Trigger" &&
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
// # sourceMappingURL=LevelEventSetPos.js.map
