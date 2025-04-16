"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.MapRogueMainView = void 0);
const UE = require("ue"),
  StateRef_1 = require("../../../../../Core/Utils/Audio/StateRef"),
  StringUtils_1 = require("../../../../../Core/Utils/StringUtils"),
  ConfigManager_1 = require("../../../../Manager/ConfigManager"),
  ControllerHolder_1 = require("../../../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  UiTickViewBase_1 = require("../../../../Ui/Base/UiTickViewBase"),
  PopupCaptionItem_1 = require("../../../../Ui/Common/PopupCaptionItem"),
  LguiUtil_1 = require("../../../Util/LguiUtil"),
  MapRogueDefine_1 = require("../../MapRogueDefine"),
  MapRoguePanelFetter_1 = require("../Components/MapRoguePanelFetter"),
  MapRoguePanelLv_1 = require("../Components/MapRoguePanelLv"),
  MapRogueMoodBar_1 = require("../MapRogueMoodBar"),
  MapRogueMapModule_1 = require("./MapRogueMapModule"),
  STATE_NONE = "none";
class MapRogueMainView extends UiTickViewBase_1.UiTickViewBase {
  constructor() {
    super(...arguments),
      (this.MapModule = void 0),
      (this.MoodBar = void 0),
      (this.CaptionItem = void 0),
      (this.PanelLv = void 0),
      (this.PanelFetter = void 0),
      (this.GameInfo = void 0),
      (this.B6e = () => {
        ControllerHolder_1.ControllerHolder.MapRogueController.OpenExploreEnd();
      }),
      (this.dpt = () => {
        ControllerHolder_1.ControllerHolder.MapRogueController.OpenMapHelpView();
      }),
      (this.Mv1 = () => {
        ControllerHolder_1.ControllerHolder.MapRogueController.OpenExplore();
      }),
      (this.Xf1 = new StateRef_1.StateRef(
        "game_maprogue_map_type",
        STATE_NONE,
      )),
      (this.Yf1 = new StateRef_1.StateRef(
        "game_maprogue_map_vibe",
        STATE_NONE,
      ));
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UIItem],
      [2, UE.UIItem],
      [3, UE.UIText],
      [4, UE.UIText],
      [5, UE.UISprite],
      [6, UE.UIItem],
      [8, UE.UIItem],
      [7, UE.UIItem],
      [9, UE.UIButtonComponent],
    ]),
      (this.BtnBindInfo = [[9, this.Mv1]]);
  }
  async OnBeforeStartAsync() {
    ConfigManager_1.ConfigManager.MapRogueConfig.GetGlobalParamConfig()
      .OpenMapViewBlackScreen &&
      !ModelManager_1.ModelManager.LoadingModel.IsLoading &&
      (await ControllerHolder_1.ControllerHolder.BlackScreenController.AddBlackScreenAsync(
        "Start",
        "MapRogueMainView.Create",
      )),
      (this.GameInfo = ModelManager_1.ModelManager.MapRogueModel.GameInfo);
    var e = [];
    e.push(this.m2c()),
      e.push(this.zDn()),
      e.push(this.f2c()),
      e.push(this.Sf1()),
      e.push(this.Mf1()),
      await Promise.all(e);
  }
  OnStart() {
    var e,
      i =
        ConfigManager_1.ConfigManager.MapRogueConfig?.GetInsGridConfigByInstId(
          this.GameInfo.InstanceId,
        );
    i &&
      ((e = this.GetText(3)),
      LguiUtil_1.LguiUtil.SetLocalTextNew(e, i.Title),
      this.MoodBar.SetLimit(this.GameInfo.MoodMin, this.GameInfo.MoodMax),
      this.MoodBar.SetCurrentValue(this.GameInfo.Mood),
      this.MapModule.SetRolePos(this.GameInfo.PlayerGridIndex),
      this.GameInfo.TriggerGuideEventOnFocusStart(),
      this.MapModule.FocusOnGrid(
        this.GameInfo.PlayerGridIndex,
        void 0,
        this.GameInfo.TriggerGuideEventOnFocusEnd,
      ),
      this.MapModule.SetInteractState(!1, !1),
      this.RefreshProgress(),
      (this.Xf1.State = i.MapMusicState),
      this.RefreshTeamLv(),
      this.RefreshMoodMusicState(),
      this.GameInfo.BindView(this),
      this.GameInfo.SetInteractAvailable(0, !1),
      ConfigManager_1.ConfigManager.MapRogueConfig.GetGlobalParamConfig()
        .OpenMapViewBlackScreen) &&
      !ModelManager_1.ModelManager.LoadingModel.IsLoading &&
      ControllerHolder_1.ControllerHolder.BlackScreenController.RemoveBlackScreen(
        "Close",
        "MapRogueMainView.Create",
      );
  }
  OnAfterShow() {
    this.MapModule.MapShow(),
      ModelManager_1.ModelManager.MapRogueModel.ExecuteOpDataList(!0),
      this.GameInfo.SetInteractAvailable(0, !0);
  }
  OnBeforeHide() {
    this.MapModule.MapHide();
  }
  OnBeforeDestroy() {
    this.GameInfo?.BindView(void 0),
      (this.Xf1.State = STATE_NONE),
      (this.Yf1.State = STATE_NONE);
  }
  OnTick(e) {
    this.GameInfo.OnTick(e), this.MapModule?.OnTick(e);
  }
  ChangeGameStagePerformance(e, i) {}
  async m2c() {
    (this.MapModule = new MapRogueMapModule_1.MapRogueMapModule(this.GameInfo)),
      await this.MapModule.CreateThenShowByActorAsync(
        this.GetItem(1).GetOwner(),
      );
  }
  async zDn() {
    (this.CaptionItem = new PopupCaptionItem_1.PopupCaptionItem()),
      await this.CaptionItem.CreateThenShowByActorAsync(
        this.GetItem(0).GetOwner(),
      ),
      this.CaptionItem.SetCloseCallBack(this.B6e),
      this.CaptionItem.SetHelpCallBack(this.dpt),
      this.CaptionItem.SetCurrencyItemList([
        ModelManager_1.ModelManager.MapRogueModel.GetRogueCurrencyItemId(),
      ]);
  }
  async Sf1() {
    (this.PanelLv = new MapRoguePanelLv_1.MapRoguePanelLv()),
      await this.PanelLv.CreateThenShowByActorAsync(this.GetItem(8).GetOwner());
  }
  async Mf1() {
    (this.PanelFetter = new MapRoguePanelFetter_1.MapRoguePanelFetter()),
      await this.PanelFetter.CreateByActorAsync(this.GetItem(7).GetOwner()),
      this.AddChild(this.PanelFetter);
  }
  async f2c() {
    (this.MoodBar = new MapRogueMoodBar_1.MapRogueMoodBar()),
      await this.MoodBar.CreateThenShowByResourceIdAsync(
        "UiItem_MoodBar",
        this.GetItem(6),
      );
  }
  RefreshProgress() {
    var e = this.GameInfo.ExplorationCurrentProgress();
    LguiUtil_1.LguiUtil.SetLocalTextNew(
      this.GetText(4),
      "RogueResExplore_3",
      e,
    );
  }
  SetInteractAvailable(e) {
    this.MapModule?.SetInteractAvailable(e),
      this.MapModule?.SetInteractState(!1, !1);
  }
  RefreshTeamLv() {
    this.PanelLv?.SetLv(this.GameInfo.TeamLv);
  }
  async OpenPopupView(e) {
    await (0, MapRogueDefine_1.popupModelBaseGenerator)(
      e,
      this.GameInfo,
    ).CreateThenShowByResourceIdAsync("UiItem_MapRoguePopup", this.GetItem(2));
  }
  RefreshMoodMusicState() {
    var e = ConfigManager_1.ConfigManager.MapRogueConfig.GetMoodRuleById(
      this.GameInfo.MoodRuleId,
    );
    e &&
      !StringUtils_1.StringUtils.IsEmpty(e.MapMusicStateSwitch) &&
      (this.Yf1.State = e.MapMusicStateSwitch);
  }
  GetGuideUiItemAndUiItemForShowEx(e) {
    var i;
    if (0 !== e.length)
      return "Mood" === (i = e[0])
        ? this.MoodBar?.GetGuideUiItemAndUiItemForShowEx(e)
        : "MapRougeGrid" === i
          ? this.MapModule?.GetGuideUiItemAndUiItemForShowEx(e)
          : void 0;
  }
}
exports.MapRogueMainView = MapRogueMainView;
//# sourceMappingURL=MapRogueMainView.js.map
