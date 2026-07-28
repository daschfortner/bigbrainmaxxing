export type LinkedList<T> = {
  append: (item: T) => void
  insert: (item: T, index: number) => void
  remove: (index: number) => T
  toString: () => string
  findIndex: (predicate: (item: T) => boolean) => number
}

export const SinglyLinkedList: <T>() => LinkedList<T> = <T>() => {
  type ListNode = {
    next?: ListNode
    data: T
  }

  let rootNode: ListNode | undefined = undefined

  const findNodeBeforeIndex: (index: number) => ListNode = (index) => {
    let currentNode: ListNode | undefined = rootNode
    for (let i = 0; i < index - 1; i++) {
      if (currentNode === undefined) {
        throw new RangeError('invalid index')
      }

      currentNode = currentNode.next
    }

    if (currentNode === undefined) {
      throw new RangeError('invalid index')
    }

    return currentNode
  }

  return ({
    append: (item: T) => {
      if (rootNode === undefined) {
        rootNode = {
          data: item,
        }
        return
      }
      
      let currentNode: ListNode | undefined = rootNode
      while (currentNode.next !== undefined) {
        currentNode = currentNode.next
      }

      currentNode.next = {
        data: item
      }
    },
    insert: (item: T, index: number) => {
      if (index === 0) {
        const nextNode = rootNode
        rootNode = {
          data: item,
          next: nextNode,
        }

        return
      }

      const insertionPoint = findNodeBeforeIndex(index)

      const insertNext = insertionPoint.next
      insertionPoint.next = {
        data: item,
        next: insertNext
      }
    },
    remove: (index: number) => {
      if (index === 0) {
        const currentRoot = rootNode

        if (currentRoot === undefined) {
          throw new RangeError('invalid index')
        }

        rootNode = currentRoot.next
        return currentRoot.data
      }

      const removalPoint = findNodeBeforeIndex(index)
      const nodeToRemove = removalPoint.next

      // if this node is null then the index was not valid because we are talking
      // about an index off the end of the list
      if (nodeToRemove === undefined) {
        throw new RangeError('invalid index')
      }

      const newNext = nodeToRemove.next
      removalPoint.next = newNext

      return nodeToRemove.data
    },
    toString: () => {
      let output = '['

      let currentNode = rootNode
      while(currentNode !== undefined) {
        output += ` ${currentNode.data}`
        currentNode = currentNode.next
      }

      return `${output} ]`
    },
    findIndex: (predicate: (item: T) => boolean) => {
      let currentNode = rootNode
      let currentIndex = 0
      while (currentNode !== undefined) {
        if (predicate(currentNode.data)) {
          return currentIndex
        }

        currentNode = currentNode.next
        currentIndex++
      }

      return -1
    }
  })
}

// TODO: Implement a doubly linked list
