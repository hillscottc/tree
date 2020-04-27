import TreeManager from "./TreeManager";

function getBigTree() {
  const tm = new TreeManager();
  tm.create("fruits");
  tm.create("vegetables");
  tm.create("grains");
  tm.create("fruits/apples");
  tm.create("fruits/apples/fuji");
  tm.create("grains/squash");
  return tm
}

// silence the console.logs
beforeEach(() => {
  jest.spyOn(console, 'log').mockImplementation(() => {});
});


describe('_parseCmdStr', () => {


  test('fruits', () => {
    const tm = new TreeManager();
    const results = tm._parseCmdStr("fruits");
    expect(results).toEqual({path: "", value: "fruits"});
  });

  test('fruits/apples/fuji', () => {
    const tm = new TreeManager();
    const results = tm._parseCmdStr("fruits/apples/fuji");
    expect(results).toEqual({path: "fruits/apples", value: "fuji"});
  });
});

describe('delete', () => {
  test('delete ...', () => {
    const tm = getBigTree();
    tm.delete("grains/squash");

    const expected = {
      fruits : {
        apples: {
          fuji: {}
        }
      },
      vegetables: {},
      grains: {},
    }

    expect(tm.data).toEqual(expected);
  });
});

describe('move', () => {
  test('move ...', () => {
    const tm = getBigTree();
    tm.move("grains/squash", "vegetables")
    const expected = {
      fruits : {
        apples: {
          fuji: {}
        }
      },
      vegetables: {
        squash: {}
      },
      grains: {},
    }
    expect(tm.data).toEqual(expected);
  });
});

describe('copyTo', () => {
  test('copyTo, shallow path', () => {
    const tm = getBigTree();
    tm.copyTo("grains", "vegetables")
    const expected = {
      fruits: {
        apples: {
          fuji: {}
        }
      },
      vegetables: {
        grains: {
          squash: {}
        }
      },
      grains: {
        squash: {}
      }
    }

    expect(tm.data).toEqual(expected);
  });

  test('copyTo, deep path', () => {
    const tm = getBigTree();
    tm.copyTo("grains/squash", "vegetables")

    const expected = {
      fruits : {
        apples: {
          fuji: {}
        }
      },
      vegetables: {
        squash: {}
      },
      grains: {
        squash: {}
      },
    }

    expect(tm.data).toEqual(expected);
  });
});

describe('create', () => {

  test('create fruits', () => {
    const tm = new TreeManager();
    tm.create("fruits");
    expect(tm.data).toEqual({fruits : {}});

    // shouldn't create dups
    tm.create("fruits");
    expect(tm.data).toEqual({fruits : {}});
  });

  test('create fruits/apples', () => {
    const tm = new TreeManager();
    tm.create("fruits/apples");
    expect(tm.data).toEqual({fruits : {apples: {}}});
  });

  test('create fruits/apples/fuji', () => {
    const tm = new TreeManager();
    tm.create("fruits/apples/fuji");
    expect(tm.data).toEqual({fruits : {apples: {fuji: {}}}});

    // shouldn't create dups
    tm._create("fruits/apples", "fuji");
    expect(tm.data).toEqual({fruits : {apples: {fuji: {}}}});
  });

  test('create big tree', () => {
    const tm = getBigTree();
    expect(tm.data).toEqual({
      fruits : {
        apples: {
          fuji: {}
        }
      },
      vegetables: {},
      grains: {
        squash: {}
      },
    });
  });
});


