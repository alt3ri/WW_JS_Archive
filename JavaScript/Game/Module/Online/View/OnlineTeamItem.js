"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.OnlineTeamItem = void 0);
const UE = require("ue"),
  BackgroundCardById_1 = require("../../../../Core/Define/ConfigQuery/BackgroundCardById"),
  Protocol_1 = require("../../../../Core/Define/Net/Protocol"),
  StringUtils_1 = require("../../../../Core/Utils/StringUtils"),
  PlatformSdkManagerNew_1 = require("../../../../Launcher/Platform/PlatformSdk/PlatformSdkManagerNew"),
  EventDefine_1 = require("../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../Common/Event/EventSystem"),
  ConfigManager_1 = require("../../../Manager/ConfigManager"),
  ControllerHolder_1 = require("../../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  UiManager_1 = require("../../../Ui/UiManager"),
  PlayerTitleItem_1 = require("../../Common/PlayerTitleItem"),
  ConfirmBoxDefine_1 = require("../../ConfirmBox/ConfirmBoxDefine"),
  EditFormationDefine_1 = require("../../EditFormation/EditFormationDefine"),
  FriendController_1 = require("../../Friend/FriendController"),
  GridProxyAbstract_1 = require("../../Util/Grid/GridProxyAbstract"),
  LguiUtil_1 = require("../../Util/LguiUtil"),
  OnlineController_1 = require("../OnlineController");
class OnlineTeamItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments),
      (this.dOi = void 0),
      (this.COi = !1),
      (this.gLt = void 0),
      (this.gOi = () => {
        FriendController_1.FriendController.RequestFriendApplyAddSend(
          this.dOi.PlayerId,
          Protocol_1.Aki.Protocol.D6s.Proto_RecentlyTeam,
        ),
          (this.COi = !0);
      }),
      (this.DSi = () => {
        let e = void 0;
        (e = ModelManager_1.ModelManager.OnlineModel.GetIsMyTeam()
          ? new ConfirmBoxDefine_1.ConfirmBoxDataNew(100)
          : new ConfirmBoxDefine_1.ConfirmBoxDataNew(78)).FunctionMap.set(
          2,
          () => {
            OnlineController_1.OnlineController.LeaveWorldTeamRequest(
              this.dOi.PlayerId,
            );
          },
        ),
          ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(
            e,
          );
      }),
      (this.fOi = () => {
        var e = new ConfirmBoxDefine_1.ConfirmBoxDataNew(79);
        e.FunctionMap.set(2, () => {
          OnlineController_1.OnlineController.KickWorldTeamRequest(
            this.dOi.PlayerId,
          );
        }),
          ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(
            e,
          );
      }),
      (this.PNi = () => {
        (ModelManager_1.ModelManager.OnlineModel.CachePlayerData = this.dOi),
          UiManager_1.UiManager.OpenView("OnlineProcessView");
      }),
      (this.oZe = (e, i) => {
        this.dOi.PlayerId === e && this.pOi(i);
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
      [15, UE.UIButtonComponent],
      [16, UE.UIButtonComponent],
      [17, UE.UISprite],
      [18, UE.UIItem],
      [19, UE.UISprite],
      [21, UE.UITexture],
      [20, UE.UIItem],
      [22, UE.UIButtonComponent],
      [23, UE.UIItem],
      [24, UE.UIText],
      [25, UE.UIItem],
      [26, UE.UIItem],
    ]),
      (this.BtnBindInfo = [
        [14, this.gOi],
        [16, this.fOi],
        [22, this.PNi],
        [15, this.DSi],
      ]);
  }
  async OnBeforeStartAsync() {
    (this.gLt = new PlayerTitleItem_1.PlayerTitleItem()),
      await this.gLt.CreateThenShowByActorAsync(this.GetItem(26).GetOwner());
  }
  OnStart() {
    this.GetItem(18).SetUIActive(!1),
      this.GetItem(13).SetUIActive(!0),
      this.AddEventListener();
  }
  AddEventListener() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.OnRefreshPlayerPing,
      this.oZe,
    );
  }
  RemoveEventListener() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.OnRefreshPlayerPing,
      this.oZe,
    );
  }
  OnBeforeDestroy() {
    this.RemoveEventListener(), this.gLt?.Destroy(), (this.gLt = void 0);
  }
  Refresh(e, i, r) {
    this.GetButton(22).RootUIComp.SetRaycastTarget(
      e.PlayerId !== ModelManager_1.ModelManager.FunctionModel.PlayerId,
    );
    let t = !1,
      n = !1,
      o = !1,
      a = !1;
    (this.dOi = e).IsSelf
      ? (o = !0)
      : ModelManager_1.ModelManager.FriendModel.IsMyFriend(e.PlayerId)
        ? this.COi
          ? (t = ModelManager_1.ModelManager.OnlineModel.GetIsMyTeam())
          : ((t = ModelManager_1.ModelManager.OnlineModel.GetIsMyTeam()),
            (a = !0))
        : ((t = ModelManager_1.ModelManager.OnlineModel.GetIsMyTeam()),
          (n = !0)),
      this.GetButton(16).RootUIComp.SetUIActive(t),
      this.GetButton(14).RootUIComp.SetUIActive(n),
      this.GetButton(15).RootUIComp.SetUIActive(o),
      this.GetText(1).SetUIActive(a);
    var s = ModelManager_1.ModelManager.PersonalModel.GetPlayerHeadData(
        e.HeadId,
        !1,
      ),
      s =
        (s &&
          this.SetTextureByPath(s.GetRoleHeadIconLarge(), this.GetTexture(3)),
        ModelManager_1.ModelManager.FriendModel.IsMyFriend(e.PlayerId)),
      l = this.GetText(0),
      s =
        (s &&
        void 0 !==
          (s = ModelManager_1.ModelManager.FriendModel.GetFriendById(
            e.PlayerId,
          )?.FriendRemark) &&
        "" !== s
          ? LguiUtil_1.LguiUtil.SetLocalText(l, "NameMark", s)
          : l.SetText(e.GetRawName()),
        this.GetText(2).SetText("Lv." + e.Level),
        this.GetText(7));
    e.Signature && "" !== e.Signature
      ? s.SetText(e.Signature)
      : LguiUtil_1.LguiUtil.SetLocalText(s, "DefaultSign"),
      this.GetItem(20).SetUIActive(!0);
    let _ = void 0;
    _ =
      e.PlayerId === ModelManager_1.ModelManager.CreatureModel.GetPlayerId()
        ? EditFormationDefine_1.SELF_ONLINE_INDEX
        : EditFormationDefine_1.OTHER_ONLINE_INDEX;
    var l = this.GetSprite(17),
      s = StringUtils_1.StringUtils.Format(_, this.dOi.PlayerNumber.toString()),
      s = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(s),
      s =
        (s
          ? (l.SetUIActive(!0), this.SetSpriteByPath(s, l, !1))
          : l.SetUIActive(!1),
        this.pOi(e.PingState),
        e.PlayerDetails.ESs);
    0 < s &&
      ((l = BackgroundCardById_1.configBackgroundCardById.GetConfig(s)),
      this.SetTextureByPath(l.LongCardPath, this.GetTexture(21))),
      this.Nxa(e.GetOnlineName()),
      this.sPa(e.GetOnlineName()),
      this.gLt?.Refresh(e.PlayerTitleId, e.PlayerTitleStarLevel, e.Sex);
  }
  sPa(e) {
    !PlatformSdkManagerNew_1.PlatformSdkManagerNew.GetPlatformSdk()?.NeedShowThirdPartyId() ||
    (void 0 !== e && "" !== e)
      ? this.GetItem(25)?.SetUIActive(!1)
      : this.GetItem(25)?.SetUIActive(!0);
  }
  Nxa(e) {
    var i;
    PlatformSdkManagerNew_1.PlatformSdkManagerNew.GetPlatformSdk()?.NeedShowThirdPartyId()
      ? ((i = "" !== e && void 0 !== e),
        this.GetItem(23)?.SetUIActive(i),
        this.GetText(24)?.SetUIActive(i),
        i && ((i = e ?? ""), this.GetText(24)?.SetText(i)))
      : (this.GetItem(23)?.SetUIActive(!1), this.GetText(24)?.SetUIActive(!1));
  }
  pOi(e) {
    var i,
      r = this.GetSprite(19);
    r.SetUIActive(!0),
      e === Protocol_1.Aki.Protocol.r7s.Proto_UNKNOWN
        ? ((i =
            ConfigManager_1.ConfigManager.UiResourceConfig?.GetResourcePath(
              "SP_SignalUnknown",
            )),
          this.SetSpriteByPath(i, r, !1))
        : e === Protocol_1.Aki.Protocol.r7s.Proto_GREAT
          ? ((i =
              ConfigManager_1.ConfigManager.UiResourceConfig?.GetResourcePath(
                "SP_SignalGreat",
              )),
            this.SetSpriteByPath(i, r, !1))
          : e === Protocol_1.Aki.Protocol.r7s.Proto_GOOD
            ? ((i =
                ConfigManager_1.ConfigManager.UiResourceConfig?.GetResourcePath(
                  "SP_SignalGood",
                )),
              this.SetSpriteByPath(i, r, !1))
            : e === Protocol_1.Aki.Protocol.r7s.Proto_POOR &&
              ((i =
                ConfigManager_1.ConfigManager.UiResourceConfig?.GetResourcePath(
                  "SP_SignalPoor",
                )),
              this.SetSpriteByPath(i, r, !1));
  }
}
exports.OnlineTeamItem = OnlineTeamItem;
//# sourceMappingURL=OnlineTeamItem.js.map
