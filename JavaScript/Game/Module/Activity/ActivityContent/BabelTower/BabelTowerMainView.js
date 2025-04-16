"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.BabelTowerMainView = void 0);
const UE = require("ue"),
  LocalStorage_1 = require("../../../../Common/LocalStorage"),
  LocalStorageDefine_1 = require("../../../../Common/LocalStorageDefine"),
  TimeUtil_1 = require("../../../../Common/TimeUtil"),
  ControllerHolder_1 = require("../../../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  RedDotController_1 = require("../../../../RedDot/RedDotController"),
  UiViewBase_1 = require("../../../../Ui/Base/UiViewBase"),
  PopupCaptionItem_1 = require("../../../../Ui/Common/PopupCaptionItem"),
  UiManager_1 = require("../../../../Ui/UiManager"),
  InstanceDungeonEntranceController_1 = require("../../../InstanceDungeon/InstanceDungeonEntranceController"),
  PayShopViewData_1 = require("../../../PayShop/PayShopData/PayShopViewData"),
  ScrollingTipsController_1 = require("../../../ScrollingTips/ScrollingTipsController"),
  LguiUtil_1 = require("../../../Util/LguiUtil"),
  BabelTowerController_1 = require("./BabelTowerController");
class BabelTowerMainView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments),
      (this.Pe = void 0),
      (this.lqe = void 0),
      (this.AMo = () => {
        this.Pe?.IfLeaveInstanceDungeonWhenClose
          ? InstanceDungeonEntranceController_1.InstanceDungeonEntranceController.LeaveInstanceDungeon()
          : this.CloseMe();
      }),
      (this.zDo = () => {
        var e;
        BabelTowerController_1.BabelTowerController.GetBabelTowerData().CheckIfInOpenTime()
          ? (((e = new PayShopViewData_1.PayShopViewData()).PayShopId = 213),
            (e.ShowShopIdList = [213]),
            ControllerHolder_1.ControllerHolder.PayShopController.OpenPayShopView(
              e,
            ))
          : ScrollingTipsController_1.ScrollingTipsController.ShowTipsByTextId(
              "BabelTowerIsNotOpen",
            );
      }),
      (this.Ud_ = () => {
        BabelTowerController_1.BabelTowerController.GetBabelTowerData().CheckIfInOpenTime()
          ? UiManager_1.UiManager.OpenView("BabelTowerQuestView")
          : ScrollingTipsController_1.ScrollingTipsController.ShowTipsByTextId(
              "BabelTowerIsNotOpen",
            );
      }),
      (this.P1c = () => {
        UiManager_1.UiManager.OpenView("BabelTowerNormalLevelChoseView");
      }),
      (this.x1c = () => {
        UiManager_1.UiManager.OpenView("BabelTowerHardLevelChoseView");
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UIButtonComponent],
      [2, UE.UIItem],
      [3, UE.UIButtonComponent],
      [4, UE.UIItem],
      [5, UE.UIText],
      [6, UE.UIText],
      [7, UE.UIText],
      [8, UE.UIItem],
      [9, UE.UIText],
      [10, UE.UIText],
      [12, UE.UIText],
      [11, UE.UIText],
      [13, UE.UIButtonComponent],
      [14, UE.UIButtonComponent],
      [15, UE.UIItem],
      [16, UE.UIItem],
    ]),
      (this.BtnBindInfo = [
        [3, this.zDo],
        [1, this.Ud_],
        [13, this.P1c],
        [14, this.x1c],
      ]);
  }
  async OnBeforeStartAsync() {
    (this.Pe = this.OpenParam),
      (this.lqe = new PopupCaptionItem_1.PopupCaptionItem()),
      await this.lqe.CreateThenShowByActorAsync(this.GetItem(0).GetOwner()),
      this.lqe.SetCloseCallBack(this.AMo);
  }
  OnStart() {
    this.GetItem(4).SetUIActive(!1),
      RedDotController_1.RedDotController.BindRedDot(
        "BabelTowerNewLevelDifficulty",
        this.GetItem(15),
        void 0,
        1,
      ),
      RedDotController_1.RedDotController.BindRedDot(
        "BabelTowerNewLevelDifficulty",
        this.GetItem(16),
        void 0,
        0,
      ),
      RedDotController_1.RedDotController.BindRedDot(
        "BabelTowerQuestRedDot",
        this.GetItem(2),
      );
    var e =
      BabelTowerController_1.BabelTowerController.GetBabelTowerData().GetNewLevel();
    e &&
      !(
        LocalStorage_1.LocalStorage.GetPlayer(
          LocalStorageDefine_1.ELocalStoragePlayerKey.BabelTowerNewLevel,
        )?.get(e) ?? !1
      ) &&
      UiManager_1.UiManager.OpenView("BabelTowerNewLevelTipsView", e);
  }
  OnBeforeShow() {
    this.Og();
  }
  OnBeforeDestroy() {
    RedDotController_1.RedDotController.UnBindGivenUi(
      "BabelTowerNewLevelDifficulty",
      this.GetItem(15),
      1,
    ),
      RedDotController_1.RedDotController.UnBindGivenUi(
        "BabelTowerNewLevelDifficulty",
        this.GetItem(16),
        0,
      ),
      RedDotController_1.RedDotController.UnBindGivenUi(
        "BabelTowerQuestRedDot",
        this.GetItem(2),
      );
  }
  Og() {
    var e,
      o = BabelTowerController_1.BabelTowerController.GetBabelTowerData();
    o &&
      ((e = o.GetNextLevelOpenTimeText())
        ? (this.GetItem(8).SetUIActive(!0),
          LguiUtil_1.LguiUtil.SetLocalTextNew(
            this.GetText(7),
            "BabelUiTimeNew",
            e,
          ))
        : ((e =
            0 === o.EndOpenTime
              ? 0
              : o.EndOpenTime - TimeUtil_1.TimeUtil.GetServerTime()),
          (e = TimeUtil_1.TimeUtil.GetRemainTimeDataFormat(e).CountDownText),
          LguiUtil_1.LguiUtil.SetLocalTextNew(
            this.GetText(7),
            "BabelTowerCloseTime",
            e,
          )),
      (e = o.GetNormalLevelPassText()),
      LguiUtil_1.LguiUtil.SetLocalTextNew(
        this.GetText(10),
        "BabelTowerNormalLevelTips",
        e,
      ),
      (e = o.GetHardLevelStarText()),
      this.GetText(12).SetText(e),
      this.GetText(6).SetText(o.CurrentItemCount + ""),
      this.GetText(5).SetText(
        "/" + ModelManager_1.ModelManager.BabelTowerModel.ItemCountMax,
      ));
  }
}
exports.BabelTowerMainView = BabelTowerMainView;
//# sourceMappingURL=BabelTowerMainView.js.map
