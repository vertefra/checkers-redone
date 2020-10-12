class Node {
  constructor(board, score) {
    this.board = board;
    this.score = score;
    this.left = null;
    this.right = null;
  }
}

module.exports = class BinaryTree {
  constructor() {
    this.root = null;
  }

  insertBoard(board, score) {
    const newNode = new Node(board, score);
    if (this.root === null) {
      this.root = newNode;
    } else {
      this.insertNode(this.root, newNode);
    }
  }

  insertNode(currentNode, newNode) {
    // if value of new node is less than the current node move left
    if (newNode.score < currentNode.score) {
      if (currentNode.left === null) {
        currentNode.left = newNode;
      } else {
        this.insertNode(currentNode.left, newNode);
      }

      // if value of data is greater or euqal move right
    } else if (newNode.score >= currentNode.score) {
      if (currentNode.right === null) {
        currentNode.rigth = newNode;
      } else {
        this.insertNode(currentNode.right, newNode);
      }
    }
  }
};
