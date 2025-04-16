"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RogueIllustratedEventTabView = void 0);
const UE = require("ue"),
  RogueResCollectionByIdKey_1 = require("../../../../Core/Define/ConfigQuery/RogueResCollectionByIdKey"),
  RogueResGridEventById_1 = require("../../../../Core/Define/ConfigQuery/RogueResGridEventById"),
  Protocol_1 = require("../../../../Core/Define/Net/Protocol"),
  StringUtils_1 = require("../../../../Core/Utils/StringUtils"),
  EventDefine_1 = require("../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../Common/Event/EventSystem"),
  ConfigManager_1 = require("../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  UiTabViewBase_1 = require("../../../Ui/Base/UiTabViewBase"),
  ActivityManager_1 = require("../../Activity/ActivityManager"),
  SmallItemGrid_1 = require("../../Common/SmallItemGrid/SmallItemGrid"),
  ItemController_1 = require("../../Item/ItemController"),
  LguiUtil_1 = require("../../Util/LguiUtil"),
  LoopScrollView_1 = require("../../Util/ScrollView/LoopScrollView"),
  RogueIllustratedEventGrid_1 = require("./RogueIllustratedEventGrid");
class RogueIllustratedEventTabView extends UiTabViewBase_1.UiTabViewBase {
  constructor() {
    super(...arguments),
      (this.xqe = void 0),
      (this.cdi = []),
      (this.zT1 = 0),
      (this.Kci = void 0),
      (this.H5c = void 0),
      (this.cHe = () => {
        var e = new RogueIllustratedEventGrid_1.RogueIllustratedEventItem();
        return e.BindOnItemButtonClickedCallback(this.BTt), e;
      }),
      (this.BTt = (e, t) => {
        var i;
        this.Kci === e
          ? ((i = this.cdi.indexOf(e)),
            this.xqe.DeselectCurrentGridProxy(!1),
            this.xqe.SelectGridProxy(i))
          : this.Xpt(e);
      }),
      (this.W5c = () => {
        this.Kci &&
          (ModelManager_1.ModelManager.ActivityPermanentRogueModel.GetCollectItemState(
            this.Kci,
          ) !== Protocol_1.Aki.Protocol.zps.CMs
            ? ItemController_1.ItemController.OpenItemTipsByItemId(this.zT1)
            : ActivityManager_1.ActivityManager.GetActivityController(
                Protocol_1.Aki.Protocol.uks.Proto_RogueRes,
              ).RequestIllustrationAward([this.Kci]));
      }),
      (this.Q5c = () => {
        var e = this.Params.Config;
        (this.cdi = this.X5c(e)),
          this.xqe.UpdateData(this.cdi),
          this.xqe.DeselectCurrentGridProxy(),
          this.xqe.SelectGridProxy(this.cdi.indexOf(this.Kci)),
          this.RefreshItemTipsComp(this.Kci);
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UILoopScrollViewComponent],
      [1, UE.UIItem],
      [2, UE.UIText],
      [3, UE.UITexture],
      [4, UE.UIText],
      [5, UE.UIItem],
      [6, UE.UIButtonComponent],
      [7, UE.UIItem],
      [8, UE.UIItem],
      [9, UE.UIText],
      [10, UE.UITexture],
      [11, UE.UINiagara],
    ]),
      (this.BtnBindInfo = [[6, this.W5c]]);
  }
  async OnBeforeStartAsync() {
    (this.H5c = new SmallItemGrid_1.SmallItemGrid()),
      await this.H5c.CreateThenShowByActorAsync(this.GetItem(5).GetOwner()),
      this.H5c.BindOnCanExecuteChange(() => !1),
      this.H5c.BindOnExtendToggleClicked(this.W5c);
  }
  OnStart() {
    this.Vn1();
  }
  OnBeforeShow() {
    this.Y5c();
  }
  AddEventListener() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.PermanentRogueRewardUpdate,
      this.Q5c,
    );
  }
  RemoveEventListener() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.PermanentRogueRewardUpdate,
      this.Q5c,
    );
  }
  OnBeforeDestroy() {
    (this.Kci = void 0), (this.xqe = void 0), (this.H5c = void 0);
  }
  Vn1() {
    this.xqe = new LoopScrollView_1.LoopScrollView(
      this.GetLoopScrollViewComponent(0),
      this.GetItem(1).GetOwner(),
      this.cHe,
    );
  }
  Y5c() {
    var e = this.Params,
      t = e.Config,
      t =
        ((this.cdi = this.X5c(t)),
        this.xqe.RefreshByData(
          this.cdi,
          void 0,
          () => {
            var e =
              ModelManager_1.ModelManager.ActivityPermanentRogueModel.GetCollectItemState(
                this.cdi[0],
              );
            this.BTt(this.cdi[0], e);
          },
          !0,
        ),
        ModelManager_1.ModelManager.ActivityPermanentRogueModel.GetEventCount(
          e.Config?.Id ?? 0,
          1 === e.TabType,
        ));
    LguiUtil_1.LguiUtil.SetLocalTextNew(
      this.GetText(2),
      "RogueRes_UnlockProgress",
      t[0] + "/" + t[1],
    );
  }
  X5c(e) {
    let t = new Set();
    var i = 1 === this.Params.TabType,
      i =
        ((t = i
          ? ModelManager_1.ModelManager.ActivityPermanentRogueModel.GetNormalIndexSet(
              e,
            )
          : ModelManager_1.ModelManager.ActivityPermanentRogueModel.GetMapIndexSet(
              e,
            )),
        Array.from(t.values()));
    const s = (e) => {
      switch (e) {
        case Protocol_1.Aki.Protocol.zps.Z6n:
          return 2;
        case Protocol_1.Aki.Protocol.zps.CMs:
          return 0;
        default:
          return 1;
      }
    };
    return (
      i.sort((e, t) => {
        var i = s(
            ModelManager_1.ModelManager.ActivityPermanentRogueModel.GetCollectItemState(
              e,
            ),
          ),
          r = s(
            ModelManager_1.ModelManager.ActivityPermanentRogueModel.GetCollectItemState(
              t,
            ),
          );
        return i === r
          ? ((e =
              RogueResCollectionByIdKey_1.configRogueResCollectionByIdKey.GetConfig(
                e,
              )),
            (t =
              RogueResCollectionByIdKey_1.configRogueResCollectionByIdKey.GetConfig(
                t,
              )),
            e.SortId === t.SortId ? e.Id - t.Id : e.SortId - t.SortId)
          : i - r;
      }),
      i
    );
  }
  Xpt(e) {
    e && this.PCi(e);
  }
  PCi(e) {
    this.Kci && this.xqe.DeselectCurrentGridProxy();
    var t = this.cdi.indexOf(e);
    this.xqe.IsGridDisplaying(t) || this.xqe.ScrollToGridIndex(t),
      (this.Kci = e),
      this.xqe.SelectGridProxy(t, !0),
      this.xqe.RefreshGridProxy(t),
      this.RefreshItemTipsComp(e);
  }
  RefreshItemTipsComp(e) {
    var t =
        RogueResCollectionByIdKey_1.configRogueResCollectionByIdKey.GetConfig(
          e,
        ),
      i = t.Id,
      e =
        ModelManager_1.ModelManager.ActivityPermanentRogueModel.GetCollectItemState(
          e,
        ),
      i = RogueResGridEventById_1.configRogueResGridEventById.GetConfig(i),
      r = ConfigManager_1.ConfigManager.MapRogueConfig.GetRogueEventPlotById(
        i.Plot,
      ),
      r = ConfigManager_1.ConfigManager.MapRogueConfig.GetEventBgById(
        r.BgResource,
      ),
      r =
        0 === ModelManager_1.ModelManager.PlayerInfoModel?.GetPlayerGender()
          ? r.HandBookBgFemalePath
          : r.HandBookBgPath;
    this.SetTextureByPath(r, this.GetTexture(3)),
      e !== Protocol_1.Aki.Protocol.zps.Z6n
        ? ((r = (StringUtils_1.StringUtils.IsBlank(t.Desc) ? i : t).Desc),
          this.GetItem(7)?.SetUIActive(!1),
          LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(4), r ?? ""))
        : (this.GetItem(7)?.SetUIActive(!0),
          LguiUtil_1.LguiUtil.SetLocalTextNew(
            this.GetText(4),
            "RogueRes_CollectionEventLock",
          )),
      e === Protocol_1.Aki.Protocol.zps.ovs
        ? this.GetItem(8)?.SetUIActive(!1)
        : (this.GetItem(8)?.SetUIActive(!0),
          this.J5c(t.Award, e === Protocol_1.Aki.Protocol.zps.Z6n));
  }
  J5c(e, t) {
    e = ConfigManager_1.ConfigManager.RewardConfig.GetDropPackage(e);
    if (!e) return !1;
    for (const r of e.DropPreview) {
      var i = {
        Data: void 0,
        Type: 4,
        ItemConfigId: r[0],
        BottomText: r[1].toString(),
      };
      (this.zT1 = r[0]),
        this.H5c.Apply(i),
        this.H5c.SetLockBlackVisible(t),
        this.H5c.SetReceivableVisible(!t);
      break;
    }
    (e = t ? "RogueRes_Lock" : "RogueRes_Unlock"),
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(9), e),
      this.GetButton(6)?.RootUIComp.SetUIActive(!t),
      (e = this.GetTexture(10).changeColor);
    return (
      this.GetTexture(10).SetChangeColor(!t, e),
      this.GetUiNiagara(11).GetIsActive() && !t
        ? this.GetUiNiagara(11).ActivateSystem(!0)
        : this.GetUiNiagara(11).SetUIActive(!t),
      !0
    );
  }
}
exports.RogueIllustratedEventTabView = RogueIllustratedEventTabView;
//# sourceMappingURL=RogueIllustratedEventTabView.js.map
