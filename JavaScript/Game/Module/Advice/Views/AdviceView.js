"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.AdviceView = void 0);
const UE = require("ue");
const CommonParamById_1 = require("../../../../Core/Define/ConfigCommon/CommonParamById");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiViewBase_1 = require("../../../Ui/Base/UiViewBase");
const LguiUtil_1 = require("../../Util/LguiUtil");
const GenericScrollView_1 = require("../../Util/ScrollView/GenericScrollView");
const AdviceItem_1 = require("./AdviceItem");
const WAITUPDATECOUNT = 1;
class AdviceView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments),
      (this.xqe = void 0),
      (this.Z7e = void 0),
      (this.eHe = !1),
      (this.tHe = 0),
      (this.iHe = () => {
        this.oHe(), this.rHe(), this.Qbe();
      }),
      (this.sGe = (e, t, i) => {
        t = new AdviceItem_1.AdviceItem(t);
        return t.Update(e), { Key: i, Value: t };
      }),
      (this.nHe = (e) => {
        let t;
        this.eHe &&
          this.tHe >= WAITUPDATECOUNT &&
          ((this.eHe = !1),
          (t = this.sHe(this.Z7e)),
          this.GetScrollViewWithScrollbar(1).SetScrollProgress(t),
          this.xqe.UnBindLateUpdate()),
          this.tHe++;
      });
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UIScrollViewWithScrollbarComponent],
      [2, UE.UIItem],
      [3, UE.UIText],
    ];
  }
  OnStart() {
    this.xqe = new GenericScrollView_1.GenericScrollView(
      this.GetScrollViewWithScrollbar(1),
      this.sGe,
    );
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.OnDeleteAdviceSuccess,
      this.iHe,
    ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnCreateAdviceSuccess,
        this.iHe,
      );
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.OnDeleteAdviceSuccess,
      this.iHe,
    ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnCreateAdviceSuccess,
        this.iHe,
      );
  }
  OnAfterShow() {
    this.oHe(), this.rHe(), this.Qbe();
  }
  oHe() {
    this.Z7e = new Array();
    const t = ModelManager_1.ModelManager.AdviceModel.GetAdviceArray();
    for (let e = t.length - 1; e >= 0; e--) this.Z7e.push(t[e]);
    this.xqe.RefreshByData(this.Z7e),
      this.xqe.UnBindLateUpdate(),
      (this.eHe = !0),
      (this.tHe = 0),
      this.xqe.BindLateUpdate(this.nHe);
  }
  Qbe() {
    const e = ModelManager_1.ModelManager.AdviceModel.GetAdviceArray();
    const t =
      CommonParamById_1.configCommonParamById.GetIntConfig(
        "AdviceCreateLimit",
      ) ?? 0;
    LguiUtil_1.LguiUtil.SetLocalText(
      this.GetText(3),
      "ReputationNormalValue",
      e.length,
      t,
    );
  }
  sHe(t) {
    let i = 0;
    for (let e = 0; e < t.length; e++)
      if (
        ModelManager_1.ModelManager.AdviceModel.AdviceViewShowId ===
        t[e].GetAdviceBigId()
      ) {
        i = e;
        break;
      }
    return i / (t.length - 1);
  }
  rHe() {
    const e =
      ModelManager_1.ModelManager.AdviceModel.GetAdviceArray().length === 0;
    this.GetItem(2).SetUIActive(e),
      this.GetScrollViewWithScrollbar(1).GetRootComponent().SetUIActive(!e);
  }
  OnBeforeDestroy() {
    this.xqe.ClearChildren();
  }
}
exports.AdviceView = AdviceView;
// # sourceMappingURL=AdviceView.js.map
