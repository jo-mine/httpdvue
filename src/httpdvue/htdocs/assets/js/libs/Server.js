var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
// PHPサーバーのほうにAPI準備するのが大変そうなのでTS上でスタブを作る
var Server;
(function (Server) {
    var _TodoApi_instances, _a, _TodoApi_todoListStore, _TodoApi_todoId, _TodoApi_emulateConnectionDelay, _TodoApi_enulateFail;
    class TodoApi {
        constructor() {
            _TodoApi_instances.add(this);
        }
        getTodoList(isIncludeDone = false) {
            return __awaiter(this, void 0, void 0, function* () {
                TodoApi.isConnecting = true;
                yield __classPrivateFieldGet(this, _TodoApi_instances, "m", _TodoApi_emulateConnectionDelay).call(this);
                if (isIncludeDone) {
                    return __classPrivateFieldGet(TodoApi, _a, "f", _TodoApi_todoListStore).filter(v => v.del_flg === 0);
                }
                TodoApi.isConnecting = false;
                return __classPrivateFieldGet(TodoApi, _a, "f", _TodoApi_todoListStore).filter(v => v.del_flg === 0 && v.done_flg === 0);
            });
        }
        registerTodo(_todo) {
            var _b, _c, _d;
            return __awaiter(this, void 0, void 0, function* () {
                TodoApi.isConnecting = true;
                yield __classPrivateFieldGet(this, _TodoApi_instances, "m", _TodoApi_emulateConnectionDelay).call(this);
                yield __classPrivateFieldGet(this, _TodoApi_instances, "m", _TodoApi_enulateFail).call(this);
                const todo = Object.assign(Object.assign({}, _todo), { todo_id: (__classPrivateFieldSet(_b = TodoApi, _a, (_d = __classPrivateFieldGet(_b, _a, "f", _TodoApi_todoId), _c = _d++, _d), "f", _TodoApi_todoId), _c), done_flg: 0, del_flg: 0 });
                __classPrivateFieldGet(TodoApi, _a, "f", _TodoApi_todoListStore).unshift(todo);
                TodoApi.isConnecting = false;
            });
        }
        updateTodo(_todo) {
            return __awaiter(this, void 0, void 0, function* () {
                TodoApi.isConnecting = true;
                yield __classPrivateFieldGet(this, _TodoApi_instances, "m", _TodoApi_emulateConnectionDelay).call(this);
                yield __classPrivateFieldGet(this, _TodoApi_instances, "m", _TodoApi_enulateFail).call(this);
                const idx = __classPrivateFieldGet(TodoApi, _a, "f", _TodoApi_todoListStore).findIndex(v => v.todo_id === _todo.todo_id);
                if (idx === -1) {
                    throw new Error('Todoがありません');
                }
                __classPrivateFieldGet(TodoApi, _a, "f", _TodoApi_todoListStore)[idx].todo_detail = _todo.todo_detail;
                __classPrivateFieldGet(TodoApi, _a, "f", _TodoApi_todoListStore)[idx].limit_date = _todo.limit_date;
                __classPrivateFieldGet(TodoApi, _a, "f", _TodoApi_todoListStore)[idx].done_flg = _todo.done_flg;
                TodoApi.isConnecting = false;
            });
        }
    }
    _a = TodoApi, _TodoApi_instances = new WeakSet(), _TodoApi_emulateConnectionDelay = function _TodoApi_emulateConnectionDelay() {
        return __awaiter(this, void 0, void 0, function* () {
            yield new Promise(resolve => setTimeout(resolve, 500));
        });
    }, _TodoApi_enulateFail = function _TodoApi_enulateFail(v = 5) {
        // 25%でエラーを投げる
        if (Math.floor(Math.random() * v) < 1) {
            throw new Error('通信エラーのエミュレート');
        }
    };
    _TodoApi_todoListStore = { value: [] };
    _TodoApi_todoId = { value: 1 };
    TodoApi.isConnecting = false;
    Server.TodoApi = TodoApi;
})(Server || (Server = {}));
//# sourceMappingURL=Server.js.map