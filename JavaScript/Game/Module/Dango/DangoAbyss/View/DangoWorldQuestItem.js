"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.DangoWorldQuestItem = void 0);
const MultiTextLang_1 = require("../../../../../Core/Define/ConfigQuery/MultiTextLang"),
  StringUtils_1 = require("../../../../../Core/Utils/StringUtils"),
  EventDefine_1 = require("../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../Common/Event/EventSystem"),
  PublicUtil_1 = require("../../../../Common/PublicUtil"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  QuestController_1 = require("../../../QuestNew/Controller/QuestController"),
  GenericScrollViewNew_1 = require("../../../Util/ScrollView/GenericScrollViewNew"),
  DangoAbyssGoalItem_1 = require("./DangoAbyssGoalItem");
class DangoWorldQuestItem {
  constructor() {
    (this.mf1 = 0),
      (this.nNc = void 0),
      (this.DSe = (e, t, i) => {
        this.hNc();
      }),
      (this.bdc = () => {
        this.hNc();
      }),
      (this.XZe = (e) => {
        this.hNc();
      }),
      (this.JZe = (e, t) => {
        this.hNc();
      }),
      (this.zZe = (e, t) => {
        this.hNc();
      }),
      (this.Gre = () => {
        this.hNc();
      }),
      (this.sNc = () => {
        return new DangoAbyssGoalItem_1.DangoAbyssGoalItem();
      }),
      (this.hNc = () => {
        var e = ModelManager_1.ModelManager.QuestNewModel.GetCurTrackedQuest(),
          t = new Array();
        if (e && 10 === e.MainTypeId && 1 === e.SubType) {
          var i,
            n,
            s = new DangoAbyssGoalItem_1.GoalPanelData(),
            r =
              ((s.Title =
                ModelManager_1.ModelManager.QuestNewModel.GetQuestName(e.Id)),
              e.Tree.GetBlackBoard().GetCurrentActiveChildQuestNode()),
            o = e.Tree.GetBlackBoard().CreateShowData();
          if (
            (o.MainStepText &&
              ((n =
                ModelManager_1.ModelManager.QuestNewModel.CheckBehaviorStepFinishState(
                  o.MainStepText,
                  e.Tree.TreeIncId,
                )),
              (i = PublicUtil_1.PublicUtil.GetConfigTextByKey(
                o.MainStepText.TidTitle,
              )),
              1 === n
                ? ((n =
                    MultiTextLang_1.configMultiTextLang.GetLocalTextNew(
                      "DangoMainQuestColor",
                    ) ?? ""),
                  (n = StringUtils_1.StringUtils.Format(n, i) + "\n"),
                  (s.Desc += n))
                : ((n =
                    MultiTextLang_1.configMultiTextLang.GetLocalTextNew(
                      "DangoMainQuest",
                    ) ?? ""),
                  (n = StringUtils_1.StringUtils.Format(n, i) + "\n"),
                  (s.Desc += n))),
            o.SubStepTexts)
          )
            for (const a of o.SubStepTexts) {
              var _ =
                  ModelManager_1.ModelManager.QuestNewModel.CheckBehaviorStepFinishState(
                    a,
                    e.Tree.TreeIncId,
                  ),
                l = PublicUtil_1.PublicUtil.GetConfigTextByKey(a.TidTitle);
              1 === _
                ? ((_ =
                    MultiTextLang_1.configMultiTextLang.GetLocalTextNew(
                      "AbyssQuestColor",
                    )),
                  (_ = StringUtils_1.StringUtils.Format(_, l) + "\n"),
                  (s.Desc += _))
                : (s.Desc += l + "\n");
            }
          r && r.TrackTextConfig && (s.Desc += r.MultiTrackText), t.push(s);
        }
        this.nNc.RefreshByData(t);
      });
  }
  Init(e, t) {
    (this.nNc = new GenericScrollViewNew_1.GenericScrollViewNew(e, this.sNc)),
      this.AddEvents();
  }
  AddEvents() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.OnQuestStateChange,
      this.DSe,
    ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.GeneralLogicTreeStartShowTrackText,
        this.XZe,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.GeneralLogicTreeEndShowTrackText,
        this.JZe,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.GeneralLogicTreeUpdateShowTrackText,
        this.zZe,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.MissionPanelStepConditionIndexChange,
        this.bdc,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnLogicTreeTrackUpdate,
        this.Gre,
      );
  }
  RemoveEvents() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.OnQuestStateChange,
      this.DSe,
    ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.GeneralLogicTreeStartShowTrackText,
        this.XZe,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.GeneralLogicTreeEndShowTrackText,
        this.JZe,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.GeneralLogicTreeUpdateShowTrackText,
        this.zZe,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.MissionPanelStepConditionIndexChange,
        this.bdc,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnLogicTreeTrackUpdate,
        this.Gre,
      );
  }
  Clear() {
    this.RemoveEvents();
  }
  Refresh() {
    this.hNc();
  }
  ff1() {
    var e = ModelManager_1.ModelManager.QuestNewModel.GetQuestsByTypeAndSubType(
      10,
      1,
    );
    if (0 !== e.length)
      for (const i of e) {
        var t = ModelManager_1.ModelManager.QuestNewModel.GetQuestState(i.Id);
        if (1 === t || 2 === t) return i.Id;
      }
    return 0;
  }
  Tick() {
    var e,
      t = this.ff1();
    0 !== t &&
      ((e = ModelManager_1.ModelManager.QuestNewModel.GetCurTrackedQuest()),
      t !== this.mf1 || this.mf1 !== e?.Id) &&
      ((this.mf1 = t),
      QuestController_1.QuestNewController.RequestTrackQuest(this.mf1, !0, 2),
      (e = ModelManager_1.ModelManager.QuestNewModel.GetQuest(this.mf1)),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.OnLogicTreeTrackUpdate,
        e.Tree.BtType,
        e.Tree.TreeIncId,
      ));
  }
}
exports.DangoWorldQuestItem = DangoWorldQuestItem;
//# sourceMappingURL=DangoWorldQuestItem.js.map
