export default {
  get(key, type) {
    let result = localStorage[key];
    if (result === undefined) return false;
    switch (type) {
      case undefined:
      case 'string':
        return result
      case 'number':
        return parseInt(result)
      case 'array':
        let arr = result.split(',');
        arr = arr.map(i => {
          return i.replace(/{{COMMA}}/g, ',')
        })
        return arr
      default:
        return result
    }
  },
  set(key, value, type) {
    // TODO set type only here
    // TODO add boolean
    switch (type) {
      case undefined:
      case 'string':
      case 'number':
        localStorage[key] = value;
        break;
      case 'array':
        localStorage[key] = value.map(i => {
          return i.replace(/,/g, '{{COMMA}}')
        });
        break;
      default:
        localStorage[key] = value;
    }
    return value;
  },
  remove(key) {
    if (localStorage[key]) {
      return delete localStorage[key]
    } else {
      return false
    }
  },
  clear() {
    localStorage.clear();
  },
  getSize() {
    let t = 0;
    for(let x in localStorage) {
      t += (((localStorage[x].length * 2)));
    }
    return `${(t/1024).toFixed(3)} kB`
  }
}
