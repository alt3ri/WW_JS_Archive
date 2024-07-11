"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.HelpRoleView = void 0);
const UE = require("ue"),
  EventDefine_1 = require("../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../Common/Event/EventSystem"),
  ConfigManager_1 = require("../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  SmallItemGrid_1 = require("../../Common/SmallItemGrid/SmallItemGrid"),
  UiNavigationView_1 = require("../../UiNavigation/UiNavigationView"),
  GridProxyAbstract_1 = require("../../Util/Grid/GridProxyAbstract"),
  LoopScrollView_1 = require("../../Util/ScrollView/LoopScrollView"),
  CommonManager_1 = require("./CommonManager");
class HelpRoleView extends UiNavigationView_1.UiNavigationView {
  constructor() {
    super(...arguments),
      (this.hNt = void 0),
      (this.lNt = void 0),
      (this.ETt = 0),
      (this._Nt = 0),
      (this.cHe = () => {
        var e = new HelpRoleItem();
        return e.BindOnClickedCallback(this.Tke), e;
      }),
      (this.xIi = () => {
        (this.lNt = CommonManager_1.CommonManager.GetHelpRoleItemDataList(
          this.ETt,
        )),
          this.hNt.ReloadData(this.lNt),
          this.wIi();
      }),
      (this.Tke = (e) => {
        this._Nt = e;
        let t = 0;
        for (
          this.hNt.DeselectCurrentGridProxy();
          t < this.lNt.length && e !== this.lNt[t].RoleId;
          t++
        );
        this.hNt.IsGridDisplaying(t) &&
          (this.hNt.SelectGridProxy(t), this.hNt.RefreshGridProxy(t));
      }),
      (this.Mke = () => {
        CommonManager_1.CommonManager.SetCurrentRoleId(this._Nt),
          EventSystem_1.EventSystem.Emit(
            EventDefine_1.EEventName.CloseHelpRole,
          );
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UILoopScrollViewComponent],
      [1, UE.UIItem],
      [2, UE.UIButtonComponent],
      [3, UE.UIText],
    ]),
      (this.BtnBindInfo = [[2, this.Mke]]);
  }
  OnBeforeDestroy() {
    this.hNt && (this.hNt.ClearGridProxies(), (this.hNt = void 0));
  }
  OnStart() {
    this.hNt = new LoopScrollView_1.LoopScrollView(
      this.GetLoopScrollViewComponent(0),
      this.GetItem(1).GetOwner(),
      this.cHe,
    );
  }
  HideView(e) {
    this.SetActive(!e);
  }
  ShowView(e) {
    this.SetActive(!0),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.SwitchViewType,
        0,
      ),
      (this.ETt = e),
      (this._Nt = CommonManager_1.CommonManager.GetCurrentRoleId()),
      this.xIi();
  }
  wIi() {
    let e = 0;
    for (
      this.hNt.DeselectCurrentGridProxy();
      e < this.lNt.length && this._Nt !== this.lNt[e].RoleId;
      e++
    );
    this.hNt.ScrollToGridIndex(e), this.hNt.SelectGridProxy(e);
  }
}
exports.HelpRoleView = HelpRoleView;
class HelpRoleItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments),
      (this.fGt = void 0),
      (this.sft = void 0),
      (this.oft = void 0),
      (this.eTt = (e) => {
        this.oft && this.oft(this.fGt.RoleId);
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIExtendToggle],
      [1, UE.UIText],
      [2, UE.UIText],
      [3, UE.UIItem],
    ]),
      (this.BtnBindInfo = [[0, this.eTt]]);
  }
  OnStart() {
    (this.sft = new SmallItemGrid_1.SmallItemGrid()),
      this.sft.Initialize(this.GetItem(3).GetOwner());
  }
  Refresh(e, t, i) {
    e = {
      Type: 2,
      Data: (this.fGt = e),
      ItemConfigId: e.RoleId,
      BottomText: e.RoleName,
      IsCookUp: e.IsBuff,
      IsReceivedVisible:
        ModelManager_1.ModelManager.CookModel.CurrentCookRoleId === e.RoleId,
    };
    this.sft.Apply(e),
      this.qWe(),
      this.rNt(),
      this.N6e(t, !1),
      this.GetText(2).OnSelfLanguageChange.Bind(() => {
        this.rNt();
      });
  }
  Clear() {
    this.GetText(2).OnSelfLanguageChange.Unbind();
  }
  OnBeforeDestroy() {
    this.sft.Destroy(), (this.sft = void 0);
  }
  qWe() {
    this.GetText(1).SetText(this.fGt.RoleName);
  }
  rNt() {
    var e;
    CommonManager_1.CommonManager.CheckIsBuff(this.fGt.RoleId, this.fGt.ItemId)
      ? ((e = CommonManager_1.CommonManager.GetInfoText(this.fGt.RoleId)),
        this.GetText(2).SetText(e))
      : ((e = ConfigManager_1.ConfigManager.TextConfig.GetTextById(
          CommonManager_1.CommonManager.GetDefaultRoleText(),
        )),
        this.GetText(2).SetText(e));
  }
  BindOnClickedCallback(e) {
    this.oft = e;
  }
  OnSelected(e) {
    this.N6e(!0);
  }
  OnDeselected(e) {
    this.N6e(!1);
  }
  N6e(e, t = !0) {
    var i = this.GetExtendToggle(0);
    e ? i.SetToggleState(1, t) : i.SetToggleState(0, !1);
  }
}
//# sourceMappingURL=HelpRoleView.js.map
