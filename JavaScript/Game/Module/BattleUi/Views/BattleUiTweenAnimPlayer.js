"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.BattleUiTweenAnimPlayer = void 0);
const UE = require("ue");
class BattleUiTweenAnimPlayer {
  constructor() {
    this.TweenAnimMap = new Map();
  }
  Clear() {
    this.TweenAnimMap.clear();
  }
  InitTweenAnim(e, t) {
    var i = [],
      s = t
        .GetOwner()
        .K2_GetComponentsByClass(UE.LGUIPlayTweenComponent.StaticClass()),
      n = s.Num();
    for (let e = 0; e < n; e++) i.push(s.Get(e));
    this.TweenAnimMap || (this.TweenAnimMap = new Map()),
      this.TweenAnimMap.set(e, i);
  }
  PlayTweenAnim(e) {
    e = this.TweenAnimMap.get(e);
    if (e) for (const t of e) t.Play();
  }
  StopTweenAnim(e) {
    e = this.TweenAnimMap.get(e);
    if (e) for (const t of e) t.Stop();
  }
}
exports.BattleUiTweenAnimPlayer = BattleUiTweenAnimPlayer;
//# sourceMappingURL=BattleUiTweenAnimPlayer.js.map
