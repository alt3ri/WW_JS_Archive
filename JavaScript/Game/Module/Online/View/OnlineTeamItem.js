"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.OnlineTeamItem = void 0);
const UE = require("ue");
const BackgroundCardById_1 = require("../../../../Core/Define/ConfigQuery/BackgroundCardById");
const Protocol_1 = require("../../../../Core/Define/Net/Protocol");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiManager_1 = require("../../../Ui/UiManager");
const ConfirmBoxDefine_1 = require("../../ConfirmBox/ConfirmBoxDefine");
const FriendController_1 = require("../../Friend/FriendController");
const GridProxyAbstract_1 = require("../../Util/Grid/GridProxyAbstract");
const LguiUtil_1 = require("../../Util/LguiUtil");
const OnlineController_1 = require("../OnlineController");
class OnlineTeamItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments),
      (this.dNi = void 0),
      (this.CNi = !1),
      (this.gNi = () => {
        if (this.dNi.IsSelf) {
          let e = void 0;
          (e = ModelManager_1.ModelManager.OnlineModel.GetIsMyTeam()
            ? new ConfirmBoxDefine_1.ConfirmBoxDataNew(100)
            : new ConfirmBoxDefine_1.ConfirmBoxDataNew(78)).FunctionMap.set(
            2,
            () => {
              OnlineController_1.OnlineController.LeaveWorldTeamRequest(
                this.dNi.PlayerId,
              );
            },
          ),
            ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(
              e,
            );
        } else {
          FriendController_1.FriendController.RequestFriendApplyAddSend(
            this.dNi.PlayerId,
            Protocol_1.Aki.Protocol.wks.Proto_RecentlyTeam,
          ),
            (this.CNi = !0);
          const e = this.GetText(19);
          const i = this.GetInteractionGroup(15);
          LguiUtil_1.LguiUtil.SetLocalText(e, "HaveApplyFriend"),
            i.SetInteractable(!1);
        }
      }),
      (this.fNi = () => {
        const e = new ConfirmBoxDefine_1.ConfirmBoxDataNew(79);
        e.FunctionMap.set(2, () => {
          OnlineController_1.OnlineController.KickWorldTeamRequest(
            this.dNi.PlayerId,
          );
        }),
          ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(
            e,
          );
      }),
      (this.PGi = () => {
        (ModelManager_1.ModelManager.OnlineModel.CachePlayerData = this.dNi),
          UiManager_1.UiManager.OpenView("OnlineProcessView");
      }),
      (this.WJe = (e, i) => {
        this.dNi.PlayerId === e && this.pNi(i);
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIText],
      [1, UE.UIText],
      [2, UE.UIText],
      [3, UE.UITexture],
      [7, UE.UIText],
      [13, UE.UIItem],
      [14, UE.UIButtonComponent],
      [15, UE.UIInteractionGroup],
      [16, UE.UIButtonComponent],
      [17, UE.UISprite],
      [18, UE.UIItem],
      [19, UE.UIText],
      [20, UE.UISprite],
      [22, UE.UITexture],
      [21, UE.UIItem],
      [23, UE.UIButtonComponent],
    ]),
      (this.BtnBindInfo = [
        [14, this.gNi],
        [16, this.fNi],
        [23, this.PGi],
      ]);
  }
  OnStart() {
    this.GetItem(18).SetUIActive(!1),
      this.GetItem(13).SetUIActive(!0),
      this.AddEventListener();
  }
  AddEventListener() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.OnRefreshPlayerPing,
      this.WJe,
    );
  }
  RemoveEventListener() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.OnRefreshPlayerPing,
      this.WJe,
    );
  }
  OnBeforeDestroy() {
    this.RemoveEventListener();
  }
  Refresh(e, i, r) {
    this.GetButton(23).RootUIComp.SetRaycastTarget(
      e.PlayerId !== ModelManager_1.ModelManager.FunctionModel.PlayerId,
    ),
      (this.dNi = e);
    let n = !1;
    let t = void 0;
    let o = !1;
    (o = e.IsSelf
      ? ((n = !1), (t = "ExitWorld"), !0)
      : ModelManager_1.ModelManager.FriendModel.IsMyFriend(e.PlayerId)
        ? ((t = this.CNi
            ? ((n = ModelManager_1.ModelManager.OnlineModel.GetIsMyTeam()),
              "HaveApplyFriend")
            : ((n = ModelManager_1.ModelManager.OnlineModel.GetIsMyTeam()),
              "IsMyFriend")),
          !1)
        : ((n = ModelManager_1.ModelManager.OnlineModel.GetIsMyTeam()),
          (t = "ApplyFriend"),
          !0)),
      this.GetButton(16).RootUIComp.SetUIActive(n),
      this.GetButton(14).RootUIComp.SetUIActive(o),
      this.GetText(1).SetUIActive(!o);
    var a = o ? 19 : 1;
    var a =
      (LguiUtil_1.LguiUtil.SetLocalText(this.GetText(a), t),
      ConfigManager_1.ConfigManager.RoleConfig.GetRoleConfig(e.HeadId)
        ?.RoleHeadIconBig);
    var a =
      (a && this.SetTextureByPath(a, this.GetTexture(3)),
      ModelManager_1.ModelManager.FriendModel.IsMyFriend(e.PlayerId));
    var s = this.GetText(0);
    var a =
      (a &&
      void 0 !==
        (a = ModelManager_1.ModelManager.FriendModel.GetFriendById(
          e.PlayerId,
        )?.FriendRemark) &&
      a !== ""
        ? LguiUtil_1.LguiUtil.SetLocalText(s, "NameMark", a)
        : s.SetText(e.Name),
      this.GetText(2).SetText("Lv." + e.Level),
      this.GetText(7));
    var s =
      (e.Signature && e.Signature !== ""
        ? a.SetText(e.Signature)
        : LguiUtil_1.LguiUtil.SetLocalText(a, "DefaultSign"),
      this.GetItem(21).SetUIActive(!0),
      this.GetSprite(17));
    var a =
      (this.dNi.PlayerNumber === 1
        ? (s.SetUIActive(!0),
          (a =
            ConfigManager_1.ConfigManager.UiResourceConfig?.GetResourcePath(
              "SP_Online1PIcon",
            )),
          this.SetSpriteByPath(a, s, !1))
        : this.dNi.PlayerNumber === 2
          ? (s.SetUIActive(!0),
            (a =
              ConfigManager_1.ConfigManager.UiResourceConfig?.GetResourcePath(
                "SP_Online2PIcon",
              )),
            this.SetSpriteByPath(a, s, !1))
          : this.dNi.PlayerNumber === 3
            ? (s.SetUIActive(!0),
              (a =
                ConfigManager_1.ConfigManager.UiResourceConfig?.GetResourcePath(
                  "SP_Online3PIcon",
                )),
              this.SetSpriteByPath(a, s, !1))
            : s.SetUIActive(!1),
      this.pNi(e.PingState),
      e.PlayerDetails.zgs);
    a > 0 &&
      ((s = BackgroundCardById_1.configBackgroundCardById.GetConfig(a)),
      this.SetTextureByPath(s.LongCardPath, this.GetTexture(22)));
  }
  pNi(e) {
    let i;
    const r = this.GetSprite(20);
    r.SetUIActive(!0),
      e === Protocol_1.Aki.Protocol.oFs.Proto_UNKNOWN
        ? ((i =
            ConfigManager_1.ConfigManager.UiResourceConfig?.GetResourcePath(
              "SP_SignalUnknown",
            )),
          this.SetSpriteByPath(i, r, !1))
        : e === Protocol_1.Aki.Protocol.oFs.Proto_GREAT
          ? ((i =
              ConfigManager_1.ConfigManager.UiResourceConfig?.GetResourcePath(
                "SP_SignalGreat",
              )),
            this.SetSpriteByPath(i, r, !1))
          : e === Protocol_1.Aki.Protocol.oFs.Proto_GOOD
            ? ((i =
                ConfigManager_1.ConfigManager.UiResourceConfig?.GetResourcePath(
                  "SP_SignalGood",
                )),
              this.SetSpriteByPath(i, r, !1))
            : e === Protocol_1.Aki.Protocol.oFs.Proto_POOR &&
              ((i =
                ConfigManager_1.ConfigManager.UiResourceConfig?.GetResourcePath(
                  "SP_SignalPoor",
                )),
              this.SetSpriteByPath(i, r, !1));
  }
}
exports.OnlineTeamItem = OnlineTeamItem;
// # sourceMappingURL=OnlineTeamItem.js.map
