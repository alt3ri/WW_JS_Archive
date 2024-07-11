"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.AdviceSortWordSelectView = void 0);
const UE = require("ue");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiViewBase_1 = require("../../../Ui/Base/UiViewBase");
const LguiUtil_1 = require("../../Util/LguiUtil");
const GenericScrollView_1 = require("../../Util/ScrollView/GenericScrollView");
const AdviceWordItem_1 = require("./AdviceWordItem");
const AdviceWordTypeItem_1 = require("./AdviceWordTypeItem");
const WAITUPDATECOUNT = 1;
class AdviceSortWordSelectView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments),
      (this.Y7e = void 0),
      (this.R7e = void 0),
      (this.U7e = !1),
      (this.A7e = 0),
      (this.J7e = !1),
      (this.x7e = 0),
      (this.w7e = (e, i, t) => {
        i = new AdviceWordTypeItem_1.AdviceWordTypeItem(i);
        return i.UpdateItem(e), { Key: t, Value: i };
      }),
      (this.B7e = (e, i, t) => {
        i = new AdviceWordItem_1.AdviceWordItem(i);
        return i.UpdateItem(e), { Key: t, Value: i };
      }),
      (this._Fe = () => {
        const e = ModelManager_1.ModelManager.AdviceModel;
        e.CurrentWordMap.set(e.CurrentSelectWordIndex, e.PreSelectSortWordId),
          this.CloseMe(),
          EventSystem_1.EventSystem.Emit(
            EventDefine_1.EEventName.OnSelectAdviceWord,
          );
      }),
      (this.J9e = () => {
        this.CloseMe();
      }),
      (this.b7e = () => {
        const e =
          ConfigManager_1.ConfigManager.AdviceConfig.GetAdviceWordTypeConfigs();
        const i = new Array();
        e.forEach((e) => {
          i.push(e.Id);
        }),
          this.Y7e.RefreshByData(i),
          this.q7e(),
          (this.x7e = 0),
          this.Y7e.UnBindLateUpdate(),
          (this.J7e = !0),
          this.Y7e.BindLateUpdate(this.z7e);
      }),
      (this.z7e = (e) => {
        let i;
        this.J7e &&
          this.x7e >= WAITUPDATECOUNT &&
          ((this.J7e = !1),
          (i = this.N7e()),
          this.GetScrollViewWithScrollbar(0).SetScrollProgress(i),
          this.Y7e.UnBindLateUpdate()),
          this.x7e++;
      }),
      (this.q7e = () => {
        var e = ModelManager_1.ModelManager.AdviceModel.PreSelectSortTypeId;
        var e =
          ConfigManager_1.ConfigManager.AdviceConfig.GetAdviceWordConfigsByType(
            e,
          );
        const i = new Array();
        e.forEach((e) => {
          i.push(e.Id);
        }),
          this.R7e.RefreshByData(i),
          (this.A7e = 0),
          this.R7e.UnBindLateUpdate(),
          (this.U7e = !0),
          this.R7e.BindLateUpdate(this.O7e);
      }),
      (this.O7e = (e) => {
        let i;
        this.U7e &&
          this.A7e >= WAITUPDATECOUNT &&
          ((this.U7e = !1),
          (i = this.k7e()),
          this.GetScrollViewWithScrollbar(2).SetScrollProgress(i)),
          this.A7e >= WAITUPDATECOUNT + 1 &&
            ((i = this.k7e()),
            this.GetScrollScrollbar(6).SetValue(i),
            this.R7e.UnBindLateUpdate()),
          this.A7e++;
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
        [4, this.J9e],
        [5, this._Fe],
      ]);
  }
  OnStart() {
    (this.Y7e = new GenericScrollView_1.GenericScrollView(
      this.GetScrollViewWithScrollbar(0),
      this.w7e,
    )),
      (this.R7e = new GenericScrollView_1.GenericScrollView(
        this.GetScrollViewWithScrollbar(2),
        this.B7e,
      ));
    let e;
    let i = this.R7e.TempOriginalItem;
    i &&
      (e = (i = i.GetOwner()).GetComponentByClass(
        UE.UIButtonComponent.StaticClass(),
      )) &&
      i.K2_DestroyComponent(e),
      (ModelManager_1.ModelManager.AdviceModel.PreSelectSortTypeId =
        ModelManager_1.ModelManager.AdviceModel.CurrentSelectSortTypeId),
      (ModelManager_1.ModelManager.AdviceModel.PreSelectSortWordId =
        ModelManager_1.ModelManager.AdviceModel.CurrentSelectSortWordId),
      this.b7e(),
      this.mGe();
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.OnClickAdviceSort,
      this.q7e,
    );
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.OnClickAdviceSort,
      this.q7e,
    );
  }
  mGe() {
    LguiUtil_1.LguiUtil.SetLocalText(this.GetText(7), "AdviceSelectWord");
  }
  N7e() {
    const i =
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
  k7e() {
    const e = ModelManager_1.ModelManager.AdviceModel.PreSelectSortTypeId;
    const i =
      ConfigManager_1.ConfigManager.AdviceConfig.GetAdviceWordConfigsByType(e);
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
    this.Y7e && (this.Y7e.ClearChildren(), (this.Y7e = void 0)),
      this.R7e && (this.R7e.ClearChildren(), (this.R7e = void 0));
  }
}
exports.AdviceSortWordSelectView = AdviceSortWordSelectView;
// # sourceMappingURL=AdviceSortWordSelectView.js.map
