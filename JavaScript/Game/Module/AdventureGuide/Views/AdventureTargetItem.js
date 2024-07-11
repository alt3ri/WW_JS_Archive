"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.AdventureTargetItem = void 0);
const UE = require("ue"),
  Log_1 = require("../../../../Core/Common/Log"),
  Protocol_1 = require("../../../../Core/Define/Net/Protocol"),
  ConfigManager_1 = require("../../../Manager/ConfigManager"),
  ControllerHolder_1 = require("../../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  UiManager_1 = require("../../../Ui/UiManager"),
  CommonItemSmallItemGrid_1 = require("../../Common/ItemGrid/CommonItemSmallItemGrid"),
  RoleController_1 = require("../../RoleUi/RoleController"),
  GridProxyAbstract_1 = require("../../Util/Grid/GridProxyAbstract"),
  GenericLayout_1 = require("../../Util/Layout/GenericLayout"),
  LguiUtil_1 = require("../../Util/LguiUtil"),
  WorldMapController_1 = require("../../WorldMap/WorldMapController");
class AdventureTargetItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments),
      (this.eGe = void 0),
      (this.AdventureId = 0),
      (this.Pe = void 0),
      (this.$Ve = void 0),
      (this.YVe = () => {
        return new CommonItemSmallItemGrid_1.CommonItemSmallItemGrid();
      }),
      (this.qOe = () => {
        this.JVe ||
          ((this.JVe = !0),
          this.Pe.Status === Protocol_1.Aki.Protocol.Eks.Proto_Finish &&
            ControllerHolder_1.ControllerHolder.AdventureGuideController.RequestForAdventureReward(
              this.AdventureId,
            ).finally(() => {
              this.JVe = !1;
            }));
      }),
      (this.JVe = !1),
      (this.zVe = () => {
        this.JVe ||
          ((this.JVe = !0),
          this.Pe.Status === Protocol_1.Aki.Protocol.Eks.Proto_UnFinish &&
            (this.Ju(), (this.JVe = !1)));
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIText],
      [1, UE.UIItem],
      [2, UE.UIButtonComponent],
      [3, UE.UIHorizontalLayout],
      [4, UE.UIItem],
      [5, UE.UIText],
      [6, UE.UIScrollViewWithScrollbarComponent],
      [7, UE.UIItem],
      [8, UE.UIItem],
      [9, UE.UIButtonComponent],
    ]),
      (this.BtnBindInfo = [
        [2, this.zVe],
        [9, this.qOe],
      ]);
  }
  OnStart() {
    (this.eGe = new GenericLayout_1.GenericLayout(
      this.GetHorizontalLayout(3),
      this.YVe,
    )),
      (this.$Ve = this.GetItem(1)
        .GetOwner()
        .GetComponentByClass(UE.UIExtendToggle.StaticClass())),
      this.$Ve.OnPostAudioEvent.Bind((e) => {
        e && this.PostClickAudioEvent(e);
      }),
      this.$Ve.OnPostAudioStateEvent.Bind((e, t) => {
        t && this.PostClickAudioEvent(t);
      });
  }
  OnBeforeDestroy() {
    this.$Ve.OnPostAudioEvent.Unbind(), this.$Ve.OnPostAudioStateEvent.Unbind();
  }
  Refresh(t, e, r) {
    this.JVe = !1;
    var i = (this.Pe = t).AdventureTaskBase,
      o =
        ((this.AdventureId = t.AdventureTaskBase.Id),
        LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(0), i.TaskText),
        this.GetItem(1).SetUIActive(!1),
        t.GetTotalNum()),
      s =
        t.AdventureTaskBase.ChapterId <=
        ModelManager_1.ModelManager.AdventureGuideModel.GetReceivedChapter()
          ? o
          : t.Progress,
      a = this.GetText(5),
      l =
        (0 !== o
          ? (a.SetUIActive(!0), a.SetText(`(${s}/${o})`))
          : a.SetUIActive(!1),
        new Array()),
      h = ConfigManager_1.ConfigManager.AdventureModuleConfig.GetDropShowInfo(
        i.DropIds,
      );
    for (const _ of h.keys()) {
      var n = [{ IncId: 0, ItemId: _ }, h.get(_)];
      l.push(n);
    }
    this.eGe.RefreshByDataAsync(l).then(() => {
      for (const e of this.eGe.GetLayoutItemList())
        e.SetReceivedVisible(
          t.Status === Protocol_1.Aki.Protocol.Eks.Proto_Received,
        );
      this.GetScrollViewWithScrollbar(6).ScrollTo(this.eGe.GetGrid(0));
    }),
      this.RootItem.SetUIActive(!0),
      this.ZVe(
        t.Status,
        !this.Pe.AdventureTaskBase.JumpTo ||
          0 !== t.AdventureTaskBase.JumpTo?.size,
      );
  }
  ZVe(e, t) {
    this.e6e(e), this.t6e(e), this.i6e(e, t), this.o6e(e), this.r6e(e, t);
  }
  r6e(e, t) {
    this.GetItem(7).SetUIActive(
      e === Protocol_1.Aki.Protocol.Eks.Proto_UnFinish && !t,
    );
  }
  e6e(e) {
    this.GetItem(8).SetUIActive(
      e === Protocol_1.Aki.Protocol.Eks.Proto_Received,
    );
  }
  t6e(e) {
    this.GetButton(9).RootUIComp.SetUIActive(
      e === Protocol_1.Aki.Protocol.Eks.Proto_Finish,
    );
  }
  i6e(e, t) {
    this.GetButton(2).RootUIComp.SetUIActive(
      e === Protocol_1.Aki.Protocol.Eks.Proto_UnFinish && t,
    );
  }
  o6e(e) {
    this.GetItem(4).SetUIActive(e === Protocol_1.Aki.Protocol.Eks.Proto_Finish);
  }
  Ju() {
    if (this.Pe?.AdventureTaskBase.JumpTo) {
      let e = void 0,
        t = void 0;
      for (var [r, i] of this.Pe.AdventureTaskBase.JumpTo) (e = r), (t = i);
      if (e && t)
        switch (e - 1) {
          case 0:
            UiManager_1.UiManager.OpenView("QuestView", Number(t));
            break;
          case 1:
            var o = ConfigManager_1.ConfigManager.MapConfig?.GetConfigMark(
              Number(t),
            );
            o
              ? ((o = {
                  MarkType: o.ObjectType,
                  MarkId: o.MarkId,
                  OpenAreaId: 0,
                }),
                WorldMapController_1.WorldMapController.OpenView(1, !1, o))
              : Log_1.Log.CheckError() &&
                Log_1.Log.Error(
                  "AdventureGuide",
                  5,
                  "配置了错误的开拓任务跳转参数",
                  ["Id: ", this.Pe.AdventureTaskBase.Id],
                  ["Parma: ", t],
                );
            break;
          case 2:
            "RoleRootView" === t
              ? RoleController_1.RoleController.OpenRoleMainView(0)
              : UiManager_1.UiManager.OpenView(t);
            break;
          case 3:
            o = t;
            RoleController_1.RoleController.OpenRoleMainView(0, 0, [], o);
            break;
          case 4:
            o = { TabViewName: t, Param: void 0 };
            UiManager_1.UiManager.OpenView("CalabashRootView", o);
            break;
          case 8:
            ControllerHolder_1.ControllerHolder.AdventureGuideController.OpenGuideView(
              "DisposableChallengeView",
              Number(t),
            );
            break;
          default:
            Log_1.Log.CheckError() &&
              Log_1.Log.Error(
                "AdventureGuide",
                5,
                "配置了错误的开拓任务跳转类型",
                ["Id: ", this.Pe.AdventureTaskBase.Id],
                ["type: ", e],
              );
        }
    }
  }
}
exports.AdventureTargetItem = AdventureTargetItem;
//# sourceMappingURL=AdventureTargetItem.js.map
