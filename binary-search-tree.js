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
}

// Factory functions
function createTree(root) {
  return {
    root,
  }
}

function createNode(value, left=null, right=null) {
  return {
    value,
    left,
    right,
  }
}

// Render tree
function renderTree(root) {
  const container = document.querySelector("#tree-container");

  while (container.firstChild) {
    container.removeChild(container.firstChild);
  }
  container.append(renderNode(root));
}

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
}

// Generate random array
function generateArray(length) {
  const array = []
  for (let i=0; i<length; i++) {
    array.push(Math.round(Math.random() * 1000));
  }
  return array;
}

// Remove duplicates and sort array
function prepArray(array) {
  const uniqueSet = new Set([...array]);
  return Array.from(uniqueSet).sort((a, b) => a - b);
}

function refreshTree() {
  nodeArray = generateArray(Math.ceil(Math.random() * 20));
  rootNode = buildTree(nodeArray);
  renderTree(rootNode);
}

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

// Initialize
let rootNode;
let nodeArray;

refreshTree();

document.querySelector("#new-tree-button").addEventListener("click", (e) => {
  refreshTree();
});

document.querySelector("#insert-button").addEventListener("click", () => {
  insertNode(Math.ceil(Math.random() * 1000), rootNode);
  renderTree(rootNode);
});

document.querySelector("#delete-button").addEventListener("click", () => {
  deleteNode(
    nodeArray[Math.floor(Math.random() * nodeArray.length)],
    rootNode);
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