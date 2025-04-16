"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RogueBattleMapSummaryFettersTabView = void 0);
const UE = require("ue"),
  Log_1 = require("../../../../Core/Common/Log"),
  EventDefine_1 = require("../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../Common/Event/EventSystem"),
  ConfigManager_1 = require("../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  UiTabViewBase_1 = require("../../../Ui/Base/UiTabViewBase"),
  GenericLayout_1 = require("../../Util/Layout/GenericLayout"),
  LguiUtil_1 = require("../../Util/LguiUtil"),
  GenericScrollViewNew_1 = require("../../Util/ScrollView/GenericScrollViewNew"),
  RogueBattleMapFetterItem_1 = require("../Component/RogueBattleMapFetterItem"),
  RogueBattleMapFetterTabItem_1 = require("../Component/RogueBattleMapFetterTabItem"),
  RogueBattleMapRoleListGrid_1 = require("../Component/RogueBattleMapRoleListGrid");
class RogueBattleMapSummaryFettersTabView extends UiTabViewBase_1.UiTabViewBase {
  constructor() {
    super(...arguments),
      (this.vg1 = void 0),
      (this.ep1 = void 0),
      (this.nm1 = void 0),
      (this.ypt = []),
      (this.C5e = () => {
        return new RogueBattleMapFetterTabItem_1.RogueBattleMapFetterTabItem();
      }),
      (this.tp1 = () => {
        return new RogueBattleMapRoleListGrid_1.RogueBattleMapRoleLayoutGrid();
      }),
      (this.ip1 = () => {
        return new RogueBattleMapFetterItem_1.RogueBattleMapFetterInfoItem();
      }),
      (this.rp1 = (e) => {
        this.UiViewSequence.HasSequenceNameInPlaying("Start") ||
          (this.UiViewSequence.HasSequenceNameInPlaying("Switch")
            ? this.UiViewSequence.ReplaySequence("Switch")
            : this.UiViewSequence.PlaySequence("Switch")),
          this.op1(e),
          this.Ake(e),
          this.Wjt(e);
      }),
      (this.mE1 = () => {
        if (
          ModelManager_1.ModelManager.RogueBattleModel.IsMapSummaryBondJumping
        ) {
          ModelManager_1.ModelManager.RogueBattleModel.IsMapSummaryBondJumping =
            !1;
          let t = 0,
            i = 0;
          for (const r of this.ypt) {
            i++;
            for (let e = 0; e < r.Config.length; e++)
              if (
                r.Config[e] ===
                ModelManager_1.ModelManager.RogueBattleModel
                  .CurrentMapSummaryBond
              ) {
                t = e / (r.Config.length + i);
                break;
              }
            if (0 !== t) break;
          }
          const e = this.GetScrollViewWithScrollbar(0);
          this.vg1?.BindLateUpdate(() => {
            e?.SetScrollProgress(t), this.vg1?.UnBindLateUpdate();
          });
        }
      });
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIScrollViewWithScrollbarComponent],
      [1, UE.UIItem],
      [2, UE.UIItem],
      [3, UE.UITexture],
      [4, UE.UITexture],
      [5, UE.UIText],
      [6, UE.UISprite],
      [7, UE.UIText],
      [8, UE.UIText],
      [9, UE.UIText],
      [10, UE.UIHorizontalLayout],
      [11, UE.UIItem],
      [12, UE.UIVerticalLayout],
      [13, UE.UIItem],
      [14, UE.UIItem],
      [15, UE.UIItem],
      [16, UE.UIItem],
      [17, UE.UIItem],
    ];
  }
  AddEventListener() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.RogueResMapSummaryBondUpdate,
      this.rp1,
    ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.RogueResMapSummaryFettersSubTabUpdate,
        this.mE1,
      );
  }
  RemoveEventListener() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.RogueResMapSummaryBondUpdate,
      this.rp1,
    ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.RogueResMapSummaryFettersSubTabUpdate,
        this.mE1,
      );
  }
  OnStart() {
    (this.vg1 = new GenericScrollViewNew_1.GenericScrollViewNew(
      this.GetScrollViewWithScrollbar(0),
      this.C5e,
    )),
      (this.ep1 = new GenericLayout_1.GenericLayout(
        this.GetHorizontalLayout(10),
        this.tp1,
      )),
      (this.nm1 = new GenericLayout_1.GenericLayout(
        this.GetVerticalLayout(12),
        this.ip1,
      )),
      this.GetItem(17)?.SetUIActive(!1),
      this.GetItem(2)?.SetUIActive(!1);
  }
  OnBeforeShow() {
    this.np1();
  }
  OnAfterShow() {
    this.UiViewSequence.PlaySequence("Start");
  }
  OnBeforeDestroy() {
    (this.vg1 = void 0), (this.ep1 = void 0), (this.nm1 = void 0);
  }
  np1() {
    var e =
        ConfigManager_1.ConfigManager.RogueBattleConfig.GetAllRogueResBond(),
      t =
        ConfigManager_1.ConfigManager.RogueBattleConfig.GetAllRogueResBondType(),
      i = new Map();
    for (const s of t) i.set(s.Id, []);
    for (const h of e) {
      var r = ConfigManager_1.ConfigManager.RogueBattleConfig.GetRogueResBond(
          h.Id,
        ),
        a = r.Rarity;
      i.get(a)?.push(r.Id),
        i.get(a) ||
          (Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "RogueBattle",
              77,
              "常驻肉鸽缺少羁绊类型",
              ["bondId", r.Id],
              ["type", a],
            ));
    }
    var o = new Array();
    for (const _ of t) {
      var n = i.get(_.Id);
      n &&
        0 !== n.length &&
        ((n = [...i.get(_.Id)]).sort((e, t) => {
          e =
            ModelManager_1.ModelManager.RogueBattleModel.GetRoleBondDataById(e);
          return (
            ModelManager_1.ModelManager.RogueBattleModel.GetRoleBondDataById(t)
              .F6n - e.F6n
          );
        }),
        0 ===
          ModelManager_1.ModelManager.RogueBattleModel.CurrentMapSummaryBond &&
          0 < n.length &&
          (ModelManager_1.ModelManager.RogueBattleModel.CurrentMapSummaryBond =
            n[0]),
        (n = {
          IsSelected: i
            .get(_.Id)
            .includes(
              ModelManager_1.ModelManager.RogueBattleModel
                .CurrentMapSummaryBond,
            ),
          Config: n,
        }),
        o.push(n));
    }
    (this.ypt = o),
      this.vg1.RefreshByData(o, () => {
        EventSystem_1.EventSystem.Emit(
          EventDefine_1.EEventName.RogueResMapSummaryBondUpdate,
          ModelManager_1.ModelManager.RogueBattleModel.CurrentMapSummaryBond,
        );
      });
  }
  op1(e) {
    var t = ModelManager_1.ModelManager.RogueBattleModel.GetRoleBondDataById(e);
    t
      ? (this.GetItem(15)?.SetUIActive(!0),
        this.GetItem(16)?.SetUIActive(!1),
        this.GetText(7)?.SetText("Lv." + t.F6n),
        0 !== t.Pd1
          ? (this.GetText(8)?.SetText(t.Psc + "/" + t.Pd1),
            this.GetSprite(6).SetFillAmount(t.Psc / t.Pd1))
          : (LguiUtil_1.LguiUtil.SetLocalTextNew(
              this.GetText(8),
              "RogueRes_SynergyLevelMax",
            ),
            this.GetSprite(6).SetFillAmount(1)),
        (t =
          ConfigManager_1.ConfigManager.RogueBattleConfig.GetRogueResBond(e)),
        LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(5), t.Name),
        this.SetTextureByPath(t.Icon, this.GetTexture(4)),
        this.SetTextureByPath(t.Icon, this.GetTexture(3)))
      : Log_1.Log.CheckError() &&
        Log_1.Log.Error("RogueBattle", 77, "未找到羁绊", ["bondId", e]);
  }
  Ake(e) {
    e = ModelManager_1.ModelManager.RogueBattleModel.GetRoleListByBond(e);
    this.ep1?.RefreshByData(e);
  }
  Wjt(t) {
    var i = ModelManager_1.ModelManager.RogueBattleModel.GetRoleBondDataById(t),
      r = ConfigManager_1.ConfigManager.RogueBattleConfig.GetRogueResBond(t),
      a = new Array();
    for (let e = 1; e <= r.starmapLength(); e++) {
      var o = { ConfigId: t, Level: e, IsReached: e <= i.F6n };
      a.push(o);
    }
    this.nm1?.RefreshByData(a);
  }
  GetGuideUiItemAndUiItemForShowEx(e) {
    var t;
    if (e && !(e.length < 3))
      return (
        (t = Number(e[1])),
        this.nm1
          ?.GetLayoutItemByIndex(t - 1)
          ?.GetGuideUiItemAndUiItemForShowEx(e)
      );
  }
}
exports.RogueBattleMapSummaryFettersTabView =
  RogueBattleMapSummaryFettersTabView;
//# sourceMappingURL=RogueBattleMapSummaryFetterTabView.js.map
