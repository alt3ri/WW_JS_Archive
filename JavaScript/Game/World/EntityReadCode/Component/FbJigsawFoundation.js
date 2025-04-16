"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbJigsawFoundation = void 0);
const fb_component_1 = require("../../../../Game/World/EntityFb/fb-component"),
  FbJigsawConfig_1 = require("../Action/FbJigsawConfig"),
  FbJigsawCompletedConfig_1 = require("./FbJigsawCompletedConfig"),
  FbJigsawItemMatchedConfig_1 = require("./FbJigsawItemMatchedConfig"),
  FbJigsawPieceMatch_1 = require("./FbJigsawPieceMatch"),
  UnionJigsawCompleteConditionHelper_1 = require("./UnionJigsawCompleteConditionHelper"),
  FbVectorInfo_1 = require("../Var/FbVectorInfo");
class FbJigsawFoundation {
  constructor(i) {
    (this.FbDataInternal = i),
      (this.q_h = !1),
      (this.k_h = !1),
      (this.hNh = !1),
      (this.lNh = 0),
      (this.uNh = !1),
      (this.dNh = void 0),
      (this.mNh = !1),
      (this.CNh = void 0),
      (this.Xqh = !1),
      (this.Yqh = void 0),
      (this.gNh = !1),
      (this.fNh = void 0),
      (this.pNh = !1),
      (this.vNh = void 0),
      (this.yNh = !1),
      (this.SNh = void 0);
  }
  static Create(i) {
    if (i) return new FbJigsawFoundation(i);
  }
  get Disabled() {
    return (
      this.q_h ||
        ((this.q_h = !0), (this.k_h = this.FbDataInternal.disabled())),
      this.k_h
    );
  }
  get ModelId() {
    return (
      this.hNh || ((this.hNh = !0), (this.lNh = this.FbDataInternal.modelId())),
      this.lNh
    );
  }
  get PlaceOffset() {
    return (
      this.uNh ||
        ((this.uNh = !0),
        (this.dNh = FbVectorInfo_1.FbVectorInfo.Create(
          this.FbDataInternal.placeOffset(),
        ))),
      this.dNh
    );
  }
  get InitMatchList() {
    if (!this.mNh) {
      (this.mNh = !0), (this.CNh = new Array());
      var t = this.FbDataInternal.initMatchListLength();
      if (t)
        for (let i = 0; i < t; ++i) {
          var e = this.FbDataInternal.initMatchList(
            i,
            new fb_component_1.JigsawPieceMatch(),
          );
          this.CNh.push(FbJigsawPieceMatch_1.FbJigsawPieceMatch.Create(e));
        }
    }
    return this.CNh;
  }
  get CompleteCondition() {
    var i, t;
    return (
      !this.Xqh &&
        ((this.Xqh = !0),
        (i = this.FbDataInternal.completeConditionType()),
        (t =
          UnionJigsawCompleteConditionHelper_1.UnionJigsawCompleteConditionHelper.GetUnionJigsawCompleteConditionObject(
            i,
          ))) &&
        (this.Yqh =
          UnionJigsawCompleteConditionHelper_1.UnionJigsawCompleteConditionHelper.ReadUnionJigsawCompleteCondition(
            i,
            this.FbDataInternal.completeCondition(t),
          )),
      this.Yqh
    );
  }
  get CompletedConfig() {
    return (
      this.gNh ||
        ((this.gNh = !0),
        (this.fNh = FbJigsawCompletedConfig_1.FbJigsawCompletedConfig.Create(
          this.FbDataInternal.completedConfig(),
        ))),
      this.fNh
    );
  }
  get JigsawConfig() {
    return (
      this.pNh ||
        ((this.pNh = !0),
        (this.vNh = FbJigsawConfig_1.FbJigsawConfig.Create(
          this.FbDataInternal.jigsawConfig(),
        ))),
      this.vNh
    );
  }
  get MatchedConfig() {
    if (!this.yNh) {
      (this.yNh = !0), (this.SNh = new Array());
      var t = this.FbDataInternal.matchedConfigLength();
      if (t)
        for (let i = 0; i < t; ++i) {
          var e = this.FbDataInternal.matchedConfig(
            i,
            new fb_component_1.JigsawItemMatchedConfig(),
          );
          this.SNh.push(
            FbJigsawItemMatchedConfig_1.FbJigsawItemMatchedConfig.Create(e),
          );
        }
    }
    return this.SNh;
  }
}
exports.FbJigsawFoundation = FbJigsawFoundation;
//# sourceMappingURL=FbJigsawFoundation.js.map
