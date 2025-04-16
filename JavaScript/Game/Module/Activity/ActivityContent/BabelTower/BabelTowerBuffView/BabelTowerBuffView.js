"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.BabelTowerBuffView = void 0);
const UE = require("ue"),
  Log_1 = require("../../../../../../Core/Common/Log"),
  UiAsyncTask_1 = require("../../../../../Ui/Base/UiAsyncTask"),
  UiViewBase_1 = require("../../../../../Ui/Base/UiViewBase"),
  PopupCaptionItem_1 = require("../../../../../Ui/Common/PopupCaptionItem"),
  LguiUtil_1 = require("../../../../Util/LguiUtil"),
  LoopScrollView_1 = require("../../../../Util/ScrollView/LoopScrollView"),
  BabelTowerBuffDetailItem_1 = require("./BabelTowerBuffDetailItem"),
  BabelTowerBuffItem_1 = require("./BabelTowerBuffItem");
class BabelTowerBuffView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments),
      (this.Pe = void 0),
      (this.Dcc = void 0),
      (this.Ept = void 0),
      (this.Bcc = void 0),
      (this.lqe = void 0),
      (this.kcc = void 0),
      (this.Y11 = void 0),
      (this.Occ = -1),
      (this.AMo = () => {
        this.CloseMe();
      }),
      (this.gDo = () => {
        var e = new BabelTowerBuffItem_1.BabelTowerBuffItem();
        return (e.OnToggleClick = this.qcc), e;
      }),
      (this.qcc = (e) => {
        this.Gcc(e);
      }),
      (this.Fcc = () => {
        this.Ncc();
      }),
      (this.UTc = () => {
        this.BTc();
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UIButtonComponent],
      [2, UE.UIExtendToggle],
      [3, UE.UIExtendToggle],
      [4, UE.UILoopScrollViewComponent],
      [5, UE.UIItem],
      [6, UE.UIItem],
      [7, UE.UIText],
      [8, UE.UIItem],
    ]),
      (this.BtnBindInfo = [
        [2, this.Fcc],
        [3, this.UTc],
        [1, this.AMo],
      ]);
  }
  async OnBeforeStartAsync() {
    (this.Pe = this.OpenParam),
      this.Pe
        ? (this.GetButton(1)?.RootUIComp.SetUIActive(!1),
          (this.lqe = new PopupCaptionItem_1.PopupCaptionItem()),
          (this.Ept =
            new BabelTowerBuffDetailItem_1.BabelTowerBuffDetailItem()),
          await Promise.all([
            this.lqe.CreateThenShowByActorAsync(this.GetItem(0).GetOwner()),
            this.Ept.CreateThenShowByActorAsync(this.GetItem(8).GetOwner()),
          ]),
          this.lqe.SetCloseCallBack(this.AMo),
          (this.Dcc = new LoopScrollView_1.LoopScrollView(
            this.GetLoopScrollViewComponent(4),
            this.GetItem(5).GetOwner(),
            this.gDo,
            !0,
          )))
        : Log_1.Log.CheckError() && Log_1.Log.Error("UiCommon", 43, "Data为空");
  }
  OnBeforeShow() {
    this.Bcc || this.Ncc();
  }
  Ncc() {
    this.nQi(this.GetExtendToggle(2)), this.Hcc();
  }
  BTc() {
    this.nQi(this.GetExtendToggle(3)), this.kTc();
  }
  Hcc() {
    var e = new UiAsyncTask_1.UiAsyncTask(
      "BabelTowerBuffView.ToggleSelect",
      async () => {
        await this.Wcc();
      },
    );
    this.RunAsyncTask(e);
  }
  kTc() {
    var e = new UiAsyncTask_1.UiAsyncTask(
      "BabelTowerBuffView.ToggleSelect",
      async () => {
        await this.OTc();
      },
    );
    this.RunAsyncTask(e);
  }
  async Wcc() {
    (this.kcc = this.Pe?.BuffDataList), (this.Y11 = 0), await this.Kcc();
  }
  async OTc() {
    (this.kcc = this.Pe?.DeTermDataList), (this.Y11 = 1), await this.Kcc();
  }
  nQi(e) {
    this.Bcc?.SetToggleState(0), (this.Bcc = e), this.Bcc.SetToggleState(1);
  }
  async Kcc() {
    this.kcc && 0 !== this.kcc.length
      ? (this.Xcc(!1), await this.Ycc(), this.Gcc(0))
      : this.Xcc(!0);
  }
  async Ycc() {
    await this.Dcc.RefreshByDataAsync(this.kcc);
  }
  zcc() {
    !this.kcc ||
      this.Occ < 0 ||
      this.Occ >= this.kcc.length ||
      this.Ept.Update(this.kcc[this.Occ]);
  }
  Xcc(e) {
    if ((this.GetItem(6).SetUIActive(e), e)) {
      let e = "";
      0 === this.Y11
        ? (e = "PrefabTextItem_1001383652_Text")
        : 1 === this.Y11 && (e = "PrefabTextItem_438129107_Text"),
        LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(7), e);
    }
    this.GetLoopScrollViewComponent(4).RootUIComp.SetUIActive(!e),
      this.Ept.SetActive(!e);
  }
  Gcc(e) {
    !this.kcc ||
      e < 0 ||
      e >= this.kcc.length ||
      ((this.Occ = e), this.Dcc?.SelectGridProxy(e), this.zcc());
  }
}
exports.BabelTowerBuffView = BabelTowerBuffView;
//# sourceMappingURL=BabelTowerBuffView.js.map
