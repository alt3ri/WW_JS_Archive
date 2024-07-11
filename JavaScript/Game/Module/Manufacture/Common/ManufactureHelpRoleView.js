"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ManufactureHelpRoleView = void 0);
const UE = require("ue");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiViewBase_1 = require("../../../Ui/Base/UiViewBase");
const UiManager_1 = require("../../../Ui/UiManager");
const SmallItemGrid_1 = require("../../Common/SmallItemGrid/SmallItemGrid");
const GridProxyAbstract_1 = require("../../Util/Grid/GridProxyAbstract");
const LguiUtil_1 = require("../../Util/LguiUtil");
const LoopScrollView_1 = require("../../Util/ScrollView/LoopScrollView");
const CommonManager_1 = require("./CommonManager");
class ManufactureHelpRoleView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments),
      (this.sGt = void 0),
      (this.aGt = void 0),
      (this.gIt = 0),
      (this.Gyi = 0),
      (this.z9e = () => {
        const e = new HelpRoleItem();
        return e.BindOnClickedCallback(this.lGt), e;
      }),
      (this.xyi = () => {
        (this.aGt = CommonManager_1.CommonManager.GetHelpRoleItemDataList(
          this.gIt,
        )),
          this.sGt.ReloadData(this.aGt),
          this.wyi();
      }),
      (this.lGt = (e) => {
        this.Gyi = e;
        let t = 0;
        for (
          this.sGt.DeselectCurrentGridProxy();
          t < this.aGt.length && e !== this.aGt[t].RoleId;
          t++
        );
        this.sGt.IsGridDisplaying(t) &&
          (this.sGt.SelectGridProxy(t), this.sGt.RefreshGridProxy(t));
      }),
      (this.dIt = () => {
        CommonManager_1.CommonManager.SetCurrentRoleId(this.Gyi),
          UiManager_1.UiManager.CloseView("ManufactureHelpRoleView"),
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
      (this.BtnBindInfo = [[2, this.dIt]]);
  }
  OnBeforeDestroy() {
    this.sGt && (this.sGt.ClearGridProxies(), (this.sGt = void 0));
  }
  OnStart() {
    (this.sGt = new LoopScrollView_1.LoopScrollView(
      this.GetLoopScrollViewComponent(0),
      this.GetItem(1).GetOwner(),
      this.z9e,
    )),
      LguiUtil_1.LguiUtil.SetLocalText(
        this.GetText(3),
        "ComposeSelectRoleButtonText",
      ),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.SwitchViewType,
        0,
      ),
      (this.gIt = this.OpenParam),
      (this.Gyi = CommonManager_1.CommonManager.GetCurrentRoleId()),
      this.xyi();
  }
  OnBeforeShow() {
    this.ChildPopView?.PopItem?.SetTexBgVisible(!1);
  }
  wyi() {
    let e = 0;
    for (
      this.sGt.DeselectCurrentGridProxy();
      e < this.aGt.length && this.Gyi !== this.aGt[e].RoleId;
      e++
    );
    this.sGt.ScrollToGridIndex(e), this.sGt.SelectGridProxy(e);
  }
}
exports.ManufactureHelpRoleView = ManufactureHelpRoleView;
class HelpRoleItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments),
      (this.dqt = void 0),
      (this.Xgt = void 0),
      (this.Wgt = void 0),
      (this.Kyt = (e) => {
        this.Wgt && this.Wgt(this.dqt.RoleId);
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIExtendToggle],
      [1, UE.UIText],
      [2, UE.UIText],
      [3, UE.UIItem],
    ]),
      (this.BtnBindInfo = [[0, this.Kyt]]);
  }
  OnStart() {
    (this.Xgt = new SmallItemGrid_1.SmallItemGrid()),
      this.Xgt.Initialize(this.GetItem(3).GetOwner());
  }
  Refresh(e, t, i) {
    e = {
      Type: 2,
      Data: (this.dqt = e),
      ItemConfigId: e.RoleId,
      IsCookUp: e.IsBuff,
      IsReceivedVisible:
        ModelManager_1.ModelManager.CookModel.CurrentCookRoleId === e.RoleId,
    };
    this.Xgt.Apply(e),
      this.Ije(),
      this.iGt(),
      this.IVe(t, !1),
      this.GetText(2).OnSelfLanguageChange.Bind(() => {
        this.iGt();
      });
  }
  Clear() {
    this.GetText(2).OnSelfLanguageChange.Unbind();
  }
  OnBeforeDestroy() {
    this.Xgt = void 0;
  }
  Ije() {
    this.GetText(1).SetText(this.dqt.RoleName);
  }
  iGt() {
    let e;
    CommonManager_1.CommonManager.CheckIsBuff(this.dqt.RoleId, this.dqt.ItemId)
      ? ((e = CommonManager_1.CommonManager.GetInfoText(this.dqt.RoleId)),
        this.GetText(2).SetText(e))
      : ((e = ConfigManager_1.ConfigManager.TextConfig.GetTextById(
          CommonManager_1.CommonManager.GetDefaultRoleText(),
        )),
        this.GetText(2).SetText(e));
  }
  BindOnClickedCallback(e) {
    this.Wgt = e;
  }
  OnSelected(e) {
    this.IVe(!0);
  }
  OnDeselected(e) {
    this.IVe(!1);
  }
  IVe(e, t = !0) {
    const i = this.GetExtendToggle(0);
    e ? i.SetToggleState(1, t) : i.SetToggleState(0, !1);
  }
}
// # sourceMappingURL=ManufactureHelpRoleView.js.map
