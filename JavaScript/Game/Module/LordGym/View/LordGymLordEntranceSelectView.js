"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.LordGymLordEntranceSelectView = void 0);
const UE = require("ue"),
  LordGymEntranceSetById_1 = require("../../../../Core/Define/ConfigQuery/LordGymEntranceSetById"),
  ControllerHolder_1 = require("../../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  UiViewBase_1 = require("../../../Ui/Base/UiViewBase"),
  PopupCaptionItem_1 = require("../../../Ui/Common/PopupCaptionItem"),
  UiManager_1 = require("../../../Ui/UiManager"),
  ButtonItem_1 = require("../../Common/Button/ButtonItem"),
  HelpController_1 = require("../../Help/HelpController"),
  PayShopDefine_1 = require("../../PayShop/PayShopDefine"),
  UiSceneManager_1 = require("../../UiComponent/UiSceneManager"),
  LguiUtil_1 = require("../../Util/LguiUtil"),
  GenericScrollViewNew_1 = require("../../Util/ScrollView/GenericScrollViewNew"),
  LordGymController_1 = require("../LordGymController"),
  LordGymLordEntranceItem_1 = require("./LordGymLordEntranceItem");
class LordGymLordEntranceSelectView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments),
      (this.lqe = void 0),
      (this.sql = void 0),
      (this.Wxl = 0),
      (this.Qxl = 0),
      (this.Kxl = void 0),
      (this.p9t = void 0),
      (this.AMo = () => {
        this.CloseMe();
      }),
      (this.dpt = () => {
        var e = LordGymEntranceSetById_1.configLordGymEntranceSetById.GetConfig(
          this.Wxl,
        ).HelpId;
        HelpController_1.HelpController.OpenHelpById(e);
      }),
      (this.$xl = () => {
        var e = new LordGymLordEntranceItem_1.LordGymLordEntranceItem();
        return (
          (e.OnToggleClick = this.Xxl),
          (e.CanExecuteChangeCallBack = this.Yxl),
          e
        );
      }),
      (this.Xxl = (e) => {
        this.Yxl(e) && this.SelectLordEntranceByIndex(e);
      }),
      (this.Yxl = (e) =>
        e !== this.sql.GetGenericLayout().GetSelectedGridIndex()),
      (this.zxl = () => {
        ControllerHolder_1.ControllerHolder.PayShopController.OpenPayShopViewWithTab(
          5,
          PayShopDefine_1.NEW_LORD_GYM_TAB_INDEX,
        );
      }),
      (this.xco = () => {
        var e = { LordEntranceSetId: this.Wxl, LordEntranceId: this.Qxl };
        UiManager_1.UiManager.OpenView("LordGymDifficultySelectView", e);
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UIScrollViewWithScrollbarComponent],
      [2, UE.UIItem],
      [3, UE.UIButtonComponent],
      [4, UE.UIText],
      [5, UE.UIButtonComponent],
    ]),
      (this.BtnBindInfo = [[3, this.zxl]]);
  }
  async OnBeforeStartAsync() {
    await LordGymController_1.LordGymController.LordGymInfoRequest();
    var e = this.OpenParam;
    if (e) {
      this.Wxl = e;
      e = LordGymEntranceSetById_1.configLordGymEntranceSetById.GetConfig(
        this.Wxl,
      );
      if (e) {
        (this.Kxl = e.LordEntranceList),
          (this.sql = new GenericScrollViewNew_1.GenericScrollViewNew(
            this.GetScrollViewWithScrollbar(1),
            this.$xl,
            this.GetItem(2).GetOwner(),
          )),
          (this.lqe = new PopupCaptionItem_1.PopupCaptionItem()),
          (this.p9t = new ButtonItem_1.ButtonItem()),
          await Promise.all([
            this.sql?.RefreshByDataAsync(this.Kxl),
            this.lqe.CreateThenShowByActorAsync(this.GetItem(0).GetOwner()),
            this.p9t.CreateThenShowByActorAsync(
              this.GetButton(5).RootUIComp.GetOwner(),
            ),
          ]),
          this.p9t.SetFunction(this.xco),
          this.p9t.SetLocalTextNew("NewChallenge_Start"),
          this.lqe.SetCloseCallBack(this.AMo),
          this.lqe.SetTitleByTextIdAndArgNew(e.Title),
          this.lqe.SetHelpCallBack(this.dpt),
          this.SelectLordEntranceByIndex(0),
          this.RefreshLordGymCurrency();
        var t = ModelManager_1.ModelManager.LordGymModel;
        for (const r of this.Kxl) t.RecordNewLordGymEntrance(r);
      }
    }
  }
  OnHandleLoadScene() {
    ControllerHolder_1.ControllerHolder.LordGymController.CreateLordModelByEntranceId(
      this.Qxl,
    );
  }
  OnHandleReleaseScene() {
    UiSceneManager_1.UiSceneManager.DestroyLordSkeletalHandle();
  }
  SelectLordEntranceByIndex(e) {
    this.sql?.GetGenericLayout()?.SelectGridProxy(e),
      (this.Qxl = this.Kxl[e]),
      this.rPl();
  }
  rPl() {
    ControllerHolder_1.ControllerHolder.LordGymController.LoadLordModelByEntranceId(
      this.Qxl,
    );
  }
  RefreshLordGymCurrency() {
    var e =
      ModelManager_1.ModelManager.LordGymModel.GetLordGymCurrencyRewardAndTotalCount(
        this.Wxl,
      );
    LguiUtil_1.LguiUtil.SetLocalTextNew(
      this.GetText(4),
      "Text_GymShopNew_Text",
      e[0],
      e[1],
    );
  }
}
exports.LordGymLordEntranceSelectView = LordGymLordEntranceSelectView;
//# sourceMappingURL=LordGymLordEntranceSelectView.js.map
