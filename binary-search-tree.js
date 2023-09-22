// Build tree
function buildTree(array) {

  if (array.length <= 1) {
    return createNode(array[0], null, null);
  }

  const midpoint = Math.floor(array.length / 2);
  const newNode = createNode(
    array[midpoint],
    buildTree(array.slice(0, midpoint)),
    buildTree(array.slice(midpoint + 1, array.length - 1))
  );

  return newNode;
}

// Factory functions
function createTree(root) {
  return {
    root,
  }
}

function createNode(value, left, right) {
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

  if (root.right !== null) {
    branchContainer.append(renderNode(root.right));
  }

  if (root.left !== null) {
    branchContainer.append(renderNode(root.left));
  }

  nodeContainer.append(nodeContent, branchContainer);
  return nodeContainer;
}

// Generate random array
function generateArray(length) {
  return [1, 2, 3, 4, 5, 6, 7, 8, 9];
}

const randomArray = generateArray(10);
const tree = buildTree(randomArray);
renderTree(tree);