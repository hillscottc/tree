export  class TreeManager {
  constructor() {
    this.data = {};
  }

  _parseCmdStr(valuePath) {
    const pathNodes = valuePath.split("/");
    let path, value;
    if (pathNodes.length === 1) {
      path = "";
      value = valuePath;
    } else {
      const joinedPath = pathNodes.slice(0, pathNodes.length - 1)
      path = joinedPath.reduce((total, x) => total + "/" + x)
      value = pathNodes[pathNodes.length - 1]
    }
    return {path: path, value: value}
  }

  create(valuePath){
    console.log("CREATE " + valuePath)
    const {path, value} = this._parseCmdStr(valuePath)
    this._create(path, value)
  }

  _create(path, value) {
    // setting a root val if needed
    if (path === "") {
      if(! (value in this.data)) {
        this.data[value] = {};
      }
      return
    }
    let curNode = this.data;
    const pList = path.split('/');
    for(let i = 0; i < pList.length-1; i++) {
      const elem = pList[i];
      if( !curNode[elem] ) curNode[elem] = {}
      curNode = curNode[elem];
    }
    curNode[pList[pList.length-1]] = {[value]: {}};
  }

  delete(target, quiet = false) {
    if (!quiet) console.log("DELETE ", target)
    const pList = target.split("/");
    const newObj = {...this.data}
    newObj[pList[0]] = {}
    this.data = newObj
  }

  move(src, target) {
    console.log(`MOVE ${src} ${target}`)
    this.copyTo(src, target)
    this.delete(src, true)
  }

  copyTo(src, target) {
    const pList = src.split("/");

    if (pList.length < 2) {

      this.data[target][src] = {...this.data[src]}

    } else {
      let curNode = this.data;
      for (let i = 0; i < pList.length - 1; i++) {
        const elem = pList[i];
        if (!curNode[elem]) throw Error(`${elem} doesnt exist.`)
        curNode = curNode[elem];
      }
      this.data[target] = curNode;
    }
  }

  list() {
    console.log("LIST");
    console.log(this.data);
  }

}

export default TreeManager;

