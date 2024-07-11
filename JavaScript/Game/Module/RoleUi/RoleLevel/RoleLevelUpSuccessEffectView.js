"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RoleLevelUpSuccessEffectView = void 0);
const UE = require("ue"),
  Log_1 = require("../../../../Core/Common/Log"),
  ConfigManager_1 = require("../../../Manager/ConfigManager"),
  UiViewBase_1 = require("../../../Ui/Base/UiViewBase"),
  GridProxyAbstract_1 = require("../../Util/Grid/GridProxyAbstract"),
  LguiUtil_1 = require("../../Util/LguiUtil"),
  LoopScrollView_1 = require("../../Util/ScrollView/LoopScrollView");
class RoleLevelUpSuccessEffectView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments),
      (this.Pe = void 0),
      (this.Xuo = void 0),
      (this.nqe = () => {
        var e = this.Pe.ClickFunction;
        e && e(), this.CloseMe();
      }),
      (this.$uo = () => {
        return new SuccessDescriptionItem();
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UILoopScrollViewComponent],
      [1, UE.UIItem],
      [2, UE.UIText],
      [3, UE.UIText],
      [4, UE.UIButtonComponent],
      [5, UE.UIButtonComponent],
    ]),
      (this.BtnBindInfo = [
        [4, this.nqe],
        [5, this.nqe],
      ]);
  }
  OnBeforeCreate() {
    void 0 === this.OpenParam
      ? Log_1.Log.CheckError() &&
        Log_1.Log.Error(
          "Role",
          38,
          "RoleLevelUpSuccessEffectView 打开失败,未传入界面数据",
        )
      : ((this.Pe = this.OpenParam), this.Dbt());
  }
  OnStart() {
    var e = this.GetItem(1);
    this.Xuo = new LoopScrollView_1.LoopScrollView(
      this.GetLoopScrollViewComponent(0),
      e.GetOwner(),
      this.$uo,
    );
  }
  OnBeforeShow() {
    this.RDt(), this.Yuo(), this.uuo();
  }
  OnBeforeDestroy() {
    this.Xuo && (this.Xuo.ClearGridProxies(), (this.Xuo = void 0));
  }
  Dbt() {
    var e = this.Pe.AudioId;
    e &&
      ((e = ConfigManager_1.ConfigManager.AudioConfig.GetAudioPath(e).Path),
      this.SetAudioEvent(e));
  }
  uuo() {
    var e = this.Pe.ClickText ?? "Text_BackToView_Text";
    this.GetText(3).ShowTextNew(e);
  }
  RDt() {
    var e = this.Pe.Title ?? "Text_ActivedSucceed_Text";
    this.GetText(2).ShowTextNew(e);
  }
  Yuo() {
    var e;
    this.Xuo &&
      (void 0 !== (e = this.Pe.TextList)
        ? this.Xuo.ReloadData(e)
        : this.GetLoopScrollViewComponent(0).RootUIComp.SetUIActive(!1));
  }
}
exports.RoleLevelUpSuccessEffectView = RoleLevelUpSuccessEffectView;
class SuccessDescriptionItem extends GridProxyAbstract_1.GridProxyAbstract {
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText]];
  }
  SetDescriptionText(e) {
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(0), e.TextId, ...e.Params);
  }
  Refresh(e, i, t) {
    this.SetDescriptionText(e);
  }
}
//# sourceMappingURL=RoleLevelUpSuccessEffectView.js.map
