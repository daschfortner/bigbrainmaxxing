export type LinkedList<T> = {
  append: (item: T) => void
  insert: (item: T, index: number) => void
  remove: (index: number) => T
  toString: () => string
  //find: (predicate: (item: T) => boolean) => T | undefined
  //findIndex: (predicate: (item: T) => boolean) => number
}

const SinglyLinkedList: <T>() => LinkedList<T> = <T>() => {
  type ListNode = {
    next?: ListNode
    data: T
  }

  let rootNode: ListNode | undefined = undefined

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
        console.log('  > getting next node')
        currentNode = currentNode.next
      }

      currentNode.next = {
        data: item
      }
    },
    insert: (item: T, index: number) => {
      const newNode: ListNode = {
        data: item
      }

      let currentNode: ListNode | undefined = rootNode
      let currentIndex: number = 0
      while (currentIndex < index - 1) {
        if (currentNode === undefined) {
          throw new RangeError('invalid index')
        }

        currentNode = currentNode.next
        currentIndex++
      }

      const insertNext = currentNode?.next
      newNode.next = insertNext
      // todo fix this
      currentNode!.next = newNode
    },
    remove: (index: number) => {
      return rootNode!.data
    },
    toString: () => {
      let output = '[ '

      let currentNode = rootNode
      while(currentNode !== undefined) {
        output += `${currentNode.data} `
        currentNode = currentNode.next
      }

      return `${output} ]`
    }
  })
}

const list = SinglyLinkedList<number>()

console.log(list.toString())

console.log('  > adding 1 to list...')
list.append(1)
console.log(list.toString())
console.log('  > adding 2 to list...')
list.append(2)
console.log(list.toString())
console.log('  > adding 3 to list...')
list.append(3)
console.log(list.toString())
console.log('  > adding 4 to list...')
list.append(4)
console.log(list.toString())
