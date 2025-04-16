"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RogueResTrialView =
    exports.RogueResTrialTabItem =
    exports.RogueResTrialRoleItem =
      void 0);
const UE = require("ue"),
  ConfigManager_1 = require("../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  UiViewBase_1 = require("../../../Ui/Base/UiViewBase"),
  LoopScrollMediumItemGrid_1 = require("../../Common/MediumItemGrid/LoopScrollMediumItemGrid"),
  HelpController_1 = require("../../Help/HelpController"),
  GridProxyAbstract_1 = require("../../Util/Grid/GridProxyAbstract"),
  GenericLayout_1 = require("../../Util/Layout/GenericLayout"),
  LguiUtil_1 = require("../../Util/LguiUtil"),
  GenericScrollViewNew_1 = require("../../Util/ScrollView/GenericScrollViewNew"),
  tabColor = new Map([
    [1, "#ab9664"],
    [0, "#323232"],
  ]),
  txtColor = new Map([
    [1, "#FFFFFF"],
    [0, "#f4f0e5"],
  ]),
  tabText = new Map([
    [1, "Rogue_Trial_Role_Limit"],
    [0, "Rogue_Trial_Role_Resident"],
  ]);
class RogueResTrialRoleItem extends LoopScrollMediumItemGrid_1.LoopScrollMediumItemGrid {
  OnRefresh(e, t, i) {
    var r = ConfigManager_1.ConfigManager.RoleConfig?.GetRoleConfig(e),
      e = {
        Type: 2,
        ItemConfigId: e,
        SkinId: r.SkinId,
        BottomTextId: r.Name,
        ElementId: r.ElementId,
        Data: r,
      };
    this.Apply(e);
  }
}
exports.RogueResTrialRoleItem = RogueResTrialRoleItem;
class RogueResTrialTabItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments),
      (this.SeasonId = 0),
      (this.eGe = void 0),
      (this.HB_ = () => new RogueResTrialRoleItem());
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UIText],
      [2, UE.UIGridLayout],
      [3, UE.UIItem],
      [4, UE.UISprite],
      [5, UE.UIText],
      [6, UE.UIItem],
    ];
  }
  OnStart() {
    this.eGe = new GenericLayout_1.GenericLayout(
      this.GetGridLayout(2),
      this.HB_,
    );
  }
  Refresh(e, t, i) {
    var r =
      ModelManager_1.ModelManager.ActivityPermanentRogueModel.GetTrailRole(
        this.SeasonId,
        e,
      );
    const o = ModelManager_1.ModelManager.PlayerInfoModel.GetPlayerGender();
    var r = r.filter((e) => {
        e = ConfigManager_1.ConfigManager.RoleConfig.GetBaseRoleId(e);
        return (
          !ModelManager_1.ModelManager.RoleModel.IsMainRole(e) ||
          ConfigManager_1.ConfigManager.RoleConfig.GetMainRoleById(e).Gender ===
            o
        );
      }),
      r = (this.eGe?.RefreshByData(r), UE.Color.FromHex(tabColor.get(e))),
      r = (this.GetSprite(4)?.SetColor(r), UE.Color.FromHex(txtColor.get(e)));
    this.GetText(1).SetColor(r),
      1 === e
        ? (this.GetItem(6)?.SetUIActive(!0),
          this.GetText(5).SetColor(r),
          this.GetText(5)?.SetUIActive(!0),
          (r =
            ModelManager_1.ModelManager.ActivityPermanentRogueModel.GetTrailRemainTime(
              this.SeasonId,
            )),
          this.GetText(5)?.SetText(r))
        : (this.GetItem(6)?.SetUIActive(!1), this.GetText(5)?.SetUIActive(!1)),
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(1), tabText.get(e));
  }
}
exports.RogueResTrialTabItem = RogueResTrialTabItem;
const BTN_HELPID = 261;
class RogueResTrialView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments),
      (this.Fu1 = 0),
      (this.xqe = void 0),
      (this._yn = () => {
        var e = new RogueResTrialTabItem();
        return (e.SeasonId = this.Fu1), e;
      }),
      (this.YP = () => {
        HelpController_1.HelpController.OpenHelpById(BTN_HELPID);
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIButtonComponent],
      [1, UE.UIScrollViewWithScrollbarComponent],
      [2, UE.UIItem],
    ]),
      (this.BtnBindInfo = [[0, this.YP]]);
  }
  OnStart() {
    (this.Fu1 = this.OpenParam),
      (this.xqe = new GenericScrollViewNew_1.GenericScrollViewNew(
        this.GetScrollViewWithScrollbar(1),
        this._yn,
      ));
  }
  OnBeforeShow() {
    this.RefreshTab();
  }
  OnBeforeDestroy() {
    this.xqe = void 0;
  }
  RefreshTab() {
    this.xqe?.RefreshByData([1, 0]);
  }
}
exports.RogueResTrialView = RogueResTrialView;
//# sourceMappingURL=RogueResTrialPopView.js.map
