"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.TowerVariationView = void 0);
const UE = require("ue"),
  MathUtils_1 = require("../../../../Core/Utils/MathUtils"),
  EventDefine_1 = require("../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../Common/Event/EventSystem"),
  TimeUtil_1 = require("../../../Common/TimeUtil"),
  ControllerHolder_1 = require("../../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  RedDotController_1 = require("../../../RedDot/RedDotController"),
  UiTickViewBase_1 = require("../../../Ui/Base/UiTickViewBase"),
  UiManager_1 = require("../../../Ui/UiManager"),
  ConfirmBoxDefine_1 = require("../../ConfirmBox/ConfirmBoxDefine"),
  InstanceDungeonEntranceController_1 = require("../../InstanceDungeon/InstanceDungeonEntranceController"),
  TowerController_1 = require("../TowerController"),
  TowerData_1 = require("../TowerData"),
  TowerAreaItem_1 = require("./TowerAreaItem"),
  TowerTitleItem_1 = require("./TowerTitleItem");
class TowerVariationView extends UiTickViewBase_1.UiTickViewBase {
  constructor() {
    super(...arguments),
      (this.dRo = !1),
      (this._fe = !0),
      (this.y2t = void 0),
      (this.gLt = void 0),
      (this.CRo = []),
      (this.YDo = () => {
        1 ===
          ModelManager_1.ModelManager.TowerModel?.GetDifficultyRewardProgress(
            ModelManager_1.ModelManager.TowerModel.CurrentSelectDifficulties,
          ) &&
          ControllerHolder_1.ControllerHolder.ScrollingTipsController.ShowTipsById(
            "HaveAllReward",
          ),
          UiManager_1.UiManager.OpenView("TowerRewardView", void 0, (e, r) => {
            this.AddChildViewById(r);
          });
      }),
      (this.JDo = () => {
        UiManager_1.UiManager.GetViewByName("TowerNormalView")
          ? this.CloseMe()
          : UiManager_1.UiManager.OpenViewAsync("TowerNormalView");
      }),
      (this.zDo = () => {
        ControllerHolder_1.ControllerHolder.PayShopController.OpenPayShopViewWithTab(
          5,
          0,
        );
      }),
      (this.ZDo = () => {
        var e =
          ModelManager_1.ModelManager.TowerModel?.GetDifficultyRewardProgress(
            TowerData_1.VARIATION_RISK_DIFFICULTY,
          );
        this.GetSprite(6)?.SetFillAmount(e),
          1 === e
            ? (this.GetItem(10)?.SetUIActive(!0),
              this.GetItem(11)?.SetUIActive(!0))
            : (this.GetItem(10)?.SetUIActive(!1),
              this.GetItem(11)?.SetUIActive(!1));
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UIHorizontalLayout],
      [2, UE.UIButtonComponent],
      [3, UE.UIButtonComponent],
      [4, UE.UIText],
      [5, UE.UIItem],
      [6, UE.UISprite],
      [7, UE.UIButtonComponent],
      [8, UE.UIItem],
      [9, UE.UIItem],
      [10, UE.UIItem],
      [11, UE.UIItem],
    ]),
      (this.BtnBindInfo = [
        [2, this.YDo],
        [3, this.JDo],
        [7, this.zDo],
      ]);
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.OnTowerRewardReceived,
      this.ZDo,
    );
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.OnTowerRewardReceived,
      this.ZDo,
    );
  }
  OnBeforeShow() {
    (ModelManager_1.ModelManager.TowerModel.CurrentSelectDifficulties =
      TowerData_1.VARIATION_RISK_DIFFICULTY),
      RedDotController_1.RedDotController.BindRedDot(
        "TowerReward",
        this.GetItem(5),
      ),
      RedDotController_1.RedDotController.BindRedDot(
        "TowerRewardByDifficulties",
        this.GetItem(8),
        void 0,
        4,
      ),
      this.ZDo(),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.RedDotTowerReward,
      ),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.RedDotTowerRewardByDifficulties,
        3,
      ),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.RedDotTowerRewardByDifficulties,
        4,
      );
  }
  OnBeforeDestroy() {
    this.gLt.Destroy(),
      (this.gLt = void 0),
      InstanceDungeonEntranceController_1.InstanceDungeonEntranceController.RestoreDungeonEntranceEntity();
  }
  async eRo() {
    UiManager_1.UiManager.GetViewByName("TowerNormalView") &&
      (await UiManager_1.UiManager.CloseViewAsync("TowerNormalView")),
      this.CloseMe();
  }
  async OnBeforeStartAsync() {
    var e =
      ModelManager_1.ModelManager.TowerModel.GetDifficultyAllAreaFirstFloor(
        TowerData_1.VARIATION_RISK_DIFFICULTY,
      );
    const o = this.GetHorizontalLayout(1).RootUIComp;
    await e.reduce(async (e, r, t) => {
      await e;
      e = new TowerAreaItem_1.TowerAreaItem();
      return (
        this.CRo.push(e),
        e.CreateThenShowByResourceIdAsync(
          1 === t
            ? "UiItem_DailyTowerLevelRedItem"
            : "UiItem_DailyTowerLevelItem",
          o,
        )
      );
    }, Promise.resolve());
  }
  OnStart() {
    (this.dRo = ModelManager_1.ModelManager.TowerModel.GetDifficultyIsClear(
      TowerData_1.HIGH_RISK_DIFFICULTY,
    )),
      (ModelManager_1.ModelManager.TowerModel.CurrentSelectDifficulties =
        TowerData_1.VARIATION_RISK_DIFFICULTY),
      (this.gLt = new TowerTitleItem_1.TowerTitleItem(this.GetItem(0), () => {
        var e;
        ModelManager_1.ModelManager.TowerModel.CheckInTower()
          ? ((e = new ConfirmBoxDefine_1.ConfirmBoxDataNew(
              137,
            )).FunctionMap.set(2, () => {
              TowerController_1.TowerController.LeaveTower();
            }),
            ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(
              e,
            ))
          : this.eRo();
      })),
      this.gLt.RefreshText("InstanceDungeonTitle_31_CommonText");
    var e = ModelManager_1.ModelManager.TowerModel.GetSeasonCountDownData(),
      r =
        (this.GetText(4).SetText(e.CountDownText),
        EventSystem_1.EventSystem.Emit(
          EventDefine_1.EEventName.RedDotTowerRewardByDifficulties,
          3,
        ),
        (ModelManager_1.ModelManager.TowerModel.CurrentTowerLock = !this.dRo),
        ModelManager_1.ModelManager.TowerModel.GetDifficultyAllAreaFirstFloor(
          TowerData_1.VARIATION_RISK_DIFFICULTY,
        ));
    for (let e = 0; e < this.CRo.length; e++) this.CRo[e].Refresh(r[e]);
  }
  OnBeforeHide() {
    RedDotController_1.RedDotController.UnBindGivenUi(
      "TowerReward",
      this.GetItem(5),
    ),
      RedDotController_1.RedDotController.UnBindGivenUi(
        "TowerRewardByDifficulties",
        this.GetItem(8),
        4,
      );
  }
  OnTick(e) {
    this._fe && this.B2t();
  }
  B2t() {
    var e,
      r =
        ModelManager_1.ModelManager.TowerModel.GetSeasonCountDownData()
          .CountDownText;
    this.y2t !== r && ((this.y2t = r), this.GetText(4).SetText(r)),
      MathUtils_1.MathUtils.LongToNumber(
        ModelManager_1.ModelManager.TowerModel.TowerEndTime,
      ) -
        TimeUtil_1.TimeUtil.GetServerTime() <=
        1 &&
        ((this._fe = !1),
        EventSystem_1.EventSystem.Emit(
          EventDefine_1.EEventName.ResetToBattleView,
        ),
        (r = new ConfirmBoxDefine_1.ConfirmBoxDataNew(99)).FunctionMap.set(
          1,
          (e = () => {
            ModelManager_1.ModelManager.TowerModel.CheckInTower() &&
              InstanceDungeonEntranceController_1.InstanceDungeonEntranceController.LeaveInstanceDungeonRequest();
          }),
        ),
        r.FunctionMap.set(2, e),
        ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(
          r,
        ));
  }
}
exports.TowerVariationView = TowerVariationView;
//# sourceMappingURL=TowerVariationView.js.map
