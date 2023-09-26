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
  }

  if (root.right !== null) {
    branchContainer.append(renderNode(root.right));
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


// Initialize
let rootNode;

document.querySelector("#new-tree-button").addEventListener("click", (e) => {
  rootNode = buildTree(generateArray(Math.ceil(Math.random() * 100)));
  renderTree(rootNode);
});

document.querySelector("#insert-button").addEventListener("click", () => {
  insertNode(Math.ceil(Math.random() * 1000), rootNode);
  renderTree(rootNode);
});