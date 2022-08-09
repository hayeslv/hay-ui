import type { IInnerTreeNode, ITreeNode } from "./tree-type";

// 树拍平
export function generateInnerTree(
  tree: ITreeNode[],
  level = 0, // 当前节点所处层级
  path: IInnerTreeNode[] = [], // 递归过程的路径，用来获取父节点id
): IInnerTreeNode[] {
  level++; // 当前函数每次被调用，level都自增一次
  return tree.reduce((prev, cur) => {
    const o = { ...cur } as IInnerTreeNode;
    o.level = level; // 设置当前节点所处层级

    // 记录调用栈，用于计算parentId
    if (path.length > 0 && path[path.length - 1].level >= level) {
      // 如果path的最后一位的level，比当前node的level大，说明是“由子到父”的过程了（冒泡），此时应该弹出
      path.pop();
    } else {
      // 记录 父 -> 子
      path.push(o);
    }

    // 获取parentNode
    const parentNode = path[path.length - 2];
    if (parentNode) {
      // 给当前节点增加parentId
      o.parentId = parentNode.id;
    }

    // 判断cur是否存在children，如果存在则递归遍历
    if (o.children) {
      const children = generateInnerTree(o.children, level, path);
      delete o.children;

      return prev.concat(o, children); // 将“当前节点”和“它所有的子节点”拼接在一起
    } else {
      // 叶子节点：没有children
      o.isLeaf = true;
      return prev.concat(o);
    }
  }, [] as IInnerTreeNode[]);
}
