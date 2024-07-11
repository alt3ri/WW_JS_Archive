"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FriendSearchView = void 0);
const puerts_1 = require("puerts"),
  UE = require("ue"),
  EventDefine_1 = require("../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../Common/Event/EventSystem"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  UiViewBase_1 = require("../../../Ui/Base/UiViewBase"),
  ButtonAndSpriteItem_1 = require("../../Common/Button/ButtonAndSpriteItem"),
  LoopScrollView_1 = require("../../Util/ScrollView/LoopScrollView"),
  FriendController_1 = require("../FriendController"),
  FriendItem_1 = require("./FriendItem");
class FriendSearchView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments),
      (this.n9t = void 0),
      (this.s9t = []),
      (this.a9t = void 0),
      (this.fGe = () => {
        return new FriendItem_1.FriendItem(this.Info.Name);
      }),
      (this.h9t = () => {
        "" === this.GetInputText(0).GetText()
          ? (this.a9t.RefreshSprite("SP_Paste"),
            this.a9t.BindCallback(this.QAt))
          : (this.a9t.RefreshSprite("SP_Clear"),
            this.a9t.BindCallback(this.KAt));
      }),
      (this.KAt = () => {
        this.GetInputText(0).SetText(""), this.h9t();
      }),
      (this.QAt = () => {
        var e = this.GetInputText(0),
          t = (0, puerts_1.$ref)("");
        UE.LGUIBPLibrary.ClipBoardPaste(t),
          (t = (0, puerts_1.$unref)(t)),
          e.SetText(t),
          this.h9t();
      }),
      (this.l9t = () => {
        var e = ModelManager_1.ModelManager.FriendModel,
          e =
            (e.ClearApplyFriendList(),
            e.ClearApproveFriendList(),
            e.ClearRefuseFriendList(),
            this.GetInputText(0).GetText());
        0 < e.length &&
          FriendController_1.FriendController.RequestSearchPlayerBasicInfo(
            Number(e),
          );
      }),
      (this._9t = (e) => {
        (this.s9t = FriendController_1.FriendController.CreateFriendItemSt(
          [e],
          0,
        )),
          this.u8t();
      }),
      (this.u9t = (e) => {
        (this.s9t = FriendController_1.FriendController.CreateFriendItemSt(
          [e],
          1,
        )),
          this.u8t();
      }),
      (this.c9t = (e, t) => {
        (this.s9t = FriendController_1.FriendController.CreateFriendItemSt(
          t,
          e,
        )),
          this.u8t();
      }),
      (this.m9t = (t) => {
        for (let e = 0; e < this.s9t.length; e++)
          if (this.s9t[e].Id === t)
            return void this.n9t.UnsafeGetGridProxy(e)?.RefreshMute();
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UITextInputComponent],
      [1, UE.UIItem],
      [2, UE.UIButtonComponent],
      [3, UE.UIItem],
      [4, UE.UILoopScrollViewComponent],
      [5, UE.UIItem],
    ]),
      (this.BtnBindInfo = [[2, this.l9t]]);
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.SearchPlayerInfo,
      this._9t,
    ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.ApplicationSent,
        this.u9t,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.ApplicationHandled,
        this.c9t,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnAddMutePlayer,
        this.m9t,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnRemoveMutePlayer,
        this.m9t,
      );
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.SearchPlayerInfo,
      this._9t,
    ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.ApplicationSent,
        this.u9t,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.ApplicationHandled,
        this.c9t,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnAddMutePlayer,
        this.m9t,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnRemoveMutePlayer,
        this.m9t,
      );
  }
  OnStart() {
    this.a9t = new ButtonAndSpriteItem_1.ButtonAndSpriteItem(this.GetItem(1));
    var e = this.GetItem(3),
      e =
        ((this.n9t = new LoopScrollView_1.LoopScrollView(
          this.GetLoopScrollViewComponent(4),
          e.GetOwner(),
          this.fGe,
        )),
        this.GetInputText(0).OnTextChange.Bind(this.h9t),
        ModelManager_1.ModelManager.FriendModel);
    e.ClearFriendSearchResults(),
      (this.s9t = FriendController_1.FriendController.CreateFriendItemSt(
        e.GetFriendSearchResultListIds(),
        0,
      )),
      this.u8t();
  }
  OnAfterHide() {
    var e = ModelManager_1.ModelManager.FriendModel;
    e.ClearApplyFriendList(),
      e.ClearApproveFriendList(),
      e.ClearRefuseFriendList();
  }
  OnBeforeDestroy() {
    this.GetInputText(0).OnTextChange.Unbind(),
      ModelManager_1.ModelManager.FriendModel.ResetShowingView();
  }
  u8t() {
    0 < this.s9t.length && this.n9t.ReloadData(this.s9t), this.d9t();
  }
  d9t() {
    this.GetInputText(0).SetText(""),
      this.h9t(),
      this.GetItem(5).SetUIActive(this.s9t.length <= 0);
  }
}
exports.FriendSearchView = FriendSearchView;
//# sourceMappingURL=FriendSearchView.js.map
