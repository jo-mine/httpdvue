var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var todo;
(function (todo_1) {
    let id = 1;
    const vueApp = Vue.extend({
        data() {
            return {
                todoText: '',
                todoLimit: null,
                todoList: [],
                showDoneTodo: true,
                dialog: { title: "", message: "", isActive: false }
            };
        },
        methods: {
            addTodo() {
                return __awaiter(this, void 0, void 0, function* () {
                    if (!this.todoText.length) {
                        this.dialog.message = '内容を空で登録できません';
                        this.dialog.isActive = true;
                        return;
                    }
                    const todoApi = new Server.TodoApi();
                    try {
                        yield todoApi.registerTodo({
                            todo_detail: this.todoText,
                            limit_date: this.todoLimit,
                        });
                        this.todoText = "";
                        this.todoLimit = null;
                    }
                    catch (e) {
                        this.dialog.message = '登録に失敗しました。再度登録してください。';
                        this.dialog.isActive = true;
                    }
                    this.todoList = yield todoApi.getTodoList(this.showDoneTodo);
                });
            },
            toggleDone(todo) {
                return __awaiter(this, void 0, void 0, function* () {
                    try {
                        const todoApi = new Server.TodoApi();
                        yield todoApi.updateTodo(Object.assign(Object.assign({}, todo), { done_flg: todo.done_flg ? 0 : 1 }));
                        this.todoList = yield todoApi.getTodoList(this.showDoneTodo);
                    }
                    catch (e) {
                        this.dialog.message = '更新に失敗しました。再度更新してください。';
                        this.dialog.isActive = true;
                    }
                });
            }
        },
        computed: {
            computedShowDoneTodo: {
                get() {
                    return this.showDoneTodo;
                },
                set(v) {
                    return __awaiter(this, void 0, void 0, function* () {
                        try {
                            const todoApi = new Server.TodoApi();
                            this.todoList = yield todoApi.getTodoList(this.showDoneTodo);
                            this.showDoneTodo = v;
                        }
                        catch (e) {
                            this.dialog.message = '取得に失敗しました。再度取得してください。';
                            this.dialog.isActive = true;
                        }
                    });
                }
            }
        },
    });
    new vueApp({
        el: "#app",
        delimiters: ["[[", "]]"],
    });
})(todo || (todo = {}));
//# sourceMappingURL=todo.js.map