"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SceneItemBuffModel = void 0);
const ModelBase_1 = require("../../../../Core/Framework/ModelBase");
class SceneItemBuffModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments), (this.Knr = new Map());
  }
  Add(e, t, r) {
    let s = this.Knr.get(e),
      o = (s || ((s = new Map()), this.Knr.set(e, s)), s.get(t));
    return (
      o || ((o = new Array()), s.set(t, o)), !o.includes(r) && (o.push(r), !0)
    );
  }
  Remove(e, t, r, s) {
    let o = new Array();
    var n,
      i = this.Knr.get(e);
    return (
      i &&
        ((n = i.get(t)) &&
          (s
            ? -1 < (s = n.indexOf(s)) && (o = n.splice(s, r))
            : (o = n.splice(0, -1 === r ? n.length : r)),
          0 === n.length) &&
          i.delete(t),
        0 === i.size) &&
        this.Knr.delete(e),
      o
    );
  }
  RemoveAll(e) {
    return this.Knr.delete(e);
  }
  Switch(e, t) {
    var r = this.Knr.get(e),
      s = this.Knr.get(t);
    return !(r || !s || (this.Knr.set(e, s), this.Knr.delete(t), 0));
  }
  GetSceneItemIds(e) {
    e = this.Knr.get(e);
    if (e) {
      var t = new Array();
      for (const r of e.values()) for (const s of r) t.push(s);
      return t;
    }
  }
}
exports.SceneItemBuffModel = SceneItemBuffModel;
//# sourceMappingURL=SceneItemBuffModel.js.map
