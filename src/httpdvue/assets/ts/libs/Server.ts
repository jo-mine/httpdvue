// PHPサーバーのほうにAPI準備するのが大変そうなのでTS上でスタブを作る
namespace Server {
    export interface ITodo {
        todo_id: number;
        todo_detail: string;
        limit_date: string|null;
        done_flg: 0|1;
        del_flg: 0|1;
    }
    export class TodoApi {
        static #todoListStore = <ITodo[]>[]
        static #todoId = 1;
        static isConnecting = false;

        // 遅延をエミュレート
        async #emulateConnectionDelay(): Promise<void> {
            await new Promise(resolve => setTimeout(resolve, 500))
        }

        #enulateFail(v = 5) {
            // 25%でエラーを投げる
            if (Math.floor(Math.random() * v) < 1) {
                throw new Error('通信エラーのエミュレート')
            }
        }

        async getTodoList(isIncludeDone = false): Promise<ITodo[]> {
            TodoApi.isConnecting = true
            await this.#emulateConnectionDelay()
            if (isIncludeDone) {
                return TodoApi.#todoListStore.filter(v => v.del_flg === 0)
            }
            TodoApi.isConnecting = false
            return TodoApi.#todoListStore.filter(v => v.del_flg === 0 && v.done_flg === 0)
        }
        async registerTodo(_todo: Pick<ITodo, 'todo_detail' | 'limit_date'>): Promise<void> {
            TodoApi.isConnecting = true
            await this.#emulateConnectionDelay()
            await this.#enulateFail()
            const todo:ITodo = {
                ..._todo,
                todo_id: TodoApi.#todoId++,
                done_flg: 0,
                del_flg: 0
            }
            TodoApi.#todoListStore.unshift(todo)
            TodoApi.isConnecting = false
        }
        async updateTodo(_todo: Pick<ITodo, 'todo_id' | 'todo_detail' | 'limit_date' | 'done_flg'>): Promise<void> {
            TodoApi.isConnecting = true
            await this.#emulateConnectionDelay()
            await this.#enulateFail()
            const idx = TodoApi.#todoListStore.findIndex(v => v.todo_id === _todo.todo_id)
            if (idx === -1) {
                throw new Error('Todoがありません')
            }
            TodoApi.#todoListStore[idx].todo_detail = _todo.todo_detail
            TodoApi.#todoListStore[idx].limit_date = _todo.limit_date
            TodoApi.#todoListStore[idx].done_flg = _todo.done_flg
            TodoApi.isConnecting = false
        }
    }
}