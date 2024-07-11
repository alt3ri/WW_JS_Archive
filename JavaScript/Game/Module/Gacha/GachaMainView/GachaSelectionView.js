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
      (this.JHt = void 0),
      (this.zHt = void 0),
      (this.ZHt = void 0),
      (this.ejt = void 0),
      (this.tjt = () => {
        GachaController_1.GachaController.GachaUsePoolRequest(
          this.JHt.Id,
          this.ijt,
        ),
          UiManager_1.UiManager.CloseView("GachaSelectionView");
      }),
      (this.ojt = (e) => {
        (this.JHt = e), this.rjt();
      }),
      (this.njt = () => {
        var e = new GachaSelectionItem_1.GachaSelectionItem();
        return (e.ToggleCallBack = this.sjt), (e.CanToggleChange = this.Eft), e;
      }),
      (this.sjt = (e) => {
        this.zHt?.GetGenericLayout()?.SelectGridProxy(e), this.ajt();
      }),
      (this.Eft = (e) => {
        return e !== this.zHt?.GetGenericLayout()?.GetSelectedGridIndex();
      });
  }
  get ijt() {
    var e = this.zHt.GetGenericLayout().GetSelectedGridIndex();
    return !this.ZHt || e < 0 || e >= this.ZHt.length
      ? 0
      : this.ZHt[e].PoolInfo.Id;
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
      (this.BtnBindInfo = [[5, this.tjt]]);
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.GachaSelectionViewRefresh,
      this.ojt,
    );
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.GachaSelectionViewRefresh,
      this.ojt,
    );
  }
  async OnBeforeStartAsync() {
    (this.zHt = new GenericScrollViewNew_1.GenericScrollViewNew(
      this.GetScrollViewWithScrollbar(2),
      this.njt,
    )),
      (this.ejt = new SmallItemGrid_1.SmallItemGrid()),
      await this.ejt.CreateThenShowByActorAsync(this.GetItem(3).GetOwner()),
      (this.JHt = this.OpenParam.GachaInfo),
      this.rjt();
  }
  _jt() {
    if (this.JHt) {
      var i = this.JHt.GetValidPoolList();
      if (i) {
        var t = new Array(i.length);
        for (let e = 0; e < i.length; e++) {
          var s = new GachaDefine_1.GachaPoolData(this.JHt, i[e]);
          t[e] = s;
        }
        return t;
      }
    }
  }
  ljt() {
    var e = this.JHt.GetValidPoolList();
    return !(!e || !this.ZHt) && e.length === this.ZHt.length;
  }
  rjt() {
    if (
      this.zHt &&
      ((this.ZHt = this._jt()), this.ZHt) &&
      0 !== this.ZHt.length
    ) {
      const t = this.ijt;
      this.zHt.RefreshByData(this.ZHt, () => {
        if (this.ljt()) {
          const i = 0 < t ? t : this.JHt.UsePoolId;
          let e = 0;
          0 < i &&
            (e = this.ZHt.findIndex((e) => e.PoolInfo.Id === i)) < 0 &&
            (e = 0),
            this.zHt.GetGenericLayout().SelectGridProxy(e),
            this.ajt();
        } else this.rjt();
      });
    }
  }
  ajt() {
    var e = this.zHt.GetGenericLayout().GetSelectedGridIndex(),
      e = this.ZHt[e].PoolInfo.Id,
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
            this.ejt.Apply({ Data: void 0, Type: 2, ItemConfigId: t }))
          : ((s =
              ConfigManager_1.ConfigManager.InventoryConfig.GetWeaponItemConfig(
                t,
              )),
            LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(4), s.WeaponName),
            this.ejt.Apply({ Data: void 0, Type: 4, ItemConfigId: t })),
        this.JHt.UsePoolId),
      s = i === e,
      t = s ? "Text_GachaOptionalText1_Text" : "Text_GachaOptionalText2_Text";
    this.GetButton(5)?.SetSelfInteractive(!s),
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(6), t);
  }
}
exports.GachaSelectionView = GachaSelectionView;
//# sourceMappingURL=GachaSelectionView.js.map
