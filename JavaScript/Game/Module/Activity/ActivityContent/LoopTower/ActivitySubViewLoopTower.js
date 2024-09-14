"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ActivitySubViewLoopTower = void 0);
const UE = require("ue"),
  MultiTextLang_1 = require("../../../../../Core/Define/ConfigQuery/MultiTextLang"),
  MathUtils_1 = require("../../../../../Core/Utils/MathUtils"),
  StringUtils_1 = require("../../../../../Core/Utils/StringUtils"),
  EventDefine_1 = require("../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../Common/Event/EventSystem"),
  LocalStorage_1 = require("../../../../Common/LocalStorage"),
  LocalStorageDefine_1 = require("../../../../Common/LocalStorageDefine"),
  TimeUtil_1 = require("../../../../Common/TimeUtil"),
  ControllerHolder_1 = require("../../../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  RedDotController_1 = require("../../../../RedDot/RedDotController"),
  UiManager_1 = require("../../../../Ui/UiManager"),
  TowerData_1 = require("../../../TowerDetailUi/TowerData"),
  ActivitySubViewBase_1 = require("../../View/SubView/ActivitySubViewBase"),
  ActivityDescriptionTypeA_1 = require("../UniversalComponents/Content/ActivityDescriptionTypeA"),
  ActivityRewardList_1 = require("../UniversalComponents/Content/ActivityRewardList"),
  ActivityFunctionalTypeA_1 = require("../UniversalComponents/Functional/ActivityFunctionalTypeA"),
  ActivityTitleTypeA_1 = require("../UniversalComponents/Title/ActivityTitleTypeA"),
  TOWER_MAP_MARK_ID = 301203;
class ActivitySubViewLoopTower extends ActivitySubViewBase_1.ActivitySubViewBase {
  constructor() {
    super(...arguments),
      (this.ActivityBaseData = void 0),
      (this.LNe = void 0),
      (this.DNe = void 0),
      (this.UNe = void 0),
      (this.ANe = void 0),
      (this._fe = !0),
      (this.ONe = () => {
        var e = { MarkId: TOWER_MAP_MARK_ID, MarkType: 6 };
        ControllerHolder_1.ControllerHolder.WorldMapController.OpenView(
          2,
          !1,
          e,
        );
      }),
      (this.Ita = () => {
        LocalStorage_1.LocalStorage.SetPlayer(
          LocalStorageDefine_1.ELocalStoragePlayerKey.LoopTowerIsClickShop,
          !0,
        ),
          this.GetItem(7)?.SetUIActive(!1),
          ControllerHolder_1.ControllerHolder.PayShopController.OpenPayShopViewWithTab(
            5,
            0,
          );
      }),
      (this.Tta = () => {
        1 ===
          ModelManager_1.ModelManager.TowerModel?.GetDifficultyRewardProgress(
            TowerData_1.VARIATION_RISK_DIFFICULTY,
          ) &&
          ControllerHolder_1.ControllerHolder.ScrollingTipsController.ShowTipsById(
            "HaveAllReward",
          ),
          UiManager_1.UiManager.OpenView(
            "TowerRewardView",
            TowerData_1.VARIATION_RISK_DIFFICULTY,
            (e, t) => {
              UiManager_1.UiManager.GetViewByName(
                "CommonActivityView",
              )?.AddChildViewById(t);
            },
          );
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UIItem],
      [2, UE.UIItem],
      [3, UE.UIItem],
      [4, UE.UIButtonComponent],
      [5, UE.UIButtonComponent],
      [6, UE.UIText],
      [7, UE.UIItem],
      [8, UE.UIItem],
    ]),
      (this.BtnBindInfo = [
        [4, this.Ita],
        [5, this.Tta],
      ]);
  }
  OnSetData() {}
  async OnBeforeStartAsync() {
    var e = this.GetItem(0),
      e =
        ((this.LNe = new ActivityTitleTypeA_1.ActivityTitleTypeA()),
        await this.LNe.CreateThenShowByActorAsync(e.GetOwner()),
        this.GetItem(1)),
      e =
        ((this.DNe = new ActivityDescriptionTypeA_1.ActivityDescriptionTypeA()),
        await this.DNe.CreateThenShowByActorAsync(e.GetOwner()),
        this.GetItem(2)),
      e =
        ((this.UNe = new ActivityRewardList_1.ActivityRewardList()),
        await this.UNe.CreateThenShowByActorAsync(e.GetOwner()),
        this.GetItem(3));
    (this.ANe = new ActivityFunctionalTypeA_1.ActivityFunctionalTypeA(
      this.ActivityBaseData,
    )),
      await this.ANe.CreateThenShowByActorAsync(e.GetOwner()),
      await ControllerHolder_1.ControllerHolder.TowerController.RefreshTower();
  }
  OnStart() {
    this.LNe.SetTitleByText(this.ActivityBaseData.GetTitle()),
      this.DNe.SetContentByTextId(this.ActivityBaseData.LocalConfig.Desc),
      this.kNe(),
      LocalStorage_1.LocalStorage.SetPlayer(
        LocalStorageDefine_1.ELocalStoragePlayerKey.LoopTowerIsClickSeason,
        ModelManager_1.ModelManager.TowerModel.CurrentSeason,
      ),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.RefreshCommonActivityRedDot,
        this.ActivityBaseData.Id,
      ),
      StringUtils_1.StringUtils.IsEmpty(this.ActivityRemainTimeText) &&
        (this.ActivityRemainTimeText =
          MultiTextLang_1.configMultiTextLang.GetLocalTextNew(
            "ActivityRemainingTime",
          ));
  }
  OnBeforeShow() {
    this.OnRefreshView(),
      (ModelManager_1.ModelManager.TowerModel.CurrentSelectDifficulties =
        TowerData_1.VARIATION_RISK_DIFFICULTY),
      RedDotController_1.RedDotController.BindRedDot(
        "TowerReward",
        this.GetItem(8),
      ),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.RedDotTowerReward,
      ),
      this.GetItem(7)?.SetUIActive(
        !LocalStorage_1.LocalStorage.GetPlayer(
          LocalStorageDefine_1.ELocalStoragePlayerKey.LoopTowerIsClickShop,
        ),
      );
  }
  OnRefreshView() {
    this.FNe(), this.VNe(), this.Lta();
  }
  OnTimer(e) {
    this._fe && this.FNe();
  }
  FNe() {
    var e = MathUtils_1.MathUtils.LongToNumber(
      ModelManager_1.ModelManager.TowerModel.TowerEndTime,
    );
    e - TimeUtil_1.TimeUtil.GetServerTime() <= 0
      ? (ControllerHolder_1.ControllerHolder.ActivityController.ShowActivityRefreshAndBackToBattleView(),
        (this._fe = !1))
      : ((e = ModelManager_1.ModelManager.ActivityModel.GetRemainTimeText(
          e,
          this.ActivityRemainTimeText,
        )),
        this.LNe.SetTimeTextByText(e));
  }
  kNe() {
    var e = this.ActivityBaseData.GetPreviewReward();
    this.UNe.InitGridLayout(this.UNe.InitCommonGridItem),
      this.UNe.RefreshItemLayout(e);
  }
  VNe() {
    var e = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(
      "CollectActivity_Button_ahead",
    );
    this.ANe.FunctionButton.SetText(e),
      this.ANe.FunctionButton.SetFunction(this.ONe);
  }
  Lta() {
    var e = ModelManager_1.ModelManager.TowerModel,
      t = e.GetDifficultyMaxStars(TowerData_1.VARIATION_RISK_DIFFICULTY),
      e = e.GetDifficultyAllStars(TowerData_1.VARIATION_RISK_DIFFICULTY);
    this.GetText(6).SetText(t + "/" + e);
  }
  OnBeforeHide() {
    RedDotController_1.RedDotController.UnBindGivenUi(
      "TowerReward",
      this.GetItem(8),
    );
  }
}
exports.ActivitySubViewLoopTower = ActivitySubViewLoopTower;
//# sourceMappingURL=ActivitySubViewLoopTower.js.map
