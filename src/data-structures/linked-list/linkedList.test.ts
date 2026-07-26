import { describe, test } from 'node:test'
import assert from 'node:assert'

import { SinglyLinkedList } from '.'

describe('singly linked list', () => {
  test('starts empty', () => {
    const list = SinglyLinkedList()
    assert.equal(list.toString(), '[ ]')
  })

  test('appends items', () => {
    const list = SinglyLinkedList()

    list.append(1)
    list.append(2)
    list.append(3)

    assert.equal(list.toString(), '[ 1 2 3 ]')
  })

  test('can insert items', () => {
    const list = SinglyLinkedList()

    list.append(0)
    list.append(1)
    list.append(2)

    list.insert(5, 1)
    assert.equal(list.toString(), '[ 0 5 1 2 ]')

    // inserting at the ends
    list.insert(3, 0)
    assert.equal(list.toString(), '[ 3 0 5 1 2 ]')

    list.insert(4, 4)
    assert.equal(list.toString(), '[ 3 0 5 1 4 2 ]')

    // inserting off the end
    list.insert(6, 6)
    assert.equal(list.toString(), '[ 3 0 5 1 4 2 6 ]')
  })

  test('can remove items', () => {
    const list = SinglyLinkedList()

    list.append(0)
    list.append(1)
    list.append(2)

    assert.equal(list.remove(1), 1)
    assert.equal(list.remove(1), 2)
    assert.equal(list.remove(0), 0)
  })

  test('can find index based on predicate', () => {
    const list = SinglyLinkedList<number>()

    list.append(1)
    list.append(10)
    list.append(3)
    list.append(55)
    list.append(100)
    list.append(45)

    assert.equal(list.findIndex((i) => i === 55), 3)
    assert.equal(list.findIndex((i) => i % 10 === 0), 1)
    assert.equal(list.findIndex((i) => (i * 2) % 90  === 0), 5)
  })
})
