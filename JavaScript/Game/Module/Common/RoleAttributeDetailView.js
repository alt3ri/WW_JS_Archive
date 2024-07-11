"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RoleAttributeDetailView = void 0);
const UE = require("ue");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const UiViewBase_1 = require("../../Ui/Base/UiViewBase");
const PopupCaptionItem_1 = require("../../Ui/Common/PopupCaptionItem");
const RoleAttrListScrollItem_1 = require("../RoleUi/View/RoleAttrListScrollItem");
const GenericScrollView_1 = require("../Util/ScrollView/GenericScrollView");
class RoleAttributeDetailView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments),
      (this.lqe = void 0),
      (this.Lje = void 0),
      (this.Dje = (e, t, i) => {
        t = new RoleAttrListScrollItem_1.RoleAttrListScrollItem(
          t,
          e.AttributeType,
        );
        return t.ShowTemp(e, i), { Key: i, Value: t };
      }),
      (this.Mft = () => {
        this.CloseMe();
      });
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UIScrollViewWithScrollbarComponent],
      [2, UE.UIItem],
    ];
  }
  OnStart() {
    (this.lqe = new PopupCaptionItem_1.PopupCaptionItem(this.GetItem(0))),
      this.lqe.SetCloseCallBack(this.Mft),
      this.lqe.SetTitleLocalText("PrefabTextItem_1302715335_Text");
    const e = this.OpenParam;
    (this.Lje = new GenericScrollView_1.GenericScrollView(
      this.GetScrollViewWithScrollbar(1),
      this.Dje,
    )),
      this.Lje.RefreshByData(e),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.AttributeComponentEvent,
        !0,
      );
  }
  OnBeforeDestroy() {
    this.lqe.Destroy(),
      this.Lje && (this.Lje.ClearChildren(), (this.Lje = void 0));
  }
}
exports.RoleAttributeDetailView = RoleAttributeDetailView;
// # sourceMappingURL=RoleAttributeDetailView.js.map
