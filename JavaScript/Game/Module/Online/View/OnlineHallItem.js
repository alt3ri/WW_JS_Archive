"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.OnlineHallItem = void 0);
const UE = require("ue"),
  BackgroundCardById_1 = require("../../../../Core/Define/ConfigQuery/BackgroundCardById"),
  Protocol_1 = require("../../../../Core/Define/Net/Protocol"),
  TimerSystem_1 = require("../../../../Core/Timer/TimerSystem"),
  TimeUtil_1 = require("../../../Common/TimeUtil"),
  ConfigManager_1 = require("../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  UiManager_1 = require("../../../Ui/UiManager"),
  GridProxyAbstract_1 = require("../../Util/Grid/GridProxyAbstract"),
  LguiUtil_1 = require("../../Util/LguiUtil"),
  OnlineController_1 = require("../OnlineController"),
  TICK_INTERVAL_TIME = 100;
class OnlineHallItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor(i) {
    super(),
      (this.LNi = void 0),
      (this.DNi = void 0),
      (this.XFt = void 0),
      (this.RNi = void 0),
      (this.PYt = () => {
        this.LNi
          ? 0 < this.LNi.ApplyTimeLeftTime
            ? this.XFt.SetText(
                TimeUtil_1.TimeUtil.GetCoolDown(this.LNi.ApplyTimeLeftTime),
              )
            : (this.UNi(!0),
              void 0 !== this.RNi && TimerSystem_1.TimerSystem.Remove(this.RNi),
              (this.RNi = void 0))
          : (void 0 !== this.RNi && TimerSystem_1.TimerSystem.Remove(this.RNi),
            (this.RNi = void 0));
      }),
      (this.ANi = () => {
        "OnlineWorldHallView" === this.DNi
          ? OnlineController_1.OnlineController.ApplyJoinWorldRequest(
              this.LNi.PlayerId,
              ModelManager_1.ModelManager.OnlineModel.ShowFriend ||
                ModelManager_1.ModelManager.OnlineModel.HallViewIsShowSearching
                ? Protocol_1.Aki.Protocol.J8s.Proto_QueryJoin
                : Protocol_1.Aki.Protocol.J8s.Proto_LobbyJoin,
            )
          : OnlineController_1.OnlineController.ApplyJoinWorldRequest(
              this.LNi.PlayerId,
              Protocol_1.Aki.Protocol.J8s.Proto_QueryJoin,
            ),
          this.LNi.SetApplyTime(
            TimeUtil_1.TimeUtil.GetServerTime() +
              ModelManager_1.ModelManager.OnlineModel.ApplyCd,
          ),
          this.UNi(!1),
          this.XFt.SetText(
            TimeUtil_1.TimeUtil.GetCoolDown(this.LNi.ApplyTimeLeftTime),
          ),
          (this.RNi = TimerSystem_1.TimerSystem.Forever(
            this.PYt,
            TICK_INTERVAL_TIME,
          ));
      }),
      (this.PNi = () => {
        (ModelManager_1.ModelManager.OnlineModel.CachePlayerData = this.LNi),
          UiManager_1.UiManager.OpenView("OnlineProcessView");
      }),
      (this.DNi = i);
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIText],
      [1, UE.UIText],
      [2, UE.UIText],
      [3, UE.UITexture],
      [4, UE.UIButtonComponent],
      [5, UE.UIItem],
      [6, UE.UIItem],
      [7, UE.UIText],
      [8, UE.UIInteractionGroup],
      [9, UE.UIText],
      [10, UE.UIItem],
      [11, UE.UIText],
      [12, UE.UIItem],
      [13, UE.UIItem],
      [14, UE.UIButtonComponent],
      [15, UE.UIButtonComponent],
      [16, UE.UIButtonComponent],
      [18, UE.UIItem],
      [19, UE.UISprite],
      [20, UE.UIItem],
      [21, UE.UITexture],
      [22, UE.UIButtonComponent],
    ]),
      (this.BtnBindInfo = [
        [4, this.ANi],
        [22, this.PNi],
      ]);
  }
  OnStart() {
    this.GetText(1).SetUIActive(!1),
      this.GetSprite(19).SetUIActive(!1),
      this.GetButton(16).RootUIComp.SetUIActive(!1),
      this.GetButton(14).RootUIComp.SetUIActive(!1),
      this.GetButton(15).RootUIComp.SetUIActive(!1),
      this.GetItem(18).SetUIActive(!0),
      (this.XFt = this.GetText(11));
  }
  OnBeforeDestroy() {
    (this.LNi = void 0),
      (this.DNi = void 0) !== this.RNi &&
        TimerSystem_1.TimerSystem.Remove(this.RNi),
      (this.RNi = void 0);
  }
  Refresh(i, t, e) {
    (this.LNi = i),
      0 < this.LNi.ApplyTimeLeftTime
        ? (this.UNi(!1),
          (this.RNi = TimerSystem_1.TimerSystem.Forever(
            this.PYt,
            TICK_INTERVAL_TIME,
          )))
        : this.UNi(!0);
    var r = ConfigManager_1.ConfigManager.RoleConfig.GetRoleConfig(
        i.HeadId,
      )?.RoleHeadIconBig,
      r =
        (r && this.SetTextureByPath(r, this.GetTexture(3)),
        ModelManager_1.ModelManager.FriendModel.IsMyFriend(i.PlayerId)),
      s = this.GetText(0),
      r =
        (r &&
        void 0 !==
          (r = ModelManager_1.ModelManager.FriendModel.GetFriendById(
            i.PlayerId,
          )?.FriendRemark) &&
        "" !== r
          ? LguiUtil_1.LguiUtil.SetLocalText(s, "NameMark", r)
          : s.SetText(i.Name),
        this.GetText(2).SetText("Lv." + i.Level),
        this.GetText(7)),
      o =
        (i.Signature && "" !== i.Signature
          ? (r.SetText(i.Signature), this.GetItem(20).SetUIActive(!0))
          : this.GetItem(20).SetUIActive(!1),
        this.GetItem(5)),
      h = this.GetItem(6);
    switch (i.PlayerCount) {
      case 2:
        o.SetUIActive(!0), h.SetUIActive(!1);
        break;
      case 3:
        o.SetUIActive(!0), h.SetUIActive(!0);
        break;
      default:
        o.SetUIActive(!1), h.SetUIActive(!1);
    }
    var s = ModelManager_1.ModelManager.WorldLevelModel.OriginWorldLevel,
      r = ModelManager_1.ModelManager.OnlineModel.EnterDiff,
      a = this.GetInteractionGroup(8),
      n = this.GetText(9),
      r =
        (i.WorldLevel > s + r
          ? (a.SetInteractable(!1),
            (s = i.WorldLevel - r),
            LguiUtil_1.LguiUtil.SetLocalText(n, "ApplyBtnDisable", s))
          : (LguiUtil_1.LguiUtil.SetLocalText(n, "ApplyBtnEnable"),
            a.SetInteractable(!0)),
        i.PlayerCard);
    0 < r &&
      ((s = BackgroundCardById_1.configBackgroundCardById.GetConfig(r)),
      this.SetTextureByPath(s.LongCardPath, this.GetTexture(21)));
  }
  UNi(i) {
    this.GetButton(4).RootUIComp.SetUIActive(i),
      this.GetItem(12).SetUIActive(i),
      this.GetItem(10).SetUIActive(!i);
  }
}
exports.OnlineHallItem = OnlineHallItem;
//# sourceMappingURL=OnlineHallItem.js.map
