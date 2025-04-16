"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.BabelTowerHardLevelChoseView = void 0);
const UE = require("ue"),
  EventDefine_1 = require("../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../Common/Event/EventSystem"),
  ControllerHolder_1 = require("../../../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  RedDotController_1 = require("../../../../RedDot/RedDotController"),
  UiViewBase_1 = require("../../../../Ui/Base/UiViewBase"),
  PopupCaptionItem_1 = require("../../../../Ui/Common/PopupCaptionItem"),
  UiManager_1 = require("../../../../Ui/UiManager"),
  PayShopViewData_1 = require("../../../PayShop/PayShopData/PayShopViewData"),
  ScrollingTipsController_1 = require("../../../ScrollingTips/ScrollingTipsController"),
  LoopScrollView_1 = require("../../../Util/ScrollView/LoopScrollView"),
  BabelTowerController_1 = require("./BabelTowerController"),
  BabelTowerHardLevelChoseItem_1 = require("./BabelTowerHardLevelChoseItem");
class BabelTowerHardLevelChoseView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments),
      (this.Pe = void 0),
      (this.lqe = void 0),
      (this.M1c = []),
      (this.vVt = void 0),
      (this.OVc = void 0),
      (this.AMo = () => {
        var e;
        this.Pe?.IfReturnToBabelTowerMainView
          ? ((e = {
              IfLeaveInstanceDungeonWhenClose:
                this.Pe.IfLeaveInstanceDungeonWhenMainViewClose,
            }),
            UiManager_1.UiManager.OpenView("BabelTowerMainView", e, () => {
              this.CloseMe();
            }))
          : this.CloseMe();
      }),
      (this.zDo = () => {
        var e = new PayShopViewData_1.PayShopViewData();
        (e.PayShopId = 213),
          (e.ShowShopIdList = [213]),
          ControllerHolder_1.ControllerHolder.PayShopController.OpenPayShopView(
            e,
          );
      }),
      (this.Ud_ = () => {
        BabelTowerController_1.BabelTowerController.GetBabelTowerData().CheckIfInOpenTime()
          ? UiManager_1.UiManager.OpenView("BabelTowerQuestView")
          : ScrollingTipsController_1.ScrollingTipsController.ShowTipsByTextId(
              "BabelTowerIsNotOpen",
            );
      }),
      (this.E1c = (e) => {
        BabelTowerController_1.BabelTowerController.SaveNewLevelClickData(e, 1),
          UiManager_1.UiManager.OpenView("BabelTowerDeTermSelectView", e);
      }),
      (this.sGe = () => {
        var e =
          new BabelTowerHardLevelChoseItem_1.BabelTowerHardLevelChoseItem();
        return (e.OnClickButtonCallBack = this.E1c), e;
      }),
      (this.I1c = () => {
        this.Og();
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [8, UE.UILoopScrollViewComponent],
      [9, UE.UIItem],
      [2, UE.UIButtonComponent],
      [3, UE.UIItem],
      [4, UE.UIButtonComponent],
      [5, UE.UIItem],
      [6, UE.UIText],
      [7, UE.UIText],
      [1, UE.UIArtText],
    ]),
      (this.BtnBindInfo = [
        [4, this.zDo],
        [2, this.Ud_],
      ]);
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.BabelTowerRefreshLevelInfo,
      this.I1c,
    );
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.BabelTowerRefreshLevelInfo,
      this.I1c,
    );
  }
  async OnBeforeStartAsync() {
    (this.Pe = this.OpenParam),
      (this.lqe = new PopupCaptionItem_1.PopupCaptionItem()),
      await this.lqe.CreateThenShowByActorAsync(this.GetItem(0).GetOwner()),
      this.lqe.SetCloseCallBack(this.AMo),
      (this.vVt = new LoopScrollView_1.LoopScrollView(
        this.GetLoopScrollViewComponent(8),
        this.GetItem(9).GetOwner(),
        this.sGe,
      ));
  }
  OnStart() {
    this.GetItem(5).SetUIActive(!1),
      RedDotController_1.RedDotController.BindRedDot(
        "BabelTowerQuestRedDot",
        this.GetItem(3),
      ),
      this.Og();
  }
  OnBeforeDestroy() {
    RedDotController_1.RedDotController.UnBindGivenUi(
      "BabelTowerQuestRedDot",
      this.GetItem(3),
    );
  }
  OnBeforeShow() {
    var t = ModelManager_1.ModelManager.BabelTowerModel.LevelChoseHandle;
    if (t) {
      for (let e = 0; e < this.M1c.length; e++)
        if (this.M1c[e].ELl === t) {
          this.vVt?.ScrollToGridIndex(e);
          const r = this.vVt.UnsafeGetGridProxy(e);
          this.vVt?.BindLateUpdate(() => {
            r &&
              (ControllerHolder_1.ControllerHolder.UiNavigationNewController.SetNavigationFocusForView(
                r.GetRootItem(),
                !0,
              ),
              this.OVc !== r
                ? (this.OVc?.StopLoopSequence(), r.PlayLoopSequence())
                : this.OVc.IsPlayingSequence() || r.PlayLoopSequence(),
              (this.OVc = r)),
              this.vVt?.UnBindLateUpdate();
          });
        }
    } else this.Og();
    var e = BabelTowerController_1.BabelTowerController.GetBabelTowerData();
    this.GetText(7).SetText(e.CurrentItemCount + ""),
      this.GetText(6).SetText(
        "/" + ModelManager_1.ModelManager.BabelTowerModel.ItemCountMax,
      );
  }
  Og() {
    var e,
      t = BabelTowerController_1.BabelTowerController.GetBabelTowerData();
    this.M1c = [];
    for ([, e] of t.HardLevelDataMap) this.M1c.push(e);
    this.vVt?.RefreshByData(this.M1c),
      this.GetArtText(1).SetText(t.GetHardLevelStarText()),
      this.GetLoopScrollViewComponent(8)
        .Content.GetComponentByClass(UE.UIInturnAnimController.StaticClass())
        ?.Play();
  }
  OnBeforeHide() {
    ModelManager_1.ModelManager.BabelTowerModel.LevelChoseHandle = 0;
  }
}
exports.BabelTowerHardLevelChoseView = BabelTowerHardLevelChoseView;
//# sourceMappingURL=BabelTowerHardLevelChoseView.js.map
