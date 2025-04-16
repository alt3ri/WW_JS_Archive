"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.TowerNormalView = void 0);
const UE = require("ue"),
  Log_1 = require("../../../../Core/Common/Log"),
  EventDefine_1 = require("../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../Common/Event/EventSystem"),
  ControllerHolder_1 = require("../../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  RedDotController_1 = require("../../../RedDot/RedDotController"),
  UiViewBase_1 = require("../../../Ui/Base/UiViewBase"),
  UiManager_1 = require("../../../Ui/UiManager"),
  LevelSequencePlayer_1 = require("../../Common/LevelSequencePlayer"),
  ConfirmBoxDefine_1 = require("../../ConfirmBox/ConfirmBoxDefine"),
  InstanceDungeonEntranceController_1 = require("../../InstanceDungeon/InstanceDungeonEntranceController"),
  GenericLayout_1 = require("../../Util/Layout/GenericLayout"),
  TowerController_1 = require("../TowerController"),
  TowerData_1 = require("../TowerData"),
  TowerAreaItem_1 = require("./TowerAreaItem"),
  TowerTitleItem_1 = require("./TowerTitleItem");
class TowerNormalView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments),
      (this.zji = void 0),
      (this.HDo = void 0),
      (this.Ncl = void 0),
      (this.jDo = !1),
      (this.Fcl = !1),
      (this.gLt = void 0),
      (this.SPe = void 0),
      (this.KDo = 1),
      (this.sGe = () => {
        return new TowerAreaItem_1.TowerAreaItem();
      }),
      (this.QDo = (e) => {
        1 === e &&
          (this.zji?.SetToggleState(0),
          (this.zji = this.GetExtendToggle(4)),
          this.SPe.StopCurrentSequence(),
          this.SPe.PlaySequencePurely("Switch"),
          this.XDo(TowerData_1.LOW_RISK_DIFFICULTY));
      }),
      (this.$Do = (e) => {
        1 === e &&
          (this.zji?.SetToggleState(0),
          (this.zji = this.GetExtendToggle(5)),
          this.SPe.StopCurrentSequence(),
          this.SPe.PlaySequencePurely("Switch"),
          this.XDo(TowerData_1.HIGH_RISK_DIFFICULTY));
      }),
      (this.Vcl = (e) => {
        1 === e &&
          (this.zji?.SetToggleState(0),
          (this.zji = this.GetExtendToggle(18)),
          this.SPe.StopCurrentSequence(),
          this.SPe.PlaySequencePurely("Switch"),
          this.XDo(TowerData_1.OVERLOCK_RISK_DIFFICULTY));
      }),
      (this.YDo = () => {
        1 ===
          ModelManager_1.ModelManager.TowerModel?.GetDifficultyRewardProgress(
            ModelManager_1.ModelManager.TowerModel.CurrentSelectDifficulties,
          ) &&
          ControllerHolder_1.ControllerHolder.ScrollingTipsController.ShowTipsById(
            "HaveAllReward",
          ),
          UiManager_1.UiManager.OpenView("TowerRewardView", void 0, (e, t) => {
            this.AddChildViewById(t);
          });
      }),
      (this.JDo = () => {
        UiManager_1.UiManager.GetViewByName("TowerVariationView")
          ? this.CloseMe()
          : UiManager_1.UiManager.OpenViewAsync("TowerVariationView");
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
            ModelManager_1.ModelManager.TowerModel.CurrentSelectDifficulties,
          );
        this.GetSprite(9)?.SetFillAmount(e),
          1 === e
            ? (this.GetItem(15)?.SetUIActive(!0),
              this.GetItem(16)?.SetUIActive(!0))
            : (this.GetItem(15)?.SetUIActive(!1),
              this.GetItem(16)?.SetUIActive(!1));
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UIHorizontalLayout],
      [2, UE.UIButtonComponent],
      [3, UE.UIButtonComponent],
      [4, UE.UIExtendToggle],
      [5, UE.UIExtendToggle],
      [6, UE.UIItem],
      [7, UE.UIItem],
      [8, UE.UIItem],
      [9, UE.UISprite],
      [10, UE.UIButtonComponent],
      [11, UE.UIItem],
      [12, UE.UIItem],
      [13, UE.UIItem],
      [14, UE.UIItem],
      [15, UE.UIItem],
      [16, UE.UIItem],
      [17, UE.UIItem],
      [18, UE.UIExtendToggle],
      [19, UE.UIItem],
      [20, UE.UIItem],
      [21, UE.UIItem],
      [22, UE.UIItem],
    ]),
      (this.BtnBindInfo = [
        [2, this.YDo],
        [3, this.JDo],
        [10, this.zDo],
        [4, this.QDo],
        [5, this.$Do],
        [18, this.Vcl],
      ]);
  }
  async eRo() {
    UiManager_1.UiManager.GetViewByName("TowerVariationView") &&
      (await UiManager_1.UiManager.CloseViewAsync("TowerVariationView")),
      this.CloseMe();
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
  OnStart() {
    ModelManager_1.ModelManager.TowerModel.CheckInTower() &&
      TowerController_1.TowerController.ClearAllHatredInTower(),
      (this.SPe = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem)),
      (this.HDo = new GenericLayout_1.GenericLayout(
        this.GetHorizontalLayout(1),
        this.sGe,
        this.GetItem(19).GetOwner(),
      )),
      (this.Ncl = new GenericLayout_1.GenericLayout(
        this.GetHorizontalLayout(1),
        this.sGe,
        this.GetItem(17).GetOwner(),
      )),
      (this.jDo = ModelManager_1.ModelManager.TowerModel.GetDifficultyIsClear(
        TowerData_1.LOW_RISK_DIFFICULTY,
      )),
      (this.Fcl = ModelManager_1.ModelManager.TowerModel.GetDifficultyIsClear(
        TowerData_1.VARIATION_RISK_DIFFICULTY,
      )),
      this.jDo && !this.Fcl
        ? (this.XDo(TowerData_1.HIGH_RISK_DIFFICULTY),
          (this.zji = this.GetExtendToggle(5)))
        : this.Fcl || this.jDo
          ? (this.XDo(TowerData_1.OVERLOCK_RISK_DIFFICULTY),
            (this.zji = this.GetExtendToggle(18)))
          : (this.XDo(TowerData_1.LOW_RISK_DIFFICULTY),
            (this.zji = this.GetExtendToggle(4))),
      this.zji.SetToggleState(1),
      this.GetItem(7).SetUIActive(this.jDo),
      this.GetItem(8).SetUIActive(
        ModelManager_1.ModelManager.TowerModel.GetDifficultyIsClear(
          TowerData_1.HIGH_RISK_DIFFICULTY,
        ),
      ),
      this.GetItem(20).SetUIActive(
        ModelManager_1.ModelManager.TowerModel.GetDifficultyIsClear(
          TowerData_1.OVERLOCK_RISK_DIFFICULTY,
        ),
      ),
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
      this.gLt.RefreshText("InstanceDungeonTitle_31_CommonText"),
      this.ZDo();
  }
  OnBeforeShow() {
    RedDotController_1.RedDotController.BindRedDot(
      "TowerReward",
      this.GetItem(6),
    ),
      RedDotController_1.RedDotController.BindRedDot(
        "TowerRewardByDifficulties",
        this.GetItem(11),
        void 0,
        1,
      ),
      RedDotController_1.RedDotController.BindRedDot(
        "TowerRewardByDifficulties",
        this.GetItem(12),
        void 0,
        2,
      ),
      RedDotController_1.RedDotController.BindRedDot(
        "TowerRewardByDifficulties",
        this.GetItem(13),
        void 0,
        3,
      ),
      RedDotController_1.RedDotController.BindRedDot(
        "TowerRewardByDifficulties",
        this.GetItem(22),
        void 0,
        4,
      ),
      (ModelManager_1.ModelManager.TowerModel.CurrentSelectDifficulties =
        this.KDo),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.RedDotTowerReward,
      ),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.RedDotTowerRewardByDifficulties,
        1,
      ),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.RedDotTowerRewardByDifficulties,
        2,
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
    InstanceDungeonEntranceController_1.InstanceDungeonEntranceController.RestoreDungeonEntranceEntity(),
      this.HDo && (this.HDo = void 0),
      (this.zji = void 0),
      this.gLt?.Destroy(),
      this.SPe?.Clear(),
      (this.SPe = void 0),
      InstanceDungeonEntranceController_1.InstanceDungeonEntranceController.RestoreDungeonEntranceEntity();
  }
  OnAfterHide() {
    RedDotController_1.RedDotController.UnBindGivenUi(
      "TowerReward",
      this.GetItem(6),
    ),
      RedDotController_1.RedDotController.UnBindGivenUi(
        "TowerRewardByDifficulties",
        this.GetItem(11),
        1,
      ),
      RedDotController_1.RedDotController.UnBindGivenUi(
        "TowerRewardByDifficulties",
        this.GetItem(12),
        2,
      ),
      RedDotController_1.RedDotController.UnBindGivenUi(
        "TowerRewardByDifficulties",
        this.GetItem(13),
        3,
      ),
      RedDotController_1.RedDotController.UnBindGivenUi(
        "TowerRewardByDifficulties",
        this.GetItem(22),
        4,
      );
  }
  XDo(e) {
    (ModelManager_1.ModelManager.TowerModel.CurrentSelectDifficulties = e),
      (this.KDo = e),
      this.Hcl();
    e =
      ModelManager_1.ModelManager.TowerModel.GetDifficultyAllAreaFirstFloor(e);
    this.KDo === TowerData_1.OVERLOCK_RISK_DIFFICULTY
      ? (this.HDo.RefreshByData([]),
        this.Ncl.RefreshByData(e),
        ModelManager_1.ModelManager.TowerModel.CurrentTowerLock ||
          ModelManager_1.ModelManager.TowerModel.SetOverLockHasShow())
      : (this.Ncl.RefreshByData([]), this.HDo.RefreshByData(e)),
      this.ZDo(),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.RedDotTowerReward,
      ),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.RedDotTowerRewardByDifficulties,
        this.KDo,
      );
  }
  Hcl() {
    switch (this.KDo) {
      case TowerData_1.LOW_RISK_DIFFICULTY:
        (ModelManager_1.ModelManager.TowerModel.CurrentTowerLock = !1),
          this.GetItem(21).SetUIActive(!1);
        break;
      case TowerData_1.HIGH_RISK_DIFFICULTY:
        (ModelManager_1.ModelManager.TowerModel.CurrentTowerLock = !this.jDo),
          this.GetItem(21).SetUIActive(!1);
        break;
      case TowerData_1.OVERLOCK_RISK_DIFFICULTY:
        (ModelManager_1.ModelManager.TowerModel.CurrentTowerLock = !this.Fcl),
          this.GetItem(21).SetUIActive(
            ModelManager_1.ModelManager.TowerModel.CurrentTowerLock,
          );
        break;
      default:
        Log_1.Log.CheckError() &&
          Log_1.Log.Error("CycleTower", 5, "逆境深塔选择难度时异常", [
            "难度:",
            this.KDo,
          ]);
    }
  }
}
exports.TowerNormalView = TowerNormalView;
//# sourceMappingURL=TowerNormalView.js.map
