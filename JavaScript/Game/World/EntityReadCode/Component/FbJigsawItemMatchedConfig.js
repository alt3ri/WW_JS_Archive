"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbJigsawItemMatchedConfig = void 0);
const fb_action_1 = require("../../../../Game/World/EntityFb/fb-action"),
  fb_component_1 = require("../../../../Game/World/EntityFb/fb-component"),
  FbActionInfo_1 = require("../Action/FbActionInfo"),
  FbPieceIndex_1 = require("../Action/FbPieceIndex"),
  FbConditionAction_1 = require("./FbConditionAction");
class FbJigsawItemMatchedConfig {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.qNh = !1),
      (this.kNh = void 0),
      (this.GNh = !1),
      (this.ONh = void 0),
      (this.L_h = !1),
      (this.A_h = void 0),
      (this.FNh = !1),
      (this.NNh = void 0),
      (this.VNh = !1),
      (this.jNh = void 0);
  }
  static Create(t) {
    if (t) return new FbJigsawItemMatchedConfig(t);
  }
  get TargetIndex() {
    return (
      this.qNh ||
        ((this.qNh = !0),
        (this.kNh = FbPieceIndex_1.FbPieceIndex.Create(
          this.FbDataInternal.targetIndex(),
        ))),
      this.kNh
    );
  }
  get JigsawItemIds() {
    if (!this.GNh) {
      (this.GNh = !0), (this.ONh = new Array());
      var i = this.FbDataInternal.jigsawItemIdsLength();
      if (i)
        for (let t = 0; t < i; ++t)
          this.ONh.push(this.FbDataInternal.jigsawItemIds(t));
    }
    return this.ONh;
  }
  get Actions() {
    if (!this.L_h) {
      (this.L_h = !0), (this.A_h = new Array());
      var i = this.FbDataInternal.actionsLength();
      if (i)
        for (let t = 0; t < i; ++t) {
          var e = this.FbDataInternal.actions(t, new fb_action_1.ActionInfo());
          this.A_h.push(FbActionInfo_1.FbActionInfo.Create(e));
        }
    }
    return this.A_h;
  }
  get ConditionActions() {
    if (!this.FNh) {
      (this.FNh = !0), (this.NNh = new Array());
      var i = this.FbDataInternal.conditionActionsLength();
      if (i)
        for (let t = 0; t < i; ++t) {
          var e = this.FbDataInternal.conditionActions(
            t,
            new fb_component_1.ConditionAction(),
          );
          this.NNh.push(FbConditionAction_1.FbConditionAction.Create(e));
        }
    }
    return this.NNh;
  }
  get UnmatchedActions() {
    if (!this.VNh) {
      (this.VNh = !0), (this.jNh = new Array());
      var i = this.FbDataInternal.unmatchedActionsLength();
      if (i)
        for (let t = 0; t < i; ++t) {
          var e = this.FbDataInternal.unmatchedActions(
            t,
            new fb_action_1.ActionInfo(),
          );
          this.jNh.push(FbActionInfo_1.FbActionInfo.Create(e));
        }
    }
    return this.jNh;
  }
}
exports.FbJigsawItemMatchedConfig = FbJigsawItemMatchedConfig;
//# sourceMappingURL=FbJigsawItemMatchedConfig.js.map
