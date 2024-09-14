"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.TreeStepBase = void 0);
const ue_1 = require("ue"),
  Vector_1 = require("../../../../../Core/Utils/Math/Vector"),
  StringUtils_1 = require("../../../../../Core/Utils/StringUtils"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  UiComponentsAction_1 = require("../../../../Ui/Base/UiComponentsAction"),
  MapUtil_1 = require("../../../Map/MapUtil"),
  QuestUtil_1 = require("../../../QuestNew/QuestUtil"),
  LguiUtil_1 = require("../../../Util/LguiUtil"),
  GeneralLogicTreeController_1 = require("../../GeneralLogicTreeController");
class TreeStepBase extends UiComponentsAction_1.UiComponentsAction {
  constructor() {
    super(...arguments),
      (this.DescribeTextComp = void 0),
      (this.DistanceTextComp = void 0),
      (this.TreeIncId = BigInt(0)),
      (this.Config = void 0),
      (this.Qmt = () => {
        var t =
          GeneralLogicTreeController_1.GeneralLogicTreeController.GetTitleText(
            this.TreeIncId,
            this.Config,
          );
        return (
          this.OnStepDescribeUpdate(t),
          StringUtils_1.StringUtils.IsBlank(t)
            ? (this.DescribeTextComp.SetUIActive(!1), !1)
            : (this.DescribeTextComp.SetText(t),
              this.DescribeTextComp.SetUIActive(!0),
              !0)
        );
      }),
      (this.UpdateDistanceText = () => {
        if (
          !GeneralLogicTreeController_1.GeneralLogicTreeController.IsShowTrackDistance(
            this.TreeIncId,
            this.Config,
          )
        )
          return this.DistanceTextComp.SetUIActive(!1), !1;
        var t =
          ModelManager_1.ModelManager.GeneralLogicTreeModel.GetBehaviorTree(
            this.TreeIncId,
          );
        if (!t) return this.DistanceTextComp.SetUIActive(!1), !1;
        if (t.IsInTrackRange()) this.DistanceTextComp.SetUIActive(!1);
        else {
          var e =
              GeneralLogicTreeController_1.GeneralLogicTreeController.GetTitleTrackNodeId(
                this.Config,
              ),
            i = t.GetNodeDungeonId(e) ?? 0,
            r = ModelManager_1.ModelManager.CreatureModel.GetInstanceId();
          if (MapUtil_1.MapUtil.IsDungeonDiffWorld(r, i)) {
            (r = t.GetNodeTrackPosition(e)),
              (i = MapUtil_1.MapUtil.GetInstanceDungeonTempWorldName(
                i,
                r ?? Vector_1.Vector.ZeroVectorProxy,
              ));
            LguiUtil_1.LguiUtil.SetLocalTextNew(
              this.DistanceTextComp,
              "CrossMapMissionTips",
              i,
            );
          } else {
            r = t.GetNodeTrackPosition(e);
            if (!r) return this.DistanceTextComp.SetUIActive(!1), !1;
            if (
              !QuestUtil_1.QuestUtil.SetTrackDistanceText(
                this.DistanceTextComp,
                r,
              )
            )
              return this.DistanceTextComp.SetUIActive(!1), !1;
          }
          this.DistanceTextComp.SetUIActive(!0);
        }
        return !0;
      });
  }
  Init(t) {
    this.SetRootActor(t.GetOwner(), !0);
  }
  Dispose() {
    this.DescribeTextComp?.OnSelfLanguageChange.Unbind();
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, ue_1.UIText],
      [1, ue_1.UIText],
    ];
  }
  OnStart() {
    (this.DescribeTextComp = this.GetText(0)),
      this.DescribeTextComp.OnSelfLanguageChange.Bind(this.Qmt),
      (this.DistanceTextComp = this.GetText(1)),
      this.DistanceTextComp.SetUIActive(!0);
  }
  UpdateData(t, e) {
    return (
      (this.TreeIncId = t),
      (this.Config = e),
      this.Config && this.TreeIncId !== BigInt(0)
        ? this.UpdateStepInfo()
        : (this.DescribeTextComp.SetUIActive(!1),
          this.DistanceTextComp.SetUIActive(!1),
          !1)
    );
  }
  UpdateStepInfo() {
    var t = this.Qmt();
    return this.UpdateDistanceText(), t;
  }
  OnStepDescribeUpdate(t) {}
}
exports.TreeStepBase = TreeStepBase;
//# sourceMappingURL=TreeStepBase.js.map
