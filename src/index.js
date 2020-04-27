import TreeManager from "./TreeManager";

const tm = new TreeManager();
tm.create("fruits");
tm.create("vegetables");
tm.create("grains");
tm.create("fruits/apples");
tm.create("fruits/apples/fuji");
tm.list()
tm.create("grains/squash");
tm.move("grains/squash", "vegetables");
tm.create("foods");
tm.move("grains", "foods");
tm.move("vegetables", "foods");
tm.list()
tm.delete("fruits/apples");
tm.list()
