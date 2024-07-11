"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.GachaSelectionView = void 0);
const UE = require("ue"),
  EventDefine_1 = require("../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../Common/Event/EventSystem"),
  ConfigManager_1 = require("../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  UiViewBase_1 = require("../../../Ui/Base/UiViewBase"),
  UiManager_1 = require("../../../Ui/UiManager"),
  SmallItemGrid_1 = require("../../Common/SmallItemGrid/SmallItemGrid"),
  LguiUtil_1 = require("../../Util/LguiUtil"),
  GenericScrollViewNew_1 = require("../../Util/ScrollView/GenericScrollViewNew"),
  GachaController_1 = require("../GachaController"),
  GachaDefine_1 = require("../GachaDefine"),
  GachaSelectionItem_1 = require("./GachaSelectionItem");
class GachaSelectionView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments),
      (this.Jjt = void 0),
      (this.zjt = void 0),
      (this.Zjt = void 0),
      (this.eWt = void 0),
      (this.tWt = () => {
        GachaController_1.GachaController.GachaUsePoolRequest(
          this.Jjt.Id,
          this.iWt,
        ),
          UiManager_1.UiManager.CloseView("GachaSelectionView");
      }),
      (this.oWt = (e) => {
        (this.Jjt = e), this.rWt();
      }),
      (this.nWt = () => {
        var e = new GachaSelectionItem_1.GachaSelectionItem();
        return (e.ToggleCallBack = this.sWt), (e.CanToggleChange = this.Bpt), e;
      }),
      (this.sWt = (e) => {
        this.zjt?.GetGenericLayout()?.SelectGridProxy(e), this.aWt();
      }),
      (this.Bpt = (e) => {
        return e !== this.zjt?.GetGenericLayout()?.GetSelectedGridIndex();
      });
  }
  get iWt() {
    var e = this.zjt.GetGenericLayout().GetSelectedGridIndex();
    return !this.Zjt || e < 0 || e >= this.Zjt.length
      ? 0
      : this.Zjt[e].PoolInfo.Id;
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIText],
      [1, UE.UIText],
      [2, UE.UIScrollViewWithScrollbarComponent],
      [3, UE.UIItem],
      [4, UE.UIText],
      [5, UE.UIButtonComponent],
      [6, UE.UIText],
    ]),
      (this.BtnBindInfo = [[5, this.tWt]]);
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.GachaSelectionViewRefresh,
      this.oWt,
    );
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.GachaSelectionViewRefresh,
      this.oWt,
    );
  }
  async OnBeforeStartAsync() {
    (this.zjt = new GenericScrollViewNew_1.GenericScrollViewNew(
      this.GetScrollViewWithScrollbar(2),
      this.nWt,
    )),
      (this.eWt = new SmallItemGrid_1.SmallItemGrid()),
      await this.eWt.CreateThenShowByActorAsync(this.GetItem(3).GetOwner()),
      (this.Jjt = this.OpenParam.GachaInfo),
      this.rWt();
  }
  _Wt() {
    if (this.Jjt) {
      var i = this.Jjt.GetValidPoolList();
      if (i) {
        var t = new Array(i.length);
        for (let e = 0; e < i.length; e++) {
          var s = new GachaDefine_1.GachaPoolData(this.Jjt, i[e]);
          t[e] = s;
        }
        return t;
      }
    }
  }
  lWt() {
    var e = this.Jjt.GetValidPoolList();
    return !(!e || !this.Zjt) && e.length === this.Zjt.length;
  }
  rWt() {
    if (
      this.zjt &&
      ((this.Zjt = this._Wt()), this.Zjt) &&
      0 !== this.Zjt.length
    ) {
      const t = this.iWt;
      this.zjt.RefreshByData(this.Zjt, () => {
        if (this.lWt()) {
          const i = 0 < t ? t : this.Jjt.UsePoolId;
          let e = 0;
          0 < i &&
            (e = this.Zjt.findIndex((e) => e.PoolInfo.Id === i)) < 0 &&
            (e = 0),
            this.zjt.GetGenericLayout().SelectGridProxy(e),
            this.aWt();
        } else this.rWt();
      });
    }
  }
  aWt() {
    var e = this.zjt.GetGenericLayout().GetSelectedGridIndex(),
      e = this.Zjt[e].PoolInfo.Id,
      i = ConfigManager_1.ConfigManager.GachaConfig.GetGachaViewInfo(e),
      t = i.ShowIdList[0],
      i = i.Type,
      s = ConfigManager_1.ConfigManager.GachaConfig.GetGachaViewTypeConfig(i),
      s =
        (LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(0), s.OptionalTitle),
        LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(1), s.OptionalDesc),
        ModelManager_1.ModelManager.GachaModel.IsRolePool(i)),
      i =
        (s
          ? ((i = ConfigManager_1.ConfigManager.GachaConfig.GetRoleInfoById(t)),
            LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(4), i.Name),
            this.eWt.Apply({ Data: void 0, Type: 2, ItemConfigId: t }))
          : ((s =
              ConfigManager_1.ConfigManager.InventoryConfig.GetWeaponItemConfig(
                t,
              )),
            LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(4), s.WeaponName),
            this.eWt.Apply({ Data: void 0, Type: 4, ItemConfigId: t })),
        this.Jjt.UsePoolId),
      s = i === e,
      t = s ? "Text_GachaOptionalText1_Text" : "Text_GachaOptionalText2_Text";
    this.GetButton(5)?.SetSelfInteractive(!s),
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(6), t);
  }
}
exports.GachaSelectionView = GachaSelectionView;
//# sourceMappingURL=GachaSelectionView.js.map
