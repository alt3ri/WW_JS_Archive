"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FriendBlackListView = void 0);
const UE = require("ue");
const CommonParamById_1 = require("../../../../Core/Define/ConfigCommon/CommonParamById");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiViewBase_1 = require("../../../Ui/Base/UiViewBase");
const LguiUtil_1 = require("../../Util/LguiUtil");
const GenericScrollView_1 = require("../../Util/ScrollView/GenericScrollView");
const FriendController_1 = require("../FriendController");
const FriendItem_1 = require("./FriendItem");
class FriendBlackListView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments),
      (this.h6t = void 0),
      (this.l6t = []),
      (this.sGe = (e, i, t) => {
        i = new FriendItem_1.FriendItem(this.Info.Name, i);
        return i.Refresh(e, !1, t), { Key: t, Value: i };
      }),
      (this._6t = () => {
        this.u6t();
      });
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIText],
      [1, UE.UIItem],
      [2, UE.UIScrollViewWithScrollbarComponent],
      [3, UE.UIItem],
    ];
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.UpdateBlackListShow,
      this._6t,
    );
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.UpdateBlackListShow,
      this._6t,
    );
  }
  OnStart() {
    this.c6t(),
      (this.h6t = new GenericScrollView_1.GenericScrollView(
        this.GetScrollViewWithScrollbar(2),
        this.sGe,
      )),
      FriendController_1.FriendController.RequestBlackList();
  }
  u6t() {
    (this.l6t = FriendController_1.FriendController.CreateFriendItemSt(
      ModelManager_1.ModelManager.FriendModel.GetBlackListIds(),
      0,
    )),
      this.h6t.RefreshByData(this.l6t),
      this.c6t();
  }
  c6t() {
    const e = this.GetText(0);
    const i =
      CommonParamById_1.configCommonParamById.GetIntConfig("blocklist_limit");
    const t = this.l6t.length;
    LguiUtil_1.LguiUtil.SetLocalText(e, "FriendBlackListCount", t, i),
      this.GetItem(3).SetUIActive(this.l6t.length <= 0);
  }
  OnBeforeDestroy() {
    this.h6t.ClearChildren(),
      (this.l6t.length = 0),
      ModelManager_1.ModelManager.FriendModel.ResetShowingView();
  }
}
exports.FriendBlackListView = FriendBlackListView;
// # sourceMappingURL=FriendBlackListView.js.map
