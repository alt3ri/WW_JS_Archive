"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.AdviceMutiSentenceSelectView = void 0);
const UE = require("ue"),
  EventDefine_1 = require("../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../Common/Event/EventSystem"),
  ConfigManager_1 = require("../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  UiViewBase_1 = require("../../../Ui/Base/UiViewBase"),
  LguiUtil_1 = require("../../Util/LguiUtil"),
  GenericScrollView_1 = require("../../Util/ScrollView/GenericScrollView"),
  AdviceSentenceSelectItem_1 = require("./AdviceSentenceSelectItem"),
  AdviceSentenceSelectItemContent_1 = require("./AdviceSentenceSelectItemContent"),
  WAITUPDATECOUNT = 1;
class AdviceMutiSentenceSelectView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments),
      (this.OHe = void 0),
      (this.kHe = void 0),
      (this.FHe = !1),
      (this.VHe = 0),
      (this.HHe = !1),
      (this.jHe = 0),
      (this.WHe = (e, t, i) => {
        t = new AdviceSentenceSelectItem_1.AdviceSentenceSelectItem(t);
        return t.UpdateItem(e), { Key: i, Value: t };
      }),
      (this.KHe = (e, t, i) => {
        t =
          new AdviceSentenceSelectItemContent_1.AdviceSentenceSelectItemContent(
            t,
          );
        return t.UpdateItem(e), { Key: i, Value: t };
      }),
      (this.L3e = () => {
        ModelManager_1.ModelManager.AdviceModel.CurrentPreSentenceWordMap.forEach(
          (e, t) => {
            ModelManager_1.ModelManager.AdviceModel.CurrentSentenceWordMap.get(
              t,
            ) !== e &&
              ModelManager_1.ModelManager.AdviceModel.OnChangeSentence(t);
          },
        ),
          ModelManager_1.ModelManager.AdviceModel.CurrentPreSentenceWordMap.forEach(
            (e, t) => {
              ModelManager_1.ModelManager.AdviceModel.CurrentSentenceWordMap.set(
                t,
                e,
              );
            },
          ),
          this.CloseMe(),
          EventSystem_1.EventSystem.Emit(
            EventDefine_1.EEventName.OnChangeAdviceWord,
          );
      }),
      (this.uHe = () => {
        this.CloseMe();
      }),
      (this.QHe = () => {
        var e = new Array();
        e.push(0),
          e.push(1),
          this.OHe.RefreshByData(e),
          this.XHe(),
          (this.jHe = 0),
          this.OHe.UnBindLateUpdate(),
          (this.HHe = !0),
          this.OHe.BindLateUpdate(this.$He);
      }),
      (this.$He = (e) => {
        var t;
        this.HHe &&
          this.jHe >= WAITUPDATECOUNT &&
          ((this.HHe = !1),
          (t = this.YHe()),
          this.GetScrollViewWithScrollbar(0).SetScrollProgress(t),
          this.OHe.UnBindLateUpdate()),
          this.jHe++;
      }),
      (this.XHe = () => {
        const t = new Array();
        ConfigManager_1.ConfigManager.AdviceConfig.GetAdviceSentenceConfigs().forEach(
          (e) => {
            t.push(e.Id);
          },
        ),
          this.kHe.RefreshByData(t),
          (this.VHe = 0),
          this.kHe.UnBindLateUpdate(),
          (this.FHe = !0),
          this.kHe.BindLateUpdate(this.JHe);
      }),
      (this.JHe = (e) => {
        var t;
        this.FHe &&
          this.VHe >= WAITUPDATECOUNT &&
          ((this.FHe = !1),
          (t = this.zHe()),
          this.GetScrollViewWithScrollbar(2).SetScrollProgress(t)),
          this.VHe >= WAITUPDATECOUNT + 1 &&
            ((t = this.zHe()),
            this.GetScrollScrollbar(6).SetValue(t),
            this.kHe.UnBindLateUpdate()),
          this.VHe++;
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIScrollViewWithScrollbarComponent],
      [1, UE.UIItem],
      [2, UE.UIScrollViewWithScrollbarComponent],
      [3, UE.UIItem],
      [5, UE.UIButtonComponent],
      [4, UE.UIButtonComponent],
      [6, UE.UIScrollbarComponent],
      [7, UE.UIText],
    ]),
      (this.BtnBindInfo = [
        [4, this.uHe],
        [5, this.L3e],
      ]);
  }
  OnStart() {
    (this.OHe = new GenericScrollView_1.GenericScrollView(
      this.GetScrollViewWithScrollbar(0),
      this.WHe,
    )),
      (this.kHe = new GenericScrollView_1.GenericScrollView(
        this.GetScrollViewWithScrollbar(2),
        this.KHe,
      ));
    var e,
      t = this.kHe.TempOriginalItem;
    t &&
      (e = (t = t.GetOwner()).GetComponentByClass(
        UE.UIButtonComponent.StaticClass(),
      )) &&
      t.K2_DestroyComponent(e),
      (ModelManager_1.ModelManager.AdviceModel.CurrentSentenceSelectIndex = 0),
      ModelManager_1.ModelManager.AdviceModel.CurrentPreSentenceWordMap.clear(),
      ModelManager_1.ModelManager.AdviceModel.CurrentSentenceWordMap.forEach(
        (e, t) => {
          ModelManager_1.ModelManager.AdviceModel.CurrentPreSentenceWordMap.set(
            t,
            e,
          );
        },
      ),
      this.QHe(),
      this.mGe();
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.OnClickAdviceSort,
      this.QHe,
    );
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.OnClickAdviceSort,
      this.QHe,
    );
  }
  mGe() {
    LguiUtil_1.LguiUtil.SetLocalText(this.GetText(7), "AdvicePutSentence");
  }
  YHe() {
    var t =
      ConfigManager_1.ConfigManager.AdviceConfig.GetAdviceWordTypeConfigs();
    let i = 0;
    for (let e = 0; e < t.length; e++)
      if (
        t[e].Id === ModelManager_1.ModelManager.AdviceModel.PreSelectSortTypeId
      ) {
        i = e;
        break;
      }
    return i / (t.length - 1);
  }
  zHe() {
    var t =
        ModelManager_1.ModelManager.AdviceModel.CurrentPreSentenceWordMap.get(
          ModelManager_1.ModelManager.AdviceModel.CurrentSentenceSelectIndex,
        ),
      i = ConfigManager_1.ConfigManager.AdviceConfig.GetAdviceSentenceConfigs();
    let s = 0;
    for (let e = 0; e < i.length; e++)
      if (i[e].Id === t) {
        s = e;
        break;
      }
    return s / (i.length - 1);
  }
  OnBeforeDestroy() {
    this.OHe && (this.OHe.ClearChildren(), (this.OHe = void 0)),
      this.kHe && (this.kHe.ClearChildren(), (this.kHe = void 0));
  }
}
exports.AdviceMutiSentenceSelectView = AdviceMutiSentenceSelectView;
//# sourceMappingURL=AdviceMutiSentenceSelectView.js.map
