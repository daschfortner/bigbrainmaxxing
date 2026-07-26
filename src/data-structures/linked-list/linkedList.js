"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const SinglyLinkedList = () => {
    let rootNode = undefined;
    return ({
        append: (item) => {
            if (rootNode === undefined) {
                rootNode = {
                    data: item,
                };
                return 1;
            }
            let currentNode = rootNode;
            while (currentNode.next !== undefined) {
                currentNode = currentNode.next;
            }
            currentNode.next = {
                data: item
            };
        },
        insert: (item, index) => {
            const newNode = {
                data: item
            };
            let currentNode = rootNode;
            let currentIndex = 0;
            while (currentIndex < index - 1) {
                if (currentNode === undefined) {
                    throw new RangeError('invalid index');
                }
                currentNode = currentNode.next;
                currentIndex++;
            }
            const insertNext = currentNode?.next;
            newNode.next = insertNext;
            // todo fix this
            currentNode.next = newNode;
        },
        remove: (index) => {
            return rootNode.data;
        },
        toString: () => {
            let output = '[ ';
            const currentNode = rootNode;
            while (currentNode !== undefined) {
                output += `${currentNode.data} `;
            }
            return `${output} ]`;
        }
    });
};
const list = SinglyLinkedList();
console.log(list.toString());
list.append(1);
console.log(list.toString());
list.append(2);
console.log(list.toString());
list.append(3);
console.log(list.toString());
list.append(4);
console.log(list.toString());
