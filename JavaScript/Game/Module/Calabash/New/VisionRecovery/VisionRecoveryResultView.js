"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.VisionRecoveryResultView = void 0);
const UE = require("ue"),
  Log_1 = require("../../../../../Core/Common/Log"),
  ControllerHolder_1 = require("../../../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  UiViewBase_1 = require("../../../../Ui/Base/UiViewBase"),
  ItemController_1 = require("../../../Item/ItemController"),
  LguiUtil_1 = require("../../../Util/LguiUtil"),
  VisionRecoverySlotItem_1 = require("./VisionRecoverySlotItem"),
  VisionRecoverySlotPanel_1 = require("./VisionRecoverySlotPanel");
class VisionRecoveryResultView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments),
      (this.Xvt = void 0),
      (this.$vt = void 0),
      (this.Yvt = []),
      (this.Jvt = () => {
        this.CloseMe();
      }),
      (this.zvt = (e, i) => {
        void 0 !== i &&
          ItemController_1.ItemController.OpenItemTipsByItemUid(
            i.GetUniqueId(),
            i.GetConfigId(),
          );
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UIItem],
      [2, UE.UIItem],
      [3, UE.UIItem],
      [4, UE.UIItem],
      [5, UE.UIButtonComponent],
    ]),
      (this.BtnBindInfo = [[5, this.Jvt]]);
  }
  async OnBeforeStartAsync() {
    var e = this.OpenParam;
    void 0 === e
      ? Log_1.Log.CheckInfo() &&
        Log_1.Log.Info(
          "Calabash",
          59,
          "VisionRecoveryResultView responseData为空",
        )
      : ((this.Xvt = new VisionRecoverySlotPanel_1.VisionRecoverySlotPanel(
          void 0,
          !1,
        )),
        await this.Xvt.CreateThenShowByActorAsync(this.GetItem(0).GetOwner()),
        (this.$vt = new VisionRecoverySlotItem_1.VisionRecoverySlotItem(
          this.zvt,
          !1,
        )),
        await this.$vt.CreateThenShowByActorAsync(this.GetItem(1).GetOwner()),
        this.Zvt(e.OBs),
        this.eMt(e.bMs),
        await this.tMt(e.GBs),
        this.iMt(e.GBs));
  }
  Zvt(e) {
    e =
      ModelManager_1.ModelManager.InventoryModel.GetPhantomItemDataListByPhantomItem(
        e,
      );
    this.Xvt.RefreshUi(e);
  }
  eMt(e) {
    e =
      ModelManager_1.ModelManager.InventoryModel.GetPhantomItemDataListByAddCountItemInfo(
        e,
      );
    e.length <= 0
      ? Log_1.Log.CheckInfo() &&
        Log_1.Log.Info("Calabash", 59, "VisionRecoveryResultView 主奖励为空")
      : this.$vt.RefreshUi(e[0]);
  }
  async tMt(e) {
    var i = this.GetItem(2);
    if (e.length <= 0) i.SetUIActive(!1);
    else {
      const t =
        ModelManager_1.ModelManager.InventoryModel.GetPhantomItemDataListByAddCountItemInfo(
          e,
        );
      if (t.length <= 0)
        Log_1.Log.CheckInfo() &&
          Log_1.Log.Info(
            "Calabash",
            59,
            "VisionRecoveryResultView 次奖励转换失败，返回空",
          ),
          i.SetUIActive(!1);
      else {
        i.SetUIActive(!0);
        const r = this.GetItem(3),
          s = this.GetItem(4),
          o = new Array();
        t.forEach(() => {
          var e = new VisionRecoverySlotItem_1.VisionRecoverySlotItem(
              this.zvt,
              !1,
            ),
            i = LguiUtil_1.LguiUtil.CopyItem(s, r);
          o.push(e.CreateThenShowByActorAsync(i.GetOwner())), this.Yvt.push(e);
        }),
          await Promise.all(o),
          this.Yvt.forEach((e, i) => {
            e.RefreshUi(t[i]);
          }),
          s.SetUIActive(!1);
      }
    }
  }
  iMt(e) {
    e.length <= 0 ||
      this.UiViewSequence.AddSequenceFinishEvent("Start", () => {
        switch (
          (ControllerHolder_1.ControllerHolder.UiNavigationNewController.RepeatCursorMove(),
          e.length)
        ) {
          case 1:
            this.UiViewSequence.PlaySequence("RewardA");
            break;
          case 2:
            this.UiViewSequence.PlaySequence("RewardB");
            break;
          case 3:
            this.UiViewSequence.PlaySequence("RewardC");
            break;
          default:
            this.UiViewSequence.PlaySequence("RewardD");
        }
      });
  }
}
exports.VisionRecoveryResultView = VisionRecoveryResultView;
//# sourceMappingURL=VisionRecoveryResultView.js.map
