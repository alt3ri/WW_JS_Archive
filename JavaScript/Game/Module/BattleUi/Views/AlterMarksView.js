"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.AlterMarksView = void 0);
const UE = require("ue"),
  Log_1 = require("../../../../Core/Common/Log"),
  Stats_1 = require("../../../../Core/Common/Stats"),
  CommonParamById_1 = require("../../../../Core/Define/ConfigCommon/CommonParamById"),
  Vector_1 = require("../../../../Core/Utils/Math/Vector"),
  EventDefine_1 = require("../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../Common/Event/EventSystem"),
  TimeUtil_1 = require("../../../Common/TimeUtil"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  UiLayerType_1 = require("../../../Ui/Define/UiLayerType"),
  UiLayer_1 = require("../../../Ui/UiLayer"),
  SneakController_1 = require("../../../World/Controller/SneakController"),
  LguiUtil_1 = require("../../Util/LguiUtil"),
  AlterMark_1 = require("./AlterMark"),
  AlterTime_1 = require("./AlterTime"),
  AlterTipMark_1 = require("./AlterTipMark"),
  BattleChildView_1 = require("./BattleChildView/BattleChildView"),
  EavesdropMark_1 = require("./EavesdropMark"),
  StalkAlertMark_1 = require("./StalkAlertMark");
class AlterMarksView extends BattleChildView_1.BattleChildView {
  constructor() {
    super(...arguments),
      (this.Q$e = new Map()),
      (this.X$e = new Map()),
      (this.$$e = new Map()),
      (this.E2n = new Map()),
      (this.Y$e = new Map()),
      (this.J$e = !1),
      (this.z$e = 0),
      (this.Z$e = 0),
      (this.eYe = 0),
      (this.tYe = void 0),
      (this.iYe = void 0),
      (this.oYe = void 0),
      (this.rYe = void 0),
      (this.nYe = !1),
      (this.sYe = (t, e, i) => {
        this.Q$e.has(t) ||
          (this.Y$e.has(t)
            ? 1 === this.Y$e.get(t).Type && this.Y$e.delete(t)
            : this.Y$e.set(t, { Type: 0, OriginPosition: e, TrackActor: i }));
      }),
      (this.aYe = (t) => {
        var e = this.Q$e.get(t),
          i = this.Y$e.has(t);
        (e || i) &&
          (i
            ? this.Y$e.delete(t)
            : e &&
              this.Y$e.set(t, {
                Type: 1,
                OriginPosition: void 0,
                TrackActor: void 0,
              }));
      }),
      (this.hYe = (t, e) => {
        this.$$e.has(t) ||
          ((e = new StalkAlertMark_1.StalkAlertMark(
            this.RootItem,
            e,
          )).InitEntityId(t),
          0 === this.$$e.size && this.SetActive(!0),
          this.$$e.set(t, e));
      }),
      (this.lYe = (t) => {
        var e = this.$$e.get(t);
        e &&
          (e.Destroy(),
          this.$$e.delete(t),
          0 !== this.$$e.size ||
            SneakController_1.SneakController.IsSneaking ||
            this.SetActive(!1));
      }),
      (this.y2n = (t, e, i) => {
        this.E2n.has(t) ||
          ((e = new EavesdropMark_1.EavesdropMark(e, t)).Initialize(
            UiLayer_1.UiLayer.WorldSpaceUiRootItem,
            i,
          ),
          this.E2n.set(t, e));
      }),
      (this.I2n = (t) => {
        var e = this.E2n.get(t);
        e && (e.Destroy(), this.E2n.delete(t));
      }),
      (this.T2n = (t) => {
        for (var [e, i] of this.E2n)
          e === t ? i.PlayFoundSeq() : i.PlayEndSeq();
      }),
      (this._Ye = (t, e) => {
        if (t) {
          this.J$e || this.uYe();
          for (var [, i] of this.Q$e) i.Destroy();
          for (var [, s] of this.$$e) s.Destroy();
          this.Q$e.clear(),
            this.$$e.clear(),
            (this.J$e = !0),
            (this.z$e = e),
            EventSystem_1.EventSystem.Has(
              EventDefine_1.EEventName.OnChildQuestNodeFinish,
              this.Uxe,
            ) ||
              EventSystem_1.EventSystem.Add(
                EventDefine_1.EEventName.OnChildQuestNodeFinish,
                this.Uxe,
              );
        } else this.nYe || this.cYe(), (this.J$e = !1);
        this.iYe.SetUiActive(this.J$e), this.Zpe(t);
      }),
      (this.Uxe = () => {
        this.mYe();
      }),
      (this.lne = (t, e) => {
        this.tYe?.SetUIActive(e);
      }),
      (this.xie = () => {
        var t = ModelManager_1.ModelManager.BattleUiModel.GetCurRoleData();
        this.dYe(t), this.rYe && this.CYe(t.EntityHandle);
      }),
      (this.gYe = () => {
        this.SetActive(!0);
      }),
      (this.fYe = () => {
        0 === this.$$e.size && this.SetActive(!1);
      }),
      (this.Zpe = (t) => {
        for (var [, e] of this.X$e) e.Destroy();
        if ((this.X$e.clear(), t)) {
          if (this.J$e) {
            this.rYe
              ? (t =
                  ModelManager_1.ModelManager.SceneTeamModel
                    .GetCurrentEntity) !== this.rYe && this.CYe(t)
              : ((this.rYe =
                  ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity),
                EventSystem_1.EventSystem.AddWithTarget(
                  this.rYe.Entity,
                  EventDefine_1.EEventName.AiHateAddOrRemove,
                  this.pYe,
                ));
            for (const s of this.rYe.Entity.CheckGetComponent(
              161,
            ).GetAggroSet()) {
              var i =
                ModelManager_1.ModelManager.CreatureModel.GetEntityById(
                  s,
                ).Entity.CheckGetComponent(1).Owner;
              this.X$e.has(s) ||
                ((i = new AlterTipMark_1.AlterTipMark(this.RootItem, i, !0)),
                this.X$e.set(s, i),
                i.ChangeToError());
            }
          }
        } else
          this.rYe &&
            (EventSystem_1.EventSystem.RemoveWithTarget(
              this.rYe.Entity,
              EventDefine_1.EEventName.AiHateAddOrRemove,
              this.pYe,
            ),
            (this.rYe = void 0));
      }),
      (this.pYe = (t, e) => {
        var i = e.CharActorComp.Owner,
          e = e.CharActorComp.Entity.Id;
        !this.X$e.has(e) &&
          t &&
          this.J$e &&
          ((t = new AlterTipMark_1.AlterTipMark(this.RootItem, i, !0)),
          this.X$e.set(e, t),
          t.ChangeToError());
      }),
      (this.vYe = (t) => {
        t = this.$$e.get(t);
        t &&
          (t.SetAlertIcon(
            "/Game/Aki/UI/UIResources/Common/Atlas/SP_ComIconSign.SP_ComIconSign",
          ),
          t.StopUpdateAlertValue(),
          t.ActivateAlertEffect());
      }),
      (this.MYe = () => {
        for (var [, t] of this.$$e) t.Destroy();
        this.$$e.clear();
      });
  }
  Initialize(t, e) {
    super.Initialize(t),
      this.cYe(),
      this.EYe(),
      this.L2n(),
      this.ProcessPendingMarkInfo(),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.BattleUiCurRoleDataChanged,
        this.xie,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnSneakFoundChange,
        this._Ye,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.SneakStart,
        this.gYe,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.SneakEnd,
        this.fYe,
      ),
      (ModelManager_1.ModelManager.AlertMarkModel.AlertMarkInit = !0);
    CommonParamById_1.configCommonParamById.GetBoolConfig("ShowSneakMask") &&
      ((t = UiLayer_1.UiLayer.GetLayerRootUiItem(UiLayerType_1.ELayerType.HUD)),
      LguiUtil_1.LguiUtil.LoadPrefabByResourceIdAsync(
        "UiItem_Sneakzhezhao",
        t,
      ).then(
        (t) => {
          (this.tYe = t.GetComponentByClass(UE.UIItem.StaticClass())),
            this.tYe.SetHierarchyIndex(0),
            this.tYe.SetUIActive(!1);
        },
        () => {},
      )),
      (this.iYe = new AlterTime_1.AlterTime()),
      this.iYe.CreateByResourceIdAsync("UiItem_Sneakshijian", this.RootItem);
    t = ModelManager_1.ModelManager.BattleUiModel.GetCurRoleData();
    this.dYe(t), this.SetActive(!1);
  }
  dYe(t) {
    this.oYe && this.oYe.EndTask();
    t = t?.GameplayTagComponent;
    t
      ? (this.oYe = t.ListenForTagAddOrRemove(
          2019420593,
          this.lne,
          AlterMarksView.SYe,
        ))
      : Log_1.Log.CheckError() &&
        Log_1.Log.Error("UiCommon", 32, "获取当前角色BaseTagComponent失败");
  }
  Reset() {
    super.Reset(),
      this.uYe(),
      this.yYe(),
      this.D2n(),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.BattleUiCurRoleDataChanged,
        this.xie,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnSneakFoundChange,
        this._Ye,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.SneakStart,
        this.gYe,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.SneakEnd,
        this.fYe,
      ),
      EventSystem_1.EventSystem.Has(
        EventDefine_1.EEventName.OnChildQuestNodeFinish,
        this.Uxe,
      ) &&
        EventSystem_1.EventSystem.Remove(
          EventDefine_1.EEventName.OnChildQuestNodeFinish,
          this.Uxe,
        ),
      this.rYe &&
        (EventSystem_1.EventSystem.RemoveWithTarget(
          this.rYe.Entity,
          EventDefine_1.EEventName.AiHateAddOrRemove,
          this.pYe,
        ),
        (this.rYe = void 0));
    for (var [, t] of this.Q$e) t.Destroy();
    this.Q$e.clear();
    for (var [, e] of this.$$e) e.Destroy();
    this.$$e.clear();
  }
  Update(t) {
    this.IYe();
    for (var [, e] of this.Q$e) e.Update();
    for (var [, i] of this.X$e) i.Update();
    for (var [, s] of this.E2n) s.Update();
    for (var [, h] of this.$$e) h.CheckShowUiCondition() && h.Update();
    this.J$e &&
      ((this.eYe =
        TimeUtil_1.TimeUtil.GetServerTimeStamp() /
        TimeUtil_1.TimeUtil.InverseMillisecond),
      (this.Z$e =
        (this.z$e - this.eYe) * TimeUtil_1.TimeUtil.InverseMillisecond),
      this.Z$e < 0 ? this.mYe() : this.iYe.SetCountdownText(this.Z$e));
  }
  IYe() {
    for (var [t, e] of this.Y$e) {
      var i;
      0 === e.Type
        ? ((i = new AlterMark_1.AlterMark(
            this.RootItem,
            e.OriginPosition || Vector_1.Vector.Create(),
            e.TrackActor,
          )),
          this.Q$e.set(t, i),
          this.hYe(t, e.TrackActor))
        : ((i = this.Q$e.get(t)) && (i.Destroy(), this.Q$e.delete(t)),
          this.lYe(t));
    }
    this.Y$e.clear();
  }
  mYe() {
    this.J$e && ((this.J$e = !1), this.iYe.SetUiActive(this.J$e));
  }
  L2n() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.AddEavesdropMark,
      this.y2n,
    ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.RemoveEavesdropMark,
        this.I2n,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnEavesdropFound,
        this.T2n,
      );
  }
  D2n() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.AddEavesdropMark,
      this.y2n,
    ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.RemoveEavesdropMark,
        this.I2n,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnEavesdropFound,
        this.T2n,
      );
  }
  EYe() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.AddStalkAlertMark,
      this.hYe,
    ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.RemoveStalkAlertMark,
        this.lYe,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnStalkFound,
        this.vYe,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnStalkFailed,
        this.MYe,
      );
  }
  yYe() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.AddStalkAlertMark,
      this.hYe,
    ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.RemoveStalkAlertMark,
        this.lYe,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnStalkFound,
        this.vYe,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnStalkFailed,
        this.MYe,
      );
  }
  cYe() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.AddAlterMark,
      this.sYe,
    ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.RemoveAlterMark,
        this.aYe,
      ),
      (this.nYe = !0);
  }
  uYe() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.AddAlterMark,
      this.sYe,
    ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.RemoveAlterMark,
        this.aYe,
      ),
      (this.nYe = !1);
  }
  CYe(t) {
    EventSystem_1.EventSystem.HasWithTarget(
      this.rYe.Entity,
      EventDefine_1.EEventName.AiHateAddOrRemove,
      this.pYe,
    ) &&
      (EventSystem_1.EventSystem.RemoveWithTarget(
        this.rYe.Entity,
        EventDefine_1.EEventName.AiHateAddOrRemove,
        this.pYe,
      ),
      (this.rYe = t),
      EventSystem_1.EventSystem.AddWithTarget(
        this.rYe.Entity,
        EventDefine_1.EEventName.AiHateAddOrRemove,
        this.pYe,
      ));
  }
  ProcessPendingMarkInfo() {
    if (
      0 !== ModelManager_1.ModelManager.AlertMarkModel.PendingMarkInfos.size
    ) {
      for (var [t, [e, i, s]] of ModelManager_1.ModelManager.AlertMarkModel
        .PendingMarkInfos)
        switch (i) {
          case 2:
            this.hYe(t, e);
            break;
          case 3:
            this.y2n(t, e, s);
        }
      ModelManager_1.ModelManager.AlertMarkModel?.PendingMarkInfos.clear();
    }
  }
  OnBattleHudVisibleChanged(t) {
    SneakController_1.SneakController.IsSneaking && this.SetActive(t);
  }
}
(exports.AlterMarksView = AlterMarksView).SYe = Stats_1.Stat.Create(
  "[AlterMarksView]ListenTag",
);
//# sourceMappingURL=AlterMarksView.js.map
