"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.AdviceWordSelectView = void 0);
const UE = require("ue");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiViewBase_1 = require("../../../Ui/Base/UiViewBase");
const LguiUtil_1 = require("../../Util/LguiUtil");
const GenericScrollView_1 = require("../../Util/ScrollView/GenericScrollView");
const AdviceWordSelectItem_1 = require("./AdviceWordSelectItem");
const WAITUPDATECOUNT = 1;
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
        let e, i;
        ModelManager_1.ModelManager.AdviceModel.CurrentChangeWordType === 0
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
        let i;
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
    ModelManager_1.ModelManager.AdviceModel.CurrentChangeWordType === 0
      ? LguiUtil_1.LguiUtil.SetLocalText(this.GetText(4), "AdvicePutSentence")
      : LguiUtil_1.LguiUtil.SetLocalText(this.GetText(4), "AdvicePutWord");
  }
  bqe() {
    const e = ModelManager_1.ModelManager.AdviceModel.CurrentChangeWordType;
    (this.hHe = new Array()),
      e === 0
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
// # sourceMappingURL=AdviceWordSelectView.js.map
