import { describe, it } from 'node:test'
import { BinarySearchTree, UnbalancedBinarySearchTree } from './binarySearchTree'
import assert from 'node:assert'

describe('unbalanced binary search tree', () => {
  it('starts empty', () => {
    const bst: BinarySearchTree<number, string> = UnbalancedBinarySearchTree()

    assert.equal(bst.isEmpty(), true)
  })

  it('can insert items', () => {
    const bst: BinarySearchTree<number, string> = UnbalancedBinarySearchTree()

    bst.insert(5, 'a')
    bst.insert(1, 'b')
    bst.insert(6, 'z')
    bst.insert(7, 'q')

    assert.deepEqual(bst.toArray(), ['b', 'a', 'z', 'q'])
  })

  it('fails to insert duplicate keys', () => {
    const bst: BinarySearchTree<number, string> = UnbalancedBinarySearchTree()

    bst.insert(5, 'a')

    assert.throws(() => bst.insert(5, 'b'))
  })

  it('can search by key', () => {
    const bst: BinarySearchTree<number, string> = UnbalancedBinarySearchTree()

    bst.insert(9, 'a')
    bst.insert(4, 'b')
    bst.insert(3, 'z')
    bst.insert(8, 'q')
    bst.insert(6, 'q')

    assert.equal(bst.get(3), 'z')
    assert.equal(bst.get(6), 'q')
  })

})
