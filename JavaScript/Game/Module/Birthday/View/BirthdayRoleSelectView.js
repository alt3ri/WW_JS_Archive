"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.BirthdayRoleSelectView = void 0);
const UE = require("ue"),
  MultiTextLang_1 = require("../../../../Core/Define/ConfigQuery/MultiTextLang"),
  RoleInfoById_1 = require("../../../../Core/Define/ConfigQuery/RoleInfoById"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  UiViewBase_1 = require("../../../Ui/Base/UiViewBase"),
  UiManager_1 = require("../../../Ui/UiManager"),
  ScrollingTipsController_1 = require("../../ScrollingTips/ScrollingTipsController"),
  LguiUtil_1 = require("../../Util/LguiUtil"),
  LoopScrollView_1 = require("../../Util/ScrollView/LoopScrollView"),
  BirthdayDefine_1 = require("../BirthdayDefine"),
  BirthdayRoleHeadItem_1 = require("./BirthdayRoleHeadItem");
class BirthdayRoleSelectView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments),
      (this.Fp1 = void 0),
      (this.Np1 = void 0),
      (this.Pp1 = 0),
      (this.bS1 = 0),
      (this.Bqe = () => {
        var e = new BirthdayRoleHeadItem_1.BirthdayRoleHeadItem();
        return (e.OnToggleClickCallBack = this.Vp1), e;
      }),
      (this.Vp1 = (e, i) => {
        this.Np1 === i
          ? ((this.Np1 = void 0),
            this.Sfi(),
            this.Fp1.DeselectCurrentGridProxy())
          : ((this.Np1 = i), this.Sfi(), this.Fp1.SelectGridProxy(e));
      }),
      (this.jp1 = () => {
        this.Np1
          ? UiManager_1.UiManager.CloseAndOpenView(
              this.Info.Name,
              "BirthdaySelectConfirmView",
              new BirthdayDefine_1.BirthdayInfo(this.bS1, this.Pp1, this.Np1),
            )
          : ScrollingTipsController_1.ScrollingTipsController.ShowTipsByTextId(
              "BirthdayUnSelectedRole",
            );
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIText],
      [1, UE.UILoopScrollViewComponent],
      [2, UE.UIItem],
      [3, UE.UIButtonComponent],
      [4, UE.UIText],
    ]),
      (this.BtnBindInfo = [[3, this.jp1]]);
  }
  async OnBeforeStartAsync() {
    var e = this.OpenParam,
      e =
        ((this.bS1 = e.TriggerType),
        (this.Pp1 = e.Year),
        (this.Np1 = e.RoleId),
        (this.Fp1 = new LoopScrollView_1.LoopScrollView(
          this.GetLoopScrollViewComponent(1),
          this.GetItem(2).GetOwner(),
          this.Bqe,
        )),
        ModelManager_1.ModelManager.BirthdayModel.GetRoleIdList()),
      e =
        (await this.Fp1.RefreshByDataAsync(e, !1, !0),
        this.Np1 &&
          ((e = e.indexOf(this.Np1)),
          this.Fp1.SelectGridProxy(e),
          this.Fp1.ScrollToGridIndex(e)),
        ModelManager_1.ModelManager.BirthdayModel.GetBirthdayDate(this.Pp1));
    LguiUtil_1.LguiUtil.SetLocalTextNew(
      this.GetText(0),
      "BirthdaySelectedTip",
      this.Pp1,
      e.getMonth() + 1,
      e.getDate(),
    ),
      this.Sfi();
  }
  Sfi() {
    let e = "";
    this.Np1 &&
      (e = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(
        RoleInfoById_1.configRoleInfoById.GetConfig(this.Np1).Name,
      )),
      LguiUtil_1.LguiUtil.SetLocalTextNew(
        this.GetText(4),
        "BirthdaySelected_Invite",
        e,
      );
  }
}
exports.BirthdayRoleSelectView = BirthdayRoleSelectView;
//# sourceMappingURL=BirthdayRoleSelectView.js.map
