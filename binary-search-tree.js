// Build tree
function buildTree(sourceArray) {
  const array = prepArray(sourceArray.slice());

  if (array.length === 0) return null;
  if (array.length === 1) return createNode(array[0], null, null);

  const midpoint = Math.floor(array.length / 2);
  const newNode = createNode(
    array[midpoint],
    buildTree(array.slice(0, midpoint)),
    buildTree(array.slice(midpoint + 1, array.length))
  );
  return newNode;
};

// Factory functions
function createTree(root) {
  return {
    root,
  }
};

function createNode(value, left=null, right=null) {
  return {
    value,
    left,
    right,
  }
};

// Render tree
function renderTree(root) {
  
  // Render tree
  const treeContainer = document.querySelector("#tree-container");

  while (treeContainer.firstChild) {
    treeContainer.removeChild(treeContainer.firstChild);
  }
  treeContainer.append(renderNode(root));

  // Render data
  const dataContainer = document.querySelector("#data-container");

  while (dataContainer.firstChild) {
    dataContainer.removeChild(dataContainer.firstChild);
  }

  const list = document.createElement("ul");

  const l1 = document.createElement("li");
  l1.textContent = `Level order: ${levelOrder(rootNode)}`;
  const l2 = document.createElement("li");
  l2.textContent = `Inorder: ${inorder(rootNode)}`;
  const l3 = document.createElement("li");
  l3.textContent = `Preorder: ${preorder(rootNode)}`;
  const l4 = document.createElement("li");
  l4.textContent = `Postorder: ${postorder(rootNode)}`;
  const l5 = document.createElement("li");
  l5.textContent = `Tree height: ${height(rootNode)}`;
  const l6 = document.createElement("li");
  const depthNode = randomNode(rootNode);
  l6.textContent = `Depth of node ${depthNode.value}: ${depth(depthNode, rootNode)}`;
  const l7 = document.createElement("li");
  l7.textContent = `Is this tree balanced? ${isBalanced(rootNode)}`;

  list.append(l1, l2, l3, l4, l5, l6, l7);
  dataContainer.append(list);
};

function renderNode(root) {
  let nodeContainer = document.createElement("div");
  nodeContainer.setAttribute("class", "node-container");

  let nodeContent = document.createElement("p");
  nodeContent.setAttribute("class", "tree-node");

  let branchContainer = document.createElement("div");
  branchContainer.setAttribute("class", "branch-container");

  if (root === null) {
    nodeContent.textContent = "null";
  } else {
    nodeContent.textContent = root.value;
  }

  if (root.left !== null) {
    branchContainer.append(renderNode(root.left));
  } else {
    branchContainer.append(nodeContent);
  }

  if (root.right !== null) {
    branchContainer.append(renderNode(root.right));
  } else {
    branchContainer.append(nodeContent);
  }

  nodeContainer.append(nodeContent, branchContainer);
  return nodeContainer;
};

// Generate random array
function generateArray(length) {
  const array = []
  for (let i=0; i<length; i++) {
    array.push(Math.round(Math.random() * 1000));
  }
  return array;
};

// Remove duplicates and sort array
function prepArray(array) {
  const uniqueSet = new Set([...array]);
  return Array.from(uniqueSet).sort((a, b) => a - b);
};

function refreshTree() {
  nodeArray = generateArray(Math.ceil(Math.random() * 25));
  rootNode = buildTree(nodeArray);
  renderTree(rootNode);
};

function randomNode(root) {
  const nodeList = inorder(root);
  const randomIndex = Math.floor(Math.random() * nodeList.length);
  return find(nodeList[randomIndex], root);
};

// Insert, delete, search
function insertNode(node, root) {
  if (node > root.value) {
    if (root.right === null) {
      root.right = createNode(node);
    } else {
      insertNode(node, root.right);
    }
  }

  if (node < root.value) {
    if (root.left === null) {
      root.left = createNode(node);
    } else {
      insertNode(node, root.left);
    }
  }
  return;
};

