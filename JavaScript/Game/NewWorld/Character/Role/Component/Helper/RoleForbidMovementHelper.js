"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RoleForbidMovementHelper = void 0);
const MathUtils_1 = require("../../../../../../Core/Utils/MathUtils"),
  MAX_PRIORITY = 3;
class LimitTagHandler {
  constructor(t, i, s, e) {
    (this.TagId = t),
      (this.Priority = i),
      (this.TagExist = s),
      (this.CallBack = e),
      (this.MutuallyTags = []),
      (this.Active = !1),
      (this.Priority = MathUtils_1.MathUtils.Clamp(
        this.Priority,
        0,
        MAX_PRIORITY,
      ));
  }
}
class RoleForbidMovementHelper {
  constructor() {
    (this.TagComp = void 0),
      (this.Cer = new Array()),
      (this.CurrentActiveHandlers = new Array()),
      (this.Handlers = new Map()),
      (this.Eir = (t, i) => {
        var s = this.Handlers.get(t);
        if (
          s &&
          ((s.TagExist = i), !s.TagExist || !s.Active) &&
          (s.TagExist || s.Active)
        )
          if (i) {
            let t = void 0,
              i = void 0;
            for (const h of s.MutuallyTags) {
              var e = this.Handlers.get(h);
              if (e) {
                if (e.Priority > s.Priority && e.Active) {
                  t = e;
                  break;
                }
                if (e.Priority <= s.Priority && e.Active) {
                  i = e;
                  break;
                }
              }
            }
            t || (i && this.ActiveHandler(i, !1), this.ActiveHandler(s, !0));
          } else {
            this.ActiveHandler(s, !1);
            let t = void 0;
            for (const o of s.MutuallyTags) {
              var r = this.Handlers.get(o);
              if (r && r.Priority <= s.Priority && r.TagExist) {
                t = r;
                break;
              }
            }
            t && this.ActiveHandler(t, !0);
          }
      });
  }
  RegisterMutuallyTags(t) {
    for (const s of t) {
      var i = this.Handlers.get(s);
      if (i) for (const e of t) e !== i.TagId && i.MutuallyTags.push(e);
    }
  }
  Awake() {
    for (const i of this.Handlers) {
      var t = this.TagComp.HasTag(i[0]);
      this.Eir(i[0], t);
    }
  }
  ActiveHandler(t, i) {
    (t.Active = i),
      t.CallBack(i),
      i
        ? this.CurrentActiveHandlers.push(t)
        : (i = this.CurrentActiveHandlers.indexOf(t)) < 0 ||
          this.CurrentActiveHandlers.splice(i, 1);
  }
  CreateTagHandler(t, i, s) {
    var e = this.TagComp.HasTag(t);
    this.Handlers.set(t, new LimitTagHandler(t, i, e, s)),
      this.Cer.push(this.TagComp.ListenForTagAddOrRemove(t, this.Eir));
  }
  Clear() {
    (this.CurrentActiveHandlers.length = 0), this.Handlers.clear();
    for (const t of this.Cer) t.EndTask();
    this.Cer.length = 0;
  }
}
exports.RoleForbidMovementHelper = RoleForbidMovementHelper;
//# sourceMappingURL=RoleForbidMovementHelper.js.map
