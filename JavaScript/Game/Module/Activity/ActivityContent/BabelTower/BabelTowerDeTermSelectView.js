"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.BabelTowerDeTermSelectView = void 0);
const UE = require("ue"),
  EventDefine_1 = require("../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../Common/Event/EventSystem"),
  ConfigManager_1 = require("../../../../Manager/ConfigManager"),
  ControllerHolder_1 = require("../../../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  RedDotController_1 = require("../../../../RedDot/RedDotController"),
  UiViewBase_1 = require("../../../../Ui/Base/UiViewBase"),
  PopupCaptionItem_1 = require("../../../../Ui/Common/PopupCaptionItem"),
  UiManager_1 = require("../../../../Ui/UiManager"),
  ConfirmBoxDefine_1 = require("../../../ConfirmBox/ConfirmBoxDefine"),
  ScrollingTipsController_1 = require("../../../ScrollingTips/ScrollingTipsController"),
  LguiUtil_1 = require("../../../Util/LguiUtil"),
  GenericScrollViewNew_1 = require("../../../Util/ScrollView/GenericScrollViewNew"),
  BabelTowerController_1 = require("./BabelTowerController"),
  BabelTowerDeTermSelectDesItem_1 = require("./BabelTowerDeTermSelectDesItem"),
  BabelTowerDeTermSelectItem_1 = require("./BabelTowerDeTermSelectItem");
class BabelTowerDeTermSelectView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments),
      (this.lqe = void 0),
      (this.yq = 0),
      (this.h1c = void 0),
      (this.l1c = []),
      (this._1c = void 0),
      (this.L3e = () => {
        const e = [];
        var r,
          t,
          i,
          o = ModelManager_1.ModelManager.BabelTowerModel.DeTermSelectInfo;
        let n = 0;
        for ([r, t] of o)
          2 === t && e.push(r),
            (2 !== t && 3 !== t) ||
              ((i =
                ConfigManager_1.ConfigManager.BabelTowerConfig.GetBabelTowerDeTerm(
                  r,
                )),
              (n += i.Star));
        n <
        ConfigManager_1.ConfigManager.BabelTowerConfig.GetBabelTowerLevelConfig(
          this.yq,
        ).PassStar
          ? ((o = new ConfirmBoxDefine_1.ConfirmBoxDataNew(
              277,
            )).FunctionMap.set(2, () => {
              this.c1c(e, n);
            }),
            ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(
              o,
            ))
          : this.c1c(e, n);
      }),
      (this.c1c = (e, o) => {
        BabelTowerController_1.BabelTowerController.SelectBabelActivityDeTermRequest(
          this.yq,
          e,
        ).then((e) => {
          if (e) {
            var e =
                ConfigManager_1.ConfigManager.BabelTowerConfig.GetBabelTowerLevelConfig(
                  this.yq,
                ),
              r =
                BabelTowerController_1.BabelTowerController.GetBabelTowerData(),
              r = (
                e.IsDifficult ? r.HardLevelDataMap : r.NormalLevelDataMap
              ).get(this.yq),
              t = [],
              i = r?.VX_ ?? [];
            for (let e = 0; e < 3; e++) i.length > e ? t.push(i[e]) : t.push(0);
            r = {
              BabelTowerLevelId: this.yq,
              InstanceId: e.InstId,
              RoleList: t,
              BuffList: r?.Dks ?? [-1, -1],
              BuffCount: e.OptionalBabelBuffNum,
              StarNumber: o,
            };
            UiManager_1.UiManager.OpenView("BabelTowerLevelInfoView", r);
          }
        });
      }),
      (this.Ud_ = () => {
        BabelTowerController_1.BabelTowerController.GetBabelTowerData().CheckIfInOpenTime()
          ? UiManager_1.UiManager.OpenView("BabelTowerQuestView")
          : ScrollingTipsController_1.ScrollingTipsController.ShowTipsByTextId(
              "BabelTowerIsNotOpen",
            );
      }),
      (this.u1c = () => {
        var e =
          ConfigManager_1.ConfigManager.BabelTowerConfig.GetBabelTowerLevelConfig(
            this.yq,
          );
        UiManager_1.UiManager.OpenView(
          "InstanceDungeonMonsterPreView",
          e.InstId,
        );
      }),
      (this.KAt = () => {
        var e = new ConfirmBoxDefine_1.ConfirmBoxDataNew(271);
        e.FunctionMap.set(2, () => {
          BabelTowerController_1.BabelTowerController.SelectBabelActivityDeTermRequest(
            this.yq,
            [],
          );
        }),
          ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(
            e,
          );
      }),
      (this.m1c = () => {
        return new BabelTowerDeTermSelectItem_1.BabelTowerDeTermSelectItem();
      }),
      (this.f1c = () => {
        var e =
          new BabelTowerDeTermSelectDesItem_1.BabelTowerDeTermSelectDesItem();
        return (e.OnClickCallBack = this.g1c), e;
      }),
      (this.C1c = (e) => {
        this.p1c(e);
      }),
      (this.g1c = (r) => {
        for (let e = 0; e < this.l1c.length; e++) {
          var t;
          this.l1c[e].AllDeTerm.includes(r) &&
            ((t = this.h1c.GetItemByIndex(e)),
            this.h1c.ScrollTo(t),
            this.h1c.GetScrollItemByIndex(e)?.PlayPositionSequence(r));
        }
      }),
      (this.I1c = () => {
        for (const e of this.h1c.GetScrollItemList()) e.ClearSelect();
        this.d1c();
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UIButtonComponent],
      [2, UE.UIScrollViewWithScrollbarComponent],
      [3, UE.UIItem],
      [4, UE.UIButtonComponent],
      [5, UE.UIScrollViewWithScrollbarComponent],
      [6, UE.UIItem],
      [14, UE.UIItem],
      [15, UE.UIText],
      [10, UE.UIText],
      [7, UE.UIItem],
      [8, UE.UIText],
      [9, UE.UIText],
      [11, UE.UIItem],
      [12, UE.UIText],
      [13, UE.UIArtText],
      [16, UE.UIButtonComponent],
      [17, UE.UIButtonComponent],
      [18, UE.UIText],
      [19, UE.UIItem],
      [20, UE.UIItem],
    ]),
      (this.BtnBindInfo = [
        [17, this.L3e],
        [4, this.KAt],
        [16, this.Ud_],
        [1, this.u1c],
      ]);
  }
  async OnBeforeStartAsync() {
    (this.lqe = new PopupCaptionItem_1.PopupCaptionItem()),
      await this.lqe.CreateThenShowByActorAsync(this.GetItem(0).GetOwner()),
      this.lqe.SetCloseCallBack(() => {
        this.CloseMe();
      }),
      (this.h1c = new GenericScrollViewNew_1.GenericScrollViewNew(
        this.GetScrollViewWithScrollbar(2),
        this.m1c,
      )),
      (this._1c = new GenericScrollViewNew_1.GenericScrollViewNew(
        this.GetScrollViewWithScrollbar(5),
        this.f1c,
      ));
  }
  OnStart() {
    RedDotController_1.RedDotController.BindRedDot(
      "BabelTowerQuestRedDot",
      this.GetItem(20),
    ),
      (this.yq = this.OpenParam),
      this.GetText(9).SetUIActive(!1),
      ModelManager_1.ModelManager.BabelTowerModel.DeTermSelectInfo.clear(),
      this.d1c(),
      this.GetScrollViewWithScrollbar(2)
        .Content.GetComponentByClass(UE.UIInturnAnimController.StaticClass())
        ?.Play(),
      this.GetScrollViewWithScrollbar(5)
        .Content.GetComponentByClass(UE.UIInturnAnimController.StaticClass())
        ?.Play();
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.BabelTowerRefreshLevelInfo,
      this.I1c,
    );
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.BabelTowerRefreshLevelInfo,
      this.I1c,
    );
  }
  OnBeforeShow() {
    this.Og();
  }
  OnBeforeDestroy() {
    RedDotController_1.RedDotController.UnBindGivenUi(
      "BabelTowerQuestRedDot",
      this.GetItem(20),
    );
  }
  Og() {
    var e,
      r =
        ConfigManager_1.ConfigManager.BabelTowerConfig.GetBabelTowerLevelConfig(
          this.yq,
        );
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(8), r.NameText),
      this.GetItem(19).SetUIActive(r.IsDifficult),
      r.IsDifficult
        ? ((e =
            BabelTowerController_1.BabelTowerController.GetBabelTowerData().HardLevelDataMap.get(
              this.yq,
            )?.jX_ ?? 0),
          this.GetText(10).SetText(e + ""),
          LguiUtil_1.LguiUtil.SetLocalTextNew(
            this.GetText(18),
            "BabelTowerHardStar",
          ))
        : (this.GetText(10).SetText(r.PassStar + ""),
          LguiUtil_1.LguiUtil.SetLocalTextNew(
            this.GetText(18),
            "BabelTowerNormalStar",
          ));
  }
  d1c() {
    var t =
        ConfigManager_1.ConfigManager.BabelTowerConfig.GetBabelTowerLevelConfig(
          this.yq,
        ),
      i =
        ((this.l1c = []),
        BabelTowerController_1.BabelTowerController.GetBabelTowerData()),
      o = i.GetDailyLevel().includes(this.yq) ? i.GetDailyDeTerm() : [];
    if (0 < t.FixBabelDeTermds?.length) {
      let e = [],
        r = ConfigManager_1.ConfigManager.BabelTowerConfig.GetBabelTowerDeTerm(
          t.FixBabelDeTermds[0],
        ).GroupId;
      for (const a of t.FixBabelDeTermds) {
        var n,
          s =
            ConfigManager_1.ConfigManager.BabelTowerConfig.GetBabelTowerDeTerm(
              a,
            );
        for (
          s.GroupId !== r &&
          ((n = {
            IsNecessary: !0,
            AllDeTerm: e,
            DailyDeTerm: o,
            OnChangeSelectDeTerm: this.C1c,
          }),
          this.l1c.push(n),
          (r = s.GroupId),
          (e = []));
          s.Star > e.length + 1;

        )
          e.push(0);
        e.push(a),
          ModelManager_1.ModelManager.BabelTowerModel.DeTermSelectInfo.set(
            a,
            3,
          );
      }
      i = {
        IsNecessary: !0,
        AllDeTerm: e,
        DailyDeTerm: o,
        OnChangeSelectDeTerm: this.C1c,
      };
      this.l1c.push(i);
    }
    var e = [];
    for (const l of t.BabelTowerDeTermMutexArray) {
      e = [];
      for (const h of ConfigManager_1.ConfigManager.BabelTowerConfig.GetBabelTowerDeTermMutual(
        l,
      ).MutexDeTermGroup)
        e.push(...this.v1c(h));
      var r = {
        IsNecessary: !1,
        AllDeTerm: e,
        DailyDeTerm: o,
        OnChangeSelectDeTerm: this.C1c,
      };
      this.l1c.push(r);
    }
    this.h1c?.RefreshByData(this.l1c), this.p1c();
  }
  v1c(e) {
    var r = BabelTowerController_1.BabelTowerController.GetBabelTowerData(),
      t = [],
      i = [];
    for (const s of ConfigManager_1.ConfigManager.BabelTowerConfig.GetBabelTowerDeTermByGroupId(
      e,
    ))
      i.push(s);
    i.sort((e, r) => (e.Line !== r.Line ? e.Line - r.Line : e.Star - r.Star));
    let o = 1,
      n = 1;
    for (const a of i) {
      for (n !== a.Line && ((n = a.Line), (o = 1)); a.Star > o; )
        t.push(0), o++;
      t.push(a.Id),
        r.GetDeTermIsLock(a.Id)
          ? ModelManager_1.ModelManager.BabelTowerModel.DeTermSelectInfo.set(
              a.Id,
              1,
            )
          : r.GetDeTermIsUse(this.yq, a.Id)
            ? ModelManager_1.ModelManager.BabelTowerModel.DeTermSelectInfo.set(
                a.Id,
                2,
              )
            : ModelManager_1.ModelManager.BabelTowerModel.DeTermSelectInfo.set(
                a.Id,
                0,
              ),
        o++;
    }
    for (; o <= 3; ) t.push(0), o++;
    return t;
  }
  p1c(r) {
    var e = [];
    let t = 0;
    for (const [r, s] of ModelManager_1.ModelManager.BabelTowerModel
      .DeTermSelectInfo)
      if (0 !== r && (2 === s || 3 === s)) {
        e.push(r);
        const o =
          ConfigManager_1.ConfigManager.BabelTowerConfig.GetBabelTowerDeTerm(r);
        t += o.Star;
      }
    e.sort((e, r) => {
      e = ConfigManager_1.ConfigManager.BabelTowerConfig.GetBabelTowerDeTerm(e);
      return (
        ConfigManager_1.ConfigManager.BabelTowerConfig.GetBabelTowerDeTerm(r)
          .Star - e.Star
      );
    }),
      this._1c?.RefreshByData(e, () => {
        if (r)
          for (const e of this._1c.GetScrollItemList())
            e.DeTermId === r &&
              (this._1c?.LateScrollTo(e.GetRootItem()), e.PlayChoseSequence());
      }),
      this.GetArtText(13).SetText((t < 10 ? "0" : "") + t);
    var i =
      t <
      ConfigManager_1.ConfigManager.BabelTowerConfig.GetBabelTowerLevelConfig(
        this.yq,
      ).PassStar;
    this.GetItem(11).SetUIActive(i), this.GetItem(7).SetUIActive(e.length <= 0);
    const o =
      ConfigManager_1.ConfigManager.BabelTowerConfig.GetBabelTowerLevelConfig(
        this.yq,
      );
    var n,
      i =
        ModelManager_1.ModelManager.BabelTowerModel.CalculateDifficultyConfigByStarNum(
          o.ActivityId,
          t,
        );
    i &&
      ((n = UE.Color.FromHex(i.TextBgColor)),
      this.GetItem(14).SetColor(n),
      LguiUtil_1.LguiUtil.SetLocalTextNew(
        this.GetText(15),
        i.DifficultyTextKey,
      ));
  }
}
exports.BabelTowerDeTermSelectView = BabelTowerDeTermSelectView;
//# sourceMappingURL=BabelTowerDeTermSelectView.js.map
