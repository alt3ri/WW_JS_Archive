"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.OnlineSearchView = void 0);
const puerts_1 = require("puerts"),
  UE = require("ue"),
  Log_1 = require("../../../../Core/Common/Log"),
  EventDefine_1 = require("../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../Common/Event/EventSystem"),
  ControllerHolder_1 = require("../../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  UiTickViewBase_1 = require("../../../Ui/Base/UiTickViewBase"),
  ButtonAndSpriteItem_1 = require("../../Common/Button/ButtonAndSpriteItem"),
  LoopScrollView_1 = require("../../Util/ScrollView/LoopScrollView"),
  OnlineController_1 = require("../OnlineController"),
  OnlineHallItem_1 = require("./OnlineHallItem");
class OnlineSearchView extends UiTickViewBase_1.UiTickViewBase {
  constructor() {
    super(...arguments),
      (this.s9t = void 0),
      (this.a9t = void 0),
      (this.sOi = () => {
        this.u8t();
      }),
      (this.oOi = () => new OnlineHallItem_1.OnlineHallItem(this.Info.Name)),
      (this.aOi = () => {
        var e,
          t,
          i = this.GetInputText(0);
        "" === i.GetText()
          ? ((t = ((e = ""), puerts_1.$ref)("")),
            UE.LGUIBPLibrary.ClipBoardPaste(t),
            (e = (0, puerts_1.$unref)(t)),
            i.SetText(e))
          : i.SetText(""),
          this.h9t();
      }),
      (this.h9t = () => {
        "" === this.GetInputText(0).GetText()
          ? this.a9t.RefreshSprite("SP_Paste")
          : this.a9t.RefreshSprite("SP_Clear");
      }),
      (this.l9t = () => {
        var e = this.GetInputText(0).GetText();
        0 < e.length
          ? OnlineController_1.OnlineController.LobbyQueryPlayersRequest(
              Number(e),
            )
          : ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode(
              "OnlineInvalidUserId",
            );
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UITextInputComponent],
      [1, UE.UIItem],
      [2, UE.UIButtonComponent],
      [3, UE.UILoopScrollViewComponent],
      [4, UE.UIItem],
      [5, UE.UIItem],
    ]),
      (this.BtnBindInfo = [[2, this.l9t]]);
  }
  OnStart() {
    (this.a9t = new ButtonAndSpriteItem_1.ButtonAndSpriteItem(this.GetItem(1))),
      this.a9t.BindCallback(this.aOi);
    var e = this.GetItem(4);
    (this.s9t = new LoopScrollView_1.LoopScrollView(
      this.GetLoopScrollViewComponent(3),
      e.GetOwner(),
      this.oOi,
    )),
      this.GetInputText(0).OnTextChange.Bind(this.h9t),
      this.u8t();
  }
  OnBeforeDestroy() {
    ModelManager_1.ModelManager.OnlineModel.CleanSearchResultList(),
      this.GetInputText(0).OnTextChange.Unbind();
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.OnSearchWorld,
      this.sOi,
    );
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.OnSearchWorld,
      this.sOi,
    );
  }
  u8t() {
    this.s9t.RefreshByData(
      ModelManager_1.ModelManager.OnlineModel.SearchResult,
      !1,
      () => {
        var e = this.s9t.UnsafeGetGridProxy(0);
        e &&
          Log_1.Log.CheckInfo() &&
          Log_1.Log.Info(
            "UiComponent",
            5,
            "OnlineSearchView_Item_Alpha:" + e.GetRootItem().GetAlpha(),
          );
      },
      !0,
    ),
      this.d9t();
  }
  d9t() {
    this.h9t(),
      this.GetItem(5).SetUIActive(
        ModelManager_1.ModelManager.OnlineModel.SearchResult.length <= 0,
      );
  }
}
exports.OnlineSearchView = OnlineSearchView;
//# sourceMappingURL=OnlineSearchView.js.map
