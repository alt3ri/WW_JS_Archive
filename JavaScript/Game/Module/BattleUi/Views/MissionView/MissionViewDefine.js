"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.QuestUpdateTipsShowData =
    exports.LackResourceQuestViewShowData =
    exports.FishingEntrustViewShowData =
    exports.BehaviorTreeViewShowData =
    exports.LackResourceQuestTextInfo =
    exports.FishingEntrustStepTextInfo =
    exports.BehaviorTreeStepTextInfo =
      void 0);
class MissionViewStepTextInfoBase {
  constructor(t, s, e) {
    (this.InnerTidTitle = t),
      (this.ShowConditions = s),
      (this.ConditionText = e),
      (this.CurConditionTextIndex = void 0);
  }
}
class BehaviorTreeStepTextInfo extends MissionViewStepTextInfoBase {
  constructor(t, s, e, i) {
    super(t, e, i),
      (this.ShowSource = 0),
      (this.Edc = void 0),
      (this.UsePreStateText = !1),
      (this.Edc = s);
  }
  get TidTitle() {
    return void 0 === this.CurConditionTextIndex
      ? this.InnerTidTitle
      : this.ConditionText[this.CurConditionTextIndex].TidTitle;
  }
  get QuestScheduleType() {
    return void 0 !== this.CurConditionTextIndex && this.ConditionText
      ? this.ConditionText[this.CurConditionTextIndex].QuestScheduleType
      : this.Edc;
  }
}
exports.BehaviorTreeStepTextInfo = BehaviorTreeStepTextInfo;
class FishingEntrustStepTextInfo extends MissionViewStepTextInfoBase {
  constructor(t, s) {
    super(t, void 0, void 0),
      (this.ProgressTargetId = s),
      (this.ShowSource = 1);
  }
  get TidTitle() {
    return this.InnerTidTitle;
  }
  get QuestScheduleType() {
    return "FishingEntrust";
  }
}
exports.FishingEntrustStepTextInfo = FishingEntrustStepTextInfo;
class LackResourceQuestTextInfo extends MissionViewStepTextInfoBase {
  constructor(t) {
    super(t, void 0, void 0), (this.ShowSource = 2);
  }
  get TidTitle() {
    return this.InnerTidTitle;
  }
  get QuestScheduleType() {
    return "FishingEntrust";
  }
}
exports.LackResourceQuestTextInfo = LackResourceQuestTextInfo;
class MissionItemViewShowData {}
class BehaviorTreeViewShowData extends MissionItemViewShowData {
  constructor(t, s, e, i, h, o, r, a, n) {
    super(),
      (this.BtType = t),
      (this.Id = s),
      (this.TreeConfigId = e),
      (this.IsInChallenge = i),
      (this.TrackIconConfigId = h),
      (this.ShowPriority = o),
      (this.TitleTextKey = r),
      (this.MainStepText = a),
      (this.SubStepTexts = n),
      (this.DataSource = 0);
  }
  static Create(t, s, e, i, h, o, r, a, n) {
    return new BehaviorTreeViewShowData(t, s, e, i, h, o, r, a, n);
  }
}
exports.BehaviorTreeViewShowData = BehaviorTreeViewShowData;
class FishingEntrustViewShowData extends MissionItemViewShowData {
  constructor(t, s, e, i, h) {
    super(),
      (this.Id = t),
      (this.TrackIconConfigId = s),
      (this.TitleTextKey = e),
      (this.MainStepText = i),
      (this.SubStepTexts = h),
      (this.DataSource = 1),
      (this.ShowPriority = 0),
      (this.ShowPriority = t);
  }
  static Create(t, s, e, i, h) {
    return new FishingEntrustViewShowData(t, s, e, i, h);
  }
}
exports.FishingEntrustViewShowData = FishingEntrustViewShowData;
class LackResourceQuestViewShowData extends MissionItemViewShowData {
  constructor(t, s, e, i, h) {
    super(),
      (this.Id = t),
      (this.TrackIconConfigId = s),
      (this.TitleTextKey = e),
      (this.MainStepText = i),
      (this.SubStepTexts = h),
      (this.DataSource = 2),
      (this.ShowPriority = 0),
      (this.ShowPriority = t);
  }
  static Create(t, s, e, i, h) {
    return new LackResourceQuestViewShowData(t, s, e, i, h);
  }
}
exports.LackResourceQuestViewShowData = LackResourceQuestViewShowData;
class QuestUpdateTipsShowData {
  constructor(t, s, e, i) {
    (this.MissionViewShowData = t),
      (this.IsSkipAnim = s),
      (this.IsNewQuest = e),
      (this.NodeId = i);
  }
  get QuestId() {
    let t = 0;
    switch (this.MissionViewShowData.DataSource) {
      case 0:
        t = this.MissionViewShowData.TreeConfigId;
        break;
      case 2:
        t = this.MissionViewShowData.Id;
    }
    return t;
  }
}
exports.QuestUpdateTipsShowData = QuestUpdateTipsShowData;
//# sourceMappingURL=MissionViewDefine.js.map
