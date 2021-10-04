export class NodeHead {

    constructor(data) {
        // main data
        this.data = data;
        // get id of duplicated dates 
        this.sameIds = [data.id]
        this.left = null;
        this.right = null;
    }
}
export class BinerySearch {
    constructor() {
        this.rootNode = null;
    }
    insertNode(data) {
        const newNode = new NodeHead(data);
        if (this.rootNode) {
            this.insert(this.rootNode, newNode)
        } else this.rootNode = newNode
    }
    insert(root, data) {
        if (this.isSame(root, data))
            root.sameIds.push(data.data.id)
        if (root.left !== null && this.leftCheck(root, data)) {
            this.insert(root.left, data)
        } else if (this.leftCheck(root, data)) {
            root.left = data
        }
        if (root.right !== null && this.rightCheck(root, data)) {
            this.insert(root.right, data)
        } else if (this.rightCheck(root, data)) {
            root.right = data
        }
    }
    leftCheck(root, data) {
        return new Date(data.data.date).getTime() < new Date(root.data.date).getTime()
    }
    rightCheck(root, data) {
        return new Date(data.data.date).getTime() > new Date(root.data.date).getTime()
    }
    isSame(root, data) {
        
        return new Date(data.data.date).getTime() === new Date(root.data.date).getTime()
    }
    contains(root, data) {
        // if not found
        if(root===null)
        return null
        // if found
        if (this.isSame(root, data))
            return root
         // check right
        if (this.rightCheck(root, data))
            return this.contains(root.right, data)
            // check left
        if (this.leftCheck(root, data))
            return this.contains(root.left, data)
    }
    getRootNode() {
        return this.rootNode;
    }
}