"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RogueIllustratedTokenTabView = void 0);
const UE = require("ue"),
  RogueResBuffPoolById_1 = require("../../../../Core/Define/ConfigQuery/RogueResBuffPoolById"),
  RogueResCollectionByIdKey_1 = require("../../../../Core/Define/ConfigQuery/RogueResCollectionByIdKey"),
  Protocol_1 = require("../../../../Core/Define/Net/Protocol"),
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
  RogueIllustratedTokenData_1 = require("../ItemData/RogueIllustratedTokenData"),
  RogueIllustratedTokenItem_1 = require("./RogueIllustratedTokenItem"),
  RogueIllustratedTokenMediumItemGrid_1 = require("./RogueIllustratedTokenMediumItemGrid");
class RogueIllustratedTokenTabView extends UiTabViewBase_1.UiTabViewBase {
  constructor() {
    super(...arguments),
      (this.JPt = void 0),
      (this.cdi = []),
      (this.Kci = void 0),
      (this.zT1 = 0),
      (this.xKt = void 0),
      (this.H5c = void 0),
      (this.cHe = () => {
        var e =
          new RogueIllustratedTokenMediumItemGrid_1.RogueIllustratedTokenMediumItemGrid();
        return e.BindOnItemButtonClickedCallback(this.BTt), e;
      }),
      (this.BTt = (e) => {
        var t;
        this.Kci === e
          ? ((t = this.cdi.indexOf(e)),
            this.JPt.DeselectCurrentGridProxy(!1),
            this.JPt.SelectGridProxy(t))
          : this.Xpt(e);
      }),
      (this.$5c = () => {
        var e = this.Params.Config,
          t = [];
        for (const i of ModelManager_1.ModelManager.ActivityPermanentRogueModel.GetTokenIndexSet(
          e,
        ))
          ModelManager_1.ModelManager.ActivityPermanentRogueModel.GetCollectItemState(
            i,
          ) === Protocol_1.Aki.Protocol.zps.CMs && t.push(i);
        ActivityManager_1.ActivityManager.GetActivityController(
          Protocol_1.Aki.Protocol.uks.Proto_RogueRes,
        ).RequestIllustrationAward(t);
      }),
      (this.W5c = () => {
        this.Kci &&
          (ModelManager_1.ModelManager.ActivityPermanentRogueModel.GetCollectItemState(
            this.Kci.GetCollectionIndex(),
          ) !== Protocol_1.Aki.Protocol.zps.CMs
            ? ItemController_1.ItemController.OpenItemTipsByItemId(this.zT1)
            : ActivityManager_1.ActivityManager.GetActivityController(
                Protocol_1.Aki.Protocol.uks.Proto_RogueRes,
              ).RequestIllustrationAward([this.Kci.GetCollectionIndex()]));
      }),
      (this.Q5c = () => {
        this.K5c();
        var e = this.Params.Config,
          t = this.Kci?.GetConfigId();
        this.cdi = this.X5c(e);
        for (const i of this.cdi)
          if (t === i.GetConfigId()) {
            this.Kci = i;
            break;
          }
        this.JPt.UpdateData(this.cdi), this.PCi(this.Kci);
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UILoopScrollViewComponent],
      [1, UE.UIItem],
      [2, UE.UIButtonComponent],
      [3, UE.UIText],
      [4, UE.UIItem],
      [5, UE.UIItem],
      [6, UE.UIButtonComponent],
      [7, UE.UIItem],
      [8, UE.UIText],
      [9, UE.UITexture],
      [10, UE.UINiagara],
    ]),
      (this.BtnBindInfo = [
        [2, this.$5c],
        [6, this.W5c],
      ]);
  }
  async OnBeforeStartAsync() {
    this.nCi(),
      (this.H5c = new SmallItemGrid_1.SmallItemGrid()),
      await this.H5c.CreateThenShowByActorAsync(this.GetItem(4).GetOwner()),
      this.H5c.BindOnCanExecuteChange(() => !1),
      this.H5c.BindOnExtendToggleClicked(this.W5c),
      (this.xKt = new RogueIllustratedTokenItem_1.RogueIllustratedTokenItem()),
      await this.xKt.CreateThenShowByActorAsync(this.GetItem(1).GetOwner());
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
  OnStart() {
    this.K5c();
  }
  OnBeforeDestroy() {
    (this.Kci = void 0), (this.JPt = void 0), (this.H5c = void 0);
  }
  nCi() {
    this.JPt = new LoopScrollView_1.LoopScrollView(
      this.GetLoopScrollViewComponent(0),
      this.GetItem(7).GetOwner(),
      this.cHe,
    );
  }
  Y5c() {
    var e = this.Params.Config,
      e =
        ((this.cdi = this.X5c(e)),
        this.JPt.RefreshByData(
          this.cdi,
          void 0,
          () => {
            this.BTt(this.cdi[0]);
          },
          !0,
        ),
        ModelManager_1.ModelManager.ActivityPermanentRogueModel.GetTokenCount(
          e ? e.Id : 0,
        ));
    LguiUtil_1.LguiUtil.SetLocalTextNew(
      this.GetText(3),
      "RogueRes_UnlockProgress",
      e[0] + "/" + e[1],
    );
  }
  X5c(e) {
    var e =
        ModelManager_1.ModelManager.ActivityPermanentRogueModel.GetTokenIndexSet(
          e,
        ),
      t = [],
      e = Array.from(e.values());
    const a = (e) => {
      switch (e) {
        case Protocol_1.Aki.Protocol.zps.Z6n:
          return 2;
        case Protocol_1.Aki.Protocol.zps.CMs:
          return 0;
        default:
          return 1;
      }
    };
    e.sort((e, t) => {
      var i,
        o,
        r = a(
          ModelManager_1.ModelManager.ActivityPermanentRogueModel.GetCollectItemState(
            e,
          ),
        ),
        s = a(
          ModelManager_1.ModelManager.ActivityPermanentRogueModel.GetCollectItemState(
            t,
          ),
        );
      return r === s
        ? ((e =
            RogueResCollectionByIdKey_1.configRogueResCollectionByIdKey.GetConfig(
              e,
            )),
          (t =
            RogueResCollectionByIdKey_1.configRogueResCollectionByIdKey.GetConfig(
              t,
            )),
          (i = RogueResBuffPoolById_1.configRogueResBuffPoolById.GetConfig(
            e.Id,
          )),
          (o = RogueResBuffPoolById_1.configRogueResBuffPoolById.GetConfig(
            t.Id,
          )),
          i?.Quality === o?.Quality
            ? e.SortId === t.SortId
              ? e.Id - t.Id
              : e.SortId - t.SortId
            : o.Quality - i.Quality)
        : r - s;
    });
    for (const o of e) {
      var i = this.z5c(o);
      t.push(i);
    }
    return t;
  }
  Xpt(e) {
    e && this.PCi(e);
  }
  PCi(e) {
    this.Kci && this.JPt.DeselectCurrentGridProxy();
    var t = this.cdi.indexOf(e),
      t =
        (this.JPt.IsGridDisplaying(t) || this.JPt.ScrollToGridIndex(t),
        (this.Kci = e),
        this.JPt.SelectGridProxy(t, !0),
        this.JPt.RefreshGridProxy(t),
        this.RefreshItemTipsComp(e),
        RogueResCollectionByIdKey_1.configRogueResCollectionByIdKey.GetConfig(
          e.GetCollectionIndex(),
        )),
      e =
        ModelManager_1.ModelManager.ActivityPermanentRogueModel.GetCollectItemState(
          t.IdKey,
        ),
      i = this.GetItem(5);
    e === Protocol_1.Aki.Protocol.zps.ovs
      ? i.SetUIActive(!1)
      : i.SetUIActive(this.J5c(t.Award, e === Protocol_1.Aki.Protocol.zps.Z6n));
  }
  RefreshItemTipsComp(e) {
    e =
      ModelManager_1.ModelManager.ActivityPermanentRogueModel.GetTokenTipsData(
        e.GetConfigId(),
      );
    this.xKt?.Refresh(e, !0, 0);
  }
  z5c(e) {
    var t =
        RogueResCollectionByIdKey_1.configRogueResCollectionByIdKey.GetConfig(
          e,
        ),
      i =
        ModelManager_1.ModelManager.ActivityPermanentRogueModel?.GetCollectItemState(
          e,
        ),
      t = {
        ConfigId: t.Id,
        CollectionIndex: e,
        IsLock: i === Protocol_1.Aki.Protocol.zps.Z6n,
        HasRedDot: i === Protocol_1.Aki.Protocol.zps.CMs,
        IsSelectOn: !1,
      };
    return new RogueIllustratedTokenData_1.RogueTokenViewData(t);
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
    var e = t ? "RogueRes_Lock" : "RogueRes_Unlock",
      o = this.GetTexture(9).changeColor;
    return (
      this.GetTexture(9).SetChangeColor(!t, o),
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(8), e),
      this.GetButton(6)?.RootUIComp.SetUIActive(!t),
      this.GetUiNiagara(10).GetIsActive() && !t
        ? this.GetUiNiagara(10).ActivateSystem(!0)
        : this.GetUiNiagara(10).SetUIActive(!t),
      !0
    );
  }
  K5c() {
    var e = this.Params.Config,
      e =
        ModelManager_1.ModelManager.ActivityPermanentRogueModel.GetHaveTokenAward(
          e ? e.Id : 0,
        );
    this.GetButton(2)?.RootUIComp.SetUIActive(e);
  }
}
exports.RogueIllustratedTokenTabView = RogueIllustratedTokenTabView;
//# sourceMappingURL=RogueIllustratedTokenTabView.js.map
