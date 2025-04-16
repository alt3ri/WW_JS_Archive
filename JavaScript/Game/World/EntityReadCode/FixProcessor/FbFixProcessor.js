"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbFixProcessor = void 0);
const fb_fix_processor_1 = require("../../../../Game/World/EntityFb/fb-fix-processor"),
  FbFixAction_1 = require("./FbFixAction");
class FbFixProcessor {
  constructor(i) {
    (this.FbDataInternal = i), (this.rZh = !1), (this.oZh = void 0);
  }
  static Create(i) {
    if (i) return new FbFixProcessor(i);
  }
  get FixActions() {
    if (!this.rZh) {
      (this.rZh = !0), (this.oZh = new Array());
      var s = this.FbDataInternal.fixActionsLength();
      if (s)
        for (let i = 0; i < s; ++i) {
          var r = this.FbDataInternal.fixActions(
            i,
            new fb_fix_processor_1.FixAction(),
          );
          this.oZh.push(FbFixAction_1.FbFixAction.Create(r));
        }
    }
    return this.oZh;
  }
}
exports.FbFixProcessor = FbFixProcessor;
//# sourceMappingURL=FbFixProcessor.js.map
