"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.TowerVariationView = void 0);
const UE = require("ue");
const MathUtils_1 = require("../../../../Core/Utils/MathUtils");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const TimeUtil_1 = require("../../../Common/TimeUtil");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../Manager/ModelManager");
const RedDotController_1 = require("../../../RedDot/RedDotController");
const UiTickViewBase_1 = require("../../../Ui/Base/UiTickViewBase");
const UiManager_1 = require("../../../Ui/UiManager");
const ConfirmBoxDefine_1 = require("../../ConfirmBox/ConfirmBoxDefine");
const InstanceDungeonEntranceController_1 = require("../../InstanceDungeon/InstanceDungeonEntranceController");
const TowerController_1 = require("../TowerController");
const TowerData_1 = require("../TowerData");
const TowerAreaItem_1 = require("./TowerAreaItem");
const TowerTitleItem_1 = require("./TowerTitleItem");
class TowerVariationView extends UiTickViewBase_1.UiTickViewBase {
  constructor() {
    super(...arguments),
      (this.fDo = !1),
      (this._fe = !0),
      (this.Ekt = void 0),
      (this.uTt = void 0),
      (this.pDo = []),
      (this.ZLo = () => {
        ModelManager_1.ModelManager.TowerModel?.GetDifficultyRewardProgress(
          ModelManager_1.ModelManager.TowerModel.CurrentSelectDifficulties,
        ) === 1 &&
          ControllerHolder_1.ControllerHolder.ScrollingTipsController.ShowTipsById(
            "HaveAllReward",
          ),
          UiManager_1.UiManager.OpenView("TowerRewardView", void 0, (e, r) => {
            this.AddChildViewById(r);
          });
      }),
      (this.eDo = () => {
        UiManager_1.UiManager.GetViewByName("TowerNormalView")
          ? this.CloseMe()
          : UiManager_1.UiManager.OpenViewAsync("TowerNormalView");
      }),
      (this.tDo = () => {
        ControllerHolder_1.ControllerHolder.PayShopController.OpenPayShopViewWithTab(
          5,
          0,
        );
      }),
      (this.iDo = () => {
        const e =
          ModelManager_1.ModelManager.TowerModel?.GetDifficultyRewardProgress(
            TowerData_1.VARIATION_RISK_DIFFICULTY,
          );
        this.GetSprite(6)?.SetFillAmount(e),
          e === 1
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
        [2, this.ZLo],
        [3, this.eDo],
        [7, this.tDo],
      ]);
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.OnTowerRewardReceived,
      this.iDo,
    );
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.OnTowerRewardReceived,
      this.iDo,
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
      this.iDo(),
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
    this.uTt.Destroy(),
      (this.uTt = void 0),
      InstanceDungeonEntranceController_1.InstanceDungeonEntranceController.RestoreDungeonEntranceEntity();
  }
  async oDo() {
    UiManager_1.UiManager.GetViewByName("TowerNormalView") &&
      (await UiManager_1.UiManager.CloseViewAsync("TowerNormalView")),
      this.CloseMe();
  }
  async OnBeforeStartAsync() {
    const r =
      ModelManager_1.ModelManager.TowerModel.GetDifficultyAllAreaFirstFloor(
        TowerData_1.VARIATION_RISK_DIFFICULTY,
      ).length;
    const t = [];
    for (let e = 0; e < r; e++) {
      const o = new TowerAreaItem_1.TowerAreaItem();
      this.pDo.push(o),
        t.push(
          o.CreateThenShowByResourceIdAsync(
            e === 1
              ? "UiItem_DailyTowerLevelRedItem"
              : "UiItem_DailyTowerLevelItem",
          ),
        );
    }
    await Promise.all(t);
  }
  OnStart() {
    (this.fDo = ModelManager_1.ModelManager.TowerModel.GetDifficultyIsClear(
      TowerData_1.HIGH_RISK_DIFFICULTY,
    )),
      (ModelManager_1.ModelManager.TowerModel.CurrentSelectDifficulties =
        TowerData_1.VARIATION_RISK_DIFFICULTY),
      (this.uTt = new TowerTitleItem_1.TowerTitleItem(this.GetItem(0), () => {
        let e;
        ModelManager_1.ModelManager.TowerModel.CheckInTower()
          ? ((e = new ConfirmBoxDefine_1.ConfirmBoxDataNew(
              137,
            )).FunctionMap.set(2, () => {
              TowerController_1.TowerController.LeaveTower();
            }),
            ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(
              e,
            ))
          : this.oDo();
      })),
      this.uTt.RefreshText("InstanceDungeonTitle_31_CommonText");
    const e = ModelManager_1.ModelManager.TowerModel.GetSeasonCountDownData();
    const r =
      (this.GetText(4).SetText(e.CountDownText),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.RedDotTowerRewardByDifficulties,
        3,
      ),
      (ModelManager_1.ModelManager.TowerModel.CurrentTowerLock = !this.fDo),
      ModelManager_1.ModelManager.TowerModel.GetDifficultyAllAreaFirstFloor(
        TowerData_1.VARIATION_RISK_DIFFICULTY,
      ));
    const t = this.GetHorizontalLayout(1).RootUIComp;
    for (let e = 0; e < this.pDo.length; e++) {
      const o = this.pDo[e];
      o.Refresh(r[e]),
        o
          .GetOriginalActor()
          .GetComponentByClass(UE.UIItem.StaticClass())
          .SetUIParent(t);
    }
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
    this._fe && this.wkt();
  }
  wkt() {
    let e;
    let r =
      ModelManager_1.ModelManager.TowerModel.GetSeasonCountDownData()
        .CountDownText;
    this.Ekt !== r && ((this.Ekt = r), this.GetText(4).SetText(r)),
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
// # sourceMappingURL=TowerVariationView.js.map
