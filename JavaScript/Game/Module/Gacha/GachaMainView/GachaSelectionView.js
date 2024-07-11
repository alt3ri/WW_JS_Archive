"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.GachaSelectionView = void 0);
const UE = require("ue");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiViewBase_1 = require("../../../Ui/Base/UiViewBase");
const UiManager_1 = require("../../../Ui/UiManager");
const SmallItemGrid_1 = require("../../Common/SmallItemGrid/SmallItemGrid");
const LguiUtil_1 = require("../../Util/LguiUtil");
const GenericScrollViewNew_1 = require("../../Util/ScrollView/GenericScrollViewNew");
const GachaController_1 = require("../GachaController");
const GachaDefine_1 = require("../GachaDefine");
const GachaSelectionItem_1 = require("./GachaSelectionItem");
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
        const e = new GachaSelectionItem_1.GachaSelectionItem();
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
    const e = this.zHt.GetGenericLayout().GetSelectedGridIndex();
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
      const i = this.JHt.GetValidPoolList();
      if (i) {
        const t = new Array(i.length);
        for (let e = 0; e < i.length; e++) {
          const s = new GachaDefine_1.GachaPoolData(this.JHt, i[e]);
          t[e] = s;
        }
        return t;
      }
    }
  }
  ljt() {
    const e = this.JHt.GetValidPoolList();
    return !(!e || !this.ZHt) && e.length === this.ZHt.length;
  }
  rjt() {
    if (
      this.zHt &&
      ((this.ZHt = this._jt()), this.ZHt) &&
      this.ZHt.length !== 0
    ) {
      const t = this.ijt;
      this.zHt.RefreshByData(this.ZHt, () => {
        if (this.ljt()) {
          const i = t > 0 ? t : this.JHt.UsePoolId;
          let e = 0;
          i > 0 &&
            (e = this.ZHt.findIndex((e) => e.PoolInfo.Id === i)) < 0 &&
            (e = 0),
            this.zHt.GetGenericLayout().SelectGridProxy(e),
            this.ajt();
        } else this.rjt();
      });
    }
  }
  ajt() {
    var e = this.zHt.GetGenericLayout().GetSelectedGridIndex();
    var e = this.ZHt[e].PoolInfo.Id;
    var i = ConfigManager_1.ConfigManager.GachaConfig.GetGachaViewInfo(e);
    var t = i.ShowIdList[0];
    var i = i.Type;
    var s = ConfigManager_1.ConfigManager.GachaConfig.GetGachaViewTypeConfig(i);
    var s =
      (LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(0), s.OptionalTitle),
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(1), s.OptionalDesc),
      ModelManager_1.ModelManager.GachaModel.IsRolePool(i));
    var i =
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
      this.JHt.UsePoolId);
    var s = i === e;
    var t = s ? "Text_GachaOptionalText1_Text" : "Text_GachaOptionalText2_Text";
    this.GetButton(5)?.SetSelfInteractive(!s),
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(6), t);
  }
}
exports.GachaSelectionView = GachaSelectionView;
// # sourceMappingURL=GachaSelectionView.js.map
