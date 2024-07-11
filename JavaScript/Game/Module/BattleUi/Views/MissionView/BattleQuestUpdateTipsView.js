"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.BattleQuestUpdateTipsView = void 0);
const ue_1 = require("ue"),
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
  Info_1 = require("../../../../../Core/Common/Info");
class BattleQuestUpdateTipsView extends BattleChildView_1.BattleChildView {
  constructor() {
    super(...arguments),
      (this.Qtt = void 0),
      (this.$ut = void 0),
      (this.Yut = 0),
      (this.Jut = 0),
      (this.zut = !1),
      (this.oct = !1),
      (this.mxn = !1),
      (this.dxn = !1),
      (this.lct = () => {
        this.$ut &&
          (Log_1.Log.CheckInfo() &&
            Log_1.Log.Info(
              "Quest",
              19,
              "BattleQuestUpdateTipsView:UpdateQuestName",
              ["QuestName", this.$ut.QuestName],
            ),
          this.GetText(0).SetText(this.$ut.QuestName));
      }),
      (this._ct = () => {
        if (this.$ut) {
          var t = this.$ut.TrackTextConfig?.MainTitle;
          let e = "";
          void 0 !== t
            ? (Log_1.Log.CheckInfo() &&
                Log_1.Log.Info(
                  "Quest",
                  19,
                  "BattleQuestUpdateTipsView:UpdateNodeDescribe",
                  ["curMainTitle", t],
                ),
              (e =
                GeneralLogicTreeController_1.GeneralLogicTreeController.GetTitleText(
                  this.$ut.TreeIncId,
                  t,
                )))
            : (t =
                GeneralLogicTreeController_1.GeneralLogicTreeController.GetNodeTrackText(
                  this.$ut.TreeIncId,
                  this.Jut,
                )) && (e = t),
            Log_1.Log.CheckInfo() &&
              Log_1.Log.Info(
                "Quest",
                19,
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
          this.Yut &&
          this.Jut &&
          ((this.oct = !0),
          this.dxn ||
            (EventSystem_1.EventSystem.Emit(
              EventDefine_1.EEventName.QuestUpdateTipsClickTrack,
            ),
            (this.dxn = !0)),
          QuestController_1.QuestNewController.RequestTrackQuest(
            this.Yut,
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
      this.GetText(1).OnSelfLanguageChange.Unbind();
  }
  OnPanelShow() {}
  OnPanelHide() {}
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
      (this.mxn = !0);
  }
  OnAfterPlayHideSequence() {
    (this.mxn = !1),
      this.dxn ||
        QuestController_1.QuestNewController.TryChangeTrackedQuest(
          ModelManager_1.ModelManager.QuestNewModel.CurShowUpdateTipsQuest,
        ),
      (ModelManager_1.ModelManager.QuestNewModel.CurShowUpdateTipsQuest =
        void 0);
  }
  UpdateData(e) {
    (ModelManager_1.ModelManager.QuestNewModel.CurShowUpdateTipsQuest =
      e.ShowBridge.TreeConfigId),
      (this.dxn = !1),
      this.RefreshUi(e),
      (this.zut = e.ShowBridge.IsNewQuest),
      this.Cxn();
  }
  RefreshUi(e) {
    (this.Jut = e.NodeId),
      (this.$ut = e.ShowBridge),
      (this.Yut = this.$ut.TreeConfigId),
      Log_1.Log.CheckInfo() &&
        Log_1.Log.Info("Quest", 19, "BattleQuestUpdateTipsView:RefreshUi", [
          "TreeConfigId",
          this.Yut,
        ]),
      this.Ost(),
      this.lct(),
      this._ct();
  }
  Ost() {
    var e,
      t = this.$ut?.TrackIconConfigId;
    Log_1.Log.CheckInfo() &&
      Log_1.Log.Info("Quest", 19, "BattleQuestUpdateTipsView:SetIcon", [
        "Id",
        t,
      ]),
      t &&
        ((t = ConfigManager_1.ConfigManager.QuestNewConfig.GetQuestTypeMark(t)),
        (e = this.GetSprite(2)),
        this.SetSpriteByPath(t, e, !1));
  }
  Cxn() {
    EventSystem_1.EventSystem.Emit(
      EventDefine_1.EEventName.MissionUpdate,
      this.$ut,
    ),
      this.$ut &&
        this.zut &&
        (ConfigManager_1.ConfigManager.QuestNewConfig.GetNewTipsShowTime(
          this.$ut.QuestType,
        ) ??
          0) &&
        UiManager_1.UiManager.OpenView("NewMissionTips", this.$ut.TreeConfigId);
  }
  IsClosing() {
    return this.mxn;
  }
}
exports.BattleQuestUpdateTipsView = BattleQuestUpdateTipsView;
//# sourceMappingURL=BattleQuestUpdateTipsView.js.map
