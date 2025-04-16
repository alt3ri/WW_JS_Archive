"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.BattleQuestUpdateTipsView = void 0);
const ue_1 = require("ue"),
  Info_1 = require("../../../../../Core/Common/Info"),
  Log_1 = require("../../../../../Core/Common/Log"),
  EventDefine_1 = require("../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../Common/Event/EventSystem"),
  ConfigManager_1 = require("../../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  InputDistributeController_1 = require("../../../../Ui/InputDistribute/InputDistributeController"),
  InputMappingsDefine_1 = require("../../../../Ui/InputDistribute/InputMappingsDefine"),
  UiManager_1 = require("../../../../Ui/UiManager"),
  GeneralLogicTreeController_1 = require("../../../GeneralLogicTree/GeneralLogicTreeController"),
  QuestController_1 = require("../../../QuestNew/Controller/QuestController"),
  BattleChildView_1 = require("../BattleChildView/BattleChildView"),
  CombineKeyItem_1 = require("../KeyItem/CombineKeyItem"),
  MissionViewStepTextUtil_1 = require("./MissionViewStepTextUtil");
class BattleQuestUpdateTipsView extends BattleChildView_1.BattleChildView {
  constructor() {
    super(...arguments),
      (this.Qtt = void 0),
      (this.Avi = void 0),
      (this.oct = !1),
      (this._xn = !1),
      (this.uxn = !1),
      (this.lct = () => {
        var e;
        this.Avi &&
          (e = ModelManager_1.ModelManager.QuestNewModel.GetQuest(
            this.Avi.QuestId,
          )) &&
          (Log_1.Log.CheckInfo() &&
            Log_1.Log.Info(
              "Quest",
              18,
              "BattleQuestUpdateTipsView:UpdateQuestName",
              ["QuestName", e.Name],
            ),
          this.GetText(0).SetText(e.Name));
      }),
      (this._ct = () => {
        if (this.Avi) {
          let e = "";
          this.Avi.MissionViewShowData.MainStepText
            ? (e =
                MissionViewStepTextUtil_1.MissionViewStepTextUtil.GetStepTextByConfig(
                  this.Avi.MissionViewShowData.Id,
                  this.Avi.MissionViewShowData.MainStepText,
                ))
            : 0 === this.Avi.MissionViewShowData.DataSource &&
              (e =
                GeneralLogicTreeController_1.GeneralLogicTreeController.GetNodeTrackText(
                  this.Avi.MissionViewShowData.Id,
                  this.Avi.NodeId,
                )),
            Log_1.Log.CheckInfo() &&
              Log_1.Log.Info(
                "Quest",
                18,
                "BattleQuestUpdateTipsView:UpdateNodeDescribe",
                ["describe", e],
              ),
            this.GetText(1).SetText(e);
        }
      }),
      (this.bMe = (e, t) => {
        1 === t && this.uct();
      }),
      (this.uct = () => {
        !this.oct &&
          this.Avi &&
          this.Avi.QuestId &&
          ((this.oct = !0),
          this.uxn ||
            (EventSystem_1.EventSystem.Emit(
              EventDefine_1.EEventName.QuestUpdateTipsClickTrack,
            ),
            (this.uxn = !0)),
          QuestController_1.QuestNewController.RequestTrackQuest(
            this.Avi.QuestId,
            !0,
            1,
            0,
            () => {
              this.oct = !1;
            },
          ));
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, ue_1.UIText],
      [1, ue_1.UIText],
      [2, ue_1.UISprite],
      [3, ue_1.UIButtonComponent],
      [4, ue_1.UIItem],
    ]),
      Info_1.Info.IsInTouch() ||
        this.ComponentRegisterInfos.push([5, ue_1.UIItem]),
      (this.BtnBindInfo = [[3, this.uct]]);
  }
  OnStart() {
    this.GetText(0).OnSelfLanguageChange.Bind(this.lct),
      this.GetText(1).OnSelfLanguageChange.Bind(this._ct),
      this.GetItem(4).SetUIActive(!0);
  }
  async InitializeAsync(e) {
    var t;
    Info_1.Info.IsInTouch() ||
      ((t = this.GetItem(5)),
      (this.Qtt = new CombineKeyItem_1.CombineKeyItem()),
      await this.Qtt.CreateThenShowByActorAsync(t.GetOwner()),
      this.Qtt.RefreshAction(InputMappingsDefine_1.actionMappings.任务追踪));
  }
  OnBeforeDestroy() {
    this.GetText(0).OnSelfLanguageChange.Unbind(),
      this.GetText(1).OnSelfLanguageChange.Unbind(),
      InputDistributeController_1.InputDistributeController.UnBindAction(
        InputMappingsDefine_1.actionMappings.任务追踪,
        this.bMe,
      );
  }
  OnBeforePlayShowSequence(e) {
    this.UpdateData(e),
      InputDistributeController_1.InputDistributeController.UnBindAction(
        InputMappingsDefine_1.actionMappings.任务追踪,
        this.bMe,
      ),
      InputDistributeController_1.InputDistributeController.BindAction(
        InputMappingsDefine_1.actionMappings.任务追踪,
        this.bMe,
      );
  }
  OnBeforePlayHideSequence() {
    InputDistributeController_1.InputDistributeController.UnBindAction(
      InputMappingsDefine_1.actionMappings.任务追踪,
      this.bMe,
    ),
      (this._xn = !0);
  }
  OnAfterPlayHideSequence() {
    InputDistributeController_1.InputDistributeController.UnBindAction(
      InputMappingsDefine_1.actionMappings.任务追踪,
      this.bMe,
    ),
      (this._xn = !1),
      !this.uxn &&
        this.Avi?.IsNewQuest &&
        QuestController_1.QuestNewController.TryChangeTrackedQuest(
          ModelManager_1.ModelManager.QuestNewModel.CurShowUpdateTipsQuest,
        ),
      (ModelManager_1.ModelManager.QuestNewModel.CurShowUpdateTipsQuest =
        void 0),
      (this.Avi = void 0);
  }
  UpdateData(e) {
    (this.uxn = !1),
      this.RefreshUi(e),
      this.cxn(),
      this.Avi?.IsNewQuest &&
        (ModelManager_1.ModelManager.QuestNewModel.CurShowUpdateTipsQuest =
          e.QuestId);
  }
  RefreshUi(e) {
    (this.Avi = e),
      Log_1.Log.CheckInfo() &&
        Log_1.Log.Info("Quest", 18, "BattleQuestUpdateTipsView:界面刷新", [
          "任务Id",
          this.Avi.QuestId,
        ]),
      this.Ost(),
      this.lct(),
      this._ct();
  }
  Ost() {
    var e = this.Avi?.MissionViewShowData.TrackIconConfigId ?? 0,
      e = ConfigManager_1.ConfigManager.QuestNewConfig.GetQuestTypeMark(e),
      t = this.GetSprite(2);
    this.SetSpriteByPath(e, t, !1);
  }
  cxn() {
    var e;
    this.Avi &&
      (EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.MissionUpdate,
        this.Avi.IsNewQuest,
      ),
      this.Avi.IsNewQuest) &&
      (e = ModelManager_1.ModelManager.QuestNewModel.GetQuest(
        this.Avi.QuestId,
      )?.Type) &&
      (ConfigManager_1.ConfigManager.QuestNewConfig.GetNewTipsShowTime(e) ??
        0) &&
      UiManager_1.UiManager.OpenView("NewMissionTips", this.Avi.QuestId);
  }
  IsClosing() {
    return this._xn;
  }
}
exports.BattleQuestUpdateTipsView = BattleQuestUpdateTipsView;
//# sourceMappingURL=BattleQuestUpdateTipsView.js.map
