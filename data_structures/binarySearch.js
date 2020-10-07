class Node {
  contructor(data) {
    this.data = data;
    this.left = null;
    this.right = null;
  }
}

class BinaryTree {
  constructor() {
    this.root = null;
  }

  insertData(data) {
    const newNode = new Node(data);
    if (this.root === null) {
      this.root = newNode;
    } else {
      this.insertNode(this.root, newNode);
    }
  }

  insertNode(currentNode, newNode) {
    // if value of new node is less than the current node move left
    if (newNode.data < currentNode.data) {
      if (currentNode.left === null) {
        currentNode.left = newNode;
      } else {
        this.insertNode(currentNode.left, newNode);
      }

      // if value of data is greater or euqal move right
    } else if (newNode.data >= currentNode.data) {
      if (currentNode.right === null) {
        currentNode.rigth = newNode;
      } else {
        this.insertNode(currentNode.right, newNode);
      }
    }
  }
}

const tree = new BinaryTree();

for (let i = 0; i <= 1000; i++) {
  const value = Math.ceil(Math.random() * 2000);
  tree.insertData(value);
}
