"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.AdviceSortWordSelectView = void 0);
const UE = require("ue"),
  EventDefine_1 = require("../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../Common/Event/EventSystem"),
  ConfigManager_1 = require("../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  UiViewBase_1 = require("../../../Ui/Base/UiViewBase"),
  LguiUtil_1 = require("../../Util/LguiUtil"),
  GenericScrollView_1 = require("../../Util/ScrollView/GenericScrollView"),
  AdviceWordItem_1 = require("./AdviceWordItem"),
  AdviceWordTypeItem_1 = require("./AdviceWordTypeItem"),
  WAITUPDATECOUNT = 1;
class AdviceSortWordSelectView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments),
      (this.hje = void 0),
      (this.kHe = void 0),
      (this.FHe = !1),
      (this.VHe = 0),
      (this.lje = !1),
      (this.jHe = 0),
      (this.WHe = (e, i, t) => {
        i = new AdviceWordTypeItem_1.AdviceWordTypeItem(i);
        return i.UpdateItem(e), { Key: t, Value: i };
      }),
      (this.KHe = (e, i, t) => {
        i = new AdviceWordItem_1.AdviceWordItem(i);
        return i.UpdateItem(e), { Key: t, Value: i };
      }),
      (this.L3e = () => {
        var e = ModelManager_1.ModelManager.AdviceModel;
        e.CurrentWordMap.set(e.CurrentSelectWordIndex, e.PreSelectSortWordId),
          this.CloseMe(),
          EventSystem_1.EventSystem.Emit(
            EventDefine_1.EEventName.OnSelectAdviceWord,
          );
      }),
      (this.uHe = () => {
        this.CloseMe();
      }),
      (this.QHe = () => {
        var e =
          ConfigManager_1.ConfigManager.AdviceConfig.GetAdviceWordTypeConfigs();
        const i = new Array();
        e.forEach((e) => {
          i.push(e.Id);
        }),
          this.hje.RefreshByData(i),
          this.XHe(),
          (this.jHe = 0),
          this.hje.UnBindLateUpdate(),
          (this.lje = !0),
          this.hje.BindLateUpdate(this._je);
      }),
      (this._je = (e) => {
        var i;
        this.lje &&
          this.jHe >= WAITUPDATECOUNT &&
          ((this.lje = !1),
          (i = this.YHe()),
          this.GetScrollViewWithScrollbar(0).SetScrollProgress(i),
          this.hje.UnBindLateUpdate()),
          this.jHe++;
      }),
      (this.XHe = () => {
        var e = ModelManager_1.ModelManager.AdviceModel.PreSelectSortTypeId,
          e =
            ConfigManager_1.ConfigManager.AdviceConfig.GetAdviceWordConfigsByType(
              e,
            );
        const i = new Array();
        e.forEach((e) => {
          i.push(e.Id);
        }),
          this.kHe.RefreshByData(i),
          (this.VHe = 0),
          this.kHe.UnBindLateUpdate(),
          (this.FHe = !0),
          this.kHe.BindLateUpdate(this.JHe);
      }),
      (this.JHe = (e) => {
        var i;
        this.FHe &&
          this.VHe >= WAITUPDATECOUNT &&
          ((this.FHe = !1),
          (i = this.zHe()),
          this.GetScrollViewWithScrollbar(2).SetScrollProgress(i)),
          this.VHe >= WAITUPDATECOUNT + 1 &&
            ((i = this.zHe()),
            this.GetScrollScrollbar(6).SetValue(i),
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
    (this.hje = new GenericScrollView_1.GenericScrollView(
      this.GetScrollViewWithScrollbar(0),
      this.WHe,
    )),
      (this.kHe = new GenericScrollView_1.GenericScrollView(
        this.GetScrollViewWithScrollbar(2),
        this.KHe,
      ));
    var e,
      i = this.kHe.TempOriginalItem;
    i &&
      (e = (i = i.GetOwner()).GetComponentByClass(
        UE.UIButtonComponent.StaticClass(),
      )) &&
      i.K2_DestroyComponent(e),
      (ModelManager_1.ModelManager.AdviceModel.PreSelectSortTypeId =
        ModelManager_1.ModelManager.AdviceModel.CurrentSelectSortTypeId),
      (ModelManager_1.ModelManager.AdviceModel.PreSelectSortWordId =
        ModelManager_1.ModelManager.AdviceModel.CurrentSelectSortWordId),
      this.QHe(),
      this.mGe();
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.OnClickAdviceSort,
      this.XHe,
    );
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.OnClickAdviceSort,
      this.XHe,
    );
  }
  mGe() {
    LguiUtil_1.LguiUtil.SetLocalText(this.GetText(7), "AdviceSelectWord");
  }
  YHe() {
    var i =
      ConfigManager_1.ConfigManager.AdviceConfig.GetAdviceWordTypeConfigs();
    let t = 0;
    for (let e = 0; e < i.length; e++)
      if (
        i[e].Id === ModelManager_1.ModelManager.AdviceModel.PreSelectSortTypeId
      ) {
        t = e;
        break;
      }
    return t / (i.length - 1);
  }
  zHe() {
    var e = ModelManager_1.ModelManager.AdviceModel.PreSelectSortTypeId,
      i =
        ConfigManager_1.ConfigManager.AdviceConfig.GetAdviceWordConfigsByType(
          e,
        );
    let t = 0;
    for (let e = 0; e < i.length; e++)
      if (
        i[e].Id === ModelManager_1.ModelManager.AdviceModel.PreSelectSortWordId
      ) {
        t = e;
        break;
      }
    return t / (i.length - 1);
  }
  OnBeforeDestroy() {
    this.hje && (this.hje.ClearChildren(), (this.hje = void 0)),
      this.kHe && (this.kHe.ClearChildren(), (this.kHe = void 0));
  }
}
exports.AdviceSortWordSelectView = AdviceSortWordSelectView;
//# sourceMappingURL=AdviceSortWordSelectView.js.map
