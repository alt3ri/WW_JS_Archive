"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SelectedFriendChatView = void 0);
const UE = require("ue");
const Log_1 = require("../../../../Core/Common/Log");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiViewBase_1 = require("../../../Ui/Base/UiViewBase");
const UiManager_1 = require("../../../Ui/UiManager");
const ScrollingTipsController_1 = require("../../ScrollingTips/ScrollingTipsController");
const LoopScrollView_1 = require("../../Util/ScrollView/LoopScrollView");
const SelectedFriendItem_1 = require("./SelectedFriendItem");
class SelectedFriendChatView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments),
      (this.pEt = void 0),
      (this.z9e = () => {
        const e = new SelectedFriendItem_1.SelectedFriendItem();
        return e.BindOnClicked(this.vEt), e;
      }),
      (this.vEt = (e) => {
        Log_1.Log.CheckInfo() &&
          Log_1.Log.Info("Chat", 8, "选择玩家", ["playerId", e]),
          ModelManager_1.ModelManager.FriendModel.IsMyFriend(e)
            ? (EventSystem_1.EventSystem.Emit(
                EventDefine_1.EEventName.OnSelectChatFriend,
                e,
              ),
              UiManager_1.UiManager.CloseView("SelectedFriendChatView"))
            : (ScrollingTipsController_1.ScrollingTipsController.ShowTipsById(
                "SelectChatNoFriendText",
              ),
              this.bl());
      });
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UILoopScrollViewComponent],
      [1, UE.UIItem],
      [2, UE.UIItem],
    ];
  }
  OnStart() {
    const e = this.GetItem(1).GetOwner();
    (this.pEt = new LoopScrollView_1.LoopScrollView(
      this.GetLoopScrollViewComponent(0),
      e,
      this.z9e,
    )),
      this.bl();
  }
  OnBeforeDestroy() {
    this.pEt = void 0;
  }
  bl() {
    const e = ModelManager_1.ModelManager.FriendModel;
    const r = ModelManager_1.ModelManager.ChatModel;
    const i = [];
    for (const t of e.GetFriendSortedListIds())
      r.IsInPrivateChatRoom(t) || e.HasBlockedPlayer(t) || i.push(t);
    this.pEt.ReloadData(i), this.GetItem(2).SetUIActive(i.length <= 0);
  }
}
exports.SelectedFriendChatView = SelectedFriendChatView;
// # sourceMappingURL=SelectedFriendChatView.js.map
