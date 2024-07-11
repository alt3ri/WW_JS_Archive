"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FriendApplyView = void 0);
const UE = require("ue"),
  Protocol_1 = require("../../../../Core/Define/Net/Protocol"),
  EventDefine_1 = require("../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../Common/Event/EventSystem"),
  TimeUtil_1 = require("../../../Common/TimeUtil"),
  ConfigManager_1 = require("../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  UiTickViewBase_1 = require("../../../Ui/Base/UiTickViewBase"),
  UiManager_1 = require("../../../Ui/UiManager"),
  LguiUtil_1 = require("../../Util/LguiUtil"),
  FriendController_1 = require("../FriendController");
var Proto_FriendApplyOperator = Protocol_1.Aki.Protocol.E5s;
class FriendApplyView extends UiTickViewBase_1.UiTickViewBase {
  constructor() {
    super(...arguments),
      (this.XFt = void 0),
      (this.pNi = void 0),
      (this.vNi = !1),
      (this.Lta = void 0),
      (this.MNi = () => {
        var e,
          i = ModelManager_1.ModelManager.FriendModel.GetApplyViewDataList(
            this.Lta,
          );
        i.length < 1
          ? UiManager_1.UiManager.CloseView("FriendMultipleApplyView")
          : 1 === i.length
            ? ((e = i[0].ApplyPlayerData),
              FriendController_1.FriendController.RequestFriendApplyHandle(
                [e.PlayerId],
                Proto_FriendApplyOperator.Proto_Approve,
              ))
            : UiManager_1.UiManager.IsViewOpen("FriendMultipleApplyView")
              ? UiManager_1.UiManager.CloseView("FriendMultipleApplyView")
              : UiManager_1.UiManager.OpenView("FriendMultipleApplyView", i);
      }),
      (this.uHe = () => {
        var e = ModelManager_1.ModelManager.FriendModel.GetApplyViewDataList(
          this.Lta,
        );
        e.length < 1
          ? UiManager_1.UiManager.CloseView("OnlineMultipleApplyView")
          : 1 === e.length &&
            ((e = e[0].ApplyPlayerData),
            FriendController_1.FriendController.RequestFriendApplyHandle(
              [e.PlayerId],
              Proto_FriendApplyOperator.Proto_Reject,
            ));
      }),
      (this.Dta = () => {
        this.Ata(), this.Og();
      }),
      (this.Xua = (e) => {
        this.Lta &&
          (-1 !== (e = this.Lta?.indexOf(e)) && this.Lta.splice(e, 1),
          this.Og());
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UITexture],
      [1, UE.UIText],
      [2, UE.UIButtonComponent],
      [3, UE.UIItem],
      [4, UE.UIItem],
      [5, UE.UIText],
      [6, UE.UISprite],
      [7, UE.UIText],
      [8, UE.UIButtonComponent],
    ]),
      (this.BtnBindInfo = [
        [2, this.MNi],
        [8, this.uHe],
      ]);
  }
  OnStart() {
    (this.Lta = this.OpenParam),
      (this.XFt = this.GetText(5)),
      (this.pNi = this.GetSprite(6)),
      this.Ata(),
      this.Og();
  }
  OnBeforeDestroy() {
    UiManager_1.UiManager.IsViewOpen("FriendMultipleApplyView") &&
      UiManager_1.UiManager.CloseView("FriendMultipleApplyView");
  }
  OnTick(e) {
    var i = ModelManager_1.ModelManager.FriendModel.GetApplyViewDataList(
      this.Lta,
    );
    0 === i.length || i[0].ApplyTimeLeftTime < 0
      ? this.vNi || (this.CloseMe(), (this.vNi = !0))
      : (this.XFt.SetText(
          TimeUtil_1.TimeUtil.GetCoolDown(i[0].ApplyTimeLeftTime),
        ),
        this.pNi.SetFillAmount(
          i[0].ApplyTimeLeftTime /
            ModelManager_1.ModelManager.FriendModel.ApplyCdTime,
        ));
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.RefreshFriendApplicationRedDot,
      this.Dta,
    ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.FriendOnMultiItemAction,
        this.Xua,
      );
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.RefreshFriendApplicationRedDot,
      this.Dta,
    ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.FriendOnMultiItemAction,
        this.Xua,
      );
  }
  Ata() {
    var e = ModelManager_1.ModelManager.FriendModel.GetApplyViewDataList(
      this.Lta,
    );
    if (0 !== e.length)
      for (const i of e)
        i.ApplyTimeLeftTime = TimeUtil_1.TimeUtil.GetServerTime();
  }
  Og() {
    var e,
      i,
      t,
      r = ModelManager_1.ModelManager.FriendModel.GetApplyViewDataList(
        this.Lta,
      );
    0 === r.length
      ? this.Hide()
      : ((e = this.GetItem(3)),
        (i = this.GetItem(4)),
        (t = this.GetText(7)),
        1 === r.length
          ? (e.SetUIActive(!0),
            i.SetUIActive(!1),
            LguiUtil_1.LguiUtil.SetLocalText(t, "TowerDefence_friendOnly"),
            this.GetButton(8)?.RootUIComp.SetUIActive(!0))
          : (e.SetUIActive(!1),
            i.SetUIActive(!0),
            LguiUtil_1.LguiUtil.SetLocalText(
              t,
              "TowerDefence_friendMore",
              r.length,
            ),
            this.GetButton(8)?.RootUIComp.SetUIActive(!1)),
        (i = (e = r[0]).ApplyPlayerData),
        this.GetText(1).SetText(i.PlayerName),
        this.XFt.SetText(TimeUtil_1.TimeUtil.GetCoolDown(e.ApplyTimeLeftTime)),
        this.pNi.SetFillAmount(
          e.ApplyTimeLeftTime /
            ModelManager_1.ModelManager.FriendModel.ApplyCdTime,
        ),
        (t = ConfigManager_1.ConfigManager.RoleConfig.GetRoleConfig(
          i.PlayerHeadPhoto,
        )?.Card) && this.SetTextureByPath(t, this.GetTexture(0)),
        this.GetButton(8)?.RootUIComp.SetUIActive(!0));
  }
}
exports.FriendApplyView = FriendApplyView;
//# sourceMappingURL=FriendApplyView.js.map
