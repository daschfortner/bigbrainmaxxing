export type BinarySearchTree<KeyType, ValueType> = {
  insert: (key: KeyType, value: ValueType) => void
  get: (key: KeyType) => ValueType
  //contains: (key: KeyType) => boolean
  //delete: (key: KeyType) => ValueType
  //size: () => number
  isEmpty: () => boolean
  toArray: () => ValueType[]
  //clear: () => void
}

export const UnbalancedBinarySearchTree: <K, V>() => BinarySearchTree<K, V> = <K, V>() => {
  type Node = {
    key: K
    value: V
    leftChild?: Node
    rightChild?: Node
  }

  let rootNode: Node | undefined = undefined

  const insertNode = (newNode: Node, currentNode: Node, searchKey: K) => {
    if (searchKey < currentNode.key) {
      if (currentNode.leftChild === undefined) {
        currentNode.leftChild = newNode
      } else {
        insertNode(newNode, currentNode.leftChild, searchKey)
      }
    } else if (searchKey > currentNode.key) {
      if (currentNode.rightChild === undefined) {
        currentNode.rightChild = newNode
      } else {
        insertNode(newNode, currentNode.rightChild, searchKey)
      }
    } else {
      throw Error('duplicate key')
    }
  }

  const getNode: (key: K, currentNode?: Node) => Node | undefined = (key: K, currentNode?: Node) => {
    if (currentNode === undefined) {
      return undefined
    }

    if (currentNode.key === key) {
      return currentNode
    }

    return key < currentNode.key ?
      getNode(key, currentNode.leftChild) : getNode(key, currentNode.rightChild)
  }

  const getHeight: (node?: Node) => number = (node?: Node) => {
    if (node === undefined) {
      return 0
    }

    const leftHeight = getHeight(node.leftChild)
    const rightHeight = getHeight(node.rightChild)

    return leftHeight > rightHeight ? leftHeight + 1 : rightHeight + 1
  }

  const getArray: (node?: Node) => V[] = (node?: Node) => {
    if (node === undefined) {
      return []
    }

    const leftHalf = getArray(node.leftChild)
    const rightHalf = getArray(node.rightChild)

    return leftHalf.concat([ node.value ]).concat(rightHalf)
  }

  return {
    insert: (key: K, value: V) => {
      const newNode = {
        key,
        value,
      }

      if (rootNode === undefined) {
        rootNode = newNode
      } else {
        insertNode(newNode, rootNode, key)
      }
    },
    get: (key: K) => {
      const node = getNode(key, rootNode)

      if (node === undefined) {
        throw new Error('key not found')
      }

      return node.value
    },
    isEmpty: () => rootNode === undefined,
    toArray: () => getArray(rootNode)
  }
}
