"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.BehaviorTreeShowBridge = void 0);
const Protocol_1 = require("../../../../Core/Define/Net/Protocol");
const StringUtils_1 = require("../../../../Core/Utils/StringUtils");
const PublicUtil_1 = require("../../../Common/PublicUtil");
const ModelManager_1 = require("../../../Manager/ModelManager");
const GeneralLogicTreeDefine_1 = require("../Define/GeneralLogicTreeDefine");
class BehaviorTreeShowBridge {
  constructor() {
    (this.Yre = void 0),
      (this.BtType = void 0),
      (this.TreeIncId = BigInt(0)),
      (this.TreeConfigId = 0),
      (this.lKt = void 0),
      (this.QuestType = void 0),
      (this.TrackIconConfigId = 0),
      (this.ShowByCustom = !1),
      (this.IsNewQuest = !1),
      (this.TrackTextConfig = void 0);
  }
  static Create(i) {
    if (BehaviorTreeShowBridge.RUe.length === 0) {
      const e = new BehaviorTreeShowBridge();
      return e.Reset(i), e;
    }
    const e = BehaviorTreeShowBridge.RUe.pop();
    return e.Reset(i), e;
  }
  static Recycle(i) {}
  get QuestName() {
    return PublicUtil_1.PublicUtil.GetConfigTextByKey(this.lKt);
  }
  Reset(i) {
    (this.Yre = i),
      (this.BtType = i.BtType),
      (this.TreeIncId = i.TreeIncId),
      (this.TreeConfigId = i.TreeConfigId),
      (this.IsNewQuest = i.ContainTag(8)),
      this.UpdateToNew();
  }
  UpdateToNew() {
    var i = this.Yre;
    if (this.Yre) {
      (this.TrackIconConfigId = i.TaskMarkTableId),
        (this.ShowByCustom = this.Yre.IsChallengeUi());
      var i = this.Yre.GetTrackTextExpressInfo();
      (this.TrackTextConfig =
        new GeneralLogicTreeDefine_1.TreeTrackTextExpressionInfo()),
        this.TrackTextConfig.SetMainTitle(i.MainTitle);
      for (const e of i.SubTitles) this.TrackTextConfig.AddSubTitle(e);
      this.BtType === Protocol_1.Aki.Protocol.NCs.Proto_BtTypeQuest
        ? ((i = ModelManager_1.ModelManager.QuestNewModel.GetQuest(
            this.TreeConfigId,
          )),
          (this.lKt = i?.QuestNameTid),
          (this.QuestType = i?.Type))
        : ((this.lKt = void 0), (this.QuestType = void 0));
    }
  }
  IsInTrackRange() {
    return this.Yre.ContainTag(11);
  }
  IsRollbackWaiting() {
    return this.Yre.ContainTag(5);
  }
  CheckShowConfigEmpty() {
    const i = this.TrackTextConfig;
    let e = void 0;
    if (
      (e =
        i.MainTitle && i.MainTitle.TidTitle
          ? PublicUtil_1.PublicUtil.GetConfigTextByKey(i.MainTitle.TidTitle)
          : e) &&
      !StringUtils_1.StringUtils.IsBlank(e)
    )
      return !1;
    if (i.SubTitles && i.SubTitles.length !== 0)
      for (const r of i.SubTitles)
        if (r.TidTitle) {
          const t = PublicUtil_1.PublicUtil.GetConfigTextByKey(r.TidTitle);
          if (!StringUtils_1.StringUtils.IsBlank(t)) return !1;
        }
    return !0;
  }
  GetCurrentCommunicateId() {
    return this.Yre.GetCurrentCommunicateId();
  }
  GetBlackboard() {
    return this.Yre;
  }
}
(exports.BehaviorTreeShowBridge = BehaviorTreeShowBridge).RUe = [];
// # sourceMappingURL=BehaviorTreeShowBridge.js.map
