import type { Ref } from "vue";
import { computed, reactive } from "vue";
import type { IInnerTreeNode } from "../tree.type";
import type { DragState, IDragDrop, IDropType, IUseTreeCore, IUseTreeDraggable } from "./useTree.type";

const dropTypeMap = {
  dropPrev: "h-tree__node--drop-prev",
  dropNext: "h-tree__node--drop-next",
  dropInner: "h-tree__node--drop-inner",
};

export function useTreeDragDrop(
  dragdrop: IDragDrop,
  data: Ref<IInnerTreeNode[]>,
  { getChildren, getParent }: IUseTreeCore,
): IUseTreeDraggable {
  const dragState = reactive<DragState>({
    dropType: undefined,
    draggingNode: null,
    draggingTreeNode: null,
  });

  // { id: node } 映射
  const treeIdMapValue = computed<Record<string | number, IInnerTreeNode>>(() => {
    return data.value.reduce((acc, cur) => ({
      ...acc,
      [cur.id!]: cur,
    }), {});
  });

  const removeDraggingStyle = (target: HTMLElement | null) => {
    target?.classList.remove(...Object.values(dropTypeMap));
  };

  const checkIsParent = (
    childNodeId: number | string,
    parentNodeId: number | string,
  ): boolean => {
    const realParentId = treeIdMapValue.value[childNodeId]?.parentId;
    if (realParentId === parentNodeId) { // 直属父级节点
      return true;
    } else if (realParentId !== undefined) { // 可能是祖先节点
      return checkIsParent(realParentId, parentNodeId);
    } else {
      return false;
    }
  };

  // 重置拖拽状态
  const resetDragState = () => {
    dragState.dropType = undefined;
    dragState.draggingNode = null;
    dragState.draggingTreeNode = null;
  };

  // 拖拽开始
  const onDragstart = (event: DragEvent, treeNode: IInnerTreeNode): void => {
    console.log("start");
    event.stopPropagation();
    dragState.draggingNode = event.target as HTMLElement | null;
    dragState.draggingTreeNode = treeNode;
    // 将正在拖拽的数据节点id存入dataTransfer，未来需要在drop的时候取出来
    event.dataTransfer?.setData("dragNodeId", treeNode.id!);
  };

  const onDragover = (event: DragEvent): void => {
    event.stopPropagation();
    event.preventDefault();
    // 没有开启拖拽
    if (!dragdrop) return;
    // 没有拖拽数组
    if (!data) return;
    // 没有正在拖拽的节点
    if (!dragState.draggingNode) return;

    if (event.dataTransfer) {
      event.dataTransfer.dropEffect = "move";
    }
    let curDropType: IDropType = {};
    if (typeof dragdrop === "object") {
      curDropType = dragdrop;
    } else if (dragdrop === true) { // 只传入true的话，默认全部开启
      curDropType = { dropPrev: true, dropNext: true, dropInner: true };
    }

    const { dropPrev, dropNext, dropInner } = curDropType;

    let innerDropType: DragState["dropType"];

    // 拖拽至元素前面的百分比
    const prevPercent = dropPrev
      ? dropInner
        ? 0.25
        : dropNext
          ? 0.45
          : 1
      : -1;
    // 拖拽至元素后方的百分比
    const nextPercent = dropNext
      ? dropInner
        ? 0.75
        : dropPrev
          ? 0.55
          : 0
      : 1;

    const currentTarget = event.currentTarget as HTMLElement | null;
    const targetPosition = currentTarget?.getBoundingClientRect();
    const distance = event.clientY - (targetPosition?.top || 0);

    if (distance < (targetPosition?.height || 0) * prevPercent) {
      innerDropType = "dropPrev";
    } else if (distance > (targetPosition?.height || 0) * nextPercent) {
      innerDropType = "dropNext";
    } else if (dropInner) {
      innerDropType = "dropInner";
    } else {
      innerDropType = undefined;
    }
    if (innerDropType) {
      const classList = currentTarget?.classList;
      if (classList) {
        if (!classList.contains(dropTypeMap[innerDropType])) {
          removeDraggingStyle(currentTarget);
          classList.add(dropTypeMap[innerDropType]);
        }
      }
    } else {
      removeDraggingStyle(currentTarget);
    }
    dragState.dropType = innerDropType;
  };

  const onDragleave = (event: DragEvent): void => {
    event.stopPropagation();
    if (!dragState.draggingNode) return;
    removeDraggingStyle(event.currentTarget as HTMLElement | null);
  };

  // 释放事件回调
  const onDrop = (event: DragEvent, dropNode: IInnerTreeNode): void => {
    event.stopPropagation();
    event.preventDefault();
    removeDraggingStyle(event.currentTarget as HTMLElement | null);
    if (!dragState.draggingNode || !dragdrop) return;

    // 获取正在拖拽的树节点id
    const dragNodeId = event.dataTransfer?.getData("dragNodeId");
    if (dragNodeId) {
      // 判断释放节点是否是正在拖拽的节点的子节点
      const isParent = checkIsParent(dropNode.id!, dragNodeId);
      // 如果拖拽和释放是同一节点或者父子关系则跳出
      if (dragNodeId === dropNode.id || isParent) return;
      // 判断当前是否类型：dropPrev、dropNext、dropInner
      if (dragState.dropType) {
        handlerDrop(dragNodeId, dropNode);
      }

      resetDragState();
    }
  };

  // 释放之后的节点操作
  const handlerDrop = (dragNodeId: string, dropNode: IInnerTreeNode) => {
    // 获取正在拖拽的节点
    const dragNode = data.value.find(v => v.id === dragNodeId);
    if (!dragNode) return;

    // 备份一个节点
    let cloneDragNode: IInnerTreeNode;
    // 获取拖拽节点子节点
    const childrenOfDragNode = getChildren(dragNode);
    // 获取拖拽节点的父节点
    const parentOfDragNode = getParent(dragNode);

    // 如果是嵌套释放情况
    if (dragState.dropType === "dropInner") {
      cloneDragNode = {
        ...dragNode,
        parentId: dropNode.id,
        level: dropNode.level + 1,
      };
      // 插入克隆节点
      const dropNodeIndex = data.value.indexOf(dropNode);
      data.value.splice(dropNodeIndex + 1, 0, cloneDragNode);
      dropNode.isLeaf = undefined;
      // 删除旧拖拽节点
      const dragNodeIndex = data.value.indexOf(dragNode);
      data.value.splice(dragNodeIndex, 1);
    } else if (dragState.dropType === "dropNext") {
      cloneDragNode = {
        ...dragNode,
        parentId: dropNode.parentId,
        level: dropNode.level,
      };
      const dropNodeIndex = data.value.indexOf(dropNode);
      const dropNodeChildrenLength = getChildren(dropNode, true).length;
      data.value.splice(
        dropNodeIndex + dropNodeChildrenLength + 1,
        0,
        cloneDragNode,
      );
      const dragNodeIndex = data.value.indexOf(dragNode);
      data.value.splice(dragNodeIndex, 1);
    } else if (dragState.dropType === "dropPrev") {
      cloneDragNode = {
        ...dragNode,
        parentId: dropNode.parentId,
        level: dropNode.level,
      };
      const dropNodeIndex = data.value.indexOf(dropNode);
      data.value.splice(dropNodeIndex, 0, cloneDragNode);
      const dragNodeIndex = data.value.indexOf(dragNode);
      data.value.splice(dragNodeIndex, 1);
    }

    // 如果拖拽的是有子节点的节点，所有子节点也应该以dropInner方式被移动
    dragState.dropType = "dropInner";
    childrenOfDragNode.forEach(child => handlerDrop(child.id!, cloneDragNode));

    // 拖拽结束，处理父节点isLeaf状态
    if (parentOfDragNode) {
      if (getChildren(parentOfDragNode).length === 0) {
        parentOfDragNode.isLeaf = true;
      }
    }
  };

  const onDragend = (event: DragEvent) => {
    event.stopPropagation();
    event.preventDefault();
    resetDragState();
  };

  return {
    onDragstart,
    onDragover,
    onDragleave,
    onDrop,
    onDragend,
  };
}
