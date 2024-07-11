"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ActivityRecallTabItemPanel = void 0);
const UE = require("ue"),
  Log_1 = require("../../../../../../Core/Common/Log"),
  CommonTabItemBase_1 = require("../../../../Common/TabComponent/TabItem/CommonTabItemBase"),
  LguiUtil_1 = require("../../../../Util/LguiUtil");
class ActivityRecallTabItemPanel extends CommonTabItemBase_1.CommonTabItemBase {
  constructor() {
    super(...arguments),
      (this.Bke = (t) => {
        1 === t && this.SelectedCallBack(this.GridIndex);
      }),
      (this.RefreshTransition = () => {
        var t = this.GetUiExtendToggleSpriteTransition(3);
        t && t.SetAllStateSprite(this.GetSprite(0).GetSprite());
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UISprite],
      [1, UE.UIExtendToggle],
      [2, UE.UIItem],
      [3, UE.UIExtendToggleSpriteTransition],
      [4, UE.UIItem],
      [5, UE.UIText],
    ]),
      (this.BtnBindInfo = [[1, this.Bke]]);
  }
  OnStart() {
    super.OnStart(),
      this.GetExtendToggle(1).SetToggleState(0),
      this.GetItem(2).SetUIActive(!1),
      this.GetSprite(0).SetUIActive(!0);
  }
  OnRefresh(t, e, i) {
    t.Data &&
      (this.UpdateTabIcon(t.Data.GetIcon() ?? ""),
      this.UpdateTitle(t.Data.GetTitleData()?.TextId ?? ""));
  }
  OnSelected(t) {
    this.SelectedCallBack(this.GridIndex);
  }
  OnUpdateTabIcon(t) {
    "" === t
      ? Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug(
          "ActivityRecall",
          64,
          "[回流活动]ActivityRecallTabItemPanel->OnUpdateTabIcon 刷新标签图标,传入路径为空",
          ["iconPath: ", t],
        )
      : this.SetSpriteByPath(
          t,
          this.GetSprite(0),
          !1,
          void 0,
          this.RefreshTransition,
        );
  }
  UpdateTitle(t) {
    var e = this.GetText(5);
    LguiUtil_1.LguiUtil.SetLocalTextNew(e, t);
  }
  OnSetToggleState(t, e) {
    this.GetExtendToggle(1).SetToggleState(t, e);
  }
  GetTabToggle() {
    return this.GetExtendToggle(1);
  }
}
exports.ActivityRecallTabItemPanel = ActivityRecallTabItemPanel;
//# sourceMappingURL=ActivityRecallTabItemPanel.js.map
