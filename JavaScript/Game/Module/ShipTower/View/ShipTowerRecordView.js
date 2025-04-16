"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ShipTowerRecordView = void 0);
const UE = require("ue"),
  Log_1 = require("../../../../Core/Common/Log"),
  ConfigManager_1 = require("../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  UiViewBase_1 = require("../../../Ui/Base/UiViewBase"),
  PopupCaptionItem_1 = require("../../../Ui/Common/PopupCaptionItem"),
  GenericLayout_1 = require("../../Util/Layout/GenericLayout"),
  LoopScrollView_1 = require("../../Util/ScrollView/LoopScrollView"),
  ShipTowerAreaItem_1 = require("./ShipTowerAreaItem"),
  ShipTowerRecordItem_1 = require("./ShipTowerRecordItem");
class ShipTowerRecordView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments),
      (this.zJa = void 0),
      (this.OpenParam = void 0),
      (this.PA_ = void 0),
      (this.uA_ = void 0),
      (this.iJl = void 0),
      (this.LD_ = void 0),
      (this.Ns_ = void 0),
      (this.UA_ = () => {
        var e = new ShipTowerAreaItem_1.ShipTowerAreaItem();
        return (e.ClickCallBack = this.DA_), e;
      }),
      (this.DA_ = (e) => {
        var i = (this.iJl = e).RecordList?.some((e) => 0 < e.TeamList.length),
          t = e.RecordList?.some((e) => 0 < e.BuffId),
          i = !(!i || !t),
          t =
            (this.U$l(!i),
            i && this.LD_?.RefreshByData(e.RecordList, void 0, !0),
            e.RecordList?.reduce((e, i) => e + i.Score, 0) ?? 0),
          i = e.RecordList?.reduce((e, i) => e + i.Wave, 0) ?? 0,
          e =
            (this.GetText(6).SetText(t.toString()),
            this.GetText(7).SetText(i.toString()),
            this.GetTexture(8)),
          i = this.Ns_?.GetStageGradeResIdByScore(t),
          t = void 0 !== i;
        e?.SetUIActive(t),
          t &&
            ((t =
              ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(
                i,
              )),
            this.SetTextureByPath(t, e)),
          this.PlaySequence("Switch"),
          Log_1.Log.CheckDebug() &&
            Log_1.Log.Debug("Temp", 69, "", ["SelectData", this.iJl]);
      }),
      (this.VSi = () => {
        return new ShipTowerRecordItem_1.ShipTowerRecordItem();
      });
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UIButtonComponent],
      [2, UE.UILoopScrollViewComponent],
      [3, UE.UIItem],
      [4, UE.UIItem],
      [5, UE.UIText],
      [6, UE.UIText],
      [7, UE.UIText],
      [8, UE.UITexture],
      [9, UE.UIVerticalLayout],
      [10, UE.UIItem],
    ];
  }
  Es_() {
    (this.uA_ = ModelManager_1.ModelManager.ShipTowerModel.RecordList),
      (this.Ns_ =
        ModelManager_1.ModelManager.ShipTowerModel.GetEndlessStageData()),
      Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug("Temp", 69, "", ["DataParam", this.OpenParam]);
  }
  async OnBeforeStartAsync() {
    this.Es_(),
      await super.OnBeforeStartAsync(),
      await ModelManager_1.ModelManager.ShipTowerModel.RequestRecord(),
      (this.zJa = new PopupCaptionItem_1.PopupCaptionItem(this.GetItem(0))),
      this.zJa.SetCloseCallBack(this.CloseMe.bind(this)),
      this.zJa.SetHelpBtnActive(!1),
      (this.PA_ = new LoopScrollView_1.LoopScrollView(
        this.GetLoopScrollViewComponent(2),
        this.GetItem(10).GetOwner(),
        this.UA_,
        !0,
      )),
      (this.LD_ = new GenericLayout_1.GenericLayout(
        this.GetVerticalLayout(9),
        this.VSi,
      )),
      await this.PA_.RefreshByDataAsync(this.uA_),
      this.PA_.SelectGridProxy(this.kA_()),
      this.uA_.length <= 0 && this.U$l(!0);
  }
  OnStart() {
    var e = this.Ns_?.TitleKey ?? "";
    this.GetText(5).ShowTextNew(e);
  }
  U$l(e) {
    this.GetItem(4)?.SetUIActive(!e), this.GetItem(3)?.SetUIActive(e);
  }
  kA_() {
    return 0;
  }
}
exports.ShipTowerRecordView = ShipTowerRecordView;
//# sourceMappingURL=ShipTowerRecordView.js.map
