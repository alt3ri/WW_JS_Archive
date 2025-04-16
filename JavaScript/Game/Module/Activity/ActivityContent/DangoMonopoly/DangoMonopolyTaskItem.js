"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.DangoMonopolyTaskItem = void 0);
const UE = require("ue"),
  Log_1 = require("../../../../../Core/Common/Log"),
  Protocol_1 = require("../../../../../Core/Define/Net/Protocol"),
  ControllerHolder_1 = require("../../../../Manager/ControllerHolder"),
  UiManager_1 = require("../../../../Ui/UiManager"),
  SmallItemGrid_1 = require("../../../Common/SmallItemGrid/SmallItemGrid"),
  GridProxyAbstract_1 = require("../../../Util/Grid/GridProxyAbstract"),
  DangoMonopolyDefine_1 = require("./DangoMonopolyDefine");
class DangoMonopolyTaskItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments),
      (this.fGt = void 0),
      (this.ClickCallBack = void 0),
      (this.qsi = void 0),
      (this.Buc = () => {
        ControllerHolder_1.ControllerHolder.ItemController.OpenItemTipsByItemId(
          this.fGt.RewardItemId,
        );
      }),
      (this.j4c = () => {
        this.ClickCallBack?.(this.fGt);
      }),
      (this.IOe = () => {
        UiManager_1.UiManager.CloseView("DangoMonopolyTaskView"),
          this.fGt.JumpSource();
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [1, UE.UIText],
      [2, UE.UIText],
      [0, UE.UIItem],
      [4, UE.UIButtonComponent],
      [3, UE.UIButtonComponent],
      [5, UE.UIText],
      [6, UE.UISprite],
      [7, UE.UIText],
      [8, UE.UIText],
      [9, UE.UIItem],
    ]),
      (this.BtnBindInfo = [
        [4, this.j4c],
        [3, this.IOe],
      ]);
  }
  async OnBeforeStartAsync() {
    await super.OnBeforeStartAsync(),
      (this.qsi = new SmallItemGrid_1.SmallItemGrid()),
      this.qsi.Initialize(this.GetItem(0).GetOwner()),
      this.qsi.BindOnExtendToggleClicked(this.Buc),
      this.qsi.BindOnCanExecuteChange(() => !1),
      this.GetText(7).ShowTextNew(
        DangoMonopolyDefine_1.dangoMonopolyTextKey.GoTo,
      ),
      this.GetText(8).ShowTextNew(
        DangoMonopolyDefine_1.dangoMonopolyTextKey.CanReceive,
      ),
      this.GetText(5).ShowTextNew(
        DangoMonopolyDefine_1.dangoMonopolyTextKey.InProgress,
      );
  }
  OnStart() {
    this.GetText(5).ShowTextNew(
      DangoMonopolyDefine_1.dangoMonopolyTextKey.InProgress,
    );
  }
  Refresh(t) {
    (this.fGt = t),
      Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug("DangoMonopoly", 69, this.constructor.name, [
          "",
          this.fGt,
        ]),
      this.GetText(1).ShowTextNew(this.fGt.TaskDesc),
      this.H4c(),
      this.K2o(),
      this.Usi();
  }
  H4c() {
    var t = this.GetText(2),
      o = 0 < this.fGt.TotalProgress;
    t.SetUIActive(o),
      o &&
        ((o = `(${this.fGt.Progress}/${this.fGt.TotalProgress})`),
        t.SetText(o));
  }
  K2o() {
    var t = this.fGt.RewardItemCount,
      t = {
        Data: this.fGt,
        Type: 4,
        ItemConfigId: this.fGt.RewardItemId,
        BottomText: 0 < t ? "" + t : "",
        IsReceivedVisible:
          this.fGt.TaskState === Protocol_1.Aki.Protocol.DAc.Proto_HasGet,
      };
    this.qsi.Apply(t);
  }
  Usi() {
    var t = this.GetText(5),
      o = this.GetSprite(6),
      e = this.GetButton(4),
      i = this.GetButton(3),
      s = this.GetItem(9),
      r = !!this.fGt.Source;
    switch (
      (o.SetUIActive(!1),
      t.SetUIActive(!1),
      i.RootUIComp.SetUIActive(!1),
      e.RootUIComp.SetUIActive(!1),
      s.SetUIActive(!1),
      this.fGt.TaskState)
    ) {
      case Protocol_1.Aki.Protocol.DAc.Proto_NotCompleted:
        t.SetUIActive(!r), i.RootUIComp.SetUIActive(r);
        break;
      case Protocol_1.Aki.Protocol.DAc.Proto_Completed:
        e.RootUIComp.SetUIActive(!0), s.SetUIActive(!0);
        break;
      case Protocol_1.Aki.Protocol.DAc.Proto_HasGet:
        o.SetUIActive(!0);
    }
  }
}
exports.DangoMonopolyTaskItem = DangoMonopolyTaskItem;
//# sourceMappingURL=DangoMonopolyTaskItem.js.map
