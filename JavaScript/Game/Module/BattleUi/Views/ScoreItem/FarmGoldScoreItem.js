"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FarmGoldScoreItem = void 0);
const UE = require("ue"),
  EventDefine_1 = require("../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../Common/Event/EventSystem"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  BaseScoreItem_1 = require("./BaseScoreItem");
class FarmGoldScoreItem extends BaseScoreItem_1.BaseScoreItem {
  constructor() {
    super(...arguments),
      (this.pWl = !1),
      (this.vWl = 0),
      (this.yWl = []),
      (this.SWl = []),
      (this.oTn = (e, t) => {
        var s = this.SWl.slice(),
          r = t.toString(),
          i = r.length;
        0 === i && (this.SWl.length = 0);
        for (let e = (this.SWl.length = 0); e < i; e++)
          this.SWl.push(parseInt(r[e]));
        var h = this.MWl(this.yWl);
        if (((this.yWl.length = 0), t < h))
          (this.yWl = this.SWl.slice()), (this.pWl = !1);
        else {
          this.yWl = s.slice();
          for (let e = 0; e < i - s.length; e++) this.yWl.unshift(0);
          (this.vWl = 0 <= i - 2 ? i - 2 : 0),
            (this.pWl = !this.EWl(this.vWl, this.yWl, this.SWl));
        }
        this.IWl(this.yWl);
      });
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIArtText]];
  }
  OnStart() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.BattleScoreChanged,
      this.oTn,
    ),
      this.IWl(this.yWl);
    for (var [
      e,
      t,
    ] of ModelManager_1.ModelManager.BattleScoreModel.GetScoreMap())
      0 < t && this.IsValidScore(e) && this.oTn(e, t);
  }
  IsValidScore(e) {
    e = ModelManager_1.ModelManager.BattleScoreModel?.GetScoreConfig(e);
    return !(!e || 0 !== e.Type);
  }
  OnBeforeDestroy() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.BattleScoreChanged,
      this.oTn,
    );
  }
  OnTick(e) {
    this.pWl &&
      (this.TWl(this.vWl, this.yWl),
      this.bWl(this.vWl, this.yWl),
      (this.pWl = !this.EWl(this.vWl, this.yWl, this.SWl)),
      this.pWl || (this.yWl = this.SWl.slice()),
      this.IWl(this.yWl));
  }
  IWl(e) {
    let t = "";
    for (const s of e) t += s.toString();
    (t = "" === t ? "0" : t), this.GetArtText(0)?.SetText(t.toString());
  }
  TWl(t, s) {
    var r = s.length;
    for (let e = t + 1; e < r; e++) (s[e] += 1), 9 < s[e] && (s[e] = 0);
  }
  bWl(e, t) {
    let s = e;
    for (; 0 <= s && ((t[s] += 1), 9 < t[s]); ) (t[s] = 0), s--;
  }
  EWl(t, s, r) {
    for (let e = 0; e <= t; e++) if (s[e] !== r[e]) return !1;
    return !0;
  }
  MWl(t) {
    var s = t.length;
    let r = 0;
    for (let e = 0; e < s; e++) r += t[e] * Math.pow(10, s - e - 1);
    return r;
  }
}
exports.FarmGoldScoreItem = FarmGoldScoreItem;
//# sourceMappingURL=FarmGoldScoreItem.js.map
