"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.AdviceWordSelectView = void 0);
const UE = require("ue"),
  EventDefine_1 = require("../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../Common/Event/EventSystem"),
  ConfigManager_1 = require("../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  UiViewBase_1 = require("../../../Ui/Base/UiViewBase"),
  LguiUtil_1 = require("../../Util/LguiUtil"),
  GenericScrollView_1 = require("../../Util/ScrollView/GenericScrollView"),
  AdviceWordSelectItem_1 = require("./AdviceWordSelectItem"),
  WAITUPDATECOUNT = 1;
class AdviceWordSelectView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments),
      (this.xqe = void 0),
      (this.eHe = !1),
      (this.tHe = 0),
      (this.hHe = new Array()),
      (this.sGe = (e, i, t) => {
        i = new AdviceWordSelectItem_1.AdviceWordSelectItem(i);
        return (
          i.Update(
            e,
            ModelManager_1.ModelManager.AdviceModel.CurrentChangeWordType,
          ),
          { Key: t, Value: i }
        );
      }),
      (this._Fe = () => {
        var e, i;
        0 === ModelManager_1.ModelManager.AdviceModel.CurrentChangeWordType
          ? ((e =
              ModelManager_1.ModelManager.AdviceModel.CurrentPreSelectWordId),
            (i =
              ModelManager_1.ModelManager.AdviceModel
                .CurrentPreSelectSentenceIndex),
            ModelManager_1.ModelManager.AdviceModel.CurrentSentenceWordMap.set(
              i,
              e,
            ),
            ModelManager_1.ModelManager.AdviceModel.OnChangeSentence(i))
          : (ModelManager_1.ModelManager.AdviceModel.CurrentConjunctionId =
              ModelManager_1.ModelManager.AdviceModel.CurrentPreSelectWordId),
          EventSystem_1.EventSystem.Emit(
            EventDefine_1.EEventName.OnChangeAdviceWord,
          ),
          this.CloseMe();
      }),
      (this.J9e = () => {
        this.CloseMe();
      }),
      (this.nHe = (e) => {
        var i;
        this.eHe &&
          this.tHe >= WAITUPDATECOUNT &&
          ((this.eHe = !1),
          (i = this.sHe(this.hHe)),
          this.GetScrollViewWithScrollbar(0).SetScrollProgress(i),
          this.xqe.UnBindLateUpdate()),
          this.tHe++;
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIScrollViewWithScrollbarComponent],
      [1, UE.UIItem],
      [3, UE.UIButtonComponent],
      [2, UE.UIButtonComponent],
      [4, UE.UIText],
    ]),
      (this.BtnBindInfo = [
        [3, this.J9e],
        [2, this._Fe],
      ]);
  }
  OnStart() {
    this.xqe = new GenericScrollView_1.GenericScrollView(
      this.GetScrollViewWithScrollbar(0),
      this.sGe,
    );
  }
  OnAfterShow() {
    (ModelManager_1.ModelManager.AdviceModel.CurrentPreSelectWordId =
      ModelManager_1.ModelManager.AdviceModel.CurrentSelectWordId),
      this.bqe(),
      this.mGe();
  }
  mGe() {
    0 === ModelManager_1.ModelManager.AdviceModel.CurrentChangeWordType
      ? LguiUtil_1.LguiUtil.SetLocalText(this.GetText(4), "AdvicePutSentence")
      : LguiUtil_1.LguiUtil.SetLocalText(this.GetText(4), "AdvicePutWord");
  }
  bqe() {
    var e = ModelManager_1.ModelManager.AdviceModel.CurrentChangeWordType;
    (this.hHe = new Array()),
      0 === e
        ? ConfigManager_1.ConfigManager.AdviceConfig.GetAdviceSentenceConfigs().forEach(
            (e) => {
              this.hHe.push(e.Id);
            },
          )
        : ConfigManager_1.ConfigManager.AdviceConfig.GetAdviceConjunctionConfigs().forEach(
            (e) => {
              this.hHe.push(e.Id);
            },
          ),
      this.xqe.RefreshByData(this.hHe),
      this.xqe.UnBindLateUpdate(),
      (this.eHe = !0),
      (this.tHe = 0),
      this.xqe.BindLateUpdate(this.nHe);
  }
  sHe(i) {
    let t = 0;
    for (let e = 0; e < i.length; e++)
      if (
        ModelManager_1.ModelManager.AdviceModel.CurrentSelectWordId === i[e]
      ) {
        t = e;
        break;
      }
    return t / (i.length - 1);
  }
  OnBeforeDestroy() {
    this.xqe.ClearChildren();
  }
}
exports.AdviceWordSelectView = AdviceWordSelectView;
//# sourceMappingURL=AdviceWordSelectView.js.map
