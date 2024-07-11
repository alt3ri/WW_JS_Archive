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
      (this.LGi = void 0),
      (this.DGi = void 0),
      (this.Q2t = void 0),
      (this.RGi = void 0),
      (this.P$t = () => {
        this.LGi
          ? 0 < this.LGi.ApplyTimeLeftTime
            ? this.Q2t.SetText(
                TimeUtil_1.TimeUtil.GetCoolDown(this.LGi.ApplyTimeLeftTime),
              )
            : (this.UGi(!0),
              void 0 !== this.RGi && TimerSystem_1.TimerSystem.Remove(this.RGi),
              (this.RGi = void 0))
          : (void 0 !== this.RGi && TimerSystem_1.TimerSystem.Remove(this.RGi),
            (this.RGi = void 0));
      }),
      (this.AGi = () => {
        "OnlineWorldHallView" === this.DGi
          ? OnlineController_1.OnlineController.ApplyJoinWorldRequest(
              this.LGi.PlayerId,
              ModelManager_1.ModelManager.OnlineModel.ShowFriend
                ? Protocol_1.Aki.Protocol.z3s.Proto_QueryJoin
                : Protocol_1.Aki.Protocol.z3s.Proto_LobbyJoin,
            )
          : OnlineController_1.OnlineController.ApplyJoinWorldRequest(
              this.LGi.PlayerId,
              Protocol_1.Aki.Protocol.z3s.Proto_QueryJoin,
            ),
          this.LGi.SetApplyTime(
            TimeUtil_1.TimeUtil.GetServerTime() +
              ModelManager_1.ModelManager.OnlineModel.ApplyCd,
          ),
          this.UGi(!1),
          this.Q2t.SetText(
            TimeUtil_1.TimeUtil.GetCoolDown(this.LGi.ApplyTimeLeftTime),
          ),
          (this.RGi = TimerSystem_1.TimerSystem.Forever(
            this.P$t,
            TICK_INTERVAL_TIME,
          ));
      }),
      (this.PGi = () => {
        (ModelManager_1.ModelManager.OnlineModel.CachePlayerData = this.LGi),
          UiManager_1.UiManager.OpenView("OnlineProcessView");
      }),
      (this.DGi = i);
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
      [16, UE.UIButtonComponent],
      [18, UE.UIItem],
      [20, UE.UISprite],
      [21, UE.UIItem],
      [22, UE.UITexture],
      [23, UE.UIButtonComponent],
    ]),
      (this.BtnBindInfo = [
        [4, this.AGi],
        [23, this.PGi],
      ]);
  }
  OnStart() {
    this.GetText(1).SetUIActive(!1),
      this.GetSprite(20).SetUIActive(!1),
      this.GetButton(16).RootUIComp.SetUIActive(!1),
      (this.Q2t = this.GetText(11));
  }
  OnBeforeDestroy() {
    (this.LGi = void 0),
      (this.DGi = void 0) !== this.RGi &&
        TimerSystem_1.TimerSystem.Remove(this.RGi),
      (this.RGi = void 0);
  }
  Refresh(i, e, t) {
    (this.LGi = i),
      0 < this.LGi.ApplyTimeLeftTime
        ? (this.UGi(!1),
          (this.RGi = TimerSystem_1.TimerSystem.Forever(
            this.P$t,
            TICK_INTERVAL_TIME,
          )))
        : this.UGi(!0);
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
          ? r.SetText(i.Signature)
          : LguiUtil_1.LguiUtil.SetLocalText(r, "DefaultSign"),
        this.GetItem(21).SetUIActive(!0),
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
      l = this.GetText(9),
      r =
        (i.WorldLevel > s + r
          ? (a.SetInteractable(!1),
            (s = i.WorldLevel - r),
            LguiUtil_1.LguiUtil.SetLocalText(l, "ApplyBtnDisable", s))
          : (LguiUtil_1.LguiUtil.SetLocalText(l, "ApplyBtnEnable"),
            a.SetInteractable(!0)),
        i.PlayerCard);
    0 < r &&
      ((s = BackgroundCardById_1.configBackgroundCardById.GetConfig(r)),
      this.SetTextureByPath(s.LongCardPath, this.GetTexture(22)));
  }
  UGi(i) {
    this.GetButton(4).RootUIComp.SetUIActive(i),
      this.GetItem(12).SetUIActive(i),
      this.GetItem(10).SetUIActive(!i);
  }
}
exports.OnlineHallItem = OnlineHallItem;
//# sourceMappingURL=OnlineHallItem.js.map
