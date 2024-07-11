"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ScoreUpdateManager = void 0);
const Log_1 = require("../../../Core/Common/Log");
const Stats_1 = require("../../../Core/Common/Stats");
class ScoreUpdateManager {
  constructor(t = 1, e = 10) {
    (this.Rte = t),
      (this.Ute = e),
      (this.Ate = new Array()),
      (this.Pte = new Map()),
      (this.xte = 0);
  }
  AddScore(t, e = 1) {
    if (e < 1)
      Log_1.Log.CheckError() &&
        Log_1.Log.Error("AI", 6, "AddScore is less than 1");
    else {
      const r = this.Pte.get(t);
      const o = (r && this.Ate[r].delete(t), r ? r + e : e);
      for (this.xte < o && (this.xte = o); this.Ate.length <= o; )
        this.Ate.push(new Set());
      this.Ate[o].add(t), this.Pte.set(t, o);
    }
  }
  RemoveObject(t) {
    const e = this.Pte.get(t);
    e && this.Ate[e].delete(t), this.Pte.delete(t);
  }
  Update() {
    if (this.xte !== 0) {
      let e = 0;
      let r = 0;
      for (let t = this.xte; t > 0; --t) {
        const o = this.Ate[t];
        const s = 1 / t;
        for (const i of o) {
          try {
            i.ScoreUpdate();
          } catch (t) {
            t instanceof Error
              ? Log_1.Log.CheckError() &&
                Log_1.Log.ErrorWithStack(
                  "AI",
                  6,
                  "ScoreUpdate执行异常",
                  t,
                  ["ScoreObject", i.constructor.name],
                  ["error", t.message],
                )
              : Log_1.Log.CheckError() &&
                Log_1.Log.Error(
                  "AI",
                  6,
                  "ScoreUpdate执行异常",
                  ["ScoreObject", i.constructor.name],
                  ["error", t],
                );
          }
          if (
            (this.Pte.set(i, 0),
            o.delete(i),
            (e += s),
            ++r,
            e >= this.Rte || r >= this.Ute)
          )
            return;
        }
        this.xte--;
      }
    }
  }
}
(exports.ScoreUpdateManager = ScoreUpdateManager).wte = void 0;
// # sourceMappingURL=ScoreUpdateManager.js.map