function deleteNode(value, root) {
  console.log(`Deleting ${value} at ${root.value}...`);

  if (root.left && root.left.value === value) {
    const leftNode = root.left;
    
    // Leaf node
    if (isLeaf(leftNode)) {
      console.log("Leaf node");
      root.left = null;
    
    // Single branch
    } else if (!leftNode.left || !leftNode.right) {
      console.log("Single branch");
      root.left = leftNode.left;
      root.right = leftNode.right;
    
    // Multiple branches
    } else {
      console.log("Multiple branches");

      let smallestParent = root.right.left;

      while (!isLeaf(smallestParent.left)) {
        smallestParent = smallestParent.left;
      }
    
      root.left.value = smallestParent.left.value;
      smallestParent.left = null;
    }
  } else if (root.right && root.right.value === value) {
    const rightNode = root.right;
    
    // Leaf node
    if (isLeaf(rightNode)) {
      console.log("Leaf node");
      root.right = null;
    
    // Single branch
    } else if (!rightNode.left || !rightNode.right) {
      console.log("Single branch");
      root.left = rightNode.left;
      root.right = rightNode.right;
    
    // Multiple branches
    } else {
      console.log("Multiple branches");

      let smallestParent = root.right.left;

      while (!isLeaf(smallestParent.left)) {
        smallestParent = smallestParent.left;
      }
    
      root.right.value = smallestParent.left.value;
      smallestParent.left = null;
    }
  } else if (value < root.value && root.left) {
    deleteNode(value, root.left);
  } else if (value > root.value && root.right) {
    deleteNode(value, root.right);
  } else {
    return;
  }
};

function isLeaf(node) {
  if (node.right === null && node.left === null) return true;
  return false;
};

function find(value, root) {
  if (value === root.value) return root;
  if (value < root.value && root.left) return find(value, root.left);
  if (value > root.value && root.right) return find(value, root.right);
  return null;
};

function height(node) {
  if (node === null || isLeaf(node)) return 0;
  return Math.max(height(node.right), height(node.left)) + 1;
};

function depth(node, root) {
  if (root.value === node.value) return 0;
  if (node.value < root.value && root.left) return 1 + depth(node, root.left);
  if (node.value > root.value && root.right) return 1 + depth(node, root.right);
  return -1;
}

// Print values
function levelOrder(root) {
  const valueArray = [];
  const stack = [root];

  while (stack.length > 0) {
    const node = stack.shift();
    valueArray.push(node.value);
    if (node.left) stack.push(node.left);
    if (node.right) stack.push(node.right);
  }

  return valueArray.flat(Infinity);
};

function preorder(root) {
  const valueArray = [];
  if (root === null) return;

  valueArray.push(root.value);
  if (root.left !== null) valueArray.push(preorder(root.left));
  if (root.right !== null) valueArray.push(preorder(root.right));

  return valueArray.flat(Infinity);
};

function inorder(root) {
  const valueArray = [];
  if (root === null) return;

  if (root.left !== null) valueArray.push(inorder(root.left));
  valueArray.push(root.value);
  if (root.right !== null) valueArray.push(inorder(root.right));

  return valueArray.flat(Infinity);
};

function postorder(root) {
  const valueArray = [];
  if (root === null) return;

  if (root.left !== null) valueArray.push(postorder(root.left));
  if (root.right !== null) valueArray.push(postorder(root.right));
  valueArray.push(root.value);

  return valueArray.flat(Infinity);
};

// Balancing functions
function isBalanced(node) {
  if (node === null) return true;

  const diff = Math.abs(height(node.left) - height(node.right));
  const left = isBalanced(node.left);
  const right = isBalanced(node.right);

  if (diff <= 1 && left && right) return true;
  return false;
}

function rebalance(root) {
  const nodeList = inorder(root);
  return buildTree(nodeList);
}

// Initialize
let rootNode;
let nodeArray;

refreshTree();

// Buttons

document.querySelector("#new-tree-button").addEventListener("click", (e) => {
  refreshTree();
});

document.querySelector("#insert-button").addEventListener("click", () => {
  insertNode(Math.ceil(Math.random() * 1000), rootNode);
  renderTree(rootNode);
});

document.querySelector("#delete-button").addEventListener("click", () => {
  deleteNode(randomNode(rootNode), rootNode);
  renderTree(rootNode);
});

document.querySelector("#rebalance-button").addEventListener("click", () => {
  rootNode = rebalance(rootNode);
  renderTree(rootNode);
});

const prettyPrint = (node, prefix = "", isLeft = true) => {
  if (node === null) {
    return;
  }
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
  }
  console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.value}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
  }
};